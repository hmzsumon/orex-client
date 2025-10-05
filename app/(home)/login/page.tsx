"use client";
import AccountContainer from "@/components/layout/AccountContainer";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { fetchBaseQueryError } from "@/redux/services/helpers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";

const LoginPage = () => {
  const router = useRouter();
  const [loginUser, { isLoading, isError, error, isSuccess }] =
    useLoginUserMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // handle login
  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (email.length > 0 && !email.includes("@")) {
      setEmailError(true);
      toast.error("Please enter a valid email address");
      return;
    }
    loginUser({ email, password });
  };

  // useEffect to handle success
  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful");
      router.push("/dashboard");
    }

    if (isError) {
      toast.error((error as fetchBaseQueryError).data?.message);
      if ((error as fetchBaseQueryError).status === 421) {
        router.push("/verify-email?email=" + email);
      }
      if ((error as fetchBaseQueryError).status === 422) {
        router.push("/suspend");
      }
    }
  }, [isSuccess, isError, error]);
  return (
    <div className="pt-14">
      <AccountContainer>
        <div className="flex items-center justify-center md:w-6/12 px-3">
          <div className="account-card -mt-28 md:-mt-0">
            <div
              className="account-card__header py-10 px-6 relative"
              data-background="assets/images/bg/bg-6.jpg"
            >
              <div className='absolute inset-0 bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-[rgba(3,26,22,0.8)] before:content-[""] z-0'></div>
              <div className="text-center relative">
                <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                  Welcome to <span className="base--color">Orex Trade</span>
                </h2>
                <p>
                  At Orex Trade, we turn small investments into big
                  opportunities through strategic and reliable ventures.
                </p>
              </div>
            </div>
            <div className="account-card__body">
              <h3 className="text-center text-xl font-bold">Login</h3>
              <form className="mt-4 space-y-2 " onSubmit={handleLogin}>
                <div className="space-y-2">
                  <label>Enter your Email</label>
                  <input
                    type="email"
                    className="form-control focus:outline-none focus:ring-1 focus:ring-[rgba(204,163,84,0.5)] focus:bg-transparent"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && (
                    <p className="text-red-500 text-xs">
                      Please enter a valid email
                    </p>
                  )}
                </div>
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
                <div className=" flex flex-wrap items-center justify-between">
                  <div className="flex gap-x-2 items-center justify-center">
                    <Link
                      href="/forgot-password"
                      className="base--color hover:underline "
                    >
                      <span>Forgot password?</span>
                    </Link>
                  </div>

                  <div className="col-sm-6 text-sm-right">
                    <p className="text-sm">
                      Haven't an account?{" "}
                      <Link
                        href="/sign-up"
                        className="base--color hover:underline"
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <button
                    className="cmn-btn font-bold disabled:cursor-not-allowed disabled:opacity-50 w-full"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <PulseLoader color="#000" size={8} margin={2} />
                    ) : (
                      <span>Login Now</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </AccountContainer>
    </div>
  );
};

export default LoginPage;
