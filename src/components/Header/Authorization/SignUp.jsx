import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, Bounce } from "react-toastify";
import scss from "./authorization.module.scss";

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

export default function SignUp({ onClose, onSwitchToLogin, onLogin }) {
  return (
    <div className={scss.signUp}>
      <div className={scss.signUpContent}>
        <div className={scss.signUpTop}>
          <h3 className={scss.signUpTitle}>Sign up</h3>
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

              const updatedUsers = [...users, values];
              localStorage.setItem("users", JSON.stringify(updatedUsers));

              localStorage.setItem(
                "currentUser",
                JSON.stringify({
                  username: values.username,
                }),
              );

              if (onLogin) {
                onLogin({ username: values.username });
              }

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
            <Form className={scss.signUpFormContent}>
              <div className={scss.signUpFormWrapper}>
                <div className={scss.signUpForm}>
                  <label htmlFor="username" className={scss.signUpLabel}>
                    Username
                  </label>
                  <div className={scss.signUpFieldWrapper}>
                    <Field
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Username"
                      className={scss.signUpInput}
                      autoComplete="username"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className={scss.signUpErrorText}
                    />
                  </div>
                </div>
                <div className={scss.signUpForm}>
                  <label htmlFor="email" className={scss.signUpLabel}>
                    E-Mail
                  </label>
                  <div className={scss.signUpFieldWrapper}>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      placeholder="E-Mail"
                      className={scss.signUpInput}
                      autoComplete="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={scss.signUpErrorText}
                    />
                  </div>
                </div>
                <div className={scss.signUpForm}>
                  <label htmlFor="password" className={scss.signUpLabel}>
                    Password
                  </label>
                  <div className={scss.signUpFieldWrapper}>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      className={scss.signUpInput}
                      autoComplete="new-password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className={scss.signUpErrorText}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className={scss.signUpBtn}>
                Sign up
              </button>
            </Form>
          </Formik>
        </div>

        <a href="#" className={scss.logInLink} onClick={onSwitchToLogin}>
          Already have an account?
          <span className={scss.logInAccent}>Log In</span>
        </a>
      </div>
    </div>
  );
}
