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
				<img class="user_img" src="../static/get_icon.png">
				<div class="info_text">
					<div>用户名称</div>
					<div>123123123123</div>
				</div>
			</div>
			<div class="card_box display_style">
				<div class="add_title">添加订单</div>
				<div class="add_button" @click="addFn('1')">添加</div>
			</div>
			<van-list v-model:loading="loading" :finished="finished" @load="loadMore" finished-text="没有更多了" class="goods_list" v-if="listArray.length > 0">
				<div class="card_box margin_style" v-for="item in listArray">
					<div class="name_status">
						<div>姓名：彪子</div>
						<div class="status">已拒绝</div>
					</div>
					<div class="name_status">
						支付宝账号：3123123123
					</div>
					<div class="name_status">
						订单号：3123123123
					</div>
					<div class="name_status">
						<div class="price_row">
							<div>红包金额：</div>
							<div class="price">
								<div class="p_icon">¥</div>
								<div class="p_value">78</div>
							</div>
						</div>
					</div>
					<div class="name_status margin_none">
						<div class="by_price">（本金 ¥ 44  佣金 ¥ 3）</div>
						<img class="status_icon" src="../static/get_icon.png" @click="getPackage">
						<img class="status_icon" src="../static/edit_icon.png" @click="addFn('2')">
					</div>
				</div>
			</van-list>
			<EmptyPage v-if="listArray.length == 0 && loading == false"></EmptyPage>
		</div>
		<!-- 领取弹窗 -->
		<div class="model_box" v-if="show_model">
			<div class="model">
				<img class="close_icon" src="../static/close_icon.png" @click="show_model = false">
				<div class="model_title">红包金额</div>
				<div class="money">58.88</div>
				<div class="commit_get" @click="commitGet">确认领取</div>
				<img class="red_package" src="../static/red_package.png">
			</div>
		</div>
	</div>
</template>
<script>
	import EmptyPage from '../components/empty_page.vue'
	export default{
		data(){
			return{
				listArray:[1,2,3,4,5,6,7],		//列表
				loading:false,
				finished:false,
				page:1,
				pagesize:10,
				show_model:false,				//领取红包弹窗
			}
		},
		methods:{
			//加载更多
			loadMore(){
				this.page += 1;
				//获取列表
				this.getGoodsList();
			},
			//获取列表
			getGoodsList(){
				let arg = {
					page:this.page,
					pagesize:this.pagesize
				}
				
			},
			//点击领取红包
			getPackage(){
				this.show_model = true;
			},
			//确认领取
			commitGet(){

			},
			//点击添加或编辑
			addFn(type){
				this.$router.push('/add_edit?type=' + type)
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
				.status_icon{
					width: 28px;
					height: 28px;
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