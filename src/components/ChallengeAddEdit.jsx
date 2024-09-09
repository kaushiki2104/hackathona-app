
import React, { useState,useRef } from 'react';
import {Container,Typography, Box,TextField, Button, MenuItem, Select, FormControl, Grid } from '@mui/material';
import arrowIcon from '../assest/icons/arrow.png'
import albIcon from '../assest/icons/alb.png'
import cloudLogo from '../assest/icons/bxs_cloud-upload.svg'
import { toast } from 'react-toastify';

import { useLocation, useNavigate } from 'react-router-dom';

const ChallengeAddEdit = () => {

  const fileInputRef = useRef(null);
  
  const location = useLocation();
  const navigate= useNavigate()
  const { title, startDate, endDate,image,description,level,cardIndex,status } = location.state || {};

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


  const initialFormValues = {
    title: '',
    startDate: '',
    endDate: '',
    description: '',
    level: '',
    image: '',
    status:''
  };


  const [formValues, setFormValues] = useState({
    title: title|| '',
    startDate: startDate || '',
    endDate: endDate || '',
    description: description || '',
    level: level || '',
    image: image || '',
    status:status || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    if (name === 'image' && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormValues(prevValues => ({ ...prevValues, image: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleChangeImageClick = () => {
    console.log("click", fileInputRef)
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Access the file input via ref
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();


  // Get the status using the startDate and endDate from formValues
  const status = getStatus(formValues.startDate, formValues.endDate);

  // Update formValues with the calculated status
  const updatedFormValues = {
    ...formValues,
    status: status
  };



    const storedCards = JSON.parse(localStorage.getItem('cards')) || [];
  

if(cardIndex!=undefined && cardIndex !== null){
  storedCards[cardIndex] = updatedFormValues;
  toast.success('Challenge Updated Successfully')
}else{
  storedCards.push(updatedFormValues);
  toast.success('Challenge Created Successfully')
}

    localStorage.setItem('cards', JSON.stringify(storedCards));

setFormValues(initialFormValues);
    navigate('/')

  };


  return (

<>
<Typography variant="h2" sx={{background: '#F8F9FD',p:4, alignItems:'center', fontSize:'24px', fontWeight:700}} component="div"
>
  Challange Details
</Typography>

<Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600,  p: 3 }}>
      <FormControl fullWidth margin="normal">
        <Typography sx={{fontSize:16, fontWeight:500, color: '#333333', mb:3}} >Challenge Name</Typography>
        <TextField
          id="title"
          name="title"
          value={formValues.title}
          onChange={handleChange}
       
        />
      </FormControl>
      
      <FormControl fullWidth margin="normal">
        <Typography sx={{fontSize:16, fontWeight:500, color: '#333333', mb:3}} >Start Date</Typography>
        <TextField
          id="startDate"
          name="startDate"
          type="datetime-local"
          value={formValues.startDate}
          onChange={handleChange}
          TypographyProps={{ shrink: true }}
        />
      </FormControl>
      
      <FormControl fullWidth margin="normal">
        <Typography sx={{fontSize:16, fontWeight:500, color: '#333333', mb:3}} >End Date</Typography>
        <TextField
          id="endDate"
          name="endDate"
          type="datetime-local"
          value={formValues.endDate}
          onChange={handleChange}
          TypographyProps={{ shrink: true }}
        />
      </FormControl>
      
      <FormControl fullWidth margin="normal">
        <Typography sx={{fontSize:16, fontWeight:500, color: '#333333', mb:3}} >Description</Typography>
        <TextField
          id="description"
          name="description"
          value={formValues.description}
          onChange={handleChange}
          multiline
          rows={4}
        />
      </FormControl>
      
<FormControl fullWidth margin="normal">

<Typography sx={{fontSize:16, fontWeight:500, color: '#333333', mb:3}} >Image</Typography>

{(formValues.image=='') && (
  <Button
  // variant="contained"
  component="label"
  sx={{ mt: 2, maxWidth:'50%', gap:2, background:'#D9D9D9', fontWeight:500, fontSize:'18px',color: '#666666' }}
>
  Upload Image <img src={cloudLogo} alt="" />
  <input
    type="file"
    hidden
    name="image"
    onChange={handleFileChange}
    ref={fileInputRef}
  />
</Button>
)}
    
{formValues.image!='' &&(
       
        <Box sx={{ background: '#F8F9FD', width: '50%', display: 'flex', flexDirection: 'column', gap: 2, p: 3, borderRadius:2 }}>
          <img src={formValues.image} alt="Preview" style={{ marginTop: '10px', width: '100%', borderRadius: 5 }} />
          <Typography
            variant='body2'
            sx={{ fontSize: 14, fontWeight: 500, color: '#44924C', gap: 1, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={handleChangeImageClick} // Trigger file input click on this element
          >
            <img src={albIcon} alt="alb logo" style={{ marginRight: '8px' }} />
            Change image
            <img src={arrowIcon} alt="arrow" style={{ marginLeft: '8px' }} />
          </Typography>
          <input
            type="file"
            hidden
            name="image"
            onChange={handleFileChange}
            ref={fileInputRef} 
          />
        </Box>


)}



</FormControl>


      <FormControl fullWidth sx={{mb:5}}>
        <Typography sx={{fontSize:16, fontWeight:500, color: '#333333', mb:3}} >Level</Typography>
        <Select
        sx={{}}
          id="level"
          name="level"
          value={formValues.level || 'Easy'}
          onChange={handleChange}
        >
          <MenuItem value="Easy">Easy</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Hard">Hard</MenuItem>
        </Select>
      </FormControl>



      <Button type="submit"  className='btn crt-btn' >
      Save Changes
      </Button>
    </Box>

    
    </>
  );
};

export default ChallengeAddEdit;
