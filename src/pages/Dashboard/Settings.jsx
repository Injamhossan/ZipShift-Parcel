import React, { useState } from 'react';
import useAuthStore from '../../store/authStore';
import { authApi } from '../../utils/authApi';
import { toast } from 'react-hot-toast';

const Settings = () => {
  const { user, updateUser } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    company: '',
    pickupArea: ''
  });
  const [loading, setLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  // Populate form data when user is available
  React.useEffect(() => {
    if (user) {
        setFormData({
            name: user.name || '',
            phone: user.phone || '',
            address: user.address || '',
            company: user.company || '',
            pickupArea: user.pickupArea || ''
        });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authApi.updateProfile(formData);
      if (response.success) {
        updateUser(response.data);
        toast.success('Profile updated successfully');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Update failed', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="p-8 text-center">Loading profile...</div>;

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold text-black">Settings</h1>
            <p className="text-gray-500">Manage your profile information.</p>
        </div>
        {!isEditing && (
            <button 
                onClick={() => setIsEditing(true)}
                className="btn bg-[#CAEB66] border-none text-black"
            >
                Edit Profile
            </button>
        )}
      </header>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-2xl">
        <h3 className="font-bold text-lg mb-4 text-black">Profile Details</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
                <label className="label"><span className="label-text text-black">Name</span></label>
                <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered text-black bg-white border border-gray-300"
                    disabled={!isEditing}
                />
            </div>
            <div className="form-control">
                <label className="label"><span className="label-text text-black">Email</span></label>
                <input 
                    type="email" 
                    value={user.email || ''}
                    className="input input-bordered text-gray-500 bg-gray-100 border border-gray-300"
                    disabled
                />
            </div>
            <div className="form-control">
                <label className="label"><span className="label-text text-black">Phone</span></label>
                <input 
                    type="text" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input input-bordered text-black bg-white border border-gray-300"
                    disabled={!isEditing}
                />
            </div>
            <div className="form-control">
                <label className="label"><span className="label-text text-black">Company (Optional)</span></label>
                <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="input input-bordered text-black bg-white border border-gray-300"
                    disabled={!isEditing}
                />
            </div>
            <div className="form-control">
                <label className="label"><span className="label-text text-black">Address</span></label>
                <textarea 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="textarea textarea-bordered text-black bg-white border border-gray-300"
                    disabled={!isEditing}
                ></textarea>
            </div>
             <div className="form-control">
                <label className="label"><span className="label-text text-black">Pickup Area</span></label>
                <input 
                    type="text" 
                    name="pickupArea"
                    value={formData.pickupArea}
                    onChange={handleChange}
                    className="input input-bordered text-black bg-white border border-gray-300"
                    disabled={!isEditing}
                />
            </div>
            {isEditing && (
                <div className="pt-4 flex gap-3">
                    <button 
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="btn btn-ghost"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="btn bg-[#CAEB66] border-none text-black"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            )}
        </form>
      </div>
    </div>
  );
};

export default Settings;
