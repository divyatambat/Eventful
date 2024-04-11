import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { get, putWithAuth } from "../../../../shared/service/Api";
import { Venue } from "./ListVenue";

interface IPropUpdateVenue{
  venueValue: Venue | null;
}

const UpdateVenue = ({venueValue}:IPropUpdateVenue) => {
  const AuthToken = localStorage.getItem("token");
  const config = {
    headers: {
      timeout: 2000,
      Authorization: `Bearer ${AuthToken}`,
    },
  };

  const [formData, setFormData] = useState({
    name: "",
    venue_type: "",
    start_time: "",
    end_time: "",
  });

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prefill = await get(`/venues/${venueValue?.id}` , config); 
        setFormData(prefill.data);
        setDataLoaded(true);
      } catch (err: any) {
        console.log("Error fetching venue data:", err.message);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payload = {
        name: formData.name,
        venue_type: formData.venue_type,
        start_time: formData.start_time,  
        end_time: formData.end_time
    };

    console.log(payload)

    putWithAuth(`/venues/${venueValue?.id}`, payload, config) 
      .then((res) => {
        toast.dark("Venue updated!");
        console.log("Form submitted with Data :", res.data);
        
      })
      .catch((err) => {
        toast.error("Failed to update venue.");
        console.log(err);
      });
  };

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
                type="text"
                name="venue_type"
                placeholder="Venue Type"
                value={formData.venue_type}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="start_time"
                placeholder="Start Time"
                value={formData.start_time}   
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="end_time"
                placeholder="End Time"
                value={formData.end_time}
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

export default UpdateVenue;

