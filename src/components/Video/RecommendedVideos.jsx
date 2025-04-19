import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllVideos } from "../../utils/api";

function RecommendedVideos() {
    const [recommendedVideos, setRecommendedVideos] = useState([]);
    const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllVideos()
        setRecommendedVideos(res.data?.videos);
        console.log("Recommended videos", res);
      } catch (error) {
        console.log("Error in fetching recommended videos");
        throw error;
      }
    })();
  },[]);
  
  
  
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
                  <p className="text-sm text-gray-400 mt-1">{video.ownerName.userName}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{video.views} views</span>
                    {/* <span>•</span> */}
                    {/* <span>{video.timestamp}</span> */}
                  </div>
                </div>
              </div>
            ))}
          </div> 
  )
}

export default RecommendedVideos