import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode' // import dependency
// If using v3 or earlier, use this instead:
// import jwtDecode from 'jwt-decode' // import dependency

const useAuth = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        // Decode the JWT token
        const decodedToken = jwtDecode(token);
        
        // Ensure the decoded token has the 'role' property
        if (decodedToken && decodedToken.role) {
          setRole(decodedToken.role);
        } else {
          setRole(null);  // If no role, set it to null
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setRole(null);  // If decoding fails, set role to null
      }
    } else {
      setRole(null);  // If no token is found, set role to null
    }
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return { role };
};

export default useAuth;
