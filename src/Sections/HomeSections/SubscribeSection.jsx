const SubscribeSection = ({sectionJoinRef}) => {
    return (
        <div ref={sectionJoinRef} className="flex flex-col items-center justify-center gap-6 py-20 bg-gradient-to-b from-cyan-50 to-cyan-100 dark:bg-gradient-to-br dark:from-[#111827]/80 dark:via-[#111827]/70 dark:to-[#111827]/80 px-3 xl:px-0">
            {/* Heading */}
            <h1 className="poppins font-semibold text-2xl md:text-3xl lg:text-4xl text-center dark:text-white/70">
                Subscribe to Pet Promise
            </h1>

            {/* Subheading */}
            <p className="roboto font-light text-sm md:text-base lg:text-lg text-center px-4 dark:text-white/80">
                Sign up to stay updated on the latest happenings with Pet Promise.
            </p>

            {/* Input Field with Button */}
            <div className="flex flex-col lg:flex-row items-center gap-4 w-full max-w-xl">
                <div className="relative w-full">
                    {/* Icon */}
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 16"
                        >
                            <path d="M10.036 8.278l9.258-7.79A1.979 1.979 0 0018 0H2A1.987 1.987 0 00.641.541l9.395 7.737z" />
                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 002 2h16a2 2 0 002-2V2.5l-8.759 7.317z" />
                        </svg>
                    </div>

                    {/* Input */}
                    <input
                        type="email"
                        id="email-input"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
                        placeholder="Enter your email"
                        aria-label="Enter your email to subscribe"
                    />
                </div>

                {/* Subscribe Button */}
                <button
                    type="button"
                    className="w-full lg:w-auto text-white bg-cyan-500 hover:bg-cyan-600 font-medium rounded-lg text-sm px-5 py-2.5 nunito dark:bg-cyan-600 dark:hover:bg-cyan-700"
                >
                    Subscribe
                </button>
            </div>
        </div>
    );
};

export default SubscribeSection;
