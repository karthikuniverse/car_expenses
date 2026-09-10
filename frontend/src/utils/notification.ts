import { notification, message } from 'antd';

// Globally configure Ant Design message to appear at top-right
message.config({
  top: 24,
  duration: 3,
  maxCount: 3,
});

// Globally configure Ant Design notification to appear at top-right
notification.config({
  placement: 'topRight',
  top: 24,
  duration: 3.5,
});

export interface ToastOptions {
  description?: string;
  duration?: number;
  key?: string;
}

/**
 * Global Notification / Toast helper that displays alerts at the top-right
 */
export const showToast = {
  success: (msg: string, description?: string, options?: ToastOptions) => {
    notification.success({
      message: msg,
      description: description,
      placement: 'topRight',
      duration: options?.duration || 3.5,
      key: options?.key,
      className: 'custom-topright-toast',
    });
  },

  error: (msg: string, description?: string, options?: ToastOptions) => {
    notification.error({
      message: msg,
      description: description,
      placement: 'topRight',
      duration: options?.duration || 4,
      key: options?.key,
      className: 'custom-topright-toast',
    });
  },

  info: (msg: string, description?: string, options?: ToastOptions) => {
    notification.info({
      message: msg,
      description: description,
      placement: 'topRight',
      duration: options?.duration || 3.5,
      key: options?.key,
      className: 'custom-topright-toast',
    });
  },

  warning: (msg: string, description?: string, options?: ToastOptions) => {
    notification.warning({
      message: msg,
      description: description,
      placement: 'topRight',
      duration: options?.duration || 3.5,
      key: options?.key,
      className: 'custom-topright-toast',
    });
  },
};

// Convenient individual helper functions
export const showSuccess = (msg: string, description?: string) => showToast.success(msg, description);
export const showError = (msg: string, description?: string) => showToast.error(msg, description);
export const showInfo = (msg: string, description?: string) => showToast.info(msg, description);
export const showWarning = (msg: string, description?: string) => showToast.warning(msg, description);

export default showToast;
