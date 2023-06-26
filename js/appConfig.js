getConfig = () => {
    fetch(window.configPath)
    .then(res => {
        return res.json();
    }).then(data => {
        console.log(data);
        window.appConfig = data;
    }).catch(err => {
        console.log(err);
    });
};

 getConfig();
