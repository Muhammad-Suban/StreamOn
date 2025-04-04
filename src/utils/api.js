import axios from "axios";

export const getAllVideos = async () => {
  try {
    const res = await axios.get(`/api/v1/videos/`, {
      withCredentials: true,
    });
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const getVideoById = async(videoId)=>{
    try {
        let res = await axios.get(`/api/v1/videos/${videoId}`, {
            timeout: 10000,
          });
          console.log(res.data.data);
          return res
        
    } catch (error) {
        throw error
    }
}