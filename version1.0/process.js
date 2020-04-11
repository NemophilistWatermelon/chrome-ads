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

    const processAds = function (ads) {
        for (let i = 0; i < ads.length; i++) {
            const selector = ads[i];
            selector.style.backgroundColor = ''
            selector.style.outline = '12px dashed #ccc'
            selector.style.filter = 'blur(15px)'
        }
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