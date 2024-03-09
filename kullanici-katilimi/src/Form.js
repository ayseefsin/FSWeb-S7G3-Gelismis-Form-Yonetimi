import { useEffect, useState } from "react";
import * as yup from "yup";
import axios from "axios";

export const Form = (props) => {
  const { addUser, updateUser, editingUser } = props;

  const [formData, SetFormData] = useState(
    editingUser || {
      name: "aysin",
      email: "aysin@aysin.com",
      password: "12345",
      kvkk: true,
    }
  );
  useEffect(() => {
    console.log("useEffect worked");
    if (editingUser) {
      SetFormData(editingUser);
    }
  }, [editingUser]);
  const [formError, setFormError] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

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
  const validateFormInput = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then((valid) => {
        console.log(valid);
        const newError = {
          ...formError,
          [name]: null,
        };
      })
      .catch((err) => {
        console.log(err.name, err.errors);
        const newError = {
          ...formError,
          [name]: err.errors[0],
        };
        setFormError(newError);
      });
  };

  const validateForm = (formData) => {
    schema
      .isValid(formData)
      .then((valid) => {
        console.log("validate form: ", valid);
        setIsDisabled(!valid);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const formSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (editingUser) {
      updateUser(
        axios
          .post("https://reqres.in/api/users", {
            formData,
          })
          .then(function (response) {
            console.log(response);
            updateUser(response.data);
          })
          .catch(function (error) {
            console.log(error);
          })
      );
    } else {
      axios
        .post("https://reqres.in/api/users", {
          formData,
        })
        .then(function (response) {
          console.log(response);
          addUser(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const formChange = (e) => {
    const { name, value, checked, type } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    const updatedFormData = { ...formData, [name]: inputValue };
    SetFormData(updatedFormData);
    validateFormInput(name, inputValue);
    validateForm(updatedFormData);
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
        <button disabled={isDisabled} type="submit">
          submit
        </button>
      </form>
    </div>
  );
};
