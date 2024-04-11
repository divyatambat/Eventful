import { toast } from "react-toastify";
import { deleteReq } from "../../../../shared/service/Api";
import { Booking } from "./ListBookings";

interface IPropDeleteBooking{
  bookingValue: Booking | null;
}

const DeleteBooking = ({bookingValue}:IPropDeleteBooking) => {
  const AuthToken = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${AuthToken}`,
    },
  };

  const handleDelete = () => {
    deleteReq(`/bookings/${bookingValue?.id}`, config)
      .then((response: any) => {
        toast.dark("Booking Deleted Successfully!");
        console.log("Booking Deleted with data:", response.data);
      })
      .catch((error) => {
        toast.error("Error while deleting booking!");
        console.error("Error:", error.message);
      });
  };

    return (
        <><div className="modal-body">
          Are you sure, you want to delete this booking?
      </div>
      <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={handleDelete}>
                  Delete
              </button>
        </div></>
  );
};

export default DeleteBooking;
