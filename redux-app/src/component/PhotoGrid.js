import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@mui/material/Button';
import { updatePhotos } from './photoSlice'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ModalInfo from './ModalInfo';
import axios from 'axios';
import '../css/PhotoGrid.css'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 200,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
  };

const PhotoGrid = () => {

	const photosFromStore = useSelector(state => state.photos.data)
	const totalPages = useSelector(state => state.photos.totalPages)
  	const dispatch = useDispatch()

	const [currentPage, setCurrentPage] = useState(1);

	const [inputValue, setInputValue] = useState('');

	const [open, setOpen] = React.useState(false);
  	const handleOpen = () => setOpen(true);
  	const handleClose = () => setOpen(false);

	useEffect(() => {
		fetchItems(currentPage);
	  }, [currentPage]);

	const fetchItems = async (page) => {
		
			try {
				const response = await axios.get(`http://localhost:8000/api/items?page=${page}`);
				const received = response.data;
				dispatch(updatePhotos(received))
			} catch (error) {
				console.error(error);
			}
	};

	const fetchNewType = async (type) => {
		
		try {
			const response = await axios.get(`http://localhost:8000/new?category=${type}`);
			const received = response.data;
			dispatch(updatePhotos(received))
			setCurrentPage(1);
		} catch (error) {
			console.error(error);
		}
};

	const handlePrevPage = () => {
		if (currentPage > 1) {
		  setCurrentPage(currentPage - 1);
		}
	};
	
	const handleNextPage = () => {
		if (currentPage < totalPages) {
		  setCurrentPage(currentPage + 1);
		}
	};

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	  };
	
	  const handleSubmit = (event) => {
		event.preventDefault();
		handleClose();
		fetchNewType(inputValue);
		console.log(inputValue);
	  };

	var images = photosFromStore.map(function(image) {
		return (<ModalInfo imageData={image}/>)
	});

	
	return (
		<div>
			<div style={{ display: "flex" }}>
				<Button variant="outlined" style={{ marginRight: "auto" }} onClick={handlePrevPage} disabled={currentPage === 1}>
				Prev
				</Button>
				<Button variant="outlined" style={{ alignItems: 'center' }} onClick={handleOpen} >
				Choose Type
				</Button>
				<Button variant="outlined" style={{ marginLeft: "auto" }} onClick={handleNextPage} disabled={currentPage === Math.floor(totalPages)}>
				Next
				</Button>
			</div>
			<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					<form onSubmit={handleSubmit}>
						<TextField
							id="outlined-basic"
							label="Enter Type :"
							variant="outlined"
							value={inputValue}
							onChange={handleInputChange}
						/>
					</form>
				</Typography>
				<Typography id="modal-modal-description" sx={{ mt: 2 }}>
				For example: animals, work etc.
				</Typography>
				</Box>
			</Modal>
			</div>
			<div className="square">
				<div className="photo-grid">
					{images}
				</div>
			</div>
		</div>
	);
};

export default connect()(PhotoGrid);