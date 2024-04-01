import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
const BookCard = ({
  thumbnail,
  title,
  pageCount,
  language,
  description,
  authors,
  publisher,
  previewLink,
  infoLink,
}) => {
  return (
    <Card className="w-full flex-row cursor-pointer hover:bg-gray-200">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-1/6 shrink-0 rounded-r-none p-6"
      >
        <img src={thumbnail} alt={title} className="w-full object-cover" />
      </CardHeader>
      <CardBody>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          {description.substring(0, 500)}..
        </Typography>
        <div className="flex gap-6">
          <a
            href={previewLink}
            className="inline-block"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="text" className="flex items-center gap-2">
              Preview Link
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </a>
          <a
            href={infoLink}
            className="inline-block"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="text" className="flex items-center gap-2">
              Info Link
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </a>
        </div>
      </CardBody>
    </Card>
  );
};

export default BookCard;
