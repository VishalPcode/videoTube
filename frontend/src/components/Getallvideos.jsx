import React, { useEffect, useState, useRef } from "react";

function Getallvideos() {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/videos/my-videos`, {
          credentials: "include", // for cookie-based auth
        });
        if (!response.ok) throw new Error("Failed to fetch videos");
        const result = await response.json();
        setVideos(result.videos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideos();
  }, []);

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 overflow-y-auto bg-gray-950 h-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white mb-4">My Videos</h2>
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          className="mb-4 p-2 rounded bg-gray-800 text-white"
          placeholder="Search videos..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

function VideoCard({ video }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-64">
        {/* Show thumbnail only when not hovered */}
        {!hovered && (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover absolute top-0 left-0"
          />
        )}

        {/* Show video when hovered */}
        <video
          ref={videoRef}
          src={video.videoFile}
          className={`w-full h-full object-cover absolute top-0 left-0 ${
            hovered ? "block" : "hidden"
          }`}
          muted
          controls
        />
      </div>

      <div className="p-4">
        <h3 className="text-white text-lg font-semibold truncate">
          {video.title}
        </h3>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">
          {video.description}
        </p>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{video.duration?.toFixed(1)}s</span>
          <span>{new Date(video.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default Getallvideos;
