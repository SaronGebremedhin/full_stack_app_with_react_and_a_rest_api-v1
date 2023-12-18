export const api = {
    get: async (path, credentials = null) => {
      const url = `http://localhost:5000/api${path}`;
  
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      };
  
      if (credentials) {
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        options.headers.Authorization = `Basic ${encodedCredentials}`;
      }
  
      try {
        const response = await fetch(url, options);
        return response;
      } catch (error) {
        console.error('Error making GET request:', error);
        throw error;
      }
    },
  
    post: async (path, body, credentials = null) => {
      const url = `http://localhost:5000/api${path}`;
  
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(body),
      };
  
      if (credentials) {
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        options.headers.Authorization = `Basic ${encodedCredentials}`;
      }
  
      try {
        const response = await fetch(url, options);
        return response;
      } catch (error) {
        console.error('Error making POST request:', error);
        throw error;
      }
    },
  };