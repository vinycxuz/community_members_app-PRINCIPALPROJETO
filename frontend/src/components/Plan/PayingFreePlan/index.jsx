import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaGift } from "react-icons/fa";
import { freePaymentVerification } from "../../../API/stripe/stripeAPI";
import { Link } from "react-router-dom";

const PayingFreePlan = () => {
  const { data, isError, isLoading, error, isSuccess } = useQuery({
    queryKey: ["free-plan"],
    queryFn: freePaymentVerification,
  });
  console.log(data);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <div className="p-8 bg-white rounded shadow-md w-80">
        <FaGift className="w-16 h-16 mx-auto text-green-500" />

        <h2 className="mt-6 text-2xl font-semibold text-center text-green-700">
          Plano gratuito
        </h2>

        <p className="mt-2 text-center text-gray-500">
          Ative o seu plano grátis para começar a criar posts.
        </p>
        <Link to='/dashboard/create-post'>
          <button
            className="mt-8 w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
          >
            Ativar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PayingFreePlan;