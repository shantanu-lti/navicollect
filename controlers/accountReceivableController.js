const axios = require("axios");
const { pool } = require("../connection");
const uploadExcel = async (req, res) => {
  const apiUsername = process.env.BASIC_AUTH_USERNAME;
  const apiPassword = process.env.BASIC_AUTH_PASSWORD;

  try {
    console.log(req.body);

    const result = await axios.post(
      "http://13.127.183.113:8016/account_receivable/upload_invoice",
      req.body,
      {
        auth: {
          username: apiUsername,
          password: apiPassword,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    res.send(result.response);
  } catch (err) {
    // console.log(err);
    res.status(400).send({ status: false, message: err });
  }
};

const getSbu = async (req, res) => {
  const searchText = req.body.text;
  if (!searchText)
    return res
      .status(400)
      .send({ status: false, message: "search text not found" });
  const query = `select distinct sbu_name from navicollect.sbu where LOWER(sbu_name) like '%${searchText.toLowerCase()}%' order by sbu_name asc`;
  try {
    const result = await pool.query(query);
    const rows = [];
    result.rows.forEach((row) => {
      rows.push(row.sbu_name);
    });
    res.send({ status: true, result: rows });
  } catch (err) {
    res.status(400).send({ status: false, message: err });
  }
};

const getPartners = async (req, res) => {
  const searchText = req.body.text;
  if (!searchText)
    return res
      .status(400)
      .send({ status: false, message: "search text not found" });
  const query = `select distinct partner_name from navicollect.client_partner_mapping where LOWER(partner_name) like '%${searchText.toLowerCase()}%' order by partner_name asc`;
  try {
    const result = await pool.query(query);
    const rows = [];
    result.rows.forEach((row) => {
      rows.push(row.partner_name);
    });
    res.send({ status: true, result: rows });
  } catch (err) {
    res.status(400).send({ status: false, message: err });
  }
};

const getClientByPartner = async (req, res) => {
  const partnerName = req.body.partnerName;
  if (!partnerName)
    return res
      .status(400)
      .send({ status: false, message: "partner name invalid" });
  const query = `select distinct client_name from navicollect.client_partner_mapping where LOWER(partner_name) = '${partnerName.toLowerCase()}' order by client_name asc`;
  try {
    const result = await pool.query(query);
    const rows = [];
    result.rows.forEach((row) => {
      rows.push(row.client_name);
    });
    res.send({ status: true, result: rows });
  } catch (err) {
    res.status(400).send({ status: false, message: err });
  }
};

const getClients = async (req, res) => {
  const searchText = req.body.text;
  if (!searchText)
    return res
      .status(400)
      .send({ status: false, message: "search text not found" });
  const query = `select distinct client_name from navicollect.client_partner_mapping where LOWER(client_name) like '%${searchText.toLowerCase()}%' order by client_name asc`;
  try {
    const result = await pool.query(query);
    const rows = [];
    result.rows.forEach((row) => {
      rows.push(row.client_name);
    });
    res.send({ status: true, result: rows });
  } catch (err) {
    res.status(400).send({ status: false, message: err });
  }
};

const analyseRisk = async (req, res) => {
  const company = req.body.company;
  console.log("analysing risk for", company);
  if (!company || company === "")
    return res
      .status(400)
      .send({ status: false, message: "invalid company name" });
  const apiUsername = process.env.BASIC_AUTH_USERNAME;
  const apiPassword = process.env.BASIC_AUTH_PASSWORD;
  try {
    const url =
      "http://13.127.183.113:8016/account_receivable/company_analysis";
    const response = await axios.post(
      url,
      { company: company },
      {
        auth: {
          username: apiUsername,
          password: apiPassword,
        },
      }
    );
    res.send(response.data);
  } catch (err) {
    res.status(400).send({ status: false, message: err });
  }
};
module.exports = {
  uploadExcel,
  getSbu,
  getPartners,
  getClientByPartner,
  getClients,
  analyseRisk,
};
