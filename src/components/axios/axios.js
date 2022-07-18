import axios from 'axios';
const instance = axios.create({baseURL: 'https://ecommerce-apiii-backenddd.herokuapp.com',withCredentials: true });
// const instance = axios.create()
export default instance