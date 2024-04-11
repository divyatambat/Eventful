import { toast } from "react-toastify";
import { deleteReq } from "../../../../shared/service/Api";
import { Venue } from "./ListVenue";

interface IPropDeleteVenue{
  venueValue: Venue | null;
}

const DeleteVenue = ({venueValue}:IPropDeleteVenue) => {
  const AuthToken = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${AuthToken}`,
    },
  };

  const handleDelete = () => {
    deleteReq(`/venues/${venueValue?.id}`, config) 
      .then((response: any) => {
        toast.dark("Venue Deleted Successfully!");
        console.log("Venue Deleted with data:", response.data);
      })
      .catch((error) => {
        toast.error("Error while deleting venue!");
        console.error("Error:", error.message);
      });
  };

  return (
        <><div className="modal-body">
          Are you sure, you want to delete this venue?
      </div>
      <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={handleDelete}>
                  Delete
              </button>
          </div></>
  );
};

export default DeleteVenue;
