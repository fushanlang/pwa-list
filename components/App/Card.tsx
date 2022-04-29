import Link from "next/link";
import { changeFirstUpperCase } from "../../plugins/common/functions";

interface Props {
  apps: any;
}
const Card: React.FC<Props> = ({ apps }) => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {apps.map((app, index) => (
        <Link key={index} href="/app/[name]" as={`/app/${app.nameLowercase}`}>
          <a
            style={{ height: "120px" }}
            className="flex items-center border-2 border-gray-200 mb-1 px-4 rounded-xl transition duration-200 ease-in-out hover:bg-gray-100"
          >
            <div className="mr-4 w-20">
              <img className="rounded-md" src={app.icon || "/default-app-icon.png"} />
            </div>
            <div className="flex flex-col">
              <div className="text-base font-bold">{app.name}</div>
              <div>{changeFirstUpperCase(app.category)}</div>
              <div className="mt-2">
                {app.tag1 && (
                  <span className="text-xs px-1.5 py-0.5 mr-1 rounded-xl border-2 border-green-300 text-gray-500 font-semibold">
                    {app.tag1}
                  </span>
                )}
                {app.tag2 && (
                  <span className="text-xs px-1.5 py-0.5 mr-1 rounded-xl border-2 border-green-300 text-gray-500 font-semibold">
                    {app.tag2}
                  </span>
                )}
                {app.tag3 && (
                  <span className="text-xs px-1.5 py-0.5 mr-1 rounded-xl border-2 border-green-300 text-gray-500 font-semibold">
                    {app.tag3}
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
export default Card;
