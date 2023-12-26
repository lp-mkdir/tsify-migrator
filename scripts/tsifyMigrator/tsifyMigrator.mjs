import chalk from 'chalk';
import fs from 'fs';
import { exec } from 'node:child_process';

/**
 * L:14 & L:36 -> Why the special handling of error code 1?
 * In an unconventional but intentional approach, we interpret an error code of 1 as a success.
 * This unique scenario occurs when the TSC doesn't find 'no-any' errors,
 * leading to an "error code 1." This behavior is precisely what we expect to confirm the success
 * of our migration process.
 */
const execRun = (cmd) =>
  new Promise((resolve, reject) => {
    exec(cmd, (error, stdout) => {
      if (error) {
        if (error.code === 1) {
          resolve(stdout);
        } else {
          reject(error);
        }
      } else {
        resolve(stdout);
      }
    });
  });

function getIncludePaths() {
  const tsconfig = fs.readFileSync(`./tsconfig.no-any.json`, 'utf8');
  const regex = /[*]/g;

  return JSON.parse(tsconfig).include.map((path) => path.replace(regex, ''));
}

async function findBadOnes() {
  try {
    const pathStringList = getIncludePaths().join('|');
    const results = await execRun(`yarn tsc -b tsconfig.no-any.json | grep -E '${pathStringList}'`);

    /**
     * If we have stdout, then means that there are some
     * "no-any" errors that need to be fixed.
     */
    if (results) {
      console.log(results);
      console.log(chalk.red('ERROR: noImplicitAny failed -> Please fix the missing modules/files shown above.'));
      console.log(chalk.red(`Local debugger command: yarn tsc -b ./tsconfig.json | grep -E '${pathStringList}'`));
      process.exit(1); // Exit with an error code
    }

    console.log(chalk.green('TSIFY MIGRATION TEST SUCCESS!!'));
  } catch (error) {
    console.error(chalk.red('Error occurred during execution:'), error);
    process.exit(1); // Exit with an error code
  }
}

findBadOnes();
