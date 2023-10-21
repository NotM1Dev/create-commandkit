const { templates } = require('../config');
const fs = require('fs-extra');

module.exports = async ({ type, dir, lang }) => {
    await fs.copy(templates[lang][type], dir);
}