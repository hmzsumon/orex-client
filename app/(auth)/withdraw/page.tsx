"use client";
import { useCreateWithdrawRequestMutation } from "@/redux/features/withdraw/withdrawApi";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";

const WithdrawPage = () => {
  const { user } = useSelector((state: any) => state.auth);

  // call new withdraw api
  const [withdraw, { isLoading, isSuccess, isError, error }] =
    useCreateWithdrawRequestMutation();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState(false);
  const [address, setAddress] = useState("");
  const [availableAmount, setAvailable] = useState<number>(0);
  const [receiveAmount, setReceiveAmount] = useState<number>(0);
  const [errorText, setErrorText] = React.useState<string>("");
  const [codeError, setCodeError] = useState<boolean>(false);

  // set available amount
  useEffect(() => {
    const balance = user?.e_balance;
    setAvailable(balance);
  }, [user]);

  // handle amount change
  const handleAmountChange = (e: any) => {
    const value = e.target.value;
    setAmount(value);
    if (value < 15) {
      setErrorText("Minimum amount is 15 USDT");
      return;
    } else if (value > availableAmount) {
      setErrorText("Insufficient balance");
      return;
    } else {
      setErrorText("");
    }

    setReceiveAmount(Number(value) - Number(value) * 0.05 - 1);
  };

  // handle submit form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('submitting form');
    const data = {
      amount: amount,
      net_amount: receiveAmount,
      password: password,
      charge_p: 0.05,
      charge_a: 1,
      method: {
        name: "Tether (USDT TRC20)",
        network: "Tron (TRC20)",
        address: address,
      },
    };

    withdraw(data);
  };

  // handle api response
  useEffect(() => {
    if (isSuccess) {
      toast.success("Withdraw request submitted successfully");
      setAmount("");
      setAddress("");
      setPassword("");
    }
    if (isError) {
      if ("data" in error) {
        toast.error((error.data as { message: string }).message);
      } else {
        toast.error("An error occurred");
      }
    }
  }, [isSuccess, isError]);

  return (
    <div className="flex items-center justify-center mt-32 md:mt-10 ">
      <div className="flex items-center justify-center md:w-6/12 ">
        <div className="account-card -mt-28 md:-mt-0">
          <div className="account-card__header py-10 px-4 relative">
            <div className='absolute inset-0 bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-[rgba(3,26,22,0.8)] before:content-[""] z-0'></div>
            <div className="text-center relative">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                <span className="base--color"> Withdraw</span>
              </h2>
              <p className=" text-sm mt-2">
                At Orex Trade, we provide a seamless process for withdrawing
                your earnings securely and efficiently.
              </p>
            </div>
          </div>
          <div className="account-card__body">
            <h3 className="text-center text-xl font-bold">
              Available Balance:{" "}
              {user?.e_balance.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h3>
            <form className="mt-4 space-y-4 " onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label>Amount to Withdraw</label>
                <input
                  type="number"
                  className="form-control focus:outline-none focus:ring-1 focus:ring-[rgba(204,163,84,0.5)] focus:bg-transparent"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={handleAmountChange}
                />
                <small className="flex items-center justify-between px-1 mt-1 text-gray-100">
                  <span className="">
                    Available:
                    {user?.e_balance >= 0 ? (
                      <span className="mx-1  font-bold">
                        {Number(user?.e_balance ? user?.e_balance : 0).toFixed(
                          2
                        )}
                      </span>
                    ) : (
                      <PulseLoader size={10} color={"#fff"} />
                    )}
                    USDT
                  </span>
                  <span>
                    Min Amount:
                    <span className="mx-1  font-bold">15</span>
                    USDT
                  </span>
                </small>
                {errorText && (
                  <small className="text-red-500 font-bold">{errorText}</small>
                )}
              </div>

              <div className="space-y-2">
                <label>
                  Receive wallet Address{" "}
                  <span className=" text-base-color">(TRC-20)</span>
                </label>
                <input
                  type="text"
                  className="form-control focus:outline-none focus:ring-1 focus:ring-[rgba(204,163,84,0.5)] focus:bg-transparent"
                  placeholder="Enter wallet address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {amountError && (
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

              <div className="mt-3">
                <button
                  className="cmn-btn font-bold w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={!!errorText || !amount || !address || !password}
                >
                  Withdraw
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawPage;
