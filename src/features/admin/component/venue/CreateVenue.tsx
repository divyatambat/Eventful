import { toast } from "react-toastify";
import { postWithAuth } from "../../../../shared/service/Api";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";

const CreateVenue = () => {
  const navigate = useNavigate();
  const AuthToken = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${AuthToken}`,
    },
  };

  const validateCreateVenue = yup.object({
    name: yup.string().required("Name is required"),
    venue_type: yup.string().required("Venue Type is required"),
    start_time: yup.string().required("Start Time is required"),
    end_time: yup.string().required("End Time is required"),
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        venue_type: "",
        start_time: "",
        end_time: "",
      },
      validationSchema: validateCreateVenue,
      onSubmit: async () => {
        const payload = {
          venue: {
            name: values.name,
            venue_type: values.venue_type,
            start_time: values.start_time,
            end_time: values.end_time,
          },
        };

        postWithAuth("/venues", payload, config)
          .then(() => {
            toast.dark("Venue Created Successfully!");
            document.getElementById("closeModal")?.click();
            navigate("/admin");
          })
          .catch((error) => {
            toast.error("Try Again with valid credentials!");
            console.error("Error:", error.message);
          });
      },
    });

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.name && touched.name ? (
                <p style={{ color: "red" }}>{errors.name}</p>
              ) : null}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="venue_type"
                placeholder="Venue Type"
                value={values.venue_type}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.venue_type && touched.venue_type ? (
                <p style={{ color: "red" }}>{errors.venue_type}</p>
              ) : null}
            </div>
            <div className="form-group">
              <input
                type="time"
                name="start_time"
                placeholder="Start Time"
                value={values.start_time}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.start_time && touched.start_time ? (
                <p style={{ color: "red" }}>{errors.start_time}</p>
              ) : null}
            </div>
            <div className="form-group">
              <input
                type="time"
                name="end_time"
                placeholder="End Time"
                value={values.end_time}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.end_time && touched.end_time ? (
                <p style={{ color: "red" }}>{errors.end_time}</p>
              ) : null}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                id="closeModal"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-success" style={{backgroundColor:"#008000"}}>
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateVenue;
