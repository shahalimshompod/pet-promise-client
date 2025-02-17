import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import donation from "../../assets/photos/donation.jpeg";

const DonateSection = ({ sectionDonateRef }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            ref={sectionDonateRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full"
        >
            <div className="flex flex-col lg:flex-row">
                {/* Left Section: Donation Form */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="w-full lg:w-1/2 px-6 py-8 lg:py-24 bg-cover bg-center bg-fixed"
                    style={{ backgroundImage: `url(${donation})` }}
                >
                    <div className="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center gap-6">
                        <h1 className="poppins text-center text-2xl font-bold text-black/70 dark:text-white">
                            MAKE A DONATION
                        </h1>

                        {/* Donation Type Buttons */}
                        <div className="inline-flex rounded-md shadow-sm" role="group">
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-cyan-400 focus:z-10 focus:bg-cyan-300 focus:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:bg-cyan-800"
                            >
                                ONE TIME
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-lg hover:bg-gray-100 hover:text-cyan-400 focus:z-10 focus:bg-cyan-300 focus:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:bg-cyan-800"
                            >
                                MONTHLY
                            </button>
                        </div>

                        {/* Donation Amount with Animation */}
                        <motion.h1
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="font-semibold poppins text-5xl text-cyan-300"
                        >
                            <span>$</span>
                            <span>10.00</span>
                        </motion.h1>

                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center nunito">
                            Monthly gifts help nonprofits focus on their mission and long-term impact with helping people worldwide.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/donation-campaigns')}
                            type="button"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-cyan-400 rounded-lg hover:bg-blue-800 focus:outline-none uppercase"
                        >
                            Make A Donation
                        </motion.button>
                    </div>
                </motion.div>

                {/* Right Section: Inspirational Text */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="w-full lg:w-1/2 bg-gradient-to-bl from-cyan-50 via-cyan-100 to-cyan-50 py-12 lg:py-24 flex flex-col items-center justify-center dark:bg-gradient-to-br dark:from-[#111827]/80 dark:via-[#111827]/70 dark:to-[#111827]/80"
                >
                    <div className="w-11/12 lg:w-9/12">
                        <h1 className="poppins font-bold uppercase text-black/70 text-3xl lg:text-6xl mb-6 text-center lg:text-left dark:text-white/50">
                            Your Support Can Change Their Lives!
                        </h1>
                        <p className="roboto text-base lg:text-lg text-center lg:text-left dark:text-white/80">
                            A small act of kindness can make a world of difference. These animals are not just looking for a home—they’re seeking a chance at life. With your help, we can provide them with love, care, food, medical attention, and a safe haven. Together, let’s build a better world for them.
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default DonateSection;
