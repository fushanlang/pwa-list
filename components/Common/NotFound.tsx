const NotFound: React.FC = () => {
  return (
    <div className="text-center text-lg">
      <div className="py-10">
        <img src={"/not-found.svg"} className="w-96 inline" />
        <p className="mt-8 ">This app may have been deleted.</p>
      </div>
    </div>
  );
};

export default NotFound;
