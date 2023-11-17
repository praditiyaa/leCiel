import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import server from '../api/axios';
import ModalCom from './Modal';

export default function Card({
  datum,
  mangaId,
  histId,
  delHist,
  status,
  delFav,
  upList,
  setUpListData,
}) {
  const [showData, setShowData] = useState([]);
  const [error, setError] = useState();

  const navigate = useNavigate();

  const cardData = async () => {
    try {
      const { data } = await server.get(`/detail/${mangaId}`);

      setShowData(data.data);
    } catch (err) {
      setError(err.response.data);
    }
  };

  const showDetail = (val) => {
    navigate(`/detail/${val}`);
  };

  useEffect(() => {
    cardData();
  }, []);

  return (
    <div
      className={
        'flex flex-row h-56 items-center bg-[#2c2c2c] rounded-lg shadow hover:bg-[#2c2c2c5f]'
      }
    >
      <div className='h-56 w-56'>
        <img
          className='object-cover w-full h-full rounded-lg'
          src={
            mangaId
              ? showData?.main_picture?.medium
              : datum?.main_picture?.medium
          }
          alt=''
        />
      </div>
      <div
        className={
          mangaId
            ? 'flex flex-col justify-between p-4 w-[60rem] leading-normal'
            : 'flex flex-col justify-between p-4 w-[30rem] leading-normal'
        }
      >
        <h5
          onClick={() => {
            showDetail(mangaId ? mangaId : datum.id);
          }}
          className='mb-2 text-2xl font-bold tracking-tight  text-[#ffffff] w-fit hover:text-[#a970ff] cursor-pointer'
        >
          {mangaId ? showData?.title : datum.title}
        </h5>
        <p className='mb-3 font-normal text-justify h-28 overflow-auto text-[#ffffff] '>
          {mangaId ? showData?.synopsis : datum.synopsis}
        </p>
        <div className='flex gap-2 h-fit'>
          {mangaId && (
            <button
              onClick={() => {
                status ? delFav(mangaId) : delHist(histId);
              }}
              className='focus:outline-none self-center w-36 h-fit text-white bg-[#a970ff] hover:bg-[#a970ffb7] focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2'
            >
              {status ? 'Remove Like' : 'Delete History'}
            </button>
          )}
          {status && (
            <ModalCom
              mangaId={mangaId}
              status={status}
              upList={upList}
              setUpListData={setUpListData}
            />
          )}
        </div>
      </div>
    </div>
  );
}
