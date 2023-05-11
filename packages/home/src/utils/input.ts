export interface FileInputOptions {
  multiple?: boolean;
  accept?: string;
}

export function createFileInput(onChange: (event: Event) => void, options: FileInputOptions = {}) {
  const { multiple = false, accept } = options;
  const input = document.createElement('input');

  input.type = 'file';
  input.hidden = true;
  input.multiple = multiple;
  input.onchange = onChange;
  input.style.width = '0px';
  input.style.height = '0px';
  input.style.display = 'none';
  if (accept) {
    input.accept = accept;
  }

  return input;
}
