const Pill = ({ cat }) => {
  return (
    <button className='inline-flex text-center mr-2 p-2 text-[#ffffff] bg-[#2c2c2c] hover:bg-[#a970ffb7] rounded-[.25rem]'>
      {cat}
    </button>
  );
};

export default Pill;
