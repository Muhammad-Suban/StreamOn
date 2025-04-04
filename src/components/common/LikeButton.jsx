import { useState } from 'react'
import { FiHeart } from 'react-icons/fi'

function LikeButton({ entityId, entityType, initialLikes = 0, initialLiked = false }) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(initialLiked)

  const handleLike = async () => {
    try {
      // API call to toggle like
      setIsLiked(!isLiked)
      setLikes(isLiked ? likes - 1 : likes + 1)
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
        isLiked
          ? 'text-red-500 hover:text-red-600'
          : 'text-gray-400 hover:text-red-500'
      }`}
    >
      <FiHeart
        size={20}
        className={isLiked ? 'fill-current' : ''}
      />
      <span>{likes}</span>
    </button>
  )
}

export default LikeButton