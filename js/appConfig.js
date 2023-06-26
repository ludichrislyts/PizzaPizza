const awsAppConfig = new AWS.AppConfig({ apiVersion: '2019-10-09' });
const appEnv = window.env;

const constParams = {
  Application: 'PizzaPizza',
  Configuration: 'ShowOrderConfigPipeline',
  Environment: appEnv
};

let cachedParams = {};
let cachedConfigData = {};
let parsedConfigData = {};
getConfig = async () => {

  // Check if ClientId is defined
  if (!cachedParams.ClientId) {
    cachedParams.ClientId = 'pizza-pizza';
  }

  // Merge constParams and cachedParams 
  const params = { ...constParams, ...cachedParams };

  // Call GetConfiguration API
  const appConfigResponse = await awsAppConfig.getConfiguration(params).promise();

  // Add ClientConfigurationVersion to cachedParams if not present
  if ((!cachedParams.ClientConfigurationVersion) || appConfigResponse.ConfigurationVersion !== cachedParams.ClientConfigurationVersion) {
    cachedParams.ClientConfigurationVersion = appConfigResponse.ConfigurationVersion;
  }

  const configData = await Buffer.from(appConfigResponse.Content, 'base64').toString('ascii');

  if ((!cachedConfigData) || (configData && cachedConfigData !== configData))
    cachedConfigData = configData;

  if (configData == null || configData == '') {
    parsedConfigData = JSON.parse(cachedConfigData);
  } else {
    parsedConfigData = JSON.parse(configData);
  }

  window.appConfig = parsedConfigData;
};
