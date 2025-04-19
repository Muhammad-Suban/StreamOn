import axios from "axios";

export const getAllVideos = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/v1/videos/`,
      {}
    );
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const getVideoById = async (videoId) => {
  try {
    let res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/v1/videos/${videoId}`,
      {
        timeout: 10000,
      }
    );
    console.log(res.data.data);
    return res;
  } catch (error) {
    throw error;
  }
};

//publish the video (video,thumbanil ,title ,desc)
export const publishAVideo = async (form) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE}/api/v1/videos/`, form, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    console.log("uploded",res.data?.data);
  } catch (error) {
   
    throw error;
  }
};
