import striptags from 'striptags';

class StringHelper {
    cleanText(text) {
        var result = striptags(text);
        result = result.replace(/&nbsp;/g, '');
        return result;
    }
}

export default new StringHelper;
