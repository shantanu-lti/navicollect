import React, { useRef, useState } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa6";
import Select from "react-select";
import PulseLoader from "react-spinners/PulseLoader";
import useReactSelectOptions from "../utils/useReactSelectOptions";
import { custGroupData, sbuData, daysData } from "../utils/constants";
const SelectCategories = () => {
  const formRef = useRef();
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [sbu, setSbu] = useState("");
  const [custGroup, setCustGroup] = useState("");
  const [ageDelay, setAgeDelay] = useState("");
  const { createOptions } = useReactSelectOptions();

  const custGroupOptions = createOptions(custGroupData);
  const sbuOptions = createOptions(sbuData);
  const dateOptions = createOptions(daysData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const form = new FormData(formRef.current);
    const payload = {
      invoice_type: form.get("invoiceType"),
      age_delay: form.get("ageSelection"),
    };
    try {
      const url =
        import.meta.env.VITE_BACKEND_BASE_URL + "/account-payable/send-email";
      const response = await axios.post(url, payload, {
        headers: {
          Authorization:
            "Basic " + btoa("ltimindtree:HSG762736tg^&&z565R2U3GBU471T8Y7"),
          "Access-Control-Allow-Origin": "*",
        },
      });
      setSending(false);
      if (response.data.status) setEmailSent(true);
    } catch (err) {
      console.log(err);
      setSending(false);
    }
  };
  console.log(ageDelay);
  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <fieldset disabled={sending}>
        <p className="mb-2">
          Select Recipient by group <span className="text-red-500">*</span>{" "}
        </p>
        <div className="w-full flex flex-col md:grid md:grid-cols-10 gap-4 justify-center items-center">
          <div className="w-full md:col-span-3">
            <Select
              options={sbuOptions}
              placeholder="Select SBU"
              classNamePrefix="react-select"
              defaultValue={sbu}
              isMulti={true}
              onChange={(options) => {
                setSbu(options.value);
              }}
            />
          </div>
          <div className="w-full md:col-span-1">
            <span className="block text-center">OR</span>
          </div>
          <div className="w-full md:col-span-3">
            <Select
              options={custGroupOptions}
              placeholder="Select Client Partner"
              classNamePrefix="react-select"
              defaultValue={custGroup}
              isMulti={true}
              onChange={(options) => {
                setCustGroup(options.value);
              }}
            />
          </div>
          <div className="w-full md:col-span-3">
            <Select
              options={sbuOptions}
              placeholder="Select Customer Group"
              classNamePrefix="react-select"
              defaultValue={sbu}
              isMulti={true}
              onChange={(options) => {
                setSbu(options.value);
              }}
            />
          </div>
        </div>

        <div className="md:pr-2 md:grid md:grid-cols-11 gap-2">
          <div className="md:col-span-5">
            <p className="mt-4 mb-2">
              Ageing Criteria <span className="text-red-500">*</span>
            </p>

            <Select
              options={dateOptions}
              placeholder="Select Ageing Criteria"
              classNamePrefix="react-select"
              isMulti={true}
              required={true}
              defaultValue={ageDelay}
              onChange={(option) => {
                setAgeDelay(option.value);
              }}
            />
          </div>
        </div>

        {emailSent ? (
          <button
            type="button"
            className=" text-green-600 font-bold text-sm"
            onClick={() => {
              toast.warn("File is Uploaded successfully.");
            }}
          >
            <FaCheck className="inline mr-2 text-sm fill-green-600" />
            Email Sent Successfully
          </button>
        ) : (
          <button className="w-[140px] mt-4 bg-blue-600 text-white font-bold  px-6 py-3 rounded-full">
            {sending ? (
              <PulseLoader color="#ffffff" speedMultiplier={0.5} size={6} />
            ) : (
              "Follow Up"
            )}
          </button>
        )}
      </fieldset>
    </form>
  );
};

export default SelectCategories;
