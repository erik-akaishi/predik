
(function(){
var f=function(n){return n.toLocaleString("pt-BR")};
function g(i){return document.getElementById(i)}function t(i,v){var e=g(i);if(e)e.textContent=v}
var M=function(v){return v>=1e6?"R$ "+(v/1e6).toLocaleString("pt-BR",{maximumFractionDigits:2})+" mi":"R$ "+f(Math.round(v/1000))+" mil"};
var resumo="";
function sim(){var m=+g("s-maq").value,p=+g("s-par").value,h=+g("s-hor").value,c=+g("s-cus").value;
 var d=Math.max(0,Math.round(p*5/12)),ev=p-d,hs=ev*h,r=hs*c;
 t("v-maq",m);t("v-par",p);t("v-hor",h);t("v-cus","R$ "+f(c));t("o-a",p);t("o-d",d);t("o-h",f(hs)+" h");
 t("o-r",M(r));t("o-hoje",M(p*h*c));t("o-com",M(d*h*c));
 t("g-maq",m);t("g-par",p);t("g-mes",M(p*h*c/12));
 var fr=g("f-res");
 resumo="Cenário Predik: "+m+" máquinas, "+p+" paradas por ano, "+h+" h por parada, R$ "+f(c)+" por hora. Projeção: "+p+" para "+d+" paradas por ano, "+f(hs)+" h de linha rodando a mais, "+M(r)+" recuperados por ano (projeção, não resultado medido).";
 if(fr)fr.innerHTML="Cenário da simulação: <b>"+m+" máquinas, "+p+" paradas por ano, "+h+" h por parada, R$ "+f(c)+" por hora</b>.";}
["s-maq","s-par","s-hor","s-cus"].forEach(function(i){g(i).addEventListener("input",sim)});sim();
var cp=g("cp-sim");if(cp)cp.addEventListener("click",function(){var b=cp;function ok(){b.textContent="Resumo copiado"}
 try{navigator.clipboard.writeText(resumo).then(ok,function(){b.textContent="Não foi possível copiar"})}catch(e){b.textContent="Não foi possível copiar"}});
var fm=g("form-diag");if(fm)fm.addEventListener("submit",function(e){e.preventDefault();
 var n=g("f-nome"),em=g("f-email");if(!n.value.trim()){n.focus();return}if(!em.value.trim()||em.value.indexOf("@")<1){em.focus();return}
 fm.style.display="none";g("f-ok").classList.add("on")});
// contador: quanto a empresa-base perderia com a linha parada (R$ 250 por minuto)
var t0=Date.now();function tk(){t("tick","R$ "+f(Math.round((Date.now()-t0)/1000*250/60)))}tk();setInterval(tk,1000);
// campo térmico de quadrados
function heat(cv,lado){var cx=cv.getContext("2d");function draw(){var w=cv.clientWidth,hh=cv.clientHeight,d=window.devicePixelRatio||1;cv.width=w*d;cv.height=hh*d;cx.setTransform(d,0,0,d,0,0);cx.clearRect(0,0,w,hh);
 var dark=document.documentElement.getAttribute("data-theme")!=="claro",cell=18,gap=3,cxx=lado==="r"?w*.92:w*.08,cyy=hh*.5,sx=w*.28,sy=hh*.5;
 for(var y=0;y<hh;y+=cell)for(var x=0;x<w;x+=cell){var dx=(x-cxx)/sx,dy=(y-cyy)/sy,v=Math.exp(-(dx*dx+dy*dy)),n=Math.sin(x*12.9898+y*78.233)*43758.5453;n-=Math.floor(n);v=v*(.75+.5*n);
  if(v<.08)continue;var a=Math.min(1,v*1.1);
  cx.fillStyle=v>.7?(dark?"rgba(232,255,251,"+a+")":"#0B6F63"):v>.4?(dark?"rgba(52,216,192,"+a+")":"rgba(14,159,142,"+a+")"):(dark?"rgba(122,110,158,"+a+")":"rgba(106,96,120,"+a*.8+")");
  cx.fillRect(x,y,cell-gap,cell-gap);}}
 draw();addEventListener("resize",draw);new MutationObserver(draw).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});}
var cv=g("campo");if(cv){var c0=cv.getContext("2d");
 function pinta(){var w=cv.clientWidth,hh=cv.clientHeight,d=window.devicePixelRatio||1;cv.width=w*d;cv.height=hh*d;c0.setTransform(d,0,0,d,0,0);c0.clearRect(0,0,w,hh);
 var dark=document.documentElement.getAttribute("data-theme")!=="claro",cell=18,gap=3,cxx=w*.55,cyy=hh*.45,sx=w*.24,sy=w*.22;
 for(var y=0;y<hh;y+=cell)for(var x=0;x<w;x+=cell){var dx=(x-cxx)/sx,dy=(y-cyy)/sy,v=Math.exp(-(dx*dx+dy*dy)),n=Math.sin(x*12.9898+y*78.233)*43758.5453;n-=Math.floor(n);v=v*(.75+.5*n);
  if(v<.06)continue;var a=Math.min(1,v*1.25);
  c0.fillStyle=v>.7?(dark?"#E8FFFB":"#0B6F63"):v>.4?(dark?"rgba(52,216,192,"+a+")":"rgba(14,159,142,"+a+")"):(dark?"rgba(122,110,158,"+a+")":"rgba(106,96,120,"+a*.8+")");
  c0.fillRect(x,y,cell-gap,cell-gap);}}
 pinta();addEventListener("resize",pinta);new MutationObserver(pinta).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});}
var bg=g("burger"),nv=document.querySelector(".nav");if(bg&&nv){function fe(o){nv.classList.toggle("open",o);bg.setAttribute("aria-expanded",o?"true":"false");bg.setAttribute("aria-label",o?"Fechar menu":"Abrir menu")}
 bg.addEventListener("click",function(){fe(!nv.classList.contains("open"))});
 document.querySelectorAll("#menu a").forEach(function(a){a.addEventListener("click",function(){fe(false)})});
 document.addEventListener("keydown",function(e){if(e.key==="Escape")fe(false)});
 addEventListener("resize",function(){if(innerWidth>860)fe(false)});}
document.querySelectorAll("canvas[data-heat]").forEach(function(c){heat(c,c.getAttribute("data-heat"))});
})();


(function(){
  var SEL=["#dor .w>.eb", "#dor .w>h2", ".dores>div", ".conta", ".perda", "#transformacao .w>.eb", "#transformacao .w>h2", ".dte .rw", "#transformacao .w>.nota", "#dinheiro .w>.eb", "#dinheiro .w>h2", ".cx>div", ".itens>div", "#dinheiro .w>.acoes", "#sensor .w>.eb", "#sensor .w>h2", "#sensor .w>.lede", "#como .w>.eb", "#como .w>h2", ".tres .card", ".banda .w", "#preco .w>.eb", "#preco .w>h2", "#preco .w>.lede", ".sim", "#safra .w>.eb", "#safra .w>h2", "#safra .w>.lede", ".cmp>div", ".legm", ".inc>div", "#safra .w>.acoes", "#faq .w>.eb", "#faq .w>h2", ".faq details", "#diagnostico .w>div"], CH=[".viz", ".mem", ".meses", ".barra"], els=[];
  SEL.concat(CH).forEach(function(q){ [].forEach.call(document.querySelectorAll(q),function(e){ if(els.indexOf(e)<0) els.push(e); }); });
  var rm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(rm||!("IntersectionObserver" in window)){ els.forEach(function(e){ e.classList.add("in"); }); return; }
  els.forEach(function(e){
    var i=[].indexOf.call(e.parentNode.children,e); e.style.setProperty("--d",(Math.min(i,5)*0.1).toFixed(1)+"s");
  });
  [].forEach.call(document.querySelectorAll(".viz,.meses"),function(c){ [].forEach.call(c.children,function(ch,i){ ch.style.setProperty("--k",i); }); });
  [].forEach.call(document.querySelectorAll(".mem"),function(c){ [].forEach.call(c.querySelectorAll("i"),function(ch,i){ ch.style.setProperty("--k",i); }); });
  [].forEach.call(document.querySelectorAll(".barra"),function(c,i){ c.querySelector("div").style.setProperty("--k",i*4); });
  var visto=false;
  var io=new IntersectionObserver(function(es){
    visto=true;
    es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
  },{threshold:0.12,rootMargin:"0px 0px -6% 0px"});
  els.forEach(function(e){ io.observe(e); });
  setTimeout(function(){ if(!visto) els.forEach(function(e){ e.classList.add("in"); }); },2500);
})();
