import Label from "./Label";

type Props = {
  id?: string;
  label?: string;
  labelMessage?: string;
  isRequired?: boolean;
  inputClass?: string;
  placeholder?: string;
  maxLength: number;
  state: string;
  handleChange: any;
};
const Input: React.FC<Props> = (props) => {
  const id = props.id;
  const label = props.label ?? "";
  const labelMessage = props.labelMessage ?? "";
  const isRequired = props.isRequired;
  const inputClass = props.inputClass ?? "w-full";
  const placeholder = props.placeholder ?? "";
  const maxLength = props.maxLength;
  const state = props.state;
  const handleChange = props.handleChange;

  return (
    <>
      <Label id={id} label={label} labelMessage={labelMessage} isRequired={isRequired} />
      <input
        id={id}
        className={`ring-2 ring-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400 ${inputClass}`}
        type="text"
        maxLength={maxLength}
        placeholder={placeholder}
        value={state}
        onChange={handleChange}
      />
    </>
  );
};

export default Input;