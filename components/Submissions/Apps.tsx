import { useState } from "react";
import Link from "next/link";
import DeleteModal from "./DeleteModal";

interface Props {
  apps: any;
  fetchApps: any;
}

const Apps: React.FC<Props> = ({ apps, fetchApps }) => {
  const [modalsOpen, setModalsOpen] = useState<boolean>(false);
  const [targetApp, setTargetApp] = useState<Object>([]);
  const handleDeleteApp = (app) => {
    setTargetApp(app);
    setModalsOpen(true);
  };
  return (
    <>
      <tbody>
        {apps.map((app, index) => (
          <tr key={index} className="border h-24 flex items-center">
            <td className="w-64 flex items-center">
              <span className="ml-3 mr-4 w-16">
                <img className="rounded-md" src={app.icon || "/default-app-icon.png"} />
              </span>
              {app.name}
            </td>
            <td className="w-32 text-center">
              {app.isPublic && <span className="text-blue-400">Public</span>}
              {!app.isPublic && <span className="text-yellow-400">awaiting approval</span>}
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
                onClick={() => handleDeleteApp(app)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <DeleteModal modalsOpen={modalsOpen} setModalsOpen={setModalsOpen} targetApp={targetApp} fetchApps={fetchApps} />
    </>
  );
};

export default Apps;
