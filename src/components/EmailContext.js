import { createContext, useContext, useState } from 'react';

// Create a context
const EmailContext = createContext();

export function EmailProvider({ children }) {
  const [email, setEmail] = useState('');

  console.log('Email value:', email);
  
  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
}

export function useEmail() {
  return useContext(EmailContext);
}
