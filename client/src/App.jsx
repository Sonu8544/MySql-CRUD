import React, { useState, useEffect, useCallback } from 'react';
import { contactAPI } from './services/api';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar';
import Modal from './components/Modal';

function App() {
  console.log('🎯 App component rendering...');
  
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, contactId: null, contactName: '' });

  console.log('📊 Current state - isFormOpen:', isFormOpen, 'editingContact:', editingContact);

  // Track form state changes
  useEffect(() => {
    console.log('🔄 Form state changed - isFormOpen:', isFormOpen);
  }, [isFormOpen]);

  // Load all contacts
  const loadContacts = useCallback(async () => {
    console.log('📡 Loading contacts...');
    setIsLoading(true);
    try {
      const response = await contactAPI.getAllContacts();
      console.log('✅ Contacts loaded:', response);
      setContacts(response.data);
      setFilteredContacts(response.data);
    } catch (error) {
      console.error('❌ Failed to load contacts:', error);
      showNotification(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load contacts on component mount
  useEffect(() => {
    console.log('🚀 App component mounted, loading contacts...');
    
    // Test API connection first
    const testConnection = async () => {
      try {
        console.log('🔍 Testing API connection...');
        const health = await contactAPI.healthCheck();
        console.log('✅ API connection successful:', health);
        loadContacts();
      } catch (error) {
        console.error('❌ API connection failed:', error);
        showNotification('Cannot connect to server. Please check if the server is running.', 'error');
      }
    };
    
    testConnection();
  }, [loadContacts]);

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Search contacts
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setFilteredContacts(contacts);
      setSearchTerm('');
      return;
    }

    setIsLoading(true);
    try {
      const response = await contactAPI.searchContacts(query);
      setFilteredContacts(response.data);
      setSearchTerm(query);
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Clear search
  const handleClearSearch = () => {
    setFilteredContacts(contacts);
    setSearchTerm('');
  };

  // Open form for new contact
  const handleAddContact = () => {
    console.log('🔄 Opening add contact form...');
    console.log('📊 Before state change - isFormOpen:', isFormOpen);
    setEditingContact(null);
    setIsFormOpen(true);
    console.log('✅ Form state set to open');
    console.log('📊 After state change - isFormOpen should be true');
  };

  // Open form for editing contact
  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setIsFormOpen(true);
  };

  // Close form
  const handleCloseForm = () => {
    console.log('🚪 Closing form...');
    setIsFormOpen(false);
    setEditingContact(null);
    console.log('✅ Form closed');
  };

  // Submit form (create or update)
  const handleSubmitForm = async (formData) => {
    console.log('📝 Submitting form data:', formData);
    setIsLoading(true);
    try {
      if (editingContact) {
        // Update existing contact
        console.log('🔄 Updating contact:', editingContact.id);
        await contactAPI.updateContact(editingContact.id, formData);
        showNotification('Contact updated successfully!');
      } else {
        // Create new contact
        console.log('➕ Creating new contact');
        const result = await contactAPI.createContact(formData);
        console.log('✅ Contact created:', result);
        showNotification('Contact created successfully!');
      }
      
      // Reload contacts
      await loadContacts();
      handleCloseForm();
    } catch (error) {
      console.error('❌ Form submission error:', error);
      showNotification(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Confirm delete
  const handleDeleteContact = (contactId, contactName) => {
    setDeleteConfirm({ show: true, contactId, contactName });
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setDeleteConfirm({ show: false, contactId: null, contactName: '' });
  };

  // Execute delete
  const handleConfirmDelete = async () => {
    setIsLoading(true);
    try {
      await contactAPI.deleteContact(deleteConfirm.contactId);
      showNotification('Contact deleted successfully!');
      await loadContacts();
      setDeleteConfirm({ show: false, contactId: null, contactName: '' });
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  try {
    return (
      <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contact Manager</h1>
              <p className="text-gray-600 mt-1">Manage your contacts with ease</p>
            </div>
            <button
              onClick={() => {
                console.log('🖱️ Add Contact button clicked');
                console.log('📊 Current isFormOpen before click:', isFormOpen);
                handleAddContact();
                console.log('📊 After handleAddContact call');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            >
              + Add Contact
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <SearchBar
          onSearch={handleSearch}
          onClear={handleClearSearch}
          isLoading={isLoading}
        />

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{contacts.length}</div>
              <div className="text-sm text-gray-600">Total Contacts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{filteredContacts.length}</div>
              <div className="text-sm text-gray-600">
                {searchTerm ? 'Search Results' : 'Displayed'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {contacts.filter(c => new Date(c.created_at).toDateString() === new Date().toDateString()).length}
              </div>
              <div className="text-sm text-gray-600">Added Today</div>
            </div>
          </div>
        </div>

        {/* Contact List */}
        <ContactList
          contacts={filteredContacts}
          onEdit={handleEditContact}
          onDelete={handleDeleteContact}
          isLoading={isLoading}
        />
      </main>

      {/* Contact Form Modal */}
      {console.log('🎭 Rendering modal with isFormOpen:', isFormOpen)}
      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingContact ? 'Edit Contact' : 'Add New Contact'}
      >
        <ContactForm
          contact={editingContact}
          onSubmit={handleSubmitForm}
          onCancel={handleCloseForm}
          isLoading={isLoading}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteConfirm.show}
        onClose={handleCancelDelete}
        title="Confirm Delete"
      >
        <div className="text-center">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <p className="text-gray-700 mb-6">
            Are you sure you want to delete <strong>{deleteConfirm.contactName}</strong>?
            <br />
            <span className="text-sm text-gray-500">This action cannot be undone.</span>
          </p>
          <div className="flex space-x-3">
            <button
              onClick={handleConfirmDelete}
              disabled={isLoading}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-medium transition-colors cursor-pointer"
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </button>
            <button
              onClick={handleCancelDelete}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'error' 
            ? 'bg-red-500 text-white' 
            : 'bg-green-500 text-white'
        }`}>
          <div className="flex items-center space-x-2">
            <span>{notification.type === 'error' ? '❌' : '✅'}</span>
            <span>{notification.message}</span>
          </div>
        </div>
      )}
    </div>
    );
  } catch (error) {
    console.error('❌ App component error:', error);
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Application Error</h1>
          <p className="text-gray-600 mb-4">Something went wrong. Please check the console for details.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
}

export default App;