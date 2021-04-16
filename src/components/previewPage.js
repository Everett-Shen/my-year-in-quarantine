import React from "react";
import ViewContainer from "./timeline/viewContainer";
import PreviewUI from "./timeline/previewUI";

const PreviewPage = () => {
  return <ViewContainer render={(props) => <PreviewUI {...props} />} />;
};

export default PreviewPage;
