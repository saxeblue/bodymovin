/**
 * Class: Raf
 * @classdesc - RequestAnimationFrame & CancelAnimationFrame. need Modernizr.
 * @example
 * import {Raf} from '../utils/raf';
 * 
 * const raf:Function = Raf.render();
 * const craf:Function =  Raf.cancel();
 * 
 * let req:number;
 * update(){
 *  if(condition) req = raf(this.udate.bind(this));
 *  else craf(req);
 * }
 */
declare const Modernizr:any;

export default class Raf{
    
    /**
     * RequestAnimationFrame
     * @static
     * @return {Function} - requestAnimationFrame(未対応: setTimeout)を返す
     */
    static render():Function{
    	const millisec:number = 1000;
    	const frame:number = 60;
        return Modernizr.prefixed('requestAnimationFrame', window) || function(callback:Function):void{window.setTimeout(callback, millisec/frame);};
    }
    
    /**
     * CancelAnimationFrame
     * @static
     * @return {Function} - ccancelAnimationFrame(未対応: clearTimeout)を返す
     */
    static cancel():Function{
        return Modernizr.prefixed('cancelAnimationFrame', window) || function(id:number):void{window.clearTimeout(id);};
    }
}