

import React, { useEffect, useState } from 'react';
import "../style/cardPage.css";
import { Card, CardContent, CardMedia, Typography, Button, Chip } from '@mui/material';

// image 
import tickIcon from '../assest/icons/tick_mark.png';

// toste 
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CardComponent = ({ image, title, startDate, endDate, level, description,pre_status, cardIndex }) => {


const getStatus = (startDate, endDate) => {
  const currentDate = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (currentDate < start) {
    return 'Upcoming';
  } else if (currentDate >= start && currentDate <= end) {
    return 'Active';
  } else {
    return 'Past';
  }
};

const getTimeDifference = (date) => {
  const now = new Date();
  const target = new Date(date);
  const diff = target - now;
  const days = ('0'+ Math.floor(diff / (1000 * 60 * 60 * 24))).slice(-2);
  const hours = ('0'+ Math.floor((diff / (1000 * 60 * 60)) % 24)).slice(-2);
  const minutes = ('0'+  Math.floor((diff / (1000 * 60)) % 60)).slice(-2);
  const seconds = ('0'+  Math.floor((diff / 1000) % 60)).slice(-2);
  
  return { days, hours, minutes, seconds };
};

// Function to get the CSS class for the Chip based on the status
const getStatusClass = (sta) => {
  if (sta === 'Active') return 'chips_success';
  if (sta === 'Upcoming') return 'chips_upcoming';
  return 'chips_end';
};

  const updateLocalStorage = (newStatus) => {
    const storedCards = JSON.parse(localStorage.getItem('cards')) || [];
    if (cardIndex !== undefined && storedCards[cardIndex]) {
      storedCards[cardIndex] = { ...storedCards[cardIndex], status: newStatus }; 
      localStorage.setItem('cards', JSON.stringify(storedCards)); // Save the updated cards array
    }
  };


  // const [status, ] = useState(getStatus(startDate, endDate));
  const [status, setStatus] = useState(pre_status);
  const [timeLeft, setTimeLeft] = useState(getTimeDifference(pre_status === 'Upcoming'  ? startDate : endDate));
  const navigate = useNavigate();

  const handleParticipateClick = () => {
    if (pre_status === 'Past') {
      toast.error('This event has ended.');
    } else if (pre_status === 'Upcoming') {
      const timeLeft = getTimeDifference(startDate);
      toast.info(`This event will start in ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes.`);
    }
    navigate('/challenge-details', { 
      state: { 
        title, 
        startDate, 
        endDate, 
        image,
        level,
        description,
        cardIndex,
        pre_status
      } 
    });
  };



  // Update the countdown timer every second for upcoming and active events
  useEffect(() => {
    if (pre_status === 'Upcoming' || pre_status === 'Active') {
      console.log("all data is ", title, startDate, endDate, level, description,pre_status, cardIndex,timeLeft)
      const timer = setInterval(() => {
        const newTime = getTimeDifference(pre_status === 'Upcoming' ? startDate : endDate);
        setTimeLeft(newTime);
        const newStatus = getStatus(startDate, endDate);
        if (newStatus !== pre_status) {
          console.log("this is the date ", newStatus, pre_status)
          setStatus(newStatus);
          updateLocalStorage(newStatus); 
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [pre_status, startDate, endDate]);

  return (
    <Card sx={{ maxWidth: 345, borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginBottom: 3 }}>
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent sx={{ textAlign: 'center', minHeight: '40svh', flexGrow: 1 }}>
        {/* Status */}
        <Typography variant="h5" sx={{ textAlign: 'center', m: 1 }} component="div">
          <Chip label={pre_status} className={getStatusClass(pre_status)} />
        </Typography>

        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            m: 2,
            fontSize: '16px',
            lineHeight: '26px',
            fontWeight: 600,
            fontFamily: 'Poppins',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            height: '52px',
            display: 'flex',
            alignItems: title.length <= 30 ? 'center' : 'flex-start',
            justifyContent: 'center',
          }}
          component="div"
        >
          {title}
        </Typography>

        {/* Status-specific Time Info */}
        {pre_status === 'Upcoming' && (
          <Typography variant="h4" sx={{ textAlign: 'center', mt: 2, mb: 2, fontSize: '16px', lineHeight: '26px', fontWeight: 600, fontFamily: 'Poppins' }}>
            Starts In
          </Typography>
        )}
        {pre_status === 'Active' && (
          <Typography variant="h4" sx={{ textAlign: 'center', mt: 2, mb: 2, fontSize: '16px', lineHeight: '26px', fontWeight: 600, fontFamily: 'Poppins' }}>
            Ends In
          </Typography>
        )}
        {pre_status === 'Past' && (
          <Typography variant="h4" sx={{ textAlign: 'center', mt: 2, mb: 2, fontSize: '16px', lineHeight: '26px', fontWeight: 600, fontFamily: 'Poppins' }}>
            Ended On
          </Typography>
        )}

        {/* Countdown Timer */}
        {(pre_status === 'Upcoming' || pre_status === 'Active') && (
          <div className='time_wrapper'>
            <div className="day">
              <span>{timeLeft.days}</span>
              <span className='sub_text'>Day</span>
            </div>
            <span>:</span>
            <div className="hours">
              <span>{timeLeft.hours}</span>
              <span className='sub_text'>Hours</span>
            </div>
            <span>:</span>
            <div className="min">
              <span>{timeLeft.minutes}</span>
              <span className='sub_text'>Min</span>
            </div>
            <span>:</span>
            <div className="sec">
              <span>{timeLeft.seconds}</span>
              <span className='sub_text'>Sec</span>
            </div>
          </div>
        )}

        {/* Date for Past Events */}
        {pre_status === 'Past' && (
          <Typography
            variant="div"
            sx={{
              textAlign: 'center',
              mb: 1,
              fontSize: '18px',
              lineHeight: '20px',
              fontWeight: 600,
              fontFamily: 'Poppins',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              height: '52px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            component="div"
          >
            {new Date(endDate).toLocaleDateString()} {new Date(endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Typography>
        )}

        {/* Button */}
        <Button className="btn prt-btn green" sx={{ mt: 'auto' }} onClick={handleParticipateClick}>
          <img src={tickIcon} alt="icon" style={{ width: '20px', marginRight: '8px' }} />
          Participate Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
