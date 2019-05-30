/**
 * @desc カスタムイベント クラス
 * @example
 * [イベントを送出する側(リサイズの場合)]
 *    rxResize.next({width:1200, height: 640});
 *
 * [イベントを受ける側(リサイズの場合)]
 * ▪︎ データをそのまま購読する場合
 *    rxResize.source.subscribe(res=>{ 
 *    	if(res==null) return;
 *    	購読処理のスクリプト
 *    });
 * ▪︎ フィルタリングや加工などをする場合
 *    rxResize.source.pipe(mapなどのoperator処理).subscribe(res=>{
 *    	if(res==null) return;
 *    	購読処理のスクリプト
 *    });
 */

import {RxEvent} from './RxEvent';



/**
 * リサイズのBehaviorSubject
 */
export interface RxResize_Data{
	width:number;
	height:number;
}

export const rxResize:RxEvent<RxResize_Data> = new RxEvent<RxResize_Data>();


/**
 * スクロールのBehaviorSubject
 */
export interface RxScroll_Data{
	x:number;
	y:number;
}

export const rxScroll:RxEvent<RxScroll_Data> = new RxEvent<RxScroll_Data>();


/**
 * メディアクエリ
 */
export interface RxBreakpoint_Data{
	bp:string;	// 'pc' or 'mobile'
}

export const rxBreakpoint:RxEvent<RxBreakpoint_Data> = new RxEvent<RxBreakpoint_Data>();

