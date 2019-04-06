import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home/Home'
import ArticleList from '../pages/article/ArticleList'
import Article from '../pages/article/Article'
import Message from '../pages/message/Message'
import Music from '../pages/music/Music'
import Pic from '../pages/pic/Pic'
import Login from '../pages/login/Login'
import Index from '../pages/admin/Index'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/articleList',
            name: 'ArticleList',
            component: ArticleList
        },
        {
            path: '/article/:id',
            name: 'Article',
            component: Article
        },
        {
            path: '/message/:page/:pageSize',
            name: 'Message',
            component: Message
        },
        {
            path: '/music',
            name: 'Music',
            component: Music
        },
        {
            path: '/pic',
            name: 'Pic',
            component: Pic
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/admin',
            name: 'Admin',
            component: Index,
            children: [
                {
                  path: 'create',
                  name: 'Create',
                  component: () => import('../pages/admin/pages/CreateArticle')
                }
            ]
        }
    ]
})
