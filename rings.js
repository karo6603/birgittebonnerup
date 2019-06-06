// FILTRERINGSKNAPPER DROPDOWN

// Her vælges alle knapperne til filtrering og sortering og der tilføjes eventlisteners

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

// Eventlisteners leder til funktioner der tilføjer show klassen til knappens dropdown indhold

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

// HENT SPLASHBILLEDE VIA WP REST API


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

        // Her indsættes splash billedet hentet i json filen som baggrundsbillede i div'en splash

        document.querySelector("#splash").style.backgroundImage = "url(" + billeder.billede.guid + ")";

    }

    getJson()
}


// HENT PRODUKTER VIA WP REST API + FILTRERING + SORTERING

// Her specificeres at rings er et tomt array, hvor filerne fra json lægges og at alle filtreringerne starter med at vise alle

let rings = [];
let materials = "Alle";
let colors = "Alle";
let stones = "Alle";

document.addEventListener("DOMContentLoaded", shop);

function shop() {
    async function getJson2() {
        //Hent json fil fra Wordpress
        let url = "https://karolinekrogsboell.dk/kea/birgittebonnerup/wordpress/wp-json/wp/v2/ring?per_page=100";
        let jsonData2 = await fetch(url);
        rings = await jsonData2.json();
        visRings();
    }

    function visRings() {

        let dest = document.querySelector("#products");
        let temp = document.querySelector("template");

        //Her sletter vi indholdet i destinationen før den viser det nye, så det opdateres når man bruger filtreringen

        dest.innerHTML = "";

        // Opdeling af json filen i enkelte posts
        rings.forEach(ring => {

            // Hvis de enkelte filtreringsknapper er trykket på, vises kun de produkter, ellers vises alle
            if ((materials == "Alle" || materials == ring.materiale) &&
                (colors == "Alle" || colors == ring.farve) && (stones == "Alle" || stones == ring.sten)) {

                let klon = temp.cloneNode(true).content;

                // Her indsættes json filernes informationer i templaten

                klon.querySelector("#product").style.backgroundImage = "url(" + ring.billede_1.guid + ")";

                klon.querySelector(".price").innerHTML = `${ring.pris} DKK`;

                // Hvis der klikkes på et produkt, leder siden videre til en ny html side med endpoint skabt af det enkelte produkts id

                klon.querySelector("#product").addEventListener("click", () => {
                    location.href = "singlering.html?id=" + ring.id;
                })

                dest.appendChild(klon);
            }


        })
    }

    // Her indsamler vi filtreringsværdier ved at man klikker på filtreringsknapperne

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

        // Materialer vil nu have værdien der stod i knappen der blev klikket på
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

    // Her sorterer vi produkterne efter pris, ved at gøre brug af parseInt for at konvertere prisen fra en string til et nummer

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
