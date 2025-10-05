import Container from "../layout/Container";

const PaymentSection = () => {
  return (
    <div className="payment-section relative py-20">
      <Container>
        <div className="space-y-3 z-10 ">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-center">
            <span>Payment We</span> <b className="text-[#cca354]">Accept</b>
          </h1>
          <p className="tracking-wide text-white font-semibold opacity-100 leading-relaxed">
            We accept all major cryptocurrencies and fiat payment methods to
            make your investment process easier with our platform.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default PaymentSection;
