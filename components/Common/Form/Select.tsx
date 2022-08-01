type Props = {
  label: string;
  isRequired: boolean;
  state: string;
  list: any;
  handleChange: any;
};

const Select: React.FC<Props> = (props) => {
  const label = props.label;
  const isRequired = props.isRequired;
  const state = props.state;
  const list = props.list;
  const handleChange = props.handleChange;

  return (
    <>
      <label className="block font-bold mb-2">
        {label}
        {isRequired && <span className="text-red-400 ml-2">*</span>}
      </label>
      <select
        className="ring-2 ring-gray-300 w-44 py-2 px-3 rounded leading-tight focus:outline-none focus:ring focus:ring-green-400"
        value={state}
        onChange={handleChange}
      >
        <option value="">-</option>
        {list.map((val) => (
          <option key={val.value} value={val.value}>
            {val.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
