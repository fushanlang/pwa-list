import Label from "./Label";

type Props = {
  id: string;
  label?: string;
  labelMessage?: string;
  isRequired?: boolean;
  maxLength: number;
  state: string;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
const Textarea: React.FC<Props> = ({ id, label = "", isRequired, maxLength, state, handleChange }) => {
  return (
    <>
      <Label id={id} label={label} isRequired={isRequired} />
      <textarea
        id={id}
        className="ring-2 ring-gray-300 mt-1 block w-full rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
        rows={10}
        maxLength={maxLength}
        value={state}
        onChange={handleChange}
      ></textarea>
    </>
  );
};

export default Textarea;
