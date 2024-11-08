/* eslint-disable react/no-unescaped-entities */
import logo from "../images/ultraflysolutionslog.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
const navigate=useNavigate()
  const {data, loading, error } = useSelector((state) => state.auth.loginUser);

  // Validate form fields
  const validateForm = () => {
    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return false;
    }
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault(); 

    if (!validateForm()) {
      return;
    }

    dispatch(loginUser({ email, password })).unwrap().then(()=>{
      navigate("/")
    })
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
              Login for Exclusive Access
            </h2>
          </div>
          <div className="relative flex w-full max-w-md flex-col rounded-xl bg-white text-gray-700 shadow-md mx-auto lg:mx-0 p-6 lg:p-0">
            <div className="relative mx-4 lg:-mt-6 md:-mt-10 sm:-mt-14 mb-4 grid h-24 md:h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-cyan-600 to-cyan-400 text-white shadow-lg shadow-cyan-500/40">
              <h3 className="text-2xl md:text-3xl font-semibold">Login</h3>
            </div>
            <form onSubmit={handleLogin} className="flex flex-col gap-4 p-6">
              <div className="relative h-11 w-full">
                <input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-2 md:py-3 text-sm text-blue-gray-700 placeholder-transparent focus:border-cyan-500 focus:outline-none"
                />
                <label className="absolute left-3 -top-2 text-xs text-blue-gray-400 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs">
                  Email
                </label>
              </div>
              <div className="relative h-11 w-full">
                <input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-2 md:py-3 text-sm text-blue-gray-700 placeholder-transparent focus:border-cyan-500 focus:outline-none"
                />
                <label className="absolute left-3 -top-2 text-xs text-blue-gray-400 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs">
                  Password
                </label>
              </div>
              <div className="p-6 pt-0">
                <button
                  type="submit"
                  // disabled={loading}
                  className="block w-full rounded-lg bg-gradient-to-tr from-cyan-600 to-cyan-400 py-3 text-xs font-bold uppercase text-white shadow-md hover:shadow-lg active:opacity-85"
                >
                  {/* {loading ? "Signing in..." : "Sign In"} */}
                  sign in
                </button>
                {errorMessage && (
                  <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                )}
                {/* {error && <p className="text-red-500 text-sm mt-2">{error}</p>} */}
              </div>
              <p className="mb-4 flex justify-center text-sm font-light text-gray-700">
                Don't have an account?
                <Link
                  to="/register"
                  className="ml-1 text-sm font-bold text-cyan-500"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
