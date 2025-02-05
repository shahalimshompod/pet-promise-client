import React from 'react';

const CampaignCardSkeleton = ({ cards }) => {
    return (
        Array(cards).fill(0).map((_, i) => (
            <div key={i} className="w-[400px] bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition duration-300">
                {/* Image Section */}
                <div className="bg-gray-200 dark:bg-gray-700 h-60 flex items-center justify-center overflow-hidden">
                    <div className="h-full w-full bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                    {/* Title Skeleton */}
                    <div className="w-32 h-6 bg-gray-300 dark:bg-gray-600 rounded mb-4 animate-pulse"></div>

                    {/* Campaign Title Skeleton */}
                    <div className="w-40 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-6 animate-pulse"></div>

                    {/* Progress Bar Skeleton */}
                    <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
                        <div className="h-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                    </div>

                    {/* Donation Info Skeleton */}
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                        <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                        <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                    </div>

                    {/* Days Remaining and Status Skeleton */}
                    <div className="mt-6 flex items-center justify-between">
                        <div className="w-40 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                        <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                    </div>

                    {/* Button Skeleton */}
                    <div className="mt-6 w-full h-10 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                </div>
            </div>
        ))

    );
};

export default CampaignCardSkeleton;