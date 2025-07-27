import React, { useEffect, useState, useRef } from 'react';

function Getallvideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/videos/my-videos', {
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch videos');
        const result = await response.json();
        setVideos(result.videos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-4">My Videos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

function VideoCard({ video }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);

  // Pause video on mouse leave
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-64">
        {/* Thumbnail */}
        {!hovered && (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover absolute top-0 left-0"
          />
        )}

        {/* Full-featured video */}
        {hovered && (
          <video
            ref={videoRef}
            src={video.videoFile}
            className="w-full h-full object-cover absolute top-0 left-0"
            controls
            autoPlay
            muted={false} // You can make this true if you want it silent by default
          />
        )}
      </div>

      <div className="p-4">
        <h3 className="text-white text-lg font-semibold truncate">{video.title}</h3>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{video.description}</p>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{video.duration?.toFixed(1)}s</span>
          <span>{new Date(video.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default Getallvideos;
