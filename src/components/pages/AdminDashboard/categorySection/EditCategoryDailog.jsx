import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function EditAlertDialog({categoryName, categoryID, setName}) {
    const [open, setOpen] = useState(false);
    const [editedName, setEditedName] = useState(categoryName);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit =async (e) => {
      e.preventDefault();
      const authString = localStorage.getItem("auth");
      // Parse the JSON string to an object
      const auth = JSON.parse(authString);
      // Access the token property
      const token = auth.token;
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/admin/update-category/${categoryID}`,
          { name: editedName },
          {
            headers: {
                Authorization: `${token}`,
            },
        }
          // Add headers or other configurations if needed
        );
        setName(editedName);
        console.log(`${response.data.category.name} is updated`);
        toast.success(`${response.data.category.name} is new category`);
        // Close the dialog
        handleClose();
         } catch (error) {
          console.log(error.response.data);
          //toast.error("cant update the catagory");
          toast.error(error.response.data.message
            );
         

        }
     
    };

  
    return (
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
          Edit
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
          Edit category "{categoryName}"
            
          </DialogTitle>
          <form onSubmit={handleSubmit}>
          <DialogContent>
          
           <TextField   value={editedName}
            onChange={(e) =>setEditedName(e.target.value)} />
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>Disagree</Button> */}
            <Button type="submit" onClick={handleClose} autoFocus>
            submit
            </Button>
          </DialogActions>
          </form>
         
        </Dialog>
      </div>
    );
  }