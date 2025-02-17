import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import CampaignCard from '../../Components/CampaignCard/CampaignCard';
import Slider from 'react-slick';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CampaignsCarousel = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch Campaign Data
    const fetchData = async () => {
        const res = await axiosSecure.get('/recommended-donation-homePage');
        return res?.data;
    };

    const { data, isLoading } = useQuery({
        queryKey: ["campaignCarousel"],
        queryFn: fetchData,
        staleTime: 0,
    });

    // Slider Settings with Auto Play
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className='dark:bg-[#111827] bg-white'>
            <div className='py-8 md:py-16 xl:py-24  container mx-auto'>
                <h1 className='poppins text-center text-xl lg:text-3xl xl:text-5xl font-bold text-black/70 dark:text-white'>
                    Help Our Furry Friends in Need 🐾
                </h1>
                <p className='mb-3 font-normal text-gray-700 dark:text-gray-400 text-center nunito lg:w-1/2 mx-auto my-5'>
                    Join hands to make a difference in the lives of abandoned and homeless pets.
                    Your generous contribution can provide food, shelter, and medical care to these
                    loving animals and help them find a forever home.
                </p>

                {/* Campaigns Carousel */}
                <div className='my-10 w-full'>
                    {isLoading ? (
                        <Slider {...settings}>
                            {[1, 2, 3].map((_, idx) => (
                                <div key={idx} className="p-4">
                                    <Skeleton height={250} className="rounded-xl" />
                                    <Skeleton height={20} width="80%" className="mt-3" />
                                    <Skeleton height={15} width="60%" className="mt-2" />
                                    <Skeleton height={10} width="100%" className="mt-4" />
                                    <Skeleton height={10} width="90%" className="mt-2" />
                                    <Skeleton height={35} width="100%" className="mt-4 rounded-md" />
                                </div>
                            ))}
                        </Slider>
                    ) : data?.length > 0 ? (
                        <div className='mx-auto'>
                            <Slider {...settings}>
                                {data.map((campData, idx) => (
                                    <CampaignCard key={idx} data={campData} />
                                ))}
                            </Slider>
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 dark:text-gray-400">No campaigns available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CampaignsCarousel;
