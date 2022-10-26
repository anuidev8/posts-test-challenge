import {  PostModelTypes } from "../../models";

export interface AddPostProps  {
    handleSubmitEvent:((e:PostModelTypes)=>void),
    defaultValues?:PostModelTypes,
    isLoading?:boolean
    bg?:boolean
    buttonTitle?:string
}