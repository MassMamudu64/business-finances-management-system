"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "@/components/Skeleton";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/employee/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProfile(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="p-6">
        <Skeleton className="h-8 w-40 mb-6" />
        <Skeleton className="h-6 w-64 mb-3" />
        <Skeleton className="h-6 w-48 mb-3" />
        <Skeleton className="h-6 w-56" />
      </div>
    );

  return (
    <div className="p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="bg-white dark:bg-gray-800 p-6 shadow rounded">
        <p className="text-lg mb-3">
          <span className="font-semibold">Name:</span> {profile.full_name}
        </p>
        <p className="text-lg mb-3">
          <span className="font-semibold">Email:</span> {profile.email}
        </p>
        <p className="text-lg mb-3">
          <span className="font-semibold">Total Uploads:</span>{" "}
          {profile.total_uploads}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Joined:</span>{" "}
          {new Date(profile.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}