import { json } from "react-router-dom";
export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const userDetails = (userData) => {
  const apiUrl = `${BASE_URL}/detailsOfUser`;

  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.error || "Failed to load user");
        });
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.message) {
        return data;
      } else {
        throw new Error("Failed to create user");
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const dashBoardCount = (dashBoardData) => {
  const apiUrl = `${BASE_URL}/dashBoardCount`;

  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dashBoardData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.error || "Failed to load dasboard count");
        });
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.message) {
        return data;
      } else {
        throw new Error("Failed to fetch dashboard count");
      }
    });
};
