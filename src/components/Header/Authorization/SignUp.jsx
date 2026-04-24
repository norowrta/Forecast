import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, Bounce } from "react-toastify";
import scss from "./authorization.module.scss";

import { useAuth } from "../../context/AuthContext";

import { LogIn as LogInIcon } from "lucide-react";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Your username must contain at least 3 characters")
    .max(20, "Your username must be no longer than 20 characters")
    .required("This field is required"),
  email: Yup.string()
    .email("Incorrect email format")
    .required("This field is required"),
  password: Yup.string()
    .min(6, "The password must contain at least 6 characters")
    .required("This field is required"),
});

export default function SignUp({ onClose, onSwitchToLogin }) {
  const { login } = useAuth();

  return (
    <div className={scss.content}>
      <div className={scss.titleWrapper}>
        <h3 className={scss.title}>Sign up</h3>
      </div>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          const users = JSON.parse(localStorage.getItem("users")) || [];

          if (users.some((user) => user.email === values.email)) {
            toast.warn("This email is already in use!", {
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
            return;
          }

          // Зберігаємо нового користувача в загальну базу
          const updatedUsers = [...users, values];
          localStorage.setItem("users", JSON.stringify(updatedUsers));

          // Авторизуємо через контекст одразу після успішної реєстрації
          login({ username: values.username });

          toast.success("You have successfully registered!", {
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
        }}
      >
        <Form className={scss.formContent}>
          <div className={scss.formWrapper}>
            <div className={scss.form}>
              <label htmlFor="username" className={scss.label}>
                Username
              </label>
              <div className={scss.fieldWrapper}>
                <Field
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  className={scss.input}
                  autoComplete="username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className={scss.errorText}
                />
              </div>
            </div>
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
                  autoComplete="email"
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
                  autoComplete="new-password"
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
            Sign up <LogInIcon className={scss.loginIcon} />
          </button>
        </Form>
      </Formik>

      <a href="#" className={scss.logInLink} onClick={onSwitchToLogin}>
        Already have an account?
        <span className={scss.logInAccent}>Log In</span>
      </a>
    </div>
  );
}
