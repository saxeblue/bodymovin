/**
 * class Loader
 * @classdesc ローディング クラス
 */
import {Observable, fromEvent, zip} from 'rxjs';



export class Loader{


	/**
	 * イメージのプリロード
	 * @example
	 * [ロード完了後の処理が不要]
	 *    Loader.imagesLoad(['test.jpg', 'test.png'])
	 * [ロード完了後に購読処理をする]
	 *    Loader.imagesLoad(['test.jpg', 'test.png']).subscribe(res=>{ 購読処理 });
	 */
	static imagesLoad(images:string[]):Observable<Event[]>{
		const loadImages:Observable<Event>[] = [];

		for(let i:number=0; i<images.length; i++){
			const $image:HTMLElement = new Image();
			$image.setAttribute('src', images[i]);
			loadImages.push(fromEvent($image, 'load'));
		}

		return zip(...loadImages);
	}

}