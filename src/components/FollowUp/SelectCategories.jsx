import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa6";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import PulseLoader from "react-spinners/PulseLoader";
import useReactSelectOptions from "../../utils/useReactSelectOptions";
import { custGroupData, sbuData, daysData } from "../../utils/constants";
const SelectCategories = () => {
  const { createOptions } = useReactSelectOptions();
  const formRef = useRef();
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [sbu, setSbu] = useState(null);
  const [partnerName, setPartnerName] = useState(null);
  const [custGroup, setCustGroup] = useState(null);
  const [ageDelay, setAgeDelay] = useState("");
  const [custGroupOptions, setCustGroupOptions] = useState([]);
  const [custGroupDisabled, setCustGroupDisabled] = useState(false);
  const [sbuDisabled, setSbuDisabled] = useState(false);

  const dateOptions = createOptions(daysData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setEmailSent(false);
    if (sbu === null && custGroup === null) {
      toast.warn("Could not proceed. Please Select SBU name or Client Group.");
      setSending(false);
      return;
    }
    const payload = {
      sbu_name_list: sbu ? [sbu.value] : [],
      customer_description_code_list: custGroup ? custGroup.value : "",
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
      console.log(response.data.message.toLowerCase().includes("success"));
      if (
        response.data.status ||
        response.data.message.toLowerCase().includes("success")
      )
        setEmailSent(true);
      toast.success("Email Sent Successfuly.");
    } catch (err) {
      console.log(err);
      toast.error("Could proceed. Please try again later.");
      setSending(false);
    }
  };

  const getSbu = (searchText) => {
    return new Promise(async (resolve, reject) => {
      const url =
        import.meta.env.VITE_BACKEND_BASE_URL + "/account-payable/get-sbus";
      if (!searchText) return resolve([]);
      try {
        const {
          data: { result },
        } = await axios.post(url, { text: searchText });
        if (result.length === 0) resolve([]);
        const options = createOptions(result);
        resolve(options);
      } catch (err) {
        console.log(err);
        toast.error("Error Occured. Please try again later.");
        reject(err);
      }
    });
  };

  const getClientPartner = (searchText) => {
    return new Promise(async (resolve, reject) => {
      const url =
        import.meta.env.VITE_BACKEND_BASE_URL + "/account-payable/get-partners";
      if (!searchText) return resolve([]);
      try {
        const {
          data: { result },
        } = await axios.post(url, { text: searchText });
        if (result.length === 0) resolve([]);
        const options = createOptions(result);
        resolve(options);
      } catch (err) {
        console.log(err);
        toast.error("Error Occured. Please try again later.");
        reject(err);
      }
    });
  };

  const getClientByPartner = async (partnerName) => {
    const url =
      import.meta.env.VITE_BACKEND_BASE_URL +
      "/account-payable/get-clients-by-partner";
    if (!partnerName) return;
    try {
      const {
        data: { result },
      } = await axios.post(url, { partnerName: partnerName });
      if (result.length === 0) {
        toast.warn(`No Client Found for partner ${partnerName}`);
        setCustGroupOptions([]);
      }
      setCustGroupOptions(createOptions(result));
    } catch (err) {
      console.log(err);
      toast.error("Error Occured. Please try again later.");
    }
  };
  console.log(sbu);
  console.log(custGroup);

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <fieldset disabled={sending}>
        <p className="mb-2">
          Select Recipient by group <span className="text-red-500">*</span>{" "}
        </p>
        <div className="w-full flex flex-col md:grid md:grid-cols-10 gap-4 justify-center items-center">
          <div className="w-full md:col-span-3">
            <AsyncSelect
              isDisabled={custGroup}
              cacheOptions
              defaultOptions
              placeholder="Search and Select SBU"
              classNamePrefix="react-select"
              loadOptions={getSbu}
              isClearable={true}
              clearValue={() => setSbu("")}
              onInputChange={(newValue) => {
                console.log("on input changed called new value= ", newValue);
              }}
              // onChange={(options) => {
              //   if (options.value === "") {
              //     setSbu("");
              //     setCustGroupDisabled(false);
              //     return;
              //   }
              //   const temp = [];
              //   setCustGroupDisabled(true);
              //   setSbu(options.value);
              // }}
              onChange={setSbu}
            />
          </div>
          <div className="w-full md:col-span-1">
            <span className="block text-center">OR</span>
          </div>
          <div className="w-full md:col-span-3">
            <AsyncSelect
              isDisabled={sbu}
              cacheOptions
              defaultOptions
              placeholder="Search and Select Client Partner"
              classNamePrefix="react-select"
              loadOptions={getClientPartner}
              onChange={(options) => {
                setPartnerName(options.value);
                setCustGroup("");
                setCustGroupOptions([]);
                getClientByPartner(options.value);
              }}
              // onChange={setPartnerName}
            />
          </div>
          <div className="w-full md:col-span-3">
            <Select
              isDisabled={sbu}
              options={custGroupOptions}
              placeholder="Select Customer Group"
              classNamePrefix="react-select"
              defaultValue={custGroup}
              isClearable
              noOptionsMessage={() => (
                <span>
                  Please select{" "}
                  <span className="font-bold">Client Partner Name</span> first.
                </span>
              )}
              // onChange={(options) => {
              //   if (partnerName === "") {
              //     toast.warn("Please select the partner name first.");
              //     return;
              //   }
              //   if (options.value === "") {
              //     setCustGroup("");
              //     setSbuDisabled(false);
              //     setSbu("");
              //     return;
              //   }
              //   setCustGroup(options.value);
              // }}
              onChange={setCustGroup}
            />
          </div>
        </div>

        {/* <div className="md:pr-2 md:grid md:grid-cols-10 gap-2">
          <div className="md:col-span-3">
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
        </div> */}

        <button className="w-[140px] mt-4 bg-blue-600 text-white font-bold  px-6 py-3 rounded-full">
          {sending ? (
            <PulseLoader color="#ffffff" speedMultiplier={0.5} size={6} />
          ) : (
            "Follow Up"
          )}
        </button>
        {/* {emailSent && (
          <span className="ml-4 text-green-600 font-bold text-sm rounded-full cursor-default">
            <FaCheck className="inline mr-2 text-sm fill-green-600" />
            Email Sent Successfully
          </span>
        )} */}
      </fieldset>
    </form>
  );
};

export default SelectCategories;
