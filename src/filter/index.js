/**
 * Created by hyd on 2017/11/18.
 */

import DateFilter from '../filter/date.js';
export default {
    install(Vue){
        Vue.filter('date', DateFilter);
    }

}

//可以在这里定义date过滤器函数，然后暴露出去，
//也可以新建一个js文件定义date过滤器函数，然后在这里引入import DateFilter from '../filter/date.js';，然后暴露出去
// export default {
//     install(Vue){
//         Vue.filter('date', date);
//     }
//
// }
// function date(time) {
//     var date = new Date(time);
//     return `${ date.getFullYear() }
//             - ${ date.getMonth() - 0 + 1 > 9 ? date.getMonth() - 0 + 1 : '0' + (date.getMonth() - 0 + 1) }
//             - ${ date.getDate() > 9 ? date.getDate() : '0' + date.getDate() }`;
//
// }

