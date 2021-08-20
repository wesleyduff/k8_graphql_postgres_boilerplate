import config from '../../config/index.js';
import chalk from 'chalk';
import runDockerLocalVersion from './local.build.docker.js';

console.log(chalk.bgCyan(`================== LOCAL ========================`));
console.log(chalk.gray(`===================================================`));

runDockerLocalVersion(config);