/* ────────── File: app/kyc/components/StepSelfie.tsx
   (Circle fully visible + no x-scroll + Reset + toast) ────────── */
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  preview?: string;
  onPick: (f: File) => Promise<void> | void; // parent will upload/preview
  onNext: () => void;
};

export default function StepSelfie({ preview, onPick, onNext }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [running, setRunning] = useState(false);
  const [ring, setRing] = useState<"idle" | "detecting" | "good">("idle");
  const [supported, setSupported] = useState(false);
  const [capturedUrl, setCapturedUrl] = useState<string | undefined>(preview);
  const [circle, setCircle] = useState(280);
  const [busy, setBusy] = useState<boolean>(false);

  useEffect(() => {
    // @ts-ignore
    setSupported(typeof (window as any).FaceDetector === "function");
  }, []);

  /* responsive circle, prevents x-overflow */
  useLayoutEffect(() => {
    const recompute = () => {
      const el =
        stageRef.current ?? pageRef.current ?? document.documentElement;
      const stageW = Math.floor(el.getBoundingClientRect().width);
      const usable = stageW - 8;
      const px = Math.max(220, Math.min(420, usable));
      setCircle(px);
    };
    recompute();
    const ro = new ResizeObserver(recompute);
    if (pageRef.current) ro.observe(pageRef.current);
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", recompute);
    window.addEventListener("orientationchange", recompute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recompute);
      window.removeEventListener("orientationchange", recompute);
    };
  }, []);

  const startCamera = async () => {
    try {
      const st = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "user" },
          width: { ideal: 1280 },
          height: { ideal: 1280 },
          aspectRatio: 1,
        },
        audio: false,
      });
      setStream(st);
      const v = videoRef.current!;
      v.srcObject = st;
      await v.play();
      setRunning(true);
      setRing("detecting");
      if (supported) detectLoop();
    } catch {
      toast.error("Please allow camera access or upload a selfie.");
    }
  };
  const stopCamera = () => {
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
    setRunning(false);
    setRing("idle");
  };

  /* RESET / RETAKE */
  const onReset = () => {
    setCapturedUrl(undefined);
    if (!running) startCamera();
  };

  /* auto-detect & capture */
  const detectLoop = async () => {
    // @ts-ignore
    const FaceDetectorCtor = (window as any).FaceDetector;
    if (!FaceDetectorCtor) return;
    const detector = new FaceDetectorCtor({
      fastMode: true,
      maxDetectedFaces: 1,
    });
    let goodFrames = 0;
    const tick = async () => {
      if (!running || !videoRef.current) return;
      try {
        const faces = await detector.detect(videoRef.current);
        if (faces?.[0]) {
          const bb = faces[0].boundingBox as DOMRectReadOnly;
          const v = videoRef.current!;
          const size = Math.min(v.videoWidth, v.videoHeight);
          const cx = v.videoWidth / 2,
            cy = v.videoHeight / 2;
          const r = size * 0.32;
          const fx = bb.x + bb.width / 2,
            fy = bb.y + bb.height / 2;
          const inCircle = Math.hypot(fx - cx, fy - cy) < r * 0.75;
          const sizeOk = bb.width > r * 0.8 && bb.width < r * 1.4;
          if (inCircle && sizeOk) {
            goodFrames++;
            setRing("good");
          } else {
            goodFrames = 0;
            setRing("detecting");
          }
          if (goodFrames >= 14) {
            await captureFromVideo();
            stopCamera();
            return;
          }
        } else setRing("detecting");
      } catch {}
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const captureFromVideo = async () => {
    const v = videoRef.current,
      c = canvasRef.current;
    if (!v || !c) return;
    try {
      setBusy(true);
      const side = Math.min(v.videoWidth, v.videoHeight);
      const sx = (v.videoWidth - side) / 2,
        sy = (v.videoHeight - side) / 2;
      c.width = side;
      c.height = side;
      const ctx = c.getContext("2d")!;
      ctx.drawImage(v, sx, sy, side, side, 0, 0, side, side);
      const blob: Blob = await new Promise((res, rej) =>
        c.toBlob(
          (b) => (b ? res(b) : rej(new Error("Blob failed"))),
          "image/jpeg",
          0.92
        )
      );
      const file = new File([blob], "selfie.jpg", { type: "image/jpeg" });
      await onPick(file); // parent uploads / shows toast on success/fail if needed
      setCapturedUrl(URL.createObjectURL(blob));
      toast.success("Selfie captured");
    } catch (e: any) {
      toast.error(e?.message || "Failed to capture selfie");
    } finally {
      setBusy(false);
    }
  };

  const validateType = (file: File) => {
    const ok =
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png";
    if (!ok) {
      toast.error("Only JPG, JPEG or PNG allowed");
    }
    return ok;
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!validateType(f)) {
      e.currentTarget.value = "";
      return;
    }
    try {
      setBusy(true);
      await onPick(f);
      setCapturedUrl(URL.createObjectURL(f));
      toast.success("Selfie selected");
    } catch (err: any) {
      toast.error(err?.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  const ringColor =
    ring === "good" ? "#22c55e" : ring === "detecting" ? "#1ee6c5" : "#243341";

  return (
    <div
      ref={pageRef}
      className="min-h-[100svh] w-full overflow-x-hidden flex flex-col justify-between pb-[calc(16px+env(safe-area-inset-bottom))]"
    >
      {/* Card */}
      <div className="card px-3 py-4 overflow-x-hidden">
        <div className="mb-2 font-semibold text-lg">Take a Selfie</div>
        <p className="text-xs text-muted mb-4">
          Center your face in the circle. Remove hats & glasses.
        </p>

        {/* Camera stage */}
        <div
          ref={stageRef}
          className="flex justify-center w-full overflow-x-hidden pt-2 pb-2"
        >
          <div
            className="relative"
            style={{
              width: circle,
              height: circle,
              maxWidth: "100%",
              borderRadius: "50%",
              overflow: "hidden",
              border: `6px solid ${ringColor}`,
              boxSizing: "border-box",
              backgroundColor: "#0f141b",
            }}
          >
            <video
              ref={videoRef}
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover block"
              style={{ transform: "scaleX(-1)" }}
            />
            {!running && !capturedUrl && (
              <div className="absolute inset-0 grid place-items-center">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" fill="#2a3a4f" />
                  <path d="M4 20c2.2-4.2 13.8-4.2 16 0" fill="#263445" />
                </svg>
              </div>
            )}
            {capturedUrl && (
              <img
                src={capturedUrl}
                alt="selfie preview"
                className="absolute inset-0 w-full h-full object-cover block"
                style={{ transform: "scaleX(-1)" }}
              />
            )}
          </div>
        </div>

        {/* Tips */}
        <ul className="mt-5 text-[15px] text-white/90 space-y-2">
          {[
            "Keep a neutral expression",
            "Use the front camera at eye level",
            "No heavy filters / beauty mode",
            "Background should be plain",
          ].map((t) => (
            <li key={t} className="flex items-center gap-3">
              <span className="inline-block w-3 h-3 rounded-full bg-[#1ee6c5]" />
              {t}
            </li>
          ))}
        </ul>

        {/* Actions (main button + small reset on the right) */}
        <div className="mt-6 grid grid-cols-[1fr_auto] gap-3 items-center">
          {/* Start/Capture */}
          {running ? (
            <button
              disabled={busy}
              className={`h-[48px] rounded-2xl bg-[var(--accent)] text-black font-semibold ${
                busy ? "opacity-70" : ""
              }`}
              onClick={captureFromVideo}
            >
              {busy ? "Processing…" : "Capture Now"}
            </button>
          ) : (
            <button
              className="h-[48px] rounded-2xl bg-[var(--accent)] text-black font-semibold"
              onClick={startCamera}
            >
              Start Camera
            </button>
          )}

          {/* RESET button */}
          <button
            type="button"
            onClick={onReset}
            title="Reset / Retake"
            className="h-[48px] w-[56px] rounded-2xl bg-transparent border border-white/20 grid place-items-center hover:bg-white/5"
            aria-label="Reset"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 12a9 9 0 1 1-3.06-6.78"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M21 5v6h-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* upload row spans full width */}
          <label className="col-span-2 h-[48px] rounded-2xl bg-[#222a35] text-white/90 font-semibold grid place-items-center cursor-pointer">
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              capture="user"
              className="hidden"
              onChange={onFile}
            />
            {busy ? "Uploading…" : "Upload Selfie Instead"}
          </label>
        </div>

        <p className="text-xs text-muted mt-4">
          We only use your selfie to verify identity. It’s encrypted & stored
          securely.
        </p>
      </div>

      {/* Footer CTA */}
      <button
        className="btn btn-magenta w-full mt-4"
        onClick={() => {
          if (!capturedUrl) {
            toast.info("Please capture or upload a selfie");
            return;
          }
          onNext();
        }}
        disabled={!capturedUrl}
        title={!capturedUrl ? "Please capture or upload a selfie" : "Continue"}
      >
        Preview & Submit
      </button>

      {/* hidden canvas */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
