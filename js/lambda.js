const AWS = require("aws-sdk");
const appconfig = new AWS.AppConfigData({ apiVersion: "2021-11-11" });
const appEnv = process.env.appEnv;
const constParams = {
  ApplicationIdentifier: "PizzaPizza",
  ConfigurationProfileIdentifier: "25roi4j",
  EnvironmentIdentifier: appEnv,
};

const constFlagParams = {
  ApplicationIdentifier: "PizzaPizza",
  ConfigurationProfileIdentifier: "bw4akte",
  EnvironmentIdentifier: appEnv,
};

let cachedParams = {};
let cachedFlagParams = {};
let cachedConfigData = {};
let cachedFlagConfigData = {};
let parsedConfigData = {};
let parsedFlagConfigData = {};

exports.handler = async (event) => {
  const params = { ...constParams, ...cachedParams };
  const flagParams = { ...constFlagParams, ...cachedFlagParams };

  // Call GetConfiguration API
  const token = await new Promise((resolve, reject) => {
    appconfig.startConfigurationSession(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

  const flagToken = await new Promise((resolve, reject) => {
    appconfig.startConfigurationSession(flagParams, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

  // Call GetConfiguration API
  const appConfigResponse = await appconfig
    .getLatestConfiguration({
      ConfigurationToken: token.InitialConfigurationToken,
    })
    .promise();
  const appFlagConfigResponse = await appconfig
    .getLatestConfiguration({
      ConfigurationToken: flagToken.InitialConfigurationToken,
    })
    .promise();

  const configData = await Buffer.from(
    appConfigResponse.Configuration,
    "base64"
  ).toString("ascii");
  const flagConfigData = await Buffer.from(
    appFlagConfigResponse.Configuration,
    "base64"
  ).toString("ascii");

  if (!cachedConfigData || (configData && cachedConfigData !== configData)) {
    cachedConfigData = configData;
  }
  if (
    !cachedFlagConfigData ||
    (flagConfigData && cachedFlagConfigData !== flagConfigData)
  ) {
    cachedFlagConfigData = flagConfigData;
  }

  if (configData == null || configData == "") {
    parsedConfigData = JSON.parse(cachedConfigData);
  } else {
    parsedConfigData = JSON.parse(configData);
  }
  if (flagConfigData == null || flagConfigData == "") {
    parsedFlagConfigData = JSON.parse(cachedFlagConfigData);
  } else {
    parsedFlagConfigData = JSON.parse(flagConfigData);
  }

  const allConfigs = {
    ...parsedConfigData,
    ...parsedFlagConfigData,
  };

  console.log(allConfigs);

  const response = {
    statusCode: 200,
    body: JSON.stringify(allConfigs),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  return response;
};

function create_UUID() {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
