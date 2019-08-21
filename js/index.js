const manageCollection = function () {
  let cardDefault = [];
  let categorieId = [1158, 1130, 1129, 1127, 1125, 3, 2];
  let classeId;
  let manaCost = ['All'];
  let search = '';
  let typeId;
  let minionTypeId;

  function afficher() {
    document.querySelector("#container").innerHTML = '';
    cardDefault.forEach(element => {
      if (categorieId.includes(element.cardSetId) && element.classId == classeId) {
        if (element.cardTypeId == typeId || element.minionTypeId == minionTypeId || element.text.toLowerCase().includes(search) || element.name.toLowerCase().includes(search)) {
          if (manaCost.includes(element.manaCost) || manaCost.includes('All')) {
            document.querySelector(`#container`).insertAdjacentHTML('beforeend', `<div class="item"><img class="carteImage" src="${element.image}" alt=""></div>`);
          }
        }
      }
    });
  }

  return {
    log: function () {
      console.log(cardDefault);
    },
    apiRequest: async function () {
      try {
        for (let page = 1; page < 6; page++) {
          const url = `https://us.api.blizzard.com/hearthstone/cards?locale=fr_FR&collectible=1&type=minion%2Cspell%2Cweapon&pageSize=500&page=${page}&access_token=UShkgGfrebek88tlNZrQ8ejpMVEswTFArY`;
          await fetch(url)
            .then(function (response) {
              return response.json();
            })
            .then(function (json) {
              json.cards.forEach(element => {
                cardDefault.push(element);
              });
            });
        }
        localStorage.setItem("dataAPIHearthstone", JSON.stringify(cardDefault));
      } catch (error) {
        if (localStorage.getItem("dataAPIHearthstone")) {
          cardDefault = JSON.parse(localStorage.getItem('dataAPIHearthstone'));
        } else {
          alert(error);
        }
      }
      collection.classeFilter("neutre");
    },
    setSearchFilter: function (parameter) {
      search = parameter;
    },
    show: function () {
      afficher();
    },
    classeFilter: function (parameter) {
      switch (parameter) {
        case "druide":
          classeId = 2;
          break;
        case "chasseur":
          classeId = 3;
          break;
        case "mage":
          classeId = 4;
          break;
        case "paladin":
          classeId = 5;
          break;
        case "prêtre":
          classeId = 6;
          break;
        case "voleur":
          classeId = 7;
          break;
        case "chaman":
          classeId = 8;
          break;
        case "demoniste":
          classeId = 9;
          break;
        case "guerrier":
          classeId = 10;
          break;
        case "neutre":
          classeId = 12;
          break;
        default:
          confirm.log('error');
          break;
      }
      afficher();
    },
    categorieFilter: function (parameter) {
      switch (parameter) {
        case "Cartes standard":
          categorieId = [1158, 1130, 1129, 1127, 1125, 3, 2];
          break;
        case "Uldum":
          categorieId = [1158];
          break;
        case "Eveil des ombres":
          categorieId = [1130];
          break;
        case "Rastakhan":
          categorieId = [1129];
          break;
        case "Armageboum":
          categorieId = [1127];
          break;
        case "Bois Maudit":
          categorieId = [1125];
          break;
        case "Kobolds et Catacombes":
          categorieId = [1004];
          break;
        case "Chevaliers du Trône de glace":
          categorieId = [1001];
          break;
        case "Voyage au centre d’Un’Goro":
          categorieId = [27];
          break;
        case "Main basse sur Gadgetzan":
          categorieId = [25];
          break;
        case "Une nuit à Karazhan":
          categorieId = [23];
          break;
        case "Les murmures des Dieux très anciens":
          categorieId = [21];
          break;
        case "Ligue des explorateurs":
          categorieId = [20];
          break;
        case "Le Grand Tournoi":
          categorieId = [15];
          break;
        case "Mont Rochenoire":
          categorieId = [14];
          break;
        case "Gobelins et Gnomes":
          categorieId = [13];
          break;
        case "La malédiction de Naxxramas":
          categorieId = [12];
          break;
        case "Classique":
          categorieId = [3];
          break;
        case "Jeu de base":
          categorieId = [2];
          break;
        case "Le Panthéon":
          categorieId = [4];
          break;
        default:
          console.log('Toutes les cartes');
          categorieId = [1158, 1130, 1129, 1127, 1125, 3, 2, 1004, 1001, 27, 25, 23, 21, 20, 15, 14, 13, 12];
          break;
      }
      afficher();
    },
    manaCostFilter: function (parameter) {
      manaCost.includes('All') && manaCost.splice(manaCost.indexOf('All'), 1);
      switch (parameter) {
        case "manaCost-0":
          manaCost.includes(0) ? manaCost.splice(manaCost.indexOf(0), 1) : manaCost.push(0);
          break;
        case "manaCost-1":
          manaCost.includes(1) ? manaCost.splice(manaCost.indexOf(1), 1) : manaCost.push(1);
          break;
        case "manaCost-2":
          manaCost.includes(2) ? manaCost.splice(manaCost.indexOf(2), 1) : manaCost.push(2);
          break;
        case "manaCost-3":
          manaCost.includes(3) ? manaCost.splice(manaCost.indexOf(3), 1) : manaCost.push(3);
          break;
        case "manaCost-4":
          manaCost.includes(4) ? manaCost.splice(manaCost.indexOf(4), 1) : manaCost.push(4);
          break;
        case "manaCost-5":
          manaCost.includes(5) ? manaCost.splice(manaCost.indexOf(5), 1) : manaCost.push(5);
          break;
        case "manaCost-6":
          manaCost.includes(6) ? manaCost.splice(manaCost.indexOf(6), 1) : manaCost.push(6);
          break;
        case "manaCost-7":
          for (let i = 7; i <= 12; i++) {
            manaCost.includes(i) ? manaCost.splice(manaCost.indexOf(i), 1) : manaCost.push(i);
          }
          break;
        default:
          console.log('error');
          break;
      };
      manaCost.length < 1 && manaCost.push('All');
      afficher();
    },
    searchFilter: function (parameter) {
      switch (parameter.toLowerCase()) {
        case 'serviteur':
          typeId = 4;
          search = 'serviteur';
          break;
        case 'sort':
          typeId = 5;
          search = 'sort';
          break;
        case 'arme':
          typeId = 7;
          search = 'arme';
          break;
        case 'murloc':
          minionTypeId = 14;
          search = 'murloc';
          break;
        case 'démon':
          minionTypeId = 15;
          search = 'démon';
          break;
        case 'méca':
          minionTypeId = 17;
          search = 'méca';
          break;
        case 'élémentaire':
          minionTypeId = 18;
          search = 'élémentaire';
          break;
        case 'bête':
          minionTypeId = 20;
          search = 'bête';
          break;
        case 'totem':
          minionTypeId = 21;
          search = 'totem';
          break;
        case 'pirate':
          minionTypeId = 23;
          search = 'pirate';
          break;
        case 'dragon':
          minionTypeId = 24;
          search = 'dragon';
          break;
        default:
          typeId = -1;
          search = parameter;
          break;
      }
      afficher();
    }
  }
}

const collection = manageCollection();
collection.apiRequest();

$("input[name=classe]").on("click", function () {
  collection.classeFilter(this.id);
});

$("#categorie-field").on("click", function () {
  collection.categorieFilter(this.value);
});

$("input[name=manaCost]").on("click", function () {
  collection.manaCostFilter(this.id);
});

$("#text-field").on("keyup", function () {
  collection.searchFilter(this.value);
});

$("#text-field").on("search", function () {
  collection.setSearchFilter('');
  collection.show();
});


// Modal
let modal = document.querySelector("#myModal");
let modalImg = document.getElementById("img01");

document.getElementById("container").addEventListener("click", function (e) {
  if (e.target.src) {
    modal.style.display = "block";
    modalImg.src = e.target.src;
  }
});

// When the user clicks on <span> (x), close the modal
document.getElementsByClassName("close")[0].onclick = function () {
  modal.style.display = "none";
};