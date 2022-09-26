<template>
	<div class="add_edit_container">
		<div class="top_content">
			<div class="item_row display_style">
				<div class="lable">订单号</div>
				<div v-if="type == '2'">{{order_code}}</div>
				<input class="input" placeholder="请输入订单号" v-model="order_code" v-else>
			</div>
			<div class="item_row display_style">
				<div class="lable">姓名</div>
				<input class="input" placeholder="请输入姓名" v-model="name">
			</div>
			<div class="item_row display_style">
				<div class="lable">支付宝账号</div>
				<input class="input" placeholder="请输入支付宝账号" v-model="alipay_code">
			</div>
			<div class="item_row">
				<div class="lable">截图</div>
				<UploadFile :img_list="img_list" :type="type" :current_num="img_list.length" :max_num="1" @callbackFn="callbackFn"/>
			</div>
		</div>
		<div class="bottom_content">
			<div class="commit_button" @click="commitFn">提交</div>
		</div>
		<van-dialog v-model:show="show_dialog" :message="message_content" show-cancel-button confirm-button-color="#746FF3" @confirm="confirmFn">
		</van-dialog>
	</div>
</template>
<script>
	import resource from '../api/resource.js'

	import UploadFile from '../components/upload_file.vue'
	export default{
		data(){
			return{
				type:'',			//页面类型（1:添加；2:编辑）
				id:"",				//编辑的ID
				order_code:"",		//订单号
				name:"",			//姓名
				alipay_code:"",		//支付宝账号
				img_list:[],		//图片后缀数组
				show_dialog:false,
				message_content:"",	//提交提示内容
			}
		},
		created(){
			this.type = this.$route.query.type;
			this.id = this.type == '1'?'':this.$route.query.id;
			if(this.type == '2'){
				//获取红包详情
				this.hbInfo();
			}
		},
		methods:{
			//获取红包详情
			hbInfo(){
				let arg = {
					id:this.id
				}
				resource.hbInfo(arg).then(res => {
					let data = res.data.data;
					this.order_code = data.order_sn;
					this.name = data.alipay_name;
					this.alipay_code = data.alipay_account;
					let dd = {
						file_url:data.screenshot
					}
					this.img_list.push(dd);
				})
			},
			//监听图片变化
			callbackFn(v){
				this.img_list = v;
			},
			//点击提交
			commitFn(){
				if(this.type == '1' && this.order_code == ''){
					this.$toast('请输入订单号');
				}else if(this.name == ''){
					this.$toast('请输入姓名');
				}else if(this.alipay_code == ''){
					this.$toast('请输入支付宝账号');
				}else if(this.type == '1' && this.img_list.length == 0){
					this.$toast('请上传截图');
				}else{
					this.message_content = `是否确定所${this.type == '1'?'提交':'修改'}的内容?`;
					this.show_dialog = true;
				}
			},
			//确认提交
			confirmFn(){
				var arg = {
					alipay_name:this.name,
					alipay_account:this.alipay_code
				}
				if(this.type == '1'){
					arg.order_sn = this.order_code;
					arg.screenshot = this.img_list[0];
					resource.addOrder(arg).then(res => {
						this.$toast(res.data.msg);
						this.$router.go(-1);
					})
				}else{
					arg.id = this.id;
					resource.editOrder(arg).then(res => {
						this.$toast(res.data.msg);
						this.$router.go(-1);
					})
				}
			}
		},
		components:{
			UploadFile
		}
	}
</script>
<style lang="less" scoped>
.add_edit_container{
	background: #F4F6FA;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	.top_content{
		background: #ffffff;
		.item_row{
			border-bottom: 1px solid #E8E8E8;
			padding: 18px 15px;
			font-size: 15px;
			.lable{
				width: 90px;
				color: #333333;
				font-weight: 500;
			}
			.input{
				outline: none;
				border:none;
				flex:1;
			}
		}
		.display_style{
			display: flex;
		}
	}
	.bottom_content{
		background: #ffffff;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 76px;
		display: flex;
		align-items: center;
		justify-content: center;
		.commit_button{
			width: 308px;
			text-align: center;
			height: 44px;
			line-height: 44px;
			background: #746FF3;
			border-radius: 22px;
			font-size:14px;
			color: #ffffff;
			font-weight:500;
		}
	}
}
</style>