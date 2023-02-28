const common = require("/utils/common.js");
const request = require("/utils/request.js");

Page({
  data: {},
  onLoad() {},
  onReady(){
    this.pageInit();
  },
  pageInit: common.preventDoublePromise(() => {
    return new Promise (() => {
      my.showLoading();    
      request.marketLanding()
        .then(res => {
          my.hideLoading();
          console.log(res);
        })
        .catch(err => {
          my.hideLoading();
          console.error(err);
        });
    });
  })  
});
