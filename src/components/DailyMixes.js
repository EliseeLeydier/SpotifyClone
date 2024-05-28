import React from 'react';
import '../styles/DailyMixes.css';
import releaseRadarImg from "../assets/release_radar.jpg";
import dailyMix1Img from "../assets/daily_mix_1.jpg";
import dailyMix3Img from "../assets/daily_mix_3.jpg";
import dailyMix4Img from "../assets/daily_mix_4.jpg";
import dailyMix6Img from "../assets/daily_mix_6.jpg";
import arianaGrande from "../assets/this_is_ariana_grande.jpg";
import oliviaRodrigo from "../assets/guts_album_cover.png";

function DailyMixes() {
    return (
        <div className="DailyMixs">
            <div className="dailyMixes-item">
                <img src={releaseRadarImg} alt="Release Radar" />
                <h2>Release Radar</h2>
                <div className="play-button"></div>
            </div>
            <div className="dailyMixes-item">
                <img src={dailyMix1Img} alt="Daily Mix 1" />
                <h2>Daily Mix 1</h2>
                <div className="play-button"></div>
            </div>
            <div className="dailyMixes-item">
                <img src={dailyMix3Img} alt="Daily Mix 3" />
                <h2>Daily Mix 3</h2>
                <div className="play-button"></div>
            </div>
            <div className="dailyMixes-item">
                <img src={dailyMix4Img} alt="Daily Mix 4" />
                <h2>Daily Mix 4</h2>
                <div className="play-button"></div>
            </div>
            <div className="dailyMixes-item">
                <img src={dailyMix6Img} alt="Daily Mix 6" />
                <h2>Daily Mix 6</h2>
                <div className="play-button"></div>
            </div>
        </div>
    );
}

export { DailyMixes };
