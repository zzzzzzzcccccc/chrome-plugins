import { useState } from 'react';

export default function useToggle(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);

  const toggle = () => setValue((prevState) => !prevState);

  const close = () => setValue(false);

  const open = () => setValue(true);

  const reset = () => setValue(defaultValue);

  return {
    value,
    toggle,
    open,
    close,
    reset,
  };
}
