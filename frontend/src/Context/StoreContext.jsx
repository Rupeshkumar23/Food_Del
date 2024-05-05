/* eslint-disable react/prop-types */
import { createContext } from "react";
import { food_list } from "../assets/assets";
export const StoreContext =createContext(null)

const StoreContexProvider =(props)=>{

    const contextValue={
        food_list
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContexProvider;