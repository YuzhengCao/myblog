<template>
    <div>
        <el-container style="border: 1px solid #eee">
        <el-aside width="250px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-openeds="['1']">
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-menu"></i>文章管理</template>
                <el-menu-item-group>
                <el-menu-item index="1-1"><i class="el-icon-edit-outline"></i>创建文章</el-menu-item>
                <el-menu-item index="1-2"><i class="iconfont icon">&#xe610;</i>文章列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2-1"><i class="iconfont icon">&#xe61b;</i>留言管理</el-menu-item>
            <el-menu-item index="2-1"><i class="el-icon-edit-outline"></i>评论管理</el-menu-item>
            <el-menu-item index="2-1"><i class="iconfont icon">&#xe639;</i>用户管理</el-menu-item>
            <el-menu-item index="2-1"><i class="iconfont icon">&#xe611;</i>便签分类</el-menu-item>
            <el-menu-item index="2-1"><i class="el-icon-setting"></i>系统设置</el-menu-item>
            </el-menu>
        </el-aside>

        <el-container>
            
            <el-header style="text-align: right; font-size: 12px">
            <el-dropdown style="height: 50px; cursor: pointer;" trigger="click" @command="handleCommand">
                <span><img src="../../assets/logo.gif" style="width: 40px; display: inline-block; border-radius: 5px; margin: 10px 0" />
                <i class="iconfont" style="font-size: 10px;">&#xe644;</i></span>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="index">首页</el-dropdown-item>
                <el-dropdown-item command="github">项目地址</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            </el-header>
            
            <el-main>
            <router-view></router-view>
            </el-main>
        </el-container>
        </el-container>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Index',
    data() {
      return {
        
      }
    },
    methods: {
        handleCommand (command) {
            if (command == 'logout') {
                axios.post('/admin/logout').then((res) => {
                    res = res.data
                    if (res.status == '0' && res.result) {
                        this.$store.commit('changeUser', {'userName': '', 'userPwd': '', 'userRole': ''})
                        this.$router.push('/login')
                    }
                })
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .el-header 
        background-color #B3C0D1
        color #333
        line-height 60px
    .icon 
        margin 0 7px 0 5px
        font-size 18px
        color rgb(144,147,153)
    .el-aside 
        color #333
        min-height 100%
        .el-menu
            width 249px
            position fixed
            overflow hidden
</style>

