const createNotification = (title, body) => {
  new Notification(title, { body });
};
export { createNotification };
