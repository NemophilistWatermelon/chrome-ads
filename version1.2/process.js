(function() {
    'use strict';
    var isCreate = false
    const es = function(sel) {
        return document.querySelectorAll(sel)
    }

    const e = function(sel) {
        return document.querySelector(sel)
    }

    const log = console.log.bind(console)

    const tool = function() {
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

    const setTitle = function(ele, fontObj) {
        var change = tool()
        return Array.from(ele).forEach(function(e) {
            change.setFun(e, fontObj)
        })

    }

    const resultTitleChange = function() {
        var baiduTitSel = es('.result > h3 > a')
        setTitle(baiduTitSel, {
            fontWeight: 'bold',
            fontSize: '20',
            color: "#ccc"
        })

    }

    const findResultCss = function(element) {

        // log(element.className.split('result'))
        if (element.className.split('result')[0] !== "") {
            element.style.transition = 'filter .3s'
            return element;
        } else {
            return 0
        }
    }

    const adsFilter = function() {
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
    const processAds = function(ads, spretor) {
        for (let i = 0; i < ads.length; i++) {
            const selector = ads[i];
            selector.style.backgroundColor = ''
                // selector.style.outline = '12px dashed #ccc'
            selector.style.filter = 'blur(15px)'

            // 取消所有广告元素的点击事件
            selector.onclick = function() {
                return false
            }
        }
        return createMoveBlur('.s_form', ads)

    }
    const appendHTML = function(selector, html) {
        selector.insertAdjacentHTML('beforeend', html)
    }
    const moveButtonCreated = function(className) {
        var t = `
            <seciton id='id-filter-plugin'>
                <style>
                    #id-move-ads {
                        transform: translate3d(10px, 16px, 0);
                        background-color: #4E6EF2;
                        height: 38px;
                        color: #fff;
                        border-radius: 7px;
                        border: none;
                        transition: all .3s;
                        cursor: pointer;
                        box-shadow: 0 0 0 0 transparent;
                }
                    #id-move-ads:hover {
                      
                        box-shadow: 0px 5px 10px 0px #959494;
                    }
                </style>
                <button id = "id-move-ads">移除广告覆盖</button>
            </section>
        `;
        // TODO: 取消多次创建button
        var s_form = e(className)
        appendHTML(s_form, t)
        isCreate = true
        return bindAction('#id-move-ads', ads)
    }
    const createMoveBlur = function(className, ads) {

        if (!isCreate) {
            moveButtonCreated(className)
        }
        return bindAction('#id-move-ads', ads)
    }

    const bindEvent = function(ele, event, func, isCapture = false) {
        return ele.addEventListener(event, func, isCapture)
    }
    const bindAction = function(ele, resultChange) {
        var click = false
        var len = resultChange.length
        const moveAdsClick = function(event) {
            if (!click) {
                for (var i = 0; i < len; i++) {
                    var selector = resultChange[i]
                    selector.style = ''
                    selector.onclick = null
                }
                this.innerHTML = '再次点击还原'
                click = true
                this.remove()
            }
        }
        bindEvent(e(ele), 'click', moveAdsClick, false)
    }
    const __main = function() {
        resultTitleChange()

        adsFilter()
    }

    var hookXHRLoad = function(callback) {
        var open = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function() {
            this.addEventListener('load', function() {
                callback();
            });
            open.apply(this, arguments);
        };
    };

    __main();
    hookXHRLoad(function(xhr) {
        __main();

    });

})();