import { useState, createContext} from "react";
import PropTypes from 'prop-types';

const NumberContext = createContext();
NumberProvider.propTypes = {
    children: PropTypes.node,
    
  };
  

 function NumberProvider({children}) {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <NumberContext.Provider value={{phoneNumber , setPhoneNumber}}>
      {children}
    </NumberContext.Provider>
  );
}

export {NumberContext, NumberProvider};