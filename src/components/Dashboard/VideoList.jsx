import { useState } from 'react'
import { FiEdit2, FiMoreVertical, FiEye, FiThumbsUp, FiMessageCircle, FiTrash2 } from 'react-icons/fi'

function VideoList() {
  const [selectedVideo, setSelectedVideo] = useState(null)

  const videos = Array(6).fill(null).map((_, index) => ({
    id: index + 1,
    thumbnail: `https://picsum.photos/seed/${index + 100}/400/225`,
    title: index % 2 === 0 ? 'Complete React Tutorial for Beginners' : 'Advanced TypeScript Features You Should Know',
    status: index % 3 === 0 ? 'draft' : 'published',
    publishDate: '2023-12-20',
    views: '24.5K',
    likes: '1.2K',
    comments: '145',
    duration: '15:30'
  }))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Your Videos</h2>
        <div className="flex gap-4">
          <select className="bg-neutral-800 text-white px-4 py-2 rounded-lg border border-neutral-700 focus:outline-none focus:border-red-500">
            <option value="all">All Videos</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Upload New
          </button>
        </div>
      </div>

      {/* Videos Table */}
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="text-left p-4 text-gray-400 font-medium">Video</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium">Date</th>
                <th className="text-left p-4 text-gray-400 font-medium">Views</th>
                <th className="text-left p-4 text-gray-400 font-medium">Likes</th>
                <th className="text-left p-4 text-gray-400 font-medium">Comments</th>
                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video.id} className="border-b border-neutral-800 hover:bg-neutral-800/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-40 h-24 object-cover rounded"
                        />
                        <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs rounded">
                          {video.duration}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-white font-medium line-clamp-2">{video.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">ID: {video.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      video.status === 'published' 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {video.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">{video.publishDate}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <FiEye />
                      <span>{video.views}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <FiThumbsUp />
                      <span>{video.likes}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <FiMessageCircle />
                      <span>{video.comments}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-neutral-700">
                        <FiEdit2 size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-neutral-700">
                        <FiTrash2 size={18} />
                      </button>
                      <div className="relative">
                        <button 
                          className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-neutral-700"
                          onClick={() => setSelectedVideo(selectedVideo === video.id ? null : video.id)}
                        >
                          <FiMoreVertical size={18} />
                        </button>
                        {selectedVideo === video.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-neutral-800 rounded-lg shadow-lg border border-neutral-700 z-10">
                            <div className="py-1">
                              <button className="w-full px-4 py-2 text-left text-white hover:bg-neutral-700">
                                View Analytics
                              </button>
                              <button className="w-full px-4 py-2 text-left text-white hover:bg-neutral-700">
                                Download
                              </button>
                              <button className="w-full px-4 py-2 text-left text-red-500 hover:bg-neutral-700">
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <p className="text-gray-400">Showing 1-6 of 24 videos</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-gray-400 hover:text-white bg-neutral-800 rounded-lg">
            Previous
          </button>
          <button className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoList