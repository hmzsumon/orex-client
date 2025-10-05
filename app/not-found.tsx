"use client";
import AccountContainer from "@/components/layout/AccountContainer";
import { useRouter } from "next/navigation";

const NotfoundPage = () => {
  const router = useRouter();
  return (
    <div>
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
                  At Orex Trade, we turn small investments into big
                  opportunities through strategic and reliable ventures.
                </p>
              </div>
            </div>
            <div className="account-card__body">
              <h3 className="text-center text-xl font-bold">
                404: Page not found
              </h3>
              <div className="mt-3">
                <button
                  className="cmn-btn font-bold w-full"
                  onClick={() => router.back()}
                >
                  Go back
                </button>
              </div>
            </div>
          </div>
        </div>
      </AccountContainer>
    </div>
  );
};

export default NotfoundPage;
