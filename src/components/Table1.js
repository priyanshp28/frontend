import React from "react";

const Table = ({data, onDelete, onEdit ,onSelect}) => {
  return (
    <>
      <table id="students">
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Hobbies</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item) => (
            <tr key={item._id}>
              <td>
              <input type="checkbox"  onChange={() => onSelect(item._id)}/>
              </td>
              <td>{item.name}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.email}</td>
              <td>{item.hobbies}</td>
              <td>
              <button onClick={() => onDelete(item._id)}> Delete  </button>
              </td>
              <td>
                <button onClick={() => onEdit(item._id)}> Update  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
