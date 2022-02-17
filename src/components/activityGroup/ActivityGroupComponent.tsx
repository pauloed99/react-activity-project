import React, { useContext, useEffect, useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import api from '../../apis/activityApi';
import ActivitiesGroupsContext from '../../contexts/ActivitiesGroupsContext';
import ShowAddModalContext from '../../contexts/ShowAddModalContext';
import ActivityGroup from '../../models/activityGroup';
import ActivityCardListComponent from '../activityCardList/ActivityCardListComponent';
import DeleteActivityGroupModalComponent from '../modals/activityGroup/DeleteActivityGroupModalComponent';
import EditActivityGroupModalComponent from '../modals/activityGroup/EditActivityGroupModalComponent';
import styles from './activityGroup.module.css';


interface ActivityGroupProps {
  activityGroup: ActivityGroup
}

const ActivityGroupComponent: React.FC<ActivityGroupProps> = ({activityGroup}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddInput, setShowAddInput] = useState(false);
  const [inputValue, setInputValue] = useState({});
  const {setActivitiesGroups} = useContext(ActivitiesGroupsContext);
  const {setShowAddModal} = useContext(ShowAddModalContext);

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setInputValue({[name]: value});
  }
  
  const deleteActivityGroup = async (id:number) => {
    setShowDeleteModal(true);
    setLoading(true);
    setError(false);
    try {
      await api.delete('activityGroups/' + id);
      const responseTwo = await api.get<ActivityGroup[]>('activityGroups/');
      setActivitiesGroups(responseTwo.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }

  const editActivityGroup = async () => {
    setShowEditModal(true);
    setShowAddInput(false);
    setLoading(true);
    setError(false);
    try {
      await api.put('activityGroups', 
        {
          id: activityGroup.id,
          ...inputValue,
        }
      );
      const responseTwo = await api.get<ActivityGroup[]>('activityGroups');
      setActivitiesGroups(responseTwo.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }

  return (
    <div id={styles.container}>
      {
      !showAddInput ? 
        <header>
          <p onClick={() => setShowAddInput(true)}>{activityGroup.title}</p>
          <BsFillTrashFill 
            style={{cursor: 'pointer', position: 'absolute', right: '0.5rem'}} 
            size="1.5rem" 
            onClick={() => deleteActivityGroup(activityGroup.id)}
          />
        </header>
      : 
      <header>
        <div id={styles.addActivityGroup}>
          <input type="text" name="title" onChange={(e) => handleInputValue(e)}/>
          <button className="btn btn-primary" onClick={editActivityGroup}>Enter</button>       
        </div>
      </header>
      }
      
      <main>
        <ActivityCardListComponent activityGroup={activityGroup}/>
        <p id={styles.addCard} onClick={() => setShowAddModal(true)}>Novo Card +</p>
      </main>
      <DeleteActivityGroupModalComponent 
        loading={loading}
        error={error}
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
      />
      <EditActivityGroupModalComponent 
        loading={loading}
        error={error}
        showModal={showEditModal}
        setShowModal={setShowEditModal}
      />
    </div>
  );
}

export default ActivityGroupComponent;