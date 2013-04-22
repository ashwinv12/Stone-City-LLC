$(document).ready(function()
{
    //set the originals
    var originalWinWidth = $(window).width();
 
    //set the original font size
    var originalFontSize = 30;
 
    //set the ratio of change for each size change
    var ratioOfChange = 60;
 	
    //set the font size using jquery
    $(".title").css("font-size", originalFontSize);
 
    $(window).resize(function()
    {
        //get the width and height as the window resizes
        var winWidth = $(window).width();
 
        //get the difference in width
        var widthDiff = winWidth - originalWinWidth;
 
        //check if the window is larger or smaller than the original
        if(widthDiff > 0)
        {
            //our window is larger than the original so increase font size
            var pixelsToIncrease = Math.round(widthDiff / ratioOfChange);
 
            //calculate the new font size
            var newFontSize = originalFontSize + pixelsToIncrease;
 
            //set new font size
            $(".title").css("font-size", newFontSize);
        }
        else
        {
            //our window is smaller than the original so decrease font size
            var pixelsToDecrease = Math.round(Math.abs(widthDiff) / ratioOfChange);
 
            //calculate the new font size
            var newFontSize = originalFontSize - pixelsToDecrease;
 
            //set the new font size
            $(".title").css("font-size", newFontSize);
        }
    })
});