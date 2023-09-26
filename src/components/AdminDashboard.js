import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const AdminDashboard = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="row">
        <div className="col-md-4">
          <Card style={{height:200}}>
            <Card.Body>
              <Button
                variant="primary"
                onClick={() => setShowAddUserModal(true)}
              >
                Add User
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4">
          <Card style={{height:200}}>
            <Card.Body>
              <Button
                variant="primary"
                onClick={() => setShowAddCategoryModal(true)}
              >
                Add Category
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4">
          <Card style={{height:200}}>
            <Card.Body>
              <Button
                variant="primary"
                onClick={() => setShowAddProductModal(true)}
              >
                Add Product
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-4">
          <Card style={{height:200}}>
            <Card.Body>
            <h3>View Users</h3>
              {/* ViewUsers component goes here */}
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4">
          <Card style={{height:200}}>
            <Card.Body>
                <h3>View Categories</h3>
              {/* ViewCategories component goes here */}
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4">
          <Card style={{height:200}}>
            <Card.Body>
            <h3>View Products</h3>
              {/* ViewProducts component goes here */}
            </Card.Body>
          </Card>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
