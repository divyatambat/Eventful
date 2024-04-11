import { toast } from "react-toastify";
import { postWithAuth } from "../../../shared/service/Api";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { Booking } from "../../../app/components/HoverCards";
import { Venue } from "../../admin/component/venue/ListVenue";

interface IPropCreateBooking{
  bookingValue: Venue | null;
}

const VenueBooking = ({bookingValue}:IPropCreateBooking) => {


  const navigate = useNavigate();
  const AuthToken = localStorage.getItem("token");
  const UserID = localStorage.getItem("id")

  const config = {
    headers: {
      timeout: 2000,
      Authorization: `Bearer ${AuthToken}`,
    },
  };
    
  const validateVenueBooking = yup.object({
    startTime: yup
      .string()
      .required("Start time is required")
      .matches(/^(?:[0-1][0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
      endTime: yup
      .string()
      .required("End time is required")
      .matches(/^(?:[0-1][0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)")
      .test('is-after-start-time', 'End time must be after start time', function(value) {
        const startTime = this.parent.startTime; 
        const startTimeParts = startTime.split(":");
        const endTimeParts = value.split(":");
        const startTimeInMinutes = parseInt(startTimeParts[0]) * 60 + parseInt(startTimeParts[1]);
        const endTimeInMinutes = parseInt(endTimeParts[0]) * 60 + parseInt(endTimeParts[1]);
  
        return endTimeInMinutes > startTimeInMinutes;
      }),
  });
  
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        bookingDate: "",
        startTime: "",
        endTime: "",
      },
      validationSchema: validateVenueBooking,
      onSubmit: async (e: any) => {
        const payload =        {
          booking: {
          user_id: UserID,
          venue_id: bookingValue?.id,
          booking_date: values.bookingDate,
          start_time: values.startTime,
          end_time:  values.endTime,
          status: "booked",
          }
        };

        postWithAuth(`/bookings`, payload, config)
          .then(() => {
            toast.dark("Venue booked successfully!");
            document.getElementById("closeModal")?.click();
            navigate("/"); 
          })
          .catch((error) => {
            toast.error("Sorry! Our Venue is not available at requested timing!");
            console.error("Error:", error);
          });
      },
    });

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="bookingDate">Booking Date</label>
              <input
                type="date"
                id="bookingDate"
                name="bookingDate"
                placeholder="Booking Date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bookingDate}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="startTime">Start Time</label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                placeholder="Start Time"
                value={values.startTime}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.startTime &&
              touched.startTime &&
              typeof errors.startTime === "string" ? (
                <p style={{ color: "red" }}>{errors.startTime}</p>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="endTime">End Time</label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                placeholder="End Time"
                value={values.endTime}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.endTime &&
                touched.endTime &&
                typeof errors.endTime === "string" ? (
                  <p style={{ color: "red" }}>{errors.endTime}</p>
                ) : null}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-success" style={{backgroundColor:"#008000"}}>
                Book Venue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VenueBooking;
