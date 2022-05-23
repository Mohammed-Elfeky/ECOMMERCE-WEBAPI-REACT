import axios from "axios";
const base="http://localhost:49127/api";

export const addCat=async(cat)=>{
    return await axios.post(`${base}/Category`,cat);
}
export const uploadImage=async(id,type,img)=>{
    return await axios.post(`${base}/Upload/${id}/${type}`,img);
}