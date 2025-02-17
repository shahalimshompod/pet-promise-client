import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import donationImage from "../../../assets/photos/donationDetails.jpg";
import DOMPurify from "dompurify";
import Payment from "../../PrivateRoute/Payment/Payment";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { AuthContext } from "../../../AuthContextProvider/AuthContextProvider";
import LoginModal from "../../../Components/LoginModal/LoginModal";
import { FaClock } from "react-icons/fa";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import CampaignCard from "../../../Components/CampaignCard/CampaignCard";
import CampaignCardSkeleton from "../../../Components/SkeletonComponent/CardComponents/CampaignCardSkeleton";
import { CircleLoader } from "react-spinners";

const DonationDetails = () => {
  const idFromParams = useParams();
  const id = idFromParams.id;
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user, signInWithGoogle, signInWithFacebook, setUser } =
    useContext(AuthContext);

  useEffect(() => {
    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
  }, []);

  // donation payment modal states
  const [isOpened, setIsOpened] = useState(false);
  const [selectedCampaignToDonate, setSelectedCampaignToDonate] =
    useState(null);

  const openModal = (data) => {
    setIsOpened(true);
    setSelectedCampaignToDonate(data);
  };
  const closeModal = () => {
    setIsOpened(false);
    setSelectedCampaignToDonate(null);
  };

  // Date formatting
  const formatDate = (isoDateString) => {
    if (!isoDateString) return { date: "N/A", time: "N/A" }; // If undefined, return default values

    const date = new Date(isoDateString);
    if (isNaN(date)) return { date: "Invalid Date", time: "Invalid Time" }; // Handle invalid date

    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    const timeOptions = { hour: "numeric", minute: "2-digit", hour12: true };
    const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
      date
    );

    return { date: formattedDate, time: formattedTime };
  };

  // Query function for fetching data
  const fetchDonationDetailsData = async () => {
    const res = await axiosSecure.get(`/donation-details-page-data/${id}`);
    return res?.data;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["donation-details"],
    queryFn: fetchDonationDetailsData,
  });

  if (data?.isPaused || data?.expired) {
    return navigate("/unauthorized-access");
  }

  // Calculate progress percentage
  const progressPercentage = (data?.donatedAmount / data?.maxDonation) * 100;

  // Calculate days remaining using date-fns
  const calculateTimeRemaining = (lastDate) => {
    const today = new Date();

    const daysRemaining = differenceInDays(new Date(lastDate), today);
    const hoursRemaining = differenceInHours(new Date(lastDate), today) % 24; // Get remaining hours after calculating days
    const minutesRemaining =
      differenceInMinutes(new Date(lastDate), today) % 60; // Get remaining minutes after calculating hours

    return {
      days: daysRemaining > 0 ? daysRemaining : 0, // Return 0 if the date has passed
      hours: hoursRemaining > 0 ? hoursRemaining : 0,
      minutes: minutesRemaining > 0 ? minutesRemaining : 0,
    };
  };

  const daysRemaining = calculateTimeRemaining(data?.lastDate);

  // fetching data for recommended donations campaigns
  const fetchRecommendedDonation = async () => {
    const res = await axiosSecure.get(`/recommended-donation/${data?._id}`);
    return res?.data;
  };

  const {
    data: recommendedData,
    isLoading: recLoading,
    isError: recError,
    refetch: recRefetch,
  } = useQuery({
    queryKey: ["recommendedData"],
    queryFn: fetchRecommendedDonation,
  });

  if (isLoading) {
    return (
      <div className="text-center my-8 flex flex-col items-center h-screen justify-center dark:bg-[#111827] bg-cyan-50">
        <CircleLoader color="#3498db" loading={true} size={60} />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto bg-gradient-to-br from-cyan-100 via-cyan-50 to-cyan-100 dark:bg-gradient-to-br dark:from-[#111827]/90 dark:via-[#111827]/70 dark:to-[#111827]/90 shadow-lg overflow-hidden">
      <div
        className="md:h-[500px] bg-cover md:bg-left lg:bg-left bg-fixed flex flex-col justify-end text-white"
        style={{ backgroundImage: `url(${donationImage})` }}
      ></div>

      <div className="container mx-auto px-4 lg:px-5">
        <div className="my-10 flex flex-col lg:flex-row justify-between gap-10 lg:gap-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="w-full lg:w-[300px] lg:h-[300px] overflow-hidden rounded-lg">
                <img
                  className="object-cover w-[300px] h-[300px]"
                  src={data?.petPicture}
                  alt="pet"
                />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold poppins dark:text-white/80 text-black/80">
                  {data?.petName}
                </h1>
                <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">
                  Started: {formatDate(data?.campaignAddedDate).date} |{" "}
                  {formatDate(data?.campaignAddedDate).time}
                </p>
                <h1 className="text-lg lg:text-base gap-1 font-semibold mt-4 dark:text-white/80 flex items-center">
                  <FaClock />{" "}
                  <span
                    className={`font-bold ${
                      data?.donatedAmount === data?.maxDonation
                        ? "text-black dark:text-white/80"
                        : "text-green-500 dark:text-green-300"
                    } `}
                  >
                    {data?.donatedAmount === data?.maxDonation
                      ? "N/A"
                      : `${daysRemaining.days} Days ${daysRemaining.hours} hrs ${daysRemaining.minutes} mins`}
                  </span>
                </h1>

                {/* status */}
                <p className="nunito my-3 flex items-center gap-3 text-black/80 dark:text-cyan-50">
                  <p>Status:</p>{" "}
                  <p
                    className={`font-medium nunito px-3 rounded text-white ${
                      data.isPaused ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {data?.isPaused ? (
                      <span>{data?.isPaused ? "Paused" : "Active"}</span>
                    ) : (
                      <span>
                        {data?.donatedAmount === data?.maxDonation ? (
                          <span className="flex items-center gap-2">
                            <span>Goal Achieved</span>
                            <span>
                              <BsFillPatchCheckFill />
                            </span>
                          </span>
                        ) : (
                          "Active"
                        )}
                      </span>
                    )}
                  </p>
                </p>

                <div className="mt-8">
                  <h1 className="text-xl lg:text-2xl font-bold text-green-500 dark:text-green-300">
                    ${data?.donatedAmount} RAISED OF{" "}
                    <span className="text-lg">${data?.maxDonation}</span>
                  </h1>
                  {/* Progress Bar */}
                  <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full bg-green-500 transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 lg:gap-6">
              <div className="bg-cyan-600 dark:bg-[#111827] w-48 py-4 rounded-xl flex flex-col items-center">
                <h1 className="text-white text-2xl lg:text-4xl font-bold">
                  ${data?.maxDonation}
                </h1>
                <h1 className="text-white text-sm lg:text-base">TOTAL GOAL</h1>
              </div>
              {user?.email === data?.currentUserEmail ? (
                <Link to="/dashboard/my-donation-campaigns">
                  <button
                    type="button"
                    className={`text-white bg-cyan-500 dark:bg-[#111827] hover:bg-cyan-700 font-medium rounded-lg px-5 py-2.5 w-full text-sm lg:text-xl nunito ${
                      data?.donatedAmount == data?.maxDonation && "hidden"
                    }`}
                  >
                    Manage Your Campaigns
                  </button>
                </Link>
              ) : (
                <button
                  onClick={() => openModal(data)}
                  type="button"
                  className={`text-white bg-cyan-500 dark:bg-[#111827] hover:bg-cyan-700 font-medium rounded-lg px-5 py-2.5 w-full text-lg lg:text-xl nunito ${
                    data?.donatedAmount == data?.maxDonation && "hidden"
                  }`}
                >
                  DONATE NOW
                </button>
              )}
            </div>
          </div>

          <div className="hidden lg:block border-l-2 border-gray-300 dark:border-gray-600"></div>

          {/* description section */}
          <div className="h-[500px] w-1/3 overflow-y-scroll scrollbar-none">
            <div className="mt-8">
              <h1 className="text-xl lg:text-2xl font-semibold poppins dark:text-white/80 text-black/80">
                Short Description about this campaign
              </h1>
              <p className="text-sm lg:text-base text-gray-700 dark:text-gray-300 roboto mt-2">
                {data?.shortDescription}
              </p>
            </div>

            <div className="mt-8">
              <h1 className="text-xl lg:text-2xl font-semibold poppins dark:text-white/80 text-black/80">
                About Campaign
              </h1>
              <div
                className="text-sm lg:text-base text-gray-700 dark:text-gray-300 roboto mt-2"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data?.longDescription),
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <h1 className="text-4xl poppins font-semibold uppercase mb-6 text-black/80 dark:text-white/80">
          Recommended Donation Campaigns
        </h1>
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 mb-16 gap-10 ">
            {recLoading && <CampaignCardSkeleton cards={3} />}
            {recommendedData?.map((data, idx) => (
              <CampaignCard
                key={idx}
                recRefetch={recRefetch}
                refetch={refetch}
                data={data}
              />
            ))}
          </div>
        </div>
      </div>
      {user ? (
        isOpened && (
          <Payment
            refetch={refetch}
            isOpen={openModal}
            onClose={closeModal}
            selectedData={selectedCampaignToDonate}
          />
        )
      ) : (
        <LoginModal
          petForAdopt={selectedCampaignToDonate}
          setPetForAdopt={setSelectedCampaignToDonate}
          signInWithGoogle={signInWithGoogle}
          signInWithFacebook={signInWithFacebook}
          setUser={setUser}
        />
      )}
    </div>
  );
};

export default DonationDetails;
