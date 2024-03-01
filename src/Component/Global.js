
const BASE_URL = 'http://localhost:5000';

export const authenticateUser = (username) => {
try {
    const apiUrl = `${BASE_URL}/user-reports?userId=${username}`;
    return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        return response.json().then(errorData => {
          throw new Error(errorData.message || 'Failed to authenticate user');
        });
      }
      
      return response.json();
    })
    .catch(error => {
     
      throw error;
    });
    
} catch (error) {
    console.log("errorWhileCallingApi",error);
    return error
}
};



export const createUser = (userData) => {
  const apiUrl = `${BASE_URL}/create-user`;

  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(errorData => {
        throw new Error(errorData.message || 'Failed to create user');
      });
    }
    return response.json();
  })
  .catch(error => {
    throw error;
  });
};





