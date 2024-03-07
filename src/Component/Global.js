
export const BASE_URL = 'http://localhost:3000';


export const registerInstitute = (userData) => {
  const apiUrl = `${BASE_URL}/register-institute`;

  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData),
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(errorData => {
        throw new Error(errorData.error || 'Failed to create user');
      });
    }
    return response.json();
  })
  .then(data => {
    // Check if the response contains a message property indicating success
    if (data && data.message) {
      return data.message; // Return success message
    } else {
      throw new Error('Failed to create user');
    }
  })
  .catch(error => {
    throw error;
  });
};

export const login = (username, password, userType) =>{
  const apiUrl = `${BASE_URL}/login`;
  
  return fetch(apiUrl,{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(username, password, userType),
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(errorData => {
        throw new Error(errorData.error || 'Failed to login');
      });
    }
    return response.json();
  })
  .then(data => {
    // Check if the response contains a message property indicating success
    if (data && data.message) {
      return data.message; // Return success message
    } else {
      throw new Error('Failed to login');
    }
  })
  .catch(error => {
    throw error;
  });
}





