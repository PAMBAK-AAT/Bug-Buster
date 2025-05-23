


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUser } from '../utils/auth';

import { User, Mail, Phone, Calendar, RefreshCw } from 'lucide-react';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = getUser();
  const userId = user?._id;

  useEffect(() => {
    if (!userId) {
      setError("User not found");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setProfile(response.data);
      } catch (error) {
        setError("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) return <div className="text-indigo-700 text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-10 px-4">
      <div className="bg-white shadow-2xl rounded-3xl max-w-2xl mx-auto p-8 border border-gray-200">
        <h1 className="flex items-center justify-center text-4xl font-extrabold text-indigo-700 mb-8 gap-3">
          <User size={36} /> User Profile
        </h1>

        <div className="space-y-6 text-gray-800 text-lg">
          <div className="flex items-center gap-3">
            <User size={20} className="text-indigo-600" />
            <p><strong>First Name:</strong> {profile.firstName}</p>
          </div>

          <div className="flex items-center gap-3">
            <User size={20} className="text-indigo-600" />
            <p><strong>Last Name:</strong> {profile.lastName}</p>
          </div>

          <div className="flex items-center gap-3">
            <Mail size={20} className="text-indigo-600" />
            <p><strong>Email:</strong> {profile.email}</p>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={20} className="text-indigo-600" />
            <p><strong>Phone No:</strong> {profile.phoneNo}</p>
          </div>

          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-indigo-600" />
            <p><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleString()}</p>
          </div>

          <div className="flex items-center gap-3">
            <RefreshCw size={20} className="text-indigo-600" />
            <p><strong>Last Updated:</strong> {new Date(profile.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
