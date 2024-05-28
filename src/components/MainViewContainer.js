// src/components/MainViewContainer.js
import React from "react";
import "../styles/MainViewContainer.css";
import { DailyMixes } from "./DailyMixes";
import { Albums } from "./Albums";

function MainViewContainer() {
    return (
        <div className="main-view-container">
            <h1>Daily mixes</h1>
            <DailyMixes />
            <h1>Albums</h1>
            <Albums />
        </div>
    );
}

export { MainViewContainer };
