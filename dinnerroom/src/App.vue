<template>
  <div id="wrapper">
    <vheader class="header" v-if = "hshow"></vheader>
    <div class="main">
      <transition name="fade" mode="out-in">
      <router-view class="main-wrapper" v-on:public_header = "public_header" v-on:backgroundimg = 'backgroundimg'></router-view>
      </transition>
    </div>
    <Vfooter class="footer" v-if = "hshow"></Vfooter>
  </div>

</template>
<script>
import Vheader from './components/Vheader'
import Vfooter from './components/Vfooter'

export default {
  name: 'app',
  data(){
    return {
      hshow: true,
      groundimg: 'backgroundimgbf'
    }
  },
  components: {
    Vheader,
  },
  methods:{
    public_header(bool){
      this.hshow = bool
    },
    backgroundimg(router){
      this.groundimg = 'backgroundimg'+router;
    }
  }
}
</script>

<style>
  html {
    font-size: 10px;
    height:100%;
  }

  body {
    -webkit-font-smoothing:antialiased;
    font-size: 1.6rem;
    margin: 0;
    padding: 0;
    font-family: -apple-system, "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", STHeiti, "Microsoft YaHei", "Microsoft JhengHei", "Source Han Sans SC", "Noto Sans CJK SC", "Source Han Sans CN", "Noto Sans SC", "Source Han Sans TC", "Noto Sans CJK TC", "WenQuanYi Micro Hei", SimSun, sans-serif;
    color: #404040;
    line-height: 1.7;
    height:100%;
  }

  #wrapper {
    display: flex;
    flex-flow: column;
    height:100%;
    /* background: url("./assets/background.jpg") */
  }

  .backgroundimgbf{
    background: url("./assets/backgroundbf.jpg")
  }

  .backgroundimglunch{
    background: url("./assets/backgroundlunch.jpg")
  }
  
  .backgroundimgdinner{
    background: url("./assets/backgrounddinner.jpg")
  }
  
  .backgroundimgtoday{
    background: url("./assets/backgroundtoday.jpg")
  }

  .backgroundimgother{
    background: url("./assets/backgroundother.jpg")
  }

  body a {
    text-decoration: none;
  }

  .nav a:link, a:visited {
    color: inherit;
  }

  body ul, li, p {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }

  .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .header, .footer {
    flex: 0 0 auto;
  }

  .main {
    flex: 1 0 auto;
    order: 1;
    display: flex;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.4);
  }

  .main-wrapper {
    width: 95%;
    max-width: 100rem;
    transition: all .4s;
  }

  .footer {
    order: 3;
    display: flex;
    height: 10rem;
  }

  @media screen and (max-width: 768px) {
    .main-wrapper {
      width: 100%;
    }

    .footer {
      height: 6rem;
    }
  }
</style>
