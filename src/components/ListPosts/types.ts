import { PostModelTypes } from "../../models";


export interface PostList  {
    deleteHandlePost:(e:PostModelTypes)=> void
    editHandlePost:(e:PostModelTypes)=> void
}