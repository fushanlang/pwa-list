const NotFound: React.FC = () => {
  return (
    <div className="text-center text-lg">
      <div className="bg-white py-10 rounded-lg">
        <img src={"/not-found.svg"} className="w-96 inline" />
        <p className="mt-8 ">This app may have been deleted.</p>
      </div>
    </div>
  );
};

export default NotFound;
