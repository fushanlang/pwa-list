const Apps = ({ apps }) => {
  return (
    <>
      {apps.map((app, index) => (
        <tr key={index} className="border">
          <td className="flex items-center px-3 h-20">
            <div className="mr-4 w-16">
              <img
                className="rounded-md"
                src={app.icon || "/default-app-icon.png"}
              />
            </div>
            {app.name}
          </td>
          <td className="text-center px-4">
            {app.isPublic && <span className="text-blue-400">Public</span>}
            {!app.isPublic && (
              <span className="text-yellow-400">awaiting approval</span>
            )}
          </td>
          <td className="px-3">
            {app.isPublic && (
              <a
                className="h-10 px-2 py-1 mr-1 border rounded shadow-sm hover:shadow-none hover:bg-gray-100"
                target="_blank"
                href={`/app/${app.nameLowercase}`}
              >
                View
              </a>
            )}
            <a className="h-7 px-2 py-1 mr-1 border rounded shadow-sm hover:shadow-none hover:bg-gray-100 pointer-events-none">
              Edit
            </a>
            <a className="h-7 px-2 py-1 border rounded shadow-sm hover:shadow-none hover:bg-gray-100 pointer-events-none">
              Delete
            </a>
          </td>
        </tr>
      ))}
    </>
  );
};

export default Apps;
