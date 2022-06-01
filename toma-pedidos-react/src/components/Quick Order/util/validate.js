const validateTextArea = (text) => {
  const arrText = text.match(/[^\n]+/g);
  const products = arrText
    .filter((item) => {
      return item.trim() !== "";
    })
    .map((value, index) => {
      const valueSplitted = value.split(",");
      if (valueSplitted.length == 2) {
        if (valueSplitted[0] && valueSplitted[1].trim()) {
          return {
            sku: valueSplitted[0],
            quantity: parseInt(valueSplitted[1]),
          };
        }
      }
    });
  return products
};

export { validateTextArea };
