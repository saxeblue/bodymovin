/**
 * Class: FrontPage
 * @classdesc - トップページ用のClass
 */

declare const lottie:any;


export class FrontPage{

	private playerData:any = {
		container: document.getElementById('movinAnime'),
		renderer: 'svg',
		loop: false,
		autoplay: false,
		path: './assets/json/data.json'
	};

	private player:any;




	constructor(){
		this.init();
	}



	/**
	 * 初期化処理
	 */
	private init():void{
		this.player = lottie.loadAnimation(this.playerData);
		this.player.play();
		this.player.addEventListener('complete', ()=>{
			setTimeout(()=>{
				this.player.goToAndPlay(0);
			}, 10000);
		});
	}
}