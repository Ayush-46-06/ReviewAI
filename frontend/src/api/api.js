import axios from "axios";

export const generateReviews = async (stars, businessId) => {

  const res = await axios.post(
    "/api/reviews/generate",
    { stars, businessId }
  );

  return res.data;
};