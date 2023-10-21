const { templates } = require('../config');
const { execSync: ex } = require('child_process');

const fs = require('fs-extra');

module.exports = async ({ type, dir, lang }) => {
    await fs.copy(templates[lang][type], dir);
}