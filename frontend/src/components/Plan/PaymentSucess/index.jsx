import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { paymentVerification } from "../../../API/stripe/stripeAPI";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const paymentIntentId = searchParams.get('payment_intent');
  const { data, isError, isLoading, isSuccess, error } = useQuery({
    queryKey: ["verify-payment"],
    queryFn: () => paymentVerification(paymentIntentId),
  });
  console.log(data);
  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-100">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        {isLoading ? (
          <div className="flex flex-col items-center space-y-4">
            <FaSpinner className="animate-spin text-4xl text-blue-500" />
            <p className="text-lg text-gray-600">
              Verificando pagamento...
            </p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center space-y-4">
            <FaTimesCircle className="text-5xl text-red-500" />
            <p className="text-xl">Payment verification failed</p>
            <p className="text-red-500">{error.message}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <FaCheckCircle className="text-5xl text-green-500" />
            <h1 className="text-2xl font-bold">Pagamento realizado com sucesso!</h1>
            <p className="text-gray-600">
              Obrigado! Seu ID de pagamento é{" "}
              {paymentIntentId}.
            </p>
            <Link
              to="/dashboard/create-post"
              className="w-full flex items-center justify-center py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            >
              Ir para dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;