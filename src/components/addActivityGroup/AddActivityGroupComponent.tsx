import React, { useContext, useState } from 'react';
import api from '../../apis/activityApi';
import ActivityGroup from '../../models/activityGroup';

import styles from './addActivityGroup.module.css';
import AddActivityGroupModalComponent from '../modals/activityGroup/AddActivityGroupModalComponent';
import ActivitiesGroupsContext from '../../contexts/ActivitiesGroupsContext';


const AddActivityGroupComponent: React.FC = () => {
  const [showAddInput, setShowAddInput] = useState(false);
  const [inputValue, setInputValue] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activityGroup, setActivityGroup] = useState<ActivityGroup>();
  const {setActivitiesGroups} = useContext(ActivitiesGroupsContext);
  
  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setInputValue({[name]: value});
  }

  const addActivityGroup = async () => {
    setShowModal(true);
    setShowAddInput(false);
    setLoading(true);
    setError(false);
    try {
      const response = await api.post<ActivityGroup>(
        'activityGroups',
        inputValue,
      );
      setActivityGroup(response.data);
      const responseTwo = await api.get<ActivityGroup[]>('activityGroups');
      setActivitiesGroups(responseTwo.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }

  return (
    <>
      {
      !showAddInput ? 
        <div id={styles.card} onClick={() => setShowAddInput(true)}>
          <p>Novo Grupo +</p>
        </div>
      : 
        <div id={styles.addActivityGroup}>
          <input type="text" name="title" onChange={(e) => handleInputValue(e)}/>
          <button className="btn btn-primary" onClick={addActivityGroup}>Enter</button>       
        </div>
      }
      <AddActivityGroupModalComponent
        activityGroup={activityGroup}
        error={error}
        loading={loading}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </>
  );
}

export default AddActivityGroupComponent;