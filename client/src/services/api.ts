// This is WIP for future development
// COMMENTED OUT FOR DEBUGGING- LIEBE
// export const fetchRecords = async () => {
//     return [];
// };
export const authFetch = (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
