import axios from 'axios';

const api = axios.create({ baseURL: 'http://127.0.0.1:8000/api' });

export const fetchProducts = () => api.get('/products/');
export const fetchProduct = (id: number) => api.get(`/products/${id}/`);
export const fetchProductBySlug = (slug: string) => api.get(`/products/?slug=${slug}`);
