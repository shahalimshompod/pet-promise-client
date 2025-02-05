import React from 'react';

const Test = () => {

    return (
        <tr className="border-b bg-transparent border-cyan-500 hover:bg-cyan-50 dark:hover:bg-gray-950 animate-pulse flex items-center">
            <td className="px-6 py-4 text-center nunito">
                <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </td>
            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <div className="w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
                <div className="ps-3">
                    <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="w-32 h-3 bg-gray-300 dark:bg-gray-700 rounded mb-1"></div>
                    <div className="w-20 h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
            </th>
            <td className="px-6 py-4">
                <div className='flex items-center gap-1'>
                    <div className='w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full'></div>
                    <div className='flex flex-col items-start'>
                        <div className='w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded mb-1'></div>
                        <div className='w-32 h-3 bg-gray-300 dark:bg-gray-700 rounded'></div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="w-36 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </td>
            <td>
                <div className='flex items-center justify-around'>
                    <div className="w-20 h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
            </td>
        </tr>
    );
};

export default Test;