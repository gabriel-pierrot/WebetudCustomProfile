// v2
document.body.style.backgroundImage="url('https://pic.infini.fr/J11F9tlx/0kyF16d6.jpg')";
document.querySelectorAll(".card, #nav-drawer").forEach(e => {
    e.style.backgroundColor = "#FFFFFF80";
    e.style.borderRadius = "12px";
});
document.querySelectorAll("*").forEach(e => {
    e.style.color = "blue";
});

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


(() => {
    document.querySelector("#fx-continuous")?.remove();

    const style = document.createElement("style");
    style.id = "fx-continuous";
    style.textContent = `
        #fx-continuous {
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 99998;
        }

        #fx-screen-flash {
            position: fixed;
            inset: 0;
            z-index: 99997;
            pointer-events: none;
            opacity: 0;
            background: white;
        }

        .fx-auto-laser {
            position: fixed;
            left: -120%;
            width: 100%;
            height: 2px;
            pointer-events: none;
            z-index: 99996;
            background: linear-gradient(90deg, transparent, #00ffff, white, #bd5bff, transparent);
            box-shadow: 0 0 12px #00ffff, 0 0 30px #bd5bff;
            animation: fxLaserPass 1.3s linear forwards;
        }

        @keyframes fxLaserPass {
            0% { left: -120%; opacity: 0; }
            15% { opacity: 1; }
            85% { opacity: .8; }
            100% { left: 120%; opacity: 0; }
        }

        @keyframes fxAmbientFlash {
            0%, 100% { opacity: 0; }
            3% { opacity: .65; }
            5% { opacity: .04; }
            7% { opacity: .3; }
            10% { opacity: 0; }
        }

        .card, #nav-drawer {
            animation: fxCardGlow 4s ease-in-out infinite alternate;
        }

        @keyframes fxCardGlow {
            from { box-shadow: 0 0 8px #00eaff22, inset 0 0 8px #a000ff11; }
            to { box-shadow: 0 0 22px #00eaff66, inset 0 0 15px #a000ff33; }
        }

        h1, h2, h3 {
            animation: fxTextGlow 2.5s ease-in-out infinite alternate;
        }

        @keyframes fxTextGlow {
            from { text-shadow: 0 0 5px #00ffff, 0 0 12px #00ffff; }
            to { text-shadow: 0 0 10px #fff, 0 0 25px #bd5bff, 0 0 45px #00ffff; }
        }

        @media (prefers-reduced-motion: reduce) {
            .fx-auto-laser, .card, #nav-drawer, h1, h2, h3 {
                animation-duration: 8s !important;
            }
        }
    `;
    document.head.appendChild(style);

    const canvas = document.createElement("canvas");
    canvas.id = "fx-continuous";
    document.body.appendChild(canvas);

    const flash = document.createElement("div");
    flash.id = "fx-screen-flash";
    document.body.appendChild(flash);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w, h, particles = [];
    let lastLightning = 0;
    let lastLaser = 0;
    let lastFlash = 0;
    let lightningPath = [];
    let lightningAlpha = 0;

    function resize() {
        const dpr = Math.min(devicePixelRatio || 1, 2);
        w = innerWidth;
        h = innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        particles = Array.from({ length: Math.min(140, Math.floor(w * h / 8000)) }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 2 + .4,
            speed: Math.random() * .8 + .15,
            drift: (Math.random() - .5) * .5,
            phase: Math.random() * 6.28
        }));
    }

    function createLightning() {
        let x = Math.random() * w;
        let y = 0;
        lightningPath = [{ x, y }];

        while (y < h * (.35 + Math.random() * .5)) {
            y += Math.random() * 30 + 10;
            x += (Math.random() - .5) * 90;
            lightningPath.push({ x, y });

            if (Math.random() > .65) {
                lightningPath.push({
                    x: x + (Math.random() - .5) * 100,
                    y: y + Math.random() * 30
                });
                lightningPath.push({ x, y });
            }
        }

        lightningAlpha = 1;
    }

    function spawnLaser() {
        const laser = document.createElement("div");
        laser.className = "fx-auto-laser";
        laser.style.top = Math.random() * 100 + "%";
        laser.style.transform = `rotate(${Math.random() * 35 - 17}deg)`;
        document.body.appendChild(laser);
        setTimeout(() => laser.remove(), 1400);
    }

    function flashScreen() {
        flash.style.animation = "none";
        void flash.offsetWidth;
        flash.style.animation = "fxAmbientFlash .45s steps(1) forwards";
    }

    function draw(time = 0) {
        ctx.clearRect(0, 0, w, h);

        for (const p of particles) {
            p.y -= p.speed;
            p.x += p.drift;

            if (p.y < -5) {
                p.y = h + 5;
                p.x = Math.random() * w;
            }

            const alpha = .35 + (Math.sin(time * .002 + p.phase) + 1) * .3;
            ctx.globalAlpha = alpha;
            ctx.fillStyle = Math.random() > .5 ? "#00f7ff" : "#bd5bff";
            ctx.shadowBlur = 14;
            ctx.shadowColor = ctx.fillStyle;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }

        if (time - lastLightning > 700 + Math.random() * 1700) {
            lastLightning = time;
            createLightning();
        }

        if (lightningAlpha > .02) {
            ctx.globalAlpha = lightningAlpha;
            ctx.beginPath();

            lightningPath.forEach((p, i) => {
                if (i === 0) ctx.moveTo(p.x, p.y);
                else ctx.lineTo(p.x, p.y);
            });

            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.shadowBlur = 25;
            ctx.shadowColor = "#00ffff";
            ctx.stroke();

            ctx.strokeStyle = "#bd5bff";
            ctx.lineWidth = 6;
            ctx.globalAlpha = lightningAlpha * .25;
            ctx.stroke();

            lightningAlpha *= .78;
        }

        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        if (time - lastLaser > 1800 + Math.random() * 2200) {
            lastLaser = time;
            spawnLaser();
        }

        if (time - lastFlash > 5000 + Math.random() * 7000) {
            lastFlash = time;
            if (Math.random() > .45) flashScreen();
        }

        requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw();


  
(() => {
    if (document.querySelector("#chaos-fx")) return;

    const style = document.createElement("style");
    style.id = "chaos-fx";
    style.textContent = `
        #chaos-fx {
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 99990;
        }

        #chaos-overlay {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 99989;
            opacity: 0;
            background: linear-gradient(
                120deg,
                #00ffff33,
                transparent 35%,
                #ff00ff33 65%,
                #7b00ff33
            );
            mix-blend-mode: screen;
            animation: chaosColor 7s ease-in-out infinite;
        }

        @keyframes chaosColor {
            0%, 100% { opacity: .1; filter: hue-rotate(0deg); }
            50% { opacity: .65; filter: hue-rotate(150deg); }
        }

        .chaos-beam {
            position: fixed;
            height: 3px;
            width: 65vw;
            left: -70vw;
            pointer-events: none;
            z-index: 99991;
            background: linear-gradient(
                90deg, transparent, #00ffff, white, #ff00ff, transparent
            );
            box-shadow: 0 0 12px #00ffff, 0 0 35px #ff00ff;
            animation: chaosBeam 2.2s ease-in-out forwards;
        }

        @keyframes chaosBeam {
            0% { transform: translateX(0) rotate(-18deg); opacity: 0; }
            15% { opacity: 1; }
            100% { transform: translateX(220vw) rotate(-18deg); opacity: 0; }
        }

        #chaos-fx-vignette {
            position: fixed;
            inset: 0;
            z-index: 99988;
            pointer-events: none;
            box-shadow: inset 0 0 100px 25px #7000ff66;
            animation: chaosVignette 3s ease-in-out infinite alternate;
        }

        @keyframes chaosVignette {
            from { box-shadow: inset 0 0 70px 10px #00ffff44; }
            to { box-shadow: inset 0 0 130px 30px #ff00ff66; }
        }

        .card {
            transition: box-shadow .3s, border-color .3s;
            animation: chaosCard 5s ease-in-out infinite alternate;
        }

        @keyframes chaosCard {
            0% { border-color: #00ffff55; }
            50% { border-color: #bd5bffcc; }
            100% { border-color: #ff38c8aa; }
        }

        h1, h2, h3 {
            animation: chaosText 3s ease-in-out infinite alternate;
        }

        @keyframes chaosText {
            0% {
                text-shadow: 0 0 5px #00ffff, 2px 0 #ff00ff;
                filter: hue-rotate(0deg);
            }
            100% {
                text-shadow: 0 0 15px #bd5bff, -2px 0 #00ffff,
                             0 0 30px #ff00ff;
                filter: hue-rotate(45deg);
            }
        }
    `;
    document.head.appendChild(style);

    const canvas = document.createElement("canvas");
    canvas.id = "chaos-fx";
    document.body.appendChild(canvas);

    const overlay = document.createElement("div");
    overlay.id = "chaos-overlay";
    document.body.appendChild(overlay);

    const vignette = document.createElement("div");
    vignette.id = "chaos-fx-vignette";
    document.body.appendChild(vignette);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    let sparks = [];
    let lastBurst = 0;
    let lastBeam = 0;

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = innerWidth;
        h = innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function explode() {
        const x = Math.random() * w;
        const y = Math.random() * h;

        for (let i = 0; i < 65; i++) {
            const a = Math.random() * Math.PI * 2;
            const v = Math.random() * 7 + 1;

            sparks.push({
                x, y,
                vx: Math.cos(a) * v,
                vy: Math.sin(a) * v,
                life: 1,
                color: ["#00ffff", "#ff00ff", "#ffffff", "#a855ff"][i % 4]
            });
        }

        if (sparks.length > 700) sparks.splice(0, sparks.length - 700);
    }

    function beam() {
        const el = document.createElement("div");
        el.className = "chaos-beam";
        el.style.top = Math.random() * h + "px";
        el.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 2300);
    }

    function animate(t = 0) {
        ctx.clearRect(0, 0, w, h);

        for (let i = sparks.length - 1; i >= 0; i--) {
            const p = sparks[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= .975;
            p.vy *= .975;
            p.life -= .012;

            if (p.life <= 0) {
                sparks.splice(i, 1);
                continue;
            }

            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 18;
            ctx.shadowColor = p.color;
            ctx.fillRect(p.x, p.y, 3, 3);
        }

        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        if (t - lastBurst > 650) {
            lastBurst = t;
            explode();
        }

        if (t - lastBeam > 1100) {
            lastBeam = t;
            beam();
        }

        requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener("resize", resize);
    animate();
})();

})();
