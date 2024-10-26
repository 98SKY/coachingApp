import { json } from "react-router-dom";
export const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log("BASE_URL:", BASE_URL);
export const registerInstitute = (userData) => {
  const apiUrl = `${BASE_URL}/register`;

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
      if (data && data.message) {
        return data.message;
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
      if (data && data.message) {
        return data;
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
      if (data && data.message) {
        return data;
      } else {
        throw new Error("Failed to fetch Data from UI");
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const courseName = (coachingId) => {
  const apiUrl = `${BASE_URL}/courses?coachingId=${coachingId}`;
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.error || "Failed to fetch Courses Name");
        });
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.message) {
        return data;
      } else {
        throw new Error("facing issue to fetch Courses name");
      }
    })
    .catch((error) => {
      throw error;
    });
};
