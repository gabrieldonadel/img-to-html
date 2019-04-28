import React from 'react';
import logo from './logo.svg';
import './styles/App.scss';
import {printBody, printStyle, rgbTohex} from './scripts/index'
import UPNG from 'upng-js'

export default class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      img: null,
      loading: false,
      error: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.setState({loading:true});
    var fileInput = document.getElementById('fileInput');
    
    var file = fileInput.files[0];

    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {


      var buffArray = reader.result;

      if(file.type == "image/png"){
        var img  = UPNG.decode(buffArray);        // put ArrayBuffer of the PNG file into UPNG.decode

        let colors = this.getColorPalett(img.data,img.width);
        let styles = printStyle(colors)
        let body = printBody(img,styles.map);
        console.log('Paleta de cores ', colors)

        let htmlFile = styles.style + body;
        let res = <a className='button is-success' download="download.html" href={'data:text/plain;charset=utf-8,' + encodeURIComponent(htmlFile)}>Download</a>
        this.setState({img:res, loading:false,error:false});

      }else{
        this.setState({error:true, loading:false})
      }
      
   }
   
  }

  render(){

    let buttonClass = (this.state.loading) ? "button is-info is-loading":'button is-info'
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            IMG to HTML5 Converter
          </p>
          <input type="file" id="fileInput"></input>
          <a onClick={this.handleClick} className={buttonClass}>Convert</a>
          {this.state.img}
          {(this.state.error)?<p>We only support PNG at the moment</p>:null}
        </header>
      </div>
    );
  }
 

 getColorPalett(data,width){
    var colors = [];
    var length = [];

    let hex = null;
    let prevHex;
    var rowSize = width*4;

    for(let i = 0; i<data.length-rowSize;i=i+rowSize){
      let colorCounter = 1;
      for(let j = 0; j<rowSize;j=j+4){
        let k = j+4;
        let hex = rgbTohex([data[i+j],data[i+j+1],data[i+j+2],data[i+j+3]]);
        let nextHex = (k < rowSize)?rgbTohex([data[i+k],data[i+k+1],data[i+k+2],data[i+k+3]]):null
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
    return {colors:colors,length:length}
 }

}

