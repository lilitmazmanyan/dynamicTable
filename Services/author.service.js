class AuthorService {
    authorsString = `[
  {
    "id": 1,
    "firstName": "Jack",
    "lastName": "London",
    "birthDate": -2965431480000
  },
  {
    "id": 2,
    "firstName": "Ernest",
    "lastName": "Hemingway",
    "birthDate": -2223169080000
  },
  {
    "id": 3,
    "firstName": "Mark",
    "lastName": "Twain",
    "birthDate": -4231450680000
  },
  {
    "id": 4,
    "firstName": "Charles",
    "lastName": "Dickens",
    "birthDate": -4982871480000
  }
]
`

    getAuthors() {
        return Promise.resolve(JSON.parse(this.authorsString).map((author) => authorModel.fromJSON(author)))
    };


    static findAuthorById(authors, id) {
        authors.find((author) => {
            return author.id === id;
        })
    }

}