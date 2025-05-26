import React, { createContext, useState } from 'react'
import PickupScheduling from '../pages/PickupScheduling';
export const AppContext = createContext(); 

const AppContextProvider = ({ children }) => {

    // Define the value to provide
    const [pickupDate,setPickupDate] = useState(null);
  
    const schedulePickup = (data) => {

      setPickupDate(data);
      console.log("Pickup scheduled:", data);
      
    };

    const value = {
      pickupDate,
      schedulePickup
    };

  return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
