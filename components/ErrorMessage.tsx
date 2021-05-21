const ErrorMessage = ({ errors }) => {
  return (
    <div className="mt-1">
      {errors !== null &&
        errors.map((error) => (
          <p className="text-base text-red-400" key={error}>
            {error}
          </p>
        ))}
    </div>
  );
};

export default ErrorMessage;
