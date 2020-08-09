class bookModel {
    constructor(id, title, authorId, pageCount, read) {
        (id < 0) ? bookModel.throwExc('id') :
            pageCount <= 0 ? bookModel.throwExc('pageCount') :
                read > new Date().getFullYear() ? bookModel.throwExc('readYear') : "";
        this.id = id;
        this.title = title;
        this.authorId = authorId;
        this.pageCount = pageCount;
        this.read = read;
    }

    /**
     * @param reason
     * @throws error according to the given reason
     */
    static throwExc = (reason) => {
        switch (reason) {
            case 'id':
                throw  new Error("Id cannot be negative or null");
            case 'pageCount' :
                throw new Error("Page count cannot be negative");
            case 'readYear':
                throw new Error("Should have read before");
        }
    }

    /**
     * @param json
     * @returns Object type of book
     */
    static  fromJSON = (json) => {
        return new bookModel(json['id'], json['title'], json['authorId'], json['pageCount'], json['read']);
    }

    /**
     * @returns JSON string of author
     */
    toJSONString() {
        return JSON.stringify(this);
    }

    /**
     * print() function, which writes in console formatted info , such as
     * book id – 1
     * book title – White Fang
     * book pages count – 500
     * book read on - 2019
     */
    print() {
        let res = `Book id: ${this.id}
Book title: ${this.title}
Book pages count: ${this.pageCount}
Book read on: ${this.read}`
        console.log(res);
        return res;
    }
}

let bookForTest = new bookModel(1, 'Three Comrades', 1, 415);

bookForTest.print()