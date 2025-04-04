import { useState } from 'react'
import { FiMusic, FiSave } from 'react-icons/fi'

function CreatePlaylist() {
  const [playlistData, setPlaylistData] = useState({
    title: '',
    description: '',
    isPublic: true
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // API call to create playlist
      console.log('Playlist Data:', playlistData)
    } catch (error) {
      console.error('Error creating playlist:', error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-neutral-900 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Create New Playlist</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
            Playlist Title
          </label>
          <input
            type="text"
            id="title"
            value={playlistData.title}
            onChange={(e) => setPlaylistData({ ...playlistData, title: e.target.value })}
            className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
            placeholder="Enter playlist title"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={playlistData.description}
            onChange={(e) => setPlaylistData({ ...playlistData, description: e.target.value })}
            className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 text-white h-32 resize-none"
            placeholder="Describe your playlist"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPublic"
            checked={playlistData.isPublic}
            onChange={(e) => setPlaylistData({ ...playlistData, isPublic: e.target.checked })}
            className="w-4 h-4 text-red-600 bg-neutral-800 border-neutral-700 rounded focus:ring-red-500"
          />
          <label htmlFor="isPublic" className="ml-2 text-sm text-gray-300">
            Make this playlist public
          </label>
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
        >
          <FiMusic size={18} />
          Create Playlist
        </button>
      </form>
    </div>
  )
}

export default CreatePlaylist