"use client";
import AccountContainer from "@/components/layout/AccountContainer";
import {
  useResendVerificationEmailMutation,
  useVerifyEmailMutation,
} from "@/redux/features/auth/authApi";
import { fetchBaseQueryError } from "@/redux/services/helpers";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  const [verifyEmail, { isLoading, isSuccess, isError, error }] =
    useVerifyEmailMutation();

  // call resend email verification api
  const [
    resendVerificationEmail,
    {
      isLoading: isResendLoading,
      isSuccess: isResendSuccess,
      isError: isResendError,
      error: resendError,
    },
  ] = useResendVerificationEmailMutation();

  // State variables for verification code and timer
  const [verificationCode, setVerificationCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [codeErrorText, setCodeErrorText] = useState(
    "Verification code is required"
  );
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(30); // Initial timer value

  // handle verification
  const handleVerify = (e: any) => {
    e.preventDefault();
    if (!verificationCode) {
      setCodeError(true);
    } else {
      verifyEmail({ email, verificationCode });
    }
  };

  // Handle resend click
  const handleResend = () => {
    resendVerificationEmail({ email });
    setResendDisabled(true); // Disable resend button
    setTimer(30); // Reset timer
  };

  // useEffect to handle timer countdown
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (timer > 0 && resendDisabled) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setResendDisabled(false); // Enable resend button when timer finishes
    }

    return () => clearInterval(intervalId); // Cleanup interval
  }, [timer, resendDisabled]);

  // useEffect to set the active step
  useEffect(() => {
    if (isSuccess) {
      toast.success("Email verified successfully");
      router.push("/login"); // Redirect to login page
    }
    if (isError) {
      setCodeError(true);
      setCodeErrorText("Verification code doesn't match");
      toast.error((error as fetchBaseQueryError).data?.message);
    }
  }, [isSuccess, isError, error]);

  return (
    <AccountContainer>
      <div className="flex items-center justify-center md:w-6/12 px-3">
        <div className="account-card -mt-28 md:-mt-0">
          <div
            className="account-card__header py-10 px-6 relative"
            data-background="assets/images/bg/bg-6.jpg"
          >
            <div className='absolute inset-0 bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-[rgba(3,26,22,0.8)] before:content-[""] z-0'></div>
            <div className="text-center relative">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Welcome to <span className="base--color"> Orex Trade</span>
              </h2>
              <p>
                At Orex Trade, we turn small investments into big opportunities
                through strategic and reliable ventures.
              </p>
            </div>
          </div>
          <div className="account-card__body">
            <h3 className="text-center text-xl font-bold">Verify your Email</h3>
            <p className="text-xs mt-2">
              We have sent a verification code to{" "}
              <span className="font-bold">{email}</span>
            </p>
            <form className="mt-4 space-y-4 " onSubmit={handleVerify}>
              <div className="space-y-2">
                <label>Verify Your Email</label>
                <div>
                  <input
                    type="text"
                    className="form-control focus:outline-none focus:ring-1 focus:ring-[rgba(204,163,84,0.5)] focus:bg-transparent "
                    placeholder="Enter verification code"
                    value={verificationCode}
                    onChange={(e) => {
                      setVerificationCode(e.target.value);
                      setCodeError(false);
                    }}

                    // Display error message if code is empty
                  />
                  {codeError && (
                    <span className="text-red-500 text-xs">
                      {codeErrorText}
                    </span>
                  )}
                </div>
                <span className="mt-1 flex justify-end pr-2 text-xs text-gray-200">
                  Didn’t get the code?{" "}
                  <span
                    className={`font-bold cursor-pointer hover:text-icm-green ml-1 ${
                      resendDisabled ? "base--color" : "base--color"
                    }`}
                    onClick={handleResend}
                  >
                    {resendDisabled ? `Resend in ${timer} seconds` : "Resend"}
                  </span>
                </span>
              </div>

              <div className="mt-3">
                <button
                  className="cmn-btn font-bold w-full disabled:cursor-not-allowed disabled:opacity-50"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <PulseLoader color="#fff" size={8} />
                  ) : (
                    "Verify Email"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AccountContainer>
  );
};

export default VerifyEmailPage;
