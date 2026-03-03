import { useEffect } from "react";
import { useAuthStore } from "../../hooks";
import "./LoginPage.css";

import { useForm, type SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";

export const LoginPage = () => {
  const { startLogin, errorMessage, startRegister } = useAuthStore();
  const loginOptions = {
    email: { required: "Email is required" },
    password: { required: "Password is required" },
  };

  const registerOptions = {
    name: { required: "Name is required" },
    email: { required: "Email is required" },
    password: { required: "Password is required" },
    confirmPassword: {
      required: "Confirm Password is required",
      validate: (value: string, formValues) =>
        value === formValues.password || "Passwords do not match",
    },
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<typeof loginOptions>();

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<typeof registerOptions>();

  const onLoginSubmit: SubmitHandler<typeof loginOptions> = (data) => {
    console.log(data);
    // TODO - Call login API
    startLogin(data.email, data.password);
  };

  const onRegisterSubmit: SubmitHandler<typeof registerOptions> = (data) => {
    console.log(data);
    startRegister(data.email, data.password, data.name);
  };

  useEffect(() => {
    if (errorMessage) {
      Swal.fire("Failed", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Login</h3>
          <form onSubmit={handleSubmit(onLoginSubmit)}>
            <div className="form-group mb-2">
              <input
                {...register("email", loginOptions.email)}
                type="text"
                className="form-control"
                placeholder="Email"
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            <div className="form-group mb-2">
              <input
                {...register("password", loginOptions.password)}
                type="password"
                className="form-control"
                placeholder="Password"
              />
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Register</h3>
          <form onSubmit={handleRegisterSubmit(onRegisterSubmit)}>
            <div className="form-group mb-2">
              <input
                {...registerRegister("name", registerOptions.name)}
                type="text"
                className="form-control"
                placeholder="Name"
              />
              {registerErrors.name && (
                <p className="error">{registerErrors.name.message}</p>
              )}
            </div>
            <div className="form-group mb-2">
              <input
                {...registerRegister("email", registerOptions.email)}
                type="email"
                className="form-control"
                placeholder="Email"
              />
              {registerErrors.email && (
                <p className="error">{registerErrors.email.message}</p>
              )}
            </div>
            <div className="form-group mb-2">
              <input
                {...registerRegister("password", registerOptions.password)}
                type="password"
                className="form-control"
                placeholder="Password"
              />
              {registerErrors.password && (
                <p className="error">{registerErrors.password.message}</p>
              )}
            </div>
            <div className="form-group mb-2">
              <input
                {...registerRegister(
                  "confirmPassword",
                  registerOptions.confirmPassword,
                )}
                type="password"
                className="form-control"
                placeholder="Confirm Password"
              />
              {registerErrors.confirmPassword && (
                <p className="error">
                  {registerErrors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="form-group mb-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Create Account"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
