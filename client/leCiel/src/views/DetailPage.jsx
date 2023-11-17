import loadingAni from '../lotties/Animation - 1700099882531.json';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ModalCom from '../components/Modal';
import server from '../api/axios';
import Lottie from 'lottie-react';

const DetailPage = () => {
  const [loading, setLoading] = useState(false);
  const [showData, setShowData] = useState([]);
  const [chapter, setChapter] = useState([]);
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState();
  const [auth, setAuth] = useState([]);

  const token = localStorage.getItem('access_token');
  const { mangaId } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await server.get(`/detail/${mangaId}`);

      setChapter(data.listChapter);
      setGenres(data.data.genres);
      setAuth(data.data.authors);
      setShowData(data.data);
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  const readChapter = async (val) => {
    try {
      navigate(`/detail/${mangaId}/chapter/${val}`);
    } catch (err) {
      setError(err.response.data);
    }
  };

  const setHistory = async () => {
    try {
      await server.post(`/history/${mangaId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className='w-full flex flex-col'>
      {loading && (
        <Lottie
          className='flex w-[15rem] place-self-center mt-[30]'
          animationData={loadingAni}
        />
      )}
      {!loading && (
        <article>
          <div className='h-72 w-full'>
            <img
              src={showData?.main_picture?.large}
              alt=''
              className='object-cover w-full h-full blur-sm opacity-50 rounded-b-md'
            />
          </div>
          <div className='flex gap-5 ml-10 -mt-[15rem] w-[30rem] relative'>
            <img
              src={showData.main_picture?.medium}
              alt=''
              className='rounded-md h-72'
            />
            <div className='flex flex-col justify-between'>
              <h2 className='text-6xl font-bold tracking-tight w-[50rem] text-[#ffffff]'>
                {showData.title}
              </h2>
              <div className=''>
                {auth.slice(0, 1).map((datum) => (
                  <h2 className='text-3xl font-semibold tracking-tight text-[#ffffff] w-fit'>
                    {datum.node.first_name} {datum.node.last_name}
                  </h2>
                ))}
                {genres.slice(0, 3).map((data) => (
                  <h2 className='text-md font-semibold tracking-tight text-[#ffffff] w-fit'>
                    {data.name}
                  </h2>
                ))}
              </div>
            </div>
          </div>
          <div className='flex flex-row gap-10'>
            <div className='ml-10 mt-5 w-[35rem]'>
              <h2 className='text-2xl font-semibold tracking-tight text-[#ffffff] w-fit'>
                Synopsis
              </h2>
              <div className='w-[35rem] h-80 mb-5 overflow-auto'>
                <p className='text-md mt-2 text-justify font-thin text-[#ffffff]'>
                  {showData.synopsis}
                </p>
              </div>
              {token && <ModalCom mangaId={showData.id} />}
            </div>
            <div className='w-[35rem] h-80'>
              <h2 className='text-2xl font-semibold tracking-tight text-[#ffffff] w-fit'>
                Chapter List
              </h2>
              <div className='mt-2 h-[28rem] overflow-auto'>
                {chapter === 'NoDataFound' && (
                  <h2 className='text-2xl font-semibold tracking-tight text-[#ffffff] w-fit'>
                    No Chapter Found
                  </h2>
                )}
                {!(chapter === 'NoDataFound') &&
                  chapter.map((datum) => (
                    <Link
                      onClick={() => {
                        readChapter(datum.id);
                        setHistory();
                      }}
                      className='flex items-center justify-between p-5 bg-[#2c2c2c] mt-2 w-[35rem] h-fit rounded-md shadow hover:bg-[#2c2c2c5f]'
                    >
                      <p className='mb-2 text-md h-fit w-96 font-semibold text-[#ffffff]'>
                        {datum?.attributes?.title}
                      </p>
                      <p className='font-normal w-28 text-[#ffffff]'>
                        chapter {datum?.attributes?.chapter}
                      </p>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </article>
      )}
    </main>
  );
};

export default DetailPage;
