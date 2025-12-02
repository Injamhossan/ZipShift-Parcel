import React, { useState } from 'react';
import useAuthStore from '../../store/authStore';
import { authApi } from '../../utils/authApi';
import { toast } from 'react-hot-toast';
import { storage } from '../../Firebase/firebase.config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
  const [uploadingImage, setUploadingImage] = useState(false);

  // Populate form data when user is available
  React.useEffect(() => {
    if (user) {
        setFormData({
            name: user.name || '',
            phone: user.phone || '',
            address: user.address || '',
            company: user.company || '',
            pickupArea: user.pickupArea || '',
            photoURL: user.photoURL || user.photo || user.avatar || user.image || ''
        });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const storageRef = ref(storage, `profile-photos/${user._id || user.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      setFormData(prev => ({ ...prev, photoURL: downloadURL }));
      toast.success('Image uploaded successfully! Click Save Changes to apply.');

    } catch (error) {
      if (error.code === 'storage/unauthorized') {
          toast.error('Permission denied. Please check Firebase Storage rules.');
      } else {
          toast.error(`Failed to upload image: ${error.message}`);
      }
    } finally {
      setUploadingImage(false);
    }
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
        
        {/* Photo Upload Section */}
        <div className="mb-6 flex items-center gap-6">
            <div className="avatar placeholder">
                {formData.photoURL ? (
                    <div className="w-24 h-24 rounded-full ring ring-[#CAEB66] ring-offset-base-100 ring-offset-2">
                        <img src={formData.photoURL} alt="Profile" />
                    </div>
                ) : (
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-24 h-24 flex items-center justify-center bg-gray-200">
                        <span className="text-3xl font-bold text-gray-500">{formData.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                    </div>
                )}
            </div>
            
            {isEditing && (
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Update Photo</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="file-input file-input-bordered file-input-sm w-full max-w-xs bg-white text-black mb-2"
                        disabled={uploadingImage}
                    />
                    {uploadingImage && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
                    
                    <div className="divider text-xs text-gray-400 my-1">OR</div>
                    
                    <input 
                        type="text" 
                        name="photoURL"
                        value={formData.photoURL}
                        onChange={handleChange}
                        placeholder="Paste image URL here"
                        className="input input-bordered input-sm w-full max-w-xs bg-white text-black border border-black"
                        disabled={uploadingImage}
                    />
                </div>
            )}
        </div>

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
