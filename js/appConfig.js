getConfig = async () => {
    const config = await fetch({
        url: `https://yjfux63dy3.execute-api.us-east-1.amazonaws.com${window.env}`
    });
    console.log(config, 'CONFIG')
  window.appConfig = config;
};

 getConfig();
