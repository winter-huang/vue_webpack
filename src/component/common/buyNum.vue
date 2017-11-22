<template>
    <div class="mui-numbox">
        <button class="mui-btn mui-btn-numbox-minus" @click="getBuyNum(buyNum-1, id)">-</button>
        <input class="mui-input-numbox" type="number" v-model="buyNum" @blur="getInputNum">
        <button class="mui-btn mui-btn-numbox-plus" @click="getBuyNum(buyNum-0+1, id)">+</button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                buyNum: '',
                goodsData: JSON.parse(localStorage.getItem('goodsCart')) || {},
            }
        },
        props: ['buyN', 'id', 'stock'],
        methods: {
            getBuyNum(num, id){
                if (num < 0) {
                    return;
                }
                if (this.stock) {
                    if (num > this.stock) {
                        alert(`该商品库存不足，剩余${this.stock}件`);
                        return;
                    }
                }
                this.buyNum = num;

            },
            getGoodsNumById(){
                if (this.buyN || this.buyN == 0) {
                    this.buyNum = this.buyN;
                } else {
                    this.buyNum = this.goodsData[this.id][0];
                }
            },
            getInputNum(){
                if (this.stock) {
                    if (this.buyNum > this.stock) {
                        alert(`该商品库存不足，剩余${this.stock}件`);
                        this.buyNum = this.stock;
                    }
                }
            }
        },
        watch: {
            buyN(newV){
                if (!this.stock) {
                    this.buyNum = newV;
                }
            },
            buyNum(newV){
                this.$emit('change', newV - 0, this.id);
            }
        },
        created(){
            this.getGoodsNumById();
        }

    }

</script>