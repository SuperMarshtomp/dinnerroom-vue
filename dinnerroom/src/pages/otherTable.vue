<template>
  <div id="app">
    <el-card shadow="always">
    <span class = 'tabletitle' :style="{fontSize:wordsize+0.7+'rem'}">{{title}}
    </span>
    <el-button type="success" style="float:right" icon="el-icon-full-screen" @click="handleFullScreen" size="small" round>{{btntitle}}</el-button>
    <el-table
        :data="outdata"
        :style="{ color: activeColor, fontSize: wordsize + 'rem' }"
        size = "medium"
      >
        <el-table-column
          v-for="(item,key,index) in outdata[0]"
          :key="index"
          :prop="key"
          :label="key"
          align="center"
          style="width: 100%"
        >
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  props: {
    msg: String
  },
  data(){
    return {
      title:'',
      outdata : [],
      fullscreen: false,
      btntitle:'全屏',
      auto: 1,
      screenWidth: document.body.clientWidth,
      wordsize: 2,
      activeColor: '#000000',
      timer: false
    }
  },
  methods:{
    errorchange(){
      var _this = this;
      this.$confirm('请先设置要用表', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(()=>{
                    _this.$router.push('/tableList/othertable')
                  })
    },

    handleFullScreen(){
      let element = document.documentElement;
      if (this.fullscreen) {
          if (document.exitFullscreen) {
              document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
              document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
          }
      } else {
          this.time = -1;
          this.$emit('public_header', false);
          this.btntitle = "退出全屏"
          if (element.requestFullscreen) {
              element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
              element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
              element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
              // IE11
              element.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen;
      },

    outFullScreen(){
      this.$emit('public_header', true);
      this.fullscreen = false;
      this.btntitle = "全屏"
    }
  },
  mounted(){
    var _this = this;
    this.$emit('backgroundimg','other');
    this.wordsize = this.screenWidth / 450;
    if (this.wordsize > 2.1){
      this.wordsize = 2.1
    }
    else if (this.wordsize < 1.5){
      this.wordsize = 1.5
    }
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        _this.screenWidth = window.screenWidth
      })()
    }
    this.axios.get('/getautoornot/othertable').then(
    respones => {
        _this.auto = respones.data.auto
        if (_this.auto == 1){
        _this.axios.get('/getcurrentid/othertable').then(
            respones => {
              _this.axios.get('/gettable',{
              params :{
                type:'othertable', 
                id:respones.data.currenttable}
                }).then(
                respones => { 
                  _this.outdata = respones.data.table
                  _this.title = respones.data.date
                },
                err => {
                  _this.errorchange();
                }
              )
          })
        }
        else {
            _this.axios.get('/getothertable').then(
              respones => {
                _this.title = respones.data[0].date;
                _this.outdata = respones.data[0].table;
              })
        }
    },
    err => {
        _this.title = '';
        _this.outdata = [];
    }
    )
    document.addEventListener("fullscreenchange", function(e) {
      var isFull = document.fullscreenElement||false
      if (!isFull) _this.outFullScreen()
    });
    document.addEventListener("mozfullscreenchange", function(e) {
      var isFull = document.mozfullscreenElement||false
      if (!isFull) _this.outFullScreen()
    });
    document.addEventListener("webkitfullscreenchange", function(e) {
      var isFull = document.webkitfullscreenElement||false
      if (!isFull) _this.outFullScreen()
    });
    document.addEventListener("msfullscreenchange", function(e) {
      var isFull = document.msfullscreenElement||false
      if (!isFull) _this.outFullScreen()
    });
  },

  computed: {
      listentscreen(){
        return document.mozCancelFullScreen;
      }
    },
  watch: {
    listentscreen(val,oldval){
      this.fullscreen = !this.fullscreen;
      this.$emit('public_header', true);
    },
    screenWidth (val) {
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        if (!this.timer) {
          // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
          this.screenWidth = val
          this.wordsize = this.screenWidth / 450;
          if (this.wordsize > 2.1){
            this.wordsize = 2.1
          }
          else if (this.wordsize < 1.5){
            this.wordsize = 1.5
          }
          this.timer = true
          let that = this
          setTimeout(function () {
            // 打印screenWidth变化的值
            console.log(that.screenWidth)
            that.timer = false
          }, 400)
        }
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  align-self: center;
  justify-content: center;
  align-items: center;
}

.tabletitle {
    color: #000000;
    display: flex;
    align-self: center;
    margin: auto;
    justify-content: center;
    align-items: center;
    max-width: 94%;
    font-weight: 600;
}

.screenbtn {
    float: right;
}

.el-card {
  background: #f1f8eedd;
}

.el-table, .el-table__expanded-cell {
    background-color: transparent;
}

.el-table th, .el-table tr {
    background-color: transparent;
}

</style>
