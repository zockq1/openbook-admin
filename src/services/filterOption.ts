function filterOption(input: string, option?: { children: string }) {
  return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
}

export default filterOption;
