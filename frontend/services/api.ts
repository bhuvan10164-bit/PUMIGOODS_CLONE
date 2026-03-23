import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8000/api' });

export const fetchProducts = () => {
    console.log("Fetching products from:", api.defaults.baseURL + '/products/');
    return api.get('/products/');
};
export const fetchProduct = (id: number) => api.get(`/products/${id}/`);
export const fetchProductBySlug = (slug: string) => api.get(`/products/?slug=${slug}`);
