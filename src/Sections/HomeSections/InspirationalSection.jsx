import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import cat from "../../assets/photos/Happy-Cat.jpg";
import dog from "../../assets/photos/image-62302-800.jpg";
import bunny from "../../assets/photos/bunny-968856_1280-1080x675.jpg";
import parrot from "../../assets/photos/parrot-on-hand-stockcake.webp";
import bgImg from "../../assets/photos/bg.webp";

const InspirationalSection = () => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-cover bg-center py-8 lg:py-24 bg-fixed px-3 xl:px-0 overflow-x-hidden"
            style={{ backgroundImage: `url(${bgImg})` }}
        >
            <div className="flex flex-col lg:flex-row items-center justify-between container mx-auto">
                {/* Left Section */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="w-full lg:w-1/2 text-center lg:text-left mb-6 lg:mb-0 backdrop-blur-sm px-4 py-6"
                >
                    <h1 className="uppercase poppins font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white">
                        Be the reason they <span className="text-cyan-400">smile</span>!
                    </h1>
                    <p className="my-4 roboto text-white font-light text-sm sm:text-base md:text-lg">
                        Pets bring unconditional love and happiness. By adopting, you're not only rescuing them but also discovering the joy of having a loyal companion by your side.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/pet-listing')}
                        type="button"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg px-4 py-2 text-center text-sm sm:text-base md:px-5 md:py-2.5 md:text-lg"
                    >
                        Find Your Companion
                    </motion.button>
                </motion.div>

                {/* Right Section - Images */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
                >
                    {[cat, dog, bunny, parrot].map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            className="w-28 h-24 sm:w-40 sm:h-32 md:w-52 md:h-40 lg:w-64 lg:h-48 overflow-hidden rounded-lg shadow-lg"
                        >
                            <img className="w-full h-full object-cover" src={img} alt="Pet" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default InspirationalSection;
