import { useState, useEffect } from 'react';

const useAuth = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      import('jwt-decode')
        .then((module) => {
          const jwtDecode = module.jwtDecode; // Access named export
          const decodedToken = jwtDecode(token);
          setRole(decodedToken.role);
        })
        .catch((error) => {
          console.error("Error decoding token", error);
          setRole(null);
        });
    } else {
      setRole(null);
    }
  }, []);

  return { role };
};

export default useAuth;
