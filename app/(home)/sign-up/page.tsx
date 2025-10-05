"use client";
import AccountContainer from "@/components/layout/AccountContainer";
import { fetchBaseQueryError } from "@/redux/services/helpers";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import countries from "@/lib/countries";
import {
  useCheckEmailExistOrNotMutation,
  useRegisterUserMutation,
} from "@/redux/features/auth/authApi";
import PhoneInput from "react-phone-input-2";

import { useRouter, useSearchParams } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();
  const [checkEmailExistOrNot, { data, isSuccess, isLoading, isError, error }] =
    useCheckEmailExistOrNotMutation();
  const { isExist } = data || {};

  useEffect(() => {
    if (isExist) {
      setEmailError(true);
      setEmailErrorText("Email already exist");
    }
  }, [isExist]);

  //call register user mutation
  const [
    registerUser,
    {
      isSuccess: isRegisterSuccess,
      isLoading: isRegisterLoading,
      isError: registerIsError,
      error: registerError,
    },
  ] = useRegisterUserMutation();

  // useEffect to handle register user success
  useEffect(() => {
    if (isRegisterSuccess) {
      toast.success("User registered successfully");
      router.push("/verify-email?email=" + email);
    }

    if (registerIsError) {
      toast.error((registerError as fetchBaseQueryError).data.message);
    }
  }, [isRegisterSuccess, registerIsError, registerError]);

  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState(
    "Please enter a valid email address"
  );
  const [code, setCode] = useState<string>("ru");
  const [phone, setPhone] = useState<string>("");
  const [phoneError, setPhoneError] = useState<boolean>(false);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState("");

  const [referralCode, setReferralCode] = useState("");
  const [edit, setEdit] = useState(true);
  const searchParams = useSearchParams();
  const referral_code = searchParams.get("referral_code");
  useEffect(() => {
    if (referral_code) {
      setReferralCode(referral_code);
      setEdit(false);
    }
  }, [referral_code]);

  const handlePhoneNumberChange = (value: string) => {
    if (value) {
      setPhoneError(false);
    }
    setPhone(value);
  };

  const handleCountryChange = (selectedCountryName: string) => {
    // Find the selected country directly
    const selectedCountry = countries.find(
      ({ name }) => name === selectedCountryName
    );

    // Update state
    setCountry(selectedCountryName);
    setCode(selectedCountry?.code.toLowerCase() || "ru");
  };

  // handle email change
  const handleEmailCheck = () => {
    const data = {
      email,
    };
    if (email) {
      checkEmailExistOrNot(data);
    }
  };

  // handle matching password
  const handlePasswordMatch = () => {
    if (password !== confirmPassword) {
      setPasswordError(true);
      setPasswordErrorText("Password does not match");
    } else {
      setPasswordError(false);
    }
  };

  // handle form submit
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) {
      setNameError(true);
    }
    if (!email) {
      setEmailError(true);
      setEmailErrorText("Email is required");
    }
    if (!phone) {
      setPhoneError(true);
    }
    if (!password) {
      setPasswordError(true);
    }
    if (!confirmPassword) {
      setPasswordError(true);
    }
    if (!country) {
      toast.error("Please select your country");
    }
    if (name && email && phone && password && confirmPassword && country) {
      const data = {
        name,
        email,
        phone,
        password,
        country,
        referralCode: referralCode ? referralCode : "OREX702507",
      };
      registerUser(data);
    }
  };

  return (
    <AccountContainer>
      <div className="flex items-center justify-center md:w-6/12 px-3">
        <div className="account-card">
          <div
            className="account-card__header py-12 px-6 relative"
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
            <h3 className="text-center text-xl font-bold">Create an Account</h3>
            <form
              className="mt-4 space-y-4 "
              onSubmit={(e) => handleFormSubmit(e)}
            >
              <div className="space-y-2">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control focus:outline-none focus:ring-1 focus:ring-[rgba(204,163,84,0.5)] focus:bg-transparent"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setNameError(!name)}
                />
                {nameError && (
                  <p className="text-red-500 text-xs">Full name is required</p>
                )}
              </div>

              <div className="space-y-2">
                <label>Email Address</label>
                <input
                  type="email"
                  className="form-control border focus:outline-none focus:ring-1 focus:ring-[rgba(204,163,84,0.5)] focus:bg-transparent text-red-500"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => {
                    handleEmailCheck();
                    setEmailError(
                      (email.length > 0 && !email.includes("@")) ||
                        email.length === 0
                    );
                  }}
                />
                {emailError && (
                  <p className="text-red-500 text-xs">{emailErrorText}</p>
                )}
              </div>

              <div className="space-y-2">
                <label>Select Your Country</label>
                <Select onValueChange={(value) => handleCountryChange(value)}>
                  <SelectTrigger className="w-full py-6 rounded border-border-color focus:outline-none focus:ring-1 focus:ring-[rgba(204,163,84,0.5)] focus:bg-transparent">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.name}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Start Phone input */}
              <PhoneInput
                placeholder="Enter phone number"
                value={phone}
                onChange={(phoneNumber) => handlePhoneNumberChange(phoneNumber)}
                country={code}
                dropdownStyle={{
                  backgroundColor: "#05003A",
                  color: "gray",
                }}
                inputStyle={{
                  backgroundColor: "transparent",
                  color: ` ${phoneError ? "red" : "gray"}`,
                  width: "100%",
                  height: "42px",
                  border: ` ${
                    phoneError
                      ? "1px solid red"
                      : "1px solid rgba(204, 163, 84, 0.45)"
                  }`,
                  borderRadius: "4px",
                }}
                buttonStyle={{
                  backgroundColor: "transparent",
                  borderColor: ` ${
                    phoneError ? "red" : "rgba(204, 163, 84, 0.45)"
                  }`,
                }}
                countryCodeEditable={false}
                disableDropdown={true}
              />
              {phoneError && (
                <p className="text-red-500 text-xs">Phone number is required</p>
              )}
              {/* End Phone input */}

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

              <div className="space-y-2">
                <label>Referral Code (Optional)</label>
                <input
                  type="text"
                  className="form-control focus:outline-none focus:ring-1 focus:ring-[rgba(204,163,84,0.5)] focus:bg-transparent"
                  placeholder="Enter referral code"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  disabled={edit ? false : true}
                />
              </div>

              <div className=" flex flex-wrap items-center justify-between">
                <div className="flex gap-x-2 items-center justify-center">
                  <input type="checkbox" id="exampleCheck1" />
                  <label htmlFor="exampleCheck1">Remember me</label>
                </div>

                <div className="col-sm-6 text-sm-right">
                  <p className="f-size-14">
                    Have an account?{" "}
                    <Link href="/login" className="base--color">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <button
                  className="cmn-btn font-bold disabled:cursor-not-allowed disabled:opacity-50 w-full "
                  type="submit"
                  disabled={isRegisterLoading}
                >
                  {isRegisterLoading ? (
                    <PulseLoader color="#000" size={8} margin={2} />
                  ) : (
                    <span>SignUp Now</span>
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

export default SignUpPage;
