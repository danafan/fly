<template>
	<div class="index_container">
		<!-- 顶部背景 -->
		<div class="top_back">
			<img class="top_back_img" src="../static/top_back_img.png">
		</div>
		<!-- 底部背景 -->
		<div class="bottom_back"></div>
		<!-- 内容 -->
		<div class="index_content">
			<div class="user_info">
				<img class="user_img" :src="user_info.headimgurl">
				<div class="info_text">
					<div>{{user_info.nickname}}</div>
					<div>{{user_info.alipay_account}}</div>
				</div>
			</div>
			<div class="card_box display_style">
				<div class="add_title">添加订单</div>
				<div class="add_button" @click="addFn('1')">添加</div>
			</div>
			<div class="goods_list" v-if="listArray.length > 0">
				<div class="card_box margin_style" v-for="item in listArray">
					<div class="name_status">
						<div>姓名：{{item.alipay_name}}</div>
						<div class="status">{{item.record_status_name}}</div>
					</div>
					<div class="name_status">
						支付宝账号：{{item.alipay_account}}
					</div>
					<div class="name_status">
						订单号：{{item.order_sn}}
					</div>
					<div class="name_status">
						<div class="price_row">
							<div>红包金额：</div>
							<div class="price">
								<div class="p_icon">¥</div>
								<div class="p_value">{{item.amount}}</div>
							</div>
						</div>
					</div>
					<div class="name_status margin_none">
						<div class="by_price">（本金 ¥ {{item.principal}}  佣金 ¥ {{item.commission}}）</div>
						<div class="icon_row">
							<img class="status_icon" src="../static/get_icon.png" v-if="item.record_status == 2" @click="getPackage(item.amount,item.id)">
							<img class="status_icon cz" src="../static/edit_icon.png"  v-if="item.record_status == 0 || item.record_status == 2 || item.record_status == 5" @click="addFn('2',item.id)">
						</div>
						
					</div>
				</div>
			</div>
			<EmptyPage v-if="listArray.length == 0 && loading == false"></EmptyPage>
		</div>
		<!-- 领取弹窗 -->
		<div class="model_box" v-if="show_model">
			<div class="model">
				<img class="close_icon" src="../static/close_icon.png" @click="show_model = false">
				<div class="model_title">红包金额</div>
				<div class="money">{{money}}</div>
				<div class="commit_get" @click="commitGet">确认领取</div>
				<img class="red_package" src="../static/red_package.png">
			</div>
		</div>
	</div>
</template>
<script>
	import resource from '../api/resource.js'

	import EmptyPage from '../components/empty_page.vue'
	export default{
		data(){
			return{
				user_info:{},					//用户信息
				id:"",	
				money:"",
				listArray:[],					//列表
				loading:true,
				show_model:false,				//领取红包弹窗
			}
		},
		created(){
			//获取用户信息
			this.getUserInfo();
			//获取红包列表
			this.gethbList();
		},
		methods:{
			//获取用户信息
			getUserInfo(){
				resource.getUserInfo().then(res => {
					this.user_info = res.data.data;
				})
			},
			//获取红包列表
			gethbList(){
				resource.gethbList().then(res => {
					this.loading = false;
					this.listArray = res.data.data;
				})
			},
			//点击领取红包
			getPackage(amount,id){
				this.money = amount;
				this.id = id;
				this.show_model = true;
			},
			//确认领取
			commitGet(){
				let arg = {
					id:this.id
				}
				resource.receiveOrder(arg).then(res => {
					this.$toast(res.data.msg);
					this.show_model = false;
					//获取红包列表
					this.gethbList();
				})
			},
			//点击添加或编辑
			addFn(type,id){
				let login_shop = this.user_info.login_shop;
				let nickname = this.user_info.nickname;
				let alipay_account = this.user_info.alipay_account;
				if(type == '1'){
					this.$router.push(`/add_edit?store_name=${login_shop?login_shop.shop_name:'店铺错误'}&nickname=${nickname?nickname:''}&alipay_account=${alipay_account?alipay_account:''}&type=${type}`)
				}else{
					this.$router.push(`/add_edit?store_name=${login_shop?login_shop.shop_name:'店铺错误'}&nickname=${nickname?nickname:''}&alipay_account=${alipay_account?alipay_account:''}&type=${type}&id=${id}`)
				}
			}
		},
		components:{
			EmptyPage
		}
	}
</script>
<style lang="less" scoped>
.index_container{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	.top_back{
		position: relative;
		width: 100%;
		height: 290px;
		.top_back_img{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}
	.bottom_back{
		background: #F4F6FA;
		width: 100%;
		flex:1;
	}
	.index_content{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%; 
		display: flex;
		flex-direction: column;
		padding: 0 15px;
		.user_info{
			margin-bottom: 24px;
			margin-top: 40px;
			width: 100%;
			display: flex;
			.user_img{
				margin-right: 16px;
				border-radius: 31px;
				width: 62px;
				height: 62px;
			}
			.info_text{
				height: 62px;
				flex:1;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: space-evenly;
				font-size: 16px;
				color: #333333;
				font-weight: 500;
			}
		}
		.goods_list{
			margin-top: 20px;
			flex:1;
			overflow-y: scroll;
		}
		.card_box{
			width: 100%;
			background: #FFFFFF;
			box-shadow: 0px 0px 5px 0px #EBEBF5;
			border-radius: 13px;
			padding:15px;
			font-size:14px;
			color: #333333;
			.add_title{
				font-weight: 500;
			}
			.add_button{
				width: 78px;
				text-align: center;
				height: 32px;
				line-height: 32px;
				background: linear-gradient(90deg, #AEA9FF 0%, #746FF3 100%);
				box-shadow: 0px 2px 8px 0px #BEBBFF;
				border-radius: 16px;
				color: #ffffff;
				font-weight: 500;
			}
			.name_status{
				margin-bottom: 10px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.status{
					color: #746FF3;
				}
				.price_row{
					display: flex;
					.price{
						display: flex;
						color: #746FF3;
						.p_icon{
							position: relative;
							top: 3px;
							font-size:14px;
						}
						.p_value{
							font-size:18px;
							font-weight: 500;
						}
					}
				}
				.by_price{
					color: #746FF3;
				}
				.icon_row{
					display: flex;
					align-items: center;
					.status_icon{
						width: 28px;
						height: 28px;
					}
					.cz{
						margin-left: 20px;
					}
				}
				
			}
			.margin_none{
				margin: 0;
			}
		}
		.margin_style{
			margin-bottom: 10px;
		}
		.display_style{
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
	.model_box{
		background: rgba(0,0,0,.5);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.model{
			position: relative;
			width: 276px;
			height: 293px;
			.close_icon{
				position: absolute;
				top: -37px;
				right: -25px;
				width: 25px;
				height: 25px;
			}
			.model_title{
				position: absolute;
				top: 22px;
				left: 0;
				width: 100%;
				text-align: center;
				font-size:14px;
				color: #5A55FF;
				font-weight: 600;
				z-index: 9;
			}
			.money{
				position: absolute;
				top: 82px;
				left: 0;
				width: 100%;
				text-align: center;
				font-size:46px;
				color: #746FF3;
				font-weight: 600;
				z-index: 9;
			}
			.commit_get{
				position: absolute;
				bottom: 20px;
				left: 50%;
				transform: translate(-50%);
				width: 166px;
				text-align: center;
				height: 42px;
				line-height: 42px;
				background: #ECEBFF;
				border-radius: 21px;
				font-size:14px;
				color: #5A55FF;
				font-weight: 600;
				z-index: 9;
			}
			.red_package{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>