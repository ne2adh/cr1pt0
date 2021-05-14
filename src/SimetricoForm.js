import React from 'react';

 /* ALGORITMO EXTRAIDO DE:  https://github.com/zishon89us/node-cheat.git */
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
let SECRET_KEY = '';
let ENCRYPTION_KEY = '';
const IV_LENGTH = 16;

function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}
  
function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

class SimetricoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          clave_secreta: 'EJEMPLO DE CIFRADO SIMETRICO AES',
          clave_secreta1: 'EJEMPLO DE CIFRADO SIMETRICO AES',
          mensaje: 'HOLA MUNDO',
          texto_encriptado_result: '',
          texto_encriptado: '',
          texto_descifrado: '',
        };
  
      this.handleChangeClaveSecreta = this.handleChangeClaveSecreta.bind(this);
      this.handleChangeClaveSecreta1 = this.handleChangeClaveSecreta1.bind(this);
      this.handleChangeTextoCifrado = this.handleChangeTextoCifrado.bind(this);
      this.handleChangeTextoDescifrado = this.handleChangeTextoDescifrado.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSubmit2 = this.handleSubmit2.bind(this);
    }
  
    handleChangeClaveSecreta(event) {
      this.setState({clave_secreta: event.target.value});
    }
    handleChangeClaveSecreta1(event) {
      this.setState({clave_secreta1: event.target.value});
    }

    handleChangeTextoCifrado(event) {
      this.setState({mensaje: event.target.value});
    }

    handleChangeTextoDescifrado(event) {
      this.setState({texto_encriptado: event.target.value});
    }
  
    handleSubmit(event) {        
        if((this.state.clave_secreta.length === 32) && this.state.mensaje.length > 1){
            try {              
              SECRET_KEY = Buffer.from(this.state.clave_secreta).toString('base64');
              ENCRYPTION_KEY = Buffer.from(SECRET_KEY, 'base64');
              let a = encrypt(this.state.mensaje);
              this.setState({ texto_encriptado_result: a});
              console.log(a);     
            } catch (error) {
              alert(error);
            }
        }
        else
            alert('la palabra clave: ' + this.state.clave_secreta + ' debe tener, 32 caracteres, \n y debe introducir un texto. ');
        
      event.preventDefault();
    }

    handleSubmit2(event) {        
      if((this.state.clave_secreta1.length === 32) && this.state.texto_encriptado.length > 1){
        try {
          SECRET_KEY = Buffer.from(this.state.clave_secreta1).toString('base64');
          ENCRYPTION_KEY = Buffer.from(SECRET_KEY, 'base64');         
          let b = decrypt(this.state.texto_encriptado.trim());
          this.setState({texto_descifrado: b});
          console.log(b);
        } catch (error) {
          alert(error);
        }            
      }
      else
      alert('la palabra clave: ' + this.state.clave_secreta1 + ' debe tener, 32 caracteres, \n y debe introducir un texto. ');
      
      event.preventDefault();
    }
  
    render() {
      return (
        <>
        <form onSubmit={this.handleSubmit}>
          <div style={{display: 'inline-block'}}>
            <h1>CIFRADO / DESCIFRADO</h1>
            <h4>Por el algoritmo AES (cifrado simetrico)</h4>
            <div style={{display: 'flex', flexDirection: 'column', alignItems:'flex-start'}}>
                <div style={{padding: '8px' }}>
                    <label>
                        Palabra Clave:
                        <input type="text" value={this.state.clave_secreta} onChange={this.handleChangeClaveSecreta} style={{width: '280px', marginLeft: '8px'}} />
                        <span style={{fontSize: '10px'}}> ( 256 bits, 32 caracteres)</span>
                    </label>
                </div>
                <div style={{padding: '8px' }}>
                    <label>
                        Mensaje a cifrar:
                        <textarea value={this.state.mensaje} onChange={this.handleChangeTextoCifrado} rows={5} cols={80} style={{marginLeft: '8px'}}/>
                    </label>
                    <br  />
                    <span>
                      Mensaje cifrado:<pre>{`${this.state.texto_encriptado_result.trim()}`}</pre>                      
                    </span>
                </div>
            </div>            
              <input type="submit" value="Cifrar" />
          </div>
        </form>
          <hr />
        <form onSubmit={this.handleSubmit2}>
          <div style={{display: 'inline-block'}}>  
              <div style={{display: 'flex', flexDirection: 'column', alignItems:'flex-start'}}>
                <div style={{padding: '8px' }}>
                    <label>
                        Palabra Clave:
                        <input type="text" value={this.state.clave_secreta1} onChange={this.handleChangeClaveSecreta1} style={{width: '280px', marginLeft: '8px'}} />
                        <span style={{fontSize: '10px'}}> ( 256 bits, 32 caracteres)</span>
                    </label>
                </div>
                <div style={{padding: '8px' }}>
                    <label>
                        Mensaje a descifrar:
                        <textarea value={this.state.texto_encriptado} onChange={this.handleChangeTextoDescifrado} rows={5} cols={80} style={{marginLeft: '8px'}}/>
                    </label>
                    <br  />
                    <span>
                        Mensaje descifrado:<pre>{`${this.state.texto_descifrado} `}</pre>                      
                    </span>
                </div>
            </div>
              <input type="submit" value="Descifrar" />
          </div>
        </form>
        </>
      );
    }
  }

  export default SimetricoForm;