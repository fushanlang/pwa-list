import { useRouter } from "next/router";

const ApplicationList = () => {
  const router = useRouter();
  const { category } = router.query;

  return <p>category: {category}</p>;
};

export default ApplicationList;
