type Props = { text: string };
const H3: React.FC<Props> = ({ text }) => {
  return <h3 className="text-xl font-semibold my-4">{text}</h3>;
};
export default H3;
