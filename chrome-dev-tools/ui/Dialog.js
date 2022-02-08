import*as ARIAUtils from"./ARIAUtils.js";import{GlassPane,PointerEventsBehavior}from"./GlassPane.js";import{KeyboardShortcut,Keys}from"./KeyboardShortcut.js";import{SplitWidget}from"./SplitWidget.js";import{WidgetFocusRestorer}from"./Widget.js";export class Dialog extends GlassPane{constructor(){super(),this.registerRequiredCSS("ui/dialog.css"),this.contentElement.tabIndex=0,this.contentElement.addEventListener("focus",()=>this.widget().focus(),!1),this.widget().setDefaultFocusedElement(this.contentElement),this.setPointerEventsBehavior(PointerEventsBehavior.BlockedByGlassPane),this.setOutsideClickCallback(e=>{this.hide(),e.consume(!0)}),ARIAUtils.markAsModalDialog(this.contentElement),this._tabIndexBehavior=OutsideTabIndexBehavior.DisableAllOutsideTabIndex,this._tabIndexMap=new Map,this._focusRestorer=null,this._closeOnEscape=!0,this._targetDocument,this._targetDocumentKeyDownHandler=this._onKeyDown.bind(this)}static hasInstance(){return!!Dialog._instance}show(e){const t=e instanceof Document?e:(e||self.UI.inspectorView.element).ownerDocument;this._targetDocument=t,this._targetDocument.addEventListener("keydown",this._targetDocumentKeyDownHandler,!0),Dialog._instance&&Dialog._instance.hide(),Dialog._instance=this,this._disableTabIndexOnElements(t),super.show(t),this._focusRestorer=new WidgetFocusRestorer(this.widget())}hide(){this._focusRestorer.restore(),super.hide(),this._targetDocument&&this._targetDocument.removeEventListener("keydown",this._targetDocumentKeyDownHandler,!0),this._restoreTabIndexOnElements(),delete Dialog._instance}setCloseOnEscape(e){this._closeOnEscape=e}addCloseButton(){const e=this.contentElement.createChild("div","dialog-close-button","dt-close-button");e.gray=!0,e.addEventListener("click",()=>this.hide(),!1)}setOutsideTabIndexBehavior(e){this._tabIndexBehavior=e}_disableTabIndexOnElements(e){if(this._tabIndexBehavior===OutsideTabIndexBehavior.PreserveTabIndex)return;let t=null;this._tabIndexBehavior===OutsideTabIndexBehavior.PreserveMainViewTabIndex&&(t=this._getMainWidgetTabIndexElements(self.UI.inspectorView.ownerSplit())),this._tabIndexMap.clear();for(let s=e;s;s=s.traverseNextNode(e))if(s instanceof HTMLElement){const e=s,n=e.tabIndex;!(n>=0)||t&&t.has(e)||(this._tabIndexMap.set(e,n),e.tabIndex=-1)}}_getMainWidgetTabIndexElements(e){const t=new Set;if(!e)return t;const s=e.mainWidget();if(!s||!s.element)return t;for(let e=s.element;e;e=e.traverseNextNode(s.element)){if(!(e instanceof HTMLElement))continue;const s=e;s.tabIndex<0||t.add(s)}return t}_restoreTabIndexOnElements(){for(const e of this._tabIndexMap.keys())e.tabIndex=this._tabIndexMap.get(e);this._tabIndexMap.clear()}_onKeyDown(e){this._closeOnEscape&&e.keyCode===Keys.Esc.code&&KeyboardShortcut.hasNoModifiers(e)&&(e.consume(!0),this.hide())}}export const OutsideTabIndexBehavior={DisableAllOutsideTabIndex:Symbol("DisableAllTabIndex"),PreserveMainViewTabIndex:Symbol("PreserveMainViewTabIndex"),PreserveTabIndex:Symbol("PreserveTabIndex")};