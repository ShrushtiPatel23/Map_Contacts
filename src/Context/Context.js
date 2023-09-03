
import { createContext, useReducer, useContext } from "react";
import { contactReducer } from "./Reducer";

var Contact = createContext()
const Context = ({children}) => {

    const contact = {
        'firstName': '',
        'lastName': '',
        'activity': ''
    }
    //console.log(products)

    const [state, dispatch] = useReducer(contactReducer,{
        contact: contact,
        allData:[]
    })


    return <Contact.Provider value={{state,dispatch}}>{children}</Contact.Provider>
}

export default Context;


export const CartState = () => {
    return useContext(Contact)
}