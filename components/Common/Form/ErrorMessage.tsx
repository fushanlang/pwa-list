type Props = { errors: [] };

const ErrorMessage: React.FC<Props> = ({ errors }) => {
  return (
    <div className="mt-1">
      {errors.map((error) => (
        <p className="text-base text-red-400" key={error}>
          {error}
        </p>
      ))}
    </div>
  );
};

export default ErrorMessage;
