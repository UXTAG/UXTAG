!(function(e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = {
      i: r,
      l: !1,
      exports: {}
    });
    return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function(e, t, r) {
      n.o(e, t) ||
        Object.defineProperty(e, t, {
          enumerable: !0,
          get: r
        });
    }),
    (n.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, {
          value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
          value: !0
        });
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", {
          enumerable: !0,
          value: e
        }),
        2 & t && "string" != typeof e)
      )
        for (var o in e)
          n.d(
            r,
            o,
            function(t) {
              return e[t];
            }.bind(null, o)
          );
      return r;
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = "/assets"),
    n((n.s = 0));
})([
  function(e, t, n) {
    e.exports = n(1);
  },
  function(e, t, n) {
    "use strict";
    var r = n(2),
      o = document.getElementsByClassName("opinary-widget-embed"),
      i = [].slice.call(o);
    try {
      i.forEach(function(e) {
        (0, r.embedVia)(e);
      });
    } catch (e) {
      console.error("[OPINARY] A problem occured building this poll:", e);
    }
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }),
      (t.collectAttributes = a),
      (t.embedVia = function(e, t) {
        window.Opinary ||
          ((window.Opinary = new o.default()), window.Opinary.ready());
        var n = a(e),
          u = "";
        document.head &&
          (u = document.head.dataset.opinary
            ? (0, r.paywallDetection)(document.head.dataset.opinary)
            : "anonymous");
        var c = {
            baseUrl: t || i.baseUrl,
            queryParams: {
              embed: "embed",
              paywall: u
            }
          },
          s = (0, r.buildUrl)(n.poll, n.customer, c),
          l = (0, r.buildFrame)(s, r.iframeClass);
        return (
          (0, r.insertFrameAfter)(e, l, i.scalingFactor, n.customer),
          (e.className = ""),
          l
        );
      });
    var r = n(3),
      o = (function(e) {
        return e && e.__esModule
          ? e
          : {
              default: e
            };
      })(n(8));
    var i = {
      scalingFactor: 1,
      baseUrl: "//compass.pressekompass.net"
    };
    function a(e) {
      var t = e.dataset;
      if (!t) throw new Error("data must be set up");
      if (!t.poll || "" === t.poll) throw new Error("no poll set");
      var n = t.poll;
      if (!t.customer || "" === t.customer) throw new Error("no customer set");
      return {
        poll: n,
        customer: t.customer
      };
    }
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }),
      (t.paywallDetection = t.iframeId = t.iframeClass = void 0),
      (t.desiredFrameSize = i),
      (t.buildUrl = function(e, t) {
        var n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          o = n.baseUrl,
          i = void 0 === o ? "//compass.pressekompass.net" : o,
          a = n.queryParams,
          u = void 0 === a ? {} : a,
          c = i + "/compasses/" + t + "/" + e,
          s = r.default.stringify(u);
        "" !== s && (c = c + "?" + s);
        return c;
      }),
      (t.buildFrame = function(e, t) {
        var n = document.createElement("iframe");
        return (
          (n.src = e),
          (n.className = t),
          (n.id = o),
          n.setAttribute("scrolling", "no"),
          n.setAttribute("marginheight", "0"),
          n.setAttribute("frameborder", "0"),
          n.setAttribute("no-mw-resize", "true"),
          n
        );
      }),
      (t.resizeResponsive = a),
      (t.insertFrameAfter = function(e, t, n, r) {
        var o = document.createElement("div");
        (o.style.textAlign = "center"),
          "rheinischePost" === r &&
            ((o.style.width = "100%"), (o.style.height = "100%"));
        if (!e.parentNode) return;
        e.parentNode.insertBefore(o, e.nextSibling),
          t.contentWindow &&
            window.addEventListener("mouseup", function() {
              t.contentWindow.postMessage(
                {
                  type: "pk:mouseup"
                },
                "*"
              );
            });
        window.addEventListener("resize", function() {
          a(t, n);
        }),
          o.appendChild(t),
          a(t, n);
      });
    var r = (function(e) {
      return e && e.__esModule
        ? e
        : {
            default: e
          };
    })(n(4));
    t.iframeClass = "opinary-iframe";
    var o = (t.iframeId = "opinary-iframe");
    function i(e, t) {
      var n = e * t;
      return (
        n > 500 && (n = 500),
        {
          width: n,
          height: n
        }
      );
    }
    function a(e, t) {
      var n = e.parentNode,
        r = e.parentNode.offsetWidth;
      if (n || r) {
        var o = i(n.offsetWidth, t);
        e.setAttribute("width", o.width + "px"),
          e.setAttribute("height", o.height + "px");
      }
    }
    t.paywallDetection = function(e) {
      var t = e.match(/paidMember|freeMember/);
      return t ? t[0] : "anonymous";
    };
  },
  function(e, t, n) {
    "use strict";
    var r =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            },
      o = n(5),
      i = n(6),
      a = n(7);
    function u(e, t) {
      return t.encode ? (t.strict ? o(e) : encodeURIComponent(e)) : e;
    }
    function c(e) {
      var t = e.indexOf("?");
      return -1 === t ? "" : e.slice(t + 1);
    }
    function s(e, t) {
      var n = (function(e) {
          var t;
          switch (e.arrayFormat) {
            case "index":
              return function(e, n, r) {
                (t = /\[(\d*)\]$/.exec(e)),
                  (e = e.replace(/\[\d*\]$/, "")),
                  t
                    ? (void 0 === r[e] && (r[e] = {}), (r[e][t[1]] = n))
                    : (r[e] = n);
              };
            case "bracket":
              return function(e, n, r) {
                (t = /(\[\])$/.exec(e)),
                  (e = e.replace(/\[\]$/, "")),
                  t
                    ? void 0 !== r[e]
                      ? (r[e] = [].concat(r[e], n))
                      : (r[e] = [n])
                    : (r[e] = n);
              };
            default:
              return function(e, t, n) {
                void 0 !== n[e] ? (n[e] = [].concat(n[e], t)) : (n[e] = t);
              };
          }
        })(
          (t = i(
            {
              arrayFormat: "none"
            },
            t
          ))
        ),
        o = Object.create(null);
      return "string" != typeof e
        ? o
        : (e = e.trim().replace(/^[?#&]/, ""))
        ? (e.split("&").forEach(function(e) {
            var t = e.replace(/\+/g, " ").split("="),
              r = t.shift(),
              i = t.length > 0 ? t.join("=") : void 0;
            (i = void 0 === i ? null : a(i)), n(a(r), i, o);
          }),
          Object.keys(o)
            .sort()
            .reduce(function(e, t) {
              var n = o[t];
              return (
                Boolean(n) &&
                "object" === (void 0 === n ? "undefined" : r(n)) &&
                !Array.isArray(n)
                  ? (e[t] = (function e(t) {
                      return Array.isArray(t)
                        ? t.sort()
                        : "object" === (void 0 === t ? "undefined" : r(t))
                        ? e(Object.keys(t))
                            .sort(function(e, t) {
                              return Number(e) - Number(t);
                            })
                            .map(function(e) {
                              return t[e];
                            })
                        : t;
                    })(n))
                  : (e[t] = n),
                e
              );
            }, Object.create(null)))
        : o;
    }
    (t.extract = c),
      (t.parse = s),
      (t.stringify = function(e, t) {
        !1 ===
          (t = i(
            {
              encode: !0,
              strict: !0,
              arrayFormat: "none"
            },
            t
          )).sort && (t.sort = function() {});
        var n = (function(e) {
          switch (e.arrayFormat) {
            case "index":
              return function(t, n, r) {
                return null === n
                  ? [u(t, e), "[", r, "]"].join("")
                  : [u(t, e), "[", u(r, e), "]=", u(n, e)].join("");
              };
            case "bracket":
              return function(t, n) {
                return null === n
                  ? u(t, e)
                  : [u(t, e), "[]=", u(n, e)].join("");
              };
            default:
              return function(t, n) {
                return null === n ? u(t, e) : [u(t, e), "=", u(n, e)].join("");
              };
          }
        })(t);
        return e
          ? Object.keys(e)
              .sort(t.sort)
              .map(function(r) {
                var o = e[r];
                if (void 0 === o) return "";
                if (null === o) return u(r, t);
                if (Array.isArray(o)) {
                  var i = [];
                  return (
                    o.slice().forEach(function(e) {
                      void 0 !== e && i.push(n(r, e, i.length));
                    }),
                    i.join("&")
                  );
                }
                return u(r, t) + "=" + u(o, t);
              })
              .filter(function(e) {
                return e.length > 0;
              })
              .join("&")
          : "";
      }),
      (t.parseUrl = function(e, t) {
        return {
          url: e.split("?")[0] || "",
          query: s(c(e), t)
        };
      });
  },
  function(e, t, n) {
    "use strict";
    e.exports = function(e) {
      return encodeURIComponent(e).replace(/[!'()*]/g, function(e) {
        return (
          "%" +
          e
            .charCodeAt(0)
            .toString(16)
            .toUpperCase()
        );
      });
    };
  },
  function(e, t, n) {
    "use strict";
    /*
object-assign
(c) Sindre Sorhus
@license MIT
*/
    var r = Object.getOwnPropertySymbols,
      o = Object.prototype.hasOwnProperty,
      i = Object.prototype.propertyIsEnumerable;
    e.exports = (function() {
      try {
        if (!Object.assign) return !1;
        var e = new String("abc");
        if (((e[5] = "de"), "5" === Object.getOwnPropertyNames(e)[0]))
          return !1;
        for (var t = {}, n = 0; n < 10; n++)
          t["_" + String.fromCharCode(n)] = n;
        if (
          "0123456789" !==
          Object.getOwnPropertyNames(t)
            .map(function(e) {
              return t[e];
            })
            .join("")
        )
          return !1;
        var r = {};
        return (
          "abcdefghijklmnopqrst".split("").forEach(function(e) {
            r[e] = e;
          }),
          "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
        );
      } catch (e) {
        return !1;
      }
    })()
      ? Object.assign
      : function(e, t) {
          for (
            var n,
              a,
              u = (function(e) {
                if (null === e || void 0 === e)
                  throw new TypeError(
                    "Object.assign cannot be called with null or undefined"
                  );
                return Object(e);
              })(e),
              c = 1;
            c < arguments.length;
            c++
          ) {
            for (var s in (n = Object(arguments[c])))
              o.call(n, s) && (u[s] = n[s]);
            if (r) {
              a = r(n);
              for (var l = 0; l < a.length; l++)
                i.call(n, a[l]) && (u[a[l]] = n[a[l]]);
            }
          }
          return u;
        };
  },
  function(e, t, n) {
    "use strict";
    var r =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            },
      o = new RegExp("%[a-f0-9]{2}", "gi"),
      i = new RegExp("(%[a-f0-9]{2})+", "gi");
    function a(e, t) {
      try {
        return decodeURIComponent(e.join(""));
      } catch (e) {}
      if (1 === e.length) return e;
      t = t || 1;
      var n = e.slice(0, t),
        r = e.slice(t);
      return Array.prototype.concat.call([], a(n), a(r));
    }
    function u(e) {
      try {
        return decodeURIComponent(e);
      } catch (r) {
        for (var t = e.match(o), n = 1; n < t.length; n++)
          t = (e = a(t, n).join("")).match(o);
        return e;
      }
    }
    e.exports = function(e) {
      if ("string" != typeof e)
        throw new TypeError(
          "Expected `encodedURI` to be of type `string`, got `" +
            (void 0 === e ? "undefined" : r(e)) +
            "`"
        );
      try {
        return (e = e.replace(/\+/g, " ")), decodeURIComponent(e);
      } catch (t) {
        return (function(e) {
          for (
            var t = {
                "%FE%FF": "��",
                "%FF%FE": "��"
              },
              n = i.exec(e);
            n;

          ) {
            try {
              t[n[0]] = decodeURIComponent(n[0]);
            } catch (e) {
              var r = u(n[0]);
              r !== n[0] && (t[n[0]] = r);
            }
            n = i.exec(e);
          }
          t["%C2"] = "�";
          for (var o = Object.keys(t), a = 0; a < o.length; a++) {
            var c = o[a];
            e = e.replace(new RegExp(c, "g"), t[c]);
          }
          return e;
        })(e);
      }
    };
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = (function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    })();
    (t.isValidOrigin = a),
      (function() {
        if ("function" == typeof window.CustomEvent) return !1;
        function e(e, t) {
          t = t || {
            bubbles: !1,
            cancelable: !1,
            detail: void 0
          };
          var n = document.createEvent("CustomEvent");
          return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
        }
        (e.prototype = window.Event.prototype), (window.CustomEvent = e);
      })();
    var o = (t.allowedEvents = {
        "opinary.vote": "vote",
        "opinary.impression": "impression"
      }),
      i = (function() {
        function e() {
          !(function(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
            (this.listeners = {});
          var t = this.handleEvent.bind(this);
          window.addEventListener("message", t);
        }
        return (
          r(e, [
            {
              key: "on",
              value: function(e, t) {
                this.listeners[e]
                  ? this.listeners[e].push(t)
                  : (this.listeners[e] = [t]);
              }
            },
            {
              key: "clearListeners",
              value: function() {
                var e = this;
                Object.keys(o).forEach(function(t) {
                  t in e.listeners &&
                    window.removeEventListener("message", e.handleEvent);
                }),
                  (this.listeners = {});
              }
            },
            {
              key: "handleEvent",
              value: function(e) {
                var t =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : this.listeners;
                a(e.origin) &&
                  t &&
                  e &&
                  e.data &&
                  t[e.data.type] &&
                  t[e.data.type].forEach(function(t) {
                    return t(e.data.payload);
                  });
              }
            },
            {
              key: "nomatch",
              value: function() {
                var e = new CustomEvent("OpinaryNoMatch");
                window.dispatchEvent(e);
              }
            },
            {
              key: "ready",
              value: function() {
                var e = new CustomEvent("OpinaryReady");
                window.dispatchEvent(e);
              }
            }
          ]),
          e
        );
      })();
    function a(e) {
      for (
        var t = [
            "localhost",
            "kompassrouter.appspot.com",
            "compass.pressekompass.net",
            "opinary.com"
          ],
          n = 0;
        n < t.length;
        n++
      )
        if (e.indexOf(t[n]) > -1) return !0;
      return !1;
    }
    t.default = i;
  }
]);
