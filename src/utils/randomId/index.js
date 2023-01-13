export const randomId = () => {
  const idNumber = Math.floor(Math.random() * (10 - 1) + 0);
  return idNumber;
}