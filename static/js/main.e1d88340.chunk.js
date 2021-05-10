(this.webpackJsonpshoppies=this.webpackJsonpshoppies||[]).push([[0],{22:function(e,t,n){},29:function(e,t,n){},31:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),s=n(5),c=n.n(s),o=(n(22),n(7)),r=n(9),l=n(2);l.c;var u=n(4),m=n(3),d=n(15),b=Object(m.c)({name:"nominations",initialState:{nominations:[]},reducers:{addNomination:function(e,t){var n=t.payload;5!==e.nominations.length&&(e.nominations.findIndex((function(e){return e.imdbID===n.imdbID}))<0&&e.nominations.push(n))},removeNomination:function(e,t){var n=t.payload,a=e.nominations.findIndex((function(e){return e.imdbID===n.id}));a>=0&&e.nominations.splice(a,1)}}}),j=b.actions,f=j.addNomination,h=j.removeNomination,v=function(e){return e.nominations.nominations},O=b.reducer,p=n(13),g=n.n(p),x=n(16);function N(e){return Object(u.a)(new Map(e.map((function(e){return[e.imdbID,e]}))).values())}var _={Search:[],totalResults:"0",Response:"False",pageNumber:0},I=Object(m.b)("movies/fetch",function(){var e=Object(x.a)(g.a.mark((function e(t,n){var a,i,s,c,o,r,l,u,m;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!=t.selection){e.next=2;break}return e.abrupt("return",_);case 2:return d=t.selection,a=d.trim().replaceAll(" ","+"),i="https://www.omdbapi.com/?apikey=ca4f8507&type=movie&s=".concat(a),s="&page=".concat(t.page),e.next=7,fetch(i+s);case 7:if(200===(c=e.sent).status){e.next=11;break}return console.log("error message when fetching"),e.abrupt("return",n.rejectWithValue({message:"Failed to fetch movies."}));case 11:return e.next=13,c.json();case 13:if(o=e.sent,console.log({data:o}),r=o.Response,l=o.totalResults,u=o.Search,"False"!=r){e.next=18;break}return e.abrupt("return",_);case 18:return m=N(u),e.abrupt("return",{Search:m,Response:r,totalResults:l,pageNumber:t.page});case 20:case"end":return e.stop()}var d}),e)})));return function(t,n){return e.apply(this,arguments)}}()),w=Object(m.c)({name:"movieResults",initialState:{status:"idle",error:null,movies:[],totalResults:0,pageNumber:0},reducers:{},extraReducers:function(e){e.addCase(I.pending,(function(e){e.status="loading",e.error=null})),e.addCase(I.fulfilled,(function(e,t){var n=t.payload;n.pageNumber>1?e.movies=N([].concat(Object(u.a)(e.movies),Object(u.a)(n.Search))):e.movies=Object(u.a)(n.Search),e.status="idle",e.pageNumber=n.pageNumber,e.totalResults=Number.parseInt(n.totalResults)})),e.addCase(I.rejected,(function(e,t){t.payload;e.status="idle"}))}}),k=function(e){return e.movies.movies},R=function(e){return e.movies.status},y=function(e){return e.movies.pageNumber},S=function(e){return Math.ceil(e.movies.totalResults/10)},D=w.reducer,C=[].concat(Object(u.a)(Object(m.d)()),[d.logger]),T=Object(m.a)({reducer:{nominations:O,movies:D},middleware:C,devTools:!1}),P=l.c,A=n(17),B=(n(29),n(1)),E=function(e){var t=Object(l.b)(),n=e.Title,a=e.Year;e.Poster,e.imdbID;return Object(B.jsxs)("section",{className:"nomination-card",children:[Object(B.jsxs)("section",{className:"nomination-card_info",children:[Object(B.jsx)("span",{className:"nomination-card_info_title",children:n}),Object(B.jsx)("span",{className:"nomination-card_info_year",children:a})]}),Object(B.jsx)("div",{className:"nomination-card_remove-btn",onClick:function(){return t(h({id:e.imdbID}))},children:Object(B.jsx)(A.a,{className:"nomination-card_remove-btn_icon"})})]})};n(31);function F(){Object(l.b)();var e=P(v);return Object(B.jsxs)("section",{className:"nominations",children:[Object(B.jsx)("h3",{className:"nominations_title",children:"Nominations"}),Object(B.jsx)("ul",{className:"nominations_movie-list",children:e.map((function(e){return Object(B.jsx)("li",{className:"movie",children:Object(B.jsx)(E,Object(o.a)({},e))},e.imdbID)}))})]})}n(32),n(33);var L=n(14),M=function(e){var t=Object(l.b)(),n=P(v);L.a.configure();var a=e.Title,i=e.Year,s=e.Poster,c=e.imdbID,o=!1;n.find((function(e){return e.imdbID===c}))&&(o=!0);return Object(B.jsxs)("section",{className:"movie-card",children:[Object(B.jsx)("img",{alt:"NO PHOTO AVAILABLE",className:"movie-card_img",src:s}),Object(B.jsxs)("section",{className:"movie-card_details",children:[Object(B.jsxs)("section",{className:"movie-card_details_info",children:[Object(B.jsx)("h3",{className:"movie-card_details_info_title",children:a}),Object(B.jsx)("h4",{className:"movie-card_details_info_year",children:i})]}),Object(B.jsx)("button",{disabled:o,className:"movie-card_details_nominate-btn",onClick:function(){5!==n.length?t(f(e)):L.a.error("Limit of five nominations",{className:"error-toast",position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!1,draggable:!1,progress:void 0})},children:"Nominate "})]})]})};n(34);var W=function(){var e=Object(l.b)(),t=Object(a.useState)(""),n=Object(r.a)(t,2),i=n[0],s=n[1],c=function(e,t){var n=Object(a.useState)(e),i=Object(r.a)(n,2),s=i[0],c=i[1];return Object(a.useEffect)((function(){var n=setTimeout((function(){c(e)}),t);return function(){clearTimeout(n)}}),[e,t]),s}(i,500),u=P(R),m=P(k),d=Object(a.useRef)(null),b=P(S),j=P(y),f=Object(a.useCallback)((function(t){"loading"!==u&&(console.table({totalPages:b,currentPage:j}),d.current&&d.current.disconnect(),d.current=new IntersectionObserver((function(t){var n=j!=b;t[0].isIntersecting&&n&&(console.log("should fetch more movies"),e(I({selection:i,page:j+1}))),t[0].isIntersecting?console.log("intersection!"):console.log("no intersection")})),t&&d.current.observe(t))}),[j,u]);return Object(a.useEffect)((function(){e(I(c?{selection:i,page:1}:{selection:"",page:1}))}),[c]),Object(B.jsxs)(B.Fragment,{children:[Object(B.jsxs)("section",{className:"navbar",children:[Object(B.jsx)("h1",{className:"navbar_title",children:"The Shoppies"}),Object(B.jsx)("input",{className:"navbar_input",type:"text",value:i,placeholder:"Search movie...",onChange:function(e){return s(e.target.value)}})]}),Object(B.jsx)(F,{}),Object(B.jsx)("section",{className:"search-results",children:Object(B.jsx)("ul",{className:"search-results_movie-list list",children:m.map((function(e,t){return m.length===t+1?Object(B.jsx)("li",{ref:f,className:"movie",children:Object(B.jsx)(M,Object(o.a)({},e))},e.imdbID):Object(B.jsx)("li",{className:"movie",children:Object(B.jsx)(M,Object(o.a)({},e))},e.imdbID)}))})})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(Object(B.jsx)(i.a.StrictMode,{children:Object(B.jsx)(l.a,{store:T,children:Object(B.jsx)(W,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[35,1,2]]]);
//# sourceMappingURL=main.e1d88340.chunk.js.map