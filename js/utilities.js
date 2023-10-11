export class Utilities {
    static escapeHtml = (string) => {
        if (typeof string !== 'string') {
            return string;
        }
        return string.replace(/[&'`"<>]/g, function (match) {
            return {
                '&': '&amp;',
                "'": '&#x27;',
                '`': '&#x60;',
                '"': '&quot;',
                '<': '&lt;',
                '>': '&gt;'
            }[match];
        });
    }

    static isEqual = (value, other) => {
        const vJson = JSON.stringify(Object.entries(value).sort());
        const oJson = JSON.stringify(Object.entries(other).sort());

        return vJson === oJson;
    }

    static convertDate = (value) => {
        const date = value.toISOString();
        return date.replace(/[-:.TZ]/g, function (match) {
            return {
                '-': '',
                ':': '',
                'T': '_',
                '.': '_',
                'Z': ''
            }[match];
        });
    }
}