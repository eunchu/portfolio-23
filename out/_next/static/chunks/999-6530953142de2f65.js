"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[999],{999:function(n,t,e){e.r(t),e.d(t,{default:function(){return nU}});var i=e(7297),o=e(5893),r=e(7294),c=e(8767),l=e(4141),a=e(1141),s=e(1526),d=e(1163),u=e(7814),p=e(9417),f=e(6154);let h="d00a99ae2b58c552fc3c259e80fe36e2",g=(n=>{let{baseUrl:t}=n,e=async()=>await (await f.Z.get("".concat(t,"/now_playing?api_key=").concat(h,"&language=ko-KR"))).data,i=async n=>await (await f.Z.get("".concat(t,"/").concat(n,"/similar?api_key=").concat(h,"&language=ko-KR"))).data;return{getNowMovies:e,getSimilarMovies:i}})({baseUrl:"".concat("https://api.themoviedb.org/3","/movie")}),x=(n,t)=>"https://image.tmdb.org/t/p/".concat(t||"original","/").concat(n);var m=e(1852);let w=()=>{let[n,t]=(0,r.useState)(!1),e=(0,m.useMediaQuery)({query:"(max-width: 767px)"});return(0,r.useEffect)(()=>{t(e)},[e]),n};function b(){let n=(0,i.Z)(["\n  position: relative;\n\n  height: 180px;\n  min-height: 180px;\n  max-height: 300px;\n\n  background-color: #323232;\n\n  padding-top: 140%;\n  cursor: pointer;\n"]);return b=function(){return n},n}function v(){let n=(0,i.Z)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n\n  width: 100%;\n  height: 100%;\n"]);return v=function(){return n},n}function Z(){let n=(0,i.Z)(["\n  position: relative;\n\n  width: 100%;\n  height: 40%;\n\n  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),\n    url(",");\n  background-size: cover;\n  background-position: center center;\n"]);return Z=function(){return n},n}function j(){let n=(0,i.Z)(["\n  position: absolute;\n  top: calc(50% - 15px);\n  left: calc(50% - 15px);\n\n  font-size: 30px;\n  opacity: 0;\n"]);return j=function(){return n},n}function k(){let n=(0,i.Z)(["\n  padding: 4%;\n  height: 60%;\n\n  display: flex;\n  flex-direction: column;\n"]);return k=function(){return n},n}function y(){let n=(0,i.Z)(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n"]);return y=function(){return n},n}function C(){let n=(0,i.Z)(["\n  display: flex;\n  align-items: center;\n\n  font-size: 14px;\n  color: #deb83e;\n"]);return C=function(){return n},n}function I(){let n=(0,i.Z)(["\n  margin-right: 6px;\n  color: white;\n"]);return I=function(){return n},n}function P(){let n=(0,i.Z)(["\n  font-size: 16px;\n"]);return P=function(){return n},n}function z(){let n=(0,i.Z)(["\n  font-size: 16px;\n  margin-top: 12px;\n  margin-bottom: 10px;\n\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"]);return z=function(){return n},n}function M(){let n=(0,i.Z)(["\n  font-size: 12px;\n  font-weight: 300;\n  line-height: 20px;\n  color: #bdbdbd;\n  display: -webkit-box;\n  -webkit-line-clamp: 5;\n  -webkit-box-orient: vertical;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  word-break: break-word;\n"]);return M=function(){return n},n}let E=l.ZP.div.withConfig({componentId:"sc-78af0b59-0"})(b()),_=l.ZP.div.withConfig({componentId:"sc-78af0b59-1"})(v()),S=l.ZP.div.withConfig({componentId:"sc-78af0b59-2"})(Z(),n=>n.bgphoto),G=(0,l.ZP)(a.E.div).withConfig({componentId:"sc-78af0b59-3"})(j()),A=l.ZP.div.withConfig({componentId:"sc-78af0b59-4"})(k()),N=l.ZP.div.withConfig({componentId:"sc-78af0b59-5"})(y()),Q=l.ZP.p.withConfig({componentId:"sc-78af0b59-6"})(C()),R=l.ZP.div.withConfig({componentId:"sc-78af0b59-7"})(I()),W=l.ZP.p.withConfig({componentId:"sc-78af0b59-8"})(P()),F=l.ZP.h2.withConfig({componentId:"sc-78af0b59-9"})(z()),H=l.ZP.p.withConfig({componentId:"sc-78af0b59-10"})(M()),K=n=>{let{data:t}=n,[e,i]=(0,r.useState)(!1);return(0,o.jsx)(E,{onMouseEnter:()=>i(!0),onMouseLeave:()=>i(!1),children:(0,o.jsxs)(_,{children:[(0,o.jsx)(S,{bgphoto:x(t.backdrop_path,"w500"),children:(0,o.jsx)(G,{variants:{initial:{opacity:0},hover:{opacity:1,transition:{delay:.3}}},animate:e?"hover":"initial",children:(0,o.jsx)(u.G,{icon:p.iiS})})}),(0,o.jsxs)(A,{children:[(0,o.jsxs)(N,{children:[(0,o.jsx)(W,{children:t.release_date.slice(0,4)}),(0,o.jsxs)(Q,{children:[(0,o.jsx)(R,{children:(0,o.jsx)(u.G,{icon:p.u8Q})}),Math.floor(t.popularity)]})]}),(0,o.jsx)(F,{title:t.title,children:t.title}),(0,o.jsx)(H,{children:t.overview||"-"})]})]})})};function L(){let n=(0,i.Z)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n\n  width: 100%;\n  height: 100%;\n\n  background-color: rgba(0, 0, 0, 0.5);\n  opacity: 0;\n  z-index: 90;\n"]);return L=function(){return n},n}function q(){let n=(0,i.Z)(["\n  position: fixed;\n  top: 50px;\n  left: 0;\n  right: 0;\n  bottom: 50px;\n\n  width: calc(100% - 8%);\n  max-width: 850px;\n  height: auto;\n\n  background-color: #181818;\n  box-shadow: rgb(0 0 0 / 50%) 0px 3px 10px;\n  border-radius: 4px;\n\n  margin: 0 auto;\n  z-index: 99;\n  overflow: scroll;\n"]);return q=function(){return n},n}function U(){let n=(0,i.Z)(["\n  position: absolute;\n  top: 14px;\n  right: 20px;\n\n  font-size: 24px;\n\n  cursor: pointer;\n  z-index: 2;\n"]);return U=function(){return n},n}function B(){let n=(0,i.Z)(["\n  position: relative;\n\n  width: 100%;\n  height: 360px;\n\n  background-image: linear-gradient(to top, #181818, transparent),\n    url(",");\n  background-position: top center;\n  background-size: cover;\n  border-radius: 4px 4px 0 0;\n"]);return B=function(){return n},n}function D(){let n=(0,i.Z)(["\n  position: absolute;\n  bottom: 8%;\n  left: 4%;\n\n  display: flex;\n  align-items: center;\n\n  max-height: 42px;\n  min-height: 32px;\n\n  background-color: white;\n  border-radius: 4px;\n\n  padding: 0 16px;\n  cursor: pointer;\n  &:hover {\n    background-color: #e6e6e6;\n  }\n  span {\n    font-size: 1.2vw;\n    color: #000000;\n  }\n"]);return D=function(){return n},n}function J(){let n=(0,i.Z)(["\n  color: #000000;\n  font-size: 14px;\n  margin-right: 8px;\n"]);return J=function(){return n},n}function O(){let n=(0,i.Z)(["\n  height: auto;\n\n  padding: 0 4%;\n  margin-bottom: 40px;\n"]);return O=function(){return n},n}function T(){let n=(0,i.Z)(["\n  font-size: 18px;\n\n  margin-bottom: 12px;\n"]);return T=function(){return n},n}function V(){let n=(0,i.Z)(["\n  font-size: 14px;\n  font-weight: 300;\n  line-height: 24px;\n  color: #bdbdbd;\n\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  word-break: break-word;\n"]);return V=function(){return n},n}function X(){let n=(0,i.Z)([""]);return X=function(){return n},n}function Y(){let n=(0,i.Z)(["\n  font-size: 1.8vw;\n  margin: 10px 0 14px 4%;\n"]);return Y=function(){return n},n}function $(){let n=(0,i.Z)(["\n  display: grid;\n  gap: 10px;\n  grid-template-columns: repeat(3, minmax(100px, 1fr));\n\n  padding: 0 4%;\n"]);return $=function(){return n},n}function nn(){let n=(0,i.Z)(["\n  position: relative;\n\n  width: 92%;\n  height: 24px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  border-bottom: 1px solid #404040;\n  background-image: linear-gradient(\n    0deg,\n    #181818 0,\n    hsla(0, 0%, 9%, 0.7) 20%,\n    hsla(0, 0%, 9%, 0.4) 30%,\n    transparent 50%\n  );\n\n  margin-top: -24px;\n  margin-left: 4%;\n"]);return nn=function(){return n},n}function nt(){let n=(0,i.Z)(["\n  position: absolute;\n  top: 5px;\n\n  font-size: 30px;\n  color: #a8a8a8;\n\n  transform: ",";\n  cursor: pointer;\n"]);return nt=function(){return n},n}let ne=(0,l.ZP)(a.E.div).withConfig({componentId:"sc-ff34922f-0"})(L()),ni=(0,l.ZP)(a.E.div).withConfig({componentId:"sc-ff34922f-1"})(q()),no=l.ZP.div.withConfig({componentId:"sc-ff34922f-2"})(U()),nr=l.ZP.div.withConfig({componentId:"sc-ff34922f-3"})(B(),n=>n.bgphoto),nc=l.ZP.div.withConfig({componentId:"sc-ff34922f-4"})(D()),nl=l.ZP.div.withConfig({componentId:"sc-ff34922f-5"})(J()),na=l.ZP.div.withConfig({componentId:"sc-ff34922f-6"})(O()),ns=l.ZP.h2.withConfig({componentId:"sc-ff34922f-7"})(T()),nd=l.ZP.p.withConfig({componentId:"sc-ff34922f-8"})(V()),nu=l.ZP.div.withConfig({componentId:"sc-ff34922f-9"})(X()),np=l.ZP.h2.withConfig({componentId:"sc-ff34922f-10"})(Y()),nf=l.ZP.ul.withConfig({componentId:"sc-ff34922f-11"})($()),nh=l.ZP.div.withConfig({componentId:"sc-ff34922f-12"})(nn()),ng=l.ZP.div.withConfig({componentId:"sc-ff34922f-13"})(nt(),n=>n.activeMore?"rotate(180deg)":"rotate(0)"),nx=n=>{let{movie:t}=n,e=(0,d.useRouter)(),i=()=>e.push("/movieApp",void 0,{shallow:!0}),{data:l}=(0,c.useQuery)(["movies","similar"],()=>g.getSimilarMovies(t.id)),[a,s]=(0,r.useState)(null==l?void 0:l.results.slice(0,9)),[f,h]=(0,r.useState)(!1);(0,r.useEffect)(()=>{s(null==l?void 0:l.results.slice(0,9))},[l]);let m=()=>{f?s(null==l?void 0:l.results.slice(0,9)):s(null==l?void 0:l.results),h(n=>!n)};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(ne,{onClick:i,animate:{opacity:1},exit:{opacity:0}}),(0,o.jsxs)(ni,{layoutId:t.id+"",children:[(0,o.jsx)(no,{onClick:i,children:(0,o.jsx)(u.G,{icon:p.g82})}),(0,o.jsx)(nr,{className:"image",bgphoto:x(t.backdrop_path),children:(0,o.jsxs)(nc,{children:[(0,o.jsx)(nl,{children:(0,o.jsx)(u.G,{icon:p.zc,color:"#000000"})}),(0,o.jsx)("span",{children:"재생"})]})}),(0,o.jsxs)(na,{children:[(0,o.jsx)(ns,{children:t.title}),(0,o.jsx)(nd,{children:t.overview})]}),(0,o.jsxs)(nu,{children:[(0,o.jsx)(np,{children:"비슷한 콘텐츠"}),(0,o.jsx)(nf,{children:null==a?void 0:a.map(n=>(0,o.jsx)(K,{data:n},n.id))})]}),l&&l.results.length>8?(0,o.jsx)(nh,{children:(0,o.jsx)(ng,{onClick:m,activeMore:f,children:(0,o.jsx)(u.G,{icon:p.dWM})})}):null]})]})};function nm(){let n=(0,i.Z)([""]);return nm=function(){return n},n}function nw(){let n=(0,i.Z)(["\n  position: relative;\n\n  height: 52vw;\n  min-height: 60vh;\n\n  /* linear-gradient로 이미지에 배경색 추가 */\n  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),\n    url(",");\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center center;\n  text-shadow: 2px 2px 4px rgb(0 0 0 / 45%);\n\n  padding: 0 4%;\n"]);return nw=function(){return n},n}function nb(){let n=(0,i.Z)(["\n  position: absolute;\n  bottom: 35%;\n  left: 4%;\n"]);return nb=function(){return n},n}function nv(){let n=(0,i.Z)(["\n  font-size: 1.6vw;\n  font-weight: 300;\n\n  margin-bottom: 10px;\n"]);return nv=function(){return n},n}function nZ(){let n=(0,i.Z)(["\n  width: 70%;\n\n  font-size: 1.2vw;\n  font-weight: 100;\n  line-height: 24px;\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  word-break: break-word;\n"]);return nZ=function(){return n},n}function nj(){let n=(0,i.Z)(["\n  position: relative;\n  top: -140px;\n\n  margin: 0 4%;\n"]);return nj=function(){return n},n}function nk(){let n=(0,i.Z)(["\n  position: absolute;\n\n  width: 100%;\n\n  display: grid;\n  gap: 10px;\n  grid-template-columns: ",";\n"]);return nk=function(){return n},n}function ny(){let n=(0,i.Z)(["\n  position: relative;\n\n  height: 200px;\n  min-height: 100px;\n  max-height: 300px;\n\n  padding-top: 150%;\n\n  background-image: url(",");\n  background-size: cover;\n  background-position: center center;\n  border-radius: 4px;\n\n  cursor: pointer;\n  &:first-child {\n    transform-origin: center left;\n  }\n  &:last-child {\n    transform-origin: center right;\n  }\n"]);return ny=function(){return n},n}function nC(){let n=(0,i.Z)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n\n  height: 100%;\n  width: 100%;\n"]);return nC=function(){return n},n}function nI(){let n=(0,i.Z)(["\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: -36px;\n\n  height: 40px;\n\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  font-size: 12px;\n  background-color: #313131;\n  border-radius: 0 0 4px 4px;\n\n  padding: 10px;\n  opacity: 0;\n  h3 {\n    width: 80%;\n\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n"]);return nI=function(){return n},n}function nP(){let n=(0,i.Z)(["\n  position: absolute;\n  top: calc(50% - 12px);\n  left: -23px;\n\n  font-size: 24px;\n  transform: rotate(180deg);\n\n  color: white;\n  z-index: 10;\n  opacity: 0;\n"]);return nP=function(){return n},n}function nz(){let n=(0,i.Z)([""]);return nz=function(){return n},n}function nM(){let n=(0,i.Z)(["\n  font-size: ",";\n  margin-bottom: 8px;\n"]);return nM=function(){return n},n}function nE(){let n=(0,i.Z)(["\n  height: 20vh;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]);return nE=function(){return n},n}let n_=l.ZP.main.withConfig({componentId:"sc-67ac4611-0"})(nm()),nS=l.ZP.div.withConfig({componentId:"sc-67ac4611-1"})(nw(),n=>n.bgphoto),nG=l.ZP.div.withConfig({componentId:"sc-67ac4611-2"})(nb()),nA=l.ZP.h2.withConfig({componentId:"sc-67ac4611-3"})(nv()),nN=l.ZP.p.withConfig({componentId:"sc-67ac4611-4"})(nZ()),nQ=l.ZP.div.withConfig({componentId:"sc-67ac4611-5"})(nj()),nR=(0,l.ZP)(a.E.div).withConfig({componentId:"sc-67ac4611-6"})(nk(),n=>n.isMobile?"repeat(3, minmax(100px, 1fr))":"repeat(6, minmax(100px, 1fr))"),nW=(0,l.ZP)(a.E.div).withConfig({componentId:"sc-67ac4611-7"})(ny(),n=>n.bgphoto),nF=l.ZP.div.withConfig({componentId:"sc-67ac4611-8"})(nC()),nH=(0,l.ZP)(a.E.div).withConfig({componentId:"sc-67ac4611-9"})(nI()),nK=(0,l.ZP)(a.E.div).withConfig({componentId:"sc-67ac4611-10"})(nP());l.ZP.div.withConfig({componentId:"sc-67ac4611-11"})(nz());let nL=l.ZP.div.withConfig({componentId:"sc-67ac4611-12"})(nM(),n=>n.isMobile?"12px":"1.4vw"),nq=l.ZP.div.withConfig({componentId:"sc-67ac4611-13"})(nE());function nU(){let n=w(),{data:t,isLoading:e}=(0,c.useQuery)(["movies","nowPlaying"],()=>g.getNowMovies()),i=n?3:6,[l,a]=(0,r.useState)(0),[f,h]=(0,r.useState)(!1),m=()=>{if(t){let n=t.results.length-1,e=Math.floor(n/i)-1;f||(v(),a(n=>n===e?0:n+1))}},b=()=>a(n=>0!==n?n-1:0),v=()=>h(n=>!n),Z={hidden:{x:window.outerWidth},visible:{x:0},exit:{x:-window.outerWidth+10}},j={normal:{scale:1},hover:{scale:1.3,y:-22,zIndex:99,transition:{delay:.7,duration:.2,type:"tween"}}},k={hover:{opacity:1,transition:{delay:.7,duration:.2,type:"tween"}}},y=(0,d.useRouter)(),C=n=>{y.push("/movieApp","/movieApp/movies/".concat(n),{shallow:!0})},I=y.asPath.split("/movieApp/movies/")[1],P=I&&(null==t?void 0:t.results.find(n=>n.id===+I));return(0,r.useEffect)(()=>{P?document.body.style.overflow="hidden":document.body.style.overflow="auto"},[P]),(0,o.jsx)(n_,{children:e?(0,o.jsx)(nq,{children:"isLoading ..."}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(nS,{onClick:m,bgphoto:x((null==t?void 0:t.results[0].backdrop_path)||""),children:(0,o.jsxs)(nG,{children:[(0,o.jsx)(nA,{children:null==t?void 0:t.results[0].title}),(0,o.jsx)(nN,{children:null==t?void 0:t.results[0].overview})]})}),(0,o.jsxs)(nQ,{children:[(0,o.jsx)(nL,{isMobile:n,children:"최신 영화"}),(0,o.jsx)(s.M,{initial:!1,onExitComplete:v,children:(0,o.jsxs)(nR,{variants:Z,initial:"hidden",animate:"visible",exit:"exit",transition:{type:"tween",duration:1},whileHover:"hover",isMobile:n,children:[0!==l&&(0,o.jsx)(nK,{variants:k,onClick:b,children:(0,o.jsx)(u.G,{icon:p.eFW})}),null==t?void 0:t.results.slice(1).slice(i*l,i*l+i).map(n=>(0,o.jsx)(nW,{layoutId:n.id+"",variants:j,initial:"normal",whileHover:"hover",transition:{type:"tween"},bgphoto:x(n.poster_path,"w500"),onClick:()=>C(n.id),children:(0,o.jsx)(nF,{children:(0,o.jsxs)(nH,{variants:k,children:[(0,o.jsx)("h3",{children:n.title}),(0,o.jsx)("div",{children:n.vote_average})]})})},n.id))]},l)})]}),(0,o.jsx)(s.M,{children:P?(0,o.jsx)(nx,{movie:P}):null}),(0,o.jsx)("div",{style:{height:"400px"}})]})})}}}]);