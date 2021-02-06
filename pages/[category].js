import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "../plugins/firebase";

const ApplicationList = () => {
  const [applications, setApplications] = useState([{ id: "", title: "" }]);
  useEffect(() => {
    const unSub = db.collection("applications").onSnapshot((snapshot) => {
      setApplications(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
    return () => unSub();
  }, []);
  const router = useRouter();
  const { category } = router.query;
  return (
    <div>
      <p>category: {category}</p>
      <div>
        {applications.map((application) => (
          <h3>{application.title}</h3>
        ))}
      </div>
    </div>
  );
};

export default ApplicationList;
