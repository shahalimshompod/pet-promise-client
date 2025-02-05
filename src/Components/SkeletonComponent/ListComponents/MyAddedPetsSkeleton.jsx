const MyAddedPetsSkeleton = (rows) => {
    return (
        Array(rows).fill(0).map((_, i) => (
            <tr key={i} className="border-b bg-transparent border-cyan-500 hover:bg-cyan-50 dark:hover:bg-gray-950 animate-pulse">
                <td className="px-6 py-4 text-center">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-6 mx-auto"></div>
                </td>
                <td className="px-6 py-4 flex items-center">
                    <div className="w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
                    <div className="ps-3">
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 mb-2"></div>
                        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-40"></div>
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
                </td>
                <td className="px-6 py-4">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
                </td>
                <td className="px-6 py-4">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
                </td>
                <td className="px-6 py-4 flex justify-around">
                    <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                </td>
            </tr>
        ))

    );
};

export default MyAddedPetsSkeleton;
