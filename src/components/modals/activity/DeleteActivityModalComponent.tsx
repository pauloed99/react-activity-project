import React from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';

interface DeleteActivityProps {
    loading: boolean,
    error: boolean,
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
}

const DeleteActivityModalComponent: React.FC<DeleteActivityProps> = ({
    loading, error, showModal, setShowModal
}) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Status de exclusão da atividade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
            error ? <p>Não foi possível deletar a atividade!</p> :
            loading ? 
            <Spinner animation="border" role="status" /> :
            <p>A atividades foi deletada</p>
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

export default DeleteActivityModalComponent;