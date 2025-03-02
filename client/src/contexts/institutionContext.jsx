import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const InstitutionContext = createContext();

// Provider Component
export const InstitutionProvider = ({ children }) => {
  const [institutionData, setInstitutionData] = useState([]);

  return (
    <InstitutionContext.Provider
      value={{ institutionData, setInstitutionData }}
    >
      {children}
    </InstitutionContext.Provider>
  );
};

export const useInstitutionList = () => {
  const context = useContext(InstitutionContext);
  if (!context) {
    throw new Error(
      'useInstitutionList must be used within a InstitutionProvider'
    );
  }
  return context;
};

// PropTypes Validation
InstitutionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
