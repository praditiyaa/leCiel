import loadingAni from '../lotties/Animation - 1700099882531.json';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import server from '../api/axios';
import Lottie from 'lottie-react';

const ReadingListPage = () => {
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState([]);
  const [upListData, setUpListData] = useState({});

  const fetchList = async () => {
    try {
      setLoading(true);
      const { data } = await server.get('/readingList', {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setShowList(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const upList = async (val) => {
    try {
      await server.patch(`/readingList/${val}`, upListData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      fetchList();
    } catch (err) {
      console.log(err);
    }
  };

  const delFav = async (val) => {
    try {
      await server.delete(`/readingList/${val}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      fetchList();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='h-screen w-full ml-10 mr-10 flex flex-col'>
      <h2 className='text-2xl ml-5 mt-5 font-semibold tracking-tight text-[#ffffff] hover:text-[#a970ff] cursor-default h-fit w-fit'>
        Your Reading List
      </h2>
      <div className='h-5/6 mt-5 w-full items-center overflow-auto flex flex-col gap-2'>
        {loading && (
          <Lottie
            className='flex w-[15rem] place-self-center mt-[30]'
            animationData={loadingAni}
          />
        )}
        {!loading && !showList?.length && (
          <div className='flex flex-col w-fit mt-[20rem] items-center cursor-default'>
            <h2 className='text-4xl font-semibold tracking-tight text-[#a970ff] w-fit'>
              You Haven't Add a Manga Into Your Reading List
            </h2>
            <h2 className='text-4xl font-semibold tracking-tight text-[#a970ff] w-fit'>
              Your Favorite Manga Will be Shown Here
            </h2>
          </div>
        )}
        {!loading &&
          showList?.map((datum) => (
            <>
              <Card
                mangaId={datum.mangaId}
                status={datum.type}
                favId={datum.id}
                delFav={delFav}
                upListData={upListData}
                upList={upList}
                setUpListData={setUpListData}
              />
            </>
          ))}
      </div>
    </div>
  );
};

export default ReadingListPage;
