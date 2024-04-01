import React from "react";
import ReactPlayer from "react-player/lazy";

const VideoDetail = ({ video }) => {
  if (!video) {
    return <div> Loading! </div>;
  }
  console.log(video);

  const videoSrc = `https://www.youtube.com/watch?v=${video.id.videoId}`;

  return (
    <div className="w-full h-full">
      <div className="flex-1 border-b-2 mb-3 p-3">
        <ReactPlayer url={videoSrc} width={"100%"} />
      </div>
      <div>
        <h2 className="text"> {video.snippet.title} </h2>
        <p> {video.snippet.description} </p>
      </div>
    </div>
  );
};

export default VideoDetail;
