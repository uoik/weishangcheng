
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/classify/classify","pages/shopping/shopping","pages/member/member","pages/nolink/nolink","pages/detail/detail","pages/evaluate/evaluate","pages/userLogin/userLogin","pages/set/set"],"window":{"navigationBarTextStyle":"black","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#8A8A8A","selectedColor":"#F40","backgroundColor":"#FFF","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"static/icon_not_active/home.png","selectedIconPath":"static/icon_active/home.png"},{"pagePath":"pages/classify/classify","text":"分类","iconPath":"static/icon_not_active/edit.png","selectedIconPath":"static/icon_active/edit.png"},{"pagePath":"pages/shopping/shopping","text":"购物车","iconPath":"static/icon_not_active/cart.png","selectedIconPath":"static/icon_active/cart.png"},{"pagePath":"pages/member/member","text":"会员","iconPath":"static/icon_not_active/nickname.png","selectedIconPath":"static/icon_active/nickname.png"}]},"renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"追风少年","compilerVersion":"2.6.16","entryPagePath":"pages/set/set","entryPageQuery":"","realEntryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/classify/classify","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/shopping/shopping","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/member/member","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/nolink/nolink","meta":{},"window":{"navigationBarBackgroundColor":"#fff","navigationBarTextStyle":"black","navigationBarTitleText":"模块暂未开发"}},{"path":"/pages/detail/detail","meta":{},"window":{"navigationBarBackgroundColor":"#fff","navigationBarTextStyle":"black"}},{"path":"/pages/evaluate/evaluate","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/userLogin/userLogin","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/set/set","meta":{},"window":{"navigationStyle":"custom"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
