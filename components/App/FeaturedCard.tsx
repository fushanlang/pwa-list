import Link from "next/link";
import Image from "next/image";

import capitalizeFirstLetter from "../../plugins/common/capitalizeFirstLetter";
import type { FeaturedApp } from "../../types/apps";

type Props = { app: FeaturedApp };

const Card: React.FC<Props> = ({ app }) => {
  return (
    <Link key={app.id} href="/app/[name]" as={`/app/${app.nameLowercase}`}>
      <a className="mr-5">
        <div className="w-96">
          <Image className="rounded-md" src={app.promotionImage} alt="featured-image" width={480} height={270} objectFit="contain" />
          <div className="text-base font-bold">{app.name}</div>
          <div className="font-semibold">{capitalizeFirstLetter(app.category)}</div>
        </div>
      </a>
    </Link>
  );
};
export default Card;
