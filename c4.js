
$(document).ready(function() {

  function createBoard() {
    let counter = 1;

    for (let i = 0; i < 7; i++) {
      let boardCol = '<div class="game-col">';

      for (let j = 0; j < 6; j++) {
        boardCol += '<div class="game-slot" id='+counter+'></div>';
        counter++;
      }
      $('.board').append(boardCol);
    }
  }



  function startGame() {
    $('.game-message').html("Welcome To Connect Four");
    $('.game-message').show(1000, function() {
      setTimeout(function(){
        $('.game-message').html("Player One's Turn").css('color', 'blue');
      }, 1000);
    });
  }



  function slotIsAvailable(element, auxElement = 0) {
    let color = element.css('background-color');
    let auxColor;

    if (auxElement !== 0) {
      auxColor = auxElement.css('background-color');
    }

    if (color === 'rgb(255, 0, 0)' || color === 'rgb(0, 0, 255)') {
      if ((auxElement !== 0 && auxColor !== 'rgb(255, 255, 255)') || (auxElement === 0)) {
        return true;
      }
    }
    return false;
  }



  function isValidPlay(element) {
    let id = parseInt(element);

    let checkLowerPiece = $('#' + (id + 1)).attr('id');
    let checkLowerRightPiece = $('#' + (id + 8)).attr('id');
    let checkLowerLeftPiece = $('#' + (id - 6)).attr('id');

    // Play is on bottom row
    if (id % 6 === 0) {
      return true;
    }

    // Play is on top of another piece
    if (slotIsAvailable($('#'+checkLowerPiece))) {
      return true;
    }

    // Diagonal play is valid
    if (slotIsAvailable($('#'+checkLowerPiece), $('#'+checkLowerRightPiece)) ||
        slotIsAvailable($('#'+checkLowerPiece), $('#'+checkLowerLeftPiece))) {
      return true;
    }

    // Invalid play
    return false;
  }



  // Compare gamePiece with three related pieces to check for a winner
  function checkSlotColor(elementOne, elementTwo, elementThree, elementFour) {
    let colorOne = elementOne.css('background-color');
    let colorTwo = elementTwo.css('background-color');
    let colorThree = elementThree.css('background-color');
    let colorFour = elementFour.css('background-color');

    if (colorOne === colorTwo && colorOne === colorThree && colorOne === colorFour) {
      return colorOne;
    } else {
      return false;
    }
  }



  // Assign slot to player, update info, check for a winner
  function playerMove(gamePiece, color) {

    gamePiece.css('background-color', color);

    color === 'blue' ? $('.game-message').html("Player Two's Turn").css('color', 'red') :
                       $('.game-message').html("Player One's Turn").css('color', 'blue');

    if (checkForWinningPlay(gamePiece, color)) {
      endGame(color);
    }
  }



  function endGame(color) {
    color === 'blue' ? $('.game-message').html("Player One Wins!").css('color', 'blue') :
                       $('.game-message').html("Player Two Wins!").css('color', 'red');

    $('.game-slot').off();
    let restartMessage = '<button class="btn restart-game">Play Again?</button>'
    $('.game-message').append(' ' + restartMessage)
    $('.restart-game').click(function() { window.location.reload(true); });
  }



  function checkForWinningPlay(gamePiece, color) {
    let pieceToCheck = parseInt(gamePiece[0].id);

    const firstPieceAbove       = pieceToCheck - 1;
    const secondPieceAbove      = pieceToCheck - 2;
    const thirdPieceAbove       = pieceToCheck - 3;

    const firstPieceAboveRight  = pieceToCheck + 5;
    const secondPieceAboveRight = pieceToCheck + 10;
    const thirdPieceAboveRight  = pieceToCheck + 15;

    const firstPieceRight       = pieceToCheck + 6;
    const secondPieceRight      = pieceToCheck + 12;
    const thirdPieceRight       = pieceToCheck + 18;

    const firstPieceBelowRight  = pieceToCheck + 7;
    const secondPieceBelowRight = pieceToCheck + 14;
    const thirdPieceBelowRight  = pieceToCheck + 21;

    const firstPieceBelow       = pieceToCheck + 1;
    const secondPieceBelow      = pieceToCheck + 2;
    const thirdPieceBelow       = pieceToCheck + 3;

    const firstPieceBelowLeft   = pieceToCheck - 5;
    const secondPieceBelowLeft  = pieceToCheck - 10;
    const thirdPieceBelowLeft   = pieceToCheck - 15;

    const firstPieceLeft        = pieceToCheck - 6;
    const secondPieceLeft       = pieceToCheck - 12;
    const thirdPieceLeft        = pieceToCheck - 18;

    const firstPieceAboveLeft   = pieceToCheck - 7;
    const secondPieceAboveLeft  = pieceToCheck - 14;
    const thirdPieceAboveLeft   = pieceToCheck - 21;

    // Upper Left of Grid
    if ((pieceToCheck >= 1 && pieceToCheck <= 3) || (pieceToCheck >= 7 && pieceToCheck <= 9) || (pieceToCheck >= 13 && pieceToCheck <= 15)) {

      if ((checkSlotColor($('#' + pieceToCheck), $('#' + firstPieceRight), $('#' + secondPieceRight), $('#' + thirdPieceRight))) ||
          (checkSlotColor($('#' + pieceToCheck), $('#' + firstPieceBelow), $('#' + secondPieceBelow), $('#' + thirdPieceBelow))) ||
          (checkSlotColor($('#' + pieceToCheck), $('#' + firstPieceBelowRight), $('#' + secondPieceBelowRight), $('#' + thirdPieceBelowRight)))) {
            console.log('winner found 1');
           return true;
      }
    }

    // Upper Middle of Grid
    if (pieceToCheck >= 19 && pieceToCheck <= 21) {

      if ((checkSlotColor($('#' + pieceToCheck), $('#' + firstPieceRight), $('#' + secondPieceRight), $('#' + thirdPieceRight)))  ||
          (checkSlotColor($('#' + pieceToCheck), $('#' + firstPieceLeft), $('#' + secondPieceLeft), $('#' + thirdPieceLeft)))  ||
          (checkSlotColor($('#' + pieceToCheck), $('#' + firstPieceBelowLeft), $('#' + secondPieceBelowLeft), $('#' + thirdPieceBelowLeft))) ||
          (checkSlotColor($('#' + pieceToCheck), $('#' + firstPieceBelowRight), $('#' + secondPieceBelowRight), $('#' + thirdPieceBelowRight))) ||
          (checkSlotColor($('#' + pieceToCheck), $('#' + firstPieceBelow), $('#' + secondPieceBelow), $('#' + thirdPieceBelow)))) {
            console.log('winner found 2');
          return true;
      }
    }

    // Upper Right of Grid
    if((pieceToCheck >= 25 && pieceToCheck <= 27) || (pieceToCheck >= 31 && pieceToCheck <= 33) || (pieceToCheck >= 37 && pieceToCheck <= 39)) {

      if ((checkSlotColor($('#' + pieceToCheck), $('#' + firstPieceLeft), $('#' + secondPieceLeft), $('#' + thirdPieceLeft))) ||
          (checkSlotColor($('#' + pieceToCheck), $('#' + firstPieceBelow), $('#' + secondPieceBelow), $('#' + thirdPieceBelow))) ||
          (checkSlotColor($('#' + pieceToCheck), $('#' + firstPieceBelowLeft), $('#' + secondPieceBelowLeft), $('#' + thirdPieceBelowLeft))))  {
            console.log('winner found 3');
            return true;
      }
    }

    // Lower Left of Grid
    if ((pieceToCheck >= 4 && pieceToCheck <= 6) || (pieceToCheck >= 10 && pieceToCheck <= 12) || (pieceToCheck >= 16 && pieceToCheck <= 18)) {

      if ((checkSlotColor($('#' + pieceToCheck), $('#' + firstPieceRight), $('#' + secondPieceRight), $('#' + thirdPieceRight))) ||
          (checkSlotColor($('#' + pieceToCheck), $('#' + firstPieceAbove), $('#' + secondPieceAbove), $('#' + thirdPieceAbove))) ||
          (checkSlotColor($('#' + pieceToCheck), $('#' + firstPieceAboveRight), $('#' + secondPieceAboveRight), $('#' + thirdPieceAboveRight)))) {
            console.log('winner found 4');
            return true;
      }
    }

    // Lower Middle of Grid
    if (pieceToCheck >= 22 && pieceToCheck <= 24) {

      if ((checkSlotColor($('#' + pieceToCheck), $('#' + firstPieceRight), $('#' + secondPieceRight), $('#' + thirdPieceRight))) ||
          (checkSlotColor($('#' + pieceToCheck), $('#' + firstPieceLeft), $('#' + secondPieceLeft), $('#' + thirdPieceLeft))) ||
          (checkSlotColor($('#' + pieceToCheck), $('#' + firstPieceAboveRight), $('#' + secondPieceAboveRight), $('#' + thirdPieceAboveRight))) ||
          (checkSlotColor($('#' + pieceToCheck), $('#' + firstPieceAboveLeft), $('#' + secondPieceAboveLeft), $('#' + thirdPieceAboveLeft)))) {
            console.log('winner found 5');
            return true;
      }
    }

    // Lower Right of Grid
    if ((pieceToCheck >= 28 && pieceToCheck <= 30) || (pieceToCheck >= 34 && pieceToCheck <= 36) || (pieceToCheck >= 40 && pieceToCheck <= 42)) {

      if ((checkSlotColor($('#' + pieceToCheck), $('#' + firstPieceLeft), $('#' + secondPieceLeft), $('#' + thirdPieceLeft))) ||
          (checkSlotColor($('#' + pieceToCheck), $('#' + firstPieceAbove), $('#' + secondPieceAbove), $('#' + thirdPieceAbove))) ||
          (checkSlotColor($('#' + pieceToCheck), $('#' + firstPieceAboveLeft), $('#' + secondPieceAboveLeft), $('#' + thirdPieceAboveLeft)))) {
            return true;
      }
    }
    return false;
  }



  // Game Init
  let playerTurn = 1;
  let totalMoves = 0;
  createBoard();
  startGame();

  $('.game-slot').on('click', function(e) {
    let openSlot = e.target.id;
    let slotColor = $('#'+openSlot).css('background-color');

    // Place a gamepiece
    if (isValidPlay(openSlot) && (slotColor !== 'rgb(255, 0, 0)' && slotColor !== 'rgb(0, 0, 255)')) {
      totalMoves % 2 !== 0 ? playerMove($('#'+openSlot), 'red') : playerMove($('#'+openSlot), 'blue');
      totalMoves++;

      if (totalMoves === 42) {
        $('.game-message').html('It\'s A Tie!');
        $('.game-slot').off();

        let restartMessage = '<button class="btn restart-game">Play Again?</button>'
        $('.game-message').append(' ' + restartMessage)
        $('.restart-game').click(function() { window.location.reload(true); });
      }
    }

    // Update game info, track player turns
    totalMoves > 0 ? $('#total-moves').html('Total Moves: ' + totalMoves) : $('#total-moves').empty();
    totalMoves % 2 == 0 ? playerTurn = 1 : playerTurn = 2;
  })
})
