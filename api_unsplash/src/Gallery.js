import React, { useState, useEffect } from "react";

const ACCESS_KEY = "TA_CLE_UNSPLASH_ICI"; // Remplace avec ta clé API

const categories = ["nature", "animals", "travel", "technology", "food", "people"];

function Gallery() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("nature");
  const [error, setError] = useState(null);

  const fetchImages = async (searchQuery) => {
    try {
      const url = `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${ACCESS_KEY}&per_page=12`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.results) {
        setImages(data.results);
        setError(null);
      } else {
        setImages([]);
        setError("Aucune image trouvée.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setError("Une erreur est survenue.");
    }
  };

  useEffect(() => {
    fetchImages(query);
  }, []);

  const handleCategoryClick = (cat) => {
    setQuery(cat);
    fetchImages(cat);
  };

  return (
    <div className="gallery-container">
      <h1>📷 Galerie Unsplash</h1>

      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={query === cat ? "active" : ""}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="image-grid">
        {Array.isArray(images) &&
          images.map((img) => (
            <div key={img.id} className="image-card">
              <img src={img.urls.small} alt={img.alt_description || "Image"} />
              <p>{img.user.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Gallery;
