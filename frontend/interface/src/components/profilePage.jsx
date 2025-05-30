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

  if (loading) return <div className="text-cyan-600 text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;

  return (
    <>
      {/* Updated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-900 via-sky-800 to-blue-900 -z-20">
        <div className="relative w-full h-full overflow-hidden">
          {[...Array(50)].map((_, i) => {
            const colors = ['bg-cyan-400', 'bg-pink-400', 'bg-purple-400', 'bg-blue-300'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            return (
              <span
                key={i}
                className={`absolute rounded-full opacity-80 animate-elliptic-glow ${color}`}
                style={{
                  width: `${Math.random() * 10 + 8}px`,
                  height: `${Math.random() * 10 + 8}px`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${Math.random() * 6 + 6}s`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Semi-transparent overlay */}
      <div className="fixed inset-0 bg-black/60 -z-10"></div>

      {/* Profile Card */}
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="bg-white bg-opacity-90 border border-blue-300 rounded-3xl shadow-2xl backdrop-blur-lg max-w-xl w-full p-10 relative z-10">
          <h1 className="flex items-center justify-center text-4xl font-extrabold text-blue-700 mb-10 gap-3 drop-shadow-lg">
            <User size={36} /> Profile Overview
          </h1>

          <div className="space-y-5 text-lg text-gray-800">
            <div className="flex items-center gap-3">
              <User size={20} className="text-cyan-600" />
              <p><strong>First Name:</strong> {profile.firstName}</p>
            </div>

            <div className="flex items-center gap-3">
              <User size={20} className="text-cyan-600" />
              <p><strong>Last Name:</strong> {profile.lastName}</p>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={20} className="text-cyan-600" />
              <p><strong>Email:</strong> {profile.email}</p>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={20} className="text-cyan-600" />
              <p><strong>Phone No:</strong> {profile.phoneNo}</p>
            </div>

            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-cyan-600" />
              <p><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleString()}</p>
            </div>

            <div className="flex items-center gap-3">
              <RefreshCw size={20} className="text-cyan-600" />
              <p><strong>Last Updated:</strong> {new Date(profile.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Updated Particle Animation */}
      <style>{`
        @keyframes elliptic-glow {
          0% {
            transform: translateY(100vh) rotate(0deg) scale(1);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          100% {
            transform: translateY(-30vh) rotate(720deg) scale(0.7);
            opacity: 0;
          }
        }

        .animate-elliptic-glow {
          animation-name: elliptic-glow;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-fill-mode: forwards;
          will-change: transform, opacity;
          box-shadow: 0 0 10px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.1);
        }
      `}</style>
    </>
  );
};

export default ProfilePage;


