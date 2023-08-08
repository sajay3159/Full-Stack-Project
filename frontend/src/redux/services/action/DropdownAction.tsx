

export const selectOption = (option:string) => {
    return {
      type: 'SELECT_OPTION',
      payload: option,
    };
  };