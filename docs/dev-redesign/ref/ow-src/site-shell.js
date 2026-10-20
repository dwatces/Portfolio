(function () {
var y = document.getElementById("yr");
if (y) y.textContent = new Date().getFullYear();
var h = document.querySelector(".sitehdr");
if (!h) return;
var ds = [].slice.call(h.querySelectorAll("details"));
var ptr = "";
function shut(d) { d.open = false; d.hov = 0; }
function eats(d) { return ptr && d.getClientRects().length && (d.classList.contains("sh-menu") || ptr !== "mouse"); }
function clr() { ptr = ""; }
ds.forEach(function (d) {
d.addEventListener("toggle", function () {
if (d.open) ds.forEach(function (o) { if (o !== d && o.open) shut(o); });
});
d.addEventListener("focusout", function (e) {
var t = e.relatedTarget;
if (d.open && t && !d.contains(t) && !eats(d)) shut(d);
});
});
document.addEventListener("pointerdown", function (e) { ptr = e.button > 0 ? "" : e.pointerType || "mouse"; }, true);
["pointercancel", "contextmenu", "auxclick", "dragstart"].forEach(function (n) { document.addEventListener(n, clr, true); });
document.addEventListener("pointerup", function (e) { if (e.pointerType == "mouse") setTimeout(clr); }, true);
document.addEventListener("keydown", function (e) {
ptr = "";
if (e.key !== "Escape" && e.key !== "Esc") return;
ds.forEach(function (d) {
if (!d.open) return;
var back = d.contains(document.activeElement);
shut(d);
if (back) d.querySelector("summary").focus();
});
});
window.addEventListener("click", function (e) {
if (typeof e.pointerType == "string") ptr = e.pointerType;
var t = e.target, eat = 0;
if (!(t.closest && t.closest(".sitehdr"))) {
ds.forEach(function (d) { if (d.open && !d.contains(t) && eats(d)) { shut(d); eat = 1; } });
}
ptr = "";
if (eat) { e.preventDefault(); e.stopPropagation(); }
}, true);
document.addEventListener("click", function (e) {
var t = e.target;
ds.forEach(function (d) {
if (d.open && (!d.contains(t) || (t.closest && t.closest("a")))) shut(d);
});
});
[].forEach.call(h.querySelectorAll(".sh-g"), function (li) {
var d = li.querySelector("details"), s = d && d.querySelector("summary"), tm;
if (!s) return;
li.addEventListener("pointerenter", function (e) {
if (e.pointerType !== "mouse") return;
clearTimeout(tm);
if (!d.open) { d.open = true; d.hov = 1; }
});
li.addEventListener("pointerleave", function (e) {
if (e.pointerType !== "mouse" || !d.hov) return;
tm = setTimeout(function () { if (d.hov && !d.contains(document.activeElement)) shut(d); }, 250);
});
s.addEventListener("click", function (e) {
if (d.hov) { e.preventDefault(); d.hov = 0; }
});
});
})();
