import React from "react";
import ViewContainer from "./timeline/viewContainer";
import ViewUI from "./timeline/viewUI";

const PreviewPage = () => {
  return <ViewContainer render={(props) => <ViewUI {...props} />} />;
};

export default PreviewPage;
