export function MP(ak) {

    return new Promise(function (resolve, reject) {
        window.init = function () {
            resolve(BMap)
        };
        // if (typeof BMap !== 'undefined') {
        //     resolve(BMap);
        //     return true
        // }
        // window.onload = function () {
        //     resolve(BMap);
        //     return true
        // };
        //
        // window.onBMapCallback = function () {
        //     console.log('百度地图脚本初始化成功...');
        //     resolve(BMap)
        // };

        let script = document.createElement("script");
        script.onerror = reject;
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src","http://api.map.baidu.com/api?v=2.0&ak=" + ak + "&callback=init");
        document.body.appendChild(script);

    })

}