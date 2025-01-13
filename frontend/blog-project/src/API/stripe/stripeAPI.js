import axios  from 'axios';

const URL = 'http://localhost:3000/api/payment';

export const paymentIntent = async (planId) => {
    console.log(planId);
    const response = await axios.post(`${URL}/checkout`, {
      subscriptionPlanId: planId
    },
    {
      withCredentials: true
    });
    return response.data;    
}

export const paymentVerification = async (paymentId) => {
  const response = await axios.get(`${URL}/verify/${paymentId}`, 
    {
      withCredentials: true
    }
  )
  return response.data;
}

export const freePaymentVerification = async () => {
  const response = await axios.get(`${URL}/free`, 
    {
      withCredentials: true
    }
  )
  return response.data;
}