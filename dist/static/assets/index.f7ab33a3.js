var we=Object.defineProperty;var ue=(s,t,e)=>t in s?we(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var o=(s,t,e)=>(ue(s,typeof t!="symbol"?t+"":t,e),e),ee=(s,t,e)=>{if(!t.has(s))throw TypeError("Cannot "+e)};var i=(s,t,e)=>(ee(s,t,"read from private field"),e?e.call(s):t.get(s)),h=(s,t,e)=>{if(t.has(s))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(s):t.set(s,e)},p=(s,t,e,n)=>(ee(s,t,"write to private field"),n?n.call(s,e):t.set(s,e),e),ae=(s,t,e,n)=>({set _(a){p(s,t,a,e)},get _(){return i(s,t,n)}}),W=(s,t,e)=>(ee(s,t,"access private method"),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function e(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerpolicy&&(r.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?r.credentials="include":a.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=e(a);fetch(a.href,r)}})();const ge=`<div class="w3-container w3-display-middle">
  <div id="loginCard">
    <div class="w3-card-4 w3-display-middle w3-theme-light"
         style="min-width: max-content">
      <div class="w3-container w3-theme-dark">
        <h6>Enter your credentials please</h6>
      </div>
      <div class="w3-container">
        <form id="LoginForm"
              onsubmit="">
          <p>
            <label for="Username">Username</label>
            <input type="text"
                   id="Username"
                   placeholder="Username"
                   name="Username"
                   class="w3-input"
                   required>
          </p>
          <p>
            <label for="password">Password</label>
            <input type="password"
                   id="password"
                   placeholder="Password"
                   name="Password"
                   class="w3-input"
                   required>
          </p>
          <p>
            <button class="w3-button w3-theme-action"
                    type="submit"
                    id="submitLogin"
                    submit>
              Login
            </button>
            <button class="w3-button"
                    id="cancelLogin">Cancel</button>
          </p>
        </form>
      </div>
    </div>
  </div>
</div>`,be={render:async()=>ge,after_render:async s=>{await s.authDatabase$.logout();const t=document.getElementById("LoginForm");t.Username.select(),document.getElementById("cancelLogin").addEventListener("click",()=>s.router$.goBackToPreviousValue());const e=async n=>{n.preventDefault(),await s.authDatabase$.login({username:t.Username.value,password:t.Password.value}).then(a=>{a.username?s.router$.goBackToPreviousValue():document.getElementById("alert").alert({title:"Invalid Credentials",message:"Usernmae and/or password incorrect",w3color:"w3-blue",time:3e3}).then(l=>{t.reset(),t.Username.select()})})};document.getElementById("submitLogin").addEventListener("click",e)}},fe=`<div class="w3-top" style="opacity: 0.8;">
     <div class="w3-bar w3-theme-action w3-large">
          <button id="lock" style="min-width: 53px;" class="w3-theme-dark w3-bar-item w3-right">
          </button>
          <div class="w3-bar-item tp-bar-logo" id="logo"></div>
          <div class=" w3-bar-item tp-bar-title w3-bar-item" id="bannerLeft"></div>
          <div class=" w3-bar-item w3-right" id="bannerRight"></div>
     </div>
</div>`,ie={render:async()=>fe,after_render:async s=>{const t=e=>{document.getElementById("logo").innerHTML=e.logo,document.getElementById("bannerLeft").innerHTML=e.bannerLeft,document.getElementById("bannerRight").innerHTML=e.bannerRight,document.getElementById("lock").innerHTML=e.locked?'<i class="fas fa-lock"></i>':'<i class="fas fa-unlock"></i>',document.getElementById("lock").onclick=e.lockFunction};t(s.header$.value),s.header$.subscribe(e=>{t(e)})}},ye=`<div class="w3-bottom w3-bar" id="footerBar">
</div>`,re={render:async()=>ye,after_render:async s=>{s.footer$.subscribe(t=>{const e=document.getElementById("footerBar");e.innerHTML="";const n=(100/t.length).toString()+"%";t.map((a,r)=>{if(!a.hidden){const l=document.createElement("div");l.style.minWidth=n,l.className="w3-bar-item w3-button trans-button w3-theme-action",l.id=`footerButton${r+1}`,l.innerHTML=a.html,l.onclick=a.fn||null,e.appendChild(l)}})})}};var C,A,y,B,M,D,J;class H{constructor(t){h(this,D);h(this,C,void 0);h(this,A,void 0);h(this,y,void 0);h(this,B,void 0);h(this,M,1);o(this,"goBackToPreviousValue",()=>{i(this,B)?p(this,y,i(this,B)):p(this,y,i(this,A)),W(this,D,J).call(this)});p(this,C,new Map),p(this,y,t),p(this,A,t)}subscribe(t){return ae(this,M)._++,i(this,C).set(i(this,M),e=>new Promise((n,a)=>t(e))),()=>i(this,C).delete(i(this,M))}get value(){return i(this,y)}set value(t){JSON.stringify(t)!==JSON.stringify(i(this,y))&&(p(this,B,i(this,y)),p(this,y,t),W(this,D,J).call(this))}set valueAndBroadcastEvenIfUnchanged(t){p(this,B,i(this,y)),p(this,y,t),W(this,D,J).call(this)}get previousValue(){return i(this,B)}}C=new WeakMap,A=new WeakMap,y=new WeakMap,B=new WeakMap,M=new WeakMap,D=new WeakSet,J=async function(){i(this,C).forEach(t=>{t(i(this,y))})};var O,I,L,F,R,X;class ve{constructor(t){h(this,O,void 0);h(this,I,void 0);h(this,L,{});h(this,F,{});h(this,R,void 0);h(this,X,async t=>{const[e,n]=t.split("/@"),a=i(this,L)[e]||Object.values(i(this,L))[0],r=i(this,O)?"":t;window.history.pushState(i(this,F),"",window.location.origin+r);const l=a,g=document.querySelector(`#${i(this,R)}`);g.innerHTML="",g.innerHTML=await l.render(),await l.after_render(i(this,I),n)});o(this,"handleOnPopState",async t=>{p(this,F,(t==null?void 0:t.state)||{});const e=Object.keys(i(this,L))[0];i(this,I).router$.value=window.location.pathname==="/"?e:window.location.pathname});p(this,O,t.hideRoute||!1),p(this,L,t.routes),p(this,R,t.routerOutletId||"app"),p(this,I,{router$:new H(""),authDatabase$:t.authDatabase,header$:new H({logo:"",bannerLeft:"",bannerRight:"",locked:!0,lockFunction:()=>{}}),footer$:new H([{html:"starting up..."}])}),i(this,I).router$.subscribe(i(this,X)),window.onpopstate=this.handleOnPopState}get injection(){return i(this,I)}}O=new WeakMap,I=new WeakMap,L=new WeakMap,F=new WeakMap,R=new WeakMap,X=new WeakMap;const xe="/auth",Y={username:"",id:"",role:"",jwt:"",created_at:void 0,last_seen:void 0,group:""};var m,N,x;class Ee{constructor(t=xe,e=10*60*1e3){h(this,m,void 0);h(this,N,new H(""));o(this,"heartbeat",()=>fetch(`${i(this,m)}/heartbeat`,{method:"GET",headers:{},mode:"cors",credentials:"include"}).then(t=>t.json()).then(t=>t.data==="up"?`connected to ${i(this,m)}`:"").catch(()=>Promise.resolve("")));o(this,"currentUser$",new H(Y));o(this,"guestLogin",t=>fetch(`${i(this,m)}/guestlogin/${t}`,{method:"GET",headers:{},mode:"cors",credentials:"include"}).then(i(this,x)));o(this,"checkNameFree",t=>fetch(`${i(this,m)}/checkuserexists/${t}`,{method:"GET",headers:{},mode:"cors"}).then(e=>e.json()).then(e=>e.data.exists).then(e=>e?Promise.reject("in use - auth"):!0));o(this,"addUserWithDifferentCredentials",(t,e)=>fetch(`${i(this,m)}/adduser`,{method:"POST",headers:{Authorization:`Basic ${btoa(e.username+":"+e.password)}`,"Content-Type":"application/json"},mode:"cors",credentials:"include",body:JSON.stringify({username:t.username,role:"user",group:t.group,password:btoa(t.password)})}).then(i(this,x)));o(this,"login",t=>fetch(`${i(this,m)}/login`,{method:"GET",headers:{Authorization:`Basic ${btoa(t.username+":"+t.password)}`},mode:"cors",credentials:"include"}).then(i(this,x)));o(this,"getUser",t=>fetch(`${i(this,m)}/get-user/${t}`,{method:"GET",mode:"cors",credentials:"include"}).then(e=>e.json().then(n=>{if(n.error)throw Error(n.error);return n.data.user}).catch(n=>{console.log(`error: ${n}`)})));o(this,"getAllUsers",()=>fetch(`${i(this,m)}/users`,{method:"GET",mode:"cors",credentials:"include"}).then(t=>t.json().then(e=>{if(e.error)throw Error(e.error);return e.data}).catch(e=>{console.log(`error: ${e}`)})));o(this,"getGroups",()=>fetch(`${i(this,m)}/groups`,{method:"GET",mode:"cors",credentials:"include"}).then(t=>t.json().then(e=>{if(e.error)throw Error(e.error);return e.data}).catch(e=>{console.log(`error: ${e}`)})));o(this,"getOnlineUsers",()=>fetch(`${i(this,m)}/recentusers`,{method:"GET",mode:"cors",credentials:"include"}).then(t=>t.json().then(e=>{if(e.error)throw Error(e.error);return console.log("====================== getOnlineUsers fetching /recentusers "),console.log(JSON.stringify(e,null,2)),e.data}).catch(e=>{console.log(`error: ${e}`)})));o(this,"refresh",()=>fetch(`${i(this,m)}/refresh`,{method:"GET",mode:"cors",credentials:"include"}).then(t=>(console.log("refresh ...."),t)).then(i(this,x)));o(this,"logout",()=>(console.log("starting the log out process"),fetch(`${i(this,m)}/logout`,{method:"GET",mode:"cors",credentials:"include"}).then(i(this,x))));o(this,"updateUserRole",t=>fetch(`${i(this,m)}/changerole`,{method:"POST",mode:"cors",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(e=>e.json().then(n=>{if(n.error)throw Error(n.error);return n.data.user}).catch(n=>{console.log(`error: ${n}`)})));o(this,"checkAuth",async t=>!(t.roles&&!t.roles.some(e=>e===this.currentUser$.value.role)||t.userid&&t.userid!==this.currentUser$.value.id));o(this,"updatePassword",t=>fetch(`${this.api}/resetpassword`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t),mode:"cors",credentials:"include"}).then(i(this,x)));o(this,"updateGroup",t=>fetch(`${this.api}/changegroup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t),mode:"cors",credentials:"include"}).then(i(this,x)));o(this,"deleteUser",t=>fetch(`${this.api}/deleteuser`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t),mode:"cors",credentials:"include"}).then(i(this,x)));o(this,"addNewUser",t=>(t.password=btoa(t.password),console.log(`data.password = ${t.password}`),fetch(`${this.api}/adduser`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t),mode:"cors",credentials:"include"}).then(e=>e.json().then(n=>{if(n.error)throw Error(n.error);return n.data.newuser}).catch(n=>{console.log(`error: ${n}`)}))));h(this,x,t=>t.json().then(e=>{if(e.error)throw Error(e.error);return i(this,N).value=e.jwt,console.log(`jwt: ${i(this,N).value}`),console.log(`user: ${JSON.stringify(e.user,null,2)}`),{...e.user,jwt:e.jwt}}).then(e=>(this.currentUser$.value=e,e)).catch(e=>(console.log(`error: ${e}`),this.currentUser$.value=Y,Promise.resolve(Y))));p(this,m,t),console.log(`API set to ${i(this,m)}`),setInterval(this.refresh,e)}get api(){return i(this,m)}get jwt$(){return i(this,N)}}m=new WeakMap,N=new WeakMap,x=new WeakMap;const ke=`<div id="container" style="overflow: visible">
  <div class="w3-cell-row">
    <div class="w3-container w3-cell w3-cell-bottom">
      <!-- <button class="w3-button w3-theme-action" id="newUserButton">Create New
                    user</button> -->
    </div>
    <div class="w3-container w3-cell w3-right-align">
      <button class="w3-border w3-hover-none w3-button" id="buttonTable">
        <h5 class="w3-text-gray fas fa-th-list"></h5>
      </button>
      <button class="w3-button w3-extra-large" id="buttonCards">
        <h5 class="w3-text-gray fas fa-th"></h5>
      </button>
    </div>
  </div>
  <div class="w3-panel w3-row-padding w3-hide" id="usersCards"></div>
  <div class="w3-panel">
    <div class="w3-card" id="usersTable"></div>
  </div>
  <div class="w3-container" id="users"></div>
  <div class="w3-modal" id="singleUserModal">
    <div class="w3-transparent w3-modal-content" id="content">
      <div id="singleUserContent">
        <span
          class="w3-text-light-gray w3-button w3-large w3-display-topright"
          id="closeModal"
        >
          &times;
        </span>
        <tp-edit-user id="singleUserCard"></tp-edit-user>
      </div>
    </div>
  </div>
</div>
<tp-changerole-modal id="changeRoleWC"></tp-changerole-modal>
<tp-newuser-modal id="newUserWC"></tp-newuser-modal>
<tp-getstringfromuser-modal id="getStringWC"></tp-getstringfromuser-modal>
`,Be=`<svg height="32" width="36" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
	<path fill="lightgrey" d="M610.5 373.3c2.6-14.1 2.6-28.5 0-42.6l25.8-14.9c3-1.7 4.3-5.2 3.3-8.5-6.7-21.6-18.2-41.2-33.2-57.4-2.3-2.5-6-3.1-9-1.4l-25.8 14.9c-10.9-9.3-23.4-16.5-36.9-21.3v-29.8c0-3.4-2.4-6.4-5.7-7.1-22.3-5-45-4.8-66.2 0-3.3.7-5.7 3.7-5.7 7.1v29.8c-13.5 4.8-26 12-36.9 21.3l-25.8-14.9c-2.9-1.7-6.7-1.1-9 1.4-15 16.2-26.5 35.8-33.2 57.4-1 3.3.4 6.8 3.3 8.5l25.8 14.9c-2.6 14.1-2.6 28.5 0 42.6l-25.8 14.9c-3 1.7-4.3 5.2-3.3 8.5 6.7 21.6 18.2 41.1 33.2 57.4 2.3 2.5 6 3.1 9 1.4l25.8-14.9c10.9 9.3 23.4 16.5 36.9 21.3v29.8c0 3.4 2.4 6.4 5.7 7.1 22.3 5 45 4.8 66.2 0 3.3-.7 5.7-3.7 5.7-7.1v-29.8c13.5-4.8 26-12 36.9-21.3l25.8 14.9c2.9 1.7 6.7 1.1 9-1.4 15-16.2 26.5-35.8 33.2-57.4 1-3.3-.4-6.8-3.3-8.5l-25.8-14.9zM496 400.5c-26.8 0-48.5-21.8-48.5-48.5s21.8-48.5 48.5-48.5 48.5 21.8 48.5 48.5-21.7 48.5-48.5 48.5zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm201.2 226.5c-2.3-1.2-4.6-2.6-6.8-3.9l-7.9 4.6c-6 3.4-12.8 5.3-19.6 5.3-10.9 0-21.4-4.6-28.9-12.6-18.3-19.8-32.3-43.9-40.2-69.6-5.5-17.7 1.9-36.4 17.9-45.7l7.9-4.6c-.1-2.6-.1-5.2 0-7.8l-7.9-4.6c-16-9.2-23.4-28-17.9-45.7.9-2.9 2.2-5.8 3.2-8.7-3.8-.3-7.5-1.2-11.4-1.2h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c10.1 0 19.5-3.2 27.2-8.5-1.2-3.8-2-7.7-2-11.8v-9.2z" />
</svg>
`,E=`html{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section{display:block}summary{display:list-item}audio,canvas,progress,video{display:inline-block}progress{vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}dfn{font-style:italic}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}figure{margin:1em 40px}img{border-style:none}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}hr{box-sizing:content-box;height:0;overflow:visible}button,input,select,textarea,optgroup{font:inherit;margin:0}optgroup{font-weight:700}button,input{overflow:visible}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{border:1px solid #c0c0c0;margin:0 2px;padding:.35em .625em .75em}legend{color:inherit;display:table;max-width:100%;padding:0;white-space:normal}textarea{overflow:auto}[type=checkbox],[type=radio]{padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}html,body{font-family:Verdana,sans-serif;font-size:15px;line-height:1.5}html{overflow-x:hidden}h1{font-size:36px}h2{font-size:30px}h3{font-size:24px}h4{font-size:20px}h5{font-size:18px}h6{font-size:16px}.w3-serif{font-family:serif}.w3-sans-serif{font-family:sans-serif}.w3-cursive{font-family:cursive}.w3-monospace{font-family:monospace}h1,h2,h3,h4,h5,h6{font-family:Segoe UI,Arial,sans-serif;font-weight:400;margin:10px 0}.w3-wide{letter-spacing:4px}hr{border:0;border-top:1px solid #eee;margin:20px 0}.w3-image{max-width:100%;height:auto}img{vertical-align:middle}a{color:inherit}.w3-table,.w3-table-all{border-collapse:collapse;border-spacing:0;width:100%;display:table}.w3-table-all{border:1px solid #ccc}.w3-bordered tr,.w3-table-all tr{border-bottom:1px solid #ddd}.w3-striped tbody tr:nth-child(even){background-color:#f1f1f1}.w3-table-all tr:nth-child(odd){background-color:#fff}.w3-table-all tr:nth-child(even){background-color:#f1f1f1}.w3-hoverable tbody tr:hover,.w3-ul.w3-hoverable li:hover{background-color:#ccc}.w3-centered tr th,.w3-centered tr td{text-align:center}.w3-table td,.w3-table th,.w3-table-all td,.w3-table-all th{padding:8px;display:table-cell;text-align:left;vertical-align:top}.w3-table th:first-child,.w3-table td:first-child,.w3-table-all th:first-child,.w3-table-all td:first-child{padding-left:16px}.w3-btn,.w3-button{border:none;display:inline-block;padding:8px 16px;vertical-align:middle;overflow:hidden;text-decoration:none;color:inherit;background-color:inherit;text-align:center;cursor:pointer;white-space:nowrap}.w3-btn:hover{box-shadow:0 8px 16px #0003,0 6px 20px #00000030}.w3-btn,.w3-button{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.w3-disabled,.w3-btn:disabled,.w3-button:disabled{cursor:not-allowed;opacity:.3}.w3-disabled *,:disabled *{pointer-events:none}.w3-btn.w3-disabled:hover,.w3-btn:disabled:hover{box-shadow:none}.w3-badge,.w3-tag{background-color:#000;color:#fff;display:inline-block;padding-left:8px;padding-right:8px;text-align:center}.w3-badge{border-radius:50%}.w3-ul{list-style-type:none;padding:0;margin:0}.w3-ul li{padding:8px 16px;border-bottom:1px solid #ddd}.w3-ul li:last-child{border-bottom:none}.w3-tooltip,.w3-display-container{position:relative}.w3-tooltip .w3-text{display:none}.w3-tooltip:hover .w3-text{display:inline-block}.w3-ripple:active{opacity:.5}.w3-ripple{transition:opacity 0s}.w3-input{padding:8px;display:block;border:none;border-bottom:1px solid #ccc;width:100%}.w3-select{padding:9px 0;width:100%;border:none;border-bottom:1px solid #ccc}.w3-dropdown-click,.w3-dropdown-hover{position:relative;display:inline-block;cursor:pointer}.w3-dropdown-hover:hover .w3-dropdown-content{display:block}.w3-dropdown-hover:first-child,.w3-dropdown-click:hover{background-color:#ccc;color:#000}.w3-dropdown-hover:hover>.w3-button:first-child,.w3-dropdown-click:hover>.w3-button:first-child{background-color:#ccc;color:#000}.w3-dropdown-content{cursor:auto;color:#000;background-color:#fff;display:none;position:absolute;min-width:160px;margin:0;padding:0;z-index:1}.w3-check,.w3-radio{width:24px;height:24px;position:relative;top:6px}.w3-sidebar{height:100%;width:200px;background-color:#fff;position:fixed!important;z-index:1;overflow:auto}.w3-bar-block .w3-dropdown-hover,.w3-bar-block .w3-dropdown-click{width:100%}.w3-bar-block .w3-dropdown-hover .w3-dropdown-content,.w3-bar-block .w3-dropdown-click .w3-dropdown-content{min-width:100%}.w3-bar-block .w3-dropdown-hover .w3-button,.w3-bar-block .w3-dropdown-click .w3-button{width:100%;text-align:left;padding:8px 16px}.w3-main,#main{transition:margin-left .4s}.w3-modal{z-index:3;display:none;padding-top:100px;position:fixed;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000;background-color:#0006}.w3-modal-content{margin:auto;background-color:#fff;position:relative;padding:0;outline:0;width:600px}.w3-bar{width:100%;overflow:hidden}.w3-center .w3-bar{display:inline-block;width:auto}.w3-bar .w3-bar-item{padding:8px 16px;float:left;width:auto;border:none;display:block;outline:0}.w3-bar .w3-dropdown-hover,.w3-bar .w3-dropdown-click{position:static;float:left}.w3-bar .w3-button{white-space:normal}.w3-bar-block .w3-bar-item{width:100%;display:block;padding:8px 16px;text-align:left;border:none;white-space:normal;float:none;outline:0}.w3-bar-block.w3-center .w3-bar-item{text-align:center}.w3-block{display:block;width:100%}.w3-responsive{display:block;overflow-x:auto}.w3-container:after,.w3-container:before,.w3-panel:after,.w3-panel:before,.w3-row:after,.w3-row:before,.w3-row-padding:after,.w3-row-padding:before,.w3-cell-row:before,.w3-cell-row:after,.w3-clear:after,.w3-clear:before,.w3-bar:before,.w3-bar:after{content:"";display:table;clear:both}.w3-col,.w3-half,.w3-third,.w3-twothird,.w3-threequarter,.w3-quarter{float:left;width:100%}.w3-col.s1{width:8.33333%}.w3-col.s2{width:16.66666%}.w3-col.s3{width:24.99999%}.w3-col.s4{width:33.33333%}.w3-col.s5{width:41.66666%}.w3-col.s6{width:49.99999%}.w3-col.s7{width:58.33333%}.w3-col.s8{width:66.66666%}.w3-col.s9{width:74.99999%}.w3-col.s10{width:83.33333%}.w3-col.s11{width:91.66666%}.w3-col.s12{width:99.99999%}@media (min-width:601px){.w3-col.m1{width:8.33333%}.w3-col.m2{width:16.66666%}.w3-col.m3,.w3-quarter{width:24.99999%}.w3-col.m4,.w3-third{width:33.33333%}.w3-col.m5{width:41.66666%}.w3-col.m6,.w3-half{width:49.99999%}.w3-col.m7{width:58.33333%}.w3-col.m8,.w3-twothird{width:66.66666%}.w3-col.m9,.w3-threequarter{width:74.99999%}.w3-col.m10{width:83.33333%}.w3-col.m11{width:91.66666%}.w3-col.m12{width:99.99999%}}@media (min-width:993px){.w3-col.l1{width:8.33333%}.w3-col.l2{width:16.66666%}.w3-col.l3{width:24.99999%}.w3-col.l4{width:33.33333%}.w3-col.l5{width:41.66666%}.w3-col.l6{width:49.99999%}.w3-col.l7{width:58.33333%}.w3-col.l8{width:66.66666%}.w3-col.l9{width:74.99999%}.w3-col.l10{width:83.33333%}.w3-col.l11{width:91.66666%}.w3-col.l12{width:99.99999%}}.w3-rest{overflow:hidden}.w3-stretch{margin-left:-16px;margin-right:-16px}.w3-content,.w3-auto{margin-left:auto;margin-right:auto}.w3-content{max-width:980px}.w3-auto{max-width:1140px}.w3-cell-row{display:table;width:100%}.w3-cell{display:table-cell}.w3-cell-top{vertical-align:top}.w3-cell-middle{vertical-align:middle}.w3-cell-bottom{vertical-align:bottom}.w3-hide{display:none!important}.w3-show-block,.w3-show{display:block!important}.w3-show-inline-block{display:inline-block!important}@media (max-width:1205px){.w3-auto{max-width:95%}}@media (max-width:600px){.w3-modal-content{margin:0 10px;width:auto!important}.w3-modal{padding-top:30px}.w3-dropdown-hover.w3-mobile .w3-dropdown-content,.w3-dropdown-click.w3-mobile .w3-dropdown-content{position:relative}.w3-hide-small{display:none!important}.w3-mobile{display:block;width:100%!important}.w3-bar-item.w3-mobile,.w3-dropdown-hover.w3-mobile,.w3-dropdown-click.w3-mobile{text-align:center}.w3-dropdown-hover.w3-mobile,.w3-dropdown-hover.w3-mobile .w3-btn,.w3-dropdown-hover.w3-mobile .w3-button,.w3-dropdown-click.w3-mobile,.w3-dropdown-click.w3-mobile .w3-btn,.w3-dropdown-click.w3-mobile .w3-button{width:100%}}@media (max-width:768px){.w3-modal-content{width:500px}.w3-modal{padding-top:50px}}@media (min-width:993px){.w3-modal-content{width:900px}.w3-hide-large{display:none!important}.w3-sidebar.w3-collapse{display:block!important}}@media (max-width:992px) and (min-width:601px){.w3-hide-medium{display:none!important}}@media (max-width:992px){.w3-sidebar.w3-collapse{display:none}.w3-main{margin-left:0!important;margin-right:0!important}.w3-auto{max-width:100%}}.w3-top,.w3-bottom{position:fixed;width:100%;z-index:1}.w3-top{top:0}.w3-bottom{bottom:0}.w3-overlay{position:fixed;display:none;width:100%;height:100%;top:0;left:0;right:0;bottom:0;background-color:#00000080;z-index:2}.w3-display-topleft{position:absolute;left:0;top:0}.w3-display-topright{position:absolute;right:0;top:0}.w3-display-bottomleft{position:absolute;left:0;bottom:0}.w3-display-bottomright{position:absolute;right:0;bottom:0}.w3-display-middle{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%)}.w3-display-left{position:absolute;top:50%;left:0%;transform:translateY(-50%);-ms-transform:translate(-0%,-50%)}.w3-display-right{position:absolute;top:50%;right:0%;transform:translateY(-50%);-ms-transform:translate(0%,-50%)}.w3-display-topmiddle{position:absolute;left:50%;top:0;transform:translate(-50%);-ms-transform:translate(-50%,0%)}.w3-display-bottommiddle{position:absolute;left:50%;bottom:0;transform:translate(-50%);-ms-transform:translate(-50%,0%)}.w3-display-container:hover .w3-display-hover{display:block}.w3-display-container:hover span.w3-display-hover{display:inline-block}.w3-display-hover{display:none}.w3-display-position{position:absolute}.w3-circle{border-radius:50%}.w3-round-small{border-radius:2px}.w3-round,.w3-round-medium{border-radius:4px}.w3-round-large{border-radius:8px}.w3-round-xlarge{border-radius:16px}.w3-round-xxlarge{border-radius:32px}.w3-row-padding,.w3-row-padding>.w3-half,.w3-row-padding>.w3-third,.w3-row-padding>.w3-twothird,.w3-row-padding>.w3-threequarter,.w3-row-padding>.w3-quarter,.w3-row-padding>.w3-col{padding:0 8px}.w3-container,.w3-panel{padding:.01em 16px}.w3-panel{margin-top:16px;margin-bottom:16px}.w3-code,.w3-codespan{font-family:Consolas,courier new;font-size:16px}.w3-code{width:auto;background-color:#fff;padding:8px 12px;border-left:4px solid #4CAF50;word-wrap:break-word}.w3-codespan{color:#dc143c;background-color:#f1f1f1;padding-left:4px;padding-right:4px;font-size:110%}.w3-card,.w3-card-2{box-shadow:0 2px 5px #00000029,0 2px 10px #0000001f}.w3-card-4,.w3-hover-shadow:hover{box-shadow:0 4px 10px #0003,0 4px 20px #00000030}.w3-spin{animation:w3-spin 2s infinite linear}@keyframes w3-spin{0%{transform:rotate(0)}to{transform:rotate(359deg)}}.w3-animate-fading{animation:fading 10s infinite}@keyframes fading{0%{opacity:0}50%{opacity:1}to{opacity:0}}.w3-animate-opacity{animation:opac .8s}@keyframes opac{0%{opacity:0}to{opacity:1}}.w3-animate-top{position:relative;animation:animatetop .4s}@keyframes animatetop{0%{top:-300px;opacity:0}to{top:0;opacity:1}}.w3-animate-left{position:relative;animation:animateleft .4s}@keyframes animateleft{0%{left:-300px;opacity:0}to{left:0;opacity:1}}.w3-animate-right{position:relative;animation:animateright .4s}@keyframes animateright{0%{right:-300px;opacity:0}to{right:0;opacity:1}}.w3-animate-bottom{position:relative;animation:animatebottom .4s}@keyframes animatebottom{0%{bottom:-300px;opacity:0}to{bottom:0;opacity:1}}.w3-animate-zoom{animation:animatezoom .6s}@keyframes animatezoom{0%{transform:scale(0)}to{transform:scale(1)}}.w3-animate-input{transition:width .4s ease-in-out}.w3-animate-input:focus{width:100%!important}.w3-opacity,.w3-hover-opacity:hover{opacity:.6}.w3-opacity-off,.w3-hover-opacity-off:hover{opacity:1}.w3-opacity-max{opacity:.25}.w3-opacity-min{opacity:.75}.w3-greyscale-max,.w3-grayscale-max,.w3-hover-greyscale:hover,.w3-hover-grayscale:hover{filter:grayscale(100%)}.w3-greyscale,.w3-grayscale{filter:grayscale(75%)}.w3-greyscale-min,.w3-grayscale-min{filter:grayscale(50%)}.w3-sepia{filter:sepia(75%)}.w3-sepia-max,.w3-hover-sepia:hover{filter:sepia(100%)}.w3-sepia-min{filter:sepia(50%)}.w3-tiny{font-size:10px!important}.w3-small{font-size:12px!important}.w3-medium{font-size:15px!important}.w3-large{font-size:18px!important}.w3-xlarge{font-size:24px!important}.w3-xxlarge{font-size:36px!important}.w3-xxxlarge{font-size:48px!important}.w3-jumbo{font-size:64px!important}.w3-left-align{text-align:left!important}.w3-right-align{text-align:right!important}.w3-justify{text-align:justify!important}.w3-center{text-align:center!important}.w3-border-0{border:0!important}.w3-border{border:1px solid #ccc!important}.w3-border-top{border-top:1px solid #ccc!important}.w3-border-bottom{border-bottom:1px solid #ccc!important}.w3-border-left{border-left:1px solid #ccc!important}.w3-border-right{border-right:1px solid #ccc!important}.w3-topbar{border-top:6px solid #ccc!important}.w3-bottombar{border-bottom:6px solid #ccc!important}.w3-leftbar{border-left:6px solid #ccc!important}.w3-rightbar{border-right:6px solid #ccc!important}.w3-section,.w3-code{margin-top:16px!important;margin-bottom:16px!important}.w3-margin{margin:16px!important}.w3-margin-top{margin-top:16px!important}.w3-margin-bottom{margin-bottom:16px!important}.w3-margin-left{margin-left:16px!important}.w3-margin-right{margin-right:16px!important}.w3-padding-small{padding:4px 8px!important}.w3-padding{padding:8px 16px!important}.w3-padding-large{padding:12px 24px!important}.w3-padding-16{padding-top:16px!important;padding-bottom:16px!important}.w3-padding-24{padding-top:24px!important;padding-bottom:24px!important}.w3-padding-32{padding-top:32px!important;padding-bottom:32px!important}.w3-padding-48{padding-top:48px!important;padding-bottom:48px!important}.w3-padding-64{padding-top:64px!important;padding-bottom:64px!important}.w3-padding-top-64{padding-top:64px!important}.w3-padding-top-48{padding-top:48px!important}.w3-padding-top-32{padding-top:32px!important}.w3-padding-top-24{padding-top:24px!important}.w3-left{float:left!important}.w3-right{float:right!important}.w3-button:hover{color:#000!important;background-color:#ccc!important}.w3-transparent,.w3-hover-none:hover{background-color:transparent!important}.w3-hover-none:hover{box-shadow:none!important}.w3-theme-l5{color:#000!important;background-color:#f0f4f8!important}.w3-theme-l4{color:#000!important;background-color:#cddbe7!important}.w3-theme-l3{color:#000!important;background-color:#9bb7d0!important}.w3-theme-l2{color:#fff!important;background-color:#6993b8!important}.w3-theme-l1{color:#fff!important;background-color:#456f93!important}.w3-theme-d1{color:#fff!important;background-color:#294257!important}.w3-theme-d2{color:#fff!important;background-color:#253a4e!important}.w3-theme-d3{color:#fff!important;background-color:#203344!important}.w3-theme-d4{color:#fff!important;background-color:#1b2c3a!important}.w3-theme-d5{color:#fff!important;background-color:#172531!important}.w3-theme-light{color:#000!important;background-color:#f0f4f8!important}.w3-theme-dark,.w3-theme-action{color:#fff!important;background-color:#172531!important}.w3-theme{color:#fff!important;background-color:#2e4a62!important}.w3-text-theme{color:#2e4a62!important}.w3-border-theme{border-color:#2e4a62!important}.w3-hover-theme:hover{color:#fff!important;background-color:#2e4a62!important}.w3-hover-text-theme:hover{color:#2e4a62!important}.w3-hover-border-theme:hover{border-color:#2e4a62!important}@font-face{font-family:Open Sans;font-style:normal;font-weight:400;font-stretch:100%;font-display:swap;src:url(/assets/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVI.b34551ae.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Roboto Mono;font-style:normal;font-weight:400;font-display:swap;src:url(/assets/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vq_ROW4.7295944e.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:fa-selected;src:url(/assets/fa-selected.faa35b71.ttf?qdekin) format("truetype"),url(/assets/fa-selected.29ded04e.woff?qdekin) format("woff"),url(/assets/fa-selected.7804a04e.svg?qdekin#fa-selected) format("svg");font-weight:400;font-style:normal;font-display:block}.fas{font-family:fa-selected!important;speak:never;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.fa-th:before{content:"\\f00a"}.fa-th-list:before{content:"\\f00b"}.fa-pencil:before{content:"\\f040"}.fa-edit:before{content:"\\f044"}.fa-pencil-square-o:before{content:"\\f044"}.fa-chevron-up:before{content:"\\f077"}.fa-chevron-down:before{content:"\\f078"}.fa-key:before{content:"\\f084"}.fa-eraser:before{content:"\\f12d"}.fa-history:before{content:"\\f1da"}.fa-trash:before{content:"\\f1f8"}.fa-question-circle-o:before{content:"\\f29c"}.fa-plus:before{content:"\\f067"}.fa-minus:before{content:"\\f068"}.fa-user:before{content:"\\f007"}.fa-lock:before{content:"\\f023"}.fa-mail-forward:before{content:"\\f064"}.fa-share:before{content:"\\f064"}.fa-unlock:before{content:"\\f09c"}.fa-unlock-alt:before{content:"\\f13e"}.fa-child:before{content:"\\f1ae"}.fa-database:before{content:"\\f1c0"}body,h1,h2,h3,h4,h5,h6{font-family:Roboto Mono,monospace}label{text-align:left}input,textarea{width:100%;resize:none}.clickable{cursor:pointer}.menu{width:500px}.w3-red,.w3-hover-red:hover{color:#fff!important;background-color:#f44336!important}.trans-button{min-width:55px;opacity:.8}.tp-bar-logo{line-height:0;padding:4px 4px 4px 8px!important}.tp-bar-title{padding-left:4px!important}.tp-star-button{min-width:72!important}
`,Ie=`<div>
    <div class="w3-card-4 w3-theme-light">
        <header id="headerBox"
                class="w3-container w3-theme-dark w3-large">
            <h6><span id="name"></span><span id="online"></span></h6>

        </header>
        <div>
            <div class="w3-theme-l4">
                <table class="w3-table w3-striped">
                    <tr>
                        <td>Username</td>
                        <td><span id="username"></span></td>
                        <td id=""><a
                               class="w3-right w3-disabled w3-button w3-text-grey fas fa-edit"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>ID</td>
                        <td><span id="userid"></span></td>
                        <td id=""><a
                               class="w3-right w3-disabled w3-button w3-text-grey fas fa-edit"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>Group</td>
                        <td><span id="group"></span></td>
                        <td id="changeGroup"><a id="changeGroupButton"
                               class="w3-right w3-button w3-text-grey fas fa-edit w3-disabled"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>*******</td>
                        <td id="changePassword"><a id="changePasswordButton"
                               class="w3-right w3-button w3-text-grey fas fa-edit w3-disabled"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>Hasura-Role</td>
                        <td><span id="roleP"></span></td>
                        <td id="changeRole"><a id="changeRoleButton"
                               class="w3-right w3-button w3-text-grey fas fa-edit w3-disabled"></a>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <footer id="footerContainer"
                class="w3-theme-light">
            <table class="w3-table">
                <tr>
                    <td colspan="3">
                        <div class="w3-text-grey w3-small w3-threequarter">
                            <p id="timesP">
                                <span id="lastSeen"></span> | <span
                                      id="createdAt"></span>
                            </p>
                        </div>
                    </td>
                    <td></td>
                    <td><span id="deleteUserButton"
                              class="w3-button w3-disabled w3-text-grey fas fa-trash w3-right">
                        </span>
                    </td>
                </tr>
            </table>

            <p></p>
        </footer>
    </div>

</div>`,Ce=["January","February","March","April","May","June","July","August","September","October","November","Decemeber"];function G(s,t="",e=""){const n=s.getDate(),a=Ce[s.getMonth()],r=s.getFullYear(),l=s.getHours();let g=s.getMinutes();const k=g<10?`0${g.toString()}`:g.toString();return t?`${t} at ${l}:${k}`:e?`in ${a} ${e}`:`${n}-${a}-${r}. at ${l}:${k}`}function j(s){if(!s)return null;const t=typeof s=="object"?s:new Date(s),e=864e5,n=new Date,a=new Date(n.valueOf()-e),r=Math.round((n.valueOf()-t.valueOf())/1e3),l=Math.round(r/60),g=n.toDateString()===t.toDateString(),k=a.toDateString()===t.toDateString(),w=n.getFullYear()===t.getFullYear(),U=n.getFullYear()===t.getFullYear()+1;return r<5?"just now":r<60?`${r} seconds ago`:r<90?"about a minute ago":l<60?`${l} minutes ago`:g?G(t,"Today"):k?G(t,"Yesterday"):w?G(t,""," "):U?G(t,""," last year"):"more than a year ago"}var f;class le extends HTMLElement{constructor(){super();o(this,"shadow");o(this,"template");o(this,"changePassword");o(this,"changeRole");o(this,"changeGroup");o(this,"deleteUser");o(this,"resolvePromiseAlert");o(this,"rejectPromiseAlert");h(this,f,Y);this.shadow=this.attachShadow({mode:"open"}),this.template=document.createElement("template"),this.template.innerHTML=Ie;const e=document.createElement("style");e.innerText=E,this.shadow.appendChild(e),this.shadow.appendChild(this.template.content.cloneNode(!0)),this.changePassword=new CustomEvent("changePassword",{bubbles:!0,cancelable:!1,composed:!0}),this.changeRole=new CustomEvent("changeRole",{bubbles:!0,cancelable:!1,composed:!0}),this.changeGroup=new CustomEvent("changeGroup",{bubbles:!0,cancelable:!1,composed:!0}),this.deleteUser=new CustomEvent("deleteUser",{bubbles:!0,cancelable:!1,composed:!0})}attributeChangedCallback(e,n,a){if(e==="online"){const r=this.shadow.getElementById("headerBox"),l=this.shadow.getElementById("online");a==="false"||a==="False"||a===""?(r.classList.remove("w3-red"),r.classList.add("w3-theme-d3"),l.innerHTML=""):(r.classList.remove("w3-theme-d3"),r.classList.add("w3-red"),l.innerHTML=" (online)")}if(e==="user"){p(this,f,JSON.parse(a)),i(this,f).created_at&&(this.shadow.getElementById("lastSeen").innerHTML=`Created ${j(new Date(i(this,f).created_at))}`),i(this,f).last_seen&&(this.shadow.getElementById("createdAt").innerHTML=`Last seen ${j(new Date(i(this,f).last_seen))}`),this.shadow.getElementById("name").innerHTML=i(this,f).username,this.shadow.getElementById("username").innerHTML=i(this,f).username,this.shadow.getElementById("userid").innerHTML=`${i(this,f).id}`,this.shadow.getElementById("group").innerHTML=`${i(this,f).group}`;const r=this.shadow.getElementById("footerContainer");switch(this.shadow.getElementById("roleP").innerHTML=`${i(this,f).role}`||"no role assigned",i(this,f).role){case"admin":r.classList.add("w3-theme-l2");break;case"superuser":r.classList.add("w3-theme-l3");break;default:r.classList.add("w3-theme-l4")}}e==="enable"&&a==="password"&&(this.shadow.getElementById("changePasswordButton").classList.remove("w3-disabled"),this.shadow.getElementById("changePasswordButton").onclick=()=>{this.dispatchEvent(this.changePassword)}),e==="enable"&&a==="role"&&(this.shadow.getElementById("changeRoleButton").classList.remove("w3-disabled"),this.shadow.getElementById("changeRoleButton").onclick=()=>{this.dispatchEvent(this.changeRole)}),e==="enable"&&a==="group"&&(this.shadow.getElementById("changeGroupButton").classList.remove("w3-disabled"),this.shadow.getElementById("changeGroupButton").onclick=()=>{this.dispatchEvent(this.changeGroup)}),e==="enable"&&a==="deleteUser"&&(this.shadow.getElementById("deleteUserButton").classList.remove("w3-disabled"),this.shadow.getElementById("deleteUserButton").onclick=()=>{this.dispatchEvent(this.deleteUser)})}static get observedAttributes(){return["user","wcIndex","online","enable"]}}f=new WeakMap;customElements.define("tp-edit-user",le);class de extends HTMLElement{constructor(){super();o(this,"table");o(this,"shadow");o(this,"div");o(this,"erase",()=>{this.table.innerText=""});this.shadow=this.attachShadow({mode:"open"}),this.div=document.createElement("div"),this.div.classList.add("w3-responsive"),this.table=document.createElement("table");const e=document.createElement("style");e.innerText=E;const n=document.createElement("style");n.innerHTML=".clickable { cursor: pointer; }",this.shadow.appendChild(e),this.shadow.appendChild(n),this.table.classList.add("w3-table"),this.table.classList.add("w3-striped"),this.table.classList.add("w3-bordered"),this.div.appendChild(this.table),this.shadow.appendChild(this.div)}set data(e){this.erase();const n=this.table.insertRow(-1);e.headings.forEach(a=>{n.appendChild(document.createElement("th")).innerHTML=a.header}),n.classList.add("w3-hover-none"),e.data[0].id?this.table.classList.remove("w3-opacity-max"):this.table.classList.add("w3-opacity-max"),e.data.forEach(a=>{const r=this.table.insertRow(-1);e.headings.forEach(l=>{const g=r.appendChild(document.createElement("td"));g.innerHTML=a[l.key]?a[l.key].toString():"",g.id=a.id.toString(),g.addEventListener("click",k=>{const U=k.target.id;e.clickCallback(U)})}),a.id&&(r.classList.add("w3-hover-red"),r.classList.add("w3-hover-opacity"),r.classList.add("clickable"))})}}customElements.define("tp-table",de);const Le={render:async()=>ke,after_render:async s=>{const t=document.getElementById("usersCards"),e=document.getElementById("usersTable"),n=document.getElementById("buttonTable"),a=document.getElementById("buttonCards"),r=()=>{localStorage.setItem("view","table"),e.classList.remove("w3-hide"),t.classList.add("w3-hide"),a.classList.remove("w3-border","w3-hover-none"),n.classList.add("w3-border","w3-hover-none")},l=()=>{localStorage.setItem("view","cards"),e.classList.add("w3-hide"),t.classList.remove("w3-hide"),a.classList.add("w3-border","w3-hover-none"),n.classList.remove("w3-border","w3-hover-none")},g=async()=>{s.router$.value="/signin"},k=async()=>{await s.authDatabase$.logout(),s.router$.valueAndBroadcastEvenIfUnchanged=s.router$.value};switch(localStorage.getItem("view")){case"table":r();break;case"cards":l();break}const w=s.authDatabase$;w.heartbeat().then(u=>{u||document.getElementById("alert").alert({title:"No connection to authentication server",message:"Refresh to try again",w3color:"w3-theme-action",time:2e3})}),s.footer$.value=[{html:'new user <i class="fas fa-plus"></i><i class="fas fa-user"></i>'}];const U=u=>{s.header$.value={bannerLeft:"Users",logo:`${Be}`,bannerRight:u.username||"",locked:u.username==="",lockFunction:u.username===""?g:k},s.footer$.value=[{html:'new user <i class="fas fa-plus"></i><i class="fas fa-user"></i>',hidden:u.role!=="admin"}]};if(U(w.currentUser$.value),!w.currentUser$.value.username)s.router$.value="/signin";else{document.getElementById("container").classList.add("w3-show"),console.log(`database.currentUser$.value = ${JSON.stringify(w.currentUser$.value,null,2)}`);const u=w.currentUser$.value.role==="admin"?await w.getAllUsers():[w.currentUser$.value];console.log(`allUsers = ${JSON.stringify(u,null,2)}`);const S=await w.getOnlineUsers();console.log(`onlineUsers = ${JSON.stringify(S,null,2)}`);const Z=(d,b,c,q=!1,K=!1,Q=!1,me=!1)=>(d.setAttribute("wcIndex",b.toString()),d.addEventListener("changePassword",()=>{document.getElementById("changePasswordWC").changePassword({title:`Set new password for ${c.username}`}).then(v=>{w.updatePassword({newPassword:v,userid:parseInt(c.id)})})}),d.addEventListener("changeGroup",()=>{document.getElementById("getStringWC").getString({displayTitle:`change group for ${c.username}`,submitButtonText:"OK"}).then(v=>(console.log(`new group will be ${v}`),w.updateGroup({userid:parseInt(c.id),newGroup:v}).then(ne=>{document.getElementById("alert").alert({title:"Database updated",message:`group updated for ${c.username} to ${v}`,w3color:"w3-theme-action",time:2e3}).then(pe=>{s.router$.valueAndBroadcastEvenIfUnchanged="/"})})))}),d.addEventListener("deleteUser",()=>{document.getElementById("tpYesNoModal").askYesOrNo({question:`Are  you sure you want to delete ${c.username}`,yesButtonText:"Yes I know what I am doing",noButtonText:"No"}).then(v=>v?(console.log(`going to delete ${c.username}`),w.deleteUser({userid:parseInt(c.id)}).then(ne=>{document.getElementById("alert").alert({title:"Database updated",message:`deleted ${c.username} from database`,w3color:"w3-theme-action",time:2e3}).then(pe=>{s.router$.valueAndBroadcastEvenIfUnchanged="/"})})):(console.log("delete operation canceled"),null))}),d.addEventListener("changeRole",()=>{document.getElementById("changeRoleWC").ChangeRole({displayName:c.username,currentRole:c.role||"user"}).then(v=>{w.updateUserRole({newrole:v,userid:parseInt(c.id)}),document.getElementById("alert").alert({title:"Database updated",message:`role updated for ${c.username} to ${v}`,w3color:"w3-theme-action",time:2e3}).then(se=>{s.router$.valueAndBroadcastEvenIfUnchanged="/"})})}),S&&Object.values(S).some(v=>v.username===c.username)&&d.setAttribute("online","true"),d.setAttribute("user",JSON.stringify(c)),q&&d.setAttribute("enable","password"),K&&d.setAttribute("enable","role"),Q&&d.setAttribute("enable","group"),me&&d.setAttribute("enable","deleteUser"),d);u.sort((d,b)=>parseInt(d.id)-parseInt(b.id)).map((d,b)=>{let c=new le;return c=Z(c,b,d,s.authDatabase$.currentUser$.value.role==="admin"||d.id===s.authDatabase$.currentUser$.value.id,s.authDatabase$.currentUser$.value.role==="admin",s.authDatabase$.currentUser$.value.role==="admin",s.authDatabase$.currentUser$.value.role==="admin"&&d.id!==s.authDatabase$.currentUser$.value.id),c}).forEach((d,b)=>{let c=document.createElement("div");c.classList.add("w3-third"),c.appendChild(d),t.appendChild(c)});const ce=[{key:"id",header:"ID"},{key:"username",header:"Username"},{key:"online",header:"Online"},{key:"role",header:"Role"},{key:"last_seen",header:"Last Seen"},{key:"group",header:"Group"}],he=u.map(d=>Object.assign({},d,{created_at:j(d.created_at),last_seen:j(d.last_seen),online:Object.values(S).some(b=>b.username===d.username)?"Yes":"No"})).sort((d,b)=>parseInt(d.id)-parseInt(b.id)),oe=new de;oe.data={headings:ce,data:he,clickCallback:d=>{const b=u.filter(Q=>Q.id.toString()===d.toString())[0];let c=document.getElementById("singleUserCard");c=Z(c,-1,b,s.authDatabase$.currentUser$.value.role==="admin"||b.id===s.authDatabase$.currentUser$.value.id,s.authDatabase$.currentUser$.value.role==="admin",s.authDatabase$.currentUser$.value.role==="admin",s.authDatabase$.currentUser$.value.role==="admin"&&b.id!==s.authDatabase$.currentUser$.value.id);let q=document.getElementById("singleUserModal");q.style.display="block";let K=document.getElementById("closeModal");K.onclick=()=>q.style.display="none"}},e.appendChild(oe)}a.onclick=l,n.onclick=r,console.log("setting newUserButton.onclick now ....");const te=document.getElementById("footerButton1");te.onclick=()=>{document.getElementById("newUserWC").NewUser().then(w.addNewUser).then(u=>{document.getElementById("alert").alert({title:"Database updated",message:`new user ${u.username} (role=${u.role}, id = ${u.id}) added`,w3color:"w3-theme-action",time:2e3}).then(Z=>{s.router$.valueAndBroadcastEvenIfUnchanged="/users"})})},s.authDatabase$.currentUser$.subscribe(u=>{U(u),te.disabled=w.currentUser$.value.role!=="admin"})}},Pe=`<div class="w3-modal"
  id="alert">
  <div class="w3-panel w3-theme-action w3-modal-content w3-display-container w3-display-middle"
       id="content">
    <span class="w3-button w3-display-topright"
          id="closeModal">
      &times;
    </span>
    <h5 id="title"></h5>
    <p id="message"></p>
  </div>
</div>`;var z;class $e extends HTMLElement{constructor(){var a;super();o(this,"shadow");o(this,"template");o(this,"modal");o(this,"resolvePromiseAlert");o(this,"rejectPromiseAlert");o(this,"alert",e=>(this.shadow.getElementById("title").innerHTML=e.title,this.shadow.getElementById("message").innerHTML=e.message,this.shadow.getElementById("content").classList.add(e.w3color),this.modal.style.display="block",e.time&&setTimeout(i(this,z),e.time),e.noClose&&(this.shadow.getElementById("closeModal").style.display="none"),new Promise((n,a)=>{this.resolvePromiseAlert=n,this.rejectPromiseAlert=a})));h(this,z,()=>{this.resolvePromiseAlert(!0),this.modal.style.display="none"});this.shadow=this.attachShadow({mode:"open"}),this.template=document.createElement("template"),this.template.innerHTML=Pe;const e=document.createElement("style"),n=document.createElement("style");e.innerText=E,this.shadow.appendChild(e),this.shadow.appendChild(n),this.shadow.appendChild(this.template.content.cloneNode(!0)),this.modal=this.shadow.getElementById("alert"),(a=this.shadow.getElementById("closeModal"))==null||a.addEventListener("click",i(this,z))}}z=new WeakMap;customElements.define("tp-alert-modal",$e);const Te=`
#content {
  text-align: center;
  justify-content: center;
  align-items: center;


}

#icon {
  text-align: center; 
  vertical-align: middle; 
}
`,Ue=`  
  <div class="w3-modal"
  id="modal">
  <div class="w3-theme-d4 w3-modal-content w3-display-middle"
       id="content">
    <div class="w3-xlarge" id="icon">talking to server...</div>
  </div>
</div>`;class Se extends HTMLElement{constructor(){super();o(this,"shadow");o(this,"template");o(this,"modal");o(this,"resolvePromiseAlert");o(this,"rejectPromiseAlert");o(this,"loading",()=>(this.modal.style.display="block",new Promise((e,n)=>{this.resolvePromiseAlert=e,this.rejectPromiseAlert=n})));o(this,"loaded",()=>{this.resolvePromiseAlert(!0),this.modal.style.display="none"});this.shadow=this.attachShadow({mode:"open"}),this.template=document.createElement("template"),this.template.innerHTML=Ue;const e=document.createElement("style"),n=document.createElement("style");e.innerText=E+Te,this.shadow.appendChild(e),this.shadow.appendChild(n),this.shadow.appendChild(this.template.content.cloneNode(!0)),this.modal=this.shadow.getElementById("modal")}}customElements.define("tp-loader",Se);const Me=`<div id="loginCard"
     class="w3-modal">
    <div class="w3-modal-content w3-card-4 w3-theme-light">
        <div class="w3-container w3-theme-dark">
            <h6 id="title">New Password</h6>
            <span id="closeLoginDialogCross"
                  class="w3-button w3-large w3-display-topright">&times;</span>
        </div>
        <div class="w3-container">
            <form onsubmit=""
                  id="ChangePasswordForm">
                <p>
                    <label for="password">New Password</label>
                    <input type="password"
                           id="newPassword"
                           placeholder="new password"
                           name="newPassword"
                           class="w3-input"
                           required>
                </p>
                <p>
                    <label for="password">Re-enter New Password</label>
                    <input type="password"
                           id="retypeNewPassword"
                           placeholder="new password"
                           name="newPassword2"
                           class="w3-input"
                           required>
                </p>
                <p>
                    <button class="w3-button w3-theme-action"
                            type="submit"
                            id="submitButton"
                            submit>
                        Set Password
                    </button>
                    <button class="w3-button"
                            id="closeLoginDialogButton">Cancel</button>
                </p>
            </form>
        </div>
    </div>
</div>`;var P,_;class De extends HTMLElement{constructor(){var n,a,r;super();o(this,"shadow");o(this,"template");o(this,"modal");o(this,"newPassword","");o(this,"newPasswordInput");o(this,"retypeNewPasswordInput");o(this,"displayTitle");o(this,"submitButton");o(this,"resolvePromiseChangePassword");o(this,"rejectPromiseChangePassword");o(this,"changePassword",e=>(this.displayTitle.innerHTML=`${e.title}`,this.submitButton.onclick=n=>{n.preventDefault(),this.newPassword=btoa(this.newPasswordInput.value),this.resolvePromiseChangePassword(this.newPassword),i(this,P).call(this)},this.newPasswordInput.value="",this.retypeNewPasswordInput.value="",this.modal.style.display="block",this.submitButton.disabled=!0,this.newPasswordInput.select(),new Promise((n,a)=>{this.resolvePromiseChangePassword=n,this.rejectPromiseChangePassword=a})));h(this,P,()=>{this.modal.style.display="none"});h(this,_,()=>{this.retypeNewPasswordInput.value===this.newPasswordInput.value?(this.retypeNewPasswordInput.setCustomValidity(""),this.submitButton.disabled=!1):(this.retypeNewPasswordInput.setCustomValidity("passwords do not match"),this.submitButton.disabled=!0,this.retypeNewPasswordInput.reportValidity())});this.shadow=this.attachShadow({mode:"open"}),this.template=document.createElement("template"),this.template.innerHTML=Me;const e=document.createElement("style");e.innerText=E,this.shadow.appendChild(e),this.shadow.appendChild(this.template.content.cloneNode(!0)),this.modal=this.shadow.getElementById("loginCard"),this.newPasswordInput=this.shadow.getElementById("newPassword"),this.retypeNewPasswordInput=this.shadow.getElementById("retypeNewPassword"),this.displayTitle=this.shadow.getElementById("title"),(n=this.shadow.getElementById("closeLoginDialogCross"))==null||n.addEventListener("click",i(this,P)),(a=this.shadow.getElementById("closeLoginDialogButton"))==null||a.addEventListener("click",i(this,P)),(r=this.shadow.getElementById("closeLoginDialog"))==null||r.addEventListener("click",i(this,P)),this.submitButton=this.shadow.getElementById("submitButton"),this.retypeNewPasswordInput.onkeyup=i(this,_),this.newPasswordInput.onchange=i(this,_)}}P=new WeakMap,_=new WeakMap;customElements.define("tp-changepassword-modal",De);const Ne=`<div id="loginCard"
     class="w3-modal">
    <div class="w3-modal-content w3-card-4 w3-theme-light">
        <div class="w3-container w3-theme-dark">
            <h6 id="title">Change Role</h6>
            <span id="closeLoginDialogCross"
                  class="w3-button w3-large w3-display-topright">&times;</span>
        </div>
        <div class="w3-container">
            <form onsubmit=""
                  id="ChangeRoleForm">
                <p>
                    <label> <input class="w3-radio"
                               type="radio"
                               name="role"
                               id="roleRadio"
                               value="user">
                        Standard User</label>
                </p>
                <p>
                    <label> <input class="w3-radio"
                               type="radio"
                               name="role"
                               id="roleRadio"
                               value="superuser">
                        Super User</label>
                </p>
                <p>
                    <label> <input class="w3-radio"
                               type="radio"
                               name="role"
                               id="roleRadio"
                               value="admin">
                        Administrator</label>
                </p>
                <p>
                    <button class="w3-button w3-theme-action"
                            type="submit"
                            id="submitButton"
                            submit>
                        Change Role
                    </button>
                    <button class="w3-button"
                            id="closeLoginDialogButton">Cancel</button>
                </p>
            </form>
        </div>
    </div>
</div>`;var $;class He extends HTMLElement{constructor(){var n,a,r;super();o(this,"shadow");o(this,"template");o(this,"modal");o(this,"newRole","");o(this,"displayTitle");o(this,"submitButton");o(this,"resolvePromiseChangeRole");o(this,"rejectPromiseChangeRole");o(this,"ChangeRole",e=>(this.displayTitle.innerHTML=`Change role for ${e.displayName}`,this.shadow.querySelectorAll("#roleRadio").forEach(n=>{n.checked=n.value===e.currentRole}),this.submitButton.onclick=n=>{n.preventDefault(),this.shadow.querySelectorAll("#roleRadio").forEach(a=>this.newRole=a.checked?a.value:this.newRole),this.resolvePromiseChangeRole(this.newRole),i(this,$).call(this)},this.modal.style.display="block",new Promise((n,a)=>{this.resolvePromiseChangeRole=n,this.rejectPromiseChangeRole=a})));h(this,$,()=>{this.modal.style.display="none"});this.shadow=this.attachShadow({mode:"open"}),this.template=document.createElement("template"),this.template.innerHTML=Ne;const e=document.createElement("style");e.innerText=E,this.shadow.appendChild(e),this.shadow.appendChild(this.template.content.cloneNode(!0)),this.modal=this.shadow.getElementById("loginCard"),this.displayTitle=this.shadow.getElementById("title"),(n=this.shadow.getElementById("closeLoginDialogCross"))==null||n.addEventListener("click",i(this,$)),(a=this.shadow.getElementById("closeLoginDialogButton"))==null||a.addEventListener("click",i(this,$)),(r=this.shadow.getElementById("closeLoginDialog"))==null||r.addEventListener("click",i(this,$)),this.submitButton=this.shadow.getElementById("submitButton")}}$=new WeakMap;customElements.define("tp-changerole-modal",He);const Ae=`<div id="loginCard" class="w3-modal">
    <div class="w3-modal-content w3-card-4">
        <div class="w3-container w3-theme-dark">
            <h6 id="title">Create New User</h6>
            <span id="closeLoginDialogCross" class="w3-button w3-large w3-display-topright">&times;</span>
        </div>
        <div class="w3-container">
            <form onsubmit="" id="ChangeRoleForm">

                <p>
                    <label for="usernmae">Username</label>
                    <input class="w3-input" type="text" id="username" placeholder="username" name="username">
                </p>
                <p>
                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="password" name="newPassword" class="w3-input" required>
                </p>
                <p>
                    <label for="group">Group</label>
                    <input type="text" id="group" placeholder="group" name="newGroup" class="w3-input" required>
                </p>

                <p>
                    <label> <input class="w3-radio" type="radio" name="role" id="roleRadio" value="user">
                        Standard User</label>
                </p>
                <p>
                    <label> <input class="w3-radio" type="radio" name="role" id="roleRadio" value="superuser">
                        Super User</label>
                </p>
                <p>
                    <label> <input class="w3-radio" type="radio" name="role" id="roleRadio" value="admin">
                        Administrator</label>
                </p>
                <p>
                    <button class="w3-button w3-theme-action" type="submit" id="submitButton" submit>
                        Create User
                    </button>
                    <button class="w3-button" id="closeLoginDialogButton">Cancel</button>
                </p>
            </form>
        </div>
    </div>
</div>`;var T;class Oe extends HTMLElement{constructor(){var n,a,r;super();o(this,"shadow");o(this,"template");o(this,"modal");o(this,"newUsername","");o(this,"newPassword","");o(this,"newRole","");o(this,"groupForNewUser","");o(this,"submitButton");o(this,"resolvePromiseNewUser");o(this,"rejectPromiseChangeRole");o(this,"NewUser",()=>(this.submitButton.onclick=e=>{e.preventDefault(),this.newUsername=this.shadow.getElementById("username").value,this.newPassword=this.shadow.getElementById("password").value,this.groupForNewUser=this.shadow.getElementById("group").value,this.shadow.querySelectorAll("#roleRadio").forEach(n=>this.newRole=n.checked?n.value:this.newRole),this.resolvePromiseNewUser({username:this.newUsername,password:this.newPassword,role:this.newRole,group:this.groupForNewUser}),i(this,T).call(this)},this.modal.style.display="block",new Promise((e,n)=>{this.resolvePromiseNewUser=e,this.rejectPromiseChangeRole=n})));h(this,T,()=>{this.modal.style.display="none"});this.shadow=this.attachShadow({mode:"open"}),this.template=document.createElement("template"),this.template.innerHTML=Ae;const e=document.createElement("style");e.innerText=E,this.shadow.appendChild(e),this.shadow.appendChild(this.template.content.cloneNode(!0)),this.modal=this.shadow.getElementById("loginCard"),(n=this.shadow.getElementById("closeLoginDialogCross"))==null||n.addEventListener("click",i(this,T)),(a=this.shadow.getElementById("closeLoginDialogButton"))==null||a.addEventListener("click",i(this,T)),(r=this.shadow.getElementById("closeLoginDialog"))==null||r.addEventListener("click",i(this,T)),this.submitButton=this.shadow.getElementById("submitButton")}}T=new WeakMap;customElements.define("tp-newuser-modal",Oe);const Fe=`<div id="loginCard"
     class="w3-modal">
    <div class="w3-modal-content w3-card-4 w3-round w3-theme-light"
         style="opacity: 0.8;">
        <div class="w3-container w3-theme-action">
            <h6 
                id="title">Log In</h6>
            <span id="closeLoginDialogCross"
                  class="w3-button w3-large w3-display-topright w3-round">&times;</span>
        </div>
        <div class="w3-container">
            <form onsubmit=""
                  id="SubmitPasswordForm">
                <p>
                    <input type="password"
                           id="password"
                           placeholder="password"
                           name="password"
                           class="w3-input"
                           required>
                </p>
                <p>
                    <button class=" w3-button w3-theme-action"
                            type="submit"
                            id="submitButton"
                            submit>
                        Log In
                    </button>
                    <button class=" w3-button"
                            id="closeLoginDialogButton">Cancel</button>
                </p>
            </form>
        </div>
    </div>
</div>`;class Re extends HTMLElement{constructor(){var n,a,r;super();o(this,"shadow");o(this,"template");o(this,"modal");o(this,"submittedPassword","");o(this,"passwordInput");o(this,"displayTitle");o(this,"submitButton");o(this,"resolvePromiseSubmitPassword");o(this,"rejectPromiseSubmitPassword");o(this,"submitPassword",e=>(e.loginButtonText&&(this.shadow.getElementById("submitButton").innerHTML=e.loginButtonText),this.displayTitle.innerHTML=e.displayTitle,this.submitButton.onclick=n=>{n.preventDefault(),this.submittedPassword=this.passwordInput.value,this.resolvePromiseSubmitPassword(this.submittedPassword),this.closeModal()},this.passwordInput.value="",this.modal.style.display="block",this.passwordInput.select(),new Promise((n,a)=>{this.resolvePromiseSubmitPassword=n,this.rejectPromiseSubmitPassword=a})));o(this,"closeModal",()=>{this.modal.style.display="none"});this.shadow=this.attachShadow({mode:"open"}),this.template=document.createElement("template"),this.template.innerHTML=Fe;const e=document.createElement("style");e.innerText=E,this.shadow.appendChild(e),this.shadow.appendChild(this.template.content.cloneNode(!0)),this.modal=this.shadow.getElementById("loginCard"),this.passwordInput=this.shadow.getElementById("password"),this.displayTitle=this.shadow.getElementById("title"),(n=this.shadow.getElementById("closeLoginDialogCross"))==null||n.addEventListener("click",this.closeModal),(a=this.shadow.getElementById("closeLoginDialogButton"))==null||a.addEventListener("click",this.closeModal),(r=this.shadow.getElementById("closeLoginDialog"))==null||r.addEventListener("click",this.closeModal),this.submitButton=this.shadow.getElementById("submitButton")}}customElements.define("tp-loginpasswordonly-modal",Re);const ze=`<div id="loginCard"
     class="w3-modal">
    <div class="w3-modal-content w3-card-4 w3-theme-light">
        <div class="w3-container w3-theme-dark">
            <h6 id="title">Log In</h6>
            <span id="closeLoginDialogCross"
                  class="w3-button w3-large w3-display-topright">&times;</span>
        </div>
        <div class="w3-container">
            <form onsubmit=""
                  id="SubmitPasswordForm">
                <p>
                    <input type="text"
                           id="stringInput"
                           placeholder=""
                           name="stringInput"
                           class="w3-input"
                           required>
                </p>
                <p>
                    <button class=" w3-button w3-theme-action"
                            type="submit"
                            id="submitButton"
                            submit>
                        Submit
                    </button>
                    <button class=" w3-button"
                            id="closeLoginDialogButton">Cancel</button>
                </p>
            </form>
        </div>
    </div>
</div>`;class _e extends HTMLElement{constructor(){var n,a,r;super();o(this,"shadow");o(this,"template");o(this,"modal");o(this,"submittedString","");o(this,"stringInput");o(this,"displayTitle");o(this,"submitButton");o(this,"resolvePromiseSubmitString");o(this,"rejectPromiseSubmitString");o(this,"getString",e=>(e.submitButtonText&&(this.shadow.getElementById("submitButton").innerHTML=e.submitButtonText),this.displayTitle.innerHTML=e.displayTitle,this.submitButton.onclick=n=>{n.preventDefault(),this.submittedString=this.stringInput.value,this.resolvePromiseSubmitString(this.submittedString),this.closeModal()},this.stringInput.value="",this.modal.style.display="block",this.stringInput.select(),new Promise((n,a)=>{this.resolvePromiseSubmitString=n,this.rejectPromiseSubmitString=a})));o(this,"closeModal",()=>{this.modal.style.display="none"});this.shadow=this.attachShadow({mode:"open"}),this.template=document.createElement("template"),this.template.innerHTML=ze;const e=document.createElement("style");e.innerText=E,this.shadow.appendChild(e),this.shadow.appendChild(this.template.content.cloneNode(!0)),this.modal=this.shadow.getElementById("loginCard"),this.stringInput=this.shadow.getElementById("stringInput"),this.displayTitle=this.shadow.getElementById("title"),(n=this.shadow.getElementById("closeLoginDialogCross"))==null||n.addEventListener("click",this.closeModal),(a=this.shadow.getElementById("closeLoginDialogButton"))==null||a.addEventListener("click",this.closeModal),(r=this.shadow.getElementById("closeLoginDialog"))==null||r.addEventListener("click",this.closeModal),this.submitButton=this.shadow.getElementById("submitButton")}}customElements.define("tp-getstringfromuser-modal",_e);const qe=`<div id="loginCard"
     class="w3-modal">
  <div class="w3-modal-content w3-card-4 w3-theme-light">
    <div class="w3-container w3-theme-action w3-round">
      <h6 id="title"></h6>
      <span id="closeLoginDialogCross"
            class="w3-button w3-large w3-display-topright w3-round">&times;</span>
    </div>
    <div class="w3-container">
      <form onsubmit=""
            id="SubmitPasswordForm">
        <p>
          <button class="w3-button w3-theme-action"
                  type="submit"
                  id="yesButton"
                  submit></button>
          <button class="w3-button"
                  id="noButton"></button>
        </p>
      </form>
    </div>
  </div>
</div>`;class We extends HTMLElement{constructor(){super();o(this,"shadow");o(this,"template");o(this,"modal");o(this,"yes",!1);o(this,"displayTitle");o(this,"yesButton");o(this,"noButton");o(this,"closeLoginDialogCross");o(this,"resolvePromiseSubmitPassword");o(this,"rejectPromiseSubmitPassword");o(this,"askYesOrNo",e=>{this.displayTitle.innerHTML=e.question||"Answer the question",this.yesButton.innerHTML=e.yesButtonText||"Yes",this.noButton.innerHTML=e.noButtonText||"No";const n=r=>{r.preventDefault(),this.resolvePromiseSubmitPassword(!0),this.closeModal()},a=r=>{r.preventDefault(),this.resolvePromiseSubmitPassword(!1),this.closeModal()};return this.yesButton.onclick=n,this.noButton.onclick=a,this.closeLoginDialogCross.onclick=a,this.modal.style.display="block",new Promise((r,l)=>{this.resolvePromiseSubmitPassword=r,this.rejectPromiseSubmitPassword=l})});o(this,"closeModal",()=>{this.modal.style.display="none"});this.shadow=this.attachShadow({mode:"open"}),this.template=document.createElement("template"),this.template.innerHTML=qe;const e=document.createElement("style");e.innerText=E,this.shadow.appendChild(e),this.shadow.appendChild(this.template.content.cloneNode(!0)),this.modal=this.shadow.getElementById("loginCard"),this.displayTitle=this.shadow.getElementById("title"),this.closeLoginDialogCross=this.shadow.getElementById("closeLoginDialogCross"),this.yesButton=this.shadow.getElementById("yesButton"),this.noButton=this.shadow.getElementById("noButton")}}customElements.define("tp-yesno-modal",We);const Ge="",V=new ve({routes:{"/":Le,"/signin":be},authDatabase:new Ee(Ge),routerOutletId:"app",hideRoute:!0}),Je=async()=>{const s=document.querySelector("#header");s.innerHTML=await ie.render(),await ie.after_render(V.injection);const t=document.querySelector("#footer");t.innerHTML=await re.render(),await re.after_render(V.injection)},Ye=async()=>V.injection.authDatabase$.refresh().then(s=>V.handleOnPopState()).catch(s=>{document.getElementById("alert").alert({title:"No connection to authentication server",message:"Refresh to try again",w3color:"w3-theme-action",noClose:!0})}),je=window.fetch;async function Ve(s,t){const e=document.getElementById("loader");e.loading();const n=await je(s,t);return e.loaded(),n}window.fetch=Ve;Je().then(Ye).then(s=>{document.getElementById("app").style.height="100vh",document.getElementById("splash").style.visibility="hidden",document.getElementById("header").style.visibility="visible",document.getElementById("app").style.visibility="visible",document.getElementById("footer").style.visibility="visible"});
