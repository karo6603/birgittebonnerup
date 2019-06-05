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


   document.addEventListener("DOMContentLoaded", start);

   function start() {
       // Hent json fil fra Wordpress
       async function getJson() {
           let url = ("https://karolinekrogsboell.dk/kea/birgittebonnerup/wordpress/wp-json/wp/v2/splashbillede/18");
           let jsonData = await fetch(url);
           billeder = await jsonData.json();
           visBilleder();
       }

       function visBilleder() {

           document.querySelector("#splash").style.backgroundImage = "url(" + billeder.billede.guid + ")";

       }

       getJson()
   }

   let rings = [];
   let materials = "Alle";
   let colors = "Alle";
   let stones = "Alle";
   document.addEventListener("DOMContentLoaded", shop);

   function shop() {
       async function getJson2() {
           let url = "https://karolinekrogsboell.dk/kea/birgittebonnerup/wordpress/wp-json/wp/v2/ring?per_page=100";
           let jsonData2 = await fetch(url);
           rings = await jsonData2.json();
           visRings();
       }

       function visRings() {

           let dest = document.querySelector("#products");
           let temp = document.querySelector("template");

           dest.innerHTML = "";

           rings.forEach(ring => {


               if ((materials == "Alle" || materials == ring.materiale[0]) &&
                   (colors == "Alle" || colors == ring.farve) && (stones == "Alle" || stones == ring.sten)) {

                   let klon = temp.cloneNode(true).content;

                   klon.querySelector("#product").style.backgroundImage = "url(" + ring.billede_1.guid + ")";

                   klon.querySelector(".price").innerHTML = `${ring.pris} DKK`;

                   klon.querySelector("#product").addEventListener("click", () => {
                       location.href = "singlering.html?id=" + ring.id;
                   })

                   dest.appendChild(klon);
               }


           })
       }



       document.querySelectorAll(".materials").forEach(elm => {
           elm.addEventListener("click", visMaterialer);
       })

       document.querySelectorAll(".colors").forEach(btn => {
           btn.addEventListener("click", visFarver);
       })

       document.querySelectorAll(".stones").forEach(stn => {
           stn.addEventListener("click", visSten);
       })

       function visMaterialer() {
           materials = this.textContent;

           visRings();
       }

       function visFarver() {
           colors = this.textContent;

           visRings();
       }

       function visSten() {
           stones = this.textContent;

           visRings();
       }

       document.querySelector(".pricesup").addEventListener("click", () => {
           rings.sort((a, b) => parseInt(a.pris) - parseInt(b.pris));

           visRings();
       })

       document.querySelector(".pricesdown").addEventListener("click", () => {
           rings.sort((a, b) => parseInt(b.pris) - parseInt(a.pris));

           visRings();
       })

       getJson2();
   }
