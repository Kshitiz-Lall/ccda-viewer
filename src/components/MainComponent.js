import React, { useState } from "react";
import FileUploader from "./FileUploader";
import CCDAViewer from "./CCDAViewer";

const MainComponent = () => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [dataList, setDataList] = useState([]);
  const [showSections, setShowSections] = useState(false);

  const handleFileUploadSuccess = (
    uploadedFileName,
    uploadedDataList,
    isFileUploaded
  ) => {
    setIsUploaded(isFileUploaded);
    setFileName(uploadedFileName);
    setDataList(uploadedDataList);
    setShowSections(true);
  };

  const handleBackClick = (event) => {
    event.preventDefault();
    setDataList([]);
    setIsUploaded(false);
    setShowSections(false);
  };

  return (
    <div>
      {isUploaded ? (
        <CCDAViewer
          dataList={dataList}
          onBackClick={handleBackClick}
          fileName={fileName}
        />
      ) : (
        <FileUploader onFileUploadSuccess={handleFileUploadSuccess} />
      )}
    </div>
  );
};

export default MainComponent;
