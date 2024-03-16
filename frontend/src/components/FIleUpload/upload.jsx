

import React, { useState } from "react";
import userService from "../../api/userapi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FileUpload = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedCard(file);
    };

    const handleUpload = async () => {
        if (!selectedCard) {
            alert("Please select an image to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedCard); 

        try {
            const response =  await userService.fileupload(formData);
            console.log(response?.status);
            if (response?.status === 201) {
                toast.success("File uploaded successfully");
                setSelectedCard(null);
                navigate('/manage-cards');
                toast.success("File is added in the database successfully");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image.");
        }
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className="max-w-lg w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {
                            selectedCard ? <img src={URL.createObjectURL(selectedCard)} alt="" /> : <>
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </>
                        }
                    </div>
                    <input id="dropzone-file" onChange={handleFileChange} type="file" className="hidden" />
                </label>
                <button onClick={handleUpload} className="w-full mt-4 bg-white text-gray-900 font-semibold py-2 px-4 border dark:hover:bg-gray-800 rounded">
                    Upload Image
                </button>
            </div>
        </div>
    );
};

export default FileUpload;
