import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 dark:bg-gray-900 min-h-screen py-4 lg:py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 sm:p-8">
        {/* Title Section */}
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="poppins text-3xl sm:text-4xl font-bold text-center text-cyan-600 dark:text-cyan-400 mb-8"
        >
          Privacy Policy
        </motion.h1>

        {/* Introduction Section */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 poppins">
            Introduction
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed roboto">
            Welcome to <strong>Pet Promise</strong>! We are committed to
            protecting your privacy and ensuring that your personal information
            is handled in a safe and responsible manner. This Privacy Policy
            outlines how we collect, use, and safeguard your information when
            you use our platform for pet adoption, pet care, and donation
            campaigns.
          </p>
        </motion.section>

        {/* Information Collection Section */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 poppins">
            Information We Collect
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed roboto">
            We collect various types of information to provide and improve our
            services:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2 space-y-2 roboto">
            <li>
              <strong>Personal Information:</strong> Name, email address, phone
              number, and mailing address when you register or make a donation.
            </li>
            <li>
              <strong>Pet Information:</strong> Details about the pets you are
              adopting or fostering, including medical history and behavioral
              traits.
            </li>
            <li>
              <strong>Payment Information:</strong> Credit card details or other
              payment information for processing donations or adoption fees.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you interact
              with our platform, such as IP address, browser type, and pages
              visited.
            </li>
          </ul>
        </motion.section>

        {/* How We Use Your Information Section */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 poppins">
            How We Use Your Information
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed roboto">
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2 space-y-2 roboto">
            <li>To facilitate pet adoptions and donations.</li>
            <li>
              To communicate with you about your account, donations, or adoption
              process.
            </li>
            <li>
              To improve our platform and services based on user feedback and
              usage patterns.
            </li>
            <li>To process payments and prevent fraudulent transactions.</li>
            <li>
              To comply with legal obligations and enforce our terms of service.
            </li>
          </ul>
        </motion.section>

        {/* Data Sharing Section */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 poppins">
            Data Sharing and Disclosure
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed roboto">
            We do not sell or rent your personal information to third parties.
            However, we may share your information in the following
            circumstances:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2 space-y-2 roboto">
            <li>
              With trusted partners and service providers who assist us in
              operating our platform.
            </li>
            <li>When required by law or to protect our rights and safety.</li>
            <li>
              In connection with a merger, acquisition, or sale of assets.
            </li>
          </ul>
        </motion.section>

        {/* Data Security Section */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 poppins">
            Data Security
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed roboto">
            We implement industry-standard security measures to protect your
            data, including encryption, secure servers, and regular security
            audits. However, no method of transmission over the internet is 100%
            secure, and we cannot guarantee absolute security.
          </p>
        </motion.section>

        {/* Your Rights Section */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 poppins">
            Your Rights
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed roboto">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2 space-y-2 roboto">
            <li>Access, update, or delete your personal information.</li>
            <li>Opt-out of receiving promotional communications.</li>
            <li>Request a copy of the data we hold about you.</li>
          </ul>
        </motion.section>

        {/* Contact Us Section */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 poppins">
            Contact Us
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed roboto">
            If you have any questions or concerns about this Privacy Policy,
            please contact us at:
          </p>
          <p className="text-cyan-600 dark:text-cyan-400 mt-2">
            Email: <strong>privacy@petpromise.com</strong>
          </p>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
