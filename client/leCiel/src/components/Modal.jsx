import { Modal } from 'flowbite-react';
import { useState } from 'react';
import server from '../api/axios';

const ModalCom = ({ mangaId, status, setUpListData, upList }) => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({
    mangaId,
    type: '',
  });

  const readingList = async (e) => {
    try {
      e?.preventDefault();
      await server.post('/readingList', data, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className='focus:outline-none max-w-fit text-white bg-[#a970ff] hover:bg-[#a970ffb7] focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2'
      >
        {status ? status : 'Add To Reading List'}
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className='bg-[#2b2b2b] '>
          <h2 className='text-[#ffffff]'>
            {status ? 'Edit Reading Status?' : 'Add To Reading List?'}
          </h2>
        </Modal.Header>
        <Modal.Body className='bg-[#2b2b2b]'>
          <label
            htmlFor='countries'
            className='block mb-2 text-md font-medium text-white '
          >
            Select Reading Status
          </label>
          <select
            id='countries'
            onChange={(e) => {
              status
                ? setUpListData({ type: e.target.value })
                : setData({ ...data, type: e.target.value });
            }}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#a970ffb7] focus:border-[#a970ffb7] block w-full p-2.5'
          >
            <option value=''>Select Status...</option>
            <option value='Reading'>Reading</option>
            <option value='On Hold'>On Hold</option>
            <option value='Plan To Read'>Plan To Read</option>
            <option value='Completed'>Completed</option>
          </select>
        </Modal.Body>
        <Modal.Footer className='bg-[#2b2b2b]'>
          <button
            className='focus:outline-none w-fit mt-1 text-white bg-[#a970ff] hover:bg-[#a970ffb7] focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2'
            onClick={() => {
              setOpenModal(false);
              status ? upList(mangaId) : readingList();
            }}
          >
            {status ? 'Edit' : 'Add'}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCom;
