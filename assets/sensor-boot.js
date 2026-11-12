
/* =====================  CONFIG: troque aqui cor e velocidade  =====================
   cores.*              cor de cada material do modelo (hex). Verde-água só no LED.
   velocidade           rapidez com que o modelo segue o scroll (1 = padrão, 2 = mais rápido, 0.5 = mais lento)
   velocidadeParticulas rapidez das partículas quadradas (1 = padrão, 0 = paradas)
   particulas           quantidade de partículas
   alturaScroll         altura da faixa de scroll, em vh (padrão; data-altura-scroll no contêiner tem prioridade)
   modo                 "iso" (igual às cenas, ortográfica) ou "3d" (perspectiva leve)
   ================================================================================ */
window.PREDIK3D_CONFIG = Object.assign({
  cores: { casco: "#3B2E5E", aco: "#8F84B0", pcb: "#4A3E6B", chip: "#6A6078", pilha: "#7A708F", borracha: "#2B2347", luz: "#8B819F", ledApagado: "#2E2450", led: "#34D8C0" },
  velocidade: 1, velocidadeParticulas: 1, particulas: 90, alturaScroll: 420, modo: "iso"
}, window.PREDIK3D_CONFIG || {});

(function(){
  var el=document.querySelector("[data-predik3d]"); if(!el) return;
  window.__p3start=function(){

(function(){
  var C0 = window.PREDIK3D_CONFIG;
  var CENAS = ["assets/img/sensor-vista-1.svg", "assets/img/sensor-vista-2.svg", "assets/img/sensor-vista-3.svg"];
  var FALLBACK = {"escuro": "assets/img/sensor-fallback-escuro.png", "claro": "assets/img/sensor-fallback-claro.png"};
  var alvos = document.querySelectorAll("[data-predik3d]:not([data-predik3d-pronto])");
  [].forEach.call(alvos, function(el){
    el.setAttribute("data-predik3d-pronto", "");
    var C = Object.assign({}, C0);
    var altura = parseFloat(el.getAttribute("data-altura-scroll")) || C.alturaScroll || 420;
    el.style.height = altura + "vh";
    if (el.getAttribute("data-modo")) C.modo = el.getAttribute("data-modo");
    var tema = el.getAttribute("data-tema") === "claro" ? "claro" : "escuro";
    var q = function(s){ return el.querySelector(s); };
    var rm = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)");
    if (rm && rm.matches) {
      [].forEach.call(el.querySelectorAll(".p3-est img"), function(im,i){ im.src = CENAS[i]; });
      el.classList.add("p3-estatico"); el.style.height = ""; return;
    }
    function semWebgl(){
      el.classList.add("p3-sem-webgl"); el.style.height = "100vh";
      q(".p3-fb img").src = FALLBACK[el.getAttribute("data-tema") === "claro" ? "claro" : "escuro"] || FALLBACK.escuro || "";
    }
    var cv = q("canvas");
    if (!window.PredikSensor || !PredikSensor.webglDisponivel()) { semWebgl(); return; }
    var api;
    try { api = PredikSensor.iniciar(cv, C); } catch (e) { console.warn("WebGL falhou:", e); semWebgl(); return; }
    cv.addEventListener("webglcontextlost", function(ev){ ev.preventDefault(); semWebgl(); });
    el.predik3d = api;
    cv.__fora = true;
    if ("IntersectionObserver" in window) { new IntersectionObserver(function(es){ cv.__fora = !es[0].isIntersecting; }, {rootMargin:"200px 0px"}).observe(el); } else { cv.__fora = false; }
    var passos = [].slice.call(el.querySelectorAll(".p3-passo"));
    function progresso(){
      var r = el.getBoundingClientRect(), total = r.height - window.innerHeight;
      return total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
    }
    function atualizar(){
      var t = progresso();
      api.definirT(t);
      var i = t < 0.25 ? 0 : t < 0.75 ? 1 : 2;
      passos.forEach(function(p,k){ p.classList.toggle("on", k === i); });
    }
    window.addEventListener("scroll", atualizar, {passive:true});
    window.addEventListener("resize", atualizar);
    atualizar();
  });
})();

  };
  var C=window.PREDIK3D_CONFIG||{};
  el.style.height=(parseFloat(el.getAttribute("data-altura-scroll"))||C.alturaScroll||420)+"vh";
  var rm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  function carregar(){
    var sc=document.createElement("script"); sc.src="assets/sensor-3d.js"; sc.async=true;
    sc.onload=window.__p3start; sc.onerror=window.__p3start; document.head.appendChild(sc);
  }
  if(rm){ window.__p3start(); return; }
  if(!("IntersectionObserver" in window)){ carregar(); return; }
  var io=new IntersectionObserver(function(es){ if(es[0].isIntersecting){ io.disconnect(); carregar(); } },{rootMargin:"900px 0px"});
  io.observe(el);
})();
