<template>
	<div class="image_list">
		<div class="view_card_img" v-for="(item,index) in preview_images" :key="index">
			<van-image class="view_image" fit="contain" :src="item.file_url" @click="previewImg(index)"
			/>
			<img class="delete_icon" src="../static/delete_icon.png" @click="deleteFile(item.filename,index)" v-if="type == '1'">
		</div>
		<div class="upload_container" v-if="preview_images.length < max_num">
			<img class="upload_icon" src="../static/add_image.png">
			<input type="file" ref="imgUpload" class="upload_file" accept="image/*" multiple @change="uploadFn">
		</div>
		<van-image-preview v-model:show="showPreImg" :images="new_images" :start-position="activeIndex">
		</van-image-preview>
	</div>
</template>
<style lang="less" scoped>
.image_list {
	margin-top: 14px;
	display: flex;
	flex-wrap: wrap;
	.view_card_img {
		margin-right: 20px;
		margin-bottom: 20px;
		position: relative;
		width: 104px;
		height: 104px;
		.view_image{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
		.delete_icon{
			position: absolute;
			top: -8px;
			right: -8px;
			width: 16px;
			height: 16px;
		}
	}
	.upload_container{
		border:1px solid #E4E4E4;
		width: 104px;
		height: 104px;
		position: relative;
		display: flex;
		justify-content:center;
		align-items:center;
		.upload_icon{
			width: 28px;
			height: 24px;
		}
		.upload_file {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
		}
	}
}
</style>
<script>
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				preview_images:[],		//当前的图片列表
				showPreImg:false,		//
				new_images:[],			//预览的图片列表
				activeIndex:0,			//预览的当前下标
			}
		},
		props:{
			//1:添加；2:编辑
			type:{
				type:String,
				default:''
			},
			img_list:{
				type:Array,
				default:[]
			},
			//多选已上传的数量
			current_num:{
				type:Number,
				default:0
			},
			//多选最多上传的数量
			max_num:{
				type:Number,
				default:1
			}
		},
		created(){
			this.preview_images = this.img_list;
			// if(this.type == '2'){
			// 	console.log(this.preview_images[0].file_url)
			// 	this.new_images.push(this.preview_images[0].file_url);
			// }
		},
		methods:{
			// 上传图片
			uploadFn(){
				if (this.$refs.imgUpload.files.length > 0) {
					let files = this.$refs.imgUpload.files;
					if(this.current_num + this.$refs.imgUpload.files.length > this.max_num){
						this.$refs.imgUpload.value = null;
						this.$toast(`图片最多不超过${this.max_num}张`);
						return;
					}
					for(var i = 0;i < files.length;i ++){
						let arg = {
							file:files[i]
						}
						resource.uploadFile(arg).then(res => {
							this.$refs.imgUpload.value = null;
							let file = res.data;
							this.preview_images.push(file);
							//向父组件传递已选的图片列表
							this.emitFn();
						})
					}
				}
			},
    		//删除文件
    		deleteFile(url, index) {
    			let arg = {
    				filename: url,
    			};
    			resource.delFile(arg).then((res) => {
    				this.preview_images.splice(index, 1);
    				//向父组件传递已选的图片列表
    				this.emitFn();
    			});
    		},
    		//点击预览
    		previewImg(index){
    			this.activeIndex = index;
    			this.showPreImg = this.type == '1'?true:false;
    		},
    		//向父组件传递已选的图片列表
    		emitFn(){
    			let image_arr = [];
    			let new_images = []
    			this.preview_images.map(item => {
    				image_arr.push(item.filename);
    				new_images.push(item.file_url);
    			})
    			this.new_images = new_images;
    			this.$emit('callbackFn',image_arr);
    		}
    	}
    }
</script>