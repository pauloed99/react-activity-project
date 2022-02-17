import React from 'react';
import ActivitiesGroupsRowComponent from '../../components/activitiesGroupsRow/ActivitiesGroupsRowComponent';
import NavbarComponent from '../../components/navbar/NavbarComponent';


const ActivityPage: React.FC = () => {
  return (
    <>
      <NavbarComponent />
      <ActivitiesGroupsRowComponent />
    </>
  );
}

export default ActivityPage;