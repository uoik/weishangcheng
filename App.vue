<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
/* 阿里图标库 */
@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_1797840_9l764n1n39o.eot?t=1590404944551'); /* IE9 */
  src: url('//at.alicdn.com/t/font_1797840_9l764n1n39o.eot?t=1590404944551#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('//at.alicdn.com/t/font_1797840_9l764n1n39o.woff?t=1590404944551') format('woff'),
  url('//at.alicdn.com/t/font_1797840_9l764n1n39o.ttf?t=1590404944551') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_1797840_9l764n1n39o.svg?t=1590404944551#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-iconfontjiantou-copy:before {
  content: "\e6c9";
}

.icon-youjiantou:before {
  content: "\e60b";
}

.icon-zuo:before {
  content: "\e682";
}

.icon-pinglun-copy:before {
  content: "\e609";
}

.icon-zan:before {
  content: "\e60a";
}


.icon-xiaolian2:before {
  content: "\e608";
}

.icon-fanhui:before {
  content: "\e627";
}

.icon-quxiao:before {
  content: "\e74d";
  color: #8a8a8a;
}

.icon-xihuan4-copy:before {
  content: "\ea0d";
  color: #ff4400;
}

.icon-xihuan1:before {
  content: "\e623";
}

.icon-kefu:before {
  content: "\e74c";
}

.icon-daifukuan:before {
  content: "\e64b";
  color: #ff4400;
}

.icon-receive-act:before {
  content: "\e605";
  color: #ff4400;
}

.icon-tuikuan:before {
  content: "\e6bc";
  color: #ff4400;
}

.icon-quanbudingdan:before {
  content: "\e606";
  color: #ff4400;
}

.icon-zanweikaifang:before {
  content: "\e82d";
}

.icon-you:before {
  content: "\e6f3";
}

.icon-xihuan:before {
  content: "\e6fe";
  color: #FF0000;
}

.icon-quanqiuzhigong:before {
  content: "\e626";
  color: #4876FF;
}

.icon-fuwuzhongxin:before {
  content: "\e634";
  color: #BA55D3;
}

.icon-mijia_huaban:before {
  content: "\e601";
  color: #ff4400;
}

.icon-imagevector:before {
  content: "\e607";
  color: #228B22;
}

.icon-find:before {
  content: "\e603";
  color: #32CD32;
}

.icon-huiyuan:before {
  content: "\e60e";
  color: #f7d680;
}

.icon-shezhi:before {
  content: "\e604";
  color: #838B8B;
}

.icon-huiyuan-:before {
  content: "\e60c";
  color: #f7d680;
}

.icon-icon2fuzhi:before {
  content: "\e602";
}

.icon-remen:before {
  content: "\e620";
}

.icon-zhongchou:before {
  content: "\e661";
}

.icon-zhineng:before {
  content: "\e6d7";
}

.icon-pintuan:before {
  content: "\e600";
}

.icon-gouwuche:before {
  content: "\e61b";
}
</style>
