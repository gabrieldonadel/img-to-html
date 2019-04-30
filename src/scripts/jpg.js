import {rgbTohex, rgbaTohex} from './index'

export function getColorPalett(data,width,height){
    var colors = {};
    var length = {};
    var rowSize;

    rowSize = width*4;
      for(var i = 0; i<data.length-rowSize;i=i+rowSize){
        let colorCounter = 1;
        var nextHex = rgbaTohex(data[i],data[i+1],data[i+2],data[i+3]);;
        var hex;
        for(var j = 0; j<rowSize;j=j+4){
          var k = j+4;
          var m = i+k;
          hex = nextHex;
          nextHex = (k < rowSize)?rgbaTohex(data[m],data[m+1],data[m+2],data[m+3]):null
          if(hex == nextHex){
              colorCounter++;
          }else{
            if(hex) colors[hex] = hex;
            if(colorCounter>1){  
              length[colorCounter] = colorCounter;
              colorCounter = 1;
            }
          }
        }
      }
    
    colors = Object.keys(colors);
    length = Object.keys(length);
    
    return {colors:colors,length:length}
 }