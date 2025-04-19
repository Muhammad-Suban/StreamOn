import { useState } from "react";
import { FiUpload, FiImage } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import ChannelInfo from "./Channel";
import axios from "axios";
// import { publishAVideo } from "../../utils/api";

function Studio() {
  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    videoFile: null,
    thumbnailFile: null,
  });

  const [isLoadingThumbnail, setIsLoadingThumbnail] = useState(false);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);

  const categories = [
    { id: "gaming", name: "Gaming" },
    { id: "music", name: "Music" },
    { id: "education", name: "Education" },
    { id: "comedy", name: "Comedy" },
    { id: "news", name: "News" },
    { id: "sports", name: "Sports" },
  ];

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    setVideoData({ ...videoData, [type]: file });

    if (file && type === "thumbnailFile") {
      setIsLoadingThumbnail(true);
      setTimeout(() => {
        setIsLoadingThumbnail(false);
      }, 800);
    }

    if (file && type === "videoFile") {
      setIsLoadingVideo(true);
      setTimeout(() => {
        setIsLoadingVideo(false);
      }, 800);
    }
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in videoData) {
      form.append(key, videoData[key]);
    }

     try {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/videos/`, form, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
    
        console.log("video uploded");
      } catch (error) {
       
        throw error;
      }
  };

  return (
    <div className="w-full pl-[5.5rem] py-6">
      <div className="max-w-4xl mx-auto px-4">
        <ChannelInfo />
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Upload Video</h2>
          <form onSubmit={handleVideoSubmit} className="space-y-6">
            <div className="bg-neutral-900 p-6 rounded-lg space-y-6">
              {/* Video Upload */}
              <div className="relative">
                <div className="h-64 bg-neutral-800 rounded-lg flex items-center justify-center border-2 border-dashed border-neutral-700 hover:border-red-500 transition-colors cursor-pointer">
                  {isLoadingVideo ? (
                    <ImSpinner2 className="animate-spin text-red-500 text-3xl" />
                  ) : (
                    <div className="text-center">
                      <FiUpload
                        size={36}
                        className="mx-auto mb-2 text-neutral-500"
                      />
                      <p className="text-neutral-400">
                        Drag and drop your video or click to browse
                      </p>
                      <p className="text-sm text-neutral-500 mt-1">
                        MP4, WebM or Ogg (Max 2GB)
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="video/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => handleImageChange(e, "videoFile")}
                  />
                </div>
                {!isLoadingVideo && videoData.videoFile && (
                  <p className="text-green-400 text-sm mt-2">
                    ✅ Video loaded! You can now upload the video.
                  </p>
                )}
              </div>

              {/* Video Details */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="videoTitle"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Video Title
                  </label>
                  <input
                    type="text"
                    id="videoTitle"
                    value={videoData.title}
                    onChange={(e) =>
                      setVideoData({ ...videoData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                    placeholder="Enter video title"
                  />
                </div>

                <div>
                  <label
                    htmlFor="videoDescription"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Video Description
                  </label>
                  <textarea
                    id="videoDescription"
                    value={videoData.description}
                    onChange={(e) =>
                      setVideoData({
                        ...videoData,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 text-white h-32 resize-none"
                    placeholder="Describe your video"
                  />
                </div>

                <div>
                  <label
                    htmlFor="videoCategory"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="videoCategory"
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Thumbnail Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Thumbnail
                  </label>
                  <div className="relative h-40">
                    <div className="h-full bg-neutral-800 rounded-lg flex items-center justify-center border-2 border-dashed border-neutral-700 hover:border-red-500 transition-colors cursor-pointer overflow-hidden">
                      {isLoadingThumbnail ? (
                        <ImSpinner2 className="animate-spin text-red-500 text-2xl" />
                      ) : (
                        <div className="text-center">
                          <FiImage
                            size={24}
                            className="mx-auto mb-2 text-neutral-500"
                          />
                          <p className="text-neutral-400">Upload Thumbnail</p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => handleImageChange(e, "thumbnailFile")}
                      />
                    </div>
                    {!isLoadingThumbnail && videoData.thumbnailFile && (
                      <p className="text-green-400 text-sm">
                        ✅ Thumbnail loaded! You can now upload the video.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <FiUpload size={18} />
                Upload Video
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Studio;
