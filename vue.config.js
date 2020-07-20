module.exports = {
    lintOnSave: true,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 32, // 换算的基数
                        selectorBlackList: ['weui', 'mu', 'wh','quill','ql'], // 忽略转换正则匹配项
                        propList: ['*'],
                    }),
                ]
            }
        }
    },
    publicPath: './',
    configureWebpack: {
        externals: {
            "BMap": "BMap"
        }
    }
};