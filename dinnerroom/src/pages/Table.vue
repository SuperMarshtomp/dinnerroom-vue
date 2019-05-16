<template>
  <div id="app">
    <el-card shadow="always">
    <span class = 'tabletitle' :style="{fontSize:wordsize+0.7+'rem'}">{{title}}
    </span>
    <el-button type="success" style="float:right" icon="el-icon-full-screen" @click="handleFullScreen" size="small" round>{{btntitle}}</el-button>
    <span v-if = "!fullscreen">
      <el-button icon="el-icon-coffee-cup" type="warning" @click="tobf" size="small" round>早餐</el-button>
      <el-button icon="el-icon-food" type="warning" @click="tolunch" size="small" round>午餐</el-button>
      <el-button icon="el-icon-tableware" type="warning" @click="todinner" size="small" round>晚餐</el-button>
    </span>
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
      
<!--       
    <el-button @click="bftable" slot="trigger" size="samll" type="primary">早餐</el-button>
    <el-button @click="lunchtable" slot="trigger" size="samll" type="primary">午餐</el-button>
    <el-button @click="dinnertable" slot="trigger" size="samll" type="primary">晚餐</el-button> -->
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
      time: -2,
      btntitle:'全屏播放',
      auto: 1,
      screenWidth: document.body.clientWidth,
      wordsize: 2,
      activeColor: '#000000',
      timer: false
    }
  },

  methods:{
    tobf(){
      this.$router.push('/table/bf')
    },
    tolunch(){
      this.$router.push('/table/lunch')
    },
    todinner(){
      this.$router.push('/table/dinner')
    },

    setTime(){
      let mydate = new Date();
      this.time = mydate.getHours();
      console.log(this.time);
      if (this.time<10){
        this.$router.push('/table/bf')
      }
      else if (this.time<14){
        this.$router.push('/table/lunch')
      }
      else if (this.time<24){
        this.$router.push('/table/dinner')
      }
    },

    changeTable(){
      let _this = this;
      var tid;
      this.outdata = [];
      this.title = '';
      var type = this.$route.params.type;
      this.$emit('backgroundimg',type);
      this.axios.get('/getautoornot/' + this.$route.params.type).then(
        respones => {
          _this.auto = respones.data.auto
          if (_this.auto == 1){
          _this.axios.get('/getcurrentid/'+_this.$route.params.type).then(
            respones => {
              tid = respones.data.currenttable
              _this.axios.get('/gettable',{
              params :{
                type:_this.$route.params.type, 
                id:tid}
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
            var i=0;
            _this.axios.get('/get'+_this.$route.params.type).then(
              respones => {
                for (;i<respones.data.length;i++){
                  let  temp = []
                  let newStr=respones.data[i].date.replace(/\d+/g, function () {
                      //调用方法时内部会产生 this 和 arguments
                      temp.push(arguments[0]);
                  });
                  if (_this.judgedate(temp[0],temp[1])) {
                    _this.title = respones.data[i].date;
                    _this.outdata = respones.data[i].table;
                    _this.axios.post('/setcurrenttable',{
          currenttable:{name:_this.$route.params.type, tableid:respones.data[i]._id, auto:0}})
                    break;
                  }
                }
            })
          }
        },
      err => {
        _this.title = '';
        _this.outdata = [];
        }
      )
    },

    errorchange(){
      var _this = this;
      this.$confirm('请先设置要用表', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(()=>{
                    _this.$router.push('/tableList/'+_this.$route.params.type)
                  })
    },

    judgedate(month,day){
      var date = new Date();
      for (let i=0;i<5;i++){
        if(month == (date.getMonth()+1)&& day == date.getDate())  return true;
        else date.setDate(date.getDate()-1)
      }
      return false;
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
    },
  },

  mounted(){
    if (this.$route.params.type){
      this.changeTable();
    }
    this.wordsize = this.screenWidth / 450;
    if (this.wordsize > 2.1){
      this.wordsize = 2.1
    }
    else if (this.wordsize < 1.5){
      this.wordsize = 1.5
    }
    let _this = this;
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
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        _this.screenWidth = window.screenWidth
      })()
    }
  },

  computed: {
			listentype() {
				return this.$route.params.type;
      },
      listentime(){
        if(this.fullscreen){
          return this.time;
        }
      },
      listentscreen(){
        return document.mozCancelFullScreen;
      }
    },
  watch: {
    listentype(val, oldVal) {
      if (val) {
        setTimeout(() => {
          this.changeTable();
        }, 200)
      }
      this.tags = val
    },
    listentime(val,oldval){
      if (val) {
        setTimeout(() => {
          this.setTime();
        },1000)
      }
    },
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
    font-weight: 600 ;
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
