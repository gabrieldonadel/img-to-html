import {rgbTohex, rgbaTohex} from './index'

export function getColorPalett(data,width,height){
    var colors = [];
    var length = [];
    var rowSize;

    //Check if is RGBA
    if(data.length ==  (width*4*height)+height){
      rowSize = width*4;
      for(var i = 0; i<data.length-rowSize;i=i+rowSize){
        let colorCounter = 1;
        let nextHex = rgbaTohex([data[i],data[i+1],data[i+2],data[i+3]]);;
        let hex;
        for(var j = 0; j<rowSize;j=j+4){
          var k = j+4;
          var m = i+k;
          hex = nextHex;
          nextHex = (k < rowSize)?rgbaTohex([data[m],data[m+1],data[m+2],data[m+3]]):null
          if(hex == nextHex){
              colorCounter++;
          }else if(colorCounter>1){  
            if(length.indexOf(colorCounter) === -1) length.push(colorCounter);
            if(hex && colors.indexOf(hex) === -1) colors.push(hex);
            colorCounter = 1;
          }else{
            if(hex && colors.indexOf(hex) === -1) colors.push(hex);
          }
        }
      }
    }else{
      rowSize = width*3;
      for(var i = 0; i<data.length-rowSize;i=i+rowSize){
        let colorCounter = 1;
        let nextHex = rgbTohex([data[i],data[i+1],data[i+2]]);;
        let hex;
        for(var j = 0; j<rowSize;j=j+3){
          let k = j+3;
          var m = i+k;
          hex = nextHex;
          nextHex = (k < rowSize)?rgbTohex([data[m],data[m+1],data[m+2]]):null
          if(hex == nextHex){
              colorCounter++;
          }else if(colorCounter>1){  
            if(length.indexOf(colorCounter) === -1) length.push(colorCounter);
            if(hex && colors.indexOf(hex) === -1) colors.push(hex);
            colorCounter = 1;
          }else{
            if(hex && colors.indexOf(hex) === -1) colors.push(hex);
          }
        }
      }
    }
    return {colors:colors,length:length}
 }