import axios from 'axios';

const BASE_URL = "http://localhost:4000/api"; 

export const fetchData = async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
};

export const createData = async (data) => {
  const response = await axios.post(`${BASE_URL}/add`, data);
  return response.data;
};

export const updateData = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/update/${id}`, data);
  return response.data;
};

export const deleteData = async (id) => {
  const response = await axios.delete(`${BASE_URL}/delete/${id}`);
  return response.data;
};

// export const sendEmail = async (data) => {
//   const response = await axios.post('/api/email', data);
//   return response.data;
// };

