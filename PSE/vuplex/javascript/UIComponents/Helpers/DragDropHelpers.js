function DragAndDrop() {
    this.handlers=null;  // observers
}
 
DragAndDrop.prototype = {
 
    subscribe: function(fn) {
        this.handlers =fn;
    },

    unsubscribe:function(){
        this.handlers=null;
    },
 
    fire: function(o, x, y, thisObj) {
        var scope = thisObj || window;
        this.handlers.call(scope, o, x, y);
    }
}
 
// log helper
 
var log = (function() {
    var log = "";
 
    return {
        add: function(msg) {
            log += msg + "\n";
        },
        show: function() { 
            console.log(log);
            log = "";
        }
    }
})();

var dragAndDrop = new DragAndDrop();
var mouseX;
var mouseY;
window.DragAndDrop = {
    beginDrag(x, y) {
        Draggable.x=x;
        Draggable.y=y;
    // TODO: Determine if there's a
    // draggable element at (x, y)
        dragAndDrop.fire('BeginDrag');
    },

    drag(x, y, callback) {
        Draggable.x=x;
        Draggable.y=y;
        // TODO: If dragStart() started on a draggable
        // element, drag it to this new location

        dragAndDrop.fire('Dragging');
    },

    endDrag(x, y) {
        // TODO: Drop the draggable element in this new location
        dragAndDrop.fire('EndDrag');
    }
};

var Draggable = new function(){
    /**
     * className the class name of the dragging items
     */
    this.getItemToDrag=(className)=>{
        var item=null;
        var x=Draggable.x,y=Draggable.y;
        for(var i=$("."+className).length-1;i>=0;i--){
            var rect = $("."+className)[i].getBoundingClientRect();
            if(x>rect.x && x<rect.x+rect.width && y > rect.y && y<rect.y+rect.height){
                item = $("."+className)[i];
                break;
            }
        }
        return item;
    }
    /**
     * className the class name of the area it drop
     */
    this.getObjectIfDropOnFromClass=(className,isClasses)=>{
        var objectItDroppedOn=null;
        if(isClasses==null)isClasses=false;
        var ctr = isClasses?$("."+className).length:1;
        for(var i=0;i<ctr;i++){
            var x=Draggable.x,y=Draggable.y;
            var rect = $("."+className)[i].getBoundingClientRect();
            if(x>rect.x && x<rect.x+rect.width && y > rect.y && y<rect.y+rect.height){
                objectItDroppedOn =  $("."+className)[i];
                break;
            }
        }
        return objectItDroppedOn;
    }
    this.x=0
    this.y=0
}