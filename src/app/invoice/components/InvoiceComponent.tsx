"use client";
import { useDisableNumberInputScroll } from "@/components/utils/utils";
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
  emailfrom: string;
  phonefrom: string;
  companyNameTo: string;
  addressTo: string;
  emailTo: string;
  phoneTo: string;
  items: Iitem[];
  tax: number;
  isView: boolean;
  currency: string;
  taxCaculateOption: string;
  accountHolderName: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  swiftCode: string;
  invoiceNumber: string;
}

export default function InvoiceComponent() {
  const {
    control,
    handleSubmit,
    register,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      companyNameFrom: "",
      addressfrom: "",
      companyNameTo: "",
      addressTo: "",
      tax: 0,
      isView: false,
      currency: "",
      taxCaculateOption: "",
      accountHolderName: "",
      accountNumber: "",
      bankName: "",
      ifscCode: "",
      swiftCode: "",
      emailfrom: "",
      emailTo: "",
      items: [
        {
          description: "",
          quantity: 0,
          price: 0,
        },
      ],
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

  useDisableNumberInputScroll();
  return (
    <div className="min-h-[calc(100vh-80px)] pt-28 flex items-center justify-center">
      <div className="h-full container mx-auto">
        <div className="max-w-screen-lg mx-auto flex justify-center items-center">
          <div className="w-full flex flex-col gap-7">
            <h2 className="text-4xl font-semibold text-center">
              Enter Invoice Details
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-7"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                <div className="flex flex-col gap-4 md:gap-5">
                  <label className="text-2xl capitalize font-semibold text-primary">
                    Billed By
                  </label>
                  {/* Company Name */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="companyNameFrom"
                      className="text-base font-bold text-black"
                    >
                      Company Name
                    </label>
                    <input
                      {...register("companyNameFrom")}
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

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="emailfrom"
                      className="text-base font-bold text-black"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("emailfrom")}
                      id="emailfrom"
                      className={`w-full p-2 border rounded focus:outline-none ${
                        errors?.emailfrom ? "border-red-500" : "border-gray-400"
                      }`}
                      placeholder="Enter Email address"
                    />
                    {errors.emailfrom && (
                      <span className="text-red-500">
                        {errors.emailfrom.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="phonefrom"
                      className="text-base font-bold text-black"
                    >
                      Contact Number
                    </label>
                    <input
                      type="text"
                      {...register("phonefrom")}
                      id="phonefrom"
                      className={`w-full p-2 border rounded focus:outline-none ${
                        errors?.phonefrom ? "border-red-500" : "border-gray-400"
                      }`}
                      placeholder="Enter Contact Number"
                      // onKeyDown={(event) => {
                      //   const allowedKeys = [
                      //     "Backspace",
                      //     "Delete",
                      //     "ArrowLeft",
                      //     "ArrowRight",
                      //     "Tab",
                      //   ];

                      //   const isNumberKey =
                      //     event.key >= "0" && event.key <= "9";
                      //   const isDot = event.key === ".";
                      //   const alreadyHasDot =
                      //     event.currentTarget.value.includes(".");

                      //   if (
                      //     !isNumberKey &&
                      //     !allowedKeys.includes(event.key) &&
                      //     !(isDot && !alreadyHasDot)
                      //   ) {
                      //     event.preventDefault();
                      //   }
                      // }}
                    />
                    {errors.phonefrom && (
                      <span className="text-red-500">
                        {errors.phonefrom.message}
                      </span>
                    )}
                  </div>
                  {/* Address */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="Companyaddress"
                      className="text-base font-bold text-black"
                    >
                      Company Address
                    </label>
                    <textarea
                      {...register("addressfrom")}
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
                <div className="flex flex-col gap-4 md:gap-5">
                  <label className="text-2xl capitalize font-semibold text-primary">
                    Billed To
                  </label>
                  {/* Company Name */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="companyNameTo"
                      className="text-base font-bold text-black"
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

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="emailTo"
                      className="text-base font-bold text-black"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("emailTo")}
                      id="emailTo"
                      className={`w-full p-2 border rounded focus:outline-none ${
                        errors?.emailTo ? "border-red-500" : "border-gray-400"
                      }`}
                      placeholder="Enter Email address"
                    />
                    {errors.emailTo && (
                      <span className="text-red-500">
                        {errors.emailTo.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="phoneTo"
                      className="text-base font-bold text-black"
                    >
                      Contact Number
                    </label>
                    <input
                      type="number"
                      {...register("phoneTo")}
                      id="phoneTo"
                      className={`w-full p-2 border rounded focus:outline-none ${
                        errors?.phoneTo ? "border-red-500" : "border-gray-400"
                      }`}
                      placeholder="Enter Contact Number"
                      onKeyDown={(event) => {
                        const allowedKeys = [
                          "Backspace",
                          "Delete",
                          "ArrowLeft",
                          "ArrowRight",
                          "Tab",
                        ];

                        const isNumberKey =
                          event.key >= "0" && event.key <= "9";
                        const isDot = event.key === ".";
                        const alreadyHasDot =
                          event.currentTarget.value.includes(".");

                        if (
                          !isNumberKey &&
                          !allowedKeys.includes(event.key) &&
                          !(isDot && !alreadyHasDot)
                        ) {
                          event.preventDefault();
                        }
                      }}
                    />
                    {errors.phoneTo && (
                      <span className="text-red-500">
                        {errors.phoneTo.message}
                      </span>
                    )}
                  </div>
                  {/* Address */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="addressTo"
                      className="text-base font-bold text-black"
                    >
                      Company Address
                    </label>
                    <textarea
                      {...register("addressTo")}
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
              </div>
              <div className="flex flex-col gap-4 md:gap-5">
                <label className="text-2xl capitalize font-semibold text-primary">
                  Invoice Items
                </label>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="invoiceNumber"
                    className="text-base font-bold text-black"
                  >
                    Invoice No
                  </label>
                  <input
                    {...register("invoiceNumber", {
                      required: "Invoice No is required",
                    })}
                    type="text"
                    id="invoiceNumber"
                    className={`w-full p-2 border rounded focus:outline-none ${
                      errors?.invoiceNumber
                        ? "border-red-500"
                        : "border-gray-400"
                    }`}
                    placeholder="Enter Invoice No"
                  />
                  {errors.invoiceNumber && (
                    <span className="text-red-500">
                      {errors.invoiceNumber.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  {items.map((item: any, index) => (
                    <div key={item.id} className="space-y-2 ">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 border-b-2 border-gray-300 pb-5 md:border-none md:py-0">
                        <div className="flex flex-col gap-2">
                          <label className="text-base font-bold text-black">
                            item
                          </label>

                          <input
                            onChange={(e) => {
                              const updatedFields = [...items];
                              updatedFields[index].description = e.target.value;
                              setItems(updatedFields);
                            }}
                            type="text"
                            className="w-full p-2 border border-gray-400 rounded focus:outline-none"
                            placeholder="Enter Description"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-base font-bold text-black">
                            Quantity
                          </label>

                          <input
                            onChange={(e) => {
                              const updatedFields: any = [...items];
                              updatedFields[index].quantity = e.target.value;
                              setItems(updatedFields);
                            }}
                            type="number"
                            min="0"
                            pattern="[0-9\.]+"
                            className=" p-2 border border-gray-400 rounded focus:outline-none"
                            placeholder="Quantity"
                            onKeyDown={(event) => {
                              const allowedKeys = [
                                "Backspace",
                                "Delete",
                                "ArrowLeft",
                                "ArrowRight",
                                "Tab",
                              ];

                              const isNumberKey =
                                event.key >= "0" && event.key <= "9";
                              const isDot = event.key === ".";
                              const alreadyHasDot =
                                event.currentTarget.value.includes(".");

                              if (
                                !isNumberKey &&
                                !allowedKeys.includes(event.key) &&
                                !(isDot && !alreadyHasDot)
                              ) {
                                event.preventDefault();
                              }
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-base font-bold text-black">
                            Rate
                          </label>

                          <input
                            onChange={(e) => {
                              const updatedFields = [...items];
                              updatedFields[index].price = e.target.value;
                              setItems(updatedFields);
                            }}
                            type="number"
                            min="0"
                            step="0.01"
                            pattern="[0-9\.]+"
                            className=" p-2 border border-gray-400 rounded focus:outline-none"
                            placeholder="Unit Price"
                            onKeyDown={(event) => {
                              const allowedKeys = [
                                "Backspace",
                                "Delete",
                                "ArrowLeft",
                                "ArrowRight",
                                "Tab",
                              ];

                              const isNumberKey =
                                event.key >= "0" && event.key <= "9";
                              const isDot = event.key === ".";
                              const alreadyHasDot =
                                event.currentTarget.value.includes(".");

                              if (
                                !isNumberKey &&
                                !allowedKeys.includes(event.key) &&
                                !(isDot && !alreadyHasDot)
                              ) {
                                event.preventDefault();
                              }
                            }}
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
                  <div>
                    <button
                      type="button"
                      onClick={handleAddItem}
                      className="mt-2 w-auto px-5 bg-primary text-white cursor-pointer py-2 rounded"
                    >
                      Add Item
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 md:gap-5">
                <label className="text-2xl capitalize font-semibold text-primary">
                  Bank Details
                </label>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="accountHolderName"
                      className="text-base font-bold text-black"
                    >
                      Account Holder Name
                    </label>
                    <input
                      {...register("accountHolderName")}
                      type="text"
                      id="accountHolderName"
                      className={`w-full p-2 border rounded focus:outline-none ${
                        errors?.accountHolderName
                          ? "border-red-500"
                          : "border-gray-400"
                      }`}
                      placeholder="Enter Account Holder Name"
                    />
                    {errors.accountHolderName && (
                      <span className="text-red-500">
                        {errors.accountHolderName.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="accountNumber"
                      className="text-base font-bold text-black"
                    >
                      Account Number
                    </label>
                    <input
                      {...register("accountNumber")}
                      type="number"
                      id="accountNumber"
                      pattern="[0-9\.]+"
                      className={`w-full p-2 border rounded focus:outline-none ${
                        errors?.accountNumber
                          ? "border-red-500"
                          : "border-gray-400"
                      }`}
                      placeholder="Enter Account Number"
                      onKeyDown={(event) => {
                        const allowedKeys = [
                          "Backspace",
                          "Delete",
                          "ArrowLeft",
                          "ArrowRight",
                          "Tab",
                        ];

                        const isNumberKey =
                          event.key >= "0" && event.key <= "9";
                        const isDot = event.key === ".";
                        const alreadyHasDot =
                          event.currentTarget.value.includes(".");

                        if (
                          !isNumberKey &&
                          !allowedKeys.includes(event.key) &&
                          !(isDot && !alreadyHasDot)
                        ) {
                          event.preventDefault();
                        }
                      }}
                    />
                    {errors.accountNumber && (
                      <span className="text-red-500">
                        {errors.accountNumber.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="bankName"
                      className="text-base font-bold text-black"
                    >
                      Bank Name
                    </label>
                    <input
                      {...register("bankName")}
                      type="text"
                      id="bankName"
                      className={`w-full p-2 border rounded focus:outline-none ${
                        errors?.bankName ? "border-red-500" : "border-gray-400"
                      }`}
                      placeholder="Enter Bank Name"
                    />
                    {errors.bankName && (
                      <span className="text-red-500">
                        {errors.bankName.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="ifscCode"
                      className="text-base font-bold text-black"
                    >
                      IFSC Code
                    </label>
                    <input
                      {...register("ifscCode")}
                      type="text"
                      id="ifscCode"
                      className={`w-full p-2 border rounded focus:outline-none ${
                        errors?.ifscCode ? "border-red-500" : "border-gray-400"
                      }`}
                      placeholder="Enter IFSC Code"
                    />
                    {errors.ifscCode && (
                      <span className="text-red-500">
                        {errors.ifscCode.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="SWIFTCode"
                      className="text-base font-bold text-black"
                    >
                      SWIFT Code
                    </label>
                    <input
                      {...register("swiftCode")}
                      type="text"
                      id="SWIFT Code"
                      className={`w-full p-2 border rounded focus:outline-none ${
                        errors?.swiftCode ? "border-red-500" : "border-gray-400"
                      }`}
                      placeholder="Enter SWIFT Code"
                    />
                    {errors.swiftCode && (
                      <span className="text-red-500">
                        {errors.swiftCode.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 md:gap-5">
                <label className="text-2xl capitalize font-semibold text-primary">
                  other
                </label>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="Currency"
                    className="text-base font-bold text-black"
                  >
                    Currency
                  </label>
                  <select
                    {...register("currency", {
                      required: "Currency is required",
                    })}
                    id="Currency"
                    value={watch("currency") || ""}
                    className={`w-full p-2 border rounded focus:outline-none ${
                      errors?.currency ? "border-red-500" : "border-gray-400"
                    }`}
                  >
                    <option value="" disabled>
                      Select Curruncy
                    </option>
                    <option value="₹">INR</option>
                    <option value="$">USD</option>
                    <option value="€" label="Euro">
                      EUR
                    </option>
                    <option value="£">Pound</option>
                  </select>
                  {errors.currency && (
                    <span className="text-red-500">
                      {errors.currency.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="taxcaculate"
                    className="text-base font-bold text-black"
                  >
                    Tax Caculate
                  </label>
                  <div className="flex items-center gap-5">
                    <div className="flex items-center">
                      <input
                        id="default-radio-1"
                        defaultChecked
                        type="radio"
                        value="Percentage"
                        {...register("taxCaculateOption")}
                        className="w-5 h-5 text-primary bg-gray-100 border-gray-300 cursor-pointer"
                      />
                      <label
                        htmlFor="default-radio-1"
                        className="ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        Percentage %
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="default-radio-2"
                        type="radio"
                        value="fixRate"
                        {...register("taxCaculateOption")}
                        className="w-5 h-5 text-primary bg-gray-100 border-gray-300 cursor-pointer"
                      />
                      <label
                        htmlFor="default-radio-2"
                        className="ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        Fix Rate
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="tax"
                    className="text-base font-bold text-black"
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
                    placeholder="Enter Tax"
                    onKeyDown={(event) => {
                      const allowedKeys = [
                        "Backspace",
                        "Delete",
                        "ArrowLeft",
                        "ArrowRight",
                        "Tab",
                      ];

                      const isNumberKey = event.key >= "0" && event.key <= "9";
                      const isDot = event.key === ".";
                      const alreadyHasDot =
                        event.currentTarget.value.includes(".");

                      if (
                        !isNumberKey &&
                        !allowedKeys.includes(event.key) &&
                        !(isDot && !alreadyHasDot)
                      ) {
                        event.preventDefault();
                      }
                    }}
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
                        if (field.value === false) {
                          setValue(
                            "companyNameFrom",
                            "Jamatrix Innovations Private LLP"
                          );
                          setValue(
                            "addressfrom",
                            "407 Shivalik, Dabholi-BRTS road, Katargam, Surat, Gujarat 395004."
                          );
                          setValue(
                            "emailfrom",
                            "jamatrixinnovations@gmail.com"
                          );
                          setValue("phonefrom", "+91 96015 00430");
                        }
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
