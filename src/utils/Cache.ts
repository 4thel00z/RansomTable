export class CellCache {

    public static getHash(object) {

        switch (typeof object) {
            case  "object":
                return CellCache.hashcode(JSON.stringify(object));
            case "string":
                return CellCache.hashcode(object);
        }

        return false;
    }
    /**
     * Analogue to java hashcode except that shifting bits is slower
     * than numerical hashing.
     * Find test results here: http://jsperf.com/hashing-strings
     * */
    public static hashcode(string) {
        let result = 0,
            length = string.length;
        for (let i = 0; i < length; i++) {
            result = result * 31 + string.charCodeAt(i);
        }
        return result;
    }
}