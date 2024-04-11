import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { patchWithAuth, get } from "../../../../shared/service/Api";
import { User } from "./ListUsers";
import { QueryClient } from "react-query";

interface IPropUpdateUser{
  userValue: User | null;
}

const UpdateProfile = ({userValue}:IPropUpdateUser) => {
  const queryclient = new QueryClient();

  const id = localStorage.getItem("id");
  const AuthToken = localStorage.getItem("token");
  const config = {
    headers: {
      timeout: 2000,
      Authorization: `Bearer ${AuthToken}`,
    },
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const prefill = await get(`/users/${userValue?.id}`, config);
        setFormData(prefill.data);
        setDataLoaded(true);
      } catch (err: any) {
        console.log("Error fetching user data:", err.message);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payload = {
      user: {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        age: formData.age,
        role_id: 1,
      },
    };

    patchWithAuth(`/users/${userValue?.id}`, payload, config)
      .then((res: any) => {
        toast.dark("Profile updated!");
        console.log("Form submitted with Data :", res.data);
        queryclient.invalidateQueries({queryKey:['users']})
      })
      .catch((err: any) => {
        toast.dark("Invalid Credentials!");
        console.log(err);
      });
  };

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  return (
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

              <div className="modal-footer">

                <button type="submit" className="btn btn-secondary">
                  Update
                </button>
              </div>
        </form>

  );
};

export default UpdateProfile;
