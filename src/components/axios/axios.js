import axios from 'axios';
const instance = axios.create({baseURL: 'https://ecommerce-apiii-backenddd.herokuapp.com'});
export default instance