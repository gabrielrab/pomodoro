export function combine(components, firstChild = null) {
  return components.reduce((Acc, V) => {
    return () => <V>{Acc && <Acc />}</V>;
  }, firstChild);
}
