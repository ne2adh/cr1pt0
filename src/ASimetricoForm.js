import React from 'react';
 
class ASimetricoForm extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
          mensaje: 'HOLA MUNDO',
          mensaje_encriptado: '',
          mensaje_adesencriptar: '',
          mensaje_desencriptado: '',
          clave_publica: '',
          clave_privada: '',
        };
  
      this.handleChangeClaveSecreta = this.handleChangeClaveSecreta.bind(this);
      this.handleChangeMensaje = this.handleChangeMensaje.bind(this);
      this.handleChangeMensajeDesencriptar = this.handleChangeMensajeDesencriptar.bind(this);
      this.handleSubmitEncriptar = this.handleSubmitEncriptar.bind(this);
      this.handleSubmitDesencriptar = this.handleSubmitDesencriptar.bind(this);
    }
  
    handleChangeClaveSecreta(event) {
      this.setState({clave_secreta: event.target.value});
    }

    handleChangeMensaje(event) {
      this.setState({mensaje: event.target.value});
    }

	handleChangeMensajeDesencriptar(event) {
		this.setState({mensaje_adesencriptar: event.target.value});
	}
  
    handleSubmitEncriptar(event) { 
      event.preventDefault();       
        if((this.state.clave_publica.length > 0 ) && (this.state.mensaje.length > 1)){ 
          const NodeRSA = require('node-rsa');
          const key = new NodeRSA(this.state.clave_publica);          
          const text = this.state.mensaje;
          const encrypted = key.encrypt(text, 'base64');
          console.log('encrypted: ', encrypted.toString('base64'));
          this.setState({mensaje_encriptado: encrypted.toString('base64')});
        }
        else
            alert('ATENCION!!!,  Se debe cargar la clave publica \n y debe introducir un texto en el campo [mensaje a cifrar]. ');
    }

	handleSubmitDesencriptar(event) { 
		event.preventDefault();       
		  if((this.state.clave_privada.length > 0 ) && (this.state.mensaje_adesencriptar.length > 1)){
			const NodeRSA = require('node-rsa');
			const key = new NodeRSA(this.state.clave_privada);
			const decrypted = key.decrypt(this.state.mensaje_adesencriptar, 'utf8');
			console.log('decrypted: ', decrypted.toString('utf8')); 
			this.setState({mensaje_desencriptado: decrypted.toString('utf8')});
		  }
		  else
			  alert('ATENCION!!!,  Se debe cargar la clave privada \n y debe introducir el mensaje encriptado en el campo [mensaje a descifrar]');
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
                        id='file_public'
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
                        id='file_private'
                        accept='.pem'
                        onChange={e => handleFileChosen(e.target.files[0])}
                  />
              </div>;
      };

      
      return (
        <>
        <hr />
        <div>
            <h2>Algoritmo RSA (cifrado asimetrico)</h2>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <div>
				<form onSubmit={this.handleSubmitEncriptar} style={{width: '500px'}}>
					<div style={{padding: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
						<div> 
							<div style={{marginBottom: '8px', textAlign: 'left'}}>
								<label>
									Clave publica:
								</label>
								<ImportFromFileBodyPublicComponent />
							</div>
							<div style={{width: '100px'}}>
								<textarea value={this.state.clave_publica} rows={8} cols={50} readOnly/>
							</div>						
						</div>
						<div>            
							<input type="submit" value="Encriptar" />
						</div>
					</div> 
				</form> 
            </div>
            <div style={{display: 'flex', flexDirection:'column'}}>
				<div style={{padding: '8px' }}>
					<label>
						Mensaje a encriptar:
					</label>
					<textarea value={this.state.mensaje} onChange={this.handleChangeMensaje} rows={5} cols={50} style={{marginLeft: '8px'}}/>
				</div>
				<div style={{padding: '8px', color: 'green' }}>
					<span>
						Mensaje encriptado:
						<textarea value={this.state.mensaje_encriptado} rows={8} cols={50} readOnly />
					</span>
				</div>
            </div>
        </div>
		<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <div>
				<form onSubmit={this.handleSubmitDesencriptar} style={{width: '500px'}}>
					<div style={{padding: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
						<div> 
							<div style={{marginBottom: '8px', textAlign: 'left'}}>
								<label>
									Clave privada:
								</label>
								<ImportFromFileBodyPrivateComponent />
							</div>
							<div style={{width: '100px'}}>
								<textarea value={this.state.clave_privada} rows={8} cols={50} readOnly/>
							</div>						
						</div>
						<div>            
							<input type="submit" value="Desencriptar" />
						</div>
					</div> 
				</form> 
            </div>
            <div style={{display: 'flex', flexDirection:'column'}}>
				<div style={{padding: '8px' }}>
					<label>
						Mensaje encriptado:
					</label>
					<textarea value={this.state.mensaje_adesencriptar} onChange={this.handleChangeMensajeDesencriptar} rows={5} cols={50} style={{marginLeft: '8px'}}/>
				</div>
				<div style={{padding: '8px', color: 'red' }}>
					<span>
						Texto desemcriptado:
						<textarea value={this.state.mensaje_desencriptado} rows={8} cols={50} readOnly style={{ color: 'red' }}/>
					</span>
				</div>
            </div>
        </div>        
        </>
      );
    }
  }

  export default ASimetricoForm;