import React from 'react';
import { useState } from 'react';

import Player from './Player.jsx';
import PodItem from './PodItem.jsx';
import '../stylesheets/styles.css';

function Dashboard(props) {
  const { pods } = props;
  const [currentEp, setEp] = useState('');
  const [currMarkerDisplay, setMarkerDisplay] = useState({ content: 'Hello' });

  return (
    <div id='dashboard-container'>
      <div id='pod-display'>
        <h2> Podcast Episodes </h2>
        {pods &&
          pods.map((ele, idx) => (
            <PodItem podEp={ele} setEp={setEp} key={idx} />
          ))}
      </div>
      <div id='marker-content'>
        {currMarkerDisplay && currMarkerDisplay.type === 'ad' ? (
          <a href={currMarkerDisplay.link}>{currMarkerDisplay.content}</a>
        ) : currMarkerDisplay.type === 'text' ? (
          <div>{currMarkerDisplay.content}</div>
        ) : currMarkerDisplay.type === 'image' ? (
          <img src={'..' + currMarkerDisplay.content} />
        ) : (
          <img src={'../images/defaultImage.png'} />
        )}
      </div>

      {/* {pods &&
        pods.map((ele, idx) => <PodItem podEp={ele} setEp={setEp} key={idx} />)} */}
      <br />
      {currentEp && (
        <Player currentEp={currentEp} setMarkerDisplay={setMarkerDisplay} />
      )}
    </div>
  );
}

export default Dashboard;
