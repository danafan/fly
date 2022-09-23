import Vue from 'vue'
import Router from 'vue-router'

const index = resolve=>System.import('@/pages/index')
const add_edit = resolve=>System.import('@/pages/add_edit')

Vue.use(Router);

const router = new Router({
	routes: [
	{path: '/index',name:"首页",component: index},
	{path: '/add_edit',name:"添加或编辑",component: add_edit},
	]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

export default router;
