const Forbidden = () => {
  return (
    <div className="text-center text-lg">
      <div className="bg-white py-10 rounded-lg">
        <img src={"/not-found.svg"} className="w-96 inline" />
        <p className="mt-8 ">You don't have permission to access this page.</p>
      </div>
    </div>
  );
};

export default Forbidden;
