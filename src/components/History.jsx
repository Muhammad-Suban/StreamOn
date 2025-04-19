import { FiTrash2 } from 'react-icons/fi'

function History() {
  const watchedVideos = Array(10).fill(null).map((_, index) => ({
    id: index,
    title: index % 2 === 0 
      ? "Complete React Tutorial for Beginners" 
      : "Advanced TypeScript Features You Should Know",
    channel: "Tech Academy",
    views: "120K views",
    watchedAt: `${index + 1} ${index === 0 ? 'hour' : 'days'} ago`,
    duration: "15:30",
    thumbnail: `https://picsum.photos/seed/${index + 100}/400/225`
  }))

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
    <div className="w-full pl-[5.5rem] py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Watch History</h1>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-neutral-900">
            <FiTrash2 size={18} />
            <span>Clear History</span>
          </button>
        </div>

        <div className="space-y-4">
          {watchedVideos.map((video) => (
            <div 
              key={video.id} 
              className="flex flex-col sm:flex-row gap-4 bg-neutral-900 rounded-lg overflow-hidden hover:bg-neutral-800 transition-colors"
            >
              <div className="relative sm:w-64 h-48 sm:h-36">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs rounded">
                  {video.duration}
                </span>
              </div>
              <div className="flex-1 p-4">
                <h3 className="font-medium text-white text-lg mb-2 line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-400 mb-1 hover:text-red-500">
                  {video.channel}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>{video.views}</span>
                  <span>•</span>
                  <span>Watched {video.watchedAt}</span>
                </div>
              </div>
              <button 
                className="sm:self-start p-4 text-gray-400 hover:text-red-500"
                aria-label="Remove from history"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default History