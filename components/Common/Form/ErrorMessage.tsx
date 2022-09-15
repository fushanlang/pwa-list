type Props = { errors: string[] };

const ErrorMessage: React.FC<Props> = ({ errors }) => {
  return (
    <>
      {errors.map((error) => (
        <p className="text-base text-red-400 mt-1" key={error}>
          {error}
        </p>
      ))}
    </>
  );
};

export default ErrorMessage;
