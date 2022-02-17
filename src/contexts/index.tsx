import React from 'react';
import { ActivitiesGroupsContextProvider } from './ActivitiesGroupsContext';
import { ShowAddModalContextProvider } from './ShowAddModalContext';


const GlobalContext: React.FC = ({children}) => {
  return (
    <ActivitiesGroupsContextProvider>
      <ShowAddModalContextProvider>
        {children}
      </ShowAddModalContextProvider>
    </ActivitiesGroupsContextProvider>
  );
}

export default GlobalContext;