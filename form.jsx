import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    countryCode: "+91",
    phone: "",
    country: "",
    city: "",
    pan: "",
    aadhaar: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.username) newErrors.username = "Username is required";

    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email";

    if (formData.password.length < 6)
      newErrors.password = "Minimum 6 characters";

    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be 10 digits";

    if (!formData.country) newErrors.country = "Country required";
    if (!formData.city) newErrors.city = "City required";

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan))
      newErrors.pan = "Invalid PAN";

    if (!/^\d{12}$/.test(formData.aadhaar))
      newErrors.aadhaar = "Invalid Aadhaar";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/success", { state: formData });
    }
  };

  return (
    <div className="container">
      <h2>React Registration Form</h2>

      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          key !== "countryCode" && (
            <div key={key}>
              <input
                type={key === "password" && !showPassword ? "password" : "text"}
                name={key}
                placeholder={key}
                value={formData[key]}
                onChange={handleChange}
                className={errors[key] ? "error" : ""}
              />
              {errors[key] && <p className="error-text">{errors[key]}</p>}
            </div>
          )
        ))}

        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide Password" : "Show Password"}
        </button>

        <button type="submit" disabled={!validate}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
