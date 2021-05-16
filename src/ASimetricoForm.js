import React from 'react';

 /* ALGORITMO EXTRAIDO DE:  */
//const crypto = require('crypto');
/* const path = require('path')
const fs = require('fs')

const encrypt = (text, pkPath) => {
  return new Promise((resolve, reject) => {
    const absPkPath = path.resolve(pkPath)
    fs.readFile(absPkPath, 'utf8', (err, pk) => {
      if (err) {
        return reject(err)
      }

      const buffer = Buffer.from(text, 'utf8')
      const encrypted = crypto.publicEncrypt(pk, buffer)
      resolve(encrypted.toString('base64'))
    })
  })
}

const decrypt = (text, privateKeyPath, passphrase) => {
  return new Promise((resolve, reject) => {
    const p = path.resolve(privateKeyPath)
    fs.readFile(p, 'utf8', (err, pk) => {
      if (err) {
        return reject(err)
      }

      const buffer = Buffer.from(text, 'base64')
      const decrypted = crypto.privateDecrypt({
        key: pk.toString(),
        passphrase
      }, buffer)

      resolve(decrypted.toString('utf8'))
    })
  })
} */


class ASimetricoForm extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
          texto: 'HOLA MUNDO',
          texto_encriptado: '',
          texto_descifrado: '',
          clave_publica: '',
          clave_privada: '',
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
      event.preventDefault();       
        if((this.state.clave_publica.length > 0 ) && (this.state.clave_privada.length > 0 ) && (this.state.texto.length > 1)){         
            
          const NodeRSA = require('node-rsa');
          const key = new NodeRSA(this.state.clave_publica);          
          const text = this.state.texto;
          const encrypted = key.encrypt(text, 'base64');
          console.log('encrypted: ', encrypted);
          this.setState({texto_encriptado: encrypted.toString('base64')});
          const key1 = new NodeRSA(this.state.clave_privada);
          const decrypted = key1.decrypt(encrypted, 'utf8');
          this.setState({texto_descifrado: decrypted});
          console.log('decrypted: ', decrypted.toString('utf8')); 
        }
        else
            alert('Se debe cargar tando la clave publica y privada (para los fines didacticos) \n y debe introducir un texto. ');
        
      
    }
  
    render() {
      const ImportFromFileBodyPublicComponent = () => {
        let fileReader;
      
        const handleFileRead = (e) => {
            const content = fileReader.result;
            this.setState({clave_publica: content});
        };
      
        const handleFileChosen = (file) => {
            fileReader = new FileReader();
            fileReader.onloadend = handleFileRead;
            fileReader.readAsText(file);
        };
      
        return <div >
                  <input type='file'
                        id='file'
                        accept='.pem'
                        onChange={e => handleFileChosen(e.target.files[0])}
                  />
              </div>;
      };
      const ImportFromFileBodyPrivateComponent = () => {
        let fileReader;
      
        const handleFileRead = (e) => {
            const content = fileReader.result;
            this.setState({clave_privada: content});
        };
      
        const handleFileChosen = (file) => {
            fileReader = new FileReader();
            fileReader.onloadend = handleFileRead;
            fileReader.readAsText(file);
        };
      
        return <div >
                  <input type='file'
                        id='file'
                        onChange={e => handleFileChosen(e.target.files[0])}
                  />
              </div>;
      };

      
      return (
        <form onSubmit={this.handleSubmit}>
          <div style={{display: 'inline-block'}}>
            <h1>CIFRADO / DESCIFRADO</h1>
            <h4>Por el algoritmo RSA (cifrado asimetrico)</h4>
            <div style={{display: 'flex', flexDirection: 'column', alignItems:'flex-start'}}>
                <div style={{padding: '8px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{marginBottom: '8px', textAlign: 'left'}}>
                      <label>
                          Clave publica:
                      </label>
                      <ImportFromFileBodyPublicComponent />
                    </div>
                    <div style={{width: '100px'}}>
                      <textarea value={this.state.clave_publica} rows={8} cols={80} readOnly/>
                    </div>
                </div>                
                <div style={{padding: '8px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{marginBottom: '8px', textAlign: 'left'}}>
                      <label>
                          Clave privada:
                      </label>
                      <ImportFromFileBodyPrivateComponent />
                    </div>
                    <div style={{width: '100px'}}>
                      <textarea value={this.state.clave_privada} rows={8} cols={80} readOnly/>
                    </div>
                </div>                
                <input type="submit" value="Generar" />
                <div style={{padding: '8px' }}>
                  <label>
                      Texto a cifrar:
                      <textarea value={this.state.texto} onChange={this.handleChangeTexto} rows={5} cols={80} style={{marginLeft: '8px'}}/>
                  </label>
                </div>
                <div style={{padding: '8px', textAlign: 'left' }}>
                    <span>
                      Texto cifrado:
                      <textarea value={this.state.texto_encriptado} rows={8} cols={80} readOnly/>
                    </span><br />                              
                    <span>
                    Texto descifrado:
                        <textarea style={{color: 'red'}} value={this.state.texto_descifrado} rows={8} cols={80} readOnly/>
                    </span>
                </div>
            </div>            
            </div>
        </form>
      );
    }
  }

  export default ASimetricoForm;