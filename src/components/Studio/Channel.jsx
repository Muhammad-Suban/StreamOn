import { FiUpload, FiImage, FiSave } from "react-icons/fi";
import { useState } from "react";

function Channel() {
  const [channelData, setChannelData] = useState({
    userName: "",
    description: "",
    coverImage: null,
    avator: null,
    description:null,
    
  });

  const handleChannelSubmit = (e) => {
    e.preventDefault();
    // Handle channel creation logic here
    console.log("Channel Data:", channelData);
  };

  return (
    <>
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">
          Create Your Channel
        </h2>
        <form onSubmit={handleChannelSubmit} className="space-y-6">
          <div className="bg-neutral-900 p-6 rounded-lg space-y-6">
            {/* Channel Banner Upload */}
            <div className="relative">
              <div className="h-48 bg-neutral-800 rounded-lg flex items-center justify-center border-2 border-dashed border-neutral-700 hover:border-red-500 transition-colors cursor-pointer">
                <div className="text-center">
                  <FiImage
                    size={36}
                    className="mx-auto mb-2 text-neutral-500"
                  />
                  <p className="text-neutral-400">Upload Channel Banner</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) =>
                    setChannelData({
                      ...channelData,
                      banner: e.target.files[0],
                    })
                  }
                />
              </div>
            </div>

            {/* Channel Avatar Upload */}
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className="w-32 h-32 bg-neutral-800 rounded-full flex items-center justify-center border-2 border-dashed border-neutral-700 hover:border-red-500 transition-colors cursor-pointer">
                  <div className="text-center">
                    <FiImage
                      size={24}
                      className="mx-auto mb-1 text-neutral-500"
                    />
                    <p className="text-xs text-neutral-400">Avatar</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) =>
                      setChannelData({
                        ...channelData,
                        avatar: e.target.files[0],
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <label
                    htmlFor="channelName"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Channel Name
                  </label>
                  <input
                    type="text"
                    id="channelName"
                    value={channelData.name}
                    onChange={(e) =>
                      setChannelData({ ...channelData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                    placeholder="Enter channel name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="channelDescription"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Channel Description
                  </label>
                  <textarea
                    id="channelDescription"
                    value={channelData.description}
                    onChange={(e) =>
                      setChannelData({
                        ...channelData,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 text-white h-24 resize-none"
                    placeholder="Describe your channel"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <FiSave size={18} />
              Create Channel
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Channel;
