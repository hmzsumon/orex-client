"use client";
import { useSelector } from "react-redux";

const RankPage = () => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div className="flex items-center justify-center mt-32 md:mt-10 ">
      <div className="flex items-center justify-center md:w-6/12 ">
        <div className="account-card -mt-28 md:-mt-0">
          <div className="account-card__header py-10 px-4 relative">
            <div className='absolute inset-0 bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-[rgba(3,26,22,0.8)] before:content-[""] z-0'></div>
            <div className="text-center relative">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                <span className="base--color">Rank Rewards</span>
              </h2>
              <p>
                At Orex Trade, we provide a seamless process for withdrawing
                your earnings securely and efficiently.
              </p>
            </div>
          </div>
          <div className="account-card__body">
            <h3 className="text-center text-xl font-bold">
              Your current rank is{" "}
              <span className=" text-base-color capitalize">{user.rank}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankPage;
