import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { motion } from "framer-motion";
import banner from "../../assets/banner/banner.mp4";

const Banner = ({
  handleScroll,
  sectionDonateRef,
  sectionLearnRef,
  sectionJoinRef,
}) => {
  return (
    <div className="relative h-[60vh] md:h-[75vh] lg:h-[90vh] w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={banner}
        autoPlay
        loop
        muted
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 xl:gap-6"
      >
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl md:text-2xl lg:text-4xl font-bold uppercase poppins mb-3 xl:mb-0"
        >
          Adopt, Love, and Transform Lives
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-4xl lg:text-5xl xl:text-[120px] font-bold uppercase poppins mb-3 xl:mb-0"
        >
          <span className="text-cyan-400">Pet</span>
          <span className="font-thin text-cyan-600">promise</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center gap-10 mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleScroll(sectionJoinRef)}
            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br font-medium rounded-lg px-5 py-2.5 text-center me-2 nunito text-lg"
          >
            Join us
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleScroll(sectionDonateRef)}
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br font-medium rounded-lg px-5 py-2.5 text-center me-2 nunito text-lg"
          >
            Donate
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="nunito font-light text-xl mb-4">Learn about us...</p>
          <motion.button
            whileHover={{ y: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleScroll(sectionLearnRef)}
            className="m-2 text-cyan-400"
          >
            <MdKeyboardDoubleArrowDown size={30} />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Banner;
