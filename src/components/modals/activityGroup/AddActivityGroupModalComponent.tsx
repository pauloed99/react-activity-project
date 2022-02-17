import React from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import ActivityGroup from '../../../models/activityGroup';

interface AddActivityGroupModalProps {
    loading: boolean,
    error: boolean,
    activityGroup: ActivityGroup | undefined,
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
}

const AddActivityGroupModalComponent: React.FC<AddActivityGroupModalProps> = ({
    loading, activityGroup, error, showModal, setShowModal
}) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Status de criação do grupo de atividades</Modal.Title>
        </Modal.Header>
            <Modal.Body>
                {
                    error ? <p>Não foi possível criar o grupo de atividades!</p> :
                    loading ? 
                    <Spinner animation="border" role="status" /> :
                    <p>Grupo de atividades com o nome {activityGroup?.title} foi criado</p>
                }
            </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={() => setShowModal(false)}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
  );
}

export default AddActivityGroupModalComponent;