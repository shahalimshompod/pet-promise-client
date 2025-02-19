import { motion } from "framer-motion";
import aboutImg from "../../assets/photos/Pet-adoption-scaled.png";
import { useNavigate } from "react-router-dom";

const AboutUsSection = () => {
    const navigate = useNavigate();
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full"
        >
            <div className="flex flex-col-reverse lg:flex-row">
                {/* Left Section: Text and Button */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-tl from-cyan-100 via-cyan-50 to-cyan-100 dark:bg-gradient-to-br dark:from-[#111827]/80 dark:via-[#111827]/70 dark:to-[#111827]/80
                    py-8 sm:py-14 md:py-16 lg:py-20 xl:py-24 w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-20"
                >
                    <div className="max-w-3xl">
                        <h1 className="poppins font-bold text-xl sm:text-2xl md:text-3xl xl:text-5xl 2xl:text-6xl uppercase text-black/70 dark:text-white/50">
                            PetPromise: Connecting Hearts, One Pet at a Time
                        </h1>
                        <p className="roboto my-4 sm:my-5 text-sm sm:text-base md:text-lg dark:text-white/80">
                            At PETPROMISE, we believe that every pet deserves a loving home. Our mission is to bridge the gap between abandoned or homeless pets and compassionate individuals looking to welcome a new furry friend into their lives. Whether you're a first-time pet owner or an experienced caretaker, we're here to guide you in finding your perfect companion.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            onClick={() => navigate('/about')}
                            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg px-4 py-2 text-center text-sm sm:text-base md:px-5 md:py-2.5 md:text-lg"
                        >
                            Learn More About Us
                        </motion.button>
                    </div>
                </motion.div>

                {/* Right Section: Image */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-auto bg-cover bg-center flex items-center justify-center"
                    style={{ backgroundImage: `url(${aboutImg})` }}
                ></motion.div>
            </div>
        </motion.div>
    );
};

export default AboutUsSection;
