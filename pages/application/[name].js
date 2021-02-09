import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "../../plugins/firebase";

const ApplicationName = () => {
  const router = useRouter();
  const { name } = router.query;
  useEffect(() => {
    if (name) {
      const fetchApplicationData = async () => {
        const applicationSnapShot = await db
          .collection("applications")
          .where("category", "==", category)
          .get();
        setApplications(
          applicationSnapShot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            icon: doc.data().icon,
          }))
        );
      };
      fetchApplicationData();
    }
  }, [category]);
  return <div></div>;
};

export default ApplicationName;
