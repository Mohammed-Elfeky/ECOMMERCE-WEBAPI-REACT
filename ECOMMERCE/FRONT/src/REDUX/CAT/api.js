import axios from "axios";
import { base } from "../../THEBASE/URL.js";
export const addCat=async(cat)=>{
    return await axios.post(`${base}/Category`,cat);
}
export const uploadImage=async(id,type,img)=>{
    return await axios.post(`${base}/Upload/${id}/${type}`,img);
}
export const getCatWithId=async(cat_id)=>{
    return await axios.get(`${base}/Category/${cat_id}`);
}
export const getCats=async()=>{
    return await axios.get(`${base}/Category/`);
}
export const updateCat=async(id,cat)=>{
    console.log(id,cat)
    return await axios.put(`${base}/Category/${id}`,cat);
}