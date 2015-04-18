jQuery(document).ready(function($){
  var whackAMole = {}; 
  whackAMole.successfulHits = 0;
  whackAMole.currentScore = 10000;
  whackAMole.difficultyFactor = .25; // score to decriment per ms
  whackAMole.loopSpeed = 200;
  whackAMole.buttons;
  window.localStorage.setItem( 'com_smithdesign_wam_topScore', 0);

  $( document ).ready(function() {
    $('#topScore').text("Top Score " + window.localStorage.getItem( 'com_smithdesign_wam_topScore' ));
  });

  //timer
  whackAMole.gameLoop = function(){
    if (whackAMole.currentScore <= 0){
      $('#defaultCountdown').text('Time is up');
      $(".glow").removeClass('glow');
      whackAMole.currentScore = 0;
      window.localStorage.setItem( 'com_smithdesign_wam_topScore', whackAMole.successfulHits);
      $('#topScore').text("Top Score " + window.localStorage.getItem( 'com_smithdesign_wam_topScore' ));
    }
    else {
      if($(".glow").length == 0){
        whackAMole.randomnumber=Math.floor(Math.random()*buttons.length);
        $(buttons[whackAMole.randomnumber]).addClass('glow');
        if(newMole) {
          newMole.play();
        }
      }
      else{
        whackAMole.currentScore = whackAMole.currentScore - (whackAMole.difficultyFactor * whackAMole.loopSpeed);
      }
      whackAMole.updateUI();
      t=setTimeout(whackAMole.gameLoop,whackAMole.loopSpeed);
    }
  }
  whackAMole.updateUI = function() {
    $('#defaultCountdown').text(whackAMole.currentScore);
    $('#defaultScore').text(whackAMole.successfulHits);
    $('#reset').click( function () {
      window.localStorage.setItem( 'com_smithdesign_wam_topScore', 0);
    });
  }

  //Score
  $(function () {
    buttons = $(".container .box").toArray();

    $('.container	.box').click(function () {
      if($(this).hasClass('glow')){
        $(this).removeClass('glow');
        whackAMole.successfulHits ++;
        if(whack){
          whack.play();
        }
      }
      whackAMole.updateUI();
    });
  });

 var t = setTimeout(whackAMole.gameLoop,whackAMole.loopSpeed);

 $('#reset').click( function () {
    window.localStorage.setItem( 'com_smithdesign_wam_topScore', 0);
 });
});