import merge from 'webpack-merge';

// Base Config
import { defaultConfigModule } from '../base/module';

// Settings
import { basicSettings } from './settings/basicSettings';
import { outputSettings } from './settings/outputSettings';
import { devServerSettings } from './settings/devServerSettings';

// Tasks
import { moduleCompileCSS } from './tasks/compileCSS/module'

export const devConfigModule = merge(
  defaultConfigModule,
  basicSettings,
  outputSettings,
  devServerSettings,
  moduleCompileCSS,
);