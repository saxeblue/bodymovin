# Work Template


## 開発環境
mac専用の開発環境です。  

```
yarn install  
```

| モジュール | バージョン |
| ---- | ---- |
| node | 10.10.0 |
| yarn | 1.13.0 |
| babel | 7.3 |
| gulp | 4.0.0 |
| webpack | 4.29.4 |
| webpack-cli | 3.2.3 |
| typescript | 3.0.3 |
| node-sass | 4.11.0 |
  
画像の圧縮タスク(yarn imagemin)にmozjpegを使用しており、  
yarn imageminを使用する場合には、  
[Homebrew](https://brew.sh/index_ja.html)で以下をインストールする必要があります。
```
brew install automake autoconf libtool dpkg pkgconfig nasm libpng
```



## 使用しているライブラリ

| ライブラリ | バージョン |
| ---- | ---- |
| gsap | 1.20.1 |
| rxjs | 6.3.3 |
| howler | 2.1.1 |



## GIT

### ▪︎ WEB
```
```
  
### ▪︎ デプロイ
```
```



## サーバー

### ▪︎ テストサーバー
```
```

### ▪︎ 本番サーバー
```
```


 
## テストアップおよび公開の手順

### ▪︎ テストアップ
```
```
  
### ▪︎ 公開
```
```



## 対応ブラウザ

### ▪︎ PC
```
IE最新、Chrome最新、Firefox最新、Safari最新
```

### ▪︎ Android
```
Android4.4 〜 chrome
```

### ▪︎ ios
```
ios10〜
```



## Usage

### ▪︎ プロジェクトのスタート
```
yarn start
```
yarn bs & yarn watch:ts & yarn watch:sass & yarn watch:html



### ▪︎ PRODUCTION ビルド
公開データの作成
```
yarn build
```
yarn product:ts && yarn product:sass



### ▪︎ SASSコンパイル
Sassファイルのコンパイル。  
yarn start および yarn build で自動的に実行されます。  
**直接コマンドをたたく必要はありません**

```
[development]  
yarn develop:sass  

[development watch]  
yarn watch:sass  

[production]  
yarn product:sass
```
[entry] /src/sass  
[output] /htdocs/assets/css  

シェルの実行権限が必要です  

- chmod 755 ./config/css_dev.sh
- chmod 755 ./config/css_pro.sh



### ▪︎ Typescript コンパイル
TypeScriptのコンパイル。  
yarn start および yarn build で自動的に実行されす。  
**直接コマンドをたたく必要はありません**

```
[development] yarn develop:ts  
[production] yarn product:ts
```
[entry] src/ts  
[output] htdocs/assets/js



### ▪︎ 画像圧縮(jpg, png, gif, svg)
```
yarn imagemin   
```
[entry] /src/img  
[output] /htdocs/assets/img  
  
- jpegの圧縮タスクに、**mozjpegを使用**しており、Homebrewにて以下のインストールが必要です。  
`brew install automake autoconf libtool dpkg pkgconfig nasm libpng`  

- 圧縮ファイルを/src/imgに上書きするコマンドですので、  
圧縮したくない画像がある場合、もしくはyarn imageminがうまく動作しない場合は、  
/src/imgではなく、直接htdocs/assets/imgに画像ファイルを入れてください。
  
- 圧縮設定は、/config/app_config.js 



### ▪︎ オーディオ スプライト作成
オーディオ スプライトを作成  
**再生には[Howler.js](https://github.com/goldfire/howler.js#documentation)を使用するコマンドとなります**

``` 
yarn audioSprite  
```
[entry] src/audio/結合するmp3一式  
[output] htdocs/audio/audio.(mp3|ogg|ac3|m4a), htdocs/audio/audio.json  
  
- オーディオ スプライトの作成は**ffmpegを使用**しており、Homebrewにて以下のインストールが必要です。  
`brew install ffmpeg`
  
- 圧縮設定は、/config/app_config.js



### ▪︎ ライブラリのJSファイル
デフォルトでは、typescript内でimportしているライブラリを別ファイルで出力する設定になっています。  
ライブラリもbundleして書き出す場合は以下の設定を行ってください。
``` 
[作成手順]  
1. config/app_config.js内のWEBPACK_CONFIG.is_split_chunksをfalseにする  
2. typescriptをコンパイルする
``` 
[output] htdocs/assets/js/vendor.js  



### ▪︎ htmlの構文チェック
yarn startにて、自動的に実行されるコマンド  
**直接コマンドをたたく必要はありません**

[HTMLHint Rules](https://github.com/yaniswang/HTMLHint/wiki/Rules)を使用しています。



### ▪︎ Browser Sync
yarn startにて、自動的に実行されるコマンド  
**直接コマンドをたたく必要はありません**

```
yarn bs
```



## 開発環境の構築

### ▪︎ Homebrewのインストール
https://qiita.com/pypypyo14/items/4bf3b8bd511b6e93c9f9

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```


### ▪︎ Node.jsのバージョン管理

#### ndenvで管理する場合
cd hogeした際にnode.jsのバージョンを自動で切り替えられるため、  
nodebrewよりもこちらを推奨します。


すでにnodebrewが入っている場合は、削除する  
(nodebrewとの共存はできません)  
https://qiita.com/tonkotsuboy_com/items/f5d17f0b9698554a7716


ndenvのインストール  
https://qiita.com/griffin3104/items/a8ae5b271bf9246eeadd

```
1. brew update

2. ndenvをインストール
brew install ndenv

3. 環境変数を設定
echo 'export PATH="$HOME/.ndenv/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(ndenv init -)"' >> ~/.bash_profile
exec $SHELL -l

4. node-buildをインストール
git clone https://github.com/riywo/node-build.git $(ndenv root)/plugins/node-build

5. インストールに成功したかの確認  
ndenv -v

6. インストールできるバージョンを確認する
ndenv install -l

7. nodeをインストールする
ndenv install v10.10.0

8. インストールされているバージョンの確認
ndenv versions

9. 設定がない場合のデフォルトで使用するバージョンを設定をする
ndenv global v10.10.0

10. プロジェクトごとのローカル設定をする
cd hoge
ndenv local v10.10.0
```


#### Nodebrewで管理する場合
https://qiita.com/undrthemt/items/4ade6df1fe94107a45a6

```
1. ターミナルを起動し、HomebrewでNodebrewをインストールする
brew install nodebrew

2. nodebrewセットアップ
nodebrew setup
echo "export PATH=\$HOME/.nodebrew/current/bin:\$PATH" >> ~/.bash_profile
source ~/.bash_profile

3. Node.jsをインストール
[最新バージョンをインストールする場合]  
nodebrew install-binary latest

[特定のバージョンをインストールする場合]
nodebrew install-binary v10.10.0

4. インストールしているNode.jsの一覧を確認
nodebrew list
```


### ▪︎ Yarnのインストール
https://qiita.com/muuuuminn/items/6477c8d839164e779996

```
brew install yarn --ignore-dependencies
```

過去にHomebrewでyarnをインストールしており、  
その際にnodeがインストールされてしまっていた場合は、  
以下のコマンドでnodeを削除する
```
brew uninstall --ignore-dependencies node
```


### ▪︎ mozJPEG
画像圧縮のタスク(yarn imagemin)にてJPEG圧縮にmozJPEGを使用しており、  
imageminタスクを使用する場合には、Homebrewにて以下のインストールが必要となります。

```
brew install automake autoconf libtool dpkg pkgconfig nasm libpng
```


### ▪︎ ffmpeg
yarn audioSpriteコマンドを実行するには、  
Homebrewにて以下のインストールが必要となります。

```
brew install ffmpeg
```
