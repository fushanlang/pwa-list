import { Fragment, useState } from "react";
import Link from "next/link";

import DeleteModal from "./DeleteModal";
import { submissionTableApp } from "../../type/common";

type Props = { apps: submissionTableApp[] };

const Apps: React.FC<Props> = ({ apps }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [targetApp, setTargetApp] = useState<submissionTableApp | null>(null);
  return (
    <>
      <tbody>
        {apps.map((app) => (
          <Fragment key={app.id}>
            <tr className="border h-24 flex items-center">
              <td className="w-64 flex items-center">
                <span className="ml-3 mr-4 w-16">
                  <img className="rounded-md" src={app.icon || "/default-app-icon.png"} />
                </span>
                {app.name}
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
