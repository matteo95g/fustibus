import React from "react";
import ClubEdit from "@features/clubs/Edit";
import { useParams } from "react-router-dom";

const Page = () => {
  const { id } = useParams();

  return <ClubEdit id={id} />;
};

export default Page;
