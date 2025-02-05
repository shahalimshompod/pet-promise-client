import React, { useContext, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../AuthContextProvider/AuthContextProvider";
import { SpinnerCircular } from "spinners-react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const CheckoutForm = ({ closeModal, selectedData, setPaymentSuccess, refetch, setPaymentInfo }) => {
    const axiosSecure = useAxiosSecure();
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);

    const [paymentError, setPaymentError] = useState("");
    const [donationAmount, setDonationAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validate donation amount
        if (!donationAmount || donationAmount <= 0) {
            setPaymentError("Please enter a valid donation amount.");
            setLoading(false);
            return;
        }

        if (!stripe || !elements) {
            setLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (cardElement === null) {
            setLoading(false);
            return;
        }

        // Creating payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            setLoading(false);
            console.error(error);
            setPaymentError(error.message);
            return;
        } else {
            setPaymentError("");
        }

        // total amount
        const totalAmount = parseInt(selectedData.donatedAmount + parseInt(donationAmount));

        // amount validation
        if (totalAmount > selectedData.maxDonation) {
            setLoading(false);
            Swal.fire("Total Amount Exceeded!", "You cannot donate more than the specified amount", "info");
            return;
        }

        // Payment intent request for client secret
        const res = await axiosSecure.post("/create-payment-intent", { donationAmount });

        // client secret from backend after completed the payment intent
        const clientSecret = res.data.clientSecret;

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: user?.displayName || "Anonymous",
                    email: user?.email || "Anonymous",
                },
            },
        });

        if (confirmError) {
            setLoading(false);
        } else {
            if (paymentIntent.status === "succeeded") {
                const donationData = {
                    name: user?.displayName,
                    email: user?.email,
                    user_img: user?.photoURL,
                    campaign_image: selectedData?.petPicture,
                    campaign_pet_name: selectedData?.petName,
                    campaign_id: selectedData?._id,
                    donated_amount: paymentIntent.amount / 100,
                    transaction_id: paymentIntent.id,
                    status: true,
                };

                // sent a req for adding info to database
                const res = await axiosSecure.post("/donations", donationData);
                
                if (res.data.insertedId) {
                    const changeDonatedAmount = {
                        donatedAmount: parseInt(selectedData?.donatedAmount + paymentIntent.amount / 100),
                    };

                    const res = await axiosSecure.patch(`/change-donated-amount/${selectedData?._id}`, changeDonatedAmount);
                    

                    if (res.data.updated === true) {
                        const res = await axiosSecure.get(`/payment-confirmation/${paymentIntent.id}`);
                        
                        if (res.data) {
                            setPaymentInfo(res.data);
                            setLoading(false);
                            setPaymentSuccess(true);
                            refetch();
                        }
                    }
                }
            }
        }
    };

    // Calculate button enabled state
    const isPayNowEnabled = donationAmount > 0 && stripe && elements;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                style={styles.container}
                className="dark:bg-black/80 bg-cyan-50"
            >
                <div className="flex items-center justify-between">
                    <div></div>
                    <button
                        className="text-gray-600 hover:text-gray-800"
                        onClick={closeModal}
                    >
                        &times;
                    </button>
                </div>
                <h2 style={styles.heading} className="poppins font-semibold text-cyan-800 dark:text-cyan-50">Make a Donation</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    {/* Donation Amount Input */}
                    <input
                        type="number"
                        className="rounded border-gray-500 focus:ring-0"
                        placeholder="Donation Amount"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                    />
                    {/* Card Element */}
                    <div style={styles.cardInput}>
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: "16px",
                                        color: "#424770",
                                        "::placeholder": { color: "#aab7c4" },
                                    },
                                    invalid: { color: "#9e2146" },
                                },
                            }}
                        />
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!isPayNowEnabled} // Button disabled dynamically
                        className="nunito"
                        style={{
                            ...styles.button,
                            backgroundColor: isPayNowEnabled ? "#4CAF50" : "#ccc",
                            cursor: isPayNowEnabled ? "pointer" : "not-allowed",
                        }}
                    >
                        {loading ? (
                            <div className="flex flex-col items-center">
                                <SpinnerCircular size={24} thickness={180} speed={100} color="rgba(61, 172, 57, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />
                            </div>
                        ) : (
                            "Pay Now"
                        )}
                    </button>
                </form>
                {/* Error Message */}
                <p className="text-red-600 text-left nunito text-sm mt-2">{paymentError}</p>
            </motion.div>
        </AnimatePresence>
    );
};

const styles = {
    container: {
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        // backgroundColor: "#fff",
        textAlign: "center",
    },
    heading: {
        fontSize: "32px",
        marginBottom: "20px",
        // color: "#333",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    cardInput: {
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "#f9f9f9",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        transition: "background-color 0.3s ease",
    },
};

export default CheckoutForm;
