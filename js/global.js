/**
 * Created by Administrator on 2017/3/22 0022.
 */
var ajaxHelper = {
    //purl 是接口url
    //data是传入参数
    //callbacl是成功后的回调函数
    //async是同步异步开发，默认异步可不传，如需同步，则必须传false
    post: function (purl, data, callback, async) {
        var async = async == void(0) ? true : false;
        $.ajax({
            type: 'POST',
            url: purl,
            async: async,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (result) {
                var code = result.code;
                if (code == '401') {

                    layer.confirm('亲爱的玩家，您尚未登陆', {
                        btn: ['去登录','取消'] //按钮
                    }, function(){
                        window.location.href = '/login.html';
                    }, function(){

                    });
                }
                callback && callback(result);
            },
            error: function (info) {
                oauth.clean();
                console.log(info);

                layer.confirm('亲爱的玩家，您尚未登陆', {
                    btn: ['去登录','取消'] //按钮
                }, function(){
                    window.location.href = '/login.html';
                }, function(){

                });

            },
            complete: function (xhr, status) {

            }, beforeSend: function (request) {
                request.setRequestHeader("Authorization", 'bearer ' + oauth.getToken());
            }
        });
    },
    get: function (purl, data, callback, async) {
        // $.showLoading();
        //data.token = util.getToken();
        //data.token_str = util.getTokenStr(data.token, API_TOKEN);
        var async = async == void(0) ? true : false;
        $.ajax({
            type: 'GET',
            url: purl,
            data: data,
            async: async,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (result) {
                var code = result.code;
                if (code == '401') {
                    layer.confirm('亲爱的玩家，您尚未登陆', {
                        btn: ['去登录','取消'] //按钮
                    }, function(){
                        window.location.href = '/login.html';
                    }, function(){

                    });
                }
                callback && callback(result);
            },
            error: function (info) {
                console.log(info);
                layer.confirm('亲爱的玩家，您尚未登陆', {
                    btn: ['去登录','取消'] //按钮
                }, function(){
                    window.location.href = '/login.html';
                }, function(){

                });
            },
            complete: function (xhr, status) {
            }, beforeSend: function (request) {
                request.setRequestHeader("Authorization", 'bearer ' + oauth.getToken());
            }
        });
    }
}

var Util = {
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)return unescape(r[2]);
        return null;
    },
    formatAliStr:function(str){

        function subAliStr(_string){
            var len = _string.length;
            var new_string = '';

            var _xin = '';
            for(var i = 0;i<len-4;i++){
                _xin+='*';
            }

            new_string = _string.substr(0,2)+_xin+_string.substr(len-2,len);

            return new_string;
        }

        var str = str.toString();
        var newStr = '';
        if(str.indexOf('@')>0){//支付宝账号为邮箱
            var strj = str.split('@');
            var fLength = strj[0].length;
            if(fLength==1){
                var tmp = "*@"+strj[1];
                newStr = tmp;
            }else if(fLength==2){
                var tmp = strj[0].substr(0,1)+"*@"+strj[1];
                newStr = tmp;
            }else if(fLength==3){
                var tmp = strj[0].substr(0,2)+"*@"+strj[1];
                newStr = tmp;
            }else if(fLength==4){
                var tmp = strj[0].substr(0,2)+"**@"+strj[1];
                newStr = tmp;
            }else{
                var tmp = subAliStr(strj[0])+"@"+strj[1];
                newStr = tmp;
            }

        }else{
            newStr = str.substr(0, 3) + '****' + str.substr(7)
        }
        return newStr;
    },
    getQueryParam: function () {
        var paras = [];
        var r = window.location.search;
        if (r.indexOf("?") >= 0) {
            r = r.substr(1);
        }
        var urlStr;
        if (r && r != '') {
            urlStr = r.split('&');
        }
        if (urlStr && urlStr.length > 0) {
            for (var i = 0; i < urlStr.length; i++) {
                var p = urlStr[i].split('=');
                var v = {};
                if (p.length > 1) {
                    v = {key: p[0], val: p[1]};
                } else if (p.length = 1) {
                    v = {key: p[0], val: ''};
                }
                paras.push(v);
            }
        }
        return paras;
    },
    formatDate: function (now) {
        var year = new Date(now).getFullYear();
        var month = new Date(now).getMonth() + 1 >= 10 ? new Date(now).getMonth() + 1 : '0' + (new Date(now).getMonth() + 1);
        var date = new Date(now).getDate() >= 10 ? new Date(now).getDate() : '0' + new Date(now).getDate();
        var hour = new Date(now).getHours() >= 10 ? new Date(now).getHours() : '0' + new Date(now).getHours();
        var minute = new Date(now).getMinutes() >= 10 ? new Date(now).getMinutes() : '0' + new Date(now).getMinutes();
        var second = new Date(now).getSeconds() >= 10 ? new Date(now).getSeconds() : '0' + new Date(now).getSeconds();
        return year + "-" + month + "-" + date + "&nbsp;&nbsp;" + (hour == '0' ? '00' : hour) + ":" + (minute == '0' ? '00' : minute) + ":" + (second == '0' ? '00' : second);
    },
    isWeiXin: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
    checkEquipment: function () {
        var ua = window.navigator.userAgent.toLowerCase();//微信
        var u = navigator.userAgent;//手机类型android或ios
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {//微信
            console.log('微信');
            return 'WX';
        } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
            console.log('android');
            return 'android';
        } else if (u.indexOf('iPhone') > -1) {//苹果手机
            console.log('ios');
            return 'ios';
        } else {//其他设备
            console.log('other');
            return 'other';
        }
    },
    formatMoney: function (amount, len) {
        var a = new Number(amount);
        if (!a) {
            return '0.00';
        } else {
            return a.toFixed(len);
        }
    },
    checkMobile: function (mobile) {
        if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(mobile))) {
            return false;
        } else {
            return true;
        }
    },
    goGame: function(){
        window.location.href = gameUrl;
    },
    goDownload:function(){
        window.location.href = downloadUrl;
    }

}


var oauth = {
    getToken: function () {
        var token = localStorage.getItem('AUTHORIZATION');
        return token;
    },
    setToken: function (token) {
        localStorage.setItem('AUTHORIZATION', token);
    },
    clean: function () {
        localStorage.removeItem('AUTHORIZATION');
    }
}

function initPara() {
    localStorage.setItem('field1', Util.getQueryString('field1'));
    localStorage.setItem('field2', Util.getQueryString('field2'));
    localStorage.setItem('field3', Util.getQueryString('field3'));
    localStorage.setItem('field4', Util.getQueryString('field4'));
    localStorage.setItem('field5', Util.getQueryString('field5'));
    localStorage.setItem('superiorId', Util.getQueryString('superiorId'));
}
initPara();
