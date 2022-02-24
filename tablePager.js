
function paginateTable(tableId, navId, rowCountPerPageArray) {


    // element that contains the selectList and page buttons and table node to page
    let navigation = null;
    let table = null;
    try{
        navigation = document.getElementById(navId);
    // console.log(navigation);

        table = document.getElementById(tableId);
    } catch (error) {
        console.error(error);
        return;
    }
    let tableBody = table.getElementsByTagName('tbody')[0];
    // console.log(table);

    // row elements in the table
    let rows = tableBody.getElementsByTagName('tr');
    // console.log(rows);

    // current page
    let page = 1;

    // list of different row count per page
    let selectList = document.createElement("select");
    selectList.className = "mx-2";
    rowCountPerPageArray.forEach((index, count) => {
        let option = document.createElement("option");
        option.innerHTML = [index];
        option.value = count;
        selectList.appendChild(option);
    });
    navigation.appendChild(selectList);
    // console.log(selectList);

    function getRowCountPerPage() {
        return rowCountPerPageArray[selectList.selectedIndex];
    }

    let previousButton = document.createElement("button");
    previousButton.className = "btn btn-outline-dark";
    previousButton.innerHTML = "&lt;";
    previousButton.value = "previous";
    navigation.appendChild(previousButton);
    // console.log(previousButton.value);

    let pageButtons = [];
    let nextButton = null;

    function hideRows() {
        var firstRow = (page - 1) * parseInt(getRowCountPerPage());
        var lastRow = firstRow + parseInt(getRowCountPerPage());
        // console.log(getRowCountPerPage())
        // console.log(firstRow + " : " + lastRow);
        for (i = 0; i < rows.length; i++) {
            // console.log(i + " : " + (firstRow <= i && i < lastRow));
            rows[i].hidden = !(firstRow <= i && i < lastRow);
            // rows[i].style.color = (firstRow <= i && i < lastRow) ? "blue": "red";
        }
    }
    // console.log("function hideRows created");

    function createButtons() {

        pageButtons = [];
        for (let i = 0; i < Math.ceil(rows.length / getRowCountPerPage()); i++) {
            let button = document.createElement("button");
            button.className = "btn btn-outline-dark mx-1 button-page";
            button.innerHTML = (i + 1).toString();
            button.value = i + 1;
            button.addEventListener("click", () => {
                page = button.value;
                hideRows();
            })
            navigation.appendChild(button);
            pageButtons.push(button);
        }
        // console.log(pageButtons)

        if (nextButton === null) {
            nextButton = document.createElement("button");
            nextButton.className = "btn btn-outline-dark btn-next";
            nextButton.innerHTML = "&gt";
            nextButton.value = "next";
        }
        navigation.appendChild(nextButton);
    }
    // console.log("function createButtons created");

    function deleteButtons() {
        pageButtons.forEach((button) => {button.remove()});
        nextButton.remove();
    }
    // console.log("function deleteButtons created");

    createButtons();

    selectList.addEventListener("click", () => {
        page = 1;
        hideRows();
        deleteButtons();
        createButtons();
    })

    hideRows();
}

