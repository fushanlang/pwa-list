import Label from "./Label";

type Props = {
  id: string;
  label: string;
  labelMessage?: string;
  isRequired: boolean;
  state: string;
  list: any;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select: React.FC<Props> = ({ id, label, labelMessage, isRequired, state, list, handleChange }) => {
  return (
    <>
      <Label id={id} label={label} labelMessage={labelMessage} isRequired={isRequired} />
      <select
        id={id}
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
