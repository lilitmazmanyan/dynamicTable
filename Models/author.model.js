class authorModel {
    constructor(id, firstName, lastName, birthDate) {

        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
    }

    /**
     * @param json
     * @returns Object type of authorModel
     */
    static fromJSON = (json) => {
        let author = new authorModel();
        author.birthDate = new Date(json['birthDate']);
        author.firstName = json['firstName'];
        author.id = json['id'];
        author.lastName = json['lastName'];
        return author;
    }

    /**
     * @returns formatted name such as – J.London
     */
    getFullName = () => {
        return `${this.firstName[0]}. ${this.lastName}`;
    }

    /**
     * @returns formatted birthDate
     */
    getFormattedBirthDate = () => {
        let date = new Date(this.birthDate);
        return `${date.getDate()} ${date.toLocaleString('default', {month: 'long'})} ${date.getFullYear()}`;
    }

    /**
     * @returns JSON string of author
     */
    toJSONString() {
        return JSON.stringify(this);
    }

    /**
     *  print() function, which writes in console formatted info , such as
     *  author id – 1
     *  author firstName – Jack
     *  author lastName – London
     *  author birthdate – 12 January 1876
     */
    print() {
        let res = `Author id: ${this.id}\nAuthor full name: ${this.firstName} ${this.lastName}\nAuthor birth date: ${this.birthDate.toLocaleString()}`;
        console.log(res)
        return res;
    }
}

let authorForTest = new authorModel(1, 'Erich Maria', 'Remark', new Date('1898-06-22').toDateString())
console.log(authorForTest.getFormattedBirthDate());
console.log(authorForTest.getFullName());
authorForTest.print();