import { yupResolver } from "@hookform/resolvers/yup";
import { saveAs } from "file-saver";
import moment from "moment";
import { ChangeEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import SalarySlipPdf from "./SalarySlipPdf";

const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  startDate: yup.string().required("Start Date is required"),
  endDate: yup.string().required("End Date is required"),
  salary: yup
    .number()
    .typeError("Salary must be a number")
    .required("Salary is required"),
  employeeId: yup.string(),
  bankName: yup.string(),
  department: yup.string(),
  workingDay: yup.number(),
  joiningDate: yup.string(),
  location: yup.string(),
  acountNo: yup
    .string()
    .notRequired()
    .matches(/^\d+$/, "Account Number must contain only digits"),
  designation: yup.string(),
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

  const formValues = watch();

  return (
    <div className="min-h-[calc(100vh-80px)] max-w-screen-lg mx-auto">
      <div className=" flex flex-col gap-6">
        <h2 className="text-4xl font-semibold text-center">
          Enter Salary Details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="fullName"
                className="text-base font-bold text-black"
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-12">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="startDate"
                  className="text-base font-bold text-black"
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
                        errors?.startDate ? "border-red-500" : "border-gray-400"
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

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="endDate"
                  className="text-base font-bold text-black"
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
            </div>
            {startDate && endDate && (
              <p className="mt-4 text-centerbaseont-sebold text-black">
                {getFormattedDateRange()}
              </p>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-12">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="employeeId"
                  className="text-base font-bold text-black"
                >
                  Employee Id
                </label>
                <input
                  type="text"
                  id="employeeId"
                  {...register("employeeId")}
                  placeholder="Enter Employee Id"
                  className={`w-full p-2 border rounded focus:outline-none ${
                    errors?.employeeId ? "border-red-500" : "border-gray-400"
                  }`}
                />
                {errors?.employeeId?.message && (
                  <p className="text-red-500 text-xs">
                    {String(errors.employeeId.message)}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="workingDay"
                  className="text-base font-bold text-black"
                >
                  Working Day
                </label>
                <input
                  type="number"
                  id="workingDay"
                  {...register("workingDay")}
                  placeholder="Enter Working Day"
                  className={`w-full p-2 border rounded focus:outline-none ${
                    errors?.workingDay ? "border-red-500" : "border-gray-400"
                  }`}
                />
                {errors?.workingDay?.message && (
                  <p className="text-red-500 text-xs">
                    {String(errors.workingDay.message)}
                  </p>
                )}
              </div>
              {/* <div className="flex flex-col gap-2">
                <label
                  htmlFor="Department"
                  className="text-base font-bold text-black"
                >
                  Department
                </label>
                <input
                  type="text"
                  id="Department"
                  {...register("department")}
                  placeholder="Enter department"
                  className={`w-full p-2 border rounded focus:outline-none ${
                    errors?.department ? "border-red-500" : "border-gray-400"
                  }`}
                />
                {errors?.department?.message && (
                  <p className="text-red-500 text-xs">
                    {String(errors.department.message)}
                  </p>
                )}
              </div> */}
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-12">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="joingDate"
                  className="text-base font-bold text-black"
                >
                  Joining Date
                </label>
                <Controller
                  control={control}
                  name="joiningDate"
                  render={({ field }) => (
                    <input
                      type="date"
                      id="joiningDate"
                      value={reverseFormatDate(field.value)}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        field.onChange(
                          moment(e.target.value, "YYYY-MM-DD").format(
                            "DD-MM-YYYY"
                          )
                        );
                      }}
                      className={`w-full p-2 border rounded focus:outline-none ${
                        errors?.joiningDate
                          ? "border-red-500"
                          : "border-gray-400"
                      }`}
                    />
                  )}
                />
                {errors?.joiningDate?.message && (
                  <p className="text-red-500 text-xs">
                    {String(errors.joiningDate.message)}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="location"
                  className="text-base font-bold text-black"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  {...register("location")}
                  placeholder="Enter Location"
                  className={`w-full p-2 border rounded focus:outline-none ${
                    errors?.location ? "border-red-500" : "border-gray-400"
                  }`}
                />
                {errors?.location?.message && (
                  <p className="text-red-500 text-xs">
                    {String(errors.location.message)}
                  </p>
                )}
              </div>
            </div>
            {/* employee  details */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-12">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="Designation"
                  className="text-base font-bold text-black"
                >
                  Designation
                </label>
                <input
                  type="text"
                  id="Designation"
                  {...register("designation")}
                  placeholder="Enter Designation"
                  className={`w-full p-2 border rounded focus:outline-none ${
                    errors?.designation ? "border-red-500" : "border-gray-400"
                  }`}
                />
                {errors?.designation?.message && (
                  <p className="text-red-500 text-xs">
                    {String(errors.designation.message)}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="Department"
                  className="text-base font-bold text-black"
                >
                  Department
                </label>
                <input
                  type="text"
                  id="Department"
                  {...register("department")}
                  placeholder="Enter department"
                  className={`w-full p-2 border rounded focus:outline-none ${
                    errors?.department ? "border-red-500" : "border-gray-400"
                  }`}
                />
                {errors?.department?.message && (
                  <p className="text-red-500 text-xs">
                    {String(errors.department.message)}
                  </p>
                )}
              </div>
            </div>

            {/* bank  details */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-12">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="BankName"
                  className="text-base font-bold text-black"
                >
                  Bank Name
                </label>
                <input
                  type="text"
                  id="BankName"
                  {...register("bankName")}
                  placeholder="Enter Bank Name"
                  className={`w-full p-2 border rounded focus:outline-none ${
                    errors?.bankName ? "border-red-500" : "border-gray-400"
                  }`}
                />
                {errors?.bankName?.message && (
                  <p className="text-red-500 text-xs">
                    {String(errors.bankName.message)}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="acountNo"
                  className="text-base font-bold text-black"
                >
                  Acount No.
                </label>
                <input
                  type="text"
                  id="acountNo"
                  {...register("acountNo")}
                  placeholder="Enter Account No"
                  className={`w-full p-2 border rounded focus:outline-none ${
                    errors?.acountNo ? "border-red-500" : "border-gray-400"
                  }`}
                />
                {errors?.acountNo?.message && (
                  <p className="text-red-500 text-xs">
                    {String(errors.acountNo.message)}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="salary"
                  className="text-base font-bold text-black"
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
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 bg-primary text-white py-2 rounded cursor-pointer"
            >
              Generate PDF
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalarySlip;
