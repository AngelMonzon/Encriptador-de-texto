//Variables

var inicio = false;

//seleccionar tipo de encripacion
var select = document.getElementById("encriptacion");

//barra de carga
var barraCarga = document.getElementById("barraCarga");
var width = 0;
var id = setInterval(frame, 10);

//colores originales de la pagina
var color = ["#E5E5E5", "#FFFFFF", "#0A3871", "#0A3871"];

//dialogo encriptacion
const inicioEncriptacion = document.getElementById("inicioEncriptacion");

//botones
const botonEncriptar = document.getElementById("botonEncriptar");
const botonDesencriptar = document.getElementById("botonDesencriptar");
const botonCopiar = document.getElementById("botonCopiar");
const botonEnviar = document.getElementById("botonEnviar");

//Botones para enviar el texto encriptado o desencriptado
const enviarOpciones = document.getElementById("enviarOpciones");
const botonWhatsapp = document.getElementById("whatsapp");
const botonTelegram = document.getElementById("telegram");

//boton borrar
const  botonBorrar = document.getElementById("botonBorrar");
const imagenBorrar = document.getElementById("imagenBorrar");

//Botones de contacto
const botonGithub = document.getElementById("github");
const botonPortafolio = document.getElementById("portafolio");
const botonLinkedin = document.getElementById("linkedin");

const encriptacionAesDiv = document.getElementById("encriptacionAES");
const claveDiv = document.getElementById("clave");
const ingresarTexto = document.getElementById("ingresarTexto");
const textAreaResultado = document.getElementById("textAreaResultado");
const imagen = document.getElementById("imagen");
const noTexto = document.getElementById("noTexto");

//modos de encriptacion
const encriptacionNormal = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];

const encriptacionAvanzada = {
  a: 'd',
  b: 'e',
  c: 'f',
  d: 'g',
  e: 'h',
  f: 'i',
  g: 'j',
  h: 'k',
  i: 'l',
  j: 'm',
  k: 'n',
  l: 'o',
  m: 'p',
  n: 'q',
  o: 'r',
  p: 's',
  q: 't',
  r: 'u',
  s: 'v',
  t: 'w',
  u: 'x',
  v: 'y',
  w: 'z',
  x: 'a',
  y: 'b',
  z: 'c'
};
 
const desencriptarAvanzada =  {
  d: 'a',
  e: 'b',
  f: 'c',
  g: 'd',
  h: 'e',
  i: 'f',
  j: 'g',
  k: 'h',
  l: 'i',
  m: 'j',
  n: 'k',
  o: 'l',
  p: 'm',
  q: 'n',
  r: 'o',
  s: 'p',
  t: 'q',
  u: 'r',
  v: 's',
  w: 't',
  x: 'u',
  y: 'v',
  z: 'w',
  a: 'x',
  b: 'y',
  c: 'z'
}


var claveInput = document.getElementById("claveInput");
var clave = "clave"


//Funciones

function cambiarModo(){
  var select = document.getElementById("encriptacion");
  var opcionSeleccionada = select.options[select.selectedIndex].value;
  var tipoLabel = document.getElementById("tipoLabel");
  var pMinusculas = document.getElementById("minusculas");
  var resultado = document.getElementById("resultado")
  var body = document.getElementById("body");
  var footer = document.getElementById("fotter");
  var imagenBasura = document.getElementById("imagenBorrar");

  var colorNormal = ["#E5E5E5", "#FFFFFF", "#0A3871", "#0A3871", "#aeaeae"];
  var colorAvanzada = ["#1E2952", "#CCCCCC", "#006400", "#000000", "#48547B"];
  var colorSuperAvanzada = ["#000000", "#333333", "#4260cd", "#FFFFFF", "#666666"];
  
  if (opcionSeleccionada === "normal"){
    color = colorNormal;
    encriptacionAesDiv.style.display = "none";
    claveDiv.style.display = "none";
    imagenBasura.src = "imagenes/borrar.png";
    textAreaResultado.value = "";
  } else if (opcionSeleccionada === "avanzada") {
    color = colorAvanzada;
    encriptacionAesDiv.style.display = "none";
    claveDiv.style.display = "none";
    imagenBasura.src = "imagenes/borrar.png"
    textAreaResultado.value = "";
  } else if (opcionSeleccionada === "superavanzada"){
    color = colorSuperAvanzada;
    encriptacionAesDiv.style.display = "block";
    claveDiv.style.display = "flex";
    imagenBasura.src = "imagenes/borrar2.png"
    textAreaResultado.value = "";
  }
  body.style.backgroundColor = color[0];
  tipoLabel.style.color = color[2];
  encriptacion.style.color = color[2];
  ingresarTexto.style.backgroundColor = color[0];
  ingresarTexto.style.color = color[2];
  botonEncriptar.style.backgroundColor = color[2];
  botonDesencriptar.style.backgroundColor = color[1];
  botonDesencriptar.style.color = color[3];
  pMinusculas.style.color = color[2];
  resultado.style.backgroundColor = color[1];
  resultado.style.borderColor = color[2];
  textAreaResultado.style.backgroundColor = color[1];
  textAreaResultado.style.color = color[3];
  botonCopiar.style.backgroundColor = color[1];
  botonCopiar.style.color = color[3];
  botonCopiar.style.borderColor = color[2];
  botonEnviar.style.backgroundColor = color[1];
  botonCopiar.style.color = color[3];
  footer.style.backgroundImage = "linear-gradient(" + color[0] + ", " + color[4] + ")";
}

//Funcion para convertir el texto a minusculas y no admitir caracteres especiales
ingresarTexto.addEventListener("input",  function(){
  if (select.value == "normal" || select.value == "avanzada"){
    let texto = ingresarTexto.value.toLowerCase();
    ingresarTexto.value = texto.replace(/[^a-zA-Z ]/g, '');
  }
})


function encriptar(texto, encriptacion){
  let stringEncriptada = texto.toLowerCase();
  for (let i = 0;i < encriptacion.length;i++){
    if(stringEncriptada.includes(encriptacion[i][0])){
      stringEncriptada = stringEncriptada.replaceAll(encriptacion[i][0], encriptacion[i][1]);
    }
  }
  return stringEncriptada;
}

function desencriptar(texto, encriptacion){
  let stringDesencriptada = texto.toLowerCase();
  for (let i = 0;i < encriptacion.length;i++){
    console.log(encriptacion[i][0]);
    if(stringDesencriptada.includes(encriptacion[i][1])){
      stringDesencriptada = stringDesencriptada.replaceAll(encriptacion[i][1], encriptacion[i][0]);
    }
  }
  return stringDesencriptada;
}

function encriptacionAvanzadaFuncion(mensaje, encriptacion) {
  let mensajeEncriptado = "";

  for (let i = 0; i < mensaje.length; i++) {
    const letra = mensaje[i];
    const letraEncriptada = encriptacion[letra];

    if (letraEncriptada) {
      mensajeEncriptado += letraEncriptada;
    } else {
      mensajeEncriptado += letra;
    }
  }

  return mensajeEncriptado;
}

function desencriptarAvanzadaFuncion(mensaje, encriptacion) {
  let mensajeEncriptado = "";

  for (let i = 0; i < mensaje.length; i++) {
    const letra = mensaje[i];
    const letraDesencriptada = encriptacion[letra];

    if (letraDesencriptada) {
      mensajeEncriptado += letraDesencriptada;
    } else {
      mensajeEncriptado += letra;
    }
  }

  return mensajeEncriptado;
}

function encriptarSuperAvanzadaFuncion(text, key) {
  const encrypted = CryptoJS.AES.encrypt(text, key);
  return encrypted.toString();
}

function desencriptarSuperAvanzadaFuncion(encryptedText, key) {
  const decrypted = CryptoJS.AES.decrypt(encryptedText, key);
  return decrypted.toString(CryptoJS.enc.Utf8);
}


//funcion barra de carga
function frame(){
  if (width >= 100){
    clearInterval(id)
  }else{
    width++;
    barraCarga.style.width = width + "%";
  }
}





//pantalla de inicio
setTimeout(function(){
  document.getElementById("cargando").style.opacity = "0";
  document.getElementById("cargando").style.visibility = "hidden";
}, 1000)

//dialogo encriptacion
setTimeout(function(){
  inicioEncriptacion.style.display = "none";
}, 5000)

botonEncriptar.onclick = function(){
    var select = document.getElementById("encriptacion");
    var opcionSeleccionada = select.options[select.selectedIndex].value;
    let textoObtenido = ingresarTexto.value;
    if (textoObtenido != ""){
      if (opcionSeleccionada == "normal"){
        textAreaResultado.value = encriptar(textoObtenido, encriptacionNormal);
        imagen.style.display = "none"
        inicio = true;
        ingresarTexto.value = ""
      }else if (opcionSeleccionada == "avanzada") {
        textAreaResultado.value = encriptacionAvanzadaFuncion(textoObtenido, encriptacionAvanzada);
        imagen.style.display = "none"
        inicio = true;
        ingresarTexto.value = ""
      }else if (opcionSeleccionada == "superavanzada"){
        if (claveInput.value == ""){
          alert("Ingresa una clave para encriptar el texto.")
        }else{
          textAreaResultado.value = encriptarSuperAvanzadaFuncion(textoObtenido, claveInput.value);
          imagen.style.display = "none"
          inicio = true;
          ingresarTexto.value = "";
          claveInput.value = "";
        }
      }
    }else{
      noTexto.style.display = "block";
      setTimeout(function(){
        noTexto.style.display = "none";
      }, 3000);
    }
}
botonEncriptar.addEventListener("mouseover", function(){
    botonEncriptar.style.backgroundColor = color[1];
    botonEncriptar.style.color = "black";
});
botonEncriptar.addEventListener("mouseout", function(){
    botonEncriptar.style.backgroundColor = color[2];
    botonEncriptar.style.color = "";
});


botonDesencriptar.onclick = function(){
  var select = document.getElementById("encriptacion");
  var opcionSeleccionada = select.options[select.selectedIndex].value;
  var ingresarTexto = document.getElementById("ingresarTexto");
  var textoObtenido = ingresarTexto.value;
  if (textoObtenido != ""){
    if (opcionSeleccionada == "normal"){
      textAreaResultado.value = desencriptar(textoObtenido, encriptacionNormal);
      imagen.style.display = "none"
      inicio = true;
      ingresarTexto.value = ""
    }else if (opcionSeleccionada == "avanzada") {
      textAreaResultado.value = desencriptarAvanzadaFuncion(textoObtenido, desencriptarAvanzada);
      imagen.style.display = "none"
      inicio = true;
      ingresarTexto.value = ""
    }else if (opcionSeleccionada == "superavanzada"){
      textAreaResultado.value = desencriptarSuperAvanzadaFuncion(textoObtenido, claveInput.value);
      if(textAreaResultado.value == ""){
        alert("Clave incorrecta o texto mal introducido");
      }
      imagen.style.display = "none";
      inicio = true;
      ingresarTexto.value = "";
      claveInput.value = "";
    }
  }else{
    noTexto.style.display = "block";
    setTimeout(function(){
      noTexto.style.display = "none";
    }, 3000);
  }
}
botonDesencriptar.addEventListener("mouseover", function(){
  botonDesencriptar.style.backgroundColor = color[2];
  botonDesencriptar.style.color = "black";
});
botonDesencriptar.addEventListener("mouseout", function(){
  botonDesencriptar.style.backgroundColor = color[1];
  botonDesencriptar.style.color = "";
});

//borrar texto
botonBorrar.onclick = function(){
  botonBorrar.style.transform = "scale(1.1)";
  imagenBorrar.style.transform = "scale(1.1)";
  setTimeout((borrar) => {
    botonBorrar.style.transform = "scale(1.0)";
  imagenBorrar.style.transform = "scale(1.0)";
  }, 300);
  ingresarTexto.value = "";
}

botonCopiar.onclick = function(){
  if (inicio){
    textAreaResultado.select();
    document.execCommand("copy");
    textAreaResultado.setSelectionRange(0, 0);
    botonCopiar.style.backgroundColor = color[2];
    botonCopiar.style.color = "white";
    botonCopiar.textContent = "Texto copiado";
    setTimeout(function(){
      botonCopiar.style.backgroundColor = "";
      botonCopiar.style.color = "";
      botonCopiar.textContent = "Copiar";

    }, 2000)
  }
}

//Funciones para enviar el texto

botonEnviar.onclick = function(){
  enviarOpciones.style.display = "block";
  setTimeout(function(){
    enviarOpciones.style.display = "none";
  }, 10000)
}
botonWhatsapp.onclick = function(){
  var textoAenviar = textAreaResultado.value;
  window.open("https://wa.me/?text=" + encodeURIComponent(textoAenviar))
}
botonTelegram.onclick = function(){
  var textoAenviar = textAreaResultado.value;
  window.open("https://telegram.me/share/url?url=encriptador&text=" + encodeURIComponent(textoAenviar));
}

//Funciones de contacto

botonGithub.onclick = function(){
  window.open("https://github.com/AngelMonzon/Encriptador-de-texto")
}
botonPortafolio.onclick = function(){
  window.open("mi-portafolio.com")
}
botonLinkedin.onclick = function(){
  window.open("https://www.linkedin.com/in/adolfo-angel-monzon-hernandez-2b672a273/")
}