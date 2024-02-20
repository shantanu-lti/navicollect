import React, { useState } from "react";
import MyDropzone from "./MyDropzone";
import SelectCategories from "./SelectCategories";
const FollowUp = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-end">
        <p className="font-semibold text-xl">
          Please upload the AR data per attached template or Connect to SAP
          system to process the data:
        </p>
      </div>
      <div className="mt-6">
        <MyDropzone
          fileUploaded={fileUploaded}
          setFileUploaded={setFileUploaded}
        />
      </div>

      <>
        <p className="font-semibold text-xl mt-12">Select Criterias:</p>
        <div className="mt-6">
          <SelectCategories fileUploaded={fileUploaded} />
        </div>
      </>
    </div>
  );
};

export default FollowUp;
