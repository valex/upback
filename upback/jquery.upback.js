/* JQuery Up & Back Plugin
 * This notice must stay intact for usage
 * Author: VAlex at http://valex.net.ru
 * Visit http://valex.net.ru/upback.html for full source code
 */
$(document).ready(function () {

    "use strict";

    var DIRECTION = {"UP":0, "DOWN":1};

    var UpBack = function()
    {
        this.animationSpeed = 500;
        this.topPadding = 0;

        this.$upback_wrapper = $('<div class="upback_wrapper" />');
        this.$upback_panel = $('<div class="upback_panel" />');
        this.$arrow = $('<span />');
        this.$upback_arrow = $('<div class="upback_arrow" title="" />');

        // http://stackoverflow.com/questions/1830080/jquery-scrolltop-doesnt-seem-to-work-in-safari-or-chrome-windows
        this.$html = $('html,body');

        this.dir;
        this.YPosition = 0;
        this.last_bottom_position=0;

        // Init
        this.init();
    };

    // Functionality
    UpBack.prototype = {

        // Initialization
        init: function()
        {
            $('body').append($(this.$upback_wrapper).append($(this.$upback_panel).append($(this.$upback_arrow).append(this.$arrow))));

            this.YPosition = $(window).scrollTop();

            if(this.YPosition === 0)
                this.setDirection(DIRECTION.DOWN);
            else
                this.setDirection(DIRECTION.UP);



            if(this.YPosition >= this.topPadding)
                this.show();


            $(this.$upback_panel).click($.proxy(function()
            {
                switch (this.dir){
                    case DIRECTION.UP:
                        this.last_bottom_position = this.YPosition;

                        $(this.$html).animate({

                            scrollTop: 0

                        }, this.animationSpeed);
                    break;

                    case DIRECTION.DOWN:
                        var scrollDownTo = this.last_bottom_position;

                        if(scrollDownTo===0)
                            scrollDownTo = this.getScrollMaxY();

                        $(this.$html).animate({

                            scrollTop: scrollDownTo

                        }, this.animationSpeed);
                    break;

                }// end switch

            }, this));
        },

        setDirection:function(dir)
        {
            switch (dir){
                case DIRECTION.UP:
                    if(this.dir !== DIRECTION.UP){
                        this.dir = DIRECTION.UP;
                        this.placeUp();
                    }
                break;

                case DIRECTION.DOWN:
                    if(this.dir !== DIRECTION.DOWN){
                        this.dir = DIRECTION.DOWN;
                        this.placeDown();
                    }
                break;
            }// end switch
        },

        show:function(){
            this.$upback_wrapper.show();
        },

        hide:function(){
            this.$upback_wrapper.hide();
        },

        placeUp:function()
        {

            this.$arrow.html('&uarr;');
            this.$upback_arrow.attr('title', 'Наверх');
        },

        placeDown:function()
        {
            this.$arrow.html('&darr;');
            this.$upback_arrow.attr('title', 'Вниз');
        },

        // http://stackoverflow.com/questions/1091048/alternatives-to-window-scrollmaxy
        getScrollMaxY:function(){
            return $(document).height() - $(window).height();
        },

        update:function(){

            this.YPosition = $(window).scrollTop();

            if(this.YPosition===0){
                this.setDirection(DIRECTION.DOWN);
            }else{
                this.setDirection(DIRECTION.UP);
            }

            if(this.last_bottom_position === 0 && this.YPosition < this.topPadding){

                this.hide();

            }else{

                this.show();

            }
        }
    };

    var upback = new UpBack();

    $(window).scroll(function () {

        upback.update();

    });
});