let params = new URLSearchParams(window.location.search)
const env = params.get('env') == 'dev' ? 'dev' : 'prod';
window.env = env;
window.configPath = env == 'dev' ? 'https://yjfux63dy3.execute-api.us-east-1.amazonaws.com/dev' : 'https://pmovaoz250.execute-api.us-east-1.amazonaws.com/prod';