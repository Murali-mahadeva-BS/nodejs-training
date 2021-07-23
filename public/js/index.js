let counterButton = document.getElementById("counter-btn");
let counter = document.getElementById("counter");
let count = 0;
counterButton.addEventListener("click", () => {
  console.log("Incrementing count by 1");
  counter.innerText = count += 1;
});
