import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useCart from "../../../hooks/useCart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";


const Checkout = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transanctionId, setTransanctionId] = useState('');
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    // console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('Payment Error', error);
            setErrorMessage(error.message)
        }
        else {
            console.log('Payment method', paymentMethod);
            setErrorMessage('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                },
            },
        });

        if (confirmError) {
            console.log("confirm error", confirmError);
        }

        else {
            console.log("payment intent", paymentIntent);
            if (paymentIntent.status === "succeeded") {
                setTransanctionId(paymentIntent.id);

                // saving the payment in database
                const paymentInfo = {
                    user: user.email,
                    totalAmount: totalPrice,
                    transanctionId: paymentIntent.id,
                    date: new Date(), // to do convert all date to utc, using moment js
                    cartItemIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                }

                const res = await axiosSecure.post('/payment', paymentInfo);
                if (res.data[0]?.insertedId) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your payment is successfull!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            }
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-primary btn-sm my-4" type="submit" disabled={!stripe || !clientSecret || transanctionId}>
                    Pay
                </button>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {transanctionId && <p className="text-green-400">Your transanction id: {transanctionId}</p>}
            </form>
        </div>
    );
};

export default Checkout;