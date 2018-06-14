function napraviKartuIgrac(x, Spil) {
  var karta = document.createElement("div");
  var slika = document.createElement("img");
  slika.setAttribute("src", "./karte/" + Spil[x].linkSlika);
  karta.setAttribute("id", "karta");
  var karteIgrac = document.getElementById('karteigrac');
  karta.appendChild(slika);
  karteIgrac.appendChild(karta);
};

function Karta(naziv, vrijednost, boja, linkSlika){
  this.naziv = naziv;
  this.vrijednost = vrijednost;
  this.boja = boja;
  this.linkSlika = linkSlika;
};

function napraviKartuAi(x, Spil) {
  var karta = document.createElement("div");
  var slika = document.createElement("img");
  slika.setAttribute("src", "./karte/" + Spil[x].linkSlika);
  karta.setAttribute("id", "karta");
  var karteAi = document.getElementById('karteai');
  karta.appendChild(slika);
  karteAi.appendChild(karta);
};

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function napraviSpil(Spil){

  var boje = ['srce', 'karo', 'pik', 'tref'];
  var brojac = 0;

  for(var j = 0; j < 4; j++){
    for(var i = 0; i < 13; i++){
      switch (i) {
        case 0:
          Spil[brojac] = new Karta('A', 11, boje[j], 'A' + boje[j] + '.png');
          break;
        case 10:
          Spil[brojac] = new Karta('J', 10, boje[j], 'J' + boje[j] + '.png');
          break;
        case 11:
          Spil[brojac] = new Karta('Q', 10, boje[j], 'Q' + boje[j] + '.png');
          break;
        case 12:
          Spil[brojac] = new Karta('K', 10, boje[j], 'K' + boje[j] + '.png');
          break;
        default:
          Spil[brojac] = new Karta(i + 1, i + 1, boje[j], i+1 + boje[j] + '.png');
      }
      brojac++;
    }
  }
}

function mjesaj(Spil) {

  var j, x, i;
  for (i = Spil.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = Spil[i];
      Spil[i] = Spil[j];
      Spil[j] = x;
  }
}

function zaustaviIgru(igraj){
    var igraceveKarte = document.getElementById('karteigrac');
    var aiKarte = document.getElementById('karteai');
    var jelIzgubio = true;
    var igra = document.getElementById('igra');
    var luzer = document.createElement("p");
    luzer.setAttribute("id", "luzer");
    var tekst = document.createTextNode("Izgubio si haha!");
    var header = document.getElementById("header");
    luzer.appendChild(tekst);
    igra.appendChild(luzer);

    header.removeChild(hit);
    header.removeChild(stand);
    igra.removeChild(igraceveKarte);
    igra.removeChild(aiKarte);
    igra.appendChild(igraj);
}

function krajIgre(igraj){

    var igraceveKarte = document.getElementById('karteigrac');
    var aiKarte = document.getElementById('karteai');
    var igra = document.getElementById('igra');
    var pobjednik = document.createElement("p");
    pobjednik.setAttribute("id", "pobjednik");
    var tekst = document.createTextNode("Pobjedio si haha!");
    var header = document.getElementById("header");
    pobjednik.appendChild(tekst);
    igra.appendChild(pobjednik);

    header.removeChild(hit);
    header.removeChild(stand);

    igra.removeChild(igraceveKarte);
    igra.removeChild(aiKarte);
    igra.appendChild(igraj);
}

function pokreniIgru() {

    var igra = document.getElementById('igra');

    var igracImaAs = false;
    var aiImaAs = false;

    var luzer = document.getElementById('luzer');
    if(luzer) igra.removeChild(luzer);

    var pobjednik = document.getElementById('pobjednik');
    if(pobjednik) igra.removeChild(pobjednik);

    var igraceveKarte = document.createElement('div');
    var aiKarte = document.createElement('div');

    igraceveKarte.setAttribute("id", 'karteigrac');
    aiKarte.setAttribute("id", 'karteai');

    igra.appendChild(aiKarte);
    igra.appendChild(igraceveKarte);

    var aijeveKarte = [];
    var igraceveKarte = [];
    var Spil = [];

    var imaAs = false;

    napraviSpil(Spil);
    mjesaj(Spil);

    var igrzbroj = 0;
    var aizbroj = 0;

    var igraj = document.getElementById("gumb");
    igraj.parentNode.removeChild(igraj);

    var k = 0;
    for (var i = 0; i < 2; i++) {
      napraviKartuAi(k, Spil);
      aijeveKarte.push(Spil[i]);
      aizbroj += Spil[k].vrijednost;
      if(aizbroj > 21 && aiImaAs == false){
        for(var i = 0; i < aijeveKarte.length - 1; i++){
          if(aijeveKarte[i].naziv == 'A' && aiImaAs == false) {
              aizbroj -= 10;
              aiImaAs = true;
            };
      }}
      k++;
    };


    for (var i = 2; i < 4; i++) {
      napraviKartuIgrac(k, Spil);
      igraceveKarte.push(Spil[i]);
      igrzbroj += Spil[k].vrijednost;
      if(igrzbroj > 21 && igracImaAs == false){
        for(var i = 0; i < igraceveKarte.length - 1; i++){
          if(igraceveKarte[i].naziv == 'A' && igracImaAs == false) {
              igrzbroj -= 10;
              igracImaAs = true;
            };
      }};
      if(igrzbroj > 21){
        sleep(2000);
        zaustaviIgru(igraj);
      }
      k++;
    };

    var zbr = document.getElementById('zbroj');
    zbr.innerHTML = igrzbroj;

    var aizbr = document.getElementById('aizbroj');
    aizbr.innerHTML = aizbroj;

    var header = document.getElementById('header');
    var hit = document.createElement("button");
    hit.appendChild(document.createTextNode("HIT"));
    hit.setAttribute("id", "hit");
    hit.setAttribute("class", "uigri");
    header.appendChild(hit);

    var stand = document.createElement("button");
    stand.appendChild(document.createTextNode("STAND"));
    stand.setAttribute("id", "stand");
    stand.setAttribute("class", "uigri");
    header.appendChild(stand);
    hit.addEventListener('click', function() {
      napraviKartuIgrac(k, Spil);
      igraceveKarte.push(Spil[k]);
      igrzbroj += Spil[k].vrijednost;
      if(igrzbroj > 21 && igracImaAs == false){
        for(var i = 0; i < igraceveKarte.length - 1; i++){
          if(igraceveKarte[i].naziv == 'A' && igracImaAs == false) {
              igrzbroj -= 10;
              igracImaAs = true;
            };
      }}
      zbr.innerHTML = igrzbroj;
      if(igrzbroj > 21){
        zaustaviIgru(igraj);
      }
      k++;
    });

    stand.addEventListener('click', function() {
        while(aizbroj < 17) {
          napraviKartuAi(k, Spil);
          aijeveKarte.push(Spil[k]);
          aizbroj += Spil[k].vrijednost;
          if(aizbroj > 21 && aiImaAs == false){
            for(var i = 0; i < aijeveKarte.length - 1; i++){
              if(aijeveKarte[i].naziv == 'A' && aiImaAs == false) {
                  aizbroj -= 10;
                  aiImaAs = true;
                };
          }}
          aizbr.innerHTML = aizbroj;
          k++;
        };
        if(aizbroj > igrzbroj && aizbroj < 22) {
          zaustaviIgru(igraj);
        } else {
          krajIgre(igraj);
        };
    })
}
