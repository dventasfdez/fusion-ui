import StyleDictionary from 'style-dictionary';
import {formatTokens /* parseFontFamilies, parseFontWeights, parsePixels, parseShadows */} from './utils.mjs';

const {fileHeader, formattedVariables} = StyleDictionary.formatHelpers;

const THEMES = [
  {theme: 'agnostic', label: 'fusion-ui'},
  
];

const getStyleDictionaryConfig = (brand) => {
  return {
    source: [`src/assets/tokens/${brand}.json`],
    platforms: {
      scss: {
        transformGroup: 'scss',
        buildPath: 'src/assets/theme/',
        files: [
          {
            destination: `${brand}.scss`,
            format: 'css/theme',
            options: {
              outputReferences: true,
            },
          },
        ],
      },
    },
  };
};

THEMES.forEach(({theme, label}) => {
  StyleDictionary.registerParser({
    pattern: /\.json$/,
    parse: ({contents}) => {
      const _styles = JSON.parse(contents).global;

      formatTokens(_styles);

      return _styles;
    },
  });
  StyleDictionary.registerFormat({
    name: 'css/theme',
    formatter: function ({dictionary, file, options}) {
      const {outputReferences} = options;
      let decorator = `.${label}, .tag-ds.${label}, .${label}.tag-ds, .tag-ds .${label}, .${label} .tag-ds`;
      if (theme === 'agnostic') decorator = '.tag-ds';
      return (
        fileHeader({file}) + `${decorator} {\n ${formattedVariables({format: 'css', dictionary, outputReferences})}\n}\n`
      );
    },
  });
  const StyleDictionaryPackage = StyleDictionary.extend(getStyleDictionaryConfig(theme));

  StyleDictionaryPackage.buildPlatform('scss');
});
