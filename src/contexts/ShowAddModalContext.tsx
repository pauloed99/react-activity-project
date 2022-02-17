import React, { createContext, useState } from "react";

export interface IShowAddModalContext {
    showAddModal: boolean,
    setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>,
}

export const defaultValue: IShowAddModalContext = {
    showAddModal: false,
    setShowAddModal: () => {},   
}

const ShowAddModalContext = createContext<IShowAddModalContext>(defaultValue);

export const ShowAddModalContextProvider: React.FC = ({children}) => {
    const [showAddModal, setShowAddModal] = useState(defaultValue.showAddModal);
    return (
        <ShowAddModalContext.Provider value={{showAddModal, setShowAddModal}}>
            {children}
        </ShowAddModalContext.Provider>
    )
}

export default ShowAddModalContext;
