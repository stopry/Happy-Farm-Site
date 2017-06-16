/**
 * Created by Administrator on 2017/3/22 0022.
 */
$(function(){
    var myswiper = new Swiper('.slideBannner .swiper-container', {//启动swiper
        slidesPerView:'auto',
        autoplay:3000,
        speed:1500,
    })
    //得到公告列表
    function getAnnoList(){
        $.ajax({
            url:'/api/notice/list?pageNum=1',
            type:'GET',
            data:{},
            dataType:'json',
            success:function(datas){
                if(!datas.success){
                    layer.msg(datas.msg);
                    return;
                }
                var data = datas.obj.records;
                var _html = '';
                for(var i = 0;i<data.length;i++){
                    _html+='<dl class="w100 ovhd bg_w dlWrap">'+
                        '<li class="ovhd annouListItem">'+
                            '<h3 class="annoTitle">'+
                            '<span class="red">[公告]</span>'+
                        data[i].title+
                        '</h3>'+
                        '<p class="annoDesc" style="font-size: 12px;text-indent: 20px;line-height: 25px;">'+
                            data[i].content+
                        '</p>'+
                    '<p class="annoBot" style="font-size: 12px;">'+
                        '<time class="annoTime fl">'+formatTime(data[i].datetime)+'</time>'+
                    '<a href="news-list.html" class="lookMore fr" style="font-size: 12px;">查看更多</a>'+
                        '</p>'+
                        '</li>'+
                        '</dl>'
                }
                $(".annouListWrap").html(_html);
            },
            error:function(e){
                layer.msg('获取失败')
            }
        })
    }
    getAnnoList();
})