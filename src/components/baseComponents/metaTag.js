import React from "react";
import { MetaTags } from "react-meta-tags";

const MetaTag = ({ title }) => {
  return (
    <MetaTags>
      <title> {title}</title>
      <meta name="viewport" content="width=device-width, user-scalable=no" />
    </MetaTags>
  );
};

export default MetaTag;
