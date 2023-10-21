#!/usr/bin/env node
console.clear();

const { gray } = require('colors');
const { commandkit, hints } = require('./config');

const setup = require('./functions/setup');
const installDeps = require('./functions/installDeps');
const copyTemplates = require('./functions/copyTemplates');

const prompts = require('@clack/prompts');
const path = require('path');

const gradient = require('gradient-string');

(async () => {
    prompts.intro(`Welcome to ${commandkit}!`);

    const { dir, manager, type, token } = {
        dir: path.resolve(process.cwd(), await prompts.text({
            message: 'Enter a project directory:',
            placeholder: 'Leave blank for current directory',
            defaultValue: '.',
        })),

        manager: await prompts.select({
            message: 'Select a package manager:',
            options: [{ value: 'npm' }, { value: 'pnpm' }, { value: 'yarn' }],
        }),

        type: await prompts.select({
            message: 'Select a module type:',
            options: [
                { label: 'CommonJS', value: 'cjs', hint: `${hints.require} & ${hints.module}` },
                { label: 'ES Modules', value: 'esm', hint: `${hints.import} & ${hints.export}` },
            ]
        }),

        token: await prompts.password({
            message: 'Enter your bot token:',
            mask: gray('*')
        })
    }

    const spinner = prompts.spinner();
    spinner.start('Setting up project');

    await setup({ manager, token, dir, type });
    await installDeps({ manager, dir });
    await copyTemplates({ type, dir, lang: 'js' });

    spinner.stop('Setup done.');

    prompts.outro(gradient.summer('Happy coding!'));
})();