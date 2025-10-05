import Container from "../layout/Container";

const AboutSection = () => {
  return (
    <div className="about-section relative">
      {/* Background with Overlay */}
      <div className=' md:hidden  absolute inset-0 bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-[rgba(3,26,22,0.8)] before:content-[""] z-0'></div>

      <Container>
        <div className="relative grid md:grid-cols-2">
          {/* Left Column */}
          <div></div>

          {/* Right Column */}
          <div className="space-y-3 z-10">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span>About</span> <b className="text-[#cca354]">Us</b>
            </h1>
            <p className="tracking-wide text-white font-semibold opacity-100 leading-relaxed">
              Orex Trade is a dynamic Russian investment company dedicated to
              empowering small investors. We specialize in pooling modest
              investments and channeling them into high-potential opportunities,
              including major corporations, forex trading, cryptocurrency
              markets, and Russia’s thriving oil and gas sector. Partnering with
              industry leaders like Rosneft, we aim to deliver consistent growth
              and value for our investors while maintaining a commitment to
              transparency and innovation in the financial world.
            </p>
            <p className="tracking-wide text-white font-semibold opacity-100 leading-relaxed">
              Our goal is to provide our investors with a reliable source of
              high income, while minimizing any possible risks and offering a
              high-quality service, allowing us to automate and simplify the
              relations between the investors and the trustees. We work towards
              increasing your profit margin by profitable investment. We look
              forward to you being part of our community.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutSection;
