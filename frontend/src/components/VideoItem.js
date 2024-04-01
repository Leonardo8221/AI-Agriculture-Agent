import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";

const VideoItem = ({ videoprops, onVideoSelect }) => {
  return (
    <div
      onClick={() => onVideoSelect(videoprops)}
      className="rounded-lg mb-3 border-2 p-3 border-gray-300 w-full shadow-md flex gap-6 items-center cursor-pointer"
    >
      <div
        className="m-0 w-2/5 shrink-0 rounded-r-none"
        shadow={false}
        floated={false}
      >
        <img
          className="w-full"
          src={videoprops.snippet.thumbnails.medium.url}
          alt={videoprops.snippet.title}
        />
      </div>

      <div className="content">
        <h5>{videoprops.snippet.title}</h5>
      </div>
    </div>
  );
};

export default VideoItem;
