import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Formik, Form, Field } from 'formik';
import { Table, Modal, Button, Toast } from 'react-bootstrap';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../../shared/ListUsers.css';
import { get } from '../../../../shared/service/Api';
import UpdateVenue from './UpdateVenue';
import DeleteVenue from './DeleteVenue';
import CreateVenue from './CreateVenue';
import { format } from 'date-fns';

export interface Venue {
  id: number;
  name: string;
  venue_type: string;
  start_time: string;
  end_time: string;
}

const fetchVenues = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await get('/venues', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (error) {
    throw new Error('Failed to fetch venues');
  }
};

const ListVenue: React.FC = () => {
  const [filteredVenues, setFilteredVenues] = useState<Venue[] | null>(null);
  const [venues, setVenues] = useState<Venue[] | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false); 
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false); 
  const [venueValue, setVenueValue] = useState<Venue | null>(null);

  const { isLoading, isError } = useQuery('venue', fetchVenues, {
    onSuccess: (data) => setVenues(data),
  });

  useEffect(() => {
    if (showSuccessToast) {
      setTimeout(() => setShowSuccessToast(false), 3000);
    }
    if (showErrorToast) {
      setTimeout(() => setShowErrorToast(false), 3000);
    }
  }, [showSuccessToast, showErrorToast]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching users</div>;

  const handleSubmit = (values: { searchText: string }) => {
    const searchText = values.searchText.trim().toLowerCase();
    if (!venues) return;
    if (searchText === '') {
      setFilteredVenues(null);
    } else {
      const filtered = venues.filter(
        (venue: Venue) =>
          venue.name.toLowerCase().includes(searchText) ||
          venue.venue_type.toLowerCase().includes(searchText)
      );
      setFilteredVenues(filtered);
    }
  };

  const filteredVenue = venues?.filter((venue) =>
    venue.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleEdit = async (venueData: Venue) => {
    setShowModalUpdate(true); 
    setVenueValue(venueData);
  };

  const handleDelete = async (venueData: Venue) => {
    setShowModalDelete(true);
    setVenueValue(venueData);
  };

  return (
    <div className='container'>

      <Toast onClose={() => setShowErrorToast(false)} show={showErrorToast} autohide>
        <Toast.Header>
          <strong className="mr-auto">Error!</strong>
        </Toast.Header>
        <Toast.Body>
          An error occurred. Please try again later.
        </Toast.Body>
      </Toast>

      <Button variant="primary" style={{ display: "flex", marginLeft: "88%"}} onClick={() => setShowModalCreate(true)}>
        Add Venue
      </Button>
      <Formik initialValues={{ searchText: '' }} onSubmit={handleSubmit}>
        <Form>
          <Field type="text"           
          value={searchText}
          onChange={handleSearch} 
          placeholder="Search by venue name..." 
          />
        </Form>
      </Formik>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Venue Type</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVenue?.map((venue: Venue) => (
            <tr key={venue.id}>
              <td>{venue.id}</td>
              <td>{venue.name}</td>
              <td>{venue.venue_type}</td>
              <td>{format(venue.start_time, "HH:mm")}</td>  
              <td>{format(venue.end_time, "HH:mm")}</td>
              <td>
                <div className="action-buttons">
                  <EditOutlined className="edit" onClick={() => handleEdit(venue)} />
                  <DeleteOutlined className="delete" onClick={() => handleDelete(venue)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModalUpdate} onHide={() => setShowModalUpdate(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Venue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateVenue venueValue={venueValue}/> 
        </Modal.Body>
      </Modal>

      <Modal show={showModalDelete} onHide={() => setShowModalDelete(false)}>
        <Modal.Header closeButton>
        <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteVenue venueValue={venueValue}/> 
        </Modal.Body>
      </Modal>

      <Modal show={showModalCreate} onHide={() => setShowModalCreate(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Venue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateVenue/>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ListVenue;


