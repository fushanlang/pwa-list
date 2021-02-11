import Link from "next/link";
const ApplicationCard = ({ applications }) => {
  return (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {applications.map((application, index) => (
        <Link
          key={index}
          href="/application/[name]]"
          as={`/application/${application.name}`}
        >
          <a className="flex bg-white shadow-md mt-6 p-4 rounded-md hover:bg-gray-200 hover:shadow-none transition ease-in-out">
            <div className="mr-2 h-20 w-20 overflow-hidden">
              <img
                className="block"
                alt="application-icon"
                src={application.icon}
              />
            </div>
            <div className="flex flex-col justify-between">
              <div className="mb-2 h-5 w-40 overflow-hidden">
                {application.name}
              </div>
              <div className="h-10 w-40 overflow-hidden">
                {application.overview}
              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};
export default ApplicationCard;
