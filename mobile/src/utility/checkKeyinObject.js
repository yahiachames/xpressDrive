export const checkKeyInObject = (object, key) =>
  Object.prototype.hasOwnProperty.call(object, key);
