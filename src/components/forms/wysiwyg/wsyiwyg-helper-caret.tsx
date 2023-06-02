export interface IExtraInfoPosition {
  firstLine: boolean;
  tagName: string;
  numElement: number;
  textCount: number;
}

export const findNumNode = (selection: Selection, editor: any): IExtraInfoPosition => {
  const currentNode = selection?.anchorNode;
  const currentElement = currentNode?.parentElement;
  let result = {
    firstLine: false,
    tagName: "",
    numElement: -1,
    textCount: 0,
  };
  // Logic to spelling or insights
  return findNumNodeNormal(result, selection, editor, currentNode, currentElement);
};

const findNumNodeNormal = (result: IExtraInfoPosition, selection: Selection, editor: any, currentNode: any, currentElement: any) => {
  if (currentElement) {
    // Avoid search when it is first line
    if (currentElement?.classList?.contains("editor-content")) {
      result.firstLine = true;
      result.numElement = 0;
      result.tagName = "parent";
      result.textCount = selection.anchorOffset;
    } else {
      let dataKey = "-1";
      result.tagName = currentElement?.tagName || "";

      // Aditional logic to Insight
      const isInInsight = currentElement?.classList && currentElement.classList.contains("insight-error");
      if (isInInsight) {
        result.tagName = currentElement?.parentElement?.tagName || "";
        dataKey = currentElement?.dataset?.key || "-1";
      }

      // Logic normal
      if (result.tagName) {
        const elements = editor.querySelectorAll(result.tagName);
        // Find child element num
        for (let index = 0; result.numElement === -1 && index < elements.length; index++) {
          const element = elements[index];
          if (checkConditionIsElement(isInInsight, element, currentElement, dataKey)) {
            result.numElement = index;
            const nodes = element.childNodes;
            let find = false;
            for (let indexNodes = 0; !find && indexNodes < nodes.length; indexNodes++) {
              const node = nodes[indexNodes];
              // Find node
              if (checkConditionIsNode(isInInsight, node, currentNode, currentElement)) {
                find = true;
                result.textCount = result.textCount + selection.anchorOffset;
              } else {
                // Count characters
                const nodeLength = getNodeLength(node);
                result.textCount = result.textCount + nodeLength;
              }
            }
          }
        }
      }
    }
  }
  return result;
};

const checkConditionIsElement = (isInInsight: boolean, element: any, currentElement: any, dataKey: string): boolean => {
  if (isInInsight) {
    // Find the element that have the spelling error (Direct child)
    const hasChild = element.querySelector(`:scope > [data-key="${dataKey}"]`);
    return !!hasChild;
  } else {
    // Search the element with comparation
    return element === currentElement;
  }
};

const checkConditionIsNode = (isInInsight: boolean, node: any, currentNode: any, currentElement: any): boolean => {
  if (isInInsight) {
    // Search the element with comparation with insight node
    return node === currentElement;
  } else {
    // Search the element with comparation
    return node === currentNode;
  }
};

/* ******************************************** PUT *************************************** */
export const putInNumNode = (editor: any, extraInfoPosition: IExtraInfoPosition) => {
  let nodeCaret = null;
  let positionCaret = 0;
  // For first line
  if (editor && extraInfoPosition.firstLine) {
    nodeCaret = getNode(editor);
    const nodeLength = getNodeLength(nodeCaret);
    if (extraInfoPosition.textCount > nodeLength) {
      positionCaret = nodeLength;
    } else {
      positionCaret = extraInfoPosition.textCount;
    }
  } else if (editor && extraInfoPosition.tagName) {
    // Rest of editor
    const { tagName, numElement, textCount } = extraInfoPosition;
    const elements = editor.querySelectorAll(`${tagName}`);
    const element = elements.length > numElement ? elements[numElement] : null;
    if (element) {
      let _textCounted = 0;
      const nodes = element.childNodes;
      for (let indexNodes = 0; nodeCaret === null && indexNodes < nodes.length; indexNodes++) {
        // Count characters
        let currentLength = 0;
        const node = nodes[indexNodes];
        currentLength = getNodeLength(node) || 0;
        let nextCounted = _textCounted + currentLength;
        // If is greater than previousPosition, is the node
        if (nextCounted >= textCount) {
          nodeCaret = getNode(node);
          positionCaret = textCount - _textCounted;
        }
        _textCounted = nextCounted;
      }
      // When not find any - avoid send to start (Ctl + z/y event)
      if (!nodeCaret && nodes.length > 0) {
        const node = nodes[nodes.length - 1];
        nodeCaret = getNode(node);
        positionCaret = getNodeLength(node) || 0;
        // IMPROVE: Need to control if this type event text get more or less length
      }
    }
  }
  return { nodeCaret, positionCaret };
};

const getNodeLength = (node: any) => {
  let currentLength;
  if (node) {
    if (node.nodeName === "#text") {
      currentLength = node.data?.length;
    } else {
      currentLength = node.innerText?.length;
    }
  }
  return currentLength;
};
const getNode = (node: any) => {
  let _node = node;
  if (_node) {
    _node = node.nodeName === "#text" ? node : node.childNodes[0];
  }
  return _node;
};
