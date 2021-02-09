import Link from "next/link";
const ApplicationCard = ({ applications }) => {
  return (
    <div>
      {applications.map((application) => (
        <Link
          key="{application.id}"
          href="/application/[name]]"
          as={`/application/${application.name}`}
        >
          <a>
            <img alt="application-icon" width="50" src={application.icon} />
            <h3>{application.name}</h3>
          </a>
        </Link>
      ))}
    </div>
  );
};
export default ApplicationCard;
