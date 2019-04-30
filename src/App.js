import React from 'react';
import logo from './logo.svg';
import './styles/App.scss';
import {printBody, printStyle} from './scripts/index'
import * as PNG from './scripts/png.js'
import * as JPG from './scripts/jpg.js'
import UPNG from 'upng-js'
import jpeg from 'jpeg-js';

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
        console.log('IMG', img, file)
        
        let fileName = file.name.substring(0, file.name.length-4)
        let colors = PNG.getColorPalett(img.data,img.width,img.height);
        let styles = printStyle(colors)
        let body = printBody(img,styles.map);
        console.log('Paleta de cores ', colors)
        

        let htmlFile = styles.style + body;
        let res = <a className='button is-success' download={fileName+".html"} href={window.URL.createObjectURL(new Blob([htmlFile], {type: 'text/plain'}))}>Download</a>
        this.setState({img:res, loading:false,error:false});

      }else if(file.type == "image/jpeg"){
        var img = jpeg.decode(buffArray);
        console.log(img)

        let fileName = file.name.substring(0, file.name.length-4)
        let colors = JPG.getColorPalett(img.data,img.width,img.height);
        let styles = printStyle(colors)
        let body = printBody(img,styles.map);
        console.log('Paleta de cores ', colors)
        

        let htmlFile = styles.style + body;
        let res = <a className='button is-success' download={fileName+".html"} href={window.URL.createObjectURL(new Blob([htmlFile], {type: 'text/plain'}))}>Download</a>
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
          <input onClick={() => this.setState({img:null})} type="file" id="fileInput"  accept=".jpg,.jpeg,.png,.doni"></input>
          <a onClick={this.handleClick} className={buttonClass}>Convert</a>
          {this.state.img}
          {(this.state.error)?<p>We only support PNG and JPEG at the moment</p>:null}
        </header>
      </div>
    );
  }
}

