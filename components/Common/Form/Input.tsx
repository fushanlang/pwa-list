type Props = {
  label: string;
  isRequired: boolean;
  placeholder?: string;
  maxLength: number;
  state: string;
  handleChange: any;
};

const Input: React.FC<Props> = (props) => {
  const label = props.label;
  const placeholder = props.placeholder ?? "";
  const isRequired = props.isRequired;
  const maxLength = props.maxLength;
  const state = props.state;
  const handleChange = props.handleChange;

  return (
    <>
      <label className="block font-bold mb-2">
        {label}
        {isRequired && <span className="text-red-400 ml-2">*</span>}
      </label>
      <input
        className="ring-2 ring-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
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
