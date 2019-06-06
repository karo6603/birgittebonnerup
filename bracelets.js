// FILTRERINGSKNAPPER DROPDOWN

let materialsbtn = document.querySelector(".materialsbtn");
let colorsbtn = document.querySelector(".colorsbtn");
let pricesbtn = document.querySelector(".pricesbtn");

let materialscontent = document.querySelector(".dropdown-materials");
let colorscontent = document.querySelector(".dropdown-colors");
let pricescontent = document.querySelector(".dropdown-prices");

materialsbtn.addEventListener("click", dropMaterials);
colorsbtn.addEventListener("click", dropColors);
pricesbtn.addEventListener("click", dropPrices);

function dropMaterials() {
    materialscontent.classList.toggle("show");

}

function dropColors() {
    colorscontent.classList.toggle("show");

}

function dropPrices() {
    pricescontent.classList.toggle("show");

}


//HENT SPLASHBILLEDER VIA WP REST API


document.addEventListener("DOMContentLoaded", start);

function start() {
    // Hent json fil fra Wordpress
    async function getJson() {
        let url = ("https://karolinekrogsboell.dk/kea/birgittebonnerup/wordpress/wp-json/wp/v2/splashbillede/20");
        let jsonData = await fetch(url);
        billeder = await jsonData.json();
        visBilleder();
    }

    function visBilleder() {

        document.querySelector("#splash").style.backgroundImage = "url(" + billeder.billede.guid + ")";

    }

    getJson()
}



//HENT PRODUKTER VIA WP REST API + FILTRERING + SORTERING


let bracelets = [];
let materials = "Alle";
let colors = "Alle";
document.addEventListener("DOMContentLoaded", shop);

function shop() {
    async function getJson2() {
        let url = "https://karolinekrogsboell.dk/kea/birgittebonnerup/wordpress/wp-json/wp/v2/armbaand?per_page=100";
        let jsonData2 = await fetch(url);
        bracelets = await jsonData2.json();
        visBracelets();


    }

    function visBracelets() {

        let dest = document.querySelector("#products");
        let temp = document.querySelector("template");

        dest.innerHTML = "";

        bracelets.forEach(bracelet => {


            if ((materials == "Alle" || materials == bracelet.materiale[0]) &&
                (colors == "Alle" || colors == bracelet.farve)) {

                let klon = temp.cloneNode(true).content;

                klon.querySelector("#product").style.backgroundImage = "url(" + bracelet.billede_1.guid + ")";

                klon.querySelector(".price").innerHTML = `${bracelet.pris} DKK`;

                klon.querySelector("#product").addEventListener("click", () => {
                    location.href = "singlebracelet.html?id=" + bracelet.id;
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

    function visMaterialer() {
        materials = this.textContent;

        visBracelets();
    }

    function visFarver() {
        colors = this.textContent;

        visBracelets();
    }

    document.querySelector(".pricesup").addEventListener("click", () => {
        bracelets.sort((a, b) => parseInt(a.pris) - parseInt(b.pris));

        visBracelets();
    })

    document.querySelector(".pricesdown").addEventListener("click", () => {
        bracelets.sort((a, b) => parseInt(b.pris) - parseInt(a.pris));
        visBracelets();
    })

    getJson2();
}
