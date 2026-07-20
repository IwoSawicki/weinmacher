import * as migration_20260720_061933_init from './20260720_061933_init';

export const migrations = [
  {
    up: migration_20260720_061933_init.up,
    down: migration_20260720_061933_init.down,
    name: '20260720_061933_init'
  },
];
