import*as Common from"../common/common.js";import*as Platform from"../platform/platform.js";import*as UI from"../ui/ui.js";import{PerformanceModel}from"./PerformanceModel.js";import{TimelineEventOverviewCPUActivity,TimelineEventOverviewFrames,TimelineEventOverviewNetwork,TimelineEventOverviewResponsiveness}from"./TimelineEventOverview.js";export class TimelineHistoryManager{constructor(){this._recordings=[],this._action=self.UI.actionRegistry.action("timeline.show-history"),this._nextNumberByDomain=new Map,this._button=new ToolbarButton(this._action),UI.ARIAUtils.markAsMenuButton(this._button.element),this.clear(),this._allOverviews=[{constructor:TimelineEventOverviewResponsiveness,height:3},{constructor:TimelineEventOverviewFrames,height:16},{constructor:TimelineEventOverviewCPUActivity,height:20},{constructor:TimelineEventOverviewNetwork,height:8}],this._totalHeight=this._allOverviews.reduce((e,t)=>e+t.height,0),this._enabled=!0,this._lastActiveModel=null}addRecording(e){this._lastActiveModel=e,this._recordings.unshift(e),this._buildPreview(e);const t=this._title(e);this._button.setText(t);const i=this._action.title();if(UI.ARIAUtils.setAccessibleName(this._button.element,ls`Current Session: ${t}. ${i}`),this._updateState(),this._recordings.length<=maxRecordings)return;const s=this._recordings.reduce((e,t)=>n(e)<n(t)?e:t);function n(e){return TimelineHistoryManager._dataForModel(e).lastUsed}this._recordings.splice(this._recordings.indexOf(s),1),s.dispose()}setEnabled(e){this._enabled=e,this._updateState()}button(){return this._button}clear(){this._recordings.forEach(e=>e.dispose()),this._recordings=[],this._lastActiveModel=null,this._updateState(),this._button.setText(Common.UIString.UIString("(no recordings)")),this._nextNumberByDomain.clear()}async showHistoryDropDown(){if(this._recordings.length<2||!this._enabled)return null;const e=await DropDown.show(this._recordings,this._lastActiveModel,this._button.element);if(!e)return null;return this._recordings.indexOf(e)<0?(console.assert(!1,"selected recording not found"),null):(this._setCurrentModel(e),e)}cancelIfShowing(){DropDown.cancelIfShowing()}navigate(e){if(!this._enabled||!this._lastActiveModel)return null;const t=this._recordings.indexOf(this._lastActiveModel);if(t<0)return null;const i=Platform.NumberUtilities.clamp(t+e,0,this._recordings.length-1),s=this._recordings[i];return this._setCurrentModel(s),s}_setCurrentModel(e){TimelineHistoryManager._dataForModel(e).lastUsed=Date.now(),this._lastActiveModel=e;const t=this._title(e),i=this._action.title();this._button.setText(t),UI.ARIAUtils.setAccessibleName(this._button.element,ls`Current Session: ${t}. ${i}`)}_updateState(){this._action.setEnabled(this._recordings.length>1&&this._enabled)}static _previewElement(e){const t=TimelineHistoryManager._dataForModel(e),i=e.recordStartTime();return t.time.textContent=i?Common.UIString.UIString("(%s ago)",TimelineHistoryManager._coarseAge(i)):"",t.preview}static _coarseAge(e){const t=Math.round((Date.now()-e)/1e3);if(t<50)return Common.UIString.UIString("moments");const i=Math.round(t/60);if(i<50)return Common.UIString.UIString("%s m",i);const s=Math.round(i/60);return Common.UIString.UIString("%s h",s)}_title(e){return TimelineHistoryManager._dataForModel(e).title}_buildPreview(e){const t=Common.ParsedURL.ParsedURL.fromString(e.timelineModel().pageURL()),i=t?t.host:"",s=this._nextNumberByDomain.get(i)||1,n=Common.UIString.UIString("%s #%d",i,s);this._nextNumberByDomain.set(i,s+1);const o=createElement("span"),r=createElementWithClass("div","preview-item vbox"),l={preview:r,title:n,time:o,lastUsed:Date.now()};e[previewDataSymbol]=l,r.appendChild(this._buildTextDetails(e,n,o));const a=r.createChild("div","hbox");return a.appendChild(this._buildScreenshotThumbnail(e)),a.appendChild(this._buildOverview(e)),l.preview}_buildTextDetails(e,t,i){const s=createElementWithClass("div","text-details hbox"),n=s.createChild("span","name");n.textContent=t,UI.ARIAUtils.setAccessibleName(n,t);const o=e.tracingModel(),r=Number.millisToString(o.maximumRecordTime()-o.minimumRecordTime(),!1),l=s.createChild("span","time");return l.appendChild(createTextNode(r)),l.appendChild(i),s}_buildScreenshotThumbnail(e){const t=createElementWithClass("div","screenshot-thumb");t.style.width=1.5*this._totalHeight+"px",t.style.height=this._totalHeight+"px";const i=e.filmStripModel().frames().peekLast();return i?(i.imageDataPromise().then(e=>UI.UIUtils.loadImageFromData(e)).then(e=>e&&t.appendChild(e)),t):t}_buildOverview(e){const t=createElement("div");t.style.width=previewWidth+"px",t.style.height=this._totalHeight+"px";const i=t.createChild("canvas");i.width=window.devicePixelRatio*previewWidth,i.height=window.devicePixelRatio*this._totalHeight;const s=i.getContext("2d");let n=0;for(const t of this._allOverviews){const i=new t.constructor;i.setCanvasSize(previewWidth,t.height),i.setModel(e),i.update();const o=i.context(),r=o.getImageData(0,0,o.canvas.width,o.canvas.height);s.putImageData(r,0,n),n+=t.height*window.devicePixelRatio}return t}static _dataForModel(e){return e[previewDataSymbol]||null}}export const maxRecordings=5;export const previewWidth=450;export const previewDataSymbol=Symbol("previewData");export class DropDown{constructor(e){this._glassPane=new UI.GlassPane.GlassPane,this._glassPane.setSizeBehavior(UI.GlassPane.SizeBehavior.MeasureContent),this._glassPane.setOutsideClickCallback(()=>this._close(null)),this._glassPane.setPointerEventsBehavior(UI.GlassPane.PointerEventsBehavior.BlockedByGlassPane),this._glassPane.setAnchorBehavior(UI.GlassPane.AnchorBehavior.PreferBottom),this._glassPane.element.addEventListener("blur",()=>this._close(null));const t=UI.Utils.createShadowRootWithCoreStyles(this._glassPane.contentElement,"timeline/timelineHistoryManager.css").createChild("div","drop-down"),i=new UI.ListModel.ListModel;this._listControl=new UI.ListControl.ListControl(i,this,UI.ListControl.ListMode.NonViewport),this._listControl.element.addEventListener("mousemove",this._onMouseMove.bind(this),!1),i.replaceAll(e),UI.ARIAUtils.markAsMenu(this._listControl.element),UI.ARIAUtils.setAccessibleName(this._listControl.element,ls`Select Timeline Session`),t.appendChild(this._listControl.element),t.addEventListener("keydown",this._onKeyDown.bind(this),!1),t.addEventListener("click",this._onClick.bind(this),!1),this._focusRestorer=new UI.UIUtils.ElementFocusRestorer(this._listControl.element),this._selectionDone=null}static show(e,t,i){if(DropDown._instance)return Promise.resolve(null);return new DropDown(e)._show(i,t)}static cancelIfShowing(){DropDown._instance&&DropDown._instance._close(null)}_show(e,t){return DropDown._instance=this,this._glassPane.setContentAnchorBox(e.boxInWindow()),this._glassPane.show(this._glassPane.contentElement.ownerDocument),this._listControl.element.focus(),this._listControl.selectItem(t),new Promise(e=>this._selectionDone=e)}_onMouseMove(e){const t=e.target.enclosingNodeOrSelfWithClass("preview-item"),i=t&&this._listControl.itemForNode(t);i&&this._listControl.selectItem(i)}_onClick(e){e.target.enclosingNodeOrSelfWithClass("preview-item")&&this._close(this._listControl.selectedItem())}_onKeyDown(e){switch(e.key){case"Tab":case"Escape":this._close(null);break;case"Enter":this._close(this._listControl.selectedItem());break;default:return}e.consume(!0)}_close(e){this._selectionDone(e),this._focusRestorer.restore(),this._glassPane.hide(),DropDown._instance=null}createElementForItem(e){const t=TimelineHistoryManager._previewElement(e);return UI.ARIAUtils.markAsMenuItem(t),t.classList.remove("selected"),t}heightForItem(e){return console.assert(!1,"Should not be called"),0}isItemSelectable(e){return!0}selectedItemChanged(e,t,i,s){i&&i.classList.remove("selected"),s&&s.classList.add("selected")}updateSelectedItemARIA(e,t){return!1}}DropDown._instance=null;export class ToolbarButton extends UI.Toolbar.ToolbarItem{constructor(e){super(createElementWithClass("button","history-dropdown-button")),UI.Utils.appendStyle(this.element,"timeline/historyToolbarButton.css"),this._contentElement=this.element.createChild("span","content");const t=UI.Icon.Icon.create("smallicon-triangle-down");this.element.appendChild(t),this.element.addEventListener("click",()=>{e.execute()},!1),this.setEnabled(e.enabled()),e.addEventListener(UI.Action.Events.Enabled,e=>this.setEnabled(e.data)),this.setTitle(e.title())}setText(e){this._contentElement.textContent=e}}export let PreviewData;