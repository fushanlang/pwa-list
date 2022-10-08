type Props = { text: string };
const H1: React.FC<Props> = ({ text }) => {
  return <h1 className="text-3xl font-bold my-7">{text}</h1>;
};
export default H1;
