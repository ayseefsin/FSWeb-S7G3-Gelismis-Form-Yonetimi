import { useState } from "react";
export const Form = () => {
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
    const { name, value } = e.target;
    SetFormData({ ...formData, ["name"]: value });
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
            value={formData.kvkk}
          />
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
