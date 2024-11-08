import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/ultraflysolutionslog.png";
import { registerUser } from "../redux/slices/authSlice";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!form.name) {
      newErrors.name = "Name is required";
    }

    if (!form.email || !emailRegex.test(form.email)) {
      newErrors.email = "Valid email is required";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(
        registerUser({
          username: form.name,
          email: form.email,
          password: form.password,
        })
      ).then(()=>{
        navigate("/login")
      })
    }
  };

  return (
    <div className="font-[sans-serif] bg-gradient-to-r from-purple-900 via-purple-800 to-blue-600 text-gray-800">
      <div className="min-h-screen flex flex-col items-center justify-center lg:p-6 p-4">
        <div className="grid lg:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <div className="text-center lg:text-left">
            <img
              src={logo}
              alt="logo"
              className="h-32 md:h-44 mx-auto lg:mx-0"
            />
            <h2 className="text-2xl md:text-4xl font-extrabold lg:leading-[50px] text-white mt-4 md:mt-6">
              Register for Exclusive Access
            </h2>
          </div>
          <div className="relative flex w-full max-w-md flex-col rounded-xl bg-white text-gray-700 shadow-md mx-auto lg:mx-0 p-6 lg:p-0">
            <div className="relative mx-4 lg:-mt-6 md:-mt-10 sm:-mt-14 mb-4 grid h-24 md:h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-cyan-600 to-cyan-400 text-white shadow-lg shadow-cyan-500/40">
              <h3 className="text-2xl md:text-3xl font-semibold">Register</h3>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <form className="flex flex-col gap-4 p-6" onSubmit={handleSubmit}>
              <div className="relative h-11 w-full">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-2 md:py-3 text-sm text-blue-gray-700 placeholder-transparent focus:border-cyan-500 focus:outline-none"
                />
                <label className="absolute left-3 -top-2 text-xs text-blue-gray-400 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs">
                  Name
                </label>
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div className="relative h-11 w-full">
                <input 
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-2 md:py-3 text-sm text-blue-gray-700 placeholder-transparent focus:border-cyan-500 focus:outline-none"
                />
                <label className="absolute left-3 -top-2 text-xs text-blue-gray-400 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs">
                  Email
                </label>
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="relative h-11 w-full">
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  type="password"
                  className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-2 md:py-3 text-sm text-blue-gray-700 placeholder-transparent focus:border-cyan-500 focus:outline-none"
                />
                <label className="absolute left-3 -top-2 text-xs text-blue-gray-400 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs">
                  Password
                </label>
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
              <div className="relative h-11 w-full">
                <input
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  type="password"
                  className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-2 md:py-3 text-sm text-blue-gray-700 placeholder-transparent focus:border-cyan-500 focus:outline-none"
                />
                <label className="absolute left-3 -top-2 text-xs text-blue-gray-400 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs">
                  Confirm Password
                </label>
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>
              <div className="p-6 pt-0">
                <button
                  type="submit"
                  disabled={loading}
                  className="block w-full rounded-lg bg-gradient-to-tr from-cyan-600 to-cyan-400 py-3 text-xs font-bold uppercase text-white shadow-md hover:shadow-lg active:opacity-85"
                >
                  {loading ? "Registering..." : "Register"}
                </button>
                <p className="mt-6 flex justify-center text-sm font-light text-gray-700">
                  Already have an account?
                  <Link to="/login" className="ml-1 text-sm font-bold text-cyan-500">
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
