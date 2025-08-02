import React, { useState, useRef, useEffect } from "react";
<<<<<<< HEAD
  import API_BASE_URL from "../apiURL";
=======
>>>>>>> bb137af (Refactor AddVideo component for improved login handling and UI updates)

function AddVideo() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoFile: null,
    thumbnail: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ← for localStorage check

  const videoFileRef = useRef();
  const thumbnailRef = useRef();

  // Check localStorage for login status
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");
  }, []);

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
    setError(null);
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/videos/addvideo`, {
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
        videoFileRef.current.value = "";
        thumbnailRef.current.value = "";
      } else {
        const errData = await res.json();
        setError(errData.message || "Failed to upload video");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("An error occurred while uploading the video.");
    } finally {
      setLoading(false);
    }
  };

  // 🔐 If not logged in
  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
        <p>Please log in to upload a video.</p>
      </div>
    );
  }

  // ✅ If logged in, show the form
  return (
    <div className="p-4 min-h-screen bg-gray-950 text-white">
      <h2 className="text-2xl font-bold mb-4">Add Video</h2>

      {error && (
        <div className="mb-4 p-2 bg-red-700 rounded text-sm">{error}</div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white"
            rows="4"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">Add Video</label>
          <input
            type="file"
            name="videoFile"
            ref={videoFileRef}
            onChange={handleChange}
            accept="video/*"
            required
            className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Add Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            ref={thumbnailRef}
            onChange={handleChange}
            accept="image/*"
            required
            className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white"
          />
          {formData.thumbnail && (
            <img
              src={URL.createObjectURL(formData.thumbnail)}
              alt="Thumbnail Preview"
              className="w-32 h-20 object-cover mt-2 rounded"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

export default AddVideo;
