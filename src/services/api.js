import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001', // Your API server URL
});

export const getTemplates = () => api.get('/templates');
export const getTemplate = (id) => api.get(`/templates/${id}`);
export const createTemplate = (template) => api.post('/templates', template);
export const updateTemplate = (id, template) => api.put(`/templates/${id}`, template);
export const deleteTemplate = (id) => api.delete(`/templates/${id}`);