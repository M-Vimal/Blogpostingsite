import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from './AxiosInstance'
import { useNavigate } from 'react-router-dom'


export const Delete = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        const deletepost = async()=>{
            try{
            const res = await axiosInstance.delete(`myposts/delete/${id}/`)
            if (res){
                console.log(res.data)
                navigate('/myposts')
            }else(err)=>{
                console.error("error",err);
            
            }
        }catch (err){
            console.error("error",err);
            
        }}
        deletepost()

    },[])
  
}

