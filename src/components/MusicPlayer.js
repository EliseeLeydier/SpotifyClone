// src/components/MusicPlayer.js
import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';
import "../styles/MusicPlayer.css";

const MusicPlayer = ({ trackTitle, trackName, trackArtist }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        // alert("trackTitle : " + trackTitle + "\n trackName : " + trackName + "\n trackArtist : " + trackArtist);
        const audio = audioRef.current;

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        if (trackTitle) {
            import(`../assets/music/${trackTitle}.mp3`).then(src => {
                audio.src = src.default;
                audio.load();
                audio.addEventListener('loadedmetadata', handleLoadedMetadata);
                audio.addEventListener('timeupdate', handleTimeUpdate);
                audio.play();
                setIsPlaying(true);
            }).catch(err => {
                console.error(`Audio source for ${trackTitle} not found.`, err);
            });
        }

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [trackTitle]);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeChange = (e) => {
        const audio = audioRef.current;
        audio.currentTime = e.target.value;
        setCurrentTime(audio.currentTime);
    };

    const restartTrack = () => {
        const audio = audioRef.current;
        audio.currentTime = 0;
        setCurrentTime(0);
        if (!isPlaying) {
            setIsPlaying(true);
            audio.play();
        }
    };

    const passTrack = () => {
        const audio = audioRef.current;
        audio.currentTime = duration;
        setCurrentTime(duration);
        if (!isPlaying) {
            setIsPlaying(true);
            audio.play();
        }
    };

    return (
        <div className="music-player">
            <audio ref={audioRef}></audio>
            <div className="left-section">
                <img src={require('../assets/guts_album_cover.png')} alt="Album Cover" className="album-cover2" />
                <div className="song-info">
                    <span className="song-title">{trackName}</span>
                    <span className="song-artist">{trackArtist}</span>
                </div>
            </div>
            <div className="center-section">
                <div className="controls">
                    <FaStepBackward onClick={restartTrack} className="control-button" />
                    <button onClick={togglePlayPause} className="play-pause-btn">
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <FaStepForward onClick={passTrack} className="control-button" />
                </div>
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ '--progress': `${(currentTime / duration) * 100}%` }}>
                        <span>{formatTime(currentTime)}</span>
                        <input
                            type="range"
                            min="0"
                            max={duration}
                            value={currentTime}
                            onChange={handleTimeChange}
                        />
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
            </div>
            <div className="right-section">
                {/* Add any additional buttons or info here */}
            </div>
        </div>
    );
};

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};

export default MusicPlayer; // Ensure default export
