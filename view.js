window.onload = createTable;

let table = document.createElement('table')

function createTable() {
    let body = document.getElementsByTagName("body")[0]; // Took the 0th element, because getElementsByTagName returns array

    // Instances of both classes to use non-static methods (getBooks and getAuthors
    let bookService1 = new bookService();
    let authorService1 = new AuthorService()

    initializeHeaders(table); // Adding headers

    Promise.all([bookService1.getBooksList(), authorService1.getAuthors()]).then(([booksList, authorsList]) => {
            body.appendChild(renderInnerTable(booksList, authorsList));
        }
    )

}

function initializeHeaders() {
    let headers = ['Name', 'Author', 'Pages number', 'Read in']
    let index = 0;
    for (let i in headers) {
        let newHeader = document.createElement('th');
        newHeader.innerHTML = headers[index++];
        table.appendChild(newHeader)
    }

}

/**
 * renderInnerTable function iterates over every book and its properties in books list adding each property to table
 * if it is time for the authorId property, it finds the author with given id from authorsList with find function
 *
 * @param booksList
 * @param authorsList
 * @return table with the whole data
 */
function renderInnerTable(booksList, authorsList) {
    let count = 0; // count variable for the last row, which should shot the total count of books read
    for (let i = 0; i < booksList.length; i++) {
        count++;
        let book = booksList[i];
        let newRow = document.createElement('tr');
        newRow.setAttribute('id', `row${count}`) // Added an id on every row for later popups
        for (let prop in book) {
            let newData;
            if (prop === 'id') continue;        // We do not need an ID column
            newData = document.createElement('td');
            if (prop !== 'authorId') {            // Author Ids need to be treated differently
                newData.innerText = book[prop];
            } else {                            // Taking authors full name to show in the table
                let authorById = authorsList.find((author) => author.id === book.authorId);
                newData.innerText = authorById.firstName + ' ' + authorById.lastName
            }
            newRow.appendChild(newData);
        }
        table.appendChild(newRow)
    }

    // The last row should show the total count
    let lastRow = document.createElement('tr')
    let totalCount = document.createElement('td')
    totalCount.setAttribute('colspan', 4)
    totalCount.setAttribute('align', 'center')
    totalCount.innerHTML = `Total count of books read is ${count}`;
    lastRow.appendChild(totalCount)
    table.appendChild(lastRow);

    return table;
}