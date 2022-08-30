var start_game_run = false;
let keydown_run = true;
let error_keydown = 0;
let correct_keydown = 0;
var id_list = [49, 50, 53, 56, 57, 48, 189, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191];
var value_list = ['ㄅ', 'ㄉ', 'ㄓ', 'ㄚ', 'ㄞ', 'ㄢ', 'ㄦ', 'ㄆ', 'ㄊ', 'ㄍ', 'ㄐ', 'ㄔ', 'ㄗ', 'ㄧ', 'ㄛ', 'ㄟ', 'ㄣ', 'ㄇ', 'ㄋ', 'ㄎ', 'ㄑ', 'ㄕ', 'ㄘ', 'ㄨ', 'ㄜ', 'ㄠ', 'ㄤ', 'ㄈ', 'ㄌ', 'ㄏ', 'ㄒ', 'ㄖ', 'ㄙ', 'ㄩ', 'ㄝ', 'ㄡ', 'ㄥ'];


var game_start_bool = false;
var last_keydown_correct = 0;
var keydown_correct = 0;
var score = 0;
var game_time = 0;
var game_score_log = [];
var game_keydown_error = [];
var game_keydown_correct = [];
var timer;

function init(){
    var btn = document.getElementById('btn');
    var handle_mouse = function(){
        if(!game_start_bool)
            game_start_reciprocal();
    };
    btn.addEventListener('click', handle_mouse);
}


function game_start_reciprocal(){
    var reciprocal = document.getElementById('game_reciprocal');
    var time_id = document.getElementById('time_id');
    var score_id = document.getElementById('score_id');
    var opo_id = document.getElementById('opo');
    game_start_bool = true
    game_time = 0;
    score = 0;
    error_keydown = 0;
    correct_keydown = 0;
    let w = setInterval('owo', 1000);
    for(let i = 0; i < w + 1; i++){
        clearInterval(i);
    }
    opo_id.textContent = '';
    time_id.textContent = game_time;
    score_id.textContent = score;
    time = [0, 1000, 2000, 3000, 4000, 5000, 6000];
    setTimeout(function(){reciprocal.textContent = "5"; music_play('reciprocal_5')}, time[0]);
    setTimeout(function(){reciprocal.textContent = "4"; music_play('reciprocal_4')}, time[1]);
    setTimeout(function(){reciprocal.textContent = "3"; music_play('reciprocal_3')}, time[2]);
    setTimeout(function(){reciprocal.textContent = "2"; music_play('reciprocal_2')}, time[3]);
    setTimeout(function(){reciprocal.textContent = "1"; music_play('reciprocal_1')}, time[4]);
    setTimeout(function(){reciprocal.textContent = "開始";  music_play('reciprocal_start')}, time[5]);
    setTimeout(function(){reciprocal.textContent = ""; start_game_run = true;}, time[6]);
    setTimeout(function(){keydown_correct = game_id_rand(); game_time = 30; score = 0 }, time[6]);
    setTimeout(function(){setInterval(game_time_reciprocal, 1000); game_start_bool = false}, 6000);
}

function game_time_reciprocal(){
    if(start_game_run == false)
        return;
    let tmp_id = document.getElementById('time_id');
    if(game_time <= 0){
        start_game_run = false;
        game_score_log.push(score);
        game_keydown_correct.push(correct_keydown);
        game_keydown_error.push(error_keydown);
    }
    else{
        game_time -= 1;
        tmp_id.textContent = game_time;
    }
}

function game_id_rand(){
    function getrandom(){
        return Math.floor(Math.random() * (id_list.length));
    };
    var now_id = getrandom();
    var now_value = value_list[now_id];
    var id = document.getElementById('opo');
    id.textContent = now_value;
    return now_id;
}

function game_image(key_code){
    var id = document.getElementById('opo');
    id.textContent = '';
    var img = document.getElementById(`image_${key_code}`);
    img.style.display = "block";
    setTimeout(function(){img.style.display = "none"}, 1000);
    
}


function music_play(key_code){
    const audio = document.querySelector(`audio[data-key="${key_code}"]`);
    if(!audio) return;
    audio.currentTime = 0;
    audio.play();
}

function keyboard_keydown(e){
    if(start_game_run == true && keydown_run == true){
        if(!id_list.includes(e.keyCode)){
            return;
        }
        console.log(keydown_run);
        var key_code = e.keyCode;
        var txt_id = document.getElementById(key_code);
        txt_id.style.fontSize = "100px";
        txt_id.style.color= "black";
        txt_id.style.zIndex = "9999";
        txt_id.style.webkitTextStroke = "1px white";
        keydown_run = false;
        music_play("wav_" + key_code);
        if(key_code == id_list[keydown_correct]){
            let tmp_id = document.getElementById('score_id') 
            last_keydown_correct = keydown_correct;
            correct_keydown += 1;
            score += 100;
            tmp_id.textContent = score;
            game_image(key_code); 
            setTimeout(function(){
                txt_id.style.fontSize = "24px";
                txt_id.style.color="#eacd11";
                txt_id.style.zIndex = "1";
                txt_id.style.webkitTextStroke = ""; 
                keydown_run = true
            }, 1000);
            
            setTimeout(function(){
                while(last_keydown_correct == keydown_correct){
                    keydown_correct = game_id_rand();
                }
            }, 1000);
        }
        else{
            error_keydown += 1;
            setTimeout(function(){
                txt_id.style.fontSize = "24px";
                txt_id.style.color="#eacd11";
                txt_id.style.zIndex = "1";
                txt_id.style.webkitTextStroke = ""; 
                keydown_run = true
            }, 500);
        }
    }
}

function getScoreLog(){
    let score_txt = "";
    for(let i = 0; i < game_score_log.length; i++){
        score_txt += '第 ' + (i + 1) + ' 次成績為：' + game_score_log[i] + '，正確點擊次數為：' + game_keydown_correct[i] + '，錯誤次數為：' + game_keydown_error[i] + '\n';
    }
    console.log(score_txt);
    return score_txt;
}

function downloadFile() {
    //藉型別陣列建構的 blob 來建立 URL
    let fileName = "ScoreLog.txt";
    const data = getScoreLog();
    let blob = new Blob([data], {
      type: "application/octet-stream",
    });
    var href = URL.createObjectURL(blob);
    // 從 Blob 取出資料
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.href = href;
    link.download = fileName;
    link.click();
  }


var body = document.body;
body.addEventListener('keydown', keyboard_keydown ,false) //偵測按下按鍵的行為

let downloadBtn = document.querySelector(".downloadBtn");
downloadBtn.addEventListener("click", downloadFile);