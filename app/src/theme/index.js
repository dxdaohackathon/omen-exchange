const theme = {
  fonts: {
    defaultSize: '14px',
    fontFamily: `'Roboto', 'Helvetica Neue', 'Arial', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', '-apple-system', 'BlinkMacSystemFont', sans-serif`,
    fontFamilyCode: `source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace`,
  },
  buttonPrimary: {
    backgroundColor: '#1565C0',
    backgroundColorDisabled: '#1565C0',
    backgroundColorHover: '#0d4584',
    borderColor: '#1565C0',
    borderColorDisabled: '#1565C0',
    borderColorHover: '#0d4584',
    color: '#fff',
    colorDisabled: '#fff',
    colorHover: '#fff',
  },
  buttonPrimaryLine: {
    backgroundColor: '#fff',
    backgroundColorDisabled: '#fff',
    backgroundColorHover: '#fff',
    borderColor: '#1565C0',
    borderColorDisabled: '#1565C0',
    borderColorHover: '#0d4584',
    color: '#1565C0',
    colorDisabled: '#1565C0',
    colorHover: '#0d4584',
  },
  buttonSecondary: {
    backgroundColor: '#E3F2FD',
    backgroundColorDisabled: '#E3F2FD',
    backgroundColorHover: '#d1e1ec',
    borderColor: '#E3F2FD',
    borderColorDisabled: '#E3F2FD',
    borderColorHover: '#d1e1ec',
    color: '#1565C0',
    colorDisabled: '#1565C0',
    colorHover: '#1565C0',
  },
  buttonSecondaryLine: {
    backgroundColor: '#fff',
    backgroundColorDisabled: '#fff',
    backgroundColorHover: '#fff',
    borderColor: '#D6EBFD',
    borderColorDisabled: '#E8EAF6',
    borderColorHover: '#BBDEFB',
    color: '#37474F',
    colorDisabled: '#757575',
    colorHover: '#37474F',
  },
  dropdown: {
    buttonBackgroundColor: '#fff',
    buttonBackgroundColorHover: '#fff',
    buttonBorderColor: '#D6EBFD',
    buttonBorderColorHover: '#BBDEFB',
    buttonColor: '#37474F',
    buttonColorHover: '#37474F',
    dropdownItems: {
      backgroundColor: '#fff',
      borderColor: '#ECEFF1',
      borderRadius: '16px',
      boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.12)',
      item: {
        backgroundColor: 'transparent',
        backgroundColorActive: 'rgba(227, 242, 253, 0.4)',
        backgroundColorHover: 'rgba(227, 242, 253, 0.4)',
        color: '#37474F',
      },
    },
  },
  buttonCircle: {
    dimensions: '34px',
  },
  colors: {
    activeListItemBackground: '#fafafa',
    darkGray: '#acacac',
    error: '#fa0000',
    gray: '#b7b7b7',
    green: '#4B9E98',
    mainBodyBackground: '#fff',
    primary: '#1565C0',
    secondary: '#E3F2FD',
    tertiary: '#D6EBFD',
    tertiaryDark: '#90CAF9',
    textColor: '#757575',
    textColorDark: '#37474F',
    textColorDarker: '#333',
    textColorLight: '#999',
    textColorLightish: '#7D8189',
  },
  message: {
    colors: {
      errorf: '#ff7848',
      default: '#ECEFF1',
      ok: '#00bc93',
      warning: '#f5e148',
    },
  },
  cards: {
    backgroundColor: '#fff',
    border: '1px solid #EEE',
    borderRadius: '8px ',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
    paddingHorizontal: '25px',
    paddingVertical: '25px',
    textColor: '#000',
    textColorSecondary: '#333',
    titleColor: '#000',
  },
  header: {
    backgroundColor: '#fff',
    boxShadow: 'none',
    height: '66px',
    color: '#37474F',
  },
  themeBreakPoints: {
    lg: '992px',
    md: '768px',
    sm: '480px',
    xl: '1024px',
    xs: '320px',
    xxl: '1280px',
    xxxl: '1366px',
  },
  borders: {
    borderColor: '#ECEFF1',
    borderColorLighter: '#E8EAF6',
    commonBorderRadius: '6px',
  },
  paddings: {
    mainPadding: '15px',
  },
  textfield: {
    backgroundColor: 'transparent',
    borderColor: '#D6EBFD',
    borderColorActive: '#90CAF9',
    borderRadius: '32px',
    borderStyle: 'solid',
    borderWidth: '1px',
    color: '#37474F',
    fontSize: '14px',
    fontWeight: '500',
    height: '36px',
    outline: 'none',
    paddingHorizontal: '25px',
    paddingVertical: '10px',
    placeholderColor: '#86909E',
    placeholderFontSize: '14px',
    placeholderFontWeight: '400',
  },
  mainContainer: {
    maxWidth: '586px',
  },
  outcomes: {
    colors: [
      {
        darker: '#8E24AA',
        medium: '#e1bee7',
      },
      {
        darker: '#00897B',
        medium: '#b2dfdb',
      },
      {
        darker: '#d2b994',
        medium: '#ffe0b2',
      },
      {
        darker: '#b9b992',
        medium: '#e7e7be',
      },
      {
        darker: '#9db992',
        medium: '#bedfb2',
      },
      {
        darker: '#ca89bd',
        medium: '#ffb2f0',
      },
    ],
  },
  modalStyle: {
    content: {
      backgroundColor: '#fff',
      borderColor: '#ECEFF1',
      borderRadius: '6px',
      borderStyle: 'solid',
      borderWidth: '1px',
      bottom: 'auto',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: '0',
      height: 'fit-content',
      left: 'auto',
      margin: 'auto 0',
      overflow: 'hidden',
      padding: '25px',
      position: 'relative',
      right: 'auto',
      top: 'auto',
      width: '355px',
    },
    overlay: {
      alignItems: 'unset',
      backgroundColor: 'rgba(0, 0, 0, 0.06)',
      display: 'flex',
      justifyContent: 'center',
      overflow: 'auto',
      padding: '10px',
      zIndex: '12345',
    },
  },
}

export default theme
