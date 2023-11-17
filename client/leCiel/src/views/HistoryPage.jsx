import loadingAni from '../lotties/Animation - 1700099882531.json';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import server from '../api/axios';
import Lottie from 'lottie-react';

const HistoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [showHist, setShowHist] = useState([]);

  const fetchHist = async () => {
    try {
      setLoading(true);
      const { data } = await server.get('/history', {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setShowHist(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const delHist = async (val) => {
    try {
      await server.delete(`/history/${val}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      fetchHist();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHist();
  }, []);

  return (
    <div className='h-screen w-full ml-10 mr-10 flex flex-col'>
      <h2 className='text-2xl ml-5 mt-5 font-semibold tracking-tight text-[#ffffff] hover:text-[#a970ff] cursor-default h-fit w-fit'>
        Your Reading History
      </h2>
      <div className='h-5/6 mt-5 w-full items-center overflow-auto flex flex-col gap-2'>
        {loading && (
          <Lottie
            className='flex w-[15rem] place-self-center mt-[30]'
            animationData={loadingAni}
          />
        )}
        {!loading && !showHist?.length && (
          <div className='flex flex-col w-fit mt-[20rem] items-center cursor-default'>
            <h2 className='text-4xl font-semibold tracking-tight text-[#a970ff] w-fit'>
              You Haven't Read A Manga Yet
            </h2>
            <h2 className='text-4xl font-semibold tracking-tight text-[#a970ff] w-fit'>
              Your History Will be Shown Here
            </h2>
          </div>
        )}
        {!loading &&
          showHist?.map((datum) => (
            <>
              <Card
                mangaId={datum.mangaId}
                histId={datum.id}
                delHist={delHist}
              />
            </>
          ))}
      </div>
    </div>
  );
};

export default HistoryPage;
