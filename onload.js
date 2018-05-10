/* onload script para Opiniones en Vivo */
alldata = [];

window.onload = function() {

  /* Cargar tabla para Seccion START */
  afetch('alldata.json')
  .then(start => {
    alldata = start;
    //console.log('alldata is', alldata);

    Vue.component('in-text', {
        inheritAttrs: false,
        props: ['value','iclass'],
        template: `
          <label style='display: block;'>
            <span style='display:inline-block; width:15ch; text-align: right; padding:5px 15px;'>
            <slot></slot>
            </span>
            <input class='in-text'
              v-bind="$attrs"
              v-bind:value="value"
              v-on:input="$emit('input', $event.target.value)"
              :class="iclass"
            >
            <span v-if='value.length>150' class="aw-red">&nbsp; &#x26a0; </span>
          </label>`
    });

    Vue.component('in-mchoice', {
      inheritAttrs: false,
      props: {
        value: Object, 
        iclass: String
      },
      template: `<div>
        <in-text 
        :key='value.vname'
        v-model='value.valor'
        iclass='aqua'>
        <b>{{value.campo}}</b>
        </in-text>
        <br>
        <in-text 
            v-for='(i, index) in value.opt'
            :key='i.vname'
            v-model='i.valor'
            v-bind="$attrs"
        >
        {{i.campo}}
        </in-text><br></div>`,
      computed: {
        // `v-model` works by binding a `value` and then
        // listening for "input" events. When layering
        // multiple `v-model` components, you need to emit
        // those "input" events back up the chain.
        internalValue: {
          get() { return this.value },
          set(v) { this.$emit("input", v) }
        }
      }
    });

    console.log(alldata.s_start);

    vm_start = new Vue({
      el: '#s_start',
      data: alldata.s_start /* d_start*/
    });

    vm_demos = new Vue({
      el: '#content1',
      data: alldata.s_demos
    });

    vm_likerts = new Vue({
      el: '#content2',
      data: alldata.s_likerts
    });

    vm_mchoice = new Vue({
      el: '#content3',
      data: alldata.s_mchoice
    });

    vm_xvsy = new Vue({
      el: '#content4',
      data: alldata.s_xvsy
    });

    vm_open = new Vue({
      el: '#content5',
      data: alldata.s_open
    });

    vm_lanza = new Vue({
      el: '#content8',
      data: alldata
    });

    freebar = {
      l_start:0,      w_start:5,    c_start:'',
      l_demos:0,      w_demos:5,    c_demos:'',
      l_likerts:0,    w_likerts:5,  c_likerts:'',
      l_mchoice:0,    w_mchoice:5,  c_mchoice:'',
      l_xvsy:0,       w_xvsy:5,     c_xvsy:'',
      l_open:0,       w_open:5,     c_open:'',
      l_free:0, c_free:'',
      errmsg:''
    }
  
    vm_free = new Vue({
        el: '#freebar',
        data: freebar /* d_start*/
    });
  
  })
  .catch(error => errmsg('Error: '+ error));

  
  /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  /* init general                                                    */
  /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  timer = setInterval(libres, 200);


  /*-----------------------------------------------------------------*/
  /* Evitar F5                                                       */
  window.onbeforeunload = function() {
      return "Si no grabó los datos se perderán las modificaciones!";
  }

  changeTab(); //init class para freebar
} /* window.onload */
