import { motion } from "framer-motion";
import { IoPawOutline } from "react-icons/io5";
import { PiDogLight } from "react-icons/pi";
import QNA from "../../assets/photos/icons8-faq-50.png";

const AdoptAPet = ({ darkMode }) => {
  return (
    <div className="bg-white dark:bg-[#111827]">
      <div className="container mx-auto py-8 md:py-16 px-3 lg:px-0">
        <div className="flex flex-col items-center">
          <h1 className="poppins uppercase text-2xl lg:text-4xl font-semibold text-black/80 dark:text-white/80 text-center">
            Planning to adopt a pet?
          </h1>
          <div className="mt-10 flex flex-col lg:flex-row items-center gap-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-5 w-full"
            >
              <p className="text-black/80 dark:text-white/80">
                <IoPawOutline size={60} />
              </p>
              <h4 className="text-cyan-600 text-2xl font-medium poppins text-center">
                CHECKLIST FOR NEW ADOPTERS
              </h4>
              <p className="text-black/80 dark:text-white/80 roboto text-lg w-11/12 text-center">
                Make the adoption transition as smooth as possible
              </p>
              <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg px-4 py-2 text-center text-sm sm:text-base md:px-5 md:py-2.5 md:text-lg">
                LEARN MORE
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center gap-5 w-full"
            >
              <p className="text-black/80 dark:text-white/80">
                <PiDogLight size={60} />
              </p>
              <h4 className="text-cyan-600 text-2xl font-medium poppins text-center">
                HOW OLD IS A DOG IN HUMAN YEARS
              </h4>
              <p className="text-black/80 dark:text-white/80 roboto text-lg text-center">
                Learn to translate dog years to human years just for fun, and
                vice versa. Finally answer how old your dog is!
              </p>
              <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg px-4 py-2 text-center text-sm sm:text-base md:px-5 md:py-2.5 md:text-lg">
                LEARN MORE
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center gap-5 w-full"
            >
              {darkMode ? (
                <img width="50" height="50" src={QNA} alt="faq" />
              ) : (
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios/50/faq.png"
                  alt="faq"
                />
              )}
              <h4 className="text-cyan-600 text-2xl font-medium poppins text-center">
                PET ADOPTION FAQS
              </h4>
              <p className="text-black/80 dark:text-white/80 roboto text-lg w-11/12 text-center">
                Get answer to all the you questions you haven’t thought of for
                your adoption.
              </p>
              <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg px-4 py-2 text-center text-sm sm:text-base md:px-5 md:py-2.5 md:text-lg">
                LEARN MORE
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptAPet;
