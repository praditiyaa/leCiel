import { createClient } from '@supabase/supabase-js';
import { RiChatHistoryFill } from 'react-icons/ri';
import { googleLogout } from '@react-oauth/google';
import { IoHome, IoLogOut } from 'react-icons/io5';
import { BsBookmarksFill } from 'react-icons/bs';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import SvgComponent from './Logo';

const Navbar = () => {
  const supabase = createClient(
    'https://rizdqerzbqcwjtxurilc.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpemRxZXJ6YnFjd2p0eHVyaWxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5NDcwOTgsImV4cCI6MjAxNTUyMzA5OH0.UZ5JMClHX8AWTIzI1qOUukhIKQJxbsxjL2QRMi8qefQ'
  );

  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      googleLogout();
      localStorage.clear();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex bg-[#1d1c1c]'>
      <div className='w-[18rem] p-6 h-screen gap-3 bg-[#2b2b2b] flex flex-col justify-between rounded-r-lg'>
        <div className='flex flex-col gap-1'>
          <Link to={'/'} className='flex text-[#a970ff] gap-2 text-4xl'>
            <SvgComponent />
            <h2 className='text-4xl font-semibold mb-2 text-[#a970ff]'>
              LeCiel
            </h2>
          </Link>
          <Link
            to={'/'}
            className='flex items-center gap-2 hover:bg-[#a970ff] p-2 rounded-md'
          >
            <IoHome className='text-xl text-[#ffffff]' />
            <h2 className='text-2xl font-semibold text-[#ffffff]'>Home</h2>
          </Link>
          <Link
            to={'/readingList'}
            className='flex items-center gap-2 hover:bg-[#a970ff] p-2 rounded-md'
          >
            <BsBookmarksFill className='text-xl text-[#ffffff]' />
            <h2 className='text-2xl font-semibold text-[#ffffff]'>
              Reading List
            </h2>
          </Link>
          <Link
            to={'/history'}
            className='flex items-center gap-2 hover:bg-[#a970ff] p-2 rounded-md'
          >
            <RiChatHistoryFill className='text-xl text-[#ffffff]' />
            <h2 className='text-2xl font-semibold text-[#ffffff]'>History</h2>
          </Link>
        </div>
        {token && (
          <Link
            onClick={signOut}
            className='flex justify items-center gap-2 hover:bg-[#a970ff] p-2 rounded-md'
          >
            <IoLogOut className='text-xl text-[#ffffff]' />
            <h2 className='text-2xl font-semibold text-[#ffffff]'>Logout</h2>
          </Link>
        )}
      </div>
      <div className='flex w-full'>
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
