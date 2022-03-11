import axios from 'axios';

// export default axios.create({
//   baseURL: 'http://localhost:5050/api',
// });

function handleApiError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response);
    if (error.response?.data?.error) {
      alert(error.response?.data?.error);
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    if (error.message === 'Network Error') {
      alert('Could not connect to server.');
    }
    console.log('Error', error.message);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error);
  }
}

export const httpClient = axios.create({ baseURL: 'http://localhost:5050/api' });

export const request = ({ ...options }) => {
  const onSuccess = (response) => response;
  const onError = handleApiError;

  return httpClient(options).then(onSuccess).catch(onError);
};
