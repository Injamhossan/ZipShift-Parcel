import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { parcelApi, paymentApi } from "../../../utils/authApi";
import useAuthStore from "../../../store/authStore";
import { useNavigate } from "react-router-dom";

const CreateParcel = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    parcelType: 'non-document',
    weight: '',
    senderInfo: {
      name: user?.name || '',
      contact: user?.phone || '',
      region: '',
      serviceCenter: '',
      address: user?.address || '',
      instruction: ''
    },
    receiverInfo: {
      name: '',
      contact: '',
      region: '',
      serviceCenter: '',
      address: '',
      instruction: ''
    }
  });

  const [cost, setCost] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock regions and service centers
  const regions = ['Dhaka', 'Chittagong', 'Sylhet', 'Khulna'];
  const serviceCenters = ['Center A', 'Center B', 'Center C'];

  useEffect(() => {
    calculateCost();
  }, [formData.parcelType, formData.weight, formData.senderInfo.serviceCenter, formData.receiverInfo.serviceCenter]);

  const calculateCost = () => {
    let baseCost = 60;
    if (formData.parcelType === 'document') {
        baseCost = 50;
    } else {
        const weight = parseFloat(formData.weight) || 0;
        baseCost += weight * 20;
    }

    // Inter-district charge (mock logic)
    if (formData.senderInfo.serviceCenter && formData.receiverInfo.serviceCenter && 
        formData.senderInfo.serviceCenter !== formData.receiverInfo.serviceCenter) {
        baseCost += 40;
    }

    setCost(baseCost);
  };

  const handleChange = (section, field, value) => {
    if (section === 'root') {
        setFormData(prev => ({ ...prev, [field]: value }));
    } else {
        setFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value }
        }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        weight: formData.parcelType === 'document' ? 0 : parseFloat(formData.weight),
        cost
      };
      
      const response = await parcelApi.createParcel(payload);
      
      if (response.success) {
        toast.success(`Parcel created! Cost: ৳${cost}`);
        navigate(`/dashboard/pay/${response.data.id}`);
      }
    } catch (error) {
      console.error("Parcel create failed", error);
      toast.error(error?.response?.data?.message || "Failed to create parcel");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-black">Create a New Parcel</h1>
        <p className="text-gray-500">Fill in the details below to book a delivery.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-8">
        
        {/* Parcel Info */}
        <section className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2 text-black">Parcel Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="form-control">
                    <label className="label"><span className="label-text text-black">Type</span></label>
                    <select 
                        className="select select-bordered text-black bg-white border border-gray-300"
                        value={formData.parcelType}
                        onChange={(e) => handleChange('root', 'parcelType', e.target.value)}
                    >
                        <option value="document">Document</option>
                        <option value="non-document">Non-Document</option>
                    </select>
                </div>
                {formData.parcelType === 'non-document' && (
                    <div className="form-control">
                        <label className="label"><span className="label-text text-black">Weight (KG)</span></label>
                        <input 
                            type="number" 
                            className="input input-bordered text-black bg-white border border-gray-300"
                            value={formData.weight}
                            onChange={(e) => handleChange('root', 'weight', e.target.value)}
                            required
                            min="0.1"
                            step="0.1"
                        />
                    </div>
                )}
            </div>
        </section>

        {/* Sender Info */}
        <section className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2 text-black">Sender Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                    <label className="label"><span className="label-text text-black">Name</span></label>
                    <input 
                        type="text" 
                        className="input input-bordered text-black bg-white border border-gray-300"
                        value={formData.senderInfo.name}
                        onChange={(e) => handleChange('senderInfo', 'name', e.target.value)}
                        required// Prefilled
                    />
                </div>
                <div className="form-control">
                    <label className="label"><span className="label-text text-black">Contact</span></label>
                    <input 
                        type="text" 
                        className="input input-bordered text-black bg-white border border-gray-300"
                        value={formData.senderInfo.contact}
                        onChange={(e) => handleChange('senderInfo', 'contact', e.target.value)}
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label"><span className="label-text text-black">Region</span></label>
                    <select 
                        className="select select-bordered text-black bg-white border border-gray-300"
                        value={formData.senderInfo.region}
                        onChange={(e) => handleChange('senderInfo', 'region', e.target.value)}
                        required
                    >
                        <option value="">Select Region</option>
                        {regions.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>
                <div className="form-control">
                    <label className="label"><span className="label-text text-black">Service Center</span></label>
                    <select 
                        className="select select-bordered text-black bg-white border border-gray-300"
                        value={formData.senderInfo.serviceCenter}
                        onChange={(e) => handleChange('senderInfo', 'serviceCenter', e.target.value)}
                        required
                    >
                        <option value="">Select Center</option>
                        {serviceCenters.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div className="form-control md:col-span-2">
                    <label className="label"><span className="label-text text-black">Address</span></label>
                    <textarea 
                        className="textarea textarea-bordered text-black bg-white border border-gray-300"
                        value={formData.senderInfo.address}
                        onChange={(e) => handleChange('senderInfo', 'address', e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-control md:col-span-2">
                    <label className="label"><span className="label-text text-black">Pickup Instruction</span></label>
                    <input 
                        type="text" 
                        className="input input-bordered text-black bg-white border border-gray-300"
                        value={formData.senderInfo.instruction}
                        onChange={(e) => handleChange('senderInfo', 'instruction', e.target.value)}
                    />
                </div>
            </div>
        </section>

        {/* Receiver Info */}
        <section className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2 text-black">Receiver Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                    <label className="label"><span className="label-text text-black">Name</span></label>
                    <input 
                        type="text" 
                        className="input input-bordered text-black bg-white border border-gray-300"
                        value={formData.receiverInfo.name}
                        onChange={(e) => handleChange('receiverInfo', 'name', e.target.value)}
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label"><span className="label-text text-black">Contact</span></label>
                    <input 
                        type="text" 
                        className="input input-bordered text-black bg-white border border-gray-300"
                        value={formData.receiverInfo.contact}
                        onChange={(e) => handleChange('receiverInfo', 'contact', e.target.value)}
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label"><span className="label-text text-black">Region</span></label>
                    <select 
                        className="select select-bordered text-black bg-white border border-gray-300"
                        value={formData.receiverInfo.region}
                        onChange={(e) => handleChange('receiverInfo', 'region', e.target.value)}
                        required
                    >
                        <option value="">Select Region</option>
                        {regions.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>
                <div className="form-control">
                    <label className="label"><span className="label-text text-black">Service Center</span></label>
                    <select 
                        className="select select-bordered text-black bg-white border border-gray-300"
                        value={formData.receiverInfo.serviceCenter}
                        onChange={(e) => handleChange('receiverInfo', 'serviceCenter', e.target.value)}
                        required
                    >
                        <option value="">Select Center</option>
                        {serviceCenters.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div className="form-control md:col-span-2">
                    <label className="label"><span className="label-text text-black">Address</span></label>
                    <textarea 
                        className="textarea textarea-bordered text-black bg-white border border-gray-300"
                        value={formData.receiverInfo.address}
                        onChange={(e) => handleChange('receiverInfo', 'address', e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-control md:col-span-2">
                    <label className="label"><span className="label-text text-black">Delivery Instruction</span></label>
                    <input 
                        type="text" 
                        className="input input-bordered text-black bg-white border border-gray-300"
                        value={formData.receiverInfo.instruction}
                        onChange={(e) => handleChange('receiverInfo', 'instruction', e.target.value)}
                    />
                </div>
            </div>
        </section>

        <div className="flex items-center justify-between pt-6 border-t">
            <div className="text-xl font-bold text-black">
                Total Cost: <span className="text-black bg-white border border-gray-300 px-2 py-1 rounded">৳{cost}</span>
            </div>
            <button
                type="submit"
                className="btn bg-[#CAEB66] border-none text-black px-10 hover:bg-[#b8d955]"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Confirm & Submit'}
            </button>
        </div>

      </form>
    </div>
  );
};

export default CreateParcel;

