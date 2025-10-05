const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        At Orex Trade, we prioritize the privacy and security of our users. This
        Privacy Policy outlines how we collect, use, and protect your
        information when you interact with our services. By using our website or
        services, you agree to the practices described in this policy. If you do
        not agree, please refrain from using our services.
      </p>
      <hr className="my-6" />
      <h2 className="text-2xl font-bold mb-2">1. Information We Collect</h2>
      <h3 className="text-xl font-semibold mt-4">a. Personal Information</h3>
      <ul className="list-disc ml-6 mb-4">
        <li>Name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Payment details</li>
      </ul>
      <h3 className="text-xl font-semibold">b. Non-Personal Information</h3>
      <ul className="list-disc ml-6 mb-4">
        <li>Browser type</li>
        <li>Device information</li>
        <li>IP address</li>
        <li>Cookies and usage data</li>
      </ul>
      <hr className="my-6" />
      <h2 className="text-2xl font-bold mb-2">
        2. How We Use Your Information
      </h2>
      <p className="mb-4">We use the information collected to:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Provide and manage our services.</li>
        <li>Communicate updates, offers, or essential service information.</li>
        <li>Ensure the security and integrity of our platform.</li>
        <li>Comply with legal and regulatory requirements.</li>
      </ul>
      <hr className="my-6" />
      <h2 className="text-2xl font-bold mb-2">
        3. Cookies and Tracking Technologies
      </h2>
      <p className="mb-4">We use cookies to enhance your experience by:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Saving your preferences.</li>
        <li>Tracking website performance.</li>
        <li>Analyzing user behavior to improve our services.</li>
      </ul>
      <p className="mb-4">
        You can disable cookies through your browser settings; however, this may
        affect your user experience.
      </p>
      <hr className="my-6" />
      <h2 className="text-2xl font-bold mb-2">4. Sharing of Information</h2>
      <p className="mb-4">
        We do not sell, trade, or rent your personal information to third
        parties. However, we may share information:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>
          With service providers who assist us in delivering our services.
        </li>
        <li>To comply with legal obligations or government requests.</li>
        <li>To protect the rights and safety of Orex Trade and its users.</li>
      </ul>
      <hr className="my-6" />
      <h2 className="text-2xl font-bold mb-2">5. Data Security</h2>
      <p className="mb-4">
        We implement robust security measures to protect your information from
        unauthorized access, alteration, disclosure, or destruction. These
        include:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Encrypted data storage.</li>
        <li>Secure communication channels (e.g., HTTPS).</li>
        <li>Regular security audits.</li>
      </ul>
      <p className="mb-4">
        Despite our efforts, no method of transmission over the internet is
        entirely secure, and we cannot guarantee absolute security.
      </p>
      <hr className="my-6" />
      <h2 className="text-2xl font-bold mb-2">6. Your Rights</h2>
      <p className="mb-4">As a user, you have the right to:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Access your personal information.</li>
        <li>Request correction of inaccurate or incomplete information.</li>
        <li>
          Request deletion of your personal information, subject to legal
          obligations.
        </li>
        <li>Opt-out of marketing communications.</li>
      </ul>
      <p className="mb-4">
        To exercise these rights, please contact us using the details below.
      </p>
      <hr className="my-6" />
      <h2 className="text-2xl font-bold mb-2">7. Third-Party Links</h2>
      <p className="mb-4">
        Our website may contain links to third-party websites. Orex Trade is not
        responsible for the privacy practices or content of these websites. We
        encourage users to review the privacy policies of any external sites
        they visit.
      </p>
      <hr className="my-6" />
      <h2 className="text-2xl font-bold mb-2">8. Changes to This Policy</h2>
      <p className="mb-4">
        Orex Trade reserves the right to modify this Privacy Policy at any time.
        Changes will be effective immediately upon posting on our website. Users
        are encouraged to review this policy periodically to stay informed.
      </p>
      <hr className="my-6" />
      <h2 className="text-2xl font-bold mb-2">9. Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns about this Privacy Policy, please
        contact us at:
      </p>
      <ul className="list-none ml-6">
        <li>
          Email:{" "}
          <a href="mailto:support@Orextrade.com" className="text-blue-500">
            support@Orextrade.com
          </a>
        </li>
        <li>Phone: +7 (499) 517-88-99</li>
        <li>Address: Orex Trade, Moscow, Russia</li>
      </ul>
    </div>
  );
};

export default PrivacyPolicyPage;
