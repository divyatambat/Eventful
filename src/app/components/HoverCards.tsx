import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import VenueBooking from "../../features/bookings/components/CreateBooking";
import styled from 'styled-components';
import { get } from "../../shared/service/Api";
import { format } from "date-fns";
import cardbg from "../assets/Images/cardbg.png";
import '../shared/HoverCards.css';
import { Venue } from "../../features/admin/component/venue/ListVenue";
import { LoadingOutlined } from "@ant-design/icons";

const DisplayOver = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;
  transition: background-color 350ms ease;
  background-color: transparent;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`;

const Hover = styled.div`
  opacity: 0;
  transition: opacity 350ms ease;
`;

const Paragraph = styled.p`
  transform: translate3d(0, 50px, 0);
  transition: transform 350ms ease;
  color: #fff;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #28a745; 
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
`;

const SubTitle = styled.h4`
  font-family: "Gill Sans";
  font-weight: bold;
  transform: translate3d(0, 50px, 0);
  transition: transform 350ms ease;
  color: #fff;
`;

const CardWrapper = styled.div`
  display: flex;
  overflow-x: auto; /* Make the cards scrollable */
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch; /* Enables momentum scrolling in iOS Safari */
  scroll-behavior: smooth; /* Enables smooth scrolling */
  width: 100%;
  padding: 20px 0;
  margin: 0 auto; /* Center align the cards */
`;

const Card = styled.div`
  flex: 0 0 auto;
  width: 300px; 
  height: 300px;
  margin-tr: 20px; 
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0 , 0, 0.2);
  background-image: url(${cardbg});
  background-position: center;
  background-size: cover;
  position: relative;
  &:hover ${DisplayOver} {
    background-color: rgba(0, 0, 0, 0.5);
  }
  &:hover ${SubTitle}, &:hover ${Paragraph} {
    transform: translate3d(0, 0, 0);
  }
  &:hover ${Hover} {
    opacity: 1;
  }
`;

const CardContent = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

export interface Booking {
  id: number;
}

const useFetchVenues = () => {
  return useQuery("venues", fetchVenues);
};

const fetchVenues = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await get("/venues", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200 || response.status === 201) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

const HoverCards = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [bookingValue, setBookingValue] = useState<Venue | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data: venues, isLoading, isError } = useFetchVenues();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (venues ? venues.length : 1));
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [isPaused, venues]);

  const handleCardClick = (venue: Venue) => {
    setSelectedVenue(venue);
    setModalOpen(true);
  };

  const handleScroll = () => {
    const wrapper = wrapperRef.current;
    if (wrapper) {
      const scrollLeft = wrapper.scrollLeft;
      const cardWidth = wrapper.clientWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    }
  };

  const handleBooking = (venueData:Venue)=>{
    setBookingValue(venueData);
  }
  return (
    <div className="App">
      <h3 style={{"fontFamily":"monospace", "marginTop":"10px"}}>OUR</h3>
      <h3 style={{"fontFamily":"inherit", "color":"teal", "fontSize":"40px"}}> VENUES!</h3>
      {isLoading && <div> <LoadingOutlined />     
      </div>}
      {isError && <div>
        <a href="/login"><button className="book-button" style={{"marginTop":"10px"}}>Login to see Venues!</button></a>
        </div>}

      <CardWrapper ref={wrapperRef} onScroll={handleScroll}>
        {venues &&
          venues.map((venue: Venue, index: number) => (
            <Card key={venue.id} onClick={() => handleCardClick(venue)} style={{ marginLeft: index === 0 ? 'auto' : 'unset', marginRight: index === venues.length - 1 ? 'auto' : '20px' }}>
              <DisplayOver>
                <CardContent>
                  <SubTitle>{venue.name}</SubTitle> 
                  <Hover>
                    <Paragraph>{venue.venue_type}</Paragraph>
                    <Paragraph>Timings are:</Paragraph>
                    <Paragraph>From: {format(venue.start_time, "HH:mm")}</Paragraph>
                    <Paragraph>To: {format(venue.end_time, "HH:mm")}</Paragraph>
                    <Button className="book-button" onClick={()=>handleBooking(venue)}>Book Now</Button>
                  </Hover>
                </CardContent>
              </DisplayOver>
            </Card>
          ))}
      </CardWrapper>
      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Venue Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VenueBooking bookingValue={bookingValue} />
        </Modal.Body>
      </Modal>
    </div>
  );
};  

export default HoverCards;