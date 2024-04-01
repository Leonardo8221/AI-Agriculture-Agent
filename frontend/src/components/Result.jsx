import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Spinner,
} from "@material-tailwind/react";

import { useBooks, useVideos } from "../utils/store";
import BookCard from "./BookCard";
import Videos from "./Videos";

const Result = (props) => {
  const { loading, books } = useBooks((state) => ({
    loading: state.loading,
    books: state.books,
  }));

  const { vLoading, videos } = useVideos((state) => ({
    vLoading: state.loading,
    videos: state.videos,
  }));

  const data = [
    {
      label: "Video",
      value: "video",
      items: <Videos videos={videos} />,
    },
    {
      label: "Book",
      value: "book",
      items: books?.map((item, i) => {
        let thumbnail = "";
        if (item.volumeInfo.imageLinks) {
          thumbnail = item.volumeInfo.imageLinks.thumbnail;
        }

        return (
          <div className="col-lg-4 mb-3" key={item.id}>
            <BookCard
              thumbnail={thumbnail}
              title={item.volumeInfo.title}
              pageCount={item.volumeInfo.pageCount}
              language={item.volumeInfo.language}
              authors={item.volumeInfo.authors}
              publisher={item.volumeInfo.publisher}
              description={item.volumeInfo.description}
              previewLink={item.volumeInfo.previewLink}
              infoLink={item.volumeInfo.infoLink}
            />
          </div>
        );
      }),
    },
    {
      label: "Text",
      value: "text",
      items: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];

  return (
    <div className="w-full py-8">
      <h1 className="mt-12 text-3xl text-center font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Result
      </h1>

      <div className="w-full mt-6"></div>

      <button
        className="absolute top-6 right-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={() => props.setShowResult(false)}
      >
        Go to Home
      </button>

      <div className="w-full">
        {loading && vLoading ? (
          <div className="w-full mx-auto my-6">
            <Spinner />
          </div>
        ) : (
          <Tabs value="video">
            <TabsHeader>
              {data.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              {data.map(({ value, items }) => (
                <TabPanel key={value} value={value}>
                  <div className="row">{items}</div>
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Result;
