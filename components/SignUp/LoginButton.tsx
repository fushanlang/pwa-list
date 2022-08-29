import Image from "next/image";

type Props = {
  label: string;
  imagePath: string;
  handleLogin: () => void;
};

const LoginButton: React.FC<Props> = ({ label, imagePath, handleLogin }) => {
  return (
    <button
      className="flex items-center justify-center mx-2 my-2 w-56 h-10 font-bold border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
      onClick={handleLogin}
    >
      <div className="mr-3 w-6 pt-1">
        <Image alt={label} src={imagePath} width={50} height={50} objectFit="contain" />
      </div>
      {label}
    </button>
  );
};
export default LoginButton;
