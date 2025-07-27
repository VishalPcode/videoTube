import React, { useState, useRef } from "react";

function AddVideo() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoFile: null,
    thumbnail: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Add refs for file inputs
  const videoFileRef = useRef();
  const thumbnailRef = useRef();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const res = await fetch("http://localhost:8000/api/v1/videos/addvideo", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      if (res.ok) {
        alert("Video uploaded successfully!");
        setFormData({
          title: "",
          description: "",
          videoFile: null,
          thumbnail: null,
        });
        // ✅ Clear file input fields
        videoFileRef.current.value = "";
        thumbnailRef.current.value = "";
      } else {
        setError("Failed to fetch user. Not logged in?");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("An error occurred while uploading the video.");
    }
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
  //       Loading...
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Add Video</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-white">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2  text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white"
            rows="4"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-white">
            Add Video
          </label>
          <input
            type="file"
            name="videoFile"
            ref={videoFileRef}
            onChange={handleChange}
            accept="video/*"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">
            Add Thumbnail
          </label>
          <input
            type="file"
            name="thumbnail"
            ref={thumbnailRef}
            onChange={handleChange}
            accept="image/*"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default AddVideo;
