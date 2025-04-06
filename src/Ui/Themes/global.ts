import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  spacing: 5,
  components: {  
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',   // Remove shadow
          '&.MuiPaper-root': {
            boxShadow: 'none !important',   // Remove shadow
          }
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          boxSizing: 'border-box',
          fontFamily: 'var(--font-primary)',
          // color: "var(--textColor)",
          '&.MuiLink-root': {
            color: "var(--brandColor)"
          }
        },
        h1: {
          fontSize: '2rem',
          fontWeight: 400,
        },
        h2: {
          fontSize: '1.6rem',
          fontWeight: 400,
        },
        h3: {
          fontSize: '1.6rem',
          fontWeight: 400,
        },
        h4: {
          fontSize: '1.4rem',
          fontWeight: 400,
        },
        h5: {
          fontSize: '1.3rem',
          fontWeight: 400,
        },
        h6: {
          fontSize: '1.4rem',
        },
        body1: {
          fontSize: '1.4rem',
          fontFamily: 'var(--font-secondary)',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1.4rem',
          fontFamily: 'var(--font-secondary)',
          padding: '5px 10px'
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          padding: '5px 10px',
          background: '#eee',
          fontWeight: 600,
          color: '#000',
          fontFamily: 'var(--font-secondary)bold',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1.6rem',
          fontFamily: 'var(--font-secondary)',
          textAlign: 'left',
          padding: '10px 10px',
          color: '#333333',
          '&p': {
            fontSize: '1.6rem',
          }
        },
      },
    },
   
    MuiCheckbox: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '20rem',
          fontFamily: 'var(--font-secondary)',
          textAlign: 'left',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          textTransform: 'none',
          fontSize: '1.4rem',
          fontFamily: 'var(--font-secondary)',
        },
        outlinedPrimary: {
          color: '#7DBA00',
          borderColor: '#7DBA00',
          padding: '7px 20px'
        },
        sizeSmall: {
          fontSize: '1.2rem',
          padding: '2px 15px',
          borderRadius: '4px',
        },
        containedPrimary: {
          backgroundColor: '#7DBA00',
          borderColor: '#7DBA00',
          color: '#FFFFFF',
          padding: '8px 20px'
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          textTransform: 'none',
          fontSize: '1.4rem',
          fontFamily: 'var(--font-secondary)',
        },
        select: {
        }
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          textTransform: 'none',
          fontSize: '1.4rem',
          fontFamily: 'var(--font-secondary)',
        },
      }
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          fontSize: '1.2rem',
          paddingTop: '0',
          paddingbottom: '0',
          fontFamily: 'var(--font-secondary)',
          borderColor: '#D9D9D9',
          '&.Mui-selected': {
            backgroundColor: '#fff !important',
            borderColor: '#7DBA00',
            color: '#7DBA00',
            '&:hover': {
                backgroundColor: '#115293', // Active button hover
            },
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          padding: '10px',
          fontSize: '1.2rem',
          fontFamily: 'var(--font-secondary)',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
          fontFamily: 'var(--font-secondary)',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
          margin: '0',
          fontFamily: 'var(--font-secondary)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          minHeight: '40px', // Ensures height of the input
          width: '100%',
        },
        input: {
          padding: '10px 14px',
          fontSize: '1.4rem'
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          transform: 'translate(14px, 10px) scale(1)', 
          fontSize: '1.4rem'
        },
        shrink: {
          transform: 'translate(14px, -8px) scale(1)', 
          padding: '0 4px', 
          fontSize: '1.2rem'
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          borderRadius: '0',
          textTransform: 'none',
          fontSize: '1.4rem',
          padding: '0',
          minWidth: 'auto',
          marginRight: '5px',
          minHeight: '40px',
          '&.Mui-selected': {
            color: '#7DBA00', // Active tab text color
            fontWeight: 'bold', // Bold text for active tab
            background: '#ffffff !important',
            '.MuiTypography-root': {
              color: '#7DBA00'
            },
          },
          '&.MuiTabs-root': {
            minHeight: '40px',
          },
          '&.MuiButtonBase-root' : {
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
            minHeight: '40px',
            borderTop: '1px solid #D9D9D9',
            borderLeft: '1px solid #D9D9D9',
            borderRight: '1px solid #D9D9D9',
            background: "#F5F5F5",
          },
          '&.Mui-disabled': {
            opacity: 0.5,
            pointerEvents: 'inherit',
            cursor: 'not-allowed'
          }
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: '22px',
          borderRadius: '4px',
        },
        label: {
          fontSize: '1.4rem',
          fontWeight: 600,
          padding: '0 8px'
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          fontFamily: 'var(--font-secondary)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: 'var(--font-secondary)',
          fontSize: '1.4rem'
        }
      }
    },
  },
  palette: {
    primary: {
      main: '#7DBA00',
      light: '#97E100',
      dark: '#639300',
    },
  },
});

export default theme;
