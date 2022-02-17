import React, { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import api from '../../../apis/activityApi';
import ActivitiesGroupsContext from '../../../contexts/ActivitiesGroupsContext';
import Activity from '../../../models/activity';
import ActivityGroup from '../../../models/activityGroup';

interface EditActivityModalProps {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    activity: Activity,
    setActivities: React.Dispatch<React.SetStateAction<Activity[] | undefined>>
}

const EditActivityModalComponent: React.FC<EditActivityModalProps> = (
    {showModal, setShowModal, activity, setActivities}
) => {
    const [inputValue, setInputValue] = useState({});

    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        setInputValue({[name]: value});
    }  

    const editActivity = async () => {
        setShowModal(false);
        try {
            await api.put(
                'activities',
                {
                    ...inputValue,
                    id: activity.id,
                    activityGroup: activity.activityGroup,
                }
            );
            const response = await api.get<Activity[]>(
                `activityGroups/${activity.activityGroup.id}/activities`
            );
            console.log(response.data);
            setActivities(response.data);
        } catch (error) {console.log(error)}
    }

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Status de edição da atividade</Modal.Title>
            </Modal.Header>
                <Modal.Body style={{
                    display:'flex', 
                    justifyContent: 'center',
                }}> 
                    <input type="text" name="description" onChange={(e) => handleInputValue(e)}
                    defaultValue={activity.description} placeholder="Edite a atividade"/>       
                </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={editActivity}>
                    Save Changes
                </Button>
            </Modal.Footer>
            </Modal>
    );
}

export default EditActivityModalComponent;