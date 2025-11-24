import React, { useState } from "react";
import { toast } from "react-hot-toast";

const CreateParcel = () => {
  const [parcel, setParcel] = useState({
    customerName: "",
    customerPhone: "",
    address: "",
    weight: "",
    cod: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParcel((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Parcel request submitted. Rider will be assigned soon.");
    setParcel({
      customerName: "",
      customerPhone: "",
      address: "",
      weight: "",
      cod: "",
      note: "",
    });
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
          >
            Submit parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateParcel;

