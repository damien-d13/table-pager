const paginationNavigation = document.getElementById('pagination-navigation');

var numberOfTableRow = document.querySelectorAll('.pagination-row');


/* ----------   Create Element ---------------------------------- */
// Check Box Nb per Page
var nbPerPage = [2, 5, 10, 15, 20, 25, 30];

var checkboxNbPerPage = document.createElement("select");
checkboxNbPerPage.className = "mx-2";

for (let i = 0; i < nbPerPage.length; i++) {
    let option = document.createElement("option");
    option.innerHTML = nbPerPage[i];
    option.value = nbPerPage[i];
    checkboxNbPerPage.appendChild(option);
}

paginationNavigation.appendChild(checkboxNbPerPage);
var nbPageSelect = document.querySelector('select');
var nbPage = nbPageSelect.options[nbPageSelect.selectedIndex].value;

// BUTTON left with SVG
var btnLeft = document.createElement("button");
btnLeft.className = "btn btn-outline-dark";
btnLeft.innerHTML = "&lt;";
btnLeft.value = "previous";

paginationNavigation.appendChild(btnLeft);

function createBtnPage() {


// Button Number Page
    for (let i = 0; i < Math.ceil(numberOfTableRow.length / nbPage); i++) {
        let btnNbPage = document.createElement("button");
        btnNbPage.className = "btn btn-outline-dark mx-1 button-page";
        btnNbPage.innerHTML = (i + 1).toString();
        btnNbPage.value = i + 1;
        // console.log(btnNbPage.value);

        paginationNavigation.appendChild(btnNbPage);
    }

//Button left with svg

    var btnright = document.createElement("button");
    btnright.className = "btn btn-outline-dark btn-next";
    btnright.innerHTML = "&gt;"
    btnright.value = "next"

    paginationNavigation.appendChild(btnright);
    numPageBtn = document.querySelectorAll('.button-page');
    btnNext = document.querySelector('.btn-next');


}

createBtnPage();
/*------------------------------ Event  ---------------------------*/

var numPageBtn = document.querySelectorAll('.button-page');
var btnNext = document.querySelector('.btn-next');
var numPage = 1;

// console.log(numPageBtn.length);
// console.log(nbPage);

//Click change visible row in page and number of page
nbPageSelect.addEventListener("click", (e) => {
    nbPage = nbPageSelect.options[nbPageSelect.selectedIndex].value
    hidePerPage();


    // Delete Buttoon
    for (let i = 0; i < numPageBtn.length; i++) {
        // paginationNavigation.removeChild(numPageBtn[i]);
        numPageBtn[i].remove();
        console.log(numPageBtn[i]);
    }

    btnNext.remove();

    //  Create button

    nbPage = nbPageSelect.options[nbPageSelect.selectedIndex].value;
    createBtnPage();
    console.log(numPageBtn);


})

function hidePerPage() {
    //
    // console.log("Num Page " + numPage);
    // console.log("Nb Page " + nbPage);
    var rowStart = (numPage - 1) * parseInt(nbPage);
    var rowEnd = rowStart + parseInt(nbPage);

    for (let i = 0; i < numberOfTableRow.length; i++) {

        // console.log(i + " : " + numberOfTableRow[i]);
        numberOfTableRow[i].hidden = !(rowStart <= i && i < rowEnd);
    }
}


for (let i = 0; i < numPageBtn.length; i++) {

    numPageBtn[i].addEventListener("click", (e) => {
        numPage = numPageBtn[i].value;
        // console.log(numPageBtn[i].value);
        hidePerPage()

    })
}

hidePerPage();