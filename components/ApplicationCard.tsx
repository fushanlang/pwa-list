import Link from "next/link";
import Image from "next/image";
const ApplicationCard = ({ applications }) => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-4">
      {applications.map((application, index) => (
        <Link
          key={index}
          href="/application/[name]]"
          as={`/application/${application.name_lowercase}`}
        >
          <a className="flex bg-white shadow-md mb-1 p-4 rounded-md transition duration-300 ease-in-out hover:bg-gray-200 hover:shadow-none">
            <div className="mr-2 h-20 w-20">
              <Image
                src={application.icon || "/default-app-icon.png"}
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col justify-between">
              <div className="text-base mt-1">{application.name}</div>
              <div className="h-10 w-35">{application.overview}</div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};
export default ApplicationCard;
