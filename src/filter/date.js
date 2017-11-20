/**
 * Created by hyd on 2017/11/20.
 */
export default function (time) {
    var date = new Date(time);
    return `${ date.getFullYear() }
            - ${ date.getMonth() - 0 + 1 > 9 ? date.getMonth() - 0 + 1 : '0' + (date.getMonth() - 0 + 1) }
            - ${ date.getDate() > 9 ? date.getDate() : '0' + date.getDate() }`;
}