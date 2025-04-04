import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "../../config";
import { getAllVideos } from "../../utils/api";
function VideoGrid() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [videos, setVideos] = useState([]);
  const [time, setTime] = useState([""]);
  // const [create, setCreate] = useState(0);
  const [owner, setOwner] = useState([]);
  const navigate = useNavigate();

  const categories = [
    { id: "all", name: "All" },
    { id: "trending", name: "Trending" },
    { id: "music", name: "Music" },
    { id: "gaming", name: "Gaming" },
    { id: "news", name: "News" },
    { id: "comedy", name: "Comedy" },
    { id: "sports", name: "Sports" },
    { id: "education", name: "Education" },
  ];

  useEffect(() => {
    (async () => {
      try {
        let res = await getAllVideos()

        console.log("video", res?.data?.videos);
        setVideos(res?.data?.videos);

        // fetchOwner(res.data?.data?.videos);

        console.log("Videos successfully fetched");
      } catch (error) {
        console.log("Error in fetching videos");
        throw error;
      }
    })();
  }, []);

  // const fetchOwner = async (videos) => {
  //   for (const video of videos) {
  //     try {

  //       const res = await axios.post("/api/v1/users/owner-details", {
  //         owner: video.ownerName,
  //       });
  //       console.log("check res",res)

  //     } catch (error) {
  //       console.error("Error in fetching owner", error);
  //     }
  //   }
  // };

  const calculatePublishTime = (createdAt) => {
    let diff = Date.now() - new Date(createdAt);
    const hours = diff / (1000 * 60 * 60);
    const days = diff / (1000 * 60 * 60 * 24);
    const months = diff / (1000 * 60 * 60 * 24 * 30);

    if (hours < 24) return Math.floor(hours) + " hours ago";
    if (days < 30) return Math.floor(days) + " days ago";
    return Math.floor(months) + " months ago";
  };

  useEffect(() => {
    const times = videos.map((video) => calculatePublishTime(video.createdAt));
    setTime(times); // Store the formatted times in the state
  }, [videos]);

  return (
    <div className="pl-[5.5rem]">
      {/* Category Filters */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-2 min-w-max pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-white text-black"
                  : "bg-neutral-800 text-white hover:bg-neutral-700"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {videos.map((video, index) => (
          <div
            key={video._id}
            className="bg-neutral-900 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-neutral-800 hover:border-red-600/50 cursor-pointer"
            onClick={() => navigate(`/${video._id}`)}
          >
            <img
              src={video.thumbnailFile}
              alt="Video thumbnail"
              className="w-full aspect-video object-cover"
            />
            <div className="text-sm text-gray-400 flex flex-wrap">
              <span className="ml-auto p-1">{video.duration?.toFixed(2) }</span>
            </div>
            <div className="p-2">
              <h3 className="font-medium line-clamp-2 text-white hover:text-red-500">
                {video.title}
              </h3>
              <p className="text-sm text-gray-400 mt-1 hover:text-red-500">
                {video.channel} channel name
              </p>

              <div className="text-sm text-gray-400 flex flex-wrap gap-2">

                {/* Wrapper for the last two spans */}
                <div className="w-full flex flex-wrap gap-2">
                  <span className="block">{video.views} views</span>
                  <span className="block">•{time[index]}</span>
                </div>

                {/* Duration fixed to the right */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoGrid;
