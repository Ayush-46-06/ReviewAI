import axios from "axios";

export const generateReviews = async (stars, businessId) => {

  const res = await axios.post(
    "http://localhost:5000/api/reviews/generate",
    { stars, businessId }
  );

  return res.data.reviews;
};