type Props = { text: string };
const H2: React.FC<Props> = ({ text }) => {
  return <h2 className="text-2xl font-bold my-4">{text}</h2>;
};
export default H2;
