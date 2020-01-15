<template>
    <view>
        asdsa
    </view>
</template>

<script>
import Http from './plugins/request';

export default {
    created() {
        Http.request({
            url: '/test/get/200',
            method: 'get'
        }).then((res) => {
            console.log(res);
        });
    }
};
</script>
