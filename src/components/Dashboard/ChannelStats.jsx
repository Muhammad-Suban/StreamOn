import { FiEye, FiThumbsUp, FiUsers, FiVideo } from 'react-icons/fi'

function ChannelStats() {
  const stats = [
    { icon: <FiEye size={24} />, label: 'Total Views', value: '1.2M', change: '+12.5%' },
    { icon: <FiUsers size={24} />, label: 'Subscribers', value: '45.2K', change: '+8.2%' },
    { icon: <FiThumbsUp size={24} />, label: 'Total Likes', value: '98.4K', change: '+15.7%' },
    { icon: <FiVideo size={24} />, label: 'Videos', value: '128', change: '+4' }
  ]

  const recentActivities = [
    { type: 'subscriber', user: 'John Doe', time: '2 minutes ago' },
    { type: 'like', user: 'Sarah Smith', video: 'React Tutorial', time: '5 minutes ago' },
    { type: 'comment', user: 'Mike Johnson', video: 'Node.js Basics', time: '10 minutes ago' },
    { type: 'view', count: '1,000', video: 'Web Development Tips', time: '1 hour ago' }
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Channel Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
            <div className="flex items-start justify-between">
              <div className="text-gray-400">{stat.icon}</div>
              <span className="text-sm text-green-500">{stat.change}</span>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
              <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-neutral-800 last:border-0">
              <div className="flex items-center gap-3">
                {activity.type === 'subscriber' && <FiUsers className="text-blue-500" />}
                {activity.type === 'like' && <FiThumbsUp className="text-red-500" />}
                {activity.type === 'comment' && <FiVideo className="text-green-500" />}
                {activity.type === 'view' && <FiEye className="text-purple-500" />}
                <div>
                  <p className="text-white">
                    {activity.type === 'subscriber' && `${activity.user} subscribed to your channel`}
                    {activity.type === 'like' && `${activity.user} liked "${activity.video}"`}
                    {activity.type === 'comment' && `${activity.user} commented on "${activity.video}"`}
                    {activity.type === 'view' && `"${activity.video}" reached ${activity.count} views`}
                  </p>
                  <p className="text-sm text-gray-400">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Graph (Placeholder) */}
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Channel Performance</h3>
        <div className="h-64 flex items-center justify-center border border-neutral-800 rounded-lg">
          <p className="text-gray-400">Performance graph will be implemented here</p>
        </div>
      </div>
    </div>
  )
}

export default ChannelStats