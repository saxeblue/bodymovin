/**
 * Class: Selector
 * @classdesc - HTMLElement Information Class
 * @tutorial http://youmightnotneedjquery.com/
 */
import {Browser} from '../browser';


export class Selector{
     
    /**
     * width・heightの取得
     * paddingやborderの指定がある場合、widthに足した値が返る (box-sizing時にはwidth・heightに含まれる)
     * @static
     * @param {HTMLElement} _selector - HTML要素
     * @return {number} - 数値を返す
     */
    static getWidth(_selector:HTMLElement):number{
        return _selector.getBoundingClientRect().width;
    }
    
    static getHeight(_selector:HTMLElement):number{
        return _selector.getBoundingClientRect().height;
    }
    
    
    /**
     * 相対座標の取得(画面左上からの相対位置)
     * @static
     * @param {HTMLElement} _selector - HTML要素
     * @return {number} - 数値を返す
     */
    static getRelativeLeft(_selector:HTMLElement):number{
        return _selector.getBoundingClientRect().left;
    }
    
    static getRelativeTop(_selector:HTMLElement):number{
        return _selector.getBoundingClientRect().top;
    }
    
    static getRelativeRight(_selector:HTMLElement):number{
        return _selector.getBoundingClientRect().right;
    }
    
    static getRelativeBottom(_selector:HTMLElement):number{
        return _selector.getBoundingClientRect().bottom;
    }
    
    
    /**
     * 絶対座標の取得(bodyの左上からの絶対座標)
     * @static
     * @param {HTMLElement} _selector - HTML要素
     * @return {number} - 数値を返す
     */
    static getAbsoluteLeft(_selector:HTMLElement):number{
        return _selector.getBoundingClientRect().left + Browser.getScrollX();
    }
    
    static getAbsoluteTop(_selector:HTMLElement):number{
        return _selector.getBoundingClientRect().top + Browser.getScrollY();
    }
    
    static getAbsoluteRight(_selector:HTMLElement):number{
        return _selector.getBoundingClientRect().right + Browser.getScrollX();
    }
    
    static getAbsoluteBottom(_selector:HTMLElement):number{
        return _selector.getBoundingClientRect().bottom + Browser.getScrollY();
    }
    
    
    /**
     * CSSスタイルの取得
     * @static
     * @param {HTMLElement} _selector - HTML要素
     * @param {string} _prop - CSSプロパティの文字列
     * @return {string | number} - 文字列もしくは数値を返す
     */
    static getStyle(_selector:HTMLElement, _prop:string):string|number{
        return getComputedStyle(_selector, null)[_prop];
    }
    
    
    /**
     * 指定したCSSクラスの追加
     * @static
     * @param {HTMLElement} _selector - HTML要素
     * @param {string} _className - CSSクラス名の文字列
     */
    static addClass(_selector:HTMLElement, _className:string):void{

        if(_selector.classList){
            _selector.classList.add(_className);
        }
        else{
            _selector.className += ` ${_className}`;
        }
    }
    
    
    /**
     * 指定したCSSクラスの削除
     * @static
     * @param {HTMLElement} _selector - HTML要素
     * @param {string} _className - CSSクラス名の文字列
     */
    static removeClass(_selector:HTMLElement, _className:string):void{
        if(!Selector.hasClass(_selector, _className)) return;

        if(_selector.classList){
            _selector.classList.remove(_className);
        }
        else{
            _selector.className = _selector.className.replace(new RegExp(`(^|\\b)${_className.split(' ').join('|')}(\\b|$)`, 'gi'), ' ');
        }
    }
    
    
    /**
     * 指定したCSSクラスを持っているか
     * @static
     * @param {HTMLElement} _selector - HTML要素
     * @param {string} _className - CSSクラス名の文字列
     * @return {boolean} - 真偽値を返す
     */
    static hasClass(_selector:HTMLElement, _className:string):boolean{

        if(_selector.classList){
            return _selector.classList.contains(_className);
        }
        else{
            return new RegExp(`(^| )${_className}( |$)`, 'gi').test(_selector.className);
        }   
    }

    
    /**
     * HTML要素の削除
     * @static
     * @param {HTMLElement} _selector - HTML要素
     */
    static remove(_selector:HTMLElement):void{
        _selector.parentNode.removeChild(_selector);
    }
    
    
    /**
     * 指定したタグでwrapする
     * @param {HTMLElement} _selector - ターゲットとなるHTML要素
     * @param {string} _tagName - _selectorをラップするタグ。 ex) 'div', 'ul' ...
     * @return {HTMLElement} - ラップしたタグを返す
     */
    static wrap(_selector:HTMLElement, _tagName:string):HTMLElement{
        const next:Node = _selector.nextSibling;
        const parent:Node = _selector.parentNode;
        const $wrap:HTMLElement = document.createElement(_tagName);
        parent.removeChild(_selector);
        parent.insertBefore($wrap, next);
        $wrap.appendChild(_selector);
        return $wrap;
    }


    /**
     * 子要素を残して、指定した親要素を削除する
     * @param {HTMLElement} _selector - ターゲットとなる親要素
     */
    static unwrap(_selector:HTMLElement):void{

        while(_selector.firstChild){
            _selector.parentNode.insertBefore(_selector.firstChild, _selector);
        }

        Selector.remove(_selector);
    }
}