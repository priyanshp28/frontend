import React, { useState } from 'react';
import Modal from "./Modal"
import {fetchData} from "../utils/api"

const Form = ({ initialData={}, onSubmit,onClose}) => {
  const [formData, setFormData] = useState({name:"", phoneNumber:"",email:"",hobbies:"" });
  const [modelopen,setModelopen]=useState(false)
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async(event) => {
    // event.preventDefault();
    setFormData({name: formData.name, phoneNumber: formData.phoneNumber, email: formData.email, hobbies:formData.hobbies});
    const response = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setModelopen(false);
      await fetchData();
    // onClose(); // Close the modal after submission
  };


  return (
    <>
    
    <form onSubmit={handleSubmit} id="addrowform">
      <div className="mb-4">
        <label htmlFor="name" >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          />
      </div>
      <div className="mb-4">
        <label htmlFor="phoneNumber" >
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          />
      </div>
      <div className="mb-4">
        <label htmlFor="email" >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange} 
        />
      </div>
      <div className="mb-4">
        <label htmlFor="hobbies" >
          Hobbies
        </label>
        <textarea
          id="hobbies"
          name="hobbies"
          value={formData.hobbies}
          onChange={handleChange}
            />
      </div>
      <button
        id="createbtn" type="submit" >
        {initialData._id ? 'Update' : 'Create'}
      </button>
    </form>
    </>
  );
};

export default Form;
