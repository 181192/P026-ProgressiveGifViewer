var price = new Promise(function(resolve, reject) {

    setTimeout(function() {
      reject("Price A");
    }, 300);
  });

var slowprice = new Promise(function(resolve, reject) {

    setTimeout(function() {
      resolve("Price B");
    }, 800);
  });


var promises = [price, slowprice];
Promise.race(promises).then(function (price) {
  console.log(price);
}).catch(function (error) {
  console.log(error);
})
