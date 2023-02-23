let sandbox = {
    clientID: "2160020075043514",
    mode: "static",
    path: {
        domainPath: "https://eshop-app-service.sandbox-codpayment.com",
        staticPath: "https://eshop.sandbox-codpayment.com",
        downloadPath: "https://sbs-common.codpayment.com/static/html/AlipayJSBridgeLoadingPage.html",
        downloadRedirectPath: "https://sbs-common.codpayment.com/static/html/AlipayJSBridgeAction.html",
        enquiryFormUrl:  "https://rewardbuy.sandbox-codpayment.com/{lang}/enquiry-form/?isFormOnly=true"
    },
    version: "4.0.0 - sandbox"
};
let production = {
    clientID: "2160020059747688",
    mode: "static",
    path: {
        domainPath: "https://eshop-app-service.codpayment.com",
        staticPath: "https://eshop.codpayment.com",
        downloadPath: "https://sbs-common.codpayment.com/static/html/AlipayJSBridgeLoadingPage.html",
        downloadRedirectPath: "https://sbs-common.codpayment.com/static/html/AlipayJSBridgeAction.html",
        enquiryFormUrl: "https://rewardbuy.shop/{lang}/enquiry-form/?isFormOnly=true"
    },
    version: "4.0.0"
};

let thisShop = sandbox;

const initConfig = (env) => {
    console.log(env);
};

const handleLanguage = () => {
    
}



module.exports = {
    envSettings: initConfig(thisShop)
}