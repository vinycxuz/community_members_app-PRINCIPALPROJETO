import axios  from 'axios';

const URL = 'http://localhost:3000/api/plan/create';

export const createPlan = async (plan) => {
    console.log(plan);
    const response = await axios.post(URL, plan,
    {
      withCredentials: true
    });
    return response.data;    
}

export const getPlans = async () => {
    const plans = await axios.get('http://localhost:3000/api/plan');
    return plans.data;
}

export const getPlan = async (id) => {
  const plan = await axios.get(`${URL}/${id}`);
  return plan.data;
}



