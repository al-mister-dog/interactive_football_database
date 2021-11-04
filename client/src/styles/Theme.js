import { createTheme } from '@material-ui/core/styles';

const colorOne = '#c0ca33';
const colorTwo = '#ffb300'
export default createTheme({
  palette: {
    common: {
      blue: `${colorOne}`,
      orange: `${colorTwo}`
    },
    primary: {
      main: `${colorOne}`
    },
    secondary: {
      main: `${colorTwo}`
    },
    active: {
      primary: 'rgba(192, 202, 51, 0.1)',
      secondary: 'rgba(255, 179, 0, 0.1)'
    }
  },
  typography: {
    tab: {
      fontFamily: 'Raleway',
      textTransform: 'none',
      fontWeight: 700,
      fontSize: '1rem',
    }
  }
})