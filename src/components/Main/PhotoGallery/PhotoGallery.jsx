import scss from "./photoGallery.module.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCities } from "../../context/CitiesProvider";
import { toast, Bounce } from "react-toastify";
import { X } from "lucide-react";

export default function PhotoGallery() {
  const { selectedCity, cities } = useCities();

  const API_KEY = import.meta.env.VITE_PHOTOS_KEY;
  const BASE_URL = import.meta.env.VITE_PHOTOS_BASE_URL;

  const [photos, setPhotos] = useState([]);
  const [modalPhotos, setModalPhotos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (!selectedCity) return;

    const fetchInitialPhotos = async () => {
      setModalPhotos([]);
      setPage(1);

      try {
        const response = await axios.get(
          `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(selectedCity)}+nature&image_type=photo&orientation=horizontal&per_page=4`,
        );
        setPhotos(response.data.hits);
      } catch (err) {
        toast.error(`Error loading gallery preview: ${err.message}`, {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
      }
    };

    fetchInitialPhotos();
  }, [selectedCity, API_KEY, BASE_URL]);

  useEffect(() => {
    if (isModalOpen || fullscreenImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen, fullscreenImage]);

  const fetchModalPhotos = async (pageNum) => {
    try {
      const response = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(selectedCity)}+nature&image_type=photo&per_page=12&page=${pageNum}`,
      );
      setModalPhotos((prev) => [...prev, ...response.data.hits]);
    } catch (err) {
      toast.error(`Error loading more photos: ${err.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);

    if (modalPhotos.length === 0) {
      fetchModalPhotos(1);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchModalPhotos(nextPage);
  };

  const openFullscreen = (src, alt) => {
    setIsImageLoaded(false);
    setFullscreenImage({ src, alt });
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  // if (!selectedCity) return;
  if (!cities.length) return;

  return (
    <div className={scss.photoGallery} id="PhotoGallery">
      <div className={scss.content}>
        <h2 className={scss.title} data-aos="fade-up">
          Photo Gallery
        </h2>

        <div className={scss.galleryGrid}>
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className={`${scss.photoItem} ${index === 0 ? scss.large : ""} ${index === 3 ? scss.wide : ""}`}
              onClick={() => openFullscreen(photo.largeImageURL, photo.tags)}
              data-aos="zoom-in"
            >
              <img src={photo.largeImageURL} alt={photo.tags} loading="lazy" />
            </div>
          ))}
        </div>

        <button className={scss.showMore} onClick={handleOpenModal}>
          Explore Gallery
        </button>
      </div>

      {isModalOpen && (
        <div className={scss.overlay} onClick={() => setIsModalOpen(false)}>
          <div
            className={scss.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={scss.modalHeader}>
              <h3>Gallery: {selectedCity}</h3>
              <button
                className={scss.closeBtn}
                onClick={() => setIsModalOpen(false)}
              >
                <X />
              </button>
            </div>

            <div className={scss.modalGrid}>
              {modalPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className={scss.modalPhotoCard}
                  onClick={() =>
                    openFullscreen(photo.largeImageURL, photo.tags)
                  }
                >
                  <img src={photo.webformatURL} alt={photo.tags} />
                  <div className={scss.photoInfo}>by {photo.user}</div>
                </div>
              ))}
            </div>

            <button className={scss.loadMoreBtn} onClick={handleLoadMore}>
              Load more
            </button>
          </div>
        </div>
      )}

      {fullscreenImage && (
        <div className={scss.fullscreenOverlay} onClick={closeFullscreen}>
          <div
            className={scss.fullscreenContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={fullscreenImage.src}
              alt={fullscreenImage.alt}
              className={`${scss.fullscreenImg} ${isImageLoaded ? scss.loaded : ""}`}
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
