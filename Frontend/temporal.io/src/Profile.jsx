import React, { useState, useEffect } from "react";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
          setForm(data);
        }
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
      const res = await fetch("/api/profile", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const updated = await res.json();
        setProfile(updated);
        setEdit(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div> Loading...</div>;
  if (!profile) return <div> Please <a href="/auth/login">Login first</a></div>;
  
  return (
    <div className="p-6 max-w-md ml-auto mr-auto mt-10 shadow-md rounded-md">
      {edit ? (
        <>
          <input
            className="border p-2 mb-2 w-full"
            placeholder="First Name"
            value={form?.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <input
            className="border p-2 mb-2 w-full"
            placeholder="Last Name"
            value={form?.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
          <input
            className="border p-2 mb-2 w-full"
            placeholder="City"
            value={form?.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
          <input
            className="border p-2 mb-2 w-full"
            placeholder="Pincode"
            value={form?.pincode}
            onChange={(e) => setForm({ ...form, pincode: e.target.value })}
          />
          <input
            className="border p-2 mb-2 w-full"
            placeholder="Phone Number"
            value={form?.phoneNumber}
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          />
          <button
            onClick={handleSave}
            className="bg-blue-500 text-gray-100 p-2 mr-2 rounded-md"
          >Save</button>
          <button
            onClick={() => setEdit(false)}
            className="bg-gray-500 p-2 rounded-md"
          >Cancel</button>
        </>
      ) : (
        <>
          <p>First Name: {profile?.firstName}</p>
          <p>Last Name: {profile?.lastName}</p>
          <p>City: {profile?.city}</p>
          <p>Pincode: {profile?.pincode}</p>
          <p>Phone Number: {profile?.phoneNumber}</p>

          <button
            onClick={() => setEdit(true)}
            className="bg-blue-500 p-2 rounded-md mt-4 text-gray-100"
          >Edit</button>
        </>
      )}

    </div>
  )
}

export default Profile;
