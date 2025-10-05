"use client";
import { useGetUserPackagesQuery } from "@/redux/features/package/packageApi";

const MyPlansPage = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetUserPackagesQuery(undefined);

  const { userPackage } = data || {};
  const { myPackages } = data || { myPackages: [] };
  return (
    <div className="flex items-center justify-center mt-32 md:mt-10 ">
      <div className="flex items-center justify-center md:w-6/12 ">
        <div className="account-card -mt-28 md:-mt-0">
          <div className="account-card__header py-10 px-4 relative">
            <div className='absolute inset-0 bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-[rgba(3,26,22,0.8)] before:content-[""] z-0'></div>
            <div className="text-center relative">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                <span className="base--color">My Plans</span>
              </h2>
              <p>
                At Orex Trade, we provide a seamless process for withdrawing
                your earnings securely and efficiently.
              </p>
            </div>
          </div>
          <div className="account-card__body">
            <h4 className="text-2xl base--color mb-2 text-center">
              Total Take Profit: $
              {userPackage?.total_return.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h4>
            <ul className="package-card__features mt-4">
              <li>
                Total Investment:{" "}
                <span className="base--color">
                  $
                  {userPackage?.total_invest.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </li>
            </ul>
            <div className="package-card__range mt-5 ">
              <h2 className=" base--color text-2xl font-bold">
                My Plans: {myPackages?.length}
              </h2>
              {myPackages?.map((pkg: any) => (
                <div key={pkg._id} className=" space-y-2 mt-4">
                  <button
                    className="cmn-btn font-bold disabled:cursor-not-allowed disabled:opacity-50 w-full "
                    type="submit"
                  >
                    {pkg.title}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPlansPage;
