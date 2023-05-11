import React, { useRef, useEffect } from 'react';
import { createFileInput, FileInputOptions } from '../utils';
import { useStoreDispatch, useStoreSelector } from '../hooks';
import { setReadFile } from '../store/slices/app-slice';

function useFileInput(options: FileInputOptions = {}) {
  const dispatch = useStoreDispatch();
  const { readFile } = useStoreSelector((state) => state.app);

  const handlerActionOnChange = (files: FileList) => {
    dispatch(
      setReadFile({
        files: Array.from(new Set(files)).map((item) => ({
          name: item.name,
          size: item.size,
          type: item.type,
          url: URL.createObjectURL(item),
        })),
      }),
    );
  };

  const handlerFileOnChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const current = target.files;
    if (current && current.length) {
      handlerActionOnChange(current);
    }
  };

  const handleOnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleOnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files && files.length) {
      handlerActionOnChange(files);
    }
  };

  const inputRef = useRef(createFileInput(handlerFileOnChange, options));

  const show = () => {
    inputRef.current.value = '';
    inputRef.current.click();
  };

  useEffect(() => {
    const target = inputRef.current;

    document.body.appendChild(target);

    return () => {
      document.body.removeChild(target);
    };
  }, []);

  return {
    files: readFile.files,
    show,
    handleOnDragOver,
    handleOnDrop,
  };
}

export default useFileInput;
