const staticMessage = require("/static/message/messages.json");
const common = require("/utils/common.js");
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
        const lang = my.getSystemInfoSync().language;
        const setLang = (lang) => {
            // lang = 'en'
            lang = 'zh-HK'
            // lang="sc"
            if ((lang == 'Chinese' && env.shopCountry !== 'hk') || lang == 'sc' || (lang == 'zh-Hans' && env.appEnv == 'ALIPAY_CN')) {
                common.setGlobalData(this.globalData, 'language', 'sc');
            } else if (lang != 'en') {
                common.setGlobalData(this.globalData, 'language', 'tc');
            } else {
                common.setGlobalData(this.globalData, 'language', lang);
            }
            setJsonGlobalData();
            setTabBar();
        };
        const setJsonGlobalData = () => {
            common.setGlobalData(this.globalData, 'messages', staticMessage[this.globalData.language]);
        };
        const setTabBar = () => {
            if (my.canIUse('setTabBarItem')) {
                const tabList = this.globalData.messages.pug.partial.tab_bar.itemArray;
                tabList.forEach((tabitem, idx) => {
                    my.setTabBarItem({
                        index: idx,
                        iconPath: tabitem.icon,
                        selectedIconPath: tabitem.activeIcon,
                        text: tabitem.name,
                    });
                });
            };
        };
        setLang(lang);
        config.envSettings;
    },
})