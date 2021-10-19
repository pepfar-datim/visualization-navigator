export const generateUID = (idLength) => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHJIKLKMNOPQRSTUVWXYZ";
  let uid = "";
  for (let i = 0; i < idLength; i++) {
    uid += chars[Math.floor(Math.random() * chars.length)];
  }
  return uid;
};
