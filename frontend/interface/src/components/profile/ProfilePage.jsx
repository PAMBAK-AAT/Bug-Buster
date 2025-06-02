


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUser } from '../../utils/auth';
import {
  User,
  Mail,
  Phone,
  Calendar,
  RefreshCw,
  ShieldCheck,
  BadgeCheck,
} from 'lucide-react';

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
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile/${userId}`, {
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

  if (loading) return <div className="text-cyan-500 text-center mt-10 text-xl font-semibold">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10 text-xl">{error}</div>;

  return (
    <>
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-900 via-sky-800 to-blue-900 -z-20">
        <div className="relative w-full h-full overflow-hidden">
          {[...Array(60)].map((_, i) => {
            const colors = ['bg-cyan-300', 'bg-pink-400', 'bg-blue-400', 'bg-purple-300'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            return (
              <span
                key={i}
                className={`absolute rounded-full opacity-80 animate-elliptic-glow ${color}`}
                style={{
                  width: `${Math.random() * 10 + 10}px`,
                  height: `${Math.random() * 10 + 10}px`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${Math.random() * 10 + 8}s`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/50 -z-10" />

      {/* Profile Card */}
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="bg-gradient-to-br from-blue-200 via-blue-100 to-blue-400 bg-opacity-30 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl max-w-xl w-full p-10 animate-fade-in">

          <h1 className="text-4xl text-blue-800 font-extrabold mb-8 text-center flex items-center justify-center gap-3 drop-shadow-md">
            <ShieldCheck className="text-blue-600" size={32} />
            Profile Overview
          </h1>

          <div className="space-y-4 text-base text-gray-800">
            {[
              { icon: <User size={20} className="text-cyan-600" />, label: "First Name", value: profile.firstName },
              { icon: <User size={20} className="text-cyan-600" />, label: "Last Name", value: profile.lastName },
              { icon: <Mail size={20} className="text-cyan-600" />, label: "Email", value: profile.email },
              { icon: <Phone size={20} className="text-cyan-600" />, label: "Phone No", value: profile.phoneNo },
              { icon: <BadgeCheck size={20} className="text-cyan-600" />, label: "Solved Problems", value: profile.noOfQuesSolved },
              { icon: <Calendar size={20} className="text-cyan-600" />, label: "Joined", value: new Date(profile.createdAt).toLocaleString() },
              { icon: <RefreshCw size={20} className="text-cyan-600" />, label: "Last Updated", value: new Date(profile.updatedAt).toLocaleString() },
            ].map(({ icon, label, value }, i) => (
              <div
                key={i}
                className="flex items-center gap-4 hover:bg-cyan-50 px-4 py-1.5 rounded-xl transition duration-300 group"
              >
                <span className="transition transform group-hover:scale-110">{icon}</span>
                <p>
                  <strong className="text-gray-700">{label}:</strong>{' '}
                  <span className="text-gray-900">{value}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animations */}
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

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </>
  );
};

export default ProfilePage;
