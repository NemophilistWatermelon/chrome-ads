(function () {
    'use strict';
    const es = function (sel) {
        return document.querySelectorAll(sel)
    }

    const e = function (sel) {
        return document.querySelector(sel)
    }

    const log = console.log.bind(console)

    const tool = function () {
        return {
            setFun(ele, sty) {
                for (const key in sty) {
                    var value = sty[key];
                    ele['style'][key] = value;
                    return;
                }

            }
        }
    }

    const setTitle = function (ele, fontObj) {
        var change = tool()
        return Array.from(ele).forEach(function (e) {
            change.setFun(e, fontObj)
        })

    }

    const resultTitleChange = function () {
        var baiduTitSel = es('.result > h3 > a')
        setTitle(baiduTitSel, {
            fontWeight: 'bold',
            fontSize: '20',
            color: "#ccc"
        })

    }

    const findResultCss = function (element) {

        // log(element.className.split('result'))
        if (element.className.split('result')[0] !== "") {
            return element;
        } else {
            return 0
        }
    }

    const adsFilter = function () {
        try {
            var leftContainer = e('#content_left')
            var result = []
            var selector = leftContainer.children
            var length = selector.length;
            for (let i = 0; i < length; i++) {
                const element = selector[i];
                var findItem = findResultCss(element)
                if (findItem !== 0) {
                    result.push(findItem)
                }
            }

            return processAds(result);
        } catch (error) {
            // throw error
        }

    }
    const processAds = function (ads, spretor) {
        for (let i = 0; i < ads.length; i++) {
            const selector = ads[i];
            selector.style.backgroundColor = ''
            selector.style.outline = '12px dashed #ccc'
            selector.style.filter = 'blur(15px)'
            // 取消所有广告元素的点击事件
            selector.onclick = function () {
                return false
            }
        }
        return createMoveBlur('.s_form', ads, spretor)

    }
    const createMoveBlur = function (className, ads, spretor) {

        if(!spretor) {
            var s = `
            <style>
                #id-move-ads {
                transform: translate(10px,6px);
                background-color: #4E6EF2;
                height: 44px;
                color: #fff;
                border-radius: 7px;
                border: none;
                transition: all .3s ;
                cursor: pointer;
                box-shadow: 0 0 0 0 transparent;
            }
             #id-move-ads:hover {
                transform: translate(10px, 20px);
                box-shadow: 0px 5px 10px 0px #959494;
             }
            </style>
        `
            var t = `<button id="id-move-ads" title="插件提供与百度无关">移除广告覆盖样式</button>`
            var o = {
                s,
                t,
            }
            for (const key in o) {
                log('o', o[key])
                e(className).innerHTML += o[key]
            }
        }
        return bindAction('#id-move-ads', ads)
    }
    const bindEvent = function (ele, event, func, isCapture=false) {
        return ele.addEventListener(event, func, isCapture)
    }
    const bindAction = function (ele, resultChange) {
        var click = false
        var len = resultChange.length
        const moveAdsClick = function(event) {
            if(!click) {
                for (var i = 0; i < len; i++) {
                    var selector = resultChange[i]
                    selector.style = ''
                }
                this.innerHTML = '再次点击还原'
                click = true
                this.remove()
            }
        }
        bindEvent(e(ele), 'click', moveAdsClick, false)
    }
    const _setBaiduResultMain = function () {
        resultTitleChange()
        adsFilter()
    }

    var hookXHRLoad = function (callback) {
        var open = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function () {
            this.addEventListener('load', function () {
                callback();
            });
            open.apply(this, arguments);
        };
    };

    _setBaiduResultMain();
    hookXHRLoad(function (xhr) {
        _setBaiduResultMain();

    });

})();
