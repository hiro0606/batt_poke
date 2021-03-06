window.ripples = {
    done: !1,
    init: function(a) {
        "use strict";

        function b(a, b) {
            var c = a.matches || a.matchesSelector || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector || a.oMatchesSelector;
            return c.call(a, b)
        }
        if (this.done) return console.log("Ripples.js was already initialzied.");
        this.done = !0;
        var c = 100,
            d = 500,
            e = function(a, c, d) {
                "string" == typeof a && (a = [a]), a.forEach(function(a) {
                    document.addEventListener(a, function(a) {
                        var e = "number" != typeof a.detail ? a.detail : a.target;
                        b(e, c) && d(a, e)
                    })
                })
            },
            f = function(a, b, c) {
                var e, f = b,
                    g = f.parentNode,
                    h = document.createElement("div"),
                    j = g.getBoundingClientRect(),
                    k = {
                        x: a.clientX - j.left,
                        y: (window.ontouchstart ? a.clientY - window.scrollY : a.clientY) - j.top
                    },
                    l = "scale(" + Math.round(f.offsetWidth / 5) + ")",
                    m = new CustomEvent("rippleEnd", {
                        detail: h
                    }),
                    n = .3;
                a.touches && (k = {
                    x: a.touches[0].clientX - j.left,
                    y: a.touches[0].clientY - j.top
                }), i = h, h.className = "ripple", h.setAttribute("style", "left:" + k.x + "px; top:" + k.y + "px;");
                var o = window.getComputedStyle(g).color;
                if (o.indexOf("rgba") >= 0) {
                    var p = o.lastIndexOf(",") + 1;
                    o = o.substring(0, p) + n + ")"
                } else o = o.replace("rgb", "rgba").replace(")", ", " + n + ")");
                f.appendChild(h), e = window.getComputedStyle(h).opacity, h.dataset.animating = 1, h.className = "ripple ripple-on";
                var q = [h.getAttribute("style"), "background-color: " + o, "-ms-transform: " + l, "-moz-transform: " + l, "-webkit-transform: " + l, "transform: " + l];
                h.setAttribute("style", q.join(";")), setTimeout(function() {
                    h.dataset.animating = 0, document.dispatchEvent(m), c && c()
                }, d)
            },
            g = function(a) {
                a.className = "ripple ripple-on ripple-out", setTimeout(function() {
                    a.remove()
                }, c)
            },
            h = !1;
        e(["mousedown", "touchstart"], "*", function() {
            h = !0
        }), e(["mouseup", "touchend", "mouseout"], "*", function() {
            h = !1
        });
        var i, j = function(a, b) {
            if (0 === b.getElementsByClassName("ripple-wrapper").length) {
                b.className += " withripple";
                var c = document.createElement("div");
                c.className = "ripple-wrapper", b.appendChild(c)
            }
        };
        e(["mouseover"], a, j), e(["touchstart"], a, j), e(["mousedown", "touchstart"], ".ripple-wrapper", function(a, b) {
            (0 === a.which || 1 === a.which || 2 === a.which) && f(a, b)
        }), e("rippleEnd", ".ripple-wrapper .ripple", function(a, b) {
            var c = b.parentNode.getElementsByClassName("ripple");
            (!h || c[0] == b && c.length > 1) && g(b)
        }), e(["mouseup", "touchend", "mouseout"], ".ripple-wrapper", function() {
            var a = i;
            a && 1 != a.dataset.animating && g(a)
        })
    }
};
