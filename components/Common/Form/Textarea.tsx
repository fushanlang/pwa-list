import Label from "./Label";

type Props = {
  id?: string;
  label?: string;
  labelMessage?: string;
  isRequired?: boolean;
  maxLength: number;
  state: string;
  handleChange: any;
};
const Textarea: React.FC<Props> = (props) => {
  const id = props.id;
  const label = props.label ?? "";
  const isRequired = props.isRequired;
  const maxLength = props.maxLength;
  const state = props.state;
  const handleChange = props.handleChange;

  return (
    <>
      <Label id={id} label={label} isRequired={isRequired} />
      <textarea
        id={id}
        className="ring-2 ring-gray-300 form-textarea mt-1 block w-full rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
        rows={10}
        maxLength={maxLength}
        value={state}
        onChange={handleChange}
      ></textarea>
    </>
  );
};

export default Textarea;
