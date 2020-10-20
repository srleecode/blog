import { configure, addDecorator } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator(withKnobs);
configure([require.context('../feature/src/lib', true, /.stories.ts$/), require.context('../ui/src/lib', true, /.stories.ts$/)], module);
