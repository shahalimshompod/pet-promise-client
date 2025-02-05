import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PaymentConfirmationModal = ({ paymentSuccess, onClose, paymentInfo }) => {
    if (!paymentSuccess || !paymentInfo) return null;

    const navigate = useNavigate();

    const { status, donated_amount, transaction_id, campaign_pet_name, campaign_image } = paymentInfo;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 relative dark:bg-[#111827]"
            >
                <div className="flex justify-between items-center border-b dark:border-b-white/50 pb-3">
                    <h2 className="text-2xl font-bold poppins text-black/80 dark:text-white/80">Payment Successful</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="mt-4 space-y-4 text-center">
                    <p className="w-1/2 py-1 nunito mx-auto text-green-600 rounded-xl bg-green-200 border border-green-600 font-semibold">Payment Status: {status && "Success"}</p>
                    <p className="text-lg font-medium poppins text-black/80 dark:text-white/80">Amount: <span className="text-2xl font-bold">${donated_amount}</span></p>
                    <p className="text-sm text-gray-600 nunito text-black/80 dark:text-white/80">Transaction ID: <span className="font-bold">{transaction_id}</span></p>
                    <div className="flex flex-col items-center">
                        <img
                            src={campaign_image}
                            alt={campaign_pet_name}
                            className="w-24 h-24 object-cover rounded-full shadow-md"
                        />
                        <p className="mt-2 font-medium poppins text-xl text-black/80 dark:text-white/80">{campaign_pet_name}</p>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/dashboard/my-donation')}
                    className="mt-6 w-full bg-cyan-500 nunito text-white py-2 rounded-lg hover:bg-cyan-800"
                >
                    Donation History
                </button>
            </motion.div>
        </div>
    );
};

export default PaymentConfirmationModal;
