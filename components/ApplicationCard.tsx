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
          <a className="flex items-center bg-white shadow-md mb-1 p-4 rounded-md transition duration-300 ease-in-out hover:bg-gray-200 hover:shadow-none">
            <div className="mr-3 h-20 w-20">
              <Image
                src={application.icon || "/default-app-icon.png"}
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col">
              <div className="text-base font-bold">{application.name}</div>
              <div className="">{application.category}</div>
              <div className="mt-1">
                {application.tag1 && (
                  <span className="text-xs px-2 py-1 mr-1 rounded bg-gray-500 text-white">
                    {application.tag1}
                  </span>
                )}
                {application.tag2 && (
                  <span className="text-xs px-2 py-1 mr-1 rounded bg-gray-500 text-white">
                    {application.tag2}
                  </span>
                )}
                {application.tag3 && (
                  <span className="text-xs px-2 py-1 mr-1 rounded bg-gray-500 text-white">
                    {application.tag3}
                  </span>
                )}
              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};
export default ApplicationCard;
