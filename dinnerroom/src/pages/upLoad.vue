<template>
  <div id="app">
    <div class = "helftableleft">
      <el-card shadow="always">
      <el-upload
        ref = "readExcel"
        accept=".xls,.xlsx"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit = "1"
        :on-change = "readExcel"
        :show-file-list="true"
        :auto-upload="false"
      >
      <el-button style="margin: 10px;" slot="trigger" size="small" type="primary">选取早/午/晚餐表</el-button>

      <el-button style="margin: 10px;" size="small" type="success" @click="btupload" icon = "el-icon-upload2">早/午/晚餐表上传</el-button>
      <!-- <el-button style="margin: 10px;" size="small" type="success" @click="btuploadother" icon = "el-icon-upload2">作为夜宵/其他表上传</el-button> -->
      <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="uploadlunch">这是午餐表</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="uploaddinner">这是晚餐表</el-button> -->
      </el-upload>
      <el-table
        :data="outdata"
        style="width: 95%"
      >
        <el-table-column
          label = "标题"
          style="width: 100%"
        >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
          </template>
      </el-table-column>
      </el-table>
      </el-card>
    </div>
    <!-- <br/> -->
    <div class = "helftableright">
      <el-card shadow="always">
      <el-upload
        ref = "readOtherExcel"
        accept=".xls,.xlsx"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit = "1"
        :on-change = "readOtherExcel"
        :show-file-list="true"
        :auto-upload="false"
      >
      <el-button style="margin: 10px;" slot="trigger" size="small" type="primary">选取夜宵表（或者其他表）</el-button>

      <el-button style="margin: 10px;" size="small" type="success" @click="btuploadother" icon = "el-icon-upload2">夜宵表（其它表）上传</el-button>
      </el-upload>
    <!-- <br/> -->
      <el-table
          :data="otheroutdata"
          style="width: 95%"
        >
          <el-table-column
            label = "标题"
            style="width: 100%"
          >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
            </template>
        </el-table-column>
        </el-table>
        </el-card>
      </div>
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
      outdata : [],
      otheroutdata:[]
    }
  },
    // created() {
    //   if (!this.$store.getters.islogin){
    //     this.$router.push('/Login')
    //   }
    // },
  methods:{

  upload(select,result){
    var _this = this;
    let obj = {
        date: result.title,
        table: result.sheet
    }
    this.axios.post('/save'+select,{
        tableInformation:obj
    }).then(response => {
        _this.$notify({
        message: result.title + '上传成功',
        type: 'success',
        position: 'top-left'
      })
    })
  },

  // uploadbf(result){
  //     this.upload('bf',result)
  // },
  // uploadlunch(result){
  //     this.upload('lunch',result)
  // },
  // uploaddinner(result){
  //     this.upload('dinner',result)
  // },

  btupload(){
    var temp = ['bf','lunch','dinner'];
    if (this.outdata.length == 0) {
      this.$message({
            message: '请选择文件',
            type: 'error'
        })
        return;
    }
    for (let i = 0; i<this.outdata.length; i++){
      //console.log(this.outdata[i].title[0])
      if (this.outdata[i].title.indexOf('早餐') != -1){
        this.upload('bf',this.outdata[i]);
      } 
      else if (this.outdata[i].title.indexOf('午餐') != -1){
        this.upload('lunch',this.outdata[i]);
      } 
      else if (this.outdata[i].title.indexOf('晚餐') != -1){
        this.upload('dinner',this.outdata[i]);
      } 
      else continue;
    }
    let x;
    let _this = this;
    for (x in temp){
    this.axios.post('/setcurrenttable',{
      currenttable:{name:temp[x], tableid:'',auto:0}}).then(
        response =>{
          _this.$notify({
        message: '设为自动',
        type: 'success',
        position: 'top-left'
        })
    })
    }
  },

  btuploadother(){
    if (this.otheroutdata.length == 0) {
      this.$message({
            message: '请选择文件',
            type: 'error'
        })
        return;
    }
    var _this = this;
    for (let i = 0; i<this.otheroutdata.length; i++){
        let obj = {
        date: this.otheroutdata[i].title,
        table: this.otheroutdata[i].sheet
        }
        this.axios.post('/saveothertable',{
            tableInformation:obj
        }).then(response => {
            _this.$notify({
            message: this.otheroutdata[i].title + '上传成功',
            type: 'success',
            position: 'top-left'
          })
        })
        this.axios.post('/setcurrenttable',{
          currenttable:{name:'othertable', tableid:'',auto:0}}).then(
            response =>{
              _this.$notify({
            message: '设为自动',
            type: 'success',
            position: 'top-left'
        })
    })
    }
  },

  readOtherExcel(file,fileList){
        var that = this;
        var files = {0:file.raw}
        if(files.length<=0){//如果没有文件名
            this.$message({
                message: '请选择文件',
                type: 'error'
            })
            //this.$message.error('请选择文件');
            return;
        }else if(!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())){
            this.$message({
                message: '上传格式不正确，请上传xls或者xlsx格式',
                type: 'error'
            })
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = (ev) => {
            try {
                const data = ev.target.result;
                const workbook = XLSX.read(data, {
                    type: 'binary'
                });
                const result = [];
                workbook.SheetNames.forEach((sheetName) => {
                  const ws = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName],{header:1});//生成json表格内容
                  if (ws[0].length=1){
                    var title = ws[0][0].replace(/^\s*|\s*$/g,"");
                    var line = 1;
                  }
                  else if (ws[0].length=5){
                    var title = "未命名表"
                    var line = 0
                  }
                  else return;

                  var obj=[]
                  for (let i = line+1 ;i<ws.length; i++){
                    var colobj = new Object();
                    for (let j= 0;j<ws[i].length;j++){
                      if (ws[line][j]&&ws){
                      switch(ws[line][j].replace(/^\s*|\s*$/g,"")){
                        case '星期一': {colobj.星期一 = ws[i][j];break;}
                        case '星期二': {colobj.星期二 = ws[i][j];break;}
                        case '星期三': {colobj.星期三 = ws[i][j];break;}
                        case '星期四': {colobj.星期四 = ws[i][j];break;}
                        case '星期五': {colobj.星期五 = ws[i][j];break;}
                        case '星期六': {colobj.星期六 = ws[i][j];break;} 
                        case '星期日': {colobj.星期日 = ws[i][j];break;}
                      }
                      }
                    }
                    obj.push(colobj)
                  }
                  result.push({
                    title : title,
                    sheet : obj
                  })
                })
                that.otheroutdata = result;

            } catch (e) {
              console.log(e)
              return false;
            }
        };
        fileReader.readAsBinaryString(files[0]);
  },

  readExcel(file,fileList) {//表格导入
        var that = this;
        var files = {0:file.raw}
        if(files.length<=0){//如果没有文件名
            this.$message({
                message: '请选择文件',
                type: 'error'
            })
            //this.$message.error('请选择文件');
            return;
        }else if(!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())){
            this.$message({
                message: '上传格式不正确，请上传xls或者xlsx格式',
                type: 'error'
            })
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = (ev) => {
            try {
                const data = ev.target.result;
                const workbook = XLSX.read(data, {
                    type: 'binary'
                });
                const result = [];
                workbook.SheetNames.forEach((sheetName) => {
                  const ws = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName],{header:1});//生成json表格内容
                  if (ws[0].length=1){
                    var title = ws[0][0].replace(/^\s*|\s*$/g,"");
                    if (title.indexOf("早餐")>=0||title.indexOf("午餐")>=0||title.indexOf("晚餐")>=0)
                      {var line = 1}
                    else return;
                  }
                  else if (ws[0].length=5){
                    var title = "未命名表"
                    var line = 0
                  }
                  else return;

                  var obj=[]
                  for (let i = line+1 ;i<ws.length; i++){
                    var colobj = new Object();
                    for (let j= 0;j<ws[i].length;j++){
                      if (ws[line][j]&&ws){
                      switch(ws[line][j].replace(/^\s*|\s*$/g,"")){
                        case '星期一': {colobj.星期一 = ws[i][j];break;}
                        case '星期二': {colobj.星期二 = ws[i][j];break;}
                        case '星期三': {colobj.星期三 = ws[i][j];break;}
                        case '星期四': {colobj.星期四 = ws[i][j];break;}
                        case '星期五': {colobj.星期五 = ws[i][j];break;}
                        case '星期六': {colobj.星期六 = ws[i][j];break;} 
                        case '星期日': {colobj.星期日 = ws[i][j];break;}
                      }
                      }
                    }
                    obj.push(colobj)
                  }
                  result.push({
                    title : title,
                    sheet : obj
                  })
                })
                that.outdata = result;

            } catch (e) {
              console.log(e)
              return false;
            }
        };
        fileReader.readAsBinaryString(files[0]);
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

.helftableright {
  float:left;
  width: 49%;
  padding-left: 1%;
}

.helftableleft {
  float:left;
  width: 49%;
  padding-right: 1%;
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