// https://github.com/AlloyTeam/eslint-config-alloy
module.exports = {
    extends: ['alloy', 'alloy/typescript'],
    env: {
        // 这里填入你的项目用到的环境
        // 它们预定义了不同环境的全局变量，比如：
        //
        // browser: true,
        // node: true,
        // mocha: true,
        // jest: true,
        // jquery: true
        // 'jest/globals': true
    },
    globals: {
        // 这里填入你的项目需要的全局变量
        // false 表示这个全局变量不允许被重新赋值，比如：
        //
        // myGlobal: false
        uni: true
    },
    rules: {
        // 这里填入你的项目需要的个性化配置
        '@typescript-eslint/explicit-member-accessibility': 'off'
    }
};
