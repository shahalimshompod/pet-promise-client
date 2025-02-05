import React from 'react';

const MyDonationSkeleton = ({ rows }) => {
    return (
        Array(rows).fill(0).map((_, i) => (
            <tr className="border-b bg-transparent border-cyan-500 hover:bg-cyan-50 dark:hover:bg-gray-950 animate-pulse">
                <th scope="row" className="flex items-center px-6 py-4 whitespace-nowrap">
                    <div className="w-20 h-20 rounded-xl bg-gray-300 dark:bg-gray-700"></div>
                    <div className="ps-3">
                        <div className="w-32 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="w-40 h-4 mt-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>
                </th>
                <td className="px-6 py-4">
                    <div className="w-16 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </td>
                <td className="px-6 py-4">
                    <div className="w-24 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </td>
                <td className="px-6 py-4">
                    <div className="w-20 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </td>
                <td>
                    <div className='flex items-center justify-around'>
                        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    </div>
                </td>
            </tr>
        ))

    );
};

export default MyDonationSkeleton;
