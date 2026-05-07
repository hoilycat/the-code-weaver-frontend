export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${API_BASE_URL}${path}`;
};
