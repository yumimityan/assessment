'use strict';

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定したTHML要素の子要素を全て削除する
 * @param {HTMLElemet} element HTMLの要素
 */
function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    return;
  }

  removeAllChildren(resultDivided);



  // 診断結果表示エリアの作成
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);


  const anchor = document.createElement('a');
  const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURIComponent('あなたのタイプ')
    + '&ref_src=twsrc%5Etfw';

  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたのタイプRPG編';

  tweetDivided.appendChild(anchor);
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
}


const answers = [
  '{userName}は勇者タイプです。{userName}は世界を救うでしょう！！！',
  '{userName}はヒーラータイプです。{userName}は世界を救う勇者をサポートするでしょう！！！。',
  '{userName}は魔法使いタイプです。{userName}は常に冷静です。',
  '{userName}は格闘家タイプです。{userName}は脳筋かもしれません。',
  '{userName}は荒くれ者タイプです。{userName}は雰囲気だけは強そうです。',
  '{userName}はモブタイプです。{userName}はそこらへんにたくさんいるモブの一人です。特に特徴もない地味なタイプです',
  '{userName}はマリオタイプです。{userName}は何でもかんでも踏みつけて解決しようとする癖があります。',
  '{userName}はメンヘラタイプです。{userName}は物語の途中で闇落ちします。',
  '{userName}はヒカキンタイプです。{userName}はYouTubeで活躍するでしょう。',
  '{userName}は魔王タイプです。{userName}は中二病です。',
  '{userName}はアンパンマンタイプです。{userName}は水分に弱いです。',
  '{userName}はオタクタイプです。{userName}姫プの経験が豊富です。',
  '{userName}は出木杉くんタイプです。頭もよくイケメンですが本家が映画に出れないように{userName}も大事な場面ではなぜか呼ばれません。',
  '{userName}はN校生タイプです。{userName}は浮きも沈みもしない中途半端な人でしょう。',
  '{userName}は異世界転生ハーレムタイプです。{userName}は異世界で元気に暮らせるでしょう。',
  '{userName}はSタイプです。{userName}は性格が歪んでいて人の悲鳴を聞いていないと生きていけません。',
  '{userName}は地面タイプです。{userName}の弱点は水、草、氷です。',
];

/**
 * 名前の文字列を渡すと診断結果を返す
 * @param {string} userName ユーザー名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  let sumOfcharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
  }


  let index = sumOfcharCode % answers.length;
  let result = answers[index];
  result = result.replace(/\{userName}/g, userName);

  return result;
}

console.assert(
  assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
