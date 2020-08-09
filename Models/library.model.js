class LibraryModel {
    // Creates and initializes an object on type LibraryModel
    constructor(type) {
        if (!(type in LibraryModel.LibType)) {
            LibraryModel.throwErr('type');
        }
        LibraryModel.type = type;
    }

    /**
     * @param books
     * @param sortType
     * @return sorted array according to parameters
     */
    static sortBooksByTitle(books, sortType) {
        if (!(sortType in LibraryModel.SortBy)) {
            LibraryModel.throwErr('sortType')
        }

        if (sortType === LibraryModel.SortBy["NoSorting"]) return books;

        let res = books.sort((b1, b2) => {
            return b1.title > b2.title ? 1 : b1.title === b2.title ? 0 : -1;
        })

        return sortType === LibraryModel.SortBy.Ascending ? res : res.reverse()

    }

    /**
     * @param books
     * @param sortType
     * @return sorted array according to parameters
     */
    static sortBooksByPageCount(books, sortType) {
        if (!(sortType in LibraryModel.SortBy)) {
            LibraryModel.throwErr('sortType')
        }

        let result = books.slice().sort(function (b1, b2) {
            return b1.pageCount - b2.pageCount
        })

        return sortType === LibraryModel.SortBy["Ascending"] ? result : sortType === LibraryModel.SortBy["Descending"] ? result.reverse() : books;
    }

    /**
     * @param books
     * @param sortType
     * @return sorted array according to parameters
     */
    static sortBooksByReadOn(books, sortType) {
        if (!(sortType in LibraryModel.SortBy)) {
            LibraryModel.throwErr('sortType')
        }

        let result = books.slice().sort(function (b1, b2) {
            return b1.read - b2.read;
        })

        return sortType === LibraryModel.SortBy["Ascending"] ? result : sortType === LibraryModel.SortBy["Descending"] ? result.reverse() : books;
    }

    /**
     * @param books
     * @param authors
     * @param sortType
     * @return sorted array according to parameters
     */
    static sortBooksByAuthorFullName(books, authors, sortType) {
        if (!(sortType in LibraryModel.SortBy)) LibraryModel.throwErr('sortType')

        return books.slice().sort(function (b1, b2) {

            // get authors full names by the book's authorId property
            let authorFullNameByBook1ID = authors.find((author) => author.id === b1.authorId).firstName + '' +
                '' + authors.find((author) => author.id === b1.authorId).lastName;
            let authorFullNameByBook2ID = authors.find((author) => author.id === b2.authorId).firstName + '' +
                '' + authors.find((author) => author.id === b2.authorId).lastName;

            return authorFullNameByBook1ID > authorFullNameByBook2ID ? 1 :
                authorFullNameByBook1ID === authorFullNameByBook2ID ? 0 : -1;
        });

    }

    /**
     * @param authors
     * @param sortType
     * @return sorted array according to parameters
     */
    static sortAuthorsByFullName(authors, sortType) {
        if (!(sortType in LibraryModel.SortBy)) {
            LibraryModel.throwErr('sortType')
        }

        if (sortType === LibraryModel.SortBy["NoSorting"]) {
            return authors;
        }

        // used slice method to sort the copy of the array and not the original one
        let res = authors.slice().sort((a1, a2) => {
            let a1fullName = `${a1.firstName} ${a1.lastName}`
            let a2fullName = `${a2.firstName} ${a2.lastName}`
            return a1fullName > a2fullName ? 1 : a1fullName === a2fullName ? 0 : -1;
        })

        return sortType === LibraryModel.SortBy["Ascending"] ? res : res.reverse();

    }

    /**
     * @param authors
     * @param sortType
     * @return sorted array according to parameters
     */
    static sortAuthorsByBirthDate(authors, sortType) {
        if (!(sortType in LibraryModel.SortBy)) {
            LibraryModel.throwErr('sortType')
        }

        if (sortType === LibraryModel.SortBy["NoSorting"]) return authors;

        let res = authors.slice().sort(function (a1, a2) {
            return a1.birthDate > a2.birthDate ? 1 : a1.birthDate === a2.birthDate ? 0 : -1;
        });

        return sortType === LibraryModel.SortBy["Ascending"] ? res : res.reverse();
    }

    /**
     * filterBooksByAuthorId(books, authorId) – return books by given author id
     *
     * @param books
     * @param authorId
     * @return books array of given author id
     */
    static filterBooksByAuthorId(books, authorId) {
        return books.filter((book) => {
            return book.authorId === authorId;
        })
    }

    /**
     * filterBooksByReadOn(books, read) - return books read in given year
     *
     * @param books
     * @param read
     * @return books array read in given year
     */
    static filterBooksByReadOn(books, read) {
        return books.filter((book) => {
            return book.read === read;
        })
    }

    /**
     *
     * @param books
     * @param pageCount
     * @param filterType
     * @return array of books in respect with the page count and filter type
     */
    static filterBooksByPageCount(books, pageCount, filterType) {
        if (!(filterType in LibraryModel.filterType)) LibraryModel.throwErr('filterType');
        let hamemNshan;
        (filterType === LibraryModel.filterType.Equal) ? hamemNshan = '===' : (filterType === LibraryModel.filterType.Less) ?
            hamemNshan = '<' : hamemNshan = '>'

        return books.slice().filter((book) => {
            return eval(`book.pageCount ${hamemNshan} pageCount`)
        })
    }

    //Indicates sorting type
    static LibType = {
        'technical': 'technical',
        'historical': 'historical',
        'literature': 'literature'
    }

    //Indicates sorting type
    static filterType = Object.freeze({
        'Less': 'Less',
        'Equal': 'Equal',
        'Greater': 'Greater'
    })

    //Indicates sorting type
    static SortBy = Object.freeze({
        'Ascending': 'Ascending',
        'Descending': 'Descending',
        'NoSorting': 'NoSorting'
    })

    //Throws exception in respect with the cause
    static throwErr = (cause) => {
        let message;
        cause === 'type' ? message = ('type must be an instance of LibType') :
            cause === 'filterType' ? message = 'Invalid filter type'
                : message = ('Type should be an instance of sortBy');

        throw new Error(message);
    }
}

let libraryForTest = new LibraryModel(LibraryModel.LibType.historical)

/*let b1 = new bookModel(1, "White Fang", 1, 500, 2019);
let b2 = new bookModel(2, "The Call of the Wild", 1, 356, 2018);
let b3 = new bookModel(3, "Martin Eden", 1, 356, 2019);
let b4 = new bookModel(4, "The Old Man and The Sea", 2, 300, 2018);
let b5 = new bookModel(5, "For Whom the Bell Tolls", 2, 356, 2019);
let b6 = new bookModel(6, "Adventures of Huckleberry Finn", 3, 650, 2017);
let b7 = new bookModel(7, "The Adventures of Tom Sawyer", 3, 500, 2017);
let b8 = new bookModel(8, "Oliver Twist", 4, 630, 2017);
let b9 = new bookModel(9, "Great Expectations", 4, 250, 2019);
let b10 = new bookModel(10, "Little Dorrit", 4, 654, 2018);

let books = [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10];*/
/*
console.log(LibraryModel.sortBooksByPageCount(books, LibraryModel.SortBy.Ascending));
console.log(LibraryModel.sortBooksByReadOn(books, LibraryModel.SortBy.Descending));
console.log(LibraryModel.sortBooksByReadOn(books, LibraryModel.SortBy.NoSorting));
console.log(LibraryModel.sortBooksByTitle(books, LibraryModel.SortBy.Descending));

console.log(LibraryModel.sortAuthorsByFullName([a1, a2, a3, a4], LibraryModel.SortBy.Descending));
console.log(LibraryModel.sortBooksByAuthorFullName(books, [a1, a2, a3, a4], LibraryModel.SortBy.Descending));

console.log(LibraryModel.filterBooksByAuthorId(books, 4));
console.log(LibraryModel.filterBooksByPageCount(books, 370, LibraryModel.filterType.Less));
console.log(LibraryModel.filterBooksByReadOn(books, 2019));
*/