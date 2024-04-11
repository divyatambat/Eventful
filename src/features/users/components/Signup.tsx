import "../shared/style.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../../shared/service/Api";
import { useFormik } from "formik";
import * as yup from "yup";

const Signup = () => {
    const navigate = useNavigate();

    const validateSignup = yup.object({
        name: yup
            .string()
            .max(20, "Name length must be less than 20 characters")
            .required("First Name is required"),
        email: yup.string().email().required("email is required"),
        password: yup
            .string()
            .required("password is required")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(/[a-z]/, "Password can contain atleast one small case letter")
            .matches(/[A-Z]/, "Password can contain atleast one uppercase letter")
            .matches(/[0-9]/, "Password can contain atleast one digit"),
    });

    const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
        useFormik({
            initialValues: {
                name: "",
                email: "",
                password: "",
            },
            validationSchema: validateSignup,
            onSubmit: async () => {
                const payload = {
                    user: {
                        email: values.email,
                        password: values.password,
                        name: values.name,
                        role_id: 2,
                    },
                };

                await post("/users", payload)
                    .then(() => {
                        toast.dark("Signup Successfully, You can login now !!");
                        navigate("/login");
                    })
                    .catch((err: { message: any; }) => {
                        toast.dark("Error Occurred !!");
                        console.log(err.message);
                    });
            },
        });

    return (
        <div className="container">
            <div className="form-container">
            <h2 className="form-title">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        placeholder="First Name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {errors.name &&
                        touched.name &&
                        typeof errors.name === "string" ? (
                        <p style={{ color: "red" }}>{errors.name}</p>
                    ) : null}
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        minLength={3}
                        required
                    />
                    {errors.password &&
                        touched.password &&
                        typeof errors.password === "string" ? (
                        <p style={{ color: "red" }}>{errors.password}</p>
                    ) : null}
                </div>
                <button type="submit" className="form-button">Sign Up</button>
            </form>
            <p className="tac-link">
                Already have an account? <Link to="/login">Log in</Link>
            </p>
            </div>
        </div>
    );
};

export default Signup;

