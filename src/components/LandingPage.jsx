// src/pages/LandingPage.js
import React, {useState,useEffect} from "react";
import "../style/landingPage.css";

// image
import rocketImage from "../assest/icons/PicsArt_04-14-04.42 1.svg";
import hundred_k_logo from "../assest/icons/Group 1000002515.svg";
import fifty_k_logo from "../assest/icons/Group 1000002516.svg";
import hun_plus_logo from "../assest/icons/Group 1000002518.svg";
import gridIcon1 from '../assest/icons/carbon_notebook-reference.svg'
import gridIcon2 from '../assest/icons/Vector.svg'
import gridIcon3 from '../assest/icons/Robot.svg'
import gridIcon4 from '../assest/icons/IdentificationCard.svg'

import cardImage1 from '../assest/cardimage/Group 1000002466.png'
import cardImage2 from '../assest/cardimage/Group 1000002766.png'
import cardImage3 from '../assest/cardimage/Group 1000002767.png'

import SearchIcon from '../assest/icons/search.svg'

// material ui
import Container from "@mui/material/Container";
import { Stack, Grid, Box, Typography,Chip, Button,TextField,InputAdornment } from "@mui/material";


// font
import "@fontsource/poppins";
import { useNavigate } from 'react-router-dom';
// component 
import CardComponent from "./CardComponent";
import FilterBox from "./FilterBox";
// import { useState } from "react";


const gridData = [
  {
    icon: <img src={gridIcon1} alt="Prove skills" width="40" height="40" />,
    title: "Prove your skills",
    description:
      "Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions.",
  },
  {
    icon: <img src={gridIcon2} alt="Learn from community" width="40" height="40" />,
    title: "Learn from community",
    description:
      "One can look and analyze the solutions submitted by the other Data Scientists in the community and learn from them.",
  },
  {
    icon: <img src={gridIcon3} alt="Challenge yourself" width="40" height="40" />,
    title: "Challenge yourself",
    description:
      "There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder.",
  },
  {
    icon: <img src={gridIcon4} alt="Earn recognition" width="40" height="40" />,
    title: "Earn recognition",
    description:
      "You will stand out from the crowd if you do well in AI challenges. It not only helps you shine in the community but also earns rewards.",
  },
];

const cardData = [
  {
    image: cardImage1,  // Replace with actual image URL
    title: 'Card Title 1 fdas kjla lkdfj dsajfds lkdsjf al kjads flksajf lk dasl kfj slkfj s lkjdsfl ksjfal kjdsa ljdsaf JA',
    description: 'This is a description for card 1.',
    startDate: '2024-09-08T00:52',
    endDate: '2024-09-08T12:51',
  },
  {
    image: cardImage2,
    title: 'Card Title 2',
    description: 'This is a description for card 2.',
    startDate: '2024-09-08T12:51',
    endDate: '2024-09-05',
  },
  {
    image: cardImage3,
    title: 'Card Title 3',
    description: 'This is a description for card 3.',
    startDate: '2024-09-10',  // Set actual start date
    endDate: '2024-09-08T12:51', 
  },
  {
    image: cardImage1,  // Replace with actual image URL
    title: 'Card Title 4 fdas kjla lkdfj dsajfds lkdsjf al kjads flksajf lk dasl kfj slkfj s lkjdsfl ksjfal kjdsa ljdsaf JA',
    description: 'This is a description for card 1.',
    startDate: '2024-09-03T00:52',
    endDate: '2024-09-22T12:51',
    level:'Hard'
  },
  {
    image: cardImage2,
    title: 'Card Title 2',
    description: 'This is a description for card 2.',
    startDate: '2024-09-01',
    endDate: '2024-09-05',
  },
  {
    image: cardImage3,
    title: 'Card Title 3',
    description: 'This is a description for card 3.',
    startDate: '2024-09-10',  // Set actual start date
    endDate: '2024-09-15', 
  },
];




const LandingPage = () => {
const navigate = useNavigate();
const [cards, setCards] = useState([]);
const [searchQuery, setSearchQuery] = useState('');


const [chips, setChips] = useState([]);
const [filters, setFilters] = useState({
  status: {
  
    Active: false,
    Past: false,
    Upcoming: false,
  },
  level: {
    Easy: false,
    Medium: false,
    Hard: false,
  },
});

// store data in localStorage 
useEffect(() => {
  const defaultCards = [
    {
      title: 'Card 1',
      startDate: '2024-09-07T12:00',
      endDate: '2024-09-30T12:00',
      description: 'This is card 1 description.',
      level: 'Easy',
      image: cardImage1, // Add your default image
    },
    {
      title: 'Card 2',
      startDate: '2024-09-15T12:00',
      endDate: '2024-09-30T12:00',
      description: 'This is card 2 description.',
      level: 'Medium',
      image: cardImage2,
    },
    {
      title: 'Card 3',
      startDate: '2023-11-01T12:00',
      endDate: '2023-11-02T12:00',
      description: 'This is card 3 description.',
      level: 'Hard',
      image: cardImage3,
    },
  ];

  const storedCards = JSON.parse(localStorage.getItem('cards'));
  if (!storedCards) {
    // Loop through each card and calculate its status based on the startDate and endDate
    const updatedDefaultCards = defaultCards.map((card) => {
      const status = getStatus(card.startDate, card.endDate);
      return {
        ...card,
        status, // Add the calculated status to each card
      };
    });

    setCards(updatedDefaultCards);
    localStorage.setItem('cards', JSON.stringify(updatedDefaultCards));
  }else{
    setCards(storedCards);
  }
}, []);

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


  const openChallengePage = () => {
    navigate('/create-challenge');
  };

// Handler for search box input
const handleSearch = (event) => {
  setSearchQuery(event.target.value );
  console.log("serch field function  is ", event.target.value)
};

// Filter cards based on search query
// const filteredCards = cards.filter(card =>
//   card.title.toLowerCase().includes(searchQuery.toLowerCase())
// );


// second 
// const filteredCards = cards.filter(card => {
//   // Check if card matches search query
//   const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase());

//   // Check if card matches filters
//   const matchesStatus = Object.keys(filters.status).every(key => 
//     !filters.status[key] || card.status === key
//   );

//   const matchesLevel = Object.keys(filters.level).every(key => 
//     !filters.level[key] || card.level === key
//   );

//   return matchesSearch && matchesStatus && matchesLevel;
// });

// third 
// const filteredCards = cards.filter(card => {
//   // Check if card matches search query
//   console.log("serch field text is ", searchQuery)
//   const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase());

//   // Check if card matches selected status filters
//   const matchesStatus = Object.keys(filters.status).some(key => 
//     filters.status[key] && card.status === key
//   );

//   // Check if card matches selected level filters
//   const matchesLevel = Object.keys(filters.level).some(key => 
//     filters.level[key] && card.level === key
//   );

//   // Return true if card matches search and any of the selected filters
//   console.log("match serch ", matchesSearch ,matchesStatus, matchesLevel)
//   return matchesSearch && (matchesStatus || matchesLevel);
// });




  // Handle the click to open the filter popover
 
  // fourth 
  // const filteredCards = cards.filter(card => {
  //   // Check if card matches search query
  //   let matchesSearch=false
  //   if(searchQuery!=''){
  //    matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase());
  // }
  //   // Check if card matches selected status filters
  //   const matchesStatus = Object.keys(filters.status).length === 0 || 
  //     Object.keys(filters.status).some(key => filters.status[key] && card.status === key);
  
  //   // Check if card matches selected level filters
  //   const matchesLevel = Object.keys(filters.level).length === 0 || 
  //     Object.keys(filters.level).some(key => filters.level[key] && card.level === key);

  //     console.log("match serch ", matchesSearch ,matchesStatus, matchesLevel)
  //   // Return true if card matches search and (matches filters or no filters applied)
  //   return  matchesSearch ? matchesSearch || (matchesStatus || matchesLevel) :  (matchesStatus || matchesLevel)
   
  // });

  const filteredCards = 
  (cards || []).filter(card => {
    // Check if card matches search query
    const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase());
  
    // Check if any status filters are selected
    const statusFilterSelected = Object.values(filters.status).some(value => value);
  
    // Check if card matches selected status filters
    const matchesStatus = !statusFilterSelected || 
      Object.keys(filters.status).some(key => filters.status[key] && card.status === key);
  
    // Check if any level filters are selected
    const levelFilterSelected = Object.values(filters.level).some(value => value);
  
    // Check if card matches selected level filters
    const matchesLevel = !levelFilterSelected || 
      Object.keys(filters.level).some(key => filters.level[key] && card.level === key);
  
    // Return true if card matches search and either no filters are applied or it matches the applied filters
    return matchesSearch && (!statusFilterSelected || matchesStatus) && (!levelFilterSelected || matchesLevel);
  });
  



  const handleApplyFilters = (selectedFilters) => {
    setFilters(selectedFilters);
    const newChips = [];
console.log("this is the chips fata ", selectedFilters)
    // Create chips for selected status
    Object.keys(selectedFilters.status).forEach((key) => {
      if (selectedFilters.status[key]) {
        newChips.push(key);
      }
    });

    // Create chips for selected level
    Object.keys(selectedFilters.level).forEach((key) => {
      if (selectedFilters.level[key]) {
        newChips.push(key);
      }
    });

    setChips(newChips);
  };

  const handleRemoveChip = (chipToRemove) => {
    // Update filters to deselect the chip
    const updatedFilters = { ...filters };

    Object.keys(updatedFilters.status).forEach((key) => {
      if (key === chipToRemove) {
        updatedFilters.status[key] = false;
      }
    });

    Object.keys(updatedFilters.level).forEach((key) => {
      if (key === chipToRemove) {
        updatedFilters.level[key] = false;
      }
    });

    setFilters(updatedFilters);

    // Remove the chip from the chips array
    setChips((prevChips) => prevChips.filter((chip) => chip !== chipToRemove));
  };





  return (
    <>
   {/* first section   */}

      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: "#003145",
          color: "white",
          fontFamily: "Poppins",
        }}
      >
        <Grid container spacing={0}>
          {/* First Column: Text */}

          <Grid
            item
            xs={12}
            md={8}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box sx={{ padding: { xs: 0, md: 4 }, m: 5 }}>
              <Typography
                variant="h3"
                sx={{
                  mb: 2,
                  borderLeft: "15px solid #FFCE5C",
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  paddingLeft: "30px",
                }}
              >
                Accelerate Innovation <br /> with Global AI Challenges
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 300,
                  paddingLeft: "35px",
                }}
              >
                AI Challenges at DPhi simulate real-world problems. It is a
                great place to put your AI/Data Science skills to test on
                diverse datasets allowing you to foster learning through
                competitions.
              </Typography>
              {/* create button  */}
              <Typography
                variant="h1"
                sx={{
                  mb: 4,
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  paddingLeft: "35px",
                }}
              >
                <Button className="btn crt-btn white" onClick={openChallengePage}>Create Challenge</Button>
              </Typography>
            </Box>
          </Grid>

          {/* Second Column: Image */}

          <Grid
            item
            md={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Box sx={{ padding: 0 }}>
              <img src={rocketImage} alt="Rocket Image" />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* second section   */}

      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: "#002A3B",
          color: "white",
          fontFamily: "Poppins",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 5,
        }}
      >
        <Grid container spacing={3} sx={{ ml: 4, mr: 4 }}>
          {/* First Column: Text */}
          {/* 100k  */}
          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            justifyContent={{md:"center", sm:'start'}}
            alignItems="center"
            gap="10px"
          >
            <img src={hundred_k_logo} alt="AI Challenge Logo" />

            <span>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                100k+
              </Typography>
              <Typography variant="body1">AI challenge hosted</Typography>
            </span>
          </Grid>

          {/* 50k */}

          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            justifyContent={{md:"center", sm:'start'}}
            alignItems="center"
            gap="10px"
          >
            <img src={fifty_k_logo} alt="AI Challenge Logo" />

            <span>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                50k+
              </Typography>
              <Typography variant="body1">Data Scientists</Typography>
            </span>
          </Grid>

          {/* 100+ */}

          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            justifyContent={{md:"center", sm:'start'}}
            alignItems="center"
            gap="10px"
          >
            <img src={hun_plus_logo} alt="AI Challenge Logo" />

            <span>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                100+
              </Typography>
              <Typography variant="body1">AI challenge hosted</Typography>
            </span>
          </Grid>
        </Grid>
      </Container>

      {/* third sectrion   */}
      
      <Container maxWidth="xl" sx={{ fontFamily: "Poppins", py: 10, px:{sm:0, xs:0, md:1}, minHeight: '100vh' }}>
      {/* Heading */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: 10,
          fontSize: "32px",
          fontWeight: 600,
          fontFamily: "Poppins",
        }}
      >
        Why Participate in{" "}
        <span className="success-text">AI Challenges? </span>
      </Typography>

      {/* Grid Section */}
      <Box sx={{ m: {sm:1,xs:1,md:5} }}>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {gridData.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
              {item.icon}
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                {item.title}
              </Typography>
              <Typography variant="body1">{item.description}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>

    </Container>
  
{/* fourth section  */}
  
  {/* search  */}
<Container maxWidth='xl' sx={{background: '#002A3B',p:{sm:0, md:5}}} >
   <Typography  container='div' sx={{ p:6, fontWeight:600, fontSize:'28px', fontFamily:'Poppins', color:'white', textAlign:'center'}}>
   Explore Challenges

   </Typography>

<Box sx={{  display:'flex', justifyContent:'center', flexDirection:'column',alignItems:'center'}}>
    <Typography container='div' sx={{display:'flex', alignItems:'center',flexDirection:{sm:'column', md:'row', xs:'column'}, justifyContent:'center', gap:'12px', width:'100%'}}>
      <TextField
        id="search"
        name="search"
        sx={{ background: 'white', borderRadius: 4, width: {md:'50%', sm:'100%'} }}
        onChange={handleSearch}
        placeholder="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
             <img src={SearchIcon} alt="" />
            </InputAdornment>
          ),
        }}
      />
      <Box sx={{ width:{md: '10%'} }}>
        <FilterBox onApplyFilters={handleApplyFilters} filters={filters}/>
      </Box>

</Typography>
   <Typography container='div'  sx={{width:{ sm:'100%',md:'70%',xs:'100%' }}}>

      <Box sx={{m: '2%', pl: '4%',  display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {chips.map((chip, index) => (
          <Chip key={chip} label={chip} sx={{background:'white'}} 
          onDelete={() => handleRemoveChip(chip)}
          />
        ))}
      </Box>
  </Typography>

</Box>



</Container>


{/* card section  */}

<Container
        maxWidth="xl"
        sx={{
          backgroundColor: "#003145",
          color: "white",
          fontFamily: "Poppins",
        p:5
        }}
        >
{/* card data  */}

<Box sx={{ m:{sm:0, md:5}, background:'#003145' }}>
      <Grid container spacing={3}>
        {filteredCards.length > 0 ? ( filteredCards.map((card, index) => (
          <Grid item xs={12} sm={12} md={4} key={index}>
            <CardComponent
             key={index}
             cardIndex={index} 
              image={card.image}
              title={card.title}
              description={card.description}
              startDate={card.startDate}
              endDate={card.endDate}
              level={card.level}
              pre_status={card.status}

            />
          </Grid>
        )) ) : (
      <Grid item xs={12}>
        <Typography variant="h5" align="center" sx={{ color: '#fff', mt: 3 }}>
          No Challenge available
        </Typography>
      </Grid>
    )} 
       
      </Grid>
    </Box>



        </Container>




    </>
  );
};

export default LandingPage;


