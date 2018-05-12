/* Miscellaneous scripts para Opiniones en Vivo */


/***************************************************************************************/
/* Generador de sort URL y QRcode                                                      */
/*                                                                                     */
/* llama al webservice de is.gd para generar un shortURL                               */
/***************************************************************************************/
function call_isgd(url){
    if (url == undefined) {return;}
    var data_file = "https://is.gd/create.php?format=json&opt=0&url="+ url;

    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function(){
	    if (http_request.readyState == 4 ) {
            var shortJSON = JSON.parse(http_request.responseText); 
            alldata.shorturl = shortJSON.shorturl != undefined ? shortJSON.shorturl : 'Error: ' + shortJSON.errormessage;
            showQR();
	    }
    }
    http_request.open("GET", data_file, true);
    http_request.send();
}


/***************************************************************************************/
/* actualiza los elementos de shortURL y el QR code                                    */
/***************************************************************************************/
function showQR(msg) {

    msg = (msg == undefined) ? alldata.shorturl : msg;

    if (msg.indexOf('Error: ') == -1) {
        //document.getElementById("errmsg").innerHTML = '';
        reseterr();
        document.getElementById("shortURL").href = msg;
        document.getElementById("shortURL").innerHTML = msg;
        document.getElementById('QRcode').src = 'https://chart.googleapis.com/chart?chs=400x400&cht=qr&chld=Q|0&chl=' + encodeURIComponent(msg);
    } else {
        //document.getElementById("errmsg").innerHTML = '&nbsp;' + msg + '&nbsp;';
        freebar.errmsg = msg;
        document.getElementById("shortURL").href = '';
        document.getElementById("shortURL").innerHTML = '';
        document.getElementById('QRcode').src = '';
    }
}


/* rutina para grabar todos los datos en un JSON y poder luego recuperarlos */
function saveJSON() {
    var textToSave = JSON.stringify(alldata); /* document.getElementById("inputTextToSave").value; */
    var textToSaveAsBlob = new Blob([textToSave], {type:"application/json"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = 'Opiniones.json';   /* document.getElementById("inputFileNameToSaveAs").value; */
 
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = function(event) { document.body.removeChild(event.target); }
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
 
    downloadLink.click();
}


/* Rutina para leer el json y actualizar todos los datos */
/* viene invocado por evento oninput del boton 'LOAD'    */
function handleFiles(files) {

    if (typeof(files[0])=='object') {  // si se selecciono un file viene un 'BLOB'
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
            var textFromFileLoaded = fileLoadedEvent.target.result;
            if (textFromFileLoaded) {
                try {
                    newdata = JSON.parse(textFromFileLoaded);
                    if (isDataValid(newdata)) {
                        refresh_alldata(newdata);
                        if (alldata.shorturl.indexOf('Error: ')<0) {
                            showQR();
                        }
                    } else {
                        //signal error (alert)
                        errmsg("Archivo inválido!!! \n" + "Por favor elija uno exportado previamente por esta aplicación\n")
                    }
                } catch(e) {
                    alert(e); // error in the above string (in this case, yes)!
                }
            }
        };
        fileReader.readAsText(files[0], "UTF-8");

        document.getElementById("inputfn").value = ''; //reset del file select (sin esto no se dispara nuevamente el 'oninput' para el mismo file)
    }
}

/***************************************************************************************/
/* Valida que el JSON leido tenga todos los campos de 'alldata'                        */
/*                                                                                     */
/* Return.      true  = data compatible                                                */
/*              false = falta algun campo en newdata o es de otro tipo para misma key  */
/***************************************************************************************/
function isDataValid(newdata) {

    function traverse(ad, nd) {
        for (var i in ad) {
            if (typeof(ad[i]) != typeof(nd[i])) {
                console.log('Error de tipo-> key:'+i, typeof(ad[i]), typeof(nd[i]))   ;
                return false;
            }
            if (ad[i] !== null && typeof(ad[i])=='object') {
                if (!traverse(ad[i], nd[i])) return false;
            } 
        }
        return true;
    }

    return traverse(alldata, newdata);
}

/***************************************************************************************/
/* Copia data importada campo por campo ************************************************/
/* no queda otra que hacerlo asi para mantener la reactividad de vue                   */
/***************************************************************************************/
function refresh_alldata(newdata) {

    function traverse(ad, nd) {
        for (var i in ad) {
            if (ad[i] !== null && typeof(ad[i])=='object') {
                traverse(ad[i], nd[i]);
            } else {
                ad[i] = nd[i];  //copy nd into ad
            }
        }
    }

    traverse(alldata, newdata);
}



/* BOTON 'Next' ************************************************************************/
function nextTab() {
    var i = document.querySelector('input[name="tabs"]:checked').value;
    document.getElementById("tab"+i).checked = true;
    changeTab();
}

/* oculta freebar en solapa de lanzamiento *********************************************/
function changeTab() {
    var t = document.getElementById("tab8");
    if (t.checked) {
        document.getElementById("freebar").classList.remove("sticky-on");
    } else {
        document.getElementById("freebar").classList.add("sticky-on");
    }
}


function generarSesion() {
    var rn = new Date();

    alldata.sesion = rn.toISOString().replace(/[-:.Z]/g,'').replace('T', '-');
}

function lanzar() {
    if (freebar.l_free >= 0) {
        if (alldata.s_start.data[0].valor == '' ||
            alldata.s_start.data[1].valor == '' ||
            alldata.sesion == '') {
            errmsg('"Cliente", "Evento" y "Sesión"  NO pueden estar en blanco');
        } else {
            reseterr();
            call_isgd( encodeURIComponent(pls.longurl) );
        }
    } else {
        errmsg('No puede lanzar la encuesta por exceso de caracteres. El casillero "Libres" del indicador de ocupación debe ser positivo');
    }
}

function errmsg(msg) {
    alert(msg);
    freebar.errmsg = msg;
}

function reseterr() {
    freebar.errmsg = ' ';
}