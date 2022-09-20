import { Fragment, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import DeleteModal from "./DeleteModal";
import { SubmissionTableApp } from "../../types/apps";

type Props = { apps: SubmissionTableApp[] };

const Apps: React.FC<Props> = ({ apps }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [targetApp, setTargetApp] = useState<SubmissionTableApp | null>(null);
  return (
    <>
      <tbody>
        {apps.map((app) => (
          <Fragment key={app.id}>
            <tr className="border h-24 flex items-center">
              <td className="w-64 flex items-center">
                <div className="ml-3 w-16 pt-1">
                  <Image
                    className="rounded-md"
                    alt="icon"
                    src={app.icon || "/default-app-icon.png"}
                    width={100}
                    height={100}
                    objectFit="contain"
                  />
                </div>
                <div className="ml-6">{app.name}</div>
              </td>
              <td className="w-32 text-center">
                {app.isPublic && <span className="text-blue-400">Public</span>}
                {!app.isPublic && !app.isRejected && <span className="text-yellow-400">Awaiting Approval</span>}
                {!app.isPublic && app.isRejected && <span className="text-red-500">Rejected</span>}
              </td>
              <td className="w-64 flex justify-center">
                {app.isPublic && (
                  <a
                    className="inline-flex items-center h-8 px-2 mr-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    target="_blank"
                    href={`/app/${app.nameLowercase}`}
                  >
                    View
                  </a>
                )}
                <Link href="/submissions/edit/[name]" as={`/submissions/edit/${app.nameLowercase}`}>
                  <button className="h-8 px-2 mr-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">Edit</button>
                </Link>
                <button
                  className="h-8 px-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    setTargetApp(app);
                    setIsModalOpen(true);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
            {app.isRejected && (
              <tr className="border border-t-0 h-8 flex items-center">
                <td className="text-sm text-red-500">
                  <p className="ml-2">Message: {app.rejectionMessage}</p>
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
      {isModalOpen && <DeleteModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} targetApp={targetApp} />}
    </>
  );
};

export default Apps;
