import React from 'react';
import '../styles/Albums.css';
import { useNavigate } from 'react-router-dom';
import albumData from "../assets/info/albumData.json";


function Albums() {
    const navigate = useNavigate();

    const navigateToAlbum = (albumId) => {
        navigate(`/album/${albumId}`);
    };

    return (
        <div className="Albums">
            {albumData.albums.map((album) => (
                <div key={album.id} onClick={() => navigateToAlbum(album.id)} className="album">
                    <img src={require(`../assets/${album.cover}`)} alt={album.name} />
                    <h2>{album.name}</h2>
                    <h3>{album.releaseDate} . {album.artist}</h3>
                </div>
            ))}
        </div>
    );
}

export { Albums };
