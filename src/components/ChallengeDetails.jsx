import * as React from "react";

import { Container, Typography, Box, Button } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import clockIcon from "../assest/icons/clock.png";
import lavelIcon from "../assest/icons/carbon_skill-level-basic.svg";
import { toast } from "react-toastify";







export default function ChallengeDetails() {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    // Day with suffix (1st, 2nd, 3rd, 4th, etc.)
    const day = date.getDate();
    const daySuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
  
    // Month and Year
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
  
    // Time in 12-hour format with AM/PM
    const time = date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).toUpperCase();
  
    // Formatted date string
    return `${day}${daySuffix(day)} ${month}'${year} ${time}`;
  };


  const location = useLocation();
  const navigate= useNavigate()
  const { title, startDate, endDate, pre_status, image,description,level, cardIndex} = location.state || {};
  console.log("varialbe is ", startDate, endDate)

const openAddEditForm= ()=>{
  navigate('/create-challenge',{
  state:{
    title:title,
    startDate:startDate,
    endDate:endDate,
    description:description,
    image:image,
    level:level,
    cardIndex:cardIndex,
    status:pre_status
     }
}

  )
}


const deleteCard=()=>{
  const localData= (JSON.parse(localStorage.getItem('cards'))) 
         localData.splice(cardIndex,1)
      localStorage.setItem('cards', JSON.stringify(localData));
      toast.success('Challenge Deleted Successfully')
      navigate('/')
}


  return (
    <>
      <Container maxWidth="xl" sx={{ background: "#003145", color: "white" }}>
        <Box sx={{ p: 8 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              gap: 1,
              background: "#FFCE5C",
              color: "#000000",
              p: 1,
              mb: 3,
              maxWidth: { sm: "100%", md: "50%" },
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src={clockIcon} alt="icon" style={{ marginTop: "-2px" }} />{" "}
          {pre_status} {formatDate(startDate)} (India Standard Time)
          </Typography>
{/* title  */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontSize: "40px", fontWeight: 600, mb: 4 }}
          >
          {title}
          </Typography>
{/* subtitile  */}
          <Typography
            variant="body1"
            gutterBottom
            sx={{ fontSize: 18, fontWeight: 500, mb: 7 }}
          >
           {description} 
          </Typography>

          <Typography
            variantMapping={{ body1: "span" }}
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: "#003145",
              background: "white",
              p: "10px 20px",
              borderRadius: "5px",
            }}
          >
            <img src={lavelIcon} alt="icon" style={{ marginBottom: "-2px" }} />{" "}
             {level}
          </Typography>
        </Box>
      </Container>

      {/* second box overview */}
      <Box sx={{ boxShadow: "0px 6px 12px 0px #DDE6ED", p: "1.5% 5% 0 5%" }}>
        <Typography
          Container="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h4"
           
            sx={{
              fontSize: "18px",
              fontWeight: 500,
              color: "#000000",
              p: "5px 10px",
              borderBottom: "4px solid #44924C",
              borderRadius: " 0 0 4px 4px",
            
            }}
          >
            Overview
          </Typography>
          {/* buttons  */}
          <Typography Container="div" sx={{display:'flex', gap:3, marginTop: '-15px'}}>
            <Button
              sx={{
                background: "#44924C",
                color: "white",
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "14px",
              }}
              onClick={openAddEditForm}
            >
              Edit
            </Button>

            <Button variant="outlined" color="error"
                onClick={deleteCard}
                   sx={{
                     fontFamily: "Poppins",
                     fontWeight: "600",
                     fontSize: "14px",
                   }}
                     >
                      Delete
            </Button>


            
          </Typography>
        </Typography>
      </Box>
  {/* third section  */}
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <Box sx={{ m: 4, p: 4, maxWidth: "70%" }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "20px",
              fontWeight: "500",
              lineHeight: "28px",
              letterSpacing: "-0.02em",
              textAlign: "left",
              color: "#64607D",
              mb: 4,
            }}
          >
            Butterflies are the adult flying stage of certain insects belonging
            to an order or group called Lepidoptera. The word "Lepidoptera"
            means "scaly wings" in Greek. This name perfectly suits the insects
            in this group because their wings are covered with thousands of tiny
            scales overlapping in rows.
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "20px",
              fontWeight: "500",
              lineHeight: "28px",
              letterSpacing: "-0.02em",
              textAlign: "left",
              color: "#64607D",
              mb: 4,
            }}
          >
            An agency of the Governmental Wildlife Conservation is planning to
            implement an automated system based on computer vision so that it
            can identify butterflies based on captured images. As a consultant
            for this project, you are responsible for developing an efficient
            model.{" "}
          </Typography>

          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "20px",
              fontWeight: "500",
              lineHeight: "28px",
              letterSpacing: "-0.02em",
              textAlign: "left",
              color: "#64607D",
              mb: 4,
            }}
          >
            Your Task is to build an Image Classification Model using CNN that
            classifies to which class of weather each image belongs to.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
