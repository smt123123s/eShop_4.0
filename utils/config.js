let sandbox = {
    AppID: "EAPP119988556677",
    clientID: "2160020075043514",
    mode: "static",
    currentENV : 'sandbox',
    appEnv: "",
    market: "",
    language: "",
    appScope: "",
    version: "4.0.0 - sandbox",
    path: {
        domainPath: "https://eshop-app-service.sandbox-codpayment.com",
        staticPath: "https://eshop.sandbox-codpayment.com",
        enquiryFormUrl:  "https://rewardbuy.sandbox-codpayment.com/{lang}/enquiry-form/?isFormOnly=true"
    },
    commonPath: {},
    apiList: {},
    messages: {}
};
let productionCN = {
    AppID: "EAPP202302071651",
    clientID: "2102020149803152",
    mode: "static",
    currentENV : 'production',
    appEnv: "",
    market: "",
    language: "",
    appScope: "",
    version: "4.0.0 - CN",
    path: {
        domainPath: "https://eshop-app-service.rewardbuy.cn",
        staticPath: "https://eshop.codpayment.com",
        enquiryFormUrl:  "https://rewardbuy.shop/{lang}/enquiry-form/?isFormOnly=true"
    },
    commonPath: {},
    apiList: {},
    messages: {}
};
let production = {
    AppID : "EAPP001478523698",
    clientID: "2160020059747688",
    mode: "static",
    currentENV : 'production',
    appEnv: "",
    market: "",
    language: "",
    appScope: "",
    version: "4.0.0",
    path: {
        domainPath: "https://eshop-app-service.codpayment.com",
        staticPath: "https://eshop.codpayment.com",
        enquiryFormUrl: "https://rewardbuy.shop/{lang}/enquiry-form/?isFormOnly=true"
    },
    commonPath: {},
    apiList: {},
    messages: {}
};

//********** environment **********//
// variable: sandbox || production //
let thisShop = sandbox;
//*********************************//

let systemInfoCache = null;
const initConfig = () => {
    if(systemInfoCache === null) {
        const systemInfo = my.getSystemInfoSync();
        handleAppENV(systemInfo.app);
        handleLanguage(systemInfo.language);
        handleApiList();
        handleStaticMessage();
        handleCommonVariable();
        systemInfoCache = true;
    };
    return thisShop;
};

// country handle
// background: check the env is based on Alipay CN || Alipay HK and choose corresponding config
const handleAppENV = (appEnv) => {
    thisShop.appEnv = "ALIPAY_HK";
    thisShop.market = "rewardbuy";
    thisShop.appScope = "SCOPE_BASE";
    if(!appEnv.includes("hk") && !appEnv.includes("HK")) {
        if(thisShop.currentENV === "production") {
            thisShop = productionCN;
        };
        thisShop.appScope = ["auth_base"];
        thisShop.appEnv = "ALIPAY_CN";
        thisShop.market = "cn_rewardbuy";
    };
    return;
};

// apiList handle
// background: the api list should add domain path in front of list, replace corresponding
// /{dev_mode}/, /{market_id}/, /{app_id}/, /{shop_id}/ (shop_id replace in corresponding shop page)
const handleApiList = () => {
    let apiList = {
        marketLanding: "{domain_path}/{dev_mode}/app-service/json/market-landing/{market_id}",
        categoryList: "{domain_path}/{dev_mode}/app-service/json/market-categories/{market_id}",
        shopList: "{domain_path}/{dev_mode}/app-service/json/market-shops/{market_id}",
        productList: "{domain_path}/{dev_mode}/app-service/json/market-products/{market_id}",
        search: "{domain_path}/{dev_mode}/app-service/json/market-search/{market_id}",
        shopPromotions: "{domain_path}/{dev_mode}/app-service/json/shop-promotions/{market_id}/{shop_id}",
        shopDetails: "{domain_path}/{dev_mode}/app-service/json/shop-details/{shop_id}",
        productDetails: "{domain_path}/{dev_mode}/app-service/json/product-details/{shop_id}/{product_id}",
        getOrderVoucherDetails: "{domain_path}/{dev_mode}/app-service/api/evoucher-detail",
        codeShare: "{domain_path}/{dev_mode}/app-service/api/evoucher-share-init",
        codeShareCancel: "{domain_path}/{dev_mode}/app-service/api/evoucher-share-cancel",
        codeShareConfirm: "{domain_path}/{dev_mode}/app-service/api/evoucher-share-confirm",
        preCheckout: "{domain_path}/{dev_mode}/app-service/api/pre-checkout",
        checkout: "{domain_path}/{dev_mode}/app-service/api/checkout",
        confirmOrder: "{domain_path}/{dev_mode}/app-service/api/order-status",
        getOrderHistory: "{domain_path}/{dev_mode}/app-service/api/order-history",
        getOrderHistoryDetails: "{domain_path}/{dev_mode}/app-service/api/order-detail",
        getOrderVoucherHistory: "{domain_path}/{dev_mode}/app-service/api/evoucher-history",
        promoMaterials: "{domain_path}/{dev_mode}/app-service/api/promo-materials",
        promocodeAcquire: "{domain_path}/{dev_mode}/app-service/api/promocode-acquire",
        promocodeList: "{domain_path}/{dev_mode}/app-service/api/promocode-list",
        qrCode: "{domain_path}/{dev_mode}/app-service/api/order-qrcode",
        login: "{domain_path}/{dev_mode}/app-service/api/login",
        refreshToken: "{domain_path}/{dev_mode}/app-service/api/refresh-token",
        tracking: "{domain_path}/{dev_mode}/app-service/api/track",
        ///// api out of list////
        staticRoute: "{static_path}/{dev_mode}",
        jsonPath: "{static_path}/{dev_mode}/{app_id}/{lang}",
        defaultShopTncUrl: '{static_path}/dyn/v1/app-service/{app_id}/html/{shop_id}_terms_{lang}.html'
    };
    Object.keys(apiList).forEach((key) => {
        apiList[key] = apiList[key].replace(/{domain_path}/, thisShop.path.domainPath);
        apiList[key] = apiList[key].replace(/{static_path}/, thisShop.path.staticPath);
        apiList[key] = apiList[key].replace(/{dev_mode}/, thisShop.mode);
        apiList[key] = apiList[key].replace(/{market_id}/, thisShop.market);
        apiList[key] = apiList[key].replace(/{app_id}/, thisShop.AppID);
        apiList[key] = apiList[key].replace(/{lang}/, thisShop.language);
    });
    // other path need to replace variable
    thisShop.path.enquiryFormUrl = thisShop.path.enquiryFormUrl.replace(/{lang}/, thisShop.language);
    thisShop.apiList = apiList;
    return;
};

// Language handle
// background: check the user alipay language settings which decide the static message
const handleLanguage = (lang) => {
    // lang = 'en'
    lang = 'zh-HK'
    // lang = "sc"
    if ((lang == 'Chinese' && thisShop.appEnv !== 'ALIPAY_HK') || lang == 'sc' || (lang == 'zh-Hans' && thisShop.appEnv == 'ALIPAY_CN')) {
        thisShop.language = "sc";
    } else if (lang != 'en') {
        thisShop.language = "tc";
    } else {
        thisShop.language = lang
    };
    return;
};

// Static message handle
// background: show static message based on different language
const handleStaticMessage = () => {
    const message = require("../static/message/messages.json");
    thisShop.messages = message[thisShop.language];
    return;
};

// Common variable handle
// background: some variables are same in different env, set in function to prevent repeat code
const handleCommonVariable = () => {
    thisShop.commonPath = {
        downloadPath: "https://sbs-common.codpayment.com/static/html/AlipayJSBridgeLoadingPage.html",
        downloadRedirectPath: "https://sbs-common.codpayment.com/static/html/AlipayJSBridgeAction.html"
    };
    return;
}

module.exports = {
    initConfig: initConfig
}