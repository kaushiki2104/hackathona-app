import React, { useState,useEffect } from 'react';
import { Box, FormControl, FormControlLabel, Checkbox, Typography, FormGroup, Button, Popover, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList'; // Icon for the filter button

const FilterBox = ({ onApplyFilters,filters }) => {
  const [selectedFilters, setSelectedFilters] = useState(filters);
  const [anchorEl, setAnchorEl] = useState(null);
  // const [selectedFilters, setSelectedFilters] = useState(filters);
  // const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setSelectedFilters(filters);
  }, [filters]);

  const handleStatusChange = (event) => {
    const { name, checked } = event.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      status: { ...prevFilters.status, [name]: checked },
    }));
  };

  const handleLevelChange = (event) => {
    const { name, checked } = event.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      level: { ...prevFilters.level, [name]: checked },
    }));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApply = () => {
    onApplyFilters(selectedFilters);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'filter-popover' : undefined;





  // const handleStatusChange = (event) => {
  //   const { name, checked } = event.target;
  //   setSelectedFilters((prevFilters) => ({
  //     ...prevFilters,
  //     status: { ...prevFilters.status, [name]: checked },
  //   }));
  // };

  // const handleLevelChange = (event) => {
  //   const { name, checked } = event.target;
  //   setSelectedFilters((prevFilters) => ({
  //     ...prevFilters,
  //     level: { ...prevFilters.level, [name]: checked },
  //   }));
  // };

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const handleApply = () => {
  //   onApplyFilters(selectedFilters);
  //   handleClose();
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? 'filter-popover' : undefined;

  return (
    <Box sx={{ textAlign: 'center', background: 'white',borderRadius:'4px'  }}>
<Typography variant='h5' component="div"  onClick={handleClick} aria-describedby={id} sx={{fontWeight:400, fontSize:'18px', color:'#000000',padding:'10px 14px',}}>
      Filter <FilterListIcon />
</Typography>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Box sx={{ p: 2 }}>
          <FormControl fullWidth>
            {/* Status Section */}
            <Typography sx={{ fontWeight: 'bold' }}>Status</Typography>
            <FormGroup>
            
              <FormControlLabel
                control={<Checkbox checked={selectedFilters.status.Active} onChange={handleStatusChange} name="Active" />}
                label="Active"
              />
              <FormControlLabel
                control={<Checkbox checked={selectedFilters.status.Past} onChange={handleStatusChange} name="Past" />}
                label="Past"
              />
              <FormControlLabel
                control={<Checkbox checked={selectedFilters.status.Upcoming} onChange={handleStatusChange} name="Upcoming" />}
                label="Upcoming"
              />
            </FormGroup>

            {/* Level Section */}
            <Typography sx={{ mt: 2, fontWeight: 'bold' }}>Level</Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={selectedFilters.level.Easy} onChange={handleLevelChange} name="Easy" />}
                label="Easy"
              />
              <FormControlLabel
                control={<Checkbox checked={selectedFilters.level.Medium} onChange={handleLevelChange} name="Medium" />}
                label="Medium"
              />
              <FormControlLabel
                control={<Checkbox checked={selectedFilters.level.Hard} onChange={handleLevelChange} name="Hard" />}
                label="Hard"
              />
            </FormGroup>
            <Button onClick={handleApply} sx={{ mt: 2 }}>Apply Filters</Button>
          </FormControl>
        </Box>
      </Popover>
    </Box>
  );
};

export default FilterBox;
