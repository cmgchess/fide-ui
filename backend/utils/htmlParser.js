const cheerio = require('cheerio');

const nullIfEmpty = (str) => (str.trim() === '' ? null : str);

const getPlayerDetails = (html) => {
    const $ = cheerio.load(html);
    const divsWithClass = $('div.profile-top-info__block__row__data');
    const pageTitle = $('title').text().trim();
    const vals = [pageTitle]
    divsWithClass.each((i, el) => {
        const text = nullIfEmpty($(el).text());
        vals.push(text);
    });
    return {name: vals[0], activeWorldRank: vals[1], federation: vals[2], fideID: vals[3], bYear: vals[4], sex: vals[5], fideTitle: vals[6]};
};

module.exports = { getPlayerDetails };