function formatTime(now) {
    var year = new Date(now).getFullYear();
    var month = new Date(now).getMonth() + 1 >= 10 ? new Date(now).getMonth() + 1 : '0' + (new Date(now).getMonth() + 1);
    var date = new Date(now).getDate() >= 10 ? new Date(now).getDate() : '0' + new Date(now).getDate();
    var hour = new Date(now).getHours();
    var minute = new Date(now).getMinutes();
    var second = new Date(now).getSeconds();
    return year + "-" + month + "-" + date + "&nbsp;" + (hour == '0' ? '00' : hour) + ":" + (minute == '0' ? '00' : minute) + ":" + (second == '0' ? '00' : second);
}

$(function(){
    //窗口宽度
    var h = parseInt( $(window).width());
    //游戏介绍下拉菜单
    $(".toggleIcon").click(function(){
        $(this).toggleClass("open");
        $(".descListItemWrap.open").toggle(300  );
    })
    //固定定位元素样式
    function fixedObjStyle(){
        var h_width = parseInt($('#idxheader').width());
        $('#idxheader').css('left',(h-h_width)/2+'px');
        var f_width = parseInt($('#footer').width());
        $('#footer').css('left',(h-f_width)/2+'px');
    }
    fixedObjStyle()
})