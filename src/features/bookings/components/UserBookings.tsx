import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Card, Col, Row, Skeleton } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Toast from 'react-bootstrap/Toast';
import { deleteReq, get } from '../../../shared/service/Api';
import DeleteBooking from '../../admin/component/booking/DeleteBookings';
import { Modal, Table } from 'react-bootstrap';
import { format } from 'date-fns';

interface Booking {
  id: number;
  user_id: number;
  venue_id: number;
  booking_date: string;
  start_time: string;
  end_time: string;
}

const fetchBookings = async ()=> {
  try {
    const token = localStorage.getItem('token');
    const response = await get('/bookings', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error('Failed to fetch bookings');
    }
  } catch (error) {
    throw new Error('Failed to fetch bookings');
  }
};

const ListBooking: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null); 
  const [showModalDelete, setShowModalDelete] = useState(false); 
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

  if (isLoading) return <Skeleton active />; 
  if (isError) return <div>Error fetching bookings</div>;

  const handleDelete = async (bookingData: Booking) => {
    setShowModalDelete(true);
    setBookingValue(bookingData);
  };

  return (
    <div className="container">
      <Toast onClose={() => setShowErrorToast(false)} show={showErrorToast} autohide>
        <Toast.Header>
          <strong className="mr-auto">Error!</strong>
        </Toast.Header>
        <Toast.Body>An error occurred. Please try again later.</Toast.Body>
      </Toast>

      {isLoading && <Skeleton active />}
      {isError && <div>Error fetching bookings</div>}

      {bookings?.length ?? 0 > 0 ? (
        <Row gutter={16}>
          {bookings?.map((booking: Booking) => (
            <Col key={booking.user_id} xs={24} md={15} lg={12} xl={9}>
              <Card hoverable style={{ width: '100%', marginBottom: 16 }}>
                <Card.Meta
                  title={`User ID: ${booking.user_id}`}
                  description={
                    <>
                      <p>Venue ID: {booking.venue_id}</p>
                      <p>Date: {booking.booking_date}</p>
                      <p>Start Time: {format(booking.start_time, "HH:mm")}</p>
                      <p>End Time: {format(booking.end_time, "HH:mm")}</p>  
                    </>
                  }
                />
                  <DeleteOutlined className="delete" onClick={() => handleDelete(booking)} />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="no-bookings">
          <h5>No Bookings!</h5>   
        </div>
      )}
        <Modal show={showModalDelete} onHide={() => setShowModalDelete(false)}>
        <Modal.Header closeButton>
        <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <DeleteBooking bookingValue={bookingValue} /> 
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ListBooking;