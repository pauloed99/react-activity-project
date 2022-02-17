import React from 'react';
import { Modal, Spinner, Button } from 'react-bootstrap';

interface EditActivityGroupModalProps {
    loading: boolean,
    error: boolean,
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
}

const EditActivityGroupModalComponent: React.FC<EditActivityGroupModalProps> = (
  {loading, error, showModal, setShowModal}
) => {
    return (
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Status de edição do grupo de atividades</Modal.Title>
        </Modal.Header>
          <Modal.Body>
              {
                error ? <p>Não foi possível editar o grupo de atividades!</p> :
                loading ? 
                <Spinner animation="border" role="status" /> :
                <p>O Grupo de atividades foi editado</p>
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

export default EditActivityGroupModalComponent;