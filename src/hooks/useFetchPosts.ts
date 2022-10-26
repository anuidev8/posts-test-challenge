import axios from "axios"
import { useEffect, useState } from "react"
import { PostModelTypes } from '../models'


export const useFetchPosts  = (url:string) =>{
    const [ posts,setPosts ] = useState<PostModelTypes[]>([])
    const [ isLoading,setIsLoading] = useState<boolean>(true)

    

    useEffect(()=>{
        const getPosts = async () =>{
            const { data } = await axios.get<PostModelTypes[]>(`${url}`)
            console.log(data);
            
            setPosts(data)
            setIsLoading(false)
        }
        getPosts()
    },[url])
    return{
        posts,
        isLoading,
        
    }
}