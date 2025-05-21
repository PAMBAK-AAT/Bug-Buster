

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUser } from '../utils/auth';

const ProfilePage = () => {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const user = getUser();
    const userId = user._id;

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

    if (loading) {
        return <div className="text-white text-center">Loading...</div>;
    }
    if (error) {
        return <div className="text-white text-center">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-10 px-4">
            <div className="bg-white shadow-2xl rounded-3xl max-w-2xl mx-auto p-8 border border-gray-200">
                <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">👤 User Profile</h1>

                <div className="space-y-4 text-gray-800 text-lg">
                    <p><strong className="text-indigo-600">First Name:</strong> {profile.firstName}</p>
                    <p><strong className="text-indigo-600">Last Name:</strong> {profile.lastName}</p>
                    <p><strong className="text-indigo-600">Email:</strong> {profile.email}</p>
                    <p><strong className="text-indigo-600">Phone No:</strong> {profile.phoneNo}</p>
                    <p><strong className="text-indigo-600">Joined:</strong> {new Date(profile.createdAt).toLocaleString()}</p>
                    <p><strong className="text-indigo-600">Last Updated:</strong> {new Date(profile.updatedAt).toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
};

export default ProfilePage;