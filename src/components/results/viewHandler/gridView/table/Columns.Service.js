//import { arrayMove } from "utilities/arrays";
//import { getUserData } from "components/context/auth/Auth.Services";

export const saveColumnsConfig = async (context, data) => {
  // const user = getCurrentUser(context);
  // const currentPage = context && context.navigation && context.navigation.currentPage ? context.navigation.currentPage : null;
  // if (user && currentPage) {
  //   let dbUserData = await getUserData(user.id);
  //   let columnsConfig = dbUserData.columnsConfiguration ? dbUserData.columnsConfiguration : null;
  //   if (columnsConfig) {
  //     columnsConfig[currentPage.id.toString()] = data;
  //     dbUserData.columnsConfiguration = columnsConfig;
  //   } else {
  //     dbUserData.columnsConfiguration = { currentPageIdString: data };
  //   }
  //   context.auth.updateUser(dbUserData);
  //   return dbUserData;
  // }
};

export const getCurrentColumnsConfig = (context) => {
  // const user = getCurrentUser(context);
  // const currentPage = context && context.navigation && context.navigation.currentPage ? context.navigation.currentPage : null;
  // if (user && currentPage) {
  //   if (user.columnsConfiguration) {
  //     const userColumnsConfig = user.columnsConfiguration[currentPage.id.toString()];
  //     if (userColumnsConfig && userColumnsConfig.length) {
  //       return userColumnsConfig;
  //     }
  //   }
  //   return null;
  // }
};

export const getCurrentPageConfig = (context) => {
  // const user = getCurrentUser(context);
  // const currentPage = context && context.navigation && context.navigation.currentPage ? context.navigation.currentPage : null;
  // let configuration = {};
  // if (user && currentPage) {
  //   if (user.columnsConfiguration) {
  //     const userColumnsConfig = user.columnsConfiguration[currentPage.id.toString()];
  //     if (userColumnsConfig && userColumnsConfig.length) {
  //       configuration.userColumnsConfig = userColumnsConfig;
  //     }
  //   }
  //   if (user.itemsPerPageConfiguration) {
  //     const itemsPerPageConfig = user.itemsPerPageConfiguration[currentPage.id.toString()];
  //     if (itemsPerPageConfig) {
  //       configuration.itemsPerPageConfig = parseInt(itemsPerPageConfig);
  //     }
  //   }
  //   if (user.viewMode) {
  //     const viewModeConfig = user.viewMode[currentPage.id.toString()];
  //     if (viewModeConfig) {
  //       configuration.viewModeConfig = viewModeConfig;
  //     }
  //   }
  // }
  // return configuration;
};

export const getCurrentUser = (context) => {
  // if (context && context.auth && context.auth.user) {
  //   return context.auth.user;
  // }
};

//reorder

export const bindReorder = (component) => {
  // document.addEventListener("mouseup", function (e) {
  //   reorderOnMouseUp(component, e);
  //   component._reorderMode = false;
  //   if (document.getElementById("cursorText")) document.getElementById("cursorText").remove();
  // });
};
export const activateReorder = (component, e) => {
  // e.stopPropagation();
  // component._reorderMode = true;
  // component._selectedColumnFirstPosition = e.target.parentNode.cellIndex;
  // if (document.getElementById("cursorText")) document.getElementById("cursorText").remove();
  // // Change mouse style to show it's moving
  // document.body.style.cursor = "move";
  // // Get the text of the element that is moving and show it next to the cursor
  // const currentColmnText = e && e.target && e.target.parentNode.innerText ? e.target.parentNode.innerText : "Move";
  // let dragDiv = document.createElement("div");
  // dragDiv.id = "cursorText";
  // dragDiv.style.width = e.target.parentNode.offsetWidth + "px";
  // dragDiv.style.background = "white";
  // dragDiv.style.opacity = 0.9;
  // let thDiv = document.createElement("div");
  // thDiv.style.border = "0.1em solid #DEE2E4";
  // thDiv.style.height = e.target.parentNode.offsetHeight + "px";
  // thDiv.style.padding = "0.7em";
  // thDiv.style.fontWeight = "bold";
  // thDiv.innerHTML = currentColmnText;
  // dragDiv.appendChild(thDiv);
  // const cells = e.target.parentNode.parentNode.parentNode.parentNode.childNodes[1].childNodes;
  // for (let i = 0; i < cells.length; i++) {
  //   let td = document.createElement("div");
  //   const thisCell = cells[i].childNodes[e.target.parentNode.cellIndex];
  //   td.innerHTML = thisCell ? thisCell.innerHTML : null;
  //   td.style.height = thisCell ? thisCell.offsetHeight + "px" : "0px";
  //   td.style.padding = "0.7em";
  //   td.style.border = "0.1em solid #DEE2E4";
  //   if (i % 2 === 0) {
  //     td.style.background = "#f1f1f1";
  //   } else {
  //     td.style.background = "white";
  //   }
  //   dragDiv.appendChild(td);
  // }
  // document.body.appendChild(dragDiv);
  // let textLength = [dragDiv.offsetWidth, dragDiv.offsetHeight];
  // document.body.onmousemove = (e) => {
  //   if (!e) {
  //     e = window.event;
  //   }
  //   dragDiv.style.left = e.clientX - textLength[0] + "px";
  //   dragDiv.style.top = e.clientY + "px";
  // };
};

export const reorderOnMouseUp = (component, e) => {
  // e.stopPropagation();
  // if (component._reorderMode) {
  //   const finalCell = e.target.cellIndex ? e.target : e.target.parentNode;
  //   const finalCellIndex = finalCell.cellIndex;
  //   component._selectedColumnFinalPosition = finalCellIndex;
  //   if (finalCell.dataset && finalCell.dataset.columngroup) {
  //     if (component.props.columns[component._selectedColumnFirstPosition] && finalCell.dataset.columngroup === component.props.columns[component._selectedColumnFirstPosition].columnGroup) {
  //       reorderColumns(component, component._selectedColumnFirstPosition, component._selectedColumnFinalPosition);
  //     }
  //   } else {
  //     reorderColumns(component, component._selectedColumnFirstPosition, component._selectedColumnFinalPosition);
  //   }
  // }
  // document.body.style.cursor = "default";
};

export const reorderColumns = (component) => {
  // let columns = component.props.columns;
  // if (
  //   typeof component._selectedColumnFirstPosition !== undefined &&
  //   typeof component._selectedColumnFinalPosition !== undefined &&
  //   component._selectedColumnFirstPosition !== component._selectedColumnFinalPosition
  // ) {
  //   columns = arrayMove(columns, component._selectedColumnFirstPosition, component._selectedColumnFinalPosition);
  //   component.props.updateColumnsConfiguration(columns);
  // }
};
//#endregion  REORDER COLUMNS

//#region  RESIZE COLUMNS
export const updateColumnsWidth = (component, columnsWidthData) => {
  // let newColumnsSet = [...component.props.columns];
  // let userCustomColumns = newColumnsSet.map((column) => {
  //   let thisColumn = columnsWidthData.find((a) => a.columnKey === column.columnKey);
  //   if (thisColumn) {
  //     return (column = {
  //       ...column,
  //       width: thisColumn.width,
  //     });
  //   }
  //   return column;
  // });
  // component.props.updateColumnsConfiguration(userCustomColumns);
};
//#endregion  resize columns

//#region  SHOW/HIDE columns
export const handleShowHideColumns = (component, e) => {
  // var columnsArray = component.props.allColumns.filter((item) => {
  //   if (parseInt(item.columnKey) === parseInt(e.target.value)) {
  //     return e.target.checked ? true : false;
  //   } else {
  //     return component.props.columns.includes(item);
  //   }
  // });
  // let customColumns = columnsArray && columnsArray.length ? columnsArray : component.props.columns;
  // component.props.updateColumnsConfiguration(customColumns);
};

export const saveItemsPerPage = async (context, number) => {
  // const user = getCurrentUser(context);
  // const currentPage = context && context.navigation && context.navigation.currentPage ? context.navigation.currentPage : null;
  // if (user && currentPage) {
  //   let dbUserData = await getUserData(user.id);
  //   let itemsPerPageConfiguration = dbUserData.itemsPerPageConfiguration ? dbUserData.itemsPerPageConfiguration : {};
  //   itemsPerPageConfiguration[currentPage.id.toString()] = number;
  //   dbUserData.itemsPerPageConfiguration = itemsPerPageConfiguration;
  //   // const response = await updateUser(dbUserData);
  //   context.auth.updateUser(dbUserData);
  //   return dbUserData;
  // }
};

export const saveFiltersCollapsed = async (context, collapsed) => {
  // const user = getCurrentUser(context);
  // const currentPage = context && context.navigation && context.navigation.currentPage ? context.navigation.currentPage : null;
  // if (user && currentPage) {
  //   let dbUserData = await getUserData(user.id);
  //   let collapseConfiguration = dbUserData.collapseConfiguration ? dbUserData.collapseConfiguration : {};
  //   collapseConfiguration[currentPage.id.toString()] = collapsed;
  //   dbUserData.collapseConfiguration = collapseConfiguration;
  //   context.auth.updateUser(dbUserData);
  //   return dbUserData;
  // }
};

export const saveDisplayMode = async (context, view) => {
  // const user = getCurrentUser(context);
  // const currentPage = context && context.navigation && context.navigation.currentPage ? context.navigation.currentPage : null;
  // if (user && currentPage) {
  //   let dbUserData = await getUserData(user.id);
  //   let viewMode = dbUserData.viewMode ? dbUserData.viewMode : {};
  //   viewMode[currentPage.id.toString()] = view;
  //   dbUserData.viewMode = viewMode;
  //   context.auth.updateUser(dbUserData);
  //   return dbUserData;
  // }
};

export const resetTable = async (context) => {
  // const user = getCurrentUser(context);
  // let dbUserData = await getUserData(user.id);
  // if (dbUserData && dbUserData.columnsConfiguration && context.navigation.currentPage) {
  //   delete dbUserData.columnsConfiguration[context.navigation.currentPage.id];
  // }
  // context.auth.updateUser(dbUserData);
  // return dbUserData;
};
