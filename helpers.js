module.exports = {
    formatText: function(text) {
        return text.replace(/\n/g, '<br>');
    },
    formatDate: function(date) {
        return new Date(date).toLocaleString('en-GB',  { timeZone: 'UTC' });
    },
    encodeURI: function(text) {
        return encodeURIComponent(text.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-]/g, ''));
    },
    sortArticles: function(rows) {
        let drafts = [];
        let published = [];
        for (let row of rows) {
            if (row.date_published) {
                published.push(row);
            } else {
                drafts.push(row);
            }
        }
        return { drafts, published };
    },
    getInvalidKeys: function (obj) {
        return (Object.keys(obj).filter((k) => obj[k] === '')).join(', ');
    }
};

