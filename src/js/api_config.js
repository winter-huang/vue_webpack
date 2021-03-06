/**
 * Created by hyd on 2017/11/18.
 */
const domain = 'http://vue.studyit.io/api';

export default {
    getCarousel: `${domain}/getlunbo`,//获取轮播图
    getNewsList: `${domain}/getnewslist`,//获取新闻列表
    getnewsDetails: `${domain}/getnew/`,//获取新闻详情
    getImgList: `${domain}/getimages/`,//获取图片列表
    getImgcategory: `${domain}/getimgcategory`,//获取图片分类
    getImgDetail: `${domain}/getthumimages/`,//获取图片详情
    getImgInfo: `${domain}/getimageInfo/`,//获取图片描述
    getComments: `${domain}/getcomments/`,//获取评论
    postComment: `${domain}/postcomment/`,//添加评论
    getGoodsList: `${domain}/getgoods?`,//商品列表
    getGoodsDetails: `${domain}/goods/getdesc/`,//商品描述
    getGoodsInfo: `${domain}/goods/getinfo/`,//商品参数
    getGoodsImages: `${domain}/getthumimages/`,//商品轮播图
    getBuyList: `${domain}/goods/getshopcarlist/`,//购物车列表
}