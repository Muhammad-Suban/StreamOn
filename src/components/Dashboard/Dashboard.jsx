import { useState } from 'react'
import ChannelStats from './ChannelStats'
import VideoList from './VideoList'

function Dashboard() {
  const [activeTab, setActiveTab] = useState('stats')

  return (
    <div className="w-full pl-[5.5rem] py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'stats'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              Channel Stats
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'videos'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              Videos
            </button>
          </div>
        </div>

        {activeTab === 'stats' ? <ChannelStats /> : <VideoList />}
      </div>
    </div>
  )
}

export default Dashboard