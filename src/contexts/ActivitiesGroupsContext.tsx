import React, { createContext, useState } from "react";
import ActivityGroup from "../models/activityGroup";

export interface IActivitiesGroupsContext {
    activitiesGroups: ActivityGroup[],
    setActivitiesGroups: React.Dispatch<React.SetStateAction<ActivityGroup[]>>,
}

export const defaultValue: IActivitiesGroupsContext = {
    activitiesGroups: [],
    setActivitiesGroups: () => {},   
}

const ActivitiesGroupsContext = createContext<IActivitiesGroupsContext>(defaultValue);

export const ActivitiesGroupsContextProvider: React.FC = ({children}) => {
    const [activitiesGroups, setActivitiesGroups] = useState(defaultValue.activitiesGroups);
    return (
        <ActivitiesGroupsContext.Provider value={{activitiesGroups, setActivitiesGroups}}>
            {children}
        </ActivitiesGroupsContext.Provider>
    )
}

export default ActivitiesGroupsContext;
