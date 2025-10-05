"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SecurityPage = () => {
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
  return (
    <div className="flex items-center justify-center mt-32 md:mt-10 ">
      <div className="flex items-center justify-center md:w-6/12 ">
        <div className="account-card -mt-28 md:-mt-0">
          <div className="account-card__header py-10 px-4 relative">
            <div className='absolute inset-0 bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-[rgba(3,26,22,0.8)] before:content-[""] z-0'></div>
            <div className="text-center relative">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                <span className="base--color">Security</span>
              </h2>
              <p>
                At Orex Trade, we provide a seamless process for withdrawing
                your earnings securely and efficiently.
              </p>
            </div>
          </div>
          <div className="account-card__body">
            <h3 className="text-center text-xl font-bold">Change Password</h3>
            <form className="mt-4 space-y-4 ">
              <div className="space-y-2">
                <label>Old Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control focus:outline-none focus:ring-1 focus:ring-[rgba(204,163,84,0.5)] focus:bg-transparent"
                    placeholder="Enter old password"
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
                {passwordError && (
                  <p className="text-red-500 text-xs">{passwordErrorText}</p>
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
                {passwordError && (
                  <p className="text-red-500 text-xs">{passwordErrorText}</p>
                )}
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
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
