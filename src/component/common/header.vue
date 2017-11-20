<template>
    <header>
        <mt-header title="我的京东" fixed>
            <mt-button v-if="$route.path != '/index' " @click="$router.go(-1)"
                       icon="back" slot="left">返回</mt-button>
        </mt-header>
    </header>
</template>

<style>
    header{
        padding-bottom: 40px;
    }
    .mint-header-title{
        font-size: 18px;
    }
</style>