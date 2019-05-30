/**
 * Class: Browser
 * @classdesc - Browser Information Class
 * @tutorial http://youmightnotneedjquery.com/
 */
export class Browser{
    

    
    /**
     * Browser取得
     * @static
     * @return {string} - 文字列を返す
     */
    static getBrowser():string{
        const agent:string = navigator.userAgent.toLowerCase();
        const appVersion:string = navigator.appVersion.toLowerCase();
        let browser:string = '';

        if(agent.indexOf('opera') != -1){browser = 'opera';}
        else if(agent.indexOf('edge') != -1){browser = 'edge';}
        else if(!!navigator.pointerEnabled){browser = 'ie11';}
        else if(!!navigator.msPointerEnabled){browser = 'ie10';}
        else if(agent.indexOf('msie') != -1){
            if(appVersion.indexOf("msie 6.") != -1){browser = 'ie6';}
            else if (appVersion.indexOf("msie 7.") != -1){browser = 'ie7';}
            else if (appVersion.indexOf("msie 8.") != -1){browser = 'ie8';}
            else if (appVersion.indexOf("msie 9.") != -1){browser = 'ie9';}
        }
        else if(agent.indexOf('edge') != -1){browser = 'edge';}
        else if(agent.indexOf('chrome') != -1){browser = 'chrome';}
        else if(agent.indexOf('safari') != -1){browser = 'safari';}
        else if(agent.indexOf('firefox') != -1){browser = 'firefox';}
        
        return browser;
    }
    
    
    /**
     * 表示領域の幅(= $(window).width() スクロールバー含まない)の取得
     * @static
     * @return {number} - 数値を返す
     */
    static getWidth():number{

        if(document.documentElement){
            return document.documentElement.clientWidth;
        }
        else if(document.body){
            return document.body.clientWidth;
        }
    }
    
    
    /**
     * 表示領域の高さ(= $(window).height() スクロールバー含まない)の取得
     * @static
     * @return {number} - 数値を返す
     */
    static getHeight():number{

        if(document.documentElement){
            return document.documentElement.clientHeight;
        }
        else if(window.innerHeight){
            return window.innerHeight;
        }
    }

    
    /**
     * ページ全体の高さの取得
     * @static
     * @return {number} - 数値を返す
     */
    static getPageHeight():number{
        return Math.max.apply(0, [document.body.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight]);
    }

    
    /**
     * スクロール量の取得
     * @static
     * @return {number} - 数値を返す
     */
    static getScrollX():number{
        return window.pageXOffset ? window.pageXOffset : 0;
    }

    static getScrollY():number{
        return window.pageYOffset ? window.pageYOffset : 0;
    }
    
    
    
}