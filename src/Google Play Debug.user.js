// ==UserScript==
// @name Google Play Debug
// @namespace https://github.com/catcto/google-play-debug
// @description Google Play Tools, APK Downloader, Get APP Info, Dev Info...
// @icon https://www.gstatic.com/android/market_images/web/favicon_v2.ico
// @homepage https://github.com/catcto/google-play-debug
// @supportURL https://github.com/catcto/google-play-debug/issues
// @version 0.3
// @author catcto
// @match https://play.google.com/store/*
// @license MIT
// @grant GM_xmlhttpRequest
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_deleteValue
// @grant GM_openInTab
// @grant GM_registerMenuCommand
// @require https://cdnjs.cloudflare.com/ajax/libs/ramda/0.25.0/ramda.min.js
// @run-at document-end
// ==/UserScript==

(function () {
    const DETAILS_REGEX = /https\:\/\/play\.google\.com\/store\/apps\/details\?id=/i;
    const DEVELOPER_REGEX = /https:\/\/play\.google\.com\/store\/apps\/dev\?id=/i;
    const COLLECTION_REGEX = /https:\/\/play\.google\.com\/store\/apps\/collection/i;

    const MAPPINGS_DETAILS = {
        title: ['ds:5', 0, 0, 0],
        description: {
            path: ['ds:5', 0, 10, 0, 1],
            fun: descriptionText,
        },
        descriptionHTML: ['ds:5', 0, 10, 0, 1],
        summary: ['ds:5', 0, 10, 1, 1],
        installs: ['ds:5', 0, 12, 9, 0],
        minInstalls: {
            path: ['ds:5', 0, 12, 9, 0],
            fun: cleanInt,
        },
        score: ['ds:6', 0, 6, 0, 1],
        scoreText: ['ds:6', 0, 6, 0, 0],
        ratings: ['ds:6', 0, 6, 2, 1],
        reviews: ['ds:6', 0, 6, 3, 1],
        histogram: {
            path: ['ds:6', 0, 6, 1],
            fun: buildHistogram,
        },

        price: {
            path: ['ds:3', 0, 2, 0, 0, 0, 1, 0, 0],
            fun: (val) => val / 1000000 || 0,
        },
        free: {
            path: ['ds:3', 0, 2, 0, 0, 0, 1, 0, 0],
            // considered free only if price is exactly zero
            fun: (val) => val === 0,
        },
        currency: ['ds:3', 0, 2, 0, 0, 0, 1, 0, 1],
        priceText: {
            path: ['ds:3', 0, 2, 0, 0, 0, 1, 0, 2],
            fun: priceText,
        },
        offersIAP: {
            path: ['ds:5', 0, 12, 12, 0],
            fun: Boolean,
        },
        IAPRange: ['ds:5', 0, 12, 12, 0],
        size: ['ds:8', 0],
        androidVersion: {
            path: ['ds:8', 2],
            fun: normalizeAndroidVersion,
        },
        androidVersionText: ['ds:8', 2],

        developer: ['ds:5', 0, 12, 5, 1],
        developerId: {
            path: ['ds:5', 0, 12, 5, 5, 4, 2],
            fun: (devUrl) => devUrl.split('id=')[1],
        },
        developerEmail: ['ds:5', 0, 12, 5, 2, 0],
        developerWebsite: ['ds:5', 0, 12, 5, 3, 5, 2],
        developerAddress: ['ds:5', 0, 12, 5, 4, 0],
        privacyPolicy: ['ds:5', 0, 12, 7, 2],
        developerInternalID: ['ds:5', 0, 12, 5, 0, 0],
        genre: ['ds:5', 0, 12, 13, 0, 0],
        genreId: ['ds:5', 0, 12, 13, 0, 2],
        familyGenre: ['ds:5', 0, 12, 13, 1, 0],
        familyGenreId: ['ds:5', 0, 12, 13, 1, 2],

        icon: ['ds:5', 0, 12, 1, 3, 2],
        headerImage: ['ds:5', 0, 12, 2, 3, 2],
        screenshots: {
            path: ['ds:5', 0, 12, 0],
            fun: R.map(R.path([3, 2])),
        },
        video: ['ds:5', 0, 12, 3, 0, 3, 2],
        videoImage: ['ds:5', 0, 12, 3, 1, 3, 2],

        contentRating: ['ds:5', 0, 12, 4, 0],
        contentRatingDescription: ['ds:5', 0, 12, 4, 2, 1],
        adSupported: {
            path: ['ds:5', 0, 12, 14, 0],
            fun: Boolean,
        },

        released: ['ds:5', 0, 12, 36],
        updated: {
            path: ['ds:5', 0, 12, 8, 0],
            fun: (ts) => ts * 1000,
        },

        version: ['ds:8', 1],
        recentChanges: ['ds:5', 0, 12, 6, 1],
        comments: {
            path: ['ds:15', 0],
            fun: extractComments,
        },

        pre_price: {
            path: ['ds:3', 0, 2, 0, 0, 0, 1, 1],
            fun: (val) => {
                if (val && Array.isArray(val)) {
                    return val[0] / 1000000 || 0;
                }
                return 0;
            },
        },
        inAppProducts: ['ds:5', 0, 12, 12, 0],
        interactiveElements: {
            path: ['ds:5', 0, 12, 4, 3, 1],
            fun: getInteractiveElements,
        },
        descriptionTranslation: ['ds:5', 0, 19, 0, 0, 1],
        descriptionShort: ['ds:5', 0, 10, 1, 1],
        banner: ['ds:5', 0, 12, 2, 3, 2],
        contentRatingArr: {
            path: ['ds:5', 0, 12, 4],
            fun: getContentRatingArr,
        },
        developerPage: {
            path: ['ds:5', 0, 12, 5, 5, 4, 2],
            fun: developerPage,
        },
    };

    const MAPPINGS_DETAILS_HK = {
        title: ['ds:4', 1, 2, 0, 0],
        description: {
            path: ['ds:4', 1, 2, 72, 0, 1],
            fun: descriptionText,
        },
        descriptionHTML: ['ds:4', 1, 2, 72, 0, 1],
        summary: ['ds:4', 1, 2, 73, 0, 1],
        installs: ['ds:4', 1, 2, 13, 0],
        minInstalls: {
            path: ['ds:4', 1, 2, 13, 0],
            fun: cleanInt,
        },
        score: ['ds:4', 1, 2, 51, 0, 1],
        scoreText: ['ds:4', 1, 2, 51, 0, 0],
        ratings: ['ds:4', 1, 2, 51, 2, 1],
        reviews: null,
        histogram: {
            path: ['ds:4', 1, 2, 51, 1],
            fun: buildHistogram,
        },
        price: {
            path: ['ds:5', 1, 1, 0, 21, 0, 5, 8, 1, 0, 0],
            fun: (val) => val / 1000000 || 0,
        },
        free: {
            path: ['ds:5', 1, 1, 0, 21, 0, 5, 8, 1, 0, 0],
            fun: (val) => val === 0,
        },
        currency: ['ds:5', 1, 1, 0, 21, 0, 5, 8, 1, 0, 1],
        priceText: {
            path: ['ds:5', 1, 1, 0, 21, 0, 5, 8, 1, 0, 2],
            fun: priceText,
        },
        offersIAP: {
            path: ['ds:4', 1, 2, 19, 0],
            fun: Boolean,
        },
        IAPRange: ['ds:4', 1, 2, 19, 0],
        size: null,
        androidVersion: ['ds:4', 1, 2, 140, 1, 1, 0, 0, 1],
        androidVersionText: ['ds:4', 1, 2, 140, 1, 1, 0, 0, 1],
        developer: ['ds:4', 1, 2, 68, 0],
        developerId: {
            path: ['ds:4', 1, 2, 68, 1, 4, 2],
            fun: (devUrl) => devUrl.split('id=')[1],
        },
        developerEmail: ['ds:4', 1, 2, 69, 1, 0],
        developerWebsite: ['ds:4', 1, 2, 69, 0, 5, 2],
        developerAddress: ['ds:4', 1, 2, 69, 2, 0],
        privacyPolicy: ['ds:4', 1, 2, 99, 0, 5, 2],
        developerInternalID: {
            path: ['ds:4', 1, 2, 68, 1, 4, 2],
            fun: (devUrl) => devUrl.split('id=')[1],
        },
        genre: ['ds:5', 1, 1, 0, 21, 0, 4, 5],
        genreId: ['ds:4', 1, 2, 79, 0, 0, 2],
        familyGenre: null,
        familyGenreId: null,
        icon: ['ds:4', 1, 2, 95, 0, 3, 2],
        headerImage: ['ds:4', 1, 2, 96, 0, 3, 2],
        screenshots: {
            path: ['ds:4', 1, 2, 78, 0],
            fun: R.map(R.path([3, 2])),
        },
        video: ['ds:4', 1, 2, 100, 0, 0, 3, 2],
        videoImage: ['ds:4', 1, 2, 100, 1, 0, 3, 2],
        contentRating: ['ds:4', 1, 2, 9, 0],
        contentRatingDescription: ['ds:4', 1, 2, 9, 2, 1],
        adSupported: null,
        released: ['ds:4', 1, 2, 10, 0],
        updated: {
            path: ['ds:4', 1, 2, 82, 2, 0],
            fun: (ts) => ts * 1000,
        },
        version: ['ds:4', 1, 2, 140, 0, 0, 0],
        recentChanges: ['ds:4', 1, 2, 82, 1, 1],
        comments: null,
        pre_price: null,
        inAppProducts: ['ds:4', 1, 2, 19, 0],
        interactiveElements: {
            path: ['ds:4', 1, 2, 9, 3, 1],
            fun: getInteractiveElements,
        },
        descriptionTranslation: null,
        descriptionShort: ['ds:4', 1, 2, 73, 0, 1],
        banner: ['ds:4', 1, 2, 96, 0, 3, 2],
        contentRatingArr: {
            path: ['ds:4', 1, 2, 9],
            fun: getContentRatingArr,
        },
        developerPage: {
            path: ['ds:4', 1, 2, 68, 1, 4, 2],
            fun: developerPage,
        },
        tags: {
            path: {
                ranking: ['ds:4', 1, 2, 58],
                genre: ['ds:4', 1, 2, 79],
                tag: ['ds:4', 1, 2, 118],
            },
            fun: getApkTags,
        },
    };

    const MAPPING_SIMILAR = {
        path: ['ds:7', 1, 1, 0, 0, 3, 4, 2],
    };

    const MAPPINGS_DEVELOPER = {
        name: ['ds:5', 0, 0, 0],
        banner: ['ds:5', 0, 9, 0, 3, 2],
        icon: ['ds:5', 0, 9, 1, 3, 2],
        website_url: ['ds:5', 0, 9, 2, 0, 5, 2],
        description: ['ds:5', 0, 10, 1, 1],
    };

    const MAPPINGS_COLLECTION = {
        title: [2],
        appId: [12, 0],
        url: {
            path: [9, 4, 2],
            fun: (path) => ('https://play.google.com' + path)
        },
        icon: [1, 1, 0, 3, 2],
        developer: [4, 0, 0, 0],
        developerId: {
            path: [4, 0, 0, 1, 4, 2],
            fun: extaractDeveloperId
        },
        priceText: {
            path: [7, 0, 3, 2, 1, 0, 2],
            fun: (price) => price === undefined ? 'FREE' : price
        },
        free: {
            path: [7, 0, 3, 2, 1, 0, 2],
            fun: (price) => price === undefined
        },
        summary: [4, 1, 1, 1, 1],
        scoreText: [6, 0, 2, 1, 0],
        score: [6, 0, 2, 1, 1]
    };
  
    const MAPPINGS_INIT = {
        apps: ['ds:3', 0, 1, 0, 0, 0],
        token: ['ds:3', 0, 1, 0, 0, 7, 1],
        categories: ['ds:3', 0, 1]
    };
  
    function extaractDeveloperId (link) {
        return link.split('?id=')[1];
    }

    function descriptionText(description) {
        return description.replace(/<br>/g, '\r\n');
    }

    function cleanInt(number) {
        number = number || '0';
        return parseInt(number);
    }

    function normalizeAndroidVersion(androidVersionText) {
        androidVersionText = androidVersionText || '';
        const number = androidVersionText.split(' ')[0];
        if (parseFloat(number)) {
            return number;
        }
        return 'VARY';
    }

    function buildHistogram(container) {
        if (!container) {
            return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        }
        return {
            1: container[1][1],
            2: container[2][1],
            3: container[3][1],
            4: container[4][1],
            5: container[5][1],
        };
    }

    function getContentRatingArr(arrList) {
        var content2 = R.path([2, 1], arrList);
        var contentRating = [R.path([0], arrList)];

        if (content2) {
            contentRating.push(content2);
        }
        return contentRating;
    }

    function priceText(priceText) {
        if (!priceText) {
            return 'Free';
        }
        return priceText;
    }

    function extractComments(comments) {
        if (!comments) {
            return [];
        }
        return R.compose(R.take(40), R.reject(R.isNil), R.pluck(4))(comments);
    }

    function developerPage(devUrl) {
        if (devUrl.split('id=')[1] && Number(devUrl.split('id=')[1])) {
            return true;
        }
        return false;
    }

    function getContentRating(arrList) {
        var content2 = R.path([2, 1], arrList);
        var contentRating = [R.path([0], arrList)];
        if (content2) {
            contentRating.push(content2);
        }
        return contentRating;
    }

    function getInteractiveElements(interactiveElementText) {
        if (!interactiveElementText) {
            return [];
        }
        interactiveElementText = interactiveElementText || '';
        var interactiveElementList = [];
        interactiveElementText.split(',').forEach(function (item) {
            item = item.trim();
            interactiveElementList.push(item);
        });
        return interactiveElementList;
    }

    function extractFields(parsedData, MAPPINGS) {
        return R.map((spec) => {
            if (!spec) return;

            if (R.is(Array, spec)) {
                return R.path(spec, parsedData);
            }

            if (R.is(Array, spec.path)) {
                // assume spec object
                const input = R.path(spec.path, parsedData);
                return spec.fun(input);
            }

            return spec.fun(spec.path, parsedData);
        }, MAPPINGS);
    }

    function matchScriptData(response) {
        const scriptRegex = />AF_initDataCallback[\s\S]*?<\/script/g;
        const keyRegex = /(ds:.*?)'/;
        const valueRegex = /data:([\s\S]*?), sideChannel: {}}\);<\//;

        return response.match(scriptRegex).reduce((accum, data) => {
            const keyMatch = data.match(keyRegex);
            const valueMatch = data.match(valueRegex);
            if (keyMatch && valueMatch) {
                const key = keyMatch[1];
                const value = JSON.parse(valueMatch[1]);
                return R.assoc(key, value, accum);
            }
            return accum;
        }, {});
    }

    function getTagName(data, result = []) {
        if (!data) return result;
        data.forEach(i => i && i.length === 4 && typeof i[0] === 'string' ? result.push(i[0]) : getTagName(i, result));
        return result;
    }

    function saveTagName(type, tag, tagRecord, result) {
        if (tagRecord[tag]) return;

        tagRecord[tag] = true;
        result.push({ type, tag });
    }

    function getApkTags(pathObj, parsedData) {
        const result = [];
        const tagRecord = {};

        for (const [key, path] of Object.entries(pathObj)) {
            const data = R.path(path, parsedData);

            if (data === null || data.length === 0) continue;

            switch (key) {
                case 'ranking': {
                    const tagName = `${data[2]} ${data[0]}`;
                    saveTagName(key, tagName, tagRecord, result);
                    break;
                }
                case 'genre': {
                    const tagName = R.path([0, 0, 0], data);
                    saveTagName(key, tagName, tagRecord, result);
                    break;
                }
                case 'tag': {
                    const tagNames = getTagName(data);
                    tagNames.forEach(i => saveTagName(key, i, tagRecord, result));
                    break;
                }
            }
        }

        return result;
    }

    function details() {
        let params = new URLSearchParams(location.search);
        if (DETAILS_REGEX.test(location.href)) {
            console.log('app package name', params.get('id'));
            let parsedData = matchScriptData(document.body.innerHTML);
            console.log(JSON.stringify(parsedData));
            if (params.get('gl') === 'HK') {
                let appData = extractFields(parsedData, MAPPINGS_DETAILS_HK);
                console.log('app info', JSON.stringify(appData));
            } else {
                let appData = extractFields(parsedData, MAPPINGS_DETAILS);
                let similarData = extractFields(parsedData, MAPPING_SIMILAR);
                console.log('app info', JSON.stringify(appData, null, 4));
                console.log('app similar url', similarData);
            }
        } else if (DEVELOPER_REGEX.test(location.href)) {
            console.log('developer id', params.get('id'));
            let parsedData = matchScriptData(document.body.innerHTML);
            let devData = extractFields(parsedData, MAPPINGS_DEVELOPER);
            console.log(JSON.stringify(parsedData));
            console.log('developer info', JSON.stringify(devData));
        }
    }

    function details() {
        let params = new URLSearchParams(location.search);
        if (DETAILS_REGEX.test(location.href)) {
            console.log('app package name 🔍', params.get('id'));
            let parsedData = matchScriptData(document.body.innerHTML);
            console.log('app ds 🔍', JSON.stringify(parsedData));
            if (params.get('gl') === 'HK') {
                let appData = extractFields(parsedData, MAPPINGS_DETAILS_HK);
                console.log('app parsed 🔍', JSON.stringify(appData));
            } else {
                let appData = extractFields(parsedData, MAPPINGS_DETAILS);
                let similarData = extractFields(parsedData, MAPPING_SIMILAR);
                console.log('app parsed 🔍', JSON.stringify(appData, null, 4));
                console.log('app similar url 🔍', similarData);
            }
        }
    }

    function developer() {
        let params = new URLSearchParams(location.search);
        if (DEVELOPER_REGEX.test(location.href)) {
            console.log('developer id 🔍', params.get('id'));
            let parsedData = matchScriptData(document.body.innerHTML);
            let devData = extractFields(parsedData, MAPPINGS_DEVELOPER);
            console.log('developer ds 🔍', JSON.stringify(parsedData));
            console.log('developer parsed 🔍', JSON.stringify(devData));
        }
    }

    function collection() {
        if (COLLECTION_REGEX.test(location.href)) {
            let parsedData = matchScriptData(document.body.innerHTML);
            let appsData = extractFields(parsedData, MAPPINGS_INIT);
            console.log('list apps ds 🔍', JSON.stringify(appsData.apps));
            if(appsData.apps.length > 0){
                let listData = [];
                appsData.apps.forEach(function(item){
                    listData.push(extractFields(item, MAPPINGS_COLLECTION));
                });
                console.log('list parsed 🔍', JSON.stringify(listData));
            }
        }
    }

    function init() {
        GM_registerMenuCommand("1. details parser", details);
        GM_registerMenuCommand("2. developer parser", developer);
        GM_registerMenuCommand("3. collection parser", collection);
    }

    init();
})();
