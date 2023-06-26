export const parseFontFamily = (fontFamily) => {
  fontFamily.value = `"${fontFamily.value}"`;
};
export const parseFontWeight = (fontWeight) => {
  const fontWeightsConst = {
    Light: 300,
    Regular: 400,
    Medium: 500,
    SemiBold: 600,
    Bold: 700,
  };

  fontWeight.value = `${fontWeightsConst[fontWeight.value]}`;
};
export const parsePixel = (obj) => {
  obj.value = `${obj.value}px`;
};

export const parseShadow = (shadowObj) => {
  const {x, y, blur, spread, color} = shadowObj.value;
  shadowObj.value = `${x}px ${y}px ${blur}px ${spread}px ${color}`;
};

export const formatTokens = (item) => {
  for (const key in item) {
    if (typeof item[key] === 'object' && !Object.keys(item[key]).find((key) => key === 'value' || key === 'type')) {
      formatTokens(item[key]);
    } else {
      switch (item[key].type) {
        case 'fontFamilies':
          parseFontFamily(item[key]);
          break;
        case 'typography': {
          let _newValue = {};
          for (const valKey in item[key].value) {
            if (!valKey.startsWith('paragraph')) {
              let _value = item[key].value[valKey];
              _newValue[valKey] = {value: _value};
            }
          }
          item[key] = _newValue;
          break;
        }
        case 'boxShadow':
          parseShadow(item[key]);
          break;
        case 'lineHeights':
        case 'fontSizes':
          parsePixel(item[key]);
          break;

        case 'fontWeights':
          parseFontWeight(item[key]);
          break;
      }
    }
  }
};
