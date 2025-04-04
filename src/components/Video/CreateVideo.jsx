import { useState } from 'react'
import { FiUpload, FiImage, FiSave } from 'react-icons/fi'

function CreateVideo() {
  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    video: null,
    thumbnail: null,
    category: 'gaming'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle video creation logic here
    try {
      // API call to create video
      console.log('Video Data:', videoData)
    } catch (error) {
      console.error('Error creating video:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-neutral-900 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Upload New Video</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Video Upload */}
        <div className="relative">
          <div className="h-64 bg-neutral-800 rounded-lg flex items-center justify-center border-2 border-dashed border-neutral-700 hover:border-red-500 transition-colors cursor-pointer">
            <div className="text-center">
              <FiUpload size={36} className="mx-auto mb-2 text-neutral-500" />
              <p className="text-neutral-400">Drag and drop your video or click to browse</p>
              <p className="text-sm text-neutral-500 mt-1">MP4, WebM or Ogg</p>
            </div>
            <input
              type="file"
              accept="video/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => setVideoData({ ...videoData, video: e.target.files[0] })}
            />
          </div>
        </div>

        {/* Video Details */}
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={videoData.title}
              onChange={(e) => setVideoData({ ...videoData, title: e.target.value })}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
              placeholder="Enter video title"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={videoData.description}
              onChange={(e) => setVideoData({ ...videoData, description: e.target.value })}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 text-white h-32 resize-none"
              placeholder="Describe your video"
            />
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Thumbnail
            </label>
            <div className="relative h-40">
              <div className="h-full bg-neutral-800 rounded-lg flex items-center justify-center border-2 border-dashed border-neutral-700 hover:border-red-500 transition-colors cursor-pointer">
                <div className="text-center">
                  <FiImage size={24} className="mx-auto mb-2 text-neutral-500" />
                  <p className="text-neutral-400">Upload Thumbnail</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => setVideoData({ ...videoData, thumbnail: e.target.files[0] })}
                />
              </div>
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
      </form>
    </div>
  )
}

export default CreateVideo