import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiThumbsUp, FiShare2, FiFlag } from "react-icons/fi";
// import { CommentSection } from "../Comments";
// import { LikeButton } from "../common";
import { Navigate } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "../../config";

function RecommendedVideos() {
    const [video, setVideo] = useState([]);
    const [owner, setOwner] = useState([]);
    const [recommendedVideos, setRecommendedVideos] = useState([]);
    // const { videoId } = useParams();
    const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/v1/videos`);
        console.log("Recommended videos", res);
        setRecommendedVideos(res.data?.data?.videos);

        // recommendedVideos.map((video) => {
        // fetchedOwner(video.ownerName);
        // setOwner(video.ownerName);
        // console.log("Owner fetched successfully");
        // });
      } catch (error) {
        console.log("Error in fetching recommended videos");
        throw error;
      }
    })();
  },[recommendedVideos]);
  
  // TODO: for recommended videos (ownerdetails)
  // useEffect(() => {
  // const fetchedOwner = async () => {
  //     try {
  //       recommendedVideos.map(async () => {
  //         const res = await axios.get("/api/v1/users/owner-details", {
  //           params: { owner: video.ownerName }, //sending owner as querry parameter
  //         });
  //         console.log("owner details", res);
  //         console.log("Owner fetched successfully");
  //         setOwner(res.data?.data);
  //       });
  //     } catch (error) {
  //       console.log("Error fetching owner:");
  //       throw error;
  //     }
  //   };
  //   fetchedOwner();
  //   }, [video]);

  
  
    return (
      
           <div className="lg:w-[400px] space-y-4">
            {recommendedVideos.map((video) => (
              <div
                key={video._id}
                className="flex gap-2 cursor-pointer hover:bg-neutral-900 p-2 rounded-lg"
                onClick={() => navigate(`/${video._id}`)}
              >
                <div className="relative w-40 h-24 flex-shrink-0">
                  <img
                    src={video.thumbnailFile}
                    alt={video.title}
                    className="w-full h-full object-cover rounded-lg"

                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">{owner.userName}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{video.views} views</span>
                    <span>•</span>
                    <span>{video.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div> 
  )
}

export default RecommendedVideos