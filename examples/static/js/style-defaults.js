const originalStyleDefault = { ...bpmnvisu.StyleDefault };
const resetStyleDefault = () => {
  for (let key of Object.keys(bpmnvisu.StyleDefault)) {
    bpmnvisu.StyleDefault[key] = originalStyleDefault[key];
  }
};
