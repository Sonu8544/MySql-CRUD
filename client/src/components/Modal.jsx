import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  console.log('🎭 Modal render - isOpen:', isOpen, 'title:', title);
  if (!isOpen) {
    console.log('🚫 Modal not open, returning null');
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" style={{zIndex: 9999}}>
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay - only closes when clicking the actual background */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={(e) => {
            console.log('🖱️ Background clicked, closing modal');
            // Only close if clicking the background itself, not child elements
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
          style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
        ></div>

        {/* Modal panel - positioned relative to prevent background clicks */}
        <div 
          className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
          onClick={(e) => {
            // Stop propagation to prevent background click
            e.stopPropagation();
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 cursor-pointer"
            >
              <span className="sr-only">Close</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mt-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
