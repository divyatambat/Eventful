import { deleteReq } from "../../../shared/service/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("user_id");
  const AuthToken = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${AuthToken}`,
    },
  };

  const handleDelete = () => {
    setTimeout(() => {
      deleteReq(`users/${id}`, config)
        .then((response: any) => {
          toast.dark("Account Deleted Successfully !");
          console.log("User deleted successfully:", response.data);
          navigate("/");
        })
        .catch((error: any) => {
          console.error("Error while deleting user:", error.message);
          toast.dark("Error while deleting user !", error.message);
          navigate("/profile");
        });
    }, 1000);
  };
  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="staticBackdropLabel">
            Alert !
          </h1>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          Are you sure, you want to delete your Account ?
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;