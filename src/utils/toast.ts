import Toast from 'react-native-toast-message';

export const showSuccessToast = (message: string, description?: string) => {
  Toast.show({
    type: 'success',
    text1: message,
    text2: description,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 50,
  });
};

export const showErrorToast = (message: string, description?: string) => {
  Toast.show({
    type: 'error',
    text1: message,
    text2: description,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 50,
  });
};

export const showInfoToast = (message: string, description?: string) => {
  Toast.show({
    type: 'info',
    text1: message,
    text2: description,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 50,
  });
};

export const showWarningToast = (message: string, description?: string) => {
  Toast.show({
    type: 'info', // Using info type but with custom styling
    text1: '⚠️ ' + message,
    text2: description,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 50,
    props: {
      style: { borderLeftColor: '#FF9800' } // Orange warning color
    }
  });
};

// Limit reached toast specifically
export const showLimitReachedToast = () => {
  Toast.show({
    type: 'error', // Using error type for warning
    text1: '⚠️ Product Limit Reached',
    text2: 'Maximum 5 products allowed. Remove some to add more.',
    position: 'top',
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 50,
  });
};

// Success product added toast
export const showProductAddedToast = (productName: string) => {
  Toast.show({
    type: 'success',
    text1: '✅ Product Added',
    text2: `${productName} has been added successfully.`,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 50,
  });
};

// Product deleted toast
export const showProductDeletedToast = (productName: string) => {
  Toast.show({
    type: 'info',
    text1: '🗑️ Product Deleted',
    text2: `${productName} has been removed.`,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 50,
  });
};