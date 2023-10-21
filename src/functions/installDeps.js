const { commands } = require('../config');
const { execSync: ex } = require('child_process');

module.exports = async ({ manager, dir, stdio = 'pipe' }) => {
    ex(commands.install[manager], { cwd: dir, stdio });
}