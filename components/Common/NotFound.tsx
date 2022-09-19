import Image from "next/image";

const NotFound: React.FC = () => {
  return (
    <div className="text-center text-lg pt-40">
      <Image src={"/not-found.svg"} alt="Not Found" width={400} height={300} objectFit="contain" />
      <p className="mt-8">This app may have been deleted.</p>
    </div>
  );
};

export default NotFound;
