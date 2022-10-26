import { FC } from "react"
import { AddPostProps } from "./types"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm, Resolver } from 'react-hook-form';
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import { PostBasicValues } from "../../models";
import { PostAdd } from "@mui/icons-material";


const getRandomId= ():number  => Math.floor(Math.random() * 90)
  
  const resolver: Resolver<PostBasicValues> = async (values) => {
    return {
      values: values.title || values.body ? values : {},
      errors: !values.title || !values.body
        ? {
            title: {
              type: 'required',
              message: 'The description is required',
            },
            body:{
              type: 'required',
              message: 'The description is required',
            }
          }
        : {},
    };
  };

const AddPostForm:FC<AddPostProps> = ({handleSubmitEvent,defaultValues,isLoading,bg,buttonTitle = 'PUBLIC'}) =>{

    const { register, handleSubmit, formState: { errors } } = useForm<PostBasicValues>({ resolver });
    const onSubmit = handleSubmit((data) => {
      
      !defaultValues ? 
       handleSubmitEvent({
            ...data,
            id:getRandomId(),
            userId:getRandomId()
        })
        : 
        handleSubmitEvent(defaultValues)
    });
 
    
    return(
        <Box
        component="form"
        data-testid="form"
        
        boxShadow={'0 0 10px rgba(0,0,0,.5)'}
        padding={3}
        bgcolor={bg ? 'rgba(255,255,255,.3)' : 'transparent'}
        borderRadius={2}
          sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        autoComplete="off"
        onSubmit={onSubmit}
       
        
      >
      
          <Grid container width={'100%'}>
            <Grid width={'100%'} item lg={12}>
            <TextField
           {...register("title")}
            id="title"
            name="title"
            label="title"
            multiline
          
            color="primary"
            style={{width:'100%',color:'white'}}
            focused
            fullWidth
            inputProps={{ "data-testid": "title" }}
            defaultValue={defaultValues?.title}
            
            
          />
              {errors?.title && <Typography color={'white'}>{errors.title.message}</Typography>}
           </Grid>

          <Grid item width={'100%'} lg={12}>

          <TextField
          style={{width:'100%',color:'red'}}
          {...register("body")}
          id="body"
          name="body"
          label="description" 
       
          color="primary"
          focused
            multiline
            rows={4}
            inputProps={{ "data-testid": "body" }}
            defaultValue={defaultValues?.body}
           fullWidth
          />
          {errors?.body && <Typography  color={'white'}>{errors.body?.message}</Typography>}
          </Grid>

          </Grid>
        
        
        <Box display={'flex'} justifyContent="center">
        <Button   sx={{backgroundColor:'primary.light',color:'secondary',width:300,fontWeight:'bold',marginTop:'2rem'}} type="submit" data-testid="submit-button" variant="contained">
        
        {isLoading ?
         <CircularProgress color="secondary"  /> 
         :(
           <>
          {buttonTitle }
          <PostAdd />
          </>
           ) 
            }
          
        </Button>

        </Box>
     
      </Box>
    )
}

export default AddPostForm