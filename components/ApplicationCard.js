import Link from "next/link";
const ApplicationCard = ({ applications }) => {
  return (
    <div class="grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {applications.map((application) => (
        <Link
          key="{application.id}"
          href="/application/[name]]"
          as={`/application/${application.name}`}
        >
          <div class="card mt-6">
            <div class="w-full flex items-center">
              <div class="flex bg-white shadow-md p-4 rounded-md">
                {/* <div class="mr-2 h-20 w-20 rounded-full overflow-hidden"> */}
                <div class="mr-2 h-20 w-20 overflow-hidden">
                  <img alt="application-icon" src={application.icon} />
                </div>
                <div class="flex flex-col justify-between">
                  <div class="mb-2 h-5 w-40 overflow-hidden">
                    {application.name}
                  </div>
                  <div class="h-10 w-40 overflow-hidden">
                    {application.overview}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div class="card mt-6">
              <div class="w-full flex items-center">
                <div class="flex bg-white shadow-md p-4 rounded-md">
                  <div class="mr-2 h-20 w-20 rounded-full overflow-hidden">
                    <img
                      alt="application-icon"
                      width="50"
                      src={application.icon}
                    />
                  </div>
                  <div class="flex flex-col justify-between">
                    <div class="mb-2 h-5 w-40 overflow-hidden">
                      {application.name}
                    </div>
                    <div class="h-10 w-40 overflow-hidden">
                      {application.overview}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* <a>
            <img alt="application-icon" width="50" src={application.icon} />
            <h3>{application.name}</h3>
          </a> */}
        </Link>
      ))}
    </div>
  );
};
export default ApplicationCard;
