
import {Stage} from './display';


const stage:Stage = new Stage();


/**
 * 「戻る」のJavaScriptキャッシュを無効にする
 */
window.addEventListener('unload', ()=>{});
