//
// This script runs the less compiler
//
import commandLineArgs from 'command-line-args';
import { execSync } from 'child_process';

console.log('Generating viur-theme');
execSync(`lessc src/ignite/shoelace.less dist/themes/viur.css`, { stdio: 'inherit' });
