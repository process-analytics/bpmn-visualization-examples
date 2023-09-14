import '@storybook/addon-console';
import { withConsole } from '@storybook/addon-console';

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [(storyFn, context) => withConsole()(storyFn)(context)],
};

export default preview;
