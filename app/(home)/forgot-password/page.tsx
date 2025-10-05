"use client";
import AccountContainer from "@/components/layout/AccountContainer";
import {
  useResendVerificationEmailMutation,
  useSecurityVerifyMutation,
} from "@/redux/features/auth/authApi";
import { addEmail } from "@/redux/resetPassSlice";
import { fetchBaseQueryError } from "@/redux/services/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";
const ForgotPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();

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

  // call verify security code api
  const [
    verifySecurityCode,
    {
      isLoading: isVerifyLoading,
      isSuccess: isVerifySuccess,
      isError: isVerifyError,
      error: verifyError,
    },
  ] = useSecurityVerifyMutation();

  // State variables for verification code and timer
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(30);
  const [send, setSend] = useState(false);
  const [sendError, setSendError] = useState(false);

  //handle change email
  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
    setSendError(false);
  };

  // Handle resend click
  const handleResend = (e: any) => {
    e.preventDefault();
    resendVerificationEmail({ email });
    setResendDisabled(true); // Disable resend button
    setTimer(30); // Reset timer
  };

  // handle verification
  const handleVerify = (e: any) => {
    e.preventDefault();
    const data = {
      email,
      code: verificationCode,
      url: "/",
    };
    verifySecurityCode(data);
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

  // use effect to handle resend success
  useEffect(() => {
    if (isResendSuccess) {
      toast.success("Email sent successfully");
      setSend(true);
    }

    if (resendError) {
      if (isResendError) {
        toast.error((resendError as fetchBaseQueryError).data?.message);
        setSendError(true);
      }
    }
  }, [isResendSuccess, resendError, isResendError]);

  // use effect to handle verification success
  useEffect(() => {
    if (isVerifySuccess) {
      toast.success("Verification successful");
      dispatch(addEmail(email));
      router.push("/reset-password");
    }

    if (verifyError) {
      if (isVerifyError) {
        toast.error((verifyError as fetchBaseQueryError).data?.message);
        setCodeError(true);
      }
    }
  }, [isVerifySuccess, verifyError, isVerifyError]);
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
                Welcome to <span className="base--color">Orex Trade</span>
              </h2>
              <p>
                At Orex Trade, we turn small investments into big opportunities
                through strategic and reliable ventures.
              </p>
            </div>
          </div>

          {send ? (
            <div className="account-card__body">
              <h3 className="text-center text-xl font-bold">
                Verify your Email
              </h3>
              <p className="text-xs mt-2">
                We have sent a verification code to{" "}
                <span className="font-bold">{email}</span>
              </p>
              <form className="mt-4 space-y-4 " onSubmit={handleVerify}>
                <div className="space-y-2">
                  <label>Verify Your Email</label>
                  <input
                    type="text"
                    className="form-control focus:outline-none focus:ring-1 focus:ring-[rgba(204,163,84,0.5)] focus:bg-transparent"
                    placeholder="Enter verification code"
                    onChange={(e) => setVerificationCode(e.target.value)}
                    value={verificationCode}
                  />
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
                  <button className="cmn-btn font-bold w-full" type="submit">
                    Verify Email
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="account-card__body">
              <h3 className="text-center text-xl font-bold">
                Forgot your password?
              </h3>
              <form className="mt-4 space-y-4 " onSubmit={handleResend}>
                <div className="space-y-2">
                  <label>Enter your Email</label>
                  <input
                    type="email"
                    className="form-control focus:outline-none focus:ring-1 focus:ring-[rgba(204,163,84,0.5)] focus:bg-transparent"
                    placeholder="Enter email"
                    autoComplete="off"
                    onChange={handleChangeEmail}
                  />
                  {sendError && (
                    <p className="text-red-500 text-xs">
                      It seem we are having trouble sending the email.
                    </p>
                  )}
                </div>

                <div className="mt-3">
                  <button className="cmn-btn font-bold w-full" type="submit">
                    {isResendLoading ? (
                      <PulseLoader color="#fff" size={8} margin={2} />
                    ) : (
                      "	Continue"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </AccountContainer>
  );
};

export default ForgotPassword;
