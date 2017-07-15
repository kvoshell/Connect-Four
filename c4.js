
$(document).ready(function() {


  function createBoard() {

    let counter = 1;

    // Game Slots
    for (var i = 6; i > 0; i--) {
      let tableRow = '<tr class="game-row row-'+[i]+'">';
      for (var j = 0; j < 7; j++) {
        tableRow += '<td class="game-slot col-'+[j + 1]+'" id='+counter+'></td> \n';
        counter++;
      }
      $('.board').append(tableRow);
    }

    // Buttons
    for (var k = 0; k < 1; k++) {
      let tableButtons = '<tr class="game-row buttons">';
      for (var l = 0; l < 7; l++) {
        tableButtons += '<td class="game-slot button"><button class="btn" id='+counter+'>Place Piece</button></td> \n';
        counter++;
      }
      $('.board').append(tableButtons);
    }
  }


  function startGame() {

    $('.game-message').html("Welcome To Connect Four");
    $('.game-message').show(2000, function() {
      setTimeout(function(){
        $('.game-message').html("Player One's Turn").css('color', 'blue');
      }, 2000);
    });
  }


  function placeGamePiece(button) {

    // Place game piece in correct slot, according to selected column
    switch(button) {
      case 43:
        checkSlotAvailability(1);
        break;
      case 44:
        checkSlotAvailability(2);
        break;
      case 45:
        checkSlotAvailability(3);
        break;
      case 46:
        checkSlotAvailability(4);
        break;
      case 47:
        checkSlotAvailability(5);
        break;
      case 48:
        checkSlotAvailability(6);
        break;
      case 49:
        checkSlotAvailability(7);
        break;
      default:
        return;
    }
  }


  function checkSlotAvailability(column) {

    let baseline = 35;
    let slotToCheck = baseline + column;

    // bottom row to top row, iterate looking for a valid slot to place game piece
    while (slotToCheck) {

      let gameSlot = $('#' + slotToCheck);

      // slot is full, prevent overflow
      if ($(gameSlot).hasClass('taken')) {

        if (slotToCheck <= 7) {
            buttonToDisable = (parseInt(slotToCheck) + 42);
            $ ('#' + buttonToDisable).prop('disabled', true).css({ 'border' : 'none', 'color' : 'white' });
        } else
            slotToCheck -= 7;

      // slot is empty, place piece, check for winner
      } else {

        if (playerTurn == 1) {
            $(gameSlot).css('background-color', 'blue').addClass('taken player-one');
            $('.game-message').html("Player Two's Turn").css('color', 'red');

            if (checkForWinningPlay($(gameSlot))) {
              endGame('player-one');
            }
            break;

        } else {
            $(gameSlot).css('background-color', 'red').addClass('taken player-two');
            $('.game-message').html("Player One's Turn").css('color', 'blue');

            if (checkForWinningPlay($(gameSlot))) {
              endGame('player-two');
            }
            break;
        }
      }
    }
  }


  function checkForWinningPlay(gameSlot) {

    let pieceToCheck = parseInt(gameSlot[0].id);

    const firstPieceAbove       = pieceToCheck - 7;
    const secondPieceAbove      = pieceToCheck - 14;
    const thirdPieceAbove       = pieceToCheck - 21;

    const firstPieceAboveRight  = pieceToCheck - 6;
    const secondPieceAboveRight = pieceToCheck - 12;
    const thirdPieceAboveRight  = pieceToCheck - 18;

    const firstPieceRight       = pieceToCheck + 1;
    const secondPieceRight      = pieceToCheck + 2;
    const thirdPieceRight       = pieceToCheck + 3;

    const firstPieceBelowRight  = pieceToCheck + 8;
    const secondPieceBelowRight = pieceToCheck + 16;
    const thirdPieceBelowRight  = pieceToCheck + 24;

    const firstPieceBelow       = pieceToCheck + 7;
    const secondPieceBelow      = pieceToCheck + 14;
    const thirdPieceBelow       = pieceToCheck + 21;

    const firstPieceBelowLeft   = pieceToCheck + 6;
    const secondPieceBelowLeft  = pieceToCheck + 12;
    const thirdPieceBelowLeft   = pieceToCheck + 18;

    const firstPieceLeft        = pieceToCheck - 1;
    const secondPieceLeft       = pieceToCheck - 2;
    const thirdPieceLeft        = pieceToCheck - 3;

    const firstPieceAboveLeft   = pieceToCheck - 8;
    const secondPieceAboveLeft  = pieceToCheck - 16;
    const thirdPieceAboveLeft   = pieceToCheck - 24;


    // Upper Left of Grid
    if ((pieceToCheck >= 1 && pieceToCheck <= 3) || (pieceToCheck >= 8 && pieceToCheck <= 10) || (pieceToCheck >= 15 && pieceToCheck <= 17)) {

      if (($('#' + firstPieceRight).hasClass('taken player-one') && $('#' + secondPieceRight).hasClass('taken player-one') && $('#' + thirdPieceRight).hasClass('taken player-one')) ||
          ($('#' + firstPieceBelow).hasClass('taken player-one') && $('#' + secondPieceBelow).hasClass('taken player-one') && $('#' + thirdPieceBelow).hasClass('taken player-one')) ||
          ($('#' + firstPieceBelowRight).hasClass('taken player-one') && $('#' + secondPieceBelowRight).hasClass('taken player-one') && $('#' + thirdPieceBelowRight).hasClass('taken player-one'))) {

            return true;

      } else if (($('#' + firstPieceRight).hasClass('taken player-two') && $('#' + secondPieceRight).hasClass('taken player-two') && $('#' + thirdPieceRight).hasClass('taken player-two')) ||
                 ($('#' + firstPieceBelow).hasClass('taken player-two') && $('#' + secondPieceBelow).hasClass('taken player-two') && $('#' + thirdPieceBelow).hasClass('taken player-two')) ||
                 ($('#' + firstPieceBelowRight).hasClass('taken player-two') && $('#' + secondPieceBelowRight).hasClass('taken player-two') && $('#' + thirdPieceBelowRight).hasClass('taken player-two'))) {

            return true;
      }
    }


    // Upper Middle of Grid
    if (pieceToCheck === 4 || pieceToCheck === 11 || pieceToCheck === 18) {

      if (($('#' + firstPieceRight).hasClass('taken player-one') && $('#' + secondPieceRight).hasClass('taken player-one') && $('#' + thirdPieceRight).hasClass('taken player-one')) ||
          ($('#' + firstPieceLeft).hasClass('taken player-one') && $('#' + secondPieceLeft).hasClass('taken player-one') && $('#' + thirdPieceLeft).hasClass('taken player-one')) ||
          ($('#' + firstPieceBelowLeft).hasClass('taken player-one') && $('#' + secondPieceBelowLeft).hasClass('taken player-one') && $('#' + thirdPieceBelowLeft).hasClass('taken player-one')) ||
          ($('#' + firstPieceBelowRight).hasClass('taken player-one') && $('#' + secondPieceBelowRight).hasClass('taken player-one') && $('#' + thirdPieceBelowRight).hasClass('taken player-one'))) {

            return true;

      } else if (($('#' + firstPieceRight).hasClass('taken player-two') && $('#' + secondPieceRight).hasClass('taken player-two') && $('#' + thirdPieceRight).hasClass('taken player-two')) ||
                 ($('#' + firstPieceLeft).hasClass('taken player-two') && $('#' + secondPieceLeft).hasClass('taken player-two') && $('#' + thirdPieceLeft).hasClass('taken player-two')) ||
                 ($('#' + firstPieceBelowLeft).hasClass('taken player-two') && $('#' + secondPieceBelowLeft).hasClass('taken player-two') && $('#' + thirdPieceBelowLeft).hasClass('taken player-two')) ||
                 ($('#' + firstPieceBelowRight).hasClass('taken player-two') && $('#' + secondPieceBelowRight).hasClass('taken player-two') && $('#' + thirdPieceBelowRight).hasClass('taken player-two'))) {

            return true;
      }
    }


    // Upper Right of Grid
    if((pieceToCheck >= 5 && pieceToCheck <= 7) || (pieceToCheck >= 12 && pieceToCheck <= 14) || (pieceToCheck >= 19 && pieceToCheck <= 21)) {

      if (($('#' + firstPieceLeft).hasClass('taken player-one') && $('#' + secondPieceLeft).hasClass('taken player-one') && $('#' + thirdPieceLeft).hasClass('taken player-one')) ||
          ($('#' + firstPieceBelow ).hasClass('taken player-one') && $('#' + secondPieceBelow).hasClass('taken player-one') && $('#' + thirdPieceBelow).hasClass('taken player-one')) ||
          ($('#' + firstPieceBelowLeft).hasClass('taken player-one') && $('#' + secondPieceBelowLeft).hasClass('taken player-one') && $('#' + thirdPieceBelowLeft).hasClass('taken player-one'))) {

            return true;

      } else if (($('#' + firstPieceLeft).hasClass('taken player-two') && $('#' + secondPieceLeft).hasClass('taken player-two') && $('#' + thirdPieceLeft).hasClass('taken player-two')) ||
                 ($('#' + firstPieceBelow ).hasClass('taken player-two') && $('#' + secondPieceBelow).hasClass('taken player-two') && $('#' + thirdPieceBelow).hasClass('taken player-two')) ||
                 ($('#' + firstPieceBelowLeft).hasClass('taken player-two') && $('#' + secondPieceBelowLeft).hasClass('taken player-two') && $('#' + thirdPieceBelowLeft).hasClass('taken player-two'))) {

            return true;
      }
    }


    // Lower Left of Grid
    if ((pieceToCheck >= 22 && pieceToCheck <= 24) || (pieceToCheck >= 29 && pieceToCheck <= 31) || (pieceToCheck >= 36 && pieceToCheck <= 38)) {

      if (($('#' + firstPieceRight).hasClass('taken player-one') && $('#' + secondPieceRight).hasClass('taken player-one') && $('#' + thirdPieceRight).hasClass('taken player-one')) ||
          ($('#' + firstPieceAbove).hasClass('taken player-one') && $('#' + secondPieceAbove).hasClass('taken player-one') && $('#' + thirdPieceAbove).hasClass('taken player-one')) ||
          ($('#' + firstPieceAboveRight).hasClass('taken player-one') && $('#' + secondPieceAboveRight).hasClass('taken player-one') && $('#' + thirdPieceAboveRight).hasClass('taken player-one'))) {

            return true;

      } else if (($('#' + firstPieceRight).hasClass('taken player-two') && $('#' + secondPieceRight).hasClass('taken player-two') && $('#' + thirdPieceRight).hasClass('taken player-two')) ||
                 ($('#' + firstPieceAbove).hasClass('taken player-two') && $('#' + secondPieceAbove).hasClass('taken player-two') && $('#' + thirdPieceAbove).hasClass('taken player-two')) ||
                 ($('#' + firstPieceAboveRight).hasClass('taken player-two') && $('#' + secondPieceAboveRight).hasClass('taken player-two') && $('#' + thirdPieceAboveRight).hasClass('taken player-two'))) {

            return true;
      }
    }


    // Lower Middle of Grid
    if (pieceToCheck === 25 || pieceToCheck === 32 || pieceToCheck === 39) {

      if (($('#' + firstPieceRight).hasClass('taken player-one') && $('#' + secondPieceRight).hasClass('taken player-one') && $('#' + thirdPieceRight).hasClass('taken player-one')) ||
          ($('#' + firstPieceLeft).hasClass('taken player-one') && $('#' + secondPieceLeft).hasClass('taken player-one') && $('#' + thirdPieceLeft).hasClass('taken player-one')) ||
          ($('#' + firstPieceAboveRight).hasClass('taken player-one') && $('#' + secondPieceAboveRight).hasClass('taken player-one') && $('#' + thirdPieceAboveRight).hasClass('taken player-one')) ||
          ($('#' + firstPieceAboveLeft).hasClass('taken player-one') && $('#' + secondPieceAboveLeft).hasClass('taken player-one') && $('#' + thirdPieceAboveLeft).hasClass('taken player-one'))) {

            return true;

      } else if (($('#' + firstPieceRight).hasClass('taken player-two') && $('#' + secondPieceRight).hasClass('taken player-two') && $('#' + thirdPieceRight).hasClass('taken player-two')) ||
                 ($('#' + firstPieceLeft).hasClass('taken player-two') && $('#' + secondPieceLeft).hasClass('taken player-two') && $('#' + thirdPieceLeft).hasClass('taken player-two')) ||
                 ($('#' + firstPieceAboveRight).hasClass('taken player-two') && $('#' + secondPieceAboveRight).hasClass('taken player-two') && $('#' + thirdPieceAboveRight).hasClass('taken player-two')) ||
                 ($('#' + firstPieceAboveLeft).hasClass('taken player-two') && $('#' + secondPieceAboveLeft).hasClass('taken player-two') && $('#' + thirdPieceAboveLeft).hasClass('taken player-two'))) {

            return true;
      }
    }


    // Lower Right of Grid
    if ((pieceToCheck >= 26 && pieceToCheck <= 28) || (pieceToCheck >= 33 && pieceToCheck <= 35) || (pieceToCheck >= 40 && pieceToCheck <= 42)) {

      if (($('#' + firstPieceLeft).hasClass('taken player-one') && $('#' + secondPieceLeft).hasClass('taken player-one') && $('#' + thirdPieceLeft).hasClass('taken player-one')) ||
          ($('#' + firstPieceAbove).hasClass('taken player-one') && $('#' + secondPieceAbove).hasClass('taken player-one') && $('#' + thirdPieceAbove).hasClass('taken player-one')) ||
          ($('#' + firstPieceAboveLeft).hasClass('taken player-one') && $('#' + secondPieceAboveLeft).hasClass('taken player-one') && $('#' + thirdPieceAboveLeft).hasClass('taken player-one'))) {

            return true;

      } else if (($('#' + firstPieceLeft).hasClass('taken player-two') && $('#' + secondPieceLeft).hasClass('taken player-two') && $('#' + thirdPieceLeft).hasClass('taken player-two')) ||
                 ($('#' + firstPieceAbove).hasClass('taken player-two') && $('#' + secondPieceAbove).hasClass('taken player-two') && $('#' + thirdPieceAbove).hasClass('taken player-two')) ||
                 ($('#' + firstPieceAboveLeft).hasClass('taken player-two') && $('#' + secondPieceAboveLeft).hasClass('taken player-two') && $('#' + thirdPieceAboveLeft).hasClass('taken player-two'))) {

            return true;
      }
    }
    return false;
  }

function endGame(player) {

  $('.btn').hide();

  if (player == 'player-one') {
      $('.game-message').html("Player One Wins!");
  } else if (player == 'player-two') {
      $('.game-message').html("Player Two Wins!");
  }

  let restartMessage = '<button class="btn restart-game">Play Again?</button>'

  $('.game-message').append('     ' + restartMessage)
  $('.restart-game').click(function() { window.location.reload(true); });
}


  // Game Runtime
  let playerTurn = 1;
  let counter = 0;
  createBoard();
  startGame();

  $('.btn').click(function() {

    let button = parseInt(this.id)
    placeGamePiece(button);

    // Track total moves, determine who's next to act
    counter++;
    counter > 0 ? $('#total-moves').html('Total Moves: ' + counter) : $('#total-moves').empty();
    counter % 2 == 0 ? playerTurn = 1 : playerTurn = 2;
  });
});
