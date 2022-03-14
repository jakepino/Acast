import React, { useRef, useEffect, useState } from 'react';

function Player({ currentEp, setMarkerDisplay }) {
  const player1 = useRef();
  const scrollBar = useRef();
  const markers = currentEp.markers;

  const [tooglePlay, setPlayToogle] = useState(false);
  const [epCurrentTime, setEpCurrentTime] = useState(0);

  useEffect(() => {
    scrollBar.current.value = '0';
  }, [currentEp]);

  const withinMarkerCheck = (currentTime, markersArrCopy = markers) => {
    if (markersArrCopy.length < 1) return null;

    const midPoint = Math.floor(markersArrCopy.length / 2);
    const start = markersArrCopy[midPoint].start;
    const end = markersArrCopy[midPoint].duration + start;

    if (currentTime >= start) {
      if (currentTime < end) {
        return markersArrCopy[midPoint];
      } else {
        return withinMarkerCheck(
          currentTime,
          markersArrCopy.slice(midPoint + 1)
        );
      }
    } else {
      return withinMarkerCheck(currentTime, markersArrCopy.slice(0, midPoint));
    }
  };

  const setMaxScrollDuration = () => {
    scrollBar.current.max = player1.current.duration;
  };

  const handlePlayingSync = () => {
    scrollBar.current.value = player1.current.currentTime;
    setEpCurrentTime(Math.floor(player1.current.currentTime));
    const currentMarker = withinMarkerCheck(player1.current.currentTime);
    if (currentMarker) {
      setMarkerDisplay(currentMarker);
    }
  };

  const handlePlayPause = () => {
    setPlayToogle(!tooglePlay);
    tooglePlay === true ? player1.current.play() : player1.current.pause();
  };
  const handleSeekForward = () => {
    player1.current.currentTime += 5;
  };
  const handleSeekBack = () => {
    player1.current.currentTime -= 5;
  };
  const handleChange = () => {
    player1.current.currentTime = Number(scrollBar.current.value);
  };

  return (
    <div id='player-container'>
      <div>
        <p id='ep-name'>{currentEp.name}</p>
        <audio
          ref={player1}
          src={'..' + currentEp.audio}
          autoPlay='true'
          onLoadedMetadata={setMaxScrollDuration}
          onTimeUpdate={handlePlayingSync}
        ></audio>
        <input
          type='range'
          ref={scrollBar}
          onChange={handleChange}
          defaultValue='0'
        ></input>
        <br />
        <p id='ep-time'>
          {epCurrentTime
            ? epCurrentTime + 's/' + Math.round(player1.current.duration) + 's'
            : 0 + 's'}
        </p>
        <button onClick={handleSeekBack}>Back</button>
        <button onClick={handlePlayPause}>
          {tooglePlay === true ? 'Play' : 'Pause'}
        </button>
        <button onClick={handleSeekForward}>Forward</button>
      </div>
    </div>
  );
}

export default Player;
