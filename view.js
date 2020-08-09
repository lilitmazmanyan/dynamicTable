window.onload = createTable;

function initializeHeader(table) {
    let headers = ['Name', 'Author', 'Pages number', 'Read in']
    let index = 0;
    for (let i in headers) {
        let newHeader = document.createElement('th');
        newHeader.innerHTML = headers[index++];
        table.appendChild(newHeader)
    }

}

function createTable() {
    let body = document.getElementsByTagName("body")[0]; // Took the 0th element, because getElementsByTagName returns array
    let table = document.createElement('table')

    // Instances of both classes to use non-static methods (getBooks and getAuthors
    let bookService1 = new bookService();
    let authorService1 = new AuthorService()

    initializeHeader(table); // Adding headers

    let count = 0; // count variable for the last row, which should shot the total count of books read
    Promise.all([bookService1.getBooksList(), authorService1.getAuthors()]).then(([booksList, authorsList]) => {
            console.log(authorsList)

            //Rendering the inner part of table
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
                        newData.innerText = authorsList.find((author) => author.id === book.authorId).firstName + ' ' +
                            '' + authorsList.find((author) => author.id === book.authorId).lastName
                    }
                    newRow.appendChild(newData);
                }
                table.appendChild(newRow)
            }

            // The last row we should show the total count
            let lastRow = document.createElement('tr')
            let totalCount = document.createElement('td')
            totalCount.setAttribute('colspan', 4)
            totalCount.setAttribute('align', 'center')
            totalCount.innerHTML = `Total count of books read is ${count}`;
            lastRow.appendChild(totalCount)
            table.appendChild(lastRow);

            body.appendChild(table);
        }
    )
}
