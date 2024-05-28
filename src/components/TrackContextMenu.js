// src/components/TrackContextMenu.js
import React, { forwardRef } from 'react';
import '../styles/TrackContextMenu.css';

const TrackContextMenu = forwardRef(({ track, position, onSaveToLikedSongs }, ref) => {
    if (!track) return null;

    // Calculate adjusted position to keep the menu within the viewport
    const menuWidth = 200; // Adjust according to your actual menu width
    const menuHeight = 200; // Adjust according to your actual menu height
    const padding = 10; // Add some padding from the edge

    let adjustedX = position.x;
    let adjustedY = position.y;

    if (position.x + menuWidth > window.innerWidth) {
        adjustedX = window.innerWidth - menuWidth - padding;
    }
    if (position.y + menuHeight > window.innerHeight) {
        adjustedY = window.innerHeight - menuHeight - padding;
    }
    if (position.x < 0) {
        adjustedX = padding;
    }
    if (position.y < 0) {
        adjustedY = padding;
    }

    const style = {
        top: adjustedY,
        left: adjustedX,
    };

    const handleMenuClick = (e) => {
        e.stopPropagation(); // Prevent closing the menu when clicking inside
    };

    return (
        <div className="context-menu" style={style} ref={ref} onClick={handleMenuClick}>
            <ul>
                <li>Ajouter à la playlist</li>
                <li onClick={() => onSaveToLikedSongs(track)}>Sauvegarder dans Titres likés</li>
                <li>Ajouter à la file d'attente</li>
            </ul>
        </div>
    );
});

export default TrackContextMenu;
