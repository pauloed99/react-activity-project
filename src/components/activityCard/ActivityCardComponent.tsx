import React, { useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import api from '../../apis/activityApi';
import Activity from '../../models/activity';
import DeleteActivityModalComponent from '../modals/activity/DeleteActivityModalComponent';
import EditActivityModalComponent from '../modals/activity/EditActivityModalComponent';
import styles from './activityCard.module.css';


interface ActivityProps {
  activity: Activity,
  setActivities: React.Dispatch<React.SetStateAction<Activity[] | undefined>>
}

const ActivityCardComponent: React.FC<ActivityProps> = (
  {activity, setActivities}
) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteActivity = async () => {
    setShowDeleteModal(true);
    setError(false);
    setLoading(false);
    try {
      await api.delete('activities/' + activity.id);
      const response = await api.get<Activity[]>(
        `activityGroups/${activity.activityGroup.id}/activities`
      );
      setActivities(response.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }

  return (
    <>
      <div id={styles.container}>
        <p onClick={() => setShowEditModal(true)}>{activity.description}</p>
        <BsFillTrashFill 
            style={{cursor: 'pointer', position: 'absolute', right: '0.5rem', alignSelf: 'center'}} 
            size="1.5rem" 
            onClick={deleteActivity}
        />
      </div>

      <EditActivityModalComponent 
        activity={activity}
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        setActivities={setActivities}
      />
      <DeleteActivityModalComponent
        error={error}
        loading={loading}
        setShowModal={setShowDeleteModal}
        showModal={showDeleteModal}
      />
    </>
  );
}

export default ActivityCardComponent;