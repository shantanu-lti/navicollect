import React, { useCallback, useRef, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useDropzone } from "react-dropzone";
import {
  FaXmark,
  FaCheck,
  FaDownload,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";
import { toast } from "react-toastify";
import { FaFile, FaUpload } from "react-icons/fa6";
import axios from "axios";
import { useModalContext } from "../../context/modal";
// import sampleFile from "../assets/invoice_template.xlsx";
const MyDropzone = ({ fileUploaded, setFileUploaded }) => {
  const { showSapConnectModal, setShowSapConnectModal } = useModalContext();
  const [uploadedFile, setUploadedFile] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileUploadFormRef = useRef();

  const onDropAccepted = useCallback((acceptedFiles) => {
    // Do something with the files
    // console.log("acceptedFiles:", acceptedFiles);
    setUploadedFile(acceptedFiles[0]);
    setIsDisabled(false);
  }, []);

  const onDropRejected = useCallback((rejectedFiles) => {
    // Do something with the files
    toast.warn("Only one excel file is allowed to be selected");
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    console.log("upload file button clicked");
    if (!uploadedFile) {
      return toast.error("Please select a file to upload.");
    }
    if (uploadedFile.length > 1) {
      return toast.error("Please select only one file to upload.");
    }

    const form = new FormData();
    form.set("file", uploadedFile);
    console.log(form.get("file"));
    const url = import.meta.env.VITE_BACKEND_BASE_URL + "/upload-excel";
    try {
      const uploadResult = await axios.post(url, form, {
        headers: {
          "Content-Type": "multipart/form",
          Authorization:
            "Basic " + btoa("ltimindtree:HSG762736tg^&&z565R2U3GBU471T8Y7"),
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (uploadResult.data.status) {
        toast.success("File Uploaded");
        setFileUploaded(true);
        setIsDisabled(true);
        setIsUploading(false);
      }
    } catch (err) {
      console.log(err);
      setIsUploading(false);
      toast.error("Unable to upload file. Please try again later");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    onDropRejected,
    multiple: false,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });

  const inactivedragClass =
    "w-full h-[100px] bg-white border-dashed border-2 border-slate-300 rounded-md p-4 mb-4 flex justify-center items-center cursor-pointer";
  const activeedragClass =
    "w-full h-[100px] bg-slate-50 border-dashed border-2 border-blue-300 rounded-md p-4 mb-4 flex justify-center items-center cursor-pointer";

  return (
    <form onSubmit={handleUpload} ref={fileUploadFormRef}>
      <div
        {...getRootProps()}
        className={isDragActive ? activeedragClass : inactivedragClass}
      >
        <input multiple={false} {...getInputProps()} />
        {isDragActive ? (
          <p className="font-medium">Drop the files here</p>
        ) : (
          <p>
            {" "}
            <FaUpload className="inline text-xl fill-slate-500 mx-4" />
            Drag and drop some files here, or click to browse files
          </p>
        )}
      </div>
      <ul className="mb-4">
        {uploadedFile && (
          <li
            className={
              !fileUploaded
                ? "list-none flex items-center justify-between py-3 px-4 rounded-md bg-slate-50 border-2"
                : "list-none flex items-center justify-between py-3 px-4 rounded-md bg-slate-50 border-2 border-green-300"
            }
          >
            <div>
              <FaFile className="fill-slate-500 inline mr-2" />
              <span>{uploadedFile?.name}</span>
            </div>

            <FaXmark
              className="text-lg fill-slate-800 cursor-pointer"
              onClick={() => {
                setUploadedFile();
                setIsDisabled(true);
                setFileUploaded(false);
                setIsUploading(false);
              }}
            />
          </li>
        )}
      </ul>
      <div className="flex flex-wrap gap-4 justify-between items-center">
        {!isDisabled && !fileUploaded ? (
          <button
            disabled={isDisabled}
            className="bg-blue-600 w-[120px] text-white font-bold  px-4 py-3 rounded-md"
          >
            {isUploading ? (
              <PulseLoader color="#ffffff" speedMultiplier={0.5} size={6} />
            ) : (
              "Upload"
            )}
          </button>
        ) : (
          isDisabled &&
          fileUploaded && (
            <span
              className=" text-green-600 font-bold text-sm rounded-full cursor-default"
              onClick={() => {
                toast.warn("File is Uploaded successfully.");
              }}
            >
              <FaCheck className="inline mr-2 text-sm fill-green-600" />
              File Uploaded Successfuly
            </span>
          )
        )}
        <div className="ml-auto flex gap-8">
          <button
            type="button"
            className=" text-slate-800 font-bold text-sm rounded-md"
            onClick={() => {
              setShowSapConnectModal(true);
            }}
          >
            <FaArrowUpRightFromSquare className="text-sm mr-1 mb-0.5 fill-slate-800 inline" />{" "}
            SAP Connect
          </button>
          <a
            href="/navicollect/public/invoice_template.xlsx"
            target="_blank"
            className=" text-slate-800 font-bold  text-sm rounded-full"
            download={true}
          >
            <FaDownload className="text-sm mr-1 mb-0.5 fill-slate-800 inline" />{" "}
            Download Sample
          </a>
        </div>
      </div>
    </form>
  );
};

export default MyDropzone;
