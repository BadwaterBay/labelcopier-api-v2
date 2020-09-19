/**
 * Environment setup for unit tests
 *
 * This script runs prior to running tests
 */

import 'regenerator-runtime';
import fetch from 'node-fetch';

global.fetch = fetch;
