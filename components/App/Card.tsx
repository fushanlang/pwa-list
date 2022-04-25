import Link from "next/link";

interface Props {
  apps: any;
}
const Card: React.FC<Props> = ({ apps }) => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {apps.map((app, index) => (
        <Link key={index} href="/app/[name]" as={`/app/${app.nameLowercase}`}>
          <a
            style={{ height: "104px" }}
            className="flex items-center bg-white shadow-md mb-1 px-4 rounded-md transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-none"
          >
            <div className="mr-4 w-20">
              <img className="rounded-md" src={app.icon || "/default-app-icon.png"} />
            </div>
            <div className="flex flex-col">
              <div className="text-base font-bold">{app.name}</div>
              <div>
                {/* Changed to upper case */}
                {app.category.toString().charAt(0).toUpperCase() + app.category.slice(1)}
              </div>
              <div className="mt-1">
                {app.tag1 && (
                  <span className="text-xs px-2 py-1 mr-1 rounded bg-gray-600 text-white">{app.tag1}</span>
                )}
                {app.tag2 && (
                  <span className="text-xs px-2 py-1 mr-1 rounded bg-gray-600 text-white">{app.tag2}</span>
                )}
                {app.tag3 && (
                  <span className="text-xs px-2 py-1 mr-1 rounded bg-gray-600 text-white">{app.tag3}</span>
                )}
              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};
export default Card;
