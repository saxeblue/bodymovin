/**
 * Class: System
 * @classdesc - Get System Information
 */
export class System{


    /**
     * OSの取得
     * @static
     * @return {string} - OSを文字列で返す
     */
    static getOS():string{
        const agent:string = navigator.userAgent.toLowerCase();

        if(agent.search('iphone')>0 || agent.search('ipad')>0 || agent.search('ipod')>0){
            return 'ios';
        }
        else if(agent.search('android')>0){
            return 'android';
        }
        else if(agent.indexOf('windows') >= 0){
            return 'windows';
        }
        else if(agent.indexOf('mac') >= 0){
            return 'mac';
        }
        else if(agent.indexOf('linux') >= 0){
            return 'linux';
        }
        else{
            return 'unknown';
        }
    }


    /**
     * モバイルかどうか
     */
    static isMobile():boolean{

        if(System.getOS()=='ios' || System.getOS()=='android'){
            return true;
        }
        else{
            return false;
        }
    }
    

    /**
     * Androidのバージョン取得
     * @static
     * @return {number} - (マイナーバージョンを含めた)バージョンを数値で返す
     */
    static getAndroidVer():number{
        const agent:string = navigator.userAgent.toLowerCase();

        if(agent.indexOf('android') > 0){
            const ver:number = parseFloat(agent.slice(agent.indexOf("android")+8));
            return ver;
        }
    }


    /**
     * Android標準ブラウザの判定
     * @return {boolean} - 標準ブラウザの場合、trueを返す
     */
    static isAndDefaultBrowser():boolean{
        const agent:string = navigator.userAgent.toLowerCase();

        if((/android/.test(agent) && /linux; u;/.test(agent) && !/chrome/.test(agent)) || 
            (/android/.test(agent) && /chrome/.test(agent) && /version/.test(agent)) ||
            (/android/.test(agent) && /chrome/.test(agent) && /samsungbrowser/.test(agent))){
            return true;
        }

        return false;
    }


    /**
     * iOSのバージョン取得
     * @static
     * @return {number} - (マイナーバージョンを含めた)バージョンを数値で返す
     */
    static getiOSVer():number{

        if(/iP(hone|od|ad)/.test(navigator.platform)){
            const datas:string[] = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            const ver:number = parseFloat(`${datas[1]}.${datas[2]}`);
            return ver;
        }
    }


    /**
     * ブラウザの言語を取得
     * @static
     * @return {string} - 文字列を返す
     */
    static getLanguage():string{
        return navigator.languages[0];
    }

}