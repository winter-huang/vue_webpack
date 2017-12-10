/**
 * Created by hyd on 2017/11/23.
 */
//这里导入vue可以使用vue的api
import Vue from 'vue';

export default {
    // 这个配置项就相当于咱们的data选项
    // 区别是这里的数据共享, 那都可以通过$store.state.属性名的方式使用
    state: {
        totalNum: JSON.parse(localStorage.getItem('goodsCart')) || {}
    },

    // 这个配置就相当于咱们的computed计算属性,
    // 如果有些状态取值的时候需要计算, 就在这里定义
    getters: {
        // 这个方法的第一个参数为vuex自动传入, 即state状态
        // 这个方法还有第二个参数也为vuex自动传入, 为getters自身
        getBuyTotal(state, getters){
            var sum = 0;
            for (var key in state.totalNum) {
                sum += state.totalNum[key][0] - 0;
            }
            return sum;
        }
    },

    // 这个配置想就相当于咱们的methods选项, 用于定义一些方法,
    // 但是这里的方法作用很明确就是为了修改状态值
    mutations: {
        // 这个方法的第一个参数为vuex自动传入, 即state状态
        // 这个方法的第二个参数为用户传入
        // 注意: 千万不要通过$store.state.buyTotal = newTotal这样方式修改值
        // 因为这样vuex无法捕获到数据的变化, 同时这个数据是共享的, 可能在任意地方被修改不利于维护
        // 如果调用这里方法修改数据, 不会混乱, 因为修改规则我都提取设计好了
        updateTotalNum(state, params){
            // state.totalNum[params.id] = [params.total, params.stock];
            //这里使用Vue自带的set方法修改对象值，否则Vue检测不到数据变化而不能触发数据更新,
            // 参数（1修改的对象、2对象的key、3对象的值）
            Vue.set(state.totalNum, params.id, [params.total, params.stock]);
            localStorage.setItem('goodsCart', JSON.stringify(state.totalNum));
        },
        delGoods(state, id){
            //这里使用Vue自带的delete方法修改对象值，否则Vue检测不到数据变化而不能触发数据更新，
            // 参数（1修改的对象，2可以单个数据，也可以为对象{传入多个数据}）
            Vue.delete(state.totalNum, id);
            localStorage.setItem('goodsCart', JSON.stringify(state.totalNum));
        }
    }

}