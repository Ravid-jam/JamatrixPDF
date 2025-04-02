"use client";
import clsx from "clsx";
import { saveAs } from "file-saver";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InvoiceSlip from "./InvoiceSlip";

interface Iitem {
  description: string;
  quantity: number;
  price: number;
}

interface FormData {
  companyNameFrom: string;
  addressfrom: string;
  companyNameTo: string;
  addressTo: string;
  items: Iitem[];
  tax: number;
  isView: boolean;
}
export default function InvoiceComponent() {
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({
    defaultValues: {
      companyNameFrom: "",
      addressfrom: "",
      companyNameTo: "",
      addressTo: "",
      tax: 0,
      isView: false,
    },
  });

  const [items, setItems] = useState<any[]>([
    { id: 1, description: "", quantity: "", price: "" },
  ]);

  const handleAddItem = () => {
    setItems((prevFields) => [
      ...prevFields,
      { id: Date.now(), description: "", quantity: "", price: "" },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormData) => {
    const updatedData = {
      ...data,
      items: items,
    };

    const { pdf } = await import("@react-pdf/renderer");
    const blob = await pdf(<InvoiceSlip data={updatedData} />).toBlob();
    saveAs(blob, `Invoice.pdf`);
  };

  const isToggled = watch("isView");

  return (
    <div className="min-h-[calc(100vh-80px)] pt-28 flex items-center justify-center">
      <div className="h-full max-w-screen-xl mx-auto">
        <div className="flex justify-center items-center">
          <div className="w-full flex flex-col gap-7">
            <h2 className="text-4xl font-semibold text-center">
              Enter Invoice Details
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              {/* Items List */}
              <div className="space-y-4">
                {items.map((item: any, index) => (
                  <div key={item.id} className="space-y-2">
                    <div className="grid grid-cols-4 gap-5">
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Description
                        </label>

                        <input
                          onChange={(e) => {
                            const updatedFields = [...items];
                            updatedFields[index].description = e.target.value;
                            setItems(updatedFields);
                          }}
                          type="text"
                          className="w-full p-2 border border-gray-400 rounded"
                          placeholder="Enter Description"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                          QTY
                        </label>

                        <input
                          onChange={(e) => {
                            const updatedFields: any = [...items];
                            updatedFields[index].quantity = e.target.value;
                            setItems(updatedFields);
                          }}
                          type="number"
                          className=" p-2 border border-gray-400 rounded"
                          placeholder="Quantity"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                          Price
                        </label>

                        <input
                          onChange={(e) => {
                            const updatedFields = [...items];
                            updatedFields[index].price = e.target.value;
                            setItems(updatedFields);
                          }}
                          type="number"
                          className=" p-2 border border-gray-400 rounded"
                          placeholder="Price"
                        />
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          className={clsx(
                            " text-red-600 flex justify-center items-center mt-3 h-full cursor-pointer",
                            items.length > 1 ? "block" : "hidden"
                          )}
                        >
                          <Trash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="mt-2 w-auto px-5 bg-primary text-white cursor-pointer py-2 rounded"
                >
                  Add Item
                </button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-6">
                  <label className="text-base font-bold text-black">From</label>
                  {/* Company Name */}
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="companyNameFrom"
                      className="text-sm font-medium text-gray-700"
                    >
                      Company Name
                    </label>
                    <input
                      {...register("companyNameFrom", {
                        required: "Company name is required",
                      })}
                      type="text"
                      id="companyNameFrom"
                      className={`w-full p-2 border rounded focus:outline-none ${
                        errors?.companyNameFrom
                          ? "border-red-500"
                          : "border-gray-400"
                      }`}
                      placeholder="Enter Company name"
                    />
                    {errors.companyNameFrom && (
                      <span className="text-red-500">
                        {errors.companyNameFrom.message}
                      </span>
                    )}
                  </div>

                  {/* Address */}
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="Companyaddress"
                      className="text-sm font-medium text-gray-700"
                    >
                      Company Address
                    </label>
                    <textarea
                      {...register("addressfrom", {
                        required: "Company Address is required",
                      })}
                      id="Companyaddress"
                      className={`w-full p-2 border rounded focus:outline-none ${
                        errors?.addressfrom
                          ? "border-red-500"
                          : "border-gray-400"
                      }`}
                      placeholder="Enter Company address"
                    />
                    {errors.addressfrom && (
                      <span className="text-red-500">
                        {errors.addressfrom.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <label className="text-base font-bold text-black">To</label>
                  {/* Company Name */}
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="companyNameTo"
                      className="text-sm font-medium text-gray-700"
                    >
                      Company Name
                    </label>
                    <input
                      {...register("companyNameTo", {
                        required: "Company name is required",
                      })}
                      type="text"
                      id="companyNameTo"
                      className={`w-full p-2 border rounded focus:outline-none ${
                        errors?.companyNameTo
                          ? "border-red-500"
                          : "border-gray-400"
                      }`}
                      placeholder="Enter Company name"
                    />
                    {errors.companyNameTo && (
                      <span className="text-red-500">
                        {errors.companyNameTo.message}
                      </span>
                    )}
                  </div>

                  {/* Address */}
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="addressTo"
                      className="text-sm font-medium text-gray-700"
                    >
                      Company Address
                    </label>
                    <textarea
                      {...register("addressTo", {
                        required: "Company Address is required",
                      })}
                      id="addressTo"
                      className={`w-full p-2 border rounded focus:outline-none ${
                        errors?.addressTo ? "border-red-500" : "border-gray-400"
                      }`}
                      placeholder="Enter Company address"
                    />
                    {errors.addressTo && (
                      <span className="text-red-500">
                        {errors.addressTo.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="tax"
                    className="text-sm font-medium text-gray-700"
                  >
                    Tax
                  </label>
                  <input
                    {...register("tax")}
                    id="tax"
                    type="number"
                    className={`w-full p-2 border rounded focus:outline-none ${
                      errors?.tax ? "border-red-500" : "border-gray-400"
                    }`}
                    placeholder="Enter Company address"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center mt-6">
                <Controller
                  name="isView"
                  control={control}
                  render={({ field }) => (
                    <button
                      type="button"
                      onClick={() => {
                        field.onChange(!field.value);
                      }}
                      className={`w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 transition duration-300 ${
                        field.value ? "bg-green-500" : "bg-gray-400"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition ${
                          field.value ? "translate-x-6" : "translate-x-0"
                        }`}
                      ></div>
                    </button>
                  )}
                />

                <p className="mt-4 text-base font-semibold">
                  Status:&nbsp;
                  <span className="text-base font-medium">
                    {isToggled
                      ? "✅ Company Logo & Stamp are now visible!"
                      : "❌ Company Logo & Stamp are hidden."}
                  </span>
                </p>
              </div>
              {/* Generate PDF Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="mt-4 px-4 bg-primary text-white py-2 rounded"
                >
                  Generate PDF
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
