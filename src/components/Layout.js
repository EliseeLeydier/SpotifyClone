// src/components/Layout.js
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import MusicPlayer from './MusicPlayer';
import '../styles/Layout.css';

const Layout = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState({
        trackTitle: 'NASA', // Default track
        trackName: 'NASA',
        trackArtist: 'Artist Name',
    });

    const handleTrackChange = (trackTitle, trackName, trackArtist) => {
        setCurrentTrack({ trackTitle, trackName, trackArtist });
    };

    return (
        <div className="layout">
            <Sidebar />
            <div className="main-content">
                {/* Render children passed to Layout */}
                {React.cloneElement(children, { onTrackChange: handleTrackChange })}
            </div>
            <MusicPlayer
                trackTitle={currentTrack.trackTitle}
                trackName={currentTrack.trackName}
                trackArtist={currentTrack.trackArtist}
            />
        </div>
    );
};

export { Layout };
