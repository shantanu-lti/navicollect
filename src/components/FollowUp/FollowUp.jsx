import React, { useState } from "react";
import MyDropzone from "./MyDropzone";
import SelectCategories from "./SelectCategories";
const FollowUp = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  return (
    <div className="w-full h-full">
      <div className="mt-8 flex justify-between items-end">
        <p className="font-semibold text-xl">
          Please upload the AR data per attached template or Connect to SAP
          system to process the data:
        </p>
      </div>
      <div className="mt-4">
        <MyDropzone
          fileUploaded={fileUploaded}
          setFileUploaded={setFileUploaded}
        />
      </div>

      <div className="h-auto">
        <p className="font-semibold text-xl mt-12">Select Criterias:</p>
        <div className="mt-4">
          <SelectCategories fileUploaded={fileUploaded} />
        </div>
      </div>
    </div>
  );
};

export default FollowUp;
