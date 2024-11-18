import { useState, useEffect } from 'react';

const useAuth = () => {
  const [role, setRole] = useState('employee'); // Default to 'admin'

  useEffect(() => {
    const storedRole = localStorage.getItem('role'); // Get role directly from localStorage
    if (storedRole) {
      setRole(storedRole); // Use the stored role if available
    } else {
      const token = localStorage.getItem('token');
      if (token) {
        import('jwt-decode')
          .then((module) => {
            const jwtDecode = module.default; // Access the default export
            const decodedToken = jwtDecode(token); // Decode the token
            console.log("Decoded Token:", decodedToken);
            setRole(decodedToken.role || 'employee'); // Fallback to 'admin' if no role
          })
          .catch((error) => {
            console.error("Error decoding token", error);
            setRole('employee'); // Fallback role
          });
      } else {
        setRole('employee'); // Fallback if no token
      }
    }
  }, []);

  return { role };
};

export default useAuth;
