import Link from "next/link";
import Image from "next/image";

import capitalizeFirstLetter from "../../plugins/common/capitalizeFirstLetter";
import type { CardApp } from "../../types/apps";

type Props = { app: CardApp };

const Card: React.FC<Props> = ({ app }) => {
  return (
    <Link key={app.id} href="/app/[name]" as={`/app/${app.nameLowercase}`}>
      <a className="flex h-30 items-center border border-gray-400 dark:border-gray-200 mb-1 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
        <div className="w-20 pt-1">
          <Image className="rounded-md" src={app.icon || "/default-app-icon.png"} alt="icon" width={100} height={100} objectFit="contain" />
        </div>
        <div className="ml-4">
          <div className="text-base font-bold">{app.name}</div>
          <div className="mt-0.5 font-semibold">{capitalizeFirstLetter(app.category)}</div>
          <div className="text-sm mt-1">
            {app.tag1 && <span>{app.tag1}</span>}
            {app.tag2 && <span> / {app.tag2}</span>}
            {app.tag3 && <span> / {app.tag3}</span>}
          </div>
        </div>
      </a>
    </Link>
  );
};
export default Card;
