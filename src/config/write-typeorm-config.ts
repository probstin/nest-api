import { config } from './db.config';
import fs = require('fs');

fs.writeFileSync('ormconfig.json', JSON.stringify(config, null, 2));