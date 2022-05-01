const Forbidden: React.FC = () => {
  return (
    <div className="text-center text-lg">
      <div className="py-10">
        <img src={"/not-found.svg"} className="w-96 inline" />
        <p className="mt-8 ">You don't have permission to access this page.</p>
      </div>
    </div>
  );
};

export default Forbidden;
