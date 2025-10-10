import { Copy, Headset, Lock, Truck, UserRoundCog, Users } from "lucide-react";
import Container from "../layout/Container";
import ChooseCard from "./ChooseCard";

const chooseDta = [
  {
    id: 1,
    icon: <Copy size={24} className="base--color" />,
    title: "Legal Company",
    description:
      "Our company conducts absolutely legal activities in the legal field. We are certified to operate investment business, we are legal and safe.",
  },

  {
    id: 2,
    icon: <Lock size={24} className="base--color" />,
    title: "High reliability",
    description:
      "We are trusted by a huge number of people. We are working hard constantly to improve the level of our security system and minimize possible risks.",
  },

  {
    id: 3,
    icon: <UserRoundCog size={24} className="base--color" />,
    title: "Anonymity",
    description:
      "Anonymity and using cryptocurrency as a payment instrument. In the era of electronic money – this is one of the most convenient ways of cooperation.",
  },

  {
    id: 4,
    icon: <Truck size={24} className="base--color" />,
    title: "Quick Withdrawal",
    description:
      "Our all retreats are treated spontaneously once requested. There are high maximum limits. The minimum withdrawal amount is only $15.",
  },

  {
    id: 5,
    icon: <Users size={24} className="base--color" />,
    title: "Referral Program",
    description:
      "We are offering a certain level of referral income through our referral program. you can increase your income by simply refer a few people.",
  },

  {
    id: 6,
    icon: <Headset size={24} className="base--color" />,
    title: "24/7 Support",
    description:
      "We provide 24/7 customer support through e-mail and telegram. Our support representatives are periodically available to elucidate any difficulty..",
  },
];
const ChooseSection = () => {
  return (
    <div className="choose-section relative">
      {/* Background with Overlay */}
      <div className='absolute inset-0 bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-[rgba(3,26,22,0.8)] before:content-[""] z-0'></div>

      <Container>
        <div className="relative space-y-4">
          <div className=" flex flex-col gap-3 items-center justify-center">
            <h1 className="text-3xl md:text-6xl font-bold leading-tight">
              <span>Why Choose </span>{" "}
              <b className="text-[#cca354]">Orex Trade</b>
            </h1>
            <p>
              Our goal is to provide our investors with a reliable source of
              high income, while minimizing any possible risks and offering a
              high-quality service.
            </p>
          </div>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chooseDta.map((choose) => (
                <ChooseCard key={choose.id} choose={choose} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ChooseSection;
