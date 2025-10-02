import React, { useState, useEffect } from 'react';

const ContactForm = ({ contact, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        age: contact.age || ''
      });
    }
  }, [contact]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age < 0 || formData.age > 150) {
      newErrors.age = 'Age must be a number between 0 and 150';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    console.log('📝 Input changed:', e.target.name, 'value:', e.target.value);
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto"
      onClick={(e) => {
        // Prevent clicks inside the form container from closing the modal
        e.stopPropagation();
      }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {contact ? 'Edit Contact' : 'Add New Contact'}
      </h2>
      
      <form 
        onSubmit={handleSubmit} 
        className="space-y-4"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            disabled={isLoading}
            autoFocus
            style={{
              width: '100%',
              backgroundColor: 'white', 
              color: 'black',
              border: '2px solid #007bff',
              padding: '12px',
              fontSize: '16px',
              borderRadius: '4px',
              outline: 'none',
              pointerEvents: 'auto'
            }}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            disabled={isLoading}
            style={{
              width: '100%',
              backgroundColor: 'white', 
              color: 'black',
              border: '2px solid #007bff',
              padding: '12px',
              fontSize: '16px',
              borderRadius: '4px',
              outline: 'none',
              pointerEvents: 'auto'
            }}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            disabled={isLoading}
            style={{
              width: '100%',
              backgroundColor: 'white', 
              color: 'black',
              border: '2px solid #007bff',
              padding: '12px',
              fontSize: '16px',
              borderRadius: '4px',
              outline: 'none',
              pointerEvents: 'auto'
            }}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            Age *
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="0"
            max="150"
            placeholder="Enter age"
            disabled={isLoading}
            style={{
              width: '100%',
              backgroundColor: 'white', 
              color: 'black',
              border: '2px solid #007bff',
              padding: '12px',
              fontSize: '16px',
              borderRadius: '4px',
              outline: 'none',
              pointerEvents: 'auto'
            }}
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age}</p>
          )}
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 cursor-pointer'
            } text-white`}
          >
            {isLoading ? 'Processing...' : (contact ? 'Update Contact' : 'Add Contact')}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white rounded-md font-medium transition-colors focus:ring-2 focus:ring-gray-500 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
