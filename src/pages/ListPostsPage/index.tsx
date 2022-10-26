
import { Fragment, useState } from 'react'
import ListPosts from "../../components/ListPosts"
import axios from 'axios';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import {Modal,Box,Grid} from '@mui/material';
import AddPostForm from '../../components/AddPostForm';
import { PostModelTypes } from '../../models';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
  };

const ListPostsPage = () =>{
 
       
        const [open, setOpen] = useState(false);
        const [openDialog, setOpenDialog] = useState(false);
        const [feedback,setFeedBack] = useState({type:'',message:''})
        const [loadingEdit, setLoadingEdit] = useState(false);
        const [postSelected,setPostSelected] = useState<PostModelTypes>()

        const handleClose = () => setOpen(false);
        const editHandlePost =  (post:PostModelTypes) =>{  
            setOpen(true)
            setPostSelected(post)
        } 
        const deleteHandlePost =  (post:PostModelTypes) =>{  
            setOpenDialog(true)
            setPostSelected(post)
        } 

        

        const handleSubmit = async (post:PostModelTypes) =>{
        
            setLoadingEdit(true) 
            try {
                const { data } = await axios.patch<PostModelTypes>(`https://jsonplaceholder.typicode.com/posts/${post.id}`,post)
                setOpen(false)
                setTimeout(() => {
                    setLoadingEdit(false) 
                }, 2000);
               
            } catch (error) {
                
            }
            
        }

        const handleDeleted = async () =>{
           
            try {
                const { data } = await axios.delete<PostModelTypes>(`https://jsonplaceholder.typicode.com/posts/${postSelected?.id}`)
                console.log(data);
                setFeedBack({type:'DELETE',message:'The post have deleted correctly'})
                setTimeout(() => {
                    setOpenDialog(false)
                    setLoadingEdit(true) 
                    setTimeout(() => {
                        setLoadingEdit(false) 
                        
                    }, 1000);
                }, 1000);
            } catch (error) {
                
            }
        }

      
        
    return(
        <Grid
        container
        padding={4}
        spacing={0}
        position="relative"
        alignItems={"center"}
        justifyContent="center"
        sx={{minHeight:'100vh',width:'100%',backgroundColor:'secondary.main'}}
        >
     
       
            {
            !loadingEdit &&   
            <Grid item lg={8}>
                   <Typography fontWeight={'bold'} textAlign={'center'} marginBottom={3} id="modal-modal-title" variant="h2" component="h2">
                        Public List Posts
                        </Typography>
                <ListPosts deleteHandlePost={deleteHandlePost} editHandlePost={editHandlePost}/>
            </Grid> 
            }
            {
            open && postSelected &&
                <Fragment>
                    <Modal
        
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box 
                            sx={style}
                        >
                        <Typography marginBottom={3} id="modal-modal-title" variant="h4" component="h2">
                        Editing post
                        </Typography>
                        
                        {
                            postSelected &&
                            <AddPostForm buttonTitle='Edit' bg isLoading={loadingEdit} defaultValues={postSelected} handleSubmitEvent={handleSubmit}/>
                        }
                        </Box>
                    </Modal>
                </Fragment>
           

        }

        {/* DIALOG */}
        <Dialog
       
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle  sx={{ backgroundColor:'white' }} id="alert-dialog-title">
        <Typography marginBottom={3} color="secondary" id="modal-modal-title" variant="h5" component="h2">
               {
                   feedback && feedback.type === 'DELETE' ? feedback.message : ' Are you sure to delete ?'

               }
        </Typography>
        </DialogTitle>
       
        <DialogActions   sx={{ backgroundColor:'white' }}>
          <Button color='error' onClick={()=>setOpenDialog(false)}>Disagree</Button>
          <Button onClick={handleDeleted} autoFocus>
            Agree
          </Button>
        </DialogActions>
        </Dialog>
        
       
        </Grid>
    )
}

export default ListPostsPage





