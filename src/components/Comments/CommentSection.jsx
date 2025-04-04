import { useState } from 'react'
import { FiMessageSquare, FiTrash2, FiEdit2 } from 'react-icons/fi'

function CommentSection({ entityId, entityType }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [editingComment, setEditingComment] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // API call to create comment
      console.log('New comment:', newComment)
      setNewComment('')
    } catch (error) {
      console.error('Error creating comment:', error)
    }
  }

  const handleEdit = async (commentId, content) => {
    try {
      // API call to update comment
      console.log('Editing comment:', commentId, content)
      setEditingComment(null)
    } catch (error) {
      console.error('Error updating comment:', error)
    }
  }

  const handleDelete = async (commentId) => {
    try {
      // API call to delete comment
      console.log('Deleting comment:', commentId)
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 text-white h-24 resize-none"
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiMessageSquare size={18} />
          Comment
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-neutral-800 p-4 rounded-lg">
            {editingComment === comment.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleEdit(comment.id, e.target.content.value)
                }}
                className="space-y-2"
              >
                <textarea
                  name="content"
                  defaultValue={comment.content}
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:border-red-500 text-white resize-none"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingComment(null)}
                    className="px-4 py-1 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white">{comment.content}</p>
                    <p className="text-sm text-gray-400 mt-1">{comment.author} • {comment.timestamp}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingComment(comment.id)}
                      className="p-1 text-gray-400 hover:text-white rounded"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="p-1 text-gray-400 hover:text-red-500 rounded"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentSection