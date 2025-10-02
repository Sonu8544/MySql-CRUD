import React from 'react';

const ContactList = ({ contacts, onEdit, onDelete, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!contacts || contacts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">📇</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Contacts Found</h3>
        <p className="text-gray-500">Start by adding your first contact!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">
                    {contact.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {contact.name}
                  </h3>
                  <p className="text-gray-600">{contact.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">📞</span>
                  <span className="text-gray-700">{contact.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">🎂</span>
                  <span className="text-gray-700">{contact.age} years old</span>
                </div>
              </div>
              
              <div className="mt-3 text-xs text-gray-500">
                Created: {new Date(contact.created_at).toLocaleDateString()}
                {contact.updated_at !== contact.created_at && (
                  <span className="ml-2">
                    • Updated: {new Date(contact.updated_at).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => onEdit(contact)}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm font-medium cursor-pointer"
                title="Edit contact"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => onDelete(contact.id, contact.name)}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm font-medium cursor-pointer"
                title="Delete contact"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
