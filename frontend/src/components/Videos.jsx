import { useState } from "react";
import VideoDetail from "./VideoDetail";
import VideoList from "./VideoList";

const Videos = (props) => {
  const [selectedVideo, setSelectedVideo] = useState({...props.videos[0]});
  const onVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
      <div className="flex h-[500px] gap-3">
        <div className="w-4/5 shadow-md border-2 boder-gray-400 p-3">
          <VideoDetail video={selectedVideo} />
        </div>
        <div className="w-2/5 h-full">
          <VideoList videos={props.videos} onVideoSelect={onVideoSelect} />
        </div>
      </div>
  );
};

export default Videos;
