import Image from "next/image";

const Forbidden: React.FC = () => {
  return (
    <div className="text-center text-lg">
      <div className="pt-40">
        <Image src={"/not-found.svg"} alt="Forbidden" width={400} height={300} objectFit="contain" />
        <p className="mt-8">You don't have permission to access this page.</p>
      </div>
    </div>
  );
};

export default Forbidden;
