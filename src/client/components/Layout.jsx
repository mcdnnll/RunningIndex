import React from 'react';

export const Grid = (props) => {
  let gridStyle;

  switch (props.type) {
    case 'padded':
      gridStyle = 'grid grid-pad';
      break;
    case 'nav':
      gridStyle = 'grid-nav';
      break;
    default:
      gridStyle = 'grid';
  }

  return <div className={gridStyle}>{props.children}</div>;
};

export const Column = (props) => {
  return <div className={props.type}>{props.children}</div>;
};
