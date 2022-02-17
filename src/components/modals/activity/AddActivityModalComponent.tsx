import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import api from '../../../apis/activityApi';
import Activity from '../../../models/activity';

interface AddActivityModalProps {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    setActivities: React.Dispatch<React.SetStateAction<Activity[] | undefined>>
    activityGroupId: number,
}

const AddActivityModalComponent: React.FC<AddActivityModalProps> = ({
    showModal, setShowModal, setActivities, activityGroupId
}) => {
    const [inputValue, setInputValue] = useState({});

    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        setInputValue({[name]: value});
    }  

    const addActivity = async () => {
        setShowModal(false);
        try {
            await api.post(
                `activityGroups/${activityGroupId}/activities`,
                inputValue,
            );
            const response = await api.get<Activity[]>(
                `activityGroups/${activityGroupId}/activities`,
            );
            setActivities(response.data);
        } catch (error) {console.log(error)}
    }

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Status de Criação da atividade</Modal.Title>
            </Modal.Header>
                <Modal.Body style={{
                    display:'flex', 
                    justifyContent: 'center',
                }}> 
                    <input type="text" name="description" onChange={(e) => handleInputValue(e)}
                    placeholder="Adicione a atividade"/>       
                </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={addActivity}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddActivityModalComponent;