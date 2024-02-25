import React, { useState, useEffect, useRef } from 'react';
// import PageContext from "./PageContext";
import Table from '../components/Table1';
import Form from '../components/Form';
import { fetchData, updateData, deleteData, createData } from '../utils/api';
import EmailJS from "@emailjs/browser";
import Modal from '../components/Modal';

const HomePage = () => {
  const ref = useRef(null);
  const closeref = useRef(null);

  const [data, setData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState([]);


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

  const handleEdit = async (_id) => {
    
    setFormData({id:_id.id,name:_id.name, phoneNumber:_id.phoneNumber, email: _id.email, hobbies:_id.hobbies});
    setIsModalOpen(true);
  }
  const handleFormSubmit = async (
    id,
    name,
    phoneNumber,
    email,
    hobbies
  ) => {
    // Api call
    const response = await fetch(`http://localhost:4000/api/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phoneNumber, email, hobbies }),
    });
    const json = response.json();
    //logic to Editing a note
    const newitem = JSON.parse(JSON.stringify(formData));
    for (let index = 0; index < newitem.length; index++) {
      const element = newitem[index];
      if (element._id === id) {
        newitem[index].name = name;
        newitem[index].phoneNumber = phoneNumber;
        newitem[index].email = email;
        newitem[index].hobbies = hobbies;
        break;
      }
    }
    setData(newitem);
  };

  // const [proff, setproff] = useState({ id: "", name: "", phoneNumber: "", email: "", hobbies: ""});
  // const updateprofile = (currentitem) => {
  //   ref.current.click();
  //   setproff({ id: currentitem._id, name: currentitem.name, phoneNumber: currentitem.phoneNumber, email: currentitem.email, hobbies: currentproff.hobbies});
  // };

  const handleFormSubmit1 = async (newData) => {
    try {
      if (newData._id) {
        await updateData(newData._id, newData);
        const updatedData = data.map((item) =>
          item._id === newData._id ? newData : item
        );
        setData(updatedData);

        // Clear selected row after update
        setSelectedIds(null);
      }
      //   else {
      //     await createData(newData); // Create new data
      //     const response = await fetchData();
      // setData(response);
      //   }
      setIsModalOpen(false);
      setFormData({});
    } catch (err) {
      console.error(err);
    }
  };

  // const handleSendEmail = async () => {
  //   // Implement email sending logic using a library like nodemailer
  //   // ...
  // };

  const handleSendEmail = () => {
    if (selectedIds.length === 0) {
      alert('Please select at least one row to send.');
      return;
    }
    const emailData = {
      to: "priyanshporwal28@email.com",
      subject: "Table data",
      body: JSON.stringify(selectedIds),
    };

    EmailJS.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailData)
      .then(() => {
        alert("Email sent successfully!");
      })
      .catch((err) => {
        alert("Error sending email: " + err);
      });
  };
  return (
    <div>
      <button onClick={handleSendEmail} id="sendbutton"
        disabled={selectedIds.length === 0}
      >
        Send Selected ({selectedIds.length})
      </button>
      <Table data={data} onDelete={handleDelete} onEdit={handleEdit} onSelect={handleSelect} />
      {/* {isModalOpen && (
        <Form initialData={formData} onSubmit={handleFormSubmit} onClose={() => setIsModalOpen(false)} />
        )} */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Form initialData={formData} onSubmit={handleFormSubmit} />
        </Modal>
      )}
    </div>
  );
};

export default HomePage;


