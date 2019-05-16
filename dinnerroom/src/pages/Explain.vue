<template>
  <div id="explain_wrap">
    <el-card>
    <div align="center" style="padding-top:2%">
    <img src="../assets/logo.png"/>
    </div>
    <ol>
        <li>登录后才能上传excel表以及对excel表进行删除操作</li>
        <li>上传表后默认自动根据当前日期选择早午晚餐表，可在餐表操作中自行选择需要用的表</li>
        <li>其他表（夜宵表）默认显示最新一个，如需更改需手动替换</li>
        <li>excel表规范如下:</li>
    </ol>
    <img style="width:100%" src="../assets/explain.png"/>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'explain'
  }
</script>

<style>
  #explain_wrap {
    width: 100%;
    margin: auto;
    padding-top: 3%; 
    align-self: center;
    justify-content: center;
    align-items: center;
  }
  ol li{
        list-style-type:decimal;
        list-style-position:inside;
        padding-top:10px; 
    }

  .el-card {
    background: #f1f8eedd;
  }

</style>