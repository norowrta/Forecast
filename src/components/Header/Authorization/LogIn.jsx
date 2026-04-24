import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, Bounce } from "react-toastify";
import scss from "./authorization.module.scss";

import { useAuth } from "../../context/AuthContext";

import { LogIn as LogInIcon } from "lucide-react";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Incorrect email format")
    .required("This field is required "),
  password: Yup.string()
    .min(6, "The password must contain at least 6 characters")
    .required("This field is required"),
});

export default function LogIn({ onClose, onSwitchToSignup }) {
  const { login } = useAuth();

  return (
    <div className={scss.content}>
      <div className={scss.titleWrapper}>
        <h3 className={scss.title}>Log in</h3>
      </div>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values, { resetForm }) => {
          const users = JSON.parse(localStorage.getItem("users")) || [];

          const user = users.find(
            (user) =>
              user.email === values.email && user.password === values.password,
          );

          if (user) {
            login({ username: user.username });

            toast.success("You have successfully logged in!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });

            resetForm();
            onClose();
          } else {
            toast.error("Incorrect email or password!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          }
        }}
      >
        <Form className={scss.formContent}>
          <div className={scss.formWrapper}>
            <div className={scss.form}>
              <label htmlFor="email" className={scss.label}>
                E-Mail
              </label>
              <div className={scss.fieldWrapper}>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E-Mail"
                  className={scss.input}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={scss.errorText}
                />
              </div>
            </div>

            <div className={scss.form}>
              <label htmlFor="password" className={scss.label}>
                Password
              </label>
              <div className={scss.fieldWrapper}>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className={scss.input}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={scss.errorText}
                />
              </div>
            </div>
          </div>

          <button type="submit" className={scss.btn}>
            Log in <LogInIcon className={scss.loginIcon} />
          </button>
        </Form>
      </Formik>
      <a href="#" className={scss.logInLink} onClick={onSwitchToSignup}>
        Don't have an account?
        <span className={scss.logInAccent}> Sign Up</span>
      </a>
    </div>
  );
}
