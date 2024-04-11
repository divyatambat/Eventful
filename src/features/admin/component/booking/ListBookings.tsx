import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Modal, Table } from 'react-bootstrap';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import Toast from 'react-bootstrap/Toast';
import { deleteReq, get } from '../../../../shared/service/Api';
import DeleteBookings from './DeleteBookings';
import { format } from 'date-fns';

export interface Booking {
  id: number;
  user_id: number;
  venue_id: number;
  booking_date: string;
  start_time: string;
  end_time: string;
}

const fetchBookings = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await get('/bookings', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (error) {
    throw new Error('Failed to fetch bookings');
  }
};

const ListBooking: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false); 
  const [searchText, setSearchText] = useState<string>('');
  const [bookingValue, setBookingValue] = useState<Booking | null>(null);

  const { isLoading, isError } = useQuery('bookings', fetchBookings, {
    onSuccess: (data) => setBookings(data),
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
  if (isError) return <div>Error fetching bookings</div>;

  const filteredBookings = bookings?.filter((booking) =>
    booking.user_id.toString().includes(searchText)
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="container">

      <Toast onClose={() => setShowErrorToast(false)} show={showErrorToast} autohide>
        <Toast.Header>
          <strong className="mr-auto">Error!</strong>
        </Toast.Header>
        <Toast.Body>
          An error occurred. Please try again later.
        </Toast.Body>
      </Toast>

      <div className="search-container">
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Search by user ID..."
        />

      </div>

      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Venue ID</th>
            <th>Booking Date</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings?.map((booking: Booking) => (
            <tr key={booking.user_id}>
              <td>{booking.user_id}</td>
              <td>{booking.venue_id}</td>
              <td>{booking.booking_date}</td>
              <td>{format(booking.start_time, "HH:mm")}</td>
              <td>{format(booking.end_time, "HH:mm")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModalDelete} onHide={() => setShowModalDelete(false)}>
        <Modal.Header closeButton>
        <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteBookings bookingValue={bookingValue}/> 
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ListBooking;
