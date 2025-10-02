import axios from 'axios';

const API_BASE_URL = 'http://localhost:7777/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    console.log('📡 Full URL:', `${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Contact API functions
export const contactAPI = {
  // Get all contacts
  getAllContacts: async () => {
    try {
      console.log('📡 Fetching all contacts from:', API_BASE_URL + '/contacts');
      const response = await api.get('/contacts');
      console.log('✅ Contacts response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching contacts:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch contacts');
    }
  },

  // Get single contact by ID
  getContactById: async (id) => {
    try {
      const response = await api.get(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch contact');
    }
  },

  // Create new contact
  createContact: async (contactData) => {
    try {
      console.log('➕ Creating contact with data:', contactData);
      console.log('📡 POST to:', API_BASE_URL + '/contacts/create');
      const response = await api.post('/contacts/create', contactData);
      console.log('✅ Contact created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error creating contact:', error);
      throw new Error(error.response?.data?.message || 'Failed to create contact');
    }
  },

  // Update contact
  updateContact: async (id, contactData) => {
    try {
      console.log('🔄 Updating contact:', id, 'with data:', contactData);
      console.log('📡 PUT to:', API_BASE_URL + `/contacts/edit/${id}`);
      const response = await api.put(`/contacts/edit/${id}`, contactData);
      console.log('✅ Contact updated successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error updating contact:', error);
      throw new Error(error.response?.data?.message || 'Failed to update contact');
    }
  },

  // Delete contact
  deleteContact: async (id) => {
    try {
      console.log('🗑️ Deleting contact:', id);
      console.log('📡 DELETE to:', API_BASE_URL + `/contacts/${id}`);
      const response = await api.delete(`/contacts/${id}`);
      console.log('✅ Contact deleted successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error deleting contact:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete contact');
    }
  },

  // Search contacts
  searchContacts: async (query) => {
    try {
      const response = await api.get(`/contacts/search/${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search contacts');
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('Server is not responding');
    }
  }
};

export default api;
