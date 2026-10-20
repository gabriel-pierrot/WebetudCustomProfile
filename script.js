// v2
document.body.style.backgroundImage="url('https://pic.infini.fr/J11F9tlx/0kyF16d6.jpg')";
document.querySelectorAll(".card, #nav-drawer").forEach(e => {
    e.style.backgroundColor = "#FFFFFF80";
    e.style.borderRadius = "12px";
});
document.querySelectorAll("*").forEach(e => {
    e.style.color = "blue";

// chatGPT
const s = document.createElement("style");
s.textContent = `
.card, #nav-drawer {
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border: 1px solid #00eaff88 !important;
    box-shadow: 0 0 15px #00eaff33, inset 0 0 15px #8b00ff22;
    transition: transform .3s, box-shadow .3s, border-color .3s;
}
.card:hover {
    transform: translateY(-5px);
    border-color: #00ffff !important;
    box-shadow: 0 0 20px #00eaff99, 0 0 40px #a000ff55;
}
h1, h2, h3 {
    color: #fff !important;
    text-shadow: 0 0 5px #00eaff, 0 0 15px #00eaff, 0 0 30px #a000ff;
    animation: glow 2s ease-in-out infinite alternate;
}
@keyframes glow {
    from { filter: brightness(0.9); }
    to { filter: brightness(1.6); }
}
a {
    transition: text-shadow .2s, color .2s;
}
a:hover {
    color: #00ffff !important;
    text-shadow: 0 0 8px #00ffff, 0 0 20px #a000ff;
}
button, [role="button"] {
    transition: all .25s ease !important;
}
button:hover, [role="button"]:hover {
    box-shadow: 0 0 12px #00eaff, 0 0 25px #a000ff !important;
    transform: scale(1.04);
}
#fx-particles {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 99999;
}
`;
document.head.appendChild(s);

const c = document.createElement("canvas");
c.id = "fx-particles";
document.body.appendChild(c);
const ctx = c.getContext("2d");
let w, h, pts = [];

function resize() {
    w = c.width = innerWidth;
    h = c.height = innerHeight;
    pts = Array.from({ length: 85 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + .5,
        v: Math.random() * .7 + .2,
        a: Math.random() * .7 + .3
    }));
}
function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
        p.y -= p.v;
        if (p.y < 0) {
            p.y = h;
            p.x = Math.random() * w;
        }
        ctx.globalAlpha = p.a * (.6 + Math.sin(Date.now() * .002 + p.x) * .4);
        ctx.fillStyle = Math.random() > .5 ? "#00f7ff" : "#bd5bff";
        ctx.shadowBlur = 12;
        ctx.shadowColor = ctx.fillStyle;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
}
resize();
draw();
window.addEventListener("resize", resize);

document.addEventListener("pointermove", e => {
    const d = document.createElement("div");
    Object.assign(d.style, {
        position: "fixed",
        left: e.clientX + "px",
        top: e.clientY + "px",
        width: "4px",
        height: "4px",
        borderRadius: "50%",
        background: "#00f7ff",
        boxShadow: "0 0 10px #00f7ff, 0 0 20px #bd5bff",
        pointerEvents: "none",
        zIndex: "100000"
    });
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 250);
});
