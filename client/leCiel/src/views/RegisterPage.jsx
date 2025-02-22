import { Form, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [regData, setRegData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState();

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        'https://api.p2.lc2s5.foxhub.space/register',
        regData
      );
      navigate('/login');
      setError();
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className='h-screen flex flex-col items-center -mt-24 justify-center'>
      {error && <h1 className='text-red-400'>{error.message}</h1>}
      <Form className='w-96' onSubmit={register}>
        <div className='mb-6'>
          <label
            htmlFor='text'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Full Name
          </label>
          <input
            type='text'
            id='fullName'
            value={regData.fullName}
            onChange={(e) => {
              setRegData({ ...regData, fullName: e.target.value });
            }}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Your email
          </label>
          <input
            type='email'
            id='email'
            value={regData.email}
            onChange={(e) => {
              setRegData({ ...regData, email: e.target.value });
            }}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Your password
          </label>
          <input
            type='text'
            id='password'
            value={regData.password}
            onChange={(e) => {
              setRegData({ ...regData, password: e.target.value });
            }}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Submit
        </button>
      </Form>
    </div>
  );
};

export default RegisterPage;
