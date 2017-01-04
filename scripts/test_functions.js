function changeGif(result){
  const info = JSON.parse(result).data;
  $l('.giphy-box').removeClass('fetching');
  $l('.giphy-box').removeClass('unloaded');
  $l('.giphy-box').children().attr('src', info.image_original_url);
}

function randomGif(){
  $l('.giphy-box').addClass('fetching');
  $l('.giphy-box').children().attr('src', '');
  $l.ajax({
    url: 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&rating=pg',
    success: (result) => changeGif(result)
  }).then( () => {
    console.log("AJAX call successful.");
  });
}

function addBullet(){
  const bullet = document.createElement('li');
  $l('.bullets').append(bullet);
}

function clearBullets(){
  $l('.bullets').children().remove();
}

function randomColor(){
  return '#'+'0123456789abcdef'.split('').map( (v,i,a) => {
    return i > 5 ? null : a[Math.floor(Math.random()*16)];
  }).join('');
}

function colorizeGrid(){
  $l('.grid').children().each( element => {
    const color = randomColor();
    $l(element).attr('style',`background-color: ${color};`);
  });
}
