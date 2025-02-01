import axios from "axios";

const API_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(
  "https://api.jsonserve.com/Uw5CrX"
)}`;

export const fetchQuizData = async () => {
  try {
    const response = await axios.get(API_URL);
    if (response.status === 200) {
      return JSON.parse(response.data.contents);
    } else {
      throw new Error("Failed to fetch quiz data");
    }
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return null;
  }
};
