export default function ApplicationList({ applications }) {
  return (
    <div>
      {applications.map((application) => (
        <div>
          <img alt="application-icon" width="50" src={application.image} />
          <h3>{application.title}</h3>
        </div>
      ))}
    </div>
  );
}
