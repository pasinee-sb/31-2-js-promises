//Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON
//by including the json query key, specific to this API. Details.

let baseURL = "http://numbersapi.com";

// let b = axios.get(`${baseURL}/4?json`);

b.then((a1) => {
  console.log(a1.data.text);
});

//Figure out how to get data on multiple numbers in a single request.
// Make that request and when you get the data back, put all of the number facts on the page.

let numArr = [];
for (let i = 0; i < 4; i++) {
  numArr.push(axios.get(`${baseURL}/random`));
}

console.log(numArr);

Promise.all(numArr)
  .then((numArr) => {
    for (num of numArr) {
      $("body").append(`<h1>${num.data}</h1>`);
    }
  })
  .catch((err) => console.log(err));

//Use the API to get 4 facts on your favorite number. Once you have them all,
//put them on the page. It’s okay if some of the facts are repeats.

function myNumFacts(category) {
  return axios.get(`${baseURL}/4/${category}`);
}

myNumFacts("trivia")
  .then((a1) => {
    $("body").append(`<h1>${a1.data}<h1>`);
    return myNumFacts("math");
  })
  .then((a2) => {
    $("body").append(`<h1>${a2.data}<h1>`);
    return myNumFacts("date");
  })
  .then((a3) => {
    $("body").append(`<h1>${a3.data}<h1>`);
    return myNumFacts("math");
  })
  .then((a4) => {
    $("body").append(`<h1>${a4.data}<h1>`);
    return myNumFacts("year");
  })
  .catch((err) => console.log(err));
