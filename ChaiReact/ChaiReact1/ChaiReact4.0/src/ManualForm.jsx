import React, { useState } from "react";

const ROLE = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
];

function ManualForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  const [submit, setSubmit] = useState();
  const [name, setName] = useState("");

  function set(field) {
    return (e) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
    };
  }

  function validate() {
    const e = {};
    if (!values.name.trim()) e.name = "Name is required";
    if (!values.email.trim()) e.email = "Email is required";
    if (!values.role) e.role = "Role is required";
    setErrors(e); // Set the errors state
    return Object.keys(e).length === 0; // Return true if there are no errors
  }

  return (
    <>
      <div>
        <h1>Manual Form</h1>

        <p>Enter your details below:</p>
        <form onSubmit={submit} noValidate>
          <label>
            Full Name
            <input value={name} onChange={set("name")} />
          </label>
          <label>
            Email
            <input value={values.email} onChange={set("email")} />
          </label>
          <label>
            Role
            <select value={values.role} onChange={set("role")}>
              <option value="">Select a role</option>
              {ROLE.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
        </form>
      </div>
    </>
  );
}
export default ManualForm;
