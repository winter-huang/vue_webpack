/**
 * Created by hyd on 2017/11/18.
 */
export default {
    //自定义时间过滤器
    methods: {
        myGetDate(){
            console.log(this);
            return this.filter('date', function (time) {
                var date = new Date(time);
                return `${ date.getFullYear() }
                        /${ date.getMonth() - 0 + 1 > 9 ? date.getMonth() - 0 + 1 : '0' + (date.getMonth() - 0 + 1) }
                        /${ date.getDate() > 9 ? date.getDate() : '0' + date.getDate() }
                        ${ date.getHours() > 9 ? date.getHours() : '0' + date.getHours() }
                        :${ date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes() }
                        :${ date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds() }`;
            });
        }

    }

}