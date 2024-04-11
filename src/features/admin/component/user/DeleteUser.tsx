import { toast } from "react-toastify";
import { deleteReq } from "../../../../shared/service/Api";
import { User } from "./ListUsers";

interface IPropDeleteUser{
  userValue: User | null;
}

const DeleteUser = ({userValue}:IPropDeleteUser) => {
  const AuthToken = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${AuthToken}`,
    },
  };

  const handleDelete = () => {
    deleteReq(`/users/${userValue?.id}`, config)
      .then((response: any) => {
        toast.dark("User Deleted Successfully!");
        console.log("User Deleted with data:", response.data);
      })
      .catch((error) => {
        toast.error("Error while deleting user!");
        console.error("Error:", error.message);
      });
  };

  return (
      <><div className="modal-body">
        Are you sure, you want to delete this user?
    </div>
    <div className="modal-footer">
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
                Delete
            </button>
        </div></>
);
};

export default DeleteUser;
