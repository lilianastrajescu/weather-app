import React from "React";

export default function Days() {
  return (
    <div>
      <ul>
        <li>
          <img
            src="images/dew-point.png"
            className="img-fluid rounded-start icon"
          />
          Humidity: <span id="humidity"></span>
          <span> %</span>
        </li>
        <li>
          <img
            src="images/cloud.png"
            className="img-fluid rounded-start icon"
          />
          Clouds: <span id="cloud"></span>
        </li>
        <li>
          <img src="images/wind.png" className="img-fluid rounded-start icon" />
          Wind: <span id="wind"></span>
          <span> Km/h</span>
        </li>
      </ul>
    </div>
  );
}
