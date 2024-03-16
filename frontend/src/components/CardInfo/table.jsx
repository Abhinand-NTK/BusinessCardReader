

import React, { useState, useEffect } from 'react';
import userService from '../../api/userapi';
import Modal from '../Modal/Modal';
import EditableRow from '../EditableRow/EditableRow';
import { toast } from 'react-toastify';

function Tables() {
  const [visitingCards, setVisitingCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [id_, setId] = useState(null);

  useEffect(() => {
    fetchVisitingCards();
  }, []);

  const fetchVisitingCards = async () => {
    try {
      const response = await userService.getuploadfile();
      setVisitingCards(response.data);
    } catch (error) {
      console.error('Error fetching visiting cards:', error);
    }
  };

  const handleEdit = (id) => {
    const RowData = visitingCards.find(card => card.id === id);
    setSelectedRowData(RowData);
    setIsModalOpen(true);
    setAction("Edit");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const handleConfirmEditordelete = async () => {
    setIsModalOpen(false);
    if (action === 'Edit') {
      setSelectedRow(selectedRowData);
    }
    if (action === 'Delete') {
      const response = await userService.Deletefile(id_);
      if (response.status === 204) {
        toast.success("The Details are removed");
        setVisitingCards(visitingCards.filter(item => item.id !== id_));
      }
    }
  };

  const handleDelete = async (id) => {
    setId(id);
    setIsModalOpen(true);
    setAction("Delete");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredVisitingCards = visitingCards.filter(card => {
    return (
      (card.name && card.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (card.email && card.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (card.phone_number && card.phone_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (card.website && card.website.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredVisitingCards.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="p-2 border rounded-md mb-4 w-full md:w-96"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className='border border-gray-200'>
              <th className="px-6 py-3 border-2 bg-gray-50 text-center text-xs font-medium text-black  uppercase tracking-wider border-b">No</th>
              <th className="px-6 py-3 border-2 bg-gray-50 text-center text-xs font-medium text-black  uppercase tracking-wider border-b">Name</th>
              <th className="px-6 py-3 border-2 bg-gray-50 text-center text-xs font-medium text-black  uppercase tracking-wider border-b">Email</th>
              <th className="px-6 py-3 border-2 bg-gray-50 text-center text-xs font-medium text-black  uppercase tracking-wider border-b">Phone Number</th>
              <th className="px-6 py-3 border-2 bg-gray-50 text-center text-xs font-medium text-black  uppercase tracking-wider border-b">Website</th>
              <th className="px-6 py-3 border-2 bg-gray-50 text-center text-xs font-medium text-black  uppercase tracking-wider border-b">Actions</th>
            </tr>
          </thead>
          <tbody >
            {currentCards.map((card, index) => (
              <tr className='border border-gray-200' key={card.id}>
                <td className='px-6 border-2 py-4 whitespace-nowrap border-b'>{index + 1}</td>
                <td className="px-6 border-2  py-4 whitespace-nowrap border-b">{card.name}</td>
                <td className="px-6 border-2 py-4 whitespace-nowrap border-b">{card.email}</td>
                <td className="px-6 border-2 py-4 whitespace-nowrap border-b">{card.phone_number}</td>
                <td className="px-6 border-2 py-4 whitespace-nowrap border-b">{card.website}</td>
                <td className="px-6 border-2 py-4 whitespace-nowrap border-b">
                  <button className="text-blue-600 bg-blue-300 rounde-sm hover:text-blue-900 mr-2" onClick={() => handleEdit(card.id)}>Edit</button>
                  <button className="text-red-600 bg-red-300 hover:text-red-900 rounded-sm" onClick={() => handleDelete(card.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav className="mt-4" aria-label="Pagination">
        <ul className="flex justify-center">
          {Array.from({ length: Math.ceil(filteredVisitingCards.length / cardsPerPage) }).map((_, index) => (
            <li key={index}>
              <button
                className={`px-4 py-1 border rounded-md ${currentPage === index + 1 ? 'bg-yellow-500 text-white' : 'hover:bg-gray-200'}`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <Modal isOpen={isModalOpen} action={action} onClose={handleCloseModal}  onConfirm={handleConfirmEditordelete} />
      {selectedRow && <EditableRow rowData={selectedRow} onClose={handleCloseModal} details={fetchVisitingCards} />}
    </div>
  );
}

export default Tables;
