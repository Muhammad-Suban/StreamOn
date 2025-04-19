import { FiUsers } from "react-icons/fi";
import { useState } from "react";

function Profile() {
  const [isReady, setIsReady] = useState(false); // set to true when API is done

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center text-gray-400">
        <img
          src="https://cdn-icons-png.flaticon.com/512/7486/7486121.png"
          alt="coming soon"
          className="w-24 h-24 mb-4 opacity-70"
        />
        <h2 className="text-xl font-semibold text-white">Work In Progress</h2>
        <p className="text-sm mt-2 text-gray-400">
          We’re building this section. Stay tuned! 🚧
        </p>
      </div>
    );
  }

  return (
    <div className="w-full pl-[5.5rem]">
      {/* Banner */}
      <div className="w-full h-48 bg-gradient-to-r from-red-600/20 via-purple-500/20 to-blue-500/20"></div>

      {/* Profile Info */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center -mt-20">
          {/* Profile Picture */}
          <div className="w-40 h-40 rounded-full border-4 border-black overflow-hidden">
            <img
              src="https://picsum.photos/seed/user/400/400"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="mt-4 text-center">
            <h1 className="text-2xl font-bold text-white">Yash Mittal</h1>
            <p className="text-gray-400">@YashMittal</p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <FiUsers className="text-gray-400" />
                <span className="text-gray-400">600k Subscribers</span>
              </div>
              <span className="text-gray-400 hidden sm:inline">•</span>
              <span className="text-gray-400">220 Subscribed</span>
            </div>
            <button className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700">
              Follow
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 border-b border-neutral-800 overflow-x-auto">
          <nav className="flex gap-8 min-w-max">
            <button className="px-4 py-2 text-white border-b-2 border-red-600">
              Videos
            </button>
            <button className="px-4 py-2 text-gray-400 hover:text-white">
              Playlist
            </button>
            <button className="px-4 py-2 text-gray-400 hover:text-white">
              Favorites
            </button>
            <button className="px-4 py-2 text-gray-400 hover:text-white">
              Following
            </button>
          </nav>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 py-8">
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="bg-neutral-900 rounded-lg overflow-hidden hover:bg-neutral-800 transition-colors"
              >
                <div className="relative">
                  <img
                    src={`https://picsum.photos/seed/${index + 10}/400/225`}
                    alt="Video thumbnail"
                    className="w-full aspect-video object-cover"
                  />
                  <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs rounded">
                    12:34
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-white line-clamp-2">
                    {index % 2 === 0
                      ? "How to learn React | A React Roadmap"
                      : "Let's learn React from scratch"}
                  </h3>
                  <p className="text-sm text-gray-400 mt-2">
                    24K views • 2 days ago
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
