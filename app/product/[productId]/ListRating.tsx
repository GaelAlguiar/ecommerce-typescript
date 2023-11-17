"use client";

import Avatar from "@/app/components/Avatar";
import Heading from "@/app/components/Heading";
import { Rating } from "@mui/material";
import moment from "moment";
import React from "react";

interface ListRatingProps {
  product: any;
}

const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  if (product.reviews.length === 0) return null;
  return (
    <div>
      <Heading title="Product Review" />
      <hr className="mt-4 mb-4 w-[70%]" />
      <div className="text-sm mt-6">
        {product.reviews &&
          product.reviews.map((review: any) => {
            return (
              <div key={review.id} className="max-w-300px">
                <div className="flex gap-2 items-center">
                  <Avatar src={review?.user.image} />
                  <div className="font-semibold text-base text-black">
                    {review?.user.name}
                  </div>
                  <div className="flex font-light text-md text-sky-600">
                    <div className="mr-2">●</div>
                    <div>{moment(review.createdDate).fromNow()}</div>
                  </div>
                </div>
                <div className="mt-3">
                  <Rating value={review.rating} readOnly />
                  <div className="text-slate-400 text-base">
                    {review.comment}
                    <hr className="mt-4 mb-4 w-[70%]" />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListRating;
