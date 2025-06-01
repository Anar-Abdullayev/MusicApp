import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { uploadMusicFetch } from "../store/slices/music/musicFetchs";

export default function MusicUploadForm() {
  const [musicName, setMusicName] = useState("");
  const [musicPhoto, setMusicPhoto] = useState(null);
  const [musicFile, setMusicFile] = useState(null);
  const musicFileRef = useRef();
  const musicPhotoRef = useRef();
  const dispatch = useDispatch();
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("Name", musicName);
    formData.append("PhotoFile", musicPhoto);
    formData.append("MusicFile", musicFile);
    dispatch(uploadMusicFetch(formData));
    // setMusicFile(null);
    // setMusicPhoto(null);
    // setMusicName("");
    // musicFileRef.current.value = "";
    // musicPhotoRef.current.value = "";
    // Upload logic here
  };

  return (
    <div className="container mt-4">
      <div className="d-flex flex-wrap gap-4 align-items-end p-3 border rounded bg-light">
        <div className="d-flex flex-column">
          <label htmlFor="musicName" className="form-label">
            Music Name
          </label>
          <input
            type="text"
            id="musicName"
            className="form-control"
            placeholder="Enter music title"
            value={musicName}
            onChange={(e) => setMusicName(e.target.value)}
          />
        </div>

        <div className="d-flex flex-column">
          <label htmlFor="musicPhoto" className="form-label">
            Music Photo
          </label>
          <input
            ref={musicPhotoRef}
            type="file"
            id="musicPhoto"
            accept="image/*"
            className="form-control"
            onChange={(e) => setMusicPhoto(e.target.files[0])}
          />
        </div>

        <div className="d-flex flex-column">
          <label htmlFor="musicFile" className="form-label">
            Music File
          </label>
          <input
            ref={musicFileRef}
            type="file"
            id="musicFile"
            accept="audio/*"
            className="form-control"
            onChange={(e) => setMusicFile(e.target.files[0])}
          />
        </div>

        <div>
          <button className="btn btn-primary mt-2" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
