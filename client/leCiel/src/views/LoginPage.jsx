import { RiTwitterFill, RiGoogleFill } from 'react-icons/ri';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import SvgComponent from '../components/Logo';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import server from '../api/axios';

const LoginPage = () => {
  const [session, setSession] = useState(null);
  const [logData, setLogData] = useState({
    email: '',
    password: '',
  });
  const [twitterData, setTwitterData] = useState({
    email: '',
    username: '',
    fullName: '',
  });
  const [error, setError] = useState();

  const navigate = useNavigate();
  const supabase = createClient(
    'https://rizdqerzbqcwjtxurilc.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpemRxZXJ6YnFjd2p0eHVyaWxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5NDcwOTgsImV4cCI6MjAxNTUyMzA5OH0.UZ5JMClHX8AWTIzI1qOUukhIKQJxbsxjL2QRMi8qefQ'
  );

  const reglogin = async (e) => {
    try {
      e.preventDefault();
      const { data } = await server.post('/login', logData);
      localStorage.setItem('access_token', data.token);
      navigate('/');
    } catch (err) {
      setError(err.response.data);
    }
  };

  const googleLogin = async (codeResponse) => {
    try {
      const { data } = await server.post('/google-auth', null, {
        headers: {
          token: codeResponse.code,
        },
      });

      localStorage.setItem('access_token', data);
      navigate('/');
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const twitterLogin = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: 'https://le-ciel.vercel.app/login',
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const checkSession = async () => {
    try {
      let { data } = await supabase.auth.getSession();

      setSession(data.session.user);
    } catch (err) {
      // setError(err);
    }
  };

  const twtData = async () => {
    try {
      setTwitterData({
        email: session.email,
        username: session.user_metadata.user_name,
        fullName: session.user_metadata.full_name,
      });

      const { data } = await server.post('/twitter-auth', twitterData);
      localStorage.setItem('access_token', data.token);
      navigate('/');
    } catch (err) {
      // console.log(err);
    }
  };

  if (session) twtData();

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <div className='h-full w-full flex justify-center items-center'>
      <div className='h-[30rem] w-fit flex flex-col items-center justify-center p-10 rounded-md bg-[#2b2b2b]'>
        <div className='flex text-[#a970ff] gap-2 text-4xl cursor-default'>
          <SvgComponent />
          <h2 className='text-4xl font-semibold mb-2 text-[#a970ff]'>Login</h2>
        </div>
        {error && <h1 className='text-red-400'>{error.message}</h1>}
        <form onSubmit={reglogin} className='w-96'>
          <div className='mb-6'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-[#ffffff]'
            >
              Your email
            </label>
            <input
              type='email'
              id='email'
              value={logData.email}
              onChange={(e) => {
                setLogData({ ...logData, email: e.target.value });
              }}
              className='bg-gray-200 border border-gray-300 text-black text-sm rounded-lg focus:ring-[#a970ff] focus:border-[#a970ff] block w-full p-2.5 '
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block mb-2 text-sm font-medium text-[#ffffff] '
            >
              Your password
            </label>
            <input
              type='text'
              id='password'
              value={logData.password}
              onChange={(e) => {
                setLogData({ ...logData, password: e.target.value });
              }}
              className='bg-gray-200 border border-gray-300 text-black text-sm rounded-lg focus:ring-[#a970ff] focus:border-[#a970ff] block w-full p-2.5 '
            />
          </div>
          <div className='w-full'>
            <Button />
          </div>
        </form>
        <h2 className='text-xl font-semibold mt-2 text-[#a970ff]'>
          Or Sign-In Via
        </h2>
        <div className='grid grid-cols-2 gap-3 mt-2 w-fit'>
          <button className='btn text-[#ffffff] w-fit' onClick={twitterLogin}>
            <RiTwitterFill className='text-4xl text-[#a970ff]' />
          </button>
          <button
            className='btn text-[#ffffff] w-fit'
            onClick={useGoogleLogin({
              onSuccess: googleLogin,
              flow: 'auth-code',
            })}
          >
            <RiGoogleFill className='text-4xl text-[#a970ff]' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
