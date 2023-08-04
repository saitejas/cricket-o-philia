export const writeToStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const readFromStorage = (key: string) => {
  const data = localStorage.getItem(key);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  }
  return null;
};
