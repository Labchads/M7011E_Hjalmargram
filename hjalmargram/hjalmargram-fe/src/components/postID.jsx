
import { useLocation } from "react-router-dom";

export const PostID = () =>
{
    return useLocation().pathname.split("/")[2];
}  
export default PostID;