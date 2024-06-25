import { GroupBase, StylesConfig } from "react-select";

export const darkModeStyles :StylesConfig<{ label: string; value: string }, true, GroupBase<{ label: string; value: string }>> = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: '#1a202c', // Dark mode background color
      color: '#ffffff', // Dark mode text color
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#2d3748' : '#1a202c', // Dark mode selected and default background color
      color: '#ffffff', // Dark mode text color
      '&:hover': {
        backgroundColor: '#4a5568', // Dark mode hover background color
        color: '#ffffff', // Dark mode hover text color
      },
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: '#2d3748', // Dark mode multi-value background color
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: '#ffffff', // Dark mode multi-value label color
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: '#ffffff', // Dark mode multi-value remove color
      '&:hover': {
        backgroundColor: '#718096', // Dark mode multi-value remove hover background color
        color: '#ffffff', // Dark mode multi-value remove hover color
        cursor: 'pointer', // Change cursor to pointer on hover
      },
    }),
  };
  
  export const lightModeStyles: StylesConfig<{ label: string; value: string }, true, GroupBase<{ label: string; value: string }>> = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
      color: "#000",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
      color: "#000",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#ddd" : "#fff",
      color: "#000",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000",
    }),
  };