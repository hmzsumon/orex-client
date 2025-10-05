import { HandHeart, User, Wallet } from "lucide-react";
import Container from "../layout/Container";

const WorkSection = () => {
  return (
    <div className=" relative work-section">
      <Container>
        <div className="space-y-3 z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span>How</span> <b className="text-[#cca354]">Orex</b>{" "}
            <span>Works</span>
          </h1>
          <p className="tracking-wide text-white font-semibold opacity-100 leading-relaxed">
            Get involved in our tremendous platform and Invest. We will utilize
            your money and give you profit in your wallet automatically.
          </p>
        </div>

        <div className=" mt-10">
          <div className="flex flex-col md:flex-row items-center justify-between w-3/4 mx-auto">
            <div className="work-item mb-30">
              <div className="work-card text-center">
                <div className="work-card__icon">
                  <User className="base--color" size={36} />
                  <span className="step-number">01</span>
                </div>
                <div className="work-card__content">
                  <h4 className="base--color mb-3">Create Account</h4>
                </div>
              </div>
              {/* <!-- work-card end --> */}
            </div>
            <div className=" work-item mb-30">
              <div className="work-card text-center">
                <div className="work-card__icon">
                  <i className="las la-hand-holding-usd base--color"></i>
                  <HandHeart className="base--color" size={36} />
                  <span className="step-number">02</span>
                </div>
                <div className="work-card__content">
                  <h4 className="base--color mb-3">Invest To Plan</h4>
                </div>
              </div>
              {/* <!-- work-card end --> */}
            </div>
            <div className=" work-item mb-30">
              <div className="work-card text-center">
                <div className="work-card__icon">
                  <Wallet size={36} className="base--color" />
                  <span className="step-number">03</span>
                </div>
                <div className="work-card__content">
                  <h4 className="base--color mb-3">Get Profit</h4>
                </div>
              </div>
              {/* <!-- work-card end --> */}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default WorkSection;
