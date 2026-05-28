import { useForm } from "react-hook-form";
import { useState, React } from "react";

const ROLES = ["Frontend Engineer", "Backend Engineer", "Ai Developer"];

const HookForm = () => {
  const {
    register,
    handleSubmit,

    formState: {
      errors,
      isSubmitSuccessful,
      isSubmitting,
      isSubmitted,
      getValues,
    },
  } = useForm({ defaultValues: { name: "Arghya" }, mode: "onTouched" });

  function submit(data) {
    return new Promise((res) => console.log("Submitted"));
  }

  if (isSubmitSuccessful) {
    return (
      <div>
        <h1>Form Submitted Successfully</h1>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 sm:px-10 md:px-20 lg:px-30">
        <div>
          <h1 className="text-2xl font-semibold mb-4 text-center">
            React Hook Form
          </h1>

          <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
            <label className="flex flex-col text-sm font-medium w-full sm:w-auto sm:mx-10 md:mx-20 lg:mx-30">
              Full Name
              <input
                {...register("name", { required: "Name is required" })}
                className="border rounded-md p-2 mt-1 outline-none focus:ring-2 focus:ring-black"
              />
            </label>

            <label className="flex flex-col text-sm font-medium w-full sm:w-auto sm:mx-10 md:mx-20 lg:mx-30">
              Email
              <input
                {...register("email", { required: "Email is required" })}
                className="border rounded-md p-2 mt-1 outline-none focus:ring-2 focus:ring-black"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white py-2 rounded-md w-full sm:w-auto sm:mx-10 md:mx-20 lg:mx-30"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default HookForm;
