/* Calculos de longitud de payload */

/* globals */
pls = {
    general     : '', _general     : '',
    demos       : '', _demos       : '',
    likerts     : '', _likerts     : '',
    mchoice     : '', _mchoice     : '',
    xvsy        : '', _xvsy        : '',
    open        : '', _open        : '',
    longurl     : ''
}

function pl_general() {

    for (i=0, pl=''; i< alldata.s_start.data.length; i++) {
        if (alldata.s_start.data[i].valor != '') {
            pl += '&' + alldata.s_start.data[i].vname + '=' + encodeURIComponent(alldata.s_start.data[i].valor);
        }
    }

    pls.general = alldata.baseurl +
                '&Sesion=' + encodeURIComponent(alldata.sesion) +
                '&AntDes=' + alldata.AntDes +
                pl;
    pls._general = pls.general.replace(/%20/g, "+"); //encodeURIComponent(pls.general).replace(/%20/g, "+");
    return pls._general;
}

function pl_demos() {
    var pl = '';
    var pmask = '';
    if (alldata.s_demos.qdemos > 0) {
        if (alldata.s_demos.data[0].valor != '') {
            pl = '&' + alldata.s_demos.data[0].vname + '=' + encodeURIComponent(alldata.s_demos.data[0].valor);
            pmask = '&D1M=';
            for (i=0; i < alldata.s_demos.demos1.length; i++) {
                if (alldata.s_demos.demos1[i].valor != '') {
                    pl += '&' + alldata.s_demos.demos1[i].vname + '=' + encodeURIComponent(alldata.s_demos.demos1[i].valor);
                    pmask += (i+1) + ';'
                }
            }
        }
        if (alldata.s_demos.qdemos == 2) {
            if (alldata.s_demos.data[1].valor != '') {
                pl += '&' + alldata.s_demos.data[1].vname + '=' + alldata.s_demos.data[1].valor;
                pmask += '&D2M=';
                for (i=0; i < alldata.s_demos.demos2.length; i++) {
                    if (alldata.s_demos.demos2[i].valor != '') {
                        pl += '&' + alldata.s_demos.demos2[i].vname + '=' + encodeURIComponent(alldata.s_demos.demos2[i].valor);
                        pmask += (i+1) + ';'
                    }
                }
            }
        }
    }
    pls.demos = pl + pmask;
    pls._demos = pls.demos.replace(/%20/g, '+'); //encodeURIComponent(pls.demos).replace(/%20/g, "+");

    return pls._demos;
}

function pl_likerts() {
    var pl = '';

    if (alldata.s_likerts.flikerts) {
        
        if (alldata.s_likerts.data1[0].valor != '') {
            pl += '&' + alldata.s_likerts.data1[0].vname + '=' + encodeURIComponent(alldata.s_likerts.data1[0].valor);  /* intro */
            pl += '&' + alldata.s_likerts.data1[1].vname + '=' + encodeURIComponent(alldata.s_likerts.data1[1].valor);  /* escala */
            pl += '&LM=1;2;3;4' + (alldata.s_likerts.f15 ? ';5' : '') + (alldata.s_likerts.fnsnc ? ';6'+alldata.labelNSNC : '');
            for (i=0; i < alldata.s_likerts.items1.length; i++) {
                if (alldata.s_likerts.items1[i].valor != '') {
                    pl += '&' + alldata.s_likerts.items1[i].vname + '=' + encodeURIComponent(alldata.s_likerts.items1[i].valor);
                }
            }
        }
        if (alldata.s_likerts.flikerts2) {
            if (alldata.s_likerts.data2[0].valor != '') {
                pl += '&' + alldata.s_likerts.data2[0].vname + '=' + encodeURIComponent(alldata.s_likerts.data2[0].valor);  /* intro 2da seccion */
                pl += '&KM=1;2;3;4' + (alldata.s_likerts.f15 ? ';5' : '') + (alldata.s_likerts.fnsnc ? ';6' : '')
                for (i=0; i < alldata.s_likerts.items2.length; i++) {
                    if (alldata.s_likerts.items2[i].valor != '') {
                        pl += '&' + alldata.s_likerts.items2[i].vname + '=' + encodeURIComponent(alldata.s_likerts.items2[i].valor);
                    }
                }
            }
        }
    }
    pls.likerts = pl
    pls._likerts = pls.likerts.replace(/%20/g, '+'); //encodeURIComponent(pls.likerts).replace(/%20/g, "+");

    return pls._likerts;
}

function pl_mchoice() {
    var pl = '';
    var pmask = '';

    if (alldata.s_mchoice.fmchoice) {
        if (alldata.s_mchoice.data[0].valor != '') {
            pl += '&' + alldata.s_mchoice.data[0].vname + '=' + encodeURIComponent(alldata.s_mchoice.data[0].valor);  /* intro */
            for (i=0; i < alldata.s_mchoice.items.length; i++) {
                if (alldata.s_mchoice.items[i].valor != '') {
                    pl += '&' + alldata.s_mchoice.items[i].vname + '=' + encodeURIComponent(alldata.s_mchoice.items[i].valor);
                    pmask += '&' + alldata.s_mchoice.items[i].vname + 'mask=';
                    for (j=0; j < + alldata.s_mchoice.items[i].opt.length; j++ ) {
                        if (alldata.s_mchoice.items[i].opt[j].valor != '') {
                            pl += '&' + alldata.s_mchoice.items[i].opt[j].vname + '=' + encodeURIComponent(alldata.s_mchoice.items[i].opt[j].valor);
                            pmask += (j+1) + ';';
                        }
                    }
                }
            }
        }
    }
    pls.mchoice = pl + pmask;
    pls._mchoice = pls.mchoice.replace(/%20/g, '+'); //encodeURIComponent(pls.mchoice).replace(/%20/g, "+");

    return pls._mchoice;
}

function pl_xvsy() {
    var pl = '';

    if (alldata.s_xvsy.fxvsy) {
        for (i=0; i < alldata.s_xvsy.data.length; i++) {
            if (alldata.s_xvsy.data[i].valor != '') {
                pl += '&' + alldata.s_xvsy.data[i].vname + '=' + encodeURIComponent(alldata.s_xvsy.data[i].valor);
            }
        }
        for (i=0; i < alldata.s_xvsy.items.length; i++) {
            if (alldata.s_xvsy.items[i].valor != '') {
                pl += '&' + alldata.s_xvsy.items[i].vname + '=' + encodeURIComponent(alldata.s_xvsy.items[i].valor);
            }
        }
    }
    pls.xvsy = pl
    pls._xvsy = pls.xvsy.replace(/%20/g, '+'); //encodeURIComponent(pls.xvsy).replace(/%20/g, "+");

    return pls._xvsy;
}

function pl_open() {
    var pl = '';

    if (alldata.s_open.fopen) {
        for (i=0; i < alldata.s_open.data.length; i++) {
            if (alldata.s_open.data[i].valor != '') {
                pl += '&' + alldata.s_open.data[i].vname + '=' + encodeURIComponent(alldata.s_open.data[i].valor);
            }
        }
        for (i=0; i < alldata.s_open.items.length; i++) {
            if (alldata.s_open.items[i].valor != '') {
                pl += '&' + alldata.s_open.items[i].vname + '=' + encodeURIComponent(alldata.s_open.items[i].valor);
            }
        }
    }
    pls.open = pl
    pls._open = pls.open.replace(/%20/g, '+'); //encodeURIComponent(pls.open).replace(/%20/g, "+");

    return pls._open;
}

function payload() {
    if (typeof(alldata.s_start) == 'undefined') return '';

    pls.longurl = pl_general() +
                  pl_demos() +
                  pl_likerts() +
                  pl_mchoice() +
                  pl_xvsy() +
                  pl_open();

    //pls.encpayload = encodeURIComponent(longurl); //.replace(/%20/g, "+");                  

    return pls.longurl;
}

function libres() {
    if (typeof(alldata.s_start) == 'undefined') return '';

    var t0 = performance.now();
    var wmax = 100;
    var div  = Math.max(2048, pls.longurl.length);

    payload();

    freebar.l_start     = pls._general.length;
    freebar.l_demos     = pls._demos.length;
    freebar.l_likerts   = pls._likerts.length;
    freebar.l_mchoice   = pls._mchoice.length;
    freebar.l_xvsy      = pls._xvsy.length;
    freebar.l_open      = pls._open.length;
    freebar.l_free      = 2048 - pls.longurl.length;

    freebar.c_free = freebar.l_free < 1 ? 'error' : freebar.l_free < 100 ? 'warn' : '';
/*    if (freebar.l_free < 100) {
        wmax = 95;
    }*/
    wmax -= (alldata.s_demos.qdemos > 0 && freebar.l_demos < 102 ? 7 : 0 ) +
            (alldata.s_likerts.flikerts && freebar.l_likerts < 102 ? 7 : 0 ) +
            (alldata.s_mchoice.fmchoice && freebar.l_mchoice < 102 ? 7 : 0 ) +
            (alldata.s_xvsy.fxvsy && freebar.l_xvsy < 102 ? 7 : 0 ) +
            (alldata.s_open && freebar.l_open < 102 ? 7 : 0);
/* console.log(wmax, div, pls.longurl.length);  */         
    freebar.w_start   = Math.max(Math.floor(freebar.l_start   * wmax / div),5);
    freebar.w_demos   = Math.max(Math.floor(freebar.l_demos   * wmax / div),5);
    freebar.w_likerts = Math.max(Math.floor(freebar.l_likerts * wmax / div),5);
    freebar.w_mchoice = Math.max(Math.floor(freebar.l_mchoice * wmax / div),5);
    freebar.w_xvsy    = Math.max(Math.floor(freebar.l_xvsy    * wmax / div),5);
    freebar.w_open    = Math.max(Math.floor(freebar.l_open    * wmax / div),5);

    freebar.c_demos   = alldata.s_demos.qdemos > 0  ? '' : 'off';
    freebar.c_likerts = alldata.s_likerts.flikerts  ? '' : 'off';
    freebar.c_mchoice = alldata.s_mchoice.fmchoice  ? '' : 'off';
    freebar.c_xvsy    = alldata.s_xvsy.fxvsy        ? '' : 'off';
    freebar.c_open    = alldata.s_open.fopen        ? '' : 'off';

    pltim = performance.now() - t0;
    return 2048 - pls.longurl.length;
}
