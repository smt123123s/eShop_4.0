const config = require("/utils/config.js");

App({
    globalData: {
        language: '',
        messages: {}
    },
    onLaunch(options) {
        this.appInitSettings();
    },
    appInitSettings() {
        const settings = config.initConfig();
        this.globalData.language = settings.language;
        this.globalData.messages = settings.messages;
    },
})