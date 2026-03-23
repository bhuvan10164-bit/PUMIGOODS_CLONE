import axios from 'axios';

const api = axios.create({ baseURL: 'https://pumigoods-clone.onrender.com/api' });

export const fetchProducts = () => api.get('/products/');
export const fetchProduct = (id: number) => api.get(`/products/${id}/`);
export const fetchProductBySlug = (slug: string) => api.get(`/products/?slug=${slug}`);
