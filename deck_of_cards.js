//Make a request to the Deck of Cards API to request a single card from a newly shuffled deck.
// Once you have the card, console.log
//the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

let baseURL = "https://deckofcardsapi.com/api";
let myDeck;
let count = 0;

function myCard() {
  myDeck = Promise.resolve(
    axios.get(`${baseURL}/deck/new/shuffle/?deck_count=1`)
  );
  console.log(myDeck);
  return myDeck;
}

myCard()
  .then((a1) => {
    console.log(a1);
    return axios.get(`${baseURL}/deck/${a1.data.deck_id}/draw/?count=1`);
  })
  .then((a2) => {
    console.log(`${a2.data.cards[0].value} of ${a2.data.cards[0].suit}`);
  });

//Make a request to the deck of cards API to request a single card from a newly shuffled deck.
//Once you have the card, make a request to the same API to get one more card from the same deck.

function draw(event) {
  myDeck.then((a1) => {
    let newcard = axios.get(`${baseURL}/deck/${a1.data.deck_id}/draw/?count=1`);

    newcard
      .then((a2) => {
        if (a2.data.cards.length !== 0) {
          console.log(a2.data.cards);
          count = count + 1;
          console.log(count);

          $("#my-card").attr("src", `${a2.data.cards[0].image}`);
        } else {
          $(".draw-button").hide();
          $(".start-button").style.visibility = "visible";
        }
      })
      .catch((err) => {
        console.log(err);
        $(".draw-button").addClass("hidden");
        $("#start-button").removeClass("hidden");
        $("#start-button").addClass("show");
      });
  });
}

$(".draw-button").on("click", draw);
$("#start-button").on("click", function () {
  location.reload();
});

window.onload = (event) => {
  myCard();
};
