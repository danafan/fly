import http from "./request.js";
let path = {
  testLogin:'logintest',                        //测试登录
  getUserInfo:'userinfo',                       //获取用户信息
  gethbList:'hblist',                           //获取红包列表
  hbInfo:'hbinfo',                              //红包详情
  receiveOrder:'receiveorder',                  //领取红包
  addOrder:'addorder',                          //添加红包
  editOrder:'editorder',                        //编辑红包
  uploadFile:'fileupload',                      //上传图片
  delFile:'delfile',                            //删除图片
}
export default {
  //测试登录
  testLogin(params) {
    return http.get(path.testLogin, params);
  },
  //获取用户信息
  getUserInfo(params) {
    return http.get(path.getUserInfo, params);
  },
  //获取红包列表
  gethbList(params) {
    return http.get(path.gethbList, params);
  },
  //红包详情
  hbInfo(params) {
    return http.get(path.hbInfo, params);
  },
  //领取红包
  receiveOrder(params) {
    return http.get(path.receiveOrder, params);
  },
  //添加红包
  addOrder(params) {
    return http.post(path.addOrder, params);
  },
  //编辑红包
  editOrder(params) {
    return http.post(path.editOrder, params);
  },
  //上传图片
  uploadFile(params) {
    return http.post(path.uploadFile, params);
  },
  //删除图片
  delFile(params) {
    return http.post(path.delFile, params);
  },
};
