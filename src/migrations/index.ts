import * as migration_20260720_061933_init from './20260720_061933_init';
import * as migration_20260720_114139_website_global from './20260720_114139_website_global';
import * as migration_20260721_101727_events_zeiten from './20260721_101727_events_zeiten';

export const migrations = [
  {
    up: migration_20260720_061933_init.up,
    down: migration_20260720_061933_init.down,
    name: '20260720_061933_init',
  },
  {
    up: migration_20260720_114139_website_global.up,
    down: migration_20260720_114139_website_global.down,
    name: '20260720_114139_website_global',
  },
  {
    up: migration_20260721_101727_events_zeiten.up,
    down: migration_20260721_101727_events_zeiten.down,
    name: '20260721_101727_events_zeiten'
  },
];
