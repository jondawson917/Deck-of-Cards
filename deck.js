const BASE_URL = "http://deckofcardsapi.com/api/deck";
let deck_id = null;
$button = $("button");
$container = $(".container");

$.getJSON(`${BASE_URL}/new/shuffle/?deck_count=1`).then((data) => {
  console.log(data.deck_id);
  deck_id = data.deck_id;
});

$button.click(function (evt) {
  evt.preventDefault();
  $.getJSON(`${BASE_URL}/${deck_id}/draw/?count=1`).then((data) => {
    let img_src = data.cards[0].image;
    let pos_x = Math.random() * 70;
    let pos_y = Math.random() * 70;
    let angle = (Math.floor(Math.random() * 80)-40);
    $container.append($(`<img src=${img_src}>`));
    $('img').last().css('transform', `translate(${pos_x}px, ${pos_y}px) rotate(${angle}deg)`);
    if (data.remaining === 0) {
      $button.remove();
      $('img').remove();
      $(".container")
        .append($(`<h2>No cards remaining</h2>`))
        .css("text-align", "center");
    }
  });
});

// let deckId = null;
//   let $btn = $('button');
//   let $cardArea = $('#card-area');

//   $.getJSON(`${baseURL}/new/shuffle/`).then(data => {
//     deckId = data.deck_id;
//     $btn.show();
//   });
