import loadingAni from '../lotties/Animation - 1700099882531.json';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import server from '../api/axios';
import Lottie from 'lottie-react';

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [showData, setShowData] = useState([]);
  const [pagination, setPagination] = useState();
  const [error, setError] = useState();

  const fetchData = async (val) => {
    try {
      setLoading(true);
      let data;
      if (!val) {
        data = (await server.get('/')).data;
      } else {
        data = (await server.get(`/${val}`)).data;
      }

      setPagination(data.paging);
      setShowData(data.data);
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className='w-full ml-10 mr-10'>
      <div className='flex w-full ml-5 mt-5 items-center justify-between'>
        <h5 className='mb-2 text-2xl font-semibold text-[#ffffff] w-fit hover:text-[#a970ff] cursor-default'>
          Trending Now
        </h5>
        <div className='grid grid-cols-2'>
          <Link>
            <MdNavigateBefore
              onClick={() => {
                pagination.previous ? fetchData(pagination.previous) : '';
              }}
              className='text-2xl text-[#ffffff] mr-2 hover:text-[#a970ff]'
            />
          </Link>
          <Link>
            <MdNavigateNext
              onClick={() => {
                fetchData(pagination.next);
              }}
              className='text-2xl text-[#ffffff] mr-10 hover:text-[#a970ff]'
            />
          </Link>
        </div>
      </div>
      <div className='flex justify-center'>
        {loading && <Lottie className='-mt-36' animationData={loadingAni} />}
        <article className='grid mt-5 grid-cols-2 h-[45rem] gap-2 overflow-auto'>
          {!loading && showData.map((datum) => <Card datum={datum.node} />)}
        </article>
      </div>
    </main>
  );
};

export default HomePage;
