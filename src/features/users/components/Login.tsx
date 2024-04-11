import "../shared/style.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../../shared/service/Api";
import * as yup from "yup";
import { useFormik } from "formik";
import { UserLogin } from "../../../types/venues.types";

const Login = () => {
    const navigate = useNavigate();
    const validateLogin = yup.object({
        email: yup.string().email().required("Email is required"),
        password: yup
            .string()
            .required("Password is required")
            .min(2, "Password is too short - should be more than 3 characters.")
            .matches(/[a-zA-Z0-9]/, "Password can contain letters & digits."),
    });

    const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
        useFormik({
            initialValues: {
                email: "",
                password: "",
            },
            validationSchema: validateLogin,
            onSubmit: async (values: UserLogin) => {

                await post("/users/login", values)
                    .then((res: { data: { token: string; user: { id: string; role_id: number; }; }; }) => {
                        toast.dark("Login Successful!");
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("role_id", (res.data.user.role_id).toString());
                        localStorage.setItem("id", (res.data.user.id).toString());


                        if (res.data.user.role_id === 2) {
                            navigate("/");
                        } else {
                            navigate("/admin");
                        }
                    })
                    .catch((err: { response: { data: { message: any; }; }; }) => {
                        toast.dark("Invalid Credentials!");
                        console.error("Login Error: ", err.response.data.message);
                    });
            },
        });

    return (
        <div className="container">
            <div className="form-container">
            <h2 className="form-title">Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoFocus
                        required
                    />
                    {errors.email && touched.email && typeof errors.email === "string" ? (
                        <p style={{ color: "red" }}>{errors.email}</p>
                    ) : null}
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {errors.password &&
                        touched.password &&
                        typeof errors.password === "string" ? (
                        <p style={{ color: "red" }}>{errors.password}</p>
                    ) : null}
                </div>
                <button type="submit" className="form-button">Login</button>
            </form>
            <p className="tac-link">
                Don't have an account? <Link to="/signup">Sign up here</Link>
            </p>
            </div>
        </div>
    );
};

export default Login;