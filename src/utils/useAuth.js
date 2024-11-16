// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const useAuth = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.role); // Extract the role from the token
      } catch (error) {
        console.error("Error decoding token", error);
        setRole(null);
      }
    } else {
      setRole(null);
    }
  }, []);

  return { role };
};

export default useAuth;
