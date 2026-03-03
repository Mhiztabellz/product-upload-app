// This file is now just a wrapper for toast
import { showLimitReachedToast } from './toast';

export const sendLimitReachedNotification = () => {
  showLimitReachedToast();
};

export const setupNotifications = async () => {
  // No setup needed for toast
  return true;
};