import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
  height: 300,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
  };


const ModalInfo = ({ imageData }) => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  let views = `Views: ${imageData.views} `
  let downloads = `Downloads: ${imageData.downloads}`
  let tags = `Tags: ${imageData.tags}`
  let likes = `Likes: ${imageData.likes}`
  let collections =`collections: ${imageData.collections}`

  return (

    <div>
      <div>
        <img key={imageData.id} src={imageData.webformatURL} className="photo" onClick={handleOpen} />
      </div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {views}<br/>
            {downloads}<br/>
            {tags}<br/>
            {likes}<br/>
            {collections}
          </Typography>
				</Box>
			</Modal>
			</div>
  );
}

export default ModalInfo;