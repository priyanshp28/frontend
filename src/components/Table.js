import React from 'react';
import HomePage from '../pages/Page';

const Table = ({ data, onDelete, OnEdit , onSelect }) => {
    return (
        <>
            <table id="students" >
                <thead>
                    <tr>
                        <th>
                            Select
                        </th>
                        <th >
                            ID
                        </th>
                        <th >
                            Name
                        </th>
                        <th>
                            Phone Number
                        </th>
                        <th >
                            Email
                        </th>
                        <th >
                            Hobbies
                        </th>
                        <th>
                            Actions
                        </th>
                        <th >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                        {data && data.map((item) => (
                            <tr key={item._id} >
                                <td >
                                    <input
                                        type="checkbox"
                                        onChange={() => onSelect(item._id)}
                                    />
                                </td>
                                <td>{item._id}</td>
                                <td>{item.name}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.email}</td>
                                <td>{item.hobbies}</td>
                                <td >
                                    <button
                                        onClick={() => onDelete(item._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td >
                                    <button
                                        onClick={() => OnEdit(item._id)}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}

                </tbody>
            </table>
        </>
    );
};
export default Table;