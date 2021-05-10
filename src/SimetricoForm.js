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
          texto: 'HOLA MUNDO',
          texto_encriptado: '',
          texto_descifrado: '',
        };
  
      this.handleChangeClaveSecreta = this.handleChangeClaveSecreta.bind(this);
      this.handleChangeTexto = this.handleChangeTexto.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeClaveSecreta(event) {
      this.setState({clave_secreta: event.target.value});
    }

    handleChangeTexto(event) {
      this.setState({texto: event.target.value});
    }
  
    handleSubmit(event) {        
        if((this.state.clave_secreta.length === 32) && this.state.texto.length > 1){
            SECRET_KEY = Buffer.from(this.state.clave_secreta).toString('base64');
            ENCRYPTION_KEY = Buffer.from(SECRET_KEY, 'base64');
            let a = encrypt(this.state.texto);
            let b = decrypt(a);
            this.setState({ texto_encriptado: a, texto_descifrado: b});
            console.log(a, b);     
        }
        else
            alert('la palabra clave: ' + this.state.clave_secreta + ' debe tener, 32 caracteres, \n y debe introducir un texto. ');
        
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <div style={{display: 'inline-block'}}>
            <h1>CIFRADO / DESCIFRADO</h1>
            <h4>Por el algoritmo AES (cifrado asimetrico)</h4>
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
                        Texto a cifrar:
                        <textarea value={this.state.texto} onChange={this.handleChangeTexto} rows={5} cols={80} style={{marginLeft: '8px'}}/>
                    </label>
                    <br  />
                    <span>
                      Texto cifrado:<pre>{`${this.state.texto_encriptado} `}</pre>                      
                    </span>
                    <span>
                    Texto descifrado:
                        <pre style={{color: 'red'}}>{`${this.state.texto_descifrado} `}</pre>
                    </span>
                </div>
            </div>
            <hr />
            <input type="submit" value="Generar" />
            </div>
        </form>
      );
    }
  }

  export default SimetricoForm;