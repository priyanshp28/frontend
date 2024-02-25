import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import Form from '../components/Form';
import {fetchData,updateData,deleteData,createData} from '../utils/api';

const HomePage = () => {
    const [data, setData] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({});
  

    useEffect(() => {
        fetch('http://localhost:4000/api')
          .then(response => response.json())
          .then(value => setData(value));
      }, []);
  
    const handleSelect = (id) => {
      const newSelectedIds = [...selectedIds];
      if (newSelectedIds.includes(id)) {
        const index = newSelectedIds.indexOf(id);
        newSelectedIds.splice(index, 1);
      } else {
        newSelectedIds.push(id);
      }
      setSelectedIds(newSelectedIds);
    };
  
    const handleDelete = async (id) => {
      if (window.confirm('Are you sure you want to delete this data?')) {
        try {
          await deleteData(id);
          const newData = data.filter((item) => item._id !== id);
          setData(newData);
        } catch (err) {
          console.error(err);
          // Handle errors appropriately (e.g., display error message)
        }
      }
    };
  
    const handleEdit = (item) => {
      setFormData(item);
      setIsModalOpen(true);
    };
  
    const handleFormSubmit = async (newData) => {
      try {
        if (newData._id) {
          await updateData(newData._id, newData);
        } else {
          await createData(newData);
        }
        const response = await fetchData();
        setData(response);
        setIsModalOpen(false);
        setFormData({});
      } catch (err) {
        console.error(err);
      }
    };
  
    const handleSendEmail = async () => {
      // Implement email sending logic using a library like nodemailer
      // ...
    };
  return (
    <div>
      <button onClick={handleSendEmail}
        disabled={selectedIds.length === 0}
      >
        Send Selected ({selectedIds.length})
      </button>
      <Table data={data} onDelete={handleDelete} onEdit={handleEdit} onSelect={handleSelect} />
      {isModalOpen && (
        <Form initialData={formData} onSubmit={handleFormSubmit} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
    
export default HomePage;


