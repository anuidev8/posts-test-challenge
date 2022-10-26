import { Navigate, Route, Routes } from "react-router-dom"
import AddPostPage from "../pages/AddPostPage"
import ListPostsPage from "../pages/ListPostsPage"

export const AppRouter = () =>{
    return(
        <Routes>
            <Route path="/" element={<AddPostPage />} />
            <Route path="/posts" element={<ListPostsPage />} />
            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
    )
}

