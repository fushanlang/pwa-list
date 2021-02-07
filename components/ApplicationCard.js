import Link from "next/link";
const ApplicationCard = ({ applications }) => {
  return (
    <div>
      {applications.map((application) => (
        <Link
          key="{application.id}"
          href="/application/[id]"
          as={`/application/${application.id}`}
        >
          <div>
            <img alt="application-icon" width="50" src={application.icon} />
            <h3>{application.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default ApplicationCard;
