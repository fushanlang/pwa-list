import Link from "next/link";
import Image from "next/image";
const ApplicationCard = ({ applications }) => {
  return (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {applications.map((application, index) => (
        <Link
          key={index}
          href="/application/[name]]"
          as={`/application/${application.name}`}
        >
          <a className="flex bg-white shadow-md mb-1 p-4 rounded-md transition duration-300 ease-in-out hover:bg-gray-200 hover:shadow-none">
            <div className="mr-2 h-20 w-20 overflow-hidden">
              <Image
                src={application.icon || "/default.svg"}
                width={100}
                height={100}
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
