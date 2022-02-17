import React, {useState, useEffect, useContext} from 'react';
import { Spinner } from 'react-bootstrap';
import api from '../../apis/activityApi';
import ActivitiesGroupsContext from '../../contexts/ActivitiesGroupsContext';
import ActivityGroup from '../../models/activityGroup';
import ActivityGroupComponent from '../activityGroup/ActivityGroupComponent';
import AddActivityGroupComponent from '../addActivityGroup/AddActivityGroupComponent';

import styles from './activitiesGroupsRow.module.css';

const ActivitiesGroupsRowComponent: React.FC = () => {
  const {activitiesGroups, setActivitiesGroups} = useContext(ActivitiesGroupsContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllActivitiesGroups = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await api.get<ActivityGroup[]>('activityGroups');
        setActivitiesGroups(response.data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    }
    getAllActivitiesGroups(); 
  }, [])

  return (
    <>
      { 
        error ? <p>Não foi possível carregar os grupos de atividades!</p> :
        loading ? 
        <Spinner animation="border" role="status" /> :
        <div id={styles.container}>
          { 
            activitiesGroups.map((activityGroup) => (
              <ActivityGroupComponent 
                activityGroup={activityGroup}
                key={activityGroup.id}
              />
              )
            )
          }
          <AddActivityGroupComponent />
        </div>
      }
    </>
  );
}

export default ActivitiesGroupsRowComponent;