<template>
  <div id = "app">
    <el-card>
    <span class="tabletitle">{{title}}
    </span>
    <el-button type="primary" class="elbtn" size="small" @click="setauto" v-if = "auto == 1" round>自动根据日期选择表</el-button>
    <el-button type="primary" class="elbtn" size="small" @click="setnotauto" v-if = "auto == 0" round>手动根据日期选择表</el-button>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="表名"
        style="width: 100%">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if = "scope.row.id!=crbt && auto == 1"
            size="mini"
            @click="setcurrent(scope.$index, scope.row)">设为本周菜单</el-button>
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        crbt: -1,
        tableData: [],
        title:'',
        auto:0
      }
    },
    mounted(){
      //这段可以放在vuex中，但需要增加计算属性
      this.changeTable();
    },
    methods: {
      setcurrent(index,row){
        var _this = this;
        this.axios.post('/setcurrenttable',{
          currenttable:{name:this.$route.params.type, tableid:row.id, auto:1}}).then(response =>{
            _this.$notify({
              message: '更改成功',
              type: 'success',
              position: 'top-left'
            })
            _this.crbt = row.id;
          })
      },

      setauto(){
        var _this = this;
        this.auto = 0;
        this.axios.post('/setautoornot',{
          table:{name:this.$route.params.type, auto:0}
          }).then(
            response =>{
              _this.$notify({
              message: '设置成功',
              type: 'success',
              position: 'top-left'
            })
          })
      },

      setnotauto(){
        var _this = this;
        this.auto = 1;
        this.axios.post('/setautoornot',{
          table:{name:this.$route.params.type, auto:1}
          }).then(
            response =>{
              _this.$notify({
              message: '设置成功',
              type: 'success',
              position: 'top-left'
            })
          })
      },

      //这段可以放在vuex中，但需要增加计算属性
      changeTable:function(){
      let _this = this;
      var tid;
      switch(this.$route.params.type){
        case 'bf' : {this.title = "早餐表操作"; break;}
        case 'lunch' : {this.title = "午餐表操作"; break;}
        case 'dinner' : {this.title = "晚餐表操作"; break;}
        case 'othertable' : {this.title = "其他表操作"; break;}
      }
      this.axios.get('/getautoornot/' + this.$route.params.type).then(
        respones => {
          _this.auto = respones.data.auto
          console.log(_this.auto)
          if (_this.auto == 1){
          this.axios.get('/getcurrentid/'+this.$route.params.type).then(
            respones => {
              tid = respones.data.currenttable;
              _this.crbt = tid;
              _this.axios.get('/gettable/'+ _this.$route.params.type).then(
                respones => {
                  _this.tableData = [];
                  respones.data.forEach(table => {
                    _this.tableData.push({
                      title: table.date,
                      id: table._id
                    })
                  });
              },
              )
            })
          }
          else {
            this.axios.get('/gettable/'+ this.$route.params.type).then(
                respones => {
                  _this.tableData = [];
                  respones.data.forEach(table => {
                    _this.tableData.push({
                      title: table.date,
                      id: table._id
                    })
                  });
              })
          }
        }
      )
      
      },


      handleDelete(index, row) {
        var _this = this;
        this.axios.get('/getcurrentid/'+this.$route.params.type).then(
          respones => {
            if (respones.data.currenttable == row.id){
              this.$alert('该表正在使用，无法删除', '警告', {
              confirmButtonText: '确定'});
              return;
            }
            else {
            this.$confirm('删除'+row.title+'？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(()=>{
              // if (!this.$store.getters.islogin){
              //   this.$router.push('/Login');
              // }
              // else {
                _this.axios.post('/deletetable',{
                  table:{type:_this.$route.params.type, id:row.id}
                  }).then(response =>{
                    _this.$notify({
                      message: '删除成功',
                      type: 'success',
                      position: 'top-left'
                    })
                    _this.tableData.splice(index,1);
                  })
              // }
              })
            }
          })
      }   
    },
    computed: {
			listentype() {
				return this.$route.params.type;
      },
    },
    watch: {
      listentype(val, oldVal) {
        //console.log(val)
        if (val) {
          setTimeout(() => {
            this.changeTable();
          }, 200)
        }
        this.tags = val
      },
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
  align-self: center;
  justify-content: center;
  align-items: center;
}
/* 
.app-main{
  background: url("../assets/backgroundlunch.jpg")
} */

.tabletitle {
   font-weight: 600 ;
    color: #000000;
    display: flex;
    align-self: center;
    margin: auto;
    justify-content: center;
    align-items: center;
    max-width: 94%;
    font-size: 3rem;
    font-weight: 400;
}
.elbtn {
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