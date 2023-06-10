import React from "react";
import { Link } from "react-router-dom";

export const AllBlogs = ({ Title, content, createdBy, image, _id }) => {
  return (
    <div>
      <div className="container m-4 px-20 py-5  ">
        <div className="box-border h-full w-full p-4 border-4">
          <img
            className="float-left h-44 w-68 rounded-lg p-1 "
            src={image}
          ></img>
          <Link to={`/blog/${_id}`}>
            <p className="font-bold text-2xl">{Title}</p>
          </Link>
          <div className="text-sm flex gap-4">
            <div className=" text-fuchsia-700 ">{createdBy}</div>
            <div>time</div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
};
