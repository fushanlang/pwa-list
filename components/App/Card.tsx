import Link from "next/link";
import Image from "next/image";

import { changeFirstUpperCase } from "../../plugins/common/functions";
import { CardApp } from "../../types/app";

type Props = { apps: CardApp[] };

const Card: React.FC<Props> = ({ apps }) => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {apps.map((app) => (
        <Link key={app.id} href="/app/[name]" as={`/app/${app.nameLowercase}`}>
          <a style={{ height: "120px" }} className="flex items-center border mb-1 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="mr-4 w-20 pt-1">
              <Image
                className="rounded-md"
                src={app.icon || "/default-app-icon.png"}
                width={100}
                height={100}
                objectFit="contain"
                alt="icon"
              />
            </div>
            <div className="flex flex-col">
              <div className="text-base font-bold">{app.name}</div>
              <div className="mt-0.5 font-semibold">{changeFirstUpperCase(app.category)}</div>
              <div className="text-sm mt-1">
                {app.tag1 && <span>{app.tag1}</span>}
                {app.tag2 && <span> / {app.tag2}</span>}
                {app.tag3 && <span> / {app.tag3}</span>}
              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};
export default Card;
