import { Spinner } from "@material-tailwind/react";
import React from "react";
import ReactPlayer from "react-player/lazy";

const VideoDetail = ({ video }) => {
  return (
    <div className="w-full h-full">
      <div className="flex-1 border-b-2 mb-3 p-3">
        {video ? (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${video.id.videoId}`}
            width={"100%"}
          />
        ) : (
          <div>
            <Spinner />
          </div>
        )}
      </div>
      <div>
        <h2 className="text"> {video.snippet.title} </h2>
        <p> {video.snippet.description} </p>
      </div>
    </div>
  );
};

export default VideoDetail;
