import http from "./request.js";
let path = {
  uploadFile:'common/upload',                                //上传图片
  delFile:'common/del_file',                                 //删除图片
}
export default {
  //上传图片
  uploadFile(params) {
    return http.post(path.uploadFile, params);
  },
  //删除图片
  delFile(params) {
    return http.post(path.delFile, params);
  },
};
