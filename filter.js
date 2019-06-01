   let materialsbtn = document.querySelector(".materialsbtn");
   let colorsbtn = document.querySelector(".colorsbtn");
   let pricesbtn = document.querySelector(".pricesbtn");
   let stonesbtn = document.querySelector(".stonesbtn");

   let materialscontent = document.querySelector(".dropdown-materials");
   let colorscontent = document.querySelector(".dropdown-colors");
   let pricescontent = document.querySelector(".dropdown-prices");
   let stonescontent = document.querySelector(".dropdown-stones");

   materialsbtn.addEventListener("click", dropMaterials);
   colorsbtn.addEventListener("click", dropColors);
   pricesbtn.addEventListener("click", dropPrices);
   stonesbtn.addEventListener("click", dropStones);

   function dropMaterials() {
       materialscontent.classList.toggle("show");

   }

   function dropColors() {
       colorscontent.classList.toggle("show");

   }

   function dropPrices() {
       pricescontent.classList.toggle("show");

   }

   function dropStones() {
       stonescontent.classList.toggle("show");

   }
