import*as Common from"../common/common.js";import*as ProtocolClient from"../protocol_client/protocol_client.js";import*as TextUtils from"../text_utils/text_utils.js";import{Events,NetworkRequest}from"./NetworkRequest.js";import{ResourceTreeFrame,ResourceTreeModel}from"./ResourceTreeModel.js";export class Resource{constructor(e,t,s,n,r,o,i,c,h,d){this._resourceTreeModel=e,this._request=t,this.url=s,this._documentURL=n,this._frameId=r,this._loaderId=o,this._type=i||Common.ResourceType.resourceTypes.Other,this._mimeType=c,this._lastModified=h&&h.isValid()?h:null,this._contentSize=d,this._content,this._contentLoadError,this._contentEncoded,this._pendingContentCallbacks=[],this._request&&!this._request.finished&&this._request.addEventListener(Events.FinishedLoading,this._requestFinished,this)}lastModified(){if(this._lastModified||!this._request)return this._lastModified;const e=this._request.responseLastModified(),t=e?new Date(e):null;return this._lastModified=t&&t.isValid()?t:null,this._lastModified}contentSize(){return"number"!=typeof this._contentSize&&this._request?this._request.resourceSize:this._contentSize}get request(){return this._request}get url(){return this._url}set url(e){this._url=e,this._parsedURL=new Common.ParsedURL.ParsedURL(e)}get parsedURL(){return this._parsedURL}get documentURL(){return this._documentURL}get frameId(){return this._frameId}get loaderId(){return this._loaderId}get displayName(){return this._parsedURL.displayName}resourceType(){return this._request?this._request.resourceType():this._type}get mimeType(){return this._request?this._request.mimeType:this._mimeType}get content(){return this._content}contentURL(){return this._url}contentType(){return this.resourceType()===Common.ResourceType.resourceTypes.Document&&-1!==this.mimeType.indexOf("javascript")?Common.ResourceType.resourceTypes.Script:this.resourceType()}async contentEncoded(){return await this.requestContent(),this._contentEncoded}requestContent(){if(void 0!==this._content)return Promise.resolve({content:this._content,isEncoded:this._contentEncoded});let e;const t=new Promise(t=>e=t);return this._pendingContentCallbacks.push(e),this._request&&!this._request.finished||this._innerRequestContent(),t}canonicalMimeType(){return this.contentType().canonicalMimeType()||this.mimeType}async searchInContent(e,t,s){if(!this.frameId)return[];if(this.request)return this.request.searchInContent(e,t,s);return await this._resourceTreeModel.target().pageAgent().searchInResource(this.frameId,this.url,e,t,s)||[]}async populateImageSource(e){const{content:t}=await this.requestContent(),s=this._contentEncoded;e.src=TextUtils.ContentProvider.contentAsDataURL(t,this._mimeType,s)||this._url}_requestFinished(){this._request.removeEventListener(Events.FinishedLoading,this._requestFinished,this),this._pendingContentCallbacks.length&&this._innerRequestContent()}async _innerRequestContent(){if(this._contentRequested)return;let e;if(this._contentRequested=!0,this.request){const t=await this.request.contentData();this._content=t.content,this._contentEncoded=t.encoded,e={content:t.content,isEncoded:t.encoded}}else{const t=await this._resourceTreeModel.target().pageAgent().invoke_getResourceContent({frameId:this.frameId,url:this.url});t[ProtocolClient.InspectorBackend.ProtocolError]?(this._contentLoadError=t[ProtocolClient.InspectorBackend.ProtocolError],this._content=null,e={error:t[ProtocolClient.InspectorBackend.ProtocolError],isEncoded:!1}):(this._content=t.content,this._contentLoadError=null,e={content:t.content,isEncoded:t.base64Encoded}),this._contentEncoded=t.base64Encoded}null===this._content&&(this._contentEncoded=!1);for(const t of this._pendingContentCallbacks.splice(0))t(e);delete this._contentRequested}hasTextContent(){return!!this._type.isTextType()||this._type===Common.ResourceType.resourceTypes.Other&&(!!this._content&&!this._contentEncoded)}frame(){return this._resourceTreeModel.frameForId(this._frameId)}}