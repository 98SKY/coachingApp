import { json } from "react-router-dom";
export const BASE_URL = "http://localhost:3000";
export const BASE_URL1 = "http://192.168.0.101:3001";

export const registerInstitute = (userData) => {
  const apiUrl = `${BASE_URL}/register-institute`;

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
          throw new Error(errorData.error || "Failed to create user");
        });
      }
      return response.json();
    })
    .then((data) => {
      // Check if the response contains a message property indicating success
      if (data && data.message) {
        return data.message; // Return success message
      } else {
        throw new Error("Failed to create user");
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const login = (username, password, userType) => {
  const apiUrl = `${BASE_URL}/login`;

  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(username, password, userType),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.error || "Failed to login");
        });
      }
      return response.json();
    })
    .then((data) => {
      // Check if the response contains a message property indicating success
      if (data && data.message) {
        return data; // Return success message
      } else {
        throw new Error("facing issue to login");
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const recoverPassword = (userData) => {
  const apiUrl = `${BASE_URL}/recoverPassword`;
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
          throw new Error(errorData.error || "Failed to Recover Password ");
        });
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.message) {
        return data;
      } else {
        throw new Error("facing issue to recover your password");
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const instituteName = () => {
  const apiUrl = `${BASE_URL}/instituteName`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.error || "Failed to fetch Institute Name");
        });
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.message) {
        return data;
      } else {
        throw new Error("facing issue to fetch Institute name");
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const userList = (userData) => {
  const apiUrl = `${BASE_URL}/users-inInstitute`;

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
      // Check if the response contains a message property indicating success
      if (data && data.message) {
        return data; // Return success message
      } else {
        throw new Error("Failed to create user");
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const profileData = (userData) => {
  const apiUrl = `${BASE_URL}/user-profile`;

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
          throw new Error(errorData.error || "Failed to load user from UI");
        });
      }
      return response.json();
    })
    .then((data) => {
      // Check if the response contains a message property indicating success
      if (data && data.message) {
        return data; // Return success message
      } else {
        throw new Error("Failed to fetch Data from UI");
      }
    })
    .catch((error) => {
      throw error;
    });
};

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
      // Check if the response contains a message property indicating success
      if (data && data.message) {
        return data; // Return success message
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
