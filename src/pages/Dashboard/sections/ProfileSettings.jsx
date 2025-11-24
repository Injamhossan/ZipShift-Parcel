import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import useAuthStore from "../../../store/authStore";

const ProfileSettings = () => {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    company: "",
    address: "",
    pickupArea: "",
  });

  useEffect(() => {
    setProfile({
      name: user?.displayName || user?.name || "",
      phone: user?.phoneNumber || "",
      company: "ZipShift Merchant",
      address: "House 11, Road 5, Dhaka",
      pickupArea: "Dhaka North",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <header>
        <p className="text-sm uppercase tracking-wide text-black">
          Profile
        </p>
        <h1 className="text-3xl font-bold text-black">
          Manage your account
        </h1>
        <p className="text-black">
          Keep your merchant details and pickup information up to date.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control space-y-2">
            <label className="label">
              <span className="label-text font-medium text-black">
                Full name
              </span>
            </label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="input text-black input-bordered bg-gray-50"
              required
            />
          </div>
          <div className="form-control space-y-2">
            <label className="label">
              <span className="label-text font-medium text-black">
                Phone number
              </span>
            </label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="input text-black input-bordered bg-gray-50"
              required
            />
          </div>
        </div>

        <div className="form-control space-y-2">
          <label className="label">
            <span className="label-text font-medium text-black">
              Company name
            </span>
          </label>
          <input
            type="text"
            name="company"
            value={profile.company}
            onChange={handleChange}
            className="input text-black input-bordered bg-gray-50"
            required
          />
        </div>

        <div className="form-control space-y-2">
          <label className="label">
            <span className="label-text font-medium text-black">
              Pickup address
            </span>
          </label>
          <textarea
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="textarea text-black textarea-bordered bg-gray-50"
            rows={3}
            required
          ></textarea>
        </div>

        <div className="form-control space-y-2">
          <label className="label">
            <span className="label-text font-medium text-black">
              Pickup area
            </span>
          </label>
          <select
            name="pickupArea"
            value={profile.pickupArea}
            onChange={handleChange}
            className="select text-black select-bordered bg-gray-50"
            required
          >
            <option value="">Select area</option>
            <option value="Dhaka North">Dhaka North</option>
            <option value="Dhaka South">Dhaka South</option>
            <option value="Chattogram">Chattogram</option>
            <option value="Sylhet">Sylhet</option>
          </select>
        </div>

        <div className="flex justify-end gap-4">
          <button type="button" className="btn btn-ghost text-black">
            Cancel
          </button>
          <button
            type="submit"
            className="btn bg-[#CAEB66] border-none text-black px-8"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;

