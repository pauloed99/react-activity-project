import React from 'react';
import { Modal, Spinner, Button } from 'react-bootstrap';

interface DeleteActivityGroupModalProps {
  loading: boolean,
  error: boolean,
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
}

const DeleteActivityGroupModalComponent: React.FC<DeleteActivityGroupModalProps> = (
  {loading, error, showModal, setShowModal}
) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
          <Modal.Title>Status de exclusão do grupo de atividades</Modal.Title>
      </Modal.Header>
        <Modal.Body>
            {
              error ? <p>Não foi possível deletar o grupo de atividades!</p> :
              loading ? 
              <Spinner animation="border" role="status" /> :
              <p>O Grupo de atividades foi deletado</p>
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

export default DeleteActivityGroupModalComponent;