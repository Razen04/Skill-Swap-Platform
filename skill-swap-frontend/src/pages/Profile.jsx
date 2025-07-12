import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    skillsOffered: [],
    skillsWanted: [],
    availability: '',
    location: '',
    photo: '',
  });
  const [initialProfile, setInitialProfile] = useState({});
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current profile data
    setLoading(true);
    fetch('http://localhost:5000/profile', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data && data.profile) {
          const loadedProfile = {
            ...data.profile,
          };
          console.log(loadedProfile)
          setProfile(loadedProfile);
          setInitialProfile(loadedProfile);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e, key) => {
    setProfile(prev => ({ ...prev, [key]: e.target.value.split(',').map(s => s.trim()) }));
  };

  const handlePhotoChange = e => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
      setProfile(prev => ({ ...prev, photo: URL.createObjectURL(e.target.files[0]) }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const formData = new FormData();
      // Only send fields that have changed
      Object.entries(profile).forEach(([key, value]) => {
        if (key === 'email') return; // never update email
        if (key === 'photo' && !photoFile) return; // only send photo if changed
        if (initialProfile[key] !== undefined && JSON.stringify(initialProfile[key]) === JSON.stringify(value)) return;
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });
      if (photoFile) {
        formData.append('photo', photoFile);
      }
      const res = await fetch('http://localhost:5000/update-profile', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      const data = await res.json();
      if (data.status === 'ok') {
        setSuccess(true);
        setInitialProfile(profile); // update initialProfile to reflect new state
      } else {
        setError(data.error || 'Update failed');
      }
    } catch (err) {
      setError('Update failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-white to-violet-200 flex flex-col items-center justify-center px-2 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/home')}
        className="flex items-center gap-2 mb-6 px-5 py-2 bg-violet-100 hover:bg-violet-200 text-violet-700 font-semibold rounded-lg border border-violet-300 shadow transition-colors duration-200"
      >
        <FaChevronLeft className="w-5 h-5" />
        Back to Home
      </button>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-0 w-full max-w-2xl border border-violet-200 overflow-hidden"
      >
        {/* Card Header with Avatar */}
        <div className="flex flex-col items-center justify-center bg-gradient-to-r from-violet-600 to-violet-400 py-8 px-4">
          <div className="relative group w-28 h-28 mb-2">
            <div className="w-28 h-28 rounded-full bg-violet-100 border-4 border-white flex items-center justify-center overflow-hidden shadow-xl">
              {profile.photo ? (
                <img src={profile.photo} alt="Profile" className="object-cover w-full h-full" />
              ) : (
                <span className="text-violet-400 text-5xl">👤</span>
              )}
            </div>
            <label className="absolute bottom-2 right-2 bg-violet-700 hover:bg-violet-800 text-white rounded-full p-2 shadow-lg cursor-pointer transition-opacity opacity-80 group-hover:opacity-100 border-2 border-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l1.536 1.536A2 2 0 0120 8.768V17a2 2 0 01-2 2H6a2 2 0 01-2-2V8.768a2 2 0 012-2h2.232a2 2 0 001.414-.586l1.536-1.536a2 2 0 012.828 0z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          </div>
          <h2 className="text-3xl font-extrabold text-white drop-shadow mb-1">{profile.name || 'Your Name'}</h2>
          <p className="text-violet-100 text-sm">{profile.email}</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/80">
          <div className="col-span-1">
            <label className="block text-violet-700 font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full border border-violet-300 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500 bg-white/90"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-violet-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full border border-violet-300 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500 bg-white/90"
              required
              disabled
            />
          </div>
          <div className="col-span-1">
            <label className="block text-violet-700 font-semibold mb-1">Skills Offered (comma separated)</label>
            <input
              type="text"
              value={profile?.skills_offered}
              onChange={e => handleSkillsChange(e, 'skills_offered')}
              className="w-full border border-violet-300 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500 bg-white/90"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-violet-700 font-semibold mb-1">Skills Wanted (comma separated)</label>
            <input
              type="text"
              value={profile?.skills_wanted}
              onChange={e => handleSkillsChange(e, 'skills_wanted')}
              className="w-full border border-violet-300 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500 bg-white/90"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-violet-700 font-semibold mb-1">Availability</label>
            <select
              name="availability"
              value={profile.availability}
              onChange={handleChange}
              className="w-full border border-violet-300 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500 bg-white/90"
            >
              <option value="">Select</option>
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
              <option value="Evenings">Evenings</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-violet-700 font-semibold mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              className="w-full border border-violet-300 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500 bg-white/90"
            />
          </div>
          <div className="col-span-1 md:col-span-2 flex flex-col items-center mt-2">
            {error && <div className="text-red-600 text-center mb-2">{error}</div>}
            {success && <div className="text-green-600 text-center mb-2">Profile updated successfully!</div>}
            <button
              type="submit"
              className="w-full md:w-1/2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-colors duration-200 text-lg tracking-wide mt-2"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Profile;
