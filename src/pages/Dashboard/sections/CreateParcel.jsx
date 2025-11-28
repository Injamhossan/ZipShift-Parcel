import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { parcelApi, paymentApi } from "../../../utils/authApi";
import useDashboardStore from "../../../store/dashboardStore";
import PaymentModal from "../../../components/Payment/PaymentModal";

const CreateParcel = () => {
  const [parcel, setParcel] = useState({
    customerName: "",
    customerPhone: "",
    address: "",
    weight: "",
    cod: "",
    note: "",
    pickupOption: "rider",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    clientSecret: "",
    parcelId: "",
    amount: 0
  });

  const { prependParcel } = useDashboardStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParcel((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setParcel({
      customerName: "",
      customerPhone: "",
      address: "",
      weight: "",
      cod: "",
      note: "",
      pickupOption: "rider",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...parcel,
        weight: parseFloat(parcel.weight),
        cod: Number(parcel.cod),
      };
      const response = await parcelApi.createParcel(payload);
      const createdParcel = response?.data || response;
      
      if (createdParcel) {
        // Calculate delivery fee (Mock calculation: 60 base + 20 per kg)
        const deliveryFee = 60 + (parseFloat(parcel.weight) * 20);
        
        // Create payment intent
        const intentResponse = await paymentApi.createIntent({
          amount: deliveryFee,
          parcelId: createdParcel._id || createdParcel.id
        });

        setPaymentModal({
          isOpen: true,
          clientSecret: intentResponse.clientSecret,
          parcelId: createdParcel._id || createdParcel.id,
          amount: deliveryFee
        });

        prependParcel(createdParcel);
        toast.success("Parcel created! Please complete payment.");
        resetForm();
      }
    } catch (error) {
      console.error("Parcel create failed", error);
      toast.error(
        error?.response?.data?.message || "Failed to create parcel request"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      await paymentApi.confirmPayment({
        paymentIntentId: paymentIntent.id,
        parcelId: paymentModal.parcelId
      });
      
      toast.success("Payment successful! Parcel status updated.");
      setPaymentModal(prev => ({ ...prev, isOpen: false }));
      
      // Optionally refresh parcels list here if needed
    } catch (error) {
      console.error("Payment confirmation failed", error);
      toast.error("Payment confirmed but failed to update parcel status");
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-wide text-black">
          Book pickup
        </p>
        <h1 className="text-3xl font-bold text-black">
          Create a new parcel
        </h1>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control space-y-2">
            <label className="label">
              <span className="label-text font-medium text-black">
                Customer name
              </span>
            </label>
            <input
              type="text"
              name="customerName"
              value={parcel.customerName}
              onChange={handleChange}
              className="input text-black input-bordered bg-gray-50"
              placeholder="Md. Rahim"
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
              name="customerPhone"
              value={parcel.customerPhone}
              onChange={handleChange}
              className="input text-black input-bordered bg-gray-50"
              placeholder="01XXXXXXXXX"
              required
            />
          </div>
        </div>

        <div className="form-control space-y-2">
          <label className="label">
            <span className="label-text font-medium text-black">
              Delivery address
            </span>
          </label>
          <textarea
            name="address"
            value={parcel.address}
            onChange={handleChange}
            className="textarea text-black textarea-bordered bg-gray-50"
            placeholder="Road 2, House 11, Mirpur DOHS"
            rows={3}
            required
          ></textarea>
        </div>

        <div className="space-y-3 border border-dashed border-gray-200 rounded-2xl p-4 bg-gray-50/60">
          <p className="text-sm uppercase tracking-wide text-black">
            Pickup preference
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              {
                value: "rider",
                title: "ZipShift rider",
                description: "Our rider picks up from your address",
                icon: "fa-motorcycle",
              },
              {
                value: "merchant",
                title: "Drop to hub",
                description: "You will deliver parcels to the nearest hub",
                icon: "fa-store",
              },
            ].map((option) => {
              const isActive = parcel.pickupOption === option.value;
              return (
                <button
                  type="button"
                  key={option.value}
                  onClick={() =>
                    setParcel((prev) => ({
                      ...prev,
                      pickupOption: option.value,
                    }))
                  }
                  className={`flex-1 min-w-[240px] border rounded-2xl p-4 text-left transition ${
                    isActive
                      ? "border-[#CAEB66] bg-white shadow"
                      : "border-gray-200 bg-white/70 hover:border-[#CAEB66]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <i className={`fa-solid ${option.icon}`}></i>
                    </span>
                    <div>
                      <p className="font-semibold text-black">{option.title}</p>
                      <p className="text-sm text-black/70">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="form-control space-y-2">
            <label className="label">
              <span className="label-text font-medium text-black">
                Parcel weight
              </span>
            </label>
            <select
              name="weight"
              value={parcel.weight}
              onChange={handleChange}
              className="select text-black select-bordered bg-gray-50"
              required
            >
              <option value="">Select weight</option>
              <option value="0.5">0.5 KG</option>
              <option value="1">1 KG</option>
              <option value="1.5">1.5 KG</option>
              <option value="2">2 KG</option>
              <option value="3">3 KG</option>
              <option value="4">4 KG</option>
              <option value="5">5 KG</option>
              <option value="6">6 KG</option>
              <option value="7">7 KG</option>
              <option value="8">8 KG</option>
              <option value="9">9 KG</option>
              <option value="10">10 KG</option>
            </select>
          </div>

          <div className="form-control space-y-2">
            <label className="label">
              <span className="label-text font-medium text-black">
                COD amount
              </span>
            </label>
            <input
              type="number"
              name="cod"
              value={parcel.cod}
              onChange={handleChange}
              className="input text-black input-bordered bg-gray-50"
              placeholder="৳550"
              required
            />
          </div>

          <div className="form-control space-y-2">
            <label className="label">
              <span className="label-text font-medium text-black">
                Special note
              </span>
            </label>
            <input
              type="text"
              name="note"
              value={parcel.note}
              onChange={handleChange}
              className="input text-black input-bordered bg-gray-50"
              placeholder="Fragile / pay by bkash"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn bg-[#CAEB66] border-none text-black px-10"
            disabled={isSubmitting}
          >
            Submit parcel
          </button>
        </div>
      </form>

      <PaymentModal 
        isOpen={paymentModal.isOpen}
        clientSecret={paymentModal.clientSecret}
        amount={paymentModal.amount}
        onClose={() => setPaymentModal(prev => ({ ...prev, isOpen: false }))}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default CreateParcel;

