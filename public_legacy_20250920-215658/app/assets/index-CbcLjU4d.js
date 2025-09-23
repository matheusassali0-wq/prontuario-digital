function Yp(l, i) {
  for (var u = 0; u < i.length; u++) {
    const a = i[u];
    if (typeof a != "string" && !Array.isArray(a)) {
      for (const c in a)
        if (c !== "default" && !(c in l)) {
          const d = Object.getOwnPropertyDescriptor(a, c);
          d &&
            Object.defineProperty(
              l,
              c,
              d.get ? d : { enumerable: !0, get: () => a[c] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(l, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const i = document.createElement("link").relList;
  if (i && i.supports && i.supports("modulepreload")) return;
  for (const c of document.querySelectorAll('link[rel="modulepreload"]')) a(c);
  new MutationObserver((c) => {
    for (const d of c)
      if (d.type === "childList")
        for (const p of d.addedNodes)
          p.tagName === "LINK" && p.rel === "modulepreload" && a(p);
  }).observe(document, { childList: !0, subtree: !0 });
  function u(c) {
    const d = {};
    return (
      c.integrity && (d.integrity = c.integrity),
      c.referrerPolicy && (d.referrerPolicy = c.referrerPolicy),
      c.crossOrigin === "use-credentials"
        ? (d.credentials = "include")
        : c.crossOrigin === "anonymous"
          ? (d.credentials = "omit")
          : (d.credentials = "same-origin"),
      d
    );
  }
  function a(c) {
    if (c.ep) return;
    c.ep = !0;
    const d = u(c);
    fetch(c.href, d);
  }
})();
function mf(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default")
    ? l.default
    : l;
}
var yu = { exports: {} },
  $r = {},
  gu = { exports: {} },
  le = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Dc;
function Gp() {
  if (Dc) return le;
  Dc = 1;
  var l = Symbol.for("react.element"),
    i = Symbol.for("react.portal"),
    u = Symbol.for("react.fragment"),
    a = Symbol.for("react.strict_mode"),
    c = Symbol.for("react.profiler"),
    d = Symbol.for("react.provider"),
    p = Symbol.for("react.context"),
    v = Symbol.for("react.forward_ref"),
    w = Symbol.for("react.suspense"),
    x = Symbol.for("react.memo"),
    S = Symbol.for("react.lazy"),
    R = Symbol.iterator;
  function D(g) {
    return g === null || typeof g != "object"
      ? null
      : ((g = (R && g[R]) || g["@@iterator"]),
        typeof g == "function" ? g : null);
  }
  var q = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    N = Object.assign,
    O = {};
  function _(g, T, ee) {
    ((this.props = g),
      (this.context = T),
      (this.refs = O),
      (this.updater = ee || q));
  }
  ((_.prototype.isReactComponent = {}),
    (_.prototype.setState = function (g, T) {
      if (typeof g != "object" && typeof g != "function" && g != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, g, T, "setState");
    }),
    (_.prototype.forceUpdate = function (g) {
      this.updater.enqueueForceUpdate(this, g, "forceUpdate");
    }));
  function J() {}
  J.prototype = _.prototype;
  function X(g, T, ee) {
    ((this.props = g),
      (this.context = T),
      (this.refs = O),
      (this.updater = ee || q));
  }
  var K = (X.prototype = new J());
  ((K.constructor = X), N(K, _.prototype), (K.isPureReactComponent = !0));
  var A = Array.isArray,
    re = Object.prototype.hasOwnProperty,
    de = { current: null },
    ae = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Ne(g, T, ee) {
    var te,
      oe = {},
      ue = null,
      pe = null;
    if (T != null)
      for (te in (T.ref !== void 0 && (pe = T.ref),
      T.key !== void 0 && (ue = "" + T.key),
      T))
        re.call(T, te) && !ae.hasOwnProperty(te) && (oe[te] = T[te]);
    var ce = arguments.length - 2;
    if (ce === 1) oe.children = ee;
    else if (1 < ce) {
      for (var we = Array(ce), lt = 0; lt < ce; lt++)
        we[lt] = arguments[lt + 2];
      oe.children = we;
    }
    if (g && g.defaultProps)
      for (te in ((ce = g.defaultProps), ce))
        oe[te] === void 0 && (oe[te] = ce[te]);
    return {
      $$typeof: l,
      type: g,
      key: ue,
      ref: pe,
      props: oe,
      _owner: de.current,
    };
  }
  function Qe(g, T) {
    return {
      $$typeof: l,
      type: g.type,
      key: T,
      ref: g.ref,
      props: g.props,
      _owner: g._owner,
    };
  }
  function Me(g) {
    return typeof g == "object" && g !== null && g.$$typeof === l;
  }
  function at(g) {
    var T = { "=": "=0", ":": "=2" };
    return (
      "$" +
      g.replace(/[=:]/g, function (ee) {
        return T[ee];
      })
    );
  }
  var Ke = /\/+/g;
  function Oe(g, T) {
    return typeof g == "object" && g !== null && g.key != null
      ? at("" + g.key)
      : T.toString(36);
  }
  function Le(g, T, ee, te, oe) {
    var ue = typeof g;
    (ue === "undefined" || ue === "boolean") && (g = null);
    var pe = !1;
    if (g === null) pe = !0;
    else
      switch (ue) {
        case "string":
        case "number":
          pe = !0;
          break;
        case "object":
          switch (g.$$typeof) {
            case l:
            case i:
              pe = !0;
          }
      }
    if (pe)
      return (
        (pe = g),
        (oe = oe(pe)),
        (g = te === "" ? "." + Oe(pe, 0) : te),
        A(oe)
          ? ((ee = ""),
            g != null && (ee = g.replace(Ke, "$&/") + "/"),
            Le(oe, T, ee, "", function (lt) {
              return lt;
            }))
          : oe != null &&
            (Me(oe) &&
              (oe = Qe(
                oe,
                ee +
                  (!oe.key || (pe && pe.key === oe.key)
                    ? ""
                    : ("" + oe.key).replace(Ke, "$&/") + "/") +
                  g,
              )),
            T.push(oe)),
        1
      );
    if (((pe = 0), (te = te === "" ? "." : te + ":"), A(g)))
      for (var ce = 0; ce < g.length; ce++) {
        ue = g[ce];
        var we = te + Oe(ue, ce);
        pe += Le(ue, T, ee, we, oe);
      }
    else if (((we = D(g)), typeof we == "function"))
      for (g = we.call(g), ce = 0; !(ue = g.next()).done; )
        ((ue = ue.value),
          (we = te + Oe(ue, ce++)),
          (pe += Le(ue, T, ee, we, oe)));
    else if (ue === "object")
      throw (
        (T = String(g)),
        Error(
          "Objects are not valid as a React child (found: " +
            (T === "[object Object]"
              ? "object with keys {" + Object.keys(g).join(", ") + "}"
              : T) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    return pe;
  }
  function rt(g, T, ee) {
    if (g == null) return g;
    var te = [],
      oe = 0;
    return (
      Le(g, te, "", "", function (ue) {
        return T.call(ee, ue, oe++);
      }),
      te
    );
  }
  function me(g) {
    if (g._status === -1) {
      var T = g._result;
      ((T = T()),
        T.then(
          function (ee) {
            (g._status === 0 || g._status === -1) &&
              ((g._status = 1), (g._result = ee));
          },
          function (ee) {
            (g._status === 0 || g._status === -1) &&
              ((g._status = 2), (g._result = ee));
          },
        ),
        g._status === -1 && ((g._status = 0), (g._result = T)));
    }
    if (g._status === 1) return g._result.default;
    throw g._result;
  }
  var ve = { current: null },
    I = { transition: null },
    Y = {
      ReactCurrentDispatcher: ve,
      ReactCurrentBatchConfig: I,
      ReactCurrentOwner: de,
    };
  function $() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return (
    (le.Children = {
      map: rt,
      forEach: function (g, T, ee) {
        rt(
          g,
          function () {
            T.apply(this, arguments);
          },
          ee,
        );
      },
      count: function (g) {
        var T = 0;
        return (
          rt(g, function () {
            T++;
          }),
          T
        );
      },
      toArray: function (g) {
        return (
          rt(g, function (T) {
            return T;
          }) || []
        );
      },
      only: function (g) {
        if (!Me(g))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return g;
      },
    }),
    (le.Component = _),
    (le.Fragment = u),
    (le.Profiler = c),
    (le.PureComponent = X),
    (le.StrictMode = a),
    (le.Suspense = w),
    (le.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Y),
    (le.act = $),
    (le.cloneElement = function (g, T, ee) {
      if (g == null)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            g +
            ".",
        );
      var te = N({}, g.props),
        oe = g.key,
        ue = g.ref,
        pe = g._owner;
      if (T != null) {
        if (
          (T.ref !== void 0 && ((ue = T.ref), (pe = de.current)),
          T.key !== void 0 && (oe = "" + T.key),
          g.type && g.type.defaultProps)
        )
          var ce = g.type.defaultProps;
        for (we in T)
          re.call(T, we) &&
            !ae.hasOwnProperty(we) &&
            (te[we] = T[we] === void 0 && ce !== void 0 ? ce[we] : T[we]);
      }
      var we = arguments.length - 2;
      if (we === 1) te.children = ee;
      else if (1 < we) {
        ce = Array(we);
        for (var lt = 0; lt < we; lt++) ce[lt] = arguments[lt + 2];
        te.children = ce;
      }
      return {
        $$typeof: l,
        type: g.type,
        key: oe,
        ref: ue,
        props: te,
        _owner: pe,
      };
    }),
    (le.createContext = function (g) {
      return (
        (g = {
          $$typeof: p,
          _currentValue: g,
          _currentValue2: g,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (g.Provider = { $$typeof: d, _context: g }),
        (g.Consumer = g)
      );
    }),
    (le.createElement = Ne),
    (le.createFactory = function (g) {
      var T = Ne.bind(null, g);
      return ((T.type = g), T);
    }),
    (le.createRef = function () {
      return { current: null };
    }),
    (le.forwardRef = function (g) {
      return { $$typeof: v, render: g };
    }),
    (le.isValidElement = Me),
    (le.lazy = function (g) {
      return { $$typeof: S, _payload: { _status: -1, _result: g }, _init: me };
    }),
    (le.memo = function (g, T) {
      return { $$typeof: x, type: g, compare: T === void 0 ? null : T };
    }),
    (le.startTransition = function (g) {
      var T = I.transition;
      I.transition = {};
      try {
        g();
      } finally {
        I.transition = T;
      }
    }),
    (le.unstable_act = $),
    (le.useCallback = function (g, T) {
      return ve.current.useCallback(g, T);
    }),
    (le.useContext = function (g) {
      return ve.current.useContext(g);
    }),
    (le.useDebugValue = function () {}),
    (le.useDeferredValue = function (g) {
      return ve.current.useDeferredValue(g);
    }),
    (le.useEffect = function (g, T) {
      return ve.current.useEffect(g, T);
    }),
    (le.useId = function () {
      return ve.current.useId();
    }),
    (le.useImperativeHandle = function (g, T, ee) {
      return ve.current.useImperativeHandle(g, T, ee);
    }),
    (le.useInsertionEffect = function (g, T) {
      return ve.current.useInsertionEffect(g, T);
    }),
    (le.useLayoutEffect = function (g, T) {
      return ve.current.useLayoutEffect(g, T);
    }),
    (le.useMemo = function (g, T) {
      return ve.current.useMemo(g, T);
    }),
    (le.useReducer = function (g, T, ee) {
      return ve.current.useReducer(g, T, ee);
    }),
    (le.useRef = function (g) {
      return ve.current.useRef(g);
    }),
    (le.useState = function (g) {
      return ve.current.useState(g);
    }),
    (le.useSyncExternalStore = function (g, T, ee) {
      return ve.current.useSyncExternalStore(g, T, ee);
    }),
    (le.useTransition = function () {
      return ve.current.useTransition();
    }),
    (le.version = "18.3.1"),
    le
  );
}
var Uc;
function Du() {
  return (Uc || ((Uc = 1), (gu.exports = Gp())), gu.exports);
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ac;
function Zp() {
  if (Ac) return $r;
  Ac = 1;
  var l = Du(),
    i = Symbol.for("react.element"),
    u = Symbol.for("react.fragment"),
    a = Object.prototype.hasOwnProperty,
    c = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    d = { key: !0, ref: !0, __self: !0, __source: !0 };
  function p(v, w, x) {
    var S,
      R = {},
      D = null,
      q = null;
    (x !== void 0 && (D = "" + x),
      w.key !== void 0 && (D = "" + w.key),
      w.ref !== void 0 && (q = w.ref));
    for (S in w) a.call(w, S) && !d.hasOwnProperty(S) && (R[S] = w[S]);
    if (v && v.defaultProps)
      for (S in ((w = v.defaultProps), w)) R[S] === void 0 && (R[S] = w[S]);
    return {
      $$typeof: i,
      type: v,
      key: D,
      ref: q,
      props: R,
      _owner: c.current,
    };
  }
  return (($r.Fragment = u), ($r.jsx = p), ($r.jsxs = p), $r);
}
var Ic;
function bp() {
  return (Ic || ((Ic = 1), (yu.exports = Zp())), yu.exports);
}
var B = bp(),
  U = Du();
const vf = mf(U),
  eh = Yp({ __proto__: null, default: vf }, [U]);
var uo = {},
  wu = { exports: {} },
  et = {},
  Su = { exports: {} },
  Eu = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Mc;
function th() {
  return (
    Mc ||
      ((Mc = 1),
      (function (l) {
        function i(I, Y) {
          var $ = I.length;
          I.push(Y);
          e: for (; 0 < $; ) {
            var g = ($ - 1) >>> 1,
              T = I[g];
            if (0 < c(T, Y)) ((I[g] = Y), (I[$] = T), ($ = g));
            else break e;
          }
        }
        function u(I) {
          return I.length === 0 ? null : I[0];
        }
        function a(I) {
          if (I.length === 0) return null;
          var Y = I[0],
            $ = I.pop();
          if ($ !== Y) {
            I[0] = $;
            e: for (var g = 0, T = I.length, ee = T >>> 1; g < ee; ) {
              var te = 2 * (g + 1) - 1,
                oe = I[te],
                ue = te + 1,
                pe = I[ue];
              if (0 > c(oe, $))
                ue < T && 0 > c(pe, oe)
                  ? ((I[g] = pe), (I[ue] = $), (g = ue))
                  : ((I[g] = oe), (I[te] = $), (g = te));
              else if (ue < T && 0 > c(pe, $))
                ((I[g] = pe), (I[ue] = $), (g = ue));
              else break e;
            }
          }
          return Y;
        }
        function c(I, Y) {
          var $ = I.sortIndex - Y.sortIndex;
          return $ !== 0 ? $ : I.id - Y.id;
        }
        if (
          typeof performance == "object" &&
          typeof performance.now == "function"
        ) {
          var d = performance;
          l.unstable_now = function () {
            return d.now();
          };
        } else {
          var p = Date,
            v = p.now();
          l.unstable_now = function () {
            return p.now() - v;
          };
        }
        var w = [],
          x = [],
          S = 1,
          R = null,
          D = 3,
          q = !1,
          N = !1,
          O = !1,
          _ = typeof setTimeout == "function" ? setTimeout : null,
          J = typeof clearTimeout == "function" ? clearTimeout : null,
          X = typeof setImmediate < "u" ? setImmediate : null;
        typeof navigator < "u" &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function K(I) {
          for (var Y = u(x); Y !== null; ) {
            if (Y.callback === null) a(x);
            else if (Y.startTime <= I)
              (a(x), (Y.sortIndex = Y.expirationTime), i(w, Y));
            else break;
            Y = u(x);
          }
        }
        function A(I) {
          if (((O = !1), K(I), !N))
            if (u(w) !== null) ((N = !0), me(re));
            else {
              var Y = u(x);
              Y !== null && ve(A, Y.startTime - I);
            }
        }
        function re(I, Y) {
          ((N = !1), O && ((O = !1), J(Ne), (Ne = -1)), (q = !0));
          var $ = D;
          try {
            for (
              K(Y), R = u(w);
              R !== null && (!(R.expirationTime > Y) || (I && !at()));

            ) {
              var g = R.callback;
              if (typeof g == "function") {
                ((R.callback = null), (D = R.priorityLevel));
                var T = g(R.expirationTime <= Y);
                ((Y = l.unstable_now()),
                  typeof T == "function"
                    ? (R.callback = T)
                    : R === u(w) && a(w),
                  K(Y));
              } else a(w);
              R = u(w);
            }
            if (R !== null) var ee = !0;
            else {
              var te = u(x);
              (te !== null && ve(A, te.startTime - Y), (ee = !1));
            }
            return ee;
          } finally {
            ((R = null), (D = $), (q = !1));
          }
        }
        var de = !1,
          ae = null,
          Ne = -1,
          Qe = 5,
          Me = -1;
        function at() {
          return !(l.unstable_now() - Me < Qe);
        }
        function Ke() {
          if (ae !== null) {
            var I = l.unstable_now();
            Me = I;
            var Y = !0;
            try {
              Y = ae(!0, I);
            } finally {
              Y ? Oe() : ((de = !1), (ae = null));
            }
          } else de = !1;
        }
        var Oe;
        if (typeof X == "function")
          Oe = function () {
            X(Ke);
          };
        else if (typeof MessageChannel < "u") {
          var Le = new MessageChannel(),
            rt = Le.port2;
          ((Le.port1.onmessage = Ke),
            (Oe = function () {
              rt.postMessage(null);
            }));
        } else
          Oe = function () {
            _(Ke, 0);
          };
        function me(I) {
          ((ae = I), de || ((de = !0), Oe()));
        }
        function ve(I, Y) {
          Ne = _(function () {
            I(l.unstable_now());
          }, Y);
        }
        ((l.unstable_IdlePriority = 5),
          (l.unstable_ImmediatePriority = 1),
          (l.unstable_LowPriority = 4),
          (l.unstable_NormalPriority = 3),
          (l.unstable_Profiling = null),
          (l.unstable_UserBlockingPriority = 2),
          (l.unstable_cancelCallback = function (I) {
            I.callback = null;
          }),
          (l.unstable_continueExecution = function () {
            N || q || ((N = !0), me(re));
          }),
          (l.unstable_forceFrameRate = function (I) {
            0 > I || 125 < I
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (Qe = 0 < I ? Math.floor(1e3 / I) : 5);
          }),
          (l.unstable_getCurrentPriorityLevel = function () {
            return D;
          }),
          (l.unstable_getFirstCallbackNode = function () {
            return u(w);
          }),
          (l.unstable_next = function (I) {
            switch (D) {
              case 1:
              case 2:
              case 3:
                var Y = 3;
                break;
              default:
                Y = D;
            }
            var $ = D;
            D = Y;
            try {
              return I();
            } finally {
              D = $;
            }
          }),
          (l.unstable_pauseExecution = function () {}),
          (l.unstable_requestPaint = function () {}),
          (l.unstable_runWithPriority = function (I, Y) {
            switch (I) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                I = 3;
            }
            var $ = D;
            D = I;
            try {
              return Y();
            } finally {
              D = $;
            }
          }),
          (l.unstable_scheduleCallback = function (I, Y, $) {
            var g = l.unstable_now();
            switch (
              (typeof $ == "object" && $ !== null
                ? (($ = $.delay),
                  ($ = typeof $ == "number" && 0 < $ ? g + $ : g))
                : ($ = g),
              I)
            ) {
              case 1:
                var T = -1;
                break;
              case 2:
                T = 250;
                break;
              case 5:
                T = 1073741823;
                break;
              case 4:
                T = 1e4;
                break;
              default:
                T = 5e3;
            }
            return (
              (T = $ + T),
              (I = {
                id: S++,
                callback: Y,
                priorityLevel: I,
                startTime: $,
                expirationTime: T,
                sortIndex: -1,
              }),
              $ > g
                ? ((I.sortIndex = $),
                  i(x, I),
                  u(w) === null &&
                    I === u(x) &&
                    (O ? (J(Ne), (Ne = -1)) : (O = !0), ve(A, $ - g)))
                : ((I.sortIndex = T), i(w, I), N || q || ((N = !0), me(re))),
              I
            );
          }),
          (l.unstable_shouldYield = at),
          (l.unstable_wrapCallback = function (I) {
            var Y = D;
            return function () {
              var $ = D;
              D = Y;
              try {
                return I.apply(this, arguments);
              } finally {
                D = $;
              }
            };
          }));
      })(Eu)),
    Eu
  );
}
var Bc;
function nh() {
  return (Bc || ((Bc = 1), (Su.exports = th())), Su.exports);
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $c;
function rh() {
  if ($c) return et;
  $c = 1;
  var l = Du(),
    i = nh();
  function u(e) {
    for (
      var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
        n = 1;
      n < arguments.length;
      n++
    )
      t += "&args[]=" + encodeURIComponent(arguments[n]);
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  var a = new Set(),
    c = {};
  function d(e, t) {
    (p(e, t), p(e + "Capture", t));
  }
  function p(e, t) {
    for (c[e] = t, e = 0; e < t.length; e++) a.add(t[e]);
  }
  var v = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    w = Object.prototype.hasOwnProperty,
    x =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    S = {},
    R = {};
  function D(e) {
    return w.call(R, e)
      ? !0
      : w.call(S, e)
        ? !1
        : x.test(e)
          ? (R[e] = !0)
          : ((S[e] = !0), !1);
  }
  function q(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return r
          ? !1
          : n !== null
            ? !n.acceptsBooleans
            : ((e = e.toLowerCase().slice(0, 5)),
              e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function N(e, t, n, r) {
    if (t === null || typeof t > "u" || q(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null)
      switch (n.type) {
        case 3:
          return !t;
        case 4:
          return t === !1;
        case 5:
          return isNaN(t);
        case 6:
          return isNaN(t) || 1 > t;
      }
    return !1;
  }
  function O(e, t, n, r, o, s, f) {
    ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
      (this.attributeName = r),
      (this.attributeNamespace = o),
      (this.mustUseProperty = n),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = s),
      (this.removeEmptyString = f));
  }
  var _ = {};
  ("children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
      _[e] = new O(e, 0, !1, e, null, !1, !1);
    }),
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (e) {
      var t = e[0];
      _[t] = new O(t, 1, !1, e[1], null, !1, !1);
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(
      function (e) {
        _[e] = new O(e, 2, !1, e.toLowerCase(), null, !1, !1);
      },
    ),
    [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (e) {
      _[e] = new O(e, 2, !1, e, null, !1, !1);
    }),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (e) {
        _[e] = new O(e, 3, !1, e.toLowerCase(), null, !1, !1);
      }),
    ["checked", "multiple", "muted", "selected"].forEach(function (e) {
      _[e] = new O(e, 3, !0, e, null, !1, !1);
    }),
    ["capture", "download"].forEach(function (e) {
      _[e] = new O(e, 4, !1, e, null, !1, !1);
    }),
    ["cols", "rows", "size", "span"].forEach(function (e) {
      _[e] = new O(e, 6, !1, e, null, !1, !1);
    }),
    ["rowSpan", "start"].forEach(function (e) {
      _[e] = new O(e, 5, !1, e.toLowerCase(), null, !1, !1);
    }));
  var J = /[\-:]([a-z])/g;
  function X(e) {
    return e[1].toUpperCase();
  }
  ("accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
      var t = e.replace(J, X);
      _[t] = new O(t, 1, !1, e, null, !1, !1);
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (e) {
        var t = e.replace(J, X);
        _[t] = new O(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
      }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
      var t = e.replace(J, X);
      _[t] = new O(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
    }),
    ["tabIndex", "crossOrigin"].forEach(function (e) {
      _[e] = new O(e, 1, !1, e.toLowerCase(), null, !1, !1);
    }),
    (_.xlinkHref = new O(
      "xlinkHref",
      1,
      !1,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      !1,
    )),
    ["src", "href", "action", "formAction"].forEach(function (e) {
      _[e] = new O(e, 1, !1, e.toLowerCase(), null, !0, !0);
    }));
  function K(e, t, n, r) {
    var o = _.hasOwnProperty(t) ? _[t] : null;
    (o !== null
      ? o.type !== 0
      : r ||
        !(2 < t.length) ||
        (t[0] !== "o" && t[0] !== "O") ||
        (t[1] !== "n" && t[1] !== "N")) &&
      (N(t, n, o, r) && (n = null),
      r || o === null
        ? D(t) &&
          (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
        : o.mustUseProperty
          ? (e[o.propertyName] = n === null ? (o.type === 3 ? !1 : "") : n)
          : ((t = o.attributeName),
            (r = o.attributeNamespace),
            n === null
              ? e.removeAttribute(t)
              : ((o = o.type),
                (n = o === 3 || (o === 4 && n === !0) ? "" : "" + n),
                r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var A = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    re = Symbol.for("react.element"),
    de = Symbol.for("react.portal"),
    ae = Symbol.for("react.fragment"),
    Ne = Symbol.for("react.strict_mode"),
    Qe = Symbol.for("react.profiler"),
    Me = Symbol.for("react.provider"),
    at = Symbol.for("react.context"),
    Ke = Symbol.for("react.forward_ref"),
    Oe = Symbol.for("react.suspense"),
    Le = Symbol.for("react.suspense_list"),
    rt = Symbol.for("react.memo"),
    me = Symbol.for("react.lazy"),
    ve = Symbol.for("react.offscreen"),
    I = Symbol.iterator;
  function Y(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (I && e[I]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var $ = Object.assign,
    g;
  function T(e) {
    if (g === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        g = (t && t[1]) || "";
      }
    return (
      `
` +
      g +
      e
    );
  }
  var ee = !1;
  function te(e, t) {
    if (!e || ee) return "";
    ee = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t)
        if (
          ((t = function () {
            throw Error();
          }),
          Object.defineProperty(t.prototype, "props", {
            set: function () {
              throw Error();
            },
          }),
          typeof Reflect == "object" && Reflect.construct)
        ) {
          try {
            Reflect.construct(t, []);
          } catch (C) {
            var r = C;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (C) {
            r = C;
          }
          e.call(t.prototype);
        }
      else {
        try {
          throw Error();
        } catch (C) {
          r = C;
        }
        e();
      }
    } catch (C) {
      if (C && r && typeof C.stack == "string") {
        for (
          var o = C.stack.split(`
`),
            s = r.stack.split(`
`),
            f = o.length - 1,
            h = s.length - 1;
          1 <= f && 0 <= h && o[f] !== s[h];

        )
          h--;
        for (; 1 <= f && 0 <= h; f--, h--)
          if (o[f] !== s[h]) {
            if (f !== 1 || h !== 1)
              do
                if ((f--, h--, 0 > h || o[f] !== s[h])) {
                  var m =
                    `
` + o[f].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      m.includes("<anonymous>") &&
                      (m = m.replace("<anonymous>", e.displayName)),
                    m
                  );
                }
              while (1 <= f && 0 <= h);
            break;
          }
      }
    } finally {
      ((ee = !1), (Error.prepareStackTrace = n));
    }
    return (e = e ? e.displayName || e.name : "") ? T(e) : "";
  }
  function oe(e) {
    switch (e.tag) {
      case 5:
        return T(e.type);
      case 16:
        return T("Lazy");
      case 13:
        return T("Suspense");
      case 19:
        return T("SuspenseList");
      case 0:
      case 2:
      case 15:
        return ((e = te(e.type, !1)), e);
      case 11:
        return ((e = te(e.type.render, !1)), e);
      case 1:
        return ((e = te(e.type, !0)), e);
      default:
        return "";
    }
  }
  function ue(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case ae:
        return "Fragment";
      case de:
        return "Portal";
      case Qe:
        return "Profiler";
      case Ne:
        return "StrictMode";
      case Oe:
        return "Suspense";
      case Le:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case at:
          return (e.displayName || "Context") + ".Consumer";
        case Me:
          return (e._context.displayName || "Context") + ".Provider";
        case Ke:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case rt:
          return (
            (t = e.displayName || null),
            t !== null ? t : ue(e.type) || "Memo"
          );
        case me:
          ((t = e._payload), (e = e._init));
          try {
            return ue(e(t));
          } catch {}
      }
    return null;
  }
  function pe(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return (
          (e = t.render),
          (e = e.displayName || e.name || ""),
          t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
        );
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return ue(t);
      case 8:
        return t === Ne ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == "function") return t.displayName || t.name || null;
        if (typeof t == "string") return t;
    }
    return null;
  }
  function ce(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function we(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function lt(e) {
    var t = we(e) ? "checked" : "value",
      n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      r = "" + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof n < "u" &&
      typeof n.get == "function" &&
      typeof n.set == "function"
    ) {
      var o = n.get,
        s = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return o.call(this);
          },
          set: function (f) {
            ((r = "" + f), s.call(this, f));
          },
        }),
        Object.defineProperty(e, t, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return r;
          },
          setValue: function (f) {
            r = "" + f;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function Gr(e) {
    e._valueTracker || (e._valueTracker = lt(e));
  }
  function $u(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      r = "";
    return (
      e && (r = we(e) ? (e.checked ? "true" : "false") : e.value),
      (e = r),
      e !== n ? (t.setValue(e), !0) : !1
    );
  }
  function Zr(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Co(e, t) {
    var n = t.checked;
    return $({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: n ?? e._wrapperState.initialChecked,
    });
  }
  function Hu(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
      r = t.checked != null ? t.checked : t.defaultChecked;
    ((n = ce(t.value != null ? t.value : n)),
      (e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled:
          t.type === "checkbox" || t.type === "radio"
            ? t.checked != null
            : t.value != null,
      }));
  }
  function Vu(e, t) {
    ((t = t.checked), t != null && K(e, "checked", t, !1));
  }
  function Ro(e, t) {
    Vu(e, t);
    var n = ce(t.value),
      r = t.type;
    if (n != null)
      r === "number"
        ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
        : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
      e.removeAttribute("value");
      return;
    }
    (t.hasOwnProperty("value")
      ? Po(e, t.type, n)
      : t.hasOwnProperty("defaultValue") && Po(e, t.type, ce(t.defaultValue)),
      t.checked == null &&
        t.defaultChecked != null &&
        (e.defaultChecked = !!t.defaultChecked));
  }
  function Wu(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (
        !(
          (r !== "submit" && r !== "reset") ||
          (t.value !== void 0 && t.value !== null)
        )
      )
        return;
      ((t = "" + e._wrapperState.initialValue),
        n || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((n = e.name),
      n !== "" && (e.name = ""),
      (e.defaultChecked = !!e._wrapperState.initialChecked),
      n !== "" && (e.name = n));
  }
  function Po(e, t, n) {
    (t !== "number" || Zr(e.ownerDocument) !== e) &&
      (n == null
        ? (e.defaultValue = "" + e._wrapperState.initialValue)
        : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var nr = Array.isArray;
  function Cn(e, t, n, r) {
    if (((e = e.options), t)) {
      t = {};
      for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
      for (n = 0; n < e.length; n++)
        ((o = t.hasOwnProperty("$" + e[n].value)),
          e[n].selected !== o && (e[n].selected = o),
          o && r && (e[n].defaultSelected = !0));
    } else {
      for (n = "" + ce(n), t = null, o = 0; o < e.length; o++) {
        if (e[o].value === n) {
          ((e[o].selected = !0), r && (e[o].defaultSelected = !0));
          return;
        }
        t !== null || e[o].disabled || (t = e[o]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function _o(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(u(91));
    return $({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: "" + e._wrapperState.initialValue,
    });
  }
  function Qu(e, t) {
    var n = t.value;
    if (n == null) {
      if (((n = t.children), (t = t.defaultValue), n != null)) {
        if (t != null) throw Error(u(92));
        if (nr(n)) {
          if (1 < n.length) throw Error(u(93));
          n = n[0];
        }
        t = n;
      }
      (t == null && (t = ""), (n = t));
    }
    e._wrapperState = { initialValue: ce(n) };
  }
  function Ku(e, t) {
    var n = ce(t.value),
      r = ce(t.defaultValue);
    (n != null &&
      ((n = "" + n),
      n !== e.value && (e.value = n),
      t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
      r != null && (e.defaultValue = "" + r));
  }
  function qu(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue &&
      t !== "" &&
      t !== null &&
      (e.value = t);
  }
  function Ju(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function No(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml"
      ? Ju(t)
      : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : e;
  }
  var br,
    Xu = (function (e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
        ? function (t, n, r, o) {
            MSApp.execUnsafeLocalFunction(function () {
              return e(t, n, r, o);
            });
          }
        : e;
    })(function (e, t) {
      if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
        e.innerHTML = t;
      else {
        for (
          br = br || document.createElement("div"),
            br.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
            t = br.firstChild;
          e.firstChild;

        )
          e.removeChild(e.firstChild);
        for (; t.firstChild; ) e.appendChild(t.firstChild);
      }
    });
  function rr(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var lr = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    ed = ["Webkit", "ms", "Moz", "O"];
  Object.keys(lr).forEach(function (e) {
    ed.forEach(function (t) {
      ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (lr[t] = lr[e]));
    });
  });
  function Yu(e, t, n) {
    return t == null || typeof t == "boolean" || t === ""
      ? ""
      : n || typeof t != "number" || t === 0 || (lr.hasOwnProperty(e) && lr[e])
        ? ("" + t).trim()
        : t + "px";
  }
  function Gu(e, t) {
    e = e.style;
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var r = n.indexOf("--") === 0,
          o = Yu(n, t[n], r);
        (n === "float" && (n = "cssFloat"),
          r ? e.setProperty(n, o) : (e[n] = o));
      }
  }
  var td = $(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    },
  );
  function To(e, t) {
    if (t) {
      if (td[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw Error(u(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(u(60));
        if (
          typeof t.dangerouslySetInnerHTML != "object" ||
          !("__html" in t.dangerouslySetInnerHTML)
        )
          throw Error(u(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(u(62));
    }
  }
  function Oo(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Lo = null;
  function jo(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var zo = null,
    Rn = null,
    Pn = null;
  function Zu(e) {
    if ((e = Pr(e))) {
      if (typeof zo != "function") throw Error(u(280));
      var t = e.stateNode;
      t && ((t = xl(t)), zo(e.stateNode, e.type, t));
    }
  }
  function bu(e) {
    Rn ? (Pn ? Pn.push(e) : (Pn = [e])) : (Rn = e);
  }
  function es() {
    if (Rn) {
      var e = Rn,
        t = Pn;
      if (((Pn = Rn = null), Zu(e), t)) for (e = 0; e < t.length; e++) Zu(t[e]);
    }
  }
  function ts(e, t) {
    return e(t);
  }
  function ns() {}
  var Fo = !1;
  function rs(e, t, n) {
    if (Fo) return e(t, n);
    Fo = !0;
    try {
      return ts(e, t, n);
    } finally {
      ((Fo = !1), (Rn !== null || Pn !== null) && (ns(), es()));
    }
  }
  function or(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = xl(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((r = !r.disabled) ||
          ((e = e.type),
          (r = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !r));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(u(231, t, typeof n));
    return n;
  }
  var Do = !1;
  if (v)
    try {
      var ir = {};
      (Object.defineProperty(ir, "passive", {
        get: function () {
          Do = !0;
        },
      }),
        window.addEventListener("test", ir, ir),
        window.removeEventListener("test", ir, ir));
    } catch {
      Do = !1;
    }
  function nd(e, t, n, r, o, s, f, h, m) {
    var C = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, C);
    } catch (j) {
      this.onError(j);
    }
  }
  var ur = !1,
    el = null,
    tl = !1,
    Uo = null,
    rd = {
      onError: function (e) {
        ((ur = !0), (el = e));
      },
    };
  function ld(e, t, n, r, o, s, f, h, m) {
    ((ur = !1), (el = null), nd.apply(rd, arguments));
  }
  function od(e, t, n, r, o, s, f, h, m) {
    if ((ld.apply(this, arguments), ur)) {
      if (ur) {
        var C = el;
        ((ur = !1), (el = null));
      } else throw Error(u(198));
      tl || ((tl = !0), (Uo = C));
    }
  }
  function sn(e) {
    var t = e,
      n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do ((t = e), (t.flags & 4098) !== 0 && (n = t.return), (e = t.return));
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function ls(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function os(e) {
    if (sn(e) !== e) throw Error(u(188));
  }
  function id(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = sn(e)), t === null)) throw Error(u(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var o = n.return;
      if (o === null) break;
      var s = o.alternate;
      if (s === null) {
        if (((r = o.return), r !== null)) {
          n = r;
          continue;
        }
        break;
      }
      if (o.child === s.child) {
        for (s = o.child; s; ) {
          if (s === n) return (os(o), e);
          if (s === r) return (os(o), t);
          s = s.sibling;
        }
        throw Error(u(188));
      }
      if (n.return !== r.return) ((n = o), (r = s));
      else {
        for (var f = !1, h = o.child; h; ) {
          if (h === n) {
            ((f = !0), (n = o), (r = s));
            break;
          }
          if (h === r) {
            ((f = !0), (r = o), (n = s));
            break;
          }
          h = h.sibling;
        }
        if (!f) {
          for (h = s.child; h; ) {
            if (h === n) {
              ((f = !0), (n = s), (r = o));
              break;
            }
            if (h === r) {
              ((f = !0), (r = s), (n = o));
              break;
            }
            h = h.sibling;
          }
          if (!f) throw Error(u(189));
        }
      }
      if (n.alternate !== r) throw Error(u(190));
    }
    if (n.tag !== 3) throw Error(u(188));
    return n.stateNode.current === n ? e : t;
  }
  function is(e) {
    return ((e = id(e)), e !== null ? us(e) : null);
  }
  function us(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = us(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var ss = i.unstable_scheduleCallback,
    as = i.unstable_cancelCallback,
    ud = i.unstable_shouldYield,
    sd = i.unstable_requestPaint,
    Re = i.unstable_now,
    ad = i.unstable_getCurrentPriorityLevel,
    Ao = i.unstable_ImmediatePriority,
    cs = i.unstable_UserBlockingPriority,
    nl = i.unstable_NormalPriority,
    cd = i.unstable_LowPriority,
    fs = i.unstable_IdlePriority,
    rl = null,
    Ct = null;
  function fd(e) {
    if (Ct && typeof Ct.onCommitFiberRoot == "function")
      try {
        Ct.onCommitFiberRoot(rl, e, void 0, (e.current.flags & 128) === 128);
      } catch {}
  }
  var vt = Math.clz32 ? Math.clz32 : hd,
    dd = Math.log,
    pd = Math.LN2;
  function hd(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((dd(e) / pd) | 0)) | 0);
  }
  var ll = 64,
    ol = 4194304;
  function sr(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function il(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
      o = e.suspendedLanes,
      s = e.pingedLanes,
      f = n & 268435455;
    if (f !== 0) {
      var h = f & ~o;
      h !== 0 ? (r = sr(h)) : ((s &= f), s !== 0 && (r = sr(s)));
    } else ((f = n & ~o), f !== 0 ? (r = sr(f)) : s !== 0 && (r = sr(s)));
    if (r === 0) return 0;
    if (
      t !== 0 &&
      t !== r &&
      (t & o) === 0 &&
      ((o = r & -r), (s = t & -t), o >= s || (o === 16 && (s & 4194240) !== 0))
    )
      return t;
    if (((r & 4) !== 0 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
      for (e = e.entanglements, t &= r; 0 < t; )
        ((n = 31 - vt(t)), (o = 1 << n), (r |= e[n]), (t &= ~o));
    return r;
  }
  function md(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function vd(e, t) {
    for (
      var n = e.suspendedLanes,
        r = e.pingedLanes,
        o = e.expirationTimes,
        s = e.pendingLanes;
      0 < s;

    ) {
      var f = 31 - vt(s),
        h = 1 << f,
        m = o[f];
      (m === -1
        ? ((h & n) === 0 || (h & r) !== 0) && (o[f] = md(h, t))
        : m <= t && (e.expiredLanes |= h),
        (s &= ~h));
    }
  }
  function Io(e) {
    return (
      (e = e.pendingLanes & -1073741825),
      e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    );
  }
  function ds() {
    var e = ll;
    return ((ll <<= 1), (ll & 4194240) === 0 && (ll = 64), e);
  }
  function Mo(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function ar(e, t, n) {
    ((e.pendingLanes |= t),
      t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
      (e = e.eventTimes),
      (t = 31 - vt(t)),
      (e[t] = n));
  }
  function yd(e, t) {
    var n = e.pendingLanes & ~t;
    ((e.pendingLanes = t),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.expiredLanes &= t),
      (e.mutableReadLanes &= t),
      (e.entangledLanes &= t),
      (t = e.entanglements));
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var o = 31 - vt(n),
        s = 1 << o;
      ((t[o] = 0), (r[o] = -1), (e[o] = -1), (n &= ~s));
    }
  }
  function Bo(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
      var r = 31 - vt(n),
        o = 1 << r;
      ((o & t) | (e[r] & t) && (e[r] |= t), (n &= ~o));
    }
  }
  var fe = 0;
  function ps(e) {
    return (
      (e &= -e),
      1 < e ? (4 < e ? ((e & 268435455) !== 0 ? 16 : 536870912) : 4) : 1
    );
  }
  var hs,
    $o,
    ms,
    vs,
    ys,
    Ho = !1,
    ul = [],
    Bt = null,
    $t = null,
    Ht = null,
    cr = new Map(),
    fr = new Map(),
    Vt = [],
    gd =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
        " ",
      );
  function gs(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Bt = null;
        break;
      case "dragenter":
      case "dragleave":
        $t = null;
        break;
      case "mouseover":
      case "mouseout":
        Ht = null;
        break;
      case "pointerover":
      case "pointerout":
        cr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        fr.delete(t.pointerId);
    }
  }
  function dr(e, t, n, r, o, s) {
    return e === null || e.nativeEvent !== s
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: r,
          nativeEvent: s,
          targetContainers: [o],
        }),
        t !== null && ((t = Pr(t)), t !== null && $o(t)),
        e)
      : ((e.eventSystemFlags |= r),
        (t = e.targetContainers),
        o !== null && t.indexOf(o) === -1 && t.push(o),
        e);
  }
  function wd(e, t, n, r, o) {
    switch (t) {
      case "focusin":
        return ((Bt = dr(Bt, e, t, n, r, o)), !0);
      case "dragenter":
        return (($t = dr($t, e, t, n, r, o)), !0);
      case "mouseover":
        return ((Ht = dr(Ht, e, t, n, r, o)), !0);
      case "pointerover":
        var s = o.pointerId;
        return (cr.set(s, dr(cr.get(s) || null, e, t, n, r, o)), !0);
      case "gotpointercapture":
        return (
          (s = o.pointerId),
          fr.set(s, dr(fr.get(s) || null, e, t, n, r, o)),
          !0
        );
    }
    return !1;
  }
  function ws(e) {
    var t = an(e.target);
    if (t !== null) {
      var n = sn(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = ls(n)), t !== null)) {
            ((e.blockedOn = t),
              ys(e.priority, function () {
                ms(n);
              }));
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function sl(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Wo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        ((Lo = r), n.target.dispatchEvent(r), (Lo = null));
      } else return ((t = Pr(n)), t !== null && $o(t), (e.blockedOn = n), !1);
      t.shift();
    }
    return !0;
  }
  function Ss(e, t, n) {
    sl(e) && n.delete(t);
  }
  function Sd() {
    ((Ho = !1),
      Bt !== null && sl(Bt) && (Bt = null),
      $t !== null && sl($t) && ($t = null),
      Ht !== null && sl(Ht) && (Ht = null),
      cr.forEach(Ss),
      fr.forEach(Ss));
  }
  function pr(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Ho ||
        ((Ho = !0),
        i.unstable_scheduleCallback(i.unstable_NormalPriority, Sd)));
  }
  function hr(e) {
    function t(o) {
      return pr(o, e);
    }
    if (0 < ul.length) {
      pr(ul[0], e);
      for (var n = 1; n < ul.length; n++) {
        var r = ul[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (
      Bt !== null && pr(Bt, e),
        $t !== null && pr($t, e),
        Ht !== null && pr(Ht, e),
        cr.forEach(t),
        fr.forEach(t),
        n = 0;
      n < Vt.length;
      n++
    )
      ((r = Vt[n]), r.blockedOn === e && (r.blockedOn = null));
    for (; 0 < Vt.length && ((n = Vt[0]), n.blockedOn === null); )
      (ws(n), n.blockedOn === null && Vt.shift());
  }
  var _n = A.ReactCurrentBatchConfig,
    al = !0;
  function Ed(e, t, n, r) {
    var o = fe,
      s = _n.transition;
    _n.transition = null;
    try {
      ((fe = 1), Vo(e, t, n, r));
    } finally {
      ((fe = o), (_n.transition = s));
    }
  }
  function xd(e, t, n, r) {
    var o = fe,
      s = _n.transition;
    _n.transition = null;
    try {
      ((fe = 4), Vo(e, t, n, r));
    } finally {
      ((fe = o), (_n.transition = s));
    }
  }
  function Vo(e, t, n, r) {
    if (al) {
      var o = Wo(e, t, n, r);
      if (o === null) (ui(e, t, r, cl, n), gs(e, r));
      else if (wd(o, e, t, n, r)) r.stopPropagation();
      else if ((gs(e, r), t & 4 && -1 < gd.indexOf(e))) {
        for (; o !== null; ) {
          var s = Pr(o);
          if (
            (s !== null && hs(s),
            (s = Wo(e, t, n, r)),
            s === null && ui(e, t, r, cl, n),
            s === o)
          )
            break;
          o = s;
        }
        o !== null && r.stopPropagation();
      } else ui(e, t, r, null, n);
    }
  }
  var cl = null;
  function Wo(e, t, n, r) {
    if (((cl = null), (e = jo(r)), (e = an(e)), e !== null))
      if (((t = sn(e)), t === null)) e = null;
      else if (((n = t.tag), n === 13)) {
        if (((e = ls(t)), e !== null)) return e;
        e = null;
      } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
    return ((cl = e), null);
  }
  function Es(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (ad()) {
          case Ao:
            return 1;
          case cs:
            return 4;
          case nl:
          case cd:
            return 16;
          case fs:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Wt = null,
    Qo = null,
    fl = null;
  function xs() {
    if (fl) return fl;
    var e,
      t = Qo,
      n = t.length,
      r,
      o = "value" in Wt ? Wt.value : Wt.textContent,
      s = o.length;
    for (e = 0; e < n && t[e] === o[e]; e++);
    var f = n - e;
    for (r = 1; r <= f && t[n - r] === o[s - r]; r++);
    return (fl = o.slice(e, 1 < r ? 1 - r : void 0));
  }
  function dl(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function pl() {
    return !0;
  }
  function ks() {
    return !1;
  }
  function ot(e) {
    function t(n, r, o, s, f) {
      ((this._reactName = n),
        (this._targetInst = o),
        (this.type = r),
        (this.nativeEvent = s),
        (this.target = f),
        (this.currentTarget = null));
      for (var h in e)
        e.hasOwnProperty(h) && ((n = e[h]), (this[h] = n ? n(s) : s[h]));
      return (
        (this.isDefaultPrevented = (
          s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1
        )
          ? pl
          : ks),
        (this.isPropagationStopped = ks),
        this
      );
    }
    return (
      $(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            (this.isDefaultPrevented = pl));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            (this.isPropagationStopped = pl));
        },
        persist: function () {},
        isPersistent: pl,
      }),
      t
    );
  }
  var Nn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Ko = ot(Nn),
    mr = $({}, Nn, { view: 0, detail: 0 }),
    kd = ot(mr),
    qo,
    Jo,
    vr,
    hl = $({}, mr, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Yo,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== vr &&
              (vr && e.type === "mousemove"
                ? ((qo = e.screenX - vr.screenX), (Jo = e.screenY - vr.screenY))
                : (Jo = qo = 0),
              (vr = e)),
            qo);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : Jo;
      },
    }),
    Cs = ot(hl),
    Cd = $({}, hl, { dataTransfer: 0 }),
    Rd = ot(Cd),
    Pd = $({}, mr, { relatedTarget: 0 }),
    Xo = ot(Pd),
    _d = $({}, Nn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Nd = ot(_d),
    Td = $({}, Nn, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Od = ot(Td),
    Ld = $({}, Nn, { data: 0 }),
    Rs = ot(Ld),
    jd = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    zd = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    Fd = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function Dd(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = Fd[e])
        ? !!t[e]
        : !1;
  }
  function Yo() {
    return Dd;
  }
  var Ud = $({}, mr, {
      key: function (e) {
        if (e.key) {
          var t = jd[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = dl(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? zd[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Yo,
      charCode: function (e) {
        return e.type === "keypress" ? dl(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? dl(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    Ad = ot(Ud),
    Id = $({}, hl, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Ps = ot(Id),
    Md = $({}, mr, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Yo,
    }),
    Bd = ot(Md),
    $d = $({}, Nn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Hd = ot($d),
    Vd = $({}, hl, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Wd = ot(Vd),
    Qd = [9, 13, 27, 32],
    Go = v && "CompositionEvent" in window,
    yr = null;
  v && "documentMode" in document && (yr = document.documentMode);
  var Kd = v && "TextEvent" in window && !yr,
    _s = v && (!Go || (yr && 8 < yr && 11 >= yr)),
    Ns = " ",
    Ts = !1;
  function Os(e, t) {
    switch (e) {
      case "keyup":
        return Qd.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Ls(e) {
    return (
      (e = e.detail),
      typeof e == "object" && "data" in e ? e.data : null
    );
  }
  var Tn = !1;
  function qd(e, t) {
    switch (e) {
      case "compositionend":
        return Ls(t);
      case "keypress":
        return t.which !== 32 ? null : ((Ts = !0), Ns);
      case "textInput":
        return ((e = t.data), e === Ns && Ts ? null : e);
      default:
        return null;
    }
  }
  function Jd(e, t) {
    if (Tn)
      return e === "compositionend" || (!Go && Os(e, t))
        ? ((e = xs()), (fl = Qo = Wt = null), (Tn = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return _s && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Xd = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function js(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Xd[e.type] : t === "textarea";
  }
  function zs(e, t, n, r) {
    (bu(r),
      (t = wl(t, "onChange")),
      0 < t.length &&
        ((n = new Ko("onChange", "change", null, n, r)),
        e.push({ event: n, listeners: t })));
  }
  var gr = null,
    wr = null;
  function Yd(e) {
    Gs(e, 0);
  }
  function ml(e) {
    var t = Fn(e);
    if ($u(t)) return e;
  }
  function Gd(e, t) {
    if (e === "change") return t;
  }
  var Fs = !1;
  if (v) {
    var Zo;
    if (v) {
      var bo = "oninput" in document;
      if (!bo) {
        var Ds = document.createElement("div");
        (Ds.setAttribute("oninput", "return;"),
          (bo = typeof Ds.oninput == "function"));
      }
      Zo = bo;
    } else Zo = !1;
    Fs = Zo && (!document.documentMode || 9 < document.documentMode);
  }
  function Us() {
    gr && (gr.detachEvent("onpropertychange", As), (wr = gr = null));
  }
  function As(e) {
    if (e.propertyName === "value" && ml(wr)) {
      var t = [];
      (zs(t, wr, e, jo(e)), rs(Yd, t));
    }
  }
  function Zd(e, t, n) {
    e === "focusin"
      ? (Us(), (gr = t), (wr = n), gr.attachEvent("onpropertychange", As))
      : e === "focusout" && Us();
  }
  function bd(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return ml(wr);
  }
  function ep(e, t) {
    if (e === "click") return ml(t);
  }
  function tp(e, t) {
    if (e === "input" || e === "change") return ml(t);
  }
  function np(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var yt = typeof Object.is == "function" ? Object.is : np;
  function Sr(e, t) {
    if (yt(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var n = Object.keys(e),
      r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var o = n[r];
      if (!w.call(t, o) || !yt(e[o], t[o])) return !1;
    }
    return !0;
  }
  function Is(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Ms(e, t) {
    var n = Is(e);
    e = 0;
    for (var r; n; ) {
      if (n.nodeType === 3) {
        if (((r = e + n.textContent.length), e <= t && r >= t))
          return { node: n, offset: t - e };
        e = r;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Is(n);
    }
  }
  function Bs(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Bs(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function $s() {
    for (var e = window, t = Zr(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Zr(e.document);
    }
    return t;
  }
  function ei(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  function rp(e) {
    var t = $s(),
      n = e.focusedElem,
      r = e.selectionRange;
    if (
      t !== n &&
      n &&
      n.ownerDocument &&
      Bs(n.ownerDocument.documentElement, n)
    ) {
      if (r !== null && ei(n)) {
        if (
          ((t = r.start),
          (e = r.end),
          e === void 0 && (e = t),
          "selectionStart" in n)
        )
          ((n.selectionStart = t),
            (n.selectionEnd = Math.min(e, n.value.length)));
        else if (
          ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
          e.getSelection)
        ) {
          e = e.getSelection();
          var o = n.textContent.length,
            s = Math.min(r.start, o);
          ((r = r.end === void 0 ? s : Math.min(r.end, o)),
            !e.extend && s > r && ((o = r), (r = s), (s = o)),
            (o = Ms(n, s)));
          var f = Ms(n, r);
          o &&
            f &&
            (e.rangeCount !== 1 ||
              e.anchorNode !== o.node ||
              e.anchorOffset !== o.offset ||
              e.focusNode !== f.node ||
              e.focusOffset !== f.offset) &&
            ((t = t.createRange()),
            t.setStart(o.node, o.offset),
            e.removeAllRanges(),
            s > r
              ? (e.addRange(t), e.extend(f.node, f.offset))
              : (t.setEnd(f.node, f.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; (e = e.parentNode); )
        e.nodeType === 1 &&
          t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
        ((e = t[n]),
          (e.element.scrollLeft = e.left),
          (e.element.scrollTop = e.top));
    }
  }
  var lp = v && "documentMode" in document && 11 >= document.documentMode,
    On = null,
    ti = null,
    Er = null,
    ni = !1;
  function Hs(e, t, n) {
    var r =
      n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    ni ||
      On == null ||
      On !== Zr(r) ||
      ((r = On),
      "selectionStart" in r && ei(r)
        ? (r = { start: r.selectionStart, end: r.selectionEnd })
        : ((r = (
            (r.ownerDocument && r.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (r = {
            anchorNode: r.anchorNode,
            anchorOffset: r.anchorOffset,
            focusNode: r.focusNode,
            focusOffset: r.focusOffset,
          })),
      (Er && Sr(Er, r)) ||
        ((Er = r),
        (r = wl(ti, "onSelect")),
        0 < r.length &&
          ((t = new Ko("onSelect", "select", null, t, n)),
          e.push({ event: t, listeners: r }),
          (t.target = On))));
  }
  function vl(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n["Webkit" + e] = "webkit" + t),
      (n["Moz" + e] = "moz" + t),
      n
    );
  }
  var Ln = {
      animationend: vl("Animation", "AnimationEnd"),
      animationiteration: vl("Animation", "AnimationIteration"),
      animationstart: vl("Animation", "AnimationStart"),
      transitionend: vl("Transition", "TransitionEnd"),
    },
    ri = {},
    Vs = {};
  v &&
    ((Vs = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Ln.animationend.animation,
      delete Ln.animationiteration.animation,
      delete Ln.animationstart.animation),
    "TransitionEvent" in window || delete Ln.transitionend.transition);
  function yl(e) {
    if (ri[e]) return ri[e];
    if (!Ln[e]) return e;
    var t = Ln[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in Vs) return (ri[e] = t[n]);
    return e;
  }
  var Ws = yl("animationend"),
    Qs = yl("animationiteration"),
    Ks = yl("animationstart"),
    qs = yl("transitionend"),
    Js = new Map(),
    Xs =
      "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  function Qt(e, t) {
    (Js.set(e, t), d(t, [e]));
  }
  for (var li = 0; li < Xs.length; li++) {
    var oi = Xs[li],
      op = oi.toLowerCase(),
      ip = oi[0].toUpperCase() + oi.slice(1);
    Qt(op, "on" + ip);
  }
  (Qt(Ws, "onAnimationEnd"),
    Qt(Qs, "onAnimationIteration"),
    Qt(Ks, "onAnimationStart"),
    Qt("dblclick", "onDoubleClick"),
    Qt("focusin", "onFocus"),
    Qt("focusout", "onBlur"),
    Qt(qs, "onTransitionEnd"),
    p("onMouseEnter", ["mouseout", "mouseover"]),
    p("onMouseLeave", ["mouseout", "mouseover"]),
    p("onPointerEnter", ["pointerout", "pointerover"]),
    p("onPointerLeave", ["pointerout", "pointerover"]),
    d(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    d(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    d("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    d(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    d(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    d(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var xr =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    up = new Set(
      "cancel close invalid load scroll toggle".split(" ").concat(xr),
    );
  function Ys(e, t, n) {
    var r = e.type || "unknown-event";
    ((e.currentTarget = n), od(r, t, void 0, e), (e.currentTarget = null));
  }
  function Gs(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n],
        o = r.event;
      r = r.listeners;
      e: {
        var s = void 0;
        if (t)
          for (var f = r.length - 1; 0 <= f; f--) {
            var h = r[f],
              m = h.instance,
              C = h.currentTarget;
            if (((h = h.listener), m !== s && o.isPropagationStopped()))
              break e;
            (Ys(o, h, C), (s = m));
          }
        else
          for (f = 0; f < r.length; f++) {
            if (
              ((h = r[f]),
              (m = h.instance),
              (C = h.currentTarget),
              (h = h.listener),
              m !== s && o.isPropagationStopped())
            )
              break e;
            (Ys(o, h, C), (s = m));
          }
      }
    }
    if (tl) throw ((e = Uo), (tl = !1), (Uo = null), e);
  }
  function ye(e, t) {
    var n = t[pi];
    n === void 0 && (n = t[pi] = new Set());
    var r = e + "__bubble";
    n.has(r) || (Zs(t, e, 2, !1), n.add(r));
  }
  function ii(e, t, n) {
    var r = 0;
    (t && (r |= 4), Zs(n, e, r, t));
  }
  var gl = "_reactListening" + Math.random().toString(36).slice(2);
  function kr(e) {
    if (!e[gl]) {
      ((e[gl] = !0),
        a.forEach(function (n) {
          n !== "selectionchange" && (up.has(n) || ii(n, !1, e), ii(n, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[gl] || ((t[gl] = !0), ii("selectionchange", !1, t));
    }
  }
  function Zs(e, t, n, r) {
    switch (Es(t)) {
      case 1:
        var o = Ed;
        break;
      case 4:
        o = xd;
        break;
      default:
        o = Vo;
    }
    ((n = o.bind(null, t, n, e)),
      (o = void 0),
      !Do ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (o = !0),
      r
        ? o !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: o })
          : e.addEventListener(t, n, !0)
        : o !== void 0
          ? e.addEventListener(t, n, { passive: o })
          : e.addEventListener(t, n, !1));
  }
  function ui(e, t, n, r, o) {
    var s = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null)
      e: for (;;) {
        if (r === null) return;
        var f = r.tag;
        if (f === 3 || f === 4) {
          var h = r.stateNode.containerInfo;
          if (h === o || (h.nodeType === 8 && h.parentNode === o)) break;
          if (f === 4)
            for (f = r.return; f !== null; ) {
              var m = f.tag;
              if (
                (m === 3 || m === 4) &&
                ((m = f.stateNode.containerInfo),
                m === o || (m.nodeType === 8 && m.parentNode === o))
              )
                return;
              f = f.return;
            }
          for (; h !== null; ) {
            if (((f = an(h)), f === null)) return;
            if (((m = f.tag), m === 5 || m === 6)) {
              r = s = f;
              continue e;
            }
            h = h.parentNode;
          }
        }
        r = r.return;
      }
    rs(function () {
      var C = s,
        j = jo(n),
        z = [];
      e: {
        var L = Js.get(e);
        if (L !== void 0) {
          var M = Ko,
            V = e;
          switch (e) {
            case "keypress":
              if (dl(n) === 0) break e;
            case "keydown":
            case "keyup":
              M = Ad;
              break;
            case "focusin":
              ((V = "focus"), (M = Xo));
              break;
            case "focusout":
              ((V = "blur"), (M = Xo));
              break;
            case "beforeblur":
            case "afterblur":
              M = Xo;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              M = Cs;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              M = Rd;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              M = Bd;
              break;
            case Ws:
            case Qs:
            case Ks:
              M = Nd;
              break;
            case qs:
              M = Hd;
              break;
            case "scroll":
              M = kd;
              break;
            case "wheel":
              M = Wd;
              break;
            case "copy":
            case "cut":
            case "paste":
              M = Od;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              M = Ps;
          }
          var W = (t & 4) !== 0,
            Pe = !W && e === "scroll",
            E = W ? (L !== null ? L + "Capture" : null) : L;
          W = [];
          for (var y = C, k; y !== null; ) {
            k = y;
            var F = k.stateNode;
            if (
              (k.tag === 5 &&
                F !== null &&
                ((k = F),
                E !== null &&
                  ((F = or(y, E)), F != null && W.push(Cr(y, F, k)))),
              Pe)
            )
              break;
            y = y.return;
          }
          0 < W.length &&
            ((L = new M(L, V, null, n, j)), z.push({ event: L, listeners: W }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((L = e === "mouseover" || e === "pointerover"),
            (M = e === "mouseout" || e === "pointerout"),
            L &&
              n !== Lo &&
              (V = n.relatedTarget || n.fromElement) &&
              (an(V) || V[Ot]))
          )
            break e;
          if (
            (M || L) &&
            ((L =
              j.window === j
                ? j
                : (L = j.ownerDocument)
                  ? L.defaultView || L.parentWindow
                  : window),
            M
              ? ((V = n.relatedTarget || n.toElement),
                (M = C),
                (V = V ? an(V) : null),
                V !== null &&
                  ((Pe = sn(V)), V !== Pe || (V.tag !== 5 && V.tag !== 6)) &&
                  (V = null))
              : ((M = null), (V = C)),
            M !== V)
          ) {
            if (
              ((W = Cs),
              (F = "onMouseLeave"),
              (E = "onMouseEnter"),
              (y = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((W = Ps),
                (F = "onPointerLeave"),
                (E = "onPointerEnter"),
                (y = "pointer")),
              (Pe = M == null ? L : Fn(M)),
              (k = V == null ? L : Fn(V)),
              (L = new W(F, y + "leave", M, n, j)),
              (L.target = Pe),
              (L.relatedTarget = k),
              (F = null),
              an(j) === C &&
                ((W = new W(E, y + "enter", V, n, j)),
                (W.target = k),
                (W.relatedTarget = Pe),
                (F = W)),
              (Pe = F),
              M && V)
            )
              t: {
                for (W = M, E = V, y = 0, k = W; k; k = jn(k)) y++;
                for (k = 0, F = E; F; F = jn(F)) k++;
                for (; 0 < y - k; ) ((W = jn(W)), y--);
                for (; 0 < k - y; ) ((E = jn(E)), k--);
                for (; y--; ) {
                  if (W === E || (E !== null && W === E.alternate)) break t;
                  ((W = jn(W)), (E = jn(E)));
                }
                W = null;
              }
            else W = null;
            (M !== null && bs(z, L, M, W, !1),
              V !== null && Pe !== null && bs(z, Pe, V, W, !0));
          }
        }
        e: {
          if (
            ((L = C ? Fn(C) : window),
            (M = L.nodeName && L.nodeName.toLowerCase()),
            M === "select" || (M === "input" && L.type === "file"))
          )
            var Q = Gd;
          else if (js(L))
            if (Fs) Q = tp;
            else {
              Q = bd;
              var G = Zd;
            }
          else
            (M = L.nodeName) &&
              M.toLowerCase() === "input" &&
              (L.type === "checkbox" || L.type === "radio") &&
              (Q = ep);
          if (Q && (Q = Q(e, C))) {
            zs(z, Q, n, j);
            break e;
          }
          (G && G(e, L, C),
            e === "focusout" &&
              (G = L._wrapperState) &&
              G.controlled &&
              L.type === "number" &&
              Po(L, "number", L.value));
        }
        switch (((G = C ? Fn(C) : window), e)) {
          case "focusin":
            (js(G) || G.contentEditable === "true") &&
              ((On = G), (ti = C), (Er = null));
            break;
          case "focusout":
            Er = ti = On = null;
            break;
          case "mousedown":
            ni = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((ni = !1), Hs(z, n, j));
            break;
          case "selectionchange":
            if (lp) break;
          case "keydown":
          case "keyup":
            Hs(z, n, j);
        }
        var Z;
        if (Go)
          e: {
            switch (e) {
              case "compositionstart":
                var b = "onCompositionStart";
                break e;
              case "compositionend":
                b = "onCompositionEnd";
                break e;
              case "compositionupdate":
                b = "onCompositionUpdate";
                break e;
            }
            b = void 0;
          }
        else
          Tn
            ? Os(e, n) && (b = "onCompositionEnd")
            : e === "keydown" &&
              n.keyCode === 229 &&
              (b = "onCompositionStart");
        (b &&
          (_s &&
            n.locale !== "ko" &&
            (Tn || b !== "onCompositionStart"
              ? b === "onCompositionEnd" && Tn && (Z = xs())
              : ((Wt = j),
                (Qo = "value" in Wt ? Wt.value : Wt.textContent),
                (Tn = !0))),
          (G = wl(C, b)),
          0 < G.length &&
            ((b = new Rs(b, e, null, n, j)),
            z.push({ event: b, listeners: G }),
            Z ? (b.data = Z) : ((Z = Ls(n)), Z !== null && (b.data = Z)))),
          (Z = Kd ? qd(e, n) : Jd(e, n)) &&
            ((C = wl(C, "onBeforeInput")),
            0 < C.length &&
              ((j = new Rs("onBeforeInput", "beforeinput", null, n, j)),
              z.push({ event: j, listeners: C }),
              (j.data = Z))));
      }
      Gs(z, t);
    });
  }
  function Cr(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function wl(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
      var o = e,
        s = o.stateNode;
      (o.tag === 5 &&
        s !== null &&
        ((o = s),
        (s = or(e, n)),
        s != null && r.unshift(Cr(e, s, o)),
        (s = or(e, t)),
        s != null && r.push(Cr(e, s, o))),
        (e = e.return));
    }
    return r;
  }
  function jn(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function bs(e, t, n, r, o) {
    for (var s = t._reactName, f = []; n !== null && n !== r; ) {
      var h = n,
        m = h.alternate,
        C = h.stateNode;
      if (m !== null && m === r) break;
      (h.tag === 5 &&
        C !== null &&
        ((h = C),
        o
          ? ((m = or(n, s)), m != null && f.unshift(Cr(n, m, h)))
          : o || ((m = or(n, s)), m != null && f.push(Cr(n, m, h)))),
        (n = n.return));
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var sp = /\r\n?/g,
    ap = /\u0000|\uFFFD/g;
  function ea(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        sp,
        `
`,
      )
      .replace(ap, "");
  }
  function Sl(e, t, n) {
    if (((t = ea(t)), ea(e) !== t && n)) throw Error(u(425));
  }
  function El() {}
  var si = null,
    ai = null;
  function ci(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var fi = typeof setTimeout == "function" ? setTimeout : void 0,
    cp = typeof clearTimeout == "function" ? clearTimeout : void 0,
    ta = typeof Promise == "function" ? Promise : void 0,
    fp =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof ta < "u"
          ? function (e) {
              return ta.resolve(null).then(e).catch(dp);
            }
          : fi;
  function dp(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function di(e, t) {
    var n = t,
      r = 0;
    do {
      var o = n.nextSibling;
      if ((e.removeChild(n), o && o.nodeType === 8))
        if (((n = o.data), n === "/$")) {
          if (r === 0) {
            (e.removeChild(o), hr(t));
            return;
          }
          r--;
        } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
      n = o;
    } while (n);
    hr(t);
  }
  function Kt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  function na(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (t === 0) return e;
          t--;
        } else n === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var zn = Math.random().toString(36).slice(2),
    Rt = "__reactFiber$" + zn,
    Rr = "__reactProps$" + zn,
    Ot = "__reactContainer$" + zn,
    pi = "__reactEvents$" + zn,
    pp = "__reactListeners$" + zn,
    hp = "__reactHandles$" + zn;
  function an(e) {
    var t = e[Rt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[Ot] || n[Rt])) {
        if (
          ((n = t.alternate),
          t.child !== null || (n !== null && n.child !== null))
        )
          for (e = na(e); e !== null; ) {
            if ((n = e[Rt])) return n;
            e = na(e);
          }
        return t;
      }
      ((e = n), (n = e.parentNode));
    }
    return null;
  }
  function Pr(e) {
    return (
      (e = e[Rt] || e[Ot]),
      !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
        ? null
        : e
    );
  }
  function Fn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(u(33));
  }
  function xl(e) {
    return e[Rr] || null;
  }
  var hi = [],
    Dn = -1;
  function qt(e) {
    return { current: e };
  }
  function ge(e) {
    0 > Dn || ((e.current = hi[Dn]), (hi[Dn] = null), Dn--);
  }
  function he(e, t) {
    (Dn++, (hi[Dn] = e.current), (e.current = t));
  }
  var Jt = {},
    Be = qt(Jt),
    Xe = qt(!1),
    cn = Jt;
  function Un(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Jt;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
      return r.__reactInternalMemoizedMaskedChildContext;
    var o = {},
      s;
    for (s in n) o[s] = t[s];
    return (
      r &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = t),
        (e.__reactInternalMemoizedMaskedChildContext = o)),
      o
    );
  }
  function Ye(e) {
    return ((e = e.childContextTypes), e != null);
  }
  function kl() {
    (ge(Xe), ge(Be));
  }
  function ra(e, t, n) {
    if (Be.current !== Jt) throw Error(u(168));
    (he(Be, t), he(Xe, n));
  }
  function la(e, t, n) {
    var r = e.stateNode;
    if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
      return n;
    r = r.getChildContext();
    for (var o in r) if (!(o in t)) throw Error(u(108, pe(e) || "Unknown", o));
    return $({}, n, r);
  }
  function Cl(e) {
    return (
      (e =
        ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
        Jt),
      (cn = Be.current),
      he(Be, e),
      he(Xe, Xe.current),
      !0
    );
  }
  function oa(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(u(169));
    (n
      ? ((e = la(e, t, cn)),
        (r.__reactInternalMemoizedMergedChildContext = e),
        ge(Xe),
        ge(Be),
        he(Be, e))
      : ge(Xe),
      he(Xe, n));
  }
  var Lt = null,
    Rl = !1,
    mi = !1;
  function ia(e) {
    Lt === null ? (Lt = [e]) : Lt.push(e);
  }
  function mp(e) {
    ((Rl = !0), ia(e));
  }
  function Xt() {
    if (!mi && Lt !== null) {
      mi = !0;
      var e = 0,
        t = fe;
      try {
        var n = Lt;
        for (fe = 1; e < n.length; e++) {
          var r = n[e];
          do r = r(!0);
          while (r !== null);
        }
        ((Lt = null), (Rl = !1));
      } catch (o) {
        throw (Lt !== null && (Lt = Lt.slice(e + 1)), ss(Ao, Xt), o);
      } finally {
        ((fe = t), (mi = !1));
      }
    }
    return null;
  }
  var An = [],
    In = 0,
    Pl = null,
    _l = 0,
    ct = [],
    ft = 0,
    fn = null,
    jt = 1,
    zt = "";
  function dn(e, t) {
    ((An[In++] = _l), (An[In++] = Pl), (Pl = e), (_l = t));
  }
  function ua(e, t, n) {
    ((ct[ft++] = jt), (ct[ft++] = zt), (ct[ft++] = fn), (fn = e));
    var r = jt;
    e = zt;
    var o = 32 - vt(r) - 1;
    ((r &= ~(1 << o)), (n += 1));
    var s = 32 - vt(t) + o;
    if (30 < s) {
      var f = o - (o % 5);
      ((s = (r & ((1 << f) - 1)).toString(32)),
        (r >>= f),
        (o -= f),
        (jt = (1 << (32 - vt(t) + o)) | (n << o) | r),
        (zt = s + e));
    } else ((jt = (1 << s) | (n << o) | r), (zt = e));
  }
  function vi(e) {
    e.return !== null && (dn(e, 1), ua(e, 1, 0));
  }
  function yi(e) {
    for (; e === Pl; )
      ((Pl = An[--In]), (An[In] = null), (_l = An[--In]), (An[In] = null));
    for (; e === fn; )
      ((fn = ct[--ft]),
        (ct[ft] = null),
        (zt = ct[--ft]),
        (ct[ft] = null),
        (jt = ct[--ft]),
        (ct[ft] = null));
  }
  var it = null,
    ut = null,
    Se = !1,
    gt = null;
  function sa(e, t) {
    var n = mt(5, null, null, 0);
    ((n.elementType = "DELETED"),
      (n.stateNode = t),
      (n.return = e),
      (t = e.deletions),
      t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
  }
  function aa(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return (
          (t =
            t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
              ? null
              : t),
          t !== null
            ? ((e.stateNode = t), (it = e), (ut = Kt(t.firstChild)), !0)
            : !1
        );
      case 6:
        return (
          (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
          t !== null ? ((e.stateNode = t), (it = e), (ut = null), !0) : !1
        );
      case 13:
        return (
          (t = t.nodeType !== 8 ? null : t),
          t !== null
            ? ((n = fn !== null ? { id: jt, overflow: zt } : null),
              (e.memoizedState = {
                dehydrated: t,
                treeContext: n,
                retryLane: 1073741824,
              }),
              (n = mt(18, null, null, 0)),
              (n.stateNode = t),
              (n.return = e),
              (e.child = n),
              (it = e),
              (ut = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function gi(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function wi(e) {
    if (Se) {
      var t = ut;
      if (t) {
        var n = t;
        if (!aa(e, t)) {
          if (gi(e)) throw Error(u(418));
          t = Kt(n.nextSibling);
          var r = it;
          t && aa(e, t)
            ? sa(r, n)
            : ((e.flags = (e.flags & -4097) | 2), (Se = !1), (it = e));
        }
      } else {
        if (gi(e)) throw Error(u(418));
        ((e.flags = (e.flags & -4097) | 2), (Se = !1), (it = e));
      }
    }
  }
  function ca(e) {
    for (
      e = e.return;
      e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

    )
      e = e.return;
    it = e;
  }
  function Nl(e) {
    if (e !== it) return !1;
    if (!Se) return (ca(e), (Se = !0), !1);
    var t;
    if (
      ((t = e.tag !== 3) &&
        !(t = e.tag !== 5) &&
        ((t = e.type),
        (t = t !== "head" && t !== "body" && !ci(e.type, e.memoizedProps))),
      t && (t = ut))
    ) {
      if (gi(e)) throw (fa(), Error(u(418)));
      for (; t; ) (sa(e, t), (t = Kt(t.nextSibling)));
    }
    if ((ca(e), e.tag === 13)) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(u(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === "/$") {
              if (t === 0) {
                ut = Kt(e.nextSibling);
                break e;
              }
              t--;
            } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
          }
          e = e.nextSibling;
        }
        ut = null;
      }
    } else ut = it ? Kt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function fa() {
    for (var e = ut; e; ) e = Kt(e.nextSibling);
  }
  function Mn() {
    ((ut = it = null), (Se = !1));
  }
  function Si(e) {
    gt === null ? (gt = [e]) : gt.push(e);
  }
  var vp = A.ReactCurrentBatchConfig;
  function _r(e, t, n) {
    if (
      ((e = n.ref),
      e !== null && typeof e != "function" && typeof e != "object")
    ) {
      if (n._owner) {
        if (((n = n._owner), n)) {
          if (n.tag !== 1) throw Error(u(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(u(147, e));
        var o = r,
          s = "" + e;
        return t !== null &&
          t.ref !== null &&
          typeof t.ref == "function" &&
          t.ref._stringRef === s
          ? t.ref
          : ((t = function (f) {
              var h = o.refs;
              f === null ? delete h[s] : (h[s] = f);
            }),
            (t._stringRef = s),
            t);
      }
      if (typeof e != "string") throw Error(u(284));
      if (!n._owner) throw Error(u(290, e));
    }
    return e;
  }
  function Tl(e, t) {
    throw (
      (e = Object.prototype.toString.call(t)),
      Error(
        u(
          31,
          e === "[object Object]"
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : e,
        ),
      )
    );
  }
  function da(e) {
    var t = e._init;
    return t(e._payload);
  }
  function pa(e) {
    function t(E, y) {
      if (e) {
        var k = E.deletions;
        k === null ? ((E.deletions = [y]), (E.flags |= 16)) : k.push(y);
      }
    }
    function n(E, y) {
      if (!e) return null;
      for (; y !== null; ) (t(E, y), (y = y.sibling));
      return null;
    }
    function r(E, y) {
      for (E = new Map(); y !== null; )
        (y.key !== null ? E.set(y.key, y) : E.set(y.index, y), (y = y.sibling));
      return E;
    }
    function o(E, y) {
      return ((E = rn(E, y)), (E.index = 0), (E.sibling = null), E);
    }
    function s(E, y, k) {
      return (
        (E.index = k),
        e
          ? ((k = E.alternate),
            k !== null
              ? ((k = k.index), k < y ? ((E.flags |= 2), y) : k)
              : ((E.flags |= 2), y))
          : ((E.flags |= 1048576), y)
      );
    }
    function f(E) {
      return (e && E.alternate === null && (E.flags |= 2), E);
    }
    function h(E, y, k, F) {
      return y === null || y.tag !== 6
        ? ((y = fu(k, E.mode, F)), (y.return = E), y)
        : ((y = o(y, k)), (y.return = E), y);
    }
    function m(E, y, k, F) {
      var Q = k.type;
      return Q === ae
        ? j(E, y, k.props.children, F, k.key)
        : y !== null &&
            (y.elementType === Q ||
              (typeof Q == "object" &&
                Q !== null &&
                Q.$$typeof === me &&
                da(Q) === y.type))
          ? ((F = o(y, k.props)), (F.ref = _r(E, y, k)), (F.return = E), F)
          : ((F = bl(k.type, k.key, k.props, null, E.mode, F)),
            (F.ref = _r(E, y, k)),
            (F.return = E),
            F);
    }
    function C(E, y, k, F) {
      return y === null ||
        y.tag !== 4 ||
        y.stateNode.containerInfo !== k.containerInfo ||
        y.stateNode.implementation !== k.implementation
        ? ((y = du(k, E.mode, F)), (y.return = E), y)
        : ((y = o(y, k.children || [])), (y.return = E), y);
    }
    function j(E, y, k, F, Q) {
      return y === null || y.tag !== 7
        ? ((y = Sn(k, E.mode, F, Q)), (y.return = E), y)
        : ((y = o(y, k)), (y.return = E), y);
    }
    function z(E, y, k) {
      if ((typeof y == "string" && y !== "") || typeof y == "number")
        return ((y = fu("" + y, E.mode, k)), (y.return = E), y);
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case re:
            return (
              (k = bl(y.type, y.key, y.props, null, E.mode, k)),
              (k.ref = _r(E, null, y)),
              (k.return = E),
              k
            );
          case de:
            return ((y = du(y, E.mode, k)), (y.return = E), y);
          case me:
            var F = y._init;
            return z(E, F(y._payload), k);
        }
        if (nr(y) || Y(y))
          return ((y = Sn(y, E.mode, k, null)), (y.return = E), y);
        Tl(E, y);
      }
      return null;
    }
    function L(E, y, k, F) {
      var Q = y !== null ? y.key : null;
      if ((typeof k == "string" && k !== "") || typeof k == "number")
        return Q !== null ? null : h(E, y, "" + k, F);
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case re:
            return k.key === Q ? m(E, y, k, F) : null;
          case de:
            return k.key === Q ? C(E, y, k, F) : null;
          case me:
            return ((Q = k._init), L(E, y, Q(k._payload), F));
        }
        if (nr(k) || Y(k)) return Q !== null ? null : j(E, y, k, F, null);
        Tl(E, k);
      }
      return null;
    }
    function M(E, y, k, F, Q) {
      if ((typeof F == "string" && F !== "") || typeof F == "number")
        return ((E = E.get(k) || null), h(y, E, "" + F, Q));
      if (typeof F == "object" && F !== null) {
        switch (F.$$typeof) {
          case re:
            return (
              (E = E.get(F.key === null ? k : F.key) || null),
              m(y, E, F, Q)
            );
          case de:
            return (
              (E = E.get(F.key === null ? k : F.key) || null),
              C(y, E, F, Q)
            );
          case me:
            var G = F._init;
            return M(E, y, k, G(F._payload), Q);
        }
        if (nr(F) || Y(F)) return ((E = E.get(k) || null), j(y, E, F, Q, null));
        Tl(y, F);
      }
      return null;
    }
    function V(E, y, k, F) {
      for (
        var Q = null, G = null, Z = y, b = (y = 0), Ue = null;
        Z !== null && b < k.length;
        b++
      ) {
        Z.index > b ? ((Ue = Z), (Z = null)) : (Ue = Z.sibling);
        var se = L(E, Z, k[b], F);
        if (se === null) {
          Z === null && (Z = Ue);
          break;
        }
        (e && Z && se.alternate === null && t(E, Z),
          (y = s(se, y, b)),
          G === null ? (Q = se) : (G.sibling = se),
          (G = se),
          (Z = Ue));
      }
      if (b === k.length) return (n(E, Z), Se && dn(E, b), Q);
      if (Z === null) {
        for (; b < k.length; b++)
          ((Z = z(E, k[b], F)),
            Z !== null &&
              ((y = s(Z, y, b)),
              G === null ? (Q = Z) : (G.sibling = Z),
              (G = Z)));
        return (Se && dn(E, b), Q);
      }
      for (Z = r(E, Z); b < k.length; b++)
        ((Ue = M(Z, E, b, k[b], F)),
          Ue !== null &&
            (e &&
              Ue.alternate !== null &&
              Z.delete(Ue.key === null ? b : Ue.key),
            (y = s(Ue, y, b)),
            G === null ? (Q = Ue) : (G.sibling = Ue),
            (G = Ue)));
      return (
        e &&
          Z.forEach(function (ln) {
            return t(E, ln);
          }),
        Se && dn(E, b),
        Q
      );
    }
    function W(E, y, k, F) {
      var Q = Y(k);
      if (typeof Q != "function") throw Error(u(150));
      if (((k = Q.call(k)), k == null)) throw Error(u(151));
      for (
        var G = (Q = null), Z = y, b = (y = 0), Ue = null, se = k.next();
        Z !== null && !se.done;
        b++, se = k.next()
      ) {
        Z.index > b ? ((Ue = Z), (Z = null)) : (Ue = Z.sibling);
        var ln = L(E, Z, se.value, F);
        if (ln === null) {
          Z === null && (Z = Ue);
          break;
        }
        (e && Z && ln.alternate === null && t(E, Z),
          (y = s(ln, y, b)),
          G === null ? (Q = ln) : (G.sibling = ln),
          (G = ln),
          (Z = Ue));
      }
      if (se.done) return (n(E, Z), Se && dn(E, b), Q);
      if (Z === null) {
        for (; !se.done; b++, se = k.next())
          ((se = z(E, se.value, F)),
            se !== null &&
              ((y = s(se, y, b)),
              G === null ? (Q = se) : (G.sibling = se),
              (G = se)));
        return (Se && dn(E, b), Q);
      }
      for (Z = r(E, Z); !se.done; b++, se = k.next())
        ((se = M(Z, E, b, se.value, F)),
          se !== null &&
            (e &&
              se.alternate !== null &&
              Z.delete(se.key === null ? b : se.key),
            (y = s(se, y, b)),
            G === null ? (Q = se) : (G.sibling = se),
            (G = se)));
      return (
        e &&
          Z.forEach(function (Xp) {
            return t(E, Xp);
          }),
        Se && dn(E, b),
        Q
      );
    }
    function Pe(E, y, k, F) {
      if (
        (typeof k == "object" &&
          k !== null &&
          k.type === ae &&
          k.key === null &&
          (k = k.props.children),
        typeof k == "object" && k !== null)
      ) {
        switch (k.$$typeof) {
          case re:
            e: {
              for (var Q = k.key, G = y; G !== null; ) {
                if (G.key === Q) {
                  if (((Q = k.type), Q === ae)) {
                    if (G.tag === 7) {
                      (n(E, G.sibling),
                        (y = o(G, k.props.children)),
                        (y.return = E),
                        (E = y));
                      break e;
                    }
                  } else if (
                    G.elementType === Q ||
                    (typeof Q == "object" &&
                      Q !== null &&
                      Q.$$typeof === me &&
                      da(Q) === G.type)
                  ) {
                    (n(E, G.sibling),
                      (y = o(G, k.props)),
                      (y.ref = _r(E, G, k)),
                      (y.return = E),
                      (E = y));
                    break e;
                  }
                  n(E, G);
                  break;
                } else t(E, G);
                G = G.sibling;
              }
              k.type === ae
                ? ((y = Sn(k.props.children, E.mode, F, k.key)),
                  (y.return = E),
                  (E = y))
                : ((F = bl(k.type, k.key, k.props, null, E.mode, F)),
                  (F.ref = _r(E, y, k)),
                  (F.return = E),
                  (E = F));
            }
            return f(E);
          case de:
            e: {
              for (G = k.key; y !== null; ) {
                if (y.key === G)
                  if (
                    y.tag === 4 &&
                    y.stateNode.containerInfo === k.containerInfo &&
                    y.stateNode.implementation === k.implementation
                  ) {
                    (n(E, y.sibling),
                      (y = o(y, k.children || [])),
                      (y.return = E),
                      (E = y));
                    break e;
                  } else {
                    n(E, y);
                    break;
                  }
                else t(E, y);
                y = y.sibling;
              }
              ((y = du(k, E.mode, F)), (y.return = E), (E = y));
            }
            return f(E);
          case me:
            return ((G = k._init), Pe(E, y, G(k._payload), F));
        }
        if (nr(k)) return V(E, y, k, F);
        if (Y(k)) return W(E, y, k, F);
        Tl(E, k);
      }
      return (typeof k == "string" && k !== "") || typeof k == "number"
        ? ((k = "" + k),
          y !== null && y.tag === 6
            ? (n(E, y.sibling), (y = o(y, k)), (y.return = E), (E = y))
            : (n(E, y), (y = fu(k, E.mode, F)), (y.return = E), (E = y)),
          f(E))
        : n(E, y);
    }
    return Pe;
  }
  var Bn = pa(!0),
    ha = pa(!1),
    Ol = qt(null),
    Ll = null,
    $n = null,
    Ei = null;
  function xi() {
    Ei = $n = Ll = null;
  }
  function ki(e) {
    var t = Ol.current;
    (ge(Ol), (e._currentValue = t));
  }
  function Ci(e, t, n) {
    for (; e !== null; ) {
      var r = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
          : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
        e === n)
      )
        break;
      e = e.return;
    }
  }
  function Hn(e, t) {
    ((Ll = e),
      (Ei = $n = null),
      (e = e.dependencies),
      e !== null &&
        e.firstContext !== null &&
        ((e.lanes & t) !== 0 && (Ge = !0), (e.firstContext = null)));
  }
  function dt(e) {
    var t = e._currentValue;
    if (Ei !== e)
      if (((e = { context: e, memoizedValue: t, next: null }), $n === null)) {
        if (Ll === null) throw Error(u(308));
        (($n = e), (Ll.dependencies = { lanes: 0, firstContext: e }));
      } else $n = $n.next = e;
    return t;
  }
  var pn = null;
  function Ri(e) {
    pn === null ? (pn = [e]) : pn.push(e);
  }
  function ma(e, t, n, r) {
    var o = t.interleaved;
    return (
      o === null ? ((n.next = n), Ri(t)) : ((n.next = o.next), (o.next = n)),
      (t.interleaved = n),
      Ft(e, r)
    );
  }
  function Ft(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
      ((e.childLanes |= t),
        (n = e.alternate),
        n !== null && (n.childLanes |= t),
        (n = e),
        (e = e.return));
    return n.tag === 3 ? n.stateNode : null;
  }
  var Yt = !1;
  function Pi(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function va(e, t) {
    ((e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          effects: e.effects,
        }));
  }
  function Dt(e, t) {
    return {
      eventTime: e,
      lane: t,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    };
  }
  function Gt(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), (ie & 2) !== 0)) {
      var o = r.pending;
      return (
        o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
        (r.pending = t),
        Ft(e, n)
      );
    }
    return (
      (o = r.interleaved),
      o === null ? ((t.next = t), Ri(r)) : ((t.next = o.next), (o.next = t)),
      (r.interleaved = t),
      Ft(e, n)
    );
  }
  function jl(e, t, n) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
    ) {
      var r = t.lanes;
      ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Bo(e, n));
    }
  }
  function ya(e, t) {
    var n = e.updateQueue,
      r = e.alternate;
    if (r !== null && ((r = r.updateQueue), n === r)) {
      var o = null,
        s = null;
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var f = {
            eventTime: n.eventTime,
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: n.callback,
            next: null,
          };
          (s === null ? (o = s = f) : (s = s.next = f), (n = n.next));
        } while (n !== null);
        s === null ? (o = s = t) : (s = s.next = t);
      } else o = s = t;
      ((n = {
        baseState: r.baseState,
        firstBaseUpdate: o,
        lastBaseUpdate: s,
        shared: r.shared,
        effects: r.effects,
      }),
        (e.updateQueue = n));
      return;
    }
    ((e = n.lastBaseUpdate),
      e === null ? (n.firstBaseUpdate = t) : (e.next = t),
      (n.lastBaseUpdate = t));
  }
  function zl(e, t, n, r) {
    var o = e.updateQueue;
    Yt = !1;
    var s = o.firstBaseUpdate,
      f = o.lastBaseUpdate,
      h = o.shared.pending;
    if (h !== null) {
      o.shared.pending = null;
      var m = h,
        C = m.next;
      ((m.next = null), f === null ? (s = C) : (f.next = C), (f = m));
      var j = e.alternate;
      j !== null &&
        ((j = j.updateQueue),
        (h = j.lastBaseUpdate),
        h !== f &&
          (h === null ? (j.firstBaseUpdate = C) : (h.next = C),
          (j.lastBaseUpdate = m)));
    }
    if (s !== null) {
      var z = o.baseState;
      ((f = 0), (j = C = m = null), (h = s));
      do {
        var L = h.lane,
          M = h.eventTime;
        if ((r & L) === L) {
          j !== null &&
            (j = j.next =
              {
                eventTime: M,
                lane: 0,
                tag: h.tag,
                payload: h.payload,
                callback: h.callback,
                next: null,
              });
          e: {
            var V = e,
              W = h;
            switch (((L = t), (M = n), W.tag)) {
              case 1:
                if (((V = W.payload), typeof V == "function")) {
                  z = V.call(M, z, L);
                  break e;
                }
                z = V;
                break e;
              case 3:
                V.flags = (V.flags & -65537) | 128;
              case 0:
                if (
                  ((V = W.payload),
                  (L = typeof V == "function" ? V.call(M, z, L) : V),
                  L == null)
                )
                  break e;
                z = $({}, z, L);
                break e;
              case 2:
                Yt = !0;
            }
          }
          h.callback !== null &&
            h.lane !== 0 &&
            ((e.flags |= 64),
            (L = o.effects),
            L === null ? (o.effects = [h]) : L.push(h));
        } else
          ((M = {
            eventTime: M,
            lane: L,
            tag: h.tag,
            payload: h.payload,
            callback: h.callback,
            next: null,
          }),
            j === null ? ((C = j = M), (m = z)) : (j = j.next = M),
            (f |= L));
        if (((h = h.next), h === null)) {
          if (((h = o.shared.pending), h === null)) break;
          ((L = h),
            (h = L.next),
            (L.next = null),
            (o.lastBaseUpdate = L),
            (o.shared.pending = null));
        }
      } while (!0);
      if (
        (j === null && (m = z),
        (o.baseState = m),
        (o.firstBaseUpdate = C),
        (o.lastBaseUpdate = j),
        (t = o.shared.interleaved),
        t !== null)
      ) {
        o = t;
        do ((f |= o.lane), (o = o.next));
        while (o !== t);
      } else s === null && (o.shared.lanes = 0);
      ((vn |= f), (e.lanes = f), (e.memoizedState = z));
    }
  }
  function ga(e, t, n) {
    if (((e = t.effects), (t.effects = null), e !== null))
      for (t = 0; t < e.length; t++) {
        var r = e[t],
          o = r.callback;
        if (o !== null) {
          if (((r.callback = null), (r = n), typeof o != "function"))
            throw Error(u(191, o));
          o.call(r);
        }
      }
  }
  var Nr = {},
    Pt = qt(Nr),
    Tr = qt(Nr),
    Or = qt(Nr);
  function hn(e) {
    if (e === Nr) throw Error(u(174));
    return e;
  }
  function _i(e, t) {
    switch ((he(Or, t), he(Tr, e), he(Pt, Nr), (e = t.nodeType), e)) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : No(null, "");
        break;
      default:
        ((e = e === 8 ? t.parentNode : t),
          (t = e.namespaceURI || null),
          (e = e.tagName),
          (t = No(t, e)));
    }
    (ge(Pt), he(Pt, t));
  }
  function Vn() {
    (ge(Pt), ge(Tr), ge(Or));
  }
  function wa(e) {
    hn(Or.current);
    var t = hn(Pt.current),
      n = No(t, e.type);
    t !== n && (he(Tr, e), he(Pt, n));
  }
  function Ni(e) {
    Tr.current === e && (ge(Pt), ge(Tr));
  }
  var Ee = qt(0);
  function Fl(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (
          n !== null &&
          ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  var Ti = [];
  function Oi() {
    for (var e = 0; e < Ti.length; e++)
      Ti[e]._workInProgressVersionPrimary = null;
    Ti.length = 0;
  }
  var Dl = A.ReactCurrentDispatcher,
    Li = A.ReactCurrentBatchConfig,
    mn = 0,
    xe = null,
    je = null,
    Fe = null,
    Ul = !1,
    Lr = !1,
    jr = 0,
    yp = 0;
  function $e() {
    throw Error(u(321));
  }
  function ji(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!yt(e[n], t[n])) return !1;
    return !0;
  }
  function zi(e, t, n, r, o, s) {
    if (
      ((mn = s),
      (xe = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (Dl.current = e === null || e.memoizedState === null ? Ep : xp),
      (e = n(r, o)),
      Lr)
    ) {
      s = 0;
      do {
        if (((Lr = !1), (jr = 0), 25 <= s)) throw Error(u(301));
        ((s += 1),
          (Fe = je = null),
          (t.updateQueue = null),
          (Dl.current = kp),
          (e = n(r, o)));
      } while (Lr);
    }
    if (
      ((Dl.current = Ml),
      (t = je !== null && je.next !== null),
      (mn = 0),
      (Fe = je = xe = null),
      (Ul = !1),
      t)
    )
      throw Error(u(300));
    return e;
  }
  function Fi() {
    var e = jr !== 0;
    return ((jr = 0), e);
  }
  function _t() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (Fe === null ? (xe.memoizedState = Fe = e) : (Fe = Fe.next = e), Fe);
  }
  function pt() {
    if (je === null) {
      var e = xe.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = je.next;
    var t = Fe === null ? xe.memoizedState : Fe.next;
    if (t !== null) ((Fe = t), (je = e));
    else {
      if (e === null) throw Error(u(310));
      ((je = e),
        (e = {
          memoizedState: je.memoizedState,
          baseState: je.baseState,
          baseQueue: je.baseQueue,
          queue: je.queue,
          next: null,
        }),
        Fe === null ? (xe.memoizedState = Fe = e) : (Fe = Fe.next = e));
    }
    return Fe;
  }
  function zr(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Di(e) {
    var t = pt(),
      n = t.queue;
    if (n === null) throw Error(u(311));
    n.lastRenderedReducer = e;
    var r = je,
      o = r.baseQueue,
      s = n.pending;
    if (s !== null) {
      if (o !== null) {
        var f = o.next;
        ((o.next = s.next), (s.next = f));
      }
      ((r.baseQueue = o = s), (n.pending = null));
    }
    if (o !== null) {
      ((s = o.next), (r = r.baseState));
      var h = (f = null),
        m = null,
        C = s;
      do {
        var j = C.lane;
        if ((mn & j) === j)
          (m !== null &&
            (m = m.next =
              {
                lane: 0,
                action: C.action,
                hasEagerState: C.hasEagerState,
                eagerState: C.eagerState,
                next: null,
              }),
            (r = C.hasEagerState ? C.eagerState : e(r, C.action)));
        else {
          var z = {
            lane: j,
            action: C.action,
            hasEagerState: C.hasEagerState,
            eagerState: C.eagerState,
            next: null,
          };
          (m === null ? ((h = m = z), (f = r)) : (m = m.next = z),
            (xe.lanes |= j),
            (vn |= j));
        }
        C = C.next;
      } while (C !== null && C !== s);
      (m === null ? (f = r) : (m.next = h),
        yt(r, t.memoizedState) || (Ge = !0),
        (t.memoizedState = r),
        (t.baseState = f),
        (t.baseQueue = m),
        (n.lastRenderedState = r));
    }
    if (((e = n.interleaved), e !== null)) {
      o = e;
      do ((s = o.lane), (xe.lanes |= s), (vn |= s), (o = o.next));
      while (o !== e);
    } else o === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function Ui(e) {
    var t = pt(),
      n = t.queue;
    if (n === null) throw Error(u(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
      o = n.pending,
      s = t.memoizedState;
    if (o !== null) {
      n.pending = null;
      var f = (o = o.next);
      do ((s = e(s, f.action)), (f = f.next));
      while (f !== o);
      (yt(s, t.memoizedState) || (Ge = !0),
        (t.memoizedState = s),
        t.baseQueue === null && (t.baseState = s),
        (n.lastRenderedState = s));
    }
    return [s, r];
  }
  function Sa() {}
  function Ea(e, t) {
    var n = xe,
      r = pt(),
      o = t(),
      s = !yt(r.memoizedState, o);
    if (
      (s && ((r.memoizedState = o), (Ge = !0)),
      (r = r.queue),
      Ai(Ca.bind(null, n, r, e), [e]),
      r.getSnapshot !== t || s || (Fe !== null && Fe.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        Fr(9, ka.bind(null, n, r, o, t), void 0, null),
        De === null)
      )
        throw Error(u(349));
      (mn & 30) !== 0 || xa(n, t, o);
    }
    return o;
  }
  function xa(e, t, n) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = xe.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (xe.updateQueue = t),
          (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
  }
  function ka(e, t, n, r) {
    ((t.value = n), (t.getSnapshot = r), Ra(t) && Pa(e));
  }
  function Ca(e, t, n) {
    return n(function () {
      Ra(t) && Pa(e);
    });
  }
  function Ra(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !yt(e, n);
    } catch {
      return !0;
    }
  }
  function Pa(e) {
    var t = Ft(e, 1);
    t !== null && xt(t, e, 1, -1);
  }
  function _a(e) {
    var t = _t();
    return (
      typeof e == "function" && (e = e()),
      (t.memoizedState = t.baseState = e),
      (e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: zr,
        lastRenderedState: e,
      }),
      (t.queue = e),
      (e = e.dispatch = Sp.bind(null, xe, e)),
      [t.memoizedState, e]
    );
  }
  function Fr(e, t, n, r) {
    return (
      (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
      (t = xe.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (xe.updateQueue = t),
          (t.lastEffect = e.next = e))
        : ((n = t.lastEffect),
          n === null
            ? (t.lastEffect = e.next = e)
            : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
      e
    );
  }
  function Na() {
    return pt().memoizedState;
  }
  function Al(e, t, n, r) {
    var o = _t();
    ((xe.flags |= e),
      (o.memoizedState = Fr(1 | t, n, void 0, r === void 0 ? null : r)));
  }
  function Il(e, t, n, r) {
    var o = pt();
    r = r === void 0 ? null : r;
    var s = void 0;
    if (je !== null) {
      var f = je.memoizedState;
      if (((s = f.destroy), r !== null && ji(r, f.deps))) {
        o.memoizedState = Fr(t, n, s, r);
        return;
      }
    }
    ((xe.flags |= e), (o.memoizedState = Fr(1 | t, n, s, r)));
  }
  function Ta(e, t) {
    return Al(8390656, 8, e, t);
  }
  function Ai(e, t) {
    return Il(2048, 8, e, t);
  }
  function Oa(e, t) {
    return Il(4, 2, e, t);
  }
  function La(e, t) {
    return Il(4, 4, e, t);
  }
  function ja(e, t) {
    if (typeof t == "function")
      return (
        (e = e()),
        t(e),
        function () {
          t(null);
        }
      );
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function za(e, t, n) {
    return (
      (n = n != null ? n.concat([e]) : null),
      Il(4, 4, ja.bind(null, t, e), n)
    );
  }
  function Ii() {}
  function Fa(e, t) {
    var n = pt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && ji(t, r[1])
      ? r[0]
      : ((n.memoizedState = [e, t]), e);
  }
  function Da(e, t) {
    var n = pt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && ji(t, r[1])
      ? r[0]
      : ((e = e()), (n.memoizedState = [e, t]), e);
  }
  function Ua(e, t, n) {
    return (mn & 21) === 0
      ? (e.baseState && ((e.baseState = !1), (Ge = !0)), (e.memoizedState = n))
      : (yt(n, t) ||
          ((n = ds()), (xe.lanes |= n), (vn |= n), (e.baseState = !0)),
        t);
  }
  function gp(e, t) {
    var n = fe;
    ((fe = n !== 0 && 4 > n ? n : 4), e(!0));
    var r = Li.transition;
    Li.transition = {};
    try {
      (e(!1), t());
    } finally {
      ((fe = n), (Li.transition = r));
    }
  }
  function Aa() {
    return pt().memoizedState;
  }
  function wp(e, t, n) {
    var r = tn(e);
    if (
      ((n = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Ia(e))
    )
      Ma(t, n);
    else if (((n = ma(e, t, n, r)), n !== null)) {
      var o = Je();
      (xt(n, e, r, o), Ba(n, t, r));
    }
  }
  function Sp(e, t, n) {
    var r = tn(e),
      o = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
    if (Ia(e)) Ma(t, o);
    else {
      var s = e.alternate;
      if (
        e.lanes === 0 &&
        (s === null || s.lanes === 0) &&
        ((s = t.lastRenderedReducer), s !== null)
      )
        try {
          var f = t.lastRenderedState,
            h = s(f, n);
          if (((o.hasEagerState = !0), (o.eagerState = h), yt(h, f))) {
            var m = t.interleaved;
            (m === null
              ? ((o.next = o), Ri(t))
              : ((o.next = m.next), (m.next = o)),
              (t.interleaved = o));
            return;
          }
        } catch {
        } finally {
        }
      ((n = ma(e, t, o, r)),
        n !== null && ((o = Je()), xt(n, e, r, o), Ba(n, t, r)));
    }
  }
  function Ia(e) {
    var t = e.alternate;
    return e === xe || (t !== null && t === xe);
  }
  function Ma(e, t) {
    Lr = Ul = !0;
    var n = e.pending;
    (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
      (e.pending = t));
  }
  function Ba(e, t, n) {
    if ((n & 4194240) !== 0) {
      var r = t.lanes;
      ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Bo(e, n));
    }
  }
  var Ml = {
      readContext: dt,
      useCallback: $e,
      useContext: $e,
      useEffect: $e,
      useImperativeHandle: $e,
      useInsertionEffect: $e,
      useLayoutEffect: $e,
      useMemo: $e,
      useReducer: $e,
      useRef: $e,
      useState: $e,
      useDebugValue: $e,
      useDeferredValue: $e,
      useTransition: $e,
      useMutableSource: $e,
      useSyncExternalStore: $e,
      useId: $e,
      unstable_isNewReconciler: !1,
    },
    Ep = {
      readContext: dt,
      useCallback: function (e, t) {
        return ((_t().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: dt,
      useEffect: Ta,
      useImperativeHandle: function (e, t, n) {
        return (
          (n = n != null ? n.concat([e]) : null),
          Al(4194308, 4, ja.bind(null, t, e), n)
        );
      },
      useLayoutEffect: function (e, t) {
        return Al(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        return Al(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = _t();
        return (
          (t = t === void 0 ? null : t),
          (e = e()),
          (n.memoizedState = [e, t]),
          e
        );
      },
      useReducer: function (e, t, n) {
        var r = _t();
        return (
          (t = n !== void 0 ? n(t) : t),
          (r.memoizedState = r.baseState = t),
          (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t,
          }),
          (r.queue = e),
          (e = e.dispatch = wp.bind(null, xe, e)),
          [r.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = _t();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: _a,
      useDebugValue: Ii,
      useDeferredValue: function (e) {
        return (_t().memoizedState = e);
      },
      useTransition: function () {
        var e = _a(!1),
          t = e[0];
        return ((e = gp.bind(null, e[1])), (_t().memoizedState = e), [t, e]);
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (e, t, n) {
        var r = xe,
          o = _t();
        if (Se) {
          if (n === void 0) throw Error(u(407));
          n = n();
        } else {
          if (((n = t()), De === null)) throw Error(u(349));
          (mn & 30) !== 0 || xa(r, t, n);
        }
        o.memoizedState = n;
        var s = { value: n, getSnapshot: t };
        return (
          (o.queue = s),
          Ta(Ca.bind(null, r, s, e), [e]),
          (r.flags |= 2048),
          Fr(9, ka.bind(null, r, s, n, t), void 0, null),
          n
        );
      },
      useId: function () {
        var e = _t(),
          t = De.identifierPrefix;
        if (Se) {
          var n = zt,
            r = jt;
          ((n = (r & ~(1 << (32 - vt(r) - 1))).toString(32) + n),
            (t = ":" + t + "R" + n),
            (n = jr++),
            0 < n && (t += "H" + n.toString(32)),
            (t += ":"));
        } else ((n = yp++), (t = ":" + t + "r" + n.toString(32) + ":"));
        return (e.memoizedState = t);
      },
      unstable_isNewReconciler: !1,
    },
    xp = {
      readContext: dt,
      useCallback: Fa,
      useContext: dt,
      useEffect: Ai,
      useImperativeHandle: za,
      useInsertionEffect: Oa,
      useLayoutEffect: La,
      useMemo: Da,
      useReducer: Di,
      useRef: Na,
      useState: function () {
        return Di(zr);
      },
      useDebugValue: Ii,
      useDeferredValue: function (e) {
        var t = pt();
        return Ua(t, je.memoizedState, e);
      },
      useTransition: function () {
        var e = Di(zr)[0],
          t = pt().memoizedState;
        return [e, t];
      },
      useMutableSource: Sa,
      useSyncExternalStore: Ea,
      useId: Aa,
      unstable_isNewReconciler: !1,
    },
    kp = {
      readContext: dt,
      useCallback: Fa,
      useContext: dt,
      useEffect: Ai,
      useImperativeHandle: za,
      useInsertionEffect: Oa,
      useLayoutEffect: La,
      useMemo: Da,
      useReducer: Ui,
      useRef: Na,
      useState: function () {
        return Ui(zr);
      },
      useDebugValue: Ii,
      useDeferredValue: function (e) {
        var t = pt();
        return je === null ? (t.memoizedState = e) : Ua(t, je.memoizedState, e);
      },
      useTransition: function () {
        var e = Ui(zr)[0],
          t = pt().memoizedState;
        return [e, t];
      },
      useMutableSource: Sa,
      useSyncExternalStore: Ea,
      useId: Aa,
      unstable_isNewReconciler: !1,
    };
  function wt(e, t) {
    if (e && e.defaultProps) {
      ((t = $({}, t)), (e = e.defaultProps));
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function Mi(e, t, n, r) {
    ((t = e.memoizedState),
      (n = n(r, t)),
      (n = n == null ? t : $({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n));
  }
  var Bl = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? sn(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var r = Je(),
        o = tn(e),
        s = Dt(r, o);
      ((s.payload = t),
        n != null && (s.callback = n),
        (t = Gt(e, s, o)),
        t !== null && (xt(t, e, o, r), jl(t, e, o)));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var r = Je(),
        o = tn(e),
        s = Dt(r, o);
      ((s.tag = 1),
        (s.payload = t),
        n != null && (s.callback = n),
        (t = Gt(e, s, o)),
        t !== null && (xt(t, e, o, r), jl(t, e, o)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = Je(),
        r = tn(e),
        o = Dt(n, r);
      ((o.tag = 2),
        t != null && (o.callback = t),
        (t = Gt(e, o, r)),
        t !== null && (xt(t, e, r, n), jl(t, e, r)));
    },
  };
  function $a(e, t, n, r, o, s, f) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(r, s, f)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Sr(n, r) || !Sr(o, s)
          : !0
    );
  }
  function Ha(e, t, n) {
    var r = !1,
      o = Jt,
      s = t.contextType;
    return (
      typeof s == "object" && s !== null
        ? (s = dt(s))
        : ((o = Ye(t) ? cn : Be.current),
          (r = t.contextTypes),
          (s = (r = r != null) ? Un(e, o) : Jt)),
      (t = new t(n, s)),
      (e.memoizedState =
        t.state !== null && t.state !== void 0 ? t.state : null),
      (t.updater = Bl),
      (e.stateNode = t),
      (t._reactInternals = e),
      r &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = o),
        (e.__reactInternalMemoizedMaskedChildContext = s)),
      t
    );
  }
  function Va(e, t, n, r) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(n, r),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(n, r),
      t.state !== e && Bl.enqueueReplaceState(t, t.state, null));
  }
  function Bi(e, t, n, r) {
    var o = e.stateNode;
    ((o.props = n), (o.state = e.memoizedState), (o.refs = {}), Pi(e));
    var s = t.contextType;
    (typeof s == "object" && s !== null
      ? (o.context = dt(s))
      : ((s = Ye(t) ? cn : Be.current), (o.context = Un(e, s))),
      (o.state = e.memoizedState),
      (s = t.getDerivedStateFromProps),
      typeof s == "function" && (Mi(e, t, s, n), (o.state = e.memoizedState)),
      typeof t.getDerivedStateFromProps == "function" ||
        typeof o.getSnapshotBeforeUpdate == "function" ||
        (typeof o.UNSAFE_componentWillMount != "function" &&
          typeof o.componentWillMount != "function") ||
        ((t = o.state),
        typeof o.componentWillMount == "function" && o.componentWillMount(),
        typeof o.UNSAFE_componentWillMount == "function" &&
          o.UNSAFE_componentWillMount(),
        t !== o.state && Bl.enqueueReplaceState(o, o.state, null),
        zl(e, n, o, r),
        (o.state = e.memoizedState)),
      typeof o.componentDidMount == "function" && (e.flags |= 4194308));
  }
  function Wn(e, t) {
    try {
      var n = "",
        r = t;
      do ((n += oe(r)), (r = r.return));
      while (r);
      var o = n;
    } catch (s) {
      o =
        `
Error generating stack: ` +
        s.message +
        `
` +
        s.stack;
    }
    return { value: e, source: t, stack: o, digest: null };
  }
  function $i(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function Hi(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  var Cp = typeof WeakMap == "function" ? WeakMap : Map;
  function Wa(e, t, n) {
    ((n = Dt(-1, n)), (n.tag = 3), (n.payload = { element: null }));
    var r = t.value;
    return (
      (n.callback = function () {
        (ql || ((ql = !0), (ru = r)), Hi(e, t));
      }),
      n
    );
  }
  function Qa(e, t, n) {
    ((n = Dt(-1, n)), (n.tag = 3));
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var o = t.value;
      ((n.payload = function () {
        return r(o);
      }),
        (n.callback = function () {
          Hi(e, t);
        }));
    }
    var s = e.stateNode;
    return (
      s !== null &&
        typeof s.componentDidCatch == "function" &&
        (n.callback = function () {
          (Hi(e, t),
            typeof r != "function" &&
              (bt === null ? (bt = new Set([this])) : bt.add(this)));
          var f = t.stack;
          this.componentDidCatch(t.value, {
            componentStack: f !== null ? f : "",
          });
        }),
      n
    );
  }
  function Ka(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new Cp();
      var o = new Set();
      r.set(t, o);
    } else ((o = r.get(t)), o === void 0 && ((o = new Set()), r.set(t, o)));
    o.has(n) || (o.add(n), (e = Ip.bind(null, e, t, n)), t.then(e, e));
  }
  function qa(e) {
    do {
      var t;
      if (
        ((t = e.tag === 13) &&
          ((t = e.memoizedState),
          (t = t !== null ? t.dehydrated !== null : !0)),
        t)
      )
        return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Ja(e, t, n, r, o) {
    return (e.mode & 1) === 0
      ? (e === t
          ? (e.flags |= 65536)
          : ((e.flags |= 128),
            (n.flags |= 131072),
            (n.flags &= -52805),
            n.tag === 1 &&
              (n.alternate === null
                ? (n.tag = 17)
                : ((t = Dt(-1, 1)), (t.tag = 2), Gt(n, t, 1))),
            (n.lanes |= 1)),
        e)
      : ((e.flags |= 65536), (e.lanes = o), e);
  }
  var Rp = A.ReactCurrentOwner,
    Ge = !1;
  function qe(e, t, n, r) {
    t.child = e === null ? ha(t, null, n, r) : Bn(t, e.child, n, r);
  }
  function Xa(e, t, n, r, o) {
    n = n.render;
    var s = t.ref;
    return (
      Hn(t, o),
      (r = zi(e, t, n, r, s, o)),
      (n = Fi()),
      e !== null && !Ge
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~o),
          Ut(e, t, o))
        : (Se && n && vi(t), (t.flags |= 1), qe(e, t, r, o), t.child)
    );
  }
  function Ya(e, t, n, r, o) {
    if (e === null) {
      var s = n.type;
      return typeof s == "function" &&
        !cu(s) &&
        s.defaultProps === void 0 &&
        n.compare === null &&
        n.defaultProps === void 0
        ? ((t.tag = 15), (t.type = s), Ga(e, t, s, r, o))
        : ((e = bl(n.type, null, r, t, t.mode, o)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((s = e.child), (e.lanes & o) === 0)) {
      var f = s.memoizedProps;
      if (
        ((n = n.compare), (n = n !== null ? n : Sr), n(f, r) && e.ref === t.ref)
      )
        return Ut(e, t, o);
    }
    return (
      (t.flags |= 1),
      (e = rn(s, r)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Ga(e, t, n, r, o) {
    if (e !== null) {
      var s = e.memoizedProps;
      if (Sr(s, r) && e.ref === t.ref)
        if (((Ge = !1), (t.pendingProps = r = s), (e.lanes & o) !== 0))
          (e.flags & 131072) !== 0 && (Ge = !0);
        else return ((t.lanes = e.lanes), Ut(e, t, o));
    }
    return Vi(e, t, n, r, o);
  }
  function Za(e, t, n) {
    var r = t.pendingProps,
      o = r.children,
      s = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
      if ((t.mode & 1) === 0)
        ((t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          he(Kn, st),
          (st |= n));
      else {
        if ((n & 1073741824) === 0)
          return (
            (e = s !== null ? s.baseLanes | n : n),
            (t.lanes = t.childLanes = 1073741824),
            (t.memoizedState = {
              baseLanes: e,
              cachePool: null,
              transitions: null,
            }),
            (t.updateQueue = null),
            he(Kn, st),
            (st |= e),
            null
          );
        ((t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          (r = s !== null ? s.baseLanes : n),
          he(Kn, st),
          (st |= r));
      }
    else
      (s !== null ? ((r = s.baseLanes | n), (t.memoizedState = null)) : (r = n),
        he(Kn, st),
        (st |= r));
    return (qe(e, t, o, n), t.child);
  }
  function ba(e, t) {
    var n = t.ref;
    ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
      ((t.flags |= 512), (t.flags |= 2097152));
  }
  function Vi(e, t, n, r, o) {
    var s = Ye(n) ? cn : Be.current;
    return (
      (s = Un(t, s)),
      Hn(t, o),
      (n = zi(e, t, n, r, s, o)),
      (r = Fi()),
      e !== null && !Ge
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~o),
          Ut(e, t, o))
        : (Se && r && vi(t), (t.flags |= 1), qe(e, t, n, o), t.child)
    );
  }
  function ec(e, t, n, r, o) {
    if (Ye(n)) {
      var s = !0;
      Cl(t);
    } else s = !1;
    if ((Hn(t, o), t.stateNode === null))
      (Hl(e, t), Ha(t, n, r), Bi(t, n, r, o), (r = !0));
    else if (e === null) {
      var f = t.stateNode,
        h = t.memoizedProps;
      f.props = h;
      var m = f.context,
        C = n.contextType;
      typeof C == "object" && C !== null
        ? (C = dt(C))
        : ((C = Ye(n) ? cn : Be.current), (C = Un(t, C)));
      var j = n.getDerivedStateFromProps,
        z =
          typeof j == "function" ||
          typeof f.getSnapshotBeforeUpdate == "function";
      (z ||
        (typeof f.UNSAFE_componentWillReceiveProps != "function" &&
          typeof f.componentWillReceiveProps != "function") ||
        ((h !== r || m !== C) && Va(t, f, r, C)),
        (Yt = !1));
      var L = t.memoizedState;
      ((f.state = L),
        zl(t, r, f, o),
        (m = t.memoizedState),
        h !== r || L !== m || Xe.current || Yt
          ? (typeof j == "function" && (Mi(t, n, j, r), (m = t.memoizedState)),
            (h = Yt || $a(t, n, h, r, L, m, C))
              ? (z ||
                  (typeof f.UNSAFE_componentWillMount != "function" &&
                    typeof f.componentWillMount != "function") ||
                  (typeof f.componentWillMount == "function" &&
                    f.componentWillMount(),
                  typeof f.UNSAFE_componentWillMount == "function" &&
                    f.UNSAFE_componentWillMount()),
                typeof f.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof f.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = r),
                (t.memoizedState = m)),
            (f.props = r),
            (f.state = m),
            (f.context = C),
            (r = h))
          : (typeof f.componentDidMount == "function" && (t.flags |= 4194308),
            (r = !1)));
    } else {
      ((f = t.stateNode),
        va(e, t),
        (h = t.memoizedProps),
        (C = t.type === t.elementType ? h : wt(t.type, h)),
        (f.props = C),
        (z = t.pendingProps),
        (L = f.context),
        (m = n.contextType),
        typeof m == "object" && m !== null
          ? (m = dt(m))
          : ((m = Ye(n) ? cn : Be.current), (m = Un(t, m))));
      var M = n.getDerivedStateFromProps;
      ((j =
        typeof M == "function" ||
        typeof f.getSnapshotBeforeUpdate == "function") ||
        (typeof f.UNSAFE_componentWillReceiveProps != "function" &&
          typeof f.componentWillReceiveProps != "function") ||
        ((h !== z || L !== m) && Va(t, f, r, m)),
        (Yt = !1),
        (L = t.memoizedState),
        (f.state = L),
        zl(t, r, f, o));
      var V = t.memoizedState;
      h !== z || L !== V || Xe.current || Yt
        ? (typeof M == "function" && (Mi(t, n, M, r), (V = t.memoizedState)),
          (C = Yt || $a(t, n, C, r, L, V, m) || !1)
            ? (j ||
                (typeof f.UNSAFE_componentWillUpdate != "function" &&
                  typeof f.componentWillUpdate != "function") ||
                (typeof f.componentWillUpdate == "function" &&
                  f.componentWillUpdate(r, V, m),
                typeof f.UNSAFE_componentWillUpdate == "function" &&
                  f.UNSAFE_componentWillUpdate(r, V, m)),
              typeof f.componentDidUpdate == "function" && (t.flags |= 4),
              typeof f.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof f.componentDidUpdate != "function" ||
                (h === e.memoizedProps && L === e.memoizedState) ||
                (t.flags |= 4),
              typeof f.getSnapshotBeforeUpdate != "function" ||
                (h === e.memoizedProps && L === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = r),
              (t.memoizedState = V)),
          (f.props = r),
          (f.state = V),
          (f.context = m),
          (r = C))
        : (typeof f.componentDidUpdate != "function" ||
            (h === e.memoizedProps && L === e.memoizedState) ||
            (t.flags |= 4),
          typeof f.getSnapshotBeforeUpdate != "function" ||
            (h === e.memoizedProps && L === e.memoizedState) ||
            (t.flags |= 1024),
          (r = !1));
    }
    return Wi(e, t, n, r, s, o);
  }
  function Wi(e, t, n, r, o, s) {
    ba(e, t);
    var f = (t.flags & 128) !== 0;
    if (!r && !f) return (o && oa(t, n, !1), Ut(e, t, s));
    ((r = t.stateNode), (Rp.current = t));
    var h =
      f && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return (
      (t.flags |= 1),
      e !== null && f
        ? ((t.child = Bn(t, e.child, null, s)), (t.child = Bn(t, null, h, s)))
        : qe(e, t, h, s),
      (t.memoizedState = r.state),
      o && oa(t, n, !0),
      t.child
    );
  }
  function tc(e) {
    var t = e.stateNode;
    (t.pendingContext
      ? ra(e, t.pendingContext, t.pendingContext !== t.context)
      : t.context && ra(e, t.context, !1),
      _i(e, t.containerInfo));
  }
  function nc(e, t, n, r, o) {
    return (Mn(), Si(o), (t.flags |= 256), qe(e, t, n, r), t.child);
  }
  var Qi = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Ki(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function rc(e, t, n) {
    var r = t.pendingProps,
      o = Ee.current,
      s = !1,
      f = (t.flags & 128) !== 0,
      h;
    if (
      ((h = f) ||
        (h = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
      h
        ? ((s = !0), (t.flags &= -129))
        : (e === null || e.memoizedState !== null) && (o |= 1),
      he(Ee, o & 1),
      e === null)
    )
      return (
        wi(t),
        (e = t.memoizedState),
        e !== null && ((e = e.dehydrated), e !== null)
          ? ((t.mode & 1) === 0
              ? (t.lanes = 1)
              : e.data === "$!"
                ? (t.lanes = 8)
                : (t.lanes = 1073741824),
            null)
          : ((f = r.children),
            (e = r.fallback),
            s
              ? ((r = t.mode),
                (s = t.child),
                (f = { mode: "hidden", children: f }),
                (r & 1) === 0 && s !== null
                  ? ((s.childLanes = 0), (s.pendingProps = f))
                  : (s = eo(f, r, 0, null)),
                (e = Sn(e, r, n, null)),
                (s.return = t),
                (e.return = t),
                (s.sibling = e),
                (t.child = s),
                (t.child.memoizedState = Ki(n)),
                (t.memoizedState = Qi),
                e)
              : qi(t, f))
      );
    if (((o = e.memoizedState), o !== null && ((h = o.dehydrated), h !== null)))
      return Pp(e, t, f, r, h, o, n);
    if (s) {
      ((s = r.fallback), (f = t.mode), (o = e.child), (h = o.sibling));
      var m = { mode: "hidden", children: r.children };
      return (
        (f & 1) === 0 && t.child !== o
          ? ((r = t.child),
            (r.childLanes = 0),
            (r.pendingProps = m),
            (t.deletions = null))
          : ((r = rn(o, m)), (r.subtreeFlags = o.subtreeFlags & 14680064)),
        h !== null ? (s = rn(h, s)) : ((s = Sn(s, f, n, null)), (s.flags |= 2)),
        (s.return = t),
        (r.return = t),
        (r.sibling = s),
        (t.child = r),
        (r = s),
        (s = t.child),
        (f = e.child.memoizedState),
        (f =
          f === null
            ? Ki(n)
            : {
                baseLanes: f.baseLanes | n,
                cachePool: null,
                transitions: f.transitions,
              }),
        (s.memoizedState = f),
        (s.childLanes = e.childLanes & ~n),
        (t.memoizedState = Qi),
        r
      );
    }
    return (
      (s = e.child),
      (e = s.sibling),
      (r = rn(s, { mode: "visible", children: r.children })),
      (t.mode & 1) === 0 && (r.lanes = n),
      (r.return = t),
      (r.sibling = null),
      e !== null &&
        ((n = t.deletions),
        n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
      (t.child = r),
      (t.memoizedState = null),
      r
    );
  }
  function qi(e, t) {
    return (
      (t = eo({ mode: "visible", children: t }, e.mode, 0, null)),
      (t.return = e),
      (e.child = t)
    );
  }
  function $l(e, t, n, r) {
    return (
      r !== null && Si(r),
      Bn(t, e.child, null, n),
      (e = qi(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Pp(e, t, n, r, o, s, f) {
    if (n)
      return t.flags & 256
        ? ((t.flags &= -257), (r = $i(Error(u(422)))), $l(e, t, f, r))
        : t.memoizedState !== null
          ? ((t.child = e.child), (t.flags |= 128), null)
          : ((s = r.fallback),
            (o = t.mode),
            (r = eo({ mode: "visible", children: r.children }, o, 0, null)),
            (s = Sn(s, o, f, null)),
            (s.flags |= 2),
            (r.return = t),
            (s.return = t),
            (r.sibling = s),
            (t.child = r),
            (t.mode & 1) !== 0 && Bn(t, e.child, null, f),
            (t.child.memoizedState = Ki(f)),
            (t.memoizedState = Qi),
            s);
    if ((t.mode & 1) === 0) return $l(e, t, f, null);
    if (o.data === "$!") {
      if (((r = o.nextSibling && o.nextSibling.dataset), r)) var h = r.dgst;
      return (
        (r = h),
        (s = Error(u(419))),
        (r = $i(s, r, void 0)),
        $l(e, t, f, r)
      );
    }
    if (((h = (f & e.childLanes) !== 0), Ge || h)) {
      if (((r = De), r !== null)) {
        switch (f & -f) {
          case 4:
            o = 2;
            break;
          case 16:
            o = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            o = 32;
            break;
          case 536870912:
            o = 268435456;
            break;
          default:
            o = 0;
        }
        ((o = (o & (r.suspendedLanes | f)) !== 0 ? 0 : o),
          o !== 0 &&
            o !== s.retryLane &&
            ((s.retryLane = o), Ft(e, o), xt(r, e, o, -1)));
      }
      return (au(), (r = $i(Error(u(421)))), $l(e, t, f, r));
    }
    return o.data === "$?"
      ? ((t.flags |= 128),
        (t.child = e.child),
        (t = Mp.bind(null, e)),
        (o._reactRetry = t),
        null)
      : ((e = s.treeContext),
        (ut = Kt(o.nextSibling)),
        (it = t),
        (Se = !0),
        (gt = null),
        e !== null &&
          ((ct[ft++] = jt),
          (ct[ft++] = zt),
          (ct[ft++] = fn),
          (jt = e.id),
          (zt = e.overflow),
          (fn = t)),
        (t = qi(t, r.children)),
        (t.flags |= 4096),
        t);
  }
  function lc(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    (r !== null && (r.lanes |= t), Ci(e.return, t, n));
  }
  function Ji(e, t, n, r, o) {
    var s = e.memoizedState;
    s === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: r,
          tail: n,
          tailMode: o,
        })
      : ((s.isBackwards = t),
        (s.rendering = null),
        (s.renderingStartTime = 0),
        (s.last = r),
        (s.tail = n),
        (s.tailMode = o));
  }
  function oc(e, t, n) {
    var r = t.pendingProps,
      o = r.revealOrder,
      s = r.tail;
    if ((qe(e, t, r.children, n), (r = Ee.current), (r & 2) !== 0))
      ((r = (r & 1) | 2), (t.flags |= 128));
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && lc(e, n, t);
          else if (e.tag === 19) lc(e, n, t);
          else if (e.child !== null) {
            ((e.child.return = e), (e = e.child));
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          ((e.sibling.return = e.return), (e = e.sibling));
        }
      r &= 1;
    }
    if ((he(Ee, r), (t.mode & 1) === 0)) t.memoizedState = null;
    else
      switch (o) {
        case "forwards":
          for (n = t.child, o = null; n !== null; )
            ((e = n.alternate),
              e !== null && Fl(e) === null && (o = n),
              (n = n.sibling));
          ((n = o),
            n === null
              ? ((o = t.child), (t.child = null))
              : ((o = n.sibling), (n.sibling = null)),
            Ji(t, !1, o, n, s));
          break;
        case "backwards":
          for (n = null, o = t.child, t.child = null; o !== null; ) {
            if (((e = o.alternate), e !== null && Fl(e) === null)) {
              t.child = o;
              break;
            }
            ((e = o.sibling), (o.sibling = n), (n = o), (o = e));
          }
          Ji(t, !0, n, null, s);
          break;
        case "together":
          Ji(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function Hl(e, t) {
    (t.mode & 1) === 0 &&
      e !== null &&
      ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
  }
  function Ut(e, t, n) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (vn |= t.lanes),
      (n & t.childLanes) === 0)
    )
      return null;
    if (e !== null && t.child !== e.child) throw Error(u(153));
    if (t.child !== null) {
      for (
        e = t.child, n = rn(e, e.pendingProps), t.child = n, n.return = t;
        e.sibling !== null;

      )
        ((e = e.sibling),
          (n = n.sibling = rn(e, e.pendingProps)),
          (n.return = t));
      n.sibling = null;
    }
    return t.child;
  }
  function _p(e, t, n) {
    switch (t.tag) {
      case 3:
        (tc(t), Mn());
        break;
      case 5:
        wa(t);
        break;
      case 1:
        Ye(t.type) && Cl(t);
        break;
      case 4:
        _i(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context,
          o = t.memoizedProps.value;
        (he(Ol, r._currentValue), (r._currentValue = o));
        break;
      case 13:
        if (((r = t.memoizedState), r !== null))
          return r.dehydrated !== null
            ? (he(Ee, Ee.current & 1), (t.flags |= 128), null)
            : (n & t.child.childLanes) !== 0
              ? rc(e, t, n)
              : (he(Ee, Ee.current & 1),
                (e = Ut(e, t, n)),
                e !== null ? e.sibling : null);
        he(Ee, Ee.current & 1);
        break;
      case 19:
        if (((r = (n & t.childLanes) !== 0), (e.flags & 128) !== 0)) {
          if (r) return oc(e, t, n);
          t.flags |= 128;
        }
        if (
          ((o = t.memoizedState),
          o !== null &&
            ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
          he(Ee, Ee.current),
          r)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((t.lanes = 0), Za(e, t, n));
    }
    return Ut(e, t, n);
  }
  var ic, Xi, uc, sc;
  ((ic = function (e, t) {
    for (var n = t.child; n !== null; ) {
      if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
      else if (n.tag !== 4 && n.child !== null) {
        ((n.child.return = n), (n = n.child));
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return;
        n = n.return;
      }
      ((n.sibling.return = n.return), (n = n.sibling));
    }
  }),
    (Xi = function () {}),
    (uc = function (e, t, n, r) {
      var o = e.memoizedProps;
      if (o !== r) {
        ((e = t.stateNode), hn(Pt.current));
        var s = null;
        switch (n) {
          case "input":
            ((o = Co(e, o)), (r = Co(e, r)), (s = []));
            break;
          case "select":
            ((o = $({}, o, { value: void 0 })),
              (r = $({}, r, { value: void 0 })),
              (s = []));
            break;
          case "textarea":
            ((o = _o(e, o)), (r = _o(e, r)), (s = []));
            break;
          default:
            typeof o.onClick != "function" &&
              typeof r.onClick == "function" &&
              (e.onclick = El);
        }
        To(n, r);
        var f;
        n = null;
        for (C in o)
          if (!r.hasOwnProperty(C) && o.hasOwnProperty(C) && o[C] != null)
            if (C === "style") {
              var h = o[C];
              for (f in h) h.hasOwnProperty(f) && (n || (n = {}), (n[f] = ""));
            } else
              C !== "dangerouslySetInnerHTML" &&
                C !== "children" &&
                C !== "suppressContentEditableWarning" &&
                C !== "suppressHydrationWarning" &&
                C !== "autoFocus" &&
                (c.hasOwnProperty(C)
                  ? s || (s = [])
                  : (s = s || []).push(C, null));
        for (C in r) {
          var m = r[C];
          if (
            ((h = o?.[C]),
            r.hasOwnProperty(C) && m !== h && (m != null || h != null))
          )
            if (C === "style")
              if (h) {
                for (f in h)
                  !h.hasOwnProperty(f) ||
                    (m && m.hasOwnProperty(f)) ||
                    (n || (n = {}), (n[f] = ""));
                for (f in m)
                  m.hasOwnProperty(f) &&
                    h[f] !== m[f] &&
                    (n || (n = {}), (n[f] = m[f]));
              } else (n || (s || (s = []), s.push(C, n)), (n = m));
            else
              C === "dangerouslySetInnerHTML"
                ? ((m = m ? m.__html : void 0),
                  (h = h ? h.__html : void 0),
                  m != null && h !== m && (s = s || []).push(C, m))
                : C === "children"
                  ? (typeof m != "string" && typeof m != "number") ||
                    (s = s || []).push(C, "" + m)
                  : C !== "suppressContentEditableWarning" &&
                    C !== "suppressHydrationWarning" &&
                    (c.hasOwnProperty(C)
                      ? (m != null && C === "onScroll" && ye("scroll", e),
                        s || h === m || (s = []))
                      : (s = s || []).push(C, m));
        }
        n && (s = s || []).push("style", n);
        var C = s;
        (t.updateQueue = C) && (t.flags |= 4);
      }
    }),
    (sc = function (e, t, n, r) {
      n !== r && (t.flags |= 4);
    }));
  function Dr(e, t) {
    if (!Se)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            (t.alternate !== null && (n = t), (t = t.sibling));
          n === null ? (e.tail = null) : (n.sibling = null);
          break;
        case "collapsed":
          n = e.tail;
          for (var r = null; n !== null; )
            (n.alternate !== null && (r = n), (n = n.sibling));
          r === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (r.sibling = null);
      }
  }
  function He(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      n = 0,
      r = 0;
    if (t)
      for (var o = e.child; o !== null; )
        ((n |= o.lanes | o.childLanes),
          (r |= o.subtreeFlags & 14680064),
          (r |= o.flags & 14680064),
          (o.return = e),
          (o = o.sibling));
    else
      for (o = e.child; o !== null; )
        ((n |= o.lanes | o.childLanes),
          (r |= o.subtreeFlags),
          (r |= o.flags),
          (o.return = e),
          (o = o.sibling));
    return ((e.subtreeFlags |= r), (e.childLanes = n), t);
  }
  function Np(e, t, n) {
    var r = t.pendingProps;
    switch ((yi(t), t.tag)) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (He(t), null);
      case 1:
        return (Ye(t.type) && kl(), He(t), null);
      case 3:
        return (
          (r = t.stateNode),
          Vn(),
          ge(Xe),
          ge(Be),
          Oi(),
          r.pendingContext &&
            ((r.context = r.pendingContext), (r.pendingContext = null)),
          (e === null || e.child === null) &&
            (Nl(t)
              ? (t.flags |= 4)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), gt !== null && (iu(gt), (gt = null)))),
          Xi(e, t),
          He(t),
          null
        );
      case 5:
        Ni(t);
        var o = hn(Or.current);
        if (((n = t.type), e !== null && t.stateNode != null))
          (uc(e, t, n, r, o),
            e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(u(166));
            return (He(t), null);
          }
          if (((e = hn(Pt.current)), Nl(t))) {
            ((r = t.stateNode), (n = t.type));
            var s = t.memoizedProps;
            switch (((r[Rt] = t), (r[Rr] = s), (e = (t.mode & 1) !== 0), n)) {
              case "dialog":
                (ye("cancel", r), ye("close", r));
                break;
              case "iframe":
              case "object":
              case "embed":
                ye("load", r);
                break;
              case "video":
              case "audio":
                for (o = 0; o < xr.length; o++) ye(xr[o], r);
                break;
              case "source":
                ye("error", r);
                break;
              case "img":
              case "image":
              case "link":
                (ye("error", r), ye("load", r));
                break;
              case "details":
                ye("toggle", r);
                break;
              case "input":
                (Hu(r, s), ye("invalid", r));
                break;
              case "select":
                ((r._wrapperState = { wasMultiple: !!s.multiple }),
                  ye("invalid", r));
                break;
              case "textarea":
                (Qu(r, s), ye("invalid", r));
            }
            (To(n, s), (o = null));
            for (var f in s)
              if (s.hasOwnProperty(f)) {
                var h = s[f];
                f === "children"
                  ? typeof h == "string"
                    ? r.textContent !== h &&
                      (s.suppressHydrationWarning !== !0 &&
                        Sl(r.textContent, h, e),
                      (o = ["children", h]))
                    : typeof h == "number" &&
                      r.textContent !== "" + h &&
                      (s.suppressHydrationWarning !== !0 &&
                        Sl(r.textContent, h, e),
                      (o = ["children", "" + h]))
                  : c.hasOwnProperty(f) &&
                    h != null &&
                    f === "onScroll" &&
                    ye("scroll", r);
              }
            switch (n) {
              case "input":
                (Gr(r), Wu(r, s, !0));
                break;
              case "textarea":
                (Gr(r), qu(r));
                break;
              case "select":
              case "option":
                break;
              default:
                typeof s.onClick == "function" && (r.onclick = El);
            }
            ((r = o), (t.updateQueue = r), r !== null && (t.flags |= 4));
          } else {
            ((f = o.nodeType === 9 ? o : o.ownerDocument),
              e === "http://www.w3.org/1999/xhtml" && (e = Ju(n)),
              e === "http://www.w3.org/1999/xhtml"
                ? n === "script"
                  ? ((e = f.createElement("div")),
                    (e.innerHTML = "<script><\/script>"),
                    (e = e.removeChild(e.firstChild)))
                  : typeof r.is == "string"
                    ? (e = f.createElement(n, { is: r.is }))
                    : ((e = f.createElement(n)),
                      n === "select" &&
                        ((f = e),
                        r.multiple
                          ? (f.multiple = !0)
                          : r.size && (f.size = r.size)))
                : (e = f.createElementNS(e, n)),
              (e[Rt] = t),
              (e[Rr] = r),
              ic(e, t, !1, !1),
              (t.stateNode = e));
            e: {
              switch (((f = Oo(n, r)), n)) {
                case "dialog":
                  (ye("cancel", e), ye("close", e), (o = r));
                  break;
                case "iframe":
                case "object":
                case "embed":
                  (ye("load", e), (o = r));
                  break;
                case "video":
                case "audio":
                  for (o = 0; o < xr.length; o++) ye(xr[o], e);
                  o = r;
                  break;
                case "source":
                  (ye("error", e), (o = r));
                  break;
                case "img":
                case "image":
                case "link":
                  (ye("error", e), ye("load", e), (o = r));
                  break;
                case "details":
                  (ye("toggle", e), (o = r));
                  break;
                case "input":
                  (Hu(e, r), (o = Co(e, r)), ye("invalid", e));
                  break;
                case "option":
                  o = r;
                  break;
                case "select":
                  ((e._wrapperState = { wasMultiple: !!r.multiple }),
                    (o = $({}, r, { value: void 0 })),
                    ye("invalid", e));
                  break;
                case "textarea":
                  (Qu(e, r), (o = _o(e, r)), ye("invalid", e));
                  break;
                default:
                  o = r;
              }
              (To(n, o), (h = o));
              for (s in h)
                if (h.hasOwnProperty(s)) {
                  var m = h[s];
                  s === "style"
                    ? Gu(e, m)
                    : s === "dangerouslySetInnerHTML"
                      ? ((m = m ? m.__html : void 0), m != null && Xu(e, m))
                      : s === "children"
                        ? typeof m == "string"
                          ? (n !== "textarea" || m !== "") && rr(e, m)
                          : typeof m == "number" && rr(e, "" + m)
                        : s !== "suppressContentEditableWarning" &&
                          s !== "suppressHydrationWarning" &&
                          s !== "autoFocus" &&
                          (c.hasOwnProperty(s)
                            ? m != null && s === "onScroll" && ye("scroll", e)
                            : m != null && K(e, s, m, f));
                }
              switch (n) {
                case "input":
                  (Gr(e), Wu(e, r, !1));
                  break;
                case "textarea":
                  (Gr(e), qu(e));
                  break;
                case "option":
                  r.value != null && e.setAttribute("value", "" + ce(r.value));
                  break;
                case "select":
                  ((e.multiple = !!r.multiple),
                    (s = r.value),
                    s != null
                      ? Cn(e, !!r.multiple, s, !1)
                      : r.defaultValue != null &&
                        Cn(e, !!r.multiple, r.defaultValue, !0));
                  break;
                default:
                  typeof o.onClick == "function" && (e.onclick = El);
              }
              switch (n) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  r = !!r.autoFocus;
                  break e;
                case "img":
                  r = !0;
                  break e;
                default:
                  r = !1;
              }
            }
            r && (t.flags |= 4);
          }
          t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
        }
        return (He(t), null);
      case 6:
        if (e && t.stateNode != null) sc(e, t, e.memoizedProps, r);
        else {
          if (typeof r != "string" && t.stateNode === null) throw Error(u(166));
          if (((n = hn(Or.current)), hn(Pt.current), Nl(t))) {
            if (
              ((r = t.stateNode),
              (n = t.memoizedProps),
              (r[Rt] = t),
              (s = r.nodeValue !== n) && ((e = it), e !== null))
            )
              switch (e.tag) {
                case 3:
                  Sl(r.nodeValue, n, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 &&
                    Sl(r.nodeValue, n, (e.mode & 1) !== 0);
              }
            s && (t.flags |= 4);
          } else
            ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
              (r[Rt] = t),
              (t.stateNode = r));
        }
        return (He(t), null);
      case 13:
        if (
          (ge(Ee),
          (r = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (Se && ut !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0)
            (fa(), Mn(), (t.flags |= 98560), (s = !1));
          else if (((s = Nl(t)), r !== null && r.dehydrated !== null)) {
            if (e === null) {
              if (!s) throw Error(u(318));
              if (
                ((s = t.memoizedState),
                (s = s !== null ? s.dehydrated : null),
                !s)
              )
                throw Error(u(317));
              s[Rt] = t;
            } else
              (Mn(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (He(t), (s = !1));
          } else (gt !== null && (iu(gt), (gt = null)), (s = !0));
          if (!s) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0
          ? ((t.lanes = n), t)
          : ((r = r !== null),
            r !== (e !== null && e.memoizedState !== null) &&
              r &&
              ((t.child.flags |= 8192),
              (t.mode & 1) !== 0 &&
                (e === null || (Ee.current & 1) !== 0
                  ? ze === 0 && (ze = 3)
                  : au())),
            t.updateQueue !== null && (t.flags |= 4),
            He(t),
            null);
      case 4:
        return (
          Vn(),
          Xi(e, t),
          e === null && kr(t.stateNode.containerInfo),
          He(t),
          null
        );
      case 10:
        return (ki(t.type._context), He(t), null);
      case 17:
        return (Ye(t.type) && kl(), He(t), null);
      case 19:
        if ((ge(Ee), (s = t.memoizedState), s === null)) return (He(t), null);
        if (((r = (t.flags & 128) !== 0), (f = s.rendering), f === null))
          if (r) Dr(s, !1);
          else {
            if (ze !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((f = Fl(e)), f !== null)) {
                  for (
                    t.flags |= 128,
                      Dr(s, !1),
                      r = f.updateQueue,
                      r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                      t.subtreeFlags = 0,
                      r = n,
                      n = t.child;
                    n !== null;

                  )
                    ((s = n),
                      (e = r),
                      (s.flags &= 14680066),
                      (f = s.alternate),
                      f === null
                        ? ((s.childLanes = 0),
                          (s.lanes = e),
                          (s.child = null),
                          (s.subtreeFlags = 0),
                          (s.memoizedProps = null),
                          (s.memoizedState = null),
                          (s.updateQueue = null),
                          (s.dependencies = null),
                          (s.stateNode = null))
                        : ((s.childLanes = f.childLanes),
                          (s.lanes = f.lanes),
                          (s.child = f.child),
                          (s.subtreeFlags = 0),
                          (s.deletions = null),
                          (s.memoizedProps = f.memoizedProps),
                          (s.memoizedState = f.memoizedState),
                          (s.updateQueue = f.updateQueue),
                          (s.type = f.type),
                          (e = f.dependencies),
                          (s.dependencies =
                            e === null
                              ? null
                              : {
                                  lanes: e.lanes,
                                  firstContext: e.firstContext,
                                })),
                      (n = n.sibling));
                  return (he(Ee, (Ee.current & 1) | 2), t.child);
                }
                e = e.sibling;
              }
            s.tail !== null &&
              Re() > qn &&
              ((t.flags |= 128), (r = !0), Dr(s, !1), (t.lanes = 4194304));
          }
        else {
          if (!r)
            if (((e = Fl(f)), e !== null)) {
              if (
                ((t.flags |= 128),
                (r = !0),
                (n = e.updateQueue),
                n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                Dr(s, !0),
                s.tail === null &&
                  s.tailMode === "hidden" &&
                  !f.alternate &&
                  !Se)
              )
                return (He(t), null);
            } else
              2 * Re() - s.renderingStartTime > qn &&
                n !== 1073741824 &&
                ((t.flags |= 128), (r = !0), Dr(s, !1), (t.lanes = 4194304));
          s.isBackwards
            ? ((f.sibling = t.child), (t.child = f))
            : ((n = s.last),
              n !== null ? (n.sibling = f) : (t.child = f),
              (s.last = f));
        }
        return s.tail !== null
          ? ((t = s.tail),
            (s.rendering = t),
            (s.tail = t.sibling),
            (s.renderingStartTime = Re()),
            (t.sibling = null),
            (n = Ee.current),
            he(Ee, r ? (n & 1) | 2 : n & 1),
            t)
          : (He(t), null);
      case 22:
      case 23:
        return (
          su(),
          (r = t.memoizedState !== null),
          e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
          r && (t.mode & 1) !== 0
            ? (st & 1073741824) !== 0 &&
              (He(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : He(t),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(u(156, t.tag));
  }
  function Tp(e, t) {
    switch ((yi(t), t.tag)) {
      case 1:
        return (
          Ye(t.type) && kl(),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          Vn(),
          ge(Xe),
          ge(Be),
          Oi(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 5:
        return (Ni(t), null);
      case 13:
        if (
          (ge(Ee), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(u(340));
          Mn();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return (ge(Ee), null);
      case 4:
        return (Vn(), null);
      case 10:
        return (ki(t.type._context), null);
      case 22:
      case 23:
        return (su(), null);
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Vl = !1,
    Ve = !1,
    Op = typeof WeakSet == "function" ? WeakSet : Set,
    H = null;
  function Qn(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function")
        try {
          n(null);
        } catch (r) {
          Ce(e, t, r);
        }
      else n.current = null;
  }
  function Yi(e, t, n) {
    try {
      n();
    } catch (r) {
      Ce(e, t, r);
    }
  }
  var ac = !1;
  function Lp(e, t) {
    if (((si = al), (e = $s()), ei(e))) {
      if ("selectionStart" in e)
        var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = ((n = e.ownerDocument) && n.defaultView) || window;
          var r = n.getSelection && n.getSelection();
          if (r && r.rangeCount !== 0) {
            n = r.anchorNode;
            var o = r.anchorOffset,
              s = r.focusNode;
            r = r.focusOffset;
            try {
              (n.nodeType, s.nodeType);
            } catch {
              n = null;
              break e;
            }
            var f = 0,
              h = -1,
              m = -1,
              C = 0,
              j = 0,
              z = e,
              L = null;
            t: for (;;) {
              for (
                var M;
                z !== n || (o !== 0 && z.nodeType !== 3) || (h = f + o),
                  z !== s || (r !== 0 && z.nodeType !== 3) || (m = f + r),
                  z.nodeType === 3 && (f += z.nodeValue.length),
                  (M = z.firstChild) !== null;

              )
                ((L = z), (z = M));
              for (;;) {
                if (z === e) break t;
                if (
                  (L === n && ++C === o && (h = f),
                  L === s && ++j === r && (m = f),
                  (M = z.nextSibling) !== null)
                )
                  break;
                ((z = L), (L = z.parentNode));
              }
              z = M;
            }
            n = h === -1 || m === -1 ? null : { start: h, end: m };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (
      ai = { focusedElem: e, selectionRange: n }, al = !1, H = t;
      H !== null;

    )
      if (((t = H), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (H = e));
      else
        for (; H !== null; ) {
          t = H;
          try {
            var V = t.alternate;
            if ((t.flags & 1024) !== 0)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (V !== null) {
                    var W = V.memoizedProps,
                      Pe = V.memoizedState,
                      E = t.stateNode,
                      y = E.getSnapshotBeforeUpdate(
                        t.elementType === t.type ? W : wt(t.type, W),
                        Pe,
                      );
                    E.__reactInternalSnapshotBeforeUpdate = y;
                  }
                  break;
                case 3:
                  var k = t.stateNode.containerInfo;
                  k.nodeType === 1
                    ? (k.textContent = "")
                    : k.nodeType === 9 &&
                      k.documentElement &&
                      k.removeChild(k.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(u(163));
              }
          } catch (F) {
            Ce(t, t.return, F);
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (H = e));
            break;
          }
          H = t.return;
        }
    return ((V = ac), (ac = !1), V);
  }
  function Ur(e, t, n) {
    var r = t.updateQueue;
    if (((r = r !== null ? r.lastEffect : null), r !== null)) {
      var o = (r = r.next);
      do {
        if ((o.tag & e) === e) {
          var s = o.destroy;
          ((o.destroy = void 0), s !== void 0 && Yi(t, n, s));
        }
        o = o.next;
      } while (o !== r);
    }
  }
  function Wl(e, t) {
    if (
      ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
    ) {
      var n = (t = t.next);
      do {
        if ((n.tag & e) === e) {
          var r = n.create;
          n.destroy = r();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function Gi(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode;
      switch (e.tag) {
        case 5:
          e = n;
          break;
        default:
          e = n;
      }
      typeof t == "function" ? t(e) : (t.current = e);
    }
  }
  function cc(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), cc(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 &&
        ((t = e.stateNode),
        t !== null &&
          (delete t[Rt],
          delete t[Rr],
          delete t[pi],
          delete t[pp],
          delete t[hp])),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  function fc(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function dc(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || fc(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

      ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Zi(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      ((e = e.stateNode),
        t
          ? n.nodeType === 8
            ? n.parentNode.insertBefore(e, t)
            : n.insertBefore(e, t)
          : (n.nodeType === 8
              ? ((t = n.parentNode), t.insertBefore(e, n))
              : ((t = n), t.appendChild(e)),
            (n = n._reactRootContainer),
            n != null || t.onclick !== null || (t.onclick = El)));
    else if (r !== 4 && ((e = e.child), e !== null))
      for (Zi(e, t, n), e = e.sibling; e !== null; )
        (Zi(e, t, n), (e = e.sibling));
  }
  function bi(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
    else if (r !== 4 && ((e = e.child), e !== null))
      for (bi(e, t, n), e = e.sibling; e !== null; )
        (bi(e, t, n), (e = e.sibling));
  }
  var Ae = null,
    St = !1;
  function Zt(e, t, n) {
    for (n = n.child; n !== null; ) (pc(e, t, n), (n = n.sibling));
  }
  function pc(e, t, n) {
    if (Ct && typeof Ct.onCommitFiberUnmount == "function")
      try {
        Ct.onCommitFiberUnmount(rl, n);
      } catch {}
    switch (n.tag) {
      case 5:
        Ve || Qn(n, t);
      case 6:
        var r = Ae,
          o = St;
        ((Ae = null),
          Zt(e, t, n),
          (Ae = r),
          (St = o),
          Ae !== null &&
            (St
              ? ((e = Ae),
                (n = n.stateNode),
                e.nodeType === 8
                  ? e.parentNode.removeChild(n)
                  : e.removeChild(n))
              : Ae.removeChild(n.stateNode)));
        break;
      case 18:
        Ae !== null &&
          (St
            ? ((e = Ae),
              (n = n.stateNode),
              e.nodeType === 8
                ? di(e.parentNode, n)
                : e.nodeType === 1 && di(e, n),
              hr(e))
            : di(Ae, n.stateNode));
        break;
      case 4:
        ((r = Ae),
          (o = St),
          (Ae = n.stateNode.containerInfo),
          (St = !0),
          Zt(e, t, n),
          (Ae = r),
          (St = o));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (
          !Ve &&
          ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
        ) {
          o = r = r.next;
          do {
            var s = o,
              f = s.destroy;
            ((s = s.tag),
              f !== void 0 && ((s & 2) !== 0 || (s & 4) !== 0) && Yi(n, t, f),
              (o = o.next));
          } while (o !== r);
        }
        Zt(e, t, n);
        break;
      case 1:
        if (
          !Ve &&
          (Qn(n, t),
          (r = n.stateNode),
          typeof r.componentWillUnmount == "function")
        )
          try {
            ((r.props = n.memoizedProps),
              (r.state = n.memoizedState),
              r.componentWillUnmount());
          } catch (h) {
            Ce(n, t, h);
          }
        Zt(e, t, n);
        break;
      case 21:
        Zt(e, t, n);
        break;
      case 22:
        n.mode & 1
          ? ((Ve = (r = Ve) || n.memoizedState !== null), Zt(e, t, n), (Ve = r))
          : Zt(e, t, n);
        break;
      default:
        Zt(e, t, n);
    }
  }
  function hc(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      (n === null && (n = e.stateNode = new Op()),
        t.forEach(function (r) {
          var o = Bp.bind(null, e, r);
          n.has(r) || (n.add(r), r.then(o, o));
        }));
    }
  }
  function Et(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var r = 0; r < n.length; r++) {
        var o = n[r];
        try {
          var s = e,
            f = t,
            h = f;
          e: for (; h !== null; ) {
            switch (h.tag) {
              case 5:
                ((Ae = h.stateNode), (St = !1));
                break e;
              case 3:
                ((Ae = h.stateNode.containerInfo), (St = !0));
                break e;
              case 4:
                ((Ae = h.stateNode.containerInfo), (St = !0));
                break e;
            }
            h = h.return;
          }
          if (Ae === null) throw Error(u(160));
          (pc(s, f, o), (Ae = null), (St = !1));
          var m = o.alternate;
          (m !== null && (m.return = null), (o.return = null));
        } catch (C) {
          Ce(o, t, C);
        }
      }
    if (t.subtreeFlags & 12854)
      for (t = t.child; t !== null; ) (mc(t, e), (t = t.sibling));
  }
  function mc(e, t) {
    var n = e.alternate,
      r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((Et(t, e), Nt(e), r & 4)) {
          try {
            (Ur(3, e, e.return), Wl(3, e));
          } catch (W) {
            Ce(e, e.return, W);
          }
          try {
            Ur(5, e, e.return);
          } catch (W) {
            Ce(e, e.return, W);
          }
        }
        break;
      case 1:
        (Et(t, e), Nt(e), r & 512 && n !== null && Qn(n, n.return));
        break;
      case 5:
        if (
          (Et(t, e),
          Nt(e),
          r & 512 && n !== null && Qn(n, n.return),
          e.flags & 32)
        ) {
          var o = e.stateNode;
          try {
            rr(o, "");
          } catch (W) {
            Ce(e, e.return, W);
          }
        }
        if (r & 4 && ((o = e.stateNode), o != null)) {
          var s = e.memoizedProps,
            f = n !== null ? n.memoizedProps : s,
            h = e.type,
            m = e.updateQueue;
          if (((e.updateQueue = null), m !== null))
            try {
              (h === "input" &&
                s.type === "radio" &&
                s.name != null &&
                Vu(o, s),
                Oo(h, f));
              var C = Oo(h, s);
              for (f = 0; f < m.length; f += 2) {
                var j = m[f],
                  z = m[f + 1];
                j === "style"
                  ? Gu(o, z)
                  : j === "dangerouslySetInnerHTML"
                    ? Xu(o, z)
                    : j === "children"
                      ? rr(o, z)
                      : K(o, j, z, C);
              }
              switch (h) {
                case "input":
                  Ro(o, s);
                  break;
                case "textarea":
                  Ku(o, s);
                  break;
                case "select":
                  var L = o._wrapperState.wasMultiple;
                  o._wrapperState.wasMultiple = !!s.multiple;
                  var M = s.value;
                  M != null
                    ? Cn(o, !!s.multiple, M, !1)
                    : L !== !!s.multiple &&
                      (s.defaultValue != null
                        ? Cn(o, !!s.multiple, s.defaultValue, !0)
                        : Cn(o, !!s.multiple, s.multiple ? [] : "", !1));
              }
              o[Rr] = s;
            } catch (W) {
              Ce(e, e.return, W);
            }
        }
        break;
      case 6:
        if ((Et(t, e), Nt(e), r & 4)) {
          if (e.stateNode === null) throw Error(u(162));
          ((o = e.stateNode), (s = e.memoizedProps));
          try {
            o.nodeValue = s;
          } catch (W) {
            Ce(e, e.return, W);
          }
        }
        break;
      case 3:
        if (
          (Et(t, e), Nt(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            hr(t.containerInfo);
          } catch (W) {
            Ce(e, e.return, W);
          }
        break;
      case 4:
        (Et(t, e), Nt(e));
        break;
      case 13:
        (Et(t, e),
          Nt(e),
          (o = e.child),
          o.flags & 8192 &&
            ((s = o.memoizedState !== null),
            (o.stateNode.isHidden = s),
            !s ||
              (o.alternate !== null && o.alternate.memoizedState !== null) ||
              (nu = Re())),
          r & 4 && hc(e));
        break;
      case 22:
        if (
          ((j = n !== null && n.memoizedState !== null),
          e.mode & 1 ? ((Ve = (C = Ve) || j), Et(t, e), (Ve = C)) : Et(t, e),
          Nt(e),
          r & 8192)
        ) {
          if (
            ((C = e.memoizedState !== null),
            (e.stateNode.isHidden = C) && !j && (e.mode & 1) !== 0)
          )
            for (H = e, j = e.child; j !== null; ) {
              for (z = H = j; H !== null; ) {
                switch (((L = H), (M = L.child), L.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    Ur(4, L, L.return);
                    break;
                  case 1:
                    Qn(L, L.return);
                    var V = L.stateNode;
                    if (typeof V.componentWillUnmount == "function") {
                      ((r = L), (n = L.return));
                      try {
                        ((t = r),
                          (V.props = t.memoizedProps),
                          (V.state = t.memoizedState),
                          V.componentWillUnmount());
                      } catch (W) {
                        Ce(r, n, W);
                      }
                    }
                    break;
                  case 5:
                    Qn(L, L.return);
                    break;
                  case 22:
                    if (L.memoizedState !== null) {
                      gc(z);
                      continue;
                    }
                }
                M !== null ? ((M.return = L), (H = M)) : gc(z);
              }
              j = j.sibling;
            }
          e: for (j = null, z = e; ; ) {
            if (z.tag === 5) {
              if (j === null) {
                j = z;
                try {
                  ((o = z.stateNode),
                    C
                      ? ((s = o.style),
                        typeof s.setProperty == "function"
                          ? s.setProperty("display", "none", "important")
                          : (s.display = "none"))
                      : ((h = z.stateNode),
                        (m = z.memoizedProps.style),
                        (f =
                          m != null && m.hasOwnProperty("display")
                            ? m.display
                            : null),
                        (h.style.display = Yu("display", f))));
                } catch (W) {
                  Ce(e, e.return, W);
                }
              }
            } else if (z.tag === 6) {
              if (j === null)
                try {
                  z.stateNode.nodeValue = C ? "" : z.memoizedProps;
                } catch (W) {
                  Ce(e, e.return, W);
                }
            } else if (
              ((z.tag !== 22 && z.tag !== 23) ||
                z.memoizedState === null ||
                z === e) &&
              z.child !== null
            ) {
              ((z.child.return = z), (z = z.child));
              continue;
            }
            if (z === e) break e;
            for (; z.sibling === null; ) {
              if (z.return === null || z.return === e) break e;
              (j === z && (j = null), (z = z.return));
            }
            (j === z && (j = null),
              (z.sibling.return = z.return),
              (z = z.sibling));
          }
        }
        break;
      case 19:
        (Et(t, e), Nt(e), r & 4 && hc(e));
        break;
      case 21:
        break;
      default:
        (Et(t, e), Nt(e));
    }
  }
  function Nt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (fc(n)) {
              var r = n;
              break e;
            }
            n = n.return;
          }
          throw Error(u(160));
        }
        switch (r.tag) {
          case 5:
            var o = r.stateNode;
            r.flags & 32 && (rr(o, ""), (r.flags &= -33));
            var s = dc(e);
            bi(e, s, o);
            break;
          case 3:
          case 4:
            var f = r.stateNode.containerInfo,
              h = dc(e);
            Zi(e, h, f);
            break;
          default:
            throw Error(u(161));
        }
      } catch (m) {
        Ce(e, e.return, m);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function jp(e, t, n) {
    ((H = e), vc(e));
  }
  function vc(e, t, n) {
    for (var r = (e.mode & 1) !== 0; H !== null; ) {
      var o = H,
        s = o.child;
      if (o.tag === 22 && r) {
        var f = o.memoizedState !== null || Vl;
        if (!f) {
          var h = o.alternate,
            m = (h !== null && h.memoizedState !== null) || Ve;
          h = Vl;
          var C = Ve;
          if (((Vl = f), (Ve = m) && !C))
            for (H = o; H !== null; )
              ((f = H),
                (m = f.child),
                f.tag === 22 && f.memoizedState !== null
                  ? wc(o)
                  : m !== null
                    ? ((m.return = f), (H = m))
                    : wc(o));
          for (; s !== null; ) ((H = s), vc(s), (s = s.sibling));
          ((H = o), (Vl = h), (Ve = C));
        }
        yc(e);
      } else
        (o.subtreeFlags & 8772) !== 0 && s !== null
          ? ((s.return = o), (H = s))
          : yc(e);
    }
  }
  function yc(e) {
    for (; H !== null; ) {
      var t = H;
      if ((t.flags & 8772) !== 0) {
        var n = t.alternate;
        try {
          if ((t.flags & 8772) !== 0)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                Ve || Wl(5, t);
                break;
              case 1:
                var r = t.stateNode;
                if (t.flags & 4 && !Ve)
                  if (n === null) r.componentDidMount();
                  else {
                    var o =
                      t.elementType === t.type
                        ? n.memoizedProps
                        : wt(t.type, n.memoizedProps);
                    r.componentDidUpdate(
                      o,
                      n.memoizedState,
                      r.__reactInternalSnapshotBeforeUpdate,
                    );
                  }
                var s = t.updateQueue;
                s !== null && ga(t, s, r);
                break;
              case 3:
                var f = t.updateQueue;
                if (f !== null) {
                  if (((n = null), t.child !== null))
                    switch (t.child.tag) {
                      case 5:
                        n = t.child.stateNode;
                        break;
                      case 1:
                        n = t.child.stateNode;
                    }
                  ga(t, f, n);
                }
                break;
              case 5:
                var h = t.stateNode;
                if (n === null && t.flags & 4) {
                  n = h;
                  var m = t.memoizedProps;
                  switch (t.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      m.autoFocus && n.focus();
                      break;
                    case "img":
                      m.src && (n.src = m.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (t.memoizedState === null) {
                  var C = t.alternate;
                  if (C !== null) {
                    var j = C.memoizedState;
                    if (j !== null) {
                      var z = j.dehydrated;
                      z !== null && hr(z);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(u(163));
            }
          Ve || (t.flags & 512 && Gi(t));
        } catch (L) {
          Ce(t, t.return, L);
        }
      }
      if (t === e) {
        H = null;
        break;
      }
      if (((n = t.sibling), n !== null)) {
        ((n.return = t.return), (H = n));
        break;
      }
      H = t.return;
    }
  }
  function gc(e) {
    for (; H !== null; ) {
      var t = H;
      if (t === e) {
        H = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        ((n.return = t.return), (H = n));
        break;
      }
      H = t.return;
    }
  }
  function wc(e) {
    for (; H !== null; ) {
      var t = H;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              Wl(4, t);
            } catch (m) {
              Ce(t, n, m);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == "function") {
              var o = t.return;
              try {
                r.componentDidMount();
              } catch (m) {
                Ce(t, o, m);
              }
            }
            var s = t.return;
            try {
              Gi(t);
            } catch (m) {
              Ce(t, s, m);
            }
            break;
          case 5:
            var f = t.return;
            try {
              Gi(t);
            } catch (m) {
              Ce(t, f, m);
            }
        }
      } catch (m) {
        Ce(t, t.return, m);
      }
      if (t === e) {
        H = null;
        break;
      }
      var h = t.sibling;
      if (h !== null) {
        ((h.return = t.return), (H = h));
        break;
      }
      H = t.return;
    }
  }
  var zp = Math.ceil,
    Ql = A.ReactCurrentDispatcher,
    eu = A.ReactCurrentOwner,
    ht = A.ReactCurrentBatchConfig,
    ie = 0,
    De = null,
    Te = null,
    Ie = 0,
    st = 0,
    Kn = qt(0),
    ze = 0,
    Ar = null,
    vn = 0,
    Kl = 0,
    tu = 0,
    Ir = null,
    Ze = null,
    nu = 0,
    qn = 1 / 0,
    At = null,
    ql = !1,
    ru = null,
    bt = null,
    Jl = !1,
    en = null,
    Xl = 0,
    Mr = 0,
    lu = null,
    Yl = -1,
    Gl = 0;
  function Je() {
    return (ie & 6) !== 0 ? Re() : Yl !== -1 ? Yl : (Yl = Re());
  }
  function tn(e) {
    return (e.mode & 1) === 0
      ? 1
      : (ie & 2) !== 0 && Ie !== 0
        ? Ie & -Ie
        : vp.transition !== null
          ? (Gl === 0 && (Gl = ds()), Gl)
          : ((e = fe),
            e !== 0 ||
              ((e = window.event), (e = e === void 0 ? 16 : Es(e.type))),
            e);
  }
  function xt(e, t, n, r) {
    if (50 < Mr) throw ((Mr = 0), (lu = null), Error(u(185)));
    (ar(e, n, r),
      ((ie & 2) === 0 || e !== De) &&
        (e === De && ((ie & 2) === 0 && (Kl |= n), ze === 4 && nn(e, Ie)),
        be(e, r),
        n === 1 &&
          ie === 0 &&
          (t.mode & 1) === 0 &&
          ((qn = Re() + 500), Rl && Xt())));
  }
  function be(e, t) {
    var n = e.callbackNode;
    vd(e, t);
    var r = il(e, e === De ? Ie : 0);
    if (r === 0)
      (n !== null && as(n), (e.callbackNode = null), (e.callbackPriority = 0));
    else if (((t = r & -r), e.callbackPriority !== t)) {
      if ((n != null && as(n), t === 1))
        (e.tag === 0 ? mp(Ec.bind(null, e)) : ia(Ec.bind(null, e)),
          fp(function () {
            (ie & 6) === 0 && Xt();
          }),
          (n = null));
      else {
        switch (ps(r)) {
          case 1:
            n = Ao;
            break;
          case 4:
            n = cs;
            break;
          case 16:
            n = nl;
            break;
          case 536870912:
            n = fs;
            break;
          default:
            n = nl;
        }
        n = Tc(n, Sc.bind(null, e));
      }
      ((e.callbackPriority = t), (e.callbackNode = n));
    }
  }
  function Sc(e, t) {
    if (((Yl = -1), (Gl = 0), (ie & 6) !== 0)) throw Error(u(327));
    var n = e.callbackNode;
    if (Jn() && e.callbackNode !== n) return null;
    var r = il(e, e === De ? Ie : 0);
    if (r === 0) return null;
    if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = Zl(e, r);
    else {
      t = r;
      var o = ie;
      ie |= 2;
      var s = kc();
      (De !== e || Ie !== t) && ((At = null), (qn = Re() + 500), gn(e, t));
      do
        try {
          Up();
          break;
        } catch (h) {
          xc(e, h);
        }
      while (!0);
      (xi(),
        (Ql.current = s),
        (ie = o),
        Te !== null ? (t = 0) : ((De = null), (Ie = 0), (t = ze)));
    }
    if (t !== 0) {
      if (
        (t === 2 && ((o = Io(e)), o !== 0 && ((r = o), (t = ou(e, o)))),
        t === 1)
      )
        throw ((n = Ar), gn(e, 0), nn(e, r), be(e, Re()), n);
      if (t === 6) nn(e, r);
      else {
        if (
          ((o = e.current.alternate),
          (r & 30) === 0 &&
            !Fp(o) &&
            ((t = Zl(e, r)),
            t === 2 && ((s = Io(e)), s !== 0 && ((r = s), (t = ou(e, s)))),
            t === 1))
        )
          throw ((n = Ar), gn(e, 0), nn(e, r), be(e, Re()), n);
        switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
          case 0:
          case 1:
            throw Error(u(345));
          case 2:
            wn(e, Ze, At);
            break;
          case 3:
            if (
              (nn(e, r),
              (r & 130023424) === r && ((t = nu + 500 - Re()), 10 < t))
            ) {
              if (il(e, 0) !== 0) break;
              if (((o = e.suspendedLanes), (o & r) !== r)) {
                (Je(), (e.pingedLanes |= e.suspendedLanes & o));
                break;
              }
              e.timeoutHandle = fi(wn.bind(null, e, Ze, At), t);
              break;
            }
            wn(e, Ze, At);
            break;
          case 4:
            if ((nn(e, r), (r & 4194240) === r)) break;
            for (t = e.eventTimes, o = -1; 0 < r; ) {
              var f = 31 - vt(r);
              ((s = 1 << f), (f = t[f]), f > o && (o = f), (r &= ~s));
            }
            if (
              ((r = o),
              (r = Re() - r),
              (r =
                (120 > r
                  ? 120
                  : 480 > r
                    ? 480
                    : 1080 > r
                      ? 1080
                      : 1920 > r
                        ? 1920
                        : 3e3 > r
                          ? 3e3
                          : 4320 > r
                            ? 4320
                            : 1960 * zp(r / 1960)) - r),
              10 < r)
            ) {
              e.timeoutHandle = fi(wn.bind(null, e, Ze, At), r);
              break;
            }
            wn(e, Ze, At);
            break;
          case 5:
            wn(e, Ze, At);
            break;
          default:
            throw Error(u(329));
        }
      }
    }
    return (be(e, Re()), e.callbackNode === n ? Sc.bind(null, e) : null);
  }
  function ou(e, t) {
    var n = Ir;
    return (
      e.current.memoizedState.isDehydrated && (gn(e, t).flags |= 256),
      (e = Zl(e, t)),
      e !== 2 && ((t = Ze), (Ze = n), t !== null && iu(t)),
      e
    );
  }
  function iu(e) {
    Ze === null ? (Ze = e) : Ze.push.apply(Ze, e);
  }
  function Fp(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && ((n = n.stores), n !== null))
          for (var r = 0; r < n.length; r++) {
            var o = n[r],
              s = o.getSnapshot;
            o = o.value;
            try {
              if (!yt(s(), o)) return !1;
            } catch {
              return !1;
            }
          }
      }
      if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
        ((n.return = t), (t = n));
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function nn(e, t) {
    for (
      t &= ~tu,
        t &= ~Kl,
        e.suspendedLanes |= t,
        e.pingedLanes &= ~t,
        e = e.expirationTimes;
      0 < t;

    ) {
      var n = 31 - vt(t),
        r = 1 << n;
      ((e[n] = -1), (t &= ~r));
    }
  }
  function Ec(e) {
    if ((ie & 6) !== 0) throw Error(u(327));
    Jn();
    var t = il(e, 0);
    if ((t & 1) === 0) return (be(e, Re()), null);
    var n = Zl(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = Io(e);
      r !== 0 && ((t = r), (n = ou(e, r)));
    }
    if (n === 1) throw ((n = Ar), gn(e, 0), nn(e, t), be(e, Re()), n);
    if (n === 6) throw Error(u(345));
    return (
      (e.finishedWork = e.current.alternate),
      (e.finishedLanes = t),
      wn(e, Ze, At),
      be(e, Re()),
      null
    );
  }
  function uu(e, t) {
    var n = ie;
    ie |= 1;
    try {
      return e(t);
    } finally {
      ((ie = n), ie === 0 && ((qn = Re() + 500), Rl && Xt()));
    }
  }
  function yn(e) {
    en !== null && en.tag === 0 && (ie & 6) === 0 && Jn();
    var t = ie;
    ie |= 1;
    var n = ht.transition,
      r = fe;
    try {
      if (((ht.transition = null), (fe = 1), e)) return e();
    } finally {
      ((fe = r), (ht.transition = n), (ie = t), (ie & 6) === 0 && Xt());
    }
  }
  function su() {
    ((st = Kn.current), ge(Kn));
  }
  function gn(e, t) {
    ((e.finishedWork = null), (e.finishedLanes = 0));
    var n = e.timeoutHandle;
    if ((n !== -1 && ((e.timeoutHandle = -1), cp(n)), Te !== null))
      for (n = Te.return; n !== null; ) {
        var r = n;
        switch ((yi(r), r.tag)) {
          case 1:
            ((r = r.type.childContextTypes), r != null && kl());
            break;
          case 3:
            (Vn(), ge(Xe), ge(Be), Oi());
            break;
          case 5:
            Ni(r);
            break;
          case 4:
            Vn();
            break;
          case 13:
            ge(Ee);
            break;
          case 19:
            ge(Ee);
            break;
          case 10:
            ki(r.type._context);
            break;
          case 22:
          case 23:
            su();
        }
        n = n.return;
      }
    if (
      ((De = e),
      (Te = e = rn(e.current, null)),
      (Ie = st = t),
      (ze = 0),
      (Ar = null),
      (tu = Kl = vn = 0),
      (Ze = Ir = null),
      pn !== null)
    ) {
      for (t = 0; t < pn.length; t++)
        if (((n = pn[t]), (r = n.interleaved), r !== null)) {
          n.interleaved = null;
          var o = r.next,
            s = n.pending;
          if (s !== null) {
            var f = s.next;
            ((s.next = o), (r.next = f));
          }
          n.pending = r;
        }
      pn = null;
    }
    return e;
  }
  function xc(e, t) {
    do {
      var n = Te;
      try {
        if ((xi(), (Dl.current = Ml), Ul)) {
          for (var r = xe.memoizedState; r !== null; ) {
            var o = r.queue;
            (o !== null && (o.pending = null), (r = r.next));
          }
          Ul = !1;
        }
        if (
          ((mn = 0),
          (Fe = je = xe = null),
          (Lr = !1),
          (jr = 0),
          (eu.current = null),
          n === null || n.return === null)
        ) {
          ((ze = 1), (Ar = t), (Te = null));
          break;
        }
        e: {
          var s = e,
            f = n.return,
            h = n,
            m = t;
          if (
            ((t = Ie),
            (h.flags |= 32768),
            m !== null && typeof m == "object" && typeof m.then == "function")
          ) {
            var C = m,
              j = h,
              z = j.tag;
            if ((j.mode & 1) === 0 && (z === 0 || z === 11 || z === 15)) {
              var L = j.alternate;
              L
                ? ((j.updateQueue = L.updateQueue),
                  (j.memoizedState = L.memoizedState),
                  (j.lanes = L.lanes))
                : ((j.updateQueue = null), (j.memoizedState = null));
            }
            var M = qa(f);
            if (M !== null) {
              ((M.flags &= -257),
                Ja(M, f, h, s, t),
                M.mode & 1 && Ka(s, C, t),
                (t = M),
                (m = C));
              var V = t.updateQueue;
              if (V === null) {
                var W = new Set();
                (W.add(m), (t.updateQueue = W));
              } else V.add(m);
              break e;
            } else {
              if ((t & 1) === 0) {
                (Ka(s, C, t), au());
                break e;
              }
              m = Error(u(426));
            }
          } else if (Se && h.mode & 1) {
            var Pe = qa(f);
            if (Pe !== null) {
              ((Pe.flags & 65536) === 0 && (Pe.flags |= 256),
                Ja(Pe, f, h, s, t),
                Si(Wn(m, h)));
              break e;
            }
          }
          ((s = m = Wn(m, h)),
            ze !== 4 && (ze = 2),
            Ir === null ? (Ir = [s]) : Ir.push(s),
            (s = f));
          do {
            switch (s.tag) {
              case 3:
                ((s.flags |= 65536), (t &= -t), (s.lanes |= t));
                var E = Wa(s, m, t);
                ya(s, E);
                break e;
              case 1:
                h = m;
                var y = s.type,
                  k = s.stateNode;
                if (
                  (s.flags & 128) === 0 &&
                  (typeof y.getDerivedStateFromError == "function" ||
                    (k !== null &&
                      typeof k.componentDidCatch == "function" &&
                      (bt === null || !bt.has(k))))
                ) {
                  ((s.flags |= 65536), (t &= -t), (s.lanes |= t));
                  var F = Qa(s, h, t);
                  ya(s, F);
                  break e;
                }
            }
            s = s.return;
          } while (s !== null);
        }
        Rc(n);
      } catch (Q) {
        ((t = Q), Te === n && n !== null && (Te = n = n.return));
        continue;
      }
      break;
    } while (!0);
  }
  function kc() {
    var e = Ql.current;
    return ((Ql.current = Ml), e === null ? Ml : e);
  }
  function au() {
    ((ze === 0 || ze === 3 || ze === 2) && (ze = 4),
      De === null ||
        ((vn & 268435455) === 0 && (Kl & 268435455) === 0) ||
        nn(De, Ie));
  }
  function Zl(e, t) {
    var n = ie;
    ie |= 2;
    var r = kc();
    (De !== e || Ie !== t) && ((At = null), gn(e, t));
    do
      try {
        Dp();
        break;
      } catch (o) {
        xc(e, o);
      }
    while (!0);
    if ((xi(), (ie = n), (Ql.current = r), Te !== null)) throw Error(u(261));
    return ((De = null), (Ie = 0), ze);
  }
  function Dp() {
    for (; Te !== null; ) Cc(Te);
  }
  function Up() {
    for (; Te !== null && !ud(); ) Cc(Te);
  }
  function Cc(e) {
    var t = Nc(e.alternate, e, st);
    ((e.memoizedProps = e.pendingProps),
      t === null ? Rc(e) : (Te = t),
      (eu.current = null));
  }
  function Rc(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (((e = t.return), (t.flags & 32768) === 0)) {
        if (((n = Np(n, t, st)), n !== null)) {
          Te = n;
          return;
        }
      } else {
        if (((n = Tp(n, t)), n !== null)) {
          ((n.flags &= 32767), (Te = n));
          return;
        }
        if (e !== null)
          ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
        else {
          ((ze = 6), (Te = null));
          return;
        }
      }
      if (((t = t.sibling), t !== null)) {
        Te = t;
        return;
      }
      Te = t = e;
    } while (t !== null);
    ze === 0 && (ze = 5);
  }
  function wn(e, t, n) {
    var r = fe,
      o = ht.transition;
    try {
      ((ht.transition = null), (fe = 1), Ap(e, t, n, r));
    } finally {
      ((ht.transition = o), (fe = r));
    }
    return null;
  }
  function Ap(e, t, n, r) {
    do Jn();
    while (en !== null);
    if ((ie & 6) !== 0) throw Error(u(327));
    n = e.finishedWork;
    var o = e.finishedLanes;
    if (n === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
      throw Error(u(177));
    ((e.callbackNode = null), (e.callbackPriority = 0));
    var s = n.lanes | n.childLanes;
    if (
      (yd(e, s),
      e === De && ((Te = De = null), (Ie = 0)),
      ((n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0) ||
        Jl ||
        ((Jl = !0),
        Tc(nl, function () {
          return (Jn(), null);
        })),
      (s = (n.flags & 15990) !== 0),
      (n.subtreeFlags & 15990) !== 0 || s)
    ) {
      ((s = ht.transition), (ht.transition = null));
      var f = fe;
      fe = 1;
      var h = ie;
      ((ie |= 4),
        (eu.current = null),
        Lp(e, n),
        mc(n, e),
        rp(ai),
        (al = !!si),
        (ai = si = null),
        (e.current = n),
        jp(n),
        sd(),
        (ie = h),
        (fe = f),
        (ht.transition = s));
    } else e.current = n;
    if (
      (Jl && ((Jl = !1), (en = e), (Xl = o)),
      (s = e.pendingLanes),
      s === 0 && (bt = null),
      fd(n.stateNode),
      be(e, Re()),
      t !== null)
    )
      for (r = e.onRecoverableError, n = 0; n < t.length; n++)
        ((o = t[n]), r(o.value, { componentStack: o.stack, digest: o.digest }));
    if (ql) throw ((ql = !1), (e = ru), (ru = null), e);
    return (
      (Xl & 1) !== 0 && e.tag !== 0 && Jn(),
      (s = e.pendingLanes),
      (s & 1) !== 0 ? (e === lu ? Mr++ : ((Mr = 0), (lu = e))) : (Mr = 0),
      Xt(),
      null
    );
  }
  function Jn() {
    if (en !== null) {
      var e = ps(Xl),
        t = ht.transition,
        n = fe;
      try {
        if (((ht.transition = null), (fe = 16 > e ? 16 : e), en === null))
          var r = !1;
        else {
          if (((e = en), (en = null), (Xl = 0), (ie & 6) !== 0))
            throw Error(u(331));
          var o = ie;
          for (ie |= 4, H = e.current; H !== null; ) {
            var s = H,
              f = s.child;
            if ((H.flags & 16) !== 0) {
              var h = s.deletions;
              if (h !== null) {
                for (var m = 0; m < h.length; m++) {
                  var C = h[m];
                  for (H = C; H !== null; ) {
                    var j = H;
                    switch (j.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Ur(8, j, s);
                    }
                    var z = j.child;
                    if (z !== null) ((z.return = j), (H = z));
                    else
                      for (; H !== null; ) {
                        j = H;
                        var L = j.sibling,
                          M = j.return;
                        if ((cc(j), j === C)) {
                          H = null;
                          break;
                        }
                        if (L !== null) {
                          ((L.return = M), (H = L));
                          break;
                        }
                        H = M;
                      }
                  }
                }
                var V = s.alternate;
                if (V !== null) {
                  var W = V.child;
                  if (W !== null) {
                    V.child = null;
                    do {
                      var Pe = W.sibling;
                      ((W.sibling = null), (W = Pe));
                    } while (W !== null);
                  }
                }
                H = s;
              }
            }
            if ((s.subtreeFlags & 2064) !== 0 && f !== null)
              ((f.return = s), (H = f));
            else
              e: for (; H !== null; ) {
                if (((s = H), (s.flags & 2048) !== 0))
                  switch (s.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ur(9, s, s.return);
                  }
                var E = s.sibling;
                if (E !== null) {
                  ((E.return = s.return), (H = E));
                  break e;
                }
                H = s.return;
              }
          }
          var y = e.current;
          for (H = y; H !== null; ) {
            f = H;
            var k = f.child;
            if ((f.subtreeFlags & 2064) !== 0 && k !== null)
              ((k.return = f), (H = k));
            else
              e: for (f = y; H !== null; ) {
                if (((h = H), (h.flags & 2048) !== 0))
                  try {
                    switch (h.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Wl(9, h);
                    }
                  } catch (Q) {
                    Ce(h, h.return, Q);
                  }
                if (h === f) {
                  H = null;
                  break e;
                }
                var F = h.sibling;
                if (F !== null) {
                  ((F.return = h.return), (H = F));
                  break e;
                }
                H = h.return;
              }
          }
          if (
            ((ie = o),
            Xt(),
            Ct && typeof Ct.onPostCommitFiberRoot == "function")
          )
            try {
              Ct.onPostCommitFiberRoot(rl, e);
            } catch {}
          r = !0;
        }
        return r;
      } finally {
        ((fe = n), (ht.transition = t));
      }
    }
    return !1;
  }
  function Pc(e, t, n) {
    ((t = Wn(n, t)),
      (t = Wa(e, t, 1)),
      (e = Gt(e, t, 1)),
      (t = Je()),
      e !== null && (ar(e, 1, t), be(e, t)));
  }
  function Ce(e, t, n) {
    if (e.tag === 3) Pc(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Pc(t, e, n);
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof r.componentDidCatch == "function" &&
              (bt === null || !bt.has(r)))
          ) {
            ((e = Wn(n, e)),
              (e = Qa(t, e, 1)),
              (t = Gt(t, e, 1)),
              (e = Je()),
              t !== null && (ar(t, 1, e), be(t, e)));
            break;
          }
        }
        t = t.return;
      }
  }
  function Ip(e, t, n) {
    var r = e.pingCache;
    (r !== null && r.delete(t),
      (t = Je()),
      (e.pingedLanes |= e.suspendedLanes & n),
      De === e &&
        (Ie & n) === n &&
        (ze === 4 || (ze === 3 && (Ie & 130023424) === Ie && 500 > Re() - nu)
          ? gn(e, 0)
          : (tu |= n)),
      be(e, t));
  }
  function _c(e, t) {
    t === 0 &&
      ((e.mode & 1) === 0
        ? (t = 1)
        : ((t = ol), (ol <<= 1), (ol & 130023424) === 0 && (ol = 4194304)));
    var n = Je();
    ((e = Ft(e, t)), e !== null && (ar(e, t, n), be(e, n)));
  }
  function Mp(e) {
    var t = e.memoizedState,
      n = 0;
    (t !== null && (n = t.retryLane), _c(e, n));
  }
  function Bp(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode,
          o = e.memoizedState;
        o !== null && (n = o.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      default:
        throw Error(u(314));
    }
    (r !== null && r.delete(t), _c(e, n));
  }
  var Nc;
  Nc = function (e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps || Xe.current) Ge = !0;
      else {
        if ((e.lanes & n) === 0 && (t.flags & 128) === 0)
          return ((Ge = !1), _p(e, t, n));
        Ge = (e.flags & 131072) !== 0;
      }
    else ((Ge = !1), Se && (t.flags & 1048576) !== 0 && ua(t, _l, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 2:
        var r = t.type;
        (Hl(e, t), (e = t.pendingProps));
        var o = Un(t, Be.current);
        (Hn(t, n), (o = zi(null, t, r, e, o, n)));
        var s = Fi();
        return (
          (t.flags |= 1),
          typeof o == "object" &&
          o !== null &&
          typeof o.render == "function" &&
          o.$$typeof === void 0
            ? ((t.tag = 1),
              (t.memoizedState = null),
              (t.updateQueue = null),
              Ye(r) ? ((s = !0), Cl(t)) : (s = !1),
              (t.memoizedState =
                o.state !== null && o.state !== void 0 ? o.state : null),
              Pi(t),
              (o.updater = Bl),
              (t.stateNode = o),
              (o._reactInternals = t),
              Bi(t, r, e, n),
              (t = Wi(null, t, r, !0, s, n)))
            : ((t.tag = 0), Se && s && vi(t), qe(null, t, o, n), (t = t.child)),
          t
        );
      case 16:
        r = t.elementType;
        e: {
          switch (
            (Hl(e, t),
            (e = t.pendingProps),
            (o = r._init),
            (r = o(r._payload)),
            (t.type = r),
            (o = t.tag = Hp(r)),
            (e = wt(r, e)),
            o)
          ) {
            case 0:
              t = Vi(null, t, r, e, n);
              break e;
            case 1:
              t = ec(null, t, r, e, n);
              break e;
            case 11:
              t = Xa(null, t, r, e, n);
              break e;
            case 14:
              t = Ya(null, t, r, wt(r.type, e), n);
              break e;
          }
          throw Error(u(306, r, ""));
        }
        return t;
      case 0:
        return (
          (r = t.type),
          (o = t.pendingProps),
          (o = t.elementType === r ? o : wt(r, o)),
          Vi(e, t, r, o, n)
        );
      case 1:
        return (
          (r = t.type),
          (o = t.pendingProps),
          (o = t.elementType === r ? o : wt(r, o)),
          ec(e, t, r, o, n)
        );
      case 3:
        e: {
          if ((tc(t), e === null)) throw Error(u(387));
          ((r = t.pendingProps),
            (s = t.memoizedState),
            (o = s.element),
            va(e, t),
            zl(t, r, null, n));
          var f = t.memoizedState;
          if (((r = f.element), s.isDehydrated))
            if (
              ((s = {
                element: r,
                isDehydrated: !1,
                cache: f.cache,
                pendingSuspenseBoundaries: f.pendingSuspenseBoundaries,
                transitions: f.transitions,
              }),
              (t.updateQueue.baseState = s),
              (t.memoizedState = s),
              t.flags & 256)
            ) {
              ((o = Wn(Error(u(423)), t)), (t = nc(e, t, r, n, o)));
              break e;
            } else if (r !== o) {
              ((o = Wn(Error(u(424)), t)), (t = nc(e, t, r, n, o)));
              break e;
            } else
              for (
                ut = Kt(t.stateNode.containerInfo.firstChild),
                  it = t,
                  Se = !0,
                  gt = null,
                  n = ha(t, null, r, n),
                  t.child = n;
                n;

              )
                ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
          else {
            if ((Mn(), r === o)) {
              t = Ut(e, t, n);
              break e;
            }
            qe(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return (
          wa(t),
          e === null && wi(t),
          (r = t.type),
          (o = t.pendingProps),
          (s = e !== null ? e.memoizedProps : null),
          (f = o.children),
          ci(r, o) ? (f = null) : s !== null && ci(r, s) && (t.flags |= 32),
          ba(e, t),
          qe(e, t, f, n),
          t.child
        );
      case 6:
        return (e === null && wi(t), null);
      case 13:
        return rc(e, t, n);
      case 4:
        return (
          _i(t, t.stateNode.containerInfo),
          (r = t.pendingProps),
          e === null ? (t.child = Bn(t, null, r, n)) : qe(e, t, r, n),
          t.child
        );
      case 11:
        return (
          (r = t.type),
          (o = t.pendingProps),
          (o = t.elementType === r ? o : wt(r, o)),
          Xa(e, t, r, o, n)
        );
      case 7:
        return (qe(e, t, t.pendingProps, n), t.child);
      case 8:
        return (qe(e, t, t.pendingProps.children, n), t.child);
      case 12:
        return (qe(e, t, t.pendingProps.children, n), t.child);
      case 10:
        e: {
          if (
            ((r = t.type._context),
            (o = t.pendingProps),
            (s = t.memoizedProps),
            (f = o.value),
            he(Ol, r._currentValue),
            (r._currentValue = f),
            s !== null)
          )
            if (yt(s.value, f)) {
              if (s.children === o.children && !Xe.current) {
                t = Ut(e, t, n);
                break e;
              }
            } else
              for (s = t.child, s !== null && (s.return = t); s !== null; ) {
                var h = s.dependencies;
                if (h !== null) {
                  f = s.child;
                  for (var m = h.firstContext; m !== null; ) {
                    if (m.context === r) {
                      if (s.tag === 1) {
                        ((m = Dt(-1, n & -n)), (m.tag = 2));
                        var C = s.updateQueue;
                        if (C !== null) {
                          C = C.shared;
                          var j = C.pending;
                          (j === null
                            ? (m.next = m)
                            : ((m.next = j.next), (j.next = m)),
                            (C.pending = m));
                        }
                      }
                      ((s.lanes |= n),
                        (m = s.alternate),
                        m !== null && (m.lanes |= n),
                        Ci(s.return, n, t),
                        (h.lanes |= n));
                      break;
                    }
                    m = m.next;
                  }
                } else if (s.tag === 10) f = s.type === t.type ? null : s.child;
                else if (s.tag === 18) {
                  if (((f = s.return), f === null)) throw Error(u(341));
                  ((f.lanes |= n),
                    (h = f.alternate),
                    h !== null && (h.lanes |= n),
                    Ci(f, n, t),
                    (f = s.sibling));
                } else f = s.child;
                if (f !== null) f.return = s;
                else
                  for (f = s; f !== null; ) {
                    if (f === t) {
                      f = null;
                      break;
                    }
                    if (((s = f.sibling), s !== null)) {
                      ((s.return = f.return), (f = s));
                      break;
                    }
                    f = f.return;
                  }
                s = f;
              }
          (qe(e, t, o.children, n), (t = t.child));
        }
        return t;
      case 9:
        return (
          (o = t.type),
          (r = t.pendingProps.children),
          Hn(t, n),
          (o = dt(o)),
          (r = r(o)),
          (t.flags |= 1),
          qe(e, t, r, n),
          t.child
        );
      case 14:
        return (
          (r = t.type),
          (o = wt(r, t.pendingProps)),
          (o = wt(r.type, o)),
          Ya(e, t, r, o, n)
        );
      case 15:
        return Ga(e, t, t.type, t.pendingProps, n);
      case 17:
        return (
          (r = t.type),
          (o = t.pendingProps),
          (o = t.elementType === r ? o : wt(r, o)),
          Hl(e, t),
          (t.tag = 1),
          Ye(r) ? ((e = !0), Cl(t)) : (e = !1),
          Hn(t, n),
          Ha(t, r, o),
          Bi(t, r, o, n),
          Wi(null, t, r, !0, e, n)
        );
      case 19:
        return oc(e, t, n);
      case 22:
        return Za(e, t, n);
    }
    throw Error(u(156, t.tag));
  };
  function Tc(e, t) {
    return ss(e, t);
  }
  function $p(e, t, n, r) {
    ((this.tag = e),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = r),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function mt(e, t, n, r) {
    return new $p(e, t, n, r);
  }
  function cu(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function Hp(e) {
    if (typeof e == "function") return cu(e) ? 1 : 0;
    if (e != null) {
      if (((e = e.$$typeof), e === Ke)) return 11;
      if (e === rt) return 14;
    }
    return 2;
  }
  function rn(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = mt(e.tag, t, e.key, e.mode)),
          (n.elementType = e.elementType),
          (n.type = e.type),
          (n.stateNode = e.stateNode),
          (n.alternate = e),
          (e.alternate = n))
        : ((n.pendingProps = t),
          (n.type = e.type),
          (n.flags = 0),
          (n.subtreeFlags = 0),
          (n.deletions = null)),
      (n.flags = e.flags & 14680064),
      (n.childLanes = e.childLanes),
      (n.lanes = e.lanes),
      (n.child = e.child),
      (n.memoizedProps = e.memoizedProps),
      (n.memoizedState = e.memoizedState),
      (n.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (n.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (n.sibling = e.sibling),
      (n.index = e.index),
      (n.ref = e.ref),
      n
    );
  }
  function bl(e, t, n, r, o, s) {
    var f = 2;
    if (((r = e), typeof e == "function")) cu(e) && (f = 1);
    else if (typeof e == "string") f = 5;
    else
      e: switch (e) {
        case ae:
          return Sn(n.children, o, s, t);
        case Ne:
          ((f = 8), (o |= 8));
          break;
        case Qe:
          return (
            (e = mt(12, n, t, o | 2)),
            (e.elementType = Qe),
            (e.lanes = s),
            e
          );
        case Oe:
          return (
            (e = mt(13, n, t, o)),
            (e.elementType = Oe),
            (e.lanes = s),
            e
          );
        case Le:
          return (
            (e = mt(19, n, t, o)),
            (e.elementType = Le),
            (e.lanes = s),
            e
          );
        case ve:
          return eo(n, o, s, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case Me:
                f = 10;
                break e;
              case at:
                f = 9;
                break e;
              case Ke:
                f = 11;
                break e;
              case rt:
                f = 14;
                break e;
              case me:
                ((f = 16), (r = null));
                break e;
            }
          throw Error(u(130, e == null ? e : typeof e, ""));
      }
    return (
      (t = mt(f, n, t, o)),
      (t.elementType = e),
      (t.type = r),
      (t.lanes = s),
      t
    );
  }
  function Sn(e, t, n, r) {
    return ((e = mt(7, e, r, t)), (e.lanes = n), e);
  }
  function eo(e, t, n, r) {
    return (
      (e = mt(22, e, r, t)),
      (e.elementType = ve),
      (e.lanes = n),
      (e.stateNode = { isHidden: !1 }),
      e
    );
  }
  function fu(e, t, n) {
    return ((e = mt(6, e, null, t)), (e.lanes = n), e);
  }
  function du(e, t, n) {
    return (
      (t = mt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  function Vp(e, t, n, r, o) {
    ((this.tag = t),
      (this.containerInfo = e),
      (this.finishedWork =
        this.pingCache =
        this.current =
        this.pendingChildren =
          null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = Mo(0)),
      (this.expirationTimes = Mo(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Mo(0)),
      (this.identifierPrefix = r),
      (this.onRecoverableError = o),
      (this.mutableSourceEagerHydrationData = null));
  }
  function pu(e, t, n, r, o, s, f, h, m) {
    return (
      (e = new Vp(e, t, n, h, m)),
      t === 1 ? ((t = 1), s === !0 && (t |= 8)) : (t = 0),
      (s = mt(3, null, null, t)),
      (e.current = s),
      (s.stateNode = e),
      (s.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      Pi(s),
      e
    );
  }
  function Wp(e, t, n) {
    var r =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: de,
      key: r == null ? null : "" + r,
      children: e,
      containerInfo: t,
      implementation: n,
    };
  }
  function Oc(e) {
    if (!e) return Jt;
    e = e._reactInternals;
    e: {
      if (sn(e) !== e || e.tag !== 1) throw Error(u(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (Ye(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(u(171));
    }
    if (e.tag === 1) {
      var n = e.type;
      if (Ye(n)) return la(e, n, t);
    }
    return t;
  }
  function Lc(e, t, n, r, o, s, f, h, m) {
    return (
      (e = pu(n, r, !0, e, o, s, f, h, m)),
      (e.context = Oc(null)),
      (n = e.current),
      (r = Je()),
      (o = tn(n)),
      (s = Dt(r, o)),
      (s.callback = t ?? null),
      Gt(n, s, o),
      (e.current.lanes = o),
      ar(e, o, r),
      be(e, r),
      e
    );
  }
  function to(e, t, n, r) {
    var o = t.current,
      s = Je(),
      f = tn(o);
    return (
      (n = Oc(n)),
      t.context === null ? (t.context = n) : (t.pendingContext = n),
      (t = Dt(s, f)),
      (t.payload = { element: e }),
      (r = r === void 0 ? null : r),
      r !== null && (t.callback = r),
      (e = Gt(o, t, f)),
      e !== null && (xt(e, o, f, s), jl(e, o, f)),
      f
    );
  }
  function no(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function jc(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function hu(e, t) {
    (jc(e, t), (e = e.alternate) && jc(e, t));
  }
  function Qp() {
    return null;
  }
  var zc =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          console.error(e);
        };
  function mu(e) {
    this._internalRoot = e;
  }
  ((ro.prototype.render = mu.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(u(409));
      to(e, t, null, null);
    }),
    (ro.prototype.unmount = mu.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (yn(function () {
            to(null, e, null, null);
          }),
            (t[Ot] = null));
        }
      }));
  function ro(e) {
    this._internalRoot = e;
  }
  ro.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = vs();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Vt.length && t !== 0 && t < Vt[n].priority; n++);
      (Vt.splice(n, 0, e), n === 0 && ws(e));
    }
  };
  function vu(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function lo(e) {
    return !(
      !e ||
      (e.nodeType !== 1 &&
        e.nodeType !== 9 &&
        e.nodeType !== 11 &&
        (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
    );
  }
  function Fc() {}
  function Kp(e, t, n, r, o) {
    if (o) {
      if (typeof r == "function") {
        var s = r;
        r = function () {
          var C = no(f);
          s.call(C);
        };
      }
      var f = Lc(t, r, e, 0, null, !1, !1, "", Fc);
      return (
        (e._reactRootContainer = f),
        (e[Ot] = f.current),
        kr(e.nodeType === 8 ? e.parentNode : e),
        yn(),
        f
      );
    }
    for (; (o = e.lastChild); ) e.removeChild(o);
    if (typeof r == "function") {
      var h = r;
      r = function () {
        var C = no(m);
        h.call(C);
      };
    }
    var m = pu(e, 0, !1, null, null, !1, !1, "", Fc);
    return (
      (e._reactRootContainer = m),
      (e[Ot] = m.current),
      kr(e.nodeType === 8 ? e.parentNode : e),
      yn(function () {
        to(t, m, n, r);
      }),
      m
    );
  }
  function oo(e, t, n, r, o) {
    var s = n._reactRootContainer;
    if (s) {
      var f = s;
      if (typeof o == "function") {
        var h = o;
        o = function () {
          var m = no(f);
          h.call(m);
        };
      }
      to(t, f, e, o);
    } else f = Kp(n, t, e, o, r);
    return no(f);
  }
  ((hs = function (e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = sr(t.pendingLanes);
          n !== 0 &&
            (Bo(t, n | 1),
            be(t, Re()),
            (ie & 6) === 0 && ((qn = Re() + 500), Xt()));
        }
        break;
      case 13:
        (yn(function () {
          var r = Ft(e, 1);
          if (r !== null) {
            var o = Je();
            xt(r, e, 1, o);
          }
        }),
          hu(e, 1));
    }
  }),
    ($o = function (e) {
      if (e.tag === 13) {
        var t = Ft(e, 134217728);
        if (t !== null) {
          var n = Je();
          xt(t, e, 134217728, n);
        }
        hu(e, 134217728);
      }
    }),
    (ms = function (e) {
      if (e.tag === 13) {
        var t = tn(e),
          n = Ft(e, t);
        if (n !== null) {
          var r = Je();
          xt(n, e, t, r);
        }
        hu(e, t);
      }
    }),
    (vs = function () {
      return fe;
    }),
    (ys = function (e, t) {
      var n = fe;
      try {
        return ((fe = e), t());
      } finally {
        fe = n;
      }
    }),
    (zo = function (e, t, n) {
      switch (t) {
        case "input":
          if ((Ro(e, n), (t = n.name), n.type === "radio" && t != null)) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll(
                "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
              ),
                t = 0;
              t < n.length;
              t++
            ) {
              var r = n[t];
              if (r !== e && r.form === e.form) {
                var o = xl(r);
                if (!o) throw Error(u(90));
                ($u(r), Ro(r, o));
              }
            }
          }
          break;
        case "textarea":
          Ku(e, n);
          break;
        case "select":
          ((t = n.value), t != null && Cn(e, !!n.multiple, t, !1));
      }
    }),
    (ts = uu),
    (ns = yn));
  var qp = { usingClientEntryPoint: !1, Events: [Pr, Fn, xl, bu, es, uu] },
    Br = {
      findFiberByHostInstance: an,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom",
    },
    Jp = {
      bundleType: Br.bundleType,
      version: Br.version,
      rendererPackageName: Br.rendererPackageName,
      rendererConfig: Br.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: A.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (e) {
        return ((e = is(e)), e === null ? null : e.stateNode);
      },
      findFiberByHostInstance: Br.findFiberByHostInstance || Qp,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var io = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!io.isDisabled && io.supportsFiber)
      try {
        ((rl = io.inject(Jp)), (Ct = io));
      } catch {}
  }
  return (
    (et.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = qp),
    (et.createPortal = function (e, t) {
      var n =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!vu(t)) throw Error(u(200));
      return Wp(e, t, null, n);
    }),
    (et.createRoot = function (e, t) {
      if (!vu(e)) throw Error(u(299));
      var n = !1,
        r = "",
        o = zc;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
          t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
        (t = pu(e, 1, !1, null, null, n, !1, r, o)),
        (e[Ot] = t.current),
        kr(e.nodeType === 8 ? e.parentNode : e),
        new mu(t)
      );
    }),
    (et.findDOMNode = function (e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == "function"
          ? Error(u(188))
          : ((e = Object.keys(e).join(",")), Error(u(268, e)));
      return ((e = is(t)), (e = e === null ? null : e.stateNode), e);
    }),
    (et.flushSync = function (e) {
      return yn(e);
    }),
    (et.hydrate = function (e, t, n) {
      if (!lo(t)) throw Error(u(200));
      return oo(null, e, t, !0, n);
    }),
    (et.hydrateRoot = function (e, t, n) {
      if (!vu(e)) throw Error(u(405));
      var r = (n != null && n.hydratedSources) || null,
        o = !1,
        s = "",
        f = zc;
      if (
        (n != null &&
          (n.unstable_strictMode === !0 && (o = !0),
          n.identifierPrefix !== void 0 && (s = n.identifierPrefix),
          n.onRecoverableError !== void 0 && (f = n.onRecoverableError)),
        (t = Lc(t, null, e, 1, n ?? null, o, !1, s, f)),
        (e[Ot] = t.current),
        kr(e),
        r)
      )
        for (e = 0; e < r.length; e++)
          ((n = r[e]),
            (o = n._getVersion),
            (o = o(n._source)),
            t.mutableSourceEagerHydrationData == null
              ? (t.mutableSourceEagerHydrationData = [n, o])
              : t.mutableSourceEagerHydrationData.push(n, o));
      return new ro(t);
    }),
    (et.render = function (e, t, n) {
      if (!lo(t)) throw Error(u(200));
      return oo(null, e, t, !1, n);
    }),
    (et.unmountComponentAtNode = function (e) {
      if (!lo(e)) throw Error(u(40));
      return e._reactRootContainer
        ? (yn(function () {
            oo(null, null, e, !1, function () {
              ((e._reactRootContainer = null), (e[Ot] = null));
            });
          }),
          !0)
        : !1;
    }),
    (et.unstable_batchedUpdates = uu),
    (et.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
      if (!lo(n)) throw Error(u(200));
      if (e == null || e._reactInternals === void 0) throw Error(u(38));
      return oo(e, t, n, !1, r);
    }),
    (et.version = "18.3.1-next-f1338f8080-20240426"),
    et
  );
}
var Hc;
function yf() {
  if (Hc) return wu.exports;
  Hc = 1;
  function l() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (i) {
        console.error(i);
      }
  }
  return (l(), (wu.exports = rh()), wu.exports);
}
var Vc;
function lh() {
  if (Vc) return uo;
  Vc = 1;
  var l = yf();
  return ((uo.createRoot = l.createRoot), (uo.hydrateRoot = l.hydrateRoot), uo);
}
var oh = lh();
const ih = mf(oh);
yf();
/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Qr() {
  return (
    (Qr = Object.assign
      ? Object.assign.bind()
      : function (l) {
          for (var i = 1; i < arguments.length; i++) {
            var u = arguments[i];
            for (var a in u)
              Object.prototype.hasOwnProperty.call(u, a) && (l[a] = u[a]);
          }
          return l;
        }),
    Qr.apply(this, arguments)
  );
}
var on;
(function (l) {
  ((l.Pop = "POP"), (l.Push = "PUSH"), (l.Replace = "REPLACE"));
})(on || (on = {}));
const Wc = "popstate";
function uh(l) {
  l === void 0 && (l = {});
  function i(a, c) {
    let { pathname: d, search: p, hash: v } = a.location;
    return Pu(
      "",
      { pathname: d, search: p, hash: v },
      (c.state && c.state.usr) || null,
      (c.state && c.state.key) || "default",
    );
  }
  function u(a, c) {
    return typeof c == "string" ? c : po(c);
  }
  return ah(i, u, null, l);
}
function ke(l, i) {
  if (l === !1 || l === null || typeof l > "u") throw new Error(i);
}
function gf(l, i) {
  if (!l) {
    typeof console < "u" && console.warn(i);
    try {
      throw new Error(i);
    } catch {}
  }
}
function sh() {
  return Math.random().toString(36).substr(2, 8);
}
function Qc(l, i) {
  return { usr: l.state, key: l.key, idx: i };
}
function Pu(l, i, u, a) {
  return (
    u === void 0 && (u = null),
    Qr(
      { pathname: typeof l == "string" ? l : l.pathname, search: "", hash: "" },
      typeof i == "string" ? Gn(i) : i,
      { state: u, key: (i && i.key) || a || sh() },
    )
  );
}
function po(l) {
  let { pathname: i = "/", search: u = "", hash: a = "" } = l;
  return (
    u && u !== "?" && (i += u.charAt(0) === "?" ? u : "?" + u),
    a && a !== "#" && (i += a.charAt(0) === "#" ? a : "#" + a),
    i
  );
}
function Gn(l) {
  let i = {};
  if (l) {
    let u = l.indexOf("#");
    u >= 0 && ((i.hash = l.substr(u)), (l = l.substr(0, u)));
    let a = l.indexOf("?");
    (a >= 0 && ((i.search = l.substr(a)), (l = l.substr(0, a))),
      l && (i.pathname = l));
  }
  return i;
}
function ah(l, i, u, a) {
  a === void 0 && (a = {});
  let { window: c = document.defaultView, v5Compat: d = !1 } = a,
    p = c.history,
    v = on.Pop,
    w = null,
    x = S();
  x == null && ((x = 0), p.replaceState(Qr({}, p.state, { idx: x }), ""));
  function S() {
    return (p.state || { idx: null }).idx;
  }
  function R() {
    v = on.Pop;
    let _ = S(),
      J = _ == null ? null : _ - x;
    ((x = _), w && w({ action: v, location: O.location, delta: J }));
  }
  function D(_, J) {
    v = on.Push;
    let X = Pu(O.location, _, J);
    x = S() + 1;
    let K = Qc(X, x),
      A = O.createHref(X);
    try {
      p.pushState(K, "", A);
    } catch (re) {
      if (re instanceof DOMException && re.name === "DataCloneError") throw re;
      c.location.assign(A);
    }
    d && w && w({ action: v, location: O.location, delta: 1 });
  }
  function q(_, J) {
    v = on.Replace;
    let X = Pu(O.location, _, J);
    x = S();
    let K = Qc(X, x),
      A = O.createHref(X);
    (p.replaceState(K, "", A),
      d && w && w({ action: v, location: O.location, delta: 0 }));
  }
  function N(_) {
    let J = c.location.origin !== "null" ? c.location.origin : c.location.href,
      X = typeof _ == "string" ? _ : po(_);
    return (
      (X = X.replace(/ $/, "%20")),
      ke(
        J,
        "No window.location.(origin|href) available to create URL for href: " +
          X,
      ),
      new URL(X, J)
    );
  }
  let O = {
    get action() {
      return v;
    },
    get location() {
      return l(c, p);
    },
    listen(_) {
      if (w) throw new Error("A history only accepts one active listener");
      return (
        c.addEventListener(Wc, R),
        (w = _),
        () => {
          (c.removeEventListener(Wc, R), (w = null));
        }
      );
    },
    createHref(_) {
      return i(c, _);
    },
    createURL: N,
    encodeLocation(_) {
      let J = N(_);
      return { pathname: J.pathname, search: J.search, hash: J.hash };
    },
    push: D,
    replace: q,
    go(_) {
      return p.go(_);
    },
  };
  return O;
}
var Kc;
(function (l) {
  ((l.data = "data"),
    (l.deferred = "deferred"),
    (l.redirect = "redirect"),
    (l.error = "error"));
})(Kc || (Kc = {}));
function ch(l, i, u) {
  return (u === void 0 && (u = "/"), fh(l, i, u));
}
function fh(l, i, u, a) {
  let c = typeof i == "string" ? Gn(i) : i,
    d = Xn(c.pathname || "/", u);
  if (d == null) return null;
  let p = wf(l);
  dh(p);
  let v = null;
  for (let w = 0; v == null && w < p.length; ++w) {
    let x = kh(d);
    v = Eh(p[w], x);
  }
  return v;
}
function wf(l, i, u, a) {
  (i === void 0 && (i = []),
    u === void 0 && (u = []),
    a === void 0 && (a = ""));
  let c = (d, p, v) => {
    let w = {
      relativePath: v === void 0 ? d.path || "" : v,
      caseSensitive: d.caseSensitive === !0,
      childrenIndex: p,
      route: d,
    };
    w.relativePath.startsWith("/") &&
      (ke(
        w.relativePath.startsWith(a),
        'Absolute route path "' +
          w.relativePath +
          '" nested under path ' +
          ('"' + a + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes.",
      ),
      (w.relativePath = w.relativePath.slice(a.length)));
    let x = un([a, w.relativePath]),
      S = u.concat(w);
    (d.children &&
      d.children.length > 0 &&
      (ke(
        d.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + x + '".'),
      ),
      wf(d.children, i, S, x)),
      !(d.path == null && !d.index) &&
        i.push({ path: x, score: wh(x, d.index), routesMeta: S }));
  };
  return (
    l.forEach((d, p) => {
      var v;
      if (d.path === "" || !((v = d.path) != null && v.includes("?"))) c(d, p);
      else for (let w of Sf(d.path)) c(d, p, w);
    }),
    i
  );
}
function Sf(l) {
  let i = l.split("/");
  if (i.length === 0) return [];
  let [u, ...a] = i,
    c = u.endsWith("?"),
    d = u.replace(/\?$/, "");
  if (a.length === 0) return c ? [d, ""] : [d];
  let p = Sf(a.join("/")),
    v = [];
  return (
    v.push(...p.map((w) => (w === "" ? d : [d, w].join("/")))),
    c && v.push(...p),
    v.map((w) => (l.startsWith("/") && w === "" ? "/" : w))
  );
}
function dh(l) {
  l.sort((i, u) =>
    i.score !== u.score
      ? u.score - i.score
      : Sh(
          i.routesMeta.map((a) => a.childrenIndex),
          u.routesMeta.map((a) => a.childrenIndex),
        ),
  );
}
const ph = /^:[\w-]+$/,
  hh = 3,
  mh = 2,
  vh = 1,
  yh = 10,
  gh = -2,
  qc = (l) => l === "*";
function wh(l, i) {
  let u = l.split("/"),
    a = u.length;
  return (
    u.some(qc) && (a += gh),
    i && (a += mh),
    u
      .filter((c) => !qc(c))
      .reduce((c, d) => c + (ph.test(d) ? hh : d === "" ? vh : yh), a)
  );
}
function Sh(l, i) {
  return l.length === i.length && l.slice(0, -1).every((a, c) => a === i[c])
    ? l[l.length - 1] - i[i.length - 1]
    : 0;
}
function Eh(l, i, u) {
  let { routesMeta: a } = l,
    c = {},
    d = "/",
    p = [];
  for (let v = 0; v < a.length; ++v) {
    let w = a[v],
      x = v === a.length - 1,
      S = d === "/" ? i : i.slice(d.length) || "/",
      R = _u(
        { path: w.relativePath, caseSensitive: w.caseSensitive, end: x },
        S,
      ),
      D = w.route;
    if (!R) return null;
    (Object.assign(c, R.params),
      p.push({
        params: c,
        pathname: un([d, R.pathname]),
        pathnameBase: _h(un([d, R.pathnameBase])),
        route: D,
      }),
      R.pathnameBase !== "/" && (d = un([d, R.pathnameBase])));
  }
  return p;
}
function _u(l, i) {
  typeof l == "string" && (l = { path: l, caseSensitive: !1, end: !0 });
  let [u, a] = xh(l.path, l.caseSensitive, l.end),
    c = i.match(u);
  if (!c) return null;
  let d = c[0],
    p = d.replace(/(.)\/+$/, "$1"),
    v = c.slice(1);
  return {
    params: a.reduce((x, S, R) => {
      let { paramName: D, isOptional: q } = S;
      if (D === "*") {
        let O = v[R] || "";
        p = d.slice(0, d.length - O.length).replace(/(.)\/+$/, "$1");
      }
      const N = v[R];
      return (
        q && !N ? (x[D] = void 0) : (x[D] = (N || "").replace(/%2F/g, "/")),
        x
      );
    }, {}),
    pathname: d,
    pathnameBase: p,
    pattern: l,
  };
}
function xh(l, i, u) {
  (i === void 0 && (i = !1),
    u === void 0 && (u = !0),
    gf(
      l === "*" || !l.endsWith("*") || l.endsWith("/*"),
      'Route path "' +
        l +
        '" will be treated as if it were ' +
        ('"' + l.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + l.replace(/\*$/, "/*") + '".'),
    ));
  let a = [],
    c =
      "^" +
      l
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (p, v, w) => (
            a.push({ paramName: v, isOptional: w != null }),
            w ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    l.endsWith("*")
      ? (a.push({ paramName: "*" }),
        (c += l === "*" || l === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : u
        ? (c += "\\/*$")
        : l !== "" && l !== "/" && (c += "(?:(?=\\/|$))"),
    [new RegExp(c, i ? void 0 : "i"), a]
  );
}
function kh(l) {
  try {
    return l
      .split("/")
      .map((i) => decodeURIComponent(i).replace(/\//g, "%2F"))
      .join("/");
  } catch (i) {
    return (
      gf(
        !1,
        'The URL path "' +
          l +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + i + ")."),
      ),
      l
    );
  }
}
function Xn(l, i) {
  if (i === "/") return l;
  if (!l.toLowerCase().startsWith(i.toLowerCase())) return null;
  let u = i.endsWith("/") ? i.length - 1 : i.length,
    a = l.charAt(u);
  return a && a !== "/" ? null : l.slice(u) || "/";
}
function Ch(l, i) {
  i === void 0 && (i = "/");
  let {
    pathname: u,
    search: a = "",
    hash: c = "",
  } = typeof l == "string" ? Gn(l) : l;
  return {
    pathname: u ? (u.startsWith("/") ? u : Rh(u, i)) : i,
    search: Nh(a),
    hash: Th(c),
  };
}
function Rh(l, i) {
  let u = i.replace(/\/+$/, "").split("/");
  return (
    l.split("/").forEach((c) => {
      c === ".." ? u.length > 1 && u.pop() : c !== "." && u.push(c);
    }),
    u.length > 1 ? u.join("/") : "/"
  );
}
function xu(l, i, u, a) {
  return (
    "Cannot include a '" +
    l +
    "' character in a manually specified " +
    ("`to." +
      i +
      "` field [" +
      JSON.stringify(a) +
      "].  Please separate it out to the ") +
    ("`to." + u + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function Ph(l) {
  return l.filter(
    (i, u) => u === 0 || (i.route.path && i.route.path.length > 0),
  );
}
function Uu(l, i) {
  let u = Ph(l);
  return i
    ? u.map((a, c) => (c === u.length - 1 ? a.pathname : a.pathnameBase))
    : u.map((a) => a.pathnameBase);
}
function Au(l, i, u, a) {
  a === void 0 && (a = !1);
  let c;
  typeof l == "string"
    ? (c = Gn(l))
    : ((c = Qr({}, l)),
      ke(
        !c.pathname || !c.pathname.includes("?"),
        xu("?", "pathname", "search", c),
      ),
      ke(
        !c.pathname || !c.pathname.includes("#"),
        xu("#", "pathname", "hash", c),
      ),
      ke(!c.search || !c.search.includes("#"), xu("#", "search", "hash", c)));
  let d = l === "" || c.pathname === "",
    p = d ? "/" : c.pathname,
    v;
  if (p == null) v = u;
  else {
    let R = i.length - 1;
    if (!a && p.startsWith("..")) {
      let D = p.split("/");
      for (; D[0] === ".."; ) (D.shift(), (R -= 1));
      c.pathname = D.join("/");
    }
    v = R >= 0 ? i[R] : "/";
  }
  let w = Ch(c, v),
    x = p && p !== "/" && p.endsWith("/"),
    S = (d || p === ".") && u.endsWith("/");
  return (!w.pathname.endsWith("/") && (x || S) && (w.pathname += "/"), w);
}
const un = (l) => l.join("/").replace(/\/\/+/g, "/"),
  _h = (l) => l.replace(/\/+$/, "").replace(/^\/*/, "/"),
  Nh = (l) => (!l || l === "?" ? "" : l.startsWith("?") ? l : "?" + l),
  Th = (l) => (!l || l === "#" ? "" : l.startsWith("#") ? l : "#" + l);
function Oh(l) {
  return (
    l != null &&
    typeof l.status == "number" &&
    typeof l.statusText == "string" &&
    typeof l.internal == "boolean" &&
    "data" in l
  );
}
const Ef = ["post", "put", "patch", "delete"];
new Set(Ef);
const Lh = ["get", ...Ef];
new Set(Lh);
/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Kr() {
  return (
    (Kr = Object.assign
      ? Object.assign.bind()
      : function (l) {
          for (var i = 1; i < arguments.length; i++) {
            var u = arguments[i];
            for (var a in u)
              Object.prototype.hasOwnProperty.call(u, a) && (l[a] = u[a]);
          }
          return l;
        }),
    Kr.apply(this, arguments)
  );
}
const vo = U.createContext(null),
  xf = U.createContext(null),
  It = U.createContext(null),
  yo = U.createContext(null),
  Mt = U.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  kf = U.createContext(null);
function jh(l, i) {
  let { relative: u } = i === void 0 ? {} : i;
  Zn() || ke(!1);
  let { basename: a, navigator: c } = U.useContext(It),
    { hash: d, pathname: p, search: v } = go(l, { relative: u }),
    w = p;
  return (
    a !== "/" && (w = p === "/" ? a : un([a, p])),
    c.createHref({ pathname: w, search: v, hash: d })
  );
}
function Zn() {
  return U.useContext(yo) != null;
}
function bn() {
  return (Zn() || ke(!1), U.useContext(yo).location);
}
function Cf(l) {
  U.useContext(It).static || U.useLayoutEffect(l);
}
function Rf() {
  let { isDataRoute: l } = U.useContext(Mt);
  return l ? qh() : zh();
}
function zh() {
  Zn() || ke(!1);
  let l = U.useContext(vo),
    { basename: i, future: u, navigator: a } = U.useContext(It),
    { matches: c } = U.useContext(Mt),
    { pathname: d } = bn(),
    p = JSON.stringify(Uu(c, u.v7_relativeSplatPath)),
    v = U.useRef(!1);
  return (
    Cf(() => {
      v.current = !0;
    }),
    U.useCallback(
      function (x, S) {
        if ((S === void 0 && (S = {}), !v.current)) return;
        if (typeof x == "number") {
          a.go(x);
          return;
        }
        let R = Au(x, JSON.parse(p), d, S.relative === "path");
        (l == null &&
          i !== "/" &&
          (R.pathname = R.pathname === "/" ? i : un([i, R.pathname])),
          (S.replace ? a.replace : a.push)(R, S.state, S));
      },
      [i, a, p, d, l],
    )
  );
}
const Fh = U.createContext(null);
function Dh(l) {
  let i = U.useContext(Mt).outlet;
  return i && U.createElement(Fh.Provider, { value: l }, i);
}
function go(l, i) {
  let { relative: u } = i === void 0 ? {} : i,
    { future: a } = U.useContext(It),
    { matches: c } = U.useContext(Mt),
    { pathname: d } = bn(),
    p = JSON.stringify(Uu(c, a.v7_relativeSplatPath));
  return U.useMemo(() => Au(l, JSON.parse(p), d, u === "path"), [l, p, d, u]);
}
function Uh(l, i) {
  return Ah(l, i);
}
function Ah(l, i, u, a) {
  Zn() || ke(!1);
  let { navigator: c } = U.useContext(It),
    { matches: d } = U.useContext(Mt),
    p = d[d.length - 1],
    v = p ? p.params : {};
  p && p.pathname;
  let w = p ? p.pathnameBase : "/";
  p && p.route;
  let x = bn(),
    S;
  if (i) {
    var R;
    let _ = typeof i == "string" ? Gn(i) : i;
    (w === "/" || ((R = _.pathname) != null && R.startsWith(w)) || ke(!1),
      (S = _));
  } else S = x;
  let D = S.pathname || "/",
    q = D;
  if (w !== "/") {
    let _ = w.replace(/^\//, "").split("/");
    q = "/" + D.replace(/^\//, "").split("/").slice(_.length).join("/");
  }
  let N = ch(l, { pathname: q }),
    O = Hh(
      N &&
        N.map((_) =>
          Object.assign({}, _, {
            params: Object.assign({}, v, _.params),
            pathname: un([
              w,
              c.encodeLocation
                ? c.encodeLocation(_.pathname).pathname
                : _.pathname,
            ]),
            pathnameBase:
              _.pathnameBase === "/"
                ? w
                : un([
                    w,
                    c.encodeLocation
                      ? c.encodeLocation(_.pathnameBase).pathname
                      : _.pathnameBase,
                  ]),
          }),
        ),
      d,
      u,
      a,
    );
  return i && O
    ? U.createElement(
        yo.Provider,
        {
          value: {
            location: Kr(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              S,
            ),
            navigationType: on.Pop,
          },
        },
        O,
      )
    : O;
}
function Ih() {
  let l = Kh(),
    i = Oh(l)
      ? l.status + " " + l.statusText
      : l instanceof Error
        ? l.message
        : JSON.stringify(l),
    u = l instanceof Error ? l.stack : null,
    c = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
  return U.createElement(
    U.Fragment,
    null,
    U.createElement("h2", null, "Unexpected Application Error!"),
    U.createElement("h3", { style: { fontStyle: "italic" } }, i),
    u ? U.createElement("pre", { style: c }, u) : null,
    null,
  );
}
const Mh = U.createElement(Ih, null);
class Bh extends U.Component {
  constructor(i) {
    (super(i),
      (this.state = {
        location: i.location,
        revalidation: i.revalidation,
        error: i.error,
      }));
  }
  static getDerivedStateFromError(i) {
    return { error: i };
  }
  static getDerivedStateFromProps(i, u) {
    return u.location !== i.location ||
      (u.revalidation !== "idle" && i.revalidation === "idle")
      ? { error: i.error, location: i.location, revalidation: i.revalidation }
      : {
          error: i.error !== void 0 ? i.error : u.error,
          location: u.location,
          revalidation: i.revalidation || u.revalidation,
        };
  }
  componentDidCatch(i, u) {
    console.error(
      "React Router caught the following error during render",
      i,
      u,
    );
  }
  render() {
    return this.state.error !== void 0
      ? U.createElement(
          Mt.Provider,
          { value: this.props.routeContext },
          U.createElement(kf.Provider, {
            value: this.state.error,
            children: this.props.component,
          }),
        )
      : this.props.children;
  }
}
function $h(l) {
  let { routeContext: i, match: u, children: a } = l,
    c = U.useContext(vo);
  return (
    c &&
      c.static &&
      c.staticContext &&
      (u.route.errorElement || u.route.ErrorBoundary) &&
      (c.staticContext._deepestRenderedBoundaryId = u.route.id),
    U.createElement(Mt.Provider, { value: i }, a)
  );
}
function Hh(l, i, u, a) {
  var c;
  if (
    (i === void 0 && (i = []),
    u === void 0 && (u = null),
    a === void 0 && (a = null),
    l == null)
  ) {
    var d;
    if (!u) return null;
    if (u.errors) l = u.matches;
    else if (
      (d = a) != null &&
      d.v7_partialHydration &&
      i.length === 0 &&
      !u.initialized &&
      u.matches.length > 0
    )
      l = u.matches;
    else return null;
  }
  let p = l,
    v = (c = u) == null ? void 0 : c.errors;
  if (v != null) {
    let S = p.findIndex((R) => R.route.id && v?.[R.route.id] !== void 0);
    (S >= 0 || ke(!1), (p = p.slice(0, Math.min(p.length, S + 1))));
  }
  let w = !1,
    x = -1;
  if (u && a && a.v7_partialHydration)
    for (let S = 0; S < p.length; S++) {
      let R = p[S];
      if (
        ((R.route.HydrateFallback || R.route.hydrateFallbackElement) && (x = S),
        R.route.id)
      ) {
        let { loaderData: D, errors: q } = u,
          N =
            R.route.loader &&
            D[R.route.id] === void 0 &&
            (!q || q[R.route.id] === void 0);
        if (R.route.lazy || N) {
          ((w = !0), x >= 0 ? (p = p.slice(0, x + 1)) : (p = [p[0]]));
          break;
        }
      }
    }
  return p.reduceRight((S, R, D) => {
    let q,
      N = !1,
      O = null,
      _ = null;
    u &&
      ((q = v && R.route.id ? v[R.route.id] : void 0),
      (O = R.route.errorElement || Mh),
      w &&
        (x < 0 && D === 0
          ? (Jh("route-fallback"), (N = !0), (_ = null))
          : x === D &&
            ((N = !0), (_ = R.route.hydrateFallbackElement || null))));
    let J = i.concat(p.slice(0, D + 1)),
      X = () => {
        let K;
        return (
          q
            ? (K = O)
            : N
              ? (K = _)
              : R.route.Component
                ? (K = U.createElement(R.route.Component, null))
                : R.route.element
                  ? (K = R.route.element)
                  : (K = S),
          U.createElement($h, {
            match: R,
            routeContext: { outlet: S, matches: J, isDataRoute: u != null },
            children: K,
          })
        );
      };
    return u && (R.route.ErrorBoundary || R.route.errorElement || D === 0)
      ? U.createElement(Bh, {
          location: u.location,
          revalidation: u.revalidation,
          component: O,
          error: q,
          children: X(),
          routeContext: { outlet: null, matches: J, isDataRoute: !0 },
        })
      : X();
  }, null);
}
var Pf = (function (l) {
    return (
      (l.UseBlocker = "useBlocker"),
      (l.UseRevalidator = "useRevalidator"),
      (l.UseNavigateStable = "useNavigate"),
      l
    );
  })(Pf || {}),
  _f = (function (l) {
    return (
      (l.UseBlocker = "useBlocker"),
      (l.UseLoaderData = "useLoaderData"),
      (l.UseActionData = "useActionData"),
      (l.UseRouteError = "useRouteError"),
      (l.UseNavigation = "useNavigation"),
      (l.UseRouteLoaderData = "useRouteLoaderData"),
      (l.UseMatches = "useMatches"),
      (l.UseRevalidator = "useRevalidator"),
      (l.UseNavigateStable = "useNavigate"),
      (l.UseRouteId = "useRouteId"),
      l
    );
  })(_f || {});
function Vh(l) {
  let i = U.useContext(vo);
  return (i || ke(!1), i);
}
function Wh(l) {
  let i = U.useContext(xf);
  return (i || ke(!1), i);
}
function Qh(l) {
  let i = U.useContext(Mt);
  return (i || ke(!1), i);
}
function Nf(l) {
  let i = Qh(),
    u = i.matches[i.matches.length - 1];
  return (u.route.id || ke(!1), u.route.id);
}
function Kh() {
  var l;
  let i = U.useContext(kf),
    u = Wh(),
    a = Nf();
  return i !== void 0 ? i : (l = u.errors) == null ? void 0 : l[a];
}
function qh() {
  let { router: l } = Vh(Pf.UseNavigateStable),
    i = Nf(_f.UseNavigateStable),
    u = U.useRef(!1);
  return (
    Cf(() => {
      u.current = !0;
    }),
    U.useCallback(
      function (c, d) {
        (d === void 0 && (d = {}),
          u.current &&
            (typeof c == "number"
              ? l.navigate(c)
              : l.navigate(c, Kr({ fromRouteId: i }, d))));
      },
      [l, i],
    )
  );
}
const Jc = {};
function Jh(l, i, u) {
  Jc[l] || (Jc[l] = !0);
}
function Xh(l, i) {
  (l?.v7_startTransition, l?.v7_relativeSplatPath);
}
function Yh(l) {
  let { to: i, replace: u, state: a, relative: c } = l;
  Zn() || ke(!1);
  let { future: d, static: p } = U.useContext(It),
    { matches: v } = U.useContext(Mt),
    { pathname: w } = bn(),
    x = Rf(),
    S = Au(i, Uu(v, d.v7_relativeSplatPath), w, c === "path"),
    R = JSON.stringify(S);
  return (
    U.useEffect(
      () => x(JSON.parse(R), { replace: u, state: a, relative: c }),
      [x, R, c, u, a],
    ),
    null
  );
}
function Gh(l) {
  return Dh(l.context);
}
function Vr(l) {
  ke(!1);
}
function Zh(l) {
  let {
    basename: i = "/",
    children: u = null,
    location: a,
    navigationType: c = on.Pop,
    navigator: d,
    static: p = !1,
    future: v,
  } = l;
  Zn() && ke(!1);
  let w = i.replace(/^\/*/, "/"),
    x = U.useMemo(
      () => ({
        basename: w,
        navigator: d,
        static: p,
        future: Kr({ v7_relativeSplatPath: !1 }, v),
      }),
      [w, v, d, p],
    );
  typeof a == "string" && (a = Gn(a));
  let {
      pathname: S = "/",
      search: R = "",
      hash: D = "",
      state: q = null,
      key: N = "default",
    } = a,
    O = U.useMemo(() => {
      let _ = Xn(S, w);
      return _ == null
        ? null
        : {
            location: { pathname: _, search: R, hash: D, state: q, key: N },
            navigationType: c,
          };
    }, [w, S, R, D, q, N, c]);
  return O == null
    ? null
    : U.createElement(
        It.Provider,
        { value: x },
        U.createElement(yo.Provider, { children: u, value: O }),
      );
}
function bh(l) {
  let { children: i, location: u } = l;
  return Uh(Nu(i), u);
}
new Promise(() => {});
function Nu(l, i) {
  i === void 0 && (i = []);
  let u = [];
  return (
    U.Children.forEach(l, (a, c) => {
      if (!U.isValidElement(a)) return;
      let d = [...i, c];
      if (a.type === U.Fragment) {
        u.push.apply(u, Nu(a.props.children, d));
        return;
      }
      (a.type !== Vr && ke(!1), !a.props.index || !a.props.children || ke(!1));
      let p = {
        id: a.props.id || d.join("-"),
        caseSensitive: a.props.caseSensitive,
        element: a.props.element,
        Component: a.props.Component,
        index: a.props.index,
        path: a.props.path,
        loader: a.props.loader,
        action: a.props.action,
        errorElement: a.props.errorElement,
        ErrorBoundary: a.props.ErrorBoundary,
        hasErrorBoundary:
          a.props.ErrorBoundary != null || a.props.errorElement != null,
        shouldRevalidate: a.props.shouldRevalidate,
        handle: a.props.handle,
        lazy: a.props.lazy,
      };
      (a.props.children && (p.children = Nu(a.props.children, d)), u.push(p));
    }),
    u
  );
}
/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function ho() {
  return (
    (ho = Object.assign
      ? Object.assign.bind()
      : function (l) {
          for (var i = 1; i < arguments.length; i++) {
            var u = arguments[i];
            for (var a in u)
              Object.prototype.hasOwnProperty.call(u, a) && (l[a] = u[a]);
          }
          return l;
        }),
    ho.apply(this, arguments)
  );
}
function Tf(l, i) {
  if (l == null) return {};
  var u = {},
    a = Object.keys(l),
    c,
    d;
  for (d = 0; d < a.length; d++)
    ((c = a[d]), !(i.indexOf(c) >= 0) && (u[c] = l[c]));
  return u;
}
function em(l) {
  return !!(l.metaKey || l.altKey || l.ctrlKey || l.shiftKey);
}
function tm(l, i) {
  return l.button === 0 && (!i || i === "_self") && !em(l);
}
const nm = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "viewTransition",
  ],
  rm = [
    "aria-current",
    "caseSensitive",
    "className",
    "end",
    "style",
    "to",
    "viewTransition",
    "children",
  ],
  lm = "6";
try {
  window.__reactRouterVersion = lm;
} catch {}
const om = U.createContext({ isTransitioning: !1 }),
  im = "startTransition",
  Xc = eh[im];
function um(l) {
  let { basename: i, children: u, future: a, window: c } = l,
    d = U.useRef();
  d.current == null && (d.current = uh({ window: c, v5Compat: !0 }));
  let p = d.current,
    [v, w] = U.useState({ action: p.action, location: p.location }),
    { v7_startTransition: x } = a || {},
    S = U.useCallback(
      (R) => {
        x && Xc ? Xc(() => w(R)) : w(R);
      },
      [w, x],
    );
  return (
    U.useLayoutEffect(() => p.listen(S), [p, S]),
    U.useEffect(() => Xh(a), [a]),
    U.createElement(Zh, {
      basename: i,
      children: u,
      location: v.location,
      navigationType: v.action,
      navigator: p,
      future: a,
    })
  );
}
const sm =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  am = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  cm = U.forwardRef(function (i, u) {
    let {
        onClick: a,
        relative: c,
        reloadDocument: d,
        replace: p,
        state: v,
        target: w,
        to: x,
        preventScrollReset: S,
        viewTransition: R,
      } = i,
      D = Tf(i, nm),
      { basename: q } = U.useContext(It),
      N,
      O = !1;
    if (typeof x == "string" && am.test(x) && ((N = x), sm))
      try {
        let K = new URL(window.location.href),
          A = x.startsWith("//") ? new URL(K.protocol + x) : new URL(x),
          re = Xn(A.pathname, q);
        A.origin === K.origin && re != null
          ? (x = re + A.search + A.hash)
          : (O = !0);
      } catch {}
    let _ = jh(x, { relative: c }),
      J = dm(x, {
        replace: p,
        state: v,
        target: w,
        preventScrollReset: S,
        relative: c,
        viewTransition: R,
      });
    function X(K) {
      (a && a(K), K.defaultPrevented || J(K));
    }
    return U.createElement(
      "a",
      ho({}, D, { href: N || _, onClick: O || d ? a : X, ref: u, target: w }),
    );
  }),
  Yc = U.forwardRef(function (i, u) {
    let {
        "aria-current": a = "page",
        caseSensitive: c = !1,
        className: d = "",
        end: p = !1,
        style: v,
        to: w,
        viewTransition: x,
        children: S,
      } = i,
      R = Tf(i, rm),
      D = go(w, { relative: R.relative }),
      q = bn(),
      N = U.useContext(xf),
      { navigator: O, basename: _ } = U.useContext(It),
      J = N != null && pm(D) && x === !0,
      X = O.encodeLocation ? O.encodeLocation(D).pathname : D.pathname,
      K = q.pathname,
      A =
        N && N.navigation && N.navigation.location
          ? N.navigation.location.pathname
          : null;
    (c ||
      ((K = K.toLowerCase()),
      (A = A ? A.toLowerCase() : null),
      (X = X.toLowerCase())),
      A && _ && (A = Xn(A, _) || A));
    const re = X !== "/" && X.endsWith("/") ? X.length - 1 : X.length;
    let de = K === X || (!p && K.startsWith(X) && K.charAt(re) === "/"),
      ae =
        A != null &&
        (A === X || (!p && A.startsWith(X) && A.charAt(X.length) === "/")),
      Ne = { isActive: de, isPending: ae, isTransitioning: J },
      Qe = de ? a : void 0,
      Me;
    typeof d == "function"
      ? (Me = d(Ne))
      : (Me = [
          d,
          de ? "active" : null,
          ae ? "pending" : null,
          J ? "transitioning" : null,
        ]
          .filter(Boolean)
          .join(" "));
    let at = typeof v == "function" ? v(Ne) : v;
    return U.createElement(
      cm,
      ho({}, R, {
        "aria-current": Qe,
        className: Me,
        ref: u,
        style: at,
        to: w,
        viewTransition: x,
      }),
      typeof S == "function" ? S(Ne) : S,
    );
  });
var Tu;
(function (l) {
  ((l.UseScrollRestoration = "useScrollRestoration"),
    (l.UseSubmit = "useSubmit"),
    (l.UseSubmitFetcher = "useSubmitFetcher"),
    (l.UseFetcher = "useFetcher"),
    (l.useViewTransitionState = "useViewTransitionState"));
})(Tu || (Tu = {}));
var Gc;
(function (l) {
  ((l.UseFetcher = "useFetcher"),
    (l.UseFetchers = "useFetchers"),
    (l.UseScrollRestoration = "useScrollRestoration"));
})(Gc || (Gc = {}));
function fm(l) {
  let i = U.useContext(vo);
  return (i || ke(!1), i);
}
function dm(l, i) {
  let {
      target: u,
      replace: a,
      state: c,
      preventScrollReset: d,
      relative: p,
      viewTransition: v,
    } = i === void 0 ? {} : i,
    w = Rf(),
    x = bn(),
    S = go(l, { relative: p });
  return U.useCallback(
    (R) => {
      if (tm(R, u)) {
        R.preventDefault();
        let D = a !== void 0 ? a : po(x) === po(S);
        w(l, {
          replace: D,
          state: c,
          preventScrollReset: d,
          relative: p,
          viewTransition: v,
        });
      }
    },
    [x, w, S, a, c, u, l, d, p, v],
  );
}
function pm(l, i) {
  i === void 0 && (i = {});
  let u = U.useContext(om);
  u == null && ke(!1);
  let { basename: a } = fm(Tu.useViewTransitionState),
    c = go(l, { relative: i.relative });
  if (!u.isTransitioning) return !1;
  let d = Xn(u.currentLocation.pathname, a) || u.currentLocation.pathname,
    p = Xn(u.nextLocation.pathname, a) || u.nextLocation.pathname;
  return _u(c.pathname, p) != null || _u(c.pathname, d) != null;
}
function hm() {
  return B.jsxs("div", {
    className: "layout",
    children: [
      B.jsxs("div", {
        className: "topbar",
        children: [
          B.jsx("div", {
            className: "brand",
            children: "🩺 Prontuário — Consultório",
          }),
          B.jsx("div", {
            className: "status",
            children: B.jsx("span", {
              className: "chip",
              children: "IA: local",
            }),
          }),
        ],
      }),
      B.jsx("aside", {
        className: "sidebar",
        children: B.jsxs("nav", {
          className: "nav",
          children: [
            B.jsx(Yc, { to: "/", end: !0, children: "🏠 Dashboard" }),
            B.jsx(Yc, { to: "/prontuarios", children: "📄 Prontuários" }),
          ],
        }),
      }),
      B.jsx("main", { className: "main", children: B.jsx(Gh, {}) }),
    ],
  });
}
function Of(l, i) {
  return function () {
    return l.apply(i, arguments);
  };
}
const { toString: mm } = Object.prototype,
  { getPrototypeOf: Iu } = Object,
  { iterator: wo, toStringTag: Lf } = Symbol,
  So = ((l) => (i) => {
    const u = mm.call(i);
    return l[u] || (l[u] = u.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  kt = (l) => ((l = l.toLowerCase()), (i) => So(i) === l),
  Eo = (l) => (i) => typeof i === l,
  { isArray: er } = Array,
  Yn = Eo("undefined");
function qr(l) {
  return (
    l !== null &&
    !Yn(l) &&
    l.constructor !== null &&
    !Yn(l.constructor) &&
    tt(l.constructor.isBuffer) &&
    l.constructor.isBuffer(l)
  );
}
const jf = kt("ArrayBuffer");
function vm(l) {
  let i;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (i = ArrayBuffer.isView(l))
      : (i = l && l.buffer && jf(l.buffer)),
    i
  );
}
const ym = Eo("string"),
  tt = Eo("function"),
  zf = Eo("number"),
  Jr = (l) => l !== null && typeof l == "object",
  gm = (l) => l === !0 || l === !1,
  ao = (l) => {
    if (So(l) !== "object") return !1;
    const i = Iu(l);
    return (
      (i === null ||
        i === Object.prototype ||
        Object.getPrototypeOf(i) === null) &&
      !(Lf in l) &&
      !(wo in l)
    );
  },
  wm = (l) => {
    if (!Jr(l) || qr(l)) return !1;
    try {
      return (
        Object.keys(l).length === 0 &&
        Object.getPrototypeOf(l) === Object.prototype
      );
    } catch {
      return !1;
    }
  },
  Sm = kt("Date"),
  Em = kt("File"),
  xm = kt("Blob"),
  km = kt("FileList"),
  Cm = (l) => Jr(l) && tt(l.pipe),
  Rm = (l) => {
    let i;
    return (
      l &&
      ((typeof FormData == "function" && l instanceof FormData) ||
        (tt(l.append) &&
          ((i = So(l)) === "formdata" ||
            (i === "object" &&
              tt(l.toString) &&
              l.toString() === "[object FormData]"))))
    );
  },
  Pm = kt("URLSearchParams"),
  [_m, Nm, Tm, Om] = ["ReadableStream", "Request", "Response", "Headers"].map(
    kt,
  ),
  Lm = (l) =>
    l.trim ? l.trim() : l.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Xr(l, i, { allOwnKeys: u = !1 } = {}) {
  if (l === null || typeof l > "u") return;
  let a, c;
  if ((typeof l != "object" && (l = [l]), er(l)))
    for (a = 0, c = l.length; a < c; a++) i.call(null, l[a], a, l);
  else {
    if (qr(l)) return;
    const d = u ? Object.getOwnPropertyNames(l) : Object.keys(l),
      p = d.length;
    let v;
    for (a = 0; a < p; a++) ((v = d[a]), i.call(null, l[v], v, l));
  }
}
function Ff(l, i) {
  if (qr(l)) return null;
  i = i.toLowerCase();
  const u = Object.keys(l);
  let a = u.length,
    c;
  for (; a-- > 0; ) if (((c = u[a]), i === c.toLowerCase())) return c;
  return null;
}
const En =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : global,
  Df = (l) => !Yn(l) && l !== En;
function Ou() {
  const { caseless: l, skipUndefined: i } = (Df(this) && this) || {},
    u = {},
    a = (c, d) => {
      const p = (l && Ff(u, d)) || d;
      ao(u[p]) && ao(c)
        ? (u[p] = Ou(u[p], c))
        : ao(c)
          ? (u[p] = Ou({}, c))
          : er(c)
            ? (u[p] = c.slice())
            : (!i || !Yn(c)) && (u[p] = c);
    };
  for (let c = 0, d = arguments.length; c < d; c++)
    arguments[c] && Xr(arguments[c], a);
  return u;
}
const jm = (l, i, u, { allOwnKeys: a } = {}) => (
    Xr(
      i,
      (c, d) => {
        u && tt(c) ? (l[d] = Of(c, u)) : (l[d] = c);
      },
      { allOwnKeys: a },
    ),
    l
  ),
  zm = (l) => (l.charCodeAt(0) === 65279 && (l = l.slice(1)), l),
  Fm = (l, i, u, a) => {
    ((l.prototype = Object.create(i.prototype, a)),
      (l.prototype.constructor = l),
      Object.defineProperty(l, "super", { value: i.prototype }),
      u && Object.assign(l.prototype, u));
  },
  Dm = (l, i, u, a) => {
    let c, d, p;
    const v = {};
    if (((i = i || {}), l == null)) return i;
    do {
      for (c = Object.getOwnPropertyNames(l), d = c.length; d-- > 0; )
        ((p = c[d]),
          (!a || a(p, l, i)) && !v[p] && ((i[p] = l[p]), (v[p] = !0)));
      l = u !== !1 && Iu(l);
    } while (l && (!u || u(l, i)) && l !== Object.prototype);
    return i;
  },
  Um = (l, i, u) => {
    ((l = String(l)),
      (u === void 0 || u > l.length) && (u = l.length),
      (u -= i.length));
    const a = l.indexOf(i, u);
    return a !== -1 && a === u;
  },
  Am = (l) => {
    if (!l) return null;
    if (er(l)) return l;
    let i = l.length;
    if (!zf(i)) return null;
    const u = new Array(i);
    for (; i-- > 0; ) u[i] = l[i];
    return u;
  },
  Im = (
    (l) => (i) =>
      l && i instanceof l
  )(typeof Uint8Array < "u" && Iu(Uint8Array)),
  Mm = (l, i) => {
    const a = (l && l[wo]).call(l);
    let c;
    for (; (c = a.next()) && !c.done; ) {
      const d = c.value;
      i.call(l, d[0], d[1]);
    }
  },
  Bm = (l, i) => {
    let u;
    const a = [];
    for (; (u = l.exec(i)) !== null; ) a.push(u);
    return a;
  },
  $m = kt("HTMLFormElement"),
  Hm = (l) =>
    l.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (u, a, c) {
      return a.toUpperCase() + c;
    }),
  Zc = (
    ({ hasOwnProperty: l }) =>
    (i, u) =>
      l.call(i, u)
  )(Object.prototype),
  Vm = kt("RegExp"),
  Uf = (l, i) => {
    const u = Object.getOwnPropertyDescriptors(l),
      a = {};
    (Xr(u, (c, d) => {
      let p;
      (p = i(c, d, l)) !== !1 && (a[d] = p || c);
    }),
      Object.defineProperties(l, a));
  },
  Wm = (l) => {
    Uf(l, (i, u) => {
      if (tt(l) && ["arguments", "caller", "callee"].indexOf(u) !== -1)
        return !1;
      const a = l[u];
      if (tt(a)) {
        if (((i.enumerable = !1), "writable" in i)) {
          i.writable = !1;
          return;
        }
        i.set ||
          (i.set = () => {
            throw Error("Can not rewrite read-only method '" + u + "'");
          });
      }
    });
  },
  Qm = (l, i) => {
    const u = {},
      a = (c) => {
        c.forEach((d) => {
          u[d] = !0;
        });
      };
    return (er(l) ? a(l) : a(String(l).split(i)), u);
  },
  Km = () => {},
  qm = (l, i) => (l != null && Number.isFinite((l = +l)) ? l : i);
function Jm(l) {
  return !!(l && tt(l.append) && l[Lf] === "FormData" && l[wo]);
}
const Xm = (l) => {
    const i = new Array(10),
      u = (a, c) => {
        if (Jr(a)) {
          if (i.indexOf(a) >= 0) return;
          if (qr(a)) return a;
          if (!("toJSON" in a)) {
            i[c] = a;
            const d = er(a) ? [] : {};
            return (
              Xr(a, (p, v) => {
                const w = u(p, c + 1);
                !Yn(w) && (d[v] = w);
              }),
              (i[c] = void 0),
              d
            );
          }
        }
        return a;
      };
    return u(l, 0);
  },
  Ym = kt("AsyncFunction"),
  Gm = (l) => l && (Jr(l) || tt(l)) && tt(l.then) && tt(l.catch),
  Af = ((l, i) =>
    l
      ? setImmediate
      : i
        ? ((u, a) => (
            En.addEventListener(
              "message",
              ({ source: c, data: d }) => {
                c === En && d === u && a.length && a.shift()();
              },
              !1,
            ),
            (c) => {
              (a.push(c), En.postMessage(u, "*"));
            }
          ))(`axios@${Math.random()}`, [])
        : (u) => setTimeout(u))(
    typeof setImmediate == "function",
    tt(En.postMessage),
  ),
  Zm =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(En)
      : (typeof process < "u" && process.nextTick) || Af,
  bm = (l) => l != null && tt(l[wo]),
  P = {
    isArray: er,
    isArrayBuffer: jf,
    isBuffer: qr,
    isFormData: Rm,
    isArrayBufferView: vm,
    isString: ym,
    isNumber: zf,
    isBoolean: gm,
    isObject: Jr,
    isPlainObject: ao,
    isEmptyObject: wm,
    isReadableStream: _m,
    isRequest: Nm,
    isResponse: Tm,
    isHeaders: Om,
    isUndefined: Yn,
    isDate: Sm,
    isFile: Em,
    isBlob: xm,
    isRegExp: Vm,
    isFunction: tt,
    isStream: Cm,
    isURLSearchParams: Pm,
    isTypedArray: Im,
    isFileList: km,
    forEach: Xr,
    merge: Ou,
    extend: jm,
    trim: Lm,
    stripBOM: zm,
    inherits: Fm,
    toFlatObject: Dm,
    kindOf: So,
    kindOfTest: kt,
    endsWith: Um,
    toArray: Am,
    forEachEntry: Mm,
    matchAll: Bm,
    isHTMLForm: $m,
    hasOwnProperty: Zc,
    hasOwnProp: Zc,
    reduceDescriptors: Uf,
    freezeMethods: Wm,
    toObjectSet: Qm,
    toCamelCase: Hm,
    noop: Km,
    toFiniteNumber: qm,
    findKey: Ff,
    global: En,
    isContextDefined: Df,
    isSpecCompliantForm: Jm,
    toJSONObject: Xm,
    isAsyncFn: Ym,
    isThenable: Gm,
    setImmediate: Af,
    asap: Zm,
    isIterable: bm,
  };
function ne(l, i, u, a, c) {
  (Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = l),
    (this.name = "AxiosError"),
    i && (this.code = i),
    u && (this.config = u),
    a && (this.request = a),
    c && ((this.response = c), (this.status = c.status ? c.status : null)));
}
P.inherits(ne, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: P.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  },
});
const If = ne.prototype,
  Mf = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((l) => {
  Mf[l] = { value: l };
});
Object.defineProperties(ne, Mf);
Object.defineProperty(If, "isAxiosError", { value: !0 });
ne.from = (l, i, u, a, c, d) => {
  const p = Object.create(If);
  P.toFlatObject(
    l,
    p,
    function (S) {
      return S !== Error.prototype;
    },
    (x) => x !== "isAxiosError",
  );
  const v = l && l.message ? l.message : "Error",
    w = i == null && l ? l.code : i;
  return (
    ne.call(p, v, w, u, a, c),
    l &&
      p.cause == null &&
      Object.defineProperty(p, "cause", { value: l, configurable: !0 }),
    (p.name = (l && l.name) || "Error"),
    d && Object.assign(p, d),
    p
  );
};
const ev = null;
function Lu(l) {
  return P.isPlainObject(l) || P.isArray(l);
}
function Bf(l) {
  return P.endsWith(l, "[]") ? l.slice(0, -2) : l;
}
function bc(l, i, u) {
  return l
    ? l
        .concat(i)
        .map(function (c, d) {
          return ((c = Bf(c)), !u && d ? "[" + c + "]" : c);
        })
        .join(u ? "." : "")
    : i;
}
function tv(l) {
  return P.isArray(l) && !l.some(Lu);
}
const nv = P.toFlatObject(P, {}, null, function (i) {
  return /^is[A-Z]/.test(i);
});
function xo(l, i, u) {
  if (!P.isObject(l)) throw new TypeError("target must be an object");
  ((i = i || new FormData()),
    (u = P.toFlatObject(
      u,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (O, _) {
        return !P.isUndefined(_[O]);
      },
    )));
  const a = u.metaTokens,
    c = u.visitor || S,
    d = u.dots,
    p = u.indexes,
    w = (u.Blob || (typeof Blob < "u" && Blob)) && P.isSpecCompliantForm(i);
  if (!P.isFunction(c)) throw new TypeError("visitor must be a function");
  function x(N) {
    if (N === null) return "";
    if (P.isDate(N)) return N.toISOString();
    if (P.isBoolean(N)) return N.toString();
    if (!w && P.isBlob(N))
      throw new ne("Blob is not supported. Use a Buffer instead.");
    return P.isArrayBuffer(N) || P.isTypedArray(N)
      ? w && typeof Blob == "function"
        ? new Blob([N])
        : Buffer.from(N)
      : N;
  }
  function S(N, O, _) {
    let J = N;
    if (N && !_ && typeof N == "object") {
      if (P.endsWith(O, "{}"))
        ((O = a ? O : O.slice(0, -2)), (N = JSON.stringify(N)));
      else if (
        (P.isArray(N) && tv(N)) ||
        ((P.isFileList(N) || P.endsWith(O, "[]")) && (J = P.toArray(N)))
      )
        return (
          (O = Bf(O)),
          J.forEach(function (K, A) {
            !(P.isUndefined(K) || K === null) &&
              i.append(
                p === !0 ? bc([O], A, d) : p === null ? O : O + "[]",
                x(K),
              );
          }),
          !1
        );
    }
    return Lu(N) ? !0 : (i.append(bc(_, O, d), x(N)), !1);
  }
  const R = [],
    D = Object.assign(nv, {
      defaultVisitor: S,
      convertValue: x,
      isVisitable: Lu,
    });
  function q(N, O) {
    if (!P.isUndefined(N)) {
      if (R.indexOf(N) !== -1)
        throw Error("Circular reference detected in " + O.join("."));
      (R.push(N),
        P.forEach(N, function (J, X) {
          (!(P.isUndefined(J) || J === null) &&
            c.call(i, J, P.isString(X) ? X.trim() : X, O, D)) === !0 &&
            q(J, O ? O.concat(X) : [X]);
        }),
        R.pop());
    }
  }
  if (!P.isObject(l)) throw new TypeError("data must be an object");
  return (q(l), i);
}
function ef(l) {
  const i = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(l).replace(/[!'()~]|%20|%00/g, function (a) {
    return i[a];
  });
}
function Mu(l, i) {
  ((this._pairs = []), l && xo(l, this, i));
}
const $f = Mu.prototype;
$f.append = function (i, u) {
  this._pairs.push([i, u]);
};
$f.toString = function (i) {
  const u = i
    ? function (a) {
        return i.call(this, a, ef);
      }
    : ef;
  return this._pairs
    .map(function (c) {
      return u(c[0]) + "=" + u(c[1]);
    }, "")
    .join("&");
};
function rv(l) {
  return encodeURIComponent(l)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+");
}
function Hf(l, i, u) {
  if (!i) return l;
  const a = (u && u.encode) || rv;
  P.isFunction(u) && (u = { serialize: u });
  const c = u && u.serialize;
  let d;
  if (
    (c
      ? (d = c(i, u))
      : (d = P.isURLSearchParams(i) ? i.toString() : new Mu(i, u).toString(a)),
    d)
  ) {
    const p = l.indexOf("#");
    (p !== -1 && (l = l.slice(0, p)),
      (l += (l.indexOf("?") === -1 ? "?" : "&") + d));
  }
  return l;
}
class tf {
  constructor() {
    this.handlers = [];
  }
  use(i, u, a) {
    return (
      this.handlers.push({
        fulfilled: i,
        rejected: u,
        synchronous: a ? a.synchronous : !1,
        runWhen: a ? a.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(i) {
    this.handlers[i] && (this.handlers[i] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(i) {
    P.forEach(this.handlers, function (a) {
      a !== null && i(a);
    });
  }
}
const Vf = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  lv = typeof URLSearchParams < "u" ? URLSearchParams : Mu,
  ov = typeof FormData < "u" ? FormData : null,
  iv = typeof Blob < "u" ? Blob : null,
  uv = {
    isBrowser: !0,
    classes: { URLSearchParams: lv, FormData: ov, Blob: iv },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  Bu = typeof window < "u" && typeof document < "u",
  ju = (typeof navigator == "object" && navigator) || void 0,
  sv =
    Bu &&
    (!ju || ["ReactNative", "NativeScript", "NS"].indexOf(ju.product) < 0),
  av =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  cv = (Bu && window.location.href) || "http://localhost",
  fv = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: Bu,
        hasStandardBrowserEnv: sv,
        hasStandardBrowserWebWorkerEnv: av,
        navigator: ju,
        origin: cv,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  We = { ...fv, ...uv };
function dv(l, i) {
  return xo(l, new We.classes.URLSearchParams(), {
    visitor: function (u, a, c, d) {
      return We.isNode && P.isBuffer(u)
        ? (this.append(a, u.toString("base64")), !1)
        : d.defaultVisitor.apply(this, arguments);
    },
    ...i,
  });
}
function pv(l) {
  return P.matchAll(/\w+|\[(\w*)]/g, l).map((i) =>
    i[0] === "[]" ? "" : i[1] || i[0],
  );
}
function hv(l) {
  const i = {},
    u = Object.keys(l);
  let a;
  const c = u.length;
  let d;
  for (a = 0; a < c; a++) ((d = u[a]), (i[d] = l[d]));
  return i;
}
function Wf(l) {
  function i(u, a, c, d) {
    let p = u[d++];
    if (p === "__proto__") return !0;
    const v = Number.isFinite(+p),
      w = d >= u.length;
    return (
      (p = !p && P.isArray(c) ? c.length : p),
      w
        ? (P.hasOwnProp(c, p) ? (c[p] = [c[p], a]) : (c[p] = a), !v)
        : ((!c[p] || !P.isObject(c[p])) && (c[p] = []),
          i(u, a, c[p], d) && P.isArray(c[p]) && (c[p] = hv(c[p])),
          !v)
    );
  }
  if (P.isFormData(l) && P.isFunction(l.entries)) {
    const u = {};
    return (
      P.forEachEntry(l, (a, c) => {
        i(pv(a), c, u, 0);
      }),
      u
    );
  }
  return null;
}
function mv(l, i, u) {
  if (P.isString(l))
    try {
      return ((i || JSON.parse)(l), P.trim(l));
    } catch (a) {
      if (a.name !== "SyntaxError") throw a;
    }
  return (u || JSON.stringify)(l);
}
const Yr = {
  transitional: Vf,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (i, u) {
      const a = u.getContentType() || "",
        c = a.indexOf("application/json") > -1,
        d = P.isObject(i);
      if ((d && P.isHTMLForm(i) && (i = new FormData(i)), P.isFormData(i)))
        return c ? JSON.stringify(Wf(i)) : i;
      if (
        P.isArrayBuffer(i) ||
        P.isBuffer(i) ||
        P.isStream(i) ||
        P.isFile(i) ||
        P.isBlob(i) ||
        P.isReadableStream(i)
      )
        return i;
      if (P.isArrayBufferView(i)) return i.buffer;
      if (P.isURLSearchParams(i))
        return (
          u.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1,
          ),
          i.toString()
        );
      let v;
      if (d) {
        if (a.indexOf("application/x-www-form-urlencoded") > -1)
          return dv(i, this.formSerializer).toString();
        if ((v = P.isFileList(i)) || a.indexOf("multipart/form-data") > -1) {
          const w = this.env && this.env.FormData;
          return xo(
            v ? { "files[]": i } : i,
            w && new w(),
            this.formSerializer,
          );
        }
      }
      return d || c ? (u.setContentType("application/json", !1), mv(i)) : i;
    },
  ],
  transformResponse: [
    function (i) {
      const u = this.transitional || Yr.transitional,
        a = u && u.forcedJSONParsing,
        c = this.responseType === "json";
      if (P.isResponse(i) || P.isReadableStream(i)) return i;
      if (i && P.isString(i) && ((a && !this.responseType) || c)) {
        const p = !(u && u.silentJSONParsing) && c;
        try {
          return JSON.parse(i, this.parseReviver);
        } catch (v) {
          if (p)
            throw v.name === "SyntaxError"
              ? ne.from(v, ne.ERR_BAD_RESPONSE, this, null, this.response)
              : v;
        }
      }
      return i;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: We.classes.FormData, Blob: We.classes.Blob },
  validateStatus: function (i) {
    return i >= 200 && i < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
P.forEach(["delete", "get", "head", "post", "put", "patch"], (l) => {
  Yr.headers[l] = {};
});
const vv = P.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  yv = (l) => {
    const i = {};
    let u, a, c;
    return (
      l &&
        l
          .split(
            `
`,
          )
          .forEach(function (p) {
            ((c = p.indexOf(":")),
              (u = p.substring(0, c).trim().toLowerCase()),
              (a = p.substring(c + 1).trim()),
              !(!u || (i[u] && vv[u])) &&
                (u === "set-cookie"
                  ? i[u]
                    ? i[u].push(a)
                    : (i[u] = [a])
                  : (i[u] = i[u] ? i[u] + ", " + a : a)));
          }),
      i
    );
  },
  nf = Symbol("internals");
function Hr(l) {
  return l && String(l).trim().toLowerCase();
}
function co(l) {
  return l === !1 || l == null ? l : P.isArray(l) ? l.map(co) : String(l);
}
function gv(l) {
  const i = Object.create(null),
    u = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let a;
  for (; (a = u.exec(l)); ) i[a[1]] = a[2];
  return i;
}
const wv = (l) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(l.trim());
function ku(l, i, u, a, c) {
  if (P.isFunction(a)) return a.call(this, i, u);
  if ((c && (i = u), !!P.isString(i))) {
    if (P.isString(a)) return i.indexOf(a) !== -1;
    if (P.isRegExp(a)) return a.test(i);
  }
}
function Sv(l) {
  return l
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (i, u, a) => u.toUpperCase() + a);
}
function Ev(l, i) {
  const u = P.toCamelCase(" " + i);
  ["get", "set", "has"].forEach((a) => {
    Object.defineProperty(l, a + u, {
      value: function (c, d, p) {
        return this[a].call(this, i, c, d, p);
      },
      configurable: !0,
    });
  });
}
let nt = class {
  constructor(i) {
    i && this.set(i);
  }
  set(i, u, a) {
    const c = this;
    function d(v, w, x) {
      const S = Hr(w);
      if (!S) throw new Error("header name must be a non-empty string");
      const R = P.findKey(c, S);
      (!R || c[R] === void 0 || x === !0 || (x === void 0 && c[R] !== !1)) &&
        (c[R || w] = co(v));
    }
    const p = (v, w) => P.forEach(v, (x, S) => d(x, S, w));
    if (P.isPlainObject(i) || i instanceof this.constructor) p(i, u);
    else if (P.isString(i) && (i = i.trim()) && !wv(i)) p(yv(i), u);
    else if (P.isObject(i) && P.isIterable(i)) {
      let v = {},
        w,
        x;
      for (const S of i) {
        if (!P.isArray(S))
          throw TypeError("Object iterator must return a key-value pair");
        v[(x = S[0])] = (w = v[x])
          ? P.isArray(w)
            ? [...w, S[1]]
            : [w, S[1]]
          : S[1];
      }
      p(v, u);
    } else i != null && d(u, i, a);
    return this;
  }
  get(i, u) {
    if (((i = Hr(i)), i)) {
      const a = P.findKey(this, i);
      if (a) {
        const c = this[a];
        if (!u) return c;
        if (u === !0) return gv(c);
        if (P.isFunction(u)) return u.call(this, c, a);
        if (P.isRegExp(u)) return u.exec(c);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(i, u) {
    if (((i = Hr(i)), i)) {
      const a = P.findKey(this, i);
      return !!(a && this[a] !== void 0 && (!u || ku(this, this[a], a, u)));
    }
    return !1;
  }
  delete(i, u) {
    const a = this;
    let c = !1;
    function d(p) {
      if (((p = Hr(p)), p)) {
        const v = P.findKey(a, p);
        v && (!u || ku(a, a[v], v, u)) && (delete a[v], (c = !0));
      }
    }
    return (P.isArray(i) ? i.forEach(d) : d(i), c);
  }
  clear(i) {
    const u = Object.keys(this);
    let a = u.length,
      c = !1;
    for (; a--; ) {
      const d = u[a];
      (!i || ku(this, this[d], d, i, !0)) && (delete this[d], (c = !0));
    }
    return c;
  }
  normalize(i) {
    const u = this,
      a = {};
    return (
      P.forEach(this, (c, d) => {
        const p = P.findKey(a, d);
        if (p) {
          ((u[p] = co(c)), delete u[d]);
          return;
        }
        const v = i ? Sv(d) : String(d).trim();
        (v !== d && delete u[d], (u[v] = co(c)), (a[v] = !0));
      }),
      this
    );
  }
  concat(...i) {
    return this.constructor.concat(this, ...i);
  }
  toJSON(i) {
    const u = Object.create(null);
    return (
      P.forEach(this, (a, c) => {
        a != null && a !== !1 && (u[c] = i && P.isArray(a) ? a.join(", ") : a);
      }),
      u
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([i, u]) => i + ": " + u).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(i) {
    return i instanceof this ? i : new this(i);
  }
  static concat(i, ...u) {
    const a = new this(i);
    return (u.forEach((c) => a.set(c)), a);
  }
  static accessor(i) {
    const a = (this[nf] = this[nf] = { accessors: {} }).accessors,
      c = this.prototype;
    function d(p) {
      const v = Hr(p);
      a[v] || (Ev(c, p), (a[v] = !0));
    }
    return (P.isArray(i) ? i.forEach(d) : d(i), this);
  }
};
nt.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
P.reduceDescriptors(nt.prototype, ({ value: l }, i) => {
  let u = i[0].toUpperCase() + i.slice(1);
  return {
    get: () => l,
    set(a) {
      this[u] = a;
    },
  };
});
P.freezeMethods(nt);
function Cu(l, i) {
  const u = this || Yr,
    a = i || u,
    c = nt.from(a.headers);
  let d = a.data;
  return (
    P.forEach(l, function (v) {
      d = v.call(u, d, c.normalize(), i ? i.status : void 0);
    }),
    c.normalize(),
    d
  );
}
function Qf(l) {
  return !!(l && l.__CANCEL__);
}
function tr(l, i, u) {
  (ne.call(this, l ?? "canceled", ne.ERR_CANCELED, i, u),
    (this.name = "CanceledError"));
}
P.inherits(tr, ne, { __CANCEL__: !0 });
function Kf(l, i, u) {
  const a = u.config.validateStatus;
  !u.status || !a || a(u.status)
    ? l(u)
    : i(
        new ne(
          "Request failed with status code " + u.status,
          [ne.ERR_BAD_REQUEST, ne.ERR_BAD_RESPONSE][
            Math.floor(u.status / 100) - 4
          ],
          u.config,
          u.request,
          u,
        ),
      );
}
function xv(l) {
  const i = /^([-+\w]{1,25})(:?\/\/|:)/.exec(l);
  return (i && i[1]) || "";
}
function kv(l, i) {
  l = l || 10;
  const u = new Array(l),
    a = new Array(l);
  let c = 0,
    d = 0,
    p;
  return (
    (i = i !== void 0 ? i : 1e3),
    function (w) {
      const x = Date.now(),
        S = a[d];
      (p || (p = x), (u[c] = w), (a[c] = x));
      let R = d,
        D = 0;
      for (; R !== c; ) ((D += u[R++]), (R = R % l));
      if (((c = (c + 1) % l), c === d && (d = (d + 1) % l), x - p < i)) return;
      const q = S && x - S;
      return q ? Math.round((D * 1e3) / q) : void 0;
    }
  );
}
function Cv(l, i) {
  let u = 0,
    a = 1e3 / i,
    c,
    d;
  const p = (x, S = Date.now()) => {
    ((u = S), (c = null), d && (clearTimeout(d), (d = null)), l(...x));
  };
  return [
    (...x) => {
      const S = Date.now(),
        R = S - u;
      R >= a
        ? p(x, S)
        : ((c = x),
          d ||
            (d = setTimeout(() => {
              ((d = null), p(c));
            }, a - R)));
    },
    () => c && p(c),
  ];
}
const mo = (l, i, u = 3) => {
    let a = 0;
    const c = kv(50, 250);
    return Cv((d) => {
      const p = d.loaded,
        v = d.lengthComputable ? d.total : void 0,
        w = p - a,
        x = c(w),
        S = p <= v;
      a = p;
      const R = {
        loaded: p,
        total: v,
        progress: v ? p / v : void 0,
        bytes: w,
        rate: x || void 0,
        estimated: x && v && S ? (v - p) / x : void 0,
        event: d,
        lengthComputable: v != null,
        [i ? "download" : "upload"]: !0,
      };
      l(R);
    }, u);
  },
  rf = (l, i) => {
    const u = l != null;
    return [(a) => i[0]({ lengthComputable: u, total: l, loaded: a }), i[1]];
  },
  lf =
    (l) =>
    (...i) =>
      P.asap(() => l(...i)),
  Rv = We.hasStandardBrowserEnv
    ? ((l, i) => (u) => (
        (u = new URL(u, We.origin)),
        l.protocol === u.protocol &&
          l.host === u.host &&
          (i || l.port === u.port)
      ))(
        new URL(We.origin),
        We.navigator && /(msie|trident)/i.test(We.navigator.userAgent),
      )
    : () => !0,
  Pv = We.hasStandardBrowserEnv
    ? {
        write(l, i, u, a, c, d) {
          const p = [l + "=" + encodeURIComponent(i)];
          (P.isNumber(u) && p.push("expires=" + new Date(u).toGMTString()),
            P.isString(a) && p.push("path=" + a),
            P.isString(c) && p.push("domain=" + c),
            d === !0 && p.push("secure"),
            (document.cookie = p.join("; ")));
        },
        read(l) {
          const i = document.cookie.match(
            new RegExp("(^|;\\s*)(" + l + ")=([^;]*)"),
          );
          return i ? decodeURIComponent(i[3]) : null;
        },
        remove(l) {
          this.write(l, "", Date.now() - 864e5);
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function _v(l) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(l);
}
function Nv(l, i) {
  return i ? l.replace(/\/?\/$/, "") + "/" + i.replace(/^\/+/, "") : l;
}
function qf(l, i, u) {
  let a = !_v(i);
  return l && (a || u == !1) ? Nv(l, i) : i;
}
const of = (l) => (l instanceof nt ? { ...l } : l);
function kn(l, i) {
  i = i || {};
  const u = {};
  function a(x, S, R, D) {
    return P.isPlainObject(x) && P.isPlainObject(S)
      ? P.merge.call({ caseless: D }, x, S)
      : P.isPlainObject(S)
        ? P.merge({}, S)
        : P.isArray(S)
          ? S.slice()
          : S;
  }
  function c(x, S, R, D) {
    if (P.isUndefined(S)) {
      if (!P.isUndefined(x)) return a(void 0, x, R, D);
    } else return a(x, S, R, D);
  }
  function d(x, S) {
    if (!P.isUndefined(S)) return a(void 0, S);
  }
  function p(x, S) {
    if (P.isUndefined(S)) {
      if (!P.isUndefined(x)) return a(void 0, x);
    } else return a(void 0, S);
  }
  function v(x, S, R) {
    if (R in i) return a(x, S);
    if (R in l) return a(void 0, x);
  }
  const w = {
    url: d,
    method: d,
    data: d,
    baseURL: p,
    transformRequest: p,
    transformResponse: p,
    paramsSerializer: p,
    timeout: p,
    timeoutMessage: p,
    withCredentials: p,
    withXSRFToken: p,
    adapter: p,
    responseType: p,
    xsrfCookieName: p,
    xsrfHeaderName: p,
    onUploadProgress: p,
    onDownloadProgress: p,
    decompress: p,
    maxContentLength: p,
    maxBodyLength: p,
    beforeRedirect: p,
    transport: p,
    httpAgent: p,
    httpsAgent: p,
    cancelToken: p,
    socketPath: p,
    responseEncoding: p,
    validateStatus: v,
    headers: (x, S, R) => c(of(x), of(S), R, !0),
  };
  return (
    P.forEach(Object.keys({ ...l, ...i }), function (S) {
      const R = w[S] || c,
        D = R(l[S], i[S], S);
      (P.isUndefined(D) && R !== v) || (u[S] = D);
    }),
    u
  );
}
const Jf = (l) => {
    const i = kn({}, l);
    let {
      data: u,
      withXSRFToken: a,
      xsrfHeaderName: c,
      xsrfCookieName: d,
      headers: p,
      auth: v,
    } = i;
    if (
      ((i.headers = p = nt.from(p)),
      (i.url = Hf(
        qf(i.baseURL, i.url, i.allowAbsoluteUrls),
        l.params,
        l.paramsSerializer,
      )),
      v &&
        p.set(
          "Authorization",
          "Basic " +
            btoa(
              (v.username || "") +
                ":" +
                (v.password ? unescape(encodeURIComponent(v.password)) : ""),
            ),
        ),
      P.isFormData(u))
    ) {
      if (We.hasStandardBrowserEnv || We.hasStandardBrowserWebWorkerEnv)
        p.setContentType(void 0);
      else if (P.isFunction(u.getHeaders)) {
        const w = u.getHeaders(),
          x = ["content-type", "content-length"];
        Object.entries(w).forEach(([S, R]) => {
          x.includes(S.toLowerCase()) && p.set(S, R);
        });
      }
    }
    if (
      We.hasStandardBrowserEnv &&
      (a && P.isFunction(a) && (a = a(i)), a || (a !== !1 && Rv(i.url)))
    ) {
      const w = c && d && Pv.read(d);
      w && p.set(c, w);
    }
    return i;
  },
  Tv = typeof XMLHttpRequest < "u",
  Ov =
    Tv &&
    function (l) {
      return new Promise(function (u, a) {
        const c = Jf(l);
        let d = c.data;
        const p = nt.from(c.headers).normalize();
        let { responseType: v, onUploadProgress: w, onDownloadProgress: x } = c,
          S,
          R,
          D,
          q,
          N;
        function O() {
          (q && q(),
            N && N(),
            c.cancelToken && c.cancelToken.unsubscribe(S),
            c.signal && c.signal.removeEventListener("abort", S));
        }
        let _ = new XMLHttpRequest();
        (_.open(c.method.toUpperCase(), c.url, !0), (_.timeout = c.timeout));
        function J() {
          if (!_) return;
          const K = nt.from(
              "getAllResponseHeaders" in _ && _.getAllResponseHeaders(),
            ),
            re = {
              data:
                !v || v === "text" || v === "json"
                  ? _.responseText
                  : _.response,
              status: _.status,
              statusText: _.statusText,
              headers: K,
              config: l,
              request: _,
            };
          (Kf(
            function (ae) {
              (u(ae), O());
            },
            function (ae) {
              (a(ae), O());
            },
            re,
          ),
            (_ = null));
        }
        ("onloadend" in _
          ? (_.onloadend = J)
          : (_.onreadystatechange = function () {
              !_ ||
                _.readyState !== 4 ||
                (_.status === 0 &&
                  !(_.responseURL && _.responseURL.indexOf("file:") === 0)) ||
                setTimeout(J);
            }),
          (_.onabort = function () {
            _ &&
              (a(new ne("Request aborted", ne.ECONNABORTED, l, _)), (_ = null));
          }),
          (_.onerror = function (A) {
            const re = A && A.message ? A.message : "Network Error",
              de = new ne(re, ne.ERR_NETWORK, l, _);
            ((de.event = A || null), a(de), (_ = null));
          }),
          (_.ontimeout = function () {
            let A = c.timeout
              ? "timeout of " + c.timeout + "ms exceeded"
              : "timeout exceeded";
            const re = c.transitional || Vf;
            (c.timeoutErrorMessage && (A = c.timeoutErrorMessage),
              a(
                new ne(
                  A,
                  re.clarifyTimeoutError ? ne.ETIMEDOUT : ne.ECONNABORTED,
                  l,
                  _,
                ),
              ),
              (_ = null));
          }),
          d === void 0 && p.setContentType(null),
          "setRequestHeader" in _ &&
            P.forEach(p.toJSON(), function (A, re) {
              _.setRequestHeader(re, A);
            }),
          P.isUndefined(c.withCredentials) ||
            (_.withCredentials = !!c.withCredentials),
          v && v !== "json" && (_.responseType = c.responseType),
          x && (([D, N] = mo(x, !0)), _.addEventListener("progress", D)),
          w &&
            _.upload &&
            (([R, q] = mo(w)),
            _.upload.addEventListener("progress", R),
            _.upload.addEventListener("loadend", q)),
          (c.cancelToken || c.signal) &&
            ((S = (K) => {
              _ &&
                (a(!K || K.type ? new tr(null, l, _) : K),
                _.abort(),
                (_ = null));
            }),
            c.cancelToken && c.cancelToken.subscribe(S),
            c.signal &&
              (c.signal.aborted
                ? S()
                : c.signal.addEventListener("abort", S))));
        const X = xv(c.url);
        if (X && We.protocols.indexOf(X) === -1) {
          a(new ne("Unsupported protocol " + X + ":", ne.ERR_BAD_REQUEST, l));
          return;
        }
        _.send(d || null);
      });
    },
  Lv = (l, i) => {
    const { length: u } = (l = l ? l.filter(Boolean) : []);
    if (i || u) {
      let a = new AbortController(),
        c;
      const d = function (x) {
        if (!c) {
          ((c = !0), v());
          const S = x instanceof Error ? x : this.reason;
          a.abort(
            S instanceof ne ? S : new tr(S instanceof Error ? S.message : S),
          );
        }
      };
      let p =
        i &&
        setTimeout(() => {
          ((p = null), d(new ne(`timeout ${i} of ms exceeded`, ne.ETIMEDOUT)));
        }, i);
      const v = () => {
        l &&
          (p && clearTimeout(p),
          (p = null),
          l.forEach((x) => {
            x.unsubscribe
              ? x.unsubscribe(d)
              : x.removeEventListener("abort", d);
          }),
          (l = null));
      };
      l.forEach((x) => x.addEventListener("abort", d));
      const { signal: w } = a;
      return ((w.unsubscribe = () => P.asap(v)), w);
    }
  },
  jv = function* (l, i) {
    let u = l.byteLength;
    if (u < i) {
      yield l;
      return;
    }
    let a = 0,
      c;
    for (; a < u; ) ((c = a + i), yield l.slice(a, c), (a = c));
  },
  zv = async function* (l, i) {
    for await (const u of Fv(l)) yield* jv(u, i);
  },
  Fv = async function* (l) {
    if (l[Symbol.asyncIterator]) {
      yield* l;
      return;
    }
    const i = l.getReader();
    try {
      for (;;) {
        const { done: u, value: a } = await i.read();
        if (u) break;
        yield a;
      }
    } finally {
      await i.cancel();
    }
  },
  uf = (l, i, u, a) => {
    const c = zv(l, i);
    let d = 0,
      p,
      v = (w) => {
        p || ((p = !0), a && a(w));
      };
    return new ReadableStream(
      {
        async pull(w) {
          try {
            const { done: x, value: S } = await c.next();
            if (x) {
              (v(), w.close());
              return;
            }
            let R = S.byteLength;
            if (u) {
              let D = (d += R);
              u(D);
            }
            w.enqueue(new Uint8Array(S));
          } catch (x) {
            throw (v(x), x);
          }
        },
        cancel(w) {
          return (v(w), c.return());
        },
      },
      { highWaterMark: 2 },
    );
  },
  sf = 64 * 1024,
  { isFunction: so } = P,
  Dv = (({ Request: l, Response: i }) => ({ Request: l, Response: i }))(
    P.global,
  ),
  { ReadableStream: af, TextEncoder: cf } = P.global,
  ff = (l, ...i) => {
    try {
      return !!l(...i);
    } catch {
      return !1;
    }
  },
  Uv = (l) => {
    l = P.merge.call({ skipUndefined: !0 }, Dv, l);
    const { fetch: i, Request: u, Response: a } = l,
      c = i ? so(i) : typeof fetch == "function",
      d = so(u),
      p = so(a);
    if (!c) return !1;
    const v = c && so(af),
      w =
        c &&
        (typeof cf == "function"
          ? (
              (N) => (O) =>
                N.encode(O)
            )(new cf())
          : async (N) => new Uint8Array(await new u(N).arrayBuffer())),
      x =
        d &&
        v &&
        ff(() => {
          let N = !1;
          const O = new u(We.origin, {
            body: new af(),
            method: "POST",
            get duplex() {
              return ((N = !0), "half");
            },
          }).headers.has("Content-Type");
          return N && !O;
        }),
      S = p && v && ff(() => P.isReadableStream(new a("").body)),
      R = { stream: S && ((N) => N.body) };
    c &&
      ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((N) => {
        !R[N] &&
          (R[N] = (O, _) => {
            let J = O && O[N];
            if (J) return J.call(O);
            throw new ne(
              `Response type '${N}' is not supported`,
              ne.ERR_NOT_SUPPORT,
              _,
            );
          });
      });
    const D = async (N) => {
        if (N == null) return 0;
        if (P.isBlob(N)) return N.size;
        if (P.isSpecCompliantForm(N))
          return (
            await new u(We.origin, { method: "POST", body: N }).arrayBuffer()
          ).byteLength;
        if (P.isArrayBufferView(N) || P.isArrayBuffer(N)) return N.byteLength;
        if ((P.isURLSearchParams(N) && (N = N + ""), P.isString(N)))
          return (await w(N)).byteLength;
      },
      q = async (N, O) => {
        const _ = P.toFiniteNumber(N.getContentLength());
        return _ ?? D(O);
      };
    return async (N) => {
      let {
          url: O,
          method: _,
          data: J,
          signal: X,
          cancelToken: K,
          timeout: A,
          onDownloadProgress: re,
          onUploadProgress: de,
          responseType: ae,
          headers: Ne,
          withCredentials: Qe = "same-origin",
          fetchOptions: Me,
        } = Jf(N),
        at = i || fetch;
      ae = ae ? (ae + "").toLowerCase() : "text";
      let Ke = Lv([X, K && K.toAbortSignal()], A),
        Oe = null;
      const Le =
        Ke &&
        Ke.unsubscribe &&
        (() => {
          Ke.unsubscribe();
        });
      let rt;
      try {
        if (
          de &&
          x &&
          _ !== "get" &&
          _ !== "head" &&
          (rt = await q(Ne, J)) !== 0
        ) {
          let g = new u(O, { method: "POST", body: J, duplex: "half" }),
            T;
          if (
            (P.isFormData(J) &&
              (T = g.headers.get("content-type")) &&
              Ne.setContentType(T),
            g.body)
          ) {
            const [ee, te] = rf(rt, mo(lf(de)));
            J = uf(g.body, sf, ee, te);
          }
        }
        P.isString(Qe) || (Qe = Qe ? "include" : "omit");
        const me = d && "credentials" in u.prototype,
          ve = {
            ...Me,
            signal: Ke,
            method: _.toUpperCase(),
            headers: Ne.normalize().toJSON(),
            body: J,
            duplex: "half",
            credentials: me ? Qe : void 0,
          };
        Oe = d && new u(O, ve);
        let I = await (d ? at(Oe, Me) : at(O, ve));
        const Y = S && (ae === "stream" || ae === "response");
        if (S && (re || (Y && Le))) {
          const g = {};
          ["status", "statusText", "headers"].forEach((oe) => {
            g[oe] = I[oe];
          });
          const T = P.toFiniteNumber(I.headers.get("content-length")),
            [ee, te] = (re && rf(T, mo(lf(re), !0))) || [];
          I = new a(
            uf(I.body, sf, ee, () => {
              (te && te(), Le && Le());
            }),
            g,
          );
        }
        ae = ae || "text";
        let $ = await R[P.findKey(R, ae) || "text"](I, N);
        return (
          !Y && Le && Le(),
          await new Promise((g, T) => {
            Kf(g, T, {
              data: $,
              headers: nt.from(I.headers),
              status: I.status,
              statusText: I.statusText,
              config: N,
              request: Oe,
            });
          })
        );
      } catch (me) {
        throw (
          Le && Le(),
          me && me.name === "TypeError" && /Load failed|fetch/i.test(me.message)
            ? Object.assign(new ne("Network Error", ne.ERR_NETWORK, N, Oe), {
                cause: me.cause || me,
              })
            : ne.from(me, me && me.code, N, Oe)
        );
      }
    };
  },
  Av = new Map(),
  Xf = (l) => {
    let i = l ? l.env : {};
    const { fetch: u, Request: a, Response: c } = i,
      d = [a, c, u];
    let p = d.length,
      v = p,
      w,
      x,
      S = Av;
    for (; v--; )
      ((w = d[v]),
        (x = S.get(w)),
        x === void 0 && S.set(w, (x = v ? new Map() : Uv(i))),
        (S = x));
    return x;
  };
Xf();
const zu = { http: ev, xhr: Ov, fetch: { get: Xf } };
P.forEach(zu, (l, i) => {
  if (l) {
    try {
      Object.defineProperty(l, "name", { value: i });
    } catch {}
    Object.defineProperty(l, "adapterName", { value: i });
  }
});
const df = (l) => `- ${l}`,
  Iv = (l) => P.isFunction(l) || l === null || l === !1,
  Yf = {
    getAdapter: (l, i) => {
      l = P.isArray(l) ? l : [l];
      const { length: u } = l;
      let a, c;
      const d = {};
      for (let p = 0; p < u; p++) {
        a = l[p];
        let v;
        if (
          ((c = a),
          !Iv(a) && ((c = zu[(v = String(a)).toLowerCase()]), c === void 0))
        )
          throw new ne(`Unknown adapter '${v}'`);
        if (c && (P.isFunction(c) || (c = c.get(i)))) break;
        d[v || "#" + p] = c;
      }
      if (!c) {
        const p = Object.entries(d).map(
          ([w, x]) =>
            `adapter ${w} ` +
            (x === !1
              ? "is not supported by the environment"
              : "is not available in the build"),
        );
        let v = u
          ? p.length > 1
            ? `since :
` +
              p.map(df).join(`
`)
            : " " + df(p[0])
          : "as no adapter specified";
        throw new ne(
          "There is no suitable adapter to dispatch the request " + v,
          "ERR_NOT_SUPPORT",
        );
      }
      return c;
    },
    adapters: zu,
  };
function Ru(l) {
  if (
    (l.cancelToken && l.cancelToken.throwIfRequested(),
    l.signal && l.signal.aborted)
  )
    throw new tr(null, l);
}
function pf(l) {
  return (
    Ru(l),
    (l.headers = nt.from(l.headers)),
    (l.data = Cu.call(l, l.transformRequest)),
    ["post", "put", "patch"].indexOf(l.method) !== -1 &&
      l.headers.setContentType("application/x-www-form-urlencoded", !1),
    Yf.getAdapter(
      l.adapter || Yr.adapter,
      l,
    )(l).then(
      function (a) {
        return (
          Ru(l),
          (a.data = Cu.call(l, l.transformResponse, a)),
          (a.headers = nt.from(a.headers)),
          a
        );
      },
      function (a) {
        return (
          Qf(a) ||
            (Ru(l),
            a &&
              a.response &&
              ((a.response.data = Cu.call(l, l.transformResponse, a.response)),
              (a.response.headers = nt.from(a.response.headers)))),
          Promise.reject(a)
        );
      },
    )
  );
}
const Gf = "1.12.2",
  ko = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (l, i) => {
    ko[l] = function (a) {
      return typeof a === l || "a" + (i < 1 ? "n " : " ") + l;
    };
  },
);
const hf = {};
ko.transitional = function (i, u, a) {
  function c(d, p) {
    return (
      "[Axios v" +
      Gf +
      "] Transitional option '" +
      d +
      "'" +
      p +
      (a ? ". " + a : "")
    );
  }
  return (d, p, v) => {
    if (i === !1)
      throw new ne(
        c(p, " has been removed" + (u ? " in " + u : "")),
        ne.ERR_DEPRECATED,
      );
    return (
      u &&
        !hf[p] &&
        ((hf[p] = !0),
        console.warn(
          c(
            p,
            " has been deprecated since v" +
              u +
              " and will be removed in the near future",
          ),
        )),
      i ? i(d, p, v) : !0
    );
  };
};
ko.spelling = function (i) {
  return (u, a) => (console.warn(`${a} is likely a misspelling of ${i}`), !0);
};
function Mv(l, i, u) {
  if (typeof l != "object")
    throw new ne("options must be an object", ne.ERR_BAD_OPTION_VALUE);
  const a = Object.keys(l);
  let c = a.length;
  for (; c-- > 0; ) {
    const d = a[c],
      p = i[d];
    if (p) {
      const v = l[d],
        w = v === void 0 || p(v, d, l);
      if (w !== !0)
        throw new ne("option " + d + " must be " + w, ne.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (u !== !0) throw new ne("Unknown option " + d, ne.ERR_BAD_OPTION);
  }
}
const fo = { assertOptions: Mv, validators: ko },
  Tt = fo.validators;
let xn = class {
  constructor(i) {
    ((this.defaults = i || {}),
      (this.interceptors = { request: new tf(), response: new tf() }));
  }
  async request(i, u) {
    try {
      return await this._request(i, u);
    } catch (a) {
      if (a instanceof Error) {
        let c = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(c)
          : (c = new Error());
        const d = c.stack ? c.stack.replace(/^.+\n/, "") : "";
        try {
          a.stack
            ? d &&
              !String(a.stack).endsWith(d.replace(/^.+\n.+\n/, "")) &&
              (a.stack +=
                `
` + d)
            : (a.stack = d);
        } catch {}
      }
      throw a;
    }
  }
  _request(i, u) {
    (typeof i == "string" ? ((u = u || {}), (u.url = i)) : (u = i || {}),
      (u = kn(this.defaults, u)));
    const { transitional: a, paramsSerializer: c, headers: d } = u;
    (a !== void 0 &&
      fo.assertOptions(
        a,
        {
          silentJSONParsing: Tt.transitional(Tt.boolean),
          forcedJSONParsing: Tt.transitional(Tt.boolean),
          clarifyTimeoutError: Tt.transitional(Tt.boolean),
        },
        !1,
      ),
      c != null &&
        (P.isFunction(c)
          ? (u.paramsSerializer = { serialize: c })
          : fo.assertOptions(
              c,
              { encode: Tt.function, serialize: Tt.function },
              !0,
            )),
      u.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (u.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (u.allowAbsoluteUrls = !0)),
      fo.assertOptions(
        u,
        {
          baseUrl: Tt.spelling("baseURL"),
          withXsrfToken: Tt.spelling("withXSRFToken"),
        },
        !0,
      ),
      (u.method = (u.method || this.defaults.method || "get").toLowerCase()));
    let p = d && P.merge(d.common, d[u.method]);
    (d &&
      P.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (N) => {
          delete d[N];
        },
      ),
      (u.headers = nt.concat(p, d)));
    const v = [];
    let w = !0;
    this.interceptors.request.forEach(function (O) {
      (typeof O.runWhen == "function" && O.runWhen(u) === !1) ||
        ((w = w && O.synchronous), v.unshift(O.fulfilled, O.rejected));
    });
    const x = [];
    this.interceptors.response.forEach(function (O) {
      x.push(O.fulfilled, O.rejected);
    });
    let S,
      R = 0,
      D;
    if (!w) {
      const N = [pf.bind(this), void 0];
      for (
        N.unshift(...v), N.push(...x), D = N.length, S = Promise.resolve(u);
        R < D;

      )
        S = S.then(N[R++], N[R++]);
      return S;
    }
    D = v.length;
    let q = u;
    for (; R < D; ) {
      const N = v[R++],
        O = v[R++];
      try {
        q = N(q);
      } catch (_) {
        O.call(this, _);
        break;
      }
    }
    try {
      S = pf.call(this, q);
    } catch (N) {
      return Promise.reject(N);
    }
    for (R = 0, D = x.length; R < D; ) S = S.then(x[R++], x[R++]);
    return S;
  }
  getUri(i) {
    i = kn(this.defaults, i);
    const u = qf(i.baseURL, i.url, i.allowAbsoluteUrls);
    return Hf(u, i.params, i.paramsSerializer);
  }
};
P.forEach(["delete", "get", "head", "options"], function (i) {
  xn.prototype[i] = function (u, a) {
    return this.request(
      kn(a || {}, { method: i, url: u, data: (a || {}).data }),
    );
  };
});
P.forEach(["post", "put", "patch"], function (i) {
  function u(a) {
    return function (d, p, v) {
      return this.request(
        kn(v || {}, {
          method: i,
          headers: a ? { "Content-Type": "multipart/form-data" } : {},
          url: d,
          data: p,
        }),
      );
    };
  }
  ((xn.prototype[i] = u()), (xn.prototype[i + "Form"] = u(!0)));
});
let Bv = class Zf {
  constructor(i) {
    if (typeof i != "function")
      throw new TypeError("executor must be a function.");
    let u;
    this.promise = new Promise(function (d) {
      u = d;
    });
    const a = this;
    (this.promise.then((c) => {
      if (!a._listeners) return;
      let d = a._listeners.length;
      for (; d-- > 0; ) a._listeners[d](c);
      a._listeners = null;
    }),
      (this.promise.then = (c) => {
        let d;
        const p = new Promise((v) => {
          (a.subscribe(v), (d = v));
        }).then(c);
        return (
          (p.cancel = function () {
            a.unsubscribe(d);
          }),
          p
        );
      }),
      i(function (d, p, v) {
        a.reason || ((a.reason = new tr(d, p, v)), u(a.reason));
      }));
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(i) {
    if (this.reason) {
      i(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(i) : (this._listeners = [i]);
  }
  unsubscribe(i) {
    if (!this._listeners) return;
    const u = this._listeners.indexOf(i);
    u !== -1 && this._listeners.splice(u, 1);
  }
  toAbortSignal() {
    const i = new AbortController(),
      u = (a) => {
        i.abort(a);
      };
    return (
      this.subscribe(u),
      (i.signal.unsubscribe = () => this.unsubscribe(u)),
      i.signal
    );
  }
  static source() {
    let i;
    return {
      token: new Zf(function (c) {
        i = c;
      }),
      cancel: i,
    };
  }
};
function $v(l) {
  return function (u) {
    return l.apply(null, u);
  };
}
function Hv(l) {
  return P.isObject(l) && l.isAxiosError === !0;
}
const Fu = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(Fu).forEach(([l, i]) => {
  Fu[i] = l;
});
function bf(l) {
  const i = new xn(l),
    u = Of(xn.prototype.request, i);
  return (
    P.extend(u, xn.prototype, i, { allOwnKeys: !0 }),
    P.extend(u, i, null, { allOwnKeys: !0 }),
    (u.create = function (c) {
      return bf(kn(l, c));
    }),
    u
  );
}
const _e = bf(Yr);
_e.Axios = xn;
_e.CanceledError = tr;
_e.CancelToken = Bv;
_e.isCancel = Qf;
_e.VERSION = Gf;
_e.toFormData = xo;
_e.AxiosError = ne;
_e.Cancel = _e.CanceledError;
_e.all = function (i) {
  return Promise.all(i);
};
_e.spread = $v;
_e.isAxiosError = Hv;
_e.mergeConfig = kn;
_e.AxiosHeaders = nt;
_e.formToJSON = (l) => Wf(P.isHTMLForm(l) ? new FormData(l) : l);
_e.getAdapter = Yf.getAdapter;
_e.HttpStatusCode = Fu;
_e.default = _e;
const {
    Axios: Jv,
    AxiosError: Xv,
    CanceledError: Yv,
    isCancel: Gv,
    CancelToken: Zv,
    VERSION: bv,
    all: ey,
    Cancel: ty,
    isAxiosError: ny,
    spread: ry,
    toFormData: ly,
    AxiosHeaders: oy,
    HttpStatusCode: iy,
    formToJSON: uy,
    getAdapter: sy,
    mergeConfig: ay,
  } = _e,
  Wr = _e.create({ baseURL: "http://127.0.0.1:3030/api" });
function Vv() {
  const [l, i] = U.useState({
    pacientes: 0,
    evolucoes: 0,
    prescricoes: 0,
    consultasHoje: 0,
  });
  return (
    U.useEffect(() => {
      Wr.get("/stats").then((u) => i(u.data));
    }, []),
    B.jsxs("div", {
      className: "card",
      children: [
        B.jsx("h3", { children: "Dashboard" }),
        B.jsxs("div", {
          className: "row",
          children: [
            B.jsxs("div", {
              className: "card",
              children: [
                B.jsx("b", { children: l.pacientes }),
                B.jsx("div", { className: "muted", children: "Pacientes" }),
              ],
            }),
            B.jsxs("div", {
              className: "card",
              children: [
                B.jsx("b", { children: l.consultasHoje }),
                B.jsx("div", {
                  className: "muted",
                  children: "Consultas Hoje",
                }),
              ],
            }),
            B.jsxs("div", {
              className: "card",
              children: [
                B.jsx("b", { children: l.evolucoes }),
                B.jsx("div", { className: "muted", children: "Evoluções" }),
              ],
            }),
            B.jsxs("div", {
              className: "card",
              children: [
                B.jsx("b", { children: l.prescricoes }),
                B.jsx("div", { className: "muted", children: "Prescrições" }),
              ],
            }),
          ],
        }),
      ],
    })
  );
}
function Wv() {
  const [l, i] = U.useState(""),
    [u, a] = U.useState(null),
    [c, d] = U.useState([]),
    [p, v] = U.useState(""),
    [w, x] = U.useState("Evolução"),
    [S, R] = U.useState(""),
    [D, q] = U.useState([]),
    N = U.useRef(null);
  async function O() {
    if (!l) return;
    const A = await Wr.get(`/pacientes/${l}/evolucoes`);
    d(A.data.items || []);
  }
  (U.useEffect(() => {
    O();
  }, [l]),
    U.useEffect(() => {
      if (!S || S.length < 2) {
        q([]);
        return;
      }
      const A = setTimeout(async () => {
        try {
          const re = await Wr.get("/pacientes/quick", { params: { term: S } });
          q(re.data.items || []);
        } catch {}
      }, 250);
      return () => clearTimeout(A);
    }, [S]));
  function _(A) {
    (a(A), i(A.id), R(A.nome), q([]), setTimeout(O, 0));
  }
  async function J() {
    if (!l) return alert("Selecione o paciente");
    if (!p.trim()) return alert("Texto vazio");
    (await Wr.post(`/pacientes/${l}/evolucoes`, { texto: p, tipo: w }),
      v(""),
      x("Evolução"),
      O());
  }
  async function X() {
    if (!l) return alert("Selecione o paciente");
    const re = (await Wr.get(`/pacientes/${l}/evolucoes/last`)).data.item;
    if (!re) return alert("Sem evolução anterior");
    v(
      (p
        ? p +
          `

`
        : "") +
        `[Cópia ${new Date(re.data).toLocaleString()}]
` +
        re.texto,
    );
  }
  async function K(A) {
    (v(A.texto), x(A.tipo || "Evolução"));
  }
  return B.jsxs("div", {
    className: "card",
    children: [
      B.jsx("h3", { children: "Prontuários / Evolução" }),
      B.jsxs("div", {
        className: "row",
        children: [
          B.jsxs("div", {
            className: "autocomplete",
            style: { flex: 2, minWidth: 280 },
            children: [
              B.jsx("input", {
                placeholder: "Buscar paciente (mín. 2 letras)",
                value: S,
                onChange: (A) => R(A.target.value),
              }),
              D.length > 0 &&
                B.jsx("div", {
                  className: "autocomplete-list",
                  children: D.map((A) =>
                    B.jsxs(
                      "div",
                      {
                        className: "autocomplete-item",
                        onClick: () => _(A),
                        children: [
                          B.jsxs("div", {
                            children: [
                              B.jsx("b", { children: A.nome }),
                              B.jsx("div", {
                                className: "muted",
                                children: A.nascimento,
                              }),
                            ],
                          }),
                          B.jsx("div", {
                            className: "muted",
                            children: A.doc || A.id,
                          }),
                        ],
                      },
                      A.id,
                    ),
                  ),
                }),
            ],
          }),
          B.jsx("input", {
            placeholder: "ID Paciente",
            value: l,
            onChange: (A) => i(A.target.value),
            style: { flex: 1 },
          }),
          B.jsxs("select", {
            value: w,
            onChange: (A) => x(A.target.value),
            children: [
              B.jsx("option", { children: "Evolução" }),
              B.jsx("option", { children: "Primeira Consulta Nefrológica" }),
              B.jsx("option", { children: "Hemodiálise" }),
              B.jsx("option", { children: "Intercorrência" }),
            ],
          }),
          B.jsx("button", {
            className: "btn btn-primary",
            onClick: J,
            children: "Finalizar",
          }),
          B.jsx("button", {
            className: "btn btn-ghost",
            onClick: X,
            children: "📋 Colar última",
          }),
        ],
      }),
      u &&
        B.jsxs("div", {
          style: { marginTop: 6 },
          className: "muted",
          children: [
            "Paciente: ",
            B.jsx("b", { children: u.nome }),
            " · Nasc.: ",
            u.nascimento,
            " · ID: ",
            u.id,
          ],
        }),
      B.jsxs("div", {
        className: "evo-grid",
        style: { marginTop: 12 },
        children: [
          B.jsxs("div", {
            className: "evo-historico",
            children: [
              B.jsx("div", {
                style: { fontWeight: 600, marginBottom: 8 },
                children: "Histórico",
              }),
              c.length === 0 &&
                B.jsx("div", {
                  className: "muted",
                  children: "Sem evoluções.",
                }),
              c.map((A) =>
                B.jsxs(
                  "div",
                  {
                    className: "item",
                    onClick: () => K(A),
                    children: [
                      B.jsx("div", {
                        style: { fontWeight: 600 },
                        children: new Date(A.data).toLocaleString(),
                      }),
                      B.jsx("div", {
                        className: "muted",
                        style: {
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        },
                        children: A.texto,
                      }),
                    ],
                  },
                  A.id,
                ),
              ),
            ],
          }),
          B.jsx("div", {
            children: B.jsx("div", {
              className: "evo-editor",
              children: B.jsx("textarea", {
                ref: N,
                value: p,
                onChange: (A) => v(A.target.value),
                placeholder:
                  "Escreva/cole a evolução (modelo SOAP recomendado)",
              }),
            }),
          }),
        ],
      }),
    ],
  });
}
function Qv() {
  return B.jsx(bh, {
    children: B.jsxs(Vr, {
      element: B.jsx(hm, {}),
      children: [
        B.jsx(Vr, { index: !0, element: B.jsx(Vv, {}) }),
        B.jsx(Vr, { path: "prontuarios", element: B.jsx(Wv, {}) }),
        B.jsx(Vr, { path: "*", element: B.jsx(Yh, { to: "/", replace: !0 }) }),
      ],
    }),
  });
}
ih.createRoot(document.getElementById("root")).render(
  B.jsx(vf.StrictMode, {
    children: B.jsx(um, { basename: "/app", children: B.jsx(Qv, {}) }),
  }),
);
