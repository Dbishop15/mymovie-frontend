import React, { useEffect } from "react";
import { getProtectedResource } from "../services/api";

const ProtectedComponent = () => {
  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const data = await getProtectedResource();
        console.log("Protected data:", data);
      } catch (error) {
        console.error("Error fetching protected data:", error);
      }
    };

    fetchProtectedData();
  }, []);

  return <div>Protected Content</div>;
};

export default ProtectedComponent;
