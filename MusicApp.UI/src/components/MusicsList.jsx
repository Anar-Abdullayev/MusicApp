import { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteMusicFetch, getMusicsFetch } from "../store/slices/music/musicFetchs";
import { addFavouriteFetch, getFavouritesFetch, removeFavouriteFetch } from "../store/slices/favourite/favouritesFetchs";

export default function MusicList() {
  const dispatch = useDispatch();
  const musicList = useSelector((state) => state.music.musics);
  const favoriteMusicIds = useSelector((state) => state.favourite.favourites);
  console.log(favoriteMusicIds)
  const isFavorite = (id) => favoriteMusicIds.includes(id);
  const audioRefs = useRef({});
  const [playingId, setPlayingId] = useState(null);
  const [pausedIds, setPausedIds] = useState({});
  const baseFileShareURL = import.meta.env.VITE_FILESHARE_API_URL;

  useEffect(() => {
    dispatch(getMusicsFetch());
    dispatch(getFavouritesFetch());
  }, []);

  const playMusic = (id) => {
    stopAll();
    const audio = audioRefs.current[id];
    if (audio) {
      audio.play();
      setPlayingId(id);
      setPausedIds((prev) => ({ ...prev, [id]: false }));
    }
  };

  const pauseMusic = (id) => {
    const audio = audioRefs.current[id];
    if (audio) {
      audio.pause();
      setPausedIds((prev) => ({ ...prev, [id]: true }));
    }
  };

  const resumeMusic = (id) => {
    const audio = audioRefs.current[id];
    if (audio) {
      audio.play();
      setPausedIds((prev) => ({ ...prev, [id]: false }));
      setPlayingId(id);
    }
  };

  const stopAll = () => {
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    setPlayingId(null);
    setPausedIds({});
  };

  const stopMusic = (id) => {
    const audio = audioRefs.current[id];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setPlayingId(null);
      setPausedIds((prev) => ({ ...prev, [id]: false }));
    }
  };

  const stepForward = (id) => {
    const audio = audioRefs.current[id];
    if (audio && audio.readyState >= 1) {
      audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
    }
  };

  const stepBackward = (id) => {
    const audio = audioRefs.current[id];
    if (audio && audio.readyState >= 1) {
      audio.currentTime = Math.max(audio.currentTime - 10, 0);
    }
  };

  const deleteMusic = (id) => {
    stopMusic(id);
    dispatch(deleteMusicFetch(id));
  };

  const isPaused = (id) => pausedIds[id];
  const isPlaying = (id) => playingId === id && !isPaused(id);


  const toggleFavorite = (id) => {
    const isFav = isFavorite(id);

    if (isFav){
      dispatch(removeFavouriteFetch(id))
    }
    else{
      dispatch(addFavouriteFetch(id));
    }
  }

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {musicList.map((music) => (
          <div className="col-md-4" key={music.id}>
            <div className="card shadow-sm h-100">
              <div style={{ position: "relative" }}>
                <img
                  src={`${baseFileShareURL}${music.photoPath}`}
                  alt={music.name}
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <button
                  onClick={() => toggleFavorite(music.id)}
                  className="btn btn-light btn-sm"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    borderRadius: "50%",
                    padding: "6px 8px",
                    backgroundColor: "white",
                    border: "none",
                  }}
                >
                  {isFavorite(music.id) ? "❤️" : "🤍"}
                </button>
              </div>
              <div className="card-body">
                <h5 className="card-title">{music.name}</h5>

                <div className="d-flex flex-wrap justify-content-between mb-2 gap-2">
                  {isPlaying(music.id) ? (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => stopMusic(music.id)}
                    >
                      ⏹ Stop
                    </button>
                  ) : isPaused(music.id) ? (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => resumeMusic(music.id)}
                    >
                      ▶️ Resume
                    </button>
                  ) : (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => playMusic(music.id)}
                    >
                      ▶️ Play
                    </button>
                  )}

                  {isPlaying(music.id) && (
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => pauseMusic(music.id)}
                    >
                      ⏸ Pause
                    </button>
                  )}

                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => stepBackward(music.id)}
                  >
                    ⏪ -10s
                  </button>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => stepForward(music.id)}
                  >
                    +10s ⏩
                  </button>
                </div>

                <button
                  className="btn btn-danger w-100 btn-sm"
                  onClick={() => deleteMusic(music.id)}
                >
                  🗑️ Delete
                </button>

                <audio
                  ref={(el) => (audioRefs.current[music.id] = el)}
                  src={`${baseFileShareURL}${music.musicPath}`}
                  preload="auto"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
