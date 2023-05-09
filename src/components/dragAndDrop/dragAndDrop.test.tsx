import {fireEvent, render} from '@testing-library/react';
import React from 'react';
import DragAndDrop from './dragAndDrop';

describe('DragAndDrop', () => {
  it('should render successfully', () => {
    const {baseElement} = render(<DragAndDrop data-testid="drag" />);
    expect(baseElement).toBeTruthy();
  });
  it('should handleDrag', () => {
    const {getByTestId} = render(<DragAndDrop data-testid="drag" />);
    const divRender = getByTestId('drag');
    expect(divRender).toBeTruthy();
    const event = new Event('drag');
    const mouse = [
      {
        clientX: 0,
        clientY: 0,
      },
      {
        clientX: 100,
        clientY: 100,
      },
    ];
    fireEvent.dragEnter(divRender, mouse[1]);
    fireEvent.dragLeave(divRender, mouse[1]);
    fireEvent.dragOver(divRender, mouse[1]);
    fireEvent.drop(divRender, mouse[1]);
    fireEvent.dragStart(divRender, mouse[1]);
    fireEvent.dragEnd(divRender, mouse[1]);
    fireEvent.drag(divRender, mouse[1]);
    fireEvent.dragEnter(divRender, mouse[1]);
    fireEvent.dragLeave(divRender, mouse[1]);

    divRender?.dispatchEvent(event);
  });
});
