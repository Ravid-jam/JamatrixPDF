import { yupResolver } from "@hookform/resolvers/yup";
import { saveAs } from "file-saver";
import moment from "moment";
import { ChangeEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import SalarySlipPdf from "./SalarySlipPdf";
import dynamic from "next/dynamic";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
// import { pdf } from "@react-pdf/renderer";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  startDate: yup.string().required("Start Date is required"),
  endDate: yup.string().required("End Date is required"),
  salary: yup
    .number()
    .typeError("Salary must be a number")
    .required("Salary is required")
    .min(1000, "Salary must be at least 1000"),
});

const SalarySlip = () => {
  const reverseFormatDate = (date: string): string => {
    return date ? moment(date, "DD-MM-YYYY").format("YYYY-MM-DD") : "";
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const salary = watch("salary");
  const fullName = watch("fullName");

  const getFormattedDateRange = () => {
    if (!startDate || !endDate) return "";
    const start = moment(startDate, "DD-MM-YYYY").format("MMMM D");
    const end = moment(endDate, "DD-MM-YYYY").format("MMMM D, YYYY");

    return `${start} - ${end}`;
  };

  const onSubmit = async (data: any) => {
    const { pdf } = await import("@react-pdf/renderer");
    const blob = await pdf(<SalarySlipPdf data={data} />).toBlob();
    saveAs(blob, `${data.fullName}-salary-slip.pdf`);
  };

  const formData = {
    fullName: fullName,
    salary: salary,
    startDate: startDate,
    endDate: endDate,
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="w-[700px] h-[638px] overflow-hidden">
          <PDFViewer
            width="100%"
            height="100%"
            style={{
              overflow: "hidden",
            }}
            showToolbar={false}
          >
            <SalarySlipPdf data={formData} />
          </PDFViewer>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Enter Salary Details
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="fullName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    {...register("fullName")}
                    placeholder="Enter full name"
                    className={`w-full p-2 border rounded focus:outline-none ${
                      errors?.fullName ? "border-red-500" : "border-gray-400"
                    }`}
                  />
                  {errors?.fullName?.message && (
                    <p className="text-red-500 text-xs">
                      {String(errors.fullName.message)}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="startDate"
                    className="text-sm font-medium text-gray-700"
                  >
                    From
                  </label>
                  <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                      <input
                        type="date"
                        id="startDate"
                        value={reverseFormatDate(field.value)}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          field.onChange(
                            moment(e.target.value, "YYYY-MM-DD").format(
                              "DD-MM-YYYY"
                            )
                          );
                        }}
                        className={`w-full p-2 border rounded focus:outline-none ${
                          errors?.startDate
                            ? "border-red-500"
                            : "border-gray-400"
                        }`}
                      />
                    )}
                  />
                  {errors?.startDate?.message && (
                    <p className="text-red-500 text-xs">
                      {String(errors.startDate.message)}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="endDate"
                    className="text-sm font-medium text-gray-700"
                  >
                    To
                  </label>
                  <Controller
                    control={control}
                    name="endDate"
                    render={({ field }) => (
                      <input
                        type="date"
                        id="endDate"
                        value={reverseFormatDate(field.value)}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          field.onChange(
                            moment(e.target.value, "YYYY-MM-DD").format(
                              "DD-MM-YYYY"
                            )
                          );
                        }}
                        className={`w-full p-2 border rounded focus:outline-none ${
                          errors?.endDate ? "border-red-500" : "border-gray-400"
                        }`}
                      />
                    )}
                  />
                  {errors?.endDate?.message && (
                    <p className="text-red-500 text-xs">
                      {String(errors.endDate.message)}
                    </p>
                  )}
                </div>
                {startDate && endDate && (
                  <p className="mt-4 text-center font-semibold text-gray-700">
                    {getFormattedDateRange()}
                  </p>
                )}

                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="salary"
                    className="text-sm font-medium text-gray-700"
                  >
                    Salary Amount
                  </label>
                  <input
                    type="number"
                    id="salary"
                    {...register("salary")}
                    placeholder="Enter salary"
                    className={`w-full p-2 border rounded focus:outline-none ${
                      errors?.salary ? "border-red-500" : "border-gray-400"
                    }`}
                  />
                  {errors?.salary?.message && (
                    <p className="text-red-500 text-xs">
                      {String(errors.salary.message)}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-primary text-white py-2 rounded cursor-pointer"
              >
                Generate PDF
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalarySlip;
