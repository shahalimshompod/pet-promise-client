const CardPetSkeleton = ({ cards }) => {
    return (
        Array(cards).fill(0).map((_, idx) => (
            <div key={idx} className="w-[500px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition duration-300 animate-pulse">

                <div className='relative h-56 overflow-hidden bg-gray-300 dark:bg-gray-700 rounded-t-lg'></div>

                <div className="px-5 pb-5">

                    <div className='flex items-center justify-between my-2'>
                        <div className="w-32 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="w-20 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>

                    <div className='w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2'></div>
                    <div className='w-32 h-4 bg-gray-300 dark:bg-gray-700 rounded'></div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2 md:gap-0">
                        <div className='w-40 h-4 bg-gray-300 dark:bg-gray-700 rounded'></div>
                        <div className='w-24 h-10 bg-gray-300 dark:bg-gray-700 rounded'></div>
                    </div>
                </div>
            </div>
        ))

    );
};

export default CardPetSkeleton;