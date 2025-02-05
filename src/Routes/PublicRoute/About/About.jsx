import { motion } from 'framer-motion';

export default function About() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="py-20 text-center bg-cyan-600 text-white"
            >
                <h1 className="text-4xl md:text-6xl font-bold">About Us</h1>
                <p className="mt-4 text-lg md:text-xl roboto">Caring for pets, connecting families.</p>
            </motion.section>

            {/* Mission Section */}
            <motion.section
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="py-16 px-6 md:px-16"
            >
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold">Our Mission</h2>
                    <p className="mt-4 text-lg roboto">We are dedicated to rescuing, rehabilitating, and rehoming pets in need, ensuring they find loving families.</p>
                </div>
            </motion.section>

            {/* Values Section */}
            <motion.section
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="py-16 bg-white dark:bg-gray-800 px-6 md:px-16"
            >
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 shadow-lg rounded-xl bg-cyan-500 text-white">
                        <h3 className="text-xl font-semibold">Compassion</h3>
                        <p className="mt-2 roboto">Every pet deserves love and care.</p>
                    </div>
                    <div className="p-6 shadow-lg rounded-xl bg-cyan-500 text-white">
                        <h3 className="text-xl font-semibold">Dedication</h3>
                        <p className="mt-2 roboto">We work tirelessly to improve pet welfare.</p>
                    </div>
                    <div className="p-6 shadow-lg rounded-xl bg-cyan-500 text-white">
                        <h3 className="text-xl font-semibold">Trust</h3>
                        <p className="mt-2 roboto">Building a safe and reliable adoption process.</p>
                    </div>
                </div>
            </motion.section>

            {/* Team Section */}
            <motion.section
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="py-16 px-6 md:px-16"
            >
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold">Meet Our Team</h2>
                    <p className="mt-4 text-lg roboto">A passionate group of pet lovers and experts working together.</p>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="py-16 bg-cyan-600 text-white text-center"
            >
                <h2 className="text-3xl font-bold">Join Us in Making a Difference</h2>
                <p className="mt-4 text-lg roboto">Adopt, donate, or volunteer to help pets in need.</p>
                <button className="mt-6 px-6 py-3 bg-white text-cyan-600 font-semibold rounded-lg hover:bg-gray-200">Get Involved</button>
            </motion.section>
        </div>
    );
}
