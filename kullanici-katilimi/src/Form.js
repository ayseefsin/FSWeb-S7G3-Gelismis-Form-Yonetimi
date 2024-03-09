import { useState } from "react";
import * as yup from "yup";

export const Form = () => {
  let schema = yup.object().shape({
    name: yup
      .string()
      .required("name is required")
      .min(3, "name must have at least 3 char"),
    email: yup
      .string()
      .required("email is required")
      .email("wrong email format"),
    password: yup
      .string()
      .required("password is required")
      .min(6, "password must have at least 6 char"),
    kvkk: yup.boolean().oneOf([true], "kvkk must be checked"),
  });
  const [formData, SetFormData] = useState({
    name: "aysin",
    email: "aysin@aysin.com",
    password: "12345",
    kvkk: true,
  });
  const formSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const formChange = (e) => {
    const { name, value, checked, type } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    SetFormData({ ...formData, [name]: inputValue });
  };
  return (
    <div>
      <form onSubmit={formSubmit}>
        <label>
          name:
          <input
            name="name"
            type="text"
            onChange={formChange}
            value={formData.name}
          />
        </label>
        <label>
          email:
          <input
            name="email"
            type="email"
            onChange={formChange}
            value={formData.email}
          />
        </label>
        <label>
          password:
          <input
            name="password"
            type="password"
            onChange={formChange}
            value={formData.password}
          />
        </label>
        <label>
          kvkk:
          <input
            name="kvkk"
            type="checkbox"
            onChange={formChange}
            checked={formData.kvkk}
          />
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
