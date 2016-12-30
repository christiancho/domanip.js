function changeGif(result){
  const info = JSON.parse(result).data;
  $l('.giphy-box').children().attr('src', info.image_original_url);
}

function randomGif(){
  $l.ajax({
    url: 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&rating=pg',
    success: (result) => changeGif(result)
  });
}

function addBullet(){

}

function clearBullets(){
  
}
