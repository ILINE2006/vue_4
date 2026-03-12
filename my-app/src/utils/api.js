const API = process.env.VUE_APP_API;

export const loginRequest = (user) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.VUE_APP_API}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
           reject(data); 
        } else {
           resolve(data.data.user_token);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};


export const registerRequest = (user) => {
  return new Promise((resolve, reject) => {
    fetch(`${API}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
           reject(data);
        } else {
           resolve(data.data.user_token);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}; 

export const logoutRequest = (token) => {
  return fetch(`${API}/logout`, {
    headers: {
      'Authorization': `Bearer ${token}` 
    }
  }).then(response => response.json());
};