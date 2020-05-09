/**
 * ...
 * @author Milbert Cale@Playware Studios
 */

(function ($) {
    $.fn.scrollbar = function(obj){
        if(obj==null)obj={}
        obj.thumbWidth = obj.thumbWidth==null?30:obj.thumbWidth;
        obj.thumbHeight = obj.thumbHeight==null?30:obj.thumbHeight;
        obj.y=obj.y==null&&obj.x==null?true:obj.y;
        obj.x=obj.x==null?false:obj.x;
        obj.thumbColor = obj.thumbColor==null?"rgba(0,0,0,0.75)":obj.thumbColor;
        obj.trackSize =  obj.trackSize==null?1: obj.trackSize;
        obj.trackColor = obj.trackColor==null?"rgba(0,0,0,0.5)":obj.trackColor;
        obj.thumbClassName = obj.thumbClassName==null?"":obj.thumbClassName;
        obj.trackClassName = obj.trackClassName==null?"":obj.trackClassName;
        obj.className = obj.className==null?"":obj.className;

        var offsetY = $(this)[0].scrollHeight-this.height();
        var offsetX = $(this)[0].scrollWidth-this.width();
        
        if(offsetY>0&&obj.y){
            this.css({
                paddingRight:obj.thumbWidth,
                boxSizing:"border-box",
                overflowY:"hidden"
            })
            this.append("<div id='scrollbar-wrapper-y'></div>");
            $("#scrollbar-wrapper-y").css({
                position:"fixed",
                width:obj.thumbWidth,
                height:this.height()-4,
                top:this[0].getBoundingClientRect().top+2,
                left:this[0].getBoundingClientRect().left+this[0].getBoundingClientRect().width-obj.thumbWidth-2
            });
            $("#scrollbar-wrapper-y").append("<div id='scrollbar-track-y'></div>");
            $("#scrollbar-wrapper-y").addClass(obj.className);
            $("#scrollbar-track-y").addClass(obj.trackClassName);
            $("#scrollbar-track-y").css({
                position:"absolute",
                marginTop:obj.thumbHeight/2,
                width:obj.trackSize,
                height: $("#scrollbar-wrapper-y").height()-obj.thumbHeight,
                backgroundColor:obj.trackColor,
                top:0,
                left:($("#scrollbar-wrapper-y").width()-obj.trackSize)/2
            });
            $("#scrollbar-wrapper-y").append("<div id='scrollbar-thumb-y'></div>");
            $("#scrollbar-thumb-y").addClass(obj.thumbClassName);
            $("#scrollbar-thumb-y").css({
                position:"absolute",
                borderRadius:obj.thumbHeight/2,
                width:obj.thumbWidth,
                height:obj.thumbHeight,
                backgroundColor:obj.thumbColor,
                top:0,
                left:0
            });
            $("#scrollbar-wrapper-y").click(e=>{
                var relY = e.clientY-$("#scrollbar-wrapper-y")[0].getBoundingClientRect().top;
                setY(relY);
            });

        }
        if(offsetX>0&&obj.x){
            this.css({
                paddingBottom:obj.thumbHeight,
                boxSizing:"border-box",
                overflowX:"hidden"
            })
            this.append("<div id='scrollbar-wrapper-x'></div>");
            $("#scrollbar-wrapper-x").css({
                position:"fixed",
                overflow:"hidden",
                width:this.width()-4,
                height:obj.thumbHeight,
                top:this[0].getBoundingClientRect().top+this[0].getBoundingClientRect().height-obj.thumbHeight-2,
                left:this[0].getBoundingClientRect().left+2
            });
            $("#scrollbar-wrapper-x").append("<div id='scrollbar-track-x'></div>");
            $("#scrollbar-wrapper-x").addClass(obj.className);
            $("#scrollbar-track-y").addClass(obj.trackClassName);
            $("#scrollbar-track-x").css({
                position:"absolute",
                marginLeft:obj.thumbWidth/2,
                width:$("#scrollbar-wrapper-x").width()-obj.thumbWidth,
                height:obj.trackSize,
                backgroundColor:obj.trackColor,
                top:($("#scrollbar-wrapper-x").height()-obj.trackSize)/2,
                left:0
            });
            $("#scrollbar-wrapper-x").append("<div id='scrollbar-thumb-x'></div>");
            $("#scrollbar-thumb-x").addClass(obj.thumbClassName);
            $("#scrollbar-thumb-x").css({
                position:"absolute",
                borderRadius:obj.thumbWidth/2,
                width:obj.thumbWidth,
                height:obj.thumbHeight,
                backgroundColor:obj.thumbColor,
                top:0,
                left:0
            });
            $("#scrollbar-wrapper-x").click(e=>{
                var relX = e.clientX-$("#scrollbar-wrapper-x")[0].getBoundingClientRect().left;
                setX(relX);
            });

        }

        var setY=__y=>{
            if(obj.y){
                if(__y<obj.thumbHeight/2)__y=obj.thumbHeight/2;
                else if(__y>$("#scrollbar-wrapper-y").height()-obj.thumbHeight/2)__y=$("#scrollbar-wrapper-y").height()-obj.thumbHeight/2;
                $("#scrollbar-thumb-y").css({
                    top:__y-obj.thumbHeight/2
                });
                var s=$(this)[0].scrollHeight;
                //alert(s)
                var _y = __y-obj.thumbHeight/2;
                var calcScroll = _y/($("#scrollbar-wrapper-y").height()-obj.thumbHeight);
                this.scrollTop(($(this)[0].scrollHeight-$("#scrollbar-wrapper-y").height())*calcScroll);
            }
        };

        var setX=__X=>{
            if(obj.x){
                if(__X<obj.thumbWidth/2)__X=obj.thumbWidth/2;
                else if(__X>$("#scrollbar-wrapper-x").width()-obj.thumbWidth/2)__X=$("#scrollbar-wrapper-x").width()-obj.thumbWidth/2;
                $("#scrollbar-thumb-x").css({
                    left:__X-obj.thumbWidth/2
                });
                var s=$(this)[0].scrollWidth;
                var _x = __X-obj.thumbWidth/2;
                var calcScroll = _x/($("#scrollbar-wrapper-x").width()-obj.thumbWidth);
                this.scrollLeft(($(this)[0].scrollWidth-$("#scrollbar-wrapper-x").width())*calcScroll);
            }
        };

        return {
            setY:setY,
            setX:setX
        }
    };
})(jQuery);