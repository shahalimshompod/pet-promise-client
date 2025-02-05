const AllPetsSkeleton = ({ rows }) => {
    return (
        Array(rows).fill(0).map((_, i) => (
            <tr key={i} className="border-b bg-transparent border-cyan-500 hover:bg-cyan-50 dark:hover:bg-gray-950 animate-pulse">
                <td className="px-6 py-4 text-center flex items-center">
                    <div className="h-6 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </td>
                <th scope="row" className="flex items-center px-6 py-4">
                    <div className="w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
                    <div className="ps-3">
                        <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                        <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
                        <div className="h-5 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>
                </th>
                <td className="px-6 py-4">
                    <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </td>
                <td className="px-6 py-4">
                    <div className='flex flex-col items-center gap-1'>
                        <div className='w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full'></div>
                        <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="h-6 w-28 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </td>
                <td>
                    <div className='flex items-center justify-around'>
                        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    </div>
                </td>
            </tr>
        ))

    );
};

export default AllPetsSkeleton;
