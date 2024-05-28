// src/components/Sidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';
import home from '../assets/home.png';
import favorite from '../assets/favorite.png';
import loop from '../assets/loop.png';
import spotifyLogo from '../assets/spotifyLogo.png';

function Sidebar() {
    const navigate = useNavigate();

    const handleLikedSongsClick = () => {
        navigate('/album/likedSongs'); // Navigate to the AlbumDetail with ID 'likedSongs'
    };

    return (
        <div className="sidebar">
            <img src={spotifyLogo} alt="Spotify Logo" />
            <div className="sidebar-item">
                <Link to="/">
                    <img src={home} alt="Home" />
                    <span>Home</span>
                </Link>
            </div>
            <div className="sidebar-item">
                <Link to="/search">
                    <img src={loop} alt="Search" />
                    <span>Search</span>
                </Link>
            </div>
            <div className="sidebar-item" onClick={handleLikedSongsClick}>
                <img src={favorite} alt="Liked Songs" />
                <span>Liked Songs</span>
            </div>
        </div>
    );
}

export { Sidebar };
