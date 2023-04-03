import React from 'react';

function Json() {
  return (
    <symbol
      id="json"
      viewBox="0 0 1024 1024"
      style={{ width: '100%', height: '100%', fill: 'currentColor', color: 'currentColor' }}
    >
      <path d="M212.992 526.336 212.992 526.336 212.992 526.336 215.04 526.336 212.992 526.336Z" />
      <path d="M546.816 407.552c-43.008 0-61.44 45.056-61.44 92.16 0 47.104 20.48 90.112 61.44 90.112 40.96 0 61.44-43.008 61.44-92.16C608.256 454.656 589.824 407.552 546.816 407.552z" />
      <path d="M784.384 196.608 239.616 196.608c-90.112 0-163.84 73.728-163.84 163.84l0 327.68c0 90.112 73.728 163.84 163.84 163.84l544.768 0c90.112 0 163.84-73.728 163.84-163.84l0-327.68C948.224 270.336 874.496 196.608 784.384 196.608zM249.856 538.624c0 61.44-28.672 79.872-69.632 79.872-10.24 0-22.528-2.048-30.72-4.096l4.096-28.672c6.144 2.048 14.336 4.096 22.528 4.096 22.528 0 36.864-10.24 36.864-51.2l0-155.648 34.816 0L247.808 538.624zM342.016 618.496c-22.528 0-45.056-6.144-55.296-14.336l8.192-28.672c12.288 8.192 30.72 14.336 51.2 14.336 28.672 0 43.008-14.336 43.008-34.816 0-20.48-12.288-32.768-38.912-43.008-34.816-14.336-57.344-34.816-57.344-67.584 0-36.864 28.672-65.536 75.776-65.536 22.528 0 38.912 6.144 49.152 10.24l-8.192 28.672c-8.192-4.096-22.528-10.24-40.96-10.24-28.672 0-38.912 16.384-38.912 30.72 0 20.48 12.288 28.672 43.008 43.008 36.864 16.384 55.296 36.864 55.296 69.632C423.936 589.824 395.264 618.496 342.016 618.496zM546.816 618.496c-59.392 0-98.304-47.104-98.304-118.784 0-73.728 40.96-120.832 100.352-120.832 61.44 0 96.256 51.2 96.256 118.784C645.12 577.536 602.112 618.496 546.816 618.496zM849.92 616.448l-34.816 0-61.44-108.544c-14.336-24.576-28.672-53.248-38.912-77.824l-2.048 0c2.048 28.672 2.048 59.392 2.048 100.352l0 88.064-32.768 0L681.984 382.976l38.912 0 61.44 108.544c14.336 24.576 28.672 53.248 36.864 77.824l0 0c-2.048-30.72-4.096-61.44-4.096-98.304l0-86.016 32.768 0L847.872 616.448z" />
    </symbol>
  );
}

export default function SVGProvider() {
  return (
    <svg aria-hidden style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      <Json />
    </svg>
  );
}