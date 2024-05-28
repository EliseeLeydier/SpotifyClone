// src/components/AlbumDetail.js
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "../styles/AlbumDetail.css";
import albumData from "../assets/info/albumData.json";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import TrackContextMenu from "./TrackContextMenu";

const AlbumDetail = ({ onTrackChange }) => {
    const { albumId } = useParams();
    const album = albumData.albums.find(a => a.id === albumId);
    const [contextMenu, setContextMenu] = useState(null);
    const [likedSongs, setLikedSongs] = useState(albumData.albums.find(a => a.id === 'likedSongs'));
    const contextMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
                setContextMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [contextMenuRef]);

    if (!album) {
        return <div>Album not found</div>;
    }

    const { name, artist, releaseDate, duration, tracks, cover } = album;
    const albumCover = require(`../assets/${cover}`);

    const handlePlayTrack = (trackTitle, trackName, trackArtist) => {
        onTrackChange(trackTitle, trackName, trackArtist);
    };

    const handleContextMenu = (event, track) => {
        event.preventDefault();
        setContextMenu({
            track,
            position: { x: event.pageX, y: event.pageY },
        });
    };

    const handleSaveToLikedSongs = (track) => {
        // Prevent duplicate tracks
        if (!likedSongs.tracks.find(t => t.title === track.title)) {
            const updatedLikedSongs = {
                ...likedSongs,
                tracks: [...likedSongs.tracks, { number: likedSongs.tracks.length + 1, title: track.title, artist: album.artist, duration: track.duration }],
            };
            setLikedSongs(updatedLikedSongs);
            // Update the albumData object as well
            const likedSongsIndex = albumData.albums.findIndex(a => a.id === 'likedSongs');
            if (likedSongsIndex !== -1) {
                albumData.albums[likedSongsIndex] = updatedLikedSongs;
            }
            console.log("Updated Liked Songs:", updatedLikedSongs);
        }
        setContextMenu(null);
    };

    return (
        <div className="album-detail">
            <div className="album-header">
                <img src={albumCover} alt="Album Cover" className="album-cover" />
                <div className="album-info">
                    <h2>Album</h2>
                    <h1>{name}</h1>
                    <p>
                        {artist} &bull; {releaseDate} &bull; 12 titres, {duration}
                    </p>
                </div>
            </div>
            <div className="album-controls">
                <button className="play-button">
                    <FaPlay className="play-icon" color="black" />
                </button>
                <button className="add-button">
                    <AiOutlinePlusCircle />
                </button>
            </div>
            <div className="tracklist">
                <div className="tracklist-header">
                    <span>#</span>
                    <span>Titre</span>
                    <img src={require("../assets/clock_icon.png")} alt="Duration" className="clock-icon" />
                </div>
                {tracks.map((track, index) => (
                    <div className="track" key={index}>
                        <span className="track-number">{track.number}</span>
                        <button className="track-play-button" onClick={() => handlePlayTrack(track.title, track.title, artist)}>
                            <FaPlay className="play-icon" color="white" />
                        </button>
                        <span className="track-title">{track.title}
                            <span className="track-artist">{artist}</span>
                        </span>
                        <div className="track-icons">
                            <span className="add-icon" onClick={(e) => handleContextMenu(e, track)}>
                                <AiOutlinePlusCircle />
                            </span>
                            <span className="track-duration">{track.duration}</span>
                            <span className="more-icon" onClick={(e) => handleContextMenu(e, track)}>...</span>
                        </div>
                    </div>
                ))}
            </div>
            {contextMenu && (
                <TrackContextMenu
                    ref={contextMenuRef}
                    track={contextMenu.track}
                    position={contextMenu.position}
                    onSaveToLikedSongs={handleSaveToLikedSongs}
                />
            )}
        </div>
    );
};

export default AlbumDetail;
