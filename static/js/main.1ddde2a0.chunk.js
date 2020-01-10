(this["webpackJsonpmap-stats"]=this["webpackJsonpmap-stats"]||[]).push([[0],{53:function(e,t,n){e.exports=n(99)},58:function(e,t,n){},64:function(e,t){},66:function(e,t){},99:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(50),c=n.n(l),i=(n(58),n(52)),s=n(7),o=n.n(s),u=n(11),m=n(51),p=n.n(m),f=function(){var e=new p.a,t=Object(a.useState)(),n=Object(u.a)(t,2),l=n[0],c=n[1],s=Object(a.useState)([]),m=Object(u.a)(s,2),f=m[0],E=m[1],d=Object(a.useState)([]),g=Object(u.a)(d,2),b=g[0],h=g[1],k=Object(a.useState)({startDate:null,endDate:null}),v=Object(u.a)(k,2),w=v[0],S=v[1],y=Object(a.useRef)(!0);Object(a.useEffect)((function(){!y.current&&D()}),[l,w]),Object(a.useEffect)((function(){!y.current&&T()}),[b]),Object(a.useEffect)((function(){y.current&&(y.current=!1)}));var D=function(){var e,t,n;return o.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return e=w.startDate,t=w.endDate,n=[],a.next=4,o.a.awrap(Promise.all(Object.keys(l.files).map((function(a){var r,c,s,m,p,f,E,d;return o.a.async((function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,o.a.awrap(l.files[a].async("blob"));case 2:r=g.sent,(c=new FileReader).onload=function(e){return n.push.apply(n,Object(i.a)(JSON.parse(e.target.result).timelineObjects))},s=a.split("/"),m=Object(u.a)(s,4),p=m[0],f=m[1],E=m[2],d=m[3],"Takeout"===p&&"Location History"===f&&"Semantic Location History"===E&&(!e&&!t||e&&!t&&d>=e||!e&&t&&d<=t||e&&t&&d>=e&&d<=t)&&c.readAsText(new File([r],a));case 7:case"end":return g.stop()}}))}))));case 4:h(n);case 5:case"end":return a.stop()}}))},T=function(){E(b.reduce((function(e,t){var n=t.activitySegment;if(n&&n.distance){var a=n.distance,r=n.duration,l=n.activityType,c=r.endTimestampMs-r.startTimestampMs;switch(l){case"WALKING":e.walking+=a,e.timeSpentWalking+=c;break;case"IN_TRAIN":case"IN_SUBWAY":case"IN_TRAM":e.train+=a,e.timeSpentTrain+=c;break;case"IN_BUS":e.bus+=a,e.timeSpentBus+=c;break;case"IN_PASSENGER_VEHICLE":e.car+=a,e.timeSpentCar+=c;break;case"FLYING":e.flying+=a,e.timeSpentFlying+=c;break;default:e.other+=a,e.timeSpentOther+=c}e.total+=a,e.timeTotal+=c}return e}),{total:0,walking:0,train:0,bus:0,car:0,flying:0,other:0,timeTotal:0,timeSpentWalking:0,timeSpentOther:0,timeSpentTrain:0,timeSpentBus:0,timeSpentCar:0,timeSpentFlying:0}))},j=function(e){return Math.round(e/1e3/60/60*100)/100},N=f.walking,O=f.train,C=f.bus,I=f.car,x=f.flying,A=f.other,B=f.total,F=f.timeSpentWalking,L=f.timeSpentOther,W=f.timeSpentTrain,_=f.timeSpentBus,R=f.timeSpentCar,H=f.timeSpentFlying,M=f.timeTotal,G=w.startDate,J=w.endDate;return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement("div",{className:"col-md-10"},r.a.createElement("form",{method:"post",action:"#",id:"#"},r.a.createElement("div",{className:"form-group files"},r.a.createElement("label",null,"Upload Your File "),r.a.createElement("input",{type:"file",className:"form-control",multiple:"",onChange:function(t){var n;return o.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:if(0!==t.target.files.length){a.next=2;break}return a.abrupt("return");case 2:return a.next=4,o.a.awrap(e.loadAsync(t.target.files[0]));case 4:(n=a.sent).remove("Takeout/Location History/Location History.json"),n.remove("Takeout/archive_browser.html"),c(n);case 8:case"end":return a.stop()}}))}}))))),r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement("button",{onClick:function(){return S({startDate:null,endDate:null})}},"All"),r.a.createElement("button",{onClick:function(){return S({startDate:2017,endDate:2017})}},"2017"),r.a.createElement("button",{onClick:function(){return S({startDate:2018,endDate:2018})}},"2018"),r.a.createElement("button",{onClick:function(){return S({startDate:2019,endDate:2019})}},"2019"),r.a.createElement("button",{onClick:function(){return S({startDate:2020,endDate:2020})}},"2020")),r.a.createElement("div",{className:"row justify-content-center"},G&&J&&"Date Range: ".concat(w.startDate," to ").concat(w.endDate)),r.a.createElement("div",{className:"row justify-content-center"},b.length>0&&r.a.createElement("div",{className:"row"},r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("strong",null,"Distance walked: "),N/1e3," km"),r.a.createElement("li",null,r.a.createElement("strong",null,"Distance in train: "),O/1e3," km"),r.a.createElement("li",null,r.a.createElement("strong",null,"Distance in bus: "),C/1e3," km"),r.a.createElement("li",null,r.a.createElement("strong",null,"Distance in car: "),I/1e3," km"),r.a.createElement("li",null,r.a.createElement("strong",null,"Distance in air: "),x/1e3," km"),r.a.createElement("li",null,r.a.createElement("strong",null,"Distance other: "),A/1e3," km"),r.a.createElement("li",null,r.a.createElement("strong",null,"Distance total: "),B/1e3," km"),r.a.createElement("li",null,r.a.createElement("strong",null,"Time spent walking: "),j(F)," hours"),r.a.createElement("li",null,r.a.createElement("strong",null,"Time spent in train: "),j(W)," hours"),r.a.createElement("li",null,r.a.createElement("strong",null,"Time spent in bus: "),j(_)," hours"),r.a.createElement("li",null,r.a.createElement("strong",null,"Time spent in car: "),j(R)," hours"),r.a.createElement("li",null,r.a.createElement("strong",null,"Time spent flying: "),j(H)," hours"),r.a.createElement("li",null,r.a.createElement("strong",null,"Time spent in other: "),j(L)," hours"),r.a.createElement("li",null,r.a.createElement("strong",null,"Time spent total: "),j(M)," hours"))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[53,1,2]]]);
//# sourceMappingURL=main.1ddde2a0.chunk.js.map