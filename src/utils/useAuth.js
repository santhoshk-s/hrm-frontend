import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode' // import dependency
// If using v3 or earlier, use this instead:
// import jwtDecode from 'jwt-decode' // import dependency

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
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return { role };
};

export default useAuth;
