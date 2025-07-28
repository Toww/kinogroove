// This file is implemented for future versions, and to make environments handling easier.
// We can test the process.env.NODE_ENV and return the corresponding API URL when we'll need to.

export const API_URL = import.meta.env.VITE_API_URL;
