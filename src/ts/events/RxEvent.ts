/**
 * class RxEvent
 * @classdesc
 * RxJS6のBehaviorSubjectでカスタムイベントを作成するクラス
 */
import {BehaviorSubject, Observable} from 'rxjs';



export class RxEvent<T>{

	_subject:BehaviorSubject<T> = new BehaviorSubject(null);
	_source:Observable<T> = this._subject.asObservable();


	/**
	 * イベントの送出
	 */
	next(datas:T):void{
		this._subject.next(datas);
	}


	/**
	 * Observableを取得する
	 */
	get source():Observable<T>{
		return this._source;
	}
}
