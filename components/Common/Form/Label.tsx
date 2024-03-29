type Props = {
  id?: string;
  label?: string;
  labelMessage?: string;
  isRequired?: boolean;
};
const Label: React.FC<Props> = ({ id, label = "", labelMessage = "", isRequired }) => {
  return (
    <>
      {label && (
        <div className="mb-2">
          <label htmlFor={id}>
            <span className="font-bold">
              {label}
              {isRequired && <span className="text-red-400 ml-2">*</span>}
            </span>
            {labelMessage && <span className="ml-2">{labelMessage}</span>}
          </label>
        </div>
      )}
    </>
  );
};

export default Label;
