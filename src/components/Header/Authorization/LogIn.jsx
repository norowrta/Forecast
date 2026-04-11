import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, Bounce } from "react-toastify";
import scss from "./authorization.module.scss";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Incorrect email format")
    .required("This field is required "),
  password: Yup.string()
    .min(6, "The password must contain at least 6 characters")
    .required("This field is required"),
});

export default function LogIn({ onClose, onSwitchToSignup, onLogin }) {
  return (
    <div className={scss.signUp}>
      <div className={scss.signUpContent}>
        <div className={scss.signUpTop}>
          <h3 className={scss.signUpTitle}>Log in</h3>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values, { resetForm }) => {
              const users = JSON.parse(localStorage.getItem("users")) || [];

              const user = users.find(
                (user) =>
                  user.email === values.email &&
                  user.password === values.password,
              );

              if (user) {
                localStorage.setItem(
                  "currentUser",
                  JSON.stringify({
                    username: user.username,
                  }),
                );

                if (onLogin) {
                  onLogin({ username: user.username });
                }

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
            <Form className={scss.signUpFormContent}>
              <div className={scss.signUpFormWrapper}>
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
                Log in
              </button>
            </Form>
          </Formik>
        </div>
        <a href="#" className={scss.logInLink} onClick={onSwitchToSignup}>
          Don't have an account?
          <span className={scss.logInAccent}> Sign Up</span>
        </a>
      </div>
    </div>
  );
}
