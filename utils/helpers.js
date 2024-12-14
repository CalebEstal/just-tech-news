module.exports = {
    format_date: (date) => {
        console.log('Formatting date:', date); // Log the input
        const formattedDate = `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
        console.log('Formatted date:', formattedDate); // Log the result
        return formattedDate;
    },

    format_plural(word, amount) {
        if (amount === 1) {
            return word;
        } else {
            return word + 's';
        }
    },

    format_url: url => {
        return url
            .replace('http://', '')
            .replace('https://', '')
            .replace('www.', '')
            .split('/')[0]
            .split('?')[0]
    },
}