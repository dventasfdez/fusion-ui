import _ from "lodash";
import { findNumNode, IExtraInfoPosition, putInNumNode } from "./wsyiwyg-helper-caret";

interface IDataExtraCaret extends IDataKeyCaret {
  extraInfoPosition?: IExtraInfoPosition;
}
export interface IDataKeyCaret {
  dataKey: string;
  position: number;
}

export const getDataKeyActive = (editor: any): IDataKeyCaret => {
  let dataKey = "-1";
  if (editor) {
    const errorActive = editor.querySelector(".active.insight-error");
    const _dataKey = errorActive?.dataset?.key;
    dataKey = !_.isNull(_dataKey) && !_.isUndefined(_dataKey) ? errorActive?.dataset?.key : "-1";
  }
  return { dataKey, position: 0 };
};

export const getDataKeyOfTarget = (target: any) => {
  let index = null;
  if (target) {
    const parent = target.closest(".insight-error");
    const targetClassList = target.classList || [];
    if (!targetClassList.contains("editor-content") || parent) {
      index = target.dataset?.key;
    }
  }
  return index;
};
export const getCaretPosition = (editor: any): IDataExtraCaret => {
  const selection = document.getSelection();
  let dataKey = "-1";
  let position = -1;
  let extraInfoPosition;

  // Child position
  if (selection) {
    extraInfoPosition = findNumNode(selection, editor);
    position = selection.anchorOffset > -1 ? selection.anchorOffset : -1;
    const parentNode = selection.anchorNode?.parentNode as any;
    if (parentNode?.classList && parentNode.classList.contains("insight-error")) {
      dataKey = parentNode.dataset?.key;
    }
  }
  return { dataKey, position, extraInfoPosition };
};
export const putCaretInPlace = (editor: any, avoidDataKey: boolean, dataKeyInfo: IDataKeyCaret, caretExtraInfo?: IExtraInfoPosition) => {
  // Dont move in first render
  if (editor) {
    // Put caret
    if (!avoidDataKey && dataKeyInfo?.dataKey) {
      const { dataKey, position } = dataKeyInfo;
      const _dataKey = parseInt(dataKey);
      if (!_.isNaN(_dataKey) && _dataKey > -1 && _.isNumber(position) && position > -1) {
        // Send to data key - Find child in editor
        const currentNode = editor.querySelector(`[data-key="${dataKey}"]`) || null;
        putCaretInPosition(currentNode.childNodes[0], position);
      } else {
        // Send to the end
        putCaretInPosition(editor, undefined, true);
      }
    } else if (caretExtraInfo?.tagName && caretExtraInfo.numElement !== -1) {
      const { nodeCaret, positionCaret } = putInNumNode(editor, caretExtraInfo);
      if (nodeCaret) {
        // CARE: Problem with react life cycle
        putCaretInPositionInmediate(nodeCaret, positionCaret);
      }
      // The end else could be use to send to the end or other things
    }
  }
};

export const putCaretInPositionBySelector = (selector: string, position?: number, end: boolean = false) => {
  const node = document.querySelector(selector);

  if (node) {
    putCaretInPosition(node, position, end);
  }
};

const putCaretInPosition = (node: any, position?: number, end: boolean = false) => {
  if (node) {
    const range = document.createRange();
    const sel = window.getSelection();
    if (!end) {
      // Put in node position
      const _position = position || 0;
      range.setStart(node, _position);
      range.collapse(true);
    } else {
      // Put in the end
      range.selectNodeContents(node);
      range.collapse(false);
    }
    sel && sel.removeAllRanges();
    sel && sel.addRange(range);
  }
};

const putCaretInPositionInmediate = (node: any, position?: number) => {
  // OPTION: Find here - put the cursor and after - add with inmediate
  setImmediate(() => {
    putCaretInPosition(node, position);
  });
};
