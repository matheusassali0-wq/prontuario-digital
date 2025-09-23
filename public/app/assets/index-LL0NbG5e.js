function jm(s, r) {
  for (var i = 0; i < r.length; i++) {
    const l = r[i];
    if (typeof l != "string" && !Array.isArray(l)) {
      for (const u in l)
        if (u !== "default" && !(u in s)) {
          const d = Object.getOwnPropertyDescriptor(l, u);
          d &&
            Object.defineProperty(
              s,
              u,
              d.get ? d : { enumerable: !0, get: () => l[u] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(s, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const r = document.createElement("link").relList;
  if (r && r.supports && r.supports("modulepreload")) return;
  for (const u of document.querySelectorAll('link[rel="modulepreload"]')) l(u);
  new MutationObserver((u) => {
    for (const d of u)
      if (d.type === "childList")
        for (const p of d.addedNodes)
          p.tagName === "LINK" && p.rel === "modulepreload" && l(p);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(u) {
    const d = {};
    return (
      u.integrity && (d.integrity = u.integrity),
      u.referrerPolicy && (d.referrerPolicy = u.referrerPolicy),
      u.crossOrigin === "use-credentials"
        ? (d.credentials = "include")
        : u.crossOrigin === "anonymous"
          ? (d.credentials = "omit")
          : (d.credentials = "same-origin"),
      d
    );
  }
  function l(u) {
    if (u.ep) return;
    u.ep = !0;
    const d = i(u);
    fetch(u.href, d);
  }
})();
function eu(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default")
    ? s.default
    : s;
}
var Eo = { exports: {} },
  Qs = {},
  No = { exports: {} },
  Ie = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Jd;
function Tm() {
  if (Jd) return Ie;
  Jd = 1;
  var s = Symbol.for("react.element"),
    r = Symbol.for("react.portal"),
    i = Symbol.for("react.fragment"),
    l = Symbol.for("react.strict_mode"),
    u = Symbol.for("react.profiler"),
    d = Symbol.for("react.provider"),
    p = Symbol.for("react.context"),
    m = Symbol.for("react.forward_ref"),
    x = Symbol.for("react.suspense"),
    w = Symbol.for("react.memo"),
    S = Symbol.for("react.lazy"),
    N = Symbol.iterator;
  function I(y) {
    return y === null || typeof y != "object"
      ? null
      : ((y = (N && y[N]) || y["@@iterator"]),
        typeof y == "function" ? y : null);
  }
  var Y = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    L = Object.assign,
    A = {};
  function D(y, O, fe) {
    ((this.props = y),
      (this.context = O),
      (this.refs = A),
      (this.updater = fe || Y));
  }
  ((D.prototype.isReactComponent = {}),
    (D.prototype.setState = function (y, O) {
      if (typeof y != "object" && typeof y != "function" && y != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, y, O, "setState");
    }),
    (D.prototype.forceUpdate = function (y) {
      this.updater.enqueueForceUpdate(this, y, "forceUpdate");
    }));
  function ge() {}
  ge.prototype = D.prototype;
  function B(y, O, fe) {
    ((this.props = y),
      (this.context = O),
      (this.refs = A),
      (this.updater = fe || Y));
  }
  var Q = (B.prototype = new ge());
  ((Q.constructor = B), L(Q, D.prototype), (Q.isPureReactComponent = !0));
  var X = Array.isArray,
    he = Object.prototype.hasOwnProperty,
    ie = { current: null },
    Te = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Pe(y, O, fe) {
    var me,
      we = {},
      Se = null,
      De = null;
    if (O != null)
      for (me in (O.ref !== void 0 && (De = O.ref),
      O.key !== void 0 && (Se = "" + O.key),
      O))
        he.call(O, me) && !Te.hasOwnProperty(me) && (we[me] = O[me]);
    var je = arguments.length - 2;
    if (je === 1) we.children = fe;
    else if (1 < je) {
      for (var be = Array(je), lt = 0; lt < je; lt++)
        be[lt] = arguments[lt + 2];
      we.children = be;
    }
    if (y && y.defaultProps)
      for (me in ((je = y.defaultProps), je))
        we[me] === void 0 && (we[me] = je[me]);
    return {
      $$typeof: s,
      type: y,
      key: Se,
      ref: De,
      props: we,
      _owner: ie.current,
    };
  }
  function Fe(y, O) {
    return {
      $$typeof: s,
      type: y.type,
      key: O,
      ref: y.ref,
      props: y.props,
      _owner: y._owner,
    };
  }
  function ne(y) {
    return typeof y == "object" && y !== null && y.$$typeof === s;
  }
  function xe(y) {
    var O = { "=": "=0", ":": "=2" };
    return (
      "$" +
      y.replace(/[=:]/g, function (fe) {
        return O[fe];
      })
    );
  }
  var G = /\/+/g;
  function H(y, O) {
    return typeof y == "object" && y !== null && y.key != null
      ? xe("" + y.key)
      : O.toString(36);
  }
  function ke(y, O, fe, me, we) {
    var Se = typeof y;
    (Se === "undefined" || Se === "boolean") && (y = null);
    var De = !1;
    if (y === null) De = !0;
    else
      switch (Se) {
        case "string":
        case "number":
          De = !0;
          break;
        case "object":
          switch (y.$$typeof) {
            case s:
            case r:
              De = !0;
          }
      }
    if (De)
      return (
        (De = y),
        (we = we(De)),
        (y = me === "" ? "." + H(De, 0) : me),
        X(we)
          ? ((fe = ""),
            y != null && (fe = y.replace(G, "$&/") + "/"),
            ke(we, O, fe, "", function (lt) {
              return lt;
            }))
          : we != null &&
            (ne(we) &&
              (we = Fe(
                we,
                fe +
                  (!we.key || (De && De.key === we.key)
                    ? ""
                    : ("" + we.key).replace(G, "$&/") + "/") +
                  y,
              )),
            O.push(we)),
        1
      );
    if (((De = 0), (me = me === "" ? "." : me + ":"), X(y)))
      for (var je = 0; je < y.length; je++) {
        Se = y[je];
        var be = me + H(Se, je);
        De += ke(Se, O, fe, be, we);
      }
    else if (((be = I(y)), typeof be == "function"))
      for (y = be.call(y), je = 0; !(Se = y.next()).done; )
        ((Se = Se.value),
          (be = me + H(Se, je++)),
          (De += ke(Se, O, fe, be, we)));
    else if (Se === "object")
      throw (
        (O = String(y)),
        Error(
          "Objects are not valid as a React child (found: " +
            (O === "[object Object]"
              ? "object with keys {" + Object.keys(y).join(", ") + "}"
              : O) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    return De;
  }
  function Le(y, O, fe) {
    if (y == null) return y;
    var me = [],
      we = 0;
    return (
      ke(y, me, "", "", function (Se) {
        return O.call(fe, Se, we++);
      }),
      me
    );
  }
  function Re(y) {
    if (y._status === -1) {
      var O = y._result;
      ((O = O()),
        O.then(
          function (fe) {
            (y._status === 0 || y._status === -1) &&
              ((y._status = 1), (y._result = fe));
          },
          function (fe) {
            (y._status === 0 || y._status === -1) &&
              ((y._status = 2), (y._result = fe));
          },
        ),
        y._status === -1 && ((y._status = 0), (y._result = O)));
    }
    if (y._status === 1) return y._result.default;
    throw y._result;
  }
  var Ce = { current: null },
    W = { transition: null },
    ae = {
      ReactCurrentDispatcher: Ce,
      ReactCurrentBatchConfig: W,
      ReactCurrentOwner: ie,
    };
  function K() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return (
    (Ie.Children = {
      map: Le,
      forEach: function (y, O, fe) {
        Le(
          y,
          function () {
            O.apply(this, arguments);
          },
          fe,
        );
      },
      count: function (y) {
        var O = 0;
        return (
          Le(y, function () {
            O++;
          }),
          O
        );
      },
      toArray: function (y) {
        return (
          Le(y, function (O) {
            return O;
          }) || []
        );
      },
      only: function (y) {
        if (!ne(y))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return y;
      },
    }),
    (Ie.Component = D),
    (Ie.Fragment = i),
    (Ie.Profiler = u),
    (Ie.PureComponent = B),
    (Ie.StrictMode = l),
    (Ie.Suspense = x),
    (Ie.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ae),
    (Ie.act = K),
    (Ie.cloneElement = function (y, O, fe) {
      if (y == null)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            y +
            ".",
        );
      var me = L({}, y.props),
        we = y.key,
        Se = y.ref,
        De = y._owner;
      if (O != null) {
        if (
          (O.ref !== void 0 && ((Se = O.ref), (De = ie.current)),
          O.key !== void 0 && (we = "" + O.key),
          y.type && y.type.defaultProps)
        )
          var je = y.type.defaultProps;
        for (be in O)
          he.call(O, be) &&
            !Te.hasOwnProperty(be) &&
            (me[be] = O[be] === void 0 && je !== void 0 ? je[be] : O[be]);
      }
      var be = arguments.length - 2;
      if (be === 1) me.children = fe;
      else if (1 < be) {
        je = Array(be);
        for (var lt = 0; lt < be; lt++) je[lt] = arguments[lt + 2];
        me.children = je;
      }
      return {
        $$typeof: s,
        type: y.type,
        key: we,
        ref: Se,
        props: me,
        _owner: De,
      };
    }),
    (Ie.createContext = function (y) {
      return (
        (y = {
          $$typeof: p,
          _currentValue: y,
          _currentValue2: y,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (y.Provider = { $$typeof: d, _context: y }),
        (y.Consumer = y)
      );
    }),
    (Ie.createElement = Pe),
    (Ie.createFactory = function (y) {
      var O = Pe.bind(null, y);
      return ((O.type = y), O);
    }),
    (Ie.createRef = function () {
      return { current: null };
    }),
    (Ie.forwardRef = function (y) {
      return { $$typeof: m, render: y };
    }),
    (Ie.isValidElement = ne),
    (Ie.lazy = function (y) {
      return { $$typeof: S, _payload: { _status: -1, _result: y }, _init: Re };
    }),
    (Ie.memo = function (y, O) {
      return { $$typeof: w, type: y, compare: O === void 0 ? null : O };
    }),
    (Ie.startTransition = function (y) {
      var O = W.transition;
      W.transition = {};
      try {
        y();
      } finally {
        W.transition = O;
      }
    }),
    (Ie.unstable_act = K),
    (Ie.useCallback = function (y, O) {
      return Ce.current.useCallback(y, O);
    }),
    (Ie.useContext = function (y) {
      return Ce.current.useContext(y);
    }),
    (Ie.useDebugValue = function () {}),
    (Ie.useDeferredValue = function (y) {
      return Ce.current.useDeferredValue(y);
    }),
    (Ie.useEffect = function (y, O) {
      return Ce.current.useEffect(y, O);
    }),
    (Ie.useId = function () {
      return Ce.current.useId();
    }),
    (Ie.useImperativeHandle = function (y, O, fe) {
      return Ce.current.useImperativeHandle(y, O, fe);
    }),
    (Ie.useInsertionEffect = function (y, O) {
      return Ce.current.useInsertionEffect(y, O);
    }),
    (Ie.useLayoutEffect = function (y, O) {
      return Ce.current.useLayoutEffect(y, O);
    }),
    (Ie.useMemo = function (y, O) {
      return Ce.current.useMemo(y, O);
    }),
    (Ie.useReducer = function (y, O, fe) {
      return Ce.current.useReducer(y, O, fe);
    }),
    (Ie.useRef = function (y) {
      return Ce.current.useRef(y);
    }),
    (Ie.useState = function (y) {
      return Ce.current.useState(y);
    }),
    (Ie.useSyncExternalStore = function (y, O, fe) {
      return Ce.current.useSyncExternalStore(y, O, fe);
    }),
    (Ie.useTransition = function () {
      return Ce.current.useTransition();
    }),
    (Ie.version = "18.3.1"),
    Ie
  );
}
var Yd;
function li() {
  return (Yd || ((Yd = 1), (No.exports = Tm())), No.exports);
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Gd;
function Pm() {
  if (Gd) return Qs;
  Gd = 1;
  var s = li(),
    r = Symbol.for("react.element"),
    i = Symbol.for("react.fragment"),
    l = Object.prototype.hasOwnProperty,
    u = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    d = { key: !0, ref: !0, __self: !0, __source: !0 };
  function p(m, x, w) {
    var S,
      N = {},
      I = null,
      Y = null;
    (w !== void 0 && (I = "" + w),
      x.key !== void 0 && (I = "" + x.key),
      x.ref !== void 0 && (Y = x.ref));
    for (S in x) l.call(x, S) && !d.hasOwnProperty(S) && (N[S] = x[S]);
    if (m && m.defaultProps)
      for (S in ((x = m.defaultProps), x)) N[S] === void 0 && (N[S] = x[S]);
    return {
      $$typeof: r,
      type: m,
      key: I,
      ref: Y,
      props: N,
      _owner: u.current,
    };
  }
  return ((Qs.Fragment = i), (Qs.jsx = p), (Qs.jsxs = p), Qs);
}
var Xd;
function Rm() {
  return (Xd || ((Xd = 1), (Eo.exports = Pm())), Eo.exports);
}
var h = Rm(),
  T = li();
const Oe = eu(T),
  Om = jm({ __proto__: null, default: Oe }, [T]);
var va = {},
  Co = { exports: {} },
  Rt = {},
  jo = { exports: {} },
  To = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ef;
function Im() {
  return (
    ef ||
      ((ef = 1),
      (function (s) {
        function r(W, ae) {
          var K = W.length;
          W.push(ae);
          e: for (; 0 < K; ) {
            var y = (K - 1) >>> 1,
              O = W[y];
            if (0 < u(O, ae)) ((W[y] = ae), (W[K] = O), (K = y));
            else break e;
          }
        }
        function i(W) {
          return W.length === 0 ? null : W[0];
        }
        function l(W) {
          if (W.length === 0) return null;
          var ae = W[0],
            K = W.pop();
          if (K !== ae) {
            W[0] = K;
            e: for (var y = 0, O = W.length, fe = O >>> 1; y < fe; ) {
              var me = 2 * (y + 1) - 1,
                we = W[me],
                Se = me + 1,
                De = W[Se];
              if (0 > u(we, K))
                Se < O && 0 > u(De, we)
                  ? ((W[y] = De), (W[Se] = K), (y = Se))
                  : ((W[y] = we), (W[me] = K), (y = me));
              else if (Se < O && 0 > u(De, K))
                ((W[y] = De), (W[Se] = K), (y = Se));
              else break e;
            }
          }
          return ae;
        }
        function u(W, ae) {
          var K = W.sortIndex - ae.sortIndex;
          return K !== 0 ? K : W.id - ae.id;
        }
        if (
          typeof performance == "object" &&
          typeof performance.now == "function"
        ) {
          var d = performance;
          s.unstable_now = function () {
            return d.now();
          };
        } else {
          var p = Date,
            m = p.now();
          s.unstable_now = function () {
            return p.now() - m;
          };
        }
        var x = [],
          w = [],
          S = 1,
          N = null,
          I = 3,
          Y = !1,
          L = !1,
          A = !1,
          D = typeof setTimeout == "function" ? setTimeout : null,
          ge = typeof clearTimeout == "function" ? clearTimeout : null,
          B = typeof setImmediate < "u" ? setImmediate : null;
        typeof navigator < "u" &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function Q(W) {
          for (var ae = i(w); ae !== null; ) {
            if (ae.callback === null) l(w);
            else if (ae.startTime <= W)
              (l(w), (ae.sortIndex = ae.expirationTime), r(x, ae));
            else break;
            ae = i(w);
          }
        }
        function X(W) {
          if (((A = !1), Q(W), !L))
            if (i(x) !== null) ((L = !0), Re(he));
            else {
              var ae = i(w);
              ae !== null && Ce(X, ae.startTime - W);
            }
        }
        function he(W, ae) {
          ((L = !1), A && ((A = !1), ge(Pe), (Pe = -1)), (Y = !0));
          var K = I;
          try {
            for (
              Q(ae), N = i(x);
              N !== null && (!(N.expirationTime > ae) || (W && !xe()));

            ) {
              var y = N.callback;
              if (typeof y == "function") {
                ((N.callback = null), (I = N.priorityLevel));
                var O = y(N.expirationTime <= ae);
                ((ae = s.unstable_now()),
                  typeof O == "function"
                    ? (N.callback = O)
                    : N === i(x) && l(x),
                  Q(ae));
              } else l(x);
              N = i(x);
            }
            if (N !== null) var fe = !0;
            else {
              var me = i(w);
              (me !== null && Ce(X, me.startTime - ae), (fe = !1));
            }
            return fe;
          } finally {
            ((N = null), (I = K), (Y = !1));
          }
        }
        var ie = !1,
          Te = null,
          Pe = -1,
          Fe = 5,
          ne = -1;
        function xe() {
          return !(s.unstable_now() - ne < Fe);
        }
        function G() {
          if (Te !== null) {
            var W = s.unstable_now();
            ne = W;
            var ae = !0;
            try {
              ae = Te(!0, W);
            } finally {
              ae ? H() : ((ie = !1), (Te = null));
            }
          } else ie = !1;
        }
        var H;
        if (typeof B == "function")
          H = function () {
            B(G);
          };
        else if (typeof MessageChannel < "u") {
          var ke = new MessageChannel(),
            Le = ke.port2;
          ((ke.port1.onmessage = G),
            (H = function () {
              Le.postMessage(null);
            }));
        } else
          H = function () {
            D(G, 0);
          };
        function Re(W) {
          ((Te = W), ie || ((ie = !0), H()));
        }
        function Ce(W, ae) {
          Pe = D(function () {
            W(s.unstable_now());
          }, ae);
        }
        ((s.unstable_IdlePriority = 5),
          (s.unstable_ImmediatePriority = 1),
          (s.unstable_LowPriority = 4),
          (s.unstable_NormalPriority = 3),
          (s.unstable_Profiling = null),
          (s.unstable_UserBlockingPriority = 2),
          (s.unstable_cancelCallback = function (W) {
            W.callback = null;
          }),
          (s.unstable_continueExecution = function () {
            L || Y || ((L = !0), Re(he));
          }),
          (s.unstable_forceFrameRate = function (W) {
            0 > W || 125 < W
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (Fe = 0 < W ? Math.floor(1e3 / W) : 5);
          }),
          (s.unstable_getCurrentPriorityLevel = function () {
            return I;
          }),
          (s.unstable_getFirstCallbackNode = function () {
            return i(x);
          }),
          (s.unstable_next = function (W) {
            switch (I) {
              case 1:
              case 2:
              case 3:
                var ae = 3;
                break;
              default:
                ae = I;
            }
            var K = I;
            I = ae;
            try {
              return W();
            } finally {
              I = K;
            }
          }),
          (s.unstable_pauseExecution = function () {}),
          (s.unstable_requestPaint = function () {}),
          (s.unstable_runWithPriority = function (W, ae) {
            switch (W) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                W = 3;
            }
            var K = I;
            I = W;
            try {
              return ae();
            } finally {
              I = K;
            }
          }),
          (s.unstable_scheduleCallback = function (W, ae, K) {
            var y = s.unstable_now();
            switch (
              (typeof K == "object" && K !== null
                ? ((K = K.delay),
                  (K = typeof K == "number" && 0 < K ? y + K : y))
                : (K = y),
              W)
            ) {
              case 1:
                var O = -1;
                break;
              case 2:
                O = 250;
                break;
              case 5:
                O = 1073741823;
                break;
              case 4:
                O = 1e4;
                break;
              default:
                O = 5e3;
            }
            return (
              (O = K + O),
              (W = {
                id: S++,
                callback: ae,
                priorityLevel: W,
                startTime: K,
                expirationTime: O,
                sortIndex: -1,
              }),
              K > y
                ? ((W.sortIndex = K),
                  r(w, W),
                  i(x) === null &&
                    W === i(w) &&
                    (A ? (ge(Pe), (Pe = -1)) : (A = !0), Ce(X, K - y)))
                : ((W.sortIndex = O), r(x, W), L || Y || ((L = !0), Re(he))),
              W
            );
          }),
          (s.unstable_shouldYield = xe),
          (s.unstable_wrapCallback = function (W) {
            var ae = I;
            return function () {
              var K = I;
              I = ae;
              try {
                return W.apply(this, arguments);
              } finally {
                I = K;
              }
            };
          }));
      })(To)),
    To
  );
}
var tf;
function Am() {
  return (tf || ((tf = 1), (jo.exports = Im())), jo.exports);
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var nf;
function Dm() {
  if (nf) return Rt;
  nf = 1;
  var s = li(),
    r = Am();
  function i(e) {
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
  var l = new Set(),
    u = {};
  function d(e, t) {
    (p(e, t), p(e + "Capture", t));
  }
  function p(e, t) {
    for (u[e] = t, e = 0; e < t.length; e++) l.add(t[e]);
  }
  var m = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    x = Object.prototype.hasOwnProperty,
    w =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    S = {},
    N = {};
  function I(e) {
    return x.call(N, e)
      ? !0
      : x.call(S, e)
        ? !1
        : w.test(e)
          ? (N[e] = !0)
          : ((S[e] = !0), !1);
  }
  function Y(e, t, n, a) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return a
          ? !1
          : n !== null
            ? !n.acceptsBooleans
            : ((e = e.toLowerCase().slice(0, 5)),
              e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function L(e, t, n, a) {
    if (t === null || typeof t > "u" || Y(e, t, n, a)) return !0;
    if (a) return !1;
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
  function A(e, t, n, a, o, c, f) {
    ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
      (this.attributeName = a),
      (this.attributeNamespace = o),
      (this.mustUseProperty = n),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = c),
      (this.removeEmptyString = f));
  }
  var D = {};
  ("children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
      D[e] = new A(e, 0, !1, e, null, !1, !1);
    }),
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (e) {
      var t = e[0];
      D[t] = new A(t, 1, !1, e[1], null, !1, !1);
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(
      function (e) {
        D[e] = new A(e, 2, !1, e.toLowerCase(), null, !1, !1);
      },
    ),
    [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (e) {
      D[e] = new A(e, 2, !1, e, null, !1, !1);
    }),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (e) {
        D[e] = new A(e, 3, !1, e.toLowerCase(), null, !1, !1);
      }),
    ["checked", "multiple", "muted", "selected"].forEach(function (e) {
      D[e] = new A(e, 3, !0, e, null, !1, !1);
    }),
    ["capture", "download"].forEach(function (e) {
      D[e] = new A(e, 4, !1, e, null, !1, !1);
    }),
    ["cols", "rows", "size", "span"].forEach(function (e) {
      D[e] = new A(e, 6, !1, e, null, !1, !1);
    }),
    ["rowSpan", "start"].forEach(function (e) {
      D[e] = new A(e, 5, !1, e.toLowerCase(), null, !1, !1);
    }));
  var ge = /[\-:]([a-z])/g;
  function B(e) {
    return e[1].toUpperCase();
  }
  ("accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
      var t = e.replace(ge, B);
      D[t] = new A(t, 1, !1, e, null, !1, !1);
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (e) {
        var t = e.replace(ge, B);
        D[t] = new A(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
      }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
      var t = e.replace(ge, B);
      D[t] = new A(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
    }),
    ["tabIndex", "crossOrigin"].forEach(function (e) {
      D[e] = new A(e, 1, !1, e.toLowerCase(), null, !1, !1);
    }),
    (D.xlinkHref = new A(
      "xlinkHref",
      1,
      !1,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      !1,
    )),
    ["src", "href", "action", "formAction"].forEach(function (e) {
      D[e] = new A(e, 1, !1, e.toLowerCase(), null, !0, !0);
    }));
  function Q(e, t, n, a) {
    var o = D.hasOwnProperty(t) ? D[t] : null;
    (o !== null
      ? o.type !== 0
      : a ||
        !(2 < t.length) ||
        (t[0] !== "o" && t[0] !== "O") ||
        (t[1] !== "n" && t[1] !== "N")) &&
      (L(t, n, o, a) && (n = null),
      a || o === null
        ? I(t) &&
          (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
        : o.mustUseProperty
          ? (e[o.propertyName] = n === null ? (o.type === 3 ? !1 : "") : n)
          : ((t = o.attributeName),
            (a = o.attributeNamespace),
            n === null
              ? e.removeAttribute(t)
              : ((o = o.type),
                (n = o === 3 || (o === 4 && n === !0) ? "" : "" + n),
                a ? e.setAttributeNS(a, t, n) : e.setAttribute(t, n))));
  }
  var X = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    he = Symbol.for("react.element"),
    ie = Symbol.for("react.portal"),
    Te = Symbol.for("react.fragment"),
    Pe = Symbol.for("react.strict_mode"),
    Fe = Symbol.for("react.profiler"),
    ne = Symbol.for("react.provider"),
    xe = Symbol.for("react.context"),
    G = Symbol.for("react.forward_ref"),
    H = Symbol.for("react.suspense"),
    ke = Symbol.for("react.suspense_list"),
    Le = Symbol.for("react.memo"),
    Re = Symbol.for("react.lazy"),
    Ce = Symbol.for("react.offscreen"),
    W = Symbol.iterator;
  function ae(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (W && e[W]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var K = Object.assign,
    y;
  function O(e) {
    if (y === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        y = (t && t[1]) || "";
      }
    return (
      `
` +
      y +
      e
    );
  }
  var fe = !1;
  function me(e, t) {
    if (!e || fe) return "";
    fe = !0;
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
          } catch (R) {
            var a = R;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (R) {
            a = R;
          }
          e.call(t.prototype);
        }
      else {
        try {
          throw Error();
        } catch (R) {
          a = R;
        }
        e();
      }
    } catch (R) {
      if (R && a && typeof R.stack == "string") {
        for (
          var o = R.stack.split(`
`),
            c = a.stack.split(`
`),
            f = o.length - 1,
            g = c.length - 1;
          1 <= f && 0 <= g && o[f] !== c[g];

        )
          g--;
        for (; 1 <= f && 0 <= g; f--, g--)
          if (o[f] !== c[g]) {
            if (f !== 1 || g !== 1)
              do
                if ((f--, g--, 0 > g || o[f] !== c[g])) {
                  var _ =
                    `
` + o[f].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      _.includes("<anonymous>") &&
                      (_ = _.replace("<anonymous>", e.displayName)),
                    _
                  );
                }
              while (1 <= f && 0 <= g);
            break;
          }
      }
    } finally {
      ((fe = !1), (Error.prepareStackTrace = n));
    }
    return (e = e ? e.displayName || e.name : "") ? O(e) : "";
  }
  function we(e) {
    switch (e.tag) {
      case 5:
        return O(e.type);
      case 16:
        return O("Lazy");
      case 13:
        return O("Suspense");
      case 19:
        return O("SuspenseList");
      case 0:
      case 2:
      case 15:
        return ((e = me(e.type, !1)), e);
      case 11:
        return ((e = me(e.type.render, !1)), e);
      case 1:
        return ((e = me(e.type, !0)), e);
      default:
        return "";
    }
  }
  function Se(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Te:
        return "Fragment";
      case ie:
        return "Portal";
      case Fe:
        return "Profiler";
      case Pe:
        return "StrictMode";
      case H:
        return "Suspense";
      case ke:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case xe:
          return (e.displayName || "Context") + ".Consumer";
        case ne:
          return (e._context.displayName || "Context") + ".Provider";
        case G:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case Le:
          return (
            (t = e.displayName || null),
            t !== null ? t : Se(e.type) || "Memo"
          );
        case Re:
          ((t = e._payload), (e = e._init));
          try {
            return Se(e(t));
          } catch {}
      }
    return null;
  }
  function De(e) {
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
        return Se(t);
      case 8:
        return t === Pe ? "StrictMode" : "Mode";
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
  function je(e) {
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
  function be(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function lt(e) {
    var t = be(e) ? "checked" : "value",
      n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      a = "" + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof n < "u" &&
      typeof n.get == "function" &&
      typeof n.set == "function"
    ) {
      var o = n.get,
        c = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return o.call(this);
          },
          set: function (f) {
            ((a = "" + f), c.call(this, f));
          },
        }),
        Object.defineProperty(e, t, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (f) {
            a = "" + f;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function zt(e) {
    e._valueTracker || (e._valueTracker = lt(e));
  }
  function jn(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      a = "";
    return (
      e && (a = be(e) ? (e.checked ? "true" : "false") : e.value),
      (e = a),
      e !== n ? (t.setValue(e), !0) : !1
    );
  }
  function Tn(e) {
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
  function Pn(e, t) {
    var n = t.checked;
    return K({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: n ?? e._wrapperState.initialChecked,
    });
  }
  function rr(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
      a = t.checked != null ? t.checked : t.defaultChecked;
    ((n = je(t.value != null ? t.value : n)),
      (e._wrapperState = {
        initialChecked: a,
        initialValue: n,
        controlled:
          t.type === "checkbox" || t.type === "radio"
            ? t.checked != null
            : t.value != null,
      }));
  }
  function kr(e, t) {
    ((t = t.checked), t != null && Q(e, "checked", t, !1));
  }
  function sr(e, t) {
    kr(e, t);
    var n = je(t.value),
      a = t.type;
    if (n != null)
      a === "number"
        ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
        : e.value !== "" + n && (e.value = "" + n);
    else if (a === "submit" || a === "reset") {
      e.removeAttribute("value");
      return;
    }
    (t.hasOwnProperty("value")
      ? le(e, t.type, n)
      : t.hasOwnProperty("defaultValue") && le(e, t.type, je(t.defaultValue)),
      t.checked == null &&
        t.defaultChecked != null &&
        (e.defaultChecked = !!t.defaultChecked));
  }
  function z(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var a = t.type;
      if (
        !(
          (a !== "submit" && a !== "reset") ||
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
  function le(e, t, n) {
    (t !== "number" || Tn(e.ownerDocument) !== e) &&
      (n == null
        ? (e.defaultValue = "" + e._wrapperState.initialValue)
        : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var v = Array.isArray;
  function E(e, t, n, a) {
    if (((e = e.options), t)) {
      t = {};
      for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
      for (n = 0; n < e.length; n++)
        ((o = t.hasOwnProperty("$" + e[n].value)),
          e[n].selected !== o && (e[n].selected = o),
          o && a && (e[n].defaultSelected = !0));
    } else {
      for (n = "" + je(n), t = null, o = 0; o < e.length; o++) {
        if (e[o].value === n) {
          ((e[o].selected = !0), a && (e[o].defaultSelected = !0));
          return;
        }
        t !== null || e[o].disabled || (t = e[o]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function P(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(i(91));
    return K({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: "" + e._wrapperState.initialValue,
    });
  }
  function q(e, t) {
    var n = t.value;
    if (n == null) {
      if (((n = t.children), (t = t.defaultValue), n != null)) {
        if (t != null) throw Error(i(92));
        if (v(n)) {
          if (1 < n.length) throw Error(i(93));
          n = n[0];
        }
        t = n;
      }
      (t == null && (t = ""), (n = t));
    }
    e._wrapperState = { initialValue: je(n) };
  }
  function Z(e, t) {
    var n = je(t.value),
      a = je(t.defaultValue);
    (n != null &&
      ((n = "" + n),
      n !== e.value && (e.value = n),
      t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
      a != null && (e.defaultValue = "" + a));
  }
  function $(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue &&
      t !== "" &&
      t !== null &&
      (e.value = t);
  }
  function pe(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Me(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml"
      ? pe(t)
      : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : e;
  }
  var Be,
    wt = (function (e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
        ? function (t, n, a, o) {
            MSApp.execUnsafeLocalFunction(function () {
              return e(t, n, a, o);
            });
          }
        : e;
    })(function (e, t) {
      if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
        e.innerHTML = t;
      else {
        for (
          Be = Be || document.createElement("div"),
            Be.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
            t = Be.firstChild;
          e.firstChild;

        )
          e.removeChild(e.firstChild);
        for (; t.firstChild; ) e.appendChild(t.firstChild);
      }
    });
  function nn(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Et = {
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
    Fa = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Et).forEach(function (e) {
    Fa.forEach(function (t) {
      ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Et[t] = Et[e]));
    });
  });
  function Sr(e, t, n) {
    return t == null || typeof t == "boolean" || t === ""
      ? ""
      : n || typeof t != "number" || t === 0 || (Et.hasOwnProperty(e) && Et[e])
        ? ("" + t).trim()
        : t + "px";
  }
  function Er(e, t) {
    e = e.style;
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var a = n.indexOf("--") === 0,
          o = Sr(n, t[n], a);
        (n === "float" && (n = "cssFloat"),
          a ? e.setProperty(n, o) : (e[n] = o));
      }
  }
  var Ma = K(
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
  function Nr(e, t) {
    if (t) {
      if (Ma[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw Error(i(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(i(60));
        if (
          typeof t.dangerouslySetInnerHTML != "object" ||
          !("__html" in t.dangerouslySetInnerHTML)
        )
          throw Error(i(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(i(62));
    }
  }
  function cs(e, t) {
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
  var Cr = null;
  function Va(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var za = null,
    jr = null,
    Tr = null;
  function pu(e) {
    if ((e = Is(e))) {
      if (typeof za != "function") throw Error(i(280));
      var t = e.stateNode;
      t && ((t = Oi(t)), za(e.stateNode, e.type, t));
    }
  }
  function hu(e) {
    jr ? (Tr ? Tr.push(e) : (Tr = [e])) : (jr = e);
  }
  function mu() {
    if (jr) {
      var e = jr,
        t = Tr;
      if (((Tr = jr = null), pu(e), t)) for (e = 0; e < t.length; e++) pu(t[e]);
    }
  }
  function vu(e, t) {
    return e(t);
  }
  function yu() {}
  var Ua = !1;
  function gu(e, t, n) {
    if (Ua) return e(t, n);
    Ua = !0;
    try {
      return vu(e, t, n);
    } finally {
      ((Ua = !1), (jr !== null || Tr !== null) && (yu(), mu()));
    }
  }
  function ds(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var a = Oi(n);
    if (a === null) return null;
    n = a[t];
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
        ((a = !a.disabled) ||
          ((e = e.type),
          (a = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !a));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(i(231, t, typeof n));
    return n;
  }
  var $a = !1;
  if (m)
    try {
      var fs = {};
      (Object.defineProperty(fs, "passive", {
        get: function () {
          $a = !0;
        },
      }),
        window.addEventListener("test", fs, fs),
        window.removeEventListener("test", fs, fs));
    } catch {
      $a = !1;
    }
  function Ap(e, t, n, a, o, c, f, g, _) {
    var R = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, R);
    } catch (M) {
      this.onError(M);
    }
  }
  var ps = !1,
    ui = null,
    ci = !1,
    ba = null,
    Dp = {
      onError: function (e) {
        ((ps = !0), (ui = e));
      },
    };
  function Lp(e, t, n, a, o, c, f, g, _) {
    ((ps = !1), (ui = null), Ap.apply(Dp, arguments));
  }
  function Fp(e, t, n, a, o, c, f, g, _) {
    if ((Lp.apply(this, arguments), ps)) {
      if (ps) {
        var R = ui;
        ((ps = !1), (ui = null));
      } else throw Error(i(198));
      ci || ((ci = !0), (ba = R));
    }
  }
  function ir(e) {
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
  function xu(e) {
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
  function wu(e) {
    if (ir(e) !== e) throw Error(i(188));
  }
  function Mp(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = ir(e)), t === null)) throw Error(i(188));
      return t !== e ? null : e;
    }
    for (var n = e, a = t; ; ) {
      var o = n.return;
      if (o === null) break;
      var c = o.alternate;
      if (c === null) {
        if (((a = o.return), a !== null)) {
          n = a;
          continue;
        }
        break;
      }
      if (o.child === c.child) {
        for (c = o.child; c; ) {
          if (c === n) return (wu(o), e);
          if (c === a) return (wu(o), t);
          c = c.sibling;
        }
        throw Error(i(188));
      }
      if (n.return !== a.return) ((n = o), (a = c));
      else {
        for (var f = !1, g = o.child; g; ) {
          if (g === n) {
            ((f = !0), (n = o), (a = c));
            break;
          }
          if (g === a) {
            ((f = !0), (a = o), (n = c));
            break;
          }
          g = g.sibling;
        }
        if (!f) {
          for (g = c.child; g; ) {
            if (g === n) {
              ((f = !0), (n = c), (a = o));
              break;
            }
            if (g === a) {
              ((f = !0), (a = c), (n = o));
              break;
            }
            g = g.sibling;
          }
          if (!f) throw Error(i(189));
        }
      }
      if (n.alternate !== a) throw Error(i(190));
    }
    if (n.tag !== 3) throw Error(i(188));
    return n.stateNode.current === n ? e : t;
  }
  function _u(e) {
    return ((e = Mp(e)), e !== null ? ku(e) : null);
  }
  function ku(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = ku(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var Su = r.unstable_scheduleCallback,
    Eu = r.unstable_cancelCallback,
    Vp = r.unstable_shouldYield,
    zp = r.unstable_requestPaint,
    et = r.unstable_now,
    Up = r.unstable_getCurrentPriorityLevel,
    Ba = r.unstable_ImmediatePriority,
    Nu = r.unstable_UserBlockingPriority,
    di = r.unstable_NormalPriority,
    $p = r.unstable_LowPriority,
    Cu = r.unstable_IdlePriority,
    fi = null,
    rn = null;
  function bp(e) {
    if (rn && typeof rn.onCommitFiberRoot == "function")
      try {
        rn.onCommitFiberRoot(fi, e, void 0, (e.current.flags & 128) === 128);
      } catch {}
  }
  var Qt = Math.clz32 ? Math.clz32 : Zp,
    Bp = Math.log,
    Wp = Math.LN2;
  function Zp(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Bp(e) / Wp) | 0)) | 0);
  }
  var pi = 64,
    hi = 4194304;
  function hs(e) {
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
  function mi(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var a = 0,
      o = e.suspendedLanes,
      c = e.pingedLanes,
      f = n & 268435455;
    if (f !== 0) {
      var g = f & ~o;
      g !== 0 ? (a = hs(g)) : ((c &= f), c !== 0 && (a = hs(c)));
    } else ((f = n & ~o), f !== 0 ? (a = hs(f)) : c !== 0 && (a = hs(c)));
    if (a === 0) return 0;
    if (
      t !== 0 &&
      t !== a &&
      (t & o) === 0 &&
      ((o = a & -a), (c = t & -t), o >= c || (o === 16 && (c & 4194240) !== 0))
    )
      return t;
    if (((a & 4) !== 0 && (a |= n & 16), (t = e.entangledLanes), t !== 0))
      for (e = e.entanglements, t &= a; 0 < t; )
        ((n = 31 - Qt(t)), (o = 1 << n), (a |= e[n]), (t &= ~o));
    return a;
  }
  function Hp(e, t) {
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
  function Qp(e, t) {
    for (
      var n = e.suspendedLanes,
        a = e.pingedLanes,
        o = e.expirationTimes,
        c = e.pendingLanes;
      0 < c;

    ) {
      var f = 31 - Qt(c),
        g = 1 << f,
        _ = o[f];
      (_ === -1
        ? ((g & n) === 0 || (g & a) !== 0) && (o[f] = Hp(g, t))
        : _ <= t && (e.expiredLanes |= g),
        (c &= ~g));
    }
  }
  function Wa(e) {
    return (
      (e = e.pendingLanes & -1073741825),
      e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    );
  }
  function ju() {
    var e = pi;
    return ((pi <<= 1), (pi & 4194240) === 0 && (pi = 64), e);
  }
  function Za(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function ms(e, t, n) {
    ((e.pendingLanes |= t),
      t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
      (e = e.eventTimes),
      (t = 31 - Qt(t)),
      (e[t] = n));
  }
  function Kp(e, t) {
    var n = e.pendingLanes & ~t;
    ((e.pendingLanes = t),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.expiredLanes &= t),
      (e.mutableReadLanes &= t),
      (e.entangledLanes &= t),
      (t = e.entanglements));
    var a = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var o = 31 - Qt(n),
        c = 1 << o;
      ((t[o] = 0), (a[o] = -1), (e[o] = -1), (n &= ~c));
    }
  }
  function Ha(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
      var a = 31 - Qt(n),
        o = 1 << a;
      ((o & t) | (e[a] & t) && (e[a] |= t), (n &= ~o));
    }
  }
  var We = 0;
  function Tu(e) {
    return (
      (e &= -e),
      1 < e ? (4 < e ? ((e & 268435455) !== 0 ? 16 : 536870912) : 4) : 1
    );
  }
  var Pu,
    Qa,
    Ru,
    Ou,
    Iu,
    Ka = !1,
    vi = [],
    Rn = null,
    On = null,
    In = null,
    vs = new Map(),
    ys = new Map(),
    An = [],
    qp =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
        " ",
      );
  function Au(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Rn = null;
        break;
      case "dragenter":
      case "dragleave":
        On = null;
        break;
      case "mouseover":
      case "mouseout":
        In = null;
        break;
      case "pointerover":
      case "pointerout":
        vs.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        ys.delete(t.pointerId);
    }
  }
  function gs(e, t, n, a, o, c) {
    return e === null || e.nativeEvent !== c
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: a,
          nativeEvent: c,
          targetContainers: [o],
        }),
        t !== null && ((t = Is(t)), t !== null && Qa(t)),
        e)
      : ((e.eventSystemFlags |= a),
        (t = e.targetContainers),
        o !== null && t.indexOf(o) === -1 && t.push(o),
        e);
  }
  function Jp(e, t, n, a, o) {
    switch (t) {
      case "focusin":
        return ((Rn = gs(Rn, e, t, n, a, o)), !0);
      case "dragenter":
        return ((On = gs(On, e, t, n, a, o)), !0);
      case "mouseover":
        return ((In = gs(In, e, t, n, a, o)), !0);
      case "pointerover":
        var c = o.pointerId;
        return (vs.set(c, gs(vs.get(c) || null, e, t, n, a, o)), !0);
      case "gotpointercapture":
        return (
          (c = o.pointerId),
          ys.set(c, gs(ys.get(c) || null, e, t, n, a, o)),
          !0
        );
    }
    return !1;
  }
  function Du(e) {
    var t = ar(e.target);
    if (t !== null) {
      var n = ir(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = xu(n)), t !== null)) {
            ((e.blockedOn = t),
              Iu(e.priority, function () {
                Ru(n);
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
  function yi(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Ja(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var a = new n.constructor(n.type, n);
        ((Cr = a), n.target.dispatchEvent(a), (Cr = null));
      } else return ((t = Is(n)), t !== null && Qa(t), (e.blockedOn = n), !1);
      t.shift();
    }
    return !0;
  }
  function Lu(e, t, n) {
    yi(e) && n.delete(t);
  }
  function Yp() {
    ((Ka = !1),
      Rn !== null && yi(Rn) && (Rn = null),
      On !== null && yi(On) && (On = null),
      In !== null && yi(In) && (In = null),
      vs.forEach(Lu),
      ys.forEach(Lu));
  }
  function xs(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Ka ||
        ((Ka = !0),
        r.unstable_scheduleCallback(r.unstable_NormalPriority, Yp)));
  }
  function ws(e) {
    function t(o) {
      return xs(o, e);
    }
    if (0 < vi.length) {
      xs(vi[0], e);
      for (var n = 1; n < vi.length; n++) {
        var a = vi[n];
        a.blockedOn === e && (a.blockedOn = null);
      }
    }
    for (
      Rn !== null && xs(Rn, e),
        On !== null && xs(On, e),
        In !== null && xs(In, e),
        vs.forEach(t),
        ys.forEach(t),
        n = 0;
      n < An.length;
      n++
    )
      ((a = An[n]), a.blockedOn === e && (a.blockedOn = null));
    for (; 0 < An.length && ((n = An[0]), n.blockedOn === null); )
      (Du(n), n.blockedOn === null && An.shift());
  }
  var Pr = X.ReactCurrentBatchConfig,
    gi = !0;
  function Gp(e, t, n, a) {
    var o = We,
      c = Pr.transition;
    Pr.transition = null;
    try {
      ((We = 1), qa(e, t, n, a));
    } finally {
      ((We = o), (Pr.transition = c));
    }
  }
  function Xp(e, t, n, a) {
    var o = We,
      c = Pr.transition;
    Pr.transition = null;
    try {
      ((We = 4), qa(e, t, n, a));
    } finally {
      ((We = o), (Pr.transition = c));
    }
  }
  function qa(e, t, n, a) {
    if (gi) {
      var o = Ja(e, t, n, a);
      if (o === null) (pl(e, t, a, xi, n), Au(e, a));
      else if (Jp(o, e, t, n, a)) a.stopPropagation();
      else if ((Au(e, a), t & 4 && -1 < qp.indexOf(e))) {
        for (; o !== null; ) {
          var c = Is(o);
          if (
            (c !== null && Pu(c),
            (c = Ja(e, t, n, a)),
            c === null && pl(e, t, a, xi, n),
            c === o)
          )
            break;
          o = c;
        }
        o !== null && a.stopPropagation();
      } else pl(e, t, a, null, n);
    }
  }
  var xi = null;
  function Ja(e, t, n, a) {
    if (((xi = null), (e = Va(a)), (e = ar(e)), e !== null))
      if (((t = ir(e)), t === null)) e = null;
      else if (((n = t.tag), n === 13)) {
        if (((e = xu(t)), e !== null)) return e;
        e = null;
      } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
    return ((xi = e), null);
  }
  function Fu(e) {
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
        switch (Up()) {
          case Ba:
            return 1;
          case Nu:
            return 4;
          case di:
          case $p:
            return 16;
          case Cu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Dn = null,
    Ya = null,
    wi = null;
  function Mu() {
    if (wi) return wi;
    var e,
      t = Ya,
      n = t.length,
      a,
      o = "value" in Dn ? Dn.value : Dn.textContent,
      c = o.length;
    for (e = 0; e < n && t[e] === o[e]; e++);
    var f = n - e;
    for (a = 1; a <= f && t[n - a] === o[c - a]; a++);
    return (wi = o.slice(e, 1 < a ? 1 - a : void 0));
  }
  function _i(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function ki() {
    return !0;
  }
  function Vu() {
    return !1;
  }
  function It(e) {
    function t(n, a, o, c, f) {
      ((this._reactName = n),
        (this._targetInst = o),
        (this.type = a),
        (this.nativeEvent = c),
        (this.target = f),
        (this.currentTarget = null));
      for (var g in e)
        e.hasOwnProperty(g) && ((n = e[g]), (this[g] = n ? n(c) : c[g]));
      return (
        (this.isDefaultPrevented = (
          c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1
        )
          ? ki
          : Vu),
        (this.isPropagationStopped = Vu),
        this
      );
    }
    return (
      K(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            (this.isDefaultPrevented = ki));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            (this.isPropagationStopped = ki));
        },
        persist: function () {},
        isPersistent: ki,
      }),
      t
    );
  }
  var Rr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Ga = It(Rr),
    _s = K({}, Rr, { view: 0, detail: 0 }),
    eh = It(_s),
    Xa,
    el,
    ks,
    Si = K({}, _s, {
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
      getModifierState: nl,
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
          : (e !== ks &&
              (ks && e.type === "mousemove"
                ? ((Xa = e.screenX - ks.screenX), (el = e.screenY - ks.screenY))
                : (el = Xa = 0),
              (ks = e)),
            Xa);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : el;
      },
    }),
    zu = It(Si),
    th = K({}, Si, { dataTransfer: 0 }),
    nh = It(th),
    rh = K({}, _s, { relatedTarget: 0 }),
    tl = It(rh),
    sh = K({}, Rr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    ih = It(sh),
    ah = K({}, Rr, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    lh = It(ah),
    oh = K({}, Rr, { data: 0 }),
    Uu = It(oh),
    uh = {
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
    ch = {
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
    dh = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function fh(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = dh[e])
        ? !!t[e]
        : !1;
  }
  function nl() {
    return fh;
  }
  var ph = K({}, _s, {
      key: function (e) {
        if (e.key) {
          var t = uh[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = _i(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? ch[e.keyCode] || "Unidentified"
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
      getModifierState: nl,
      charCode: function (e) {
        return e.type === "keypress" ? _i(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? _i(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    hh = It(ph),
    mh = K({}, Si, {
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
    $u = It(mh),
    vh = K({}, _s, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: nl,
    }),
    yh = It(vh),
    gh = K({}, Rr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    xh = It(gh),
    wh = K({}, Si, {
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
    _h = It(wh),
    kh = [9, 13, 27, 32],
    rl = m && "CompositionEvent" in window,
    Ss = null;
  m && "documentMode" in document && (Ss = document.documentMode);
  var Sh = m && "TextEvent" in window && !Ss,
    bu = m && (!rl || (Ss && 8 < Ss && 11 >= Ss)),
    Bu = " ",
    Wu = !1;
  function Zu(e, t) {
    switch (e) {
      case "keyup":
        return kh.indexOf(t.keyCode) !== -1;
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
  function Hu(e) {
    return (
      (e = e.detail),
      typeof e == "object" && "data" in e ? e.data : null
    );
  }
  var Or = !1;
  function Eh(e, t) {
    switch (e) {
      case "compositionend":
        return Hu(t);
      case "keypress":
        return t.which !== 32 ? null : ((Wu = !0), Bu);
      case "textInput":
        return ((e = t.data), e === Bu && Wu ? null : e);
      default:
        return null;
    }
  }
  function Nh(e, t) {
    if (Or)
      return e === "compositionend" || (!rl && Zu(e, t))
        ? ((e = Mu()), (wi = Ya = Dn = null), (Or = !1), e)
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
        return bu && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Ch = {
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
  function Qu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Ch[e.type] : t === "textarea";
  }
  function Ku(e, t, n, a) {
    (hu(a),
      (t = Ti(t, "onChange")),
      0 < t.length &&
        ((n = new Ga("onChange", "change", null, n, a)),
        e.push({ event: n, listeners: t })));
  }
  var Es = null,
    Ns = null;
  function jh(e) {
    fc(e, 0);
  }
  function Ei(e) {
    var t = Fr(e);
    if (jn(t)) return e;
  }
  function Th(e, t) {
    if (e === "change") return t;
  }
  var qu = !1;
  if (m) {
    var sl;
    if (m) {
      var il = "oninput" in document;
      if (!il) {
        var Ju = document.createElement("div");
        (Ju.setAttribute("oninput", "return;"),
          (il = typeof Ju.oninput == "function"));
      }
      sl = il;
    } else sl = !1;
    qu = sl && (!document.documentMode || 9 < document.documentMode);
  }
  function Yu() {
    Es && (Es.detachEvent("onpropertychange", Gu), (Ns = Es = null));
  }
  function Gu(e) {
    if (e.propertyName === "value" && Ei(Ns)) {
      var t = [];
      (Ku(t, Ns, e, Va(e)), gu(jh, t));
    }
  }
  function Ph(e, t, n) {
    e === "focusin"
      ? (Yu(), (Es = t), (Ns = n), Es.attachEvent("onpropertychange", Gu))
      : e === "focusout" && Yu();
  }
  function Rh(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ei(Ns);
  }
  function Oh(e, t) {
    if (e === "click") return Ei(t);
  }
  function Ih(e, t) {
    if (e === "input" || e === "change") return Ei(t);
  }
  function Ah(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Kt = typeof Object.is == "function" ? Object.is : Ah;
  function Cs(e, t) {
    if (Kt(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var n = Object.keys(e),
      a = Object.keys(t);
    if (n.length !== a.length) return !1;
    for (a = 0; a < n.length; a++) {
      var o = n[a];
      if (!x.call(t, o) || !Kt(e[o], t[o])) return !1;
    }
    return !0;
  }
  function Xu(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function ec(e, t) {
    var n = Xu(e);
    e = 0;
    for (var a; n; ) {
      if (n.nodeType === 3) {
        if (((a = e + n.textContent.length), e <= t && a >= t))
          return { node: n, offset: t - e };
        e = a;
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
      n = Xu(n);
    }
  }
  function tc(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? tc(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function nc() {
    for (var e = window, t = Tn(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Tn(e.document);
    }
    return t;
  }
  function al(e) {
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
  function Dh(e) {
    var t = nc(),
      n = e.focusedElem,
      a = e.selectionRange;
    if (
      t !== n &&
      n &&
      n.ownerDocument &&
      tc(n.ownerDocument.documentElement, n)
    ) {
      if (a !== null && al(n)) {
        if (
          ((t = a.start),
          (e = a.end),
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
            c = Math.min(a.start, o);
          ((a = a.end === void 0 ? c : Math.min(a.end, o)),
            !e.extend && c > a && ((o = a), (a = c), (c = o)),
            (o = ec(n, c)));
          var f = ec(n, a);
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
            c > a
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
  var Lh = m && "documentMode" in document && 11 >= document.documentMode,
    Ir = null,
    ll = null,
    js = null,
    ol = !1;
  function rc(e, t, n) {
    var a =
      n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    ol ||
      Ir == null ||
      Ir !== Tn(a) ||
      ((a = Ir),
      "selectionStart" in a && al(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = (
            (a.ownerDocument && a.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (js && Cs(js, a)) ||
        ((js = a),
        (a = Ti(ll, "onSelect")),
        0 < a.length &&
          ((t = new Ga("onSelect", "select", null, t, n)),
          e.push({ event: t, listeners: a }),
          (t.target = Ir))));
  }
  function Ni(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n["Webkit" + e] = "webkit" + t),
      (n["Moz" + e] = "moz" + t),
      n
    );
  }
  var Ar = {
      animationend: Ni("Animation", "AnimationEnd"),
      animationiteration: Ni("Animation", "AnimationIteration"),
      animationstart: Ni("Animation", "AnimationStart"),
      transitionend: Ni("Transition", "TransitionEnd"),
    },
    ul = {},
    sc = {};
  m &&
    ((sc = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Ar.animationend.animation,
      delete Ar.animationiteration.animation,
      delete Ar.animationstart.animation),
    "TransitionEvent" in window || delete Ar.transitionend.transition);
  function Ci(e) {
    if (ul[e]) return ul[e];
    if (!Ar[e]) return e;
    var t = Ar[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in sc) return (ul[e] = t[n]);
    return e;
  }
  var ic = Ci("animationend"),
    ac = Ci("animationiteration"),
    lc = Ci("animationstart"),
    oc = Ci("transitionend"),
    uc = new Map(),
    cc =
      "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  function Ln(e, t) {
    (uc.set(e, t), d(t, [e]));
  }
  for (var cl = 0; cl < cc.length; cl++) {
    var dl = cc[cl],
      Fh = dl.toLowerCase(),
      Mh = dl[0].toUpperCase() + dl.slice(1);
    Ln(Fh, "on" + Mh);
  }
  (Ln(ic, "onAnimationEnd"),
    Ln(ac, "onAnimationIteration"),
    Ln(lc, "onAnimationStart"),
    Ln("dblclick", "onDoubleClick"),
    Ln("focusin", "onFocus"),
    Ln("focusout", "onBlur"),
    Ln(oc, "onTransitionEnd"),
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
  var Ts =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    Vh = new Set(
      "cancel close invalid load scroll toggle".split(" ").concat(Ts),
    );
  function dc(e, t, n) {
    var a = e.type || "unknown-event";
    ((e.currentTarget = n), Fp(a, t, void 0, e), (e.currentTarget = null));
  }
  function fc(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var a = e[n],
        o = a.event;
      a = a.listeners;
      e: {
        var c = void 0;
        if (t)
          for (var f = a.length - 1; 0 <= f; f--) {
            var g = a[f],
              _ = g.instance,
              R = g.currentTarget;
            if (((g = g.listener), _ !== c && o.isPropagationStopped()))
              break e;
            (dc(o, g, R), (c = _));
          }
        else
          for (f = 0; f < a.length; f++) {
            if (
              ((g = a[f]),
              (_ = g.instance),
              (R = g.currentTarget),
              (g = g.listener),
              _ !== c && o.isPropagationStopped())
            )
              break e;
            (dc(o, g, R), (c = _));
          }
      }
    }
    if (ci) throw ((e = ba), (ci = !1), (ba = null), e);
  }
  function Qe(e, t) {
    var n = t[xl];
    n === void 0 && (n = t[xl] = new Set());
    var a = e + "__bubble";
    n.has(a) || (pc(t, e, 2, !1), n.add(a));
  }
  function fl(e, t, n) {
    var a = 0;
    (t && (a |= 4), pc(n, e, a, t));
  }
  var ji = "_reactListening" + Math.random().toString(36).slice(2);
  function Ps(e) {
    if (!e[ji]) {
      ((e[ji] = !0),
        l.forEach(function (n) {
          n !== "selectionchange" && (Vh.has(n) || fl(n, !1, e), fl(n, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[ji] || ((t[ji] = !0), fl("selectionchange", !1, t));
    }
  }
  function pc(e, t, n, a) {
    switch (Fu(t)) {
      case 1:
        var o = Gp;
        break;
      case 4:
        o = Xp;
        break;
      default:
        o = qa;
    }
    ((n = o.bind(null, t, n, e)),
      (o = void 0),
      !$a ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (o = !0),
      a
        ? o !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: o })
          : e.addEventListener(t, n, !0)
        : o !== void 0
          ? e.addEventListener(t, n, { passive: o })
          : e.addEventListener(t, n, !1));
  }
  function pl(e, t, n, a, o) {
    var c = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (;;) {
        if (a === null) return;
        var f = a.tag;
        if (f === 3 || f === 4) {
          var g = a.stateNode.containerInfo;
          if (g === o || (g.nodeType === 8 && g.parentNode === o)) break;
          if (f === 4)
            for (f = a.return; f !== null; ) {
              var _ = f.tag;
              if (
                (_ === 3 || _ === 4) &&
                ((_ = f.stateNode.containerInfo),
                _ === o || (_.nodeType === 8 && _.parentNode === o))
              )
                return;
              f = f.return;
            }
          for (; g !== null; ) {
            if (((f = ar(g)), f === null)) return;
            if (((_ = f.tag), _ === 5 || _ === 6)) {
              a = c = f;
              continue e;
            }
            g = g.parentNode;
          }
        }
        a = a.return;
      }
    gu(function () {
      var R = c,
        M = Va(n),
        V = [];
      e: {
        var F = uc.get(e);
        if (F !== void 0) {
          var ee = Ga,
            se = e;
          switch (e) {
            case "keypress":
              if (_i(n) === 0) break e;
            case "keydown":
            case "keyup":
              ee = hh;
              break;
            case "focusin":
              ((se = "focus"), (ee = tl));
              break;
            case "focusout":
              ((se = "blur"), (ee = tl));
              break;
            case "beforeblur":
            case "afterblur":
              ee = tl;
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
              ee = zu;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ee = nh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ee = yh;
              break;
            case ic:
            case ac:
            case lc:
              ee = ih;
              break;
            case oc:
              ee = xh;
              break;
            case "scroll":
              ee = eh;
              break;
            case "wheel":
              ee = _h;
              break;
            case "copy":
            case "cut":
            case "paste":
              ee = lh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ee = $u;
          }
          var oe = (t & 4) !== 0,
            tt = !oe && e === "scroll",
            C = oe ? (F !== null ? F + "Capture" : null) : F;
          oe = [];
          for (var k = R, j; k !== null; ) {
            j = k;
            var U = j.stateNode;
            if (
              (j.tag === 5 &&
                U !== null &&
                ((j = U),
                C !== null &&
                  ((U = ds(k, C)), U != null && oe.push(Rs(k, U, j)))),
              tt)
            )
              break;
            k = k.return;
          }
          0 < oe.length &&
            ((F = new ee(F, se, null, n, M)),
            V.push({ event: F, listeners: oe }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((F = e === "mouseover" || e === "pointerover"),
            (ee = e === "mouseout" || e === "pointerout"),
            F &&
              n !== Cr &&
              (se = n.relatedTarget || n.fromElement) &&
              (ar(se) || se[pn]))
          )
            break e;
          if (
            (ee || F) &&
            ((F =
              M.window === M
                ? M
                : (F = M.ownerDocument)
                  ? F.defaultView || F.parentWindow
                  : window),
            ee
              ? ((se = n.relatedTarget || n.toElement),
                (ee = R),
                (se = se ? ar(se) : null),
                se !== null &&
                  ((tt = ir(se)),
                  se !== tt || (se.tag !== 5 && se.tag !== 6)) &&
                  (se = null))
              : ((ee = null), (se = R)),
            ee !== se)
          ) {
            if (
              ((oe = zu),
              (U = "onMouseLeave"),
              (C = "onMouseEnter"),
              (k = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((oe = $u),
                (U = "onPointerLeave"),
                (C = "onPointerEnter"),
                (k = "pointer")),
              (tt = ee == null ? F : Fr(ee)),
              (j = se == null ? F : Fr(se)),
              (F = new oe(U, k + "leave", ee, n, M)),
              (F.target = tt),
              (F.relatedTarget = j),
              (U = null),
              ar(M) === R &&
                ((oe = new oe(C, k + "enter", se, n, M)),
                (oe.target = j),
                (oe.relatedTarget = tt),
                (U = oe)),
              (tt = U),
              ee && se)
            )
              t: {
                for (oe = ee, C = se, k = 0, j = oe; j; j = Dr(j)) k++;
                for (j = 0, U = C; U; U = Dr(U)) j++;
                for (; 0 < k - j; ) ((oe = Dr(oe)), k--);
                for (; 0 < j - k; ) ((C = Dr(C)), j--);
                for (; k--; ) {
                  if (oe === C || (C !== null && oe === C.alternate)) break t;
                  ((oe = Dr(oe)), (C = Dr(C)));
                }
                oe = null;
              }
            else oe = null;
            (ee !== null && hc(V, F, ee, oe, !1),
              se !== null && tt !== null && hc(V, tt, se, oe, !0));
          }
        }
        e: {
          if (
            ((F = R ? Fr(R) : window),
            (ee = F.nodeName && F.nodeName.toLowerCase()),
            ee === "select" || (ee === "input" && F.type === "file"))
          )
            var ce = Th;
          else if (Qu(F))
            if (qu) ce = Ih;
            else {
              ce = Rh;
              var ve = Ph;
            }
          else
            (ee = F.nodeName) &&
              ee.toLowerCase() === "input" &&
              (F.type === "checkbox" || F.type === "radio") &&
              (ce = Oh);
          if (ce && (ce = ce(e, R))) {
            Ku(V, ce, n, M);
            break e;
          }
          (ve && ve(e, F, R),
            e === "focusout" &&
              (ve = F._wrapperState) &&
              ve.controlled &&
              F.type === "number" &&
              le(F, "number", F.value));
        }
        switch (((ve = R ? Fr(R) : window), e)) {
          case "focusin":
            (Qu(ve) || ve.contentEditable === "true") &&
              ((Ir = ve), (ll = R), (js = null));
            break;
          case "focusout":
            js = ll = Ir = null;
            break;
          case "mousedown":
            ol = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((ol = !1), rc(V, n, M));
            break;
          case "selectionchange":
            if (Lh) break;
          case "keydown":
          case "keyup":
            rc(V, n, M);
        }
        var ye;
        if (rl)
          e: {
            switch (e) {
              case "compositionstart":
                var _e = "onCompositionStart";
                break e;
              case "compositionend":
                _e = "onCompositionEnd";
                break e;
              case "compositionupdate":
                _e = "onCompositionUpdate";
                break e;
            }
            _e = void 0;
          }
        else
          Or
            ? Zu(e, n) && (_e = "onCompositionEnd")
            : e === "keydown" &&
              n.keyCode === 229 &&
              (_e = "onCompositionStart");
        (_e &&
          (bu &&
            n.locale !== "ko" &&
            (Or || _e !== "onCompositionStart"
              ? _e === "onCompositionEnd" && Or && (ye = Mu())
              : ((Dn = M),
                (Ya = "value" in Dn ? Dn.value : Dn.textContent),
                (Or = !0))),
          (ve = Ti(R, _e)),
          0 < ve.length &&
            ((_e = new Uu(_e, e, null, n, M)),
            V.push({ event: _e, listeners: ve }),
            ye
              ? (_e.data = ye)
              : ((ye = Hu(n)), ye !== null && (_e.data = ye)))),
          (ye = Sh ? Eh(e, n) : Nh(e, n)) &&
            ((R = Ti(R, "onBeforeInput")),
            0 < R.length &&
              ((M = new Uu("onBeforeInput", "beforeinput", null, n, M)),
              V.push({ event: M, listeners: R }),
              (M.data = ye))));
      }
      fc(V, t);
    });
  }
  function Rs(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Ti(e, t) {
    for (var n = t + "Capture", a = []; e !== null; ) {
      var o = e,
        c = o.stateNode;
      (o.tag === 5 &&
        c !== null &&
        ((o = c),
        (c = ds(e, n)),
        c != null && a.unshift(Rs(e, c, o)),
        (c = ds(e, t)),
        c != null && a.push(Rs(e, c, o))),
        (e = e.return));
    }
    return a;
  }
  function Dr(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function hc(e, t, n, a, o) {
    for (var c = t._reactName, f = []; n !== null && n !== a; ) {
      var g = n,
        _ = g.alternate,
        R = g.stateNode;
      if (_ !== null && _ === a) break;
      (g.tag === 5 &&
        R !== null &&
        ((g = R),
        o
          ? ((_ = ds(n, c)), _ != null && f.unshift(Rs(n, _, g)))
          : o || ((_ = ds(n, c)), _ != null && f.push(Rs(n, _, g)))),
        (n = n.return));
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var zh = /\r\n?/g,
    Uh = /\u0000|\uFFFD/g;
  function mc(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        zh,
        `
`,
      )
      .replace(Uh, "");
  }
  function Pi(e, t, n) {
    if (((t = mc(t)), mc(e) !== t && n)) throw Error(i(425));
  }
  function Ri() {}
  var hl = null,
    ml = null;
  function vl(e, t) {
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
  var yl = typeof setTimeout == "function" ? setTimeout : void 0,
    $h = typeof clearTimeout == "function" ? clearTimeout : void 0,
    vc = typeof Promise == "function" ? Promise : void 0,
    bh =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof vc < "u"
          ? function (e) {
              return vc.resolve(null).then(e).catch(Bh);
            }
          : yl;
  function Bh(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function gl(e, t) {
    var n = t,
      a = 0;
    do {
      var o = n.nextSibling;
      if ((e.removeChild(n), o && o.nodeType === 8))
        if (((n = o.data), n === "/$")) {
          if (a === 0) {
            (e.removeChild(o), ws(t));
            return;
          }
          a--;
        } else (n !== "$" && n !== "$?" && n !== "$!") || a++;
      n = o;
    } while (n);
    ws(t);
  }
  function Fn(e) {
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
  function yc(e) {
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
  var Lr = Math.random().toString(36).slice(2),
    sn = "__reactFiber$" + Lr,
    Os = "__reactProps$" + Lr,
    pn = "__reactContainer$" + Lr,
    xl = "__reactEvents$" + Lr,
    Wh = "__reactListeners$" + Lr,
    Zh = "__reactHandles$" + Lr;
  function ar(e) {
    var t = e[sn];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[pn] || n[sn])) {
        if (
          ((n = t.alternate),
          t.child !== null || (n !== null && n.child !== null))
        )
          for (e = yc(e); e !== null; ) {
            if ((n = e[sn])) return n;
            e = yc(e);
          }
        return t;
      }
      ((e = n), (n = e.parentNode));
    }
    return null;
  }
  function Is(e) {
    return (
      (e = e[sn] || e[pn]),
      !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
        ? null
        : e
    );
  }
  function Fr(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(i(33));
  }
  function Oi(e) {
    return e[Os] || null;
  }
  var wl = [],
    Mr = -1;
  function Mn(e) {
    return { current: e };
  }
  function Ke(e) {
    0 > Mr || ((e.current = wl[Mr]), (wl[Mr] = null), Mr--);
  }
  function He(e, t) {
    (Mr++, (wl[Mr] = e.current), (e.current = t));
  }
  var Vn = {},
    vt = Mn(Vn),
    Nt = Mn(!1),
    lr = Vn;
  function Vr(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Vn;
    var a = e.stateNode;
    if (a && a.__reactInternalMemoizedUnmaskedChildContext === t)
      return a.__reactInternalMemoizedMaskedChildContext;
    var o = {},
      c;
    for (c in n) o[c] = t[c];
    return (
      a &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = t),
        (e.__reactInternalMemoizedMaskedChildContext = o)),
      o
    );
  }
  function Ct(e) {
    return ((e = e.childContextTypes), e != null);
  }
  function Ii() {
    (Ke(Nt), Ke(vt));
  }
  function gc(e, t, n) {
    if (vt.current !== Vn) throw Error(i(168));
    (He(vt, t), He(Nt, n));
  }
  function xc(e, t, n) {
    var a = e.stateNode;
    if (((t = t.childContextTypes), typeof a.getChildContext != "function"))
      return n;
    a = a.getChildContext();
    for (var o in a) if (!(o in t)) throw Error(i(108, De(e) || "Unknown", o));
    return K({}, n, a);
  }
  function Ai(e) {
    return (
      (e =
        ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
        Vn),
      (lr = vt.current),
      He(vt, e),
      He(Nt, Nt.current),
      !0
    );
  }
  function wc(e, t, n) {
    var a = e.stateNode;
    if (!a) throw Error(i(169));
    (n
      ? ((e = xc(e, t, lr)),
        (a.__reactInternalMemoizedMergedChildContext = e),
        Ke(Nt),
        Ke(vt),
        He(vt, e))
      : Ke(Nt),
      He(Nt, n));
  }
  var hn = null,
    Di = !1,
    _l = !1;
  function _c(e) {
    hn === null ? (hn = [e]) : hn.push(e);
  }
  function Hh(e) {
    ((Di = !0), _c(e));
  }
  function zn() {
    if (!_l && hn !== null) {
      _l = !0;
      var e = 0,
        t = We;
      try {
        var n = hn;
        for (We = 1; e < n.length; e++) {
          var a = n[e];
          do a = a(!0);
          while (a !== null);
        }
        ((hn = null), (Di = !1));
      } catch (o) {
        throw (hn !== null && (hn = hn.slice(e + 1)), Su(Ba, zn), o);
      } finally {
        ((We = t), (_l = !1));
      }
    }
    return null;
  }
  var zr = [],
    Ur = 0,
    Li = null,
    Fi = 0,
    Ut = [],
    $t = 0,
    or = null,
    mn = 1,
    vn = "";
  function ur(e, t) {
    ((zr[Ur++] = Fi), (zr[Ur++] = Li), (Li = e), (Fi = t));
  }
  function kc(e, t, n) {
    ((Ut[$t++] = mn), (Ut[$t++] = vn), (Ut[$t++] = or), (or = e));
    var a = mn;
    e = vn;
    var o = 32 - Qt(a) - 1;
    ((a &= ~(1 << o)), (n += 1));
    var c = 32 - Qt(t) + o;
    if (30 < c) {
      var f = o - (o % 5);
      ((c = (a & ((1 << f) - 1)).toString(32)),
        (a >>= f),
        (o -= f),
        (mn = (1 << (32 - Qt(t) + o)) | (n << o) | a),
        (vn = c + e));
    } else ((mn = (1 << c) | (n << o) | a), (vn = e));
  }
  function kl(e) {
    e.return !== null && (ur(e, 1), kc(e, 1, 0));
  }
  function Sl(e) {
    for (; e === Li; )
      ((Li = zr[--Ur]), (zr[Ur] = null), (Fi = zr[--Ur]), (zr[Ur] = null));
    for (; e === or; )
      ((or = Ut[--$t]),
        (Ut[$t] = null),
        (vn = Ut[--$t]),
        (Ut[$t] = null),
        (mn = Ut[--$t]),
        (Ut[$t] = null));
  }
  var At = null,
    Dt = null,
    qe = !1,
    qt = null;
  function Sc(e, t) {
    var n = Zt(5, null, null, 0);
    ((n.elementType = "DELETED"),
      (n.stateNode = t),
      (n.return = e),
      (t = e.deletions),
      t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
  }
  function Ec(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return (
          (t =
            t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
              ? null
              : t),
          t !== null
            ? ((e.stateNode = t), (At = e), (Dt = Fn(t.firstChild)), !0)
            : !1
        );
      case 6:
        return (
          (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
          t !== null ? ((e.stateNode = t), (At = e), (Dt = null), !0) : !1
        );
      case 13:
        return (
          (t = t.nodeType !== 8 ? null : t),
          t !== null
            ? ((n = or !== null ? { id: mn, overflow: vn } : null),
              (e.memoizedState = {
                dehydrated: t,
                treeContext: n,
                retryLane: 1073741824,
              }),
              (n = Zt(18, null, null, 0)),
              (n.stateNode = t),
              (n.return = e),
              (e.child = n),
              (At = e),
              (Dt = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function El(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function Nl(e) {
    if (qe) {
      var t = Dt;
      if (t) {
        var n = t;
        if (!Ec(e, t)) {
          if (El(e)) throw Error(i(418));
          t = Fn(n.nextSibling);
          var a = At;
          t && Ec(e, t)
            ? Sc(a, n)
            : ((e.flags = (e.flags & -4097) | 2), (qe = !1), (At = e));
        }
      } else {
        if (El(e)) throw Error(i(418));
        ((e.flags = (e.flags & -4097) | 2), (qe = !1), (At = e));
      }
    }
  }
  function Nc(e) {
    for (
      e = e.return;
      e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

    )
      e = e.return;
    At = e;
  }
  function Mi(e) {
    if (e !== At) return !1;
    if (!qe) return (Nc(e), (qe = !0), !1);
    var t;
    if (
      ((t = e.tag !== 3) &&
        !(t = e.tag !== 5) &&
        ((t = e.type),
        (t = t !== "head" && t !== "body" && !vl(e.type, e.memoizedProps))),
      t && (t = Dt))
    ) {
      if (El(e)) throw (Cc(), Error(i(418)));
      for (; t; ) (Sc(e, t), (t = Fn(t.nextSibling)));
    }
    if ((Nc(e), e.tag === 13)) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(i(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === "/$") {
              if (t === 0) {
                Dt = Fn(e.nextSibling);
                break e;
              }
              t--;
            } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
          }
          e = e.nextSibling;
        }
        Dt = null;
      }
    } else Dt = At ? Fn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Cc() {
    for (var e = Dt; e; ) e = Fn(e.nextSibling);
  }
  function $r() {
    ((Dt = At = null), (qe = !1));
  }
  function Cl(e) {
    qt === null ? (qt = [e]) : qt.push(e);
  }
  var Qh = X.ReactCurrentBatchConfig;
  function As(e, t, n) {
    if (
      ((e = n.ref),
      e !== null && typeof e != "function" && typeof e != "object")
    ) {
      if (n._owner) {
        if (((n = n._owner), n)) {
          if (n.tag !== 1) throw Error(i(309));
          var a = n.stateNode;
        }
        if (!a) throw Error(i(147, e));
        var o = a,
          c = "" + e;
        return t !== null &&
          t.ref !== null &&
          typeof t.ref == "function" &&
          t.ref._stringRef === c
          ? t.ref
          : ((t = function (f) {
              var g = o.refs;
              f === null ? delete g[c] : (g[c] = f);
            }),
            (t._stringRef = c),
            t);
      }
      if (typeof e != "string") throw Error(i(284));
      if (!n._owner) throw Error(i(290, e));
    }
    return e;
  }
  function Vi(e, t) {
    throw (
      (e = Object.prototype.toString.call(t)),
      Error(
        i(
          31,
          e === "[object Object]"
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : e,
        ),
      )
    );
  }
  function jc(e) {
    var t = e._init;
    return t(e._payload);
  }
  function Tc(e) {
    function t(C, k) {
      if (e) {
        var j = C.deletions;
        j === null ? ((C.deletions = [k]), (C.flags |= 16)) : j.push(k);
      }
    }
    function n(C, k) {
      if (!e) return null;
      for (; k !== null; ) (t(C, k), (k = k.sibling));
      return null;
    }
    function a(C, k) {
      for (C = new Map(); k !== null; )
        (k.key !== null ? C.set(k.key, k) : C.set(k.index, k), (k = k.sibling));
      return C;
    }
    function o(C, k) {
      return ((C = Qn(C, k)), (C.index = 0), (C.sibling = null), C);
    }
    function c(C, k, j) {
      return (
        (C.index = j),
        e
          ? ((j = C.alternate),
            j !== null
              ? ((j = j.index), j < k ? ((C.flags |= 2), k) : j)
              : ((C.flags |= 2), k))
          : ((C.flags |= 1048576), k)
      );
    }
    function f(C) {
      return (e && C.alternate === null && (C.flags |= 2), C);
    }
    function g(C, k, j, U) {
      return k === null || k.tag !== 6
        ? ((k = go(j, C.mode, U)), (k.return = C), k)
        : ((k = o(k, j)), (k.return = C), k);
    }
    function _(C, k, j, U) {
      var ce = j.type;
      return ce === Te
        ? M(C, k, j.props.children, U, j.key)
        : k !== null &&
            (k.elementType === ce ||
              (typeof ce == "object" &&
                ce !== null &&
                ce.$$typeof === Re &&
                jc(ce) === k.type))
          ? ((U = o(k, j.props)), (U.ref = As(C, k, j)), (U.return = C), U)
          : ((U = oa(j.type, j.key, j.props, null, C.mode, U)),
            (U.ref = As(C, k, j)),
            (U.return = C),
            U);
    }
    function R(C, k, j, U) {
      return k === null ||
        k.tag !== 4 ||
        k.stateNode.containerInfo !== j.containerInfo ||
        k.stateNode.implementation !== j.implementation
        ? ((k = xo(j, C.mode, U)), (k.return = C), k)
        : ((k = o(k, j.children || [])), (k.return = C), k);
    }
    function M(C, k, j, U, ce) {
      return k === null || k.tag !== 7
        ? ((k = yr(j, C.mode, U, ce)), (k.return = C), k)
        : ((k = o(k, j)), (k.return = C), k);
    }
    function V(C, k, j) {
      if ((typeof k == "string" && k !== "") || typeof k == "number")
        return ((k = go("" + k, C.mode, j)), (k.return = C), k);
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case he:
            return (
              (j = oa(k.type, k.key, k.props, null, C.mode, j)),
              (j.ref = As(C, null, k)),
              (j.return = C),
              j
            );
          case ie:
            return ((k = xo(k, C.mode, j)), (k.return = C), k);
          case Re:
            var U = k._init;
            return V(C, U(k._payload), j);
        }
        if (v(k) || ae(k))
          return ((k = yr(k, C.mode, j, null)), (k.return = C), k);
        Vi(C, k);
      }
      return null;
    }
    function F(C, k, j, U) {
      var ce = k !== null ? k.key : null;
      if ((typeof j == "string" && j !== "") || typeof j == "number")
        return ce !== null ? null : g(C, k, "" + j, U);
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case he:
            return j.key === ce ? _(C, k, j, U) : null;
          case ie:
            return j.key === ce ? R(C, k, j, U) : null;
          case Re:
            return ((ce = j._init), F(C, k, ce(j._payload), U));
        }
        if (v(j) || ae(j)) return ce !== null ? null : M(C, k, j, U, null);
        Vi(C, j);
      }
      return null;
    }
    function ee(C, k, j, U, ce) {
      if ((typeof U == "string" && U !== "") || typeof U == "number")
        return ((C = C.get(j) || null), g(k, C, "" + U, ce));
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case he:
            return (
              (C = C.get(U.key === null ? j : U.key) || null),
              _(k, C, U, ce)
            );
          case ie:
            return (
              (C = C.get(U.key === null ? j : U.key) || null),
              R(k, C, U, ce)
            );
          case Re:
            var ve = U._init;
            return ee(C, k, j, ve(U._payload), ce);
        }
        if (v(U) || ae(U))
          return ((C = C.get(j) || null), M(k, C, U, ce, null));
        Vi(k, U);
      }
      return null;
    }
    function se(C, k, j, U) {
      for (
        var ce = null, ve = null, ye = k, _e = (k = 0), pt = null;
        ye !== null && _e < j.length;
        _e++
      ) {
        ye.index > _e ? ((pt = ye), (ye = null)) : (pt = ye.sibling);
        var Ue = F(C, ye, j[_e], U);
        if (Ue === null) {
          ye === null && (ye = pt);
          break;
        }
        (e && ye && Ue.alternate === null && t(C, ye),
          (k = c(Ue, k, _e)),
          ve === null ? (ce = Ue) : (ve.sibling = Ue),
          (ve = Ue),
          (ye = pt));
      }
      if (_e === j.length) return (n(C, ye), qe && ur(C, _e), ce);
      if (ye === null) {
        for (; _e < j.length; _e++)
          ((ye = V(C, j[_e], U)),
            ye !== null &&
              ((k = c(ye, k, _e)),
              ve === null ? (ce = ye) : (ve.sibling = ye),
              (ve = ye)));
        return (qe && ur(C, _e), ce);
      }
      for (ye = a(C, ye); _e < j.length; _e++)
        ((pt = ee(ye, C, _e, j[_e], U)),
          pt !== null &&
            (e &&
              pt.alternate !== null &&
              ye.delete(pt.key === null ? _e : pt.key),
            (k = c(pt, k, _e)),
            ve === null ? (ce = pt) : (ve.sibling = pt),
            (ve = pt)));
      return (
        e &&
          ye.forEach(function (Kn) {
            return t(C, Kn);
          }),
        qe && ur(C, _e),
        ce
      );
    }
    function oe(C, k, j, U) {
      var ce = ae(j);
      if (typeof ce != "function") throw Error(i(150));
      if (((j = ce.call(j)), j == null)) throw Error(i(151));
      for (
        var ve = (ce = null), ye = k, _e = (k = 0), pt = null, Ue = j.next();
        ye !== null && !Ue.done;
        _e++, Ue = j.next()
      ) {
        ye.index > _e ? ((pt = ye), (ye = null)) : (pt = ye.sibling);
        var Kn = F(C, ye, Ue.value, U);
        if (Kn === null) {
          ye === null && (ye = pt);
          break;
        }
        (e && ye && Kn.alternate === null && t(C, ye),
          (k = c(Kn, k, _e)),
          ve === null ? (ce = Kn) : (ve.sibling = Kn),
          (ve = Kn),
          (ye = pt));
      }
      if (Ue.done) return (n(C, ye), qe && ur(C, _e), ce);
      if (ye === null) {
        for (; !Ue.done; _e++, Ue = j.next())
          ((Ue = V(C, Ue.value, U)),
            Ue !== null &&
              ((k = c(Ue, k, _e)),
              ve === null ? (ce = Ue) : (ve.sibling = Ue),
              (ve = Ue)));
        return (qe && ur(C, _e), ce);
      }
      for (ye = a(C, ye); !Ue.done; _e++, Ue = j.next())
        ((Ue = ee(ye, C, _e, Ue.value, U)),
          Ue !== null &&
            (e &&
              Ue.alternate !== null &&
              ye.delete(Ue.key === null ? _e : Ue.key),
            (k = c(Ue, k, _e)),
            ve === null ? (ce = Ue) : (ve.sibling = Ue),
            (ve = Ue)));
      return (
        e &&
          ye.forEach(function (Cm) {
            return t(C, Cm);
          }),
        qe && ur(C, _e),
        ce
      );
    }
    function tt(C, k, j, U) {
      if (
        (typeof j == "object" &&
          j !== null &&
          j.type === Te &&
          j.key === null &&
          (j = j.props.children),
        typeof j == "object" && j !== null)
      ) {
        switch (j.$$typeof) {
          case he:
            e: {
              for (var ce = j.key, ve = k; ve !== null; ) {
                if (ve.key === ce) {
                  if (((ce = j.type), ce === Te)) {
                    if (ve.tag === 7) {
                      (n(C, ve.sibling),
                        (k = o(ve, j.props.children)),
                        (k.return = C),
                        (C = k));
                      break e;
                    }
                  } else if (
                    ve.elementType === ce ||
                    (typeof ce == "object" &&
                      ce !== null &&
                      ce.$$typeof === Re &&
                      jc(ce) === ve.type)
                  ) {
                    (n(C, ve.sibling),
                      (k = o(ve, j.props)),
                      (k.ref = As(C, ve, j)),
                      (k.return = C),
                      (C = k));
                    break e;
                  }
                  n(C, ve);
                  break;
                } else t(C, ve);
                ve = ve.sibling;
              }
              j.type === Te
                ? ((k = yr(j.props.children, C.mode, U, j.key)),
                  (k.return = C),
                  (C = k))
                : ((U = oa(j.type, j.key, j.props, null, C.mode, U)),
                  (U.ref = As(C, k, j)),
                  (U.return = C),
                  (C = U));
            }
            return f(C);
          case ie:
            e: {
              for (ve = j.key; k !== null; ) {
                if (k.key === ve)
                  if (
                    k.tag === 4 &&
                    k.stateNode.containerInfo === j.containerInfo &&
                    k.stateNode.implementation === j.implementation
                  ) {
                    (n(C, k.sibling),
                      (k = o(k, j.children || [])),
                      (k.return = C),
                      (C = k));
                    break e;
                  } else {
                    n(C, k);
                    break;
                  }
                else t(C, k);
                k = k.sibling;
              }
              ((k = xo(j, C.mode, U)), (k.return = C), (C = k));
            }
            return f(C);
          case Re:
            return ((ve = j._init), tt(C, k, ve(j._payload), U));
        }
        if (v(j)) return se(C, k, j, U);
        if (ae(j)) return oe(C, k, j, U);
        Vi(C, j);
      }
      return (typeof j == "string" && j !== "") || typeof j == "number"
        ? ((j = "" + j),
          k !== null && k.tag === 6
            ? (n(C, k.sibling), (k = o(k, j)), (k.return = C), (C = k))
            : (n(C, k), (k = go(j, C.mode, U)), (k.return = C), (C = k)),
          f(C))
        : n(C, k);
    }
    return tt;
  }
  var br = Tc(!0),
    Pc = Tc(!1),
    zi = Mn(null),
    Ui = null,
    Br = null,
    jl = null;
  function Tl() {
    jl = Br = Ui = null;
  }
  function Pl(e) {
    var t = zi.current;
    (Ke(zi), (e._currentValue = t));
  }
  function Rl(e, t, n) {
    for (; e !== null; ) {
      var a = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), a !== null && (a.childLanes |= t))
          : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
        e === n)
      )
        break;
      e = e.return;
    }
  }
  function Wr(e, t) {
    ((Ui = e),
      (jl = Br = null),
      (e = e.dependencies),
      e !== null &&
        e.firstContext !== null &&
        ((e.lanes & t) !== 0 && (jt = !0), (e.firstContext = null)));
  }
  function bt(e) {
    var t = e._currentValue;
    if (jl !== e)
      if (((e = { context: e, memoizedValue: t, next: null }), Br === null)) {
        if (Ui === null) throw Error(i(308));
        ((Br = e), (Ui.dependencies = { lanes: 0, firstContext: e }));
      } else Br = Br.next = e;
    return t;
  }
  var cr = null;
  function Ol(e) {
    cr === null ? (cr = [e]) : cr.push(e);
  }
  function Rc(e, t, n, a) {
    var o = t.interleaved;
    return (
      o === null ? ((n.next = n), Ol(t)) : ((n.next = o.next), (o.next = n)),
      (t.interleaved = n),
      yn(e, a)
    );
  }
  function yn(e, t) {
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
  var Un = !1;
  function Il(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function Oc(e, t) {
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
  function gn(e, t) {
    return {
      eventTime: e,
      lane: t,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    };
  }
  function $n(e, t, n) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (Ve & 2) !== 0)) {
      var o = a.pending;
      return (
        o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
        (a.pending = t),
        yn(e, n)
      );
    }
    return (
      (o = a.interleaved),
      o === null ? ((t.next = t), Ol(a)) : ((t.next = o.next), (o.next = t)),
      (a.interleaved = t),
      yn(e, n)
    );
  }
  function $i(e, t, n) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
    ) {
      var a = t.lanes;
      ((a &= e.pendingLanes), (n |= a), (t.lanes = n), Ha(e, n));
    }
  }
  function Ic(e, t) {
    var n = e.updateQueue,
      a = e.alternate;
    if (a !== null && ((a = a.updateQueue), n === a)) {
      var o = null,
        c = null;
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
          (c === null ? (o = c = f) : (c = c.next = f), (n = n.next));
        } while (n !== null);
        c === null ? (o = c = t) : (c = c.next = t);
      } else o = c = t;
      ((n = {
        baseState: a.baseState,
        firstBaseUpdate: o,
        lastBaseUpdate: c,
        shared: a.shared,
        effects: a.effects,
      }),
        (e.updateQueue = n));
      return;
    }
    ((e = n.lastBaseUpdate),
      e === null ? (n.firstBaseUpdate = t) : (e.next = t),
      (n.lastBaseUpdate = t));
  }
  function bi(e, t, n, a) {
    var o = e.updateQueue;
    Un = !1;
    var c = o.firstBaseUpdate,
      f = o.lastBaseUpdate,
      g = o.shared.pending;
    if (g !== null) {
      o.shared.pending = null;
      var _ = g,
        R = _.next;
      ((_.next = null), f === null ? (c = R) : (f.next = R), (f = _));
      var M = e.alternate;
      M !== null &&
        ((M = M.updateQueue),
        (g = M.lastBaseUpdate),
        g !== f &&
          (g === null ? (M.firstBaseUpdate = R) : (g.next = R),
          (M.lastBaseUpdate = _)));
    }
    if (c !== null) {
      var V = o.baseState;
      ((f = 0), (M = R = _ = null), (g = c));
      do {
        var F = g.lane,
          ee = g.eventTime;
        if ((a & F) === F) {
          M !== null &&
            (M = M.next =
              {
                eventTime: ee,
                lane: 0,
                tag: g.tag,
                payload: g.payload,
                callback: g.callback,
                next: null,
              });
          e: {
            var se = e,
              oe = g;
            switch (((F = t), (ee = n), oe.tag)) {
              case 1:
                if (((se = oe.payload), typeof se == "function")) {
                  V = se.call(ee, V, F);
                  break e;
                }
                V = se;
                break e;
              case 3:
                se.flags = (se.flags & -65537) | 128;
              case 0:
                if (
                  ((se = oe.payload),
                  (F = typeof se == "function" ? se.call(ee, V, F) : se),
                  F == null)
                )
                  break e;
                V = K({}, V, F);
                break e;
              case 2:
                Un = !0;
            }
          }
          g.callback !== null &&
            g.lane !== 0 &&
            ((e.flags |= 64),
            (F = o.effects),
            F === null ? (o.effects = [g]) : F.push(g));
        } else
          ((ee = {
            eventTime: ee,
            lane: F,
            tag: g.tag,
            payload: g.payload,
            callback: g.callback,
            next: null,
          }),
            M === null ? ((R = M = ee), (_ = V)) : (M = M.next = ee),
            (f |= F));
        if (((g = g.next), g === null)) {
          if (((g = o.shared.pending), g === null)) break;
          ((F = g),
            (g = F.next),
            (F.next = null),
            (o.lastBaseUpdate = F),
            (o.shared.pending = null));
        }
      } while (!0);
      if (
        (M === null && (_ = V),
        (o.baseState = _),
        (o.firstBaseUpdate = R),
        (o.lastBaseUpdate = M),
        (t = o.shared.interleaved),
        t !== null)
      ) {
        o = t;
        do ((f |= o.lane), (o = o.next));
        while (o !== t);
      } else c === null && (o.shared.lanes = 0);
      ((pr |= f), (e.lanes = f), (e.memoizedState = V));
    }
  }
  function Ac(e, t, n) {
    if (((e = t.effects), (t.effects = null), e !== null))
      for (t = 0; t < e.length; t++) {
        var a = e[t],
          o = a.callback;
        if (o !== null) {
          if (((a.callback = null), (a = n), typeof o != "function"))
            throw Error(i(191, o));
          o.call(a);
        }
      }
  }
  var Ds = {},
    an = Mn(Ds),
    Ls = Mn(Ds),
    Fs = Mn(Ds);
  function dr(e) {
    if (e === Ds) throw Error(i(174));
    return e;
  }
  function Al(e, t) {
    switch ((He(Fs, t), He(Ls, e), He(an, Ds), (e = t.nodeType), e)) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Me(null, "");
        break;
      default:
        ((e = e === 8 ? t.parentNode : t),
          (t = e.namespaceURI || null),
          (e = e.tagName),
          (t = Me(t, e)));
    }
    (Ke(an), He(an, t));
  }
  function Zr() {
    (Ke(an), Ke(Ls), Ke(Fs));
  }
  function Dc(e) {
    dr(Fs.current);
    var t = dr(an.current),
      n = Me(t, e.type);
    t !== n && (He(Ls, e), He(an, n));
  }
  function Dl(e) {
    Ls.current === e && (Ke(an), Ke(Ls));
  }
  var Je = Mn(0);
  function Bi(e) {
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
  var Ll = [];
  function Fl() {
    for (var e = 0; e < Ll.length; e++)
      Ll[e]._workInProgressVersionPrimary = null;
    Ll.length = 0;
  }
  var Wi = X.ReactCurrentDispatcher,
    Ml = X.ReactCurrentBatchConfig,
    fr = 0,
    Ye = null,
    ot = null,
    dt = null,
    Zi = !1,
    Ms = !1,
    Vs = 0,
    Kh = 0;
  function yt() {
    throw Error(i(321));
  }
  function Vl(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!Kt(e[n], t[n])) return !1;
    return !0;
  }
  function zl(e, t, n, a, o, c) {
    if (
      ((fr = c),
      (Ye = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (Wi.current = e === null || e.memoizedState === null ? Gh : Xh),
      (e = n(a, o)),
      Ms)
    ) {
      c = 0;
      do {
        if (((Ms = !1), (Vs = 0), 25 <= c)) throw Error(i(301));
        ((c += 1),
          (dt = ot = null),
          (t.updateQueue = null),
          (Wi.current = em),
          (e = n(a, o)));
      } while (Ms);
    }
    if (
      ((Wi.current = Ki),
      (t = ot !== null && ot.next !== null),
      (fr = 0),
      (dt = ot = Ye = null),
      (Zi = !1),
      t)
    )
      throw Error(i(300));
    return e;
  }
  function Ul() {
    var e = Vs !== 0;
    return ((Vs = 0), e);
  }
  function ln() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (dt === null ? (Ye.memoizedState = dt = e) : (dt = dt.next = e), dt);
  }
  function Bt() {
    if (ot === null) {
      var e = Ye.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = ot.next;
    var t = dt === null ? Ye.memoizedState : dt.next;
    if (t !== null) ((dt = t), (ot = e));
    else {
      if (e === null) throw Error(i(310));
      ((ot = e),
        (e = {
          memoizedState: ot.memoizedState,
          baseState: ot.baseState,
          baseQueue: ot.baseQueue,
          queue: ot.queue,
          next: null,
        }),
        dt === null ? (Ye.memoizedState = dt = e) : (dt = dt.next = e));
    }
    return dt;
  }
  function zs(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function $l(e) {
    var t = Bt(),
      n = t.queue;
    if (n === null) throw Error(i(311));
    n.lastRenderedReducer = e;
    var a = ot,
      o = a.baseQueue,
      c = n.pending;
    if (c !== null) {
      if (o !== null) {
        var f = o.next;
        ((o.next = c.next), (c.next = f));
      }
      ((a.baseQueue = o = c), (n.pending = null));
    }
    if (o !== null) {
      ((c = o.next), (a = a.baseState));
      var g = (f = null),
        _ = null,
        R = c;
      do {
        var M = R.lane;
        if ((fr & M) === M)
          (_ !== null &&
            (_ = _.next =
              {
                lane: 0,
                action: R.action,
                hasEagerState: R.hasEagerState,
                eagerState: R.eagerState,
                next: null,
              }),
            (a = R.hasEagerState ? R.eagerState : e(a, R.action)));
        else {
          var V = {
            lane: M,
            action: R.action,
            hasEagerState: R.hasEagerState,
            eagerState: R.eagerState,
            next: null,
          };
          (_ === null ? ((g = _ = V), (f = a)) : (_ = _.next = V),
            (Ye.lanes |= M),
            (pr |= M));
        }
        R = R.next;
      } while (R !== null && R !== c);
      (_ === null ? (f = a) : (_.next = g),
        Kt(a, t.memoizedState) || (jt = !0),
        (t.memoizedState = a),
        (t.baseState = f),
        (t.baseQueue = _),
        (n.lastRenderedState = a));
    }
    if (((e = n.interleaved), e !== null)) {
      o = e;
      do ((c = o.lane), (Ye.lanes |= c), (pr |= c), (o = o.next));
      while (o !== e);
    } else o === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function bl(e) {
    var t = Bt(),
      n = t.queue;
    if (n === null) throw Error(i(311));
    n.lastRenderedReducer = e;
    var a = n.dispatch,
      o = n.pending,
      c = t.memoizedState;
    if (o !== null) {
      n.pending = null;
      var f = (o = o.next);
      do ((c = e(c, f.action)), (f = f.next));
      while (f !== o);
      (Kt(c, t.memoizedState) || (jt = !0),
        (t.memoizedState = c),
        t.baseQueue === null && (t.baseState = c),
        (n.lastRenderedState = c));
    }
    return [c, a];
  }
  function Lc() {}
  function Fc(e, t) {
    var n = Ye,
      a = Bt(),
      o = t(),
      c = !Kt(a.memoizedState, o);
    if (
      (c && ((a.memoizedState = o), (jt = !0)),
      (a = a.queue),
      Bl(zc.bind(null, n, a, e), [e]),
      a.getSnapshot !== t || c || (dt !== null && dt.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        Us(9, Vc.bind(null, n, a, o, t), void 0, null),
        ft === null)
      )
        throw Error(i(349));
      (fr & 30) !== 0 || Mc(n, t, o);
    }
    return o;
  }
  function Mc(e, t, n) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = Ye.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (Ye.updateQueue = t),
          (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
  }
  function Vc(e, t, n, a) {
    ((t.value = n), (t.getSnapshot = a), Uc(t) && $c(e));
  }
  function zc(e, t, n) {
    return n(function () {
      Uc(t) && $c(e);
    });
  }
  function Uc(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !Kt(e, n);
    } catch {
      return !0;
    }
  }
  function $c(e) {
    var t = yn(e, 1);
    t !== null && Xt(t, e, 1, -1);
  }
  function bc(e) {
    var t = ln();
    return (
      typeof e == "function" && (e = e()),
      (t.memoizedState = t.baseState = e),
      (e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: zs,
        lastRenderedState: e,
      }),
      (t.queue = e),
      (e = e.dispatch = Yh.bind(null, Ye, e)),
      [t.memoizedState, e]
    );
  }
  function Us(e, t, n, a) {
    return (
      (e = { tag: e, create: t, destroy: n, deps: a, next: null }),
      (t = Ye.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (Ye.updateQueue = t),
          (t.lastEffect = e.next = e))
        : ((n = t.lastEffect),
          n === null
            ? (t.lastEffect = e.next = e)
            : ((a = n.next), (n.next = e), (e.next = a), (t.lastEffect = e))),
      e
    );
  }
  function Bc() {
    return Bt().memoizedState;
  }
  function Hi(e, t, n, a) {
    var o = ln();
    ((Ye.flags |= e),
      (o.memoizedState = Us(1 | t, n, void 0, a === void 0 ? null : a)));
  }
  function Qi(e, t, n, a) {
    var o = Bt();
    a = a === void 0 ? null : a;
    var c = void 0;
    if (ot !== null) {
      var f = ot.memoizedState;
      if (((c = f.destroy), a !== null && Vl(a, f.deps))) {
        o.memoizedState = Us(t, n, c, a);
        return;
      }
    }
    ((Ye.flags |= e), (o.memoizedState = Us(1 | t, n, c, a)));
  }
  function Wc(e, t) {
    return Hi(8390656, 8, e, t);
  }
  function Bl(e, t) {
    return Qi(2048, 8, e, t);
  }
  function Zc(e, t) {
    return Qi(4, 2, e, t);
  }
  function Hc(e, t) {
    return Qi(4, 4, e, t);
  }
  function Qc(e, t) {
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
  function Kc(e, t, n) {
    return (
      (n = n != null ? n.concat([e]) : null),
      Qi(4, 4, Qc.bind(null, t, e), n)
    );
  }
  function Wl() {}
  function qc(e, t) {
    var n = Bt();
    t = t === void 0 ? null : t;
    var a = n.memoizedState;
    return a !== null && t !== null && Vl(t, a[1])
      ? a[0]
      : ((n.memoizedState = [e, t]), e);
  }
  function Jc(e, t) {
    var n = Bt();
    t = t === void 0 ? null : t;
    var a = n.memoizedState;
    return a !== null && t !== null && Vl(t, a[1])
      ? a[0]
      : ((e = e()), (n.memoizedState = [e, t]), e);
  }
  function Yc(e, t, n) {
    return (fr & 21) === 0
      ? (e.baseState && ((e.baseState = !1), (jt = !0)), (e.memoizedState = n))
      : (Kt(n, t) ||
          ((n = ju()), (Ye.lanes |= n), (pr |= n), (e.baseState = !0)),
        t);
  }
  function qh(e, t) {
    var n = We;
    ((We = n !== 0 && 4 > n ? n : 4), e(!0));
    var a = Ml.transition;
    Ml.transition = {};
    try {
      (e(!1), t());
    } finally {
      ((We = n), (Ml.transition = a));
    }
  }
  function Gc() {
    return Bt().memoizedState;
  }
  function Jh(e, t, n) {
    var a = Zn(e);
    if (
      ((n = {
        lane: a,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Xc(e))
    )
      ed(t, n);
    else if (((n = Rc(e, t, n, a)), n !== null)) {
      var o = kt();
      (Xt(n, e, a, o), td(n, t, a));
    }
  }
  function Yh(e, t, n) {
    var a = Zn(e),
      o = {
        lane: a,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
    if (Xc(e)) ed(t, o);
    else {
      var c = e.alternate;
      if (
        e.lanes === 0 &&
        (c === null || c.lanes === 0) &&
        ((c = t.lastRenderedReducer), c !== null)
      )
        try {
          var f = t.lastRenderedState,
            g = c(f, n);
          if (((o.hasEagerState = !0), (o.eagerState = g), Kt(g, f))) {
            var _ = t.interleaved;
            (_ === null
              ? ((o.next = o), Ol(t))
              : ((o.next = _.next), (_.next = o)),
              (t.interleaved = o));
            return;
          }
        } catch {
        } finally {
        }
      ((n = Rc(e, t, o, a)),
        n !== null && ((o = kt()), Xt(n, e, a, o), td(n, t, a)));
    }
  }
  function Xc(e) {
    var t = e.alternate;
    return e === Ye || (t !== null && t === Ye);
  }
  function ed(e, t) {
    Ms = Zi = !0;
    var n = e.pending;
    (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
      (e.pending = t));
  }
  function td(e, t, n) {
    if ((n & 4194240) !== 0) {
      var a = t.lanes;
      ((a &= e.pendingLanes), (n |= a), (t.lanes = n), Ha(e, n));
    }
  }
  var Ki = {
      readContext: bt,
      useCallback: yt,
      useContext: yt,
      useEffect: yt,
      useImperativeHandle: yt,
      useInsertionEffect: yt,
      useLayoutEffect: yt,
      useMemo: yt,
      useReducer: yt,
      useRef: yt,
      useState: yt,
      useDebugValue: yt,
      useDeferredValue: yt,
      useTransition: yt,
      useMutableSource: yt,
      useSyncExternalStore: yt,
      useId: yt,
      unstable_isNewReconciler: !1,
    },
    Gh = {
      readContext: bt,
      useCallback: function (e, t) {
        return ((ln().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: bt,
      useEffect: Wc,
      useImperativeHandle: function (e, t, n) {
        return (
          (n = n != null ? n.concat([e]) : null),
          Hi(4194308, 4, Qc.bind(null, t, e), n)
        );
      },
      useLayoutEffect: function (e, t) {
        return Hi(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        return Hi(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = ln();
        return (
          (t = t === void 0 ? null : t),
          (e = e()),
          (n.memoizedState = [e, t]),
          e
        );
      },
      useReducer: function (e, t, n) {
        var a = ln();
        return (
          (t = n !== void 0 ? n(t) : t),
          (a.memoizedState = a.baseState = t),
          (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t,
          }),
          (a.queue = e),
          (e = e.dispatch = Jh.bind(null, Ye, e)),
          [a.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = ln();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: bc,
      useDebugValue: Wl,
      useDeferredValue: function (e) {
        return (ln().memoizedState = e);
      },
      useTransition: function () {
        var e = bc(!1),
          t = e[0];
        return ((e = qh.bind(null, e[1])), (ln().memoizedState = e), [t, e]);
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (e, t, n) {
        var a = Ye,
          o = ln();
        if (qe) {
          if (n === void 0) throw Error(i(407));
          n = n();
        } else {
          if (((n = t()), ft === null)) throw Error(i(349));
          (fr & 30) !== 0 || Mc(a, t, n);
        }
        o.memoizedState = n;
        var c = { value: n, getSnapshot: t };
        return (
          (o.queue = c),
          Wc(zc.bind(null, a, c, e), [e]),
          (a.flags |= 2048),
          Us(9, Vc.bind(null, a, c, n, t), void 0, null),
          n
        );
      },
      useId: function () {
        var e = ln(),
          t = ft.identifierPrefix;
        if (qe) {
          var n = vn,
            a = mn;
          ((n = (a & ~(1 << (32 - Qt(a) - 1))).toString(32) + n),
            (t = ":" + t + "R" + n),
            (n = Vs++),
            0 < n && (t += "H" + n.toString(32)),
            (t += ":"));
        } else ((n = Kh++), (t = ":" + t + "r" + n.toString(32) + ":"));
        return (e.memoizedState = t);
      },
      unstable_isNewReconciler: !1,
    },
    Xh = {
      readContext: bt,
      useCallback: qc,
      useContext: bt,
      useEffect: Bl,
      useImperativeHandle: Kc,
      useInsertionEffect: Zc,
      useLayoutEffect: Hc,
      useMemo: Jc,
      useReducer: $l,
      useRef: Bc,
      useState: function () {
        return $l(zs);
      },
      useDebugValue: Wl,
      useDeferredValue: function (e) {
        var t = Bt();
        return Yc(t, ot.memoizedState, e);
      },
      useTransition: function () {
        var e = $l(zs)[0],
          t = Bt().memoizedState;
        return [e, t];
      },
      useMutableSource: Lc,
      useSyncExternalStore: Fc,
      useId: Gc,
      unstable_isNewReconciler: !1,
    },
    em = {
      readContext: bt,
      useCallback: qc,
      useContext: bt,
      useEffect: Bl,
      useImperativeHandle: Kc,
      useInsertionEffect: Zc,
      useLayoutEffect: Hc,
      useMemo: Jc,
      useReducer: bl,
      useRef: Bc,
      useState: function () {
        return bl(zs);
      },
      useDebugValue: Wl,
      useDeferredValue: function (e) {
        var t = Bt();
        return ot === null ? (t.memoizedState = e) : Yc(t, ot.memoizedState, e);
      },
      useTransition: function () {
        var e = bl(zs)[0],
          t = Bt().memoizedState;
        return [e, t];
      },
      useMutableSource: Lc,
      useSyncExternalStore: Fc,
      useId: Gc,
      unstable_isNewReconciler: !1,
    };
  function Jt(e, t) {
    if (e && e.defaultProps) {
      ((t = K({}, t)), (e = e.defaultProps));
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function Zl(e, t, n, a) {
    ((t = e.memoizedState),
      (n = n(a, t)),
      (n = n == null ? t : K({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n));
  }
  var qi = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? ir(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var a = kt(),
        o = Zn(e),
        c = gn(a, o);
      ((c.payload = t),
        n != null && (c.callback = n),
        (t = $n(e, c, o)),
        t !== null && (Xt(t, e, o, a), $i(t, e, o)));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var a = kt(),
        o = Zn(e),
        c = gn(a, o);
      ((c.tag = 1),
        (c.payload = t),
        n != null && (c.callback = n),
        (t = $n(e, c, o)),
        t !== null && (Xt(t, e, o, a), $i(t, e, o)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = kt(),
        a = Zn(e),
        o = gn(n, a);
      ((o.tag = 2),
        t != null && (o.callback = t),
        (t = $n(e, o, a)),
        t !== null && (Xt(t, e, a, n), $i(t, e, a)));
    },
  };
  function nd(e, t, n, a, o, c, f) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(a, c, f)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Cs(n, a) || !Cs(o, c)
          : !0
    );
  }
  function rd(e, t, n) {
    var a = !1,
      o = Vn,
      c = t.contextType;
    return (
      typeof c == "object" && c !== null
        ? (c = bt(c))
        : ((o = Ct(t) ? lr : vt.current),
          (a = t.contextTypes),
          (c = (a = a != null) ? Vr(e, o) : Vn)),
      (t = new t(n, c)),
      (e.memoizedState =
        t.state !== null && t.state !== void 0 ? t.state : null),
      (t.updater = qi),
      (e.stateNode = t),
      (t._reactInternals = e),
      a &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = o),
        (e.__reactInternalMemoizedMaskedChildContext = c)),
      t
    );
  }
  function sd(e, t, n, a) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(n, a),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(n, a),
      t.state !== e && qi.enqueueReplaceState(t, t.state, null));
  }
  function Hl(e, t, n, a) {
    var o = e.stateNode;
    ((o.props = n), (o.state = e.memoizedState), (o.refs = {}), Il(e));
    var c = t.contextType;
    (typeof c == "object" && c !== null
      ? (o.context = bt(c))
      : ((c = Ct(t) ? lr : vt.current), (o.context = Vr(e, c))),
      (o.state = e.memoizedState),
      (c = t.getDerivedStateFromProps),
      typeof c == "function" && (Zl(e, t, c, n), (o.state = e.memoizedState)),
      typeof t.getDerivedStateFromProps == "function" ||
        typeof o.getSnapshotBeforeUpdate == "function" ||
        (typeof o.UNSAFE_componentWillMount != "function" &&
          typeof o.componentWillMount != "function") ||
        ((t = o.state),
        typeof o.componentWillMount == "function" && o.componentWillMount(),
        typeof o.UNSAFE_componentWillMount == "function" &&
          o.UNSAFE_componentWillMount(),
        t !== o.state && qi.enqueueReplaceState(o, o.state, null),
        bi(e, n, o, a),
        (o.state = e.memoizedState)),
      typeof o.componentDidMount == "function" && (e.flags |= 4194308));
  }
  function Hr(e, t) {
    try {
      var n = "",
        a = t;
      do ((n += we(a)), (a = a.return));
      while (a);
      var o = n;
    } catch (c) {
      o =
        `
Error generating stack: ` +
        c.message +
        `
` +
        c.stack;
    }
    return { value: e, source: t, stack: o, digest: null };
  }
  function Ql(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function Kl(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  var tm = typeof WeakMap == "function" ? WeakMap : Map;
  function id(e, t, n) {
    ((n = gn(-1, n)), (n.tag = 3), (n.payload = { element: null }));
    var a = t.value;
    return (
      (n.callback = function () {
        (na || ((na = !0), (uo = a)), Kl(e, t));
      }),
      n
    );
  }
  function ad(e, t, n) {
    ((n = gn(-1, n)), (n.tag = 3));
    var a = e.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var o = t.value;
      ((n.payload = function () {
        return a(o);
      }),
        (n.callback = function () {
          Kl(e, t);
        }));
    }
    var c = e.stateNode;
    return (
      c !== null &&
        typeof c.componentDidCatch == "function" &&
        (n.callback = function () {
          (Kl(e, t),
            typeof a != "function" &&
              (Bn === null ? (Bn = new Set([this])) : Bn.add(this)));
          var f = t.stack;
          this.componentDidCatch(t.value, {
            componentStack: f !== null ? f : "",
          });
        }),
      n
    );
  }
  function ld(e, t, n) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new tm();
      var o = new Set();
      a.set(t, o);
    } else ((o = a.get(t)), o === void 0 && ((o = new Set()), a.set(t, o)));
    o.has(n) || (o.add(n), (e = mm.bind(null, e, t, n)), t.then(e, e));
  }
  function od(e) {
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
  function ud(e, t, n, a, o) {
    return (e.mode & 1) === 0
      ? (e === t
          ? (e.flags |= 65536)
          : ((e.flags |= 128),
            (n.flags |= 131072),
            (n.flags &= -52805),
            n.tag === 1 &&
              (n.alternate === null
                ? (n.tag = 17)
                : ((t = gn(-1, 1)), (t.tag = 2), $n(n, t, 1))),
            (n.lanes |= 1)),
        e)
      : ((e.flags |= 65536), (e.lanes = o), e);
  }
  var nm = X.ReactCurrentOwner,
    jt = !1;
  function _t(e, t, n, a) {
    t.child = e === null ? Pc(t, null, n, a) : br(t, e.child, n, a);
  }
  function cd(e, t, n, a, o) {
    n = n.render;
    var c = t.ref;
    return (
      Wr(t, o),
      (a = zl(e, t, n, a, c, o)),
      (n = Ul()),
      e !== null && !jt
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~o),
          xn(e, t, o))
        : (qe && n && kl(t), (t.flags |= 1), _t(e, t, a, o), t.child)
    );
  }
  function dd(e, t, n, a, o) {
    if (e === null) {
      var c = n.type;
      return typeof c == "function" &&
        !yo(c) &&
        c.defaultProps === void 0 &&
        n.compare === null &&
        n.defaultProps === void 0
        ? ((t.tag = 15), (t.type = c), fd(e, t, c, a, o))
        : ((e = oa(n.type, null, a, t, t.mode, o)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((c = e.child), (e.lanes & o) === 0)) {
      var f = c.memoizedProps;
      if (
        ((n = n.compare), (n = n !== null ? n : Cs), n(f, a) && e.ref === t.ref)
      )
        return xn(e, t, o);
    }
    return (
      (t.flags |= 1),
      (e = Qn(c, a)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function fd(e, t, n, a, o) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (Cs(c, a) && e.ref === t.ref)
        if (((jt = !1), (t.pendingProps = a = c), (e.lanes & o) !== 0))
          (e.flags & 131072) !== 0 && (jt = !0);
        else return ((t.lanes = e.lanes), xn(e, t, o));
    }
    return ql(e, t, n, a, o);
  }
  function pd(e, t, n) {
    var a = t.pendingProps,
      o = a.children,
      c = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden")
      if ((t.mode & 1) === 0)
        ((t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          He(Kr, Lt),
          (Lt |= n));
      else {
        if ((n & 1073741824) === 0)
          return (
            (e = c !== null ? c.baseLanes | n : n),
            (t.lanes = t.childLanes = 1073741824),
            (t.memoizedState = {
              baseLanes: e,
              cachePool: null,
              transitions: null,
            }),
            (t.updateQueue = null),
            He(Kr, Lt),
            (Lt |= e),
            null
          );
        ((t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          (a = c !== null ? c.baseLanes : n),
          He(Kr, Lt),
          (Lt |= a));
      }
    else
      (c !== null ? ((a = c.baseLanes | n), (t.memoizedState = null)) : (a = n),
        He(Kr, Lt),
        (Lt |= a));
    return (_t(e, t, o, n), t.child);
  }
  function hd(e, t) {
    var n = t.ref;
    ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
      ((t.flags |= 512), (t.flags |= 2097152));
  }
  function ql(e, t, n, a, o) {
    var c = Ct(n) ? lr : vt.current;
    return (
      (c = Vr(t, c)),
      Wr(t, o),
      (n = zl(e, t, n, a, c, o)),
      (a = Ul()),
      e !== null && !jt
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~o),
          xn(e, t, o))
        : (qe && a && kl(t), (t.flags |= 1), _t(e, t, n, o), t.child)
    );
  }
  function md(e, t, n, a, o) {
    if (Ct(n)) {
      var c = !0;
      Ai(t);
    } else c = !1;
    if ((Wr(t, o), t.stateNode === null))
      (Yi(e, t), rd(t, n, a), Hl(t, n, a, o), (a = !0));
    else if (e === null) {
      var f = t.stateNode,
        g = t.memoizedProps;
      f.props = g;
      var _ = f.context,
        R = n.contextType;
      typeof R == "object" && R !== null
        ? (R = bt(R))
        : ((R = Ct(n) ? lr : vt.current), (R = Vr(t, R)));
      var M = n.getDerivedStateFromProps,
        V =
          typeof M == "function" ||
          typeof f.getSnapshotBeforeUpdate == "function";
      (V ||
        (typeof f.UNSAFE_componentWillReceiveProps != "function" &&
          typeof f.componentWillReceiveProps != "function") ||
        ((g !== a || _ !== R) && sd(t, f, a, R)),
        (Un = !1));
      var F = t.memoizedState;
      ((f.state = F),
        bi(t, a, f, o),
        (_ = t.memoizedState),
        g !== a || F !== _ || Nt.current || Un
          ? (typeof M == "function" && (Zl(t, n, M, a), (_ = t.memoizedState)),
            (g = Un || nd(t, n, g, a, F, _, R))
              ? (V ||
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
                (t.memoizedProps = a),
                (t.memoizedState = _)),
            (f.props = a),
            (f.state = _),
            (f.context = R),
            (a = g))
          : (typeof f.componentDidMount == "function" && (t.flags |= 4194308),
            (a = !1)));
    } else {
      ((f = t.stateNode),
        Oc(e, t),
        (g = t.memoizedProps),
        (R = t.type === t.elementType ? g : Jt(t.type, g)),
        (f.props = R),
        (V = t.pendingProps),
        (F = f.context),
        (_ = n.contextType),
        typeof _ == "object" && _ !== null
          ? (_ = bt(_))
          : ((_ = Ct(n) ? lr : vt.current), (_ = Vr(t, _))));
      var ee = n.getDerivedStateFromProps;
      ((M =
        typeof ee == "function" ||
        typeof f.getSnapshotBeforeUpdate == "function") ||
        (typeof f.UNSAFE_componentWillReceiveProps != "function" &&
          typeof f.componentWillReceiveProps != "function") ||
        ((g !== V || F !== _) && sd(t, f, a, _)),
        (Un = !1),
        (F = t.memoizedState),
        (f.state = F),
        bi(t, a, f, o));
      var se = t.memoizedState;
      g !== V || F !== se || Nt.current || Un
        ? (typeof ee == "function" && (Zl(t, n, ee, a), (se = t.memoizedState)),
          (R = Un || nd(t, n, R, a, F, se, _) || !1)
            ? (M ||
                (typeof f.UNSAFE_componentWillUpdate != "function" &&
                  typeof f.componentWillUpdate != "function") ||
                (typeof f.componentWillUpdate == "function" &&
                  f.componentWillUpdate(a, se, _),
                typeof f.UNSAFE_componentWillUpdate == "function" &&
                  f.UNSAFE_componentWillUpdate(a, se, _)),
              typeof f.componentDidUpdate == "function" && (t.flags |= 4),
              typeof f.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof f.componentDidUpdate != "function" ||
                (g === e.memoizedProps && F === e.memoizedState) ||
                (t.flags |= 4),
              typeof f.getSnapshotBeforeUpdate != "function" ||
                (g === e.memoizedProps && F === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = a),
              (t.memoizedState = se)),
          (f.props = a),
          (f.state = se),
          (f.context = _),
          (a = R))
        : (typeof f.componentDidUpdate != "function" ||
            (g === e.memoizedProps && F === e.memoizedState) ||
            (t.flags |= 4),
          typeof f.getSnapshotBeforeUpdate != "function" ||
            (g === e.memoizedProps && F === e.memoizedState) ||
            (t.flags |= 1024),
          (a = !1));
    }
    return Jl(e, t, n, a, c, o);
  }
  function Jl(e, t, n, a, o, c) {
    hd(e, t);
    var f = (t.flags & 128) !== 0;
    if (!a && !f) return (o && wc(t, n, !1), xn(e, t, c));
    ((a = t.stateNode), (nm.current = t));
    var g =
      f && typeof n.getDerivedStateFromError != "function" ? null : a.render();
    return (
      (t.flags |= 1),
      e !== null && f
        ? ((t.child = br(t, e.child, null, c)), (t.child = br(t, null, g, c)))
        : _t(e, t, g, c),
      (t.memoizedState = a.state),
      o && wc(t, n, !0),
      t.child
    );
  }
  function vd(e) {
    var t = e.stateNode;
    (t.pendingContext
      ? gc(e, t.pendingContext, t.pendingContext !== t.context)
      : t.context && gc(e, t.context, !1),
      Al(e, t.containerInfo));
  }
  function yd(e, t, n, a, o) {
    return ($r(), Cl(o), (t.flags |= 256), _t(e, t, n, a), t.child);
  }
  var Yl = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Gl(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function gd(e, t, n) {
    var a = t.pendingProps,
      o = Je.current,
      c = !1,
      f = (t.flags & 128) !== 0,
      g;
    if (
      ((g = f) ||
        (g = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
      g
        ? ((c = !0), (t.flags &= -129))
        : (e === null || e.memoizedState !== null) && (o |= 1),
      He(Je, o & 1),
      e === null)
    )
      return (
        Nl(t),
        (e = t.memoizedState),
        e !== null && ((e = e.dehydrated), e !== null)
          ? ((t.mode & 1) === 0
              ? (t.lanes = 1)
              : e.data === "$!"
                ? (t.lanes = 8)
                : (t.lanes = 1073741824),
            null)
          : ((f = a.children),
            (e = a.fallback),
            c
              ? ((a = t.mode),
                (c = t.child),
                (f = { mode: "hidden", children: f }),
                (a & 1) === 0 && c !== null
                  ? ((c.childLanes = 0), (c.pendingProps = f))
                  : (c = ua(f, a, 0, null)),
                (e = yr(e, a, n, null)),
                (c.return = t),
                (e.return = t),
                (c.sibling = e),
                (t.child = c),
                (t.child.memoizedState = Gl(n)),
                (t.memoizedState = Yl),
                e)
              : Xl(t, f))
      );
    if (((o = e.memoizedState), o !== null && ((g = o.dehydrated), g !== null)))
      return rm(e, t, f, a, g, o, n);
    if (c) {
      ((c = a.fallback), (f = t.mode), (o = e.child), (g = o.sibling));
      var _ = { mode: "hidden", children: a.children };
      return (
        (f & 1) === 0 && t.child !== o
          ? ((a = t.child),
            (a.childLanes = 0),
            (a.pendingProps = _),
            (t.deletions = null))
          : ((a = Qn(o, _)), (a.subtreeFlags = o.subtreeFlags & 14680064)),
        g !== null ? (c = Qn(g, c)) : ((c = yr(c, f, n, null)), (c.flags |= 2)),
        (c.return = t),
        (a.return = t),
        (a.sibling = c),
        (t.child = a),
        (a = c),
        (c = t.child),
        (f = e.child.memoizedState),
        (f =
          f === null
            ? Gl(n)
            : {
                baseLanes: f.baseLanes | n,
                cachePool: null,
                transitions: f.transitions,
              }),
        (c.memoizedState = f),
        (c.childLanes = e.childLanes & ~n),
        (t.memoizedState = Yl),
        a
      );
    }
    return (
      (c = e.child),
      (e = c.sibling),
      (a = Qn(c, { mode: "visible", children: a.children })),
      (t.mode & 1) === 0 && (a.lanes = n),
      (a.return = t),
      (a.sibling = null),
      e !== null &&
        ((n = t.deletions),
        n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
      (t.child = a),
      (t.memoizedState = null),
      a
    );
  }
  function Xl(e, t) {
    return (
      (t = ua({ mode: "visible", children: t }, e.mode, 0, null)),
      (t.return = e),
      (e.child = t)
    );
  }
  function Ji(e, t, n, a) {
    return (
      a !== null && Cl(a),
      br(t, e.child, null, n),
      (e = Xl(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function rm(e, t, n, a, o, c, f) {
    if (n)
      return t.flags & 256
        ? ((t.flags &= -257), (a = Ql(Error(i(422)))), Ji(e, t, f, a))
        : t.memoizedState !== null
          ? ((t.child = e.child), (t.flags |= 128), null)
          : ((c = a.fallback),
            (o = t.mode),
            (a = ua({ mode: "visible", children: a.children }, o, 0, null)),
            (c = yr(c, o, f, null)),
            (c.flags |= 2),
            (a.return = t),
            (c.return = t),
            (a.sibling = c),
            (t.child = a),
            (t.mode & 1) !== 0 && br(t, e.child, null, f),
            (t.child.memoizedState = Gl(f)),
            (t.memoizedState = Yl),
            c);
    if ((t.mode & 1) === 0) return Ji(e, t, f, null);
    if (o.data === "$!") {
      if (((a = o.nextSibling && o.nextSibling.dataset), a)) var g = a.dgst;
      return (
        (a = g),
        (c = Error(i(419))),
        (a = Ql(c, a, void 0)),
        Ji(e, t, f, a)
      );
    }
    if (((g = (f & e.childLanes) !== 0), jt || g)) {
      if (((a = ft), a !== null)) {
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
        ((o = (o & (a.suspendedLanes | f)) !== 0 ? 0 : o),
          o !== 0 &&
            o !== c.retryLane &&
            ((c.retryLane = o), yn(e, o), Xt(a, e, o, -1)));
      }
      return (vo(), (a = Ql(Error(i(421)))), Ji(e, t, f, a));
    }
    return o.data === "$?"
      ? ((t.flags |= 128),
        (t.child = e.child),
        (t = vm.bind(null, e)),
        (o._reactRetry = t),
        null)
      : ((e = c.treeContext),
        (Dt = Fn(o.nextSibling)),
        (At = t),
        (qe = !0),
        (qt = null),
        e !== null &&
          ((Ut[$t++] = mn),
          (Ut[$t++] = vn),
          (Ut[$t++] = or),
          (mn = e.id),
          (vn = e.overflow),
          (or = t)),
        (t = Xl(t, a.children)),
        (t.flags |= 4096),
        t);
  }
  function xd(e, t, n) {
    e.lanes |= t;
    var a = e.alternate;
    (a !== null && (a.lanes |= t), Rl(e.return, t, n));
  }
  function eo(e, t, n, a, o) {
    var c = e.memoizedState;
    c === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: n,
          tailMode: o,
        })
      : ((c.isBackwards = t),
        (c.rendering = null),
        (c.renderingStartTime = 0),
        (c.last = a),
        (c.tail = n),
        (c.tailMode = o));
  }
  function wd(e, t, n) {
    var a = t.pendingProps,
      o = a.revealOrder,
      c = a.tail;
    if ((_t(e, t, a.children, n), (a = Je.current), (a & 2) !== 0))
      ((a = (a & 1) | 2), (t.flags |= 128));
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && xd(e, n, t);
          else if (e.tag === 19) xd(e, n, t);
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
      a &= 1;
    }
    if ((He(Je, a), (t.mode & 1) === 0)) t.memoizedState = null;
    else
      switch (o) {
        case "forwards":
          for (n = t.child, o = null; n !== null; )
            ((e = n.alternate),
              e !== null && Bi(e) === null && (o = n),
              (n = n.sibling));
          ((n = o),
            n === null
              ? ((o = t.child), (t.child = null))
              : ((o = n.sibling), (n.sibling = null)),
            eo(t, !1, o, n, c));
          break;
        case "backwards":
          for (n = null, o = t.child, t.child = null; o !== null; ) {
            if (((e = o.alternate), e !== null && Bi(e) === null)) {
              t.child = o;
              break;
            }
            ((e = o.sibling), (o.sibling = n), (n = o), (o = e));
          }
          eo(t, !0, n, null, c);
          break;
        case "together":
          eo(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function Yi(e, t) {
    (t.mode & 1) === 0 &&
      e !== null &&
      ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
  }
  function xn(e, t, n) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (pr |= t.lanes),
      (n & t.childLanes) === 0)
    )
      return null;
    if (e !== null && t.child !== e.child) throw Error(i(153));
    if (t.child !== null) {
      for (
        e = t.child, n = Qn(e, e.pendingProps), t.child = n, n.return = t;
        e.sibling !== null;

      )
        ((e = e.sibling),
          (n = n.sibling = Qn(e, e.pendingProps)),
          (n.return = t));
      n.sibling = null;
    }
    return t.child;
  }
  function sm(e, t, n) {
    switch (t.tag) {
      case 3:
        (vd(t), $r());
        break;
      case 5:
        Dc(t);
        break;
      case 1:
        Ct(t.type) && Ai(t);
        break;
      case 4:
        Al(t, t.stateNode.containerInfo);
        break;
      case 10:
        var a = t.type._context,
          o = t.memoizedProps.value;
        (He(zi, a._currentValue), (a._currentValue = o));
        break;
      case 13:
        if (((a = t.memoizedState), a !== null))
          return a.dehydrated !== null
            ? (He(Je, Je.current & 1), (t.flags |= 128), null)
            : (n & t.child.childLanes) !== 0
              ? gd(e, t, n)
              : (He(Je, Je.current & 1),
                (e = xn(e, t, n)),
                e !== null ? e.sibling : null);
        He(Je, Je.current & 1);
        break;
      case 19:
        if (((a = (n & t.childLanes) !== 0), (e.flags & 128) !== 0)) {
          if (a) return wd(e, t, n);
          t.flags |= 128;
        }
        if (
          ((o = t.memoizedState),
          o !== null &&
            ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
          He(Je, Je.current),
          a)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((t.lanes = 0), pd(e, t, n));
    }
    return xn(e, t, n);
  }
  var _d, to, kd, Sd;
  ((_d = function (e, t) {
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
    (to = function () {}),
    (kd = function (e, t, n, a) {
      var o = e.memoizedProps;
      if (o !== a) {
        ((e = t.stateNode), dr(an.current));
        var c = null;
        switch (n) {
          case "input":
            ((o = Pn(e, o)), (a = Pn(e, a)), (c = []));
            break;
          case "select":
            ((o = K({}, o, { value: void 0 })),
              (a = K({}, a, { value: void 0 })),
              (c = []));
            break;
          case "textarea":
            ((o = P(e, o)), (a = P(e, a)), (c = []));
            break;
          default:
            typeof o.onClick != "function" &&
              typeof a.onClick == "function" &&
              (e.onclick = Ri);
        }
        Nr(n, a);
        var f;
        n = null;
        for (R in o)
          if (!a.hasOwnProperty(R) && o.hasOwnProperty(R) && o[R] != null)
            if (R === "style") {
              var g = o[R];
              for (f in g) g.hasOwnProperty(f) && (n || (n = {}), (n[f] = ""));
            } else
              R !== "dangerouslySetInnerHTML" &&
                R !== "children" &&
                R !== "suppressContentEditableWarning" &&
                R !== "suppressHydrationWarning" &&
                R !== "autoFocus" &&
                (u.hasOwnProperty(R)
                  ? c || (c = [])
                  : (c = c || []).push(R, null));
        for (R in a) {
          var _ = a[R];
          if (
            ((g = o?.[R]),
            a.hasOwnProperty(R) && _ !== g && (_ != null || g != null))
          )
            if (R === "style")
              if (g) {
                for (f in g)
                  !g.hasOwnProperty(f) ||
                    (_ && _.hasOwnProperty(f)) ||
                    (n || (n = {}), (n[f] = ""));
                for (f in _)
                  _.hasOwnProperty(f) &&
                    g[f] !== _[f] &&
                    (n || (n = {}), (n[f] = _[f]));
              } else (n || (c || (c = []), c.push(R, n)), (n = _));
            else
              R === "dangerouslySetInnerHTML"
                ? ((_ = _ ? _.__html : void 0),
                  (g = g ? g.__html : void 0),
                  _ != null && g !== _ && (c = c || []).push(R, _))
                : R === "children"
                  ? (typeof _ != "string" && typeof _ != "number") ||
                    (c = c || []).push(R, "" + _)
                  : R !== "suppressContentEditableWarning" &&
                    R !== "suppressHydrationWarning" &&
                    (u.hasOwnProperty(R)
                      ? (_ != null && R === "onScroll" && Qe("scroll", e),
                        c || g === _ || (c = []))
                      : (c = c || []).push(R, _));
        }
        n && (c = c || []).push("style", n);
        var R = c;
        (t.updateQueue = R) && (t.flags |= 4);
      }
    }),
    (Sd = function (e, t, n, a) {
      n !== a && (t.flags |= 4);
    }));
  function $s(e, t) {
    if (!qe)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            (t.alternate !== null && (n = t), (t = t.sibling));
          n === null ? (e.tail = null) : (n.sibling = null);
          break;
        case "collapsed":
          n = e.tail;
          for (var a = null; n !== null; )
            (n.alternate !== null && (a = n), (n = n.sibling));
          a === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (a.sibling = null);
      }
  }
  function gt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      n = 0,
      a = 0;
    if (t)
      for (var o = e.child; o !== null; )
        ((n |= o.lanes | o.childLanes),
          (a |= o.subtreeFlags & 14680064),
          (a |= o.flags & 14680064),
          (o.return = e),
          (o = o.sibling));
    else
      for (o = e.child; o !== null; )
        ((n |= o.lanes | o.childLanes),
          (a |= o.subtreeFlags),
          (a |= o.flags),
          (o.return = e),
          (o = o.sibling));
    return ((e.subtreeFlags |= a), (e.childLanes = n), t);
  }
  function im(e, t, n) {
    var a = t.pendingProps;
    switch ((Sl(t), t.tag)) {
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
        return (gt(t), null);
      case 1:
        return (Ct(t.type) && Ii(), gt(t), null);
      case 3:
        return (
          (a = t.stateNode),
          Zr(),
          Ke(Nt),
          Ke(vt),
          Fl(),
          a.pendingContext &&
            ((a.context = a.pendingContext), (a.pendingContext = null)),
          (e === null || e.child === null) &&
            (Mi(t)
              ? (t.flags |= 4)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), qt !== null && (po(qt), (qt = null)))),
          to(e, t),
          gt(t),
          null
        );
      case 5:
        Dl(t);
        var o = dr(Fs.current);
        if (((n = t.type), e !== null && t.stateNode != null))
          (kd(e, t, n, a, o),
            e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(i(166));
            return (gt(t), null);
          }
          if (((e = dr(an.current)), Mi(t))) {
            ((a = t.stateNode), (n = t.type));
            var c = t.memoizedProps;
            switch (((a[sn] = t), (a[Os] = c), (e = (t.mode & 1) !== 0), n)) {
              case "dialog":
                (Qe("cancel", a), Qe("close", a));
                break;
              case "iframe":
              case "object":
              case "embed":
                Qe("load", a);
                break;
              case "video":
              case "audio":
                for (o = 0; o < Ts.length; o++) Qe(Ts[o], a);
                break;
              case "source":
                Qe("error", a);
                break;
              case "img":
              case "image":
              case "link":
                (Qe("error", a), Qe("load", a));
                break;
              case "details":
                Qe("toggle", a);
                break;
              case "input":
                (rr(a, c), Qe("invalid", a));
                break;
              case "select":
                ((a._wrapperState = { wasMultiple: !!c.multiple }),
                  Qe("invalid", a));
                break;
              case "textarea":
                (q(a, c), Qe("invalid", a));
            }
            (Nr(n, c), (o = null));
            for (var f in c)
              if (c.hasOwnProperty(f)) {
                var g = c[f];
                f === "children"
                  ? typeof g == "string"
                    ? a.textContent !== g &&
                      (c.suppressHydrationWarning !== !0 &&
                        Pi(a.textContent, g, e),
                      (o = ["children", g]))
                    : typeof g == "number" &&
                      a.textContent !== "" + g &&
                      (c.suppressHydrationWarning !== !0 &&
                        Pi(a.textContent, g, e),
                      (o = ["children", "" + g]))
                  : u.hasOwnProperty(f) &&
                    g != null &&
                    f === "onScroll" &&
                    Qe("scroll", a);
              }
            switch (n) {
              case "input":
                (zt(a), z(a, c, !0));
                break;
              case "textarea":
                (zt(a), $(a));
                break;
              case "select":
              case "option":
                break;
              default:
                typeof c.onClick == "function" && (a.onclick = Ri);
            }
            ((a = o), (t.updateQueue = a), a !== null && (t.flags |= 4));
          } else {
            ((f = o.nodeType === 9 ? o : o.ownerDocument),
              e === "http://www.w3.org/1999/xhtml" && (e = pe(n)),
              e === "http://www.w3.org/1999/xhtml"
                ? n === "script"
                  ? ((e = f.createElement("div")),
                    (e.innerHTML = "<script><\/script>"),
                    (e = e.removeChild(e.firstChild)))
                  : typeof a.is == "string"
                    ? (e = f.createElement(n, { is: a.is }))
                    : ((e = f.createElement(n)),
                      n === "select" &&
                        ((f = e),
                        a.multiple
                          ? (f.multiple = !0)
                          : a.size && (f.size = a.size)))
                : (e = f.createElementNS(e, n)),
              (e[sn] = t),
              (e[Os] = a),
              _d(e, t, !1, !1),
              (t.stateNode = e));
            e: {
              switch (((f = cs(n, a)), n)) {
                case "dialog":
                  (Qe("cancel", e), Qe("close", e), (o = a));
                  break;
                case "iframe":
                case "object":
                case "embed":
                  (Qe("load", e), (o = a));
                  break;
                case "video":
                case "audio":
                  for (o = 0; o < Ts.length; o++) Qe(Ts[o], e);
                  o = a;
                  break;
                case "source":
                  (Qe("error", e), (o = a));
                  break;
                case "img":
                case "image":
                case "link":
                  (Qe("error", e), Qe("load", e), (o = a));
                  break;
                case "details":
                  (Qe("toggle", e), (o = a));
                  break;
                case "input":
                  (rr(e, a), (o = Pn(e, a)), Qe("invalid", e));
                  break;
                case "option":
                  o = a;
                  break;
                case "select":
                  ((e._wrapperState = { wasMultiple: !!a.multiple }),
                    (o = K({}, a, { value: void 0 })),
                    Qe("invalid", e));
                  break;
                case "textarea":
                  (q(e, a), (o = P(e, a)), Qe("invalid", e));
                  break;
                default:
                  o = a;
              }
              (Nr(n, o), (g = o));
              for (c in g)
                if (g.hasOwnProperty(c)) {
                  var _ = g[c];
                  c === "style"
                    ? Er(e, _)
                    : c === "dangerouslySetInnerHTML"
                      ? ((_ = _ ? _.__html : void 0), _ != null && wt(e, _))
                      : c === "children"
                        ? typeof _ == "string"
                          ? (n !== "textarea" || _ !== "") && nn(e, _)
                          : typeof _ == "number" && nn(e, "" + _)
                        : c !== "suppressContentEditableWarning" &&
                          c !== "suppressHydrationWarning" &&
                          c !== "autoFocus" &&
                          (u.hasOwnProperty(c)
                            ? _ != null && c === "onScroll" && Qe("scroll", e)
                            : _ != null && Q(e, c, _, f));
                }
              switch (n) {
                case "input":
                  (zt(e), z(e, a, !1));
                  break;
                case "textarea":
                  (zt(e), $(e));
                  break;
                case "option":
                  a.value != null && e.setAttribute("value", "" + je(a.value));
                  break;
                case "select":
                  ((e.multiple = !!a.multiple),
                    (c = a.value),
                    c != null
                      ? E(e, !!a.multiple, c, !1)
                      : a.defaultValue != null &&
                        E(e, !!a.multiple, a.defaultValue, !0));
                  break;
                default:
                  typeof o.onClick == "function" && (e.onclick = Ri);
              }
              switch (n) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  a = !!a.autoFocus;
                  break e;
                case "img":
                  a = !0;
                  break e;
                default:
                  a = !1;
              }
            }
            a && (t.flags |= 4);
          }
          t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
        }
        return (gt(t), null);
      case 6:
        if (e && t.stateNode != null) Sd(e, t, e.memoizedProps, a);
        else {
          if (typeof a != "string" && t.stateNode === null) throw Error(i(166));
          if (((n = dr(Fs.current)), dr(an.current), Mi(t))) {
            if (
              ((a = t.stateNode),
              (n = t.memoizedProps),
              (a[sn] = t),
              (c = a.nodeValue !== n) && ((e = At), e !== null))
            )
              switch (e.tag) {
                case 3:
                  Pi(a.nodeValue, n, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 &&
                    Pi(a.nodeValue, n, (e.mode & 1) !== 0);
              }
            c && (t.flags |= 4);
          } else
            ((a = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(a)),
              (a[sn] = t),
              (t.stateNode = a));
        }
        return (gt(t), null);
      case 13:
        if (
          (Ke(Je),
          (a = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (qe && Dt !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0)
            (Cc(), $r(), (t.flags |= 98560), (c = !1));
          else if (((c = Mi(t)), a !== null && a.dehydrated !== null)) {
            if (e === null) {
              if (!c) throw Error(i(318));
              if (
                ((c = t.memoizedState),
                (c = c !== null ? c.dehydrated : null),
                !c)
              )
                throw Error(i(317));
              c[sn] = t;
            } else
              ($r(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (gt(t), (c = !1));
          } else (qt !== null && (po(qt), (qt = null)), (c = !0));
          if (!c) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0
          ? ((t.lanes = n), t)
          : ((a = a !== null),
            a !== (e !== null && e.memoizedState !== null) &&
              a &&
              ((t.child.flags |= 8192),
              (t.mode & 1) !== 0 &&
                (e === null || (Je.current & 1) !== 0
                  ? ut === 0 && (ut = 3)
                  : vo())),
            t.updateQueue !== null && (t.flags |= 4),
            gt(t),
            null);
      case 4:
        return (
          Zr(),
          to(e, t),
          e === null && Ps(t.stateNode.containerInfo),
          gt(t),
          null
        );
      case 10:
        return (Pl(t.type._context), gt(t), null);
      case 17:
        return (Ct(t.type) && Ii(), gt(t), null);
      case 19:
        if ((Ke(Je), (c = t.memoizedState), c === null)) return (gt(t), null);
        if (((a = (t.flags & 128) !== 0), (f = c.rendering), f === null))
          if (a) $s(c, !1);
          else {
            if (ut !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((f = Bi(e)), f !== null)) {
                  for (
                    t.flags |= 128,
                      $s(c, !1),
                      a = f.updateQueue,
                      a !== null && ((t.updateQueue = a), (t.flags |= 4)),
                      t.subtreeFlags = 0,
                      a = n,
                      n = t.child;
                    n !== null;

                  )
                    ((c = n),
                      (e = a),
                      (c.flags &= 14680066),
                      (f = c.alternate),
                      f === null
                        ? ((c.childLanes = 0),
                          (c.lanes = e),
                          (c.child = null),
                          (c.subtreeFlags = 0),
                          (c.memoizedProps = null),
                          (c.memoizedState = null),
                          (c.updateQueue = null),
                          (c.dependencies = null),
                          (c.stateNode = null))
                        : ((c.childLanes = f.childLanes),
                          (c.lanes = f.lanes),
                          (c.child = f.child),
                          (c.subtreeFlags = 0),
                          (c.deletions = null),
                          (c.memoizedProps = f.memoizedProps),
                          (c.memoizedState = f.memoizedState),
                          (c.updateQueue = f.updateQueue),
                          (c.type = f.type),
                          (e = f.dependencies),
                          (c.dependencies =
                            e === null
                              ? null
                              : {
                                  lanes: e.lanes,
                                  firstContext: e.firstContext,
                                })),
                      (n = n.sibling));
                  return (He(Je, (Je.current & 1) | 2), t.child);
                }
                e = e.sibling;
              }
            c.tail !== null &&
              et() > qr &&
              ((t.flags |= 128), (a = !0), $s(c, !1), (t.lanes = 4194304));
          }
        else {
          if (!a)
            if (((e = Bi(f)), e !== null)) {
              if (
                ((t.flags |= 128),
                (a = !0),
                (n = e.updateQueue),
                n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                $s(c, !0),
                c.tail === null &&
                  c.tailMode === "hidden" &&
                  !f.alternate &&
                  !qe)
              )
                return (gt(t), null);
            } else
              2 * et() - c.renderingStartTime > qr &&
                n !== 1073741824 &&
                ((t.flags |= 128), (a = !0), $s(c, !1), (t.lanes = 4194304));
          c.isBackwards
            ? ((f.sibling = t.child), (t.child = f))
            : ((n = c.last),
              n !== null ? (n.sibling = f) : (t.child = f),
              (c.last = f));
        }
        return c.tail !== null
          ? ((t = c.tail),
            (c.rendering = t),
            (c.tail = t.sibling),
            (c.renderingStartTime = et()),
            (t.sibling = null),
            (n = Je.current),
            He(Je, a ? (n & 1) | 2 : n & 1),
            t)
          : (gt(t), null);
      case 22:
      case 23:
        return (
          mo(),
          (a = t.memoizedState !== null),
          e !== null && (e.memoizedState !== null) !== a && (t.flags |= 8192),
          a && (t.mode & 1) !== 0
            ? (Lt & 1073741824) !== 0 &&
              (gt(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : gt(t),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(i(156, t.tag));
  }
  function am(e, t) {
    switch ((Sl(t), t.tag)) {
      case 1:
        return (
          Ct(t.type) && Ii(),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          Zr(),
          Ke(Nt),
          Ke(vt),
          Fl(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 5:
        return (Dl(t), null);
      case 13:
        if (
          (Ke(Je), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(i(340));
          $r();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return (Ke(Je), null);
      case 4:
        return (Zr(), null);
      case 10:
        return (Pl(t.type._context), null);
      case 22:
      case 23:
        return (mo(), null);
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Gi = !1,
    xt = !1,
    lm = typeof WeakSet == "function" ? WeakSet : Set,
    re = null;
  function Qr(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function")
        try {
          n(null);
        } catch (a) {
          Xe(e, t, a);
        }
      else n.current = null;
  }
  function no(e, t, n) {
    try {
      n();
    } catch (a) {
      Xe(e, t, a);
    }
  }
  var Ed = !1;
  function om(e, t) {
    if (((hl = gi), (e = nc()), al(e))) {
      if ("selectionStart" in e)
        var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = ((n = e.ownerDocument) && n.defaultView) || window;
          var a = n.getSelection && n.getSelection();
          if (a && a.rangeCount !== 0) {
            n = a.anchorNode;
            var o = a.anchorOffset,
              c = a.focusNode;
            a = a.focusOffset;
            try {
              (n.nodeType, c.nodeType);
            } catch {
              n = null;
              break e;
            }
            var f = 0,
              g = -1,
              _ = -1,
              R = 0,
              M = 0,
              V = e,
              F = null;
            t: for (;;) {
              for (
                var ee;
                V !== n || (o !== 0 && V.nodeType !== 3) || (g = f + o),
                  V !== c || (a !== 0 && V.nodeType !== 3) || (_ = f + a),
                  V.nodeType === 3 && (f += V.nodeValue.length),
                  (ee = V.firstChild) !== null;

              )
                ((F = V), (V = ee));
              for (;;) {
                if (V === e) break t;
                if (
                  (F === n && ++R === o && (g = f),
                  F === c && ++M === a && (_ = f),
                  (ee = V.nextSibling) !== null)
                )
                  break;
                ((V = F), (F = V.parentNode));
              }
              V = ee;
            }
            n = g === -1 || _ === -1 ? null : { start: g, end: _ };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (
      ml = { focusedElem: e, selectionRange: n }, gi = !1, re = t;
      re !== null;

    )
      if (
        ((t = re), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)
      )
        ((e.return = t), (re = e));
      else
        for (; re !== null; ) {
          t = re;
          try {
            var se = t.alternate;
            if ((t.flags & 1024) !== 0)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (se !== null) {
                    var oe = se.memoizedProps,
                      tt = se.memoizedState,
                      C = t.stateNode,
                      k = C.getSnapshotBeforeUpdate(
                        t.elementType === t.type ? oe : Jt(t.type, oe),
                        tt,
                      );
                    C.__reactInternalSnapshotBeforeUpdate = k;
                  }
                  break;
                case 3:
                  var j = t.stateNode.containerInfo;
                  j.nodeType === 1
                    ? (j.textContent = "")
                    : j.nodeType === 9 &&
                      j.documentElement &&
                      j.removeChild(j.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(i(163));
              }
          } catch (U) {
            Xe(t, t.return, U);
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (re = e));
            break;
          }
          re = t.return;
        }
    return ((se = Ed), (Ed = !1), se);
  }
  function bs(e, t, n) {
    var a = t.updateQueue;
    if (((a = a !== null ? a.lastEffect : null), a !== null)) {
      var o = (a = a.next);
      do {
        if ((o.tag & e) === e) {
          var c = o.destroy;
          ((o.destroy = void 0), c !== void 0 && no(t, n, c));
        }
        o = o.next;
      } while (o !== a);
    }
  }
  function Xi(e, t) {
    if (
      ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
    ) {
      var n = (t = t.next);
      do {
        if ((n.tag & e) === e) {
          var a = n.create;
          n.destroy = a();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function ro(e) {
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
  function Nd(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), Nd(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 &&
        ((t = e.stateNode),
        t !== null &&
          (delete t[sn],
          delete t[Os],
          delete t[xl],
          delete t[Wh],
          delete t[Zh])),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  function Cd(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function jd(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || Cd(e.return)) return null;
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
  function so(e, t, n) {
    var a = e.tag;
    if (a === 5 || a === 6)
      ((e = e.stateNode),
        t
          ? n.nodeType === 8
            ? n.parentNode.insertBefore(e, t)
            : n.insertBefore(e, t)
          : (n.nodeType === 8
              ? ((t = n.parentNode), t.insertBefore(e, n))
              : ((t = n), t.appendChild(e)),
            (n = n._reactRootContainer),
            n != null || t.onclick !== null || (t.onclick = Ri)));
    else if (a !== 4 && ((e = e.child), e !== null))
      for (so(e, t, n), e = e.sibling; e !== null; )
        (so(e, t, n), (e = e.sibling));
  }
  function io(e, t, n) {
    var a = e.tag;
    if (a === 5 || a === 6)
      ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
    else if (a !== 4 && ((e = e.child), e !== null))
      for (io(e, t, n), e = e.sibling; e !== null; )
        (io(e, t, n), (e = e.sibling));
  }
  var ht = null,
    Yt = !1;
  function bn(e, t, n) {
    for (n = n.child; n !== null; ) (Td(e, t, n), (n = n.sibling));
  }
  function Td(e, t, n) {
    if (rn && typeof rn.onCommitFiberUnmount == "function")
      try {
        rn.onCommitFiberUnmount(fi, n);
      } catch {}
    switch (n.tag) {
      case 5:
        xt || Qr(n, t);
      case 6:
        var a = ht,
          o = Yt;
        ((ht = null),
          bn(e, t, n),
          (ht = a),
          (Yt = o),
          ht !== null &&
            (Yt
              ? ((e = ht),
                (n = n.stateNode),
                e.nodeType === 8
                  ? e.parentNode.removeChild(n)
                  : e.removeChild(n))
              : ht.removeChild(n.stateNode)));
        break;
      case 18:
        ht !== null &&
          (Yt
            ? ((e = ht),
              (n = n.stateNode),
              e.nodeType === 8
                ? gl(e.parentNode, n)
                : e.nodeType === 1 && gl(e, n),
              ws(e))
            : gl(ht, n.stateNode));
        break;
      case 4:
        ((a = ht),
          (o = Yt),
          (ht = n.stateNode.containerInfo),
          (Yt = !0),
          bn(e, t, n),
          (ht = a),
          (Yt = o));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (
          !xt &&
          ((a = n.updateQueue), a !== null && ((a = a.lastEffect), a !== null))
        ) {
          o = a = a.next;
          do {
            var c = o,
              f = c.destroy;
            ((c = c.tag),
              f !== void 0 && ((c & 2) !== 0 || (c & 4) !== 0) && no(n, t, f),
              (o = o.next));
          } while (o !== a);
        }
        bn(e, t, n);
        break;
      case 1:
        if (
          !xt &&
          (Qr(n, t),
          (a = n.stateNode),
          typeof a.componentWillUnmount == "function")
        )
          try {
            ((a.props = n.memoizedProps),
              (a.state = n.memoizedState),
              a.componentWillUnmount());
          } catch (g) {
            Xe(n, t, g);
          }
        bn(e, t, n);
        break;
      case 21:
        bn(e, t, n);
        break;
      case 22:
        n.mode & 1
          ? ((xt = (a = xt) || n.memoizedState !== null), bn(e, t, n), (xt = a))
          : bn(e, t, n);
        break;
      default:
        bn(e, t, n);
    }
  }
  function Pd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      (n === null && (n = e.stateNode = new lm()),
        t.forEach(function (a) {
          var o = ym.bind(null, e, a);
          n.has(a) || (n.add(a), a.then(o, o));
        }));
    }
  }
  function Gt(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var a = 0; a < n.length; a++) {
        var o = n[a];
        try {
          var c = e,
            f = t,
            g = f;
          e: for (; g !== null; ) {
            switch (g.tag) {
              case 5:
                ((ht = g.stateNode), (Yt = !1));
                break e;
              case 3:
                ((ht = g.stateNode.containerInfo), (Yt = !0));
                break e;
              case 4:
                ((ht = g.stateNode.containerInfo), (Yt = !0));
                break e;
            }
            g = g.return;
          }
          if (ht === null) throw Error(i(160));
          (Td(c, f, o), (ht = null), (Yt = !1));
          var _ = o.alternate;
          (_ !== null && (_.return = null), (o.return = null));
        } catch (R) {
          Xe(o, t, R);
        }
      }
    if (t.subtreeFlags & 12854)
      for (t = t.child; t !== null; ) (Rd(t, e), (t = t.sibling));
  }
  function Rd(e, t) {
    var n = e.alternate,
      a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((Gt(t, e), on(e), a & 4)) {
          try {
            (bs(3, e, e.return), Xi(3, e));
          } catch (oe) {
            Xe(e, e.return, oe);
          }
          try {
            bs(5, e, e.return);
          } catch (oe) {
            Xe(e, e.return, oe);
          }
        }
        break;
      case 1:
        (Gt(t, e), on(e), a & 512 && n !== null && Qr(n, n.return));
        break;
      case 5:
        if (
          (Gt(t, e),
          on(e),
          a & 512 && n !== null && Qr(n, n.return),
          e.flags & 32)
        ) {
          var o = e.stateNode;
          try {
            nn(o, "");
          } catch (oe) {
            Xe(e, e.return, oe);
          }
        }
        if (a & 4 && ((o = e.stateNode), o != null)) {
          var c = e.memoizedProps,
            f = n !== null ? n.memoizedProps : c,
            g = e.type,
            _ = e.updateQueue;
          if (((e.updateQueue = null), _ !== null))
            try {
              (g === "input" &&
                c.type === "radio" &&
                c.name != null &&
                kr(o, c),
                cs(g, f));
              var R = cs(g, c);
              for (f = 0; f < _.length; f += 2) {
                var M = _[f],
                  V = _[f + 1];
                M === "style"
                  ? Er(o, V)
                  : M === "dangerouslySetInnerHTML"
                    ? wt(o, V)
                    : M === "children"
                      ? nn(o, V)
                      : Q(o, M, V, R);
              }
              switch (g) {
                case "input":
                  sr(o, c);
                  break;
                case "textarea":
                  Z(o, c);
                  break;
                case "select":
                  var F = o._wrapperState.wasMultiple;
                  o._wrapperState.wasMultiple = !!c.multiple;
                  var ee = c.value;
                  ee != null
                    ? E(o, !!c.multiple, ee, !1)
                    : F !== !!c.multiple &&
                      (c.defaultValue != null
                        ? E(o, !!c.multiple, c.defaultValue, !0)
                        : E(o, !!c.multiple, c.multiple ? [] : "", !1));
              }
              o[Os] = c;
            } catch (oe) {
              Xe(e, e.return, oe);
            }
        }
        break;
      case 6:
        if ((Gt(t, e), on(e), a & 4)) {
          if (e.stateNode === null) throw Error(i(162));
          ((o = e.stateNode), (c = e.memoizedProps));
          try {
            o.nodeValue = c;
          } catch (oe) {
            Xe(e, e.return, oe);
          }
        }
        break;
      case 3:
        if (
          (Gt(t, e), on(e), a & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            ws(t.containerInfo);
          } catch (oe) {
            Xe(e, e.return, oe);
          }
        break;
      case 4:
        (Gt(t, e), on(e));
        break;
      case 13:
        (Gt(t, e),
          on(e),
          (o = e.child),
          o.flags & 8192 &&
            ((c = o.memoizedState !== null),
            (o.stateNode.isHidden = c),
            !c ||
              (o.alternate !== null && o.alternate.memoizedState !== null) ||
              (oo = et())),
          a & 4 && Pd(e));
        break;
      case 22:
        if (
          ((M = n !== null && n.memoizedState !== null),
          e.mode & 1 ? ((xt = (R = xt) || M), Gt(t, e), (xt = R)) : Gt(t, e),
          on(e),
          a & 8192)
        ) {
          if (
            ((R = e.memoizedState !== null),
            (e.stateNode.isHidden = R) && !M && (e.mode & 1) !== 0)
          )
            for (re = e, M = e.child; M !== null; ) {
              for (V = re = M; re !== null; ) {
                switch (((F = re), (ee = F.child), F.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    bs(4, F, F.return);
                    break;
                  case 1:
                    Qr(F, F.return);
                    var se = F.stateNode;
                    if (typeof se.componentWillUnmount == "function") {
                      ((a = F), (n = F.return));
                      try {
                        ((t = a),
                          (se.props = t.memoizedProps),
                          (se.state = t.memoizedState),
                          se.componentWillUnmount());
                      } catch (oe) {
                        Xe(a, n, oe);
                      }
                    }
                    break;
                  case 5:
                    Qr(F, F.return);
                    break;
                  case 22:
                    if (F.memoizedState !== null) {
                      Ad(V);
                      continue;
                    }
                }
                ee !== null ? ((ee.return = F), (re = ee)) : Ad(V);
              }
              M = M.sibling;
            }
          e: for (M = null, V = e; ; ) {
            if (V.tag === 5) {
              if (M === null) {
                M = V;
                try {
                  ((o = V.stateNode),
                    R
                      ? ((c = o.style),
                        typeof c.setProperty == "function"
                          ? c.setProperty("display", "none", "important")
                          : (c.display = "none"))
                      : ((g = V.stateNode),
                        (_ = V.memoizedProps.style),
                        (f =
                          _ != null && _.hasOwnProperty("display")
                            ? _.display
                            : null),
                        (g.style.display = Sr("display", f))));
                } catch (oe) {
                  Xe(e, e.return, oe);
                }
              }
            } else if (V.tag === 6) {
              if (M === null)
                try {
                  V.stateNode.nodeValue = R ? "" : V.memoizedProps;
                } catch (oe) {
                  Xe(e, e.return, oe);
                }
            } else if (
              ((V.tag !== 22 && V.tag !== 23) ||
                V.memoizedState === null ||
                V === e) &&
              V.child !== null
            ) {
              ((V.child.return = V), (V = V.child));
              continue;
            }
            if (V === e) break e;
            for (; V.sibling === null; ) {
              if (V.return === null || V.return === e) break e;
              (M === V && (M = null), (V = V.return));
            }
            (M === V && (M = null),
              (V.sibling.return = V.return),
              (V = V.sibling));
          }
        }
        break;
      case 19:
        (Gt(t, e), on(e), a & 4 && Pd(e));
        break;
      case 21:
        break;
      default:
        (Gt(t, e), on(e));
    }
  }
  function on(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (Cd(n)) {
              var a = n;
              break e;
            }
            n = n.return;
          }
          throw Error(i(160));
        }
        switch (a.tag) {
          case 5:
            var o = a.stateNode;
            a.flags & 32 && (nn(o, ""), (a.flags &= -33));
            var c = jd(e);
            io(e, c, o);
            break;
          case 3:
          case 4:
            var f = a.stateNode.containerInfo,
              g = jd(e);
            so(e, g, f);
            break;
          default:
            throw Error(i(161));
        }
      } catch (_) {
        Xe(e, e.return, _);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function um(e, t, n) {
    ((re = e), Od(e));
  }
  function Od(e, t, n) {
    for (var a = (e.mode & 1) !== 0; re !== null; ) {
      var o = re,
        c = o.child;
      if (o.tag === 22 && a) {
        var f = o.memoizedState !== null || Gi;
        if (!f) {
          var g = o.alternate,
            _ = (g !== null && g.memoizedState !== null) || xt;
          g = Gi;
          var R = xt;
          if (((Gi = f), (xt = _) && !R))
            for (re = o; re !== null; )
              ((f = re),
                (_ = f.child),
                f.tag === 22 && f.memoizedState !== null
                  ? Dd(o)
                  : _ !== null
                    ? ((_.return = f), (re = _))
                    : Dd(o));
          for (; c !== null; ) ((re = c), Od(c), (c = c.sibling));
          ((re = o), (Gi = g), (xt = R));
        }
        Id(e);
      } else
        (o.subtreeFlags & 8772) !== 0 && c !== null
          ? ((c.return = o), (re = c))
          : Id(e);
    }
  }
  function Id(e) {
    for (; re !== null; ) {
      var t = re;
      if ((t.flags & 8772) !== 0) {
        var n = t.alternate;
        try {
          if ((t.flags & 8772) !== 0)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                xt || Xi(5, t);
                break;
              case 1:
                var a = t.stateNode;
                if (t.flags & 4 && !xt)
                  if (n === null) a.componentDidMount();
                  else {
                    var o =
                      t.elementType === t.type
                        ? n.memoizedProps
                        : Jt(t.type, n.memoizedProps);
                    a.componentDidUpdate(
                      o,
                      n.memoizedState,
                      a.__reactInternalSnapshotBeforeUpdate,
                    );
                  }
                var c = t.updateQueue;
                c !== null && Ac(t, c, a);
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
                  Ac(t, f, n);
                }
                break;
              case 5:
                var g = t.stateNode;
                if (n === null && t.flags & 4) {
                  n = g;
                  var _ = t.memoizedProps;
                  switch (t.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      _.autoFocus && n.focus();
                      break;
                    case "img":
                      _.src && (n.src = _.src);
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
                  var R = t.alternate;
                  if (R !== null) {
                    var M = R.memoizedState;
                    if (M !== null) {
                      var V = M.dehydrated;
                      V !== null && ws(V);
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
                throw Error(i(163));
            }
          xt || (t.flags & 512 && ro(t));
        } catch (F) {
          Xe(t, t.return, F);
        }
      }
      if (t === e) {
        re = null;
        break;
      }
      if (((n = t.sibling), n !== null)) {
        ((n.return = t.return), (re = n));
        break;
      }
      re = t.return;
    }
  }
  function Ad(e) {
    for (; re !== null; ) {
      var t = re;
      if (t === e) {
        re = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        ((n.return = t.return), (re = n));
        break;
      }
      re = t.return;
    }
  }
  function Dd(e) {
    for (; re !== null; ) {
      var t = re;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              Xi(4, t);
            } catch (_) {
              Xe(t, n, _);
            }
            break;
          case 1:
            var a = t.stateNode;
            if (typeof a.componentDidMount == "function") {
              var o = t.return;
              try {
                a.componentDidMount();
              } catch (_) {
                Xe(t, o, _);
              }
            }
            var c = t.return;
            try {
              ro(t);
            } catch (_) {
              Xe(t, c, _);
            }
            break;
          case 5:
            var f = t.return;
            try {
              ro(t);
            } catch (_) {
              Xe(t, f, _);
            }
        }
      } catch (_) {
        Xe(t, t.return, _);
      }
      if (t === e) {
        re = null;
        break;
      }
      var g = t.sibling;
      if (g !== null) {
        ((g.return = t.return), (re = g));
        break;
      }
      re = t.return;
    }
  }
  var cm = Math.ceil,
    ea = X.ReactCurrentDispatcher,
    ao = X.ReactCurrentOwner,
    Wt = X.ReactCurrentBatchConfig,
    Ve = 0,
    ft = null,
    rt = null,
    mt = 0,
    Lt = 0,
    Kr = Mn(0),
    ut = 0,
    Bs = null,
    pr = 0,
    ta = 0,
    lo = 0,
    Ws = null,
    Tt = null,
    oo = 0,
    qr = 1 / 0,
    wn = null,
    na = !1,
    uo = null,
    Bn = null,
    ra = !1,
    Wn = null,
    sa = 0,
    Zs = 0,
    co = null,
    ia = -1,
    aa = 0;
  function kt() {
    return (Ve & 6) !== 0 ? et() : ia !== -1 ? ia : (ia = et());
  }
  function Zn(e) {
    return (e.mode & 1) === 0
      ? 1
      : (Ve & 2) !== 0 && mt !== 0
        ? mt & -mt
        : Qh.transition !== null
          ? (aa === 0 && (aa = ju()), aa)
          : ((e = We),
            e !== 0 ||
              ((e = window.event), (e = e === void 0 ? 16 : Fu(e.type))),
            e);
  }
  function Xt(e, t, n, a) {
    if (50 < Zs) throw ((Zs = 0), (co = null), Error(i(185)));
    (ms(e, n, a),
      ((Ve & 2) === 0 || e !== ft) &&
        (e === ft && ((Ve & 2) === 0 && (ta |= n), ut === 4 && Hn(e, mt)),
        Pt(e, a),
        n === 1 &&
          Ve === 0 &&
          (t.mode & 1) === 0 &&
          ((qr = et() + 500), Di && zn())));
  }
  function Pt(e, t) {
    var n = e.callbackNode;
    Qp(e, t);
    var a = mi(e, e === ft ? mt : 0);
    if (a === 0)
      (n !== null && Eu(n), (e.callbackNode = null), (e.callbackPriority = 0));
    else if (((t = a & -a), e.callbackPriority !== t)) {
      if ((n != null && Eu(n), t === 1))
        (e.tag === 0 ? Hh(Fd.bind(null, e)) : _c(Fd.bind(null, e)),
          bh(function () {
            (Ve & 6) === 0 && zn();
          }),
          (n = null));
      else {
        switch (Tu(a)) {
          case 1:
            n = Ba;
            break;
          case 4:
            n = Nu;
            break;
          case 16:
            n = di;
            break;
          case 536870912:
            n = Cu;
            break;
          default:
            n = di;
        }
        n = Wd(n, Ld.bind(null, e));
      }
      ((e.callbackPriority = t), (e.callbackNode = n));
    }
  }
  function Ld(e, t) {
    if (((ia = -1), (aa = 0), (Ve & 6) !== 0)) throw Error(i(327));
    var n = e.callbackNode;
    if (Jr() && e.callbackNode !== n) return null;
    var a = mi(e, e === ft ? mt : 0);
    if (a === 0) return null;
    if ((a & 30) !== 0 || (a & e.expiredLanes) !== 0 || t) t = la(e, a);
    else {
      t = a;
      var o = Ve;
      Ve |= 2;
      var c = Vd();
      (ft !== e || mt !== t) && ((wn = null), (qr = et() + 500), mr(e, t));
      do
        try {
          pm();
          break;
        } catch (g) {
          Md(e, g);
        }
      while (!0);
      (Tl(),
        (ea.current = c),
        (Ve = o),
        rt !== null ? (t = 0) : ((ft = null), (mt = 0), (t = ut)));
    }
    if (t !== 0) {
      if (
        (t === 2 && ((o = Wa(e)), o !== 0 && ((a = o), (t = fo(e, o)))),
        t === 1)
      )
        throw ((n = Bs), mr(e, 0), Hn(e, a), Pt(e, et()), n);
      if (t === 6) Hn(e, a);
      else {
        if (
          ((o = e.current.alternate),
          (a & 30) === 0 &&
            !dm(o) &&
            ((t = la(e, a)),
            t === 2 && ((c = Wa(e)), c !== 0 && ((a = c), (t = fo(e, c)))),
            t === 1))
        )
          throw ((n = Bs), mr(e, 0), Hn(e, a), Pt(e, et()), n);
        switch (((e.finishedWork = o), (e.finishedLanes = a), t)) {
          case 0:
          case 1:
            throw Error(i(345));
          case 2:
            vr(e, Tt, wn);
            break;
          case 3:
            if (
              (Hn(e, a),
              (a & 130023424) === a && ((t = oo + 500 - et()), 10 < t))
            ) {
              if (mi(e, 0) !== 0) break;
              if (((o = e.suspendedLanes), (o & a) !== a)) {
                (kt(), (e.pingedLanes |= e.suspendedLanes & o));
                break;
              }
              e.timeoutHandle = yl(vr.bind(null, e, Tt, wn), t);
              break;
            }
            vr(e, Tt, wn);
            break;
          case 4:
            if ((Hn(e, a), (a & 4194240) === a)) break;
            for (t = e.eventTimes, o = -1; 0 < a; ) {
              var f = 31 - Qt(a);
              ((c = 1 << f), (f = t[f]), f > o && (o = f), (a &= ~c));
            }
            if (
              ((a = o),
              (a = et() - a),
              (a =
                (120 > a
                  ? 120
                  : 480 > a
                    ? 480
                    : 1080 > a
                      ? 1080
                      : 1920 > a
                        ? 1920
                        : 3e3 > a
                          ? 3e3
                          : 4320 > a
                            ? 4320
                            : 1960 * cm(a / 1960)) - a),
              10 < a)
            ) {
              e.timeoutHandle = yl(vr.bind(null, e, Tt, wn), a);
              break;
            }
            vr(e, Tt, wn);
            break;
          case 5:
            vr(e, Tt, wn);
            break;
          default:
            throw Error(i(329));
        }
      }
    }
    return (Pt(e, et()), e.callbackNode === n ? Ld.bind(null, e) : null);
  }
  function fo(e, t) {
    var n = Ws;
    return (
      e.current.memoizedState.isDehydrated && (mr(e, t).flags |= 256),
      (e = la(e, t)),
      e !== 2 && ((t = Tt), (Tt = n), t !== null && po(t)),
      e
    );
  }
  function po(e) {
    Tt === null ? (Tt = e) : Tt.push.apply(Tt, e);
  }
  function dm(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && ((n = n.stores), n !== null))
          for (var a = 0; a < n.length; a++) {
            var o = n[a],
              c = o.getSnapshot;
            o = o.value;
            try {
              if (!Kt(c(), o)) return !1;
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
  function Hn(e, t) {
    for (
      t &= ~lo,
        t &= ~ta,
        e.suspendedLanes |= t,
        e.pingedLanes &= ~t,
        e = e.expirationTimes;
      0 < t;

    ) {
      var n = 31 - Qt(t),
        a = 1 << n;
      ((e[n] = -1), (t &= ~a));
    }
  }
  function Fd(e) {
    if ((Ve & 6) !== 0) throw Error(i(327));
    Jr();
    var t = mi(e, 0);
    if ((t & 1) === 0) return (Pt(e, et()), null);
    var n = la(e, t);
    if (e.tag !== 0 && n === 2) {
      var a = Wa(e);
      a !== 0 && ((t = a), (n = fo(e, a)));
    }
    if (n === 1) throw ((n = Bs), mr(e, 0), Hn(e, t), Pt(e, et()), n);
    if (n === 6) throw Error(i(345));
    return (
      (e.finishedWork = e.current.alternate),
      (e.finishedLanes = t),
      vr(e, Tt, wn),
      Pt(e, et()),
      null
    );
  }
  function ho(e, t) {
    var n = Ve;
    Ve |= 1;
    try {
      return e(t);
    } finally {
      ((Ve = n), Ve === 0 && ((qr = et() + 500), Di && zn()));
    }
  }
  function hr(e) {
    Wn !== null && Wn.tag === 0 && (Ve & 6) === 0 && Jr();
    var t = Ve;
    Ve |= 1;
    var n = Wt.transition,
      a = We;
    try {
      if (((Wt.transition = null), (We = 1), e)) return e();
    } finally {
      ((We = a), (Wt.transition = n), (Ve = t), (Ve & 6) === 0 && zn());
    }
  }
  function mo() {
    ((Lt = Kr.current), Ke(Kr));
  }
  function mr(e, t) {
    ((e.finishedWork = null), (e.finishedLanes = 0));
    var n = e.timeoutHandle;
    if ((n !== -1 && ((e.timeoutHandle = -1), $h(n)), rt !== null))
      for (n = rt.return; n !== null; ) {
        var a = n;
        switch ((Sl(a), a.tag)) {
          case 1:
            ((a = a.type.childContextTypes), a != null && Ii());
            break;
          case 3:
            (Zr(), Ke(Nt), Ke(vt), Fl());
            break;
          case 5:
            Dl(a);
            break;
          case 4:
            Zr();
            break;
          case 13:
            Ke(Je);
            break;
          case 19:
            Ke(Je);
            break;
          case 10:
            Pl(a.type._context);
            break;
          case 22:
          case 23:
            mo();
        }
        n = n.return;
      }
    if (
      ((ft = e),
      (rt = e = Qn(e.current, null)),
      (mt = Lt = t),
      (ut = 0),
      (Bs = null),
      (lo = ta = pr = 0),
      (Tt = Ws = null),
      cr !== null)
    ) {
      for (t = 0; t < cr.length; t++)
        if (((n = cr[t]), (a = n.interleaved), a !== null)) {
          n.interleaved = null;
          var o = a.next,
            c = n.pending;
          if (c !== null) {
            var f = c.next;
            ((c.next = o), (a.next = f));
          }
          n.pending = a;
        }
      cr = null;
    }
    return e;
  }
  function Md(e, t) {
    do {
      var n = rt;
      try {
        if ((Tl(), (Wi.current = Ki), Zi)) {
          for (var a = Ye.memoizedState; a !== null; ) {
            var o = a.queue;
            (o !== null && (o.pending = null), (a = a.next));
          }
          Zi = !1;
        }
        if (
          ((fr = 0),
          (dt = ot = Ye = null),
          (Ms = !1),
          (Vs = 0),
          (ao.current = null),
          n === null || n.return === null)
        ) {
          ((ut = 1), (Bs = t), (rt = null));
          break;
        }
        e: {
          var c = e,
            f = n.return,
            g = n,
            _ = t;
          if (
            ((t = mt),
            (g.flags |= 32768),
            _ !== null && typeof _ == "object" && typeof _.then == "function")
          ) {
            var R = _,
              M = g,
              V = M.tag;
            if ((M.mode & 1) === 0 && (V === 0 || V === 11 || V === 15)) {
              var F = M.alternate;
              F
                ? ((M.updateQueue = F.updateQueue),
                  (M.memoizedState = F.memoizedState),
                  (M.lanes = F.lanes))
                : ((M.updateQueue = null), (M.memoizedState = null));
            }
            var ee = od(f);
            if (ee !== null) {
              ((ee.flags &= -257),
                ud(ee, f, g, c, t),
                ee.mode & 1 && ld(c, R, t),
                (t = ee),
                (_ = R));
              var se = t.updateQueue;
              if (se === null) {
                var oe = new Set();
                (oe.add(_), (t.updateQueue = oe));
              } else se.add(_);
              break e;
            } else {
              if ((t & 1) === 0) {
                (ld(c, R, t), vo());
                break e;
              }
              _ = Error(i(426));
            }
          } else if (qe && g.mode & 1) {
            var tt = od(f);
            if (tt !== null) {
              ((tt.flags & 65536) === 0 && (tt.flags |= 256),
                ud(tt, f, g, c, t),
                Cl(Hr(_, g)));
              break e;
            }
          }
          ((c = _ = Hr(_, g)),
            ut !== 4 && (ut = 2),
            Ws === null ? (Ws = [c]) : Ws.push(c),
            (c = f));
          do {
            switch (c.tag) {
              case 3:
                ((c.flags |= 65536), (t &= -t), (c.lanes |= t));
                var C = id(c, _, t);
                Ic(c, C);
                break e;
              case 1:
                g = _;
                var k = c.type,
                  j = c.stateNode;
                if (
                  (c.flags & 128) === 0 &&
                  (typeof k.getDerivedStateFromError == "function" ||
                    (j !== null &&
                      typeof j.componentDidCatch == "function" &&
                      (Bn === null || !Bn.has(j))))
                ) {
                  ((c.flags |= 65536), (t &= -t), (c.lanes |= t));
                  var U = ad(c, g, t);
                  Ic(c, U);
                  break e;
                }
            }
            c = c.return;
          } while (c !== null);
        }
        Ud(n);
      } catch (ce) {
        ((t = ce), rt === n && n !== null && (rt = n = n.return));
        continue;
      }
      break;
    } while (!0);
  }
  function Vd() {
    var e = ea.current;
    return ((ea.current = Ki), e === null ? Ki : e);
  }
  function vo() {
    ((ut === 0 || ut === 3 || ut === 2) && (ut = 4),
      ft === null ||
        ((pr & 268435455) === 0 && (ta & 268435455) === 0) ||
        Hn(ft, mt));
  }
  function la(e, t) {
    var n = Ve;
    Ve |= 2;
    var a = Vd();
    (ft !== e || mt !== t) && ((wn = null), mr(e, t));
    do
      try {
        fm();
        break;
      } catch (o) {
        Md(e, o);
      }
    while (!0);
    if ((Tl(), (Ve = n), (ea.current = a), rt !== null)) throw Error(i(261));
    return ((ft = null), (mt = 0), ut);
  }
  function fm() {
    for (; rt !== null; ) zd(rt);
  }
  function pm() {
    for (; rt !== null && !Vp(); ) zd(rt);
  }
  function zd(e) {
    var t = Bd(e.alternate, e, Lt);
    ((e.memoizedProps = e.pendingProps),
      t === null ? Ud(e) : (rt = t),
      (ao.current = null));
  }
  function Ud(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (((e = t.return), (t.flags & 32768) === 0)) {
        if (((n = im(n, t, Lt)), n !== null)) {
          rt = n;
          return;
        }
      } else {
        if (((n = am(n, t)), n !== null)) {
          ((n.flags &= 32767), (rt = n));
          return;
        }
        if (e !== null)
          ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
        else {
          ((ut = 6), (rt = null));
          return;
        }
      }
      if (((t = t.sibling), t !== null)) {
        rt = t;
        return;
      }
      rt = t = e;
    } while (t !== null);
    ut === 0 && (ut = 5);
  }
  function vr(e, t, n) {
    var a = We,
      o = Wt.transition;
    try {
      ((Wt.transition = null), (We = 1), hm(e, t, n, a));
    } finally {
      ((Wt.transition = o), (We = a));
    }
    return null;
  }
  function hm(e, t, n, a) {
    do Jr();
    while (Wn !== null);
    if ((Ve & 6) !== 0) throw Error(i(327));
    n = e.finishedWork;
    var o = e.finishedLanes;
    if (n === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
      throw Error(i(177));
    ((e.callbackNode = null), (e.callbackPriority = 0));
    var c = n.lanes | n.childLanes;
    if (
      (Kp(e, c),
      e === ft && ((rt = ft = null), (mt = 0)),
      ((n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0) ||
        ra ||
        ((ra = !0),
        Wd(di, function () {
          return (Jr(), null);
        })),
      (c = (n.flags & 15990) !== 0),
      (n.subtreeFlags & 15990) !== 0 || c)
    ) {
      ((c = Wt.transition), (Wt.transition = null));
      var f = We;
      We = 1;
      var g = Ve;
      ((Ve |= 4),
        (ao.current = null),
        om(e, n),
        Rd(n, e),
        Dh(ml),
        (gi = !!hl),
        (ml = hl = null),
        (e.current = n),
        um(n),
        zp(),
        (Ve = g),
        (We = f),
        (Wt.transition = c));
    } else e.current = n;
    if (
      (ra && ((ra = !1), (Wn = e), (sa = o)),
      (c = e.pendingLanes),
      c === 0 && (Bn = null),
      bp(n.stateNode),
      Pt(e, et()),
      t !== null)
    )
      for (a = e.onRecoverableError, n = 0; n < t.length; n++)
        ((o = t[n]), a(o.value, { componentStack: o.stack, digest: o.digest }));
    if (na) throw ((na = !1), (e = uo), (uo = null), e);
    return (
      (sa & 1) !== 0 && e.tag !== 0 && Jr(),
      (c = e.pendingLanes),
      (c & 1) !== 0 ? (e === co ? Zs++ : ((Zs = 0), (co = e))) : (Zs = 0),
      zn(),
      null
    );
  }
  function Jr() {
    if (Wn !== null) {
      var e = Tu(sa),
        t = Wt.transition,
        n = We;
      try {
        if (((Wt.transition = null), (We = 16 > e ? 16 : e), Wn === null))
          var a = !1;
        else {
          if (((e = Wn), (Wn = null), (sa = 0), (Ve & 6) !== 0))
            throw Error(i(331));
          var o = Ve;
          for (Ve |= 4, re = e.current; re !== null; ) {
            var c = re,
              f = c.child;
            if ((re.flags & 16) !== 0) {
              var g = c.deletions;
              if (g !== null) {
                for (var _ = 0; _ < g.length; _++) {
                  var R = g[_];
                  for (re = R; re !== null; ) {
                    var M = re;
                    switch (M.tag) {
                      case 0:
                      case 11:
                      case 15:
                        bs(8, M, c);
                    }
                    var V = M.child;
                    if (V !== null) ((V.return = M), (re = V));
                    else
                      for (; re !== null; ) {
                        M = re;
                        var F = M.sibling,
                          ee = M.return;
                        if ((Nd(M), M === R)) {
                          re = null;
                          break;
                        }
                        if (F !== null) {
                          ((F.return = ee), (re = F));
                          break;
                        }
                        re = ee;
                      }
                  }
                }
                var se = c.alternate;
                if (se !== null) {
                  var oe = se.child;
                  if (oe !== null) {
                    se.child = null;
                    do {
                      var tt = oe.sibling;
                      ((oe.sibling = null), (oe = tt));
                    } while (oe !== null);
                  }
                }
                re = c;
              }
            }
            if ((c.subtreeFlags & 2064) !== 0 && f !== null)
              ((f.return = c), (re = f));
            else
              e: for (; re !== null; ) {
                if (((c = re), (c.flags & 2048) !== 0))
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      bs(9, c, c.return);
                  }
                var C = c.sibling;
                if (C !== null) {
                  ((C.return = c.return), (re = C));
                  break e;
                }
                re = c.return;
              }
          }
          var k = e.current;
          for (re = k; re !== null; ) {
            f = re;
            var j = f.child;
            if ((f.subtreeFlags & 2064) !== 0 && j !== null)
              ((j.return = f), (re = j));
            else
              e: for (f = k; re !== null; ) {
                if (((g = re), (g.flags & 2048) !== 0))
                  try {
                    switch (g.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Xi(9, g);
                    }
                  } catch (ce) {
                    Xe(g, g.return, ce);
                  }
                if (g === f) {
                  re = null;
                  break e;
                }
                var U = g.sibling;
                if (U !== null) {
                  ((U.return = g.return), (re = U));
                  break e;
                }
                re = g.return;
              }
          }
          if (
            ((Ve = o),
            zn(),
            rn && typeof rn.onPostCommitFiberRoot == "function")
          )
            try {
              rn.onPostCommitFiberRoot(fi, e);
            } catch {}
          a = !0;
        }
        return a;
      } finally {
        ((We = n), (Wt.transition = t));
      }
    }
    return !1;
  }
  function $d(e, t, n) {
    ((t = Hr(n, t)),
      (t = id(e, t, 1)),
      (e = $n(e, t, 1)),
      (t = kt()),
      e !== null && (ms(e, 1, t), Pt(e, t)));
  }
  function Xe(e, t, n) {
    if (e.tag === 3) $d(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          $d(t, e, n);
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof a.componentDidCatch == "function" &&
              (Bn === null || !Bn.has(a)))
          ) {
            ((e = Hr(n, e)),
              (e = ad(t, e, 1)),
              (t = $n(t, e, 1)),
              (e = kt()),
              t !== null && (ms(t, 1, e), Pt(t, e)));
            break;
          }
        }
        t = t.return;
      }
  }
  function mm(e, t, n) {
    var a = e.pingCache;
    (a !== null && a.delete(t),
      (t = kt()),
      (e.pingedLanes |= e.suspendedLanes & n),
      ft === e &&
        (mt & n) === n &&
        (ut === 4 || (ut === 3 && (mt & 130023424) === mt && 500 > et() - oo)
          ? mr(e, 0)
          : (lo |= n)),
      Pt(e, t));
  }
  function bd(e, t) {
    t === 0 &&
      ((e.mode & 1) === 0
        ? (t = 1)
        : ((t = hi), (hi <<= 1), (hi & 130023424) === 0 && (hi = 4194304)));
    var n = kt();
    ((e = yn(e, t)), e !== null && (ms(e, t, n), Pt(e, n)));
  }
  function vm(e) {
    var t = e.memoizedState,
      n = 0;
    (t !== null && (n = t.retryLane), bd(e, n));
  }
  function ym(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var a = e.stateNode,
          o = e.memoizedState;
        o !== null && (n = o.retryLane);
        break;
      case 19:
        a = e.stateNode;
        break;
      default:
        throw Error(i(314));
    }
    (a !== null && a.delete(t), bd(e, n));
  }
  var Bd;
  Bd = function (e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps || Nt.current) jt = !0;
      else {
        if ((e.lanes & n) === 0 && (t.flags & 128) === 0)
          return ((jt = !1), sm(e, t, n));
        jt = (e.flags & 131072) !== 0;
      }
    else ((jt = !1), qe && (t.flags & 1048576) !== 0 && kc(t, Fi, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 2:
        var a = t.type;
        (Yi(e, t), (e = t.pendingProps));
        var o = Vr(t, vt.current);
        (Wr(t, n), (o = zl(null, t, a, e, o, n)));
        var c = Ul();
        return (
          (t.flags |= 1),
          typeof o == "object" &&
          o !== null &&
          typeof o.render == "function" &&
          o.$$typeof === void 0
            ? ((t.tag = 1),
              (t.memoizedState = null),
              (t.updateQueue = null),
              Ct(a) ? ((c = !0), Ai(t)) : (c = !1),
              (t.memoizedState =
                o.state !== null && o.state !== void 0 ? o.state : null),
              Il(t),
              (o.updater = qi),
              (t.stateNode = o),
              (o._reactInternals = t),
              Hl(t, a, e, n),
              (t = Jl(null, t, a, !0, c, n)))
            : ((t.tag = 0), qe && c && kl(t), _t(null, t, o, n), (t = t.child)),
          t
        );
      case 16:
        a = t.elementType;
        e: {
          switch (
            (Yi(e, t),
            (e = t.pendingProps),
            (o = a._init),
            (a = o(a._payload)),
            (t.type = a),
            (o = t.tag = xm(a)),
            (e = Jt(a, e)),
            o)
          ) {
            case 0:
              t = ql(null, t, a, e, n);
              break e;
            case 1:
              t = md(null, t, a, e, n);
              break e;
            case 11:
              t = cd(null, t, a, e, n);
              break e;
            case 14:
              t = dd(null, t, a, Jt(a.type, e), n);
              break e;
          }
          throw Error(i(306, a, ""));
        }
        return t;
      case 0:
        return (
          (a = t.type),
          (o = t.pendingProps),
          (o = t.elementType === a ? o : Jt(a, o)),
          ql(e, t, a, o, n)
        );
      case 1:
        return (
          (a = t.type),
          (o = t.pendingProps),
          (o = t.elementType === a ? o : Jt(a, o)),
          md(e, t, a, o, n)
        );
      case 3:
        e: {
          if ((vd(t), e === null)) throw Error(i(387));
          ((a = t.pendingProps),
            (c = t.memoizedState),
            (o = c.element),
            Oc(e, t),
            bi(t, a, null, n));
          var f = t.memoizedState;
          if (((a = f.element), c.isDehydrated))
            if (
              ((c = {
                element: a,
                isDehydrated: !1,
                cache: f.cache,
                pendingSuspenseBoundaries: f.pendingSuspenseBoundaries,
                transitions: f.transitions,
              }),
              (t.updateQueue.baseState = c),
              (t.memoizedState = c),
              t.flags & 256)
            ) {
              ((o = Hr(Error(i(423)), t)), (t = yd(e, t, a, n, o)));
              break e;
            } else if (a !== o) {
              ((o = Hr(Error(i(424)), t)), (t = yd(e, t, a, n, o)));
              break e;
            } else
              for (
                Dt = Fn(t.stateNode.containerInfo.firstChild),
                  At = t,
                  qe = !0,
                  qt = null,
                  n = Pc(t, null, a, n),
                  t.child = n;
                n;

              )
                ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
          else {
            if (($r(), a === o)) {
              t = xn(e, t, n);
              break e;
            }
            _t(e, t, a, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return (
          Dc(t),
          e === null && Nl(t),
          (a = t.type),
          (o = t.pendingProps),
          (c = e !== null ? e.memoizedProps : null),
          (f = o.children),
          vl(a, o) ? (f = null) : c !== null && vl(a, c) && (t.flags |= 32),
          hd(e, t),
          _t(e, t, f, n),
          t.child
        );
      case 6:
        return (e === null && Nl(t), null);
      case 13:
        return gd(e, t, n);
      case 4:
        return (
          Al(t, t.stateNode.containerInfo),
          (a = t.pendingProps),
          e === null ? (t.child = br(t, null, a, n)) : _t(e, t, a, n),
          t.child
        );
      case 11:
        return (
          (a = t.type),
          (o = t.pendingProps),
          (o = t.elementType === a ? o : Jt(a, o)),
          cd(e, t, a, o, n)
        );
      case 7:
        return (_t(e, t, t.pendingProps, n), t.child);
      case 8:
        return (_t(e, t, t.pendingProps.children, n), t.child);
      case 12:
        return (_t(e, t, t.pendingProps.children, n), t.child);
      case 10:
        e: {
          if (
            ((a = t.type._context),
            (o = t.pendingProps),
            (c = t.memoizedProps),
            (f = o.value),
            He(zi, a._currentValue),
            (a._currentValue = f),
            c !== null)
          )
            if (Kt(c.value, f)) {
              if (c.children === o.children && !Nt.current) {
                t = xn(e, t, n);
                break e;
              }
            } else
              for (c = t.child, c !== null && (c.return = t); c !== null; ) {
                var g = c.dependencies;
                if (g !== null) {
                  f = c.child;
                  for (var _ = g.firstContext; _ !== null; ) {
                    if (_.context === a) {
                      if (c.tag === 1) {
                        ((_ = gn(-1, n & -n)), (_.tag = 2));
                        var R = c.updateQueue;
                        if (R !== null) {
                          R = R.shared;
                          var M = R.pending;
                          (M === null
                            ? (_.next = _)
                            : ((_.next = M.next), (M.next = _)),
                            (R.pending = _));
                        }
                      }
                      ((c.lanes |= n),
                        (_ = c.alternate),
                        _ !== null && (_.lanes |= n),
                        Rl(c.return, n, t),
                        (g.lanes |= n));
                      break;
                    }
                    _ = _.next;
                  }
                } else if (c.tag === 10) f = c.type === t.type ? null : c.child;
                else if (c.tag === 18) {
                  if (((f = c.return), f === null)) throw Error(i(341));
                  ((f.lanes |= n),
                    (g = f.alternate),
                    g !== null && (g.lanes |= n),
                    Rl(f, n, t),
                    (f = c.sibling));
                } else f = c.child;
                if (f !== null) f.return = c;
                else
                  for (f = c; f !== null; ) {
                    if (f === t) {
                      f = null;
                      break;
                    }
                    if (((c = f.sibling), c !== null)) {
                      ((c.return = f.return), (f = c));
                      break;
                    }
                    f = f.return;
                  }
                c = f;
              }
          (_t(e, t, o.children, n), (t = t.child));
        }
        return t;
      case 9:
        return (
          (o = t.type),
          (a = t.pendingProps.children),
          Wr(t, n),
          (o = bt(o)),
          (a = a(o)),
          (t.flags |= 1),
          _t(e, t, a, n),
          t.child
        );
      case 14:
        return (
          (a = t.type),
          (o = Jt(a, t.pendingProps)),
          (o = Jt(a.type, o)),
          dd(e, t, a, o, n)
        );
      case 15:
        return fd(e, t, t.type, t.pendingProps, n);
      case 17:
        return (
          (a = t.type),
          (o = t.pendingProps),
          (o = t.elementType === a ? o : Jt(a, o)),
          Yi(e, t),
          (t.tag = 1),
          Ct(a) ? ((e = !0), Ai(t)) : (e = !1),
          Wr(t, n),
          rd(t, a, o),
          Hl(t, a, o, n),
          Jl(null, t, a, !0, e, n)
        );
      case 19:
        return wd(e, t, n);
      case 22:
        return pd(e, t, n);
    }
    throw Error(i(156, t.tag));
  };
  function Wd(e, t) {
    return Su(e, t);
  }
  function gm(e, t, n, a) {
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
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function Zt(e, t, n, a) {
    return new gm(e, t, n, a);
  }
  function yo(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function xm(e) {
    if (typeof e == "function") return yo(e) ? 1 : 0;
    if (e != null) {
      if (((e = e.$$typeof), e === G)) return 11;
      if (e === Le) return 14;
    }
    return 2;
  }
  function Qn(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = Zt(e.tag, t, e.key, e.mode)),
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
  function oa(e, t, n, a, o, c) {
    var f = 2;
    if (((a = e), typeof e == "function")) yo(e) && (f = 1);
    else if (typeof e == "string") f = 5;
    else
      e: switch (e) {
        case Te:
          return yr(n.children, o, c, t);
        case Pe:
          ((f = 8), (o |= 8));
          break;
        case Fe:
          return (
            (e = Zt(12, n, t, o | 2)),
            (e.elementType = Fe),
            (e.lanes = c),
            e
          );
        case H:
          return ((e = Zt(13, n, t, o)), (e.elementType = H), (e.lanes = c), e);
        case ke:
          return (
            (e = Zt(19, n, t, o)),
            (e.elementType = ke),
            (e.lanes = c),
            e
          );
        case Ce:
          return ua(n, o, c, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case ne:
                f = 10;
                break e;
              case xe:
                f = 9;
                break e;
              case G:
                f = 11;
                break e;
              case Le:
                f = 14;
                break e;
              case Re:
                ((f = 16), (a = null));
                break e;
            }
          throw Error(i(130, e == null ? e : typeof e, ""));
      }
    return (
      (t = Zt(f, n, t, o)),
      (t.elementType = e),
      (t.type = a),
      (t.lanes = c),
      t
    );
  }
  function yr(e, t, n, a) {
    return ((e = Zt(7, e, a, t)), (e.lanes = n), e);
  }
  function ua(e, t, n, a) {
    return (
      (e = Zt(22, e, a, t)),
      (e.elementType = Ce),
      (e.lanes = n),
      (e.stateNode = { isHidden: !1 }),
      e
    );
  }
  function go(e, t, n) {
    return ((e = Zt(6, e, null, t)), (e.lanes = n), e);
  }
  function xo(e, t, n) {
    return (
      (t = Zt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  function wm(e, t, n, a, o) {
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
      (this.eventTimes = Za(0)),
      (this.expirationTimes = Za(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Za(0)),
      (this.identifierPrefix = a),
      (this.onRecoverableError = o),
      (this.mutableSourceEagerHydrationData = null));
  }
  function wo(e, t, n, a, o, c, f, g, _) {
    return (
      (e = new wm(e, t, n, g, _)),
      t === 1 ? ((t = 1), c === !0 && (t |= 8)) : (t = 0),
      (c = Zt(3, null, null, t)),
      (e.current = c),
      (c.stateNode = e),
      (c.memoizedState = {
        element: a,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      Il(c),
      e
    );
  }
  function _m(e, t, n) {
    var a =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: ie,
      key: a == null ? null : "" + a,
      children: e,
      containerInfo: t,
      implementation: n,
    };
  }
  function Zd(e) {
    if (!e) return Vn;
    e = e._reactInternals;
    e: {
      if (ir(e) !== e || e.tag !== 1) throw Error(i(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (Ct(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(i(171));
    }
    if (e.tag === 1) {
      var n = e.type;
      if (Ct(n)) return xc(e, n, t);
    }
    return t;
  }
  function Hd(e, t, n, a, o, c, f, g, _) {
    return (
      (e = wo(n, a, !0, e, o, c, f, g, _)),
      (e.context = Zd(null)),
      (n = e.current),
      (a = kt()),
      (o = Zn(n)),
      (c = gn(a, o)),
      (c.callback = t ?? null),
      $n(n, c, o),
      (e.current.lanes = o),
      ms(e, o, a),
      Pt(e, a),
      e
    );
  }
  function ca(e, t, n, a) {
    var o = t.current,
      c = kt(),
      f = Zn(o);
    return (
      (n = Zd(n)),
      t.context === null ? (t.context = n) : (t.pendingContext = n),
      (t = gn(c, f)),
      (t.payload = { element: e }),
      (a = a === void 0 ? null : a),
      a !== null && (t.callback = a),
      (e = $n(o, t, f)),
      e !== null && (Xt(e, o, f, c), $i(e, o, f)),
      f
    );
  }
  function da(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function Qd(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function _o(e, t) {
    (Qd(e, t), (e = e.alternate) && Qd(e, t));
  }
  function km() {
    return null;
  }
  var Kd =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          console.error(e);
        };
  function ko(e) {
    this._internalRoot = e;
  }
  ((fa.prototype.render = ko.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(i(409));
      ca(e, t, null, null);
    }),
    (fa.prototype.unmount = ko.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (hr(function () {
            ca(null, e, null, null);
          }),
            (t[pn] = null));
        }
      }));
  function fa(e) {
    this._internalRoot = e;
  }
  fa.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Ou();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < An.length && t !== 0 && t < An[n].priority; n++);
      (An.splice(n, 0, e), n === 0 && Du(e));
    }
  };
  function So(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function pa(e) {
    return !(
      !e ||
      (e.nodeType !== 1 &&
        e.nodeType !== 9 &&
        e.nodeType !== 11 &&
        (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
    );
  }
  function qd() {}
  function Sm(e, t, n, a, o) {
    if (o) {
      if (typeof a == "function") {
        var c = a;
        a = function () {
          var R = da(f);
          c.call(R);
        };
      }
      var f = Hd(t, a, e, 0, null, !1, !1, "", qd);
      return (
        (e._reactRootContainer = f),
        (e[pn] = f.current),
        Ps(e.nodeType === 8 ? e.parentNode : e),
        hr(),
        f
      );
    }
    for (; (o = e.lastChild); ) e.removeChild(o);
    if (typeof a == "function") {
      var g = a;
      a = function () {
        var R = da(_);
        g.call(R);
      };
    }
    var _ = wo(e, 0, !1, null, null, !1, !1, "", qd);
    return (
      (e._reactRootContainer = _),
      (e[pn] = _.current),
      Ps(e.nodeType === 8 ? e.parentNode : e),
      hr(function () {
        ca(t, _, n, a);
      }),
      _
    );
  }
  function ha(e, t, n, a, o) {
    var c = n._reactRootContainer;
    if (c) {
      var f = c;
      if (typeof o == "function") {
        var g = o;
        o = function () {
          var _ = da(f);
          g.call(_);
        };
      }
      ca(t, f, e, o);
    } else f = Sm(n, t, e, o, a);
    return da(f);
  }
  ((Pu = function (e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = hs(t.pendingLanes);
          n !== 0 &&
            (Ha(t, n | 1),
            Pt(t, et()),
            (Ve & 6) === 0 && ((qr = et() + 500), zn()));
        }
        break;
      case 13:
        (hr(function () {
          var a = yn(e, 1);
          if (a !== null) {
            var o = kt();
            Xt(a, e, 1, o);
          }
        }),
          _o(e, 1));
    }
  }),
    (Qa = function (e) {
      if (e.tag === 13) {
        var t = yn(e, 134217728);
        if (t !== null) {
          var n = kt();
          Xt(t, e, 134217728, n);
        }
        _o(e, 134217728);
      }
    }),
    (Ru = function (e) {
      if (e.tag === 13) {
        var t = Zn(e),
          n = yn(e, t);
        if (n !== null) {
          var a = kt();
          Xt(n, e, t, a);
        }
        _o(e, t);
      }
    }),
    (Ou = function () {
      return We;
    }),
    (Iu = function (e, t) {
      var n = We;
      try {
        return ((We = e), t());
      } finally {
        We = n;
      }
    }),
    (za = function (e, t, n) {
      switch (t) {
        case "input":
          if ((sr(e, n), (t = n.name), n.type === "radio" && t != null)) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll(
                "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
              ),
                t = 0;
              t < n.length;
              t++
            ) {
              var a = n[t];
              if (a !== e && a.form === e.form) {
                var o = Oi(a);
                if (!o) throw Error(i(90));
                (jn(a), sr(a, o));
              }
            }
          }
          break;
        case "textarea":
          Z(e, n);
          break;
        case "select":
          ((t = n.value), t != null && E(e, !!n.multiple, t, !1));
      }
    }),
    (vu = ho),
    (yu = hr));
  var Em = { usingClientEntryPoint: !1, Events: [Is, Fr, Oi, hu, mu, ho] },
    Hs = {
      findFiberByHostInstance: ar,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom",
    },
    Nm = {
      bundleType: Hs.bundleType,
      version: Hs.version,
      rendererPackageName: Hs.rendererPackageName,
      rendererConfig: Hs.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: X.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (e) {
        return ((e = _u(e)), e === null ? null : e.stateNode);
      },
      findFiberByHostInstance: Hs.findFiberByHostInstance || km,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ma = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ma.isDisabled && ma.supportsFiber)
      try {
        ((fi = ma.inject(Nm)), (rn = ma));
      } catch {}
  }
  return (
    (Rt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Em),
    (Rt.createPortal = function (e, t) {
      var n =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!So(t)) throw Error(i(200));
      return _m(e, t, null, n);
    }),
    (Rt.createRoot = function (e, t) {
      if (!So(e)) throw Error(i(299));
      var n = !1,
        a = "",
        o = Kd;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
          t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
        (t = wo(e, 1, !1, null, null, n, !1, a, o)),
        (e[pn] = t.current),
        Ps(e.nodeType === 8 ? e.parentNode : e),
        new ko(t)
      );
    }),
    (Rt.findDOMNode = function (e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == "function"
          ? Error(i(188))
          : ((e = Object.keys(e).join(",")), Error(i(268, e)));
      return ((e = _u(t)), (e = e === null ? null : e.stateNode), e);
    }),
    (Rt.flushSync = function (e) {
      return hr(e);
    }),
    (Rt.hydrate = function (e, t, n) {
      if (!pa(t)) throw Error(i(200));
      return ha(null, e, t, !0, n);
    }),
    (Rt.hydrateRoot = function (e, t, n) {
      if (!So(e)) throw Error(i(405));
      var a = (n != null && n.hydratedSources) || null,
        o = !1,
        c = "",
        f = Kd;
      if (
        (n != null &&
          (n.unstable_strictMode === !0 && (o = !0),
          n.identifierPrefix !== void 0 && (c = n.identifierPrefix),
          n.onRecoverableError !== void 0 && (f = n.onRecoverableError)),
        (t = Hd(t, null, e, 1, n ?? null, o, !1, c, f)),
        (e[pn] = t.current),
        Ps(e),
        a)
      )
        for (e = 0; e < a.length; e++)
          ((n = a[e]),
            (o = n._getVersion),
            (o = o(n._source)),
            t.mutableSourceEagerHydrationData == null
              ? (t.mutableSourceEagerHydrationData = [n, o])
              : t.mutableSourceEagerHydrationData.push(n, o));
      return new fa(t);
    }),
    (Rt.render = function (e, t, n) {
      if (!pa(t)) throw Error(i(200));
      return ha(null, e, t, !1, n);
    }),
    (Rt.unmountComponentAtNode = function (e) {
      if (!pa(e)) throw Error(i(40));
      return e._reactRootContainer
        ? (hr(function () {
            ha(null, null, e, !1, function () {
              ((e._reactRootContainer = null), (e[pn] = null));
            });
          }),
          !0)
        : !1;
    }),
    (Rt.unstable_batchedUpdates = ho),
    (Rt.unstable_renderSubtreeIntoContainer = function (e, t, n, a) {
      if (!pa(n)) throw Error(i(200));
      if (e == null || e._reactInternals === void 0) throw Error(i(38));
      return ha(e, t, n, !1, a);
    }),
    (Rt.version = "18.3.1-next-f1338f8080-20240426"),
    Rt
  );
}
var rf;
function ep() {
  if (rf) return Co.exports;
  rf = 1;
  function s() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (r) {
        console.error(r);
      }
  }
  return (s(), (Co.exports = Dm()), Co.exports);
}
var sf;
function Lm() {
  if (sf) return va;
  sf = 1;
  var s = ep();
  return ((va.createRoot = s.createRoot), (va.hydrateRoot = s.hydrateRoot), va);
}
var Fm = Lm();
const Mm = eu(Fm);
ep();
/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function ni() {
  return (
    (ni = Object.assign
      ? Object.assign.bind()
      : function (s) {
          for (var r = 1; r < arguments.length; r++) {
            var i = arguments[r];
            for (var l in i)
              Object.prototype.hasOwnProperty.call(i, l) && (s[l] = i[l]);
          }
          return s;
        }),
    ni.apply(this, arguments)
  );
}
var Yn;
(function (s) {
  ((s.Pop = "POP"), (s.Push = "PUSH"), (s.Replace = "REPLACE"));
})(Yn || (Yn = {}));
const af = "popstate";
function Vm(s) {
  s === void 0 && (s = {});
  function r(l, u) {
    let { pathname: d, search: p, hash: m } = l.location;
    return bo(
      "",
      { pathname: d, search: p, hash: m },
      (u.state && u.state.usr) || null,
      (u.state && u.state.key) || "default",
    );
  }
  function i(l, u) {
    return typeof u == "string" ? u : xa(u);
  }
  return Um(r, i, null, s);
}
function Ge(s, r) {
  if (s === !1 || s === null || typeof s > "u") throw new Error(r);
}
function tp(s, r) {
  if (!s) {
    typeof console < "u" && console.warn(r);
    try {
      throw new Error(r);
    } catch {}
  }
}
function zm() {
  return Math.random().toString(36).substr(2, 8);
}
function lf(s, r) {
  return { usr: s.state, key: s.key, idx: r };
}
function bo(s, r, i, l) {
  return (
    i === void 0 && (i = null),
    ni(
      { pathname: typeof s == "string" ? s : s.pathname, search: "", hash: "" },
      typeof r == "string" ? ls(r) : r,
      { state: i, key: (r && r.key) || l || zm() },
    )
  );
}
function xa(s) {
  let { pathname: r = "/", search: i = "", hash: l = "" } = s;
  return (
    i && i !== "?" && (r += i.charAt(0) === "?" ? i : "?" + i),
    l && l !== "#" && (r += l.charAt(0) === "#" ? l : "#" + l),
    r
  );
}
function ls(s) {
  let r = {};
  if (s) {
    let i = s.indexOf("#");
    i >= 0 && ((r.hash = s.substr(i)), (s = s.substr(0, i)));
    let l = s.indexOf("?");
    (l >= 0 && ((r.search = s.substr(l)), (s = s.substr(0, l))),
      s && (r.pathname = s));
  }
  return r;
}
function Um(s, r, i, l) {
  l === void 0 && (l = {});
  let { window: u = document.defaultView, v5Compat: d = !1 } = l,
    p = u.history,
    m = Yn.Pop,
    x = null,
    w = S();
  w == null && ((w = 0), p.replaceState(ni({}, p.state, { idx: w }), ""));
  function S() {
    return (p.state || { idx: null }).idx;
  }
  function N() {
    m = Yn.Pop;
    let D = S(),
      ge = D == null ? null : D - w;
    ((w = D), x && x({ action: m, location: A.location, delta: ge }));
  }
  function I(D, ge) {
    m = Yn.Push;
    let B = bo(A.location, D, ge);
    w = S() + 1;
    let Q = lf(B, w),
      X = A.createHref(B);
    try {
      p.pushState(Q, "", X);
    } catch (he) {
      if (he instanceof DOMException && he.name === "DataCloneError") throw he;
      u.location.assign(X);
    }
    d && x && x({ action: m, location: A.location, delta: 1 });
  }
  function Y(D, ge) {
    m = Yn.Replace;
    let B = bo(A.location, D, ge);
    w = S();
    let Q = lf(B, w),
      X = A.createHref(B);
    (p.replaceState(Q, "", X),
      d && x && x({ action: m, location: A.location, delta: 0 }));
  }
  function L(D) {
    let ge = u.location.origin !== "null" ? u.location.origin : u.location.href,
      B = typeof D == "string" ? D : xa(D);
    return (
      (B = B.replace(/ $/, "%20")),
      Ge(
        ge,
        "No window.location.(origin|href) available to create URL for href: " +
          B,
      ),
      new URL(B, ge)
    );
  }
  let A = {
    get action() {
      return m;
    },
    get location() {
      return s(u, p);
    },
    listen(D) {
      if (x) throw new Error("A history only accepts one active listener");
      return (
        u.addEventListener(af, N),
        (x = D),
        () => {
          (u.removeEventListener(af, N), (x = null));
        }
      );
    },
    createHref(D) {
      return r(u, D);
    },
    createURL: L,
    encodeLocation(D) {
      let ge = L(D);
      return { pathname: ge.pathname, search: ge.search, hash: ge.hash };
    },
    push: I,
    replace: Y,
    go(D) {
      return p.go(D);
    },
  };
  return A;
}
var of;
(function (s) {
  ((s.data = "data"),
    (s.deferred = "deferred"),
    (s.redirect = "redirect"),
    (s.error = "error"));
})(of || (of = {}));
function $m(s, r, i) {
  return (i === void 0 && (i = "/"), bm(s, r, i));
}
function bm(s, r, i, l) {
  let u = typeof r == "string" ? ls(r) : r,
    d = ns(u.pathname || "/", i);
  if (d == null) return null;
  let p = np(s);
  Bm(p);
  let m = null;
  for (let x = 0; m == null && x < p.length; ++x) {
    let w = ev(d);
    m = Gm(p[x], w);
  }
  return m;
}
function np(s, r, i, l) {
  (r === void 0 && (r = []),
    i === void 0 && (i = []),
    l === void 0 && (l = ""));
  let u = (d, p, m) => {
    let x = {
      relativePath: m === void 0 ? d.path || "" : m,
      caseSensitive: d.caseSensitive === !0,
      childrenIndex: p,
      route: d,
    };
    x.relativePath.startsWith("/") &&
      (Ge(
        x.relativePath.startsWith(l),
        'Absolute route path "' +
          x.relativePath +
          '" nested under path ' +
          ('"' + l + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes.",
      ),
      (x.relativePath = x.relativePath.slice(l.length)));
    let w = Xn([l, x.relativePath]),
      S = i.concat(x);
    (d.children &&
      d.children.length > 0 &&
      (Ge(
        d.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + w + '".'),
      ),
      np(d.children, r, S, w)),
      !(d.path == null && !d.index) &&
        r.push({ path: w, score: Jm(w, d.index), routesMeta: S }));
  };
  return (
    s.forEach((d, p) => {
      var m;
      if (d.path === "" || !((m = d.path) != null && m.includes("?"))) u(d, p);
      else for (let x of rp(d.path)) u(d, p, x);
    }),
    r
  );
}
function rp(s) {
  let r = s.split("/");
  if (r.length === 0) return [];
  let [i, ...l] = r,
    u = i.endsWith("?"),
    d = i.replace(/\?$/, "");
  if (l.length === 0) return u ? [d, ""] : [d];
  let p = rp(l.join("/")),
    m = [];
  return (
    m.push(...p.map((x) => (x === "" ? d : [d, x].join("/")))),
    u && m.push(...p),
    m.map((x) => (s.startsWith("/") && x === "" ? "/" : x))
  );
}
function Bm(s) {
  s.sort((r, i) =>
    r.score !== i.score
      ? i.score - r.score
      : Ym(
          r.routesMeta.map((l) => l.childrenIndex),
          i.routesMeta.map((l) => l.childrenIndex),
        ),
  );
}
const Wm = /^:[\w-]+$/,
  Zm = 3,
  Hm = 2,
  Qm = 1,
  Km = 10,
  qm = -2,
  uf = (s) => s === "*";
function Jm(s, r) {
  let i = s.split("/"),
    l = i.length;
  return (
    i.some(uf) && (l += qm),
    r && (l += Hm),
    i
      .filter((u) => !uf(u))
      .reduce((u, d) => u + (Wm.test(d) ? Zm : d === "" ? Qm : Km), l)
  );
}
function Ym(s, r) {
  return s.length === r.length && s.slice(0, -1).every((l, u) => l === r[u])
    ? s[s.length - 1] - r[r.length - 1]
    : 0;
}
function Gm(s, r, i) {
  let { routesMeta: l } = s,
    u = {},
    d = "/",
    p = [];
  for (let m = 0; m < l.length; ++m) {
    let x = l[m],
      w = m === l.length - 1,
      S = d === "/" ? r : r.slice(d.length) || "/",
      N = Bo(
        { path: x.relativePath, caseSensitive: x.caseSensitive, end: w },
        S,
      ),
      I = x.route;
    if (!N) return null;
    (Object.assign(u, N.params),
      p.push({
        params: u,
        pathname: Xn([d, N.pathname]),
        pathnameBase: sv(Xn([d, N.pathnameBase])),
        route: I,
      }),
      N.pathnameBase !== "/" && (d = Xn([d, N.pathnameBase])));
  }
  return p;
}
function Bo(s, r) {
  typeof s == "string" && (s = { path: s, caseSensitive: !1, end: !0 });
  let [i, l] = Xm(s.path, s.caseSensitive, s.end),
    u = r.match(i);
  if (!u) return null;
  let d = u[0],
    p = d.replace(/(.)\/+$/, "$1"),
    m = u.slice(1);
  return {
    params: l.reduce((w, S, N) => {
      let { paramName: I, isOptional: Y } = S;
      if (I === "*") {
        let A = m[N] || "";
        p = d.slice(0, d.length - A.length).replace(/(.)\/+$/, "$1");
      }
      const L = m[N];
      return (
        Y && !L ? (w[I] = void 0) : (w[I] = (L || "").replace(/%2F/g, "/")),
        w
      );
    }, {}),
    pathname: d,
    pathnameBase: p,
    pattern: s,
  };
}
function Xm(s, r, i) {
  (r === void 0 && (r = !1),
    i === void 0 && (i = !0),
    tp(
      s === "*" || !s.endsWith("*") || s.endsWith("/*"),
      'Route path "' +
        s +
        '" will be treated as if it were ' +
        ('"' + s.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + s.replace(/\*$/, "/*") + '".'),
    ));
  let l = [],
    u =
      "^" +
      s
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (p, m, x) => (
            l.push({ paramName: m, isOptional: x != null }),
            x ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    s.endsWith("*")
      ? (l.push({ paramName: "*" }),
        (u += s === "*" || s === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : i
        ? (u += "\\/*$")
        : s !== "" && s !== "/" && (u += "(?:(?=\\/|$))"),
    [new RegExp(u, r ? void 0 : "i"), l]
  );
}
function ev(s) {
  try {
    return s
      .split("/")
      .map((r) => decodeURIComponent(r).replace(/\//g, "%2F"))
      .join("/");
  } catch (r) {
    return (
      tp(
        !1,
        'The URL path "' +
          s +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + r + ")."),
      ),
      s
    );
  }
}
function ns(s, r) {
  if (r === "/") return s;
  if (!s.toLowerCase().startsWith(r.toLowerCase())) return null;
  let i = r.endsWith("/") ? r.length - 1 : r.length,
    l = s.charAt(i);
  return l && l !== "/" ? null : s.slice(i) || "/";
}
function tv(s, r) {
  r === void 0 && (r = "/");
  let {
    pathname: i,
    search: l = "",
    hash: u = "",
  } = typeof s == "string" ? ls(s) : s;
  return {
    pathname: i ? (i.startsWith("/") ? i : nv(i, r)) : r,
    search: iv(l),
    hash: av(u),
  };
}
function nv(s, r) {
  let i = r.replace(/\/+$/, "").split("/");
  return (
    s.split("/").forEach((u) => {
      u === ".." ? i.length > 1 && i.pop() : u !== "." && i.push(u);
    }),
    i.length > 1 ? i.join("/") : "/"
  );
}
function Po(s, r, i, l) {
  return (
    "Cannot include a '" +
    s +
    "' character in a manually specified " +
    ("`to." +
      r +
      "` field [" +
      JSON.stringify(l) +
      "].  Please separate it out to the ") +
    ("`to." + i + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function rv(s) {
  return s.filter(
    (r, i) => i === 0 || (r.route.path && r.route.path.length > 0),
  );
}
function tu(s, r) {
  let i = rv(s);
  return r
    ? i.map((l, u) => (u === i.length - 1 ? l.pathname : l.pathnameBase))
    : i.map((l) => l.pathnameBase);
}
function nu(s, r, i, l) {
  l === void 0 && (l = !1);
  let u;
  typeof s == "string"
    ? (u = ls(s))
    : ((u = ni({}, s)),
      Ge(
        !u.pathname || !u.pathname.includes("?"),
        Po("?", "pathname", "search", u),
      ),
      Ge(
        !u.pathname || !u.pathname.includes("#"),
        Po("#", "pathname", "hash", u),
      ),
      Ge(!u.search || !u.search.includes("#"), Po("#", "search", "hash", u)));
  let d = s === "" || u.pathname === "",
    p = d ? "/" : u.pathname,
    m;
  if (p == null) m = i;
  else {
    let N = r.length - 1;
    if (!l && p.startsWith("..")) {
      let I = p.split("/");
      for (; I[0] === ".."; ) (I.shift(), (N -= 1));
      u.pathname = I.join("/");
    }
    m = N >= 0 ? r[N] : "/";
  }
  let x = tv(u, m),
    w = p && p !== "/" && p.endsWith("/"),
    S = (d || p === ".") && i.endsWith("/");
  return (!x.pathname.endsWith("/") && (w || S) && (x.pathname += "/"), x);
}
const Xn = (s) => s.join("/").replace(/\/\/+/g, "/"),
  sv = (s) => s.replace(/\/+$/, "").replace(/^\/*/, "/"),
  iv = (s) => (!s || s === "?" ? "" : s.startsWith("?") ? s : "?" + s),
  av = (s) => (!s || s === "#" ? "" : s.startsWith("#") ? s : "#" + s);
function lv(s) {
  return (
    s != null &&
    typeof s.status == "number" &&
    typeof s.statusText == "string" &&
    typeof s.internal == "boolean" &&
    "data" in s
  );
}
const sp = ["post", "put", "patch", "delete"];
new Set(sp);
const ov = ["get", ...sp];
new Set(ov);
/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function ri() {
  return (
    (ri = Object.assign
      ? Object.assign.bind()
      : function (s) {
          for (var r = 1; r < arguments.length; r++) {
            var i = arguments[r];
            for (var l in i)
              Object.prototype.hasOwnProperty.call(i, l) && (s[l] = i[l]);
          }
          return s;
        }),
    ri.apply(this, arguments)
  );
}
const Ra = T.createContext(null),
  ip = T.createContext(null),
  Cn = T.createContext(null),
  Oa = T.createContext(null),
  fn = T.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  ap = T.createContext(null);
function uv(s, r) {
  let { relative: i } = r === void 0 ? {} : r;
  os() || Ge(!1);
  let { basename: l, navigator: u } = T.useContext(Cn),
    { hash: d, pathname: p, search: m } = Aa(s, { relative: i }),
    x = p;
  return (
    l !== "/" && (x = p === "/" ? l : Xn([l, p])),
    u.createHref({ pathname: x, search: m, hash: d })
  );
}
function os() {
  return T.useContext(Oa) != null;
}
function us() {
  return (os() || Ge(!1), T.useContext(Oa).location);
}
function lp(s) {
  T.useContext(Cn).static || T.useLayoutEffect(s);
}
function Ia() {
  let { isDataRoute: s } = T.useContext(fn);
  return s ? Nv() : cv();
}
function cv() {
  os() || Ge(!1);
  let s = T.useContext(Ra),
    { basename: r, future: i, navigator: l } = T.useContext(Cn),
    { matches: u } = T.useContext(fn),
    { pathname: d } = us(),
    p = JSON.stringify(tu(u, i.v7_relativeSplatPath)),
    m = T.useRef(!1);
  return (
    lp(() => {
      m.current = !0;
    }),
    T.useCallback(
      function (w, S) {
        if ((S === void 0 && (S = {}), !m.current)) return;
        if (typeof w == "number") {
          l.go(w);
          return;
        }
        let N = nu(w, JSON.parse(p), d, S.relative === "path");
        (s == null &&
          r !== "/" &&
          (N.pathname = N.pathname === "/" ? r : Xn([r, N.pathname])),
          (S.replace ? l.replace : l.push)(N, S.state, S));
      },
      [r, l, p, d, s],
    )
  );
}
const dv = T.createContext(null);
function fv(s) {
  let r = T.useContext(fn).outlet;
  return r && T.createElement(dv.Provider, { value: s }, r);
}
function pv() {
  let { matches: s } = T.useContext(fn),
    r = s[s.length - 1];
  return r ? r.params : {};
}
function Aa(s, r) {
  let { relative: i } = r === void 0 ? {} : r,
    { future: l } = T.useContext(Cn),
    { matches: u } = T.useContext(fn),
    { pathname: d } = us(),
    p = JSON.stringify(tu(u, l.v7_relativeSplatPath));
  return T.useMemo(() => nu(s, JSON.parse(p), d, i === "path"), [s, p, d, i]);
}
function hv(s, r) {
  return mv(s, r);
}
function mv(s, r, i, l) {
  os() || Ge(!1);
  let { navigator: u } = T.useContext(Cn),
    { matches: d } = T.useContext(fn),
    p = d[d.length - 1],
    m = p ? p.params : {};
  p && p.pathname;
  let x = p ? p.pathnameBase : "/";
  p && p.route;
  let w = us(),
    S;
  if (r) {
    var N;
    let D = typeof r == "string" ? ls(r) : r;
    (x === "/" || ((N = D.pathname) != null && N.startsWith(x)) || Ge(!1),
      (S = D));
  } else S = w;
  let I = S.pathname || "/",
    Y = I;
  if (x !== "/") {
    let D = x.replace(/^\//, "").split("/");
    Y = "/" + I.replace(/^\//, "").split("/").slice(D.length).join("/");
  }
  let L = $m(s, { pathname: Y }),
    A = wv(
      L &&
        L.map((D) =>
          Object.assign({}, D, {
            params: Object.assign({}, m, D.params),
            pathname: Xn([
              x,
              u.encodeLocation
                ? u.encodeLocation(D.pathname).pathname
                : D.pathname,
            ]),
            pathnameBase:
              D.pathnameBase === "/"
                ? x
                : Xn([
                    x,
                    u.encodeLocation
                      ? u.encodeLocation(D.pathnameBase).pathname
                      : D.pathnameBase,
                  ]),
          }),
        ),
      d,
      i,
      l,
    );
  return r && A
    ? T.createElement(
        Oa.Provider,
        {
          value: {
            location: ri(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              S,
            ),
            navigationType: Yn.Pop,
          },
        },
        A,
      )
    : A;
}
function vv() {
  let s = Ev(),
    r = lv(s)
      ? s.status + " " + s.statusText
      : s instanceof Error
        ? s.message
        : JSON.stringify(s),
    i = s instanceof Error ? s.stack : null,
    u = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
  return T.createElement(
    T.Fragment,
    null,
    T.createElement("h2", null, "Unexpected Application Error!"),
    T.createElement("h3", { style: { fontStyle: "italic" } }, r),
    i ? T.createElement("pre", { style: u }, i) : null,
    null,
  );
}
const yv = T.createElement(vv, null);
class gv extends T.Component {
  constructor(r) {
    (super(r),
      (this.state = {
        location: r.location,
        revalidation: r.revalidation,
        error: r.error,
      }));
  }
  static getDerivedStateFromError(r) {
    return { error: r };
  }
  static getDerivedStateFromProps(r, i) {
    return i.location !== r.location ||
      (i.revalidation !== "idle" && r.revalidation === "idle")
      ? { error: r.error, location: r.location, revalidation: r.revalidation }
      : {
          error: r.error !== void 0 ? r.error : i.error,
          location: i.location,
          revalidation: r.revalidation || i.revalidation,
        };
  }
  componentDidCatch(r, i) {
    console.error(
      "React Router caught the following error during render",
      r,
      i,
    );
  }
  render() {
    return this.state.error !== void 0
      ? T.createElement(
          fn.Provider,
          { value: this.props.routeContext },
          T.createElement(ap.Provider, {
            value: this.state.error,
            children: this.props.component,
          }),
        )
      : this.props.children;
  }
}
function xv(s) {
  let { routeContext: r, match: i, children: l } = s,
    u = T.useContext(Ra);
  return (
    u &&
      u.static &&
      u.staticContext &&
      (i.route.errorElement || i.route.ErrorBoundary) &&
      (u.staticContext._deepestRenderedBoundaryId = i.route.id),
    T.createElement(fn.Provider, { value: r }, l)
  );
}
function wv(s, r, i, l) {
  var u;
  if (
    (r === void 0 && (r = []),
    i === void 0 && (i = null),
    l === void 0 && (l = null),
    s == null)
  ) {
    var d;
    if (!i) return null;
    if (i.errors) s = i.matches;
    else if (
      (d = l) != null &&
      d.v7_partialHydration &&
      r.length === 0 &&
      !i.initialized &&
      i.matches.length > 0
    )
      s = i.matches;
    else return null;
  }
  let p = s,
    m = (u = i) == null ? void 0 : u.errors;
  if (m != null) {
    let S = p.findIndex((N) => N.route.id && m?.[N.route.id] !== void 0);
    (S >= 0 || Ge(!1), (p = p.slice(0, Math.min(p.length, S + 1))));
  }
  let x = !1,
    w = -1;
  if (i && l && l.v7_partialHydration)
    for (let S = 0; S < p.length; S++) {
      let N = p[S];
      if (
        ((N.route.HydrateFallback || N.route.hydrateFallbackElement) && (w = S),
        N.route.id)
      ) {
        let { loaderData: I, errors: Y } = i,
          L =
            N.route.loader &&
            I[N.route.id] === void 0 &&
            (!Y || Y[N.route.id] === void 0);
        if (N.route.lazy || L) {
          ((x = !0), w >= 0 ? (p = p.slice(0, w + 1)) : (p = [p[0]]));
          break;
        }
      }
    }
  return p.reduceRight((S, N, I) => {
    let Y,
      L = !1,
      A = null,
      D = null;
    i &&
      ((Y = m && N.route.id ? m[N.route.id] : void 0),
      (A = N.route.errorElement || yv),
      x &&
        (w < 0 && I === 0
          ? (Cv("route-fallback"), (L = !0), (D = null))
          : w === I &&
            ((L = !0), (D = N.route.hydrateFallbackElement || null))));
    let ge = r.concat(p.slice(0, I + 1)),
      B = () => {
        let Q;
        return (
          Y
            ? (Q = A)
            : L
              ? (Q = D)
              : N.route.Component
                ? (Q = T.createElement(N.route.Component, null))
                : N.route.element
                  ? (Q = N.route.element)
                  : (Q = S),
          T.createElement(xv, {
            match: N,
            routeContext: { outlet: S, matches: ge, isDataRoute: i != null },
            children: Q,
          })
        );
      };
    return i && (N.route.ErrorBoundary || N.route.errorElement || I === 0)
      ? T.createElement(gv, {
          location: i.location,
          revalidation: i.revalidation,
          component: A,
          error: Y,
          children: B(),
          routeContext: { outlet: null, matches: ge, isDataRoute: !0 },
        })
      : B();
  }, null);
}
var op = (function (s) {
    return (
      (s.UseBlocker = "useBlocker"),
      (s.UseRevalidator = "useRevalidator"),
      (s.UseNavigateStable = "useNavigate"),
      s
    );
  })(op || {}),
  up = (function (s) {
    return (
      (s.UseBlocker = "useBlocker"),
      (s.UseLoaderData = "useLoaderData"),
      (s.UseActionData = "useActionData"),
      (s.UseRouteError = "useRouteError"),
      (s.UseNavigation = "useNavigation"),
      (s.UseRouteLoaderData = "useRouteLoaderData"),
      (s.UseMatches = "useMatches"),
      (s.UseRevalidator = "useRevalidator"),
      (s.UseNavigateStable = "useNavigate"),
      (s.UseRouteId = "useRouteId"),
      s
    );
  })(up || {});
function _v(s) {
  let r = T.useContext(Ra);
  return (r || Ge(!1), r);
}
function kv(s) {
  let r = T.useContext(ip);
  return (r || Ge(!1), r);
}
function Sv(s) {
  let r = T.useContext(fn);
  return (r || Ge(!1), r);
}
function cp(s) {
  let r = Sv(),
    i = r.matches[r.matches.length - 1];
  return (i.route.id || Ge(!1), i.route.id);
}
function Ev() {
  var s;
  let r = T.useContext(ap),
    i = kv(),
    l = cp();
  return r !== void 0 ? r : (s = i.errors) == null ? void 0 : s[l];
}
function Nv() {
  let { router: s } = _v(op.UseNavigateStable),
    r = cp(up.UseNavigateStable),
    i = T.useRef(!1);
  return (
    lp(() => {
      i.current = !0;
    }),
    T.useCallback(
      function (u, d) {
        (d === void 0 && (d = {}),
          i.current &&
            (typeof u == "number"
              ? s.navigate(u)
              : s.navigate(u, ri({ fromRouteId: r }, d))));
      },
      [s, r],
    )
  );
}
const cf = {};
function Cv(s, r, i) {
  cf[s] || (cf[s] = !0);
}
function jv(s, r) {
  (s?.v7_startTransition, s?.v7_relativeSplatPath);
}
function df(s) {
  let { to: r, replace: i, state: l, relative: u } = s;
  os() || Ge(!1);
  let { future: d, static: p } = T.useContext(Cn),
    { matches: m } = T.useContext(fn),
    { pathname: x } = us(),
    w = Ia(),
    S = nu(r, tu(m, d.v7_relativeSplatPath), x, u === "path"),
    N = JSON.stringify(S);
  return (
    T.useEffect(
      () => w(JSON.parse(N), { replace: i, state: l, relative: u }),
      [w, N, u, i, l],
    ),
    null
  );
}
function Tv(s) {
  return fv(s.context);
}
function un(s) {
  Ge(!1);
}
function Pv(s) {
  let {
    basename: r = "/",
    children: i = null,
    location: l,
    navigationType: u = Yn.Pop,
    navigator: d,
    static: p = !1,
    future: m,
  } = s;
  os() && Ge(!1);
  let x = r.replace(/^\/*/, "/"),
    w = T.useMemo(
      () => ({
        basename: x,
        navigator: d,
        static: p,
        future: ri({ v7_relativeSplatPath: !1 }, m),
      }),
      [x, m, d, p],
    );
  typeof l == "string" && (l = ls(l));
  let {
      pathname: S = "/",
      search: N = "",
      hash: I = "",
      state: Y = null,
      key: L = "default",
    } = l,
    A = T.useMemo(() => {
      let D = ns(S, x);
      return D == null
        ? null
        : {
            location: { pathname: D, search: N, hash: I, state: Y, key: L },
            navigationType: u,
          };
    }, [x, S, N, I, Y, L, u]);
  return A == null
    ? null
    : T.createElement(
        Cn.Provider,
        { value: w },
        T.createElement(Oa.Provider, { children: i, value: A }),
      );
}
function Rv(s) {
  let { children: r, location: i } = s;
  return hv(Wo(r), i);
}
new Promise(() => {});
function Wo(s, r) {
  r === void 0 && (r = []);
  let i = [];
  return (
    T.Children.forEach(s, (l, u) => {
      if (!T.isValidElement(l)) return;
      let d = [...r, u];
      if (l.type === T.Fragment) {
        i.push.apply(i, Wo(l.props.children, d));
        return;
      }
      (l.type !== un && Ge(!1), !l.props.index || !l.props.children || Ge(!1));
      let p = {
        id: l.props.id || d.join("-"),
        caseSensitive: l.props.caseSensitive,
        element: l.props.element,
        Component: l.props.Component,
        index: l.props.index,
        path: l.props.path,
        loader: l.props.loader,
        action: l.props.action,
        errorElement: l.props.errorElement,
        ErrorBoundary: l.props.ErrorBoundary,
        hasErrorBoundary:
          l.props.ErrorBoundary != null || l.props.errorElement != null,
        shouldRevalidate: l.props.shouldRevalidate,
        handle: l.props.handle,
        lazy: l.props.lazy,
      };
      (l.props.children && (p.children = Wo(l.props.children, d)), i.push(p));
    }),
    i
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
 */ function wa() {
  return (
    (wa = Object.assign
      ? Object.assign.bind()
      : function (s) {
          for (var r = 1; r < arguments.length; r++) {
            var i = arguments[r];
            for (var l in i)
              Object.prototype.hasOwnProperty.call(i, l) && (s[l] = i[l]);
          }
          return s;
        }),
    wa.apply(this, arguments)
  );
}
function dp(s, r) {
  if (s == null) return {};
  var i = {},
    l = Object.keys(s),
    u,
    d;
  for (d = 0; d < l.length; d++)
    ((u = l[d]), !(r.indexOf(u) >= 0) && (i[u] = s[u]));
  return i;
}
function Ov(s) {
  return !!(s.metaKey || s.altKey || s.ctrlKey || s.shiftKey);
}
function Iv(s, r) {
  return s.button === 0 && (!r || r === "_self") && !Ov(s);
}
const Av = [
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
  Dv = [
    "aria-current",
    "caseSensitive",
    "className",
    "end",
    "style",
    "to",
    "viewTransition",
    "children",
  ],
  Lv = "6";
try {
  window.__reactRouterVersion = Lv;
} catch {}
const Fv = T.createContext({ isTransitioning: !1 }),
  Mv = "startTransition",
  ff = Om[Mv];
function Vv(s) {
  let { basename: r, children: i, future: l, window: u } = s,
    d = T.useRef();
  d.current == null && (d.current = Vm({ window: u, v5Compat: !0 }));
  let p = d.current,
    [m, x] = T.useState({ action: p.action, location: p.location }),
    { v7_startTransition: w } = l || {},
    S = T.useCallback(
      (N) => {
        w && ff ? ff(() => x(N)) : x(N);
      },
      [x, w],
    );
  return (
    T.useLayoutEffect(() => p.listen(S), [p, S]),
    T.useEffect(() => jv(l), [l]),
    T.createElement(Pv, {
      basename: r,
      children: i,
      location: m.location,
      navigationType: m.action,
      navigator: p,
      future: l,
    })
  );
}
const zv =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  Uv = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  $v = T.forwardRef(function (r, i) {
    let {
        onClick: l,
        relative: u,
        reloadDocument: d,
        replace: p,
        state: m,
        target: x,
        to: w,
        preventScrollReset: S,
        viewTransition: N,
      } = r,
      I = dp(r, Av),
      { basename: Y } = T.useContext(Cn),
      L,
      A = !1;
    if (typeof w == "string" && Uv.test(w) && ((L = w), zv))
      try {
        let Q = new URL(window.location.href),
          X = w.startsWith("//") ? new URL(Q.protocol + w) : new URL(w),
          he = ns(X.pathname, Y);
        X.origin === Q.origin && he != null
          ? (w = he + X.search + X.hash)
          : (A = !0);
      } catch {}
    let D = uv(w, { relative: u }),
      ge = Wv(w, {
        replace: p,
        state: m,
        target: x,
        preventScrollReset: S,
        relative: u,
        viewTransition: N,
      });
    function B(Q) {
      (l && l(Q), Q.defaultPrevented || ge(Q));
    }
    return T.createElement(
      "a",
      wa({}, I, { href: L || D, onClick: A || d ? l : B, ref: i, target: x }),
    );
  }),
  bv = T.forwardRef(function (r, i) {
    let {
        "aria-current": l = "page",
        caseSensitive: u = !1,
        className: d = "",
        end: p = !1,
        style: m,
        to: x,
        viewTransition: w,
        children: S,
      } = r,
      N = dp(r, Dv),
      I = Aa(x, { relative: N.relative }),
      Y = us(),
      L = T.useContext(ip),
      { navigator: A, basename: D } = T.useContext(Cn),
      ge = L != null && Zv(I) && w === !0,
      B = A.encodeLocation ? A.encodeLocation(I).pathname : I.pathname,
      Q = Y.pathname,
      X =
        L && L.navigation && L.navigation.location
          ? L.navigation.location.pathname
          : null;
    (u ||
      ((Q = Q.toLowerCase()),
      (X = X ? X.toLowerCase() : null),
      (B = B.toLowerCase())),
      X && D && (X = ns(X, D) || X));
    const he = B !== "/" && B.endsWith("/") ? B.length - 1 : B.length;
    let ie = Q === B || (!p && Q.startsWith(B) && Q.charAt(he) === "/"),
      Te =
        X != null &&
        (X === B || (!p && X.startsWith(B) && X.charAt(B.length) === "/")),
      Pe = { isActive: ie, isPending: Te, isTransitioning: ge },
      Fe = ie ? l : void 0,
      ne;
    typeof d == "function"
      ? (ne = d(Pe))
      : (ne = [
          d,
          ie ? "active" : null,
          Te ? "pending" : null,
          ge ? "transitioning" : null,
        ]
          .filter(Boolean)
          .join(" "));
    let xe = typeof m == "function" ? m(Pe) : m;
    return T.createElement(
      $v,
      wa({}, N, {
        "aria-current": Fe,
        className: ne,
        ref: i,
        style: xe,
        to: x,
        viewTransition: w,
      }),
      typeof S == "function" ? S(Pe) : S,
    );
  });
var Zo;
(function (s) {
  ((s.UseScrollRestoration = "useScrollRestoration"),
    (s.UseSubmit = "useSubmit"),
    (s.UseSubmitFetcher = "useSubmitFetcher"),
    (s.UseFetcher = "useFetcher"),
    (s.useViewTransitionState = "useViewTransitionState"));
})(Zo || (Zo = {}));
var pf;
(function (s) {
  ((s.UseFetcher = "useFetcher"),
    (s.UseFetchers = "useFetchers"),
    (s.UseScrollRestoration = "useScrollRestoration"));
})(pf || (pf = {}));
function Bv(s) {
  let r = T.useContext(Ra);
  return (r || Ge(!1), r);
}
function Wv(s, r) {
  let {
      target: i,
      replace: l,
      state: u,
      preventScrollReset: d,
      relative: p,
      viewTransition: m,
    } = r === void 0 ? {} : r,
    x = Ia(),
    w = us(),
    S = Aa(s, { relative: p });
  return T.useCallback(
    (N) => {
      if (Iv(N, i)) {
        N.preventDefault();
        let I = l !== void 0 ? l : xa(w) === xa(S);
        x(s, {
          replace: I,
          state: u,
          preventScrollReset: d,
          relative: p,
          viewTransition: m,
        });
      }
    },
    [w, x, S, l, u, i, s, d, p, m],
  );
}
function Zv(s, r) {
  r === void 0 && (r = {});
  let i = T.useContext(Fv);
  i == null && Ge(!1);
  let { basename: l } = Bv(Zo.useViewTransitionState),
    u = Aa(s, { relative: r.relative });
  if (!i.isTransitioning) return !1;
  let d = ns(i.currentLocation.pathname, l) || i.currentLocation.pathname,
    p = ns(i.nextLocation.pathname, l) || i.nextLocation.pathname;
  return Bo(u.pathname, p) != null || Bo(u.pathname, d) != null;
}
const Hv = {},
  hf = (s) => {
    let r;
    const i = new Set(),
      l = (S, N) => {
        const I = typeof S == "function" ? S(r) : S;
        if (!Object.is(I, r)) {
          const Y = r;
          ((r =
            (N ?? (typeof I != "object" || I === null))
              ? I
              : Object.assign({}, r, I)),
            i.forEach((L) => L(r, Y)));
        }
      },
      u = () => r,
      x = {
        setState: l,
        getState: u,
        getInitialState: () => w,
        subscribe: (S) => (i.add(S), () => i.delete(S)),
        destroy: () => {
          ((Hv ? "production" : void 0) !== "production" &&
            console.warn(
              "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.",
            ),
            i.clear());
        },
      },
      w = (r = s(l, u, x));
    return x;
  },
  Qv = (s) => (s ? hf(s) : hf);
var Ro = { exports: {} },
  Oo = {},
  Io = { exports: {} },
  Ao = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var mf;
function Kv() {
  if (mf) return Ao;
  mf = 1;
  var s = li();
  function r(N, I) {
    return (N === I && (N !== 0 || 1 / N === 1 / I)) || (N !== N && I !== I);
  }
  var i = typeof Object.is == "function" ? Object.is : r,
    l = s.useState,
    u = s.useEffect,
    d = s.useLayoutEffect,
    p = s.useDebugValue;
  function m(N, I) {
    var Y = I(),
      L = l({ inst: { value: Y, getSnapshot: I } }),
      A = L[0].inst,
      D = L[1];
    return (
      d(
        function () {
          ((A.value = Y), (A.getSnapshot = I), x(A) && D({ inst: A }));
        },
        [N, Y, I],
      ),
      u(
        function () {
          return (
            x(A) && D({ inst: A }),
            N(function () {
              x(A) && D({ inst: A });
            })
          );
        },
        [N],
      ),
      p(Y),
      Y
    );
  }
  function x(N) {
    var I = N.getSnapshot;
    N = N.value;
    try {
      var Y = I();
      return !i(N, Y);
    } catch {
      return !0;
    }
  }
  function w(N, I) {
    return I();
  }
  var S =
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
      ? w
      : m;
  return (
    (Ao.useSyncExternalStore =
      s.useSyncExternalStore !== void 0 ? s.useSyncExternalStore : S),
    Ao
  );
}
var vf;
function qv() {
  return (vf || ((vf = 1), (Io.exports = Kv())), Io.exports);
}
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var yf;
function Jv() {
  if (yf) return Oo;
  yf = 1;
  var s = li(),
    r = qv();
  function i(w, S) {
    return (w === S && (w !== 0 || 1 / w === 1 / S)) || (w !== w && S !== S);
  }
  var l = typeof Object.is == "function" ? Object.is : i,
    u = r.useSyncExternalStore,
    d = s.useRef,
    p = s.useEffect,
    m = s.useMemo,
    x = s.useDebugValue;
  return (
    (Oo.useSyncExternalStoreWithSelector = function (w, S, N, I, Y) {
      var L = d(null);
      if (L.current === null) {
        var A = { hasValue: !1, value: null };
        L.current = A;
      } else A = L.current;
      L = m(
        function () {
          function ge(ie) {
            if (!B) {
              if (
                ((B = !0), (Q = ie), (ie = I(ie)), Y !== void 0 && A.hasValue)
              ) {
                var Te = A.value;
                if (Y(Te, ie)) return (X = Te);
              }
              return (X = ie);
            }
            if (((Te = X), l(Q, ie))) return Te;
            var Pe = I(ie);
            return Y !== void 0 && Y(Te, Pe)
              ? ((Q = ie), Te)
              : ((Q = ie), (X = Pe));
          }
          var B = !1,
            Q,
            X,
            he = N === void 0 ? null : N;
          return [
            function () {
              return ge(S());
            },
            he === null
              ? void 0
              : function () {
                  return ge(he());
                },
          ];
        },
        [S, N, I, Y],
      );
      var D = u(w, L[0], L[1]);
      return (
        p(
          function () {
            ((A.hasValue = !0), (A.value = D));
          },
          [D],
        ),
        x(D),
        D
      );
    }),
    Oo
  );
}
var gf;
function Yv() {
  return (gf || ((gf = 1), (Ro.exports = Jv())), Ro.exports);
}
var Gv = Yv();
const Xv = eu(Gv),
  fp = {},
  { useDebugValue: ey } = Oe,
  { useSyncExternalStoreWithSelector: ty } = Xv;
let xf = !1;
const ny = (s) => s;
function ry(s, r = ny, i) {
  (fp ? "production" : void 0) !== "production" &&
    i &&
    !xf &&
    (console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937",
    ),
    (xf = !0));
  const l = ty(
    s.subscribe,
    s.getState,
    s.getServerState || s.getInitialState,
    r,
    i,
  );
  return (ey(l), l);
}
const wf = (s) => {
    (fp ? "production" : void 0) !== "production" &&
      typeof s != "function" &&
      console.warn(
        "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.",
      );
    const r = typeof s == "function" ? Qv(s) : s,
      i = (l, u) => ry(r, l, u);
    return (Object.assign(i, r), i);
  },
  pp = (s) => (s ? wf(s) : wf),
  cn = pp((s) => ({
    online: !0,
    pending: 0,
    syncing: !1,
    setOnline: (r) => s({ online: r }),
    setPending: (r) => s({ pending: r }),
    setSyncing: (r) => s({ syncing: r }),
  })),
  sy = "indi-prontuario-offline",
  iy = 1,
  xr = "outbox",
  _a = "idmap",
  ay = () =>
    new Promise((s, r) => {
      const i = indexedDB.open(sy, iy);
      ((i.onupgradeneeded = () => {
        const l = i.result;
        (l.objectStoreNames.contains(xr) ||
          l
            .createObjectStore(xr, { keyPath: "id" })
            .createIndex("createdAt", "createdAt", { unique: !1 }),
          l.objectStoreNames.contains(_a) ||
            l.createObjectStore(_a, { keyPath: "clientId" }));
      }),
        (i.onsuccess = () => s(i.result)),
        (i.onerror = () => r(i.error ?? new Error("indexedDB unavailable"))));
    }),
  _r = async (s, r, i) => {
    const l = await ay();
    return new Promise((u, d) => {
      const p = l.transaction(s, r),
        m = p.objectStore(s);
      (i(m).then(u).catch(d),
        (p.oncomplete = () => l.close()),
        (p.onerror = () => d(p.error ?? new Error("transaction failed"))));
    });
  },
  ly = (s, r) =>
    new Promise((i, l) => {
      const u = s.get(r);
      ((u.onsuccess = () => i(u.result)),
        (u.onerror = () => l(u.error ?? new Error("get failed"))));
    }),
  oy = async (s) => {
    const r = s.id ?? crypto.randomUUID(),
      i = s.createdAt ?? Date.now(),
      l = {
        id: r,
        method: s.method,
        url: s.url,
        body: s.body ?? null,
        headers: s.headers ?? {},
        createdAt: i,
        tries: 0,
        idempotencyKey: s.idempotencyKey,
        clientMappings: s.clientMappings ?? void 0,
      };
    return (
      await _r(xr, "readwrite", async (u) => {
        await u.put(l);
      }),
      l
    );
  },
  uy = async (s = 5) =>
    _r(
      xr,
      "readonly",
      async (r) =>
        new Promise((i, l) => {
          const u = [],
            p = r.index("createdAt").openCursor();
          ((p.onsuccess = () => {
            const m = p.result;
            if (!m || u.length >= s) {
              i(u);
              return;
            }
            (u.push(m.value), m.continue());
          }),
            (p.onerror = () => l(p.error ?? new Error("cursor failed"))));
        }),
    ),
  cy = async (s) => {
    await _r(xr, "readwrite", async (r) => {
      await r.delete(s);
    });
  },
  dy = async (s) => {
    await _r(xr, "readwrite", async (r) => {
      const i = await ly(r, s);
      i && ((i.tries += 1), (i.lastTriedAt = Date.now()), await r.put(i));
    });
  },
  fy = async () =>
    _r(
      xr,
      "readonly",
      async (s) =>
        new Promise((r, i) => {
          const l = s.count();
          ((l.onsuccess = () => r(l.result ?? 0)),
            (l.onerror = () => i(l.error ?? new Error("count failed"))));
        }),
    ),
  py = async (s, r) => {
    await _r(_a, "readwrite", async (i) => {
      await i.put({ clientId: s, serverId: r, updatedAt: Date.now() });
    });
  },
  hy = async (s = 72) => {
    const r = Date.now() - s * 60 * 60 * 1e3;
    await _r(_a, "readwrite", async (i) => {
      const l = i.openCursor();
      l.onsuccess = () => {
        const u = l.result;
        if (!u) return;
        (u.value.updatedAt < r && u.delete(), u.continue());
      };
    });
  },
  my = {},
  Js = (() => {
    const s = my?.VITE_OUTBOX_POLL_INTERVAL,
      r = s ? Number.parseInt(s, 10) : Number.NaN;
    return Number.isFinite(r) && r > 0 ? r : 2e3;
  })(),
  Ys = [Js, Js * 2, Js * 4, Js * 8];
let Xr = Ys[0],
  Do = null,
  Lo = !1;
const ru = async () => {
    try {
      const s = await fy();
      cn.getState().setPending(s);
    } catch {
      cn.getState().setPending(0);
    }
  },
  Xs = (s = Xr) => {
    (Do && window.clearTimeout(Do), (Do = window.setTimeout(gy, s)));
  },
  vy = (s) => {
    const r = new Headers(s.headers ?? {});
    return (
      !r.has("Content-Type") &&
        s.body &&
        r.set("Content-Type", "application/json"),
      r.set("X-Idempotency-Key", s.idempotencyKey),
      {
        method: s.method,
        body: s.body ?? void 0,
        headers: r,
        credentials: "include",
      }
    );
  },
  yy = async (s, r) => {
    if (
      !s.clientMappings ||
      Object.keys(s.clientMappings).length === 0 ||
      !r ||
      typeof r != "object"
    )
      return;
    const l = r.item?.id;
    typeof l == "string" &&
      (await Promise.all(
        Object.entries(s.clientMappings).map(([u, d]) =>
          py(u, d === "self" ? l : d),
        ),
      ));
  },
  gy = async () => {
    if (!Lo) {
      ((Lo = !0), cn.getState().setSyncing(!0));
      try {
        for (await hy(); navigator.onLine; ) {
          const s = await uy(5);
          if (!s.length) {
            Xr = Ys[0];
            break;
          }
          let r = !1;
          for (const i of s)
            try {
              const l = await fetch(i.url, vy(i));
              if (!l.ok) throw new Error(`HTTP ${l.status}`);
              const u = await l.text(),
                d = u ? JSON.parse(u) : null;
              (await yy(i, d), await cy(i.id), (Xr = Ys[0]));
            } catch {
              (await dy(i.id), (r = !0));
            }
          if ((await ru(), r)) {
            Xr = Math.min(Xr * 2, Ys[Ys.length - 1]);
            break;
          }
        }
      } finally {
        ((Lo = !1), cn.getState().setSyncing(!1), navigator.onLine && Xs(Xr));
      }
    }
  },
  xy = () => {
    "indexedDB" in window &&
      (ru(),
      cn.getState().setOnline(navigator.onLine),
      window.addEventListener("online", () => {
        (cn.getState().setOnline(!0), Xs(500));
      }),
      window.addEventListener("offline", () => {
        cn.getState().setOnline(!1);
      }),
      document.addEventListener("visibilitychange", () => {
        document.visibilityState === "visible" && navigator.onLine && Xs(1e3);
      }),
      Xs(Js));
  },
  _f = async (s) => {
    const r = s.idempotencyKey ?? crypto.randomUUID(),
      i = await oy({ ...s, idempotencyKey: r });
    return (await ru(), i);
  },
  wy = () => {
    Xs(0);
  },
  _y = [
    { to: "/", label: "Dashboard" },
    { to: "/pacientes", label: "Pacientes" },
    { to: "/prontuarios", label: "Prontuários" },
    { to: "/prescricoes", label: "Prescrições" },
    { to: "/configuracoes", label: "Configurações" },
  ];
function ky() {
  const { online: s, pending: r, syncing: i } = cn(),
    l = r > 0 ? `${r} pendência${r > 1 ? "s" : ""}` : "Sem pendências",
    u = s ? "Online" : "Offline";
  return h.jsxs("div", {
    className: "app-shell",
    children: [
      h.jsxs("header", {
        className: "app-topbar",
        children: [
          h.jsxs("div", {
            className: "topbar-left",
            children: [
              h.jsx("span", {
                className: "brand",
                children: "Prontuário Digital",
              }),
              h.jsx("nav", {
                className: "topbar-nav",
                "aria-label": "Navegação principal",
                children: _y.map((d) =>
                  h.jsx(
                    bv,
                    {
                      to: d.to,
                      className: ({ isActive: p }) =>
                        p ? "nav-item active" : "nav-item",
                      end: d.to === "/",
                      children: d.label,
                    },
                    d.to,
                  ),
                ),
              }),
            ],
          }),
          h.jsxs("div", {
            className: "topbar-right",
            "aria-live": "polite",
            children: [
              h.jsx("span", {
                className: `topbar-pill status-pill ${s ? "status-online" : "status-offline"}`,
                title: l,
                children: u,
              }),
              h.jsx("button", {
                type: "button",
                className: "topbar-pill action-pill",
                onClick: () => wy(),
                disabled: r === 0 && !i,
                children: i ? "Sincronizando…" : r > 0 ? l : "Sincronizar",
              }),
              h.jsx("span", {
                className: "topbar-pill version-pill",
                children: "v0.1.0",
              }),
            ],
          }),
        ],
      }),
      !s &&
        h.jsx("div", {
          className: "offline-banner",
          role: "status",
          children:
            "Modo offline — novos registros serão enviados quando a conexão voltar.",
        }),
      h.jsx("main", { className: "app-content", children: h.jsx(Tv, {}) }),
    ],
  });
}
const Sy = [
    {
      label: "Total de pacientes",
      value: "128",
      footnote: "Última atualização às 08:15",
    },
    { label: "Consultas hoje", value: "12", footnote: "3 em andamento agora" },
    {
      label: "Prescrições ativas",
      value: "48",
      footnote: "Validadas nas últimas 72h",
    },
    {
      label: "Pendências críticas",
      value: "2",
      footnote: "Revisar solicitações de exame",
    },
  ],
  Ey = [
    {
      title: "Novo paciente",
      description: "Cadastrar paciente com dados básicos e consentimento.",
    },
    {
      title: "Atualizar dados",
      description:
        "Revisar cadastro, convênio e contatos do paciente selecionado.",
    },
    {
      title: "Busca rápida",
      description:
        "Localizar paciente por nome, documento ou número do prontuário.",
    },
  ];
function Ny() {
  return h.jsxs("div", {
    className: "dashboard-view",
    children: [
      h.jsxs("section", {
        className: "page-header",
        "aria-labelledby": "dashboard-title",
        children: [
          h.jsx("h1", {
            id: "dashboard-title",
            className: "page-title",
            children: "Painel clínico",
          }),
          h.jsx("p", {
            className: "page-subtitle",
            children:
              "Visão geral do consultório com métricas em tempo real e ações prioritárias.",
          }),
        ],
      }),
      h.jsx("section", {
        "aria-label": "Métricas principais",
        className: "cards-grid",
        children: Sy.map((s) =>
          h.jsxs(
            "article",
            {
              className: "card-tile",
              children: [
                h.jsx("span", { className: "card-metric", children: s.label }),
                h.jsx("span", { className: "card-value", children: s.value }),
                h.jsx("span", {
                  className: "card-footnote",
                  children: s.footnote,
                }),
              ],
            },
            s.label,
          ),
        ),
      }),
      h.jsxs("section", {
        "aria-label": "Ações rápidas",
        className: "actions-panel",
        children: [
          Ey.map((s) =>
            h.jsxs(
              "button",
              {
                type: "button",
                className: "action-card",
                children: [
                  h.jsx("span", {
                    className: "action-title",
                    children: s.title,
                  }),
                  h.jsx("span", {
                    className: "action-description",
                    children: s.description,
                  }),
                ],
              },
              s.title,
            ),
          ),
          h.jsxs("article", {
            className: "status-tile",
            "aria-live": "polite",
            children: [
              h.jsxs("div", {
                className: "status-header",
                children: [
                  h.jsx("span", { children: "Status Bird ID" }),
                  h.jsxs("span", {
                    className: "status-indicator",
                    children: [
                      h.jsx("span", {
                        className: "status-dot",
                        "aria-hidden": "true",
                      }),
                      "Online",
                    ],
                  }),
                ],
              }),
              h.jsx("p", {
                className: "card-footnote",
                children: "SSO conectado. Último check às 08:12 (GMT-3).",
              }),
              h.jsxs("button", {
                type: "button",
                className: "action-card",
                style: { borderStyle: "solid" },
                children: [
                  h.jsx("span", {
                    className: "action-title",
                    children: "Gerenciar credenciais",
                  }),
                  h.jsx("span", {
                    className: "action-description",
                    children: "Abrir configurações de integração Bird ID.",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
var oi = (s) => s.type === "checkbox",
  gr = (s) => s instanceof Date,
  St = (s) => s == null;
const hp = (s) => typeof s == "object";
var at = (s) => !St(s) && !Array.isArray(s) && hp(s) && !gr(s),
  mp = (s) =>
    at(s) && s.target ? (oi(s.target) ? s.target.checked : s.target.value) : s,
  Cy = (s) => s.substring(0, s.search(/\.\d+(\.|$)/)) || s,
  vp = (s, r) => s.has(Cy(r)),
  jy = (s) => {
    const r = s.constructor && s.constructor.prototype;
    return at(r) && r.hasOwnProperty("isPrototypeOf");
  },
  su =
    typeof window < "u" &&
    typeof window.HTMLElement < "u" &&
    typeof document < "u";
function ct(s) {
  let r;
  const i = Array.isArray(s),
    l = typeof FileList < "u" ? s instanceof FileList : !1;
  if (s instanceof Date) r = new Date(s);
  else if (!(su && (s instanceof Blob || l)) && (i || at(s)))
    if (((r = i ? [] : Object.create(Object.getPrototypeOf(s))), !i && !jy(s)))
      r = s;
    else for (const u in s) s.hasOwnProperty(u) && (r[u] = ct(s[u]));
  else return s;
  return r;
}
var Da = (s) => /^\w*$/.test(s),
  nt = (s) => s === void 0,
  iu = (s) => (Array.isArray(s) ? s.filter(Boolean) : []),
  au = (s) => iu(s.replace(/["|']|\]/g, "").split(/\.|\[/)),
  J = (s, r, i) => {
    if (!r || !at(s)) return i;
    const l = (Da(r) ? [r] : au(r)).reduce((u, d) => (St(u) ? u : u[d]), s);
    return nt(l) || l === s ? (nt(s[r]) ? i : s[r]) : l;
  },
  Ft = (s) => typeof s == "boolean",
  Ze = (s, r, i) => {
    let l = -1;
    const u = Da(r) ? [r] : au(r),
      d = u.length,
      p = d - 1;
    for (; ++l < d; ) {
      const m = u[l];
      let x = i;
      if (l !== p) {
        const w = s[m];
        x = at(w) || Array.isArray(w) ? w : isNaN(+u[l + 1]) ? {} : [];
      }
      if (m === "__proto__" || m === "constructor" || m === "prototype") return;
      ((s[m] = x), (s = s[m]));
    }
  };
const ka = { BLUR: "blur", FOCUS_OUT: "focusout", CHANGE: "change" },
  en = {
    onBlur: "onBlur",
    onChange: "onChange",
    onSubmit: "onSubmit",
    onTouched: "onTouched",
    all: "all",
  },
  _n = {
    max: "max",
    min: "min",
    maxLength: "maxLength",
    minLength: "minLength",
    pattern: "pattern",
    required: "required",
    validate: "validate",
  },
  yp = Oe.createContext(null);
yp.displayName = "HookFormContext";
const lu = () => Oe.useContext(yp);
var gp = (s, r, i, l = !0) => {
  const u = { defaultValues: r._defaultValues };
  for (const d in s)
    Object.defineProperty(u, d, {
      get: () => {
        const p = d;
        return (
          r._proxyFormState[p] !== en.all &&
            (r._proxyFormState[p] = !l || en.all),
          i && (i[p] = !0),
          s[p]
        );
      },
    });
  return u;
};
const ou = typeof window < "u" ? Oe.useLayoutEffect : Oe.useEffect;
function Ty(s) {
  const r = lu(),
    { control: i = r.control, disabled: l, name: u, exact: d } = s || {},
    [p, m] = Oe.useState(i._formState),
    x = Oe.useRef({
      isDirty: !1,
      isLoading: !1,
      dirtyFields: !1,
      touchedFields: !1,
      validatingFields: !1,
      isValidating: !1,
      isValid: !1,
      errors: !1,
    });
  return (
    ou(
      () =>
        i._subscribe({
          name: u,
          formState: x.current,
          exact: d,
          callback: (w) => {
            !l && m({ ...i._formState, ...w });
          },
        }),
      [u, l, d],
    ),
    Oe.useEffect(() => {
      x.current.isValid && i._setValid(!0);
    }, [i]),
    Oe.useMemo(() => gp(p, i, x.current, !1), [p, i])
  );
}
var Mt = (s) => typeof s == "string",
  xp = (s, r, i, l, u) =>
    Mt(s)
      ? (l && r.watch.add(s), J(i, s, u))
      : Array.isArray(s)
        ? s.map((d) => (l && r.watch.add(d), J(i, d)))
        : (l && (r.watchAll = !0), i),
  Ho = (s) => St(s) || !hp(s);
function En(s, r, i = new WeakSet()) {
  if (Ho(s) || Ho(r)) return s === r;
  if (gr(s) && gr(r)) return s.getTime() === r.getTime();
  const l = Object.keys(s),
    u = Object.keys(r);
  if (l.length !== u.length) return !1;
  if (i.has(s) || i.has(r)) return !0;
  (i.add(s), i.add(r));
  for (const d of l) {
    const p = s[d];
    if (!u.includes(d)) return !1;
    if (d !== "ref") {
      const m = r[d];
      if (
        (gr(p) && gr(m)) ||
        (at(p) && at(m)) ||
        (Array.isArray(p) && Array.isArray(m))
          ? !En(p, m, i)
          : p !== m
      )
        return !1;
    }
  }
  return !0;
}
function Py(s) {
  const r = lu(),
    {
      control: i = r.control,
      name: l,
      defaultValue: u,
      disabled: d,
      exact: p,
      compute: m,
    } = s || {},
    x = Oe.useRef(u),
    w = Oe.useRef(m),
    S = Oe.useRef(void 0);
  w.current = m;
  const N = Oe.useMemo(() => i._getWatch(l, x.current), [i, l]),
    [I, Y] = Oe.useState(w.current ? w.current(N) : N);
  return (
    ou(
      () =>
        i._subscribe({
          name: l,
          formState: { values: !0 },
          exact: p,
          callback: (L) => {
            if (!d) {
              const A = xp(
                l,
                i._names,
                L.values || i._formValues,
                !1,
                x.current,
              );
              if (w.current) {
                const D = w.current(A);
                En(D, S.current) || (Y(D), (S.current = D));
              } else Y(A);
            }
          },
        }),
      [i, d, l, p],
    ),
    Oe.useEffect(() => i._removeUnmounted()),
    I
  );
}
function Ry(s) {
  const r = lu(),
    {
      name: i,
      disabled: l,
      control: u = r.control,
      shouldUnregister: d,
      defaultValue: p,
    } = s,
    m = vp(u._names.array, i),
    x = Oe.useMemo(
      () => J(u._formValues, i, J(u._defaultValues, i, p)),
      [u, i, p],
    ),
    w = Py({ control: u, name: i, defaultValue: x, exact: !0 }),
    S = Ty({ control: u, name: i, exact: !0 }),
    N = Oe.useRef(s),
    I = Oe.useRef(void 0),
    Y = Oe.useRef(
      u.register(i, {
        ...s.rules,
        value: w,
        ...(Ft(s.disabled) ? { disabled: s.disabled } : {}),
      }),
    );
  N.current = s;
  const L = Oe.useMemo(
      () =>
        Object.defineProperties(
          {},
          {
            invalid: { enumerable: !0, get: () => !!J(S.errors, i) },
            isDirty: { enumerable: !0, get: () => !!J(S.dirtyFields, i) },
            isTouched: { enumerable: !0, get: () => !!J(S.touchedFields, i) },
            isValidating: {
              enumerable: !0,
              get: () => !!J(S.validatingFields, i),
            },
            error: { enumerable: !0, get: () => J(S.errors, i) },
          },
        ),
      [S, i],
    ),
    A = Oe.useCallback(
      (Q) =>
        Y.current.onChange({
          target: { value: mp(Q), name: i },
          type: ka.CHANGE,
        }),
      [i],
    ),
    D = Oe.useCallback(
      () =>
        Y.current.onBlur({
          target: { value: J(u._formValues, i), name: i },
          type: ka.BLUR,
        }),
      [i, u._formValues],
    ),
    ge = Oe.useCallback(
      (Q) => {
        const X = J(u._fields, i);
        X &&
          Q &&
          (X._f.ref = {
            focus: () => Q.focus && Q.focus(),
            select: () => Q.select && Q.select(),
            setCustomValidity: (he) => Q.setCustomValidity(he),
            reportValidity: () => Q.reportValidity(),
          });
      },
      [u._fields, i],
    ),
    B = Oe.useMemo(
      () => ({
        name: i,
        value: w,
        ...(Ft(l) || S.disabled ? { disabled: S.disabled || l } : {}),
        onChange: A,
        onBlur: D,
        ref: ge,
      }),
      [i, l, S.disabled, A, D, ge, w],
    );
  return (
    Oe.useEffect(() => {
      const Q = u._options.shouldUnregister || d,
        X = I.current;
      (X && X !== i && !m && u.unregister(X),
        u.register(i, {
          ...N.current.rules,
          ...(Ft(N.current.disabled) ? { disabled: N.current.disabled } : {}),
        }));
      const he = (ie, Te) => {
        const Pe = J(u._fields, ie);
        Pe && Pe._f && (Pe._f.mount = Te);
      };
      if ((he(i, !0), Q)) {
        const ie = ct(J(u._options.defaultValues, i));
        (Ze(u._defaultValues, i, ie),
          nt(J(u._formValues, i)) && Ze(u._formValues, i, ie));
      }
      return (
        !m && u.register(i),
        (I.current = i),
        () => {
          (m ? Q && !u._state.action : Q) ? u.unregister(i) : he(i, !1);
        }
      );
    }, [i, u, m, d]),
    Oe.useEffect(() => {
      u._setDisabledField({ disabled: l, name: i });
    }, [l, i, u]),
    Oe.useMemo(() => ({ field: B, formState: S, fieldState: L }), [B, S, L])
  );
}
const kn = (s) => s.render(Ry(s));
var wp = (s, r, i, l, u) =>
    r
      ? {
          ...i[s],
          types: { ...(i[s] && i[s].types ? i[s].types : {}), [l]: u || !0 },
        }
      : {},
  ei = (s) => (Array.isArray(s) ? s : [s]),
  kf = () => {
    let s = [];
    return {
      get observers() {
        return s;
      },
      next: (u) => {
        for (const d of s) d.next && d.next(u);
      },
      subscribe: (u) => (
        s.push(u),
        {
          unsubscribe: () => {
            s = s.filter((d) => d !== u);
          },
        }
      ),
      unsubscribe: () => {
        s = [];
      },
    };
  };
function _p(s, r) {
  const i = {};
  for (const l in s)
    if (s.hasOwnProperty(l)) {
      const u = s[l],
        d = r[l];
      if (u && at(u) && d) {
        const p = _p(u, d);
        at(p) && (i[l] = p);
      } else s[l] && (i[l] = d);
    }
  return i;
}
var Ot = (s) => at(s) && !Object.keys(s).length,
  uu = (s) => s.type === "file",
  tn = (s) => typeof s == "function",
  Sa = (s) => {
    if (!su) return !1;
    const r = s ? s.ownerDocument : 0;
    return (
      s instanceof
      (r && r.defaultView ? r.defaultView.HTMLElement : HTMLElement)
    );
  },
  kp = (s) => s.type === "select-multiple",
  cu = (s) => s.type === "radio",
  Oy = (s) => cu(s) || oi(s),
  Fo = (s) => Sa(s) && s.isConnected;
function Iy(s, r) {
  const i = r.slice(0, -1).length;
  let l = 0;
  for (; l < i; ) s = nt(s) ? l++ : s[r[l++]];
  return s;
}
function Ay(s) {
  for (const r in s) if (s.hasOwnProperty(r) && !nt(s[r])) return !1;
  return !0;
}
function st(s, r) {
  const i = Array.isArray(r) ? r : Da(r) ? [r] : au(r),
    l = i.length === 1 ? s : Iy(s, i),
    u = i.length - 1,
    d = i[u];
  return (
    l && delete l[d],
    u !== 0 &&
      ((at(l) && Ot(l)) || (Array.isArray(l) && Ay(l))) &&
      st(s, i.slice(0, -1)),
    s
  );
}
var Dy = (s) => {
  for (const r in s) if (tn(s[r])) return !0;
  return !1;
};
function Sp(s) {
  return Array.isArray(s) || (at(s) && !Dy(s));
}
function Qo(s, r = {}) {
  for (const i in s)
    Sp(s[i])
      ? ((r[i] = Array.isArray(s[i]) ? [] : {}), Qo(s[i], r[i]))
      : St(s[i]) || (r[i] = !0);
  return r;
}
function es(s, r, i) {
  i || (i = Qo(r));
  for (const l in s)
    Sp(s[l])
      ? nt(r) || Ho(i[l])
        ? (i[l] = Qo(s[l], Array.isArray(s[l]) ? [] : {}))
        : es(s[l], St(r) ? {} : r[l], i[l])
      : (i[l] = !En(s[l], r[l]));
  return i;
}
const Sf = { value: !1, isValid: !1 },
  Ef = { value: !0, isValid: !0 };
var Ep = (s) => {
    if (Array.isArray(s)) {
      if (s.length > 1) {
        const r = s
          .filter((i) => i && i.checked && !i.disabled)
          .map((i) => i.value);
        return { value: r, isValid: !!r.length };
      }
      return s[0].checked && !s[0].disabled
        ? s[0].attributes && !nt(s[0].attributes.value)
          ? nt(s[0].value) || s[0].value === ""
            ? Ef
            : { value: s[0].value, isValid: !0 }
          : Ef
        : Sf;
    }
    return Sf;
  },
  Np = (s, { valueAsNumber: r, valueAsDate: i, setValueAs: l }) =>
    nt(s)
      ? s
      : r
        ? s === ""
          ? NaN
          : s && +s
        : i && Mt(s)
          ? new Date(s)
          : l
            ? l(s)
            : s;
const Nf = { isValid: !1, value: null };
var Cp = (s) =>
  Array.isArray(s)
    ? s.reduce(
        (r, i) =>
          i && i.checked && !i.disabled ? { isValid: !0, value: i.value } : r,
        Nf,
      )
    : Nf;
function Cf(s) {
  const r = s.ref;
  return uu(r)
    ? r.files
    : cu(r)
      ? Cp(s.refs).value
      : kp(r)
        ? [...r.selectedOptions].map(({ value: i }) => i)
        : oi(r)
          ? Ep(s.refs).value
          : Np(nt(r.value) ? s.ref.value : r.value, s);
}
var Ly = (s, r, i, l) => {
    const u = {};
    for (const d of s) {
      const p = J(r, d);
      p && Ze(u, d, p._f);
    }
    return {
      criteriaMode: i,
      names: [...s],
      fields: u,
      shouldUseNativeValidation: l,
    };
  },
  Ea = (s) => s instanceof RegExp,
  Ks = (s) =>
    nt(s)
      ? s
      : Ea(s)
        ? s.source
        : at(s)
          ? Ea(s.value)
            ? s.value.source
            : s.value
          : s,
  jf = (s) => ({
    isOnSubmit: !s || s === en.onSubmit,
    isOnBlur: s === en.onBlur,
    isOnChange: s === en.onChange,
    isOnAll: s === en.all,
    isOnTouch: s === en.onTouched,
  });
const Tf = "AsyncFunction";
var Fy = (s) =>
    !!s &&
    !!s.validate &&
    !!(
      (tn(s.validate) && s.validate.constructor.name === Tf) ||
      (at(s.validate) &&
        Object.values(s.validate).find((r) => r.constructor.name === Tf))
    ),
  My = (s) =>
    s.mount &&
    (s.required ||
      s.min ||
      s.max ||
      s.maxLength ||
      s.minLength ||
      s.pattern ||
      s.validate),
  Pf = (s, r, i) =>
    !i &&
    (r.watchAll ||
      r.watch.has(s) ||
      [...r.watch].some(
        (l) => s.startsWith(l) && /^\.\w+/.test(s.slice(l.length)),
      ));
const ti = (s, r, i, l) => {
  for (const u of i || Object.keys(s)) {
    const d = J(s, u);
    if (d) {
      const { _f: p, ...m } = d;
      if (p) {
        if (p.refs && p.refs[0] && r(p.refs[0], u) && !l) return !0;
        if (p.ref && r(p.ref, p.name) && !l) return !0;
        if (ti(m, r)) break;
      } else if (at(m) && ti(m, r)) break;
    }
  }
};
function Rf(s, r, i) {
  const l = J(s, i);
  if (l || Da(i)) return { error: l, name: i };
  const u = i.split(".");
  for (; u.length; ) {
    const d = u.join("."),
      p = J(r, d),
      m = J(s, d);
    if (p && !Array.isArray(p) && i !== d) return { name: i };
    if (m && m.type) return { name: d, error: m };
    if (m && m.root && m.root.type) return { name: `${d}.root`, error: m.root };
    u.pop();
  }
  return { name: i };
}
var Vy = (s, r, i, l) => {
    i(s);
    const { name: u, ...d } = s;
    return (
      Ot(d) ||
      Object.keys(d).length >= Object.keys(r).length ||
      Object.keys(d).find((p) => r[p] === (!l || en.all))
    );
  },
  zy = (s, r, i) =>
    !s ||
    !r ||
    s === r ||
    ei(s).some((l) => l && (i ? l === r : l.startsWith(r) || r.startsWith(l))),
  Uy = (s, r, i, l, u) =>
    u.isOnAll
      ? !1
      : !i && u.isOnTouch
        ? !(r || s)
        : (i ? l.isOnBlur : u.isOnBlur)
          ? !s
          : (i ? l.isOnChange : u.isOnChange)
            ? s
            : !0,
  $y = (s, r) => !iu(J(s, r)).length && st(s, r),
  by = (s, r, i) => {
    const l = ei(J(s, i));
    return (Ze(l, "root", r[i]), Ze(s, i, l), s);
  };
function Of(s, r, i = "validate") {
  if (Mt(s) || (Array.isArray(s) && s.every(Mt)) || (Ft(s) && !s))
    return { type: i, message: Mt(s) ? s : "", ref: r };
}
var Yr = (s) => (at(s) && !Ea(s) ? s : { value: s, message: "" }),
  If = async (s, r, i, l, u, d) => {
    const {
        ref: p,
        refs: m,
        required: x,
        maxLength: w,
        minLength: S,
        min: N,
        max: I,
        pattern: Y,
        validate: L,
        name: A,
        valueAsNumber: D,
        mount: ge,
      } = s._f,
      B = J(i, A);
    if (!ge || r.has(A)) return {};
    const Q = m ? m[0] : p,
      X = (G) => {
        u &&
          Q.reportValidity &&
          (Q.setCustomValidity(Ft(G) ? "" : G || ""), Q.reportValidity());
      },
      he = {},
      ie = cu(p),
      Te = oi(p),
      Pe = ie || Te,
      Fe =
        ((D || uu(p)) && nt(p.value) && nt(B)) ||
        (Sa(p) && p.value === "") ||
        B === "" ||
        (Array.isArray(B) && !B.length),
      ne = wp.bind(null, A, l, he),
      xe = (G, H, ke, Le = _n.maxLength, Re = _n.minLength) => {
        const Ce = G ? H : ke;
        he[A] = {
          type: G ? Le : Re,
          message: Ce,
          ref: p,
          ...ne(G ? Le : Re, Ce),
        };
      };
    if (
      d
        ? !Array.isArray(B) || !B.length
        : x &&
          ((!Pe && (Fe || St(B))) ||
            (Ft(B) && !B) ||
            (Te && !Ep(m).isValid) ||
            (ie && !Cp(m).isValid))
    ) {
      const { value: G, message: H } = Mt(x)
        ? { value: !!x, message: x }
        : Yr(x);
      if (
        G &&
        ((he[A] = {
          type: _n.required,
          message: H,
          ref: Q,
          ...ne(_n.required, H),
        }),
        !l)
      )
        return (X(H), he);
    }
    if (!Fe && (!St(N) || !St(I))) {
      let G, H;
      const ke = Yr(I),
        Le = Yr(N);
      if (!St(B) && !isNaN(B)) {
        const Re = p.valueAsNumber || (B && +B);
        (St(ke.value) || (G = Re > ke.value),
          St(Le.value) || (H = Re < Le.value));
      } else {
        const Re = p.valueAsDate || new Date(B),
          Ce = (K) => new Date(new Date().toDateString() + " " + K),
          W = p.type == "time",
          ae = p.type == "week";
        (Mt(ke.value) &&
          B &&
          (G = W
            ? Ce(B) > Ce(ke.value)
            : ae
              ? B > ke.value
              : Re > new Date(ke.value)),
          Mt(Le.value) &&
            B &&
            (H = W
              ? Ce(B) < Ce(Le.value)
              : ae
                ? B < Le.value
                : Re < new Date(Le.value)));
      }
      if ((G || H) && (xe(!!G, ke.message, Le.message, _n.max, _n.min), !l))
        return (X(he[A].message), he);
    }
    if ((w || S) && !Fe && (Mt(B) || (d && Array.isArray(B)))) {
      const G = Yr(w),
        H = Yr(S),
        ke = !St(G.value) && B.length > +G.value,
        Le = !St(H.value) && B.length < +H.value;
      if ((ke || Le) && (xe(ke, G.message, H.message), !l))
        return (X(he[A].message), he);
    }
    if (Y && !Fe && Mt(B)) {
      const { value: G, message: H } = Yr(Y);
      if (
        Ea(G) &&
        !B.match(G) &&
        ((he[A] = {
          type: _n.pattern,
          message: H,
          ref: p,
          ...ne(_n.pattern, H),
        }),
        !l)
      )
        return (X(H), he);
    }
    if (L) {
      if (tn(L)) {
        const G = await L(B, i),
          H = Of(G, Q);
        if (H && ((he[A] = { ...H, ...ne(_n.validate, H.message) }), !l))
          return (X(H.message), he);
      } else if (at(L)) {
        let G = {};
        for (const H in L) {
          if (!Ot(G) && !l) break;
          const ke = Of(await L[H](B, i), Q, H);
          ke &&
            ((G = { ...ke, ...ne(H, ke.message) }),
            X(ke.message),
            l && (he[A] = G));
        }
        if (!Ot(G) && ((he[A] = { ref: Q, ...G }), !l)) return he;
      }
    }
    return (X(!0), he);
  };
const By = {
  mode: en.onSubmit,
  reValidateMode: en.onChange,
  shouldFocusError: !0,
};
function Wy(s = {}) {
  let r = { ...By, ...s },
    i = {
      submitCount: 0,
      isDirty: !1,
      isReady: !1,
      isLoading: tn(r.defaultValues),
      isValidating: !1,
      isSubmitted: !1,
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !1,
      touchedFields: {},
      dirtyFields: {},
      validatingFields: {},
      errors: r.errors || {},
      disabled: r.disabled || !1,
    },
    l = {},
    u =
      at(r.defaultValues) || at(r.values)
        ? ct(r.defaultValues || r.values) || {}
        : {},
    d = r.shouldUnregister ? {} : ct(u),
    p = { action: !1, mount: !1, watch: !1 },
    m = {
      mount: new Set(),
      disabled: new Set(),
      unMount: new Set(),
      array: new Set(),
      watch: new Set(),
    },
    x,
    w = 0;
  const S = {
    isDirty: !1,
    dirtyFields: !1,
    validatingFields: !1,
    touchedFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1,
  };
  let N = { ...S };
  const I = { array: kf(), state: kf() },
    Y = r.criteriaMode === en.all,
    L = (v) => (E) => {
      (clearTimeout(w), (w = setTimeout(v, E)));
    },
    A = async (v) => {
      if (!r.disabled && (S.isValid || N.isValid || v)) {
        const E = r.resolver ? Ot((await Te()).errors) : await Fe(l, !0);
        E !== i.isValid && I.state.next({ isValid: E });
      }
    },
    D = (v, E) => {
      !r.disabled &&
        (S.isValidating ||
          S.validatingFields ||
          N.isValidating ||
          N.validatingFields) &&
        ((v || Array.from(m.mount)).forEach((P) => {
          P && (E ? Ze(i.validatingFields, P, E) : st(i.validatingFields, P));
        }),
        I.state.next({
          validatingFields: i.validatingFields,
          isValidating: !Ot(i.validatingFields),
        }));
    },
    ge = (v, E = [], P, q, Z = !0, $ = !0) => {
      if (q && P && !r.disabled) {
        if (((p.action = !0), $ && Array.isArray(J(l, v)))) {
          const pe = P(J(l, v), q.argA, q.argB);
          Z && Ze(l, v, pe);
        }
        if ($ && Array.isArray(J(i.errors, v))) {
          const pe = P(J(i.errors, v), q.argA, q.argB);
          (Z && Ze(i.errors, v, pe), $y(i.errors, v));
        }
        if (
          (S.touchedFields || N.touchedFields) &&
          $ &&
          Array.isArray(J(i.touchedFields, v))
        ) {
          const pe = P(J(i.touchedFields, v), q.argA, q.argB);
          Z && Ze(i.touchedFields, v, pe);
        }
        ((S.dirtyFields || N.dirtyFields) && (i.dirtyFields = es(u, d)),
          I.state.next({
            name: v,
            isDirty: xe(v, E),
            dirtyFields: i.dirtyFields,
            errors: i.errors,
            isValid: i.isValid,
          }));
      } else Ze(d, v, E);
    },
    B = (v, E) => {
      (Ze(i.errors, v, E), I.state.next({ errors: i.errors }));
    },
    Q = (v) => {
      ((i.errors = v), I.state.next({ errors: i.errors, isValid: !1 }));
    },
    X = (v, E, P, q) => {
      const Z = J(l, v);
      if (Z) {
        const $ = J(d, v, nt(P) ? J(u, v) : P);
        (nt($) || (q && q.defaultChecked) || E
          ? Ze(d, v, E ? $ : Cf(Z._f))
          : ke(v, $),
          p.mount && A());
      }
    },
    he = (v, E, P, q, Z) => {
      let $ = !1,
        pe = !1;
      const Me = { name: v };
      if (!r.disabled) {
        if (!P || q) {
          (S.isDirty || N.isDirty) &&
            ((pe = i.isDirty),
            (i.isDirty = Me.isDirty = xe()),
            ($ = pe !== Me.isDirty));
          const Be = En(J(u, v), E);
          ((pe = !!J(i.dirtyFields, v)),
            Be ? st(i.dirtyFields, v) : Ze(i.dirtyFields, v, !0),
            (Me.dirtyFields = i.dirtyFields),
            ($ = $ || ((S.dirtyFields || N.dirtyFields) && pe !== !Be)));
        }
        if (P) {
          const Be = J(i.touchedFields, v);
          Be ||
            (Ze(i.touchedFields, v, P),
            (Me.touchedFields = i.touchedFields),
            ($ = $ || ((S.touchedFields || N.touchedFields) && Be !== P)));
        }
        $ && Z && I.state.next(Me);
      }
      return $ ? Me : {};
    },
    ie = (v, E, P, q) => {
      const Z = J(i.errors, v),
        $ = (S.isValid || N.isValid) && Ft(E) && i.isValid !== E;
      if (
        (r.delayError && P
          ? ((x = L(() => B(v, P))), x(r.delayError))
          : (clearTimeout(w),
            (x = null),
            P ? Ze(i.errors, v, P) : st(i.errors, v)),
        (P ? !En(Z, P) : Z) || !Ot(q) || $)
      ) {
        const pe = {
          ...q,
          ...($ && Ft(E) ? { isValid: E } : {}),
          errors: i.errors,
          name: v,
        };
        ((i = { ...i, ...pe }), I.state.next(pe));
      }
    },
    Te = async (v) => {
      D(v, !0);
      const E = await r.resolver(
        d,
        r.context,
        Ly(v || m.mount, l, r.criteriaMode, r.shouldUseNativeValidation),
      );
      return (D(v), E);
    },
    Pe = async (v) => {
      const { errors: E } = await Te(v);
      if (v)
        for (const P of v) {
          const q = J(E, P);
          q ? Ze(i.errors, P, q) : st(i.errors, P);
        }
      else i.errors = E;
      return E;
    },
    Fe = async (v, E, P = { valid: !0 }) => {
      for (const q in v) {
        const Z = v[q];
        if (Z) {
          const { _f: $, ...pe } = Z;
          if ($) {
            const Me = m.array.has($.name),
              Be = Z._f && Fy(Z._f);
            Be && S.validatingFields && D([$.name], !0);
            const wt = await If(
              Z,
              m.disabled,
              d,
              Y,
              r.shouldUseNativeValidation && !E,
              Me,
            );
            if (
              (Be && S.validatingFields && D([$.name]),
              wt[$.name] && ((P.valid = !1), E))
            )
              break;
            !E &&
              (J(wt, $.name)
                ? Me
                  ? by(i.errors, wt, $.name)
                  : Ze(i.errors, $.name, wt[$.name])
                : st(i.errors, $.name));
          }
          !Ot(pe) && (await Fe(pe, E, P));
        }
      }
      return P.valid;
    },
    ne = () => {
      for (const v of m.unMount) {
        const E = J(l, v);
        E &&
          (E._f.refs ? E._f.refs.every((P) => !Fo(P)) : !Fo(E._f.ref)) &&
          De(v);
      }
      m.unMount = new Set();
    },
    xe = (v, E) => !r.disabled && (v && E && Ze(d, v, E), !En(K(), u)),
    G = (v, E, P) =>
      xp(v, m, { ...(p.mount ? d : nt(E) ? u : Mt(v) ? { [v]: E } : E) }, P, E),
    H = (v) => iu(J(p.mount ? d : u, v, r.shouldUnregister ? J(u, v, []) : [])),
    ke = (v, E, P = {}) => {
      const q = J(l, v);
      let Z = E;
      if (q) {
        const $ = q._f;
        $ &&
          (!$.disabled && Ze(d, v, Np(E, $)),
          (Z = Sa($.ref) && St(E) ? "" : E),
          kp($.ref)
            ? [...$.ref.options].forEach(
                (pe) => (pe.selected = Z.includes(pe.value)),
              )
            : $.refs
              ? oi($.ref)
                ? $.refs.forEach((pe) => {
                    (!pe.defaultChecked || !pe.disabled) &&
                      (Array.isArray(Z)
                        ? (pe.checked = !!Z.find((Me) => Me === pe.value))
                        : (pe.checked = Z === pe.value || !!Z));
                  })
                : $.refs.forEach((pe) => (pe.checked = pe.value === Z))
              : uu($.ref)
                ? ($.ref.value = "")
                : (($.ref.value = Z),
                  $.ref.type || I.state.next({ name: v, values: ct(d) })));
      }
      ((P.shouldDirty || P.shouldTouch) &&
        he(v, Z, P.shouldTouch, P.shouldDirty, !0),
        P.shouldValidate && ae(v));
    },
    Le = (v, E, P) => {
      for (const q in E) {
        if (!E.hasOwnProperty(q)) return;
        const Z = E[q],
          $ = v + "." + q,
          pe = J(l, $);
        (m.array.has(v) || at(Z) || (pe && !pe._f)) && !gr(Z)
          ? Le($, Z, P)
          : ke($, Z, P);
      }
    },
    Re = (v, E, P = {}) => {
      const q = J(l, v),
        Z = m.array.has(v),
        $ = ct(E);
      (Ze(d, v, $),
        Z
          ? (I.array.next({ name: v, values: ct(d) }),
            (S.isDirty || S.dirtyFields || N.isDirty || N.dirtyFields) &&
              P.shouldDirty &&
              I.state.next({
                name: v,
                dirtyFields: es(u, d),
                isDirty: xe(v, $),
              }))
          : q && !q._f && !St($)
            ? Le(v, $, P)
            : ke(v, $, P),
        Pf(v, m) && I.state.next({ ...i, name: v }),
        I.state.next({ name: p.mount ? v : void 0, values: ct(d) }));
    },
    Ce = async (v) => {
      p.mount = !0;
      const E = v.target;
      let P = E.name,
        q = !0;
      const Z = J(l, P),
        $ = (Be) => {
          q =
            Number.isNaN(Be) ||
            (gr(Be) && isNaN(Be.getTime())) ||
            En(Be, J(d, P, Be));
        },
        pe = jf(r.mode),
        Me = jf(r.reValidateMode);
      if (Z) {
        let Be, wt;
        const nn = E.type ? Cf(Z._f) : mp(v),
          Et = v.type === ka.BLUR || v.type === ka.FOCUS_OUT,
          Fa =
            (!My(Z._f) && !r.resolver && !J(i.errors, P) && !Z._f.deps) ||
            Uy(Et, J(i.touchedFields, P), i.isSubmitted, Me, pe),
          Sr = Pf(P, m, Et);
        (Ze(d, P, nn),
          Et
            ? (!E || !E.readOnly) && (Z._f.onBlur && Z._f.onBlur(v), x && x(0))
            : Z._f.onChange && Z._f.onChange(v));
        const Er = he(P, nn, Et),
          Ma = !Ot(Er) || Sr;
        if ((!Et && I.state.next({ name: P, type: v.type, values: ct(d) }), Fa))
          return (
            (S.isValid || N.isValid) &&
              (r.mode === "onBlur" ? Et && A() : Et || A()),
            Ma && I.state.next({ name: P, ...(Sr ? {} : Er) })
          );
        if ((!Et && Sr && I.state.next({ ...i }), r.resolver)) {
          const { errors: Nr } = await Te([P]);
          if (($(nn), q)) {
            const cs = Rf(i.errors, l, P),
              Cr = Rf(Nr, l, cs.name || P);
            ((Be = Cr.error), (P = Cr.name), (wt = Ot(Nr)));
          }
        } else
          (D([P], !0),
            (Be = (await If(Z, m.disabled, d, Y, r.shouldUseNativeValidation))[
              P
            ]),
            D([P]),
            $(nn),
            q &&
              (Be
                ? (wt = !1)
                : (S.isValid || N.isValid) && (wt = await Fe(l, !0))));
        q &&
          (Z._f.deps &&
            (!Array.isArray(Z._f.deps) || Z._f.deps.length > 0) &&
            ae(Z._f.deps),
          ie(P, wt, Be, Er));
      }
    },
    W = (v, E) => {
      if (J(i.errors, E) && v.focus) return (v.focus(), 1);
    },
    ae = async (v, E = {}) => {
      let P, q;
      const Z = ei(v);
      if (r.resolver) {
        const $ = await Pe(nt(v) ? v : Z);
        ((P = Ot($)), (q = v ? !Z.some((pe) => J($, pe)) : P));
      } else
        v
          ? ((q = (
              await Promise.all(
                Z.map(async ($) => {
                  const pe = J(l, $);
                  return await Fe(pe && pe._f ? { [$]: pe } : pe);
                }),
              )
            ).every(Boolean)),
            !(!q && !i.isValid) && A())
          : (q = P = await Fe(l));
      return (
        I.state.next({
          ...(!Mt(v) || ((S.isValid || N.isValid) && P !== i.isValid)
            ? {}
            : { name: v }),
          ...(r.resolver || !v ? { isValid: P } : {}),
          errors: i.errors,
        }),
        E.shouldFocus && !q && ti(l, W, v ? Z : m.mount),
        q
      );
    },
    K = (v, E) => {
      let P = { ...(p.mount ? d : u) };
      return (
        E && (P = _p(E.dirtyFields ? i.dirtyFields : i.touchedFields, P)),
        nt(v) ? P : Mt(v) ? J(P, v) : v.map((q) => J(P, q))
      );
    },
    y = (v, E) => ({
      invalid: !!J((E || i).errors, v),
      isDirty: !!J((E || i).dirtyFields, v),
      error: J((E || i).errors, v),
      isValidating: !!J(i.validatingFields, v),
      isTouched: !!J((E || i).touchedFields, v),
    }),
    O = (v) => {
      (v && ei(v).forEach((E) => st(i.errors, E)),
        I.state.next({ errors: v ? i.errors : {} }));
    },
    fe = (v, E, P) => {
      const q = (J(l, v, { _f: {} })._f || {}).ref,
        Z = J(i.errors, v) || {},
        { ref: $, message: pe, type: Me, ...Be } = Z;
      (Ze(i.errors, v, { ...Be, ...E, ref: q }),
        I.state.next({ name: v, errors: i.errors, isValid: !1 }),
        P && P.shouldFocus && q && q.focus && q.focus());
    },
    me = (v, E) =>
      tn(v)
        ? I.state.subscribe({
            next: (P) => "values" in P && v(G(void 0, E), P),
          })
        : G(v, E, !0),
    we = (v) =>
      I.state.subscribe({
        next: (E) => {
          zy(v.name, E.name, v.exact) &&
            Vy(E, v.formState || S, sr, v.reRenderRoot) &&
            v.callback({ values: { ...d }, ...i, ...E, defaultValues: u });
        },
      }).unsubscribe,
    Se = (v) => (
      (p.mount = !0),
      (N = { ...N, ...v.formState }),
      we({ ...v, formState: N })
    ),
    De = (v, E = {}) => {
      for (const P of v ? ei(v) : m.mount)
        (m.mount.delete(P),
          m.array.delete(P),
          E.keepValue || (st(l, P), st(d, P)),
          !E.keepError && st(i.errors, P),
          !E.keepDirty && st(i.dirtyFields, P),
          !E.keepTouched && st(i.touchedFields, P),
          !E.keepIsValidating && st(i.validatingFields, P),
          !r.shouldUnregister && !E.keepDefaultValue && st(u, P));
      (I.state.next({ values: ct(d) }),
        I.state.next({ ...i, ...(E.keepDirty ? { isDirty: xe() } : {}) }),
        !E.keepIsValid && A());
    },
    je = ({ disabled: v, name: E }) => {
      ((Ft(v) && p.mount) || v || m.disabled.has(E)) &&
        (v ? m.disabled.add(E) : m.disabled.delete(E));
    },
    be = (v, E = {}) => {
      let P = J(l, v);
      const q = Ft(E.disabled) || Ft(r.disabled);
      return (
        Ze(l, v, {
          ...(P || {}),
          _f: {
            ...(P && P._f ? P._f : { ref: { name: v } }),
            name: v,
            mount: !0,
            ...E,
          },
        }),
        m.mount.add(v),
        P
          ? je({ disabled: Ft(E.disabled) ? E.disabled : r.disabled, name: v })
          : X(v, !0, E.value),
        {
          ...(q ? { disabled: E.disabled || r.disabled } : {}),
          ...(r.progressive
            ? {
                required: !!E.required,
                min: Ks(E.min),
                max: Ks(E.max),
                minLength: Ks(E.minLength),
                maxLength: Ks(E.maxLength),
                pattern: Ks(E.pattern),
              }
            : {}),
          name: v,
          onChange: Ce,
          onBlur: Ce,
          ref: (Z) => {
            if (Z) {
              (be(v, E), (P = J(l, v)));
              const $ =
                  (nt(Z.value) &&
                    Z.querySelectorAll &&
                    Z.querySelectorAll("input,select,textarea")[0]) ||
                  Z,
                pe = Oy($),
                Me = P._f.refs || [];
              if (pe ? Me.find((Be) => Be === $) : $ === P._f.ref) return;
              (Ze(l, v, {
                _f: {
                  ...P._f,
                  ...(pe
                    ? {
                        refs: [
                          ...Me.filter(Fo),
                          $,
                          ...(Array.isArray(J(u, v)) ? [{}] : []),
                        ],
                        ref: { type: $.type, name: v },
                      }
                    : { ref: $ }),
                },
              }),
                X(v, !1, void 0, $));
            } else
              ((P = J(l, v, {})),
                P._f && (P._f.mount = !1),
                (r.shouldUnregister || E.shouldUnregister) &&
                  !(vp(m.array, v) && p.action) &&
                  m.unMount.add(v));
          },
        }
      );
    },
    lt = () => r.shouldFocusError && ti(l, W, m.mount),
    zt = (v) => {
      Ft(v) &&
        (I.state.next({ disabled: v }),
        ti(
          l,
          (E, P) => {
            const q = J(l, P);
            q &&
              ((E.disabled = q._f.disabled || v),
              Array.isArray(q._f.refs) &&
                q._f.refs.forEach((Z) => {
                  Z.disabled = q._f.disabled || v;
                }));
          },
          0,
          !1,
        ));
    },
    jn = (v, E) => async (P) => {
      let q;
      P && (P.preventDefault && P.preventDefault(), P.persist && P.persist());
      let Z = ct(d);
      if ((I.state.next({ isSubmitting: !0 }), r.resolver)) {
        const { errors: $, values: pe } = await Te();
        ((i.errors = $), (Z = ct(pe)));
      } else await Fe(l);
      if (m.disabled.size) for (const $ of m.disabled) st(Z, $);
      if ((st(i.errors, "root"), Ot(i.errors))) {
        I.state.next({ errors: {} });
        try {
          await v(Z, P);
        } catch ($) {
          q = $;
        }
      } else (E && (await E({ ...i.errors }, P)), lt(), setTimeout(lt));
      if (
        (I.state.next({
          isSubmitted: !0,
          isSubmitting: !1,
          isSubmitSuccessful: Ot(i.errors) && !q,
          submitCount: i.submitCount + 1,
          errors: i.errors,
        }),
        q)
      )
        throw q;
    },
    Tn = (v, E = {}) => {
      J(l, v) &&
        (nt(E.defaultValue)
          ? Re(v, ct(J(u, v)))
          : (Re(v, E.defaultValue), Ze(u, v, ct(E.defaultValue))),
        E.keepTouched || st(i.touchedFields, v),
        E.keepDirty ||
          (st(i.dirtyFields, v),
          (i.isDirty = E.defaultValue ? xe(v, ct(J(u, v))) : xe())),
        E.keepError || (st(i.errors, v), S.isValid && A()),
        I.state.next({ ...i }));
    },
    Pn = (v, E = {}) => {
      const P = v ? ct(v) : u,
        q = ct(P),
        Z = Ot(v),
        $ = Z ? u : q;
      if ((E.keepDefaultValues || (u = P), !E.keepValues)) {
        if (E.keepDirtyValues) {
          const pe = new Set([...m.mount, ...Object.keys(es(u, d))]);
          for (const Me of Array.from(pe))
            J(i.dirtyFields, Me) ? Ze($, Me, J(d, Me)) : Re(Me, J($, Me));
        } else {
          if (su && nt(v))
            for (const pe of m.mount) {
              const Me = J(l, pe);
              if (Me && Me._f) {
                const Be = Array.isArray(Me._f.refs)
                  ? Me._f.refs[0]
                  : Me._f.ref;
                if (Sa(Be)) {
                  const wt = Be.closest("form");
                  if (wt) {
                    wt.reset();
                    break;
                  }
                }
              }
            }
          if (E.keepFieldsRef) for (const pe of m.mount) Re(pe, J($, pe));
          else l = {};
        }
        ((d = r.shouldUnregister ? (E.keepDefaultValues ? ct(u) : {}) : ct($)),
          I.array.next({ values: { ...$ } }),
          I.state.next({ values: { ...$ } }));
      }
      ((m = {
        mount: E.keepDirtyValues ? m.mount : new Set(),
        unMount: new Set(),
        array: new Set(),
        disabled: new Set(),
        watch: new Set(),
        watchAll: !1,
        focus: "",
      }),
        (p.mount = !S.isValid || !!E.keepIsValid || !!E.keepDirtyValues),
        (p.watch = !!r.shouldUnregister),
        I.state.next({
          submitCount: E.keepSubmitCount ? i.submitCount : 0,
          isDirty: Z
            ? !1
            : E.keepDirty
              ? i.isDirty
              : !!(E.keepDefaultValues && !En(v, u)),
          isSubmitted: E.keepIsSubmitted ? i.isSubmitted : !1,
          dirtyFields: Z
            ? {}
            : E.keepDirtyValues
              ? E.keepDefaultValues && d
                ? es(u, d)
                : i.dirtyFields
              : E.keepDefaultValues && v
                ? es(u, v)
                : E.keepDirty
                  ? i.dirtyFields
                  : {},
          touchedFields: E.keepTouched ? i.touchedFields : {},
          errors: E.keepErrors ? i.errors : {},
          isSubmitSuccessful: E.keepIsSubmitSuccessful
            ? i.isSubmitSuccessful
            : !1,
          isSubmitting: !1,
          defaultValues: u,
        }));
    },
    rr = (v, E) => Pn(tn(v) ? v(d) : v, E),
    kr = (v, E = {}) => {
      const P = J(l, v),
        q = P && P._f;
      if (q) {
        const Z = q.refs ? q.refs[0] : q.ref;
        Z.focus && (Z.focus(), E.shouldSelect && tn(Z.select) && Z.select());
      }
    },
    sr = (v) => {
      i = { ...i, ...v };
    },
    le = {
      control: {
        register: be,
        unregister: De,
        getFieldState: y,
        handleSubmit: jn,
        setError: fe,
        _subscribe: we,
        _runSchema: Te,
        _focusError: lt,
        _getWatch: G,
        _getDirty: xe,
        _setValid: A,
        _setFieldArray: ge,
        _setDisabledField: je,
        _setErrors: Q,
        _getFieldArray: H,
        _reset: Pn,
        _resetDefaultValues: () =>
          tn(r.defaultValues) &&
          r.defaultValues().then((v) => {
            (rr(v, r.resetOptions), I.state.next({ isLoading: !1 }));
          }),
        _removeUnmounted: ne,
        _disableForm: zt,
        _subjects: I,
        _proxyFormState: S,
        get _fields() {
          return l;
        },
        get _formValues() {
          return d;
        },
        get _state() {
          return p;
        },
        set _state(v) {
          p = v;
        },
        get _defaultValues() {
          return u;
        },
        get _names() {
          return m;
        },
        set _names(v) {
          m = v;
        },
        get _formState() {
          return i;
        },
        get _options() {
          return r;
        },
        set _options(v) {
          r = { ...r, ...v };
        },
      },
      subscribe: Se,
      trigger: ae,
      register: be,
      handleSubmit: jn,
      watch: me,
      setValue: Re,
      getValues: K,
      reset: rr,
      resetField: Tn,
      clearErrors: O,
      unregister: De,
      setError: fe,
      setFocus: kr,
      getFieldState: y,
    };
  return { ...le, formControl: le };
}
function Zy(s = {}) {
  const r = Oe.useRef(void 0),
    i = Oe.useRef(void 0),
    [l, u] = Oe.useState({
      isDirty: !1,
      isValidating: !1,
      isLoading: tn(s.defaultValues),
      isSubmitted: !1,
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !1,
      submitCount: 0,
      dirtyFields: {},
      touchedFields: {},
      validatingFields: {},
      errors: s.errors || {},
      disabled: s.disabled || !1,
      isReady: !1,
      defaultValues: tn(s.defaultValues) ? void 0 : s.defaultValues,
    });
  if (!r.current)
    if (s.formControl)
      ((r.current = { ...s.formControl, formState: l }),
        s.defaultValues &&
          !tn(s.defaultValues) &&
          s.formControl.reset(s.defaultValues, s.resetOptions));
    else {
      const { formControl: p, ...m } = Wy(s);
      r.current = { ...m, formState: l };
    }
  const d = r.current.control;
  return (
    (d._options = s),
    ou(() => {
      const p = d._subscribe({
        formState: d._proxyFormState,
        callback: () => u({ ...d._formState }),
        reRenderRoot: !0,
      });
      return (
        u((m) => ({ ...m, isReady: !0 })),
        (d._formState.isReady = !0),
        p
      );
    }, [d]),
    Oe.useEffect(() => d._disableForm(s.disabled), [d, s.disabled]),
    Oe.useEffect(() => {
      (s.mode && (d._options.mode = s.mode),
        s.reValidateMode && (d._options.reValidateMode = s.reValidateMode));
    }, [d, s.mode, s.reValidateMode]),
    Oe.useEffect(() => {
      s.errors && (d._setErrors(s.errors), d._focusError());
    }, [d, s.errors]),
    Oe.useEffect(() => {
      s.shouldUnregister && d._subjects.state.next({ values: d._getWatch() });
    }, [d, s.shouldUnregister]),
    Oe.useEffect(() => {
      if (d._proxyFormState.isDirty) {
        const p = d._getDirty();
        p !== l.isDirty && d._subjects.state.next({ isDirty: p });
      }
    }, [d, l.isDirty]),
    Oe.useEffect(() => {
      s.values && !En(s.values, i.current)
        ? (d._reset(s.values, {
            keepFieldsRef: !0,
            ...d._options.resetOptions,
          }),
          (i.current = s.values),
          u((p) => ({ ...p })))
        : d._resetDefaultValues();
    }, [d, s.values]),
    Oe.useEffect(() => {
      (d._state.mount || (d._setValid(), (d._state.mount = !0)),
        d._state.watch &&
          ((d._state.watch = !1), d._subjects.state.next({ ...d._formState })),
        d._removeUnmounted());
    }),
    (r.current.formState = gp(l, d)),
    r.current
  );
}
const Af = (s, r, i) => {
    if (s && "reportValidity" in s) {
      const l = J(i, r);
      (s.setCustomValidity((l && l.message) || ""), s.reportValidity());
    }
  },
  jp = (s, r) => {
    for (const i in r.fields) {
      const l = r.fields[i];
      l && l.ref && "reportValidity" in l.ref
        ? Af(l.ref, i, s)
        : l.refs && l.refs.forEach((u) => Af(u, i, s));
    }
  },
  Hy = (s, r) => {
    r.shouldUseNativeValidation && jp(s, r);
    const i = {};
    for (const l in s) {
      const u = J(r.fields, l),
        d = Object.assign(s[l] || {}, { ref: u && u.ref });
      if (Qy(r.names || Object.keys(s), l)) {
        const p = Object.assign({}, J(i, l));
        (Ze(p, "root", d), Ze(i, l, p));
      } else Ze(i, l, d);
    }
    return i;
  },
  Qy = (s, r) => s.some((i) => i.startsWith(r + "."));
var Ky = function (s, r) {
    for (var i = {}; s.length; ) {
      var l = s[0],
        u = l.code,
        d = l.message,
        p = l.path.join(".");
      if (!i[p])
        if ("unionErrors" in l) {
          var m = l.unionErrors[0].errors[0];
          i[p] = { message: m.message, type: m.code };
        } else i[p] = { message: d, type: u };
      if (
        ("unionErrors" in l &&
          l.unionErrors.forEach(function (S) {
            return S.errors.forEach(function (N) {
              return s.push(N);
            });
          }),
        r)
      ) {
        var x = i[p].types,
          w = x && x[l.code];
        i[p] = wp(p, r, i, u, w ? [].concat(w, l.message) : l.message);
      }
      s.shift();
    }
    return i;
  },
  qy = function (s, r, i) {
    return (
      i === void 0 && (i = {}),
      function (l, u, d) {
        try {
          return Promise.resolve(
            (function (p, m) {
              try {
                var x = Promise.resolve(
                  s[i.mode === "sync" ? "parse" : "parseAsync"](l, r),
                ).then(function (w) {
                  return (
                    d.shouldUseNativeValidation && jp({}, d),
                    { errors: {}, values: i.raw ? l : w }
                  );
                });
              } catch (w) {
                return m(w);
              }
              return x && x.then ? x.then(void 0, m) : x;
            })(0, function (p) {
              if (
                (function (m) {
                  return Array.isArray(m?.errors);
                })(p)
              )
                return {
                  values: {},
                  errors: Hy(
                    Ky(
                      p.errors,
                      !d.shouldUseNativeValidation && d.criteriaMode === "all",
                    ),
                    d,
                  ),
                };
              throw p;
            }),
          );
        } catch (p) {
          return Promise.reject(p);
        }
      }
    );
  },
  $e;
(function (s) {
  s.assertEqual = (u) => {};
  function r(u) {}
  s.assertIs = r;
  function i(u) {
    throw new Error();
  }
  ((s.assertNever = i),
    (s.arrayToEnum = (u) => {
      const d = {};
      for (const p of u) d[p] = p;
      return d;
    }),
    (s.getValidEnumValues = (u) => {
      const d = s.objectKeys(u).filter((m) => typeof u[u[m]] != "number"),
        p = {};
      for (const m of d) p[m] = u[m];
      return s.objectValues(p);
    }),
    (s.objectValues = (u) =>
      s.objectKeys(u).map(function (d) {
        return u[d];
      })),
    (s.objectKeys =
      typeof Object.keys == "function"
        ? (u) => Object.keys(u)
        : (u) => {
            const d = [];
            for (const p in u)
              Object.prototype.hasOwnProperty.call(u, p) && d.push(p);
            return d;
          }),
    (s.find = (u, d) => {
      for (const p of u) if (d(p)) return p;
    }),
    (s.isInteger =
      typeof Number.isInteger == "function"
        ? (u) => Number.isInteger(u)
        : (u) =>
            typeof u == "number" && Number.isFinite(u) && Math.floor(u) === u));
  function l(u, d = " | ") {
    return u.map((p) => (typeof p == "string" ? `'${p}'` : p)).join(d);
  }
  ((s.joinValues = l),
    (s.jsonStringifyReplacer = (u, d) =>
      typeof d == "bigint" ? d.toString() : d));
})($e || ($e = {}));
var Df;
(function (s) {
  s.mergeShapes = (r, i) => ({ ...r, ...i });
})(Df || (Df = {}));
const ue = $e.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
  ]),
  Jn = (s) => {
    switch (typeof s) {
      case "undefined":
        return ue.undefined;
      case "string":
        return ue.string;
      case "number":
        return Number.isNaN(s) ? ue.nan : ue.number;
      case "boolean":
        return ue.boolean;
      case "function":
        return ue.function;
      case "bigint":
        return ue.bigint;
      case "symbol":
        return ue.symbol;
      case "object":
        return Array.isArray(s)
          ? ue.array
          : s === null
            ? ue.null
            : s.then &&
                typeof s.then == "function" &&
                s.catch &&
                typeof s.catch == "function"
              ? ue.promise
              : typeof Map < "u" && s instanceof Map
                ? ue.map
                : typeof Set < "u" && s instanceof Set
                  ? ue.set
                  : typeof Date < "u" && s instanceof Date
                    ? ue.date
                    : ue.object;
      default:
        return ue.unknown;
    }
  },
  b = $e.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite",
  ]);
class Nn extends Error {
  get errors() {
    return this.issues;
  }
  constructor(r) {
    (super(),
      (this.issues = []),
      (this.addIssue = (l) => {
        this.issues = [...this.issues, l];
      }),
      (this.addIssues = (l = []) => {
        this.issues = [...this.issues, ...l];
      }));
    const i = new.target.prototype;
    (Object.setPrototypeOf
      ? Object.setPrototypeOf(this, i)
      : (this.__proto__ = i),
      (this.name = "ZodError"),
      (this.issues = r));
  }
  format(r) {
    const i =
        r ||
        function (d) {
          return d.message;
        },
      l = { _errors: [] },
      u = (d) => {
        for (const p of d.issues)
          if (p.code === "invalid_union") p.unionErrors.map(u);
          else if (p.code === "invalid_return_type") u(p.returnTypeError);
          else if (p.code === "invalid_arguments") u(p.argumentsError);
          else if (p.path.length === 0) l._errors.push(i(p));
          else {
            let m = l,
              x = 0;
            for (; x < p.path.length; ) {
              const w = p.path[x];
              (x === p.path.length - 1
                ? ((m[w] = m[w] || { _errors: [] }), m[w]._errors.push(i(p)))
                : (m[w] = m[w] || { _errors: [] }),
                (m = m[w]),
                x++);
            }
          }
      };
    return (u(this), l);
  }
  static assert(r) {
    if (!(r instanceof Nn)) throw new Error(`Not a ZodError: ${r}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, $e.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(r = (i) => i.message) {
    const i = {},
      l = [];
    for (const u of this.issues)
      if (u.path.length > 0) {
        const d = u.path[0];
        ((i[d] = i[d] || []), i[d].push(r(u)));
      } else l.push(r(u));
    return { formErrors: l, fieldErrors: i };
  }
  get formErrors() {
    return this.flatten();
  }
}
Nn.create = (s) => new Nn(s);
const Ko = (s, r) => {
  let i;
  switch (s.code) {
    case b.invalid_type:
      s.received === ue.undefined
        ? (i = "Required")
        : (i = `Expected ${s.expected}, received ${s.received}`);
      break;
    case b.invalid_literal:
      i = `Invalid literal value, expected ${JSON.stringify(s.expected, $e.jsonStringifyReplacer)}`;
      break;
    case b.unrecognized_keys:
      i = `Unrecognized key(s) in object: ${$e.joinValues(s.keys, ", ")}`;
      break;
    case b.invalid_union:
      i = "Invalid input";
      break;
    case b.invalid_union_discriminator:
      i = `Invalid discriminator value. Expected ${$e.joinValues(s.options)}`;
      break;
    case b.invalid_enum_value:
      i = `Invalid enum value. Expected ${$e.joinValues(s.options)}, received '${s.received}'`;
      break;
    case b.invalid_arguments:
      i = "Invalid function arguments";
      break;
    case b.invalid_return_type:
      i = "Invalid function return type";
      break;
    case b.invalid_date:
      i = "Invalid date";
      break;
    case b.invalid_string:
      typeof s.validation == "object"
        ? "includes" in s.validation
          ? ((i = `Invalid input: must include "${s.validation.includes}"`),
            typeof s.validation.position == "number" &&
              (i = `${i} at one or more positions greater than or equal to ${s.validation.position}`))
          : "startsWith" in s.validation
            ? (i = `Invalid input: must start with "${s.validation.startsWith}"`)
            : "endsWith" in s.validation
              ? (i = `Invalid input: must end with "${s.validation.endsWith}"`)
              : $e.assertNever(s.validation)
        : s.validation !== "regex"
          ? (i = `Invalid ${s.validation}`)
          : (i = "Invalid");
      break;
    case b.too_small:
      s.type === "array"
        ? (i = `Array must contain ${s.exact ? "exactly" : s.inclusive ? "at least" : "more than"} ${s.minimum} element(s)`)
        : s.type === "string"
          ? (i = `String must contain ${s.exact ? "exactly" : s.inclusive ? "at least" : "over"} ${s.minimum} character(s)`)
          : s.type === "number"
            ? (i = `Number must be ${s.exact ? "exactly equal to " : s.inclusive ? "greater than or equal to " : "greater than "}${s.minimum}`)
            : s.type === "bigint"
              ? (i = `Number must be ${s.exact ? "exactly equal to " : s.inclusive ? "greater than or equal to " : "greater than "}${s.minimum}`)
              : s.type === "date"
                ? (i = `Date must be ${s.exact ? "exactly equal to " : s.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(s.minimum))}`)
                : (i = "Invalid input");
      break;
    case b.too_big:
      s.type === "array"
        ? (i = `Array must contain ${s.exact ? "exactly" : s.inclusive ? "at most" : "less than"} ${s.maximum} element(s)`)
        : s.type === "string"
          ? (i = `String must contain ${s.exact ? "exactly" : s.inclusive ? "at most" : "under"} ${s.maximum} character(s)`)
          : s.type === "number"
            ? (i = `Number must be ${s.exact ? "exactly" : s.inclusive ? "less than or equal to" : "less than"} ${s.maximum}`)
            : s.type === "bigint"
              ? (i = `BigInt must be ${s.exact ? "exactly" : s.inclusive ? "less than or equal to" : "less than"} ${s.maximum}`)
              : s.type === "date"
                ? (i = `Date must be ${s.exact ? "exactly" : s.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(s.maximum))}`)
                : (i = "Invalid input");
      break;
    case b.custom:
      i = "Invalid input";
      break;
    case b.invalid_intersection_types:
      i = "Intersection results could not be merged";
      break;
    case b.not_multiple_of:
      i = `Number must be a multiple of ${s.multipleOf}`;
      break;
    case b.not_finite:
      i = "Number must be finite";
      break;
    default:
      ((i = r.defaultError), $e.assertNever(s));
  }
  return { message: i };
};
let Jy = Ko;
function Yy() {
  return Jy;
}
const Gy = (s) => {
  const { data: r, path: i, errorMaps: l, issueData: u } = s,
    d = [...i, ...(u.path || [])],
    p = { ...u, path: d };
  if (u.message !== void 0) return { ...u, path: d, message: u.message };
  let m = "";
  const x = l
    .filter((w) => !!w)
    .slice()
    .reverse();
  for (const w of x) m = w(p, { data: r, defaultError: m }).message;
  return { ...u, path: d, message: m };
};
function te(s, r) {
  const i = Yy(),
    l = Gy({
      issueData: r,
      data: s.data,
      path: s.path,
      errorMaps: [
        s.common.contextualErrorMap,
        s.schemaErrorMap,
        i,
        i === Ko ? void 0 : Ko,
      ].filter((u) => !!u),
    });
  s.common.issues.push(l);
}
class Vt {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(r, i) {
    const l = [];
    for (const u of i) {
      if (u.status === "aborted") return Ee;
      (u.status === "dirty" && r.dirty(), l.push(u.value));
    }
    return { status: r.value, value: l };
  }
  static async mergeObjectAsync(r, i) {
    const l = [];
    for (const u of i) {
      const d = await u.key,
        p = await u.value;
      l.push({ key: d, value: p });
    }
    return Vt.mergeObjectSync(r, l);
  }
  static mergeObjectSync(r, i) {
    const l = {};
    for (const u of i) {
      const { key: d, value: p } = u;
      if (d.status === "aborted" || p.status === "aborted") return Ee;
      (d.status === "dirty" && r.dirty(),
        p.status === "dirty" && r.dirty(),
        d.value !== "__proto__" &&
          (typeof p.value < "u" || u.alwaysSet) &&
          (l[d.value] = p.value));
    }
    return { status: r.value, value: l };
  }
}
const Ee = Object.freeze({ status: "aborted" }),
  Gs = (s) => ({ status: "dirty", value: s }),
  Ht = (s) => ({ status: "valid", value: s }),
  Lf = (s) => s.status === "aborted",
  Ff = (s) => s.status === "dirty",
  rs = (s) => s.status === "valid",
  Na = (s) => typeof Promise < "u" && s instanceof Promise;
var de;
(function (s) {
  ((s.errToObj = (r) => (typeof r == "string" ? { message: r } : r || {})),
    (s.toString = (r) => (typeof r == "string" ? r : r?.message)));
})(de || (de = {}));
class tr {
  constructor(r, i, l, u) {
    ((this._cachedPath = []),
      (this.parent = r),
      (this.data = i),
      (this._path = l),
      (this._key = u));
  }
  get path() {
    return (
      this._cachedPath.length ||
        (Array.isArray(this._key)
          ? this._cachedPath.push(...this._path, ...this._key)
          : this._cachedPath.push(...this._path, this._key)),
      this._cachedPath
    );
  }
}
const Mf = (s, r) => {
  if (rs(r)) return { success: !0, data: r.value };
  if (!s.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error) return this._error;
      const i = new Nn(s.common.issues);
      return ((this._error = i), this._error);
    },
  };
};
function Ae(s) {
  if (!s) return {};
  const {
    errorMap: r,
    invalid_type_error: i,
    required_error: l,
    description: u,
  } = s;
  if (r && (i || l))
    throw new Error(
      `Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`,
    );
  return r
    ? { errorMap: r, description: u }
    : {
        errorMap: (p, m) => {
          const { message: x } = s;
          return p.code === "invalid_enum_value"
            ? { message: x ?? m.defaultError }
            : typeof m.data > "u"
              ? { message: x ?? l ?? m.defaultError }
              : p.code !== "invalid_type"
                ? { message: m.defaultError }
                : { message: x ?? i ?? m.defaultError };
        },
        description: u,
      };
}
class ze {
  get description() {
    return this._def.description;
  }
  _getType(r) {
    return Jn(r.data);
  }
  _getOrReturnCtx(r, i) {
    return (
      i || {
        common: r.parent.common,
        data: r.data,
        parsedType: Jn(r.data),
        schemaErrorMap: this._def.errorMap,
        path: r.path,
        parent: r.parent,
      }
    );
  }
  _processInputParams(r) {
    return {
      status: new Vt(),
      ctx: {
        common: r.parent.common,
        data: r.data,
        parsedType: Jn(r.data),
        schemaErrorMap: this._def.errorMap,
        path: r.path,
        parent: r.parent,
      },
    };
  }
  _parseSync(r) {
    const i = this._parse(r);
    if (Na(i)) throw new Error("Synchronous parse encountered promise.");
    return i;
  }
  _parseAsync(r) {
    const i = this._parse(r);
    return Promise.resolve(i);
  }
  parse(r, i) {
    const l = this.safeParse(r, i);
    if (l.success) return l.data;
    throw l.error;
  }
  safeParse(r, i) {
    const l = {
        common: {
          issues: [],
          async: i?.async ?? !1,
          contextualErrorMap: i?.errorMap,
        },
        path: i?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: r,
        parsedType: Jn(r),
      },
      u = this._parseSync({ data: r, path: l.path, parent: l });
    return Mf(l, u);
  }
  "~validate"(r) {
    const i = {
      common: { issues: [], async: !!this["~standard"].async },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: r,
      parsedType: Jn(r),
    };
    if (!this["~standard"].async)
      try {
        const l = this._parseSync({ data: r, path: [], parent: i });
        return rs(l) ? { value: l.value } : { issues: i.common.issues };
      } catch (l) {
        (l?.message?.toLowerCase()?.includes("encountered") &&
          (this["~standard"].async = !0),
          (i.common = { issues: [], async: !0 }));
      }
    return this._parseAsync({ data: r, path: [], parent: i }).then((l) =>
      rs(l) ? { value: l.value } : { issues: i.common.issues },
    );
  }
  async parseAsync(r, i) {
    const l = await this.safeParseAsync(r, i);
    if (l.success) return l.data;
    throw l.error;
  }
  async safeParseAsync(r, i) {
    const l = {
        common: { issues: [], contextualErrorMap: i?.errorMap, async: !0 },
        path: i?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: r,
        parsedType: Jn(r),
      },
      u = this._parse({ data: r, path: l.path, parent: l }),
      d = await (Na(u) ? u : Promise.resolve(u));
    return Mf(l, d);
  }
  refine(r, i) {
    const l = (u) =>
      typeof i == "string" || typeof i > "u"
        ? { message: i }
        : typeof i == "function"
          ? i(u)
          : i;
    return this._refinement((u, d) => {
      const p = r(u),
        m = () => d.addIssue({ code: b.custom, ...l(u) });
      return typeof Promise < "u" && p instanceof Promise
        ? p.then((x) => (x ? !0 : (m(), !1)))
        : p
          ? !0
          : (m(), !1);
    });
  }
  refinement(r, i) {
    return this._refinement((l, u) =>
      r(l) ? !0 : (u.addIssue(typeof i == "function" ? i(l, u) : i), !1),
    );
  }
  _refinement(r) {
    return new is({
      schema: this,
      typeName: Ne.ZodEffects,
      effect: { type: "refinement", refinement: r },
    });
  }
  superRefine(r) {
    return this._refinement(r);
  }
  constructor(r) {
    ((this.spa = this.safeParseAsync),
      (this._def = r),
      (this.parse = this.parse.bind(this)),
      (this.safeParse = this.safeParse.bind(this)),
      (this.parseAsync = this.parseAsync.bind(this)),
      (this.safeParseAsync = this.safeParseAsync.bind(this)),
      (this.spa = this.spa.bind(this)),
      (this.refine = this.refine.bind(this)),
      (this.refinement = this.refinement.bind(this)),
      (this.superRefine = this.superRefine.bind(this)),
      (this.optional = this.optional.bind(this)),
      (this.nullable = this.nullable.bind(this)),
      (this.nullish = this.nullish.bind(this)),
      (this.array = this.array.bind(this)),
      (this.promise = this.promise.bind(this)),
      (this.or = this.or.bind(this)),
      (this.and = this.and.bind(this)),
      (this.transform = this.transform.bind(this)),
      (this.brand = this.brand.bind(this)),
      (this.default = this.default.bind(this)),
      (this.catch = this.catch.bind(this)),
      (this.describe = this.describe.bind(this)),
      (this.pipe = this.pipe.bind(this)),
      (this.readonly = this.readonly.bind(this)),
      (this.isNullable = this.isNullable.bind(this)),
      (this.isOptional = this.isOptional.bind(this)),
      (this["~standard"] = {
        version: 1,
        vendor: "zod",
        validate: (i) => this["~validate"](i),
      }));
  }
  optional() {
    return er.create(this, this._def);
  }
  nullable() {
    return as.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return dn.create(this);
  }
  promise() {
    return Pa.create(this, this._def);
  }
  or(r) {
    return ja.create([this, r], this._def);
  }
  and(r) {
    return Ta.create(this, r, this._def);
  }
  transform(r) {
    return new is({
      ...Ae(this._def),
      schema: this,
      typeName: Ne.ZodEffects,
      effect: { type: "transform", transform: r },
    });
  }
  default(r) {
    const i = typeof r == "function" ? r : () => r;
    return new Yo({
      ...Ae(this._def),
      innerType: this,
      defaultValue: i,
      typeName: Ne.ZodDefault,
    });
  }
  brand() {
    return new _g({ typeName: Ne.ZodBranded, type: this, ...Ae(this._def) });
  }
  catch(r) {
    const i = typeof r == "function" ? r : () => r;
    return new Go({
      ...Ae(this._def),
      innerType: this,
      catchValue: i,
      typeName: Ne.ZodCatch,
    });
  }
  describe(r) {
    const i = this.constructor;
    return new i({ ...this._def, description: r });
  }
  pipe(r) {
    return du.create(this, r);
  }
  readonly() {
    return Xo.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Xy = /^c[^\s-]{8,}$/i,
  eg = /^[0-9a-z]+$/,
  tg = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
  ng =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  rg = /^[a-z0-9_-]{21}$/i,
  sg = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
  ig =
    /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  ag =
    /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
  lg = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Mo;
const og =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  ug =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  cg =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
  dg =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  fg = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  pg = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  Tp =
    "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
  hg = new RegExp(`^${Tp}$`);
function Pp(s) {
  let r = "[0-5]\\d";
  s.precision
    ? (r = `${r}\\.\\d{${s.precision}}`)
    : s.precision == null && (r = `${r}(\\.\\d+)?`);
  const i = s.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${r})${i}`;
}
function mg(s) {
  return new RegExp(`^${Pp(s)}$`);
}
function vg(s) {
  let r = `${Tp}T${Pp(s)}`;
  const i = [];
  return (
    i.push(s.local ? "Z?" : "Z"),
    s.offset && i.push("([+-]\\d{2}:?\\d{2})"),
    (r = `${r}(${i.join("|")})`),
    new RegExp(`^${r}$`)
  );
}
function yg(s, r) {
  return !!(
    ((r === "v4" || !r) && og.test(s)) ||
    ((r === "v6" || !r) && cg.test(s))
  );
}
function gg(s, r) {
  if (!sg.test(s)) return !1;
  try {
    const [i] = s.split(".");
    if (!i) return !1;
    const l = i
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        .padEnd(i.length + ((4 - (i.length % 4)) % 4), "="),
      u = JSON.parse(atob(l));
    return !(
      typeof u != "object" ||
      u === null ||
      ("typ" in u && u?.typ !== "JWT") ||
      !u.alg ||
      (r && u.alg !== r)
    );
  } catch {
    return !1;
  }
}
function xg(s, r) {
  return !!(
    ((r === "v4" || !r) && ug.test(s)) ||
    ((r === "v6" || !r) && dg.test(s))
  );
}
class Gn extends ze {
  _parse(r) {
    if (
      (this._def.coerce && (r.data = String(r.data)),
      this._getType(r) !== ue.string)
    ) {
      const d = this._getOrReturnCtx(r);
      return (
        te(d, {
          code: b.invalid_type,
          expected: ue.string,
          received: d.parsedType,
        }),
        Ee
      );
    }
    const l = new Vt();
    let u;
    for (const d of this._def.checks)
      if (d.kind === "min")
        r.data.length < d.value &&
          ((u = this._getOrReturnCtx(r, u)),
          te(u, {
            code: b.too_small,
            minimum: d.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: d.message,
          }),
          l.dirty());
      else if (d.kind === "max")
        r.data.length > d.value &&
          ((u = this._getOrReturnCtx(r, u)),
          te(u, {
            code: b.too_big,
            maximum: d.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: d.message,
          }),
          l.dirty());
      else if (d.kind === "length") {
        const p = r.data.length > d.value,
          m = r.data.length < d.value;
        (p || m) &&
          ((u = this._getOrReturnCtx(r, u)),
          p
            ? te(u, {
                code: b.too_big,
                maximum: d.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: d.message,
              })
            : m &&
              te(u, {
                code: b.too_small,
                minimum: d.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: d.message,
              }),
          l.dirty());
      } else if (d.kind === "email")
        ag.test(r.data) ||
          ((u = this._getOrReturnCtx(r, u)),
          te(u, {
            validation: "email",
            code: b.invalid_string,
            message: d.message,
          }),
          l.dirty());
      else if (d.kind === "emoji")
        (Mo || (Mo = new RegExp(lg, "u")),
          Mo.test(r.data) ||
            ((u = this._getOrReturnCtx(r, u)),
            te(u, {
              validation: "emoji",
              code: b.invalid_string,
              message: d.message,
            }),
            l.dirty()));
      else if (d.kind === "uuid")
        ng.test(r.data) ||
          ((u = this._getOrReturnCtx(r, u)),
          te(u, {
            validation: "uuid",
            code: b.invalid_string,
            message: d.message,
          }),
          l.dirty());
      else if (d.kind === "nanoid")
        rg.test(r.data) ||
          ((u = this._getOrReturnCtx(r, u)),
          te(u, {
            validation: "nanoid",
            code: b.invalid_string,
            message: d.message,
          }),
          l.dirty());
      else if (d.kind === "cuid")
        Xy.test(r.data) ||
          ((u = this._getOrReturnCtx(r, u)),
          te(u, {
            validation: "cuid",
            code: b.invalid_string,
            message: d.message,
          }),
          l.dirty());
      else if (d.kind === "cuid2")
        eg.test(r.data) ||
          ((u = this._getOrReturnCtx(r, u)),
          te(u, {
            validation: "cuid2",
            code: b.invalid_string,
            message: d.message,
          }),
          l.dirty());
      else if (d.kind === "ulid")
        tg.test(r.data) ||
          ((u = this._getOrReturnCtx(r, u)),
          te(u, {
            validation: "ulid",
            code: b.invalid_string,
            message: d.message,
          }),
          l.dirty());
      else if (d.kind === "url")
        try {
          new URL(r.data);
        } catch {
          ((u = this._getOrReturnCtx(r, u)),
            te(u, {
              validation: "url",
              code: b.invalid_string,
              message: d.message,
            }),
            l.dirty());
        }
      else
        d.kind === "regex"
          ? ((d.regex.lastIndex = 0),
            d.regex.test(r.data) ||
              ((u = this._getOrReturnCtx(r, u)),
              te(u, {
                validation: "regex",
                code: b.invalid_string,
                message: d.message,
              }),
              l.dirty()))
          : d.kind === "trim"
            ? (r.data = r.data.trim())
            : d.kind === "includes"
              ? r.data.includes(d.value, d.position) ||
                ((u = this._getOrReturnCtx(r, u)),
                te(u, {
                  code: b.invalid_string,
                  validation: { includes: d.value, position: d.position },
                  message: d.message,
                }),
                l.dirty())
              : d.kind === "toLowerCase"
                ? (r.data = r.data.toLowerCase())
                : d.kind === "toUpperCase"
                  ? (r.data = r.data.toUpperCase())
                  : d.kind === "startsWith"
                    ? r.data.startsWith(d.value) ||
                      ((u = this._getOrReturnCtx(r, u)),
                      te(u, {
                        code: b.invalid_string,
                        validation: { startsWith: d.value },
                        message: d.message,
                      }),
                      l.dirty())
                    : d.kind === "endsWith"
                      ? r.data.endsWith(d.value) ||
                        ((u = this._getOrReturnCtx(r, u)),
                        te(u, {
                          code: b.invalid_string,
                          validation: { endsWith: d.value },
                          message: d.message,
                        }),
                        l.dirty())
                      : d.kind === "datetime"
                        ? vg(d).test(r.data) ||
                          ((u = this._getOrReturnCtx(r, u)),
                          te(u, {
                            code: b.invalid_string,
                            validation: "datetime",
                            message: d.message,
                          }),
                          l.dirty())
                        : d.kind === "date"
                          ? hg.test(r.data) ||
                            ((u = this._getOrReturnCtx(r, u)),
                            te(u, {
                              code: b.invalid_string,
                              validation: "date",
                              message: d.message,
                            }),
                            l.dirty())
                          : d.kind === "time"
                            ? mg(d).test(r.data) ||
                              ((u = this._getOrReturnCtx(r, u)),
                              te(u, {
                                code: b.invalid_string,
                                validation: "time",
                                message: d.message,
                              }),
                              l.dirty())
                            : d.kind === "duration"
                              ? ig.test(r.data) ||
                                ((u = this._getOrReturnCtx(r, u)),
                                te(u, {
                                  validation: "duration",
                                  code: b.invalid_string,
                                  message: d.message,
                                }),
                                l.dirty())
                              : d.kind === "ip"
                                ? yg(r.data, d.version) ||
                                  ((u = this._getOrReturnCtx(r, u)),
                                  te(u, {
                                    validation: "ip",
                                    code: b.invalid_string,
                                    message: d.message,
                                  }),
                                  l.dirty())
                                : d.kind === "jwt"
                                  ? gg(r.data, d.alg) ||
                                    ((u = this._getOrReturnCtx(r, u)),
                                    te(u, {
                                      validation: "jwt",
                                      code: b.invalid_string,
                                      message: d.message,
                                    }),
                                    l.dirty())
                                  : d.kind === "cidr"
                                    ? xg(r.data, d.version) ||
                                      ((u = this._getOrReturnCtx(r, u)),
                                      te(u, {
                                        validation: "cidr",
                                        code: b.invalid_string,
                                        message: d.message,
                                      }),
                                      l.dirty())
                                    : d.kind === "base64"
                                      ? fg.test(r.data) ||
                                        ((u = this._getOrReturnCtx(r, u)),
                                        te(u, {
                                          validation: "base64",
                                          code: b.invalid_string,
                                          message: d.message,
                                        }),
                                        l.dirty())
                                      : d.kind === "base64url"
                                        ? pg.test(r.data) ||
                                          ((u = this._getOrReturnCtx(r, u)),
                                          te(u, {
                                            validation: "base64url",
                                            code: b.invalid_string,
                                            message: d.message,
                                          }),
                                          l.dirty())
                                        : $e.assertNever(d);
    return { status: l.value, value: r.data };
  }
  _regex(r, i, l) {
    return this.refinement((u) => r.test(u), {
      validation: i,
      code: b.invalid_string,
      ...de.errToObj(l),
    });
  }
  _addCheck(r) {
    return new Gn({ ...this._def, checks: [...this._def.checks, r] });
  }
  email(r) {
    return this._addCheck({ kind: "email", ...de.errToObj(r) });
  }
  url(r) {
    return this._addCheck({ kind: "url", ...de.errToObj(r) });
  }
  emoji(r) {
    return this._addCheck({ kind: "emoji", ...de.errToObj(r) });
  }
  uuid(r) {
    return this._addCheck({ kind: "uuid", ...de.errToObj(r) });
  }
  nanoid(r) {
    return this._addCheck({ kind: "nanoid", ...de.errToObj(r) });
  }
  cuid(r) {
    return this._addCheck({ kind: "cuid", ...de.errToObj(r) });
  }
  cuid2(r) {
    return this._addCheck({ kind: "cuid2", ...de.errToObj(r) });
  }
  ulid(r) {
    return this._addCheck({ kind: "ulid", ...de.errToObj(r) });
  }
  base64(r) {
    return this._addCheck({ kind: "base64", ...de.errToObj(r) });
  }
  base64url(r) {
    return this._addCheck({ kind: "base64url", ...de.errToObj(r) });
  }
  jwt(r) {
    return this._addCheck({ kind: "jwt", ...de.errToObj(r) });
  }
  ip(r) {
    return this._addCheck({ kind: "ip", ...de.errToObj(r) });
  }
  cidr(r) {
    return this._addCheck({ kind: "cidr", ...de.errToObj(r) });
  }
  datetime(r) {
    return typeof r == "string"
      ? this._addCheck({
          kind: "datetime",
          precision: null,
          offset: !1,
          local: !1,
          message: r,
        })
      : this._addCheck({
          kind: "datetime",
          precision: typeof r?.precision > "u" ? null : r?.precision,
          offset: r?.offset ?? !1,
          local: r?.local ?? !1,
          ...de.errToObj(r?.message),
        });
  }
  date(r) {
    return this._addCheck({ kind: "date", message: r });
  }
  time(r) {
    return typeof r == "string"
      ? this._addCheck({ kind: "time", precision: null, message: r })
      : this._addCheck({
          kind: "time",
          precision: typeof r?.precision > "u" ? null : r?.precision,
          ...de.errToObj(r?.message),
        });
  }
  duration(r) {
    return this._addCheck({ kind: "duration", ...de.errToObj(r) });
  }
  regex(r, i) {
    return this._addCheck({ kind: "regex", regex: r, ...de.errToObj(i) });
  }
  includes(r, i) {
    return this._addCheck({
      kind: "includes",
      value: r,
      position: i?.position,
      ...de.errToObj(i?.message),
    });
  }
  startsWith(r, i) {
    return this._addCheck({ kind: "startsWith", value: r, ...de.errToObj(i) });
  }
  endsWith(r, i) {
    return this._addCheck({ kind: "endsWith", value: r, ...de.errToObj(i) });
  }
  min(r, i) {
    return this._addCheck({ kind: "min", value: r, ...de.errToObj(i) });
  }
  max(r, i) {
    return this._addCheck({ kind: "max", value: r, ...de.errToObj(i) });
  }
  length(r, i) {
    return this._addCheck({ kind: "length", value: r, ...de.errToObj(i) });
  }
  nonempty(r) {
    return this.min(1, de.errToObj(r));
  }
  trim() {
    return new Gn({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }],
    });
  }
  toLowerCase() {
    return new Gn({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }],
    });
  }
  toUpperCase() {
    return new Gn({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }],
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((r) => r.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((r) => r.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((r) => r.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((r) => r.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((r) => r.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((r) => r.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((r) => r.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((r) => r.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((r) => r.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((r) => r.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((r) => r.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((r) => r.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((r) => r.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((r) => r.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((r) => r.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((r) => r.kind === "base64url");
  }
  get minLength() {
    let r = null;
    for (const i of this._def.checks)
      i.kind === "min" && (r === null || i.value > r) && (r = i.value);
    return r;
  }
  get maxLength() {
    let r = null;
    for (const i of this._def.checks)
      i.kind === "max" && (r === null || i.value < r) && (r = i.value);
    return r;
  }
}
Gn.create = (s) =>
  new Gn({
    checks: [],
    typeName: Ne.ZodString,
    coerce: s?.coerce ?? !1,
    ...Ae(s),
  });
function wg(s, r) {
  const i = (s.toString().split(".")[1] || "").length,
    l = (r.toString().split(".")[1] || "").length,
    u = i > l ? i : l,
    d = Number.parseInt(s.toFixed(u).replace(".", "")),
    p = Number.parseInt(r.toFixed(u).replace(".", ""));
  return (d % p) / 10 ** u;
}
class si extends ze {
  constructor() {
    (super(...arguments),
      (this.min = this.gte),
      (this.max = this.lte),
      (this.step = this.multipleOf));
  }
  _parse(r) {
    if (
      (this._def.coerce && (r.data = Number(r.data)),
      this._getType(r) !== ue.number)
    ) {
      const d = this._getOrReturnCtx(r);
      return (
        te(d, {
          code: b.invalid_type,
          expected: ue.number,
          received: d.parsedType,
        }),
        Ee
      );
    }
    let l;
    const u = new Vt();
    for (const d of this._def.checks)
      d.kind === "int"
        ? $e.isInteger(r.data) ||
          ((l = this._getOrReturnCtx(r, l)),
          te(l, {
            code: b.invalid_type,
            expected: "integer",
            received: "float",
            message: d.message,
          }),
          u.dirty())
        : d.kind === "min"
          ? (d.inclusive ? r.data < d.value : r.data <= d.value) &&
            ((l = this._getOrReturnCtx(r, l)),
            te(l, {
              code: b.too_small,
              minimum: d.value,
              type: "number",
              inclusive: d.inclusive,
              exact: !1,
              message: d.message,
            }),
            u.dirty())
          : d.kind === "max"
            ? (d.inclusive ? r.data > d.value : r.data >= d.value) &&
              ((l = this._getOrReturnCtx(r, l)),
              te(l, {
                code: b.too_big,
                maximum: d.value,
                type: "number",
                inclusive: d.inclusive,
                exact: !1,
                message: d.message,
              }),
              u.dirty())
            : d.kind === "multipleOf"
              ? wg(r.data, d.value) !== 0 &&
                ((l = this._getOrReturnCtx(r, l)),
                te(l, {
                  code: b.not_multiple_of,
                  multipleOf: d.value,
                  message: d.message,
                }),
                u.dirty())
              : d.kind === "finite"
                ? Number.isFinite(r.data) ||
                  ((l = this._getOrReturnCtx(r, l)),
                  te(l, { code: b.not_finite, message: d.message }),
                  u.dirty())
                : $e.assertNever(d);
    return { status: u.value, value: r.data };
  }
  gte(r, i) {
    return this.setLimit("min", r, !0, de.toString(i));
  }
  gt(r, i) {
    return this.setLimit("min", r, !1, de.toString(i));
  }
  lte(r, i) {
    return this.setLimit("max", r, !0, de.toString(i));
  }
  lt(r, i) {
    return this.setLimit("max", r, !1, de.toString(i));
  }
  setLimit(r, i, l, u) {
    return new si({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: r, value: i, inclusive: l, message: de.toString(u) },
      ],
    });
  }
  _addCheck(r) {
    return new si({ ...this._def, checks: [...this._def.checks, r] });
  }
  int(r) {
    return this._addCheck({ kind: "int", message: de.toString(r) });
  }
  positive(r) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: de.toString(r),
    });
  }
  negative(r) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: de.toString(r),
    });
  }
  nonpositive(r) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: de.toString(r),
    });
  }
  nonnegative(r) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: de.toString(r),
    });
  }
  multipleOf(r, i) {
    return this._addCheck({
      kind: "multipleOf",
      value: r,
      message: de.toString(i),
    });
  }
  finite(r) {
    return this._addCheck({ kind: "finite", message: de.toString(r) });
  }
  safe(r) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: de.toString(r),
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: de.toString(r),
    });
  }
  get minValue() {
    let r = null;
    for (const i of this._def.checks)
      i.kind === "min" && (r === null || i.value > r) && (r = i.value);
    return r;
  }
  get maxValue() {
    let r = null;
    for (const i of this._def.checks)
      i.kind === "max" && (r === null || i.value < r) && (r = i.value);
    return r;
  }
  get isInt() {
    return !!this._def.checks.find(
      (r) =>
        r.kind === "int" || (r.kind === "multipleOf" && $e.isInteger(r.value)),
    );
  }
  get isFinite() {
    let r = null,
      i = null;
    for (const l of this._def.checks) {
      if (l.kind === "finite" || l.kind === "int" || l.kind === "multipleOf")
        return !0;
      l.kind === "min"
        ? (i === null || l.value > i) && (i = l.value)
        : l.kind === "max" && (r === null || l.value < r) && (r = l.value);
    }
    return Number.isFinite(i) && Number.isFinite(r);
  }
}
si.create = (s) =>
  new si({
    checks: [],
    typeName: Ne.ZodNumber,
    coerce: s?.coerce || !1,
    ...Ae(s),
  });
class ii extends ze {
  constructor() {
    (super(...arguments), (this.min = this.gte), (this.max = this.lte));
  }
  _parse(r) {
    if (this._def.coerce)
      try {
        r.data = BigInt(r.data);
      } catch {
        return this._getInvalidInput(r);
      }
    if (this._getType(r) !== ue.bigint) return this._getInvalidInput(r);
    let l;
    const u = new Vt();
    for (const d of this._def.checks)
      d.kind === "min"
        ? (d.inclusive ? r.data < d.value : r.data <= d.value) &&
          ((l = this._getOrReturnCtx(r, l)),
          te(l, {
            code: b.too_small,
            type: "bigint",
            minimum: d.value,
            inclusive: d.inclusive,
            message: d.message,
          }),
          u.dirty())
        : d.kind === "max"
          ? (d.inclusive ? r.data > d.value : r.data >= d.value) &&
            ((l = this._getOrReturnCtx(r, l)),
            te(l, {
              code: b.too_big,
              type: "bigint",
              maximum: d.value,
              inclusive: d.inclusive,
              message: d.message,
            }),
            u.dirty())
          : d.kind === "multipleOf"
            ? r.data % d.value !== BigInt(0) &&
              ((l = this._getOrReturnCtx(r, l)),
              te(l, {
                code: b.not_multiple_of,
                multipleOf: d.value,
                message: d.message,
              }),
              u.dirty())
            : $e.assertNever(d);
    return { status: u.value, value: r.data };
  }
  _getInvalidInput(r) {
    const i = this._getOrReturnCtx(r);
    return (
      te(i, {
        code: b.invalid_type,
        expected: ue.bigint,
        received: i.parsedType,
      }),
      Ee
    );
  }
  gte(r, i) {
    return this.setLimit("min", r, !0, de.toString(i));
  }
  gt(r, i) {
    return this.setLimit("min", r, !1, de.toString(i));
  }
  lte(r, i) {
    return this.setLimit("max", r, !0, de.toString(i));
  }
  lt(r, i) {
    return this.setLimit("max", r, !1, de.toString(i));
  }
  setLimit(r, i, l, u) {
    return new ii({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: r, value: i, inclusive: l, message: de.toString(u) },
      ],
    });
  }
  _addCheck(r) {
    return new ii({ ...this._def, checks: [...this._def.checks, r] });
  }
  positive(r) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: de.toString(r),
    });
  }
  negative(r) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: de.toString(r),
    });
  }
  nonpositive(r) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: de.toString(r),
    });
  }
  nonnegative(r) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: de.toString(r),
    });
  }
  multipleOf(r, i) {
    return this._addCheck({
      kind: "multipleOf",
      value: r,
      message: de.toString(i),
    });
  }
  get minValue() {
    let r = null;
    for (const i of this._def.checks)
      i.kind === "min" && (r === null || i.value > r) && (r = i.value);
    return r;
  }
  get maxValue() {
    let r = null;
    for (const i of this._def.checks)
      i.kind === "max" && (r === null || i.value < r) && (r = i.value);
    return r;
  }
}
ii.create = (s) =>
  new ii({
    checks: [],
    typeName: Ne.ZodBigInt,
    coerce: s?.coerce ?? !1,
    ...Ae(s),
  });
class Vf extends ze {
  _parse(r) {
    if (
      (this._def.coerce && (r.data = !!r.data), this._getType(r) !== ue.boolean)
    ) {
      const l = this._getOrReturnCtx(r);
      return (
        te(l, {
          code: b.invalid_type,
          expected: ue.boolean,
          received: l.parsedType,
        }),
        Ee
      );
    }
    return Ht(r.data);
  }
}
Vf.create = (s) =>
  new Vf({ typeName: Ne.ZodBoolean, coerce: s?.coerce || !1, ...Ae(s) });
class Ca extends ze {
  _parse(r) {
    if (
      (this._def.coerce && (r.data = new Date(r.data)),
      this._getType(r) !== ue.date)
    ) {
      const d = this._getOrReturnCtx(r);
      return (
        te(d, {
          code: b.invalid_type,
          expected: ue.date,
          received: d.parsedType,
        }),
        Ee
      );
    }
    if (Number.isNaN(r.data.getTime())) {
      const d = this._getOrReturnCtx(r);
      return (te(d, { code: b.invalid_date }), Ee);
    }
    const l = new Vt();
    let u;
    for (const d of this._def.checks)
      d.kind === "min"
        ? r.data.getTime() < d.value &&
          ((u = this._getOrReturnCtx(r, u)),
          te(u, {
            code: b.too_small,
            message: d.message,
            inclusive: !0,
            exact: !1,
            minimum: d.value,
            type: "date",
          }),
          l.dirty())
        : d.kind === "max"
          ? r.data.getTime() > d.value &&
            ((u = this._getOrReturnCtx(r, u)),
            te(u, {
              code: b.too_big,
              message: d.message,
              inclusive: !0,
              exact: !1,
              maximum: d.value,
              type: "date",
            }),
            l.dirty())
          : $e.assertNever(d);
    return { status: l.value, value: new Date(r.data.getTime()) };
  }
  _addCheck(r) {
    return new Ca({ ...this._def, checks: [...this._def.checks, r] });
  }
  min(r, i) {
    return this._addCheck({
      kind: "min",
      value: r.getTime(),
      message: de.toString(i),
    });
  }
  max(r, i) {
    return this._addCheck({
      kind: "max",
      value: r.getTime(),
      message: de.toString(i),
    });
  }
  get minDate() {
    let r = null;
    for (const i of this._def.checks)
      i.kind === "min" && (r === null || i.value > r) && (r = i.value);
    return r != null ? new Date(r) : null;
  }
  get maxDate() {
    let r = null;
    for (const i of this._def.checks)
      i.kind === "max" && (r === null || i.value < r) && (r = i.value);
    return r != null ? new Date(r) : null;
  }
}
Ca.create = (s) =>
  new Ca({
    checks: [],
    coerce: s?.coerce || !1,
    typeName: Ne.ZodDate,
    ...Ae(s),
  });
class zf extends ze {
  _parse(r) {
    if (this._getType(r) !== ue.symbol) {
      const l = this._getOrReturnCtx(r);
      return (
        te(l, {
          code: b.invalid_type,
          expected: ue.symbol,
          received: l.parsedType,
        }),
        Ee
      );
    }
    return Ht(r.data);
  }
}
zf.create = (s) => new zf({ typeName: Ne.ZodSymbol, ...Ae(s) });
class Uf extends ze {
  _parse(r) {
    if (this._getType(r) !== ue.undefined) {
      const l = this._getOrReturnCtx(r);
      return (
        te(l, {
          code: b.invalid_type,
          expected: ue.undefined,
          received: l.parsedType,
        }),
        Ee
      );
    }
    return Ht(r.data);
  }
}
Uf.create = (s) => new Uf({ typeName: Ne.ZodUndefined, ...Ae(s) });
class $f extends ze {
  _parse(r) {
    if (this._getType(r) !== ue.null) {
      const l = this._getOrReturnCtx(r);
      return (
        te(l, {
          code: b.invalid_type,
          expected: ue.null,
          received: l.parsedType,
        }),
        Ee
      );
    }
    return Ht(r.data);
  }
}
$f.create = (s) => new $f({ typeName: Ne.ZodNull, ...Ae(s) });
class bf extends ze {
  constructor() {
    (super(...arguments), (this._any = !0));
  }
  _parse(r) {
    return Ht(r.data);
  }
}
bf.create = (s) => new bf({ typeName: Ne.ZodAny, ...Ae(s) });
class Bf extends ze {
  constructor() {
    (super(...arguments), (this._unknown = !0));
  }
  _parse(r) {
    return Ht(r.data);
  }
}
Bf.create = (s) => new Bf({ typeName: Ne.ZodUnknown, ...Ae(s) });
class nr extends ze {
  _parse(r) {
    const i = this._getOrReturnCtx(r);
    return (
      te(i, {
        code: b.invalid_type,
        expected: ue.never,
        received: i.parsedType,
      }),
      Ee
    );
  }
}
nr.create = (s) => new nr({ typeName: Ne.ZodNever, ...Ae(s) });
class Wf extends ze {
  _parse(r) {
    if (this._getType(r) !== ue.undefined) {
      const l = this._getOrReturnCtx(r);
      return (
        te(l, {
          code: b.invalid_type,
          expected: ue.void,
          received: l.parsedType,
        }),
        Ee
      );
    }
    return Ht(r.data);
  }
}
Wf.create = (s) => new Wf({ typeName: Ne.ZodVoid, ...Ae(s) });
class dn extends ze {
  _parse(r) {
    const { ctx: i, status: l } = this._processInputParams(r),
      u = this._def;
    if (i.parsedType !== ue.array)
      return (
        te(i, {
          code: b.invalid_type,
          expected: ue.array,
          received: i.parsedType,
        }),
        Ee
      );
    if (u.exactLength !== null) {
      const p = i.data.length > u.exactLength.value,
        m = i.data.length < u.exactLength.value;
      (p || m) &&
        (te(i, {
          code: p ? b.too_big : b.too_small,
          minimum: m ? u.exactLength.value : void 0,
          maximum: p ? u.exactLength.value : void 0,
          type: "array",
          inclusive: !0,
          exact: !0,
          message: u.exactLength.message,
        }),
        l.dirty());
    }
    if (
      (u.minLength !== null &&
        i.data.length < u.minLength.value &&
        (te(i, {
          code: b.too_small,
          minimum: u.minLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: u.minLength.message,
        }),
        l.dirty()),
      u.maxLength !== null &&
        i.data.length > u.maxLength.value &&
        (te(i, {
          code: b.too_big,
          maximum: u.maxLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: u.maxLength.message,
        }),
        l.dirty()),
      i.common.async)
    )
      return Promise.all(
        [...i.data].map((p, m) => u.type._parseAsync(new tr(i, p, i.path, m))),
      ).then((p) => Vt.mergeArray(l, p));
    const d = [...i.data].map((p, m) =>
      u.type._parseSync(new tr(i, p, i.path, m)),
    );
    return Vt.mergeArray(l, d);
  }
  get element() {
    return this._def.type;
  }
  min(r, i) {
    return new dn({
      ...this._def,
      minLength: { value: r, message: de.toString(i) },
    });
  }
  max(r, i) {
    return new dn({
      ...this._def,
      maxLength: { value: r, message: de.toString(i) },
    });
  }
  length(r, i) {
    return new dn({
      ...this._def,
      exactLength: { value: r, message: de.toString(i) },
    });
  }
  nonempty(r) {
    return this.min(1, r);
  }
}
dn.create = (s, r) =>
  new dn({
    type: s,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: Ne.ZodArray,
    ...Ae(r),
  });
function ts(s) {
  if (s instanceof it) {
    const r = {};
    for (const i in s.shape) {
      const l = s.shape[i];
      r[i] = er.create(ts(l));
    }
    return new it({ ...s._def, shape: () => r });
  } else
    return s instanceof dn
      ? new dn({ ...s._def, type: ts(s.element) })
      : s instanceof er
        ? er.create(ts(s.unwrap()))
        : s instanceof as
          ? as.create(ts(s.unwrap()))
          : s instanceof wr
            ? wr.create(s.items.map((r) => ts(r)))
            : s;
}
class it extends ze {
  constructor() {
    (super(...arguments),
      (this._cached = null),
      (this.nonstrict = this.passthrough),
      (this.augment = this.extend));
  }
  _getCached() {
    if (this._cached !== null) return this._cached;
    const r = this._def.shape(),
      i = $e.objectKeys(r);
    return ((this._cached = { shape: r, keys: i }), this._cached);
  }
  _parse(r) {
    if (this._getType(r) !== ue.object) {
      const w = this._getOrReturnCtx(r);
      return (
        te(w, {
          code: b.invalid_type,
          expected: ue.object,
          received: w.parsedType,
        }),
        Ee
      );
    }
    const { status: l, ctx: u } = this._processInputParams(r),
      { shape: d, keys: p } = this._getCached(),
      m = [];
    if (
      !(this._def.catchall instanceof nr && this._def.unknownKeys === "strip")
    )
      for (const w in u.data) p.includes(w) || m.push(w);
    const x = [];
    for (const w of p) {
      const S = d[w],
        N = u.data[w];
      x.push({
        key: { status: "valid", value: w },
        value: S._parse(new tr(u, N, u.path, w)),
        alwaysSet: w in u.data,
      });
    }
    if (this._def.catchall instanceof nr) {
      const w = this._def.unknownKeys;
      if (w === "passthrough")
        for (const S of m)
          x.push({
            key: { status: "valid", value: S },
            value: { status: "valid", value: u.data[S] },
          });
      else if (w === "strict")
        m.length > 0 &&
          (te(u, { code: b.unrecognized_keys, keys: m }), l.dirty());
      else if (w !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const w = this._def.catchall;
      for (const S of m) {
        const N = u.data[S];
        x.push({
          key: { status: "valid", value: S },
          value: w._parse(new tr(u, N, u.path, S)),
          alwaysSet: S in u.data,
        });
      }
    }
    return u.common.async
      ? Promise.resolve()
          .then(async () => {
            const w = [];
            for (const S of x) {
              const N = await S.key,
                I = await S.value;
              w.push({ key: N, value: I, alwaysSet: S.alwaysSet });
            }
            return w;
          })
          .then((w) => Vt.mergeObjectSync(l, w))
      : Vt.mergeObjectSync(l, x);
  }
  get shape() {
    return this._def.shape();
  }
  strict(r) {
    return (
      de.errToObj,
      new it({
        ...this._def,
        unknownKeys: "strict",
        ...(r !== void 0
          ? {
              errorMap: (i, l) => {
                const u = this._def.errorMap?.(i, l).message ?? l.defaultError;
                return i.code === "unrecognized_keys"
                  ? { message: de.errToObj(r).message ?? u }
                  : { message: u };
              },
            }
          : {}),
      })
    );
  }
  strip() {
    return new it({ ...this._def, unknownKeys: "strip" });
  }
  passthrough() {
    return new it({ ...this._def, unknownKeys: "passthrough" });
  }
  extend(r) {
    return new it({
      ...this._def,
      shape: () => ({ ...this._def.shape(), ...r }),
    });
  }
  merge(r) {
    return new it({
      unknownKeys: r._def.unknownKeys,
      catchall: r._def.catchall,
      shape: () => ({ ...this._def.shape(), ...r._def.shape() }),
      typeName: Ne.ZodObject,
    });
  }
  setKey(r, i) {
    return this.augment({ [r]: i });
  }
  catchall(r) {
    return new it({ ...this._def, catchall: r });
  }
  pick(r) {
    const i = {};
    for (const l of $e.objectKeys(r))
      r[l] && this.shape[l] && (i[l] = this.shape[l]);
    return new it({ ...this._def, shape: () => i });
  }
  omit(r) {
    const i = {};
    for (const l of $e.objectKeys(this.shape)) r[l] || (i[l] = this.shape[l]);
    return new it({ ...this._def, shape: () => i });
  }
  deepPartial() {
    return ts(this);
  }
  partial(r) {
    const i = {};
    for (const l of $e.objectKeys(this.shape)) {
      const u = this.shape[l];
      r && !r[l] ? (i[l] = u) : (i[l] = u.optional());
    }
    return new it({ ...this._def, shape: () => i });
  }
  required(r) {
    const i = {};
    for (const l of $e.objectKeys(this.shape))
      if (r && !r[l]) i[l] = this.shape[l];
      else {
        let d = this.shape[l];
        for (; d instanceof er; ) d = d._def.innerType;
        i[l] = d;
      }
    return new it({ ...this._def, shape: () => i });
  }
  keyof() {
    return Rp($e.objectKeys(this.shape));
  }
}
it.create = (s, r) =>
  new it({
    shape: () => s,
    unknownKeys: "strip",
    catchall: nr.create(),
    typeName: Ne.ZodObject,
    ...Ae(r),
  });
it.strictCreate = (s, r) =>
  new it({
    shape: () => s,
    unknownKeys: "strict",
    catchall: nr.create(),
    typeName: Ne.ZodObject,
    ...Ae(r),
  });
it.lazycreate = (s, r) =>
  new it({
    shape: s,
    unknownKeys: "strip",
    catchall: nr.create(),
    typeName: Ne.ZodObject,
    ...Ae(r),
  });
class ja extends ze {
  _parse(r) {
    const { ctx: i } = this._processInputParams(r),
      l = this._def.options;
    function u(d) {
      for (const m of d) if (m.result.status === "valid") return m.result;
      for (const m of d)
        if (m.result.status === "dirty")
          return (i.common.issues.push(...m.ctx.common.issues), m.result);
      const p = d.map((m) => new Nn(m.ctx.common.issues));
      return (te(i, { code: b.invalid_union, unionErrors: p }), Ee);
    }
    if (i.common.async)
      return Promise.all(
        l.map(async (d) => {
          const p = { ...i, common: { ...i.common, issues: [] }, parent: null };
          return {
            result: await d._parseAsync({
              data: i.data,
              path: i.path,
              parent: p,
            }),
            ctx: p,
          };
        }),
      ).then(u);
    {
      let d;
      const p = [];
      for (const x of l) {
        const w = { ...i, common: { ...i.common, issues: [] }, parent: null },
          S = x._parseSync({ data: i.data, path: i.path, parent: w });
        if (S.status === "valid") return S;
        (S.status === "dirty" && !d && (d = { result: S, ctx: w }),
          w.common.issues.length && p.push(w.common.issues));
      }
      if (d) return (i.common.issues.push(...d.ctx.common.issues), d.result);
      const m = p.map((x) => new Nn(x));
      return (te(i, { code: b.invalid_union, unionErrors: m }), Ee);
    }
  }
  get options() {
    return this._def.options;
  }
}
ja.create = (s, r) => new ja({ options: s, typeName: Ne.ZodUnion, ...Ae(r) });
function qo(s, r) {
  const i = Jn(s),
    l = Jn(r);
  if (s === r) return { valid: !0, data: s };
  if (i === ue.object && l === ue.object) {
    const u = $e.objectKeys(r),
      d = $e.objectKeys(s).filter((m) => u.indexOf(m) !== -1),
      p = { ...s, ...r };
    for (const m of d) {
      const x = qo(s[m], r[m]);
      if (!x.valid) return { valid: !1 };
      p[m] = x.data;
    }
    return { valid: !0, data: p };
  } else if (i === ue.array && l === ue.array) {
    if (s.length !== r.length) return { valid: !1 };
    const u = [];
    for (let d = 0; d < s.length; d++) {
      const p = s[d],
        m = r[d],
        x = qo(p, m);
      if (!x.valid) return { valid: !1 };
      u.push(x.data);
    }
    return { valid: !0, data: u };
  } else
    return i === ue.date && l === ue.date && +s == +r
      ? { valid: !0, data: s }
      : { valid: !1 };
}
class Ta extends ze {
  _parse(r) {
    const { status: i, ctx: l } = this._processInputParams(r),
      u = (d, p) => {
        if (Lf(d) || Lf(p)) return Ee;
        const m = qo(d.value, p.value);
        return m.valid
          ? ((Ff(d) || Ff(p)) && i.dirty(), { status: i.value, value: m.data })
          : (te(l, { code: b.invalid_intersection_types }), Ee);
      };
    return l.common.async
      ? Promise.all([
          this._def.left._parseAsync({ data: l.data, path: l.path, parent: l }),
          this._def.right._parseAsync({
            data: l.data,
            path: l.path,
            parent: l,
          }),
        ]).then(([d, p]) => u(d, p))
      : u(
          this._def.left._parseSync({ data: l.data, path: l.path, parent: l }),
          this._def.right._parseSync({ data: l.data, path: l.path, parent: l }),
        );
  }
}
Ta.create = (s, r, i) =>
  new Ta({ left: s, right: r, typeName: Ne.ZodIntersection, ...Ae(i) });
class wr extends ze {
  _parse(r) {
    const { status: i, ctx: l } = this._processInputParams(r);
    if (l.parsedType !== ue.array)
      return (
        te(l, {
          code: b.invalid_type,
          expected: ue.array,
          received: l.parsedType,
        }),
        Ee
      );
    if (l.data.length < this._def.items.length)
      return (
        te(l, {
          code: b.too_small,
          minimum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: "array",
        }),
        Ee
      );
    !this._def.rest &&
      l.data.length > this._def.items.length &&
      (te(l, {
        code: b.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array",
      }),
      i.dirty());
    const d = [...l.data]
      .map((p, m) => {
        const x = this._def.items[m] || this._def.rest;
        return x ? x._parse(new tr(l, p, l.path, m)) : null;
      })
      .filter((p) => !!p);
    return l.common.async
      ? Promise.all(d).then((p) => Vt.mergeArray(i, p))
      : Vt.mergeArray(i, d);
  }
  get items() {
    return this._def.items;
  }
  rest(r) {
    return new wr({ ...this._def, rest: r });
  }
}
wr.create = (s, r) => {
  if (!Array.isArray(s))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new wr({ items: s, typeName: Ne.ZodTuple, rest: null, ...Ae(r) });
};
class Zf extends ze {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(r) {
    const { status: i, ctx: l } = this._processInputParams(r);
    if (l.parsedType !== ue.map)
      return (
        te(l, {
          code: b.invalid_type,
          expected: ue.map,
          received: l.parsedType,
        }),
        Ee
      );
    const u = this._def.keyType,
      d = this._def.valueType,
      p = [...l.data.entries()].map(([m, x], w) => ({
        key: u._parse(new tr(l, m, l.path, [w, "key"])),
        value: d._parse(new tr(l, x, l.path, [w, "value"])),
      }));
    if (l.common.async) {
      const m = new Map();
      return Promise.resolve().then(async () => {
        for (const x of p) {
          const w = await x.key,
            S = await x.value;
          if (w.status === "aborted" || S.status === "aborted") return Ee;
          ((w.status === "dirty" || S.status === "dirty") && i.dirty(),
            m.set(w.value, S.value));
        }
        return { status: i.value, value: m };
      });
    } else {
      const m = new Map();
      for (const x of p) {
        const w = x.key,
          S = x.value;
        if (w.status === "aborted" || S.status === "aborted") return Ee;
        ((w.status === "dirty" || S.status === "dirty") && i.dirty(),
          m.set(w.value, S.value));
      }
      return { status: i.value, value: m };
    }
  }
}
Zf.create = (s, r, i) =>
  new Zf({ valueType: r, keyType: s, typeName: Ne.ZodMap, ...Ae(i) });
class ai extends ze {
  _parse(r) {
    const { status: i, ctx: l } = this._processInputParams(r);
    if (l.parsedType !== ue.set)
      return (
        te(l, {
          code: b.invalid_type,
          expected: ue.set,
          received: l.parsedType,
        }),
        Ee
      );
    const u = this._def;
    (u.minSize !== null &&
      l.data.size < u.minSize.value &&
      (te(l, {
        code: b.too_small,
        minimum: u.minSize.value,
        type: "set",
        inclusive: !0,
        exact: !1,
        message: u.minSize.message,
      }),
      i.dirty()),
      u.maxSize !== null &&
        l.data.size > u.maxSize.value &&
        (te(l, {
          code: b.too_big,
          maximum: u.maxSize.value,
          type: "set",
          inclusive: !0,
          exact: !1,
          message: u.maxSize.message,
        }),
        i.dirty()));
    const d = this._def.valueType;
    function p(x) {
      const w = new Set();
      for (const S of x) {
        if (S.status === "aborted") return Ee;
        (S.status === "dirty" && i.dirty(), w.add(S.value));
      }
      return { status: i.value, value: w };
    }
    const m = [...l.data.values()].map((x, w) =>
      d._parse(new tr(l, x, l.path, w)),
    );
    return l.common.async ? Promise.all(m).then((x) => p(x)) : p(m);
  }
  min(r, i) {
    return new ai({
      ...this._def,
      minSize: { value: r, message: de.toString(i) },
    });
  }
  max(r, i) {
    return new ai({
      ...this._def,
      maxSize: { value: r, message: de.toString(i) },
    });
  }
  size(r, i) {
    return this.min(r, i).max(r, i);
  }
  nonempty(r) {
    return this.min(1, r);
  }
}
ai.create = (s, r) =>
  new ai({
    valueType: s,
    minSize: null,
    maxSize: null,
    typeName: Ne.ZodSet,
    ...Ae(r),
  });
class Hf extends ze {
  get schema() {
    return this._def.getter();
  }
  _parse(r) {
    const { ctx: i } = this._processInputParams(r);
    return this._def.getter()._parse({ data: i.data, path: i.path, parent: i });
  }
}
Hf.create = (s, r) => new Hf({ getter: s, typeName: Ne.ZodLazy, ...Ae(r) });
class Jo extends ze {
  _parse(r) {
    if (r.data !== this._def.value) {
      const i = this._getOrReturnCtx(r);
      return (
        te(i, {
          received: i.data,
          code: b.invalid_literal,
          expected: this._def.value,
        }),
        Ee
      );
    }
    return { status: "valid", value: r.data };
  }
  get value() {
    return this._def.value;
  }
}
Jo.create = (s, r) => new Jo({ value: s, typeName: Ne.ZodLiteral, ...Ae(r) });
function Rp(s, r) {
  return new ss({ values: s, typeName: Ne.ZodEnum, ...Ae(r) });
}
class ss extends ze {
  _parse(r) {
    if (typeof r.data != "string") {
      const i = this._getOrReturnCtx(r),
        l = this._def.values;
      return (
        te(i, {
          expected: $e.joinValues(l),
          received: i.parsedType,
          code: b.invalid_type,
        }),
        Ee
      );
    }
    if (
      (this._cache || (this._cache = new Set(this._def.values)),
      !this._cache.has(r.data))
    ) {
      const i = this._getOrReturnCtx(r),
        l = this._def.values;
      return (
        te(i, { received: i.data, code: b.invalid_enum_value, options: l }),
        Ee
      );
    }
    return Ht(r.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const r = {};
    for (const i of this._def.values) r[i] = i;
    return r;
  }
  get Values() {
    const r = {};
    for (const i of this._def.values) r[i] = i;
    return r;
  }
  get Enum() {
    const r = {};
    for (const i of this._def.values) r[i] = i;
    return r;
  }
  extract(r, i = this._def) {
    return ss.create(r, { ...this._def, ...i });
  }
  exclude(r, i = this._def) {
    return ss.create(
      this.options.filter((l) => !r.includes(l)),
      { ...this._def, ...i },
    );
  }
}
ss.create = Rp;
class Qf extends ze {
  _parse(r) {
    const i = $e.getValidEnumValues(this._def.values),
      l = this._getOrReturnCtx(r);
    if (l.parsedType !== ue.string && l.parsedType !== ue.number) {
      const u = $e.objectValues(i);
      return (
        te(l, {
          expected: $e.joinValues(u),
          received: l.parsedType,
          code: b.invalid_type,
        }),
        Ee
      );
    }
    if (
      (this._cache ||
        (this._cache = new Set($e.getValidEnumValues(this._def.values))),
      !this._cache.has(r.data))
    ) {
      const u = $e.objectValues(i);
      return (
        te(l, { received: l.data, code: b.invalid_enum_value, options: u }),
        Ee
      );
    }
    return Ht(r.data);
  }
  get enum() {
    return this._def.values;
  }
}
Qf.create = (s, r) =>
  new Qf({ values: s, typeName: Ne.ZodNativeEnum, ...Ae(r) });
class Pa extends ze {
  unwrap() {
    return this._def.type;
  }
  _parse(r) {
    const { ctx: i } = this._processInputParams(r);
    if (i.parsedType !== ue.promise && i.common.async === !1)
      return (
        te(i, {
          code: b.invalid_type,
          expected: ue.promise,
          received: i.parsedType,
        }),
        Ee
      );
    const l = i.parsedType === ue.promise ? i.data : Promise.resolve(i.data);
    return Ht(
      l.then((u) =>
        this._def.type.parseAsync(u, {
          path: i.path,
          errorMap: i.common.contextualErrorMap,
        }),
      ),
    );
  }
}
Pa.create = (s, r) => new Pa({ type: s, typeName: Ne.ZodPromise, ...Ae(r) });
class is extends ze {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === Ne.ZodEffects
      ? this._def.schema.sourceType()
      : this._def.schema;
  }
  _parse(r) {
    const { status: i, ctx: l } = this._processInputParams(r),
      u = this._def.effect || null,
      d = {
        addIssue: (p) => {
          (te(l, p), p.fatal ? i.abort() : i.dirty());
        },
        get path() {
          return l.path;
        },
      };
    if (((d.addIssue = d.addIssue.bind(d)), u.type === "preprocess")) {
      const p = u.transform(l.data, d);
      if (l.common.async)
        return Promise.resolve(p).then(async (m) => {
          if (i.value === "aborted") return Ee;
          const x = await this._def.schema._parseAsync({
            data: m,
            path: l.path,
            parent: l,
          });
          return x.status === "aborted"
            ? Ee
            : x.status === "dirty" || i.value === "dirty"
              ? Gs(x.value)
              : x;
        });
      {
        if (i.value === "aborted") return Ee;
        const m = this._def.schema._parseSync({
          data: p,
          path: l.path,
          parent: l,
        });
        return m.status === "aborted"
          ? Ee
          : m.status === "dirty" || i.value === "dirty"
            ? Gs(m.value)
            : m;
      }
    }
    if (u.type === "refinement") {
      const p = (m) => {
        const x = u.refinement(m, d);
        if (l.common.async) return Promise.resolve(x);
        if (x instanceof Promise)
          throw new Error(
            "Async refinement encountered during synchronous parse operation. Use .parseAsync instead.",
          );
        return m;
      };
      if (l.common.async === !1) {
        const m = this._def.schema._parseSync({
          data: l.data,
          path: l.path,
          parent: l,
        });
        return m.status === "aborted"
          ? Ee
          : (m.status === "dirty" && i.dirty(),
            p(m.value),
            { status: i.value, value: m.value });
      } else
        return this._def.schema
          ._parseAsync({ data: l.data, path: l.path, parent: l })
          .then((m) =>
            m.status === "aborted"
              ? Ee
              : (m.status === "dirty" && i.dirty(),
                p(m.value).then(() => ({ status: i.value, value: m.value }))),
          );
    }
    if (u.type === "transform")
      if (l.common.async === !1) {
        const p = this._def.schema._parseSync({
          data: l.data,
          path: l.path,
          parent: l,
        });
        if (!rs(p)) return Ee;
        const m = u.transform(p.value, d);
        if (m instanceof Promise)
          throw new Error(
            "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.",
          );
        return { status: i.value, value: m };
      } else
        return this._def.schema
          ._parseAsync({ data: l.data, path: l.path, parent: l })
          .then((p) =>
            rs(p)
              ? Promise.resolve(u.transform(p.value, d)).then((m) => ({
                  status: i.value,
                  value: m,
                }))
              : Ee,
          );
    $e.assertNever(u);
  }
}
is.create = (s, r, i) =>
  new is({ schema: s, typeName: Ne.ZodEffects, effect: r, ...Ae(i) });
is.createWithPreprocess = (s, r, i) =>
  new is({
    schema: r,
    effect: { type: "preprocess", transform: s },
    typeName: Ne.ZodEffects,
    ...Ae(i),
  });
class er extends ze {
  _parse(r) {
    return this._getType(r) === ue.undefined
      ? Ht(void 0)
      : this._def.innerType._parse(r);
  }
  unwrap() {
    return this._def.innerType;
  }
}
er.create = (s, r) =>
  new er({ innerType: s, typeName: Ne.ZodOptional, ...Ae(r) });
class as extends ze {
  _parse(r) {
    return this._getType(r) === ue.null
      ? Ht(null)
      : this._def.innerType._parse(r);
  }
  unwrap() {
    return this._def.innerType;
  }
}
as.create = (s, r) =>
  new as({ innerType: s, typeName: Ne.ZodNullable, ...Ae(r) });
class Yo extends ze {
  _parse(r) {
    const { ctx: i } = this._processInputParams(r);
    let l = i.data;
    return (
      i.parsedType === ue.undefined && (l = this._def.defaultValue()),
      this._def.innerType._parse({ data: l, path: i.path, parent: i })
    );
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Yo.create = (s, r) =>
  new Yo({
    innerType: s,
    typeName: Ne.ZodDefault,
    defaultValue: typeof r.default == "function" ? r.default : () => r.default,
    ...Ae(r),
  });
class Go extends ze {
  _parse(r) {
    const { ctx: i } = this._processInputParams(r),
      l = { ...i, common: { ...i.common, issues: [] } },
      u = this._def.innerType._parse({
        data: l.data,
        path: l.path,
        parent: { ...l },
      });
    return Na(u)
      ? u.then((d) => ({
          status: "valid",
          value:
            d.status === "valid"
              ? d.value
              : this._def.catchValue({
                  get error() {
                    return new Nn(l.common.issues);
                  },
                  input: l.data,
                }),
        }))
      : {
          status: "valid",
          value:
            u.status === "valid"
              ? u.value
              : this._def.catchValue({
                  get error() {
                    return new Nn(l.common.issues);
                  },
                  input: l.data,
                }),
        };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Go.create = (s, r) =>
  new Go({
    innerType: s,
    typeName: Ne.ZodCatch,
    catchValue: typeof r.catch == "function" ? r.catch : () => r.catch,
    ...Ae(r),
  });
class Kf extends ze {
  _parse(r) {
    if (this._getType(r) !== ue.nan) {
      const l = this._getOrReturnCtx(r);
      return (
        te(l, {
          code: b.invalid_type,
          expected: ue.nan,
          received: l.parsedType,
        }),
        Ee
      );
    }
    return { status: "valid", value: r.data };
  }
}
Kf.create = (s) => new Kf({ typeName: Ne.ZodNaN, ...Ae(s) });
class _g extends ze {
  _parse(r) {
    const { ctx: i } = this._processInputParams(r),
      l = i.data;
    return this._def.type._parse({ data: l, path: i.path, parent: i });
  }
  unwrap() {
    return this._def.type;
  }
}
class du extends ze {
  _parse(r) {
    const { status: i, ctx: l } = this._processInputParams(r);
    if (l.common.async)
      return (async () => {
        const d = await this._def.in._parseAsync({
          data: l.data,
          path: l.path,
          parent: l,
        });
        return d.status === "aborted"
          ? Ee
          : d.status === "dirty"
            ? (i.dirty(), Gs(d.value))
            : this._def.out._parseAsync({
                data: d.value,
                path: l.path,
                parent: l,
              });
      })();
    {
      const u = this._def.in._parseSync({
        data: l.data,
        path: l.path,
        parent: l,
      });
      return u.status === "aborted"
        ? Ee
        : u.status === "dirty"
          ? (i.dirty(), { status: "dirty", value: u.value })
          : this._def.out._parseSync({
              data: u.value,
              path: l.path,
              parent: l,
            });
    }
  }
  static create(r, i) {
    return new du({ in: r, out: i, typeName: Ne.ZodPipeline });
  }
}
class Xo extends ze {
  _parse(r) {
    const i = this._def.innerType._parse(r),
      l = (u) => (rs(u) && (u.value = Object.freeze(u.value)), u);
    return Na(i) ? i.then((u) => l(u)) : l(i);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Xo.create = (s, r) =>
  new Xo({ innerType: s, typeName: Ne.ZodReadonly, ...Ae(r) });
var Ne;
(function (s) {
  ((s.ZodString = "ZodString"),
    (s.ZodNumber = "ZodNumber"),
    (s.ZodNaN = "ZodNaN"),
    (s.ZodBigInt = "ZodBigInt"),
    (s.ZodBoolean = "ZodBoolean"),
    (s.ZodDate = "ZodDate"),
    (s.ZodSymbol = "ZodSymbol"),
    (s.ZodUndefined = "ZodUndefined"),
    (s.ZodNull = "ZodNull"),
    (s.ZodAny = "ZodAny"),
    (s.ZodUnknown = "ZodUnknown"),
    (s.ZodNever = "ZodNever"),
    (s.ZodVoid = "ZodVoid"),
    (s.ZodArray = "ZodArray"),
    (s.ZodObject = "ZodObject"),
    (s.ZodUnion = "ZodUnion"),
    (s.ZodDiscriminatedUnion = "ZodDiscriminatedUnion"),
    (s.ZodIntersection = "ZodIntersection"),
    (s.ZodTuple = "ZodTuple"),
    (s.ZodRecord = "ZodRecord"),
    (s.ZodMap = "ZodMap"),
    (s.ZodSet = "ZodSet"),
    (s.ZodFunction = "ZodFunction"),
    (s.ZodLazy = "ZodLazy"),
    (s.ZodLiteral = "ZodLiteral"),
    (s.ZodEnum = "ZodEnum"),
    (s.ZodEffects = "ZodEffects"),
    (s.ZodNativeEnum = "ZodNativeEnum"),
    (s.ZodOptional = "ZodOptional"),
    (s.ZodNullable = "ZodNullable"),
    (s.ZodDefault = "ZodDefault"),
    (s.ZodCatch = "ZodCatch"),
    (s.ZodPromise = "ZodPromise"),
    (s.ZodBranded = "ZodBranded"),
    (s.ZodPipeline = "ZodPipeline"),
    (s.ZodReadonly = "ZodReadonly"));
})(Ne || (Ne = {}));
const Sn = Gn.create;
nr.create;
const qf = dn.create,
  kg = it.create;
ja.create;
Ta.create;
wr.create;
const Gr = Jo.create;
ss.create;
Pa.create;
er.create;
as.create;
const Sg = () => {
    const r = import.meta.env?.VITE_API_BASE_URL;
    return typeof r == "string" && r.trim().length > 0
      ? r
      : "http://127.0.0.1:3030/api";
  },
  Eg = (s) => {
    const r = Sg();
    return `${r.endsWith("/") ? r.slice(0, -1) : r}${s}`;
  },
  Ng = async (s) => {
    const r = await fetch(Eg(`/patients/${s}/events`), {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!r.ok) {
      const l = await r.text().catch(() => "");
      throw new Error(l || "Não foi possível carregar a timeline");
    }
    const i = await r.json();
    return Array.isArray(i.items) ? i.items : [];
  },
  fu = pp((s, r) => ({
    activePatientId: null,
    eventsByPatient: {},
    isLoading: !1,
    error: void 0,
    async setActivePatient(i) {
      if ((s({ activePatientId: i }), !i)) {
        s({ isLoading: !1, error: void 0 });
        return;
      }
      await r().refreshEvents(i);
    },
    async refreshEvents(i) {
      s({ isLoading: !0, error: void 0 });
      try {
        const l = await Ng(i);
        s((u) => ({
          eventsByPatient: { ...u.eventsByPatient, [i]: l },
          isLoading: !1,
          error: void 0,
        }));
      } catch (l) {
        s({
          isLoading: !1,
          error:
            l instanceof Error
              ? l.message
              : "Erro desconhecido ao carregar eventos",
        });
      }
    },
    clearError() {
      s({ error: void 0 });
    },
    dropPatientEvents(i) {
      s((l) => {
        const u = { ...l.eventsByPatient };
        return (delete u[i], { eventsByPatient: u });
      });
    },
  })),
  Cg = () => {
    const r = import.meta.env?.VITE_API_BASE_URL;
    return typeof r == "string" && r.trim().length > 0 ? r : "/api/v1";
  },
  jg = (() => {
    const s = Cg();
    return s.endsWith("/") ? s.slice(0, -1) : s;
  })(),
  Tg = kg({
    name: Sn().trim().min(1, "Informe o nome").max(160),
    document: Sn().trim().max(32).optional().or(Gr("")).default(""),
    birthDate: Sn().trim().max(32).optional().or(Gr("")).default(""),
    contactPhone: Sn().trim().max(64).optional().or(Gr("")).default(""),
    contactEmail: Sn()
      .trim()
      .email("E-mail inválido")
      .max(120)
      .optional()
      .or(Gr(""))
      .default(""),
    contactNotes: Sn().trim().max(280).optional().or(Gr("")).default(""),
    payer: Sn().trim().max(120).optional().or(Gr("")).default(""),
    allergies: qf(Sn().trim().min(1).max(80)).default([]),
    tags: qf(Sn().trim().min(1).max(60)).default([]),
  }),
  ya = {
    name: "",
    document: "",
    birthDate: "",
    contactPhone: "",
    contactEmail: "",
    contactNotes: "",
    payer: "",
    allergies: [],
    tags: [],
  },
  Pg = (s) => `${jg}${s}`,
  qs = async (s, r) => {
    const i = await fetch(Pg(s), {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(r?.headers ?? {}),
      },
      ...r,
    });
    if (!i.ok) {
      let d;
      try {
        const m = await i.json();
        if (m && typeof m == "object") {
          const x = m,
            w = x.detail ?? x.error;
          typeof w == "string" && w.trim().length > 0 && (d = w);
        }
      } catch {
        d = void 0;
      }
      const p = i.statusText?.trim().length ? i.statusText : void 0;
      throw new Error(d || p || "Falha inesperada ao comunicar com a API.");
    }
    if (i.status === 204) return;
    const l = await i.text();
    return l ? JSON.parse(l) : void 0;
  },
  Rg = (s) => {
    if (!s) return null;
    const r = s.includes("T") ? s : `${s}T00:00:00-03:00`,
      i = new Date(r);
    return Number.isNaN(i.getTime()) ? null : i.toISOString();
  },
  Jf = (s) => {
    if (!s) return "—";
    const r = new Date(s);
    return Number.isNaN(r.getTime())
      ? "—"
      : new Intl.DateTimeFormat("pt-BR", {
          dateStyle: "short",
          timeStyle: s.includes("T") ? "short" : void 0,
          timeZone: "America/Sao_Paulo",
        }).format(r);
  },
  Og = (s) => {
    if (!s) return "—";
    const r = new Date(s);
    return Number.isNaN(r.getTime())
      ? "—"
      : new Intl.DateTimeFormat("pt-BR", {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: "America/Sao_Paulo",
        }).format(r);
  },
  ga = (s, r, i) => {
    if (!s) return ["—"];
    if (r && r.length) {
      const d = [];
      let p = 0;
      return (
        r.forEach(([m, x], w) => {
          const S = Math.max(0, m),
            N = Math.min(s.length, x);
          (p < S && d.push(s.slice(p, S)),
            d.push(
              h.jsx(
                "mark",
                { className: "search-highlight", children: s.slice(S, N) },
                `highlight-${w}`,
              ),
            ),
            (p = N));
        }),
        p < s.length && d.push(s.slice(p)),
        d
      );
    }
    if (!i) return [s];
    const l = i.trim();
    if (!l) return [s];
    const u = new RegExp(
      `(${l.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")})`,
      "ig",
    );
    return s
      .split(u)
      .map((d, p) =>
        d.toLowerCase() === l.toLowerCase()
          ? h.jsx(
              "mark",
              { className: "search-highlight", children: d },
              `fallback-${p}`,
            )
          : h.jsx("span", { children: d }, `fallback-${p}`),
      );
  },
  Vo = (s) => {
    if (!s.contact || typeof s.contact != "object") return {};
    const r = typeof s.contact.phone == "string" ? s.contact.phone : void 0,
      i = typeof s.contact.email == "string" ? s.contact.email : void 0,
      l = typeof s.contact.notes == "string" ? s.contact.notes : void 0;
    return { phone: r, email: i, notes: l };
  },
  Ig = (s) => {
    const r =
      typeof s.payload?.summary == "string" ? s.payload.summary : void 0;
    return (
      r ||
      (s.type === "PATIENT_CREATE"
        ? "Paciente cadastrado"
        : s.type === "PATIENT_UPDATE"
          ? "Atualização de dados cadastrais"
          : s.type === "PATIENT_DELETE"
            ? "Remoção do cadastro"
            : s.type.replace(/_/g, " "))
    );
  },
  Ag = (s) => {
    switch (s) {
      case "PATIENT_CREATE":
        return "🆕";
      case "PATIENT_UPDATE":
        return "✏️";
      case "PATIENT_DELETE":
        return "🗑️";
      case "ENCOUNTER":
        return "🩺";
      case "PRESCRIPTION":
        return "💊";
      case "EXAM_ORDER":
        return "🧪";
      default:
        return "📄";
    }
  },
  Dg = (s) => {
    const r = new Map();
    return (
      s.forEach((i) => {
        const l = new Date(i.createdAt).toISOString().slice(0, 10),
          u = r.get(l) ?? [];
        (u.push(i), r.set(l, u));
      }),
      Array.from(r.entries())
        .map(([i, l]) => ({
          day: i,
          items: l.sort((u, d) => d.createdAt.localeCompare(u.createdAt)),
        }))
        .sort((i, l) => l.day.localeCompare(i.day))
    );
  },
  Yf = ({ label: s, placeholder: r, value: i, disabled: l, onChange: u }) => {
    const [d, p] = T.useState(""),
      m = () => {
        const w = d.trim();
        if (w) {
          if (i.includes(w)) {
            p("");
            return;
          }
          (u([...i, w]), p(""));
        }
      },
      x = (w) => {
        u(i.filter((S) => S !== w));
      };
    return h.jsxs("label", {
      className: "form-field",
      children: [
        h.jsx("span", { children: s }),
        h.jsxs("div", {
          className: "chip-input",
          "aria-live": "polite",
          children: [
            i.map((w) =>
              h.jsxs(
                "button",
                {
                  type: "button",
                  className: "chip",
                  onClick: () => x(w),
                  disabled: l,
                  "aria-label": `Remover ${w}`,
                  children: [
                    w,
                    h.jsx("span", { "aria-hidden": !0, children: "×" }),
                  ],
                },
                w,
              ),
            ),
            h.jsx("input", {
              type: "text",
              value: d,
              onChange: (w) => p(w.target.value),
              onKeyDown: (w) => {
                ((w.key === "Enter" || w.key === ",") &&
                  (w.preventDefault(), m()),
                  w.key === "Backspace" &&
                    !d &&
                    i.length &&
                    (w.preventDefault(), x(i[i.length - 1])));
              },
              onBlur: m,
              placeholder: r,
              disabled: l,
            }),
          ],
        }),
      ],
    });
  };
function Lg() {
  const [s, r] = T.useState([]),
    [i, l] = T.useState(null),
    [u, d] = T.useState(""),
    [p, m] = T.useState(""),
    [x, w] = T.useState(null),
    [S, N] = T.useState(null),
    [I, Y] = T.useState(!1),
    {
      activePatientId: L,
      eventsByPatient: A,
      isLoading: D,
      error: ge,
      setActivePatient: B,
      refreshEvents: Q,
      clearError: X,
      dropPatientEvents: he,
    } = fu(),
    {
      control: ie,
      handleSubmit: Te,
      reset: Pe,
      formState: { errors: Fe, isSubmitting: ne },
    } = Zy({ resolver: qy(Tg), defaultValues: ya, mode: "onChange" });
  T.useEffect(() => {
    const y = window.setTimeout(() => m(u.trim()), 320);
    return () => window.clearTimeout(y);
  }, [u]);
  const xe = async () => {
      try {
        const y = await qs("/patients/metrics");
        l(y);
      } catch (y) {
        N(
          y instanceof Error
            ? y.message
            : "Não foi possível carregar os indicadores.",
        );
      }
    },
    G = async () => {
      Y(!0);
      try {
        const y = p ? `?query=${encodeURIComponent(p)}` : "",
          O = await qs(`/patients${y}`);
        r(O?.items ?? []);
      } catch (y) {
        N(y instanceof Error ? y.message : "Falha ao carregar pacientes.");
      } finally {
        Y(!1);
      }
    };
  (T.useEffect(() => {
    G();
  }, [p]),
    T.useEffect(() => {
      xe();
    }, []),
    T.useEffect(() => {
      ge && (N(ge), X());
    }, [ge, X]),
    T.useEffect(() => {
      if (!x) return;
      const y = window.setTimeout(() => w(null), 4e3);
      return () => window.clearTimeout(y);
    }, [x]));
  const H = T.useMemo(
    () => (L ? (s.find((y) => y.patient.id === L)?.patient ?? null) : null),
    [L, s],
  );
  T.useEffect(() => {
    if (H) {
      const y = Vo(H);
      Pe({
        name: H.name,
        document: H.document ?? "",
        birthDate: H.birthDate ? H.birthDate.slice(0, 10) : "",
        contactPhone: y.phone ?? "",
        contactEmail: y.email ?? "",
        contactNotes: y.notes ?? "",
        payer: H.payer ?? "",
        allergies: H.allergies ?? [],
        tags: H.tags ?? [],
      });
    } else Pe(ya);
  }, [H, Pe]);
  const ke = async (y) => {
      try {
        N(null);
        const O = {
            phone: y.contactPhone.trim() || void 0,
            email: y.contactEmail.trim() || void 0,
            notes: y.contactNotes.trim() || void 0,
          },
          fe = !!(O.phone || O.email || O.notes),
          me = {
            name: y.name.trim(),
            document: y.document.trim() || null,
            birthDate: Rg(y.birthDate.trim()),
            ...(fe ? { contact: O } : {}),
            payer: y.payer.trim() || null,
            allergies: y.allergies,
            tags: y.tags,
          };
        let we;
        (L
          ? (we = (
              await qs(`/patients/${L}`, {
                method: "PUT",
                body: JSON.stringify(me),
              })
            ).patient)
          : (we = (
              await qs("/patients", {
                method: "POST",
                body: JSON.stringify(me),
              })
            ).patient),
          r((Se) => {
            const De = Se.findIndex((je) => je.patient.id === we.id);
            if (De >= 0) {
              const je = [...Se];
              return (
                (je[De] = { patient: we, highlights: Se[De]?.highlights }),
                je
              );
            }
            return [{ patient: we }, ...Se];
          }),
          await B(we.id),
          xe(),
          w(
            L
              ? "Dados do paciente atualizados."
              : "Paciente cadastrado com sucesso.",
          ));
      } catch (O) {
        N(
          O instanceof Error
            ? O.message
            : "Não foi possível salvar o paciente.",
        );
      }
    },
    Le = (y) => {
      Te((O) => ke(O))(y);
    },
    Re = () => {
      (B(null), Pe(ya));
    },
    Ce = async () => {
      if (!L) return;
      const y = H?.name ?? "este paciente";
      if (window.confirm(`Remover permanentemente ${y}?`))
        try {
          (await qs(`/patients/${L}`, { method: "DELETE" }),
            r((O) => O.filter((fe) => fe.patient.id !== L)),
            he(L),
            await B(null),
            xe(),
            w("Paciente removido com sucesso."));
        } catch (O) {
          N(O instanceof Error ? O.message : "Falha ao remover paciente.");
        }
    },
    W = async (y) => {
      await B(y);
    },
    ae = T.useMemo(() => (L ? (A[L] ?? []) : []), [A, L]),
    K = T.useMemo(() => Dg(ae), [ae]);
  return h.jsxs("div", {
    className: "pacientes-page",
    children: [
      h.jsxs("header", {
        className: "page-header",
        children: [
          h.jsx("h1", { className: "page-title", children: "Pacientes" }),
          h.jsx("p", {
            className: "page-subtitle",
            children:
              "Gestão de cadastro, seleção ativa e visão 360° dos atendimentos.",
          }),
        ],
      }),
      x &&
        h.jsx("div", {
          role: "status",
          className: "toast toast-success",
          children: x,
        }),
      S &&
        h.jsx("div", {
          role: "alert",
          className: "toast toast-error",
          children: S,
        }),
      h.jsxs("section", {
        className: "patient-counters",
        "aria-label": "Indicadores de pacientes",
        children: [
          h.jsxs("article", {
            className: "card-tile",
            children: [
              h.jsx("span", {
                className: "card-metric",
                children: "Total de pacientes",
              }),
              h.jsx("strong", {
                className: "card-value",
                children: i?.totalPatients ?? "—",
              }),
              h.jsx("span", {
                className: "card-footnote",
                children: "Cadastro ativo na base relacional",
              }),
            ],
          }),
          h.jsxs("article", {
            className: "card-tile",
            children: [
              h.jsx("span", {
                className: "card-metric",
                children: "Atendimentos hoje",
              }),
              h.jsx("strong", {
                className: "card-value",
                children: i?.encountersToday ?? "—",
              }),
              h.jsx("span", {
                className: "card-footnote",
                children: "Eventos clínicos do dia (Timeline)",
              }),
            ],
          }),
          h.jsxs("article", {
            className: "card-tile",
            children: [
              h.jsx("span", {
                className: "card-metric",
                children: "Prescrições ativas",
              }),
              h.jsx("strong", {
                className: "card-value",
                children: i?.activePrescriptions ?? "—",
              }),
              h.jsx("span", {
                className: "card-footnote",
                children: "Últimas prescrições vinculadas",
              }),
            ],
          }),
          h.jsxs("article", {
            className: "card-tile",
            children: [
              h.jsx("span", {
                className: "card-metric",
                children: "Alertas de alergias",
              }),
              h.jsx("strong", {
                className: "card-value",
                children: i?.allergyAlerts ?? "—",
              }),
              h.jsx("span", {
                className: "card-footnote",
                children: "Pacientes com alergias registradas",
              }),
            ],
          }),
        ],
      }),
      h.jsxs("section", {
        className: "patient-content",
        children: [
          h.jsxs("div", {
            className: "patient-list",
            "aria-label": "Lista de pacientes",
            children: [
              h.jsxs("div", {
                className: "list-header",
                children: [
                  h.jsxs("label", {
                    className: "form-field search-field",
                    children: [
                      h.jsx("span", { children: "Busca rápida" }),
                      h.jsx("input", {
                        type: "search",
                        value: u,
                        placeholder: "Nome, documento ou contato",
                        onChange: (y) => d(y.target.value),
                      }),
                    ],
                  }),
                  h.jsx("button", {
                    type: "button",
                    className: "ghost",
                    onClick: () => void G(),
                    disabled: I,
                    children: "Atualizar lista",
                  }),
                ],
              }),
              h.jsxs("ul", {
                className: "patient-table",
                role: "list",
                children: [
                  I &&
                    h.jsx("li", {
                      className: "empty-state",
                      children: "Carregando pacientes…",
                    }),
                  !I &&
                    s.length === 0 &&
                    h.jsx("li", {
                      className: "empty-state",
                      children:
                        "Nenhum paciente encontrado para a busca atual.",
                    }),
                  s.map(({ patient: y, highlights: O }) => {
                    const fe = Vo(y);
                    return h.jsx(
                      "li",
                      {
                        className: y.id === L ? "selected" : "",
                        children: h.jsxs("button", {
                          type: "button",
                          onClick: () => void W(y.id),
                          children: [
                            h.jsxs("div", {
                              className: "patient-main",
                              children: [
                                h.jsx("h3", {
                                  children: ga(y.name, O?.name, p),
                                }),
                                h.jsx("span", {
                                  className: "patient-document",
                                  children: ga(
                                    y.document ?? "—",
                                    O?.document,
                                    p,
                                  ),
                                }),
                              ],
                            }),
                            h.jsxs("dl", {
                              className: "patient-meta",
                              children: [
                                h.jsxs("div", {
                                  children: [
                                    h.jsx("dt", { children: "Nascimento" }),
                                    h.jsx("dd", { children: Jf(y.birthDate) }),
                                  ],
                                }),
                                h.jsxs("div", {
                                  children: [
                                    h.jsx("dt", { children: "Contato" }),
                                    h.jsx("dd", {
                                      children:
                                        fe.phone || fe.email || fe.notes
                                          ? ga(
                                              fe.phone ||
                                                fe.email ||
                                                fe.notes ||
                                                "—",
                                              O?.contact,
                                              p,
                                            )
                                          : "—",
                                    }),
                                  ],
                                }),
                                h.jsxs("div", {
                                  children: [
                                    h.jsx("dt", { children: "Convênio" }),
                                    h.jsx("dd", {
                                      children: ga(y.payer ?? "—", O?.payer, p),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      },
                      y.id,
                    );
                  }),
                ],
              }),
            ],
          }),
          h.jsx("div", {
            className: "patient-form",
            "aria-label": "Formulário do paciente",
            children: h.jsxs("form", {
              onSubmit: Le,
              children: [
                h.jsxs("div", {
                  className: "form-grid",
                  children: [
                    h.jsx(kn, {
                      name: "name",
                      control: ie,
                      render: ({ field: y }) =>
                        h.jsxs("label", {
                          className: "form-field",
                          children: [
                            h.jsx("span", { children: "Nome completo *" }),
                            h.jsx("input", {
                              type: "text",
                              ...y,
                              required: !0,
                            }),
                            Fe.name &&
                              h.jsx("small", {
                                className: "error-message",
                                children: Fe.name.message,
                              }),
                          ],
                        }),
                    }),
                    h.jsx(kn, {
                      name: "document",
                      control: ie,
                      render: ({ field: y }) =>
                        h.jsxs("label", {
                          className: "form-field",
                          children: [
                            h.jsx("span", {
                              children: "Documento / ID interno",
                            }),
                            h.jsx("input", { type: "text", ...y }),
                            Fe.document &&
                              h.jsx("small", {
                                className: "error-message",
                                children: Fe.document.message,
                              }),
                          ],
                        }),
                    }),
                    h.jsx(kn, {
                      name: "birthDate",
                      control: ie,
                      render: ({ field: y }) =>
                        h.jsxs("label", {
                          className: "form-field",
                          children: [
                            h.jsx("span", { children: "Data de nascimento" }),
                            h.jsx("input", { type: "date", ...y }),
                          ],
                        }),
                    }),
                    h.jsx(kn, {
                      name: "payer",
                      control: ie,
                      render: ({ field: y }) =>
                        h.jsxs("label", {
                          className: "form-field",
                          children: [
                            h.jsx("span", { children: "Convênio / Pagador" }),
                            h.jsx("input", { type: "text", ...y }),
                          ],
                        }),
                    }),
                    h.jsx(kn, {
                      name: "contactPhone",
                      control: ie,
                      render: ({ field: y }) =>
                        h.jsxs("label", {
                          className: "form-field",
                          children: [
                            h.jsx("span", { children: "Telefone" }),
                            h.jsx("input", { type: "tel", ...y }),
                          ],
                        }),
                    }),
                    h.jsx(kn, {
                      name: "contactEmail",
                      control: ie,
                      render: ({ field: y }) =>
                        h.jsxs("label", {
                          className: "form-field",
                          children: [
                            h.jsx("span", { children: "E-mail" }),
                            h.jsx("input", { type: "email", ...y }),
                            Fe.contactEmail &&
                              h.jsx("small", {
                                className: "error-message",
                                children: Fe.contactEmail.message,
                              }),
                          ],
                        }),
                    }),
                    h.jsx(kn, {
                      name: "contactNotes",
                      control: ie,
                      render: ({ field: y }) =>
                        h.jsxs("label", {
                          className: "form-field full-width",
                          children: [
                            h.jsx("span", { children: "Notas de contato" }),
                            h.jsx("textarea", { rows: 3, ...y }),
                          ],
                        }),
                    }),
                    h.jsx(kn, {
                      name: "allergies",
                      control: ie,
                      render: ({ field: y }) =>
                        h.jsx(Yf, {
                          label: "Alergias",
                          placeholder: "Digite e pressione Enter",
                          value: y.value,
                          onChange: (O) => y.onChange(O),
                          disabled: ne,
                        }),
                    }),
                    h.jsx(kn, {
                      name: "tags",
                      control: ie,
                      render: ({ field: y }) =>
                        h.jsx(Yf, {
                          label: "Tags clínicas",
                          placeholder: "Ex.: crônico, retorno, telemed",
                          value: y.value,
                          onChange: (O) => y.onChange(O),
                          disabled: ne,
                        }),
                    }),
                  ],
                }),
                h.jsxs("div", {
                  className: "form-actions",
                  children: [
                    h.jsx("button", {
                      type: "button",
                      className: "ghost",
                      onClick: Re,
                      children: "Novo paciente",
                    }),
                    h.jsx("button", {
                      type: "submit",
                      className: "primary",
                      disabled: ne,
                      children: L ? "Salvar alterações" : "Cadastrar paciente",
                    }),
                    h.jsx("button", {
                      type: "button",
                      className: "danger",
                      onClick: () => void Ce(),
                      disabled: !L || ne,
                      children: "Remover",
                    }),
                    h.jsx("button", {
                      type: "button",
                      className: "ghost",
                      onClick: () => {
                        if (H) {
                          const y = Vo(H);
                          Pe({
                            name: H.name,
                            document: H.document ?? "",
                            birthDate: H.birthDate
                              ? H.birthDate.slice(0, 10)
                              : "",
                            contactPhone: y.phone ?? "",
                            contactEmail: y.email ?? "",
                            contactNotes: y.notes ?? "",
                            payer: H.payer ?? "",
                            allergies: H.allergies ?? [],
                            tags: H.tags ?? [],
                          });
                        } else Pe(ya);
                      },
                      children: "Limpar",
                    }),
                  ],
                }),
              ],
            }),
          }),
          h.jsxs("aside", {
            className: "patient-timeline",
            "aria-label": "Timeline 360°",
            children: [
              h.jsxs("header", {
                className: "timeline-header",
                children: [
                  h.jsx("h2", { children: "Timeline 360°" }),
                  D &&
                    h.jsx("span", {
                      className: "timeline-status",
                      children: "Sincronizando…",
                    }),
                  !D &&
                    L &&
                    h.jsx("button", {
                      type: "button",
                      className: "ghost",
                      onClick: () => void Q(L),
                      children: "Atualizar eventos",
                    }),
                ],
              }),
              !L &&
                h.jsx("p", {
                  className: "empty-state",
                  children: "Selecione um paciente para visualizar a timeline.",
                }),
              L &&
                K.length === 0 &&
                !D &&
                h.jsx("p", {
                  className: "empty-state",
                  children:
                    "Nenhum evento registrado ainda para este paciente.",
                }),
              h.jsx("div", {
                className: "timeline-group-container",
                children: K.map((y) =>
                  h.jsxs(
                    "section",
                    {
                      className: "timeline-group",
                      children: [
                        h.jsx("h3", { children: Jf(y.day) }),
                        h.jsx("ul", {
                          children: y.items.map((O) =>
                            h.jsxs(
                              "li",
                              {
                                children: [
                                  h.jsx("div", {
                                    className: "timeline-icon",
                                    "aria-hidden": !0,
                                    children: Ag(O.type),
                                  }),
                                  h.jsxs("div", {
                                    className: "timeline-body",
                                    children: [
                                      h.jsx("strong", { children: Ig(O) }),
                                      h.jsx("time", {
                                        dateTime: O.createdAt,
                                        children: Og(O.createdAt),
                                      }),
                                      typeof O.payload?.hash == "string" &&
                                        O.payload.hash &&
                                        h.jsxs("small", {
                                          className: "hash-chain",
                                          children: [
                                            "Hash: ",
                                            O.payload.hash.slice(0, 16),
                                            "…",
                                          ],
                                        }),
                                    ],
                                  }),
                                ],
                              },
                              O.id,
                            ),
                          ),
                        }),
                      ],
                    },
                    y.day,
                  ),
                ),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const Fg = () => {
    const r = import.meta.env?.VITE_API_BASE_URL;
    return typeof r == "string" && r.trim().length > 0 ? r : "/api/v1";
  },
  Op = (s) => {
    const r = Fg();
    return `${r.endsWith("/") ? r.slice(0, -1) : r}${s}`;
  },
  qn = async (s, r) => {
    const i = new Headers(r?.headers ?? {});
    let l = r?.body ?? null;
    (r?.rawBody !== void 0 && (l = JSON.stringify(r.rawBody)),
      l instanceof FormData || i.set("Content-Type", "application/json"));
    const u = await fetch(Op(s), {
      ...r,
      headers: i,
      body: l,
      credentials: "include",
    });
    if (!u.ok) {
      const d = await u.text().catch(() => "");
      throw new Error(d || "Falha ao comunicar com o servidor");
    }
    return u.status === 204 ? null : await u.json();
  },
  zo = (s) => {
    try {
      const r = new Date(s);
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(r);
    } catch {
      return s;
    }
  },
  Mg = (s) => {
    try {
      const r = new Date(s);
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(r);
    } catch {
      return s;
    }
  },
  Vg = (s) =>
    Number.isFinite(s)
      ? s >= 1024 * 1024
        ? `${(s / (1024 * 1024)).toFixed(1)} MB`
        : s >= 1024
          ? `${(s / 1024).toFixed(1)} KB`
          : `${s} B`
      : `${s}`,
  zg = (s) => {
    const r = new Map();
    return (
      s.forEach((i) => {
        const l = Mg(i.createdAt),
          u = r.get(l);
        u ? u.push(i) : r.set(l, [i]);
      }),
      Array.from(r.entries()).map(([i, l]) => ({ date: i, events: l }))
    );
  };
function Ug() {
  const s = Ia(),
    {
      activePatientId: r,
      eventsByPatient: i,
      isLoading: l,
      refreshEvents: u,
    } = fu(),
    [d, p] = T.useState(null),
    [m, x] = T.useState([]),
    [w, S] = T.useState([]),
    [N, I] = T.useState(null),
    [Y, L] = T.useState([]),
    [A, D] = T.useState(null),
    [ge, B] = T.useState([]),
    [Q, X] = T.useState(""),
    [he, ie] = T.useState("idle"),
    [Te, Pe] = T.useState(!1),
    [Fe, ne] = T.useState(!1),
    [xe, G] = T.useState(null),
    [H, ke] = T.useState(!1),
    [Le, Re] = T.useState(!1),
    Ce = T.useRef(null),
    W = T.useRef(""),
    ae = T.useMemo(() => (r ? (i[r] ?? []) : []), [r, i]),
    K = T.useMemo(() => zg(ae), [ae]),
    y = T.useCallback(async () => {
      try {
        const z = await fetch("/templates/templates_evolucao.json", {
          cache: "no-cache",
        });
        if (!z.ok) throw new Error("Falha ao carregar templates");
        const le = await z.json();
        x(le);
      } catch {
        x([]);
      }
    }, []),
    O = T.useCallback(async (z) => {
      try {
        const le = await qn(`/patients/${z}`);
        p(le.patient);
      } catch (le) {
        (p(null),
          G(le instanceof Error ? le.message : "Falha ao carregar paciente"));
      }
    }, []),
    fe = T.useCallback(async (z) => {
      try {
        const le = await qn(`/notes/${z}/versions`);
        B(le.versions ?? []);
      } catch {
        B([]);
      }
    }, []),
    me = T.useCallback(
      async (z) => {
        (D(z),
          X(z?.contentText ?? ""),
          (W.current = z?.contentText ?? ""),
          z?.id ? await fe(z.id) : B([]));
      },
      [fe],
    ),
    we = T.useCallback(
      async (z, le) => {
        try {
          const v = await qn(`/encounters/${z}`);
          L(v.notes ?? []);
          const E =
            (le ? v.notes.find((P) => P.id === le) : void 0) ??
            v.notes[0] ??
            null;
          await me(E);
        } catch (v) {
          (L([]),
            await me(null),
            G(v instanceof Error ? v.message : "Falha ao carregar evolução"));
        }
      },
      [me],
    ),
    Se = T.useCallback(
      async (z, le, v) => {
        Pe(!0);
        try {
          const P =
            (
              await qn(
                `/encounters?patient_id=${encodeURIComponent(z)}&page=1&page_size=50`,
              )
            ).items ?? [];
          S(P);
          const q =
            (le
              ? P.find((Z) => Z.encounter.id === le)?.encounter.id
              : void 0) ||
            P[0]?.encounter.id ||
            null;
          (I(q), q ? await we(q, v) : await me(null));
        } catch (E) {
          (S([]),
            I(null),
            await me(null),
            G(E instanceof Error ? E.message : "Falha ao carregar encontros"));
        } finally {
          Pe(!1);
        }
      },
      [me, we],
    ),
    De = T.useCallback(
      async (z) => {
        await Promise.all([O(z), Se(z), u(z)]);
      },
      [Se, O, u],
    );
  (T.useEffect(() => {
    y().catch(() => {});
  }, [y]),
    T.useEffect(() => {
      if (!r) {
        (p(null), S([]), L([]), me(null).catch(() => {}));
        return;
      }
      De(r).catch((z) => {
        G(z instanceof Error ? z.message : "Falha ao carregar dados");
      });
    }, [r, me, De]),
    T.useEffect(() => {
      const z = (le) => {
        ((le.ctrlKey || le.metaKey) &&
          le.key.toLowerCase() === "k" &&
          (le.preventDefault(), Re(!0)),
          le.key === "Escape" && Re(!1));
      };
      return (
        window.addEventListener("keydown", z),
        () => window.removeEventListener("keydown", z)
      );
    }, []));
  const je = T.useCallback(
    async (z, le) => {
      ie("saving");
      try {
        const v = await qn(`/notes/${z}`, {
          method: "PUT",
          rawBody: { contentText: le },
        });
        (L((E) => E.map((P) => (P.id === v.note.id ? { ...P, ...v.note } : P))),
          D(v.note),
          X(v.note.contentText),
          (W.current = v.note.contentText),
          await fe(v.note.id),
          r && (await u(r)),
          S((E) =>
            E.map((P) =>
              P.encounter.id === v.note.encounterId
                ? {
                    ...P,
                    latestNote: {
                      id: v.note.id,
                      version: v.note.version,
                      updatedAt: v.note.updatedAt,
                      summary: v.note.contentText.slice(0, 160),
                    },
                  }
                : P,
            ),
          ),
          ie("saved"));
      } catch (v) {
        (ie("error"),
          G(
            v instanceof Error
              ? v.message
              : "Não foi possível salvar a evolução",
          ));
      }
    },
    [r, fe, u],
  );
  T.useEffect(
    () =>
      A
        ? Q === W.current
          ? (ie("idle"), () => {})
          : (ie("saving"),
            Ce.current && clearTimeout(Ce.current),
            (Ce.current = setTimeout(() => {
              je(A.id, Q).catch(() => {});
            }, 1500)),
            () => {
              Ce.current && (clearTimeout(Ce.current), (Ce.current = null));
            })
        : (ie("idle"), () => {}),
    [Q, je, A],
  );
  const be = T.useCallback(
      async (z) => {
        (I(z), await we(z));
      },
      [we],
    ),
    lt = T.useCallback(
      async (z) => {
        const le = Y.find((v) => v.id === z) ?? null;
        await me(le);
      },
      [me, Y],
    ),
    zt = T.useCallback(
      async (z) => {
        if (!r) {
          G("Selecione um paciente para criar evolução.");
          return;
        }
        ne(!0);
        try {
          const le = await qn("/encounters", {
              method: "POST",
              rawBody: { patientId: r, type: z.type },
            }),
            v = await qn("/notes", {
              method: "POST",
              rawBody: { encounterId: le.encounter.id, contentText: z.content },
            });
          (await Se(r, le.encounter.id, v.note.id), r && (await u(r)));
        } catch (le) {
          G(le instanceof Error ? le.message : "Falha ao iniciar evolução");
        } finally {
          ne(!1);
        }
      },
      [r, Se, u],
    ),
    jn = T.useCallback(
      async (z) => {
        if (!A) return;
        const le = new FormData();
        (le.set("noteId", A.id), le.append("file", z), ke(!0));
        try {
          const v = await qn("/attachments", { method: "POST", body: le });
          (D((E) =>
            E && E.id === A.id
              ? { ...E, attachments: [...E.attachments, v.attachment] }
              : E,
          ),
            L((E) =>
              E.map((P) =>
                P.id === A.id
                  ? { ...P, attachments: [...P.attachments, v.attachment] }
                  : P,
              ),
            ),
            r && (await u(r)));
        } catch (v) {
          G(v instanceof Error ? v.message : "Falha ao anexar arquivo");
        } finally {
          ke(!1);
        }
      },
      [r, u, A],
    ),
    Tn = T.useCallback(
      async (z) => {
        A && (await je(A.id, z.contentText));
      },
      [je, A],
    ),
    Pn = T.useCallback((z) => {
      X(z.currentTarget.value);
    }, []),
    rr = T.useCallback(
      (z) => {
        const le = z.currentTarget.files?.[0];
        le && (jn(le), (z.currentTarget.value = ""));
      },
      [jn],
    ),
    kr = T.useMemo(() => {
      const z = m.find((E) => E.type === "INITIAL") ?? m[0],
        le = m.find((E) => E.type === "FOLLOW_UP") ?? m[1],
        v = [];
      return (
        z &&
          v.push({
            id: "new-initial",
            label: "Nova Evolução (1ª)",
            run: () => {
              zt(z);
            },
          }),
        le &&
          v.push({
            id: "new-follow-up",
            label: "Nova Evolução (Retorno)",
            run: () => {
              zt(le);
            },
          }),
        v.push({
          id: "attach",
          label: "Anexar Arquivo",
          disabled: !A,
          run: () => {
            const E = document.getElementById("attachment-input");
            E instanceof HTMLInputElement && E.click();
          },
        }),
        v.push({
          id: "print",
          label: "Imprimir Evolução Atual",
          disabled: !A,
          run: () => {
            A && s(`/prontuarios/imprimir/${A.id}`);
          },
        }),
        v
      );
    }, [zt, s, A, m]),
    sr = () =>
      Le
        ? h.jsx("div", {
            className: "command-palette",
            role: "dialog",
            "aria-modal": "true",
            children: h.jsxs("div", {
              className: "command-palette-card",
              children: [
                h.jsxs("header", {
                  className: "command-palette-header",
                  children: [
                    h.jsx("h2", { children: "Comando rápido" }),
                    h.jsx("button", {
                      type: "button",
                      className: "ghost-button",
                      onClick: () => Re(!1),
                      children: "Fechar",
                    }),
                  ],
                }),
                h.jsx("ul", {
                  className: "command-palette-list",
                  children: kr.map((z) =>
                    h.jsx(
                      "li",
                      {
                        children: h.jsx("button", {
                          type: "button",
                          className: "palette-action",
                          onClick: () => {
                            z.disabled || (Re(!1), z.run());
                          },
                          disabled: !!z.disabled,
                          children: z.label,
                        }),
                      },
                      z.id,
                    ),
                  ),
                }),
              ],
            }),
          })
        : null;
  return r
    ? h.jsxs("div", {
        className: "prontuario-layout",
        children: [
          h.jsxs("header", {
            className: "prontuario-header",
            children: [
              h.jsxs("div", {
                children: [
                  h.jsx("h1", { children: "Prontuário do paciente" }),
                  h.jsx("p", {
                    className: "prontuario-subtitle",
                    children: d
                      ? h.jsxs(h.Fragment, {
                          children: [
                            h.jsx("strong", { children: d.name }),
                            d.document ? ` · ${d.document}` : null,
                            d.payer ? ` · Convênio: ${d.payer}` : null,
                          ],
                        })
                      : "Carregando paciente...",
                  }),
                ],
              }),
              h.jsxs("div", {
                className: "prontuario-actions",
                children: [
                  h.jsx("button", {
                    type: "button",
                    className: "primary-button",
                    onClick: () => {
                      const z = m.find((le) => le.type === "INITIAL") ?? m[0];
                      z && zt(z);
                    },
                    disabled: Fe,
                    children: "Nova Evolução (1ª)",
                  }),
                  h.jsx("button", {
                    type: "button",
                    className: "secondary-button",
                    onClick: () => {
                      const z = m.find((le) => le.type === "FOLLOW_UP") ?? m[1];
                      z && zt(z);
                    },
                    disabled: Fe,
                    children: "Nova Evolução (Retorno)",
                  }),
                  h.jsx("button", {
                    type: "button",
                    className: "ghost-button",
                    onClick: () => {
                      A && s(`/prontuarios/imprimir/${A.id}`);
                    },
                    disabled: !A,
                    children: "Imprimir",
                  }),
                ],
              }),
            ],
          }),
          xe
            ? h.jsx("div", { className: "alert alert-error", children: xe })
            : null,
          h.jsxs("div", {
            className: "prontuario-columns",
            children: [
              h.jsxs("aside", {
                className: "prontuario-sidebar",
                "aria-label": "Encontros clínicos",
                children: [
                  h.jsxs("header", {
                    className: "sidebar-header",
                    children: [
                      h.jsx("h2", { children: "Encontros" }),
                      Te
                        ? h.jsx("span", {
                            className: "tag",
                            children: "Carregando…",
                          })
                        : null,
                    ],
                  }),
                  h.jsx("ul", {
                    className: "encounter-list",
                    children: w.map((z) =>
                      h.jsx(
                        "li",
                        {
                          children: h.jsxs("button", {
                            type: "button",
                            className:
                              N === z.encounter.id
                                ? "encounter-item encounter-item-active"
                                : "encounter-item",
                            onClick: () => {
                              be(z.encounter.id);
                            },
                            children: [
                              h.jsx("span", {
                                className: "encounter-type",
                                children: z.encounter.type,
                              }),
                              h.jsx("span", {
                                className: "encounter-date",
                                children: zo(z.encounter.date),
                              }),
                              z.latestNote
                                ? h.jsxs("span", {
                                    className: "encounter-note",
                                    children: [
                                      "v",
                                      z.latestNote.version,
                                      " · ",
                                      z.latestNote.summary,
                                    ],
                                  })
                                : h.jsx("span", {
                                    className: "encounter-note muted",
                                    children: "Sem evolução registrada",
                                  }),
                            ],
                          }),
                        },
                        z.encounter.id,
                      ),
                    ),
                  }),
                ],
              }),
              h.jsxs("section", {
                className: "prontuario-editor",
                "aria-label": "Evolução clínica",
                children: [
                  h.jsxs("header", {
                    className: "editor-header",
                    children: [
                      h.jsxs("div", {
                        children: [
                          h.jsx("h2", { children: "Evolução" }),
                          A
                            ? h.jsxs("span", {
                                className: "tag",
                                children: ["Versão ", A.version],
                              })
                            : null,
                        ],
                      }),
                      h.jsxs("div", {
                        className: "editor-status",
                        role: "status",
                        "aria-live": "polite",
                        children: [
                          he === "saving" ? "Salvando…" : null,
                          he === "saved" ? "Salvo automaticamente" : null,
                          he === "error" ? "Erro ao salvar" : null,
                        ],
                      }),
                    ],
                  }),
                  Y.length > 1
                    ? h.jsx("nav", {
                        className: "note-tabs",
                        "aria-label": "Notas do encontro",
                        children: Y.map((z) =>
                          h.jsxs(
                            "button",
                            {
                              type: "button",
                              className:
                                A?.id === z.id
                                  ? "note-tab note-tab-active"
                                  : "note-tab",
                              onClick: () => {
                                lt(z.id);
                              },
                              children: ["Evolução #", z.version],
                            },
                            z.id,
                          ),
                        ),
                      })
                    : null,
                  h.jsx("textarea", {
                    className: "note-editor",
                    value: Q,
                    onChange: Pn,
                    placeholder: "Selecione ou crie uma evolução para editar.",
                    rows: 28,
                    disabled: !A,
                  }),
                  h.jsxs("div", {
                    className: "editor-footer",
                    children: [
                      h.jsxs("label", {
                        className: "attachment-upload",
                        children: [
                          h.jsx("input", {
                            id: "attachment-input",
                            type: "file",
                            accept: ".pdf,.png,.jpg,.jpeg",
                            onChange: rr,
                            disabled: !A || H,
                          }),
                          h.jsx("span", {
                            children: H ? "Enviando…" : "Anexar arquivo",
                          }),
                        ],
                      }),
                      h.jsx("button", {
                        type: "button",
                        className: "ghost-button",
                        onClick: () => A && s(`/prontuarios/imprimir/${A.id}`),
                        disabled: !A,
                        children: "Gerar impressão",
                      }),
                    ],
                  }),
                  h.jsxs("section", {
                    className: "attachments-section",
                    children: [
                      h.jsx("h3", { children: "Anexos" }),
                      A && A.attachments.length === 0
                        ? h.jsx("p", {
                            className: "muted",
                            children: "Nenhum anexo enviado.",
                          })
                        : null,
                      h.jsx("ul", {
                        className: "attachment-list",
                        children: A?.attachments.map((z) =>
                          h.jsxs(
                            "li",
                            {
                              className: "attachment-item",
                              children: [
                                h.jsxs("div", {
                                  children: [
                                    h.jsx("strong", { children: z.fileName }),
                                    h.jsxs("span", {
                                      className: "muted",
                                      children: [
                                        " · ",
                                        Vg(z.size),
                                        " · ",
                                        z.mime,
                                      ],
                                    }),
                                  ],
                                }),
                                h.jsx("a", {
                                  className: "secondary-button",
                                  href: Op(`/attachments/${z.id}/download`),
                                  target: "_blank",
                                  rel: "noreferrer",
                                  children: "Baixar",
                                }),
                              ],
                            },
                            z.id,
                          ),
                        ),
                      }),
                    ],
                  }),
                  h.jsxs("section", {
                    className: "versions-section",
                    children: [
                      h.jsx("h3", { children: "Histórico de versões" }),
                      ge.length === 0
                        ? h.jsx("p", {
                            className: "muted",
                            children: "Nenhuma versão anterior.",
                          })
                        : null,
                      h.jsx("ul", {
                        className: "versions-list",
                        children: ge.map((z) =>
                          h.jsxs(
                            "li",
                            {
                              className: "version-item",
                              children: [
                                h.jsxs("div", {
                                  children: [
                                    h.jsxs("span", {
                                      children: ["v", z.version],
                                    }),
                                    h.jsxs("span", {
                                      className: "muted",
                                      children: [" · ", zo(z.createdAt)],
                                    }),
                                  ],
                                }),
                                h.jsx("button", {
                                  type: "button",
                                  className: "ghost-button",
                                  onClick: () => {
                                    Tn(z);
                                  },
                                  children: "Restaurar",
                                }),
                              ],
                            },
                            z.id,
                          ),
                        ),
                      }),
                    ],
                  }),
                ],
              }),
              h.jsxs("aside", {
                className: "timeline-panel",
                "aria-label": "Timeline 360°",
                children: [
                  h.jsxs("header", {
                    className: "sidebar-header",
                    children: [
                      h.jsx("h2", { children: "Timeline 360°" }),
                      h.jsx("button", {
                        type: "button",
                        className: "ghost-button",
                        onClick: () => {
                          r && u(r);
                        },
                        children: "Atualizar",
                      }),
                    ],
                  }),
                  l
                    ? h.jsx("p", {
                        className: "muted",
                        children: "Carregando eventos…",
                      })
                    : null,
                  !l && K.length === 0
                    ? h.jsx("p", {
                        className: "muted",
                        children:
                          "Nenhum evento registrado para este paciente.",
                      })
                    : null,
                  h.jsx("div", {
                    className: "timeline-groups",
                    children: K.map((z) =>
                      h.jsxs(
                        "section",
                        {
                          className: "timeline-group",
                          children: [
                            h.jsx("h3", { children: z.date }),
                            h.jsx("ul", {
                              children: z.events.map((le) =>
                                h.jsxs(
                                  "li",
                                  {
                                    className: `timeline-event timeline-event-${le.type.toLowerCase()}`,
                                    children: [
                                      h.jsxs("div", {
                                        children: [
                                          h.jsx("strong", {
                                            children: le.type,
                                          }),
                                          h.jsxs("span", {
                                            className: "muted",
                                            children: [" · ", zo(le.createdAt)],
                                          }),
                                        ],
                                      }),
                                      typeof le.payload?.summary == "string"
                                        ? h.jsx("p", {
                                            children: le.payload.summary,
                                          })
                                        : null,
                                      le.type.startsWith("NOTE") &&
                                      typeof le.payload?.noteId == "string"
                                        ? h.jsx("button", {
                                            type: "button",
                                            className: "ghost-button",
                                            onClick: () => {
                                              const v =
                                                typeof le.payload
                                                  ?.encounterId == "string"
                                                  ? le.payload.encounterId
                                                  : null;
                                              v && be(v).catch(() => {});
                                            },
                                            children: "Abrir nota",
                                          })
                                        : null,
                                    ],
                                  },
                                  le.id,
                                ),
                              ),
                            }),
                          ],
                        },
                        z.date,
                      ),
                    ),
                  }),
                ],
              }),
            ],
          }),
          sr(),
        ],
      })
    : h.jsxs("section", {
        className: "placeholder-card",
        children: [
          h.jsx("h1", {
            className: "placeholder-title",
            children: "Prontuários · Evolução clínica",
          }),
          h.jsx("p", {
            className: "placeholder-description",
            children:
              "Selecione um paciente na página “Pacientes” para acessar evoluções, anexos e timeline clínica.",
          }),
        ],
      });
}
const $g = () => {
    const r = import.meta.env?.VITE_API_BASE_URL;
    return typeof r == "string" && r.trim().length > 0 ? r : "/api/v1";
  },
  bg = (s) => {
    const r = $g();
    return `${r.endsWith("/") ? r.slice(0, -1) : r}${s}`;
  },
  Uo = async (s) => {
    const r = await fetch(bg(s), { credentials: "include" });
    if (!r.ok) {
      const i = await r.text().catch(() => "");
      throw new Error(i || "Falha ao carregar informação");
    }
    return await r.json();
  },
  Gf = (s) => {
    try {
      const r = new Date(s);
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(r);
    } catch {
      return s;
    }
  };
function Bg() {
  const { noteId: s } = pv(),
    r = Ia(),
    [i, l] = T.useState(null),
    [u, d] = T.useState(null),
    [p, m] = T.useState(null);
  return (
    T.useEffect(() => {
      (async () => {
        if (s)
          try {
            const w = await Uo(`/notes/${s}`);
            l(w.note);
            const S =
                w.note.encounter?.patientId ??
                (await Uo(`/encounters/${w.note.encounterId}`)).encounter
                  .patientId,
              N = await Uo(`/patients/${S}`);
            (d(N.patient), (document.title = `Evolução ${N.patient.name}`));
          } catch (w) {
            m(w instanceof Error ? w.message : "Falha ao carregar impressão");
          }
      })().catch(() => {});
    }, [s]),
    s
      ? p
        ? h.jsx("div", {
            className: "print-container",
            children: h.jsxs("div", {
              className: "print-card",
              children: [
                h.jsx("p", { className: "alert alert-error", children: p }),
                h.jsx("button", {
                  type: "button",
                  className: "ghost-button",
                  onClick: () => r(-1),
                  children: "Voltar",
                }),
              ],
            }),
          })
        : !i || !u
          ? h.jsx("div", {
              className: "print-container",
              children: h.jsx("div", {
                className: "print-card",
                children: h.jsx("p", {
                  children: "Carregando evolução para impressão…",
                }),
              }),
            })
          : h.jsx("div", {
              className: "print-container",
              children: h.jsxs("div", {
                className: "print-card",
                children: [
                  h.jsxs("header", {
                    className: "print-header",
                    children: [
                      h.jsxs("div", {
                        children: [
                          h.jsx("h1", {
                            children:
                              "Dr. Matheus Jorge Assali • CRM-SP 210257 • RQE 130535",
                          }),
                          h.jsxs("p", {
                            children: ["Data/Hora (GMT-3): ", Gf(i.updatedAt)],
                          }),
                        ],
                      }),
                      h.jsx("button", {
                        type: "button",
                        className: "secondary-button print-action",
                        onClick: () => window.print(),
                        children: "Imprimir PDF",
                      }),
                    ],
                  }),
                  h.jsxs("section", {
                    className: "print-section",
                    children: [
                      h.jsx("h2", { children: "Paciente" }),
                      h.jsxs("p", {
                        children: [
                          h.jsx("strong", { children: u.name }),
                          u.document ? ` · ${u.document}` : null,
                        ],
                      }),
                      u.birthDate
                        ? h.jsxs("p", {
                            children: ["Nascimento: ", Gf(u.birthDate)],
                          })
                        : null,
                    ],
                  }),
                  h.jsxs("section", {
                    className: "print-section",
                    children: [
                      h.jsx("h2", { children: "Evolução" }),
                      h.jsx("article", {
                        className: "print-note",
                        "aria-label": "Conteúdo da evolução",
                        children: i.contentText
                          .split(
                            `
`,
                          )
                          .map((x, w) => h.jsx("p", { children: x || " " }, w)),
                      }),
                    ],
                  }),
                ],
              }),
            })
      : h.jsx("div", {
          className: "print-container",
          children: h.jsxs("div", {
            className: "print-card",
            children: [
              h.jsx("p", { children: "Nota não informada." }),
              h.jsx("button", {
                type: "button",
                className: "ghost-button",
                onClick: () => r(-1),
                children: "Voltar",
              }),
            ],
          }),
        })
  );
}
const Wg = "http://127.0.0.1:3030/api",
  Zg = (s = {}) => ({
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(s.headers ?? {}),
    },
    ...s,
  }),
  La = async (s, r) => {
    const i = await fetch(`${Wg}${s}`, Zg(r));
    if (!i.ok) {
      const u = await i.text().catch(() => "Falha ao comunicar com a API.");
      throw new Error(u || "Erro inesperado na API.");
    }
    if (i.status === 204) return;
    const l = await i.text();
    if (l) return JSON.parse(l);
  },
  Hg = async () => La("/auth/status"),
  Qg = async (s) =>
    La("/auth/login", { method: "POST", body: JSON.stringify(s) }),
  Kg = async (s) => {
    const r = await La(`/pacientes/${s}/prescricoes`);
    return Array.isArray(r.items) ? r.items : [];
  },
  qg = async (s) =>
    (
      await La("/prescricoes/print", {
        method: "POST",
        body: JSON.stringify({
          pacienteId: s.patientId,
          formato: s.formato,
          cid: s.cid,
          observacoes: s.observacoes,
          items: s.items,
        }),
      })
    ).item,
  $o = () => ({ nome: "", dose: "", via: "", horario: "", observacao: "" }),
  Ip = (s) => {
    if (!s) return "";
    const r = new Date(s);
    return Number.isNaN(r.getTime())
      ? s
      : new Intl.DateTimeFormat("pt-BR", {
          dateStyle: "short",
          timeStyle: "short",
          timeZone: "America/Sao_Paulo",
        }).format(r);
  },
  Jg = (s) =>
    s
      .map(
        (r) => `
        <tr>
          <td>${r.ordem}</td>
          <td>${r.nome}${r.dose ? ` — ${r.dose}` : ""}</td>
          <td>${r.via ?? ""} ${r.horario ?? ""}</td>
          <td>${r.observacao ?? ""}</td>
        </tr>
      `,
      )
      .join(""),
  Yg = (s) =>
    s
      .map((r) => {
        const i = r.via ? `<br /><small>${r.via}</small>` : "",
          l = r.horario ? `<br /><small>${r.horario}</small>` : "";
        return `
        <tr>
          <td>${r.ordem}</td>
          <td>${r.nome}${r.dose ? ` — ${r.dose}` : ""}${i}${l}</td>
        </tr>
      `;
      })
      .join(""),
  Xf = async (s) => {
    const r =
        s.formato === "A5"
          ? "/assets/print/receita_a5.html"
          : "/assets/print/receita_a4.html",
      u = (await (await fetch(r)).text())
        .replace(/\{\{NUMERO\}\}/g, String(s.numero))
        .replace(/\{\{PACIENTE\}\}/g, s.pacienteNome)
        .replace(/\{\{DATA\}\}/g, Ip(s.criadoEm))
        .replace(/\{\{CID\}\}/g, s.cid || "—")
        .replace(/\{\{OBSERVACOES\}\}/g, s.observacoes || "—")
        .replace(
          /\{\{ITENS\}\}/g,
          s.formato === "A5" ? Yg(s.itens) : Jg(s.itens),
        ),
      d = window.open("", "_blank", "noopener");
    if (!d) {
      alert("Permita pop-ups para visualizar a impressão.");
      return;
    }
    (d.document.write(u),
      d.document.close(),
      setTimeout(() => {
        (d.focus(), d.print());
      }, 350));
  };
function Gg() {
  const { activePatientId: s } = fu(),
    [r, i] = T.useState(null),
    [l, u] = T.useState([$o()]),
    [d, p] = T.useState("A4"),
    [m, x] = T.useState(""),
    [w, S] = T.useState(""),
    [N, I] = T.useState([]),
    [Y, L] = T.useState(!1),
    [A, D] = T.useState(null),
    [ge, B] = T.useState(null);
  (T.useEffect(() => {
    Hg()
      .then(i)
      .catch(() => i({ ok: !1, online: !1, mode: "print", issuer: null }));
  }, []),
    T.useEffect(() => {
      if (!s) {
        I([]);
        return;
      }
      Kg(s)
        .then(I)
        .catch((ne) =>
          D(ne instanceof Error ? ne.message : "Falha ao carregar prescrições"),
        );
    }, [s]));
  const Q = r?.online && r.mode === "sso_birdid",
    X = () => u((ne) => [...ne, $o()]),
    he = (ne) =>
      u((xe) => xe.filter((G, H) => H !== ne && (H !== 0 || xe.length > 1))),
    ie = (ne, xe, G) => {
      u((H) => H.map((ke, Le) => (Le === ne ? { ...ke, [xe]: G } : ke)));
    },
    Te = async (ne) => {
      if ((ne.preventDefault(), !s)) {
        D("Selecione um paciente antes de emitir prescrições.");
        return;
      }
      try {
        (L(!0), D(null));
        const xe = l.filter((H) =>
          [H.nome, H.dose, H.via, H.horario, H.observacao].some(
            (ke) => typeof ke == "string" && ke.trim().length > 0,
          ),
        );
        if (xe.length === 0) {
          (D("Preencha ao menos um item para emitir a prescrição."), L(!1));
          return;
        }
        const G = await qg({
          patientId: s,
          formato: d,
          cid: m.trim() || void 0,
          observacoes: w.trim() || void 0,
          items: xe,
        });
        (B(`Prescrição nº ${G.numero} emitida com sucesso.`),
          I((H) => [G, ...H]),
          u([$o()]),
          S(""),
          x(""),
          setTimeout(() => void Xf(G), 150));
      } catch (xe) {
        D(xe instanceof Error ? xe.message : "Falha ao emitir a prescrição.");
      } finally {
        L(!1);
      }
    },
    Pe = async () => {
      try {
        if (
          (D(null),
          typeof window > "u" || !window.crypto || !window.crypto.subtle)
        ) {
          D("Navegador sem suporte a PKCE. Utilize o fallback de impressão.");
          return;
        }
        const ne = crypto.randomUUID().replace(/-/g, ""),
          xe = new TextEncoder(),
          G = await crypto.subtle.digest("SHA-256", xe.encode(ne)),
          H = Array.from(new Uint8Array(G)),
          ke = btoa(String.fromCharCode(...H))
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, ""),
          Le = crypto.randomUUID(),
          Re = await Qg({ codeChallenge: ke, state: Le });
        if (!Re.ok) {
          D("Não foi possível iniciar o login com o Bird ID.");
          return;
        }
        (sessionStorage.setItem("birdid:code_verifier", ne),
          sessionStorage.setItem("birdid:state", Le),
          (window.location.href = Re.authorizeUrl));
      } catch (ne) {
        D(ne instanceof Error ? ne.message : "Falha ao iniciar o SSO.");
      }
    },
    Fe = T.useMemo(
      () =>
        r
          ? Q
            ? "Bird ID ativo para SSO (Memed)."
            : r.mode === "sso_birdid"
              ? "Configuração Bird ID incompleta. Usando fallback de impressão."
              : "Modo impressão manual ativo (Memed desativado)."
          : "Consultando status do Bird ID…",
      [r, Q],
    );
  return h.jsxs("div", {
    className: "prescriptions-screen",
    children: [
      h.jsxs("header", {
        className: "page-header",
        children: [
          h.jsxs("div", {
            children: [
              h.jsx("h1", { children: "Prescrições" }),
              h.jsx("p", {
                children:
                  "Integração com Bird ID / Memed com fallback de impressão clínica.",
              }),
            ],
          }),
          h.jsxs("div", {
            className: `status-pill ${Q ? "online" : "offline"}`,
            children: [
              h.jsx("span", { className: "dot" }),
              Q ? "Bird ID conectado" : "Bird ID indisponível",
            ],
          }),
        ],
      }),
      h.jsxs("section", {
        className: "card-grid",
        children: [
          h.jsxs("article", {
            className: "card",
            children: [
              h.jsx("h2", { children: "Nova prescrição impressa" }),
              h.jsx("p", {
                children:
                  "Preencha os itens abaixo para gerar a receita com numeração sequencial oficial.",
              }),
              h.jsxs("form", {
                className: "prescription-form",
                onSubmit: (ne) => void Te(ne),
                children: [
                  h.jsxs("div", {
                    className: "field-grid",
                    children: [
                      h.jsxs("label", {
                        children: [
                          "Formato",
                          h.jsxs("select", {
                            value: d,
                            onChange: (ne) => p(ne.target.value),
                            children: [
                              h.jsx("option", {
                                value: "A4",
                                children: "A4 (consultório)",
                              }),
                              h.jsx("option", {
                                value: "A5",
                                children: "A5 (talonário)",
                              }),
                            ],
                          }),
                        ],
                      }),
                      h.jsxs("label", {
                        children: [
                          "CID (opcional)",
                          h.jsx("input", {
                            value: m,
                            onChange: (ne) => x(ne.target.value),
                            placeholder: "CID-10",
                          }),
                        ],
                      }),
                    ],
                  }),
                  h.jsxs("label", {
                    children: [
                      "Observações gerais",
                      h.jsx("textarea", {
                        value: w,
                        onChange: (ne) => S(ne.target.value),
                        placeholder:
                          "Orientações adicionais, carimbo, posologia livre",
                      }),
                    ],
                  }),
                  h.jsxs("fieldset", {
                    className: "items",
                    children: [
                      h.jsx("legend", { children: "Itens da prescrição" }),
                      l.map((ne, xe) =>
                        h.jsxs(
                          "div",
                          {
                            className: "item-row",
                            children: [
                              h.jsx("input", {
                                placeholder: "Medicamento ou procedimento",
                                value: ne.nome,
                                onChange: (G) => ie(xe, "nome", G.target.value),
                              }),
                              h.jsx("input", {
                                placeholder: "Dose",
                                value: ne.dose,
                                onChange: (G) => ie(xe, "dose", G.target.value),
                              }),
                              h.jsx("input", {
                                placeholder: "Via",
                                value: ne.via,
                                onChange: (G) => ie(xe, "via", G.target.value),
                              }),
                              h.jsx("input", {
                                placeholder: "Horário",
                                value: ne.horario,
                                onChange: (G) =>
                                  ie(xe, "horario", G.target.value),
                              }),
                              h.jsx("input", {
                                placeholder: "Observação",
                                value: ne.observacao,
                                onChange: (G) =>
                                  ie(xe, "observacao", G.target.value),
                              }),
                              h.jsx("button", {
                                type: "button",
                                className: "ghost",
                                onClick: () => he(xe),
                                children: "Remover",
                              }),
                            ],
                          },
                          `item-${xe}`,
                        ),
                      ),
                      h.jsx("button", {
                        type: "button",
                        className: "ghost",
                        onClick: X,
                        children: "Adicionar item",
                      }),
                    ],
                  }),
                  h.jsx("footer", {
                    className: "form-actions",
                    children: h.jsx("button", {
                      type: "submit",
                      disabled: Y,
                      children: Y ? "Emitindo…" : "Gerar prescrição impressa",
                    }),
                  }),
                ],
              }),
            ],
          }),
          h.jsxs("article", {
            className: "card",
            children: [
              h.jsx("h2", { children: "Integração Memed (SSO)" }),
              h.jsx("p", { children: Fe }),
              h.jsx("button", {
                type: "button",
                className: "primary",
                onClick: () => void Pe(),
                disabled: !Q,
                children: "Abrir Memed via Bird ID",
              }),
            ],
          }),
        ],
      }),
      A && h.jsx("p", { className: "feedback error", children: A }),
      ge && h.jsx("p", { className: "feedback success", children: ge }),
      h.jsxs("section", {
        className: "card",
        children: [
          h.jsxs("header", {
            className: "card-header",
            children: [
              h.jsx("h2", { children: "Histórico de prescrições" }),
              h.jsx("p", {
                children:
                  "Listagem das receitas vinculadas ao paciente selecionado.",
              }),
            ],
          }),
          !s &&
            h.jsx("p", {
              className: "empty-state",
              children:
                "Selecione um paciente na aba Pacientes para visualizar.",
            }),
          s &&
            N.length === 0 &&
            h.jsx("p", {
              className: "empty-state",
              children: "Nenhuma prescrição emitida ainda.",
            }),
          N.length > 0 &&
            h.jsxs("table", {
              className: "history-table",
              children: [
                h.jsx("thead", {
                  children: h.jsxs("tr", {
                    children: [
                      h.jsx("th", { children: "Nº" }),
                      h.jsx("th", { children: "Formato" }),
                      h.jsx("th", { children: "Data" }),
                      h.jsx("th", { children: "CID" }),
                      h.jsx("th", { children: "Ações" }),
                    ],
                  }),
                }),
                h.jsx("tbody", {
                  children: N.map((ne) =>
                    h.jsxs(
                      "tr",
                      {
                        children: [
                          h.jsx("td", { children: ne.numero }),
                          h.jsx("td", { children: ne.formato }),
                          h.jsx("td", { children: Ip(ne.criadoEm) }),
                          h.jsx("td", { children: ne.cid || "—" }),
                          h.jsx("td", {
                            children: h.jsx("button", {
                              type: "button",
                              className: "ghost",
                              onClick: () => void Xf(ne),
                              children: "Imprimir",
                            }),
                          }),
                        ],
                      },
                      ne.id,
                    ),
                  ),
                }),
              ],
            }),
        ],
      }),
    ],
  });
}
function Xg() {
  return h.jsxs("section", {
    className: "placeholder-card",
    "aria-labelledby": "configuracoes-title",
    children: [
      h.jsx("h1", {
        id: "configuracoes-title",
        className: "placeholder-title",
        children: "Configurações · Segurança e templates",
      }),
      h.jsx("p", {
        className: "placeholder-description",
        children:
          "Central de integrações, gestão de templates clínicos e parâmetros de segurança. O conteúdo definitivo será adicionado no PR9, incluindo auditoria mínima e export LGPD.",
      }),
    ],
  });
}
function e0() {
  return h.jsxs(Rv, {
    children: [
      h.jsxs(un, {
        element: h.jsx(ky, {}),
        children: [
          h.jsx(un, { index: !0, element: h.jsx(Ny, {}) }),
          h.jsx(un, {
            path: "dashboard",
            element: h.jsx(df, { to: "/", replace: !0 }),
          }),
          h.jsx(un, { path: "pacientes", element: h.jsx(Lg, {}) }),
          h.jsx(un, { path: "prontuarios", element: h.jsx(Ug, {}) }),
          h.jsx(un, { path: "prescricoes", element: h.jsx(Gg, {}) }),
          h.jsx(un, { path: "configuracoes", element: h.jsx(Xg, {}) }),
          h.jsx(un, {
            path: "*",
            element: h.jsx(df, { to: "/", replace: !0 }),
          }),
        ],
      }),
      h.jsx(un, {
        path: "/prontuarios/imprimir/:noteId",
        element: h.jsx(Bg, {}),
      }),
    ],
  });
}
const t0 = new Set(["POST", "PUT", "PATCH", "DELETE"]),
  n0 = async (s) => {
    if (!s) return null;
    if (typeof s == "string") return s;
    if (s instanceof Blob) return await s.text();
    if (s instanceof ArrayBuffer) return new TextDecoder().decode(s);
    if (s instanceof FormData) {
      const r = {};
      return (
        s.forEach((i, l) => {
          r[l] = i;
        }),
        JSON.stringify(r)
      );
    }
    try {
      return JSON.stringify(s);
    } catch {
      return null;
    }
  },
  r0 = (s, r, i) => {
    if (!i) return null;
    try {
      const l = JSON.parse(i);
      if (r === "POST" && s === "/api/pacientes") {
        const u = `cid-${crypto.randomUUID()}`,
          d = new Date().toISOString(),
          p = {
            id: u,
            name: l.name ?? "Paciente",
            document: l.document ?? null,
            birthDate: l.birthDate ?? null,
            contact: l.contactJson ?? null,
            payer: l.payer ?? null,
            allergies: l.allergies ?? [],
            tags: l.tags ?? [],
            createdAt: d,
            updatedAt: d,
            pending: !0,
          };
        return {
          body: JSON.stringify({ ok: !0, queued: !0, item: p }),
          clientMappings: { [u]: "self" },
        };
      }
      if (r === "POST" && s.match(/\/api\/pacientes\/.+\/evolucoes$/)) {
        const u = `cid-${crypto.randomUUID()}`,
          d = new Date().toISOString(),
          p = {
            id: u,
            texto: l.texto ?? "",
            tipo: l.tipo ?? "Evolução",
            data: l.data ?? d,
            pending: !0,
          };
        return {
          body: JSON.stringify({ ok: !0, queued: !0, item: p }),
          clientMappings: { [u]: "self" },
        };
      }
      if (r === "POST" && s === "/api/prescricoes/print") {
        const u = `cid-${crypto.randomUUID()}`,
          d = {
            id: u,
            numero: null,
            pacienteId: l.pacienteId,
            criadoEm: new Date().toISOString(),
            itens: l.items,
            formato: l.formato ?? "A4",
            pending: !0,
          };
        return {
          body: JSON.stringify({ ok: !0, queued: !0, item: d }),
          clientMappings: { [u]: "self" },
        };
      }
    } catch {
      return null;
    }
    return null;
  },
  s0 = () => {
    if (typeof window > "u" || typeof window.fetch != "function") return;
    const s = window.fetch.bind(window);
    window.fetch = async (r, i) => {
      const l = (i?.method ?? "GET").toUpperCase(),
        u = typeof r == "string" || r instanceof URL ? r.toString() : r.url,
        d = new URL(u, window.location.origin),
        p = new Headers(
          i?.headers ?? (r instanceof Request ? r.headers : void 0),
        );
      if (!t0.has(l))
        try {
          return await s(r, i);
        } catch (L) {
          if (d.pathname.startsWith("/api/")) {
            const A = await caches.match(d.pathname);
            if (A) return A;
          }
          throw L;
        }
      const x = await n0(i?.body ?? null),
        w = d.toString(),
        S = r0(d.pathname, l, x),
        N = p.get("X-Idempotency-Key") ?? crypto.randomUUID();
      p.set("X-Idempotency-Key", N);
      const I = {};
      p.forEach((L, A) => {
        I[A] = L;
      });
      const Y = {
        method: l,
        url: w,
        body: x,
        headers: I,
        clientMappings: S?.clientMappings,
      };
      if (!navigator.onLine)
        return (
          await _f(Y),
          cn.getState().setOnline(!1),
          S
            ? new Response(S.body, {
                status: 202,
                headers: { "Content-Type": "application/json" },
              })
            : new Response(JSON.stringify({ ok: !0, queued: !0 }), {
                status: 202,
                headers: { "Content-Type": "application/json" },
              })
        );
      try {
        const L = await s(r, { ...i, headers: p, body: x ?? i?.body });
        if (!L.ok && L.status >= 500) throw new Error(`HTTP ${L.status}`);
        return L;
      } catch {
        return (
          await _f(Y),
          cn.getState().setOnline(!1),
          S
            ? new Response(S.body, {
                status: 202,
                headers: { "Content-Type": "application/json" },
              })
            : new Response(JSON.stringify({ ok: !0, queued: !0 }), {
                status: 202,
                headers: { "Content-Type": "application/json" },
              })
        );
      }
    };
  },
  i0 = () => {
    "serviceWorker" in navigator &&
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {});
      });
  };
s0();
i0();
xy();
Mm.createRoot(document.getElementById("root")).render(
  h.jsx(Oe.StrictMode, {
    children: h.jsx(Vv, { basename: "/app", children: h.jsx(e0, {}) }),
  }),
);
