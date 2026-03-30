import { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [onClose, duration]);

  const getToastStyles = () => {
    const baseStyles = {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      padding: '12px 24px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      zIndex: 1000,
      animation: 'slideIn 0.3s ease-out',
      maxWidth: '300px',
      wordWrap: 'break-word',
    };

    switch (type) {
      case 'success':
        return { ...baseStyles, backgroundColor: '#10b981' };
      case 'error':
        return { ...baseStyles, backgroundColor: '#ef4444' };
      case 'warning':
        return { ...baseStyles, backgroundColor: '#f59e0b' };
      default:
        return { ...baseStyles, backgroundColor: '#6b7280' };
    }
  };

  return (
    <div style={getToastStyles()}>
      {message}
      <button
        onClick={onClose}
        style={{
          marginLeft: '12px',
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;