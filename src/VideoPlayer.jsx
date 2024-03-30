import React, { useRef, useEffect } from 'react';
import ReactHlsPlayer from 'react-hls-player';

const VideoPlayer = ({ src }) => {
  
  return (
    <div className="video-js" data-vjs-player>
 <ReactHlsPlayer
    src={src}
    autoPlay={false}
    controls={true}
    width="100%"
    height="auto"
  />
    </div>
  );
};

export default VideoPlayer;