<template>
  <div>
    <ul :class="['nav', { 'nav-fixed': isTop, 'nav-invisible': !isVisible }]">
      <!-- <li>
        <router-link to="/about">关于</router-link>
      </li> -->
      <li>
        <router-link to="/explain">系统说明</router-link>
      </li>
      <li>
        <router-link to="/upload">上传餐表</router-link>
      </li>
      <li>
        <el-dropdown>
          <span class="downlist-top">
            餐表操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu class="downlist" slot="dropdown">
            <el-dropdown-item ><router-link to="/tableList/bf" >早餐表</router-link></el-dropdown-item>
            <el-dropdown-item ><router-link to="/tableList/lunch" >午餐表</router-link></el-dropdown-item>
            <el-dropdown-item ><router-link to="/tableList/dinner" >晚餐表</router-link></el-dropdown-item>
            <el-dropdown-item ><router-link to="/tableList/othertable" >其他表</router-link></el-dropdown-item>
            <!-- <el-dropdown-item >双皮奶</el-dropdown-item>
            <el-dropdown-item >蚵仔煎</el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>
      </li>
      <li>
        <el-dropdown>
          <span class="downlist-top">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu class="downlist" slot="dropdown">
            <el-dropdown-item ><router-link to="/todayTable" >今日餐表</router-link></el-dropdown-item>
            <el-dropdown-item ><router-link to="/table/bf" >本周早餐表</router-link></el-dropdown-item>
            <el-dropdown-item ><router-link to="/table/lunch" >本周午餐表</router-link></el-dropdown-item>
            <el-dropdown-item ><router-link to="/table/dinner" >本周晚餐表</router-link></el-dropdown-item>
            <el-dropdown-item ><router-link to="/otherTable" >其他表</router-link></el-dropdown-item>
            <!-- <el-dropdown-item >双皮奶</el-dropdown-item>
            <el-dropdown-item >蚵仔煎</el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>
      </li>
      <!-- <li>
        <router-link to="/signin">登录</router-link>
      </li> -->
    </ul>
  </div>
</template>

<script type="text/babel">

  export default {
    data () {
      return {
        show: true,
        nav: 'nav',
        isTop: true,
        isVisible: true,
      }
    },
    mounted () {
      this.scroll()
    },
    methods: {
      scroll () {
        let beforeScrollTop = document.body.scrollTop

        window.onscroll = () => {
          const afterScrollTop = document.body.scrollTop
          const delta = afterScrollTop - beforeScrollTop

          this.isTop = afterScrollTop === 0

          if (delta === 0) return false
          beforeScrollTop = afterScrollTop
          this.isVisible = delta <= 0
          if (afterScrollTop < 48) {
            this.isVisible = true
          }
        }
      }
    }
  }
</script>

<style scoped>

  .nav {
    position: fixed;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    transition: all .4s;
  }

  .nav-fixed {
    color: rgba(0, 0, 0, .8);
    background-color: rgba(253, 245, 230, 0.849);
    border-bottom: 1px solid #bababa;
    z-index:1
  }

  .nav-invisible {
    transform: translate(0, -4.8rem)
  }

  .nav a {
    font-size: 1.4rem;
    display: block;
    margin: 0;
    padding: 1.3rem 1.8rem;
    opacity: 1;
    transition: opacity 0.4s;
  }

  .nav a:hover {
    opacity: 0.7;
  }

  .downlist-top{
    font-size: 1.4rem;
    display: block;
    color: rgba(0, 0, 0, .8);
    margin: 0;
    padding: 12px 5px 0px 18px;
  }

  .downlist {
    font-size: 1.4rem;
    display: block;
    color: rgba(0, 0, 0, .8);
    /* padding: 1.2rem 1.8rem; */
  }

  .downlist a {
    font-size: 1.4rem;
    display: block;
    color: rgba(0, 0, 0, .8);
    margin: 0;
    opacity: 1;
    transition: opacity 0.4s;
  }

  .downlist a:hover {
    color: rgba(0, 174, 255, 0.8);
  }

  @media screen and (max-width: 768px) {
    /* .header-title h1 {
      font-size: 2.6rem;
    } */

    .nav-invisible {
      transform: translate(0, -4.4rem)
    }

    .nav a {
      font-size: 1.4rem;
      padding: 1rem 1.4rem;
    }

    /* .header, .header-background {
      height: 24rem;
    } */
  }
</style>
