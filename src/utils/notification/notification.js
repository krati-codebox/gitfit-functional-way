import { store } from 'react-notifications-component';

export const Notification = ( title, message, type) => {
  store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "bottom-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
};