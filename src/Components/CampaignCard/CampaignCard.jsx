import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaClock } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const CampaignCard = ({ data, refetch, recRefetch }) => {
    const navigate = useNavigate();

    // Calculate progress percentage
    const progressPercentage = (data.donatedAmount / data.maxDonation) * 100;

    // Calculate days remaining using date-fns
    const calculateTimeRemaining = (lastDate) => {
        const today = new Date();

        const daysRemaining = differenceInDays(new Date(lastDate), today);
        const hoursRemaining = differenceInHours(new Date(lastDate), today) % 24;
        const minutesRemaining = differenceInMinutes(new Date(lastDate), today) % 60;

        return {
            days: daysRemaining > 0 ? daysRemaining : 0,
            hours: hoursRemaining > 0 ? hoursRemaining : 0,
            minutes: minutesRemaining > 0 ? minutesRemaining : 0,
        };
    };

    const daysRemaining = calculateTimeRemaining(data.lastDate);

    // Navigate & Refetch Function
    const handleNavigate = () => {
        navigate(`/donation-details/${data._id}`);
        refetch();
        recRefetch()
    };

    return (
        <div className="max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition duration-300">
            {/* Image Section */}
            <div className="bg-gray-200 dark:bg-gray-700 h-60 flex items-center justify-center overflow-hidden">
                <img
                    className="h-full w-full object-cover"
                    src={data.petPicture}
                    alt="Cute little pup"
                />
            </div>

            {/* Content Section */}
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-4 poppins">
                    {data.petName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center poppins">
                    {data.campaignTitle}
                </p>

                {/* Progress Bar */}
                <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-green-500 transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <span className="nunito">${data.donatedAmount}</span>
                    <span className="nunito">out of ${data.maxDonation}</span>
                </div>

                {/* Cause and Days Remaining */}
                <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 flex items-center justify-between">
                    <p className="font-medium nunito flex items-center gap-3">
                        <FaClock /> {daysRemaining.days} Days {daysRemaining.hours} hrs {daysRemaining.minutes} mins
                    </p>
                    <p className='nunito my-3 flex items-center gap-3'>
                        <span>Status:</span>
                        <span className={`font-medium nunito px-3 rounded text-white 
                            ${data?.expired ? 'bg-red-500'
                                : data?.isPaused ? "bg-red-500"
                                    : data?.donatedAmount === data?.maxDonation ? 'bg-green-500'
                                        : 'bg-green-500'}`}>
                            {
                                data?.expired ? 'Expired'
                                    : data?.isPaused ? "Paused"
                                        : data?.donatedAmount === data?.maxDonation
                                            ? <span className="flex items-center gap-1">Goal Achieved <BsFillPatchCheckFill /></span>
                                            : 'Active'
                            }
                        </span>
                    </p>
                </div>

                {/* Button */}
                <button
                    onClick={handleNavigate}
                    disabled={data?.expired || data?.isPaused}
                    className={`mt-6 w-full font-medium py-2 rounded-lg transition duration-300 shadow-md nunito 
                        ${data?.expired || data?.isPaused
                            ? 'bg-slate-400 dark:bg-slate-500 dark:text-slate-700 text-slate-300'
                            : 'bg-teal-500 dark:bg-teal-600 text-white hover:bg-teal-600 dark:hover:bg-teal-700'}`}
                >
                    VIEW DETAILS
                </button>
            </div>
        </div>
    );
};

export default CampaignCard;
