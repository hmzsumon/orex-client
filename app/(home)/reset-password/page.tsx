"use client";
import AccountContainer from "@/components/layout/AccountContainer";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { removeEmail } from "@/redux/resetPassSlice";
import { fetchBaseQueryError } from "@/redux/services/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const { email } = useSelector((state: any) => state.resetPass);
  const router = useRouter();
  // check if email is in the store
  useEffect(() => {
    if (!email) {
      router.push("/forgot-password");
    }
  }, [email]);

  // call reset password api
  const [resetPassword, { isLoading, isSuccess, isError, error }] =
    useResetPasswordMutation();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState("");

  // handle matching password
  const handlePasswordMatch = () => {
    if (password !== confirmPassword) {
      setPasswordError(true);
      setPasswordErrorText("Password does not match");
    } else {
      setPasswordError(false);
    }
  };

  const handlePasswordChange = (e: any) => {
    const newPass = e.target.value;
    setPassword(newPass);
  };

  // handle form submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    resetPassword(data);
  };

  // useEffect to handle success and error
  useEffect(() => {
    if (isSuccess) {
      toast.success("Password reset successfully");
      router.push("/login");
      dispatch(removeEmail());
    }

    if (isError) {
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
                Welcome to <span className="base--color">Orex Trade</span>
              </h2>
              <p>
                At Orex Trade, we turn small investments into big opportunities
                through strategic and reliable ventures.
              </p>
            </div>
          </div>
          <div className="account-card__body">
            <h3 className="text-center text-xl font-bold">
              Reset Your Password
            </h3>
            <form className="mt-4 space-y-4 " onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label>Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control focus:outline-none focus:ring-1 focus:ring-[rgba(204,163,84,0.5)] focus:bg-transparent"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 text-gray-500 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label>Confirm Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control focus:outline-none focus:ring-1 focus:ring-[rgba(204,163,84,0.5)] focus:bg-transparent"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => handlePasswordMatch()}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 text-gray-500 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-xs">{passwordErrorText}</p>
                )}
              </div>
              <div className="mt-3">
                <button className="cmn-btn font-bold w-full" type="submit">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AccountContainer>
  );
};

export default ResetPasswordPage;
