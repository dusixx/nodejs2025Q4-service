import { tryKillTask } from '../src/common/utils';

void tryKillTask('node').then(void tryKillTask('docker-compose'));
