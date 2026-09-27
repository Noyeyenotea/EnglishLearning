//#region ../../node_modules/.pnpm/@fingerprintjs+fingerprintjs@5.2.0/node_modules/@fingerprintjs/fingerprintjs/dist/fp.esm.js
var e = "5.2.0";
function t(e, t) {
	return new Promise((n) => setTimeout(n, e, t));
}
function n() {
	return new Promise((e) => {
		let t = new MessageChannel();
		t.port1.onmessage = () => e(), t.port2.postMessage(null);
	});
}
function r(e, n = Infinity) {
	let { requestIdleCallback: r } = window;
	return r ? new Promise((e) => r.call(window, () => e(), { timeout: n })) : t(Math.min(e, n));
}
function i(e) {
	return !!e && typeof e.then == "function";
}
function a(e, t) {
	try {
		let n = e();
		i(n) ? n.then((e) => t(!0, e), (e) => t(!1, e)) : t(!0, n);
	} catch (e) {
		t(!1, e);
	}
}
async function o(e, t, r = 16) {
	let i = Array(e.length), a = Date.now();
	for (let o = 0; o < e.length; ++o) {
		i[o] = t(e[o], o);
		let s = Date.now();
		s >= a + r && (a = s, await n());
	}
	return i;
}
function s(e) {
	return e.then(void 0, () => void 0), e;
}
function c(e, t) {
	for (let n = 0, r = e.length; n < r; ++n) if (e[n] === t) return !0;
	return !1;
}
function l(e, t) {
	return !c(e, t);
}
function u(e) {
	return parseInt(e);
}
function d(e) {
	return parseFloat(e);
}
function f(e, t) {
	return typeof e == "number" && isNaN(e) ? t : e;
}
function p(e) {
	return e.reduce((e, t) => e + +!!t, 0);
}
function m(e, t = 1) {
	if (Math.abs(t) >= 1) return Math.round(e / t) * t;
	{
		let n = 1 / t;
		return Math.round(e * n) / n;
	}
}
function ee(e) {
	let t = `Unexpected syntax '${e}'`, n = /^\s*([a-z-]*)(.*)$/i.exec(e), r = n[1] || void 0, i = {}, a = /([.:#][\w-]+|\[.+?\])/gi, o = (e, t) => {
		i[e] = i[e] || [], i[e].push(t);
	};
	for (;;) {
		let e = a.exec(n[2]);
		if (!e) break;
		let r = e[0];
		switch (r[0]) {
			case ".":
				o("class", r.slice(1));
				break;
			case "#":
				o("id", r.slice(1));
				break;
			case "[": {
				let e = /^\[([\w-]+)([~|^$*]?=("(.*?)"|([\w-]+)))?(\s+[is])?\]$/.exec(r);
				if (e) o(e[1], e[4] ?? e[5] ?? "");
				else throw Error(t);
				break;
			}
			default: throw Error(t);
		}
	}
	return [r, i];
}
function te(e) {
	let t = new Uint8Array(e.length);
	for (let n = 0; n < e.length; n++) {
		let r = e.charCodeAt(n);
		if (r > 127) return new TextEncoder().encode(e);
		t[n] = r;
	}
	return t;
}
function h(e, t) {
	let n = e[0] >>> 16, r = e[0] & 65535, i = e[1] >>> 16, a = e[1] & 65535, o = t[0] >>> 16, s = t[0] & 65535, c = t[1] >>> 16, l = t[1] & 65535, u = 0, d = 0, f = 0, p = 0;
	p += a + l, f += p >>> 16, p &= 65535, f += i + c, d += f >>> 16, f &= 65535, d += r + s, u += d >>> 16, d &= 65535, u += n + o, u &= 65535, e[0] = u << 16 | d, e[1] = f << 16 | p;
}
function g(e, t) {
	let n = e[0] >>> 16, r = e[0] & 65535, i = e[1] >>> 16, a = e[1] & 65535, o = t[0] >>> 16, s = t[0] & 65535, c = t[1] >>> 16, l = t[1] & 65535, u = 0, d = 0, f = 0, p = 0;
	p += a * l, f += p >>> 16, p &= 65535, f += i * l, d += f >>> 16, f &= 65535, f += a * c, d += f >>> 16, f &= 65535, d += r * l, u += d >>> 16, d &= 65535, d += i * c, u += d >>> 16, d &= 65535, d += a * s, u += d >>> 16, d &= 65535, u += n * l + r * c + i * s + a * o, u &= 65535, e[0] = u << 16 | d, e[1] = f << 16 | p;
}
function ne(e, t) {
	let n = e[0];
	t %= 64, t === 32 ? (e[0] = e[1], e[1] = n) : t < 32 ? (e[0] = n << t | e[1] >>> 32 - t, e[1] = e[1] << t | n >>> 32 - t) : (t -= 32, e[0] = e[1] << t | n >>> 32 - t, e[1] = n << t | e[1] >>> 32 - t);
}
function _(e, t) {
	t %= 64, t !== 0 && (t < 32 ? (e[0] = e[1] >>> 32 - t, e[1] <<= t) : (e[0] = e[1] << t - 32, e[1] = 0));
}
function v(e, t) {
	e[0] ^= t[0], e[1] ^= t[1];
}
var re = [4283543511, 3981806797], ie = [3301882366, 444984403];
function ae(e) {
	let t = [0, e[0] >>> 1];
	v(e, t), g(e, re), t[1] = e[0] >>> 1, v(e, t), g(e, ie), t[1] = e[0] >>> 1, v(e, t);
}
var oe = [2277735313, 289559509], se = [1291169091, 658871167], ce = [0, 5], le = [0, 1390208809], ue = [0, 944331445];
function de(e, t) {
	let n = te(e);
	t ||= 0;
	let r = [0, n.length], i = r[1] % 16, a = r[1] - i, o = [0, t], s = [0, t], c = [0, 0], l = [0, 0], u;
	for (u = 0; u < a; u += 16) c[0] = n[u + 4] | n[u + 5] << 8 | n[u + 6] << 16 | n[u + 7] << 24, c[1] = n[u] | n[u + 1] << 8 | n[u + 2] << 16 | n[u + 3] << 24, l[0] = n[u + 12] | n[u + 13] << 8 | n[u + 14] << 16 | n[u + 15] << 24, l[1] = n[u + 8] | n[u + 9] << 8 | n[u + 10] << 16 | n[u + 11] << 24, g(c, oe), ne(c, 31), g(c, se), v(o, c), ne(o, 27), h(o, s), g(o, ce), h(o, le), g(l, se), ne(l, 33), g(l, oe), v(s, l), ne(s, 31), h(s, o), g(s, ce), h(s, ue);
	c[0] = 0, c[1] = 0, l[0] = 0, l[1] = 0;
	let d = [0, 0];
	switch (i) {
		case 15: d[1] = n[u + 14], _(d, 48), v(l, d);
		case 14: d[1] = n[u + 13], _(d, 40), v(l, d);
		case 13: d[1] = n[u + 12], _(d, 32), v(l, d);
		case 12: d[1] = n[u + 11], _(d, 24), v(l, d);
		case 11: d[1] = n[u + 10], _(d, 16), v(l, d);
		case 10: d[1] = n[u + 9], _(d, 8), v(l, d);
		case 9: d[1] = n[u + 8], v(l, d), g(l, se), ne(l, 33), g(l, oe), v(s, l);
		case 8: d[1] = n[u + 7], _(d, 56), v(c, d);
		case 7: d[1] = n[u + 6], _(d, 48), v(c, d);
		case 6: d[1] = n[u + 5], _(d, 40), v(c, d);
		case 5: d[1] = n[u + 4], _(d, 32), v(c, d);
		case 4: d[1] = n[u + 3], _(d, 24), v(c, d);
		case 3: d[1] = n[u + 2], _(d, 16), v(c, d);
		case 2: d[1] = n[u + 1], _(d, 8), v(c, d);
		case 1: d[1] = n[u], v(c, d), g(c, oe), ne(c, 31), g(c, se), v(o, c);
	}
	return v(o, r), v(s, r), h(o, s), h(s, o), ae(o), ae(s), h(o, s), h(s, o), ("00000000" + (o[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (o[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (s[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (s[1] >>> 0).toString(16)).slice(-8);
}
function fe(e) {
	return {
		name: e.name,
		message: e.message,
		stack: e.stack?.split("\n"),
		...e
	};
}
function pe(e) {
	return /^function\s.*?\{\s*\[native code]\s*}$/.test(String(e));
}
function me(e) {
	return typeof e != "function";
}
function he(e, t) {
	let n = s(new Promise((n) => {
		let r = Date.now();
		a(e.bind(null, t), (...e) => {
			let t = Date.now() - r;
			if (!e[0]) return n(() => ({
				error: e[1],
				duration: t
			}));
			let i = e[1];
			if (me(i)) return n(() => ({
				value: i,
				duration: t
			}));
			n(() => new Promise((e) => {
				let n = Date.now();
				a(i, (...r) => {
					let i = t + Date.now() - n;
					if (!r[0]) return e({
						error: r[1],
						duration: i
					});
					e({
						value: r[1],
						duration: i
					});
				});
			}));
		});
	}));
	return function() {
		return n.then((e) => e());
	};
}
function ge(e, t, n, r) {
	let i = Object.keys(e).filter((e) => l(n, e)), a = s(o(i, (n) => he(e[n], t), r));
	return async function() {
		let e = await o(await a, (e) => s(e()), r), t = await Promise.all(e), n = {};
		for (let e = 0; e < i.length; ++e) n[i[e]] = t[e];
		return n;
	};
}
function _e() {
	let e = window, t = navigator;
	return p([
		"MSCSSMatrix" in e,
		"msSetImmediate" in e,
		"msIndexedDB" in e,
		"msMaxTouchPoints" in t,
		"msPointerEnabled" in t
	]) >= 4;
}
function ve() {
	let e = window, t = navigator;
	return p([
		"msWriteProfilerMark" in e,
		"MSStream" in e,
		"msLaunchUri" in t,
		"msSaveBlob" in t
	]) >= 3 && !_e();
}
function ye() {
	let e = window, t = navigator;
	return p([
		"webkitPersistentStorage" in t,
		"webkitTemporaryStorage" in t,
		(t.vendor || "").indexOf("Google") === 0,
		"webkitResolveLocalFileSystemURL" in e,
		"BatteryManager" in e,
		"webkitMediaStream" in e,
		"webkitSpeechGrammar" in e
	]) >= 5;
}
function y() {
	let e = window, t = navigator;
	return p([
		"ApplePayError" in e,
		"CSSPrimitiveValue" in e,
		"Counter" in e,
		t.vendor.indexOf("Apple") === 0,
		"RGBColor" in e,
		"WebKitMediaKeys" in e
	]) >= 4;
}
function be() {
	let e = window, { HTMLElement: t, Document: n } = e;
	return p([
		"safari" in e,
		!("ongestureend" in e),
		!("TouchEvent" in e),
		!("orientation" in e),
		t && !("autocapitalize" in t.prototype),
		n && "pointerLockElement" in n.prototype
	]) >= 4;
}
function xe() {
	let e = window;
	return pe(e.print) && String(e.browser) === "[object WebPageNamespace]";
}
function Se() {
	let e = window;
	return p([
		"buildID" in navigator,
		"MozAppearance" in (document.documentElement?.style ?? {}),
		"onmozfullscreenchange" in e,
		"mozInnerScreenX" in e,
		"CSSMozDocumentRule" in e,
		"CanvasCaptureMediaStream" in e
	]) >= 4;
}
function Ce() {
	let e = window, t = navigator, { CSS: n } = e;
	return p([
		"userActivation" in t,
		n.supports("color", "light-dark(#000, #fff)"),
		n.supports("height", "1lh"),
		"globalPrivacyControl" in t
	]) >= 3;
}
function we() {
	let { CSS: e } = window;
	return p([
		e.supports("selector(::details-content)"),
		e.supports("selector(::before::marker)"),
		e.supports("selector(::after::marker)"),
		!("locale" in CompositionEvent.prototype)
	]) >= 3;
}
function Te() {
	let e = window;
	return p([
		!("MediaSettingsRange" in e),
		"RTCEncodedAudioFrame" in e,
		"" + e.Intl == "[object Intl]",
		"" + e.Reflect == "[object Reflect]"
	]) >= 3;
}
function Ee() {
	let e = window, { URLPattern: t } = e;
	return p([
		"union" in Set.prototype,
		"Iterator" in e,
		t && "hasRegExpGroups" in t.prototype,
		"RGB8" in WebGLRenderingContext.prototype
	]) >= 3;
}
function De() {
	let e = window, t = document, { CSS: n, Promise: r, AudioContext: i } = e;
	return p([
		r && "try" in r,
		"caretPositionFromPoint" in t,
		i && "onerror" in i.prototype,
		n.supports("ruby-align", "space-around")
	]) >= 3;
}
function Oe() {
	let e = window;
	return p([
		"DOMRectList" in e,
		"RTCPeerConnectionIceEvent" in e,
		"SVGGeometryElement" in e,
		"ontransitioncancel" in e
	]) >= 3;
}
function ke() {
	let e = window, t = navigator, { CSS: n, HTMLButtonElement: r } = e;
	return p([
		!("getStorageUpdates" in t),
		r && "popover" in r.prototype,
		"CSSCounterStyleRule" in e,
		n.supports("font-size-adjust: ex-height 0.5"),
		n.supports("text-transform: full-width")
	]) >= 4;
}
function Ae() {
	if (navigator.platform === "iPad") return !0;
	let e = screen, t = e.width / e.height;
	return p([
		"MediaSource" in window,
		!!Element.prototype.webkitRequestFullscreen,
		t > .65 && t < 1.53
	]) >= 2;
}
function je() {
	let e = document;
	return e.fullscreenElement || e.msFullscreenElement || e.mozFullScreenElement || e.webkitFullscreenElement || null;
}
function Me() {
	let e = document;
	return (e.exitFullscreen || e.msExitFullscreen || e.mozCancelFullScreen || e.webkitExitFullscreen).call(e);
}
function Ne() {
	let e = ye(), t = Se(), n = window, r = navigator, i = "connection";
	return e ? p([
		!("SharedWorker" in n),
		r[i] && "ontypechange" in r[i],
		!("sinkId" in new Audio())
	]) >= 2 : t ? p([
		"onorientationchange" in n,
		"orientation" in n,
		/android/i.test(r.appVersion)
	]) >= 2 : !1;
}
function Pe() {
	let e = navigator, t = window, n = Audio.prototype, { visualViewport: r } = t;
	return p([
		"srLatency" in n,
		"srChannelCount" in n,
		"devicePosture" in e,
		r && "segments" in r,
		"getTextInformation" in Image.prototype
	]) >= 3;
}
function Fe() {
	return Re() ? -4 : Ie();
}
function Ie() {
	let e = window, t = e.OfflineAudioContext || e.webkitOfflineAudioContext;
	if (!t) return -2;
	if (Le()) return -1;
	let n = new t(1, 5e3, 44100), r = n.createOscillator();
	r.type = "triangle", r.frequency.value = 1e4;
	let i = n.createDynamicsCompressor();
	i.threshold.value = -50, i.knee.value = 40, i.ratio.value = 12, i.attack.value = 0, i.release.value = .25, r.connect(i), i.connect(n.destination), r.start(0);
	let [a, o] = ze(n), c = s(a.then((e) => Be(e.getChannelData(0).subarray(4500)), (e) => {
		if (e.name === "timeout" || e.name === "suspended") return -3;
		throw e;
	}));
	return () => (o(), c);
}
function Le() {
	return y() && !be() && !Oe();
}
function Re() {
	return y() && ke() && xe() || ye() && Pe() && Ee();
}
function ze(e) {
	let t = () => void 0;
	return [new Promise((n, r) => {
		let a = !1, o = 0, c = 0;
		e.oncomplete = (e) => n(e.renderedBuffer);
		let l = () => {
			setTimeout(() => r(Ve("timeout")), Math.min(500, c + 5e3 - Date.now()));
		}, u = () => {
			try {
				let t = e.startRendering();
				switch (i(t) && s(t), e.state) {
					case "running":
						c = Date.now(), a && l();
						break;
					case "suspended": document.hidden || o++, a && o >= 3 ? r(Ve("suspended")) : setTimeout(u, 500);
				}
			} catch (e) {
				r(e);
			}
		};
		u(), t = () => {
			a || (a = !0, c > 0 && l());
		};
	}), t];
}
function Be(e) {
	let t = 0;
	for (let n = 0; n < e.length; ++n) t += Math.abs(e[n]);
	return t;
}
function Ve(e) {
	let t = Error(e);
	return t.name = e, t;
}
async function He(e, n, r = 50) {
	var i;
	let a = document;
	for (; !a.body;) await t(r);
	let o = a.createElement("iframe");
	try {
		for (await new Promise((e, t) => {
			let r = !1, i = () => {
				r = !0, e();
			};
			o.onload = i, o.onerror = (e) => {
				r = !0, t(e);
			};
			let { style: s } = o;
			s.setProperty("display", "block", "important"), s.position = "absolute", s.top = "0", s.left = "0", s.visibility = "hidden", n && "srcdoc" in o ? o.srcdoc = n : o.src = "about:blank", a.body.appendChild(o);
			let c = () => {
				r || (o.contentWindow?.document?.readyState === "complete" ? i() : setTimeout(c, 10));
			};
			c();
		}); !o.contentWindow?.document?.body;) await t(r);
		return await e(o, o.contentWindow);
	} finally {
		(i = o.parentNode) == null || i.removeChild(o);
	}
}
function Ue(e) {
	let [t, n] = ee(e), r = document.createElement(t ?? "div");
	for (let e of Object.keys(n)) {
		let t = n[e].join(" ");
		e === "style" ? We(r.style, t) : r.setAttribute(e, t);
	}
	return r;
}
function We(e, t) {
	for (let n of t.split(";")) {
		let t = /^\s*([\w-]+)\s*:\s*(.+?)(\s*!([\w-]+))?\s*$/.exec(n);
		if (t) {
			let [, n, r, , i] = t;
			e.setProperty(n, r, i || "");
		}
	}
}
function Ge() {
	let e = window;
	for (;;) {
		let t = e.parent;
		if (!t || t === e) return !1;
		try {
			if (t.location.origin !== e.location.origin) return !0;
		} catch (e) {
			if (e instanceof Error && e.name === "SecurityError") return !0;
			throw e;
		}
		e = t;
	}
}
var Ke = "mmMwWLliI0O&1", qe = "48px", Je = [
	"monospace",
	"sans-serif",
	"serif"
], Ye = /* @__PURE__ */ "sans-serif-thin.ARNO PRO.Agency FB.Arabic Typesetting.Arial Unicode MS.AvantGarde Bk BT.BankGothic Md BT.Batang.Bitstream Vera Sans Mono.Calibri.Century.Century Gothic.Clarendon.EUROSTILE.Franklin Gothic.Futura Bk BT.Futura Md BT.GOTHAM.Gill Sans.HELV.Haettenschweiler.Helvetica Neue.Humanst521 BT.Leelawadee.Letter Gothic.Levenim MT.Lucida Bright.Lucida Sans.Menlo.MS Mincho.MS Outlook.MS Reference Specialty.MS UI Gothic.MT Extra.MYRIAD PRO.Marlett.Meiryo UI.Microsoft Uighur.Minion Pro.Monotype Corsiva.PMingLiU.Pristina.SCRIPTINA.Segoe UI Light.Serifa.SimHei.Small Fonts.Staccato222 BT.TRAJAN PRO.Univers CE 55 Medium.Vrinda.ZWAdobeF".split(".");
function Xe() {
	return He(async (e, { document: t }) => {
		let n = t.body;
		n.style.fontSize = qe;
		let r = t.createElement("div");
		r.style.setProperty("visibility", "hidden", "important");
		let i = {}, a = {}, o = (e) => {
			let n = t.createElement("span"), { style: i } = n;
			return i.position = "absolute", i.top = "0", i.left = "0", i.fontFamily = e, n.textContent = Ke, r.appendChild(n), n;
		}, s = (e, t) => o(`'${e}',${t}`), c = () => Je.map(o), l = () => {
			let e = {};
			for (let t of Ye) e[t] = Je.map((e) => s(t, e));
			return e;
		}, u = (e) => Je.some((t, n) => e[n].offsetWidth !== i[t] || e[n].offsetHeight !== a[t]), d = c(), f = l();
		n.appendChild(r);
		for (let e = 0; e < Je.length; e++) i[Je[e]] = d[e].offsetWidth, a[Je[e]] = d[e].offsetHeight;
		return Ye.filter((e) => u(f[e]));
	});
}
function Ze() {
	let e = navigator.plugins;
	if (!e) return;
	let t = [];
	for (let n = 0; n < e.length; ++n) {
		let r = e[n];
		if (!r) continue;
		let i = [];
		for (let e = 0; e < r.length; ++e) {
			let t = r[e];
			i.push({
				type: t.type,
				suffixes: t.suffixes
			});
		}
		t.push({
			name: r.name,
			description: r.description,
			mimeTypes: i
		});
	}
	return t;
}
function Qe() {
	return $e(st());
}
function $e(e) {
	let t = !1, n, r, [i, a] = et();
	return tt(i, a) ? (t = nt(a), e ? n = r = "skipped" : [n, r] = rt(i, a)) : n = r = "unsupported", {
		winding: t,
		geometry: n,
		text: r
	};
}
function et() {
	let e = document.createElement("canvas");
	return e.width = 1, e.height = 1, [e, e.getContext("2d")];
}
function tt(e, t) {
	return !!(t && e.toDataURL);
}
function nt(e) {
	return e.rect(0, 0, 10, 10), e.rect(2, 2, 6, 6), !e.isPointInPath(5, 5, "evenodd");
}
function rt(e, t) {
	it(e, t);
	let n = ot(e);
	return n === ot(e) ? (at(e, t), [ot(e), n]) : ["unstable", "unstable"];
}
function it(e, t) {
	e.width = 240, e.height = 60, t.textBaseline = "alphabetic", t.fillStyle = "#f60", t.fillRect(100, 1, 62, 20), t.fillStyle = "#069", t.font = "11pt \"Times New Roman\"";
	let n = `Cwm fjordbank gly ${String.fromCharCode(55357, 56835)}`;
	t.fillText(n, 2, 15), t.fillStyle = "rgba(102, 204, 0, 0.2)", t.font = "18pt Arial", t.fillText(n, 4, 45);
}
function at(e, t) {
	e.width = 122, e.height = 110, t.globalCompositeOperation = "multiply";
	for (let [e, n, r] of [
		[
			"#f2f",
			40,
			40
		],
		[
			"#2ff",
			80,
			40
		],
		[
			"#ff2",
			60,
			80
		]
	]) t.fillStyle = e, t.beginPath(), t.arc(n, r, 40, 0, Math.PI * 2, !0), t.closePath(), t.fill();
	t.fillStyle = "#f9c", t.arc(60, 60, 60, 0, Math.PI * 2, !0), t.arc(60, 60, 20, 0, Math.PI * 2, !0), t.fill("evenodd");
}
function ot(e) {
	return e.toDataURL();
}
function st() {
	let e = y() && ke() && xe(), t = Se() && Ce();
	return e || t;
}
function ct() {
	let e = navigator, t = 0, n;
	e.maxTouchPoints === void 0 ? e.msMaxTouchPoints !== void 0 && (t = e.msMaxTouchPoints) : t = u(e.maxTouchPoints);
	try {
		document.createEvent("TouchEvent"), n = !0;
	} catch {
		n = !1;
	}
	let r = "ontouchstart" in window;
	return {
		maxTouchPoints: t,
		touchEvent: n,
		touchStart: r
	};
}
function lt() {
	return navigator.oscpu;
}
function ut() {
	let e = navigator, t = [], n = e.language || e.userLanguage || e.browserLanguage || e.systemLanguage;
	if (n !== void 0 && t.push([n]), Array.isArray(e.languages)) ye() && Te() || t.push(e.languages);
	else if (typeof e.languages == "string") {
		let n = e.languages;
		n && t.push(n.split(","));
	}
	return t;
}
function dt() {
	return window.screen.colorDepth;
}
function ft() {
	return f(d(navigator.deviceMemory), void 0);
}
function pt() {
	if (!(y() && ke() && xe())) return mt();
}
function mt() {
	let e = screen, t = (e) => f(u(e), null), n = [t(e.width), t(e.height)];
	return n.sort().reverse(), n;
}
var ht = 2500, gt = 10, _t, vt;
function yt() {
	if (vt !== void 0) return;
	let e = () => {
		let t = St();
		Ct(t) ? vt = setTimeout(e, ht) : (_t = t, vt = void 0);
	};
	e();
}
function bt() {
	return yt(), async () => {
		let e = St();
		if (Ct(e)) {
			if (_t) return [..._t];
			je() && (await Me(), e = St());
		}
		return Ct(e) || (_t = e), e;
	};
}
function xt() {
	let e = y() && ke() && xe(), t = Se() && we();
	if (e || t) return () => Promise.resolve(void 0);
	let n = bt();
	return async () => {
		let e = await n(), t = (e) => e === null ? null : m(e, gt);
		return [
			t(e[0]),
			t(e[1]),
			t(e[2]),
			t(e[3])
		];
	};
}
function St() {
	let e = screen;
	return [
		f(d(e.availTop), null),
		f(d(e.width) - d(e.availWidth) - f(d(e.availLeft), 0), null),
		f(d(e.height) - d(e.availHeight) - f(d(e.availTop), 0), null),
		f(d(e.availLeft), null)
	];
}
function Ct(e) {
	for (let t = 0; t < 4; ++t) if (e[t]) return !1;
	return !0;
}
function wt() {
	let e = Tt();
	return e !== void 0 && Se() && we() ? e >= 8 ? 8 : 4 : e;
}
function Tt() {
	return f(u(navigator.hardwareConcurrency), void 0);
}
function Et() {
	let e = window.Intl?.DateTimeFormat;
	if (e) {
		let t = new e().resolvedOptions().timeZone;
		if (t) return t;
	}
	let t = -Dt();
	return `UTC${t >= 0 ? "+" : ""}${t}`;
}
function Dt() {
	let e = (/* @__PURE__ */ new Date()).getFullYear();
	return Math.max(d(new Date(e, 0, 1).getTimezoneOffset()), d(new Date(e, 6, 1).getTimezoneOffset()));
}
function Ot() {
	try {
		return !!window.sessionStorage;
	} catch {
		return !0;
	}
}
function kt() {
	try {
		return !!window.localStorage;
	} catch {
		return !0;
	}
}
function At() {
	if (!(_e() || ve())) try {
		return !!window.indexedDB;
	} catch {
		return !0;
	}
}
function jt() {
	return !!window.openDatabase;
}
function Mt() {
	return navigator.cpuClass;
}
function Nt() {
	let { platform: e } = navigator;
	return e === "MacIntel" && y() && !be() ? Ae() ? "iPad" : "iPhone" : e;
}
function Pt() {
	return navigator.vendor || "";
}
function Ft() {
	let e = [];
	for (let t of [
		"chrome",
		"safari",
		"__crWeb",
		"__gCrWeb",
		"yandex",
		"__yb",
		"__ybro",
		"__firefox__",
		"__edgeTrackingPreventionStatistics",
		"webkit",
		"oprt",
		"samsungAr",
		"ucweb",
		"UCShellJava",
		"puffinDevice"
	]) {
		let n = window[t];
		n && typeof n == "object" && e.push(t);
	}
	return e.sort();
}
function It() {
	let e = document;
	try {
		e.cookie = "cookietest=1; SameSite=Strict;";
		let t = e.cookie.indexOf("cookietest=") !== -1;
		return e.cookie = "cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT", t;
	} catch {
		return !1;
	}
}
function Lt() {
	let e = atob;
	return {
		abpIndo: [
			"#Iklan-Melayang",
			"#Kolom-Iklan-728",
			"#SidebarIklan-wrapper",
			"[title=\"ALIENBOLA\" i]",
			e("I0JveC1CYW5uZXItYWRz")
		],
		abpvn: [
			".quangcao",
			"#mobileCatfish",
			e("LmNsb3NlLWFkcw=="),
			"[id^=\"bn_bottom_fixed_\"]",
			"#pmadv"
		],
		adBlockFinland: [
			".mainostila",
			e("LnNwb25zb3JpdA=="),
			".ylamainos",
			e("YVtocmVmKj0iL2NsaWNrdGhyZ2guYXNwPyJd"),
			e("YVtocmVmXj0iaHR0cHM6Ly9hcHAucmVhZHBlYWsuY29tL2FkcyJd")
		],
		adBlockPersian: [
			"#navbar_notice_50",
			".kadr",
			"TABLE[width=\"140px\"]",
			"#divAgahi",
			e("YVtocmVmXj0iaHR0cDovL2cxLnYuZndtcm0ubmV0L2FkLyJd")
		],
		adBlockWarningRemoval: [
			"#adblock-honeypot",
			".adblocker-root",
			".wp_adblock_detect",
			e("LmhlYWRlci1ibG9ja2VkLWFk"),
			e("I2FkX2Jsb2NrZXI=")
		],
		adGuardAnnoyances: [
			".hs-sosyal",
			"#cookieconsentdiv",
			"div[class^=\"app_gdpr\"]",
			".as-oil",
			"[data-cypress=\"soft-push-notification-modal\"]"
		],
		adGuardBase: [
			".BetterJsPopOverlay",
			e("I2FkXzMwMFgyNTA="),
			e("I2Jhbm5lcmZsb2F0MjI="),
			e("I2NhbXBhaWduLWJhbm5lcg=="),
			e("I0FkLUNvbnRlbnQ=")
		],
		adGuardChinese: [
			e("LlppX2FkX2FfSA=="),
			e("YVtocmVmKj0iLmh0aGJldDM0LmNvbSJd"),
			"#widget-quan",
			e("YVtocmVmKj0iLzg0OTkyMDIwLnh5eiJd"),
			e("YVtocmVmKj0iLjE5NTZobC5jb20vIl0=")
		],
		adGuardFrench: [
			"#pavePub",
			e("LmFkLWRlc2t0b3AtcmVjdGFuZ2xl"),
			".mobile_adhesion",
			".widgetadv",
			e("LmFkc19iYW4=")
		],
		adGuardGerman: ["aside[data-portal-id=\"leaderboard\"]"],
		adGuardJapanese: [
			"#kauli_yad_1",
			e("YVtocmVmXj0iaHR0cDovL2FkMi50cmFmZmljZ2F0ZS5uZXQvIl0="),
			e("Ll9wb3BJbl9pbmZpbml0ZV9hZA=="),
			e("LmFkZ29vZ2xl"),
			e("Ll9faXNib29zdFJldHVybkFk")
		],
		adGuardMobile: [
			e("YW1wLWF1dG8tYWRz"),
			e("LmFtcF9hZA=="),
			"amp-embed[type=\"24smi\"]",
			"#mgid_iframe1",
			e("I2FkX2ludmlld19hcmVh")
		],
		adGuardRussian: [
			e("YVtocmVmXj0iaHR0cHM6Ly9hZC5sZXRtZWFkcy5jb20vIl0="),
			e("LnJlY2xhbWE="),
			"div[id^=\"smi2adblock\"]",
			e("ZGl2W2lkXj0iQWRGb3hfYmFubmVyXyJd"),
			"#psyduckpockeball"
		],
		adGuardSocial: [
			e("YVtocmVmXj0iLy93d3cuc3R1bWJsZXVwb24uY29tL3N1Ym1pdD91cmw9Il0="),
			e("YVtocmVmXj0iLy90ZWxlZ3JhbS5tZS9zaGFyZS91cmw/Il0="),
			".etsy-tweet",
			"#inlineShare",
			".popup-social"
		],
		adGuardSpanishPortuguese: [
			"#barraPublicidade",
			"#Publicidade",
			"#publiEspecial",
			"#queTooltip",
			".cnt-publi"
		],
		adGuardTrackingProtection: [
			"#qoo-counter",
			e("YVtocmVmXj0iaHR0cDovL2NsaWNrLmhvdGxvZy5ydS8iXQ=="),
			e("YVtocmVmXj0iaHR0cDovL2hpdGNvdW50ZXIucnUvdG9wL3N0YXQucGhwIl0="),
			e("YVtocmVmXj0iaHR0cDovL3RvcC5tYWlsLnJ1L2p1bXAiXQ=="),
			"#top100counter"
		],
		adGuardTurkish: [
			"#backkapat",
			e("I3Jla2xhbWk="),
			e("YVtocmVmXj0iaHR0cDovL2Fkc2Vydi5vbnRlay5jb20udHIvIl0="),
			e("YVtocmVmXj0iaHR0cDovL2l6bGVuemkuY29tL2NhbXBhaWduLyJd"),
			e("YVtocmVmXj0iaHR0cDovL3d3dy5pbnN0YWxsYWRzLm5ldC8iXQ==")
		],
		bulgarian: [
			e("dGQjZnJlZW5ldF90YWJsZV9hZHM="),
			"#ea_intext_div",
			".lapni-pop-over",
			"#xenium_hot_offers"
		],
		easyList: [
			".yb-floorad",
			e("LndpZGdldF9wb19hZHNfd2lkZ2V0"),
			e("LnRyYWZmaWNqdW5reS1hZA=="),
			".textad_headline",
			e("LnNwb25zb3JlZC10ZXh0LWxpbmtz")
		],
		easyListChina: [
			e("LmFwcGd1aWRlLXdyYXBbb25jbGljayo9ImJjZWJvcy5jb20iXQ=="),
			e("LmZyb250cGFnZUFkdk0="),
			"#taotaole",
			"#aafoot.top_box",
			".cfa_popup"
		],
		easyListCookie: [
			".ezmob-footer",
			".cc-CookieWarning",
			"[data-cookie-number]",
			e("LmF3LWNvb2tpZS1iYW5uZXI="),
			".sygnal24-gdpr-modal-wrap"
		],
		easyListCzechSlovak: [
			"#onlajny-stickers",
			e("I3Jla2xhbW5pLWJveA=="),
			e("LnJla2xhbWEtbWVnYWJvYXJk"),
			".sklik",
			e("W2lkXj0ic2tsaWtSZWtsYW1hIl0=")
		],
		easyListDutch: [
			e("I2FkdmVydGVudGll"),
			e("I3ZpcEFkbWFya3RCYW5uZXJCbG9jaw=="),
			".adstekst",
			e("YVtocmVmXj0iaHR0cHM6Ly94bHR1YmUubmwvY2xpY2svIl0="),
			"#semilo-lrectangle"
		],
		easyListGermany: [
			"#SSpotIMPopSlider",
			e("LnNwb25zb3JsaW5rZ3J1ZW4="),
			e("I3dlcmJ1bmdza3k="),
			e("I3Jla2xhbWUtcmVjaHRzLW1pdHRl"),
			e("YVtocmVmXj0iaHR0cHM6Ly9iZDc0Mi5jb20vIl0=")
		],
		easyListItaly: [
			e("LmJveF9hZHZfYW5udW5jaQ=="),
			".sb-box-pubbliredazionale",
			e("YVtocmVmXj0iaHR0cDovL2FmZmlsaWF6aW9uaWFkcy5zbmFpLml0LyJd"),
			e("YVtocmVmXj0iaHR0cHM6Ly9hZHNlcnZlci5odG1sLml0LyJd"),
			e("YVtocmVmXj0iaHR0cHM6Ly9hZmZpbGlhemlvbmlhZHMuc25haS5pdC8iXQ==")
		],
		easyListLithuania: [
			e("LnJla2xhbW9zX3RhcnBhcw=="),
			e("LnJla2xhbW9zX251b3JvZG9z"),
			e("aW1nW2FsdD0iUmVrbGFtaW5pcyBza3lkZWxpcyJd"),
			e("aW1nW2FsdD0iRGVkaWt1b3RpLmx0IHNlcnZlcmlhaSJd"),
			e("aW1nW2FsdD0iSG9zdGluZ2FzIFNlcnZlcmlhaS5sdCJd")
		],
		estonian: [e("QVtocmVmKj0iaHR0cDovL3BheTRyZXN1bHRzMjQuZXUiXQ==")],
		fanboyAnnoyances: [
			"#ac-lre-player",
			".navigate-to-top",
			"#subscribe_popup",
			".newsletter_holder",
			"#back-top"
		],
		fanboyAntiFacebook: [".util-bar-module-firefly-visible"],
		fanboyEnhancedTrackers: [
			".open.pushModal",
			"#issuem-leaky-paywall-articles-zero-remaining-nag",
			"#sovrn_container",
			"div[class$=\"-hide\"][zoompage-fontsize][style=\"display: block;\"]",
			".BlockNag__Card"
		],
		fanboySocial: [
			"#FollowUs",
			"#meteored_share",
			"#social_follow",
			".article-sharer",
			".community__social-desc"
		],
		frellwitSwedish: [
			e("YVtocmVmKj0iY2FzaW5vcHJvLnNlIl1bdGFyZ2V0PSJfYmxhbmsiXQ=="),
			e("YVtocmVmKj0iZG9rdG9yLXNlLm9uZWxpbmsubWUiXQ=="),
			"article.category-samarbete",
			e("ZGl2LmhvbGlkQWRz"),
			"ul.adsmodern"
		],
		greekAdBlock: [
			e("QVtocmVmKj0iYWRtYW4ub3RlbmV0LmdyL2NsaWNrPyJd"),
			e("QVtocmVmKj0iaHR0cDovL2F4aWFiYW5uZXJzLmV4b2R1cy5nci8iXQ=="),
			e("QVtocmVmKj0iaHR0cDovL2ludGVyYWN0aXZlLmZvcnRobmV0LmdyL2NsaWNrPyJd"),
			"DIV.agores300",
			"TABLE.advright"
		],
		hungarian: [
			"#cemp_doboz",
			".optimonk-iframe-container",
			e("LmFkX19tYWlu"),
			e("W2NsYXNzKj0iR29vZ2xlQWRzIl0="),
			"#hirdetesek_box"
		],
		iDontCareAboutCookies: [
			".alert-info[data-block-track*=\"CookieNotice\"]",
			".ModuleTemplateCookieIndicator",
			".o--cookies--container",
			"#cookies-policy-sticky",
			"#stickyCookieBar"
		],
		icelandicAbp: [e("QVtocmVmXj0iL2ZyYW1ld29yay9yZXNvdXJjZXMvZm9ybXMvYWRzLmFzcHgiXQ==")],
		latvian: [e("YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMjBweDsgaGVpZ2h0OiA0MHB4OyBvdmVyZmxvdzogaGlkZGVuOyBwb3NpdGlvbjogcmVsYXRpdmU7Il0="), e("YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiA4OHB4OyBoZWlnaHQ6IDMxcHg7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiByZWxhdGl2ZTsiXQ==")],
		listKr: [
			e("YVtocmVmKj0iLy9hZC5wbGFuYnBsdXMuY28ua3IvIl0="),
			e("I2xpdmVyZUFkV3JhcHBlcg=="),
			e("YVtocmVmKj0iLy9hZHYuaW1hZHJlcC5jby5rci8iXQ=="),
			e("aW5zLmZhc3R2aWV3LWFk"),
			".revenue_unit_item.dable"
		],
		listeAr: [
			e("LmdlbWluaUxCMUFk"),
			".right-and-left-sponsers",
			e("YVtocmVmKj0iLmFmbGFtLmluZm8iXQ=="),
			e("YVtocmVmKj0iYm9vcmFxLm9yZyJd"),
			e("YVtocmVmKj0iZHViaXp6bGUuY29tL2FyLz91dG1fc291cmNlPSJd")
		],
		listeFr: [
			e("YVtocmVmXj0iaHR0cDovL3Byb21vLnZhZG9yLmNvbS8iXQ=="),
			e("I2FkY29udGFpbmVyX3JlY2hlcmNoZQ=="),
			e("YVtocmVmKj0id2Vib3JhbWEuZnIvZmNnaS1iaW4vIl0="),
			".site-pub-interstitiel",
			"div[id^=\"crt-\"][data-criteo-id]"
		],
		officialPolish: [
			"#ceneo-placeholder-ceneo-12",
			e("W2hyZWZePSJodHRwczovL2FmZi5zZW5kaHViLnBsLyJd"),
			e("YVtocmVmXj0iaHR0cDovL2Fkdm1hbmFnZXIudGVjaGZ1bi5wbC9yZWRpcmVjdC8iXQ=="),
			e("YVtocmVmXj0iaHR0cDovL3d3dy50cml6ZXIucGwvP3V0bV9zb3VyY2UiXQ=="),
			e("ZGl2I3NrYXBpZWNfYWQ=")
		],
		ro: [
			e("YVtocmVmXj0iLy9hZmZ0cmsuYWx0ZXgucm8vQ291bnRlci9DbGljayJd"),
			e("YVtocmVmXj0iaHR0cHM6Ly9ibGFja2ZyaWRheXNhbGVzLnJvL3Ryay9zaG9wLyJd"),
			e("YVtocmVmXj0iaHR0cHM6Ly9ldmVudC4ycGVyZm9ybWFudC5jb20vZXZlbnRzL2NsaWNrIl0="),
			e("YVtocmVmXj0iaHR0cHM6Ly9sLnByb2ZpdHNoYXJlLnJvLyJd"),
			"a[href^=\"/url/\"]"
		],
		ruAd: [
			e("YVtocmVmKj0iLy9mZWJyYXJlLnJ1LyJd"),
			e("YVtocmVmKj0iLy91dGltZy5ydS8iXQ=="),
			e("YVtocmVmKj0iOi8vY2hpa2lkaWtpLnJ1Il0="),
			"#pgeldiz",
			".yandex-rtb-block"
		],
		thaiAds: [
			"a[href*=macau-uta-popup]",
			e("I2Fkcy1nb29nbGUtbWlkZGxlX3JlY3RhbmdsZS1ncm91cA=="),
			e("LmFkczMwMHM="),
			".bumq",
			".img-kosana"
		],
		webAnnoyancesUltralist: [
			"#mod-social-share-2",
			"#social-tools",
			e("LmN0cGwtZnVsbGJhbm5lcg=="),
			".zergnet-recommend",
			".yt.btn-link.btn-md.btn"
		]
	};
}
async function Rt({ debug: e } = {}) {
	if (!zt()) return;
	let t = Lt(), n = Object.keys(t), r = await Bt([].concat(...n.map((e) => t[e])));
	e && Ht(t, r);
	let i = n.filter((e) => {
		let n = t[e];
		return p(n.map((e) => r[e])) > n.length * .6;
	});
	return i.sort(), i;
}
function zt() {
	return y() || Ne();
}
async function Bt(e) {
	var n;
	let r = document, i = r.createElement("div"), a = Array(e.length), o = {};
	Vt(i);
	for (let t = 0; t < e.length; ++t) {
		let n = Ue(e[t]);
		n.tagName === "DIALOG" && n.show();
		let o = r.createElement("div");
		Vt(o), o.appendChild(n), i.appendChild(o), a[t] = n;
	}
	for (; !r.body;) await t(50);
	r.body.appendChild(i);
	try {
		for (let t = 0; t < e.length; ++t) a[t].offsetParent || (o[e[t]] = !0);
	} finally {
		(n = i.parentNode) == null || n.removeChild(i);
	}
	return o;
}
function Vt(e) {
	e.style.setProperty("visibility", "hidden", "important"), e.style.setProperty("display", "block", "important");
}
function Ht(e, t) {
	let n = "DOM blockers debug:\n```";
	for (let r of Object.keys(e)) {
		n += `\n${r}:`;
		for (let i of e[r]) n += `\n  ${t[i] ? "🚫" : "➡️"} ${i}`;
	}
	console.log(`${n}\n\`\`\``);
}
function Ut() {
	for (let e of [
		"rec2020",
		"p3",
		"srgb"
	]) if (matchMedia(`(color-gamut: ${e})`).matches) return e;
}
function Wt() {
	if (Gt("inverted")) return !0;
	if (Gt("none")) return !1;
}
function Gt(e) {
	return matchMedia(`(inverted-colors: ${e})`).matches;
}
function Kt() {
	if (qt("active")) return !0;
	if (qt("none")) return !1;
}
function qt(e) {
	return matchMedia(`(forced-colors: ${e})`).matches;
}
var Jt = 100;
function Yt() {
	if (matchMedia("(min-monochrome: 0)").matches) {
		for (let e = 0; e <= Jt; ++e) if (matchMedia(`(max-monochrome: ${e})`).matches) return e;
		throw Error("Too high value");
	}
}
function Xt() {
	if (Zt("no-preference")) return 0;
	if (Zt("high") || Zt("more")) return 1;
	if (Zt("low") || Zt("less")) return -1;
	if (Zt("forced")) return 10;
}
function Zt(e) {
	return matchMedia(`(prefers-contrast: ${e})`).matches;
}
function Qt() {
	if ($t("reduce")) return !0;
	if ($t("no-preference")) return !1;
}
function $t(e) {
	return matchMedia(`(prefers-reduced-motion: ${e})`).matches;
}
function en() {
	if (tn("reduce")) return !0;
	if (tn("no-preference")) return !1;
}
function tn(e) {
	return matchMedia(`(prefers-reduced-transparency: ${e})`).matches;
}
function nn() {
	if (rn("high")) return !0;
	if (rn("standard")) return !1;
}
function rn(e) {
	return matchMedia(`(dynamic-range: ${e})`).matches;
}
var b = Math, x = () => 0;
function an() {
	let e = b.acos || x, t = b.acosh || x, n = b.asin || x, r = b.asinh || x, i = b.atanh || x, a = b.atan || x, o = b.sin || x, s = b.sinh || x, c = b.cos || x, l = b.cosh || x, u = b.tan || x, d = b.tanh || x, f = b.exp || x, p = b.expm1 || x, m = b.log1p || x;
	return {
		acos: e(.12312423423423424),
		acosh: t(1e308),
		acoshPf: ((e) => b.log(e + b.sqrt(e * e - 1)))(1e154),
		asin: n(.12312423423423424),
		asinh: r(1),
		asinhPf: ((e) => b.log(e + b.sqrt(e * e + 1)))(1),
		atanh: i(.5),
		atanhPf: ((e) => b.log((1 + e) / (1 - e)) / 2)(.5),
		atan: a(.5),
		sin: o(-1e300),
		sinh: s(1),
		sinhPf: ((e) => b.exp(e) - 1 / b.exp(e) / 2)(1),
		cos: c(10.000000000123),
		cosh: l(1),
		coshPf: ((e) => (b.exp(e) + 1 / b.exp(e)) / 2)(1),
		tan: u(-1e300),
		tanh: d(1),
		tanhPf: ((e) => (b.exp(2 * e) - 1) / (b.exp(2 * e) + 1))(1),
		exp: f(1),
		expm1: p(1),
		expm1Pf: ((e) => b.exp(e) - 1)(1),
		log1p: m(10),
		log1pPf: ((e) => b.log(1 + e))(10),
		powPI: ((e) => b.pow(b.PI, e))(-100)
	};
}
var on = "mmMwWLliI0fiflO&1", sn = {
	default: [],
	apple: [{ font: "-apple-system-body" }],
	serif: [{ fontFamily: "serif" }],
	sans: [{ fontFamily: "sans-serif" }],
	mono: [{ fontFamily: "monospace" }],
	min: [{ fontSize: "1px" }],
	system: [{ fontFamily: "system-ui" }]
};
function cn() {
	return un((e, t, n) => {
		let r = {}, i = {};
		for (let n of Object.keys(sn)) {
			let [i = {}, a = on] = sn[n], o = e.createElement("span");
			o.textContent = a, o.style.whiteSpace = "nowrap";
			for (let e of Object.keys(i)) {
				let t = i[e];
				t !== void 0 && (o.style[e] = t);
			}
			r[n] = o, t.append(e.createElement("br"), o);
		}
		let a = ye() && De();
		for (let e of Object.keys(sn)) {
			let t = r[e].getBoundingClientRect().width;
			i[e] = a ? ln(t * n.devicePixelRatio) : t;
		}
		return i;
	});
}
function ln(e) {
	let t = 10 ** (Ne() ? 0 : 3);
	return Math.floor(e * t) / t;
}
function un(e, t = 4e3) {
	return He((n, r) => {
		let i = r.document, a = i.body, o = a.style;
		o.width = `${t}px`, o.webkitTextSizeAdjust = o.textSizeAdjust = "none", ye() ? a.style.zoom = `${1 / r.devicePixelRatio}` : y() && (a.style.zoom = "reset");
		let s = i.createElement("div");
		return s.textContent = [...Array(t / 20 << 0)].map(() => "word").join(" "), a.appendChild(s), e(i, a, r);
	}, "<!doctype html><html><head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
}
function dn() {
	return navigator.pdfViewerEnabled;
}
function fn() {
	let e = /* @__PURE__ */ new Float32Array(1), t = new Uint8Array(e.buffer);
	return e[0] = Infinity, e[0] -= e[0], t[3];
}
function pn() {
	let { ApplePaySession: e } = window;
	if (typeof e?.canMakePayments != "function") return -1;
	if (mn()) return -3;
	try {
		return +!!e.canMakePayments();
	} catch (e) {
		return hn(e);
	}
}
var mn = Ge;
function hn(e) {
	if (e instanceof Error && e.name === "InvalidAccessError" && /\bfrom\b.*\binsecure\b/i.test(e.message)) return -2;
	throw e;
}
function gn() {
	let e = document.createElement("a"), t = e.attributionSourceId ?? e.attributionsourceid;
	return t === void 0 ? void 0 : String(t);
}
var _n = -1, vn = -2, yn = /* @__PURE__ */ new Set([
	10752,
	2849,
	2884,
	2885,
	2886,
	2928,
	2929,
	2930,
	2931,
	2932,
	2960,
	2961,
	2962,
	2963,
	2964,
	2965,
	2966,
	2967,
	2968,
	2978,
	3024,
	3042,
	3088,
	3089,
	3106,
	3107,
	32773,
	32777,
	32777,
	32823,
	32824,
	32936,
	32937,
	32938,
	32939,
	32968,
	32969,
	32970,
	32971,
	3317,
	33170,
	3333,
	3379,
	3386,
	33901,
	33902,
	34016,
	34024,
	34076,
	3408,
	3410,
	3411,
	3412,
	3413,
	3414,
	3415,
	34467,
	34816,
	34817,
	34818,
	34819,
	34877,
	34921,
	34930,
	35660,
	35661,
	35724,
	35738,
	35739,
	36003,
	36004,
	36005,
	36347,
	36348,
	36349,
	37440,
	37441,
	37443,
	7936,
	7937,
	7938
]), bn = /* @__PURE__ */ new Set([
	34047,
	35723,
	36063,
	34852,
	34853,
	34854,
	34229,
	36392,
	36795,
	38449
]), xn = ["FRAGMENT_SHADER", "VERTEX_SHADER"], Sn = [
	"LOW_FLOAT",
	"MEDIUM_FLOAT",
	"HIGH_FLOAT",
	"LOW_INT",
	"MEDIUM_INT",
	"HIGH_INT"
], Cn = "WEBGL_debug_renderer_info", wn = "WEBGL_polygon_mode";
function Tn({ cache: e }) {
	let t = Dn(e);
	if (!t) return _n;
	if (!Nn(t)) return vn;
	let n = jn() ? null : t.getExtension(Cn);
	return {
		version: t.getParameter(t.VERSION)?.toString() || "",
		vendor: t.getParameter(t.VENDOR)?.toString() || "",
		vendorUnmasked: n ? t.getParameter(n.UNMASKED_VENDOR_WEBGL)?.toString() : "",
		renderer: t.getParameter(t.RENDERER)?.toString() || "",
		rendererUnmasked: n ? t.getParameter(n.UNMASKED_RENDERER_WEBGL)?.toString() : "",
		shadingLanguageVersion: t.getParameter(t.SHADING_LANGUAGE_VERSION)?.toString() || ""
	};
}
function En({ cache: e }) {
	let t = Dn(e);
	if (!t) return _n;
	if (!Nn(t)) return vn;
	let n = t.getSupportedExtensions(), r = t.getContextAttributes(), i = [], a = [], o = [], s = [], c = [];
	if (r) for (let e of Object.keys(r)) a.push(`${e}=${r[e]}`);
	let l = kn(t);
	for (let e of l) {
		let n = t[e];
		o.push(`${e}=${n}${yn.has(n) ? `=${t.getParameter(n)}` : ""}`);
	}
	if (n) for (let e of n) {
		if (e === Cn && jn() || e === wn && Mn()) continue;
		let n = t.getExtension(e);
		if (!n) {
			i.push(e);
			continue;
		}
		for (let e of kn(n)) {
			let r = n[e];
			s.push(`${e}=${r}${bn.has(r) ? `=${t.getParameter(r)}` : ""}`);
		}
	}
	for (let e of xn) for (let n of Sn) {
		let r = On(t, e, n);
		c.push(`${e}.${n}=${r.join(",")}`);
	}
	return s.sort(), o.sort(), {
		contextAttributes: a,
		parameters: o,
		shaderPrecisions: c,
		extensions: n,
		extensionParameters: s,
		unsupportedExtensions: i
	};
}
function Dn(e) {
	if (e.webgl) return e.webgl.context;
	let t = document.createElement("canvas"), n;
	t.addEventListener("webglCreateContextError", () => n = void 0);
	for (let e of ["webgl", "experimental-webgl"]) {
		try {
			n = t.getContext(e);
		} catch {}
		if (n) break;
	}
	return e.webgl = { context: n }, n;
}
function On(e, t, n) {
	let r = e.getShaderPrecisionFormat(e[t], e[n]);
	return r ? [
		r.rangeMin,
		r.rangeMax,
		r.precision
	] : [];
}
function kn(e) {
	return Object.keys(e.__proto__).filter(An);
}
function An(e) {
	return typeof e == "string" && !e.match(/[^A-Z0-9_x]/);
}
function jn() {
	return Se();
}
function Mn() {
	return ye() || y();
}
function Nn(e) {
	return typeof e.getParameter == "function";
}
function Pn() {
	if (!(Ne() || y())) return -2;
	if (!window.AudioContext) return -1;
	let e = new AudioContext().baseLatency;
	return e == null ? -1 : isFinite(e) ? e : -3;
}
function Fn() {
	if (!window.Intl) return -1;
	let e = window.Intl.DateTimeFormat;
	if (!e) return -2;
	let t = e().resolvedOptions().locale;
	return !t && t !== "" ? -3 : t;
}
function In(e) {
	return /not/i.test(e);
}
async function Ln() {
	let e = navigator.userAgentData;
	if (!e) return;
	let t = e.brands.filter(({ brand: e }) => !In(e)).map(({ brand: e }) => e), n = {
		brands: t.length > 1 ? t.filter((e) => e !== "Chromium") : t,
		mobile: e.mobile,
		platform: e.platform
	};
	if (e.getHighEntropyValues) try {
		let t = await e.getHighEntropyValues([
			"architecture",
			"bitness",
			"model",
			"platformVersion"
		]);
		n.architecture = t.architecture, n.bitness = t.bitness, n.model = t.model, n.platformVersion = t.platformVersion;
	} catch (e) {
		if (e instanceof DOMException && e.name === "NotAllowedError") n.highEntropyStatus = "not_allowed";
		else throw e;
	}
	return n;
}
var Rn = {
	userAgentData: Ln,
	fonts: Xe,
	domBlockers: Rt,
	fontPreferences: cn,
	audio: Fe,
	screenFrame: xt,
	canvas: Qe,
	osCpu: lt,
	languages: ut,
	colorDepth: dt,
	deviceMemory: ft,
	screenResolution: pt,
	hardwareConcurrency: wt,
	timezone: Et,
	sessionStorage: Ot,
	localStorage: kt,
	indexedDB: At,
	openDatabase: jt,
	cpuClass: Mt,
	platform: Nt,
	plugins: Ze,
	touchSupport: ct,
	vendor: Pt,
	vendorFlavors: Ft,
	cookiesEnabled: It,
	colorGamut: Ut,
	invertedColors: Wt,
	forcedColors: Kt,
	monochrome: Yt,
	contrast: Xt,
	reducedMotion: Qt,
	reducedTransparency: en,
	hdr: nn,
	math: an,
	pdfViewerEnabled: dn,
	architecture: fn,
	applePay: pn,
	privateClickMeasurement: gn,
	audioBaseLatency: Pn,
	dateTimeLocale: Fn,
	webGlBasics: Tn,
	webGlExtensions: En
};
function zn(e) {
	return ge(Rn, e, []);
}
var Bn = "$ if upgrade to Pro: https://fingerprint.com/github/?utm_source=oss&utm_medium=referral&utm_campaign=confidence_score";
function Vn(e) {
	let t = Hn(e), n = Un(t);
	return {
		score: t,
		comment: Bn.replace(/\$/g, `${n}`)
	};
}
function Hn(e) {
	if (Ne()) return .4;
	if (y()) return be() && !(ke() && xe()) ? .5 : .3;
	let t = "value" in e.platform ? e.platform.value : "";
	return /^Win/.test(t) ? .6 : /^Mac/.test(t) ? .5 : .7;
}
function Un(e) {
	return m(.99 + .01 * e, 1e-4);
}
function Wn(e) {
	let t = "";
	for (let n of Object.keys(e).sort()) {
		let r = e[n], i = "error" in r ? "error" : JSON.stringify(r.value);
		t += `${t ? "|" : ""}${n.replace(/([:|\\])/g, "\\$1")}:${i}`;
	}
	return t;
}
function Gn(e) {
	return JSON.stringify(e, (e, t) => t instanceof Error ? fe(t) : t, 2);
}
function Kn(e) {
	return de(Wn(e));
}
function qn(t) {
	let n;
	return {
		get visitorId() {
			return n === void 0 && (n = Kn(this.components)), n;
		},
		set visitorId(e) {
			n = e;
		},
		confidence: Vn(t),
		components: t,
		version: e
	};
}
function Jn(e = 50) {
	return r(e, e * 2);
}
function Yn(e, t) {
	let n = Date.now();
	return { async get(r) {
		let i = Date.now(), a = await e(), o = qn(a);
		return (t || r?.debug) && console.log(`Copy the text below to get the debug data:

\`\`\`
version: ${o.version}
userAgent: ${navigator.userAgent}
timeBetweenLoadAndGet: ${i - n}
visitorId: ${o.visitorId}
components: ${Gn(a)}
\`\`\``), o;
	} };
}
function Xn() {
	if (!(window.__fpjs_d_m || Math.random() >= .001)) try {
		let t = new XMLHttpRequest();
		t.open("get", `https://m1.openfpcdn.io/fingerprintjs/v${e}/npm-monitoring`, !0), t.send();
	} catch (e) {
		console.error(e);
	}
}
async function Zn(e = {}) {
	let { delayFallback: t, debug: n, monitoring: r = !0 } = e;
	return r && Xn(), await Jn(t), Yn(zn({
		cache: {},
		debug: n
	}), n);
}
var Qn = {
	load: Zn,
	hashComponents: Kn,
	componentsToDebugString: Gn
}, $n = "2.0.10", er = 500, tr = "user-agent", nr = "", rr = "?", S = {
	FUNCTION: "function",
	OBJECT: "object",
	STRING: "string",
	UNDEFINED: "undefined"
}, C = "browser", w = "cpu", T = "device", E = "engine", D = "os", ir = "result", O = "name", k = "type", A = "vendor", j = "version", M = "architecture", ar = "major", N = "model", or = "console", P = "mobile", F = "tablet", I = "smarttv", L = "wearable", sr = "xr", cr = "embedded", lr = "fetcher", R = "inapp", ur = "brands", z = "formFactors", dr = "fullVersionList", fr = "platform", pr = "platformVersion", mr = "bitness", B = "sec-ch-ua", hr = B + "-full-version-list", gr = B + "-arch", _r = B + "-" + mr, vr = B + "-form-factors", yr = B + "-" + P, br = B + "-" + N, xr = B + "-" + fr, Sr = xr + "-version", Cr = [
	ur,
	dr,
	P,
	N,
	fr,
	pr,
	M,
	z,
	mr
], wr = "Amazon", Tr = "Apple", Er = "ASUS", Dr = "BlackBerry", V = "Google", Or = "Huawei", kr = "Lenovo", Ar = "Honor", jr = "LG", Mr = "Microsoft", Nr = "Motorola", Pr = "Nvidia", Fr = "OnePlus", Ir = "OPPO", Lr = "Samsung", Rr = "Sharp", zr = "Sony", Br = "Xiaomi", Vr = "Zebra", Hr = "Chrome", Ur = "Chromium", H = "Chromecast", Wr = "Edge", Gr = "Firefox", Kr = "Opera", qr = "Facebook", Jr = "Sogou", Yr = "Mobile ", U = " Browser", Xr = "Windows", W = typeof window !== S.UNDEFINED && window.navigator ? window.navigator : void 0, G = W && W.userAgentData ? W.userAgentData : void 0, Zr = function(e, t) {
	var n = {}, r = t;
	if (!ei(t)) for (var i in r = {}, t) for (var a in t[i]) r[a] = t[i][a].concat(r[a] ? r[a] : []);
	for (var o in e) n[o] = r[o] && r[o].length % 2 == 0 ? r[o].concat(e[o]) : e[o];
	return n;
}, Qr = function(e) {
	for (var t = {}, n = 0; n < e.length; n++) t[e[n].toUpperCase()] = e[n];
	return t;
}, $r = function(e, t) {
	if (typeof e === S.OBJECT && e.length > 0) {
		for (var n in e) if (K(t) == K(e[n])) return !0;
		return !1;
	}
	return ti(e) ? K(t) == K(e) : !1;
}, ei = function(e, t) {
	for (var n in e) return /^(browser|cpu|device|engine|os)$/.test(n) || (t ? ei(e[n]) : !1);
}, ti = function(e) {
	return typeof e === S.STRING;
}, ni = function(e) {
	if (e) {
		for (var t = [], n = ii(e).split(","), r = 0; r < n.length; r++) if (n[r].indexOf(";") > -1) {
			var i = oi(n[r]).split(";v=");
			t[r] = {
				brand: i[0],
				version: i[1]
			};
		} else t[r] = oi(n[r]);
		return t;
	}
}, K = function(e) {
	return ti(e) ? e.toLowerCase() : e;
}, ri = function(e) {
	return ti(e) ? ai(/[^\d\.]/g, e).split(".")[0] : void 0;
}, ii = function(e) {
	return ti(e) ? oi(ai(/\\?\"/g, e), er) : void 0;
}, q = function(e) {
	for (var t in e) if (e.hasOwnProperty(t)) {
		var n = e[t];
		typeof n == S.OBJECT && n.length == 2 ? this[n[0]] = n[1] : this[n] = void 0;
	}
	return this;
}, ai = function(e, t) {
	return ti(t) ? t.replace(e, nr) : t;
}, oi = function(e, t) {
	return e = ai(/^\s\s*/, String(e)), typeof t === S.UNDEFINED ? e : e.substring(0, t);
}, si = function(e, t) {
	if (!(!e || !t)) for (var n = 0, r, i, a, o, s, c; n < t.length && !s;) {
		var l = t[n], u = t[n + 1];
		for (r = i = 0; r < l.length && !s && l[r];) if (s = l[r++].exec(e), s) for (a = 0; a < u.length; a++) c = s[++i], o = u[a], typeof o === S.OBJECT && o.length > 0 ? o.length === 2 ? typeof o[1] == S.FUNCTION ? this[o[0]] = o[1].call(this, c) : this[o[0]] = o[1] : o.length >= 3 && (typeof o[1] === S.FUNCTION && !(o[1].exec && o[1].test) ? o.length > 3 ? this[o[0]] = c ? o[1].apply(this, o.slice(2)) : void 0 : this[o[0]] = c ? o[1].call(this, c, o[2]) : void 0 : o.length == 3 ? this[o[0]] = c ? c.replace(o[1], o[2]) : void 0 : o.length == 4 ? this[o[0]] = c ? o[3].call(this, c.replace(o[1], o[2])) : void 0 : o.length > 4 && (this[o[0]] = c ? o[3].apply(this, [c.replace(o[1], o[2])].concat(o.slice(4))) : void 0)) : this[o] = c || void 0;
		n += 2;
	}
}, ci = function(e, t) {
	return t.test.test(e) ? t.ifTrue : t.ifFalse;
}, J = function(e, t) {
	for (var n in t) if (typeof t[n] === S.OBJECT && t[n].length > 0) {
		for (var r = 0; r < t[n].length; r++) if ($r(t[n][r], e)) return n === rr ? void 0 : n;
	} else if ($r(t[n], e)) return n === rr ? void 0 : n;
	return t.hasOwnProperty("*") ? t["*"] : e;
}, li = {
	ME: "4.90",
	"NT 3.51": "3.51",
	"NT 4.0": "4.0",
	2e3: ["5.0", "5.01"],
	XP: ["5.1", "5.2"],
	Vista: "6.0",
	7: "6.1",
	8: "6.2",
	"8.1": "6.3",
	10: ["6.4", "10.0"],
	NT: ""
}, ui = {
	embedded: "Automotive",
	mobile: "Mobile",
	tablet: ["Tablet", "EInk"],
	smarttv: "TV",
	wearable: "Watch",
	xr: ["VR", "XR"],
	"?": ["Desktop", "Unknown"],
	"*": void 0
}, di = {
	Chrome: "Google Chrome",
	Edge: "Microsoft Edge",
	"Edge WebView2": "Microsoft Edge WebView2",
	"Chrome WebView": "Android WebView",
	"Chrome Headless": "HeadlessChrome",
	"Huawei Browser": "HuaweiBrowser",
	"MIUI Browser": "Miui Browser",
	"Opera Mobi": "OperaMobile",
	Yandex: "YaBrowser"
}, fi = {
	browser: [
		[/\b(?:crmo|crios)\/([\w\.]+)/i],
		[j, [O, Yr + "Chrome"]],
		[/webview.+edge\/([\w\.]+)/i],
		[
			j,
			[O, Wr + " WebView"],
			[k, R]
		],
		[/edg(?:e|ios|a)?\/([\w\.]+)/i],
		[j, [O, "Edge"]],
		[
			/(opera mini)\/([-\w\.]+)/i,
			/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
			/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i
		],
		[O, j],
		[/opios[\/ ]+([\w\.]+)/i],
		[j, [O, Kr + " Mini"]],
		[/\bop(?:rg)?x\/([\w\.]+)/i],
		[j, [O, Kr + " GX"]],
		[/\bopr\/([\w\.]+)/i],
		[j, [O, Kr]],
		[/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i],
		[j, [O, "Baidu"]],
		[/\b(?:mxbrowser|mxios|myie2)\/?([-\w\.]*)\b/i],
		[j, [O, "Maxthon"]],
		[
			/(kindle)\/([\w\.]+)/i,
			/(lunascape|maxthon|netfront|jasmine|blazer|sleipnir)[\/ ]?([\w\.]*)/i,
			/(avant|iemobile|slim(?:browser|boat|jet))[\/ ]?([\d\.]*)/i,
			/(?:ms|\()(ie) ([\w\.]+)/i,
			/(atlas|flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|qupzilla|falkon|rekonq|puffin|whale(?!.+naver)|qqbrowserlite|duckduckgo|klar|helio|(?=comodo_)?dragon|otter|dooble|(?:hi|lg |ovi|qute)browser|palemoon)\/v?([-\w\.]+)/i,
			/(brave)(?: chrome)?\/([\d\.]+)/i,
			/(aloha|heytap|ovi|115|surf|qwant)browser\/([\d\.]+)/i,
			/(qwant)(?:ios|mobile)\/([\d\.]+)/i,
			/(ecosia|weibo)(?:__| \w+@)([\d\.]+)/i
		],
		[O, j],
		[/quark(?:pc)?\/([-\w\.]+)/i],
		[j, [O, "Quark"]],
		[/\bddg\/([\w\.]+)/i],
		[j, [O, "DuckDuckGo"]],
		[/(?:\buc? ?browser|(?:juc.+)ucweb| ucpc)[\/ ]?([\w\.]+)/i],
		[j, [O, "UCBrowser"]],
		[
			/microm.+\bqbcore\/([\w\.]+)/i,
			/\bqbcore\/([\w\.]+).+microm/i,
			/micromessenger\/([\w\.]+)/i
		],
		[j, [O, "WeChat"]],
		[/konqueror\/([\w\.]+)/i],
		[j, [O, "Konqueror"]],
		[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
		[j, [O, "IE"]],
		[/ya(?:search)?browser\/([\w\.]+)/i],
		[j, [O, "Yandex"]],
		[/slbrowser\/([\w\.]+)/i],
		[j, [O, "Smart " + kr + U]],
		[/(av(?:ast|g|ira))\/([\w\.]+)/i],
		[[
			O,
			/(.+)/,
			"$1 Secure" + U
		], j],
		[/norton\/([\w\.]+)/i],
		[j, [O, "Norton Private" + U]],
		[/\bfocus\/([\w\.]+)/i],
		[j, [O, Gr + " Focus"]],
		[/ mms\/([\w\.]+)$/i],
		[j, [O, Kr + " Neon"]],
		[/ opt\/([\w\.]+)$/i],
		[j, [O, Kr + " Touch"]],
		[/coc_coc\w+\/([\w\.]+)/i],
		[j, [O, "Coc Coc"]],
		[/dolfin\/([\w\.]+)/i],
		[j, [O, "Dolphin"]],
		[/coast\/([\w\.]+)/i],
		[j, [O, Kr + " Coast"]],
		[/miuibrowser\/([\w\.]+)/i],
		[j, [O, "MIUI" + U]],
		[/fxios\/([\w\.-]+)/i],
		[j, [O, Yr + Gr]],
		[/\bqihoobrowser\/?([\w\.]*)/i],
		[j, [O, "360"]],
		[/\b(qq)\/([\w\.]+)/i],
		[[
			O,
			/(.+)/,
			"$1Browser"
		], j],
		[/(oculus|sailfish|huawei|vivo|pico)browser\/([\w\.]+)/i],
		[[
			O,
			/(.+)/,
			"$1" + U
		], j],
		[/ HBPC\/([\w\.]+)/],
		[j, [O, Or + U]],
		[/samsungbrowser\/([\w\.]+)/i],
		[j, [O, Lr + " Internet"]],
		[/metasr[\/ ]?([\d\.]+)/i],
		[j, [O, Jr + " Explorer"]],
		[/(sogou)mo\w+\/([\d\.]+)/i],
		[[O, Jr + " Mobile"], j],
		[
			/(electron)\/([\w\.]+) safari/i,
			/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
			/m?(qqbrowser|2345(?=browser|chrome|explorer))\w*[\/ ]?v?([\w\.]+)/i
		],
		[O, j],
		[/(lbbrowser|luakit|rekonq|steam(?= (clie|tenf|gameo)))/i],
		[O],
		[/ome\/([\w\.]+).+(iron(?= saf)|360(?=[es]e$))/i],
		[j, O],
		[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],
		[
			[O, qr],
			j,
			[k, R]
		],
		[
			/(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
			/(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
			/(daum)apps[\/ ]([\w\.]+)/i,
			/safari (line)\/([\w\.]+)/i,
			/\b(line)\/([\w\.]+)\/iab/i,
			/(alipay)client\/([\w\.]+)/i,
			/(twitter)(?:and| f.+e\/([\w\.]+))/i,
			/(bing)(?:web|sapphire)\/([\w\.]+)/i,
			/(instagram|snapchat|klarna)[\/ ]([-\w\.]+)/i
		],
		[
			O,
			j,
			[k, R]
		],
		[/\bgsa\/([\w\.]+) .*safari\//i],
		[
			j,
			[O, "GSA"],
			[k, R]
		],
		[/(?:musical_ly|trill)(?:.+app_?version\/|_)([\w\.]+)/i],
		[
			j,
			[O, "TikTok"],
			[k, R]
		],
		[/\[(linkedin)app\]/i],
		[O, [k, R]],
		[/(zalo(?:app)?)[\/\sa-z]*([\w\.-]+)/i],
		[
			[
				O,
				/(.+)/,
				"Zalo"
			],
			j,
			[k, R]
		],
		[/(chromium)[\/ ]([-\w\.]+)/i],
		[O, j],
		[/ome-(lighthouse)$/i],
		[O, [k, lr]],
		[/headlesschrome(?:\/([\w\.]+)| )/i],
		[j, [O, Hr + " Headless"]],
		[/wv\).+chrome\/([\w\.]+).+edgw\//i],
		[
			j,
			[O, Wr + " WebView2"],
			[k, R]
		],
		[/; wv\).+(chrome)\/([\w\.]+)/i],
		[
			[O, Hr + " WebView"],
			j,
			[k, R]
		],
		[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
		[j, [O, "Android" + U]],
		[/chrome\/([\w\.]+) mobile/i],
		[j, [O, Yr + "Chrome"]],
		[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],
		[O, j],
		[/version\/([\w\.\,]+) .*mobile(?:\/\w+ | ?)safari/i],
		[j, [O, Yr + "Safari"]],
		[/iphone .*mobile(?:\/\w+ | ?)safari/i],
		[[O, Yr + "Safari"]],
		[/version\/([\w\.\,]+) .*(safari)/i],
		[j, O],
		[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
		[O, [j, "1"]],
		[/(webkit|khtml)\/([\w\.]+)/i],
		[O, j],
		[/(?:mobile|tablet);.*(firefox)\/([\w\.-]+)/i],
		[[O, Yr + Gr], j],
		[/(navigator|netscape\d?)\/([-\w\.]+)/i],
		[[O, "Netscape"], j],
		[/(wolvic|librewolf)\/([\w\.]+)/i],
		[O, j],
		[/mobile vr; rv:([\w\.]+)\).+firefox/i],
		[j, [O, Gr + " Reality"]],
		[
			/ekiohf.+(flow)\/([\w\.]+)/i,
			/(swiftfox)/i,
			/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror)[\/ ]?([\w\.\+]+)/i,
			/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|basilisk|waterfox)\/([-\w\.]+)$/i,
			/(firefox)\/([\w\.]+)/i,
			/(mozilla)\/([\w\.]+(?= .+rv\:.+gecko\/\d+)|[0-4][\w\.]+(?!.+compatible))/i,
			/(amaya|dillo|doris|icab|ladybird|lynx|mosaic|netsurf|obigo|polaris|w3m|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
			/\b(links) \(([\w\.]+)/i
		],
		[O, [
			j,
			/_/g,
			"."
		]],
		[/(cobalt)\/([\w\.]+)/i],
		[O, [
			j,
			/[^\d\.]+./,
			nr
		]]
	],
	cpu: [
		[/\b((amd|x|x86[-_]?|wow|win)64)\b/i],
		[[M, "amd64"]],
		[/(ia32(?=;))/i, /\b((i[346]|x)86)(pc)?\b/i],
		[[M, "ia32"]],
		[/\b(aarch64|arm(v?[89]e?l?|_?64))\b/i],
		[[M, "arm64"]],
		[/\b(arm(v[67])?ht?n?[fl]p?)\b/i],
		[[M, "armhf"]],
		[/( (ce|mobile); ppc;|\/[\w\.]+arm\b)/i],
		[[M, "arm"]],
		[/ sun4\w[;\)]/i],
		[[M, "sparc"]],
		[
			/\b(avr32|ia64(?=;)|68k(?=\))|\barm(?=v([1-7]|[5-7]1)l?|;|eabi)|(irix|mips|sparc)(64)?\b|pa-risc)/i,
			/((ppc|powerpc)(64)?)( mac|;|\))/i,
			/(?:osf1|[freopnt]{3,4}bsd) (alpha)/i
		],
		[[
			M,
			/ower/,
			nr,
			K
		]],
		[/mc680.0/i],
		[[M, "68k"]],
		[/winnt.+\[axp/i],
		[[M, "alpha"]]
	],
	device: [
		[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],
		[
			N,
			[A, Lr],
			[k, F]
		],
		[
			/\b((?:s[cgp]h|gt|sm)-(?![lr])\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
			/samsung[- ]((?!sm-[lr]|browser)[-\w]+)/i,
			/sec-(sgh\w+)/i
		],
		[
			N,
			[A, Lr],
			[k, P]
		],
		[/(?:\/|\()(ip(?:hone|od)[\w, ]*)[\/\);]/i],
		[
			N,
			[A, Tr],
			[k, P]
		],
		[/\b(?:ios|apple\w+)\/.+[\(\/](ipad)/i, /\b(ipad)[\d,]*[;\] ].+(mac |i(pad)?)os/i],
		[
			N,
			[A, Tr],
			[k, F]
		],
		[/(macintosh);/i],
		[N, [A, Tr]],
		[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
		[
			N,
			[A, Rr],
			[k, P]
		],
		[/\b((?:brt|eln|hey2?|gdi|jdn)-a?[lnw]09|(?:ag[rm]3?|jdn2|kob2)-a?[lw]0[09]hn)(?: bui|\)|;)/i],
		[
			N,
			[A, Ar],
			[k, F]
		],
		[/honor([-\w ]+)[;\)]/i],
		[
			N,
			[A, Ar],
			[k, P]
		],
		[/\b((?:ag[rs][2356]?k?|bah[234]?|bg[2o]|bt[kv]|cmr|cpn|db[ry]2?|jdn2|got|kob2?k?|mon|pce|scm|sht?|[tw]gr|vrd)-[ad]?[lw][0125][09]b?|605hw|bg2-u03|(?:gem|fdr|m2|ple|t1)-[7a]0[1-4][lu]|t1-a2[13][lw]|mediapad[\w\. ]*(?= bui|\)))\b(?!.+d\/s)/i],
		[
			N,
			[A, Or],
			[k, F]
		],
		[/(?:huawei) ?([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][\dc][adnt]?)\b(?!.+d\/s)/i],
		[
			N,
			[A, Or],
			[k, P]
		],
		[/oid[^\)]+; (2[\dbc]{4}(182|283|rp\w{2})[cgl]|m2105k81a?c)(?: bui|\))/i, /\b(?:xiao)?((?:red)?mi[-_ ]?pad[\w- ]*)(?: bui|\))/i],
		[
			[
				N,
				/_/g,
				" "
			],
			[A, Br],
			[k, F]
		],
		[
			/\b; (\w+) build\/hm\1/i,
			/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
			/oid[^\)]+; (redmi[\-_ ]?(?:note|k)?[\w_ ]+|m?[12]\d[01]\d\w{3,6}|poco[\w ]+|(shark )?\w{3}-[ah]0|qin ?[1-3](s\+|ultra| pro)?)( bui|; wv|\))/i,
			/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note|max|cc)?[_ ]?(?:\d{0,2}\w?)[_ ]?(?:plus|se|lite|pro)?( 5g|lte)?)(?: bui|\))/i,
			/; ([\w ]+) miui\/v?\d/i
		],
		[
			[
				N,
				/_/g,
				" "
			],
			[A, Br],
			[k, P]
		],
		[/droid.+; (cph2[3-6]\d[13579]|((gm|hd)19|(ac|be|in|kb)20|(d[en]|eb|le|mt)21|ne22)[0-2]\d|p[g-l]\w[1m]10)\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],
		[
			N,
			[A, Fr],
			[k, P]
		],
		[/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],
		[
			N,
			[A, Ir],
			[k, P]
		],
		[/\b(opd2(\d{3}a?))(?: bui|\))/i],
		[
			N,
			[
				A,
				J,
				{
					OnePlus: [
						"203",
						"304",
						"403",
						"404",
						"413",
						"415"
					],
					"*": Ir
				}
			],
			[k, F]
		],
		[/(vivo (5r?|6|8l?|go|one|s|x[il]?[2-4]?)[\w\+ ]*)(?: bui|\))/i],
		[
			N,
			[A, "BLU"],
			[k, P]
		],
		[/; vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
		[
			N,
			[A, "Vivo"],
			[k, P]
		],
		[/\b(rmx[1-3]\d{3})(?: bui|;|\))/i],
		[
			N,
			[A, "Realme"],
			[k, P]
		],
		[/(ideatab[-\w ]+|602lv|d-42a|a101lv|a2109a|a3500-hv|s[56]000|pb-6505[my]|tb-?x?\d{3,4}(?:f[cu]|xu|[av])|yt\d?-[jx]?\d+[lfmx])( bui|;|\)|\/)/i, /lenovo ?(b[68]0[08]0-?[hf]?|tab(?:[\w- ]+?)|tb[\w-]{6,7})( bui|;|\)|\/)/i],
		[
			N,
			[A, kr],
			[k, F]
		],
		[/lenovo[-_ ]?([-\w ]+?)(?: bui|\)|\/)/i],
		[
			N,
			[A, kr],
			[k, P]
		],
		[
			/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
			/\bmot(?:orola)?[- ]([\w\s]+)(\)| bui)/i,
			/((?:moto(?! 360)[-\w\(\) ]+|xt\d{3,4}[cgkosw\+]?[-\d]*|nexus 6)(?= bui|\)))/i
		],
		[
			N,
			[A, Nr],
			[k, P]
		],
		[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
		[
			N,
			[A, Nr],
			[k, F]
		],
		[/\b(?:lg)?([vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],
		[
			N,
			[A, jr],
			[k, F]
		],
		[
			/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
			/\blg[-e;\/ ]+(?!.*(?:browser|netcast|android tv|watch|webos))(\w+)/i,
			/\blg-?([\d\w]+) bui/i
		],
		[
			N,
			[A, jr],
			[k, P]
		],
		[/(nokia) (t[12][01])/i],
		[
			A,
			N,
			[k, F]
		],
		[/(?:maemo|nokia).*(n900|lumia \d+|rm-\d+)/i, /nokia[-_ ]?(([-\w\. ]*?))( bui|\)|;|\/)/i],
		[
			[
				N,
				/_/g,
				" "
			],
			[k, P],
			[A, "Nokia"]
		],
		[/(pixel (c|tablet))\b/i],
		[
			N,
			[A, V],
			[k, F]
		],
		[/droid.+;(?: google)? (g(01[13]a|020[aem]|025[jn]|1b60|1f8f|2ybb|4s1m|576d|5nz6|8hhn|8vou|a02099|c15s|d1yq|e2ae|ec77|gh2x|kv4x|p4bc|pj41|r83y|tt9q|ur25|wvk6)|pixel[\d ]*a?( pro)?( xl)?( fold)?( \(5g\))?)( bui|\))/i],
		[
			N,
			[A, V],
			[k, P]
		],
		[/(google) (pixelbook( go)?)/i],
		[A, N],
		[/droid.+; (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-\w\w\d\d)(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],
		[
			N,
			[A, zr],
			[k, P]
		],
		[/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
		[
			[N, "Xperia Tablet"],
			[A, zr],
			[k, F]
		],
		[
			/(alexa)webm/i,
			/(kf[a-z]{2}wi|aeo(?!bc)\w\w)( bui|\))/i,
			/(kf[a-z]+)( bui|\)).+silk\//i
		],
		[
			N,
			[A, wr],
			[k, F]
		],
		[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
		[
			[
				N,
				/(.+)/g,
				"Fire Phone $1"
			],
			[A, wr],
			[k, P]
		],
		[/(playbook);[-\w\),; ]+(rim)/i],
		[
			N,
			A,
			[k, F]
		],
		[/\b((?:bb[a-f]|st[hv])100-\d)/i, /(?:blackberry|\(bb10;) (\w+)/i],
		[
			N,
			[A, Dr],
			[k, P]
		],
		[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],
		[
			N,
			[A, Er],
			[k, F]
		],
		[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
		[
			N,
			[A, Er],
			[k, P]
		],
		[/(nexus 9)/i],
		[
			N,
			[A, "HTC"],
			[k, F]
		],
		[
			/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
			/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
			/(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i
		],
		[
			A,
			[
				N,
				/_/g,
				" "
			],
			[k, P]
		],
		[/tcl (xess p17aa)/i, /droid [\w\.]+; ((?:8[14]9[16]|9(?:0(?:48|60|8[01])|1(?:3[27]|66)|2(?:6[69]|9[56])|466))[gqswx])(_\w(\w|\w\w))?(\)| bui)/i],
		[
			N,
			[A, "TCL"],
			[k, F]
		],
		[/droid [\w\.]+; (418(?:7d|8v)|5087z|5102l|61(?:02[dh]|25[adfh]|27[ai]|56[dh]|59k|65[ah])|a509dl|t(?:43(?:0w|1[adepqu])|50(?:6d|7[adju])|6(?:09dl|10k|12b|71[efho]|76[hjk])|7(?:66[ahju]|67[hw]|7[045][bh]|71[hk]|73o|76[ho]|79w|81[hks]?|82h|90[bhsy]|99b)|810[hs]))(_\w(\w|\w\w))?(\)| bui)/i],
		[
			N,
			[A, "TCL"],
			[k, P]
		],
		[/(itel) ((\w+))/i],
		[
			[A, K],
			N,
			[
				k,
				J,
				{
					tablet: ["p10001l", "w7001"],
					"*": "mobile"
				}
			]
		],
		[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
		[
			N,
			[A, "Acer"],
			[k, F]
		],
		[/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
		[
			N,
			[A, "Meizu"],
			[k, P]
		],
		[/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i],
		[
			N,
			[A, "Ulefone"],
			[k, P]
		],
		[/; (energy ?\w+)(?: bui|\))/i, /; energizer ([\w ]+)(?: bui|\))/i],
		[
			N,
			[A, "Energizer"],
			[k, P]
		],
		[/; cat (b35);/i, /; (b15q?|s22 flip|s48c|s62 pro)(?: bui|\))/i],
		[
			N,
			[A, "Cat"],
			[k, P]
		],
		[/((?:new )?andromax[\w- ]+)(?: bui|\))/i],
		[
			N,
			[A, "Smartfren"],
			[k, P]
		],
		[/droid.+; (a(in)?(0(15|59|6[35])|142)p?)/i],
		[
			N,
			[A, "Nothing"],
			[k, P]
		],
		[/; (x67 5g|tikeasy \w+|ac[1789]\d\w+)( b|\))/i, /archos ?(5|gamepad2?|([\w ]*[t1789]|hello) ?\d+[\w ]*)( b|\))/i],
		[
			N,
			[A, "Archos"],
			[k, F]
		],
		[/archos ([\w ]+)( b|\))/i, /; (ac[3-6]\d\w{2,8})( b|\))/i],
		[
			N,
			[A, "Archos"],
			[k, P]
		],
		[/blackview ([-\w ]+)( b|\))/i, /; (bv\d{4}[-\w ]*)( b|\))/i],
		[
			N,
			[A, "Blackview"],
			[k, P]
		],
		[/; (n159v)/i],
		[
			N,
			[A, "HMD"],
			[k, P]
		],
		[/((revvl[ \w\+]+|tm(?:rv|af)\w*[45]g(?:tb)?))( b|\))/i],
		[
			N,
			[
				k,
				ci,
				{
					test: /ta?b/i,
					ifTrue: F,
					ifFalse: P
				}
			],
			[A, "T-Mobile"]
		],
		[/(imo) (tab \w+)/i, /(infinix|tecno) (x1101b?|p904|dp(7c|8d|10a)( pro)?|p70[1-3]a?|p904|t1101)/i],
		[
			A,
			N,
			[k, F]
		],
		[
			/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus(?! zenw)|dell|jolla|meizu|motorola|polytron|tecno|micromax|advan)[-_ ]?([-\w]*)/i,
			/; (blu|coolpad|cubot|hmd|imo|infinix|lava|oneplus|tcl|wiko)[_ ]([-\w\+ ]+?)(?: bui|\)|; r)/i,
			/(hp) ([\w ]+\w)/i,
			/(microsoft); (lumia[\w ]+)/i,
			/(oppo) ?([\w ]+) bui/i,
			/(hisense) ([ehv][\w ]+)\)/i,
			/droid[^;]+; (philips)[_ ]([sv-x][\d]{3,4}[xz]?)/i
		],
		[
			A,
			N,
			[k, P]
		],
		[
			/(kobo)\s(ereader|touch)/i,
			/(hp).+(touchpad(?!.+tablet)|tablet)/i,
			/(kindle)\/([\w\.]+)/i
		],
		[
			A,
			N,
			[k, F]
		],
		[/(surface duo)/i],
		[
			N,
			[A, Mr],
			[k, F]
		],
		[/droid [\d\.]+; (fp\du?)(?: b|\))/i],
		[
			N,
			[A, "Fairphone"],
			[k, P]
		],
		[/((?:tegranote|shield t(?!.+d tv))[\w- ]*?)(?: b|\))/i],
		[
			N,
			[A, Pr],
			[k, F]
		],
		[/(sprint) (\w+)/i],
		[
			A,
			N,
			[k, P]
		],
		[/(kin\.[onetw]{3})/i],
		[
			[
				N,
				/\./g,
				" "
			],
			[A, Mr],
			[k, P]
		],
		[/droid.+; ([c6]+|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
		[
			N,
			[A, Vr],
			[k, F]
		],
		[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
		[
			N,
			[A, Vr],
			[k, P]
		],
		[/(philips)[\w ]+tv/i, /smart-tv.+(samsung)/i],
		[A, [k, I]],
		[/hbbtv.+maple;(\d+)/i],
		[
			[
				N,
				/^/,
				"SmartTV"
			],
			[A, Lr],
			[k, I]
		],
		[/(vizio)(?: |.+model\/)(\w+-\w+)/i, /tcast.+(lg)e?. ([-\w]+)/i],
		[
			A,
			N,
			[k, I]
		],
		[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
		[[A, jr], [k, I]],
		[/(apple) ?tv/i],
		[
			A,
			[N, Tr + " TV"],
			[k, I]
		],
		[/crkey.*devicetype\/chromecast/i],
		[
			[N, H + " Third Generation"],
			[A, V],
			[k, I]
		],
		[/crkey.*devicetype\/([^/]*)/i],
		[
			[
				N,
				/^/,
				"Chromecast "
			],
			[A, V],
			[k, I]
		],
		[/fuchsia.*crkey/i],
		[
			[N, H + " Nest Hub"],
			[A, V],
			[k, I]
		],
		[/crkey/i],
		[
			[N, H],
			[A, V],
			[k, I]
		],
		[/(portaltv)/i],
		[
			N,
			[A, qr],
			[k, I]
		],
		[/droid.+aft(\w+)( bui|\))/i],
		[
			N,
			[A, wr],
			[k, I]
		],
		[/(shield \w+ tv)/i],
		[
			N,
			[A, Pr],
			[k, I]
		],
		[/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
		[
			N,
			[A, Rr],
			[k, I]
		],
		[/(bravia[\w ]+)( bui|\))/i],
		[
			N,
			[A, zr],
			[k, I]
		],
		[/(mi(tv|box)-?\w+) bui/i],
		[
			N,
			[A, Br],
			[k, I]
		],
		[/Hbbtv.*(technisat) (.*);/i],
		[
			A,
			N,
			[k, I]
		],
		[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],
		[
			[
				A,
				/.+\/(\w+)/,
				"$1",
				J,
				{ LG: "lge" }
			],
			[N, oi],
			[k, I]
		],
		[/(playstation \w+)/i],
		[
			N,
			[A, zr],
			[k, or]
		],
		[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
		[
			N,
			[A, Mr],
			[k, or]
		],
		[
			/(ouya)/i,
			/(nintendo) (\w+)/i,
			/(retroid) (pocket ([^\)]+))/i,
			/(valve).+(steam deck)/i,
			/droid.+; ((shield|rgcube|gr0006))( bui|\))/i
		],
		[
			[
				A,
				J,
				{
					Nvidia: "Shield",
					Anbernic: "RGCUBE",
					Logitech: "GR0006"
				}
			],
			N,
			[k, or]
		],
		[/\b(sm-[lr]\d\d[0156][fnuw]?s?|gear live)\b/i],
		[
			N,
			[A, Lr],
			[k, L]
		],
		[/((pebble))app/i, /(asus|google|lg|oppo|xiaomi) ((pixel |zen)?watch[\w ]*)( bui|\))/i],
		[
			A,
			N,
			[k, L]
		],
		[/(ow(?:19|20)?we?[1-3]{1,3})/i],
		[
			N,
			[A, Ir],
			[k, L]
		],
		[/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],
		[
			N,
			[A, Tr],
			[k, L]
		],
		[/(opwwe\d{3})/i],
		[
			N,
			[A, Fr],
			[k, L]
		],
		[/(moto 360)/i],
		[
			N,
			[A, Nr],
			[k, L]
		],
		[/(smartwatch 3)/i],
		[
			N,
			[A, zr],
			[k, L]
		],
		[/(g watch r)/i],
		[
			N,
			[A, jr],
			[k, L]
		],
		[/droid.+; (wt63?0{2,3})\)/i],
		[
			N,
			[A, Vr],
			[k, L]
		],
		[/droid.+; (glass) \d/i],
		[
			N,
			[A, V],
			[k, sr]
		],
		[/(pico) ([\w ]+) os\d/i],
		[
			A,
			N,
			[k, sr]
		],
		[/(quest( \d| pro)?s?).+vr/i],
		[
			N,
			[A, qr],
			[k, sr]
		],
		[/mobile vr; rv.+firefox/i],
		[[k, sr]],
		[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
		[A, [k, cr]],
		[/(aeobc)\b/i],
		[
			N,
			[A, wr],
			[k, cr]
		],
		[/(homepod).+mac os/i],
		[
			N,
			[A, Tr],
			[k, cr]
		],
		[/windows iot/i],
		[[k, cr]],
		[/droid.+; ([\w- ]+) (4k|android|smart|google)[- ]?tv/i],
		[N, [k, I]],
		[/\b((4k|android|smart|opera)[- ]?tv|tv; rv:|large screen[\w ]+safari)\b/i],
		[[k, I]],
		[/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew|; hmsc).+?(mobile|vr|\d) safari/i],
		[N, [
			k,
			J,
			{
				mobile: "Mobile",
				xr: "VR",
				"*": F
			}
		]],
		[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
		[[k, F]],
		[/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],
		[[k, P]],
		[/droid .+?; ([\w\. -]+)( bui|\))/i],
		[N, [A, "Generic"]]
	],
	engine: [
		[/windows.+ edge\/([\w\.]+)/i],
		[j, [O, Wr + "HTML"]],
		[/(arkweb)\/([\w\.]+)/i],
		[O, j],
		[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
		[j, [O, "Blink"]],
		[
			/(presto)\/([\w\.]+)/i,
			/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna|servo)\/([\w\.]+)/i,
			/ekioh(flow)\/([\w\.]+)/i,
			/(khtml|tasman|links|dillo)[\/ ]\(?([\w\.]+)/i,
			/(icab)[\/ ]([23]\.[\d\.]+)/i,
			/\b(libweb)/i
		],
		[O, j],
		[/ladybird\//i],
		[[O, "LibWeb"]],
		[/rv\:([\w\.]{1,9})\b.+(gecko)/i],
		[j, O]
	],
	os: [
		[/(windows nt) (6\.[23]); arm/i],
		[[
			O,
			/N/,
			"R"
		], [
			j,
			J,
			li
		]],
		[/(windows (?:phone|mobile|iot))(?: os)?[\/ ]?([\d\.]*( se)?)/i, /(windows)[\/ ](1[01]|2000|3\.1|7|8(\.1)?|9[58]|me|server 20\d\d( r2)?|vista|xp)/i],
		[O, j],
		[/windows nt ?([\d\.\)]*)(?!.+xbox)/i, /\bwin(?=3| ?9|n)(?:nt| 9x )?([\d\.;]*)/i],
		[[
			j,
			/(;|\))/g,
			"",
			J,
			li
		], [O, Xr]],
		[/(windows ce)\/?([\d\.]*)/i],
		[O, j],
		[
			/[adehimnop]{4,7}\b(?:.*os ([\w]+) like mac|; opera)/i,
			/(?:ios;fbsv|ios(?=.+ip(?:ad|hone)|.+apple ?tv)|ip(?:ad|hone)(?: |.+i(?:pad)?)os|apple ?tv.+ios)[\/ ]([\w\.]+)/i,
			/\btvos ?([\w\.]+)/i,
			/cfnetwork\/.+darwin/i
		],
		[[
			j,
			/_/g,
			"."
		], [O, "iOS"]],
		[/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+(haiku|morphos))/i],
		[[O, "macOS"], [
			j,
			/_/g,
			"."
		]],
		[/android ([\d\.]+).*crkey/i],
		[j, [O, H + " Android"]],
		[/fuchsia.*crkey\/([\d\.]+)/i],
		[j, [O, H + " Fuchsia"]],
		[/crkey\/([\d\.]+).*devicetype\/smartspeaker/i],
		[j, [O, H + " SmartSpeaker"]],
		[/linux.*crkey\/([\d\.]+)/i],
		[j, [O, H + " Linux"]],
		[/crkey\/([\d\.]+)/i],
		[j, [O, H]],
		[/droid ([\w\.]+)\b.+(android[- ]x86)/i],
		[j, O],
		[/(ubuntu) ([\w\.]+) like android/i],
		[[
			O,
			/(.+)/,
			"$1 Touch"
		], j],
		[/(harmonyos)[\/ ]?([\d\.]*)/i, /(android|bada|blackberry|kaios|maemo|meego|openharmony|qnx|rim tablet os|sailfish|series40|symbian|tizen)\w*[-\/\.; ]?([\d\.]*)/i],
		[O, j],
		[/\(bb(10);/i],
		[j, [O, Dr]],
		[/(?:symbian ?os|symbos|s60(?=;)|series ?60)[-\/ ]?([\w\.]*)/i],
		[j, [O, "Symbian"]],
		[/mozilla\/[\d\.]+ \((?:mobile[;\w ]*|tablet|tv|[^\)]*(?:viera|lg(?:l25|-d300)|alcatel ?o.+|y300-f1)); rv:([\w\.]+)\).+gecko\//i],
		[j, [O, Gr + " OS"]],
		[/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i, /webos(?:[ \/]?|\.tv-20(?=2[2-9]))(\d[\d\.]*)/i],
		[j, [O, "webOS"]],
		[/web0s;.+?(?:chr[o0]me|safari)\/(\d+)/i],
		[[
			j,
			J,
			{
				25: "120",
				24: "108",
				23: "94",
				22: "87",
				6: "79",
				5: "68",
				4: "53",
				3: "38",
				2: "538",
				1: "537",
				"*": "TV"
			}
		], [O, "webOS"]],
		[/watch(?: ?os[,\/ ]|\d,\d\/)([\d\.]+)/i],
		[j, [O, "watchOS"]],
		[/cros [\w]+(?:\)| ([\w\.]+)\b)/i],
		[j, [O, "Chrome OS"]],
		[/kepler ([\w\.]+); (aft|aeo)/i],
		[j, [O, "Vega OS"]],
		[
			/(netrange)mmh/i,
			/(nettv)\/(\d+\.[\w\.]+)/i,
			/(nintendo|playstation) (\w+)/i,
			/(xbox); +xbox ([^\);]+)/i,
			/(pico) .+os([\w\.]+)/i,
			/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
			/linux.+(mint)[\/\(\) ]?([\w\.]*)/i,
			/(mageia|vectorlinux|fuchsia|arcaos|arch(?= ?linux))[;l ]([\d\.]*)/i,
			/([kxln]?ubuntu|debian|suse|opensuse|gentoo|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire|knoppix)(?: gnu[\/ ]linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
			/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
			/\b(aix)[; ]([1-9\.]{0,4})/i,
			/(hurd|linux|morphos)(?: (?:arm|x86|ppc)\w*| ?)([\w\.]*)/i,
			/(gnu) ?([\w\.]*)/i,
			/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
			/(haiku) ?(r\d)?/i
		],
		[O, j],
		[/(sunos) ?([\d\.]*)/i],
		[[O, "Solaris"], j],
		[/\b(beos|os\/2|amigaos|openvms|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i],
		[O, j]
	]
}, pi = (function() {
	var e = {
		init: {},
		isIgnore: {},
		isIgnoreRgx: {},
		toString: {}
	};
	return q.call(e.init, [
		[C, [
			O,
			j,
			ar,
			k
		]],
		[w, [M]],
		[T, [
			k,
			N,
			A
		]],
		[E, [O, j]],
		[D, [O, j]]
	]), q.call(e.isIgnore, [
		[C, [j, ar]],
		[E, [j]],
		[D, [j]]
	]), q.call(e.isIgnoreRgx, [[C, / ?browser$/i], [D, / ?os$/i]]), q.call(e.toString, [
		[C, [O, j]],
		[w, [M]],
		[T, [A, N]],
		[E, [O, j]],
		[D, [O, j]]
	]), e;
})(), mi = function(e, t) {
	var n = pi.init[t], r = pi.isIgnore[t] || 0, i = pi.isIgnoreRgx[t] || 0, a = pi.toString[t] || 0;
	function o() {
		q.call(this, n);
	}
	return o.prototype.getItem = function() {
		return e;
	}, o.prototype.withClientHints = function() {
		return G ? G.getHighEntropyValues(Cr).then(function(t) {
			return e.setCH(new hi(t, !1)).parseCH().get();
		}) : e.parseCH().get();
	}, o.prototype.withFeatureCheck = function() {
		return e.detectFeature().get();
	}, t != ir && (o.prototype.is = function(e) {
		var t = !1;
		for (var n in this) if (this.hasOwnProperty(n) && !$r(r, n) && K(i ? ai(i, this[n]) : this[n]) == K(i ? ai(i, e) : e)) {
			if (t = !0, e != S.UNDEFINED) break;
		} else if (e == S.UNDEFINED && t) {
			t = !t;
			break;
		}
		return t;
	}, o.prototype.toString = function() {
		var e = nr;
		for (var t in a) typeof this[a[t]] !== S.UNDEFINED && (e += (e ? " " : nr) + this[a[t]]);
		return e || S.UNDEFINED;
	}), o.prototype.then = function(e) {
		var t = this, n = function() {
			for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
		};
		n.prototype = {
			is: o.prototype.is,
			toString: o.prototype.toString,
			withClientHints: o.prototype.withClientHints,
			withFeatureCheck: o.prototype.withFeatureCheck
		};
		var r = new n();
		return e(r), r;
	}, new o();
};
function hi(e, t) {
	if (e ||= {}, q.call(this, Cr), t) q.call(this, [
		[ur, ni(e[B])],
		[dr, ni(e[hr])],
		[P, /\?1/.test(e[yr])],
		[N, ii(e[br])],
		[fr, ii(e[xr])],
		[pr, ii(e[Sr])],
		[M, ii(e[gr])],
		[z, ni(e[vr])],
		[mr, ii(e[_r])]
	]);
	else for (var n in e) this.hasOwnProperty(n) && typeof e[n] !== S.UNDEFINED && (this[n] = e[n]);
}
function Y(e, t, n, r) {
	return q.call(this, [
		["itemType", e],
		["ua", t],
		["uaCH", r],
		["rgxMap", n],
		["data", mi(this, e)]
	]), this;
}
Y.prototype.get = function(e) {
	return e ? this.data.hasOwnProperty(e) ? this.data[e] : void 0 : this.data;
}, Y.prototype.set = function(e, t) {
	return this.data[e] = t, this;
}, Y.prototype.setCH = function(e) {
	return this.uaCH = e, this;
}, Y.prototype.detectFeature = function() {
	if (W && W.userAgent == this.ua) switch (this.itemType) {
		case C:
			W.brave && typeof W.brave.isBrave == S.FUNCTION && this.set(O, "Brave");
			break;
		case T:
			!this.get(k) && G && G[P] && this.set(k, P), this.get(N) == "Macintosh" && W && typeof W.standalone !== S.UNDEFINED && W.maxTouchPoints && W.maxTouchPoints > 2 && this.set(N, "iPad").set(k, F);
			break;
		case D:
			!this.get(O) && G && G[fr] && this.set(O, G[fr]);
			break;
		case ir:
			var e = this.data, t = function(t) {
				return e[t].getItem().detectFeature().get();
			};
			this.set(C, t(C)).set(w, t(w)).set(T, t(T)).set(E, t(E)).set(D, t(D));
	}
	return this;
}, Y.prototype.parseUA = function() {
	switch (this.itemType != ir && si.call(this.data, this.ua, this.rgxMap), this.itemType) {
		case C:
			this.set(ar, ri(this.get(j)));
			break;
		case D: if (this.get(O) == "iOS" && this.get(j) && /^1[89][^\d]/.exec(this.get(j))) {
			var e = /\) Version\/((\d+)[\d\.]*)/.exec(this.ua);
			e && parseInt(e[2], 10) >= 26 && this.set(j, e[1]);
		}
	}
	return this;
}, Y.prototype.parseCH = function() {
	var e = this.uaCH, t = this.rgxMap;
	switch (this.itemType) {
		case C:
		case E:
			var n = e[dr] || e[ur], r;
			if (n) for (var i = 0; i < n.length; i++) {
				var a = n[i].brand || n[i], o = n[i].version;
				this.itemType == C && !/not.a.brand/i.test(a) && (!r || /Chrom/.test(r) && a != Ur || r == Wr && /WebView2/.test(a)) && (a = J(a, di), r = this.get(O), r && !/Chrom/.test(r) && /Chrom/.test(a) || this.set(O, a).set(j, o).set(ar, ri(o)), r = a), this.itemType == E && a == Ur && this.set(j, o);
			}
			break;
		case w:
			var s = e[M];
			s && (s && e[mr] == "64" && (s += "64"), si.call(this.data, s + ";", t));
			break;
		case T:
			if (e[P] && this.set(k, P), e[N] && (this.set(N, e[N]), !this.get(k) || !this.get(A))) {
				var c = {};
				si.call(c, "droid 9; " + e[N] + ")", t), !this.get(k) && c.type && this.set(k, c.type), !this.get(A) && c.vendor && this.set(A, c.vendor);
			}
			if (e[z]) {
				var l;
				if (typeof e[z] != "string") for (var u = 0; !l && u < e[z].length;) l = J(e[z][u++], ui);
				else l = J(e[z], ui);
				this.set(k, l);
			}
			break;
		case D:
			var d = e[fr];
			if (d) {
				var f = e[pr];
				d == Xr && (f = parseInt(ri(f), 10) >= 13 ? "11" : "10"), this.set(O, d).set(j, f);
			}
			this.get(O) == Xr && e[N] == "Xbox" && this.set(O, "Xbox").set(j, void 0);
			break;
		case ir:
			var p = this.data, m = function(t) {
				return p[t].getItem().setCH(e).parseCH().get();
			};
			this.set(C, m(C)).set(w, m(w)).set(T, m(T)).set(E, m(E)).set(D, m(D));
	}
	return this;
};
function X(e, t, n) {
	if (typeof e === S.OBJECT ? (ei(e, !0) ? (typeof t === S.OBJECT && (n = t), t = e) : (n = e, t = void 0), e = void 0) : typeof e === S.STRING && !ei(t, !0) && (n = t, t = void 0), n) {
		if (typeof n.append === S.FUNCTION) {
			var r = {};
			n.forEach(function(e, t) {
				r[String(t).toLowerCase()] = e;
			}), n = r;
		} else {
			var i = {};
			for (var a in n) n.hasOwnProperty(a) && (i[String(a).toLowerCase()] = n[a]);
			n = i;
		}
	}
	if (!(this instanceof X)) return new X(e, t, n).getResult();
	var o = typeof e === S.STRING ? e : n && n[tr] ? n[tr] : W && W.userAgent ? W.userAgent : nr, s = new hi(n, !0), c = fi, l = function(e) {
		return e == ir ? function() {
			return new Y(e, o, c, s).set("ua", o).set(C, this.getBrowser()).set(w, this.getCPU()).set(T, this.getDevice()).set(E, this.getEngine()).set(D, this.getOS()).get();
		} : function() {
			return new Y(e, o, c[e], s).parseUA().get();
		};
	};
	return q.call(this, [
		["getBrowser", l(C)],
		["getCPU", l(w)],
		["getDevice", l(T)],
		["getEngine", l(E)],
		["getOS", l(D)],
		["getResult", l(ir)],
		["getUA", function() {
			return o;
		}],
		["setUA", function(e) {
			return ti(e) && (o = oi(e, er)), this;
		}],
		["useExtension", function(e) {
			return e && (c = Zr(c, e)), this;
		}]
	]).setUA(o).useExtension(t), this;
}
X.VERSION = $n, X.BROWSER = Qr([
	O,
	j,
	ar,
	k
]), X.CPU = Qr([M]), X.DEVICE = Qr([
	N,
	A,
	k,
	or,
	P,
	I,
	F,
	L,
	cr
]), X.ENGINE = X.OS = Qr([O, j]);
//#endregion
//#region src/report/index.ts
var gi = async (e, t) => {
	let n = new Blob([JSON.stringify(t)], { type: "application/json" });
	navigator.sendBeacon(e, n);
}, _i = async (e, t) => (await fetch(e, {
	method: "POST",
	body: JSON.stringify(t),
	keepalive: !0,
	headers: { "Content-Type": "application/json" }
})).json(), vi = () => {
	let e = new X();
	return {
		browser: e.getBrowser().name,
		os: e.getOS().name,
		device: e.getDevice().type || "desktop"
	};
}, yi = async (e) => {
	let t = vi();
	console.log(t);
	let n = await (await Qn.load()).get();
	console.log(n);
	let r = {
		anonymousId: n.visitorId,
		browser: t.browser ?? "unkown",
		os: t.os ?? "unkown",
		device: t.device
	};
	return (await _i(e.baseUrl + e.uv.api, r)).data;
}, bi = (e, t) => {
	let n = "BUTTON";
	document.addEventListener("click", (r) => {
		let i = t.baseUrl + t.event.api, a = () => {
			let t = o.getBoundingClientRect(), n = {
				visitorId: e,
				event: r.type,
				payload: {
					x: t.left.toFixed(2) || 0,
					y: t.top.toFixed(2) || 0,
					width: t.width.toFixed(2) || 0,
					height: t.height.toFixed(2) || 0,
					text: o.textContent
				},
				url: window.location.href
			};
			gi(i, n);
		}, o = r.target;
		o.nodeName === n && (console.log(o.nodeName), a()), o.nodeName === "SPAN" && o.parentElement?.nodeName === n && a();
	});
}, xi = (e, t) => {
	let n = t.baseUrl + t.error.api;
	window.addEventListener("error", (t) => {
		let r = {
			visitorId: e,
			error: t.error.name,
			message: t.error.message,
			stack: t.error.stack || "",
			url: window.location.href
		};
		gi(n, r);
	}), window.addEventListener("unhandledrejection", (t) => {
		let r = t.reason instanceof Error, i = {
			visitorId: e,
			error: "promise",
			message: r ? t.reason.message : JSON.stringify(t.reason),
			stack: r && t.reason.stack ? t.reason.stack : "Promise Rejection",
			url: window.location.href
		};
		gi(n, i);
	});
}, Si = (e, t) => {
	let n = window.location.href.includes("#"), r = {
		visitorId: e,
		url: window.location.protocol + "//" + window.location.host,
		referrer: document.referrer,
		path: n ? "/" + window.location.hash : window.location.pathname
	};
	gi(t.baseUrl + t.pv.api, r);
}, Ci = (e, t) => {
	let n = history.pushState;
	window.addEventListener("hashchange", (n) => {
		Si(e, t);
	}), window.addEventListener("popstate", (n) => {
		Si(e, t);
	}), history.pushState = function(r, i, a) {
		n.call(this, r, i, a), Si(e, t);
	}, history.replaceState = function(r, i, a) {
		n.call(this, r, i, a), Si(e, t);
	};
}, wi = -1, Ti = () => wi, Ei = (e) => {
	addEventListener("pageshow", (t) => {
		t.persisted && (wi = t.timeStamp, e(t));
	}, !0);
}, Z = (e, t, n, r) => {
	let i, a;
	return (o) => {
		t.value >= 0 && (o || r) && (a = t.value - (i ?? 0), (a || i === void 0) && (i = t.value, t.delta = a, t.rating = ((e, t) => e > t[1] ? "poor" : e > t[0] ? "needs-improvement" : "good")(t.value, n), e(t)));
	};
}, Di = (e) => {
	requestAnimationFrame(() => requestAnimationFrame(() => e()));
}, Oi = () => {
	let e = performance.getEntriesByType("navigation")[0];
	if (e && e.responseStart > 0 && e.responseStart < performance.now()) return e;
}, ki = () => Oi()?.activationStart ?? 0, Q = -1, Ai = /* @__PURE__ */ new Set(), ji = () => document.visibilityState !== "hidden" || document.prerendering ? 1 / 0 : 0, Mi = (e) => {
	if (document.visibilityState === "hidden") {
		if (e.type === "visibilitychange") for (let e of Ai) e();
		isFinite(Q) || (Q = e.type === "visibilitychange" ? e.timeStamp : 0, removeEventListener("prerenderingchange", Mi, !0));
	}
}, Ni = (e = !1) => {
	if (e && (Q = 1 / 0), Q < 0) {
		let e = ki();
		Q = (document.prerendering ? void 0 : globalThis.performance.getEntriesByType("visibility-state").find((t) => t.name === "hidden" && t.startTime >= e)?.startTime) ?? ji(), addEventListener("visibilitychange", Mi, !0), addEventListener("prerenderingchange", Mi, !0), Ei(() => {
			setTimeout(() => {
				Q = ji();
			});
		});
	}
	return {
		get firstHiddenTime() {
			return Q;
		},
		onHidden(e) {
			Ai.add(e);
		}
	};
}, $ = (e, t = -1, n, r = 0, i, a, o) => {
	let s = Oi(), c = s?.navigationId || 0, l = "navigate";
	return n ? l = n : Ti() >= 0 ? l = "back-forward-cache" : s && (document.prerendering || ki() > 0 ? l = "prerender" : document.wasDiscarded ? l = "restore" : s.type && (l = s.type.replace(/_/g, "-"))), {
		name: e,
		value: t,
		rating: "good",
		delta: 0,
		entries: [],
		id: `v6-${Date.now()}-${Math.floor(8999999999999 * Math.random()) + 0xe8d4a51000}`,
		navigationType: l,
		navigationId: r || c,
		navigationInteractionId: i,
		navigationURL: a || s?.name,
		navigationStartTime: o || 0
	};
}, Pi = /* @__PURE__ */ new WeakMap();
function Fi(e, t) {
	let n = Pi.get(t);
	return n || (n = /* @__PURE__ */ new WeakMap(), Pi.set(t, n)), n.get(e) || n.set(e, new t()), n.get(e);
}
var Ii = class {
	t;
	i = 0;
	o = [];
	h(e) {
		if (e.hadRecentInput) return;
		let t = this.o[0], n = this.o.at(-1);
		this.i && t && n && e.startTime - n.startTime < 1e3 && e.startTime - t.startTime < 5e3 ? (this.i += e.value, this.o.push(e)) : (this.i = e.value, this.o = [e]), this.t?.(e);
	}
}, Li = (e, t, n = {}) => {
	try {
		let r = e.filter((e) => PerformanceObserver.supportedEntryTypes.includes(e));
		if (r.length > 0) {
			let e = new PerformanceObserver((e) => {
				queueMicrotask(() => {
					let n = e.getEntries();
					r.length > 1 && n.sort((e, t) => e.startTime + e.duration - (t.startTime + t.duration)), t(n);
				});
			});
			for (let t of r) e.observe({
				type: t,
				buffered: !0,
				...n
			});
			return e;
		}
	} catch {}
}, Ri = (e) => globalThis.PerformanceObserver?.supportedEntryTypes?.includes("soft-navigation") && typeof globalThis.PerformanceSoftNavigation?.prototype?.getLargestInteractionContentfulPaint == "function" && e && e.reportSoftNavs, zi = (e, t) => {
	if (e.set(t.navigationId, t), e.size > 2) {
		let t = e.keys().next().value;
		t !== void 0 && e.delete(t);
	}
}, Bi = (e) => {
	let t = !1;
	return () => {
		t ||= (e(), !0);
	};
}, Vi = class {
	l;
}, Hi = (e) => {
	document.prerendering ? addEventListener("prerenderingchange", e, !0) : e();
}, Ui = [1800, 3e3], Wi = (e, t = {}) => {
	let n = Ri(t);
	Hi(() => {
		let r = Fi(t, Vi), i = Ni(), a, o = $("FCP"), s = Li(["paint"], (e) => {
			for (let t of e) t.name === "first-contentful-paint" && (s.disconnect(), t.startTime < i.firstHiddenTime && (o.value = Math.max(t.startTime - ki(), 0), o.entries.push(t), o.navigationId = t.navigationId || o.navigationId, a(!0)));
		});
		s && (a = Z(e, o, Ui, t.reportAllChanges), Ei((n) => {
			o = $("FCP", -1, "back-forward-cache", o.navigationId, o.navigationInteractionId, o.navigationURL, Ti()), a = Z(e, o, Ui, t.reportAllChanges), Di(() => {
				o.value = performance.now() - n.timeStamp, a(!0);
			});
		})), n && Li(["soft-navigation"], (n) => {
			n.forEach((n) => {
				r.l && n.navigationId && zi(r.l, n), o = $("FCP", Math.max((n.presentationTime || n.paintTime || 0) - n.startTime, 0), "soft-navigation", n.navigationId, n.interactionId, n.name, n.startTime), a = Z(e, o, Ui, t.reportAllChanges), a(!0);
			});
		}, t);
	});
}, Gi = [.1, .25], Ki = (e, t = {}) => {
	let n = Ni();
	Wi(Bi(() => {
		let r, i = $("CLS", 0), a = Fi(t, Ii), o = (n, o, s, c, l) => {
			i = $("CLS", 0, n, o, s, c, l), a.i = 0, r = Z(e, i, Gi, t.reportAllChanges);
		}, s = (e = !1) => {
			a.i > i.value && (i.value = a.i, i.entries = a.o), r(e);
		}, c = (e) => {
			s(!0), o("soft-navigation", e.navigationId, e.interactionId, e.name, e.startTime);
		}, l = (e) => {
			for (let t of e) t.entryType === "soft-navigation" ? c(t) : a.h(t);
			s();
		}, u = ["layout-shift"];
		Ri(t) && u.push("soft-navigation");
		let d = Li(u, l);
		d && (r = Z(e, i, Gi, t.reportAllChanges), n.onHidden(() => {
			l(d.takeRecords()), r(!0);
		}), Ei(() => {
			o("back-forward-cache", i.navigationId, i.navigationInteractionId, i.navigationURL, Ti()), Di(r);
		}), setTimeout(r));
	}));
}, qi = 0, Ji = 1 / 0, Yi = 0, Xi = (e) => {
	for (let t of e) t.interactionId && (Ji = Math.min(Ji, t.interactionId), Yi = Math.max(Yi, t.interactionId), qi = Yi ? (Yi - Ji) / 7 + 1 : 0);
}, Zi, Qi = () => Zi ? qi : performance.interactionCount ?? 0, $i = () => {
	"interactionCount" in performance || Zi || (Zi = Li(["event"], Xi, { durationThreshold: 0 }));
}, ea = class {
	u = 0;
	v = [];
	m = /* @__PURE__ */ new Map();
	p;
	T;
	_() {
		return Qi() - this.u;
	}
	M() {
		this.u = Qi(), this.v.length = 0, this.m.clear();
	}
	L(e) {
		let t = this._(), n = Math.min(this.v.length - 1, Math.floor(t / 50));
		return !t || n !== -1 || e !== "soft-navigation" && e !== "back-forward-cache" ? this.v[n] : {
			P: 8,
			id: -1,
			entries: []
		};
	}
	h(e) {
		if (this.p?.(e), !e.interactionId) return;
		let t = this.v.at(-1), n = this.m.get(e.interactionId);
		if (n || this.v.length < 10 || e.duration > t.P) {
			if (n ? e.duration > n.P ? (n.entries = [e], n.P = e.duration) : e.duration === n.P && e.startTime === n.entries[0].startTime && n.entries.push(e) : (n = {
				id: e.interactionId,
				entries: [e],
				P: e.duration
			}, this.m.set(n.id, n), this.v.push(n)), this.v.sort((e, t) => t.P - e.P), this.v.length > 10) {
				let e = this.v.splice(10);
				for (let t of e) this.m.delete(t.id);
			}
			this.T?.(n);
		}
	}
}, ta = (e) => {
	let t = "requestIdleCallback" in globalThis ? 1e3 : 0, n = globalThis.requestIdleCallback || setTimeout, r = globalThis.cancelIdleCallback || clearTimeout;
	if (document.visibilityState === "hidden") e();
	else {
		let i = Bi(e), a = -1, o = () => {
			r(a), i();
		};
		addEventListener("visibilitychange", o, {
			once: !0,
			capture: !0
		}), a = n(() => {
			removeEventListener("visibilitychange", o, { capture: !0 }), i();
		}, { timeout: t });
	}
}, na = [200, 500], ra = (e, t = {}) => {
	if (!globalThis.PerformanceEventTiming || !("interactionId" in PerformanceEventTiming.prototype)) return;
	let n = Ni();
	Hi(() => {
		$i();
		let r, i = $("INP"), a = Fi(t, ea), o = (n, o, s, c, l) => {
			a.M(), i = $("INP", -1, n, o, s, c, l), r = Z(e, i, na, t.reportAllChanges);
		}, s = () => {
			let e = a.L(i.navigationType);
			e && e.P !== i.value && (i.value = e.P, i.entries = e.entries, r());
		}, c = (e) => {
			s(), r(!0), o("soft-navigation", e.navigationId, e.interactionId, e.name, e.startTime);
		}, l = (e, t = !1) => {
			ta(() => {
				for (let t of e) t.entryType === "soft-navigation" ? c(t) : a.h(t);
				s(), t && r(!0);
			});
		}, u = ["event", "first-input"];
		Ri(t) && u.push("soft-navigation");
		let d = Li(u, l, {
			...t,
			durationThreshold: t.durationThreshold ?? 40
		});
		r = Z(e, i, na, t.reportAllChanges), d && (n.onHidden(() => {
			l(d.takeRecords(), !0);
		}), Ei(() => {
			o("back-forward-cache", i.navigationId, i.navigationInteractionId, i.navigationURL, Ti());
		}));
	});
}, ia = async (e, t) => {
	let n = 0, r = 0, i = 0, a = 0, o = 0, s = t.baseUrl + t.performance.api, c = performance.getEntriesByType("paint"), l = c.find((e) => e.name === "first-paint"), u = c.find((e) => e.name === "first-contentful-paint");
	l && (n = l.startTime), u && (r = u.startTime);
	let { lcpTime: d, lcpObserver: f } = await new Promise((e) => {
		let t = new PerformanceObserver((n) => {
			e({
				lcpTime: n.getEntries().at(-1)?.startTime ?? 0,
				lcpObserver: t
			});
		});
		t.observe({
			type: "largest-contentful-paint",
			buffered: !0
		});
	});
	f.disconnect(), i = d, ra((e) => {
		a = e.value;
	}, { reportAllChanges: !0 }), Ki((e) => {
		o = e.value;
	}, { reportAllChanges: !0 }), window.addEventListener("visibilitychange", () => {
		document.visibilityState === "hidden" && gi(s, {
			visitorId: e,
			fp: n,
			fcp: r,
			lcp: i,
			inp: a,
			cls: o
		});
	}, { once: !0 });
}, aa = class {
	config;
	visitorId = null;
	initPromise = null;
	constructor(e) {
		this.config = e, this.init();
	}
	async init() {
		return this.initPromise ||= (async () => {
			this.visitorId = await yi(this.config), bi(this.visitorId, this.config), xi(this.visitorId, this.config), ia(this.visitorId, this.config), Ci(this.visitorId, this.config);
		})(), this.initPromise;
	}
	async setUserId(e) {
		await this.init(), await _i(this.config.baseUrl + this.config.uv.updateApi, {
			visitorId: this.visitorId,
			userId: e
		});
	}
};
//#endregion
export { aa as Tracker };
