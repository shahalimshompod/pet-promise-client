import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import PaymentConfirmationModal from "./PaymentConfirmationModal";

// todo
const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_PK)
const Payment = ({ isOpen, onClose, selectedData, refetch }) => {

    // payment success state
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const [paymentInfo, setPaymentInfo] = useState({})



    if (!paymentInfo) {
        return
    }

    useEffect(() => {
        if (paymentSuccess) {
            toast.success("Payment Successful")
        }
    }, [paymentSuccess])

    // preventing background scroll
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        // Cleanup when the component unmounts
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isOpen]);

    if (!isOpen) return null
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-[1050]">
            <Toaster />
            <Elements stripe={stripePromise}>
                <div className="w-full">
                    <CheckoutForm closeModal={onClose} selectedData={selectedData} setPaymentSuccess={setPaymentSuccess} refetch={refetch} setPaymentInfo={setPaymentInfo} />
                    {
                        paymentSuccess && <PaymentConfirmationModal onClose={onClose} paymentSuccess={paymentSuccess} paymentInfo={paymentInfo} />
                    }
                </div>
            </Elements>
        </div>
    );
};

export default Payment;