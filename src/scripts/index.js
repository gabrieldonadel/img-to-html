export function printStyle(colors) {

    let map = {};
    var counter = 0; 
    let size = 1;
    var style = `<style>#main{display:grid}r{display:inline-flex}hr{margin: 0;width: ${size}px;height: ${size}px;border: none;background-color: transparent}`
    
    colors.length.forEach(l => {
    style += `.-\\3${(l+'').charAt(0)} ${(l+'').substring(1)}{width: ${l*size}px}`
    });

    colors.colors.forEach(c => {
    map[c] = getClass(counter);
    let reg = new RegExp("[,:@]+");
    if (!isNaN(parseInt(map[c].charAt(0, 10)))){
        style += `.\\3${(map[c]).charAt(0)} ${(map[c]).substring(1)/*.replace(/([,:@])/g, '\\$1')*/}{background-color: ${c}}`
    }else if(reg.test(map[c])){
        style += `.${map[c].replace(/([,:@])/g, '\\$1')}{background-color: ${c}}`
    }else{
        style += `.${map[c]}{background-color: ${c}}`
    }
    counter++;
    });

    style += '</style>';
    return {map:map,style:style}
    
}
    
export function printBody(img,map) {
    var body = "<div id='main'>";
    var rowSize = img.width*3;
    var colorChannels = 3;
    
    //Check if is RGBA
    if(img.data.length ==  (img.width*4*img.height)+img.height){
        rowSize = img.width*4;
        colorChannels = 4;

        for(let i = 0; i<img.data.length-rowSize;i=i+rowSize){
            body+='<r>';
            let counter = 1;
            let hex;
            let nextHex = rgbaTohex([img.data[i],img.data[i+1],img.data[i+2],img.data[i+3]]);
            for(let j = 0; j<rowSize;j=j+colorChannels){
                let k = j+colorChannels;
                hex = nextHex;
                nextHex = (k < rowSize)?rgbaTohex([img.data[i+k],img.data[i+k+1],img.data[i+k+2],img.data[i+k+3]]):null
                if(hex == nextHex){
                    counter++;
                }else if(counter>1){  
    
                    if(hex){
                        body +=`<hr class="${map[hex]} -${counter}">`
                    }else{
                        body +=`<hr class="-${counter}">`
                    }
                    counter = 1;
    
                }else{
                    if(hex){
                    body +=`<hr class="${map[hex]}">`
                    }else{
                    body +=`<hr>`
                    }
                    counter = 1;
                }
            
            }
            body+='</r>';
        }

    }else{

        for(let i = 0; i<img.data.length-rowSize;i=i+rowSize){
            body+='<r>';
            let counter = 1;
            let hex;
            let nextHex = rgbTohex([img.data[i],img.data[i+1],img.data[i+2]]);
            for(let j = 0; j<rowSize;j=j+colorChannels){
                let k = j+colorChannels;
                hex = nextHex;
                nextHex = (k < rowSize)?rgbTohex([img.data[i+k],img.data[i+k+1],img.data[i+k+2]]):null
                if(hex == nextHex){
                    counter++;
                }else if(counter>1){  
    
                    if(hex){
                        body +=`<hr class="${map[hex]} -${counter}">`
                    }else{
                        body +=`<hr class="-${counter}">`
                    }
                    counter = 1;
    
                }else{
                    if(hex){
                    body +=`<hr class="${map[hex]}">`
                    }else{
                    body +=`<hr>`
                    }
                    counter = 1;
                }
            
            }
            body+='</r>';
        }

    } 

    
    body += "</div>"
    return body;
}
export function getClass(i){
    return convertBase(i+"",10,37);
}
      
export function convertBase(value, from_base, to_base) {
    var range = '0123456789abcdefghijklmnopqrstuvwxyz_:@,'.split('');
    var from_range = range.slice(0, from_base);
    var to_range = range.slice(0, to_base);

    var dec_value = value.split('').reverse().reduce(function (carry, digit, index) {
        if (from_range.indexOf(digit) === -1) throw new Error('Invalid digit `'+digit+'` for base '+from_base+'.');
        return carry += from_range.indexOf(digit) * (Math.pow(from_base, index));
    }, 0);

    var new_value = '';
    while (dec_value > 0) {
        new_value = to_range[dec_value % to_base] + new_value;
        dec_value = (dec_value - (dec_value % to_base)) / to_base;
    }
    return new_value || '0';
}

export function rgbaTohex(array){
    if(array[3] == 0){
        return
    }else if(array[3] != 255){
        return "#" + componentToHex(array[0]) + componentToHex(array[1]) + componentToHex(array[2]) + componentToHex(array[3]);
    }else{
        return  "#" + componentToHex(array[0]) + componentToHex(array[1]) + componentToHex(array[2]);
    
    }
}
export function rgbTohex(array){
    return "#" + componentToHex(array[0]) + componentToHex(array[1]) + componentToHex(array[2]);
}
export function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  