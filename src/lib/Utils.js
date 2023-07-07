export default class Utils {

    static sortLexical (a, b) {
        return a.toString().localeCompare(b)
    }

    static sortNumeric (strA, strB) {
        return parseInt(strA) - parseInt(strB);
    }

}

