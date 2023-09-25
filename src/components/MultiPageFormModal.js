import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const MultiPageFormModal = ({ showModal, handleClose }) => {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    page1Data: '',
    page2Data: '',
    page3Data: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Multi-Page Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {page === 1 && (
          <div>
            <h4>Page 1</h4>
            <input
              type="text"
              name="page1Data"
              value={formData.page1Data}
              onChange={handleInputChange}
              placeholder="Page 1 Input"
            />
          </div>
        )}
        {page === 2 && (
          <div>
            <h4>Page 2</h4>
            <input
              type="text"
              name="page2Data"
              value={formData.page2Data}
              onChange={handleInputChange}
              placeholder="Page 2 Input"
            />
          </div>
        )}
        {page === 3 && (
          <div>
            <h4>Page 3</h4>
            <input
              type="text"
              name="page3Data"
              value={formData.page3Data}
              onChange={handleInputChange}
              placeholder="Page 3 Input"
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {page !== 1 && (
          <Button variant="secondary" onClick={prevPage}>
            Previous
          </Button>
        )}
        {page !== 3 ? (
          <Button variant="primary" onClick={nextPage}>
            Next
          </Button>
        ) : (
          <Button variant="success" onClick={handleClose}>
            Submit
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default MultiPageFormModal;
