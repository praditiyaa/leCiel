import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineFullscreenExit } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import server from '../api/axios';

const ReadChapter = () => {
  const [chapterImg, setChapterImg] = useState({});
  const [chapter, setChapter] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const { mangaId, chapterId } = useParams();

  const navigate = useNavigate();

  const fetchImage = async () => {
    try {
      const { data } = await server.get(`/chapter/${chapterId}/${page}`);

      setChapterImg(data.result);
    } catch (err) {
      setError(err);
    }
  };

  const keyInput = (e) => {
    const event = window.e ? window.e : e;
    if (event.keyCode === 37) setPage(page - 1);
    if (event.keyCode === 39) setPage(page + 1);
  };

  const toDetail = () => {
    navigate(`/detail/${mangaId}`);
  };

  if (chapterImg === 'NoMorePage') toDetail();

  useEffect(() => {
    fetchImage();
  }, [page]);

  return (
    <div
      onKeyDown={keyInput}
      className='flex h-screen w-screen justify-center items-center bg-[#1d1c1c]'
    >
      <div className='flex flex-col w-1/2'>
        <AiOutlineFullscreenExit
          onClick={toDetail}
          className='w-[5vh] h-[5vh] text-[#2b2b2b] hover:text-[#a970ff] cursor-pointer'
        />
        <button
          onClick={() => {
            setPage(page - 1);
          }}
          className='btn h-[95vh] w-full'
        ></button>
      </div>
      <img src={chapterImg} alt='' className='h-screen' />
      <button
        onClick={() => {
          setPage(page + 1);
        }}
        className='btn h-screen w-1/2'
      ></button>
    </div>
  );
};

export default ReadChapter;
