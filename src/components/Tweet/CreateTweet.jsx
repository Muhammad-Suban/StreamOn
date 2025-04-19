import { useState } from 'react'
import { FiSend } from 'react-icons/fi'

function CreateTweet() {
  const [content, setContent] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // API call to create tweet
      console.log('Tweet content:', content)
      setContent('')
    } catch (error) {
      console.error('Error creating tweet:', error)
    }
  }
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
        <p className="text-sm mt-2 text-gray-400">We’re building this section. Stay tuned! 🚧</p>
      </div>
    );
  }


  return (
    <div className="max-w-2xl mx-auto p-4 bg-neutral-900 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
          className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 text-white h-24 resize-none"
          maxLength={280}
        />
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">{280 - content.length} characters remaining</span>
          <button
            type="submit"
            disabled={!content.trim()}
            className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSend size={18} />
            Tweet
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTweet