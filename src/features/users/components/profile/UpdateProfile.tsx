import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { patchWithAuth, get } from "../../../../shared/service/Api";

interface Profile {
    id: number;
    name: string;
    email: string;
    password: string; 
    role_id?: number;
  }
  

  const UpdateProfile = ({ profile }: { profile: Profile }) => {
  const id = localStorage.getItem("user_id");
  const AuthToken = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${AuthToken}`,
    },
  };

  const [formData, setFormData] = useState({ ...profile, role_id: undefined });
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prefill = await get(`/users/${id}`, config);
        setFormData(prefill.data);
        setDataLoaded(true);
      } catch (err: any) {
        console.log("Error fetching user data:", err.message);
      }
    };

    fetchData();
  }, [id, config]);


  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const payload = {
        user: {
          ...formData,
        }, 
      };

      const res = await patchWithAuth(`/users/${id}`, payload, config);
      toast.dark("Profile updated successfully!");
    } catch (err: any) {
      toast.dark("Error updating profile:", err.message);
    }
  };

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="staticBackdropLabel">
            Update Profile
          </h1>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                required
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-secondary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
