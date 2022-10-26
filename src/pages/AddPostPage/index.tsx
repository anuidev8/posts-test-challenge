import { Alert, Grid, Typography} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddPostForm from "../../components/AddPostForm"
import Writter from "../../components/icons/Writter";
import { baseUrl } from "../../helpers";
import { PostModelTypes } from "../../models";


const AddPost = () =>{
    const navigate = useNavigate()
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState<null | string>(null)
    const [showAlert,setShowAlert] = useState<boolean>(false)
    const handleSubmit = async (data:PostModelTypes) =>{
        setIsLoading(true)
        try {
            const res = await axios.post<PostModelTypes>(`${baseUrl}/posts`,data) 
            console.log(res);
            setIsLoading(false)
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
                navigate('/posts')
            }, 2000);
            
        } catch (error) {
            setIsLoading(false)
            setError('Something is wrong ')
        }
       

        
    }
    return(
       <Grid
       container
       spacing={0}
       position="relative"
       alignItems={"center"}
       justifyContent="center"
       sx={{minHeight:'100vh',width:'100%',backgroundColor:'secondary.main'}}
       >
           {
               showAlert &&
          
                   <Alert sx={{ position:'absolute',top:29 }}  color="success" > Post have added correctly </Alert>
             
           }
           <Grid padding={2} item lg={6}>
              
               <Typography variant="h3" color={'white'} fontWeight="bold" textAlign={'center'} marginBottom={5}>PUBLIC YOUR POST</Typography>
           <    AddPostForm isLoading={isLoading} handleSubmitEvent={handleSubmit} />
                {
                    error &&<Typography variant="h6" color={'red'} >{error}</Typography>
                }
           </Grid>
           <Grid item padding={4} lg={6}>
                <Writter />
           </Grid>
           
       </Grid>
    )
}

export default AddPost