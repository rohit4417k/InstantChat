import axios from "axios";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "./userContext";
import "react-toastify/dist/ReactToastify.css";

function RegisterAndLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("login");
  const { setUsername: setLoggedInUser, setId } = useContext(UserContext);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const url = isLoginOrRegister === "register" ? "register" : "login";
    axios
      .post(url, { username, password })
      .then((res) => {
        const { data } = res;
        setLoggedInUser(username);
        setId(data._id);
      })
      .catch((err) => {
        toast.error(err.response.data.message, toastOptions);
      });
  }

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          className="block w-full rounded-sm p-2 mb-2"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="block w-full rounded-sm p-2 mb-2"
        />
        <button className="bg-blue-500 text-white blockk w-full rounded-sm p-2">
          {isLoginOrRegister === "register" ? "Register" : "Login"}
        </button>
        <div className="text-center mt-2">
          {isLoginOrRegister === "register" && (
            <div>
              Already a member?
              <button
                className="ml-1"
                onClick={() => setIsLoginOrRegister("login")}
              >
                Login Here
              </button>
            </div>
          )}
          {isLoginOrRegister === "login" && (
            <div>
              Don&apos;t have an account?
              <button
                className="ml-1"
                onClick={() => setIsLoginOrRegister("register")}
              >
                Register Here
              </button>
            </div>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default RegisterAndLoginForm;
