import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ 
    firstName:'', lastName:'', phoneNumber:'', city:'', pincode:''
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.get("http://localhost:5000/api/profile", { withCredentials: true });
        setProfile(res.data);
        setForm({ 
          firstName: res.data?.firstName || '',
          lastName: res.data?.lastName || '',
          phoneNumber: res.data?.phoneNumber || '',
          city: res.data?.city || '',
          pincode: res.data?.pincode || ''
        })
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      await axios.put("http://localhost:5000/api/profile", form, { withCredentials: true });
      setProfile({ ...profile, ...form });
      setEditMode(false);
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update.");
    }
  };
  
  if (loading) return <div>Loading...</div>;
  
  if (!profile) {
    return (
      <div className="p-10 max-w-md m-auto">
        <h1 className="text-2xl font-semibold mb-6">
          Please <a href="http://localhost:5000/auth/login" className="text-blue-500 underline">
            login with Google
          </a>.
        </h1>
      </div>
    )
  }
  
  return (
    <div className="p-10 max-w-md m-auto">
      <h1 className="text-2xl font-semibold mb-6">
        {editMode ? "Edit Profile" : "Your Profile"}
      </h1>

      {editMode ? (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md space-y-4">
          <input
            className="p-2 border rounded w-full"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => setForm({...form, firstName: e.target.value}) }
          />
          <input
            className="p-2 border rounded w-full"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({...form, lastName: e.target.value}) }
          />
          <input
            className="p-2 border rounded w-full"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={(e) => setForm({...form, phoneNumber: e.target.value}) }
          />
          <input
            className="p-2 border rounded w-full"
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({...form, city: e.target.value}) }
          />
          <input
            className="p-2 border rounded w-full"
            placeholder="Pincode"
            value={form.pincode}
            onChange={(e) => setForm({...form, pincode: e.target.value}) }
          />
          <div className="flex gap-2">
            <button 
              onClick={handleSave} 
              className="px-4 py-2 bg-blue-500 text-gray-50 font-semibold rounded">
              Save
            </button>
            <button 
              onClick={() => setEditMode(false)} 
              className="px-4 py-2 bg-gray-500 text-gray-50 font-semibold rounded">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <p>First Name: {profile?.firstName}</p>
          <p>Last Name: {profile?.lastName}</p>
          <p>Phone Number: {profile?.phoneNumber}</p>
          <p>City: {profile?.city}</p>
          <p>Pincode: {profile?.pincode}</p>
          <br />
          <button 
            onClick={() => setEditMode(true)} 
            className="px-4 py-2 bg-green-500 text-gray-50 font-semibold rounded">
            Edit
          </button>
        </div>
      )}

      <br />
      <a
        onClick={(e) => {
          e.preventDefault()
          window.location = "http://localhost:5000/auth/logout";
        }}
        className="text-red-500 underline"
        style={{ cursor:'pointer' }}
      >
        Logout
      </a>
    </div>
  )
}

export default App;
