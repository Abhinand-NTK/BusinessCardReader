import React, { useState } from 'react';
import userService from '../../api/userapi';
import { toast } from 'react-toastify';



const EditableRow = ({ rowData, onClose,details }) => {
    const [editedData, setEditedData] = useState({ ...rowData });

    const handleChange = (e, key) => {
        setEditedData({
            ...editedData,
            [key]: e.target.value
        });
    };

    const handleSave = async() => {
        console.log("Edited data:", editedData);
        const response = await userService.editfile(editedData,editedData['id'])
        if(response.status == 200){
            toast.success("Data Updated Sucessfully")
            onClose()
            details()
        }
    };

    const handleclose = () => {
        onClose();
    };


    return (
        <tr>
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="fixed inset-0 bg-gray-500 opacity-60"></div>
                    <div className="relative bg-white w-auto p-8 rounded shadow-lg">
                        <div className="absolute top-0 right-0">

                        </div>
                        <td>
                            <input type="text" value={editedData.name} onChange={(e) => handleChange(e, 'name')} />
                        </td>
                        <td>
                            <input type="text" value={editedData.email} onChange={(e) => handleChange(e, 'email')} />
                        </td>
                        <td>
                            <input type="text" value={editedData.phone_number} onChange={(e) => handleChange(e, 'phone_number')} />
                        </td>
                        <td>
                            <input type="text" value={editedData.website} onChange={(e) => handleChange(e, 'website')} />
                        </td>
                        <td>
                            <button className='bg-green-500 text-white px-4 py-1 rounded' onClick={handleSave}>Save</button>
                        </td>
                        <td>
                            <button className='bg-red-500 text-white px-4 py-1 rounded' onClick={handleclose}>Close</button>
                        </td>
                    </div>
                </div>
            </div>
        </tr>
    );
};

export default EditableRow;
