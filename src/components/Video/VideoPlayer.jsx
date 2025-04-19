import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiThumbsUp, FiShare2, FiFlag } from "react-icons/fi";
import { CommentSection } from "../Comments";
import { LikeButton } from "../common";
import axios from "axios";
import RecommendedVideos from "./RecommendedVideos";
import { getVideoById } from "../../utils/api";

function VideoPlayer() {
  const [video, setVideo] = useState([]);
  const [owner, setOwner] = useState([]);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const { videoId } = useParams();

  useEffect(() => {
    const fetchedVideo = async () => {
      try {
        let res = await getVideoById(videoId);
        setVideo(res.data?.data);
        fetchedOwner(res.data?.data?.ownerName);

        console.log("Videos successfully fetched");
      } catch (error) {
        console.log("Error in fetching videos");
        throw error;
      }
    };
    fetchedVideo();
  }, [videoId]);

  const fetchedOwner = async (owner) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/owner-details`, {
        params: { owner: owner }, //sending owner as querry parameter
      });
      // console.log("owner details", res);
      console.log("Owner fetched successfully");
      setOwner(res.data?.data);
      
    } catch (error) {
      console.log("Error fetching owner:");
      throw error;
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await axios.get("/api/v1/videos");
  //       console.log("Recommended videos", res);
  //       setRecommendedVideos(res.data?.data?.videos);

  //       // recommendedVideos.map((video) => {
  //       // fetchedOwner(video.ownerName);
  //       // setOwner(video.ownerName);
  //       // console.log("Owner fetched successfully");
  //       // });
  //     } catch (error) {
  //       console.log("Error in fetching recommended videos");
  //       throw error;
  //     }
  //     recommendedFx();
  //   })();
  // }, [videoId]);

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
    <div className="w-full pl-[5.5rem] py-6">
      <div className="max-w-[1800px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Video Player */}
            <div className="w-full aspect-video bg-neutral-900 rounded-lg mb-4">
              <video
                key={video.videoPath}
                className="w-full h-full rounded-lg"
                controls
                poster={video.thumbnailFile}
                src={video.videoFile}
              >
                {/* <source src={video.videoFile} type="video/mp4" /> */}
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video Info */}
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-white">{video.title}</h1>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={owner.avator}
                    alt={owner.userName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="text-white font-medium">{owner.userName}</h3>
                    {/* <p className="text-sm text-gray-400">{video.subscribers} sub</p> */}
                  </div>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700">
                    Subscribe
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <LikeButton
                    entityId={videoId}
                    entityType="video"
                    initialLikes={10000 }
                  />
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white rounded-full hover:bg-neutral-800">
                    <FiShare2 size={20} />
                    Share
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white rounded-full hover:bg-neutral-800">
                    <FiFlag size={20} />
                    Report
                  </button>
                </div>
              </div>

              {/* Video Description */}
              <div className="bg-neutral-900 rounded-lg p-4">
                <div className="flex gap-4 text-gray-400 text-sm mb-2">
                  <span>{video.views} views</span>
                  <span>{video.timestamp}</span>
                </div>
                <p className="text-white">{video.description}</p>
              </div>

              {/* Comments Section */}
              <div className="mt-6">
                <CommentSection entityId={videoId} entityType="video" />
              </div>
            </div>
          </div>

          {/* Recommended Videos */}
          {/* <div className="lg:w-[400px] space-y-4">
            {recommendedVideos.map((video) => (
              <div
                key={video._id}
                className="flex gap-2 cursor-pointer hover:bg-neutral-900 p-2 rounded-lg"
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
          </div> */}
          <RecommendedVideos />
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
