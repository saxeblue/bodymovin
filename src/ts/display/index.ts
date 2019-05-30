/**
 * class: AppRoot
 * @classdesc 表示クラスのrootになるclass
 */
import {FrontPage} from './front';
import {rxResize, rxScroll, rxBreakpoint, RxResize_Data, RxScroll_Data, RxBreakpoint_Data} from '../events';


export class Stage{

	/**
	 * BreakPoint
	 */
	private BREAK_POINT_PC:string = 'only screen and (min-width: 769px)';


	/**
	 * ページのインスタンス
	 */
	private page:any;



	constructor(){
		this.setEvent();
		this.createPage();
	}


	/**
	 * ページを生成する
	 * 生成するページは、bodyにつけたIDで判定
	 */
	private createPage():void{
		const $body:HTMLElement = document.body || document.documentElement;
		const pageID:string = $body.getAttribute('id');
		
		// ページに応じたインスタンスを生成する
		if(pageID == 'index') this.page = new FrontPage();
	}


	/**
	 * イベントハンドラ
	 */
	private setEvent():void{
		this.onResize();
		window.addEventListener('resize', this.onResize.bind(this));

		this.onScroll();
		window.addEventListener('scroll', this.onScroll.bind(this));

		if(window.matchMedia){
			this.onResponsive();
			window.matchMedia(this.BREAK_POINT_PC).addListener(this.onResponsive.bind(this));
		}
	}

	private onResize():void{
		const datas:RxResize_Data = {width:window.innerWidth, height:window.innerHeight}
		rxResize.next(datas);
	}

	private onScroll():void{
		const datas:RxScroll_Data = {x:window.pageXOffset, y:window.pageYOffset}
		rxScroll.next(datas);
	}

	private onResponsive():void{

		if(window.matchMedia(this.BREAK_POINT_PC).matches){
			const datas:RxBreakpoint_Data = {bp:'pc'};
        	rxBreakpoint.next(datas);
        }
        else{
        	const datas:RxBreakpoint_Data = {bp:'mobile'};
        	rxBreakpoint.next(datas);
        }
	}
}

