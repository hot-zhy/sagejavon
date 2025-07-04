function zm(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const o in r)
        if (o !== "default" && !(o in e)) {
          const i = Object.getOwnPropertyDescriptor(r, o);
          i &&
            Object.defineProperty(
              e,
              o,
              i.get ? i : { enumerable: !0, get: () => r[o] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" })
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const i of o)
      if (i.type === "childList")
        for (const a of i.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && r(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const i = {};
    return (
      o.integrity && (i.integrity = o.integrity),
      o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : o.crossOrigin === "anonymous"
        ? (i.credentials = "omit")
        : (i.credentials = "same-origin"),
      i
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const i = n(o);
    fetch(o.href, i);
  }
})();
var mk =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {};
function jm(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Um = { exports: {} },
  Yl = {},
  Bm = { exports: {} },
  he = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var da = Symbol.for("react.element"),
  s1 = Symbol.for("react.portal"),
  c1 = Symbol.for("react.fragment"),
  u1 = Symbol.for("react.strict_mode"),
  d1 = Symbol.for("react.profiler"),
  f1 = Symbol.for("react.provider"),
  p1 = Symbol.for("react.context"),
  m1 = Symbol.for("react.forward_ref"),
  h1 = Symbol.for("react.suspense"),
  g1 = Symbol.for("react.memo"),
  v1 = Symbol.for("react.lazy"),
  vf = Symbol.iterator;
function y1(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (vf && e[vf]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Hm = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Vm = Object.assign,
  Wm = {};
function Jo(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Wm),
    (this.updater = n || Hm);
}
Jo.prototype.isReactComponent = {};
Jo.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Jo.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Km() {}
Km.prototype = Jo.prototype;
function ju(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Wm),
    (this.updater = n || Hm);
}
var Uu = (ju.prototype = new Km());
Uu.constructor = ju;
Vm(Uu, Jo.prototype);
Uu.isPureReactComponent = !0;
var yf = Array.isArray,
  Gm = Object.prototype.hasOwnProperty,
  Bu = { current: null },
  Ym = { key: !0, ref: !0, __self: !0, __source: !0 };
function Qm(e, t, n) {
  var r,
    o = {},
    i = null,
    a = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (a = t.ref),
    t.key !== void 0 && (i = "" + t.key),
    t))
      Gm.call(t, r) && !Ym.hasOwnProperty(r) && (o[r] = t[r]);
  var l = arguments.length - 2;
  if (l === 1) o.children = n;
  else if (1 < l) {
    for (var s = Array(l), c = 0; c < l; c++) s[c] = arguments[c + 2];
    o.children = s;
  }
  if (e && e.defaultProps)
    for (r in ((l = e.defaultProps), l)) o[r] === void 0 && (o[r] = l[r]);
  return {
    $$typeof: da,
    type: e,
    key: i,
    ref: a,
    props: o,
    _owner: Bu.current,
  };
}
function w1(e, t) {
  return {
    $$typeof: da,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Hu(e) {
  return typeof e == "object" && e !== null && e.$$typeof === da;
}
function x1(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var wf = /\/+/g;
function ks(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? x1("" + e.key)
    : t.toString(36);
}
function Ja(e, t, n, r, o) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var a = !1;
  if (e === null) a = !0;
  else
    switch (i) {
      case "string":
      case "number":
        a = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case da:
          case s1:
            a = !0;
        }
    }
  if (a)
    return (
      (a = e),
      (o = o(a)),
      (e = r === "" ? "." + ks(a, 0) : r),
      yf(o)
        ? ((n = ""),
          e != null && (n = e.replace(wf, "$&/") + "/"),
          Ja(o, t, n, "", function (c) {
            return c;
          }))
        : o != null &&
          (Hu(o) &&
            (o = w1(
              o,
              n +
                (!o.key || (a && a.key === o.key)
                  ? ""
                  : ("" + o.key).replace(wf, "$&/") + "/") +
                e
            )),
          t.push(o)),
      1
    );
  if (((a = 0), (r = r === "" ? "." : r + ":"), yf(e)))
    for (var l = 0; l < e.length; l++) {
      i = e[l];
      var s = r + ks(i, l);
      a += Ja(i, t, n, s, o);
    }
  else if (((s = y1(e)), typeof s == "function"))
    for (e = s.call(e), l = 0; !(i = e.next()).done; )
      (i = i.value), (s = r + ks(i, l++)), (a += Ja(i, t, n, s, o));
  else if (i === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return a;
}
function Ca(e, t, n) {
  if (e == null) return e;
  var r = [],
    o = 0;
  return (
    Ja(e, r, "", "", function (i) {
      return t.call(n, i, o++);
    }),
    r
  );
}
function b1(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Rt = { current: null },
  el = { transition: null },
  E1 = {
    ReactCurrentDispatcher: Rt,
    ReactCurrentBatchConfig: el,
    ReactCurrentOwner: Bu,
  };
he.Children = {
  map: Ca,
  forEach: function (e, t, n) {
    Ca(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Ca(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Ca(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Hu(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
he.Component = Jo;
he.Fragment = c1;
he.Profiler = d1;
he.PureComponent = ju;
he.StrictMode = u1;
he.Suspense = h1;
he.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = E1;
he.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = Vm({}, e.props),
    o = e.key,
    i = e.ref,
    a = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((i = t.ref), (a = Bu.current)),
      t.key !== void 0 && (o = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var l = e.type.defaultProps;
    for (s in t)
      Gm.call(t, s) &&
        !Ym.hasOwnProperty(s) &&
        (r[s] = t[s] === void 0 && l !== void 0 ? l[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) r.children = n;
  else if (1 < s) {
    l = Array(s);
    for (var c = 0; c < s; c++) l[c] = arguments[c + 2];
    r.children = l;
  }
  return { $$typeof: da, type: e.type, key: o, ref: i, props: r, _owner: a };
};
he.createContext = function (e) {
  return (
    (e = {
      $$typeof: p1,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: f1, _context: e }),
    (e.Consumer = e)
  );
};
he.createElement = Qm;
he.createFactory = function (e) {
  var t = Qm.bind(null, e);
  return (t.type = e), t;
};
he.createRef = function () {
  return { current: null };
};
he.forwardRef = function (e) {
  return { $$typeof: m1, render: e };
};
he.isValidElement = Hu;
he.lazy = function (e) {
  return { $$typeof: v1, _payload: { _status: -1, _result: e }, _init: b1 };
};
he.memo = function (e, t) {
  return { $$typeof: g1, type: e, compare: t === void 0 ? null : t };
};
he.startTransition = function (e) {
  var t = el.transition;
  el.transition = {};
  try {
    e();
  } finally {
    el.transition = t;
  }
};
he.unstable_act = function () {
  throw Error("act(...) is not supported in production builds of React.");
};
he.useCallback = function (e, t) {
  return Rt.current.useCallback(e, t);
};
he.useContext = function (e) {
  return Rt.current.useContext(e);
};
he.useDebugValue = function () {};
he.useDeferredValue = function (e) {
  return Rt.current.useDeferredValue(e);
};
he.useEffect = function (e, t) {
  return Rt.current.useEffect(e, t);
};
he.useId = function () {
  return Rt.current.useId();
};
he.useImperativeHandle = function (e, t, n) {
  return Rt.current.useImperativeHandle(e, t, n);
};
he.useInsertionEffect = function (e, t) {
  return Rt.current.useInsertionEffect(e, t);
};
he.useLayoutEffect = function (e, t) {
  return Rt.current.useLayoutEffect(e, t);
};
he.useMemo = function (e, t) {
  return Rt.current.useMemo(e, t);
};
he.useReducer = function (e, t, n) {
  return Rt.current.useReducer(e, t, n);
};
he.useRef = function (e) {
  return Rt.current.useRef(e);
};
he.useState = function (e) {
  return Rt.current.useState(e);
};
he.useSyncExternalStore = function (e, t, n) {
  return Rt.current.useSyncExternalStore(e, t, n);
};
he.useTransition = function () {
  return Rt.current.useTransition();
};
he.version = "18.2.0";
Bm.exports = he;
var f = Bm.exports;
const F = jm(f),
  Xm = zm({ __proto__: null, default: F }, [f]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var S1 = f,
  C1 = Symbol.for("react.element"),
  $1 = Symbol.for("react.fragment"),
  _1 = Object.prototype.hasOwnProperty,
  R1 = S1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  k1 = { key: !0, ref: !0, __self: !0, __source: !0 };
function qm(e, t, n) {
  var r,
    o = {},
    i = null,
    a = null;
  n !== void 0 && (i = "" + n),
    t.key !== void 0 && (i = "" + t.key),
    t.ref !== void 0 && (a = t.ref);
  for (r in t) _1.call(t, r) && !k1.hasOwnProperty(r) && (o[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) o[r] === void 0 && (o[r] = t[r]);
  return {
    $$typeof: C1,
    type: e,
    key: i,
    ref: a,
    props: o,
    _owner: R1.current,
  };
}
Yl.Fragment = $1;
Yl.jsx = qm;
Yl.jsxs = qm;
Um.exports = Yl;
var N = Um.exports,
  xc = {},
  Zm = { exports: {} },
  Vt = {},
  Jm = { exports: {} },
  eh = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(D, P) {
    var I = D.length;
    D.push(P);
    e: for (; 0 < I; ) {
      var j = (I - 1) >>> 1,
        H = D[j];
      if (0 < o(H, P)) (D[j] = P), (D[I] = H), (I = j);
      else break e;
    }
  }
  function n(D) {
    return D.length === 0 ? null : D[0];
  }
  function r(D) {
    if (D.length === 0) return null;
    var P = D[0],
      I = D.pop();
    if (I !== P) {
      D[0] = I;
      e: for (var j = 0, H = D.length, se = H >>> 1; j < se; ) {
        var Z = 2 * (j + 1) - 1,
          ye = D[Z],
          te = Z + 1,
          Oe = D[te];
        if (0 > o(ye, I))
          te < H && 0 > o(Oe, ye)
            ? ((D[j] = Oe), (D[te] = I), (j = te))
            : ((D[j] = ye), (D[Z] = I), (j = Z));
        else if (te < H && 0 > o(Oe, I)) (D[j] = Oe), (D[te] = I), (j = te);
        else break e;
      }
    }
    return P;
  }
  function o(D, P) {
    var I = D.sortIndex - P.sortIndex;
    return I !== 0 ? I : D.id - P.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function () {
      return i.now();
    };
  } else {
    var a = Date,
      l = a.now();
    e.unstable_now = function () {
      return a.now() - l;
    };
  }
  var s = [],
    c = [],
    d = 1,
    u = null,
    p = 3,
    y = !1,
    v = !1,
    g = !1,
    x = typeof setTimeout == "function" ? setTimeout : null,
    m = typeof clearTimeout == "function" ? clearTimeout : null,
    h = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function w(D) {
    for (var P = n(c); P !== null; ) {
      if (P.callback === null) r(c);
      else if (P.startTime <= D)
        r(c), (P.sortIndex = P.expirationTime), t(s, P);
      else break;
      P = n(c);
    }
  }
  function E(D) {
    if (((g = !1), w(D), !v))
      if (n(s) !== null) (v = !0), ie($);
      else {
        var P = n(c);
        P !== null && Q(E, P.startTime - D);
      }
  }
  function $(D, P) {
    (v = !1), g && ((g = !1), m(k), (k = -1)), (y = !0);
    var I = p;
    try {
      for (
        w(P), u = n(s);
        u !== null && (!(u.expirationTime > P) || (D && !K()));

      ) {
        var j = u.callback;
        if (typeof j == "function") {
          (u.callback = null), (p = u.priorityLevel);
          var H = j(u.expirationTime <= P);
          (P = e.unstable_now()),
            typeof H == "function" ? (u.callback = H) : u === n(s) && r(s),
            w(P);
        } else r(s);
        u = n(s);
      }
      if (u !== null) var se = !0;
      else {
        var Z = n(c);
        Z !== null && Q(E, Z.startTime - P), (se = !1);
      }
      return se;
    } finally {
      (u = null), (p = I), (y = !1);
    }
  }
  var b = !1,
    _ = null,
    k = -1,
    O = 5,
    M = -1;
  function K() {
    return !(e.unstable_now() - M < O);
  }
  function z() {
    if (_ !== null) {
      var D = e.unstable_now();
      M = D;
      var P = !0;
      try {
        P = _(!0, D);
      } finally {
        P ? ne() : ((b = !1), (_ = null));
      }
    } else b = !1;
  }
  var ne;
  if (typeof h == "function")
    ne = function () {
      h(z);
    };
  else if (typeof MessageChannel < "u") {
    var W = new MessageChannel(),
      J = W.port2;
    (W.port1.onmessage = z),
      (ne = function () {
        J.postMessage(null);
      });
  } else
    ne = function () {
      x(z, 0);
    };
  function ie(D) {
    (_ = D), b || ((b = !0), ne());
  }
  function Q(D, P) {
    k = x(function () {
      D(e.unstable_now());
    }, P);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (D) {
      D.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      v || y || ((v = !0), ie($));
    }),
    (e.unstable_forceFrameRate = function (D) {
      0 > D || 125 < D
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (O = 0 < D ? Math.floor(1e3 / D) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return p;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(s);
    }),
    (e.unstable_next = function (D) {
      switch (p) {
        case 1:
        case 2:
        case 3:
          var P = 3;
          break;
        default:
          P = p;
      }
      var I = p;
      p = P;
      try {
        return D();
      } finally {
        p = I;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (D, P) {
      switch (D) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          D = 3;
      }
      var I = p;
      p = D;
      try {
        return P();
      } finally {
        p = I;
      }
    }),
    (e.unstable_scheduleCallback = function (D, P, I) {
      var j = e.unstable_now();
      switch (
        (typeof I == "object" && I !== null
          ? ((I = I.delay), (I = typeof I == "number" && 0 < I ? j + I : j))
          : (I = j),
        D)
      ) {
        case 1:
          var H = -1;
          break;
        case 2:
          H = 250;
          break;
        case 5:
          H = 1073741823;
          break;
        case 4:
          H = 1e4;
          break;
        default:
          H = 5e3;
      }
      return (
        (H = I + H),
        (D = {
          id: d++,
          callback: P,
          priorityLevel: D,
          startTime: I,
          expirationTime: H,
          sortIndex: -1,
        }),
        I > j
          ? ((D.sortIndex = I),
            t(c, D),
            n(s) === null &&
              D === n(c) &&
              (g ? (m(k), (k = -1)) : (g = !0), Q(E, I - j)))
          : ((D.sortIndex = H), t(s, D), v || y || ((v = !0), ie($))),
        D
      );
    }),
    (e.unstable_shouldYield = K),
    (e.unstable_wrapCallback = function (D) {
      var P = p;
      return function () {
        var I = p;
        p = P;
        try {
          return D.apply(this, arguments);
        } finally {
          p = I;
        }
      };
    });
})(eh);
Jm.exports = eh;
var T1 = Jm.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var th = f,
  Bt = T1;
function L(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
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
var nh = new Set(),
  ji = {};
function fo(e, t) {
  Bo(e, t), Bo(e + "Capture", t);
}
function Bo(e, t) {
  for (ji[e] = t, e = 0; e < t.length; e++) nh.add(t[e]);
}
var Qn = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  bc = Object.prototype.hasOwnProperty,
  P1 =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  xf = {},
  bf = {};
function N1(e) {
  return bc.call(bf, e)
    ? !0
    : bc.call(xf, e)
    ? !1
    : P1.test(e)
    ? (bf[e] = !0)
    : ((xf[e] = !0), !1);
}
function A1(e, t, n, r) {
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
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function D1(e, t, n, r) {
  if (t === null || typeof t > "u" || A1(e, t, n, r)) return !0;
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
function kt(e, t, n, r, o, i, a) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = o),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = i),
    (this.removeEmptyString = a);
}
var ht = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    ht[e] = new kt(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  ht[t] = new kt(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  ht[e] = new kt(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  ht[e] = new kt(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    ht[e] = new kt(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  ht[e] = new kt(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  ht[e] = new kt(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  ht[e] = new kt(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  ht[e] = new kt(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Vu = /[\-:]([a-z])/g;
function Wu(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Vu, Wu);
    ht[t] = new kt(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Vu, Wu);
    ht[t] = new kt(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Vu, Wu);
  ht[t] = new kt(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  ht[e] = new kt(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ht.xlinkHref = new kt(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  ht[e] = new kt(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Ku(e, t, n, r) {
  var o = ht.hasOwnProperty(t) ? ht[t] : null;
  (o !== null
    ? o.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (D1(t, n, o, r) && (n = null),
    r || o === null
      ? N1(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
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
var rr = th.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  $a = Symbol.for("react.element"),
  bo = Symbol.for("react.portal"),
  Eo = Symbol.for("react.fragment"),
  Gu = Symbol.for("react.strict_mode"),
  Ec = Symbol.for("react.profiler"),
  rh = Symbol.for("react.provider"),
  oh = Symbol.for("react.context"),
  Yu = Symbol.for("react.forward_ref"),
  Sc = Symbol.for("react.suspense"),
  Cc = Symbol.for("react.suspense_list"),
  Qu = Symbol.for("react.memo"),
  vr = Symbol.for("react.lazy"),
  ih = Symbol.for("react.offscreen"),
  Ef = Symbol.iterator;
function li(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Ef && e[Ef]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Be = Object.assign,
  Ts;
function _i(e) {
  if (Ts === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Ts = (t && t[1]) || "";
    }
  return (
    `
` +
    Ts +
    e
  );
}
var Ps = !1;
function Ns(e, t) {
  if (!e || Ps) return "";
  Ps = !0;
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
        } catch (c) {
          var r = c;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (c) {
          r = c;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (c) {
        r = c;
      }
      e();
    }
  } catch (c) {
    if (c && r && typeof c.stack == "string") {
      for (
        var o = c.stack.split(`
`),
          i = r.stack.split(`
`),
          a = o.length - 1,
          l = i.length - 1;
        1 <= a && 0 <= l && o[a] !== i[l];

      )
        l--;
      for (; 1 <= a && 0 <= l; a--, l--)
        if (o[a] !== i[l]) {
          if (a !== 1 || l !== 1)
            do
              if ((a--, l--, 0 > l || o[a] !== i[l])) {
                var s =
                  `
` + o[a].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    s.includes("<anonymous>") &&
                    (s = s.replace("<anonymous>", e.displayName)),
                  s
                );
              }
            while (1 <= a && 0 <= l);
          break;
        }
    }
  } finally {
    (Ps = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? _i(e) : "";
}
function O1(e) {
  switch (e.tag) {
    case 5:
      return _i(e.type);
    case 16:
      return _i("Lazy");
    case 13:
      return _i("Suspense");
    case 19:
      return _i("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = Ns(e.type, !1)), e;
    case 11:
      return (e = Ns(e.type.render, !1)), e;
    case 1:
      return (e = Ns(e.type, !0)), e;
    default:
      return "";
  }
}
function $c(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Eo:
      return "Fragment";
    case bo:
      return "Portal";
    case Ec:
      return "Profiler";
    case Gu:
      return "StrictMode";
    case Sc:
      return "Suspense";
    case Cc:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case oh:
        return (e.displayName || "Context") + ".Consumer";
      case rh:
        return (e._context.displayName || "Context") + ".Provider";
      case Yu:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Qu:
        return (
          (t = e.displayName || null), t !== null ? t : $c(e.type) || "Memo"
        );
      case vr:
        (t = e._payload), (e = e._init);
        try {
          return $c(e(t));
        } catch {}
    }
  return null;
}
function M1(e) {
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
      return $c(t);
    case 8:
      return t === Gu ? "StrictMode" : "Mode";
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
function Nr(e) {
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
function ah(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function L1(e) {
  var t = ah(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var o = n.get,
      i = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return o.call(this);
        },
        set: function (a) {
          (r = "" + a), i.call(this, a);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (a) {
          r = "" + a;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function _a(e) {
  e._valueTracker || (e._valueTracker = L1(e));
}
function lh(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = ah(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function yl(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function _c(e, t) {
  var n = t.checked;
  return Be({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function Sf(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = Nr(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function sh(e, t) {
  (t = t.checked), t != null && Ku(e, "checked", t, !1);
}
function Rc(e, t) {
  sh(e, t);
  var n = Nr(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? kc(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && kc(e, t.type, Nr(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function Cf(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function kc(e, t, n) {
  (t !== "number" || yl(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Ri = Array.isArray;
function Mo(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
    for (n = 0; n < e.length; n++)
      (o = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== o && (e[n].selected = o),
        o && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Nr(n), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === n) {
        (e[o].selected = !0), r && (e[o].defaultSelected = !0);
        return;
      }
      t !== null || e[o].disabled || (t = e[o]);
    }
    t !== null && (t.selected = !0);
  }
}
function Tc(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(L(91));
  return Be({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function $f(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(L(92));
      if (Ri(n)) {
        if (1 < n.length) throw Error(L(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: Nr(n) };
}
function ch(e, t) {
  var n = Nr(t.value),
    r = Nr(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function _f(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function uh(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Pc(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? uh(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var Ra,
  dh = (function (e) {
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
        Ra = Ra || document.createElement("div"),
          Ra.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Ra.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Ui(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Pi = {
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
  I1 = ["Webkit", "ms", "Moz", "O"];
Object.keys(Pi).forEach(function (e) {
  I1.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Pi[t] = Pi[e]);
  });
});
function fh(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Pi.hasOwnProperty(e) && Pi[e])
    ? ("" + t).trim()
    : t + "px";
}
function ph(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        o = fh(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, o) : (e[n] = o);
    }
}
var F1 = Be(
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
  }
);
function Nc(e, t) {
  if (t) {
    if (F1[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(L(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(L(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(L(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(L(62));
  }
}
function Ac(e, t) {
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
var Dc = null;
function Xu(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Oc = null,
  Lo = null,
  Io = null;
function Rf(e) {
  if ((e = ma(e))) {
    if (typeof Oc != "function") throw Error(L(280));
    var t = e.stateNode;
    t && ((t = Jl(t)), Oc(e.stateNode, e.type, t));
  }
}
function mh(e) {
  Lo ? (Io ? Io.push(e) : (Io = [e])) : (Lo = e);
}
function hh() {
  if (Lo) {
    var e = Lo,
      t = Io;
    if (((Io = Lo = null), Rf(e), t)) for (e = 0; e < t.length; e++) Rf(t[e]);
  }
}
function gh(e, t) {
  return e(t);
}
function vh() {}
var As = !1;
function yh(e, t, n) {
  if (As) return e(t, n);
  As = !0;
  try {
    return gh(e, t, n);
  } finally {
    (As = !1), (Lo !== null || Io !== null) && (vh(), hh());
  }
}
function Bi(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Jl(n);
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
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(L(231, t, typeof n));
  return n;
}
var Mc = !1;
if (Qn)
  try {
    var si = {};
    Object.defineProperty(si, "passive", {
      get: function () {
        Mc = !0;
      },
    }),
      window.addEventListener("test", si, si),
      window.removeEventListener("test", si, si);
  } catch {
    Mc = !1;
  }
function z1(e, t, n, r, o, i, a, l, s) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (d) {
    this.onError(d);
  }
}
var Ni = !1,
  wl = null,
  xl = !1,
  Lc = null,
  j1 = {
    onError: function (e) {
      (Ni = !0), (wl = e);
    },
  };
function U1(e, t, n, r, o, i, a, l, s) {
  (Ni = !1), (wl = null), z1.apply(j1, arguments);
}
function B1(e, t, n, r, o, i, a, l, s) {
  if ((U1.apply(this, arguments), Ni)) {
    if (Ni) {
      var c = wl;
      (Ni = !1), (wl = null);
    } else throw Error(L(198));
    xl || ((xl = !0), (Lc = c));
  }
}
function po(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function wh(e) {
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
function kf(e) {
  if (po(e) !== e) throw Error(L(188));
}
function H1(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = po(e)), t === null)) throw Error(L(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var o = n.return;
    if (o === null) break;
    var i = o.alternate;
    if (i === null) {
      if (((r = o.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (o.child === i.child) {
      for (i = o.child; i; ) {
        if (i === n) return kf(o), e;
        if (i === r) return kf(o), t;
        i = i.sibling;
      }
      throw Error(L(188));
    }
    if (n.return !== r.return) (n = o), (r = i);
    else {
      for (var a = !1, l = o.child; l; ) {
        if (l === n) {
          (a = !0), (n = o), (r = i);
          break;
        }
        if (l === r) {
          (a = !0), (r = o), (n = i);
          break;
        }
        l = l.sibling;
      }
      if (!a) {
        for (l = i.child; l; ) {
          if (l === n) {
            (a = !0), (n = i), (r = o);
            break;
          }
          if (l === r) {
            (a = !0), (r = i), (n = o);
            break;
          }
          l = l.sibling;
        }
        if (!a) throw Error(L(189));
      }
    }
    if (n.alternate !== r) throw Error(L(190));
  }
  if (n.tag !== 3) throw Error(L(188));
  return n.stateNode.current === n ? e : t;
}
function xh(e) {
  return (e = H1(e)), e !== null ? bh(e) : null;
}
function bh(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = bh(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Eh = Bt.unstable_scheduleCallback,
  Tf = Bt.unstable_cancelCallback,
  V1 = Bt.unstable_shouldYield,
  W1 = Bt.unstable_requestPaint,
  Je = Bt.unstable_now,
  K1 = Bt.unstable_getCurrentPriorityLevel,
  qu = Bt.unstable_ImmediatePriority,
  Sh = Bt.unstable_UserBlockingPriority,
  bl = Bt.unstable_NormalPriority,
  G1 = Bt.unstable_LowPriority,
  Ch = Bt.unstable_IdlePriority,
  Ql = null,
  Pn = null;
function Y1(e) {
  if (Pn && typeof Pn.onCommitFiberRoot == "function")
    try {
      Pn.onCommitFiberRoot(Ql, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var hn = Math.clz32 ? Math.clz32 : q1,
  Q1 = Math.log,
  X1 = Math.LN2;
function q1(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((Q1(e) / X1) | 0)) | 0;
}
var ka = 64,
  Ta = 4194304;
function ki(e) {
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
function El(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    o = e.suspendedLanes,
    i = e.pingedLanes,
    a = n & 268435455;
  if (a !== 0) {
    var l = a & ~o;
    l !== 0 ? (r = ki(l)) : ((i &= a), i !== 0 && (r = ki(i)));
  } else (a = n & ~o), a !== 0 ? (r = ki(a)) : i !== 0 && (r = ki(i));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & o) &&
    ((o = r & -r), (i = t & -t), o >= i || (o === 16 && (i & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - hn(t)), (o = 1 << n), (r |= e[n]), (t &= ~o);
  return r;
}
function Z1(e, t) {
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
function J1(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      o = e.expirationTimes,
      i = e.pendingLanes;
    0 < i;

  ) {
    var a = 31 - hn(i),
      l = 1 << a,
      s = o[a];
    s === -1
      ? (!(l & n) || l & r) && (o[a] = Z1(l, t))
      : s <= t && (e.expiredLanes |= l),
      (i &= ~l);
  }
}
function Ic(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function $h() {
  var e = ka;
  return (ka <<= 1), !(ka & 4194240) && (ka = 64), e;
}
function Ds(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function fa(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - hn(t)),
    (e[t] = n);
}
function ew(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var o = 31 - hn(n),
      i = 1 << o;
    (t[o] = 0), (r[o] = -1), (e[o] = -1), (n &= ~i);
  }
}
function Zu(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - hn(n),
      o = 1 << r;
    (o & t) | (e[r] & t) && (e[r] |= t), (n &= ~o);
  }
}
var Ce = 0;
function _h(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var Rh,
  Ju,
  kh,
  Th,
  Ph,
  Fc = !1,
  Pa = [],
  Sr = null,
  Cr = null,
  $r = null,
  Hi = new Map(),
  Vi = new Map(),
  wr = [],
  tw =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function Pf(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Sr = null;
      break;
    case "dragenter":
    case "dragleave":
      Cr = null;
      break;
    case "mouseover":
    case "mouseout":
      $r = null;
      break;
    case "pointerover":
    case "pointerout":
      Hi.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Vi.delete(t.pointerId);
  }
}
function ci(e, t, n, r, o, i) {
  return e === null || e.nativeEvent !== i
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [o],
      }),
      t !== null && ((t = ma(t)), t !== null && Ju(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      o !== null && t.indexOf(o) === -1 && t.push(o),
      e);
}
function nw(e, t, n, r, o) {
  switch (t) {
    case "focusin":
      return (Sr = ci(Sr, e, t, n, r, o)), !0;
    case "dragenter":
      return (Cr = ci(Cr, e, t, n, r, o)), !0;
    case "mouseover":
      return ($r = ci($r, e, t, n, r, o)), !0;
    case "pointerover":
      var i = o.pointerId;
      return Hi.set(i, ci(Hi.get(i) || null, e, t, n, r, o)), !0;
    case "gotpointercapture":
      return (
        (i = o.pointerId), Vi.set(i, ci(Vi.get(i) || null, e, t, n, r, o)), !0
      );
  }
  return !1;
}
function Nh(e) {
  var t = Yr(e.target);
  if (t !== null) {
    var n = po(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = wh(n)), t !== null)) {
          (e.blockedOn = t),
            Ph(e.priority, function () {
              kh(n);
            });
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
function tl(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = zc(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (Dc = r), n.target.dispatchEvent(r), (Dc = null);
    } else return (t = ma(n)), t !== null && Ju(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function Nf(e, t, n) {
  tl(e) && n.delete(t);
}
function rw() {
  (Fc = !1),
    Sr !== null && tl(Sr) && (Sr = null),
    Cr !== null && tl(Cr) && (Cr = null),
    $r !== null && tl($r) && ($r = null),
    Hi.forEach(Nf),
    Vi.forEach(Nf);
}
function ui(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Fc ||
      ((Fc = !0),
      Bt.unstable_scheduleCallback(Bt.unstable_NormalPriority, rw)));
}
function Wi(e) {
  function t(o) {
    return ui(o, e);
  }
  if (0 < Pa.length) {
    ui(Pa[0], e);
    for (var n = 1; n < Pa.length; n++) {
      var r = Pa[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Sr !== null && ui(Sr, e),
      Cr !== null && ui(Cr, e),
      $r !== null && ui($r, e),
      Hi.forEach(t),
      Vi.forEach(t),
      n = 0;
    n < wr.length;
    n++
  )
    (r = wr[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < wr.length && ((n = wr[0]), n.blockedOn === null); )
    Nh(n), n.blockedOn === null && wr.shift();
}
var Fo = rr.ReactCurrentBatchConfig,
  Sl = !0;
function ow(e, t, n, r) {
  var o = Ce,
    i = Fo.transition;
  Fo.transition = null;
  try {
    (Ce = 1), ed(e, t, n, r);
  } finally {
    (Ce = o), (Fo.transition = i);
  }
}
function iw(e, t, n, r) {
  var o = Ce,
    i = Fo.transition;
  Fo.transition = null;
  try {
    (Ce = 4), ed(e, t, n, r);
  } finally {
    (Ce = o), (Fo.transition = i);
  }
}
function ed(e, t, n, r) {
  if (Sl) {
    var o = zc(e, t, n, r);
    if (o === null) Hs(e, t, r, Cl, n), Pf(e, r);
    else if (nw(o, e, t, n, r)) r.stopPropagation();
    else if ((Pf(e, r), t & 4 && -1 < tw.indexOf(e))) {
      for (; o !== null; ) {
        var i = ma(o);
        if (
          (i !== null && Rh(i),
          (i = zc(e, t, n, r)),
          i === null && Hs(e, t, r, Cl, n),
          i === o)
        )
          break;
        o = i;
      }
      o !== null && r.stopPropagation();
    } else Hs(e, t, r, null, n);
  }
}
var Cl = null;
function zc(e, t, n, r) {
  if (((Cl = null), (e = Xu(r)), (e = Yr(e)), e !== null))
    if (((t = po(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = wh(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (Cl = e), null;
}
function Ah(e) {
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
      switch (K1()) {
        case qu:
          return 1;
        case Sh:
          return 4;
        case bl:
        case G1:
          return 16;
        case Ch:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var br = null,
  td = null,
  nl = null;
function Dh() {
  if (nl) return nl;
  var e,
    t = td,
    n = t.length,
    r,
    o = "value" in br ? br.value : br.textContent,
    i = o.length;
  for (e = 0; e < n && t[e] === o[e]; e++);
  var a = n - e;
  for (r = 1; r <= a && t[n - r] === o[i - r]; r++);
  return (nl = o.slice(e, 1 < r ? 1 - r : void 0));
}
function rl(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Na() {
  return !0;
}
function Af() {
  return !1;
}
function Wt(e) {
  function t(n, r, o, i, a) {
    (this._reactName = n),
      (this._targetInst = o),
      (this.type = r),
      (this.nativeEvent = i),
      (this.target = a),
      (this.currentTarget = null);
    for (var l in e)
      e.hasOwnProperty(l) && ((n = e[l]), (this[l] = n ? n(i) : i[l]));
    return (
      (this.isDefaultPrevented = (
        i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
      )
        ? Na
        : Af),
      (this.isPropagationStopped = Af),
      this
    );
  }
  return (
    Be(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Na));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Na));
      },
      persist: function () {},
      isPersistent: Na,
    }),
    t
  );
}
var ei = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  nd = Wt(ei),
  pa = Be({}, ei, { view: 0, detail: 0 }),
  aw = Wt(pa),
  Os,
  Ms,
  di,
  Xl = Be({}, pa, {
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
    getModifierState: rd,
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
        : (e !== di &&
            (di && e.type === "mousemove"
              ? ((Os = e.screenX - di.screenX), (Ms = e.screenY - di.screenY))
              : (Ms = Os = 0),
            (di = e)),
          Os);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Ms;
    },
  }),
  Df = Wt(Xl),
  lw = Be({}, Xl, { dataTransfer: 0 }),
  sw = Wt(lw),
  cw = Be({}, pa, { relatedTarget: 0 }),
  Ls = Wt(cw),
  uw = Be({}, ei, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  dw = Wt(uw),
  fw = Be({}, ei, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  pw = Wt(fw),
  mw = Be({}, ei, { data: 0 }),
  Of = Wt(mw),
  hw = {
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
  gw = {
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
  vw = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function yw(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = vw[e]) ? !!t[e] : !1;
}
function rd() {
  return yw;
}
var ww = Be({}, pa, {
    key: function (e) {
      if (e.key) {
        var t = hw[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = rl(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? gw[e.keyCode] || "Unidentified"
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
    getModifierState: rd,
    charCode: function (e) {
      return e.type === "keypress" ? rl(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? rl(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  xw = Wt(ww),
  bw = Be({}, Xl, {
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
  Mf = Wt(bw),
  Ew = Be({}, pa, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: rd,
  }),
  Sw = Wt(Ew),
  Cw = Be({}, ei, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  $w = Wt(Cw),
  _w = Be({}, Xl, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
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
  Rw = Wt(_w),
  kw = [9, 13, 27, 32],
  od = Qn && "CompositionEvent" in window,
  Ai = null;
Qn && "documentMode" in document && (Ai = document.documentMode);
var Tw = Qn && "TextEvent" in window && !Ai,
  Oh = Qn && (!od || (Ai && 8 < Ai && 11 >= Ai)),
  Lf = " ",
  If = !1;
function Mh(e, t) {
  switch (e) {
    case "keyup":
      return kw.indexOf(t.keyCode) !== -1;
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
function Lh(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var So = !1;
function Pw(e, t) {
  switch (e) {
    case "compositionend":
      return Lh(t);
    case "keypress":
      return t.which !== 32 ? null : ((If = !0), Lf);
    case "textInput":
      return (e = t.data), e === Lf && If ? null : e;
    default:
      return null;
  }
}
function Nw(e, t) {
  if (So)
    return e === "compositionend" || (!od && Mh(e, t))
      ? ((e = Dh()), (nl = td = br = null), (So = !1), e)
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
      return Oh && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Aw = {
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
function Ff(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Aw[e.type] : t === "textarea";
}
function Ih(e, t, n, r) {
  mh(r),
    (t = $l(t, "onChange")),
    0 < t.length &&
      ((n = new nd("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var Di = null,
  Ki = null;
function Dw(e) {
  Yh(e, 0);
}
function ql(e) {
  var t = _o(e);
  if (lh(t)) return e;
}
function Ow(e, t) {
  if (e === "change") return t;
}
var Fh = !1;
if (Qn) {
  var Is;
  if (Qn) {
    var Fs = "oninput" in document;
    if (!Fs) {
      var zf = document.createElement("div");
      zf.setAttribute("oninput", "return;"),
        (Fs = typeof zf.oninput == "function");
    }
    Is = Fs;
  } else Is = !1;
  Fh = Is && (!document.documentMode || 9 < document.documentMode);
}
function jf() {
  Di && (Di.detachEvent("onpropertychange", zh), (Ki = Di = null));
}
function zh(e) {
  if (e.propertyName === "value" && ql(Ki)) {
    var t = [];
    Ih(t, Ki, e, Xu(e)), yh(Dw, t);
  }
}
function Mw(e, t, n) {
  e === "focusin"
    ? (jf(), (Di = t), (Ki = n), Di.attachEvent("onpropertychange", zh))
    : e === "focusout" && jf();
}
function Lw(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return ql(Ki);
}
function Iw(e, t) {
  if (e === "click") return ql(t);
}
function Fw(e, t) {
  if (e === "input" || e === "change") return ql(t);
}
function zw(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var yn = typeof Object.is == "function" ? Object.is : zw;
function Gi(e, t) {
  if (yn(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var o = n[r];
    if (!bc.call(t, o) || !yn(e[o], t[o])) return !1;
  }
  return !0;
}
function Uf(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Bf(e, t) {
  var n = Uf(e);
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
    n = Uf(n);
  }
}
function jh(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? jh(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function Uh() {
  for (var e = window, t = yl(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = yl(e.document);
  }
  return t;
}
function id(e) {
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
function jw(e) {
  var t = Uh(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    jh(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && id(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var o = n.textContent.length,
          i = Math.min(r.start, o);
        (r = r.end === void 0 ? i : Math.min(r.end, o)),
          !e.extend && i > r && ((o = r), (r = i), (i = o)),
          (o = Bf(n, i));
        var a = Bf(n, r);
        o &&
          a &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== o.node ||
            e.anchorOffset !== o.offset ||
            e.focusNode !== a.node ||
            e.focusOffset !== a.offset) &&
          ((t = t.createRange()),
          t.setStart(o.node, o.offset),
          e.removeAllRanges(),
          i > r
            ? (e.addRange(t), e.extend(a.node, a.offset))
            : (t.setEnd(a.node, a.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var Uw = Qn && "documentMode" in document && 11 >= document.documentMode,
  Co = null,
  jc = null,
  Oi = null,
  Uc = !1;
function Hf(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Uc ||
    Co == null ||
    Co !== yl(r) ||
    ((r = Co),
    "selectionStart" in r && id(r)
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
    (Oi && Gi(Oi, r)) ||
      ((Oi = r),
      (r = $l(jc, "onSelect")),
      0 < r.length &&
        ((t = new nd("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = Co))));
}
function Aa(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var $o = {
    animationend: Aa("Animation", "AnimationEnd"),
    animationiteration: Aa("Animation", "AnimationIteration"),
    animationstart: Aa("Animation", "AnimationStart"),
    transitionend: Aa("Transition", "TransitionEnd"),
  },
  zs = {},
  Bh = {};
Qn &&
  ((Bh = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete $o.animationend.animation,
    delete $o.animationiteration.animation,
    delete $o.animationstart.animation),
  "TransitionEvent" in window || delete $o.transitionend.transition);
function Zl(e) {
  if (zs[e]) return zs[e];
  if (!$o[e]) return e;
  var t = $o[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Bh) return (zs[e] = t[n]);
  return e;
}
var Hh = Zl("animationend"),
  Vh = Zl("animationiteration"),
  Wh = Zl("animationstart"),
  Kh = Zl("transitionend"),
  Gh = new Map(),
  Vf =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function Fr(e, t) {
  Gh.set(e, t), fo(t, [e]);
}
for (var js = 0; js < Vf.length; js++) {
  var Us = Vf[js],
    Bw = Us.toLowerCase(),
    Hw = Us[0].toUpperCase() + Us.slice(1);
  Fr(Bw, "on" + Hw);
}
Fr(Hh, "onAnimationEnd");
Fr(Vh, "onAnimationIteration");
Fr(Wh, "onAnimationStart");
Fr("dblclick", "onDoubleClick");
Fr("focusin", "onFocus");
Fr("focusout", "onBlur");
Fr(Kh, "onTransitionEnd");
Bo("onMouseEnter", ["mouseout", "mouseover"]);
Bo("onMouseLeave", ["mouseout", "mouseover"]);
Bo("onPointerEnter", ["pointerout", "pointerover"]);
Bo("onPointerLeave", ["pointerout", "pointerover"]);
fo(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
fo(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
fo("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fo(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
fo(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
fo(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Ti =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  Vw = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ti));
function Wf(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), B1(r, t, void 0, e), (e.currentTarget = null);
}
function Yh(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      o = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var a = r.length - 1; 0 <= a; a--) {
          var l = r[a],
            s = l.instance,
            c = l.currentTarget;
          if (((l = l.listener), s !== i && o.isPropagationStopped())) break e;
          Wf(o, l, c), (i = s);
        }
      else
        for (a = 0; a < r.length; a++) {
          if (
            ((l = r[a]),
            (s = l.instance),
            (c = l.currentTarget),
            (l = l.listener),
            s !== i && o.isPropagationStopped())
          )
            break e;
          Wf(o, l, c), (i = s);
        }
    }
  }
  if (xl) throw ((e = Lc), (xl = !1), (Lc = null), e);
}
function Ne(e, t) {
  var n = t[Kc];
  n === void 0 && (n = t[Kc] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Qh(t, e, 2, !1), n.add(r));
}
function Bs(e, t, n) {
  var r = 0;
  t && (r |= 4), Qh(n, e, r, t);
}
var Da = "_reactListening" + Math.random().toString(36).slice(2);
function Yi(e) {
  if (!e[Da]) {
    (e[Da] = !0),
      nh.forEach(function (n) {
        n !== "selectionchange" && (Vw.has(n) || Bs(n, !1, e), Bs(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Da] || ((t[Da] = !0), Bs("selectionchange", !1, t));
  }
}
function Qh(e, t, n, r) {
  switch (Ah(t)) {
    case 1:
      var o = ow;
      break;
    case 4:
      o = iw;
      break;
    default:
      o = ed;
  }
  (n = o.bind(null, t, n, e)),
    (o = void 0),
    !Mc ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (o = !0),
    r
      ? o !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: o })
        : e.addEventListener(t, n, !0)
      : o !== void 0
      ? e.addEventListener(t, n, { passive: o })
      : e.addEventListener(t, n, !1);
}
function Hs(e, t, n, r, o) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var a = r.tag;
      if (a === 3 || a === 4) {
        var l = r.stateNode.containerInfo;
        if (l === o || (l.nodeType === 8 && l.parentNode === o)) break;
        if (a === 4)
          for (a = r.return; a !== null; ) {
            var s = a.tag;
            if (
              (s === 3 || s === 4) &&
              ((s = a.stateNode.containerInfo),
              s === o || (s.nodeType === 8 && s.parentNode === o))
            )
              return;
            a = a.return;
          }
        for (; l !== null; ) {
          if (((a = Yr(l)), a === null)) return;
          if (((s = a.tag), s === 5 || s === 6)) {
            r = i = a;
            continue e;
          }
          l = l.parentNode;
        }
      }
      r = r.return;
    }
  yh(function () {
    var c = i,
      d = Xu(n),
      u = [];
    e: {
      var p = Gh.get(e);
      if (p !== void 0) {
        var y = nd,
          v = e;
        switch (e) {
          case "keypress":
            if (rl(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = xw;
            break;
          case "focusin":
            (v = "focus"), (y = Ls);
            break;
          case "focusout":
            (v = "blur"), (y = Ls);
            break;
          case "beforeblur":
          case "afterblur":
            y = Ls;
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
            y = Df;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = sw;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = Sw;
            break;
          case Hh:
          case Vh:
          case Wh:
            y = dw;
            break;
          case Kh:
            y = $w;
            break;
          case "scroll":
            y = aw;
            break;
          case "wheel":
            y = Rw;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = pw;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = Mf;
        }
        var g = (t & 4) !== 0,
          x = !g && e === "scroll",
          m = g ? (p !== null ? p + "Capture" : null) : p;
        g = [];
        for (var h = c, w; h !== null; ) {
          w = h;
          var E = w.stateNode;
          if (
            (w.tag === 5 &&
              E !== null &&
              ((w = E),
              m !== null && ((E = Bi(h, m)), E != null && g.push(Qi(h, E, w)))),
            x)
          )
            break;
          h = h.return;
        }
        0 < g.length &&
          ((p = new y(p, v, null, n, d)), u.push({ event: p, listeners: g }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((p = e === "mouseover" || e === "pointerover"),
          (y = e === "mouseout" || e === "pointerout"),
          p &&
            n !== Dc &&
            (v = n.relatedTarget || n.fromElement) &&
            (Yr(v) || v[Xn]))
        )
          break e;
        if (
          (y || p) &&
          ((p =
            d.window === d
              ? d
              : (p = d.ownerDocument)
              ? p.defaultView || p.parentWindow
              : window),
          y
            ? ((v = n.relatedTarget || n.toElement),
              (y = c),
              (v = v ? Yr(v) : null),
              v !== null &&
                ((x = po(v)), v !== x || (v.tag !== 5 && v.tag !== 6)) &&
                (v = null))
            : ((y = null), (v = c)),
          y !== v)
        ) {
          if (
            ((g = Df),
            (E = "onMouseLeave"),
            (m = "onMouseEnter"),
            (h = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((g = Mf),
              (E = "onPointerLeave"),
              (m = "onPointerEnter"),
              (h = "pointer")),
            (x = y == null ? p : _o(y)),
            (w = v == null ? p : _o(v)),
            (p = new g(E, h + "leave", y, n, d)),
            (p.target = x),
            (p.relatedTarget = w),
            (E = null),
            Yr(d) === c &&
              ((g = new g(m, h + "enter", v, n, d)),
              (g.target = w),
              (g.relatedTarget = x),
              (E = g)),
            (x = E),
            y && v)
          )
            t: {
              for (g = y, m = v, h = 0, w = g; w; w = vo(w)) h++;
              for (w = 0, E = m; E; E = vo(E)) w++;
              for (; 0 < h - w; ) (g = vo(g)), h--;
              for (; 0 < w - h; ) (m = vo(m)), w--;
              for (; h--; ) {
                if (g === m || (m !== null && g === m.alternate)) break t;
                (g = vo(g)), (m = vo(m));
              }
              g = null;
            }
          else g = null;
          y !== null && Kf(u, p, y, g, !1),
            v !== null && x !== null && Kf(u, x, v, g, !0);
        }
      }
      e: {
        if (
          ((p = c ? _o(c) : window),
          (y = p.nodeName && p.nodeName.toLowerCase()),
          y === "select" || (y === "input" && p.type === "file"))
        )
          var $ = Ow;
        else if (Ff(p))
          if (Fh) $ = Fw;
          else {
            $ = Lw;
            var b = Mw;
          }
        else
          (y = p.nodeName) &&
            y.toLowerCase() === "input" &&
            (p.type === "checkbox" || p.type === "radio") &&
            ($ = Iw);
        if ($ && ($ = $(e, c))) {
          Ih(u, $, n, d);
          break e;
        }
        b && b(e, p, c),
          e === "focusout" &&
            (b = p._wrapperState) &&
            b.controlled &&
            p.type === "number" &&
            kc(p, "number", p.value);
      }
      switch (((b = c ? _o(c) : window), e)) {
        case "focusin":
          (Ff(b) || b.contentEditable === "true") &&
            ((Co = b), (jc = c), (Oi = null));
          break;
        case "focusout":
          Oi = jc = Co = null;
          break;
        case "mousedown":
          Uc = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (Uc = !1), Hf(u, n, d);
          break;
        case "selectionchange":
          if (Uw) break;
        case "keydown":
        case "keyup":
          Hf(u, n, d);
      }
      var _;
      if (od)
        e: {
          switch (e) {
            case "compositionstart":
              var k = "onCompositionStart";
              break e;
            case "compositionend":
              k = "onCompositionEnd";
              break e;
            case "compositionupdate":
              k = "onCompositionUpdate";
              break e;
          }
          k = void 0;
        }
      else
        So
          ? Mh(e, n) && (k = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (k = "onCompositionStart");
      k &&
        (Oh &&
          n.locale !== "ko" &&
          (So || k !== "onCompositionStart"
            ? k === "onCompositionEnd" && So && (_ = Dh())
            : ((br = d),
              (td = "value" in br ? br.value : br.textContent),
              (So = !0))),
        (b = $l(c, k)),
        0 < b.length &&
          ((k = new Of(k, e, null, n, d)),
          u.push({ event: k, listeners: b }),
          _ ? (k.data = _) : ((_ = Lh(n)), _ !== null && (k.data = _)))),
        (_ = Tw ? Pw(e, n) : Nw(e, n)) &&
          ((c = $l(c, "onBeforeInput")),
          0 < c.length &&
            ((d = new Of("onBeforeInput", "beforeinput", null, n, d)),
            u.push({ event: d, listeners: c }),
            (d.data = _)));
    }
    Yh(u, t);
  });
}
function Qi(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function $l(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var o = e,
      i = o.stateNode;
    o.tag === 5 &&
      i !== null &&
      ((o = i),
      (i = Bi(e, n)),
      i != null && r.unshift(Qi(e, i, o)),
      (i = Bi(e, t)),
      i != null && r.push(Qi(e, i, o))),
      (e = e.return);
  }
  return r;
}
function vo(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Kf(e, t, n, r, o) {
  for (var i = t._reactName, a = []; n !== null && n !== r; ) {
    var l = n,
      s = l.alternate,
      c = l.stateNode;
    if (s !== null && s === r) break;
    l.tag === 5 &&
      c !== null &&
      ((l = c),
      o
        ? ((s = Bi(n, i)), s != null && a.unshift(Qi(n, s, l)))
        : o || ((s = Bi(n, i)), s != null && a.push(Qi(n, s, l)))),
      (n = n.return);
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var Ww = /\r\n?/g,
  Kw = /\u0000|\uFFFD/g;
function Gf(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      Ww,
      `
`
    )
    .replace(Kw, "");
}
function Oa(e, t, n) {
  if (((t = Gf(t)), Gf(e) !== t && n)) throw Error(L(425));
}
function _l() {}
var Bc = null,
  Hc = null;
function Vc(e, t) {
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
var Wc = typeof setTimeout == "function" ? setTimeout : void 0,
  Gw = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Yf = typeof Promise == "function" ? Promise : void 0,
  Yw =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Yf < "u"
      ? function (e) {
          return Yf.resolve(null).then(e).catch(Qw);
        }
      : Wc;
function Qw(e) {
  setTimeout(function () {
    throw e;
  });
}
function Vs(e, t) {
  var n = t,
    r = 0;
  do {
    var o = n.nextSibling;
    if ((e.removeChild(n), o && o.nodeType === 8))
      if (((n = o.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(o), Wi(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = o;
  } while (n);
  Wi(t);
}
function _r(e) {
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
function Qf(e) {
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
var ti = Math.random().toString(36).slice(2),
  Rn = "__reactFiber$" + ti,
  Xi = "__reactProps$" + ti,
  Xn = "__reactContainer$" + ti,
  Kc = "__reactEvents$" + ti,
  Xw = "__reactListeners$" + ti,
  qw = "__reactHandles$" + ti;
function Yr(e) {
  var t = e[Rn];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[Xn] || n[Rn])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = Qf(e); e !== null; ) {
          if ((n = e[Rn])) return n;
          e = Qf(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function ma(e) {
  return (
    (e = e[Rn] || e[Xn]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function _o(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(L(33));
}
function Jl(e) {
  return e[Xi] || null;
}
var Gc = [],
  Ro = -1;
function zr(e) {
  return { current: e };
}
function Ae(e) {
  0 > Ro || ((e.current = Gc[Ro]), (Gc[Ro] = null), Ro--);
}
function Re(e, t) {
  Ro++, (Gc[Ro] = e.current), (e.current = t);
}
var Ar = {},
  bt = zr(Ar),
  Dt = zr(!1),
  ro = Ar;
function Ho(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Ar;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var o = {},
    i;
  for (i in n) o[i] = t[i];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    o
  );
}
function Ot(e) {
  return (e = e.childContextTypes), e != null;
}
function Rl() {
  Ae(Dt), Ae(bt);
}
function Xf(e, t, n) {
  if (bt.current !== Ar) throw Error(L(168));
  Re(bt, t), Re(Dt, n);
}
function Xh(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var o in r) if (!(o in t)) throw Error(L(108, M1(e) || "Unknown", o));
  return Be({}, n, r);
}
function kl(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Ar),
    (ro = bt.current),
    Re(bt, e),
    Re(Dt, Dt.current),
    !0
  );
}
function qf(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(L(169));
  n
    ? ((e = Xh(e, t, ro)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      Ae(Dt),
      Ae(bt),
      Re(bt, e))
    : Ae(Dt),
    Re(Dt, n);
}
var Hn = null,
  es = !1,
  Ws = !1;
function qh(e) {
  Hn === null ? (Hn = [e]) : Hn.push(e);
}
function Zw(e) {
  (es = !0), qh(e);
}
function jr() {
  if (!Ws && Hn !== null) {
    Ws = !0;
    var e = 0,
      t = Ce;
    try {
      var n = Hn;
      for (Ce = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (Hn = null), (es = !1);
    } catch (o) {
      throw (Hn !== null && (Hn = Hn.slice(e + 1)), Eh(qu, jr), o);
    } finally {
      (Ce = t), (Ws = !1);
    }
  }
  return null;
}
var ko = [],
  To = 0,
  Tl = null,
  Pl = 0,
  Yt = [],
  Qt = 0,
  oo = null,
  Vn = 1,
  Wn = "";
function Wr(e, t) {
  (ko[To++] = Pl), (ko[To++] = Tl), (Tl = e), (Pl = t);
}
function Zh(e, t, n) {
  (Yt[Qt++] = Vn), (Yt[Qt++] = Wn), (Yt[Qt++] = oo), (oo = e);
  var r = Vn;
  e = Wn;
  var o = 32 - hn(r) - 1;
  (r &= ~(1 << o)), (n += 1);
  var i = 32 - hn(t) + o;
  if (30 < i) {
    var a = o - (o % 5);
    (i = (r & ((1 << a) - 1)).toString(32)),
      (r >>= a),
      (o -= a),
      (Vn = (1 << (32 - hn(t) + o)) | (n << o) | r),
      (Wn = i + e);
  } else (Vn = (1 << i) | (n << o) | r), (Wn = e);
}
function ad(e) {
  e.return !== null && (Wr(e, 1), Zh(e, 1, 0));
}
function ld(e) {
  for (; e === Tl; )
    (Tl = ko[--To]), (ko[To] = null), (Pl = ko[--To]), (ko[To] = null);
  for (; e === oo; )
    (oo = Yt[--Qt]),
      (Yt[Qt] = null),
      (Wn = Yt[--Qt]),
      (Yt[Qt] = null),
      (Vn = Yt[--Qt]),
      (Yt[Qt] = null);
}
var jt = null,
  zt = null,
  Fe = !1,
  mn = null;
function Jh(e, t) {
  var n = Xt(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Zf(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (jt = e), (zt = _r(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (jt = e), (zt = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = oo !== null ? { id: Vn, overflow: Wn } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Xt(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (jt = e),
            (zt = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Yc(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Qc(e) {
  if (Fe) {
    var t = zt;
    if (t) {
      var n = t;
      if (!Zf(e, t)) {
        if (Yc(e)) throw Error(L(418));
        t = _r(n.nextSibling);
        var r = jt;
        t && Zf(e, t)
          ? Jh(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (Fe = !1), (jt = e));
      }
    } else {
      if (Yc(e)) throw Error(L(418));
      (e.flags = (e.flags & -4097) | 2), (Fe = !1), (jt = e);
    }
  }
}
function Jf(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  jt = e;
}
function Ma(e) {
  if (e !== jt) return !1;
  if (!Fe) return Jf(e), (Fe = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Vc(e.type, e.memoizedProps))),
    t && (t = zt))
  ) {
    if (Yc(e)) throw (eg(), Error(L(418)));
    for (; t; ) Jh(e, t), (t = _r(t.nextSibling));
  }
  if ((Jf(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(L(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              zt = _r(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      zt = null;
    }
  } else zt = jt ? _r(e.stateNode.nextSibling) : null;
  return !0;
}
function eg() {
  for (var e = zt; e; ) e = _r(e.nextSibling);
}
function Vo() {
  (zt = jt = null), (Fe = !1);
}
function sd(e) {
  mn === null ? (mn = [e]) : mn.push(e);
}
var Jw = rr.ReactCurrentBatchConfig;
function dn(e, t) {
  if (e && e.defaultProps) {
    (t = Be({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var Nl = zr(null),
  Al = null,
  Po = null,
  cd = null;
function ud() {
  cd = Po = Al = null;
}
function dd(e) {
  var t = Nl.current;
  Ae(Nl), (e._currentValue = t);
}
function Xc(e, t, n) {
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
function zo(e, t) {
  (Al = e),
    (cd = Po = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (At = !0), (e.firstContext = null));
}
function Jt(e) {
  var t = e._currentValue;
  if (cd !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Po === null)) {
      if (Al === null) throw Error(L(308));
      (Po = e), (Al.dependencies = { lanes: 0, firstContext: e });
    } else Po = Po.next = e;
  return t;
}
var Qr = null;
function fd(e) {
  Qr === null ? (Qr = [e]) : Qr.push(e);
}
function tg(e, t, n, r) {
  var o = t.interleaved;
  return (
    o === null ? ((n.next = n), fd(t)) : ((n.next = o.next), (o.next = n)),
    (t.interleaved = n),
    qn(e, r)
  );
}
function qn(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var yr = !1;
function pd(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function ng(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function Kn(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function Rr(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), be & 2)) {
    var o = r.pending;
    return (
      o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
      (r.pending = t),
      qn(e, n)
    );
  }
  return (
    (o = r.interleaved),
    o === null ? ((t.next = t), fd(r)) : ((t.next = o.next), (o.next = t)),
    (r.interleaved = t),
    qn(e, n)
  );
}
function ol(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Zu(e, n);
  }
}
function ep(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var o = null,
      i = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var a = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        i === null ? (o = i = a) : (i = i.next = a), (n = n.next);
      } while (n !== null);
      i === null ? (o = i = t) : (i = i.next = t);
    } else o = i = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: o,
      lastBaseUpdate: i,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function Dl(e, t, n, r) {
  var o = e.updateQueue;
  yr = !1;
  var i = o.firstBaseUpdate,
    a = o.lastBaseUpdate,
    l = o.shared.pending;
  if (l !== null) {
    o.shared.pending = null;
    var s = l,
      c = s.next;
    (s.next = null), a === null ? (i = c) : (a.next = c), (a = s);
    var d = e.alternate;
    d !== null &&
      ((d = d.updateQueue),
      (l = d.lastBaseUpdate),
      l !== a &&
        (l === null ? (d.firstBaseUpdate = c) : (l.next = c),
        (d.lastBaseUpdate = s)));
  }
  if (i !== null) {
    var u = o.baseState;
    (a = 0), (d = c = s = null), (l = i);
    do {
      var p = l.lane,
        y = l.eventTime;
      if ((r & p) === p) {
        d !== null &&
          (d = d.next =
            {
              eventTime: y,
              lane: 0,
              tag: l.tag,
              payload: l.payload,
              callback: l.callback,
              next: null,
            });
        e: {
          var v = e,
            g = l;
          switch (((p = t), (y = n), g.tag)) {
            case 1:
              if (((v = g.payload), typeof v == "function")) {
                u = v.call(y, u, p);
                break e;
              }
              u = v;
              break e;
            case 3:
              v.flags = (v.flags & -65537) | 128;
            case 0:
              if (
                ((v = g.payload),
                (p = typeof v == "function" ? v.call(y, u, p) : v),
                p == null)
              )
                break e;
              u = Be({}, u, p);
              break e;
            case 2:
              yr = !0;
          }
        }
        l.callback !== null &&
          l.lane !== 0 &&
          ((e.flags |= 64),
          (p = o.effects),
          p === null ? (o.effects = [l]) : p.push(l));
      } else
        (y = {
          eventTime: y,
          lane: p,
          tag: l.tag,
          payload: l.payload,
          callback: l.callback,
          next: null,
        }),
          d === null ? ((c = d = y), (s = u)) : (d = d.next = y),
          (a |= p);
      if (((l = l.next), l === null)) {
        if (((l = o.shared.pending), l === null)) break;
        (p = l),
          (l = p.next),
          (p.next = null),
          (o.lastBaseUpdate = p),
          (o.shared.pending = null);
      }
    } while (!0);
    if (
      (d === null && (s = u),
      (o.baseState = s),
      (o.firstBaseUpdate = c),
      (o.lastBaseUpdate = d),
      (t = o.shared.interleaved),
      t !== null)
    ) {
      o = t;
      do (a |= o.lane), (o = o.next);
      while (o !== t);
    } else i === null && (o.shared.lanes = 0);
    (ao |= a), (e.lanes = a), (e.memoizedState = u);
  }
}
function tp(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        o = r.callback;
      if (o !== null) {
        if (((r.callback = null), (r = n), typeof o != "function"))
          throw Error(L(191, o));
        o.call(r);
      }
    }
}
var rg = new th.Component().refs;
function qc(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : Be({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var ts = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? po(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = $t(),
      o = Tr(e),
      i = Kn(r, o);
    (i.payload = t),
      n != null && (i.callback = n),
      (t = Rr(e, i, o)),
      t !== null && (gn(t, e, o, r), ol(t, e, o));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = $t(),
      o = Tr(e),
      i = Kn(r, o);
    (i.tag = 1),
      (i.payload = t),
      n != null && (i.callback = n),
      (t = Rr(e, i, o)),
      t !== null && (gn(t, e, o, r), ol(t, e, o));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = $t(),
      r = Tr(e),
      o = Kn(n, r);
    (o.tag = 2),
      t != null && (o.callback = t),
      (t = Rr(e, o, r)),
      t !== null && (gn(t, e, r, n), ol(t, e, r));
  },
};
function np(e, t, n, r, o, i, a) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, i, a)
      : t.prototype && t.prototype.isPureReactComponent
      ? !Gi(n, r) || !Gi(o, i)
      : !0
  );
}
function og(e, t, n) {
  var r = !1,
    o = Ar,
    i = t.contextType;
  return (
    typeof i == "object" && i !== null
      ? (i = Jt(i))
      : ((o = Ot(t) ? ro : bt.current),
        (r = t.contextTypes),
        (i = (r = r != null) ? Ho(e, o) : Ar)),
    (t = new t(n, i)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = ts),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = o),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    t
  );
}
function rp(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && ts.enqueueReplaceState(t, t.state, null);
}
function Zc(e, t, n, r) {
  var o = e.stateNode;
  (o.props = n), (o.state = e.memoizedState), (o.refs = rg), pd(e);
  var i = t.contextType;
  typeof i == "object" && i !== null
    ? (o.context = Jt(i))
    : ((i = Ot(t) ? ro : bt.current), (o.context = Ho(e, i))),
    (o.state = e.memoizedState),
    (i = t.getDerivedStateFromProps),
    typeof i == "function" && (qc(e, t, i, n), (o.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function" ||
      (typeof o.UNSAFE_componentWillMount != "function" &&
        typeof o.componentWillMount != "function") ||
      ((t = o.state),
      typeof o.componentWillMount == "function" && o.componentWillMount(),
      typeof o.UNSAFE_componentWillMount == "function" &&
        o.UNSAFE_componentWillMount(),
      t !== o.state && ts.enqueueReplaceState(o, o.state, null),
      Dl(e, n, o, r),
      (o.state = e.memoizedState)),
    typeof o.componentDidMount == "function" && (e.flags |= 4194308);
}
function fi(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(L(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(L(147, e));
      var o = r,
        i = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === i
        ? t.ref
        : ((t = function (a) {
            var l = o.refs;
            l === rg && (l = o.refs = {}),
              a === null ? delete l[i] : (l[i] = a);
          }),
          (t._stringRef = i),
          t);
    }
    if (typeof e != "string") throw Error(L(284));
    if (!n._owner) throw Error(L(290, e));
  }
  return e;
}
function La(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      L(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function op(e) {
  var t = e._init;
  return t(e._payload);
}
function ig(e) {
  function t(m, h) {
    if (e) {
      var w = m.deletions;
      w === null ? ((m.deletions = [h]), (m.flags |= 16)) : w.push(h);
    }
  }
  function n(m, h) {
    if (!e) return null;
    for (; h !== null; ) t(m, h), (h = h.sibling);
    return null;
  }
  function r(m, h) {
    for (m = new Map(); h !== null; )
      h.key !== null ? m.set(h.key, h) : m.set(h.index, h), (h = h.sibling);
    return m;
  }
  function o(m, h) {
    return (m = Pr(m, h)), (m.index = 0), (m.sibling = null), m;
  }
  function i(m, h, w) {
    return (
      (m.index = w),
      e
        ? ((w = m.alternate),
          w !== null
            ? ((w = w.index), w < h ? ((m.flags |= 2), h) : w)
            : ((m.flags |= 2), h))
        : ((m.flags |= 1048576), h)
    );
  }
  function a(m) {
    return e && m.alternate === null && (m.flags |= 2), m;
  }
  function l(m, h, w, E) {
    return h === null || h.tag !== 6
      ? ((h = Zs(w, m.mode, E)), (h.return = m), h)
      : ((h = o(h, w)), (h.return = m), h);
  }
  function s(m, h, w, E) {
    var $ = w.type;
    return $ === Eo
      ? d(m, h, w.props.children, E, w.key)
      : h !== null &&
        (h.elementType === $ ||
          (typeof $ == "object" &&
            $ !== null &&
            $.$$typeof === vr &&
            op($) === h.type))
      ? ((E = o(h, w.props)), (E.ref = fi(m, h, w)), (E.return = m), E)
      : ((E = ul(w.type, w.key, w.props, null, m.mode, E)),
        (E.ref = fi(m, h, w)),
        (E.return = m),
        E);
  }
  function c(m, h, w, E) {
    return h === null ||
      h.tag !== 4 ||
      h.stateNode.containerInfo !== w.containerInfo ||
      h.stateNode.implementation !== w.implementation
      ? ((h = Js(w, m.mode, E)), (h.return = m), h)
      : ((h = o(h, w.children || [])), (h.return = m), h);
  }
  function d(m, h, w, E, $) {
    return h === null || h.tag !== 7
      ? ((h = to(w, m.mode, E, $)), (h.return = m), h)
      : ((h = o(h, w)), (h.return = m), h);
  }
  function u(m, h, w) {
    if ((typeof h == "string" && h !== "") || typeof h == "number")
      return (h = Zs("" + h, m.mode, w)), (h.return = m), h;
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case $a:
          return (
            (w = ul(h.type, h.key, h.props, null, m.mode, w)),
            (w.ref = fi(m, null, h)),
            (w.return = m),
            w
          );
        case bo:
          return (h = Js(h, m.mode, w)), (h.return = m), h;
        case vr:
          var E = h._init;
          return u(m, E(h._payload), w);
      }
      if (Ri(h) || li(h))
        return (h = to(h, m.mode, w, null)), (h.return = m), h;
      La(m, h);
    }
    return null;
  }
  function p(m, h, w, E) {
    var $ = h !== null ? h.key : null;
    if ((typeof w == "string" && w !== "") || typeof w == "number")
      return $ !== null ? null : l(m, h, "" + w, E);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case $a:
          return w.key === $ ? s(m, h, w, E) : null;
        case bo:
          return w.key === $ ? c(m, h, w, E) : null;
        case vr:
          return ($ = w._init), p(m, h, $(w._payload), E);
      }
      if (Ri(w) || li(w)) return $ !== null ? null : d(m, h, w, E, null);
      La(m, w);
    }
    return null;
  }
  function y(m, h, w, E, $) {
    if ((typeof E == "string" && E !== "") || typeof E == "number")
      return (m = m.get(w) || null), l(h, m, "" + E, $);
    if (typeof E == "object" && E !== null) {
      switch (E.$$typeof) {
        case $a:
          return (m = m.get(E.key === null ? w : E.key) || null), s(h, m, E, $);
        case bo:
          return (m = m.get(E.key === null ? w : E.key) || null), c(h, m, E, $);
        case vr:
          var b = E._init;
          return y(m, h, w, b(E._payload), $);
      }
      if (Ri(E) || li(E)) return (m = m.get(w) || null), d(h, m, E, $, null);
      La(h, E);
    }
    return null;
  }
  function v(m, h, w, E) {
    for (
      var $ = null, b = null, _ = h, k = (h = 0), O = null;
      _ !== null && k < w.length;
      k++
    ) {
      _.index > k ? ((O = _), (_ = null)) : (O = _.sibling);
      var M = p(m, _, w[k], E);
      if (M === null) {
        _ === null && (_ = O);
        break;
      }
      e && _ && M.alternate === null && t(m, _),
        (h = i(M, h, k)),
        b === null ? ($ = M) : (b.sibling = M),
        (b = M),
        (_ = O);
    }
    if (k === w.length) return n(m, _), Fe && Wr(m, k), $;
    if (_ === null) {
      for (; k < w.length; k++)
        (_ = u(m, w[k], E)),
          _ !== null &&
            ((h = i(_, h, k)), b === null ? ($ = _) : (b.sibling = _), (b = _));
      return Fe && Wr(m, k), $;
    }
    for (_ = r(m, _); k < w.length; k++)
      (O = y(_, m, k, w[k], E)),
        O !== null &&
          (e && O.alternate !== null && _.delete(O.key === null ? k : O.key),
          (h = i(O, h, k)),
          b === null ? ($ = O) : (b.sibling = O),
          (b = O));
    return (
      e &&
        _.forEach(function (K) {
          return t(m, K);
        }),
      Fe && Wr(m, k),
      $
    );
  }
  function g(m, h, w, E) {
    var $ = li(w);
    if (typeof $ != "function") throw Error(L(150));
    if (((w = $.call(w)), w == null)) throw Error(L(151));
    for (
      var b = ($ = null), _ = h, k = (h = 0), O = null, M = w.next();
      _ !== null && !M.done;
      k++, M = w.next()
    ) {
      _.index > k ? ((O = _), (_ = null)) : (O = _.sibling);
      var K = p(m, _, M.value, E);
      if (K === null) {
        _ === null && (_ = O);
        break;
      }
      e && _ && K.alternate === null && t(m, _),
        (h = i(K, h, k)),
        b === null ? ($ = K) : (b.sibling = K),
        (b = K),
        (_ = O);
    }
    if (M.done) return n(m, _), Fe && Wr(m, k), $;
    if (_ === null) {
      for (; !M.done; k++, M = w.next())
        (M = u(m, M.value, E)),
          M !== null &&
            ((h = i(M, h, k)), b === null ? ($ = M) : (b.sibling = M), (b = M));
      return Fe && Wr(m, k), $;
    }
    for (_ = r(m, _); !M.done; k++, M = w.next())
      (M = y(_, m, k, M.value, E)),
        M !== null &&
          (e && M.alternate !== null && _.delete(M.key === null ? k : M.key),
          (h = i(M, h, k)),
          b === null ? ($ = M) : (b.sibling = M),
          (b = M));
    return (
      e &&
        _.forEach(function (z) {
          return t(m, z);
        }),
      Fe && Wr(m, k),
      $
    );
  }
  function x(m, h, w, E) {
    if (
      (typeof w == "object" &&
        w !== null &&
        w.type === Eo &&
        w.key === null &&
        (w = w.props.children),
      typeof w == "object" && w !== null)
    ) {
      switch (w.$$typeof) {
        case $a:
          e: {
            for (var $ = w.key, b = h; b !== null; ) {
              if (b.key === $) {
                if ((($ = w.type), $ === Eo)) {
                  if (b.tag === 7) {
                    n(m, b.sibling),
                      (h = o(b, w.props.children)),
                      (h.return = m),
                      (m = h);
                    break e;
                  }
                } else if (
                  b.elementType === $ ||
                  (typeof $ == "object" &&
                    $ !== null &&
                    $.$$typeof === vr &&
                    op($) === b.type)
                ) {
                  n(m, b.sibling),
                    (h = o(b, w.props)),
                    (h.ref = fi(m, b, w)),
                    (h.return = m),
                    (m = h);
                  break e;
                }
                n(m, b);
                break;
              } else t(m, b);
              b = b.sibling;
            }
            w.type === Eo
              ? ((h = to(w.props.children, m.mode, E, w.key)),
                (h.return = m),
                (m = h))
              : ((E = ul(w.type, w.key, w.props, null, m.mode, E)),
                (E.ref = fi(m, h, w)),
                (E.return = m),
                (m = E));
          }
          return a(m);
        case bo:
          e: {
            for (b = w.key; h !== null; ) {
              if (h.key === b)
                if (
                  h.tag === 4 &&
                  h.stateNode.containerInfo === w.containerInfo &&
                  h.stateNode.implementation === w.implementation
                ) {
                  n(m, h.sibling),
                    (h = o(h, w.children || [])),
                    (h.return = m),
                    (m = h);
                  break e;
                } else {
                  n(m, h);
                  break;
                }
              else t(m, h);
              h = h.sibling;
            }
            (h = Js(w, m.mode, E)), (h.return = m), (m = h);
          }
          return a(m);
        case vr:
          return (b = w._init), x(m, h, b(w._payload), E);
      }
      if (Ri(w)) return v(m, h, w, E);
      if (li(w)) return g(m, h, w, E);
      La(m, w);
    }
    return (typeof w == "string" && w !== "") || typeof w == "number"
      ? ((w = "" + w),
        h !== null && h.tag === 6
          ? (n(m, h.sibling), (h = o(h, w)), (h.return = m), (m = h))
          : (n(m, h), (h = Zs(w, m.mode, E)), (h.return = m), (m = h)),
        a(m))
      : n(m, h);
  }
  return x;
}
var Wo = ig(!0),
  ag = ig(!1),
  ha = {},
  Nn = zr(ha),
  qi = zr(ha),
  Zi = zr(ha);
function Xr(e) {
  if (e === ha) throw Error(L(174));
  return e;
}
function md(e, t) {
  switch ((Re(Zi, t), Re(qi, e), Re(Nn, ha), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Pc(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Pc(t, e));
  }
  Ae(Nn), Re(Nn, t);
}
function Ko() {
  Ae(Nn), Ae(qi), Ae(Zi);
}
function lg(e) {
  Xr(Zi.current);
  var t = Xr(Nn.current),
    n = Pc(t, e.type);
  t !== n && (Re(qi, e), Re(Nn, n));
}
function hd(e) {
  qi.current === e && (Ae(Nn), Ae(qi));
}
var je = zr(0);
function Ol(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var Ks = [];
function gd() {
  for (var e = 0; e < Ks.length; e++)
    Ks[e]._workInProgressVersionPrimary = null;
  Ks.length = 0;
}
var il = rr.ReactCurrentDispatcher,
  Gs = rr.ReactCurrentBatchConfig,
  io = 0,
  Ue = null,
  ot = null,
  lt = null,
  Ml = !1,
  Mi = !1,
  Ji = 0,
  ex = 0;
function yt() {
  throw Error(L(321));
}
function vd(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!yn(e[n], t[n])) return !1;
  return !0;
}
function yd(e, t, n, r, o, i) {
  if (
    ((io = i),
    (Ue = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (il.current = e === null || e.memoizedState === null ? ox : ix),
    (e = n(r, o)),
    Mi)
  ) {
    i = 0;
    do {
      if (((Mi = !1), (Ji = 0), 25 <= i)) throw Error(L(301));
      (i += 1),
        (lt = ot = null),
        (t.updateQueue = null),
        (il.current = ax),
        (e = n(r, o));
    } while (Mi);
  }
  if (
    ((il.current = Ll),
    (t = ot !== null && ot.next !== null),
    (io = 0),
    (lt = ot = Ue = null),
    (Ml = !1),
    t)
  )
    throw Error(L(300));
  return e;
}
function wd() {
  var e = Ji !== 0;
  return (Ji = 0), e;
}
function _n() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return lt === null ? (Ue.memoizedState = lt = e) : (lt = lt.next = e), lt;
}
function en() {
  if (ot === null) {
    var e = Ue.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ot.next;
  var t = lt === null ? Ue.memoizedState : lt.next;
  if (t !== null) (lt = t), (ot = e);
  else {
    if (e === null) throw Error(L(310));
    (ot = e),
      (e = {
        memoizedState: ot.memoizedState,
        baseState: ot.baseState,
        baseQueue: ot.baseQueue,
        queue: ot.queue,
        next: null,
      }),
      lt === null ? (Ue.memoizedState = lt = e) : (lt = lt.next = e);
  }
  return lt;
}
function ea(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Ys(e) {
  var t = en(),
    n = t.queue;
  if (n === null) throw Error(L(311));
  n.lastRenderedReducer = e;
  var r = ot,
    o = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (o !== null) {
      var a = o.next;
      (o.next = i.next), (i.next = a);
    }
    (r.baseQueue = o = i), (n.pending = null);
  }
  if (o !== null) {
    (i = o.next), (r = r.baseState);
    var l = (a = null),
      s = null,
      c = i;
    do {
      var d = c.lane;
      if ((io & d) === d)
        s !== null &&
          (s = s.next =
            {
              lane: 0,
              action: c.action,
              hasEagerState: c.hasEagerState,
              eagerState: c.eagerState,
              next: null,
            }),
          (r = c.hasEagerState ? c.eagerState : e(r, c.action));
      else {
        var u = {
          lane: d,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null,
        };
        s === null ? ((l = s = u), (a = r)) : (s = s.next = u),
          (Ue.lanes |= d),
          (ao |= d);
      }
      c = c.next;
    } while (c !== null && c !== i);
    s === null ? (a = r) : (s.next = l),
      yn(r, t.memoizedState) || (At = !0),
      (t.memoizedState = r),
      (t.baseState = a),
      (t.baseQueue = s),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    o = e;
    do (i = o.lane), (Ue.lanes |= i), (ao |= i), (o = o.next);
    while (o !== e);
  } else o === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Qs(e) {
  var t = en(),
    n = t.queue;
  if (n === null) throw Error(L(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    o = n.pending,
    i = t.memoizedState;
  if (o !== null) {
    n.pending = null;
    var a = (o = o.next);
    do (i = e(i, a.action)), (a = a.next);
    while (a !== o);
    yn(i, t.memoizedState) || (At = !0),
      (t.memoizedState = i),
      t.baseQueue === null && (t.baseState = i),
      (n.lastRenderedState = i);
  }
  return [i, r];
}
function sg() {}
function cg(e, t) {
  var n = Ue,
    r = en(),
    o = t(),
    i = !yn(r.memoizedState, o);
  if (
    (i && ((r.memoizedState = o), (At = !0)),
    (r = r.queue),
    xd(fg.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || (lt !== null && lt.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      ta(9, dg.bind(null, n, r, o, t), void 0, null),
      st === null)
    )
      throw Error(L(349));
    io & 30 || ug(n, t, o);
  }
  return o;
}
function ug(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = Ue.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Ue.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function dg(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), pg(t) && mg(e);
}
function fg(e, t, n) {
  return n(function () {
    pg(t) && mg(e);
  });
}
function pg(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !yn(e, n);
  } catch {
    return !0;
  }
}
function mg(e) {
  var t = qn(e, 1);
  t !== null && gn(t, e, 1, -1);
}
function ip(e) {
  var t = _n();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ea,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = rx.bind(null, Ue, e)),
    [t.memoizedState, e]
  );
}
function ta(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = Ue.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Ue.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function hg() {
  return en().memoizedState;
}
function al(e, t, n, r) {
  var o = _n();
  (Ue.flags |= e),
    (o.memoizedState = ta(1 | t, n, void 0, r === void 0 ? null : r));
}
function ns(e, t, n, r) {
  var o = en();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (ot !== null) {
    var a = ot.memoizedState;
    if (((i = a.destroy), r !== null && vd(r, a.deps))) {
      o.memoizedState = ta(t, n, i, r);
      return;
    }
  }
  (Ue.flags |= e), (o.memoizedState = ta(1 | t, n, i, r));
}
function ap(e, t) {
  return al(8390656, 8, e, t);
}
function xd(e, t) {
  return ns(2048, 8, e, t);
}
function gg(e, t) {
  return ns(4, 2, e, t);
}
function vg(e, t) {
  return ns(4, 4, e, t);
}
function yg(e, t) {
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
function wg(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), ns(4, 4, yg.bind(null, t, e), n)
  );
}
function bd() {}
function xg(e, t) {
  var n = en();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && vd(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function bg(e, t) {
  var n = en();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && vd(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Eg(e, t, n) {
  return io & 21
    ? (yn(n, t) || ((n = $h()), (Ue.lanes |= n), (ao |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (At = !0)), (e.memoizedState = n));
}
function tx(e, t) {
  var n = Ce;
  (Ce = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = Gs.transition;
  Gs.transition = {};
  try {
    e(!1), t();
  } finally {
    (Ce = n), (Gs.transition = r);
  }
}
function Sg() {
  return en().memoizedState;
}
function nx(e, t, n) {
  var r = Tr(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Cg(e))
  )
    $g(t, n);
  else if (((n = tg(e, t, n, r)), n !== null)) {
    var o = $t();
    gn(n, e, r, o), _g(n, t, r);
  }
}
function rx(e, t, n) {
  var r = Tr(e),
    o = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Cg(e)) $g(t, o);
  else {
    var i = e.alternate;
    if (
      e.lanes === 0 &&
      (i === null || i.lanes === 0) &&
      ((i = t.lastRenderedReducer), i !== null)
    )
      try {
        var a = t.lastRenderedState,
          l = i(a, n);
        if (((o.hasEagerState = !0), (o.eagerState = l), yn(l, a))) {
          var s = t.interleaved;
          s === null
            ? ((o.next = o), fd(t))
            : ((o.next = s.next), (s.next = o)),
            (t.interleaved = o);
          return;
        }
      } catch {
      } finally {
      }
    (n = tg(e, t, o, r)),
      n !== null && ((o = $t()), gn(n, e, r, o), _g(n, t, r));
  }
}
function Cg(e) {
  var t = e.alternate;
  return e === Ue || (t !== null && t === Ue);
}
function $g(e, t) {
  Mi = Ml = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function _g(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Zu(e, n);
  }
}
var Ll = {
    readContext: Jt,
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
  ox = {
    readContext: Jt,
    useCallback: function (e, t) {
      return (_n().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: Jt,
    useEffect: ap,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        al(4194308, 4, yg.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return al(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return al(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = _n();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = _n();
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
        (e = e.dispatch = nx.bind(null, Ue, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = _n();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: ip,
    useDebugValue: bd,
    useDeferredValue: function (e) {
      return (_n().memoizedState = e);
    },
    useTransition: function () {
      var e = ip(!1),
        t = e[0];
      return (e = tx.bind(null, e[1])), (_n().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = Ue,
        o = _n();
      if (Fe) {
        if (n === void 0) throw Error(L(407));
        n = n();
      } else {
        if (((n = t()), st === null)) throw Error(L(349));
        io & 30 || ug(r, t, n);
      }
      o.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return (
        (o.queue = i),
        ap(fg.bind(null, r, i, e), [e]),
        (r.flags |= 2048),
        ta(9, dg.bind(null, r, i, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = _n(),
        t = st.identifierPrefix;
      if (Fe) {
        var n = Wn,
          r = Vn;
        (n = (r & ~(1 << (32 - hn(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = Ji++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = ex++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  ix = {
    readContext: Jt,
    useCallback: xg,
    useContext: Jt,
    useEffect: xd,
    useImperativeHandle: wg,
    useInsertionEffect: gg,
    useLayoutEffect: vg,
    useMemo: bg,
    useReducer: Ys,
    useRef: hg,
    useState: function () {
      return Ys(ea);
    },
    useDebugValue: bd,
    useDeferredValue: function (e) {
      var t = en();
      return Eg(t, ot.memoizedState, e);
    },
    useTransition: function () {
      var e = Ys(ea)[0],
        t = en().memoizedState;
      return [e, t];
    },
    useMutableSource: sg,
    useSyncExternalStore: cg,
    useId: Sg,
    unstable_isNewReconciler: !1,
  },
  ax = {
    readContext: Jt,
    useCallback: xg,
    useContext: Jt,
    useEffect: xd,
    useImperativeHandle: wg,
    useInsertionEffect: gg,
    useLayoutEffect: vg,
    useMemo: bg,
    useReducer: Qs,
    useRef: hg,
    useState: function () {
      return Qs(ea);
    },
    useDebugValue: bd,
    useDeferredValue: function (e) {
      var t = en();
      return ot === null ? (t.memoizedState = e) : Eg(t, ot.memoizedState, e);
    },
    useTransition: function () {
      var e = Qs(ea)[0],
        t = en().memoizedState;
      return [e, t];
    },
    useMutableSource: sg,
    useSyncExternalStore: cg,
    useId: Sg,
    unstable_isNewReconciler: !1,
  };
function Go(e, t) {
  try {
    var n = "",
      r = t;
    do (n += O1(r)), (r = r.return);
    while (r);
    var o = n;
  } catch (i) {
    o =
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack;
  }
  return { value: e, source: t, stack: o, digest: null };
}
function Xs(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Jc(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var lx = typeof WeakMap == "function" ? WeakMap : Map;
function Rg(e, t, n) {
  (n = Kn(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      Fl || ((Fl = !0), (cu = r)), Jc(e, t);
    }),
    n
  );
}
function kg(e, t, n) {
  (n = Kn(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var o = t.value;
    (n.payload = function () {
      return r(o);
    }),
      (n.callback = function () {
        Jc(e, t);
      });
  }
  var i = e.stateNode;
  return (
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (n.callback = function () {
        Jc(e, t),
          typeof r != "function" &&
            (kr === null ? (kr = new Set([this])) : kr.add(this));
        var a = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: a !== null ? a : "",
        });
      }),
    n
  );
}
function lp(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new lx();
    var o = new Set();
    r.set(t, o);
  } else (o = r.get(t)), o === void 0 && ((o = new Set()), r.set(t, o));
  o.has(n) || (o.add(n), (e = bx.bind(null, e, t, n)), t.then(e, e));
}
function sp(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function cp(e, t, n, r, o) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = o), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Kn(-1, 1)), (t.tag = 2), Rr(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var sx = rr.ReactCurrentOwner,
  At = !1;
function Ct(e, t, n, r) {
  t.child = e === null ? ag(t, null, n, r) : Wo(t, e.child, n, r);
}
function up(e, t, n, r, o) {
  n = n.render;
  var i = t.ref;
  return (
    zo(t, o),
    (r = yd(e, t, n, r, i, o)),
    (n = wd()),
    e !== null && !At
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        Zn(e, t, o))
      : (Fe && n && ad(t), (t.flags |= 1), Ct(e, t, r, o), t.child)
  );
}
function dp(e, t, n, r, o) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" &&
      !Td(i) &&
      i.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = i), Tg(e, t, i, r, o))
      : ((e = ul(n.type, null, r, t, t.mode, o)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((i = e.child), !(e.lanes & o))) {
    var a = i.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Gi), n(a, r) && e.ref === t.ref)
    )
      return Zn(e, t, o);
  }
  return (
    (t.flags |= 1),
    (e = Pr(i, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function Tg(e, t, n, r, o) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Gi(i, r) && e.ref === t.ref)
      if (((At = !1), (t.pendingProps = r = i), (e.lanes & o) !== 0))
        e.flags & 131072 && (At = !0);
      else return (t.lanes = e.lanes), Zn(e, t, o);
  }
  return eu(e, t, n, r, o);
}
function Pg(e, t, n) {
  var r = t.pendingProps,
    o = r.children,
    i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        Re(Ao, It),
        (It |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = i !== null ? i.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          Re(Ao, It),
          (It |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = i !== null ? i.baseLanes : n),
        Re(Ao, It),
        (It |= r);
    }
  else
    i !== null ? ((r = i.baseLanes | n), (t.memoizedState = null)) : (r = n),
      Re(Ao, It),
      (It |= r);
  return Ct(e, t, o, n), t.child;
}
function Ng(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function eu(e, t, n, r, o) {
  var i = Ot(n) ? ro : bt.current;
  return (
    (i = Ho(t, i)),
    zo(t, o),
    (n = yd(e, t, n, r, i, o)),
    (r = wd()),
    e !== null && !At
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        Zn(e, t, o))
      : (Fe && r && ad(t), (t.flags |= 1), Ct(e, t, n, o), t.child)
  );
}
function fp(e, t, n, r, o) {
  if (Ot(n)) {
    var i = !0;
    kl(t);
  } else i = !1;
  if ((zo(t, o), t.stateNode === null))
    ll(e, t), og(t, n, r), Zc(t, n, r, o), (r = !0);
  else if (e === null) {
    var a = t.stateNode,
      l = t.memoizedProps;
    a.props = l;
    var s = a.context,
      c = n.contextType;
    typeof c == "object" && c !== null
      ? (c = Jt(c))
      : ((c = Ot(n) ? ro : bt.current), (c = Ho(t, c)));
    var d = n.getDerivedStateFromProps,
      u =
        typeof d == "function" ||
        typeof a.getSnapshotBeforeUpdate == "function";
    u ||
      (typeof a.UNSAFE_componentWillReceiveProps != "function" &&
        typeof a.componentWillReceiveProps != "function") ||
      ((l !== r || s !== c) && rp(t, a, r, c)),
      (yr = !1);
    var p = t.memoizedState;
    (a.state = p),
      Dl(t, r, a, o),
      (s = t.memoizedState),
      l !== r || p !== s || Dt.current || yr
        ? (typeof d == "function" && (qc(t, n, d, r), (s = t.memoizedState)),
          (l = yr || np(t, n, l, r, p, s, c))
            ? (u ||
                (typeof a.UNSAFE_componentWillMount != "function" &&
                  typeof a.componentWillMount != "function") ||
                (typeof a.componentWillMount == "function" &&
                  a.componentWillMount(),
                typeof a.UNSAFE_componentWillMount == "function" &&
                  a.UNSAFE_componentWillMount()),
              typeof a.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof a.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = s)),
          (a.props = r),
          (a.state = s),
          (a.context = c),
          (r = l))
        : (typeof a.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (a = t.stateNode),
      ng(e, t),
      (l = t.memoizedProps),
      (c = t.type === t.elementType ? l : dn(t.type, l)),
      (a.props = c),
      (u = t.pendingProps),
      (p = a.context),
      (s = n.contextType),
      typeof s == "object" && s !== null
        ? (s = Jt(s))
        : ((s = Ot(n) ? ro : bt.current), (s = Ho(t, s)));
    var y = n.getDerivedStateFromProps;
    (d =
      typeof y == "function" ||
      typeof a.getSnapshotBeforeUpdate == "function") ||
      (typeof a.UNSAFE_componentWillReceiveProps != "function" &&
        typeof a.componentWillReceiveProps != "function") ||
      ((l !== u || p !== s) && rp(t, a, r, s)),
      (yr = !1),
      (p = t.memoizedState),
      (a.state = p),
      Dl(t, r, a, o);
    var v = t.memoizedState;
    l !== u || p !== v || Dt.current || yr
      ? (typeof y == "function" && (qc(t, n, y, r), (v = t.memoizedState)),
        (c = yr || np(t, n, c, r, p, v, s) || !1)
          ? (d ||
              (typeof a.UNSAFE_componentWillUpdate != "function" &&
                typeof a.componentWillUpdate != "function") ||
              (typeof a.componentWillUpdate == "function" &&
                a.componentWillUpdate(r, v, s),
              typeof a.UNSAFE_componentWillUpdate == "function" &&
                a.UNSAFE_componentWillUpdate(r, v, s)),
            typeof a.componentDidUpdate == "function" && (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof a.componentDidUpdate != "function" ||
              (l === e.memoizedProps && p === e.memoizedState) ||
              (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate != "function" ||
              (l === e.memoizedProps && p === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = v)),
        (a.props = r),
        (a.state = v),
        (a.context = s),
        (r = c))
      : (typeof a.componentDidUpdate != "function" ||
          (l === e.memoizedProps && p === e.memoizedState) ||
          (t.flags |= 4),
        typeof a.getSnapshotBeforeUpdate != "function" ||
          (l === e.memoizedProps && p === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return tu(e, t, n, r, i, o);
}
function tu(e, t, n, r, o, i) {
  Ng(e, t);
  var a = (t.flags & 128) !== 0;
  if (!r && !a) return o && qf(t, n, !1), Zn(e, t, i);
  (r = t.stateNode), (sx.current = t);
  var l =
    a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && a
      ? ((t.child = Wo(t, e.child, null, i)), (t.child = Wo(t, null, l, i)))
      : Ct(e, t, l, i),
    (t.memoizedState = r.state),
    o && qf(t, n, !0),
    t.child
  );
}
function Ag(e) {
  var t = e.stateNode;
  t.pendingContext
    ? Xf(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Xf(e, t.context, !1),
    md(e, t.containerInfo);
}
function pp(e, t, n, r, o) {
  return Vo(), sd(o), (t.flags |= 256), Ct(e, t, n, r), t.child;
}
var nu = { dehydrated: null, treeContext: null, retryLane: 0 };
function ru(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Dg(e, t, n) {
  var r = t.pendingProps,
    o = je.current,
    i = !1,
    a = (t.flags & 128) !== 0,
    l;
  if (
    ((l = a) ||
      (l = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
    l
      ? ((i = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (o |= 1),
    Re(je, o & 1),
    e === null)
  )
    return (
      Qc(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((a = r.children),
          (e = r.fallback),
          i
            ? ((r = t.mode),
              (i = t.child),
              (a = { mode: "hidden", children: a }),
              !(r & 1) && i !== null
                ? ((i.childLanes = 0), (i.pendingProps = a))
                : (i = is(a, r, 0, null)),
              (e = to(e, r, n, null)),
              (i.return = t),
              (e.return = t),
              (i.sibling = e),
              (t.child = i),
              (t.child.memoizedState = ru(n)),
              (t.memoizedState = nu),
              e)
            : Ed(t, a))
    );
  if (((o = e.memoizedState), o !== null && ((l = o.dehydrated), l !== null)))
    return cx(e, t, a, r, l, o, n);
  if (i) {
    (i = r.fallback), (a = t.mode), (o = e.child), (l = o.sibling);
    var s = { mode: "hidden", children: r.children };
    return (
      !(a & 1) && t.child !== o
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = s),
          (t.deletions = null))
        : ((r = Pr(o, s)), (r.subtreeFlags = o.subtreeFlags & 14680064)),
      l !== null ? (i = Pr(l, i)) : ((i = to(i, a, n, null)), (i.flags |= 2)),
      (i.return = t),
      (r.return = t),
      (r.sibling = i),
      (t.child = r),
      (r = i),
      (i = t.child),
      (a = e.child.memoizedState),
      (a =
        a === null
          ? ru(n)
          : {
              baseLanes: a.baseLanes | n,
              cachePool: null,
              transitions: a.transitions,
            }),
      (i.memoizedState = a),
      (i.childLanes = e.childLanes & ~n),
      (t.memoizedState = nu),
      r
    );
  }
  return (
    (i = e.child),
    (e = i.sibling),
    (r = Pr(i, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
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
function Ed(e, t) {
  return (
    (t = is({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Ia(e, t, n, r) {
  return (
    r !== null && sd(r),
    Wo(t, e.child, null, n),
    (e = Ed(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function cx(e, t, n, r, o, i, a) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = Xs(Error(L(422)))), Ia(e, t, a, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((i = r.fallback),
        (o = t.mode),
        (r = is({ mode: "visible", children: r.children }, o, 0, null)),
        (i = to(i, o, a, null)),
        (i.flags |= 2),
        (r.return = t),
        (i.return = t),
        (r.sibling = i),
        (t.child = r),
        t.mode & 1 && Wo(t, e.child, null, a),
        (t.child.memoizedState = ru(a)),
        (t.memoizedState = nu),
        i);
  if (!(t.mode & 1)) return Ia(e, t, a, null);
  if (o.data === "$!") {
    if (((r = o.nextSibling && o.nextSibling.dataset), r)) var l = r.dgst;
    return (r = l), (i = Error(L(419))), (r = Xs(i, r, void 0)), Ia(e, t, a, r);
  }
  if (((l = (a & e.childLanes) !== 0), At || l)) {
    if (((r = st), r !== null)) {
      switch (a & -a) {
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
      (o = o & (r.suspendedLanes | a) ? 0 : o),
        o !== 0 &&
          o !== i.retryLane &&
          ((i.retryLane = o), qn(e, o), gn(r, e, o, -1));
    }
    return kd(), (r = Xs(Error(L(421)))), Ia(e, t, a, r);
  }
  return o.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Ex.bind(null, e)),
      (o._reactRetry = t),
      null)
    : ((e = i.treeContext),
      (zt = _r(o.nextSibling)),
      (jt = t),
      (Fe = !0),
      (mn = null),
      e !== null &&
        ((Yt[Qt++] = Vn),
        (Yt[Qt++] = Wn),
        (Yt[Qt++] = oo),
        (Vn = e.id),
        (Wn = e.overflow),
        (oo = t)),
      (t = Ed(t, r.children)),
      (t.flags |= 4096),
      t);
}
function mp(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Xc(e.return, t, n);
}
function qs(e, t, n, r, o) {
  var i = e.memoizedState;
  i === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: o,
      })
    : ((i.isBackwards = t),
      (i.rendering = null),
      (i.renderingStartTime = 0),
      (i.last = r),
      (i.tail = n),
      (i.tailMode = o));
}
function Og(e, t, n) {
  var r = t.pendingProps,
    o = r.revealOrder,
    i = r.tail;
  if ((Ct(e, t, r.children, n), (r = je.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && mp(e, n, t);
        else if (e.tag === 19) mp(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((Re(je, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (o) {
      case "forwards":
        for (n = t.child, o = null; n !== null; )
          (e = n.alternate),
            e !== null && Ol(e) === null && (o = n),
            (n = n.sibling);
        (n = o),
          n === null
            ? ((o = t.child), (t.child = null))
            : ((o = n.sibling), (n.sibling = null)),
          qs(t, !1, o, n, i);
        break;
      case "backwards":
        for (n = null, o = t.child, t.child = null; o !== null; ) {
          if (((e = o.alternate), e !== null && Ol(e) === null)) {
            t.child = o;
            break;
          }
          (e = o.sibling), (o.sibling = n), (n = o), (o = e);
        }
        qs(t, !0, n, null, i);
        break;
      case "together":
        qs(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function ll(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Zn(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (ao |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(L(153));
  if (t.child !== null) {
    for (
      e = t.child, n = Pr(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = Pr(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function ux(e, t, n) {
  switch (t.tag) {
    case 3:
      Ag(t), Vo();
      break;
    case 5:
      lg(t);
      break;
    case 1:
      Ot(t.type) && kl(t);
      break;
    case 4:
      md(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        o = t.memoizedProps.value;
      Re(Nl, r._currentValue), (r._currentValue = o);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (Re(je, je.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? Dg(e, t, n)
          : (Re(je, je.current & 1),
            (e = Zn(e, t, n)),
            e !== null ? e.sibling : null);
      Re(je, je.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return Og(e, t, n);
        t.flags |= 128;
      }
      if (
        ((o = t.memoizedState),
        o !== null &&
          ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
        Re(je, je.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), Pg(e, t, n);
  }
  return Zn(e, t, n);
}
var Mg, ou, Lg, Ig;
Mg = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
ou = function () {};
Lg = function (e, t, n, r) {
  var o = e.memoizedProps;
  if (o !== r) {
    (e = t.stateNode), Xr(Nn.current);
    var i = null;
    switch (n) {
      case "input":
        (o = _c(e, o)), (r = _c(e, r)), (i = []);
        break;
      case "select":
        (o = Be({}, o, { value: void 0 })),
          (r = Be({}, r, { value: void 0 })),
          (i = []);
        break;
      case "textarea":
        (o = Tc(e, o)), (r = Tc(e, r)), (i = []);
        break;
      default:
        typeof o.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = _l);
    }
    Nc(n, r);
    var a;
    n = null;
    for (c in o)
      if (!r.hasOwnProperty(c) && o.hasOwnProperty(c) && o[c] != null)
        if (c === "style") {
          var l = o[c];
          for (a in l) l.hasOwnProperty(a) && (n || (n = {}), (n[a] = ""));
        } else
          c !== "dangerouslySetInnerHTML" &&
            c !== "children" &&
            c !== "suppressContentEditableWarning" &&
            c !== "suppressHydrationWarning" &&
            c !== "autoFocus" &&
            (ji.hasOwnProperty(c)
              ? i || (i = [])
              : (i = i || []).push(c, null));
    for (c in r) {
      var s = r[c];
      if (
        ((l = o != null ? o[c] : void 0),
        r.hasOwnProperty(c) && s !== l && (s != null || l != null))
      )
        if (c === "style")
          if (l) {
            for (a in l)
              !l.hasOwnProperty(a) ||
                (s && s.hasOwnProperty(a)) ||
                (n || (n = {}), (n[a] = ""));
            for (a in s)
              s.hasOwnProperty(a) &&
                l[a] !== s[a] &&
                (n || (n = {}), (n[a] = s[a]));
          } else n || (i || (i = []), i.push(c, n)), (n = s);
        else
          c === "dangerouslySetInnerHTML"
            ? ((s = s ? s.__html : void 0),
              (l = l ? l.__html : void 0),
              s != null && l !== s && (i = i || []).push(c, s))
            : c === "children"
            ? (typeof s != "string" && typeof s != "number") ||
              (i = i || []).push(c, "" + s)
            : c !== "suppressContentEditableWarning" &&
              c !== "suppressHydrationWarning" &&
              (ji.hasOwnProperty(c)
                ? (s != null && c === "onScroll" && Ne("scroll", e),
                  i || l === s || (i = []))
                : (i = i || []).push(c, s));
    }
    n && (i = i || []).push("style", n);
    var c = i;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
Ig = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function pi(e, t) {
  if (!Fe)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function wt(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var o = e.child; o !== null; )
      (n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags & 14680064),
        (r |= o.flags & 14680064),
        (o.return = e),
        (o = o.sibling);
  else
    for (o = e.child; o !== null; )
      (n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags),
        (r |= o.flags),
        (o.return = e),
        (o = o.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function dx(e, t, n) {
  var r = t.pendingProps;
  switch ((ld(t), t.tag)) {
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
      return wt(t), null;
    case 1:
      return Ot(t.type) && Rl(), wt(t), null;
    case 3:
      return (
        (r = t.stateNode),
        Ko(),
        Ae(Dt),
        Ae(bt),
        gd(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Ma(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), mn !== null && (fu(mn), (mn = null)))),
        ou(e, t),
        wt(t),
        null
      );
    case 5:
      hd(t);
      var o = Xr(Zi.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        Lg(e, t, n, r, o),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(L(166));
          return wt(t), null;
        }
        if (((e = Xr(Nn.current)), Ma(t))) {
          (r = t.stateNode), (n = t.type);
          var i = t.memoizedProps;
          switch (((r[Rn] = t), (r[Xi] = i), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              Ne("cancel", r), Ne("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              Ne("load", r);
              break;
            case "video":
            case "audio":
              for (o = 0; o < Ti.length; o++) Ne(Ti[o], r);
              break;
            case "source":
              Ne("error", r);
              break;
            case "img":
            case "image":
            case "link":
              Ne("error", r), Ne("load", r);
              break;
            case "details":
              Ne("toggle", r);
              break;
            case "input":
              Sf(r, i), Ne("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!i.multiple }),
                Ne("invalid", r);
              break;
            case "textarea":
              $f(r, i), Ne("invalid", r);
          }
          Nc(n, i), (o = null);
          for (var a in i)
            if (i.hasOwnProperty(a)) {
              var l = i[a];
              a === "children"
                ? typeof l == "string"
                  ? r.textContent !== l &&
                    (i.suppressHydrationWarning !== !0 &&
                      Oa(r.textContent, l, e),
                    (o = ["children", l]))
                  : typeof l == "number" &&
                    r.textContent !== "" + l &&
                    (i.suppressHydrationWarning !== !0 &&
                      Oa(r.textContent, l, e),
                    (o = ["children", "" + l]))
                : ji.hasOwnProperty(a) &&
                  l != null &&
                  a === "onScroll" &&
                  Ne("scroll", r);
            }
          switch (n) {
            case "input":
              _a(r), Cf(r, i, !0);
              break;
            case "textarea":
              _a(r), _f(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = _l);
          }
          (r = o), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (a = o.nodeType === 9 ? o : o.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = uh(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = a.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = a.createElement(n, { is: r.is }))
                : ((e = a.createElement(n)),
                  n === "select" &&
                    ((a = e),
                    r.multiple
                      ? (a.multiple = !0)
                      : r.size && (a.size = r.size)))
              : (e = a.createElementNS(e, n)),
            (e[Rn] = t),
            (e[Xi] = r),
            Mg(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((a = Ac(n, r)), n)) {
              case "dialog":
                Ne("cancel", e), Ne("close", e), (o = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                Ne("load", e), (o = r);
                break;
              case "video":
              case "audio":
                for (o = 0; o < Ti.length; o++) Ne(Ti[o], e);
                o = r;
                break;
              case "source":
                Ne("error", e), (o = r);
                break;
              case "img":
              case "image":
              case "link":
                Ne("error", e), Ne("load", e), (o = r);
                break;
              case "details":
                Ne("toggle", e), (o = r);
                break;
              case "input":
                Sf(e, r), (o = _c(e, r)), Ne("invalid", e);
                break;
              case "option":
                o = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (o = Be({}, r, { value: void 0 })),
                  Ne("invalid", e);
                break;
              case "textarea":
                $f(e, r), (o = Tc(e, r)), Ne("invalid", e);
                break;
              default:
                o = r;
            }
            Nc(n, o), (l = o);
            for (i in l)
              if (l.hasOwnProperty(i)) {
                var s = l[i];
                i === "style"
                  ? ph(e, s)
                  : i === "dangerouslySetInnerHTML"
                  ? ((s = s ? s.__html : void 0), s != null && dh(e, s))
                  : i === "children"
                  ? typeof s == "string"
                    ? (n !== "textarea" || s !== "") && Ui(e, s)
                    : typeof s == "number" && Ui(e, "" + s)
                  : i !== "suppressContentEditableWarning" &&
                    i !== "suppressHydrationWarning" &&
                    i !== "autoFocus" &&
                    (ji.hasOwnProperty(i)
                      ? s != null && i === "onScroll" && Ne("scroll", e)
                      : s != null && Ku(e, i, s, a));
              }
            switch (n) {
              case "input":
                _a(e), Cf(e, r, !1);
                break;
              case "textarea":
                _a(e), _f(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Nr(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (i = r.value),
                  i != null
                    ? Mo(e, !!r.multiple, i, !1)
                    : r.defaultValue != null &&
                      Mo(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof o.onClick == "function" && (e.onclick = _l);
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
      return wt(t), null;
    case 6:
      if (e && t.stateNode != null) Ig(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(L(166));
        if (((n = Xr(Zi.current)), Xr(Nn.current), Ma(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Rn] = t),
            (i = r.nodeValue !== n) && ((e = jt), e !== null))
          )
            switch (e.tag) {
              case 3:
                Oa(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Oa(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Rn] = t),
            (t.stateNode = r);
      }
      return wt(t), null;
    case 13:
      if (
        (Ae(je),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (Fe && zt !== null && t.mode & 1 && !(t.flags & 128))
          eg(), Vo(), (t.flags |= 98560), (i = !1);
        else if (((i = Ma(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!i) throw Error(L(318));
            if (
              ((i = t.memoizedState),
              (i = i !== null ? i.dehydrated : null),
              !i)
            )
              throw Error(L(317));
            i[Rn] = t;
          } else
            Vo(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          wt(t), (i = !1);
        } else mn !== null && (fu(mn), (mn = null)), (i = !0);
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || je.current & 1 ? it === 0 && (it = 3) : kd())),
          t.updateQueue !== null && (t.flags |= 4),
          wt(t),
          null);
    case 4:
      return (
        Ko(), ou(e, t), e === null && Yi(t.stateNode.containerInfo), wt(t), null
      );
    case 10:
      return dd(t.type._context), wt(t), null;
    case 17:
      return Ot(t.type) && Rl(), wt(t), null;
    case 19:
      if ((Ae(je), (i = t.memoizedState), i === null)) return wt(t), null;
      if (((r = (t.flags & 128) !== 0), (a = i.rendering), a === null))
        if (r) pi(i, !1);
        else {
          if (it !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((a = Ol(e)), a !== null)) {
                for (
                  t.flags |= 128,
                    pi(i, !1),
                    r = a.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (i = n),
                    (e = r),
                    (i.flags &= 14680066),
                    (a = i.alternate),
                    a === null
                      ? ((i.childLanes = 0),
                        (i.lanes = e),
                        (i.child = null),
                        (i.subtreeFlags = 0),
                        (i.memoizedProps = null),
                        (i.memoizedState = null),
                        (i.updateQueue = null),
                        (i.dependencies = null),
                        (i.stateNode = null))
                      : ((i.childLanes = a.childLanes),
                        (i.lanes = a.lanes),
                        (i.child = a.child),
                        (i.subtreeFlags = 0),
                        (i.deletions = null),
                        (i.memoizedProps = a.memoizedProps),
                        (i.memoizedState = a.memoizedState),
                        (i.updateQueue = a.updateQueue),
                        (i.type = a.type),
                        (e = a.dependencies),
                        (i.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return Re(je, (je.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          i.tail !== null &&
            Je() > Yo &&
            ((t.flags |= 128), (r = !0), pi(i, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Ol(a)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              pi(i, !0),
              i.tail === null && i.tailMode === "hidden" && !a.alternate && !Fe)
            )
              return wt(t), null;
          } else
            2 * Je() - i.renderingStartTime > Yo &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), pi(i, !1), (t.lanes = 4194304));
        i.isBackwards
          ? ((a.sibling = t.child), (t.child = a))
          : ((n = i.last),
            n !== null ? (n.sibling = a) : (t.child = a),
            (i.last = a));
      }
      return i.tail !== null
        ? ((t = i.tail),
          (i.rendering = t),
          (i.tail = t.sibling),
          (i.renderingStartTime = Je()),
          (t.sibling = null),
          (n = je.current),
          Re(je, r ? (n & 1) | 2 : n & 1),
          t)
        : (wt(t), null);
    case 22:
    case 23:
      return (
        Rd(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? It & 1073741824 && (wt(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : wt(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(L(156, t.tag));
}
function fx(e, t) {
  switch ((ld(t), t.tag)) {
    case 1:
      return (
        Ot(t.type) && Rl(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Ko(),
        Ae(Dt),
        Ae(bt),
        gd(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return hd(t), null;
    case 13:
      if (
        (Ae(je), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(L(340));
        Vo();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return Ae(je), null;
    case 4:
      return Ko(), null;
    case 10:
      return dd(t.type._context), null;
    case 22:
    case 23:
      return Rd(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Fa = !1,
  xt = !1,
  px = typeof WeakSet == "function" ? WeakSet : Set,
  Y = null;
function No(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        Ke(e, t, r);
      }
    else n.current = null;
}
function iu(e, t, n) {
  try {
    n();
  } catch (r) {
    Ke(e, t, r);
  }
}
var hp = !1;
function mx(e, t) {
  if (((Bc = Sl), (e = Uh()), id(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var o = r.anchorOffset,
            i = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, i.nodeType;
          } catch {
            n = null;
            break e;
          }
          var a = 0,
            l = -1,
            s = -1,
            c = 0,
            d = 0,
            u = e,
            p = null;
          t: for (;;) {
            for (
              var y;
              u !== n || (o !== 0 && u.nodeType !== 3) || (l = a + o),
                u !== i || (r !== 0 && u.nodeType !== 3) || (s = a + r),
                u.nodeType === 3 && (a += u.nodeValue.length),
                (y = u.firstChild) !== null;

            )
              (p = u), (u = y);
            for (;;) {
              if (u === e) break t;
              if (
                (p === n && ++c === o && (l = a),
                p === i && ++d === r && (s = a),
                (y = u.nextSibling) !== null)
              )
                break;
              (u = p), (p = u.parentNode);
            }
            u = y;
          }
          n = l === -1 || s === -1 ? null : { start: l, end: s };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Hc = { focusedElem: e, selectionRange: n }, Sl = !1, Y = t; Y !== null; )
    if (((t = Y), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (Y = e);
    else
      for (; Y !== null; ) {
        t = Y;
        try {
          var v = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (v !== null) {
                  var g = v.memoizedProps,
                    x = v.memoizedState,
                    m = t.stateNode,
                    h = m.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? g : dn(t.type, g),
                      x
                    );
                  m.__reactInternalSnapshotBeforeUpdate = h;
                }
                break;
              case 3:
                var w = t.stateNode.containerInfo;
                w.nodeType === 1
                  ? (w.textContent = "")
                  : w.nodeType === 9 &&
                    w.documentElement &&
                    w.removeChild(w.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(L(163));
            }
        } catch (E) {
          Ke(t, t.return, E);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (Y = e);
          break;
        }
        Y = t.return;
      }
  return (v = hp), (hp = !1), v;
}
function Li(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var o = (r = r.next);
    do {
      if ((o.tag & e) === e) {
        var i = o.destroy;
        (o.destroy = void 0), i !== void 0 && iu(t, n, i);
      }
      o = o.next;
    } while (o !== r);
  }
}
function rs(e, t) {
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
function au(e) {
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
function Fg(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), Fg(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Rn], delete t[Xi], delete t[Kc], delete t[Xw], delete t[qw])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function zg(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function gp(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || zg(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function lu(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = _l));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (lu(e, t, n), e = e.sibling; e !== null; ) lu(e, t, n), (e = e.sibling);
}
function su(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (su(e, t, n), e = e.sibling; e !== null; ) su(e, t, n), (e = e.sibling);
}
var pt = null,
  fn = !1;
function ur(e, t, n) {
  for (n = n.child; n !== null; ) jg(e, t, n), (n = n.sibling);
}
function jg(e, t, n) {
  if (Pn && typeof Pn.onCommitFiberUnmount == "function")
    try {
      Pn.onCommitFiberUnmount(Ql, n);
    } catch {}
  switch (n.tag) {
    case 5:
      xt || No(n, t);
    case 6:
      var r = pt,
        o = fn;
      (pt = null),
        ur(e, t, n),
        (pt = r),
        (fn = o),
        pt !== null &&
          (fn
            ? ((e = pt),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : pt.removeChild(n.stateNode));
      break;
    case 18:
      pt !== null &&
        (fn
          ? ((e = pt),
            (n = n.stateNode),
            e.nodeType === 8
              ? Vs(e.parentNode, n)
              : e.nodeType === 1 && Vs(e, n),
            Wi(e))
          : Vs(pt, n.stateNode));
      break;
    case 4:
      (r = pt),
        (o = fn),
        (pt = n.stateNode.containerInfo),
        (fn = !0),
        ur(e, t, n),
        (pt = r),
        (fn = o);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !xt &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        o = r = r.next;
        do {
          var i = o,
            a = i.destroy;
          (i = i.tag),
            a !== void 0 && (i & 2 || i & 4) && iu(n, t, a),
            (o = o.next);
        } while (o !== r);
      }
      ur(e, t, n);
      break;
    case 1:
      if (
        !xt &&
        (No(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (l) {
          Ke(n, t, l);
        }
      ur(e, t, n);
      break;
    case 21:
      ur(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((xt = (r = xt) || n.memoizedState !== null), ur(e, t, n), (xt = r))
        : ur(e, t, n);
      break;
    default:
      ur(e, t, n);
  }
}
function vp(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new px()),
      t.forEach(function (r) {
        var o = Sx.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(o, o));
      });
  }
}
function sn(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var o = n[r];
      try {
        var i = e,
          a = t,
          l = a;
        e: for (; l !== null; ) {
          switch (l.tag) {
            case 5:
              (pt = l.stateNode), (fn = !1);
              break e;
            case 3:
              (pt = l.stateNode.containerInfo), (fn = !0);
              break e;
            case 4:
              (pt = l.stateNode.containerInfo), (fn = !0);
              break e;
          }
          l = l.return;
        }
        if (pt === null) throw Error(L(160));
        jg(i, a, o), (pt = null), (fn = !1);
        var s = o.alternate;
        s !== null && (s.return = null), (o.return = null);
      } catch (c) {
        Ke(o, t, c);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) Ug(t, e), (t = t.sibling);
}
function Ug(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((sn(t, e), $n(e), r & 4)) {
        try {
          Li(3, e, e.return), rs(3, e);
        } catch (g) {
          Ke(e, e.return, g);
        }
        try {
          Li(5, e, e.return);
        } catch (g) {
          Ke(e, e.return, g);
        }
      }
      break;
    case 1:
      sn(t, e), $n(e), r & 512 && n !== null && No(n, n.return);
      break;
    case 5:
      if (
        (sn(t, e),
        $n(e),
        r & 512 && n !== null && No(n, n.return),
        e.flags & 32)
      ) {
        var o = e.stateNode;
        try {
          Ui(o, "");
        } catch (g) {
          Ke(e, e.return, g);
        }
      }
      if (r & 4 && ((o = e.stateNode), o != null)) {
        var i = e.memoizedProps,
          a = n !== null ? n.memoizedProps : i,
          l = e.type,
          s = e.updateQueue;
        if (((e.updateQueue = null), s !== null))
          try {
            l === "input" && i.type === "radio" && i.name != null && sh(o, i),
              Ac(l, a);
            var c = Ac(l, i);
            for (a = 0; a < s.length; a += 2) {
              var d = s[a],
                u = s[a + 1];
              d === "style"
                ? ph(o, u)
                : d === "dangerouslySetInnerHTML"
                ? dh(o, u)
                : d === "children"
                ? Ui(o, u)
                : Ku(o, d, u, c);
            }
            switch (l) {
              case "input":
                Rc(o, i);
                break;
              case "textarea":
                ch(o, i);
                break;
              case "select":
                var p = o._wrapperState.wasMultiple;
                o._wrapperState.wasMultiple = !!i.multiple;
                var y = i.value;
                y != null
                  ? Mo(o, !!i.multiple, y, !1)
                  : p !== !!i.multiple &&
                    (i.defaultValue != null
                      ? Mo(o, !!i.multiple, i.defaultValue, !0)
                      : Mo(o, !!i.multiple, i.multiple ? [] : "", !1));
            }
            o[Xi] = i;
          } catch (g) {
            Ke(e, e.return, g);
          }
      }
      break;
    case 6:
      if ((sn(t, e), $n(e), r & 4)) {
        if (e.stateNode === null) throw Error(L(162));
        (o = e.stateNode), (i = e.memoizedProps);
        try {
          o.nodeValue = i;
        } catch (g) {
          Ke(e, e.return, g);
        }
      }
      break;
    case 3:
      if (
        (sn(t, e), $n(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          Wi(t.containerInfo);
        } catch (g) {
          Ke(e, e.return, g);
        }
      break;
    case 4:
      sn(t, e), $n(e);
      break;
    case 13:
      sn(t, e),
        $n(e),
        (o = e.child),
        o.flags & 8192 &&
          ((i = o.memoizedState !== null),
          (o.stateNode.isHidden = i),
          !i ||
            (o.alternate !== null && o.alternate.memoizedState !== null) ||
            ($d = Je())),
        r & 4 && vp(e);
      break;
    case 22:
      if (
        ((d = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((xt = (c = xt) || d), sn(t, e), (xt = c)) : sn(t, e),
        $n(e),
        r & 8192)
      ) {
        if (
          ((c = e.memoizedState !== null),
          (e.stateNode.isHidden = c) && !d && e.mode & 1)
        )
          for (Y = e, d = e.child; d !== null; ) {
            for (u = Y = d; Y !== null; ) {
              switch (((p = Y), (y = p.child), p.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Li(4, p, p.return);
                  break;
                case 1:
                  No(p, p.return);
                  var v = p.stateNode;
                  if (typeof v.componentWillUnmount == "function") {
                    (r = p), (n = p.return);
                    try {
                      (t = r),
                        (v.props = t.memoizedProps),
                        (v.state = t.memoizedState),
                        v.componentWillUnmount();
                    } catch (g) {
                      Ke(r, n, g);
                    }
                  }
                  break;
                case 5:
                  No(p, p.return);
                  break;
                case 22:
                  if (p.memoizedState !== null) {
                    wp(u);
                    continue;
                  }
              }
              y !== null ? ((y.return = p), (Y = y)) : wp(u);
            }
            d = d.sibling;
          }
        e: for (d = null, u = e; ; ) {
          if (u.tag === 5) {
            if (d === null) {
              d = u;
              try {
                (o = u.stateNode),
                  c
                    ? ((i = o.style),
                      typeof i.setProperty == "function"
                        ? i.setProperty("display", "none", "important")
                        : (i.display = "none"))
                    : ((l = u.stateNode),
                      (s = u.memoizedProps.style),
                      (a =
                        s != null && s.hasOwnProperty("display")
                          ? s.display
                          : null),
                      (l.style.display = fh("display", a)));
              } catch (g) {
                Ke(e, e.return, g);
              }
            }
          } else if (u.tag === 6) {
            if (d === null)
              try {
                u.stateNode.nodeValue = c ? "" : u.memoizedProps;
              } catch (g) {
                Ke(e, e.return, g);
              }
          } else if (
            ((u.tag !== 22 && u.tag !== 23) ||
              u.memoizedState === null ||
              u === e) &&
            u.child !== null
          ) {
            (u.child.return = u), (u = u.child);
            continue;
          }
          if (u === e) break e;
          for (; u.sibling === null; ) {
            if (u.return === null || u.return === e) break e;
            d === u && (d = null), (u = u.return);
          }
          d === u && (d = null), (u.sibling.return = u.return), (u = u.sibling);
        }
      }
      break;
    case 19:
      sn(t, e), $n(e), r & 4 && vp(e);
      break;
    case 21:
      break;
    default:
      sn(t, e), $n(e);
  }
}
function $n(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (zg(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(L(160));
      }
      switch (r.tag) {
        case 5:
          var o = r.stateNode;
          r.flags & 32 && (Ui(o, ""), (r.flags &= -33));
          var i = gp(e);
          su(e, i, o);
          break;
        case 3:
        case 4:
          var a = r.stateNode.containerInfo,
            l = gp(e);
          lu(e, l, a);
          break;
        default:
          throw Error(L(161));
      }
    } catch (s) {
      Ke(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function hx(e, t, n) {
  (Y = e), Bg(e);
}
function Bg(e, t, n) {
  for (var r = (e.mode & 1) !== 0; Y !== null; ) {
    var o = Y,
      i = o.child;
    if (o.tag === 22 && r) {
      var a = o.memoizedState !== null || Fa;
      if (!a) {
        var l = o.alternate,
          s = (l !== null && l.memoizedState !== null) || xt;
        l = Fa;
        var c = xt;
        if (((Fa = a), (xt = s) && !c))
          for (Y = o; Y !== null; )
            (a = Y),
              (s = a.child),
              a.tag === 22 && a.memoizedState !== null
                ? xp(o)
                : s !== null
                ? ((s.return = a), (Y = s))
                : xp(o);
        for (; i !== null; ) (Y = i), Bg(i), (i = i.sibling);
        (Y = o), (Fa = l), (xt = c);
      }
      yp(e);
    } else
      o.subtreeFlags & 8772 && i !== null ? ((i.return = o), (Y = i)) : yp(e);
  }
}
function yp(e) {
  for (; Y !== null; ) {
    var t = Y;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              xt || rs(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !xt)
                if (n === null) r.componentDidMount();
                else {
                  var o =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : dn(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    o,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var i = t.updateQueue;
              i !== null && tp(t, i, r);
              break;
            case 3:
              var a = t.updateQueue;
              if (a !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                tp(t, a, n);
              }
              break;
            case 5:
              var l = t.stateNode;
              if (n === null && t.flags & 4) {
                n = l;
                var s = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    s.autoFocus && n.focus();
                    break;
                  case "img":
                    s.src && (n.src = s.src);
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
                var c = t.alternate;
                if (c !== null) {
                  var d = c.memoizedState;
                  if (d !== null) {
                    var u = d.dehydrated;
                    u !== null && Wi(u);
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
              throw Error(L(163));
          }
        xt || (t.flags & 512 && au(t));
      } catch (p) {
        Ke(t, t.return, p);
      }
    }
    if (t === e) {
      Y = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (Y = n);
      break;
    }
    Y = t.return;
  }
}
function wp(e) {
  for (; Y !== null; ) {
    var t = Y;
    if (t === e) {
      Y = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (Y = n);
      break;
    }
    Y = t.return;
  }
}
function xp(e) {
  for (; Y !== null; ) {
    var t = Y;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            rs(4, t);
          } catch (s) {
            Ke(t, n, s);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var o = t.return;
            try {
              r.componentDidMount();
            } catch (s) {
              Ke(t, o, s);
            }
          }
          var i = t.return;
          try {
            au(t);
          } catch (s) {
            Ke(t, i, s);
          }
          break;
        case 5:
          var a = t.return;
          try {
            au(t);
          } catch (s) {
            Ke(t, a, s);
          }
      }
    } catch (s) {
      Ke(t, t.return, s);
    }
    if (t === e) {
      Y = null;
      break;
    }
    var l = t.sibling;
    if (l !== null) {
      (l.return = t.return), (Y = l);
      break;
    }
    Y = t.return;
  }
}
var gx = Math.ceil,
  Il = rr.ReactCurrentDispatcher,
  Sd = rr.ReactCurrentOwner,
  qt = rr.ReactCurrentBatchConfig,
  be = 0,
  st = null,
  tt = null,
  mt = 0,
  It = 0,
  Ao = zr(0),
  it = 0,
  na = null,
  ao = 0,
  os = 0,
  Cd = 0,
  Ii = null,
  Nt = null,
  $d = 0,
  Yo = 1 / 0,
  Bn = null,
  Fl = !1,
  cu = null,
  kr = null,
  za = !1,
  Er = null,
  zl = 0,
  Fi = 0,
  uu = null,
  sl = -1,
  cl = 0;
function $t() {
  return be & 6 ? Je() : sl !== -1 ? sl : (sl = Je());
}
function Tr(e) {
  return e.mode & 1
    ? be & 2 && mt !== 0
      ? mt & -mt
      : Jw.transition !== null
      ? (cl === 0 && (cl = $h()), cl)
      : ((e = Ce),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Ah(e.type))),
        e)
    : 1;
}
function gn(e, t, n, r) {
  if (50 < Fi) throw ((Fi = 0), (uu = null), Error(L(185)));
  fa(e, n, r),
    (!(be & 2) || e !== st) &&
      (e === st && (!(be & 2) && (os |= n), it === 4 && xr(e, mt)),
      Mt(e, r),
      n === 1 && be === 0 && !(t.mode & 1) && ((Yo = Je() + 500), es && jr()));
}
function Mt(e, t) {
  var n = e.callbackNode;
  J1(e, t);
  var r = El(e, e === st ? mt : 0);
  if (r === 0)
    n !== null && Tf(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Tf(n), t === 1))
      e.tag === 0 ? Zw(bp.bind(null, e)) : qh(bp.bind(null, e)),
        Yw(function () {
          !(be & 6) && jr();
        }),
        (n = null);
    else {
      switch (_h(r)) {
        case 1:
          n = qu;
          break;
        case 4:
          n = Sh;
          break;
        case 16:
          n = bl;
          break;
        case 536870912:
          n = Ch;
          break;
        default:
          n = bl;
      }
      n = Xg(n, Hg.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function Hg(e, t) {
  if (((sl = -1), (cl = 0), be & 6)) throw Error(L(327));
  var n = e.callbackNode;
  if (jo() && e.callbackNode !== n) return null;
  var r = El(e, e === st ? mt : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = jl(e, r);
  else {
    t = r;
    var o = be;
    be |= 2;
    var i = Wg();
    (st !== e || mt !== t) && ((Bn = null), (Yo = Je() + 500), eo(e, t));
    do
      try {
        wx();
        break;
      } catch (l) {
        Vg(e, l);
      }
    while (!0);
    ud(),
      (Il.current = i),
      (be = o),
      tt !== null ? (t = 0) : ((st = null), (mt = 0), (t = it));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((o = Ic(e)), o !== 0 && ((r = o), (t = du(e, o)))), t === 1)
    )
      throw ((n = na), eo(e, 0), xr(e, r), Mt(e, Je()), n);
    if (t === 6) xr(e, r);
    else {
      if (
        ((o = e.current.alternate),
        !(r & 30) &&
          !vx(o) &&
          ((t = jl(e, r)),
          t === 2 && ((i = Ic(e)), i !== 0 && ((r = i), (t = du(e, i)))),
          t === 1))
      )
        throw ((n = na), eo(e, 0), xr(e, r), Mt(e, Je()), n);
      switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(L(345));
        case 2:
          Kr(e, Nt, Bn);
          break;
        case 3:
          if (
            (xr(e, r), (r & 130023424) === r && ((t = $d + 500 - Je()), 10 < t))
          ) {
            if (El(e, 0) !== 0) break;
            if (((o = e.suspendedLanes), (o & r) !== r)) {
              $t(), (e.pingedLanes |= e.suspendedLanes & o);
              break;
            }
            e.timeoutHandle = Wc(Kr.bind(null, e, Nt, Bn), t);
            break;
          }
          Kr(e, Nt, Bn);
          break;
        case 4:
          if ((xr(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, o = -1; 0 < r; ) {
            var a = 31 - hn(r);
            (i = 1 << a), (a = t[a]), a > o && (o = a), (r &= ~i);
          }
          if (
            ((r = o),
            (r = Je() - r),
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
                : 1960 * gx(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Wc(Kr.bind(null, e, Nt, Bn), r);
            break;
          }
          Kr(e, Nt, Bn);
          break;
        case 5:
          Kr(e, Nt, Bn);
          break;
        default:
          throw Error(L(329));
      }
    }
  }
  return Mt(e, Je()), e.callbackNode === n ? Hg.bind(null, e) : null;
}
function du(e, t) {
  var n = Ii;
  return (
    e.current.memoizedState.isDehydrated && (eo(e, t).flags |= 256),
    (e = jl(e, t)),
    e !== 2 && ((t = Nt), (Nt = n), t !== null && fu(t)),
    e
  );
}
function fu(e) {
  Nt === null ? (Nt = e) : Nt.push.apply(Nt, e);
}
function vx(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var o = n[r],
            i = o.getSnapshot;
          o = o.value;
          try {
            if (!yn(i(), o)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function xr(e, t) {
  for (
    t &= ~Cd,
      t &= ~os,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - hn(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function bp(e) {
  if (be & 6) throw Error(L(327));
  jo();
  var t = El(e, 0);
  if (!(t & 1)) return Mt(e, Je()), null;
  var n = jl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Ic(e);
    r !== 0 && ((t = r), (n = du(e, r)));
  }
  if (n === 1) throw ((n = na), eo(e, 0), xr(e, t), Mt(e, Je()), n);
  if (n === 6) throw Error(L(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Kr(e, Nt, Bn),
    Mt(e, Je()),
    null
  );
}
function _d(e, t) {
  var n = be;
  be |= 1;
  try {
    return e(t);
  } finally {
    (be = n), be === 0 && ((Yo = Je() + 500), es && jr());
  }
}
function lo(e) {
  Er !== null && Er.tag === 0 && !(be & 6) && jo();
  var t = be;
  be |= 1;
  var n = qt.transition,
    r = Ce;
  try {
    if (((qt.transition = null), (Ce = 1), e)) return e();
  } finally {
    (Ce = r), (qt.transition = n), (be = t), !(be & 6) && jr();
  }
}
function Rd() {
  (It = Ao.current), Ae(Ao);
}
function eo(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), Gw(n)), tt !== null))
    for (n = tt.return; n !== null; ) {
      var r = n;
      switch ((ld(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && Rl();
          break;
        case 3:
          Ko(), Ae(Dt), Ae(bt), gd();
          break;
        case 5:
          hd(r);
          break;
        case 4:
          Ko();
          break;
        case 13:
          Ae(je);
          break;
        case 19:
          Ae(je);
          break;
        case 10:
          dd(r.type._context);
          break;
        case 22:
        case 23:
          Rd();
      }
      n = n.return;
    }
  if (
    ((st = e),
    (tt = e = Pr(e.current, null)),
    (mt = It = t),
    (it = 0),
    (na = null),
    (Cd = os = ao = 0),
    (Nt = Ii = null),
    Qr !== null)
  ) {
    for (t = 0; t < Qr.length; t++)
      if (((n = Qr[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var o = r.next,
          i = n.pending;
        if (i !== null) {
          var a = i.next;
          (i.next = o), (r.next = a);
        }
        n.pending = r;
      }
    Qr = null;
  }
  return e;
}
function Vg(e, t) {
  do {
    var n = tt;
    try {
      if ((ud(), (il.current = Ll), Ml)) {
        for (var r = Ue.memoizedState; r !== null; ) {
          var o = r.queue;
          o !== null && (o.pending = null), (r = r.next);
        }
        Ml = !1;
      }
      if (
        ((io = 0),
        (lt = ot = Ue = null),
        (Mi = !1),
        (Ji = 0),
        (Sd.current = null),
        n === null || n.return === null)
      ) {
        (it = 1), (na = t), (tt = null);
        break;
      }
      e: {
        var i = e,
          a = n.return,
          l = n,
          s = t;
        if (
          ((t = mt),
          (l.flags |= 32768),
          s !== null && typeof s == "object" && typeof s.then == "function")
        ) {
          var c = s,
            d = l,
            u = d.tag;
          if (!(d.mode & 1) && (u === 0 || u === 11 || u === 15)) {
            var p = d.alternate;
            p
              ? ((d.updateQueue = p.updateQueue),
                (d.memoizedState = p.memoizedState),
                (d.lanes = p.lanes))
              : ((d.updateQueue = null), (d.memoizedState = null));
          }
          var y = sp(a);
          if (y !== null) {
            (y.flags &= -257),
              cp(y, a, l, i, t),
              y.mode & 1 && lp(i, c, t),
              (t = y),
              (s = c);
            var v = t.updateQueue;
            if (v === null) {
              var g = new Set();
              g.add(s), (t.updateQueue = g);
            } else v.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              lp(i, c, t), kd();
              break e;
            }
            s = Error(L(426));
          }
        } else if (Fe && l.mode & 1) {
          var x = sp(a);
          if (x !== null) {
            !(x.flags & 65536) && (x.flags |= 256),
              cp(x, a, l, i, t),
              sd(Go(s, l));
            break e;
          }
        }
        (i = s = Go(s, l)),
          it !== 4 && (it = 2),
          Ii === null ? (Ii = [i]) : Ii.push(i),
          (i = a);
        do {
          switch (i.tag) {
            case 3:
              (i.flags |= 65536), (t &= -t), (i.lanes |= t);
              var m = Rg(i, s, t);
              ep(i, m);
              break e;
            case 1:
              l = s;
              var h = i.type,
                w = i.stateNode;
              if (
                !(i.flags & 128) &&
                (typeof h.getDerivedStateFromError == "function" ||
                  (w !== null &&
                    typeof w.componentDidCatch == "function" &&
                    (kr === null || !kr.has(w))))
              ) {
                (i.flags |= 65536), (t &= -t), (i.lanes |= t);
                var E = kg(i, l, t);
                ep(i, E);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      Gg(n);
    } catch ($) {
      (t = $), tt === n && n !== null && (tt = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Wg() {
  var e = Il.current;
  return (Il.current = Ll), e === null ? Ll : e;
}
function kd() {
  (it === 0 || it === 3 || it === 2) && (it = 4),
    st === null || (!(ao & 268435455) && !(os & 268435455)) || xr(st, mt);
}
function jl(e, t) {
  var n = be;
  be |= 2;
  var r = Wg();
  (st !== e || mt !== t) && ((Bn = null), eo(e, t));
  do
    try {
      yx();
      break;
    } catch (o) {
      Vg(e, o);
    }
  while (!0);
  if ((ud(), (be = n), (Il.current = r), tt !== null)) throw Error(L(261));
  return (st = null), (mt = 0), it;
}
function yx() {
  for (; tt !== null; ) Kg(tt);
}
function wx() {
  for (; tt !== null && !V1(); ) Kg(tt);
}
function Kg(e) {
  var t = Qg(e.alternate, e, It);
  (e.memoizedProps = e.pendingProps),
    t === null ? Gg(e) : (tt = t),
    (Sd.current = null);
}
function Gg(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = fx(n, t)), n !== null)) {
        (n.flags &= 32767), (tt = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (it = 6), (tt = null);
        return;
      }
    } else if (((n = dx(n, t, It)), n !== null)) {
      tt = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      tt = t;
      return;
    }
    tt = t = e;
  } while (t !== null);
  it === 0 && (it = 5);
}
function Kr(e, t, n) {
  var r = Ce,
    o = qt.transition;
  try {
    (qt.transition = null), (Ce = 1), xx(e, t, n, r);
  } finally {
    (qt.transition = o), (Ce = r);
  }
  return null;
}
function xx(e, t, n, r) {
  do jo();
  while (Er !== null);
  if (be & 6) throw Error(L(327));
  n = e.finishedWork;
  var o = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(L(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var i = n.lanes | n.childLanes;
  if (
    (ew(e, i),
    e === st && ((tt = st = null), (mt = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      za ||
      ((za = !0),
      Xg(bl, function () {
        return jo(), null;
      })),
    (i = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || i)
  ) {
    (i = qt.transition), (qt.transition = null);
    var a = Ce;
    Ce = 1;
    var l = be;
    (be |= 4),
      (Sd.current = null),
      mx(e, n),
      Ug(n, e),
      jw(Hc),
      (Sl = !!Bc),
      (Hc = Bc = null),
      (e.current = n),
      hx(n),
      W1(),
      (be = l),
      (Ce = a),
      (qt.transition = i);
  } else e.current = n;
  if (
    (za && ((za = !1), (Er = e), (zl = o)),
    (i = e.pendingLanes),
    i === 0 && (kr = null),
    Y1(n.stateNode),
    Mt(e, Je()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (o = t[n]), r(o.value, { componentStack: o.stack, digest: o.digest });
  if (Fl) throw ((Fl = !1), (e = cu), (cu = null), e);
  return (
    zl & 1 && e.tag !== 0 && jo(),
    (i = e.pendingLanes),
    i & 1 ? (e === uu ? Fi++ : ((Fi = 0), (uu = e))) : (Fi = 0),
    jr(),
    null
  );
}
function jo() {
  if (Er !== null) {
    var e = _h(zl),
      t = qt.transition,
      n = Ce;
    try {
      if (((qt.transition = null), (Ce = 16 > e ? 16 : e), Er === null))
        var r = !1;
      else {
        if (((e = Er), (Er = null), (zl = 0), be & 6)) throw Error(L(331));
        var o = be;
        for (be |= 4, Y = e.current; Y !== null; ) {
          var i = Y,
            a = i.child;
          if (Y.flags & 16) {
            var l = i.deletions;
            if (l !== null) {
              for (var s = 0; s < l.length; s++) {
                var c = l[s];
                for (Y = c; Y !== null; ) {
                  var d = Y;
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Li(8, d, i);
                  }
                  var u = d.child;
                  if (u !== null) (u.return = d), (Y = u);
                  else
                    for (; Y !== null; ) {
                      d = Y;
                      var p = d.sibling,
                        y = d.return;
                      if ((Fg(d), d === c)) {
                        Y = null;
                        break;
                      }
                      if (p !== null) {
                        (p.return = y), (Y = p);
                        break;
                      }
                      Y = y;
                    }
                }
              }
              var v = i.alternate;
              if (v !== null) {
                var g = v.child;
                if (g !== null) {
                  v.child = null;
                  do {
                    var x = g.sibling;
                    (g.sibling = null), (g = x);
                  } while (g !== null);
                }
              }
              Y = i;
            }
          }
          if (i.subtreeFlags & 2064 && a !== null) (a.return = i), (Y = a);
          else
            e: for (; Y !== null; ) {
              if (((i = Y), i.flags & 2048))
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Li(9, i, i.return);
                }
              var m = i.sibling;
              if (m !== null) {
                (m.return = i.return), (Y = m);
                break e;
              }
              Y = i.return;
            }
        }
        var h = e.current;
        for (Y = h; Y !== null; ) {
          a = Y;
          var w = a.child;
          if (a.subtreeFlags & 2064 && w !== null) (w.return = a), (Y = w);
          else
            e: for (a = h; Y !== null; ) {
              if (((l = Y), l.flags & 2048))
                try {
                  switch (l.tag) {
                    case 0:
                    case 11:
                    case 15:
                      rs(9, l);
                  }
                } catch ($) {
                  Ke(l, l.return, $);
                }
              if (l === a) {
                Y = null;
                break e;
              }
              var E = l.sibling;
              if (E !== null) {
                (E.return = l.return), (Y = E);
                break e;
              }
              Y = l.return;
            }
        }
        if (
          ((be = o), jr(), Pn && typeof Pn.onPostCommitFiberRoot == "function")
        )
          try {
            Pn.onPostCommitFiberRoot(Ql, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (Ce = n), (qt.transition = t);
    }
  }
  return !1;
}
function Ep(e, t, n) {
  (t = Go(n, t)),
    (t = Rg(e, t, 1)),
    (e = Rr(e, t, 1)),
    (t = $t()),
    e !== null && (fa(e, 1, t), Mt(e, t));
}
function Ke(e, t, n) {
  if (e.tag === 3) Ep(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Ep(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (kr === null || !kr.has(r)))
        ) {
          (e = Go(n, e)),
            (e = kg(t, e, 1)),
            (t = Rr(t, e, 1)),
            (e = $t()),
            t !== null && (fa(t, 1, e), Mt(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function bx(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = $t()),
    (e.pingedLanes |= e.suspendedLanes & n),
    st === e &&
      (mt & n) === n &&
      (it === 4 || (it === 3 && (mt & 130023424) === mt && 500 > Je() - $d)
        ? eo(e, 0)
        : (Cd |= n)),
    Mt(e, t);
}
function Yg(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Ta), (Ta <<= 1), !(Ta & 130023424) && (Ta = 4194304))
      : (t = 1));
  var n = $t();
  (e = qn(e, t)), e !== null && (fa(e, t, n), Mt(e, n));
}
function Ex(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Yg(e, n);
}
function Sx(e, t) {
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
      throw Error(L(314));
  }
  r !== null && r.delete(t), Yg(e, n);
}
var Qg;
Qg = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Dt.current) At = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (At = !1), ux(e, t, n);
      At = !!(e.flags & 131072);
    }
  else (At = !1), Fe && t.flags & 1048576 && Zh(t, Pl, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      ll(e, t), (e = t.pendingProps);
      var o = Ho(t, bt.current);
      zo(t, n), (o = yd(null, t, r, e, o, n));
      var i = wd();
      return (
        (t.flags |= 1),
        typeof o == "object" &&
        o !== null &&
        typeof o.render == "function" &&
        o.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Ot(r) ? ((i = !0), kl(t)) : (i = !1),
            (t.memoizedState =
              o.state !== null && o.state !== void 0 ? o.state : null),
            pd(t),
            (o.updater = ts),
            (t.stateNode = o),
            (o._reactInternals = t),
            Zc(t, r, e, n),
            (t = tu(null, t, r, !0, i, n)))
          : ((t.tag = 0), Fe && i && ad(t), Ct(null, t, o, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (ll(e, t),
          (e = t.pendingProps),
          (o = r._init),
          (r = o(r._payload)),
          (t.type = r),
          (o = t.tag = $x(r)),
          (e = dn(r, e)),
          o)
        ) {
          case 0:
            t = eu(null, t, r, e, n);
            break e;
          case 1:
            t = fp(null, t, r, e, n);
            break e;
          case 11:
            t = up(null, t, r, e, n);
            break e;
          case 14:
            t = dp(null, t, r, dn(r.type, e), n);
            break e;
        }
        throw Error(L(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : dn(r, o)),
        eu(e, t, r, o, n)
      );
    case 1:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : dn(r, o)),
        fp(e, t, r, o, n)
      );
    case 3:
      e: {
        if ((Ag(t), e === null)) throw Error(L(387));
        (r = t.pendingProps),
          (i = t.memoizedState),
          (o = i.element),
          ng(e, t),
          Dl(t, r, null, n);
        var a = t.memoizedState;
        if (((r = a.element), i.isDehydrated))
          if (
            ((i = {
              element: r,
              isDehydrated: !1,
              cache: a.cache,
              pendingSuspenseBoundaries: a.pendingSuspenseBoundaries,
              transitions: a.transitions,
            }),
            (t.updateQueue.baseState = i),
            (t.memoizedState = i),
            t.flags & 256)
          ) {
            (o = Go(Error(L(423)), t)), (t = pp(e, t, r, n, o));
            break e;
          } else if (r !== o) {
            (o = Go(Error(L(424)), t)), (t = pp(e, t, r, n, o));
            break e;
          } else
            for (
              zt = _r(t.stateNode.containerInfo.firstChild),
                jt = t,
                Fe = !0,
                mn = null,
                n = ag(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((Vo(), r === o)) {
            t = Zn(e, t, n);
            break e;
          }
          Ct(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        lg(t),
        e === null && Qc(t),
        (r = t.type),
        (o = t.pendingProps),
        (i = e !== null ? e.memoizedProps : null),
        (a = o.children),
        Vc(r, o) ? (a = null) : i !== null && Vc(r, i) && (t.flags |= 32),
        Ng(e, t),
        Ct(e, t, a, n),
        t.child
      );
    case 6:
      return e === null && Qc(t), null;
    case 13:
      return Dg(e, t, n);
    case 4:
      return (
        md(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = Wo(t, null, r, n)) : Ct(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : dn(r, o)),
        up(e, t, r, o, n)
      );
    case 7:
      return Ct(e, t, t.pendingProps, n), t.child;
    case 8:
      return Ct(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Ct(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (o = t.pendingProps),
          (i = t.memoizedProps),
          (a = o.value),
          Re(Nl, r._currentValue),
          (r._currentValue = a),
          i !== null)
        )
          if (yn(i.value, a)) {
            if (i.children === o.children && !Dt.current) {
              t = Zn(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null; ) {
              var l = i.dependencies;
              if (l !== null) {
                a = i.child;
                for (var s = l.firstContext; s !== null; ) {
                  if (s.context === r) {
                    if (i.tag === 1) {
                      (s = Kn(-1, n & -n)), (s.tag = 2);
                      var c = i.updateQueue;
                      if (c !== null) {
                        c = c.shared;
                        var d = c.pending;
                        d === null
                          ? (s.next = s)
                          : ((s.next = d.next), (d.next = s)),
                          (c.pending = s);
                      }
                    }
                    (i.lanes |= n),
                      (s = i.alternate),
                      s !== null && (s.lanes |= n),
                      Xc(i.return, n, t),
                      (l.lanes |= n);
                    break;
                  }
                  s = s.next;
                }
              } else if (i.tag === 10) a = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (((a = i.return), a === null)) throw Error(L(341));
                (a.lanes |= n),
                  (l = a.alternate),
                  l !== null && (l.lanes |= n),
                  Xc(a, n, t),
                  (a = i.sibling);
              } else a = i.child;
              if (a !== null) a.return = i;
              else
                for (a = i; a !== null; ) {
                  if (a === t) {
                    a = null;
                    break;
                  }
                  if (((i = a.sibling), i !== null)) {
                    (i.return = a.return), (a = i);
                    break;
                  }
                  a = a.return;
                }
              i = a;
            }
        Ct(e, t, o.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (o = t.type),
        (r = t.pendingProps.children),
        zo(t, n),
        (o = Jt(o)),
        (r = r(o)),
        (t.flags |= 1),
        Ct(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (o = dn(r, t.pendingProps)),
        (o = dn(r.type, o)),
        dp(e, t, r, o, n)
      );
    case 15:
      return Tg(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : dn(r, o)),
        ll(e, t),
        (t.tag = 1),
        Ot(r) ? ((e = !0), kl(t)) : (e = !1),
        zo(t, n),
        og(t, r, o),
        Zc(t, r, o, n),
        tu(null, t, r, !0, e, n)
      );
    case 19:
      return Og(e, t, n);
    case 22:
      return Pg(e, t, n);
  }
  throw Error(L(156, t.tag));
};
function Xg(e, t) {
  return Eh(e, t);
}
function Cx(e, t, n, r) {
  (this.tag = e),
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
    (this.alternate = null);
}
function Xt(e, t, n, r) {
  return new Cx(e, t, n, r);
}
function Td(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function $x(e) {
  if (typeof e == "function") return Td(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Yu)) return 11;
    if (e === Qu) return 14;
  }
  return 2;
}
function Pr(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Xt(e.tag, t, e.key, e.mode)),
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
function ul(e, t, n, r, o, i) {
  var a = 2;
  if (((r = e), typeof e == "function")) Td(e) && (a = 1);
  else if (typeof e == "string") a = 5;
  else
    e: switch (e) {
      case Eo:
        return to(n.children, o, i, t);
      case Gu:
        (a = 8), (o |= 8);
        break;
      case Ec:
        return (
          (e = Xt(12, n, t, o | 2)), (e.elementType = Ec), (e.lanes = i), e
        );
      case Sc:
        return (e = Xt(13, n, t, o)), (e.elementType = Sc), (e.lanes = i), e;
      case Cc:
        return (e = Xt(19, n, t, o)), (e.elementType = Cc), (e.lanes = i), e;
      case ih:
        return is(n, o, i, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case rh:
              a = 10;
              break e;
            case oh:
              a = 9;
              break e;
            case Yu:
              a = 11;
              break e;
            case Qu:
              a = 14;
              break e;
            case vr:
              (a = 16), (r = null);
              break e;
          }
        throw Error(L(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Xt(a, n, t, o)), (t.elementType = e), (t.type = r), (t.lanes = i), t
  );
}
function to(e, t, n, r) {
  return (e = Xt(7, e, r, t)), (e.lanes = n), e;
}
function is(e, t, n, r) {
  return (
    (e = Xt(22, e, r, t)),
    (e.elementType = ih),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Zs(e, t, n) {
  return (e = Xt(6, e, null, t)), (e.lanes = n), e;
}
function Js(e, t, n) {
  return (
    (t = Xt(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function _x(e, t, n, r, o) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Ds(0)),
    (this.expirationTimes = Ds(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Ds(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = o),
    (this.mutableSourceEagerHydrationData = null);
}
function Pd(e, t, n, r, o, i, a, l, s) {
  return (
    (e = new _x(e, t, n, l, s)),
    t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
    (i = Xt(3, null, null, t)),
    (e.current = i),
    (i.stateNode = e),
    (i.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    pd(i),
    e
  );
}
function Rx(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: bo,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function qg(e) {
  if (!e) return Ar;
  e = e._reactInternals;
  e: {
    if (po(e) !== e || e.tag !== 1) throw Error(L(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Ot(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(L(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Ot(n)) return Xh(e, n, t);
  }
  return t;
}
function Zg(e, t, n, r, o, i, a, l, s) {
  return (
    (e = Pd(n, r, !0, e, o, i, a, l, s)),
    (e.context = qg(null)),
    (n = e.current),
    (r = $t()),
    (o = Tr(n)),
    (i = Kn(r, o)),
    (i.callback = t ?? null),
    Rr(n, i, o),
    (e.current.lanes = o),
    fa(e, o, r),
    Mt(e, r),
    e
  );
}
function as(e, t, n, r) {
  var o = t.current,
    i = $t(),
    a = Tr(o);
  return (
    (n = qg(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Kn(i, a)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = Rr(o, t, a)),
    e !== null && (gn(e, o, a, i), ol(e, o, a)),
    a
  );
}
function Ul(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Sp(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Nd(e, t) {
  Sp(e, t), (e = e.alternate) && Sp(e, t);
}
function kx() {
  return null;
}
var Jg =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Ad(e) {
  this._internalRoot = e;
}
ls.prototype.render = Ad.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(L(409));
  as(e, t, null, null);
};
ls.prototype.unmount = Ad.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    lo(function () {
      as(null, e, null, null);
    }),
      (t[Xn] = null);
  }
};
function ls(e) {
  this._internalRoot = e;
}
ls.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Th();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < wr.length && t !== 0 && t < wr[n].priority; n++);
    wr.splice(n, 0, e), n === 0 && Nh(e);
  }
};
function Dd(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function ss(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Cp() {}
function Tx(e, t, n, r, o) {
  if (o) {
    if (typeof r == "function") {
      var i = r;
      r = function () {
        var c = Ul(a);
        i.call(c);
      };
    }
    var a = Zg(t, r, e, 0, null, !1, !1, "", Cp);
    return (
      (e._reactRootContainer = a),
      (e[Xn] = a.current),
      Yi(e.nodeType === 8 ? e.parentNode : e),
      lo(),
      a
    );
  }
  for (; (o = e.lastChild); ) e.removeChild(o);
  if (typeof r == "function") {
    var l = r;
    r = function () {
      var c = Ul(s);
      l.call(c);
    };
  }
  var s = Pd(e, 0, !1, null, null, !1, !1, "", Cp);
  return (
    (e._reactRootContainer = s),
    (e[Xn] = s.current),
    Yi(e.nodeType === 8 ? e.parentNode : e),
    lo(function () {
      as(t, s, n, r);
    }),
    s
  );
}
function cs(e, t, n, r, o) {
  var i = n._reactRootContainer;
  if (i) {
    var a = i;
    if (typeof o == "function") {
      var l = o;
      o = function () {
        var s = Ul(a);
        l.call(s);
      };
    }
    as(t, a, e, o);
  } else a = Tx(n, t, e, o, r);
  return Ul(a);
}
Rh = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = ki(t.pendingLanes);
        n !== 0 &&
          (Zu(t, n | 1), Mt(t, Je()), !(be & 6) && ((Yo = Je() + 500), jr()));
      }
      break;
    case 13:
      lo(function () {
        var r = qn(e, 1);
        if (r !== null) {
          var o = $t();
          gn(r, e, 1, o);
        }
      }),
        Nd(e, 1);
  }
};
Ju = function (e) {
  if (e.tag === 13) {
    var t = qn(e, 134217728);
    if (t !== null) {
      var n = $t();
      gn(t, e, 134217728, n);
    }
    Nd(e, 134217728);
  }
};
kh = function (e) {
  if (e.tag === 13) {
    var t = Tr(e),
      n = qn(e, t);
    if (n !== null) {
      var r = $t();
      gn(n, e, t, r);
    }
    Nd(e, t);
  }
};
Th = function () {
  return Ce;
};
Ph = function (e, t) {
  var n = Ce;
  try {
    return (Ce = e), t();
  } finally {
    Ce = n;
  }
};
Oc = function (e, t, n) {
  switch (t) {
    case "input":
      if ((Rc(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var o = Jl(r);
            if (!o) throw Error(L(90));
            lh(r), Rc(r, o);
          }
        }
      }
      break;
    case "textarea":
      ch(e, n);
      break;
    case "select":
      (t = n.value), t != null && Mo(e, !!n.multiple, t, !1);
  }
};
gh = _d;
vh = lo;
var Px = { usingClientEntryPoint: !1, Events: [ma, _o, Jl, mh, hh, _d] },
  mi = {
    findFiberByHostInstance: Yr,
    bundleType: 0,
    version: "18.2.0",
    rendererPackageName: "react-dom",
  },
  Nx = {
    bundleType: mi.bundleType,
    version: mi.version,
    rendererPackageName: mi.rendererPackageName,
    rendererConfig: mi.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: rr.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = xh(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: mi.findFiberByHostInstance || kx,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var ja = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!ja.isDisabled && ja.supportsFiber)
    try {
      (Ql = ja.inject(Nx)), (Pn = ja);
    } catch {}
}
Vt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Px;
Vt.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Dd(t)) throw Error(L(200));
  return Rx(e, t, null, n);
};
Vt.createRoot = function (e, t) {
  if (!Dd(e)) throw Error(L(299));
  var n = !1,
    r = "",
    o = Jg;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
    (t = Pd(e, 1, !1, null, null, n, !1, r, o)),
    (e[Xn] = t.current),
    Yi(e.nodeType === 8 ? e.parentNode : e),
    new Ad(t)
  );
};
Vt.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(L(188))
      : ((e = Object.keys(e).join(",")), Error(L(268, e)));
  return (e = xh(t)), (e = e === null ? null : e.stateNode), e;
};
Vt.flushSync = function (e) {
  return lo(e);
};
Vt.hydrate = function (e, t, n) {
  if (!ss(t)) throw Error(L(200));
  return cs(null, e, t, !0, n);
};
Vt.hydrateRoot = function (e, t, n) {
  if (!Dd(e)) throw Error(L(405));
  var r = (n != null && n.hydratedSources) || null,
    o = !1,
    i = "",
    a = Jg;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (o = !0),
      n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (a = n.onRecoverableError)),
    (t = Zg(t, null, e, 1, n ?? null, o, !1, i, a)),
    (e[Xn] = t.current),
    Yi(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (o = n._getVersion),
        (o = o(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, o])
          : t.mutableSourceEagerHydrationData.push(n, o);
  return new ls(t);
};
Vt.render = function (e, t, n) {
  if (!ss(t)) throw Error(L(200));
  return cs(null, e, t, !1, n);
};
Vt.unmountComponentAtNode = function (e) {
  if (!ss(e)) throw Error(L(40));
  return e._reactRootContainer
    ? (lo(function () {
        cs(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[Xn] = null);
        });
      }),
      !0)
    : !1;
};
Vt.unstable_batchedUpdates = _d;
Vt.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!ss(n)) throw Error(L(200));
  if (e == null || e._reactInternals === void 0) throw Error(L(38));
  return cs(e, t, n, !1, r);
};
Vt.version = "18.2.0-next-9e3b772b8-20220608";
function ev() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ev);
    } catch (e) {
      console.error(e);
    }
}
ev(), (Zm.exports = Vt);
var ni = Zm.exports;
const Od = jm(ni),
  Ax = zm({ __proto__: null, default: Od }, [ni]);
var $p = ni;
(xc.createRoot = $p.createRoot), (xc.hydrateRoot = $p.hydrateRoot);
/**
 * @remix-run/router v1.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function ze() {
  return (
    (ze = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    ze.apply(this, arguments)
  );
}
var Ze;
(function (e) {
  (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(Ze || (Ze = {}));
const _p = "popstate";
function Dx(e) {
  e === void 0 && (e = {});
  function t(o, i) {
    let {
      pathname: a = "/",
      search: l = "",
      hash: s = "",
    } = Dn(o.location.hash.substr(1));
    return (
      !a.startsWith("/") && !a.startsWith(".") && (a = "/" + a),
      ra(
        "",
        { pathname: a, search: l, hash: s },
        (i.state && i.state.usr) || null,
        (i.state && i.state.key) || "default"
      )
    );
  }
  function n(o, i) {
    let a = o.document.querySelector("base"),
      l = "";
    if (a && a.getAttribute("href")) {
      let s = o.location.href,
        c = s.indexOf("#");
      l = c === -1 ? s : s.slice(0, c);
    }
    return l + "#" + (typeof i == "string" ? i : so(i));
  }
  function r(o, i) {
    Dr(
      o.pathname.charAt(0) === "/",
      "relative pathnames are not supported in hash history.push(" +
        JSON.stringify(i) +
        ")"
    );
  }
  return Mx(t, n, r, e);
}
function fe(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function Dr(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function Ox() {
  return Math.random().toString(36).substr(2, 8);
}
function Rp(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function ra(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    ze(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? Dn(t) : t,
      { state: n, key: (t && t.key) || r || Ox() }
    )
  );
}
function so(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function Dn(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf("?");
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
function Mx(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: o = document.defaultView, v5Compat: i = !1 } = r,
    a = o.history,
    l = Ze.Pop,
    s = null,
    c = d();
  c == null && ((c = 0), a.replaceState(ze({}, a.state, { idx: c }), ""));
  function d() {
    return (a.state || { idx: null }).idx;
  }
  function u() {
    l = Ze.Pop;
    let x = d(),
      m = x == null ? null : x - c;
    (c = x), s && s({ action: l, location: g.location, delta: m });
  }
  function p(x, m) {
    l = Ze.Push;
    let h = ra(g.location, x, m);
    n && n(h, x), (c = d() + 1);
    let w = Rp(h, c),
      E = g.createHref(h);
    try {
      a.pushState(w, "", E);
    } catch ($) {
      if ($ instanceof DOMException && $.name === "DataCloneError") throw $;
      o.location.assign(E);
    }
    i && s && s({ action: l, location: g.location, delta: 1 });
  }
  function y(x, m) {
    l = Ze.Replace;
    let h = ra(g.location, x, m);
    n && n(h, x), (c = d());
    let w = Rp(h, c),
      E = g.createHref(h);
    a.replaceState(w, "", E),
      i && s && s({ action: l, location: g.location, delta: 0 });
  }
  function v(x) {
    let m = o.location.origin !== "null" ? o.location.origin : o.location.href,
      h = typeof x == "string" ? x : so(x);
    return (
      fe(
        m,
        "No window.location.(origin|href) available to create URL for href: " +
          h
      ),
      new URL(h, m)
    );
  }
  let g = {
    get action() {
      return l;
    },
    get location() {
      return e(o, a);
    },
    listen(x) {
      if (s) throw new Error("A history only accepts one active listener");
      return (
        o.addEventListener(_p, u),
        (s = x),
        () => {
          o.removeEventListener(_p, u), (s = null);
        }
      );
    },
    createHref(x) {
      return t(o, x);
    },
    createURL: v,
    encodeLocation(x) {
      let m = v(x);
      return { pathname: m.pathname, search: m.search, hash: m.hash };
    },
    push: p,
    replace: y,
    go(x) {
      return a.go(x);
    },
  };
  return g;
}
var We;
(function (e) {
  (e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error");
})(We || (We = {}));
const Lx = new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children",
]);
function Ix(e) {
  return e.index === !0;
}
function pu(e, t, n, r) {
  return (
    n === void 0 && (n = []),
    r === void 0 && (r = {}),
    e.map((o, i) => {
      let a = [...n, i],
        l = typeof o.id == "string" ? o.id : a.join("-");
      if (
        (fe(
          o.index !== !0 || !o.children,
          "Cannot specify children on an index route"
        ),
        fe(
          !r[l],
          'Found a route id collision on id "' +
            l +
            `".  Route id's must be globally unique within Data Router usages`
        ),
        Ix(o))
      ) {
        let s = ze({}, o, t(o), { id: l });
        return (r[l] = s), s;
      } else {
        let s = ze({}, o, t(o), { id: l, children: void 0 });
        return (
          (r[l] = s), o.children && (s.children = pu(o.children, t, a, r)), s
        );
      }
    })
  );
}
function Do(e, t, n) {
  n === void 0 && (n = "/");
  let r = typeof t == "string" ? Dn(t) : t,
    o = Jn(r.pathname || "/", n);
  if (o == null) return null;
  let i = nv(e);
  Fx(i);
  let a = null;
  for (let l = 0; a == null && l < i.length; ++l) a = Gx(i[l], Qx(o));
  return a;
}
function tv(e, t) {
  let { route: n, pathname: r, params: o } = e;
  return { id: n.id, pathname: r, params: o, data: t[n.id], handle: n.handle };
}
function nv(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
  let o = (i, a, l) => {
    let s = {
      relativePath: l === void 0 ? i.path || "" : l,
      caseSensitive: i.caseSensitive === !0,
      childrenIndex: a,
      route: i,
    };
    s.relativePath.startsWith("/") &&
      (fe(
        s.relativePath.startsWith(r),
        'Absolute route path "' +
          s.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes."
      ),
      (s.relativePath = s.relativePath.slice(r.length)));
    let c = Gn([r, s.relativePath]),
      d = n.concat(s);
    i.children &&
      i.children.length > 0 &&
      (fe(
        i.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + c + '".')
      ),
      nv(i.children, t, d, c)),
      !(i.path == null && !i.index) &&
        t.push({ path: c, score: Wx(c, i.index), routesMeta: d });
  };
  return (
    e.forEach((i, a) => {
      var l;
      if (i.path === "" || !((l = i.path) != null && l.includes("?"))) o(i, a);
      else for (let s of rv(i.path)) o(i, a, s);
    }),
    t
  );
}
function rv(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    o = n.endsWith("?"),
    i = n.replace(/\?$/, "");
  if (r.length === 0) return o ? [i, ""] : [i];
  let a = rv(r.join("/")),
    l = [];
  return (
    l.push(...a.map((s) => (s === "" ? i : [i, s].join("/")))),
    o && l.push(...a),
    l.map((s) => (e.startsWith("/") && s === "" ? "/" : s))
  );
}
function Fx(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : Kx(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
const zx = /^:[\w-]+$/,
  jx = 3,
  Ux = 2,
  Bx = 1,
  Hx = 10,
  Vx = -2,
  kp = (e) => e === "*";
function Wx(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(kp) && (r += Vx),
    t && (r += Ux),
    n
      .filter((o) => !kp(o))
      .reduce((o, i) => o + (zx.test(i) ? jx : i === "" ? Bx : Hx), r)
  );
}
function Kx(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, o) => r === t[o])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function Gx(e, t) {
  let { routesMeta: n } = e,
    r = {},
    o = "/",
    i = [];
  for (let a = 0; a < n.length; ++a) {
    let l = n[a],
      s = a === n.length - 1,
      c = o === "/" ? t : t.slice(o.length) || "/",
      d = mu(
        { path: l.relativePath, caseSensitive: l.caseSensitive, end: s },
        c
      );
    if (!d) return null;
    Object.assign(r, d.params);
    let u = l.route;
    i.push({
      params: r,
      pathname: Gn([o, d.pathname]),
      pathnameBase: Jx(Gn([o, d.pathnameBase])),
      route: u,
    }),
      d.pathnameBase !== "/" && (o = Gn([o, d.pathnameBase]));
  }
  return i;
}
function mu(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = Yx(e.path, e.caseSensitive, e.end),
    o = t.match(n);
  if (!o) return null;
  let i = o[0],
    a = i.replace(/(.)\/+$/, "$1"),
    l = o.slice(1);
  return {
    params: r.reduce((c, d, u) => {
      let { paramName: p, isOptional: y } = d;
      if (p === "*") {
        let g = l[u] || "";
        a = i.slice(0, i.length - g.length).replace(/(.)\/+$/, "$1");
      }
      const v = l[u];
      return y && !v ? (c[p] = void 0) : (c[p] = Xx(v || "", p)), c;
    }, {}),
    pathname: i,
    pathnameBase: a,
    pattern: e,
  };
}
function Yx(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    Dr(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".')
    );
  let r = [],
    o =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (a, l, s) => (
            r.push({ paramName: l, isOptional: s != null }),
            s ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (o += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
      ? (o += "\\/*$")
      : e !== "" && e !== "/" && (o += "(?:(?=\\/|$))"),
    [new RegExp(o, t ? void 0 : "i"), r]
  );
}
function Qx(e) {
  try {
    return decodeURI(e);
  } catch (t) {
    return (
      Dr(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ").")
      ),
      e
    );
  }
}
function Xx(e, t) {
  try {
    return decodeURIComponent(e);
  } catch (n) {
    return (
      Dr(
        !1,
        'The value for the URL param "' +
          t +
          '" will not be decoded because' +
          (' the string "' +
            e +
            '" is a malformed URL segment. This is probably') +
          (" due to a bad percent encoding (" + n + ").")
      ),
      e
    );
  }
}
function Jn(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function qx(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: o = "",
  } = typeof e == "string" ? Dn(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : Zx(n, t)) : t,
    search: eb(r),
    hash: tb(o),
  };
}
function Zx(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((o) => {
      o === ".." ? n.length > 1 && n.pop() : o !== "." && n.push(o);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function ec(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function ov(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0)
  );
}
function Md(e, t) {
  let n = ov(e);
  return t
    ? n.map((r, o) => (o === e.length - 1 ? r.pathname : r.pathnameBase))
    : n.map((r) => r.pathnameBase);
}
function Ld(e, t, n, r) {
  r === void 0 && (r = !1);
  let o;
  typeof e == "string"
    ? (o = Dn(e))
    : ((o = ze({}, e)),
      fe(
        !o.pathname || !o.pathname.includes("?"),
        ec("?", "pathname", "search", o)
      ),
      fe(
        !o.pathname || !o.pathname.includes("#"),
        ec("#", "pathname", "hash", o)
      ),
      fe(!o.search || !o.search.includes("#"), ec("#", "search", "hash", o)));
  let i = e === "" || o.pathname === "",
    a = i ? "/" : o.pathname,
    l;
  if (a == null) l = n;
  else {
    let u = t.length - 1;
    if (!r && a.startsWith("..")) {
      let p = a.split("/");
      for (; p[0] === ".."; ) p.shift(), (u -= 1);
      o.pathname = p.join("/");
    }
    l = u >= 0 ? t[u] : "/";
  }
  let s = qx(o, l),
    c = a && a !== "/" && a.endsWith("/"),
    d = (i || a === ".") && n.endsWith("/");
  return !s.pathname.endsWith("/") && (c || d) && (s.pathname += "/"), s;
}
const Gn = (e) => e.join("/").replace(/\/\/+/g, "/"),
  Jx = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  eb = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  tb = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e),
  nb = function (t, n) {
    n === void 0 && (n = 302);
    let r = n;
    typeof r == "number"
      ? (r = { status: r })
      : typeof r.status > "u" && (r.status = 302);
    let o = new Headers(r.headers);
    return o.set("Location", t), new Response(null, ze({}, r, { headers: o }));
  };
class Id {
  constructor(t, n, r, o) {
    o === void 0 && (o = !1),
      (this.status = t),
      (this.statusText = n || ""),
      (this.internal = o),
      r instanceof Error
        ? ((this.data = r.toString()), (this.error = r))
        : (this.data = r);
  }
}
function iv(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const av = ["post", "put", "patch", "delete"],
  rb = new Set(av),
  ob = ["get", ...av],
  ib = new Set(ob),
  ab = new Set([301, 302, 303, 307, 308]),
  lb = new Set([307, 308]),
  tc = {
    state: "idle",
    location: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  sb = {
    state: "idle",
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  hi = { state: "unblocked", proceed: void 0, reset: void 0, location: void 0 },
  lv = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  cb = (e) => ({ hasErrorBoundary: !!e.hasErrorBoundary }),
  sv = "remix-router-transitions";
function ub(e) {
  const t = e.window ? e.window : typeof window < "u" ? window : void 0,
    n =
      typeof t < "u" &&
      typeof t.document < "u" &&
      typeof t.document.createElement < "u",
    r = !n;
  fe(
    e.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let o;
  if (e.mapRouteProperties) o = e.mapRouteProperties;
  else if (e.detectErrorBoundary) {
    let C = e.detectErrorBoundary;
    o = (R) => ({ hasErrorBoundary: C(R) });
  } else o = cb;
  let i = {},
    a = pu(e.routes, o, void 0, i),
    l,
    s = e.basename || "/",
    c = ze(
      {
        v7_fetcherPersist: !1,
        v7_normalizeFormMethod: !1,
        v7_partialHydration: !1,
        v7_prependBasename: !1,
        v7_relativeSplatPath: !1,
      },
      e.future
    ),
    d = null,
    u = new Set(),
    p = null,
    y = null,
    v = null,
    g = e.hydrationData != null,
    x = Do(a, e.history.location, s),
    m = null;
  if (x == null) {
    let C = Gt(404, { pathname: e.history.location.pathname }),
      { matches: R, route: T } = Lp(a);
    (x = R), (m = { [T.id]: C });
  }
  let h,
    w = x.some((C) => C.route.lazy),
    E = x.some((C) => C.route.loader);
  if (w) h = !1;
  else if (!E) h = !0;
  else if (c.v7_partialHydration) {
    let C = e.hydrationData ? e.hydrationData.loaderData : null,
      R = e.hydrationData ? e.hydrationData.errors : null;
    h = x.every(
      (T) =>
        T.route.loader &&
        T.route.loader.hydrate !== !0 &&
        ((C && C[T.route.id] !== void 0) || (R && R[T.route.id] !== void 0))
    );
  } else h = e.hydrationData != null;
  let $,
    b = {
      historyAction: e.history.action,
      location: e.history.location,
      matches: x,
      initialized: h,
      navigation: tc,
      restoreScrollPosition: e.hydrationData != null ? !1 : null,
      preventScrollReset: !1,
      revalidation: "idle",
      loaderData: (e.hydrationData && e.hydrationData.loaderData) || {},
      actionData: (e.hydrationData && e.hydrationData.actionData) || null,
      errors: (e.hydrationData && e.hydrationData.errors) || m,
      fetchers: new Map(),
      blockers: new Map(),
    },
    _ = Ze.Pop,
    k = !1,
    O,
    M = !1,
    K = new Map(),
    z = null,
    ne = !1,
    W = !1,
    J = [],
    ie = [],
    Q = new Map(),
    D = 0,
    P = -1,
    I = new Map(),
    j = new Set(),
    H = new Map(),
    se = new Map(),
    Z = new Set(),
    ye = new Map(),
    te = new Map(),
    Oe = !1;
  function ut() {
    if (
      ((d = e.history.listen((C) => {
        let { action: R, location: T, delta: B } = C;
        if (Oe) {
          Oe = !1;
          return;
        }
        Dr(
          te.size === 0 || B != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let X = Le({
          currentLocation: b.location,
          nextLocation: T,
          historyAction: R,
        });
        if (X && B != null) {
          (Oe = !0),
            e.history.go(B * -1),
            ee(X, {
              state: "blocked",
              location: T,
              proceed() {
                ee(X, {
                  state: "proceeding",
                  proceed: void 0,
                  reset: void 0,
                  location: T,
                }),
                  e.history.go(B);
              },
              reset() {
                let ce = new Map(b.blockers);
                ce.set(X, hi), ke({ blockers: ce });
              },
            });
          return;
        }
        return we(R, T);
      })),
      n)
    ) {
      bb(t, K);
      let C = () => Eb(t, K);
      t.addEventListener("pagehide", C),
        (z = () => t.removeEventListener("pagehide", C));
    }
    return b.initialized || we(Ze.Pop, b.location, { initialHydration: !0 }), $;
  }
  function Me() {
    d && d(),
      z && z(),
      u.clear(),
      O && O.abort(),
      b.fetchers.forEach((C, R) => Ln(R)),
      b.blockers.forEach((C, R) => Fn(R));
  }
  function gt(C) {
    return u.add(C), () => u.delete(C);
  }
  function ke(C, R) {
    R === void 0 && (R = {}), (b = ze({}, b, C));
    let T = [],
      B = [];
    c.v7_fetcherPersist &&
      b.fetchers.forEach((X, ce) => {
        X.state === "idle" && (Z.has(ce) ? B.push(ce) : T.push(ce));
      }),
      [...u].forEach((X) =>
        X(b, {
          deletedFetchers: B,
          unstable_viewTransitionOpts: R.viewTransitionOpts,
          unstable_flushSync: R.flushSync === !0,
        })
      ),
      c.v7_fetcherPersist &&
        (T.forEach((X) => b.fetchers.delete(X)), B.forEach((X) => Ln(X)));
  }
  function He(C, R, T) {
    var B, X;
    let { flushSync: ce } = T === void 0 ? {} : T,
      oe =
        b.actionData != null &&
        b.navigation.formMethod != null &&
        pn(b.navigation.formMethod) &&
        b.navigation.state === "loading" &&
        ((B = C.state) == null ? void 0 : B._isRedirect) !== !0,
      re;
    R.actionData
      ? Object.keys(R.actionData).length > 0
        ? (re = R.actionData)
        : (re = null)
      : oe
      ? (re = b.actionData)
      : (re = null);
    let q = R.loaderData
        ? Mp(b.loaderData, R.loaderData, R.matches || [], R.errors)
        : b.loaderData,
      de = b.blockers;
    de.size > 0 && ((de = new Map(de)), de.forEach(($e, et) => de.set(et, hi)));
    let Qe =
      k === !0 ||
      (b.navigation.formMethod != null &&
        pn(b.navigation.formMethod) &&
        ((X = C.state) == null ? void 0 : X._isRedirect) !== !0);
    l && ((a = l), (l = void 0)),
      ne ||
        _ === Ze.Pop ||
        (_ === Ze.Push
          ? e.history.push(C, C.state)
          : _ === Ze.Replace && e.history.replace(C, C.state));
    let ae;
    if (_ === Ze.Pop) {
      let $e = K.get(b.location.pathname);
      $e && $e.has(C.pathname)
        ? (ae = { currentLocation: b.location, nextLocation: C })
        : K.has(C.pathname) &&
          (ae = { currentLocation: C, nextLocation: b.location });
    } else if (M) {
      let $e = K.get(b.location.pathname);
      $e
        ? $e.add(C.pathname)
        : (($e = new Set([C.pathname])), K.set(b.location.pathname, $e)),
        (ae = { currentLocation: b.location, nextLocation: C });
    }
    ke(
      ze({}, R, {
        actionData: re,
        loaderData: q,
        historyAction: _,
        location: C,
        initialized: !0,
        navigation: tc,
        revalidation: "idle",
        restoreScrollPosition: ln(C, R.matches || b.matches),
        preventScrollReset: Qe,
        blockers: de,
      }),
      { viewTransitionOpts: ae, flushSync: ce === !0 }
    ),
      (_ = Ze.Pop),
      (k = !1),
      (M = !1),
      (ne = !1),
      (W = !1),
      (J = []),
      (ie = []);
  }
  async function bn(C, R) {
    if (typeof C == "number") {
      e.history.go(C);
      return;
    }
    let T = hu(
        b.location,
        b.matches,
        s,
        c.v7_prependBasename,
        C,
        c.v7_relativeSplatPath,
        R == null ? void 0 : R.fromRouteId,
        R == null ? void 0 : R.relative
      ),
      {
        path: B,
        submission: X,
        error: ce,
      } = Tp(c.v7_normalizeFormMethod, !1, T, R),
      oe = b.location,
      re = ra(b.location, B, R && R.state);
    re = ze({}, re, e.history.encodeLocation(re));
    let q = R && R.replace != null ? R.replace : void 0,
      de = Ze.Push;
    q === !0
      ? (de = Ze.Replace)
      : q === !1 ||
        (X != null &&
          pn(X.formMethod) &&
          X.formAction === b.location.pathname + b.location.search &&
          (de = Ze.Replace));
    let Qe =
        R && "preventScrollReset" in R ? R.preventScrollReset === !0 : void 0,
      ae = (R && R.unstable_flushSync) === !0,
      $e = Le({ currentLocation: oe, nextLocation: re, historyAction: de });
    if ($e) {
      ee($e, {
        state: "blocked",
        location: re,
        proceed() {
          ee($e, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: re,
          }),
            bn(C, R);
        },
        reset() {
          let et = new Map(b.blockers);
          et.set($e, hi), ke({ blockers: et });
        },
      });
      return;
    }
    return await we(de, re, {
      submission: X,
      pendingError: ce,
      preventScrollReset: Qe,
      replace: R && R.replace,
      enableViewTransition: R && R.unstable_viewTransition,
      flushSync: ae,
    });
  }
  function Mn() {
    if (
      (ft(),
      ke({ revalidation: "loading" }),
      b.navigation.state !== "submitting")
    ) {
      if (b.navigation.state === "idle") {
        we(b.historyAction, b.location, { startUninterruptedRevalidation: !0 });
        return;
      }
      we(_ || b.historyAction, b.navigation.location, {
        overrideNavigation: b.navigation,
      });
    }
  }
  async function we(C, R, T) {
    O && O.abort(),
      (O = null),
      (_ = C),
      (ne = (T && T.startUninterruptedRevalidation) === !0),
      Te(b.location, b.matches),
      (k = (T && T.preventScrollReset) === !0),
      (M = (T && T.enableViewTransition) === !0);
    let B = l || a,
      X = T && T.overrideNavigation,
      ce = Do(B, R, s),
      oe = (T && T.flushSync) === !0;
    if (!ce) {
      let et = Gt(404, { pathname: R.pathname }),
        { matches: Ve, route: Xe } = Lp(B);
      Se(),
        He(
          R,
          { matches: Ve, loaderData: {}, errors: { [Xe.id]: et } },
          { flushSync: oe }
        );
      return;
    }
    if (
      b.initialized &&
      !W &&
      hb(b.location, R) &&
      !(T && T.submission && pn(T.submission.formMethod))
    ) {
      He(R, { matches: ce }, { flushSync: oe });
      return;
    }
    O = new AbortController();
    let re = vi(e.history, R, O.signal, T && T.submission),
      q,
      de;
    if (T && T.pendingError) de = { [zi(ce).route.id]: T.pendingError };
    else if (T && T.submission && pn(T.submission.formMethod)) {
      let et = await vt(re, R, T.submission, ce, {
        replace: T.replace,
        flushSync: oe,
      });
      if (et.shortCircuited) return;
      (q = et.pendingActionData),
        (de = et.pendingActionError),
        (X = nc(R, T.submission)),
        (oe = !1),
        (re = new Request(re.url, { signal: re.signal }));
    }
    let {
      shortCircuited: Qe,
      loaderData: ae,
      errors: $e,
    } = await En(
      re,
      R,
      ce,
      X,
      T && T.submission,
      T && T.fetcherSubmission,
      T && T.replace,
      T && T.initialHydration === !0,
      oe,
      q,
      de
    );
    Qe ||
      ((O = null),
      He(
        R,
        ze({ matches: ce }, q ? { actionData: q } : {}, {
          loaderData: ae,
          errors: $e,
        })
      ));
  }
  async function vt(C, R, T, B, X) {
    X === void 0 && (X = {}), ft();
    let ce = wb(R, T);
    ke({ navigation: ce }, { flushSync: X.flushSync === !0 });
    let oe,
      re = vu(B, R);
    if (!re.route.action && !re.route.lazy)
      oe = {
        type: We.error,
        error: Gt(405, {
          method: C.method,
          pathname: R.pathname,
          routeId: re.route.id,
        }),
      };
    else if (
      ((oe = await gi("action", C, re, B, i, o, s, c.v7_relativeSplatPath)),
      C.signal.aborted)
    )
      return { shortCircuited: !0 };
    if (Zr(oe)) {
      let q;
      return (
        X && X.replace != null
          ? (q = X.replace)
          : (q = oe.location === b.location.pathname + b.location.search),
        await dt(b, oe, { submission: T, replace: q }),
        { shortCircuited: !0 }
      );
    }
    if (Oo(oe)) {
      let q = zi(B, re.route.id);
      return (
        (X && X.replace) !== !0 && (_ = Ze.Push),
        {
          pendingActionData: {},
          pendingActionError: { [q.route.id]: oe.error },
        }
      );
    }
    if (qr(oe)) throw Gt(400, { type: "defer-action" });
    return { pendingActionData: { [re.route.id]: oe.data } };
  }
  async function En(C, R, T, B, X, ce, oe, re, q, de, Qe) {
    let ae = B || nc(R, X),
      $e = X || ce || zp(ae),
      et = l || a,
      [Ve, Xe] = Pp(
        e.history,
        b,
        T,
        $e,
        R,
        c.v7_partialHydration && re === !0,
        W,
        J,
        ie,
        Z,
        H,
        j,
        et,
        s,
        de,
        Qe
      );
    if (
      (Se(
        (pe) =>
          !(T && T.some((ge) => ge.route.id === pe)) ||
          (Ve && Ve.some((ge) => ge.route.id === pe))
      ),
      (P = ++D),
      Ve.length === 0 && Xe.length === 0)
    ) {
      let pe = an();
      return (
        He(
          R,
          ze(
            { matches: T, loaderData: {}, errors: Qe || null },
            de ? { actionData: de } : {},
            pe ? { fetchers: new Map(b.fetchers) } : {}
          ),
          { flushSync: q }
        ),
        { shortCircuited: !0 }
      );
    }
    if (!ne && (!c.v7_partialHydration || !re)) {
      Xe.forEach((ge) => {
        let qe = b.fetchers.get(ge.key),
          rt = yi(void 0, qe ? qe.data : void 0);
        b.fetchers.set(ge.key, rt);
      });
      let pe = de || b.actionData;
      ke(
        ze(
          { navigation: ae },
          pe
            ? Object.keys(pe).length === 0
              ? { actionData: null }
              : { actionData: pe }
            : {},
          Xe.length > 0 ? { fetchers: new Map(b.fetchers) } : {}
        ),
        { flushSync: q }
      );
    }
    Xe.forEach((pe) => {
      Q.has(pe.key) && Tt(pe.key),
        pe.controller && Q.set(pe.key, pe.controller);
    });
    let zn = () => Xe.forEach((pe) => Tt(pe.key));
    O && O.signal.addEventListener("abort", zn);
    let {
      results: go,
      loaderResults: jn,
      fetcherResults: Cn,
    } = await Kt(b.matches, T, Ve, Xe, C);
    if (C.signal.aborted) return { shortCircuited: !0 };
    O && O.signal.removeEventListener("abort", zn),
      Xe.forEach((pe) => Q.delete(pe.key));
    let S = Ip(go);
    if (S) {
      if (S.idx >= Ve.length) {
        let pe = Xe[S.idx - Ve.length].key;
        j.add(pe);
      }
      return await dt(b, S.result, { replace: oe }), { shortCircuited: !0 };
    }
    let { loaderData: G, errors: U } = Op(b, T, Ve, jn, Qe, Xe, Cn, ye);
    ye.forEach((pe, ge) => {
      pe.subscribe((qe) => {
        (qe || pe.done) && ye.delete(ge);
      });
    });
    let xe = an(),
      Ie = Ye(P),
      _e = xe || Ie || Xe.length > 0;
    return ze(
      { loaderData: G, errors: U },
      _e ? { fetchers: new Map(b.fetchers) } : {}
    );
  }
  function lr(C, R, T, B) {
    if (r)
      throw new Error(
        "router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback."
      );
    Q.has(C) && Tt(C);
    let X = (B && B.unstable_flushSync) === !0,
      ce = l || a,
      oe = hu(
        b.location,
        b.matches,
        s,
        c.v7_prependBasename,
        T,
        c.v7_relativeSplatPath,
        R,
        B == null ? void 0 : B.relative
      ),
      re = Do(ce, oe, s);
    if (!re) {
      Et(C, R, Gt(404, { pathname: oe }), { flushSync: X });
      return;
    }
    let {
      path: q,
      submission: de,
      error: Qe,
    } = Tp(c.v7_normalizeFormMethod, !0, oe, B);
    if (Qe) {
      Et(C, R, Qe, { flushSync: X });
      return;
    }
    let ae = vu(re, q);
    if (((k = (B && B.preventScrollReset) === !0), de && pn(de.formMethod))) {
      on(C, R, q, ae, re, X, de);
      return;
    }
    H.set(C, { routeId: R, path: q }), Vr(C, R, q, ae, re, X, de);
  }
  async function on(C, R, T, B, X, ce, oe) {
    if ((ft(), H.delete(C), !B.route.action && !B.route.lazy)) {
      let ge = Gt(405, { method: oe.formMethod, pathname: T, routeId: R });
      Et(C, R, ge, { flushSync: ce });
      return;
    }
    let re = b.fetchers.get(C);
    at(C, xb(oe, re), { flushSync: ce });
    let q = new AbortController(),
      de = vi(e.history, T, q.signal, oe);
    Q.set(C, q);
    let Qe = D,
      ae = await gi("action", de, B, X, i, o, s, c.v7_relativeSplatPath);
    if (de.signal.aborted) {
      Q.get(C) === q && Q.delete(C);
      return;
    }
    if (c.v7_fetcherPersist && Z.has(C)) {
      if (Zr(ae) || Oo(ae)) {
        at(C, hr(void 0));
        return;
      }
    } else {
      if (Zr(ae))
        if ((Q.delete(C), P > Qe)) {
          at(C, hr(void 0));
          return;
        } else
          return j.add(C), at(C, yi(oe)), dt(b, ae, { fetcherSubmission: oe });
      if (Oo(ae)) {
        Et(C, R, ae.error);
        return;
      }
    }
    if (qr(ae)) throw Gt(400, { type: "defer-action" });
    let $e = b.navigation.location || b.location,
      et = vi(e.history, $e, q.signal),
      Ve = l || a,
      Xe =
        b.navigation.state !== "idle"
          ? Do(Ve, b.navigation.location, s)
          : b.matches;
    fe(Xe, "Didn't find any matches after fetcher action");
    let zn = ++D;
    I.set(C, zn);
    let go = yi(oe, ae.data);
    b.fetchers.set(C, go);
    let [jn, Cn] = Pp(
      e.history,
      b,
      Xe,
      oe,
      $e,
      !1,
      W,
      J,
      ie,
      Z,
      H,
      j,
      Ve,
      s,
      { [B.route.id]: ae.data },
      void 0
    );
    Cn.filter((ge) => ge.key !== C).forEach((ge) => {
      let qe = ge.key,
        rt = b.fetchers.get(qe),
        Sa = yi(void 0, rt ? rt.data : void 0);
      b.fetchers.set(qe, Sa),
        Q.has(qe) && Tt(qe),
        ge.controller && Q.set(qe, ge.controller);
    }),
      ke({ fetchers: new Map(b.fetchers) });
    let S = () => Cn.forEach((ge) => Tt(ge.key));
    q.signal.addEventListener("abort", S);
    let {
      results: G,
      loaderResults: U,
      fetcherResults: xe,
    } = await Kt(b.matches, Xe, jn, Cn, et);
    if (q.signal.aborted) return;
    q.signal.removeEventListener("abort", S),
      I.delete(C),
      Q.delete(C),
      Cn.forEach((ge) => Q.delete(ge.key));
    let Ie = Ip(G);
    if (Ie) {
      if (Ie.idx >= jn.length) {
        let ge = Cn[Ie.idx - jn.length].key;
        j.add(ge);
      }
      return dt(b, Ie.result);
    }
    let { loaderData: _e, errors: pe } = Op(
      b,
      b.matches,
      jn,
      U,
      void 0,
      Cn,
      xe,
      ye
    );
    if (b.fetchers.has(C)) {
      let ge = hr(ae.data);
      b.fetchers.set(C, ge);
    }
    Ye(zn),
      b.navigation.state === "loading" && zn > P
        ? (fe(_, "Expected pending action"),
          O && O.abort(),
          He(b.navigation.location, {
            matches: Xe,
            loaderData: _e,
            errors: pe,
            fetchers: new Map(b.fetchers),
          }))
        : (ke({
            errors: pe,
            loaderData: Mp(b.loaderData, _e, Xe, pe),
            fetchers: new Map(b.fetchers),
          }),
          (W = !1));
  }
  async function Vr(C, R, T, B, X, ce, oe) {
    let re = b.fetchers.get(C);
    at(C, yi(oe, re ? re.data : void 0), { flushSync: ce });
    let q = new AbortController(),
      de = vi(e.history, T, q.signal);
    Q.set(C, q);
    let Qe = D,
      ae = await gi("loader", de, B, X, i, o, s, c.v7_relativeSplatPath);
    if (
      (qr(ae) && (ae = (await dv(ae, de.signal, !0)) || ae),
      Q.get(C) === q && Q.delete(C),
      !de.signal.aborted)
    ) {
      if (Z.has(C)) {
        at(C, hr(void 0));
        return;
      }
      if (Zr(ae))
        if (P > Qe) {
          at(C, hr(void 0));
          return;
        } else {
          j.add(C), await dt(b, ae);
          return;
        }
      if (Oo(ae)) {
        Et(C, R, ae.error);
        return;
      }
      fe(!qr(ae), "Unhandled fetcher deferred data"), at(C, hr(ae.data));
    }
  }
  async function dt(C, R, T) {
    let {
      submission: B,
      fetcherSubmission: X,
      replace: ce,
    } = T === void 0 ? {} : T;
    R.revalidate && (W = !0);
    let oe = ra(C.location, R.location, { _isRedirect: !0 });
    if ((fe(oe, "Expected a location on the redirect navigation"), n)) {
      let $e = !1;
      if (R.reloadDocument) $e = !0;
      else if (lv.test(R.location)) {
        const et = e.history.createURL(R.location);
        $e = et.origin !== t.location.origin || Jn(et.pathname, s) == null;
      }
      if ($e) {
        ce ? t.location.replace(R.location) : t.location.assign(R.location);
        return;
      }
    }
    O = null;
    let re = ce === !0 ? Ze.Replace : Ze.Push,
      { formMethod: q, formAction: de, formEncType: Qe } = C.navigation;
    !B && !X && q && de && Qe && (B = zp(C.navigation));
    let ae = B || X;
    if (lb.has(R.status) && ae && pn(ae.formMethod))
      await we(re, oe, {
        submission: ze({}, ae, { formAction: R.location }),
        preventScrollReset: k,
      });
    else {
      let $e = nc(oe, B);
      await we(re, oe, {
        overrideNavigation: $e,
        fetcherSubmission: X,
        preventScrollReset: k,
      });
    }
  }
  async function Kt(C, R, T, B, X) {
    let ce = await Promise.all([
        ...T.map((q) => gi("loader", X, q, R, i, o, s, c.v7_relativeSplatPath)),
        ...B.map((q) =>
          q.matches && q.match && q.controller
            ? gi(
                "loader",
                vi(e.history, q.path, q.controller.signal),
                q.match,
                q.matches,
                i,
                o,
                s,
                c.v7_relativeSplatPath
              )
            : { type: We.error, error: Gt(404, { pathname: q.path }) }
        ),
      ]),
      oe = ce.slice(0, T.length),
      re = ce.slice(T.length);
    return (
      await Promise.all([
        Fp(
          C,
          T,
          oe,
          oe.map(() => X.signal),
          !1,
          b.loaderData
        ),
        Fp(
          C,
          B.map((q) => q.match),
          re,
          B.map((q) => (q.controller ? q.controller.signal : null)),
          !0
        ),
      ]),
      { results: ce, loaderResults: oe, fetcherResults: re }
    );
  }
  function ft() {
    (W = !0),
      J.push(...Se()),
      H.forEach((C, R) => {
        Q.has(R) && (ie.push(R), Tt(R));
      });
  }
  function at(C, R, T) {
    T === void 0 && (T = {}),
      b.fetchers.set(C, R),
      ke(
        { fetchers: new Map(b.fetchers) },
        { flushSync: (T && T.flushSync) === !0 }
      );
  }
  function Et(C, R, T, B) {
    B === void 0 && (B = {});
    let X = zi(b.matches, R);
    Ln(C),
      ke(
        { errors: { [X.route.id]: T }, fetchers: new Map(b.fetchers) },
        { flushSync: (B && B.flushSync) === !0 }
      );
  }
  function sr(C) {
    return (
      c.v7_fetcherPersist &&
        (se.set(C, (se.get(C) || 0) + 1), Z.has(C) && Z.delete(C)),
      b.fetchers.get(C) || sb
    );
  }
  function Ln(C) {
    let R = b.fetchers.get(C);
    Q.has(C) && !(R && R.state === "loading" && I.has(C)) && Tt(C),
      H.delete(C),
      I.delete(C),
      j.delete(C),
      Z.delete(C),
      b.fetchers.delete(C);
  }
  function cr(C) {
    if (c.v7_fetcherPersist) {
      let R = (se.get(C) || 0) - 1;
      R <= 0 ? (se.delete(C), Z.add(C)) : se.set(C, R);
    } else Ln(C);
    ke({ fetchers: new Map(b.fetchers) });
  }
  function Tt(C) {
    let R = Q.get(C);
    fe(R, "Expected fetch controller: " + C), R.abort(), Q.delete(C);
  }
  function In(C) {
    for (let R of C) {
      let T = sr(R),
        B = hr(T.data);
      b.fetchers.set(R, B);
    }
  }
  function an() {
    let C = [],
      R = !1;
    for (let T of j) {
      let B = b.fetchers.get(T);
      fe(B, "Expected fetcher: " + T),
        B.state === "loading" && (j.delete(T), C.push(T), (R = !0));
    }
    return In(C), R;
  }
  function Ye(C) {
    let R = [];
    for (let [T, B] of I)
      if (B < C) {
        let X = b.fetchers.get(T);
        fe(X, "Expected fetcher: " + T),
          X.state === "loading" && (Tt(T), I.delete(T), R.push(T));
      }
    return In(R), R.length > 0;
  }
  function Sn(C, R) {
    let T = b.blockers.get(C) || hi;
    return te.get(C) !== R && te.set(C, R), T;
  }
  function Fn(C) {
    b.blockers.delete(C), te.delete(C);
  }
  function ee(C, R) {
    let T = b.blockers.get(C) || hi;
    fe(
      (T.state === "unblocked" && R.state === "blocked") ||
        (T.state === "blocked" && R.state === "blocked") ||
        (T.state === "blocked" && R.state === "proceeding") ||
        (T.state === "blocked" && R.state === "unblocked") ||
        (T.state === "proceeding" && R.state === "unblocked"),
      "Invalid blocker state transition: " + T.state + " -> " + R.state
    );
    let B = new Map(b.blockers);
    B.set(C, R), ke({ blockers: B });
  }
  function Le(C) {
    let { currentLocation: R, nextLocation: T, historyAction: B } = C;
    if (te.size === 0) return;
    te.size > 1 && Dr(!1, "A router only supports one blocker at a time");
    let X = Array.from(te.entries()),
      [ce, oe] = X[X.length - 1],
      re = b.blockers.get(ce);
    if (
      !(re && re.state === "proceeding") &&
      oe({ currentLocation: R, nextLocation: T, historyAction: B })
    )
      return ce;
  }
  function Se(C) {
    let R = [];
    return (
      ye.forEach((T, B) => {
        (!C || C(B)) && (T.cancel(), R.push(B), ye.delete(B));
      }),
      R
    );
  }
  function Pt(C, R, T) {
    if (((p = C), (v = R), (y = T || null), !g && b.navigation === tc)) {
      g = !0;
      let B = ln(b.location, b.matches);
      B != null && ke({ restoreScrollPosition: B });
    }
    return () => {
      (p = null), (v = null), (y = null);
    };
  }
  function St(C, R) {
    return (
      (y &&
        y(
          C,
          R.map((B) => tv(B, b.loaderData))
        )) ||
      C.key
    );
  }
  function Te(C, R) {
    if (p && v) {
      let T = St(C, R);
      p[T] = v();
    }
  }
  function ln(C, R) {
    if (p) {
      let T = St(C, R),
        B = p[T];
      if (typeof B == "number") return B;
    }
    return null;
  }
  function Rs(C) {
    (i = {}), (l = pu(C, o, void 0, i));
  }
  return (
    ($ = {
      get basename() {
        return s;
      },
      get future() {
        return c;
      },
      get state() {
        return b;
      },
      get routes() {
        return a;
      },
      get window() {
        return t;
      },
      initialize: ut,
      subscribe: gt,
      enableScrollRestoration: Pt,
      navigate: bn,
      fetch: lr,
      revalidate: Mn,
      createHref: (C) => e.history.createHref(C),
      encodeLocation: (C) => e.history.encodeLocation(C),
      getFetcher: sr,
      deleteFetcher: cr,
      dispose: Me,
      getBlocker: Sn,
      deleteBlocker: Fn,
      _internalFetchControllers: Q,
      _internalActiveDeferreds: ye,
      _internalSetRoutes: Rs,
    }),
    $
  );
}
function db(e) {
  return (
    e != null &&
    (("formData" in e && e.formData != null) ||
      ("body" in e && e.body !== void 0))
  );
}
function hu(e, t, n, r, o, i, a, l) {
  let s, c;
  if (a) {
    s = [];
    for (let u of t)
      if ((s.push(u), u.route.id === a)) {
        c = u;
        break;
      }
  } else (s = t), (c = t[t.length - 1]);
  let d = Ld(o || ".", Md(s, i), Jn(e.pathname, n) || e.pathname, l === "path");
  return (
    o == null && ((d.search = e.search), (d.hash = e.hash)),
    (o == null || o === "" || o === ".") &&
      c &&
      c.route.index &&
      !Fd(d.search) &&
      (d.search = d.search ? d.search.replace(/^\?/, "?index&") : "?index"),
    r &&
      n !== "/" &&
      (d.pathname = d.pathname === "/" ? n : Gn([n, d.pathname])),
    so(d)
  );
}
function Tp(e, t, n, r) {
  if (!r || !db(r)) return { path: n };
  if (r.formMethod && !yb(r.formMethod))
    return { path: n, error: Gt(405, { method: r.formMethod }) };
  let o = () => ({ path: n, error: Gt(400, { type: "invalid-body" }) }),
    i = r.formMethod || "get",
    a = e ? i.toUpperCase() : i.toLowerCase(),
    l = uv(n);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!pn(a)) return o();
      let p =
        typeof r.body == "string"
          ? r.body
          : r.body instanceof FormData || r.body instanceof URLSearchParams
          ? Array.from(r.body.entries()).reduce((y, v) => {
              let [g, x] = v;
              return (
                "" +
                y +
                g +
                "=" +
                x +
                `
`
              );
            }, "")
          : String(r.body);
      return {
        path: n,
        submission: {
          formMethod: a,
          formAction: l,
          formEncType: r.formEncType,
          formData: void 0,
          json: void 0,
          text: p,
        },
      };
    } else if (r.formEncType === "application/json") {
      if (!pn(a)) return o();
      try {
        let p = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
        return {
          path: n,
          submission: {
            formMethod: a,
            formAction: l,
            formEncType: r.formEncType,
            formData: void 0,
            json: p,
            text: void 0,
          },
        };
      } catch {
        return o();
      }
    }
  }
  fe(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let s, c;
  if (r.formData) (s = gu(r.formData)), (c = r.formData);
  else if (r.body instanceof FormData) (s = gu(r.body)), (c = r.body);
  else if (r.body instanceof URLSearchParams) (s = r.body), (c = Dp(s));
  else if (r.body == null) (s = new URLSearchParams()), (c = new FormData());
  else
    try {
      (s = new URLSearchParams(r.body)), (c = Dp(s));
    } catch {
      return o();
    }
  let d = {
    formMethod: a,
    formAction: l,
    formEncType: (r && r.formEncType) || "application/x-www-form-urlencoded",
    formData: c,
    json: void 0,
    text: void 0,
  };
  if (pn(d.formMethod)) return { path: n, submission: d };
  let u = Dn(n);
  return (
    t && u.search && Fd(u.search) && s.append("index", ""),
    (u.search = "?" + s),
    { path: so(u), submission: d }
  );
}
function fb(e, t) {
  let n = e;
  if (t) {
    let r = e.findIndex((o) => o.route.id === t);
    r >= 0 && (n = e.slice(0, r));
  }
  return n;
}
function Pp(e, t, n, r, o, i, a, l, s, c, d, u, p, y, v, g) {
  let x = g ? Object.values(g)[0] : v ? Object.values(v)[0] : void 0,
    m = e.createURL(t.location),
    h = e.createURL(o),
    w = g ? Object.keys(g)[0] : void 0,
    $ = fb(n, w).filter((_, k) => {
      let { route: O } = _;
      if (O.lazy) return !0;
      if (O.loader == null) return !1;
      if (i)
        return O.loader.hydrate
          ? !0
          : t.loaderData[O.id] === void 0 &&
              (!t.errors || t.errors[O.id] === void 0);
      if (pb(t.loaderData, t.matches[k], _) || l.some((z) => z === _.route.id))
        return !0;
      let M = t.matches[k],
        K = _;
      return Np(
        _,
        ze(
          {
            currentUrl: m,
            currentParams: M.params,
            nextUrl: h,
            nextParams: K.params,
          },
          r,
          {
            actionResult: x,
            defaultShouldRevalidate:
              a ||
              m.pathname + m.search === h.pathname + h.search ||
              m.search !== h.search ||
              cv(M, K),
          }
        )
      );
    }),
    b = [];
  return (
    d.forEach((_, k) => {
      if (i || !n.some((ne) => ne.route.id === _.routeId) || c.has(k)) return;
      let O = Do(p, _.path, y);
      if (!O) {
        b.push({
          key: k,
          routeId: _.routeId,
          path: _.path,
          matches: null,
          match: null,
          controller: null,
        });
        return;
      }
      let M = t.fetchers.get(k),
        K = vu(O, _.path),
        z = !1;
      u.has(k)
        ? (z = !1)
        : s.includes(k)
        ? (z = !0)
        : M && M.state !== "idle" && M.data === void 0
        ? (z = a)
        : (z = Np(
            K,
            ze(
              {
                currentUrl: m,
                currentParams: t.matches[t.matches.length - 1].params,
                nextUrl: h,
                nextParams: n[n.length - 1].params,
              },
              r,
              { actionResult: x, defaultShouldRevalidate: a }
            )
          )),
        z &&
          b.push({
            key: k,
            routeId: _.routeId,
            path: _.path,
            matches: O,
            match: K,
            controller: new AbortController(),
          });
    }),
    [$, b]
  );
}
function pb(e, t, n) {
  let r = !t || n.route.id !== t.route.id,
    o = e[n.route.id] === void 0;
  return r || o;
}
function cv(e, t) {
  let n = e.route.path;
  return (
    e.pathname !== t.pathname ||
    (n != null && n.endsWith("*") && e.params["*"] !== t.params["*"])
  );
}
function Np(e, t) {
  if (e.route.shouldRevalidate) {
    let n = e.route.shouldRevalidate(t);
    if (typeof n == "boolean") return n;
  }
  return t.defaultShouldRevalidate;
}
async function Ap(e, t, n) {
  if (!e.lazy) return;
  let r = await e.lazy();
  if (!e.lazy) return;
  let o = n[e.id];
  fe(o, "No route found in manifest");
  let i = {};
  for (let a in r) {
    let s = o[a] !== void 0 && a !== "hasErrorBoundary";
    Dr(
      !s,
      'Route "' +
        o.id +
        '" has a static property "' +
        a +
        '" defined but its lazy function is also returning a value for this property. ' +
        ('The lazy route property "' + a + '" will be ignored.')
    ),
      !s && !Lx.has(a) && (i[a] = r[a]);
  }
  Object.assign(o, i), Object.assign(o, ze({}, t(o), { lazy: void 0 }));
}
async function gi(e, t, n, r, o, i, a, l, s) {
  s === void 0 && (s = {});
  let c,
    d,
    u,
    p = (g) => {
      let x,
        m = new Promise((h, w) => (x = w));
      return (
        (u = () => x()),
        t.signal.addEventListener("abort", u),
        Promise.race([
          g({ request: t, params: n.params, context: s.requestContext }),
          m,
        ])
      );
    };
  try {
    let g = n.route[e];
    if (n.route.lazy)
      if (g) {
        let x,
          m = await Promise.all([
            p(g).catch((h) => {
              x = h;
            }),
            Ap(n.route, i, o),
          ]);
        if (x) throw x;
        d = m[0];
      } else if ((await Ap(n.route, i, o), (g = n.route[e]), g)) d = await p(g);
      else if (e === "action") {
        let x = new URL(t.url),
          m = x.pathname + x.search;
        throw Gt(405, { method: t.method, pathname: m, routeId: n.route.id });
      } else return { type: We.data, data: void 0 };
    else if (g) d = await p(g);
    else {
      let x = new URL(t.url),
        m = x.pathname + x.search;
      throw Gt(404, { pathname: m });
    }
    fe(
      d !== void 0,
      "You defined " +
        (e === "action" ? "an action" : "a loader") +
        " for route " +
        ('"' +
          n.route.id +
          "\" but didn't return anything from your `" +
          e +
          "` ") +
        "function. Please return a value or `null`."
    );
  } catch (g) {
    (c = We.error), (d = g);
  } finally {
    u && t.signal.removeEventListener("abort", u);
  }
  if (vb(d)) {
    let g = d.status;
    if (ab.has(g)) {
      let m = d.headers.get("Location");
      if (
        (fe(
          m,
          "Redirects returned/thrown from loaders/actions must have a Location header"
        ),
        !lv.test(m))
      )
        m = hu(new URL(t.url), r.slice(0, r.indexOf(n) + 1), a, !0, m, l);
      else if (!s.isStaticRequest) {
        let h = new URL(t.url),
          w = m.startsWith("//") ? new URL(h.protocol + m) : new URL(m),
          E = Jn(w.pathname, a) != null;
        w.origin === h.origin && E && (m = w.pathname + w.search + w.hash);
      }
      if (s.isStaticRequest) throw (d.headers.set("Location", m), d);
      return {
        type: We.redirect,
        status: g,
        location: m,
        revalidate: d.headers.get("X-Remix-Revalidate") !== null,
        reloadDocument: d.headers.get("X-Remix-Reload-Document") !== null,
      };
    }
    if (s.isRouteRequest)
      throw { type: c === We.error ? We.error : We.data, response: d };
    let x;
    try {
      let m = d.headers.get("Content-Type");
      m && /\bapplication\/json\b/.test(m)
        ? d.body == null
          ? (x = null)
          : (x = await d.json())
        : (x = await d.text());
    } catch (m) {
      return { type: We.error, error: m };
    }
    return c === We.error
      ? { type: c, error: new Id(g, d.statusText, x), headers: d.headers }
      : { type: We.data, data: x, statusCode: d.status, headers: d.headers };
  }
  if (c === We.error) return { type: c, error: d };
  if (gb(d)) {
    var y, v;
    return {
      type: We.deferred,
      deferredData: d,
      statusCode: (y = d.init) == null ? void 0 : y.status,
      headers:
        ((v = d.init) == null ? void 0 : v.headers) &&
        new Headers(d.init.headers),
    };
  }
  return { type: We.data, data: d };
}
function vi(e, t, n, r) {
  let o = e.createURL(uv(t)).toString(),
    i = { signal: n };
  if (r && pn(r.formMethod)) {
    let { formMethod: a, formEncType: l } = r;
    (i.method = a.toUpperCase()),
      l === "application/json"
        ? ((i.headers = new Headers({ "Content-Type": l })),
          (i.body = JSON.stringify(r.json)))
        : l === "text/plain"
        ? (i.body = r.text)
        : l === "application/x-www-form-urlencoded" && r.formData
        ? (i.body = gu(r.formData))
        : (i.body = r.formData);
  }
  return new Request(o, i);
}
function gu(e) {
  let t = new URLSearchParams();
  for (let [n, r] of e.entries())
    t.append(n, typeof r == "string" ? r : r.name);
  return t;
}
function Dp(e) {
  let t = new FormData();
  for (let [n, r] of e.entries()) t.append(n, r);
  return t;
}
function mb(e, t, n, r, o) {
  let i = {},
    a = null,
    l,
    s = !1,
    c = {};
  return (
    n.forEach((d, u) => {
      let p = t[u].route.id;
      if (
        (fe(!Zr(d), "Cannot handle redirect results in processLoaderData"),
        Oo(d))
      ) {
        let y = zi(e, p),
          v = d.error;
        r && ((v = Object.values(r)[0]), (r = void 0)),
          (a = a || {}),
          a[y.route.id] == null && (a[y.route.id] = v),
          (i[p] = void 0),
          s || ((s = !0), (l = iv(d.error) ? d.error.status : 500)),
          d.headers && (c[p] = d.headers);
      } else
        qr(d)
          ? (o.set(p, d.deferredData), (i[p] = d.deferredData.data))
          : (i[p] = d.data),
          d.statusCode != null &&
            d.statusCode !== 200 &&
            !s &&
            (l = d.statusCode),
          d.headers && (c[p] = d.headers);
    }),
    r && ((a = r), (i[Object.keys(r)[0]] = void 0)),
    { loaderData: i, errors: a, statusCode: l || 200, loaderHeaders: c }
  );
}
function Op(e, t, n, r, o, i, a, l) {
  let { loaderData: s, errors: c } = mb(t, n, r, o, l);
  for (let d = 0; d < i.length; d++) {
    let { key: u, match: p, controller: y } = i[d];
    fe(
      a !== void 0 && a[d] !== void 0,
      "Did not find corresponding fetcher result"
    );
    let v = a[d];
    if (!(y && y.signal.aborted))
      if (Oo(v)) {
        let g = zi(e.matches, p == null ? void 0 : p.route.id);
        (c && c[g.route.id]) || (c = ze({}, c, { [g.route.id]: v.error })),
          e.fetchers.delete(u);
      } else if (Zr(v)) fe(!1, "Unhandled fetcher revalidation redirect");
      else if (qr(v)) fe(!1, "Unhandled fetcher deferred data");
      else {
        let g = hr(v.data);
        e.fetchers.set(u, g);
      }
  }
  return { loaderData: s, errors: c };
}
function Mp(e, t, n, r) {
  let o = ze({}, t);
  for (let i of n) {
    let a = i.route.id;
    if (
      (t.hasOwnProperty(a)
        ? t[a] !== void 0 && (o[a] = t[a])
        : e[a] !== void 0 && i.route.loader && (o[a] = e[a]),
      r && r.hasOwnProperty(a))
    )
      break;
  }
  return o;
}
function zi(e, t) {
  return (
    (t ? e.slice(0, e.findIndex((r) => r.route.id === t) + 1) : [...e])
      .reverse()
      .find((r) => r.route.hasErrorBoundary === !0) || e[0]
  );
}
function Lp(e) {
  let t =
    e.length === 1
      ? e[0]
      : e.find((n) => n.index || !n.path || n.path === "/") || {
          id: "__shim-error-route__",
        };
  return {
    matches: [{ params: {}, pathname: "", pathnameBase: "", route: t }],
    route: t,
  };
}
function Gt(e, t) {
  let { pathname: n, routeId: r, method: o, type: i } = t === void 0 ? {} : t,
    a = "Unknown Server Error",
    l = "Unknown @remix-run/router error";
  return (
    e === 400
      ? ((a = "Bad Request"),
        o && n && r
          ? (l =
              "You made a " +
              o +
              ' request to "' +
              n +
              '" but ' +
              ('did not provide a `loader` for route "' + r + '", ') +
              "so there is no way to handle the request.")
          : i === "defer-action"
          ? (l = "defer() is not supported in actions")
          : i === "invalid-body" && (l = "Unable to encode submission body"))
      : e === 403
      ? ((a = "Forbidden"),
        (l = 'Route "' + r + '" does not match URL "' + n + '"'))
      : e === 404
      ? ((a = "Not Found"), (l = 'No route matches URL "' + n + '"'))
      : e === 405 &&
        ((a = "Method Not Allowed"),
        o && n && r
          ? (l =
              "You made a " +
              o.toUpperCase() +
              ' request to "' +
              n +
              '" but ' +
              ('did not provide an `action` for route "' + r + '", ') +
              "so there is no way to handle the request.")
          : o && (l = 'Invalid request method "' + o.toUpperCase() + '"')),
    new Id(e || 500, a, new Error(l), !0)
  );
}
function Ip(e) {
  for (let t = e.length - 1; t >= 0; t--) {
    let n = e[t];
    if (Zr(n)) return { result: n, idx: t };
  }
}
function uv(e) {
  let t = typeof e == "string" ? Dn(e) : e;
  return so(ze({}, t, { hash: "" }));
}
function hb(e, t) {
  return e.pathname !== t.pathname || e.search !== t.search
    ? !1
    : e.hash === ""
    ? t.hash !== ""
    : e.hash === t.hash
    ? !0
    : t.hash !== "";
}
function qr(e) {
  return e.type === We.deferred;
}
function Oo(e) {
  return e.type === We.error;
}
function Zr(e) {
  return (e && e.type) === We.redirect;
}
function gb(e) {
  let t = e;
  return (
    t &&
    typeof t == "object" &&
    typeof t.data == "object" &&
    typeof t.subscribe == "function" &&
    typeof t.cancel == "function" &&
    typeof t.resolveData == "function"
  );
}
function vb(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.headers == "object" &&
    typeof e.body < "u"
  );
}
function yb(e) {
  return ib.has(e.toLowerCase());
}
function pn(e) {
  return rb.has(e.toLowerCase());
}
async function Fp(e, t, n, r, o, i) {
  for (let a = 0; a < n.length; a++) {
    let l = n[a],
      s = t[a];
    if (!s) continue;
    let c = e.find((u) => u.route.id === s.route.id),
      d = c != null && !cv(c, s) && (i && i[s.route.id]) !== void 0;
    if (qr(l) && (o || d)) {
      let u = r[a];
      fe(u, "Expected an AbortSignal for revalidating fetcher deferred result"),
        await dv(l, u, o).then((p) => {
          p && (n[a] = p || n[a]);
        });
    }
  }
}
async function dv(e, t, n) {
  if ((n === void 0 && (n = !1), !(await e.deferredData.resolveData(t)))) {
    if (n)
      try {
        return { type: We.data, data: e.deferredData.unwrappedData };
      } catch (o) {
        return { type: We.error, error: o };
      }
    return { type: We.data, data: e.deferredData.data };
  }
}
function Fd(e) {
  return new URLSearchParams(e).getAll("index").some((t) => t === "");
}
function vu(e, t) {
  let n = typeof t == "string" ? Dn(t).search : t.search;
  if (e[e.length - 1].route.index && Fd(n || "")) return e[e.length - 1];
  let r = ov(e);
  return r[r.length - 1];
}
function zp(e) {
  let {
    formMethod: t,
    formAction: n,
    formEncType: r,
    text: o,
    formData: i,
    json: a,
  } = e;
  if (!(!t || !n || !r)) {
    if (o != null)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: void 0,
        json: void 0,
        text: o,
      };
    if (i != null)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: i,
        json: void 0,
        text: void 0,
      };
    if (a !== void 0)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: void 0,
        json: a,
        text: void 0,
      };
  }
}
function nc(e, t) {
  return t
    ? {
        state: "loading",
        location: e,
        formMethod: t.formMethod,
        formAction: t.formAction,
        formEncType: t.formEncType,
        formData: t.formData,
        json: t.json,
        text: t.text,
      }
    : {
        state: "loading",
        location: e,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
      };
}
function wb(e, t) {
  return {
    state: "submitting",
    location: e,
    formMethod: t.formMethod,
    formAction: t.formAction,
    formEncType: t.formEncType,
    formData: t.formData,
    json: t.json,
    text: t.text,
  };
}
function yi(e, t) {
  return e
    ? {
        state: "loading",
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: t,
      }
    : {
        state: "loading",
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: t,
      };
}
function xb(e, t) {
  return {
    state: "submitting",
    formMethod: e.formMethod,
    formAction: e.formAction,
    formEncType: e.formEncType,
    formData: e.formData,
    json: e.json,
    text: e.text,
    data: t ? t.data : void 0,
  };
}
function hr(e) {
  return {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: e,
  };
}
function bb(e, t) {
  try {
    let n = e.sessionStorage.getItem(sv);
    if (n) {
      let r = JSON.parse(n);
      for (let [o, i] of Object.entries(r || {}))
        i && Array.isArray(i) && t.set(o, new Set(i || []));
    }
  } catch {}
}
function Eb(e, t) {
  if (t.size > 0) {
    let n = {};
    for (let [r, o] of t) n[r] = [...o];
    try {
      e.sessionStorage.setItem(sv, JSON.stringify(n));
    } catch (r) {
      Dr(
        !1,
        "Failed to save applied view transitions in sessionStorage (" + r + ")."
      );
    }
  }
}
/**
 * React Router v6.21.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function oa() {
  return (
    (oa = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    oa.apply(this, arguments)
  );
}
const ga = f.createContext(null),
  zd = f.createContext(null),
  Ur = f.createContext(null),
  us = f.createContext(null),
  Br = f.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  fv = f.createContext(null);
function Sb(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  va() || fe(!1);
  let { basename: r, navigator: o } = f.useContext(Ur),
    { hash: i, pathname: a, search: l } = ds(e, { relative: n }),
    s = a;
  return (
    r !== "/" && (s = a === "/" ? r : Gn([r, a])),
    o.createHref({ pathname: s, search: l, hash: i })
  );
}
function va() {
  return f.useContext(us) != null;
}
function ya() {
  return va() || fe(!1), f.useContext(us).location;
}
function pv(e) {
  f.useContext(Ur).static || f.useLayoutEffect(e);
}
function Cb() {
  let { isDataRoute: e } = f.useContext(Br);
  return e ? Fb() : $b();
}
function $b() {
  va() || fe(!1);
  let e = f.useContext(ga),
    { basename: t, future: n, navigator: r } = f.useContext(Ur),
    { matches: o } = f.useContext(Br),
    { pathname: i } = ya(),
    a = JSON.stringify(Md(o, n.v7_relativeSplatPath)),
    l = f.useRef(!1);
  return (
    pv(() => {
      l.current = !0;
    }),
    f.useCallback(
      function (c, d) {
        if ((d === void 0 && (d = {}), !l.current)) return;
        if (typeof c == "number") {
          r.go(c);
          return;
        }
        let u = Ld(c, JSON.parse(a), i, d.relative === "path");
        e == null &&
          t !== "/" &&
          (u.pathname = u.pathname === "/" ? t : Gn([t, u.pathname])),
          (d.replace ? r.replace : r.push)(u, d.state, d);
      },
      [t, r, a, i, e]
    )
  );
}
const _b = f.createContext(null);
function Rb(e) {
  let t = f.useContext(Br).outlet;
  return t && f.createElement(_b.Provider, { value: e }, t);
}
function ds(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = f.useContext(Ur),
    { matches: o } = f.useContext(Br),
    { pathname: i } = ya(),
    a = JSON.stringify(Md(o, r.v7_relativeSplatPath));
  return f.useMemo(() => Ld(e, JSON.parse(a), i, n === "path"), [e, a, i, n]);
}
function kb(e, t, n, r) {
  va() || fe(!1);
  let { navigator: o } = f.useContext(Ur),
    { matches: i } = f.useContext(Br),
    a = i[i.length - 1],
    l = a ? a.params : {};
  a && a.pathname;
  let s = a ? a.pathnameBase : "/";
  a && a.route;
  let c = ya(),
    d;
  if (t) {
    var u;
    let x = typeof t == "string" ? Dn(t) : t;
    s === "/" || ((u = x.pathname) != null && u.startsWith(s)) || fe(!1),
      (d = x);
  } else d = c;
  let p = d.pathname || "/",
    y = s === "/" ? p : p.slice(s.length) || "/",
    v = Do(e, { pathname: y }),
    g = Db(
      v &&
        v.map((x) =>
          Object.assign({}, x, {
            params: Object.assign({}, l, x.params),
            pathname: Gn([
              s,
              o.encodeLocation
                ? o.encodeLocation(x.pathname).pathname
                : x.pathname,
            ]),
            pathnameBase:
              x.pathnameBase === "/"
                ? s
                : Gn([
                    s,
                    o.encodeLocation
                      ? o.encodeLocation(x.pathnameBase).pathname
                      : x.pathnameBase,
                  ]),
          })
        ),
      i,
      n,
      r
    );
  return t && g
    ? f.createElement(
        us.Provider,
        {
          value: {
            location: oa(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              d
            ),
            navigationType: Ze.Pop,
          },
        },
        g
      )
    : g;
}
function Tb() {
  let e = Ib(),
    t = iv(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
      ? e.message
      : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    o = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
  return f.createElement(
    f.Fragment,
    null,
    f.createElement("h2", null, "Unexpected Application Error!"),
    f.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? f.createElement("pre", { style: o }, n) : null,
    null
  );
}
const Pb = f.createElement(Tb, null);
class Nb extends f.Component {
  constructor(t) {
    super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== "idle" && t.revalidation === "idle")
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error(
      "React Router caught the following error during render",
      t,
      n
    );
  }
  render() {
    return this.state.error !== void 0
      ? f.createElement(
          Br.Provider,
          { value: this.props.routeContext },
          f.createElement(fv.Provider, {
            value: this.state.error,
            children: this.props.component,
          })
        )
      : this.props.children;
  }
}
function Ab(e) {
  let { routeContext: t, match: n, children: r } = e,
    o = f.useContext(ga);
  return (
    o &&
      o.static &&
      o.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (o.staticContext._deepestRenderedBoundaryId = n.route.id),
    f.createElement(Br.Provider, { value: t }, r)
  );
}
function Db(e, t, n, r) {
  var o;
  if (
    (t === void 0 && (t = []),
    n === void 0 && (n = null),
    r === void 0 && (r = null),
    e == null)
  ) {
    var i;
    if ((i = n) != null && i.errors) e = n.matches;
    else return null;
  }
  let a = e,
    l = (o = n) == null ? void 0 : o.errors;
  if (l != null) {
    let d = a.findIndex(
      (u) => u.route.id && (l == null ? void 0 : l[u.route.id])
    );
    d >= 0 || fe(!1), (a = a.slice(0, Math.min(a.length, d + 1)));
  }
  let s = !1,
    c = -1;
  if (n && r && r.v7_partialHydration)
    for (let d = 0; d < a.length; d++) {
      let u = a[d];
      if (
        ((u.route.HydrateFallback || u.route.hydrateFallbackElement) && (c = d),
        u.route.id)
      ) {
        let { loaderData: p, errors: y } = n,
          v =
            u.route.loader &&
            p[u.route.id] === void 0 &&
            (!y || y[u.route.id] === void 0);
        if (u.route.lazy || v) {
          (s = !0), c >= 0 ? (a = a.slice(0, c + 1)) : (a = [a[0]]);
          break;
        }
      }
    }
  return a.reduceRight((d, u, p) => {
    let y,
      v = !1,
      g = null,
      x = null;
    n &&
      ((y = l && u.route.id ? l[u.route.id] : void 0),
      (g = u.route.errorElement || Pb),
      s &&
        (c < 0 && p === 0
          ? (zb("route-fallback", !1), (v = !0), (x = null))
          : c === p &&
            ((v = !0), (x = u.route.hydrateFallbackElement || null))));
    let m = t.concat(a.slice(0, p + 1)),
      h = () => {
        let w;
        return (
          y
            ? (w = g)
            : v
            ? (w = x)
            : u.route.Component
            ? (w = f.createElement(u.route.Component, null))
            : u.route.element
            ? (w = u.route.element)
            : (w = d),
          f.createElement(Ab, {
            match: u,
            routeContext: { outlet: d, matches: m, isDataRoute: n != null },
            children: w,
          })
        );
      };
    return n && (u.route.ErrorBoundary || u.route.errorElement || p === 0)
      ? f.createElement(Nb, {
          location: n.location,
          revalidation: n.revalidation,
          component: g,
          error: y,
          children: h(),
          routeContext: { outlet: null, matches: m, isDataRoute: !0 },
        })
      : h();
  }, null);
}
var mv = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(mv || {}),
  ia = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseLoaderData = "useLoaderData"),
      (e.UseActionData = "useActionData"),
      (e.UseRouteError = "useRouteError"),
      (e.UseNavigation = "useNavigation"),
      (e.UseRouteLoaderData = "useRouteLoaderData"),
      (e.UseMatches = "useMatches"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      (e.UseRouteId = "useRouteId"),
      e
    );
  })(ia || {});
function Ob(e) {
  let t = f.useContext(ga);
  return t || fe(!1), t;
}
function hv(e) {
  let t = f.useContext(zd);
  return t || fe(!1), t;
}
function Mb(e) {
  let t = f.useContext(Br);
  return t || fe(!1), t;
}
function gv(e) {
  let t = Mb(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || fe(!1), n.route.id;
}
function Lb() {
  let { matches: e, loaderData: t } = hv(ia.UseMatches);
  return f.useMemo(() => e.map((n) => tv(n, t)), [e, t]);
}
function Ib() {
  var e;
  let t = f.useContext(fv),
    n = hv(ia.UseRouteError),
    r = gv(ia.UseRouteError);
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function Fb() {
  let { router: e } = Ob(mv.UseNavigateStable),
    t = gv(ia.UseNavigateStable),
    n = f.useRef(!1);
  return (
    pv(() => {
      n.current = !0;
    }),
    f.useCallback(
      function (o, i) {
        i === void 0 && (i = {}),
          n.current &&
            (typeof o == "number"
              ? e.navigate(o)
              : e.navigate(o, oa({ fromRouteId: t }, i)));
      },
      [e, t]
    )
  );
}
const jp = {};
function zb(e, t, n) {
  !t && !jp[e] && (jp[e] = !0);
}
function jb(e) {
  return Rb(e.context);
}
function Ub(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: o = Ze.Pop,
    navigator: i,
    static: a = !1,
    future: l,
  } = e;
  va() && fe(!1);
  let s = t.replace(/^\/*/, "/"),
    c = f.useMemo(
      () => ({
        basename: s,
        navigator: i,
        static: a,
        future: oa({ v7_relativeSplatPath: !1 }, l),
      }),
      [s, l, i, a]
    );
  typeof r == "string" && (r = Dn(r));
  let {
      pathname: d = "/",
      search: u = "",
      hash: p = "",
      state: y = null,
      key: v = "default",
    } = r,
    g = f.useMemo(() => {
      let x = Jn(d, s);
      return x == null
        ? null
        : {
            location: { pathname: x, search: u, hash: p, state: y, key: v },
            navigationType: o,
          };
    }, [s, d, u, p, y, v, o]);
  return g == null
    ? null
    : f.createElement(
        Ur.Provider,
        { value: c },
        f.createElement(us.Provider, { children: n, value: g })
      );
}
new Promise(() => {});
function Bb(e) {
  let t = {
    hasErrorBoundary: e.ErrorBoundary != null || e.errorElement != null,
  };
  return (
    e.Component &&
      Object.assign(t, {
        element: f.createElement(e.Component),
        Component: void 0,
      }),
    e.HydrateFallback &&
      Object.assign(t, {
        hydrateFallbackElement: f.createElement(e.HydrateFallback),
        HydrateFallback: void 0,
      }),
    e.ErrorBoundary &&
      Object.assign(t, {
        errorElement: f.createElement(e.ErrorBoundary),
        ErrorBoundary: void 0,
      }),
    t
  );
}
/**
 * React Router DOM v6.21.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Qo() {
  return (
    (Qo = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Qo.apply(this, arguments)
  );
}
function vv(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    o,
    i;
  for (i = 0; i < r.length; i++)
    (o = r[i]), !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function Hb(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Vb(e, t) {
  return e.button === 0 && (!t || t === "_self") && !Hb(e);
}
const Wb = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "unstable_viewTransition",
  ],
  Kb = [
    "aria-current",
    "caseSensitive",
    "className",
    "end",
    "style",
    "to",
    "unstable_viewTransition",
    "children",
  ];
function Gb(e, t) {
  return ub({
    basename: t == null ? void 0 : t.basename,
    future: Qo({}, t == null ? void 0 : t.future, { v7_prependBasename: !0 }),
    history: Dx({ window: t == null ? void 0 : t.window }),
    hydrationData: (t == null ? void 0 : t.hydrationData) || Yb(),
    routes: e,
    mapRouteProperties: Bb,
    window: t == null ? void 0 : t.window,
  }).initialize();
}
function Yb() {
  var e;
  let t = (e = window) == null ? void 0 : e.__staticRouterHydrationData;
  return t && t.errors && (t = Qo({}, t, { errors: Qb(t.errors) })), t;
}
function Qb(e) {
  if (!e) return null;
  let t = Object.entries(e),
    n = {};
  for (let [r, o] of t)
    if (o && o.__type === "RouteErrorResponse")
      n[r] = new Id(o.status, o.statusText, o.data, o.internal === !0);
    else if (o && o.__type === "Error") {
      if (o.__subType) {
        let i = window[o.__subType];
        if (typeof i == "function")
          try {
            let a = new i(o.message);
            (a.stack = ""), (n[r] = a);
          } catch {}
      }
      if (n[r] == null) {
        let i = new Error(o.message);
        (i.stack = ""), (n[r] = i);
      }
    } else n[r] = o;
  return n;
}
const yv = f.createContext({ isTransitioning: !1 }),
  Xb = f.createContext(new Map()),
  qb = "startTransition",
  Up = Xm[qb],
  Zb = "flushSync",
  Bp = Ax[Zb];
function Jb(e) {
  Up ? Up(e) : e();
}
function wi(e) {
  Bp ? Bp(e) : e();
}
class eE {
  constructor() {
    (this.status = "pending"),
      (this.promise = new Promise((t, n) => {
        (this.resolve = (r) => {
          this.status === "pending" && ((this.status = "resolved"), t(r));
        }),
          (this.reject = (r) => {
            this.status === "pending" && ((this.status = "rejected"), n(r));
          });
      }));
  }
}
function tE(e) {
  let { fallbackElement: t, router: n, future: r } = e,
    [o, i] = f.useState(n.state),
    [a, l] = f.useState(),
    [s, c] = f.useState({ isTransitioning: !1 }),
    [d, u] = f.useState(),
    [p, y] = f.useState(),
    [v, g] = f.useState(),
    x = f.useRef(new Map()),
    { v7_startTransition: m } = r || {},
    h = f.useCallback(
      (_) => {
        m ? Jb(_) : _();
      },
      [m]
    ),
    w = f.useCallback(
      (_, k) => {
        let {
          deletedFetchers: O,
          unstable_flushSync: M,
          unstable_viewTransitionOpts: K,
        } = k;
        O.forEach((ne) => x.current.delete(ne)),
          _.fetchers.forEach((ne, W) => {
            ne.data !== void 0 && x.current.set(W, ne.data);
          });
        let z =
          n.window == null ||
          typeof n.window.document.startViewTransition != "function";
        if (!K || z) {
          M ? wi(() => i(_)) : h(() => i(_));
          return;
        }
        if (M) {
          wi(() => {
            p && (d && d.resolve(), p.skipTransition()),
              c({
                isTransitioning: !0,
                flushSync: !0,
                currentLocation: K.currentLocation,
                nextLocation: K.nextLocation,
              });
          });
          let ne = n.window.document.startViewTransition(() => {
            wi(() => i(_));
          });
          ne.finished.finally(() => {
            wi(() => {
              u(void 0), y(void 0), l(void 0), c({ isTransitioning: !1 });
            });
          }),
            wi(() => y(ne));
          return;
        }
        p
          ? (d && d.resolve(),
            p.skipTransition(),
            g({
              state: _,
              currentLocation: K.currentLocation,
              nextLocation: K.nextLocation,
            }))
          : (l(_),
            c({
              isTransitioning: !0,
              flushSync: !1,
              currentLocation: K.currentLocation,
              nextLocation: K.nextLocation,
            }));
      },
      [n.window, p, d, x, h]
    );
  f.useLayoutEffect(() => n.subscribe(w), [n, w]),
    f.useEffect(() => {
      s.isTransitioning && !s.flushSync && u(new eE());
    }, [s]),
    f.useEffect(() => {
      if (d && a && n.window) {
        let _ = a,
          k = d.promise,
          O = n.window.document.startViewTransition(async () => {
            h(() => i(_)), await k;
          });
        O.finished.finally(() => {
          u(void 0), y(void 0), l(void 0), c({ isTransitioning: !1 });
        }),
          y(O);
      }
    }, [h, a, d, n.window]),
    f.useEffect(() => {
      d && a && o.location.key === a.location.key && d.resolve();
    }, [d, p, o.location, a]),
    f.useEffect(() => {
      !s.isTransitioning &&
        v &&
        (l(v.state),
        c({
          isTransitioning: !0,
          flushSync: !1,
          currentLocation: v.currentLocation,
          nextLocation: v.nextLocation,
        }),
        g(void 0));
    }, [s.isTransitioning, v]),
    f.useEffect(() => {}, []);
  let E = f.useMemo(
      () => ({
        createHref: n.createHref,
        encodeLocation: n.encodeLocation,
        go: (_) => n.navigate(_),
        push: (_, k, O) =>
          n.navigate(_, {
            state: k,
            preventScrollReset: O == null ? void 0 : O.preventScrollReset,
          }),
        replace: (_, k, O) =>
          n.navigate(_, {
            replace: !0,
            state: k,
            preventScrollReset: O == null ? void 0 : O.preventScrollReset,
          }),
      }),
      [n]
    ),
    $ = n.basename || "/",
    b = f.useMemo(
      () => ({ router: n, navigator: E, static: !1, basename: $ }),
      [n, E, $]
    );
  return f.createElement(
    f.Fragment,
    null,
    f.createElement(
      ga.Provider,
      { value: b },
      f.createElement(
        zd.Provider,
        { value: o },
        f.createElement(
          Xb.Provider,
          { value: x.current },
          f.createElement(
            yv.Provider,
            { value: s },
            f.createElement(
              Ub,
              {
                basename: $,
                location: o.location,
                navigationType: o.historyAction,
                navigator: E,
                future: { v7_relativeSplatPath: n.future.v7_relativeSplatPath },
              },
              o.initialized || n.future.v7_partialHydration
                ? f.createElement(nE, {
                    routes: n.routes,
                    future: n.future,
                    state: o,
                  })
                : t
            )
          )
        )
      )
    ),
    null
  );
}
function nE(e) {
  let { routes: t, future: n, state: r } = e;
  return kb(t, void 0, r, n);
}
const rE =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  oE = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  iE = f.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: o,
        reloadDocument: i,
        replace: a,
        state: l,
        target: s,
        to: c,
        preventScrollReset: d,
        unstable_viewTransition: u,
      } = t,
      p = vv(t, Wb),
      { basename: y } = f.useContext(Ur),
      v,
      g = !1;
    if (typeof c == "string" && oE.test(c) && ((v = c), rE))
      try {
        let w = new URL(window.location.href),
          E = c.startsWith("//") ? new URL(w.protocol + c) : new URL(c),
          $ = Jn(E.pathname, y);
        E.origin === w.origin && $ != null
          ? (c = $ + E.search + E.hash)
          : (g = !0);
      } catch {}
    let x = Sb(c, { relative: o }),
      m = sE(c, {
        replace: a,
        state: l,
        target: s,
        preventScrollReset: d,
        relative: o,
        unstable_viewTransition: u,
      });
    function h(w) {
      r && r(w), w.defaultPrevented || m(w);
    }
    return f.createElement(
      "a",
      Qo({}, p, { href: v || x, onClick: g || i ? r : h, ref: n, target: s })
    );
  }),
  aE = f.forwardRef(function (t, n) {
    let {
        "aria-current": r = "page",
        caseSensitive: o = !1,
        className: i = "",
        end: a = !1,
        style: l,
        to: s,
        unstable_viewTransition: c,
        children: d,
      } = t,
      u = vv(t, Kb),
      p = ds(s, { relative: u.relative }),
      y = ya(),
      v = f.useContext(zd),
      { navigator: g, basename: x } = f.useContext(Ur),
      m = v != null && cE(p) && c === !0,
      h = g.encodeLocation ? g.encodeLocation(p).pathname : p.pathname,
      w = y.pathname,
      E =
        v && v.navigation && v.navigation.location
          ? v.navigation.location.pathname
          : null;
    o ||
      ((w = w.toLowerCase()),
      (E = E ? E.toLowerCase() : null),
      (h = h.toLowerCase())),
      E && x && (E = Jn(E, x) || E);
    const $ = h !== "/" && h.endsWith("/") ? h.length - 1 : h.length;
    let b = w === h || (!a && w.startsWith(h) && w.charAt($) === "/"),
      _ =
        E != null &&
        (E === h || (!a && E.startsWith(h) && E.charAt(h.length) === "/")),
      k = { isActive: b, isPending: _, isTransitioning: m },
      O = b ? r : void 0,
      M;
    typeof i == "function"
      ? (M = i(k))
      : (M = [
          i,
          b ? "active" : null,
          _ ? "pending" : null,
          m ? "transitioning" : null,
        ]
          .filter(Boolean)
          .join(" "));
    let K = typeof l == "function" ? l(k) : l;
    return f.createElement(
      iE,
      Qo({}, u, {
        "aria-current": O,
        className: M,
        ref: n,
        style: K,
        to: s,
        unstable_viewTransition: c,
      }),
      typeof d == "function" ? d(k) : d
    );
  });
var yu;
(function (e) {
  (e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState");
})(yu || (yu = {}));
var Hp;
(function (e) {
  (e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration");
})(Hp || (Hp = {}));
function lE(e) {
  let t = f.useContext(ga);
  return t || fe(!1), t;
}
function sE(e, t) {
  let {
      target: n,
      replace: r,
      state: o,
      preventScrollReset: i,
      relative: a,
      unstable_viewTransition: l,
    } = t === void 0 ? {} : t,
    s = Cb(),
    c = ya(),
    d = ds(e, { relative: a });
  return f.useCallback(
    (u) => {
      if (Vb(u, n)) {
        u.preventDefault();
        let p = r !== void 0 ? r : so(c) === so(d);
        s(e, {
          replace: p,
          state: o,
          preventScrollReset: i,
          relative: a,
          unstable_viewTransition: l,
        });
      }
    },
    [c, s, d, r, o, n, e, i, a, l]
  );
}
function cE(e, t) {
  t === void 0 && (t = {});
  let n = f.useContext(yv);
  n == null && fe(!1);
  let { basename: r } = lE(yu.useViewTransitionState),
    o = ds(e, { relative: t.relative });
  if (!n.isTransitioning) return !1;
  let i = Jn(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    a = Jn(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return mu(o.pathname, a) != null || mu(o.pathname, i) != null;
}
const uE = "modulepreload",
  dE = function (e) {
    return "/open-kf-admin/" + e;
  },
  Vp = {},
  dr = function (t, n, r) {
    let o = Promise.resolve();
    if (n && n.length > 0) {
      const i = document.getElementsByTagName("link");
      o = Promise.all(
        n.map((a) => {
          if (((a = dE(a)), a in Vp)) return;
          Vp[a] = !0;
          const l = a.endsWith(".css"),
            s = l ? '[rel="stylesheet"]' : "";
          if (!!r)
            for (let u = i.length - 1; u >= 0; u--) {
              const p = i[u];
              if (p.href === a && (!l || p.rel === "stylesheet")) return;
            }
          else if (document.querySelector(`link[href="${a}"]${s}`)) return;
          const d = document.createElement("link");
          if (
            ((d.rel = l ? "stylesheet" : uE),
            l || ((d.as = "script"), (d.crossOrigin = "")),
            (d.href = a),
            document.head.appendChild(d),
            l)
          )
            return new Promise((u, p) => {
              d.addEventListener("load", u),
                d.addEventListener("error", () =>
                  p(new Error(`Unable to preload CSS for ${a}`))
                );
            });
        })
      );
    }
    return o
      .then(() => t())
      .catch((i) => {
        const a = new Event("vite:preloadError", { cancelable: !0 });
        if (((a.payload = i), window.dispatchEvent(a), !a.defaultPrevented))
          throw i;
      });
  };
function V() {
  return (
    (V = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    V.apply(this, arguments)
  );
}
function fE(e, t) {
  const n = f.createContext(t);
  function r(i) {
    const { children: a, ...l } = i,
      s = f.useMemo(() => l, Object.values(l));
    return f.createElement(n.Provider, { value: s }, a);
  }
  function o(i) {
    const a = f.useContext(n);
    if (a) return a;
    if (t !== void 0) return t;
    throw new Error(`\`${i}\` must be used within \`${e}\``);
  }
  return (r.displayName = e + "Provider"), [r, o];
}
function or(e, t = []) {
  let n = [];
  function r(i, a) {
    const l = f.createContext(a),
      s = n.length;
    n = [...n, a];
    function c(u) {
      const { scope: p, children: y, ...v } = u,
        g = (p == null ? void 0 : p[e][s]) || l,
        x = f.useMemo(() => v, Object.values(v));
      return f.createElement(g.Provider, { value: x }, y);
    }
    function d(u, p) {
      const y = (p == null ? void 0 : p[e][s]) || l,
        v = f.useContext(y);
      if (v) return v;
      if (a !== void 0) return a;
      throw new Error(`\`${u}\` must be used within \`${i}\``);
    }
    return (c.displayName = i + "Provider"), [c, d];
  }
  const o = () => {
    const i = n.map((a) => f.createContext(a));
    return function (l) {
      const s = (l == null ? void 0 : l[e]) || i;
      return f.useMemo(() => ({ [`__scope${e}`]: { ...l, [e]: s } }), [l, s]);
    };
  };
  return (o.scopeName = e), [r, pE(o, ...t)];
}
function pE(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({ useScope: o(), scopeName: o.scopeName }));
    return function (i) {
      const a = r.reduce((l, { useScope: s, scopeName: c }) => {
        const u = s(i)[`__scope${c}`];
        return { ...l, ...u };
      }, {});
      return f.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return (n.scopeName = t.scopeName), n;
}
function wn(e) {
  const t = f.useRef(e);
  return (
    f.useEffect(() => {
      t.current = e;
    }),
    f.useMemo(
      () =>
        (...n) => {
          var r;
          return (r = t.current) === null || r === void 0
            ? void 0
            : r.call(t, ...n);
        },
      []
    )
  );
}
const Or =
  globalThis != null && globalThis.document ? f.useLayoutEffect : () => {};
function mE(e, t) {
  typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function fs(...e) {
  return (t) => e.forEach((n) => mE(n, t));
}
function ct(...e) {
  return f.useCallback(fs(...e), e);
}
const co = f.forwardRef((e, t) => {
  const { children: n, ...r } = e,
    o = f.Children.toArray(n),
    i = o.find(hE);
  if (i) {
    const a = i.props.children,
      l = o.map((s) =>
        s === i
          ? f.Children.count(a) > 1
            ? f.Children.only(null)
            : f.isValidElement(a)
            ? a.props.children
            : null
          : s
      );
    return f.createElement(
      wu,
      V({}, r, { ref: t }),
      f.isValidElement(a) ? f.cloneElement(a, void 0, l) : null
    );
  }
  return f.createElement(wu, V({}, r, { ref: t }), n);
});
co.displayName = "Slot";
const wu = f.forwardRef((e, t) => {
  const { children: n, ...r } = e;
  return f.isValidElement(n)
    ? f.cloneElement(n, { ...gE(r, n.props), ref: t ? fs(t, n.ref) : n.ref })
    : f.Children.count(n) > 1
    ? f.Children.only(null)
    : null;
});
wu.displayName = "SlotClone";
const wv = ({ children: e }) => f.createElement(f.Fragment, null, e);
function hE(e) {
  return f.isValidElement(e) && e.type === wv;
}
function gE(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r],
      i = t[r];
    /^on[A-Z]/.test(r)
      ? o && i
        ? (n[r] = (...l) => {
            i(...l), o(...l);
          })
        : o && (n[r] = o)
      : r === "style"
      ? (n[r] = { ...o, ...i })
      : r === "className" && (n[r] = [o, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
const vE = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "span",
    "svg",
    "ul",
  ],
  De = vE.reduce((e, t) => {
    const n = f.forwardRef((r, o) => {
      const { asChild: i, ...a } = r,
        l = i ? co : t;
      return (
        f.useEffect(() => {
          window[Symbol.for("radix-ui")] = !0;
        }, []),
        f.createElement(l, V({}, a, { ref: o }))
      );
    });
    return (n.displayName = `Primitive.${t}`), { ...e, [t]: n };
  }, {});
function xv(e, t) {
  e && ni.flushSync(() => e.dispatchEvent(t));
}
const bv = "Avatar",
  [yE, hk] = or(bv),
  [wE, Ev] = yE(bv),
  xE = f.forwardRef((e, t) => {
    const { __scopeAvatar: n, ...r } = e,
      [o, i] = f.useState("idle");
    return f.createElement(
      wE,
      { scope: n, imageLoadingStatus: o, onImageLoadingStatusChange: i },
      f.createElement(De.span, V({}, r, { ref: t }))
    );
  }),
  bE = "AvatarImage",
  EE = f.forwardRef((e, t) => {
    const {
        __scopeAvatar: n,
        src: r,
        onLoadingStatusChange: o = () => {},
        ...i
      } = e,
      a = Ev(bE, n),
      l = $E(r),
      s = wn((c) => {
        o(c), a.onImageLoadingStatusChange(c);
      });
    return (
      Or(() => {
        l !== "idle" && s(l);
      }, [l, s]),
      l === "loaded"
        ? f.createElement(De.img, V({}, i, { ref: t, src: r }))
        : null
    );
  }),
  SE = "AvatarFallback",
  CE = f.forwardRef((e, t) => {
    const { __scopeAvatar: n, delayMs: r, ...o } = e,
      i = Ev(SE, n),
      [a, l] = f.useState(r === void 0);
    return (
      f.useEffect(() => {
        if (r !== void 0) {
          const s = window.setTimeout(() => l(!0), r);
          return () => window.clearTimeout(s);
        }
      }, [r]),
      a && i.imageLoadingStatus !== "loaded"
        ? f.createElement(De.span, V({}, o, { ref: t }))
        : null
    );
  });
function $E(e) {
  const [t, n] = f.useState("idle");
  return (
    Or(() => {
      if (!e) {
        n("error");
        return;
      }
      let r = !0;
      const o = new window.Image(),
        i = (a) => () => {
          r && n(a);
        };
      return (
        n("loading"),
        (o.onload = i("loaded")),
        (o.onerror = i("error")),
        (o.src = e),
        () => {
          r = !1;
        }
      );
    }, [e]),
    t
  );
}
const Sv = xE,
  Cv = EE,
  $v = CE;
function _v(e) {
  var t,
    n,
    r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (n = _v(e[t])) && (r && (r += " "), (r += n));
    } else for (n in e) e[n] && (r && (r += " "), (r += n));
  return r;
}
function Rv() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++)
    (e = arguments[n]) && (t = _v(e)) && (r && (r += " "), (r += t));
  return r;
}
const jd = "-";
function _E(e) {
  const t = kE(e),
    { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
  function o(a) {
    const l = a.split(jd);
    return l[0] === "" && l.length !== 1 && l.shift(), kv(l, t) || RE(a);
  }
  function i(a, l) {
    const s = n[a] || [];
    return l && r[a] ? [...s, ...r[a]] : s;
  }
  return { getClassGroupId: o, getConflictingClassGroupIds: i };
}
function kv(e, t) {
  var a;
  if (e.length === 0) return t.classGroupId;
  const n = e[0],
    r = t.nextPart.get(n),
    o = r ? kv(e.slice(1), r) : void 0;
  if (o) return o;
  if (t.validators.length === 0) return;
  const i = e.join(jd);
  return (a = t.validators.find(({ validator: l }) => l(i))) == null
    ? void 0
    : a.classGroupId;
}
const Wp = /^\[(.+)\]$/;
function RE(e) {
  if (Wp.test(e)) {
    const t = Wp.exec(e)[1],
      n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n) return "arbitrary.." + n;
  }
}
function kE(e) {
  const { theme: t, prefix: n } = e,
    r = { nextPart: new Map(), validators: [] };
  return (
    PE(Object.entries(e.classGroups), n).forEach(([i, a]) => {
      xu(a, r, i, t);
    }),
    r
  );
}
function xu(e, t, n, r) {
  e.forEach((o) => {
    if (typeof o == "string") {
      const i = o === "" ? t : Kp(t, o);
      i.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (TE(o)) {
        xu(o(r), t, n, r);
        return;
      }
      t.validators.push({ validator: o, classGroupId: n });
      return;
    }
    Object.entries(o).forEach(([i, a]) => {
      xu(a, Kp(t, i), n, r);
    });
  });
}
function Kp(e, t) {
  let n = e;
  return (
    t.split(jd).forEach((r) => {
      n.nextPart.has(r) ||
        n.nextPart.set(r, { nextPart: new Map(), validators: [] }),
        (n = n.nextPart.get(r));
    }),
    n
  );
}
function TE(e) {
  return e.isThemeGetter;
}
function PE(e, t) {
  return t
    ? e.map(([n, r]) => {
        const o = r.map((i) =>
          typeof i == "string"
            ? t + i
            : typeof i == "object"
            ? Object.fromEntries(Object.entries(i).map(([a, l]) => [t + a, l]))
            : i
        );
        return [n, o];
      })
    : e;
}
function NE(e) {
  if (e < 1) return { get: () => {}, set: () => {} };
  let t = 0,
    n = new Map(),
    r = new Map();
  function o(i, a) {
    n.set(i, a), t++, t > e && ((t = 0), (r = n), (n = new Map()));
  }
  return {
    get(i) {
      let a = n.get(i);
      if (a !== void 0) return a;
      if ((a = r.get(i)) !== void 0) return o(i, a), a;
    },
    set(i, a) {
      n.has(i) ? n.set(i, a) : o(i, a);
    },
  };
}
const Tv = "!";
function AE(e) {
  const t = e.separator,
    n = t.length === 1,
    r = t[0],
    o = t.length;
  return function (a) {
    const l = [];
    let s = 0,
      c = 0,
      d;
    for (let g = 0; g < a.length; g++) {
      let x = a[g];
      if (s === 0) {
        if (x === r && (n || a.slice(g, g + o) === t)) {
          l.push(a.slice(c, g)), (c = g + o);
          continue;
        }
        if (x === "/") {
          d = g;
          continue;
        }
      }
      x === "[" ? s++ : x === "]" && s--;
    }
    const u = l.length === 0 ? a : a.substring(c),
      p = u.startsWith(Tv),
      y = p ? u.substring(1) : u,
      v = d && d > c ? d - c : void 0;
    return {
      modifiers: l,
      hasImportantModifier: p,
      baseClassName: y,
      maybePostfixModifierPosition: v,
    };
  };
}
function DE(e) {
  if (e.length <= 1) return e;
  const t = [];
  let n = [];
  return (
    e.forEach((r) => {
      r[0] === "[" ? (t.push(...n.sort(), r), (n = [])) : n.push(r);
    }),
    t.push(...n.sort()),
    t
  );
}
function OE(e) {
  return { cache: NE(e.cacheSize), splitModifiers: AE(e), ..._E(e) };
}
const ME = /\s+/;
function LE(e, t) {
  const {
      splitModifiers: n,
      getClassGroupId: r,
      getConflictingClassGroupIds: o,
    } = t,
    i = new Set();
  return e
    .trim()
    .split(ME)
    .map((a) => {
      const {
        modifiers: l,
        hasImportantModifier: s,
        baseClassName: c,
        maybePostfixModifierPosition: d,
      } = n(a);
      let u = r(d ? c.substring(0, d) : c),
        p = !!d;
      if (!u) {
        if (!d) return { isTailwindClass: !1, originalClassName: a };
        if (((u = r(c)), !u))
          return { isTailwindClass: !1, originalClassName: a };
        p = !1;
      }
      const y = DE(l).join(":");
      return {
        isTailwindClass: !0,
        modifierId: s ? y + Tv : y,
        classGroupId: u,
        originalClassName: a,
        hasPostfixModifier: p,
      };
    })
    .reverse()
    .filter((a) => {
      if (!a.isTailwindClass) return !0;
      const { modifierId: l, classGroupId: s, hasPostfixModifier: c } = a,
        d = l + s;
      return i.has(d)
        ? !1
        : (i.add(d), o(s, c).forEach((u) => i.add(l + u)), !0);
    })
    .reverse()
    .map((a) => a.originalClassName)
    .join(" ");
}
function IE() {
  let e = 0,
    t,
    n,
    r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Pv(t)) && (r && (r += " "), (r += n));
  return r;
}
function Pv(e) {
  if (typeof e == "string") return e;
  let t,
    n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Pv(e[r])) && (n && (n += " "), (n += t));
  return n;
}
function FE(e, ...t) {
  let n,
    r,
    o,
    i = a;
  function a(s) {
    const c = t.reduce((d, u) => u(d), e());
    return (n = OE(c)), (r = n.cache.get), (o = n.cache.set), (i = l), l(s);
  }
  function l(s) {
    const c = r(s);
    if (c) return c;
    const d = LE(s, n);
    return o(s, d), d;
  }
  return function () {
    return i(IE.apply(null, arguments));
  };
}
function Pe(e) {
  const t = (n) => n[e] || [];
  return (t.isThemeGetter = !0), t;
}
const Nv = /^\[(?:([a-z-]+):)?(.+)\]$/i,
  zE = /^\d+\/\d+$/,
  jE = new Set(["px", "full", "screen"]),
  UE = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  BE =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  HE = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
  VE = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  WE =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
function Un(e) {
  return Jr(e) || jE.has(e) || zE.test(e);
}
function fr(e) {
  return ri(e, "length", JE);
}
function Jr(e) {
  return !!e && !Number.isNaN(Number(e));
}
function Ua(e) {
  return ri(e, "number", Jr);
}
function xi(e) {
  return !!e && Number.isInteger(Number(e));
}
function KE(e) {
  return e.endsWith("%") && Jr(e.slice(0, -1));
}
function ue(e) {
  return Nv.test(e);
}
function pr(e) {
  return UE.test(e);
}
const GE = new Set(["length", "size", "percentage"]);
function YE(e) {
  return ri(e, GE, Av);
}
function QE(e) {
  return ri(e, "position", Av);
}
const XE = new Set(["image", "url"]);
function qE(e) {
  return ri(e, XE, t2);
}
function ZE(e) {
  return ri(e, "", e2);
}
function bi() {
  return !0;
}
function ri(e, t, n) {
  const r = Nv.exec(e);
  return r
    ? r[1]
      ? typeof t == "string"
        ? r[1] === t
        : t.has(r[1])
      : n(r[2])
    : !1;
}
function JE(e) {
  return BE.test(e) && !HE.test(e);
}
function Av() {
  return !1;
}
function e2(e) {
  return VE.test(e);
}
function t2(e) {
  return WE.test(e);
}
function n2() {
  const e = Pe("colors"),
    t = Pe("spacing"),
    n = Pe("blur"),
    r = Pe("brightness"),
    o = Pe("borderColor"),
    i = Pe("borderRadius"),
    a = Pe("borderSpacing"),
    l = Pe("borderWidth"),
    s = Pe("contrast"),
    c = Pe("grayscale"),
    d = Pe("hueRotate"),
    u = Pe("invert"),
    p = Pe("gap"),
    y = Pe("gradientColorStops"),
    v = Pe("gradientColorStopPositions"),
    g = Pe("inset"),
    x = Pe("margin"),
    m = Pe("opacity"),
    h = Pe("padding"),
    w = Pe("saturate"),
    E = Pe("scale"),
    $ = Pe("sepia"),
    b = Pe("skew"),
    _ = Pe("space"),
    k = Pe("translate"),
    O = () => ["auto", "contain", "none"],
    M = () => ["auto", "hidden", "clip", "visible", "scroll"],
    K = () => ["auto", ue, t],
    z = () => [ue, t],
    ne = () => ["", Un, fr],
    W = () => ["auto", Jr, ue],
    J = () => [
      "bottom",
      "center",
      "left",
      "left-bottom",
      "left-top",
      "right",
      "right-bottom",
      "right-top",
      "top",
    ],
    ie = () => ["solid", "dashed", "dotted", "double", "none"],
    Q = () => [
      "normal",
      "multiply",
      "screen",
      "overlay",
      "darken",
      "lighten",
      "color-dodge",
      "color-burn",
      "hard-light",
      "soft-light",
      "difference",
      "exclusion",
      "hue",
      "saturation",
      "color",
      "luminosity",
      "plus-lighter",
    ],
    D = () => [
      "start",
      "end",
      "center",
      "between",
      "around",
      "evenly",
      "stretch",
    ],
    P = () => ["", "0", ue],
    I = () => [
      "auto",
      "avoid",
      "all",
      "avoid-page",
      "page",
      "left",
      "right",
      "column",
    ],
    j = () => [Jr, Ua],
    H = () => [Jr, ue];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [bi],
      spacing: [Un, fr],
      blur: ["none", "", pr, ue],
      brightness: j(),
      borderColor: [e],
      borderRadius: ["none", "", "full", pr, ue],
      borderSpacing: z(),
      borderWidth: ne(),
      contrast: j(),
      grayscale: P(),
      hueRotate: H(),
      invert: P(),
      gap: z(),
      gradientColorStops: [e],
      gradientColorStopPositions: [KE, fr],
      inset: K(),
      margin: K(),
      opacity: j(),
      padding: z(),
      saturate: j(),
      scale: j(),
      sepia: P(),
      skew: H(),
      space: z(),
      translate: z(),
    },
    classGroups: {
      aspect: [{ aspect: ["auto", "square", "video", ue] }],
      container: ["container"],
      columns: [{ columns: [pr] }],
      "break-after": [{ "break-after": I() }],
      "break-before": [{ "break-before": I() }],
      "break-inside": [
        { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
      ],
      "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
      box: [{ box: ["border", "content"] }],
      display: [
        "block",
        "inline-block",
        "inline",
        "flex",
        "inline-flex",
        "table",
        "inline-table",
        "table-caption",
        "table-cell",
        "table-column",
        "table-column-group",
        "table-footer-group",
        "table-header-group",
        "table-row-group",
        "table-row",
        "flow-root",
        "grid",
        "inline-grid",
        "contents",
        "list-item",
        "hidden",
      ],
      float: [{ float: ["right", "left", "none", "start", "end"] }],
      clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
      isolation: ["isolate", "isolation-auto"],
      "object-fit": [
        { object: ["contain", "cover", "fill", "none", "scale-down"] },
      ],
      "object-position": [{ object: [...J(), ue] }],
      overflow: [{ overflow: M() }],
      "overflow-x": [{ "overflow-x": M() }],
      "overflow-y": [{ "overflow-y": M() }],
      overscroll: [{ overscroll: O() }],
      "overscroll-x": [{ "overscroll-x": O() }],
      "overscroll-y": [{ "overscroll-y": O() }],
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      inset: [{ inset: [g] }],
      "inset-x": [{ "inset-x": [g] }],
      "inset-y": [{ "inset-y": [g] }],
      start: [{ start: [g] }],
      end: [{ end: [g] }],
      top: [{ top: [g] }],
      right: [{ right: [g] }],
      bottom: [{ bottom: [g] }],
      left: [{ left: [g] }],
      visibility: ["visible", "invisible", "collapse"],
      z: [{ z: ["auto", xi, ue] }],
      basis: [{ basis: K() }],
      "flex-direction": [
        { flex: ["row", "row-reverse", "col", "col-reverse"] },
      ],
      "flex-wrap": [{ flex: ["wrap", "wrap-reverse", "nowrap"] }],
      flex: [{ flex: ["1", "auto", "initial", "none", ue] }],
      grow: [{ grow: P() }],
      shrink: [{ shrink: P() }],
      order: [{ order: ["first", "last", "none", xi, ue] }],
      "grid-cols": [{ "grid-cols": [bi] }],
      "col-start-end": [{ col: ["auto", { span: ["full", xi, ue] }, ue] }],
      "col-start": [{ "col-start": W() }],
      "col-end": [{ "col-end": W() }],
      "grid-rows": [{ "grid-rows": [bi] }],
      "row-start-end": [{ row: ["auto", { span: [xi, ue] }, ue] }],
      "row-start": [{ "row-start": W() }],
      "row-end": [{ "row-end": W() }],
      "grid-flow": [
        { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
      ],
      "auto-cols": [{ "auto-cols": ["auto", "min", "max", "fr", ue] }],
      "auto-rows": [{ "auto-rows": ["auto", "min", "max", "fr", ue] }],
      gap: [{ gap: [p] }],
      "gap-x": [{ "gap-x": [p] }],
      "gap-y": [{ "gap-y": [p] }],
      "justify-content": [{ justify: ["normal", ...D()] }],
      "justify-items": [
        { "justify-items": ["start", "end", "center", "stretch"] },
      ],
      "justify-self": [
        { "justify-self": ["auto", "start", "end", "center", "stretch"] },
      ],
      "align-content": [{ content: ["normal", ...D(), "baseline"] }],
      "align-items": [
        { items: ["start", "end", "center", "baseline", "stretch"] },
      ],
      "align-self": [
        { self: ["auto", "start", "end", "center", "stretch", "baseline"] },
      ],
      "place-content": [{ "place-content": [...D(), "baseline"] }],
      "place-items": [
        { "place-items": ["start", "end", "center", "baseline", "stretch"] },
      ],
      "place-self": [
        { "place-self": ["auto", "start", "end", "center", "stretch"] },
      ],
      p: [{ p: [h] }],
      px: [{ px: [h] }],
      py: [{ py: [h] }],
      ps: [{ ps: [h] }],
      pe: [{ pe: [h] }],
      pt: [{ pt: [h] }],
      pr: [{ pr: [h] }],
      pb: [{ pb: [h] }],
      pl: [{ pl: [h] }],
      m: [{ m: [x] }],
      mx: [{ mx: [x] }],
      my: [{ my: [x] }],
      ms: [{ ms: [x] }],
      me: [{ me: [x] }],
      mt: [{ mt: [x] }],
      mr: [{ mr: [x] }],
      mb: [{ mb: [x] }],
      ml: [{ ml: [x] }],
      "space-x": [{ "space-x": [_] }],
      "space-x-reverse": ["space-x-reverse"],
      "space-y": [{ "space-y": [_] }],
      "space-y-reverse": ["space-y-reverse"],
      w: [{ w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", ue, t] }],
      "min-w": [{ "min-w": [ue, t, "min", "max", "fit"] }],
      "max-w": [
        {
          "max-w": [
            ue,
            t,
            "none",
            "full",
            "min",
            "max",
            "fit",
            "prose",
            { screen: [pr] },
            pr,
          ],
        },
      ],
      h: [{ h: [ue, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"] }],
      "min-h": [{ "min-h": [ue, t, "min", "max", "fit", "svh", "lvh", "dvh"] }],
      "max-h": [{ "max-h": [ue, t, "min", "max", "fit", "svh", "lvh", "dvh"] }],
      size: [{ size: [ue, t, "auto", "min", "max", "fit"] }],
      "font-size": [{ text: ["base", pr, fr] }],
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      "font-style": ["italic", "not-italic"],
      "font-weight": [
        {
          font: [
            "thin",
            "extralight",
            "light",
            "normal",
            "medium",
            "semibold",
            "bold",
            "extrabold",
            "black",
            Ua,
          ],
        },
      ],
      "font-family": [{ font: [bi] }],
      "fvn-normal": ["normal-nums"],
      "fvn-ordinal": ["ordinal"],
      "fvn-slashed-zero": ["slashed-zero"],
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      tracking: [
        {
          tracking: [
            "tighter",
            "tight",
            "normal",
            "wide",
            "wider",
            "widest",
            ue,
          ],
        },
      ],
      "line-clamp": [{ "line-clamp": ["none", Jr, Ua] }],
      leading: [
        {
          leading: [
            "none",
            "tight",
            "snug",
            "normal",
            "relaxed",
            "loose",
            Un,
            ue,
          ],
        },
      ],
      "list-image": [{ "list-image": ["none", ue] }],
      "list-style-type": [{ list: ["none", "disc", "decimal", ue] }],
      "list-style-position": [{ list: ["inside", "outside"] }],
      "placeholder-color": [{ placeholder: [e] }],
      "placeholder-opacity": [{ "placeholder-opacity": [m] }],
      "text-alignment": [
        { text: ["left", "center", "right", "justify", "start", "end"] },
      ],
      "text-color": [{ text: [e] }],
      "text-opacity": [{ "text-opacity": [m] }],
      "text-decoration": [
        "underline",
        "overline",
        "line-through",
        "no-underline",
      ],
      "text-decoration-style": [{ decoration: [...ie(), "wavy"] }],
      "text-decoration-thickness": [
        { decoration: ["auto", "from-font", Un, fr] },
      ],
      "underline-offset": [{ "underline-offset": ["auto", Un, ue] }],
      "text-decoration-color": [{ decoration: [e] }],
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
      indent: [{ indent: z() }],
      "vertical-align": [
        {
          align: [
            "baseline",
            "top",
            "middle",
            "bottom",
            "text-top",
            "text-bottom",
            "sub",
            "super",
            ue,
          ],
        },
      ],
      whitespace: [
        {
          whitespace: [
            "normal",
            "nowrap",
            "pre",
            "pre-line",
            "pre-wrap",
            "break-spaces",
          ],
        },
      ],
      break: [{ break: ["normal", "words", "all", "keep"] }],
      hyphens: [{ hyphens: ["none", "manual", "auto"] }],
      content: [{ content: ["none", ue] }],
      "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
      "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
      "bg-opacity": [{ "bg-opacity": [m] }],
      "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
      "bg-position": [{ bg: [...J(), QE] }],
      "bg-repeat": [
        { bg: ["no-repeat", { repeat: ["", "x", "y", "round", "space"] }] },
      ],
      "bg-size": [{ bg: ["auto", "cover", "contain", YE] }],
      "bg-image": [
        {
          bg: [
            "none",
            { "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
            qE,
          ],
        },
      ],
      "bg-color": [{ bg: [e] }],
      "gradient-from-pos": [{ from: [v] }],
      "gradient-via-pos": [{ via: [v] }],
      "gradient-to-pos": [{ to: [v] }],
      "gradient-from": [{ from: [y] }],
      "gradient-via": [{ via: [y] }],
      "gradient-to": [{ to: [y] }],
      rounded: [{ rounded: [i] }],
      "rounded-s": [{ "rounded-s": [i] }],
      "rounded-e": [{ "rounded-e": [i] }],
      "rounded-t": [{ "rounded-t": [i] }],
      "rounded-r": [{ "rounded-r": [i] }],
      "rounded-b": [{ "rounded-b": [i] }],
      "rounded-l": [{ "rounded-l": [i] }],
      "rounded-ss": [{ "rounded-ss": [i] }],
      "rounded-se": [{ "rounded-se": [i] }],
      "rounded-ee": [{ "rounded-ee": [i] }],
      "rounded-es": [{ "rounded-es": [i] }],
      "rounded-tl": [{ "rounded-tl": [i] }],
      "rounded-tr": [{ "rounded-tr": [i] }],
      "rounded-br": [{ "rounded-br": [i] }],
      "rounded-bl": [{ "rounded-bl": [i] }],
      "border-w": [{ border: [l] }],
      "border-w-x": [{ "border-x": [l] }],
      "border-w-y": [{ "border-y": [l] }],
      "border-w-s": [{ "border-s": [l] }],
      "border-w-e": [{ "border-e": [l] }],
      "border-w-t": [{ "border-t": [l] }],
      "border-w-r": [{ "border-r": [l] }],
      "border-w-b": [{ "border-b": [l] }],
      "border-w-l": [{ "border-l": [l] }],
      "border-opacity": [{ "border-opacity": [m] }],
      "border-style": [{ border: [...ie(), "hidden"] }],
      "divide-x": [{ "divide-x": [l] }],
      "divide-x-reverse": ["divide-x-reverse"],
      "divide-y": [{ "divide-y": [l] }],
      "divide-y-reverse": ["divide-y-reverse"],
      "divide-opacity": [{ "divide-opacity": [m] }],
      "divide-style": [{ divide: ie() }],
      "border-color": [{ border: [o] }],
      "border-color-x": [{ "border-x": [o] }],
      "border-color-y": [{ "border-y": [o] }],
      "border-color-t": [{ "border-t": [o] }],
      "border-color-r": [{ "border-r": [o] }],
      "border-color-b": [{ "border-b": [o] }],
      "border-color-l": [{ "border-l": [o] }],
      "divide-color": [{ divide: [o] }],
      "outline-style": [{ outline: ["", ...ie()] }],
      "outline-offset": [{ "outline-offset": [Un, ue] }],
      "outline-w": [{ outline: [Un, fr] }],
      "outline-color": [{ outline: [e] }],
      "ring-w": [{ ring: ne() }],
      "ring-w-inset": ["ring-inset"],
      "ring-color": [{ ring: [e] }],
      "ring-opacity": [{ "ring-opacity": [m] }],
      "ring-offset-w": [{ "ring-offset": [Un, fr] }],
      "ring-offset-color": [{ "ring-offset": [e] }],
      shadow: [{ shadow: ["", "inner", "none", pr, ZE] }],
      "shadow-color": [{ shadow: [bi] }],
      opacity: [{ opacity: [m] }],
      "mix-blend": [{ "mix-blend": Q() }],
      "bg-blend": [{ "bg-blend": Q() }],
      filter: [{ filter: ["", "none"] }],
      blur: [{ blur: [n] }],
      brightness: [{ brightness: [r] }],
      contrast: [{ contrast: [s] }],
      "drop-shadow": [{ "drop-shadow": ["", "none", pr, ue] }],
      grayscale: [{ grayscale: [c] }],
      "hue-rotate": [{ "hue-rotate": [d] }],
      invert: [{ invert: [u] }],
      saturate: [{ saturate: [w] }],
      sepia: [{ sepia: [$] }],
      "backdrop-filter": [{ "backdrop-filter": ["", "none"] }],
      "backdrop-blur": [{ "backdrop-blur": [n] }],
      "backdrop-brightness": [{ "backdrop-brightness": [r] }],
      "backdrop-contrast": [{ "backdrop-contrast": [s] }],
      "backdrop-grayscale": [{ "backdrop-grayscale": [c] }],
      "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [d] }],
      "backdrop-invert": [{ "backdrop-invert": [u] }],
      "backdrop-opacity": [{ "backdrop-opacity": [m] }],
      "backdrop-saturate": [{ "backdrop-saturate": [w] }],
      "backdrop-sepia": [{ "backdrop-sepia": [$] }],
      "border-collapse": [{ border: ["collapse", "separate"] }],
      "border-spacing": [{ "border-spacing": [a] }],
      "border-spacing-x": [{ "border-spacing-x": [a] }],
      "border-spacing-y": [{ "border-spacing-y": [a] }],
      "table-layout": [{ table: ["auto", "fixed"] }],
      caption: [{ caption: ["top", "bottom"] }],
      transition: [
        {
          transition: [
            "none",
            "all",
            "",
            "colors",
            "opacity",
            "shadow",
            "transform",
            ue,
          ],
        },
      ],
      duration: [{ duration: H() }],
      ease: [{ ease: ["linear", "in", "out", "in-out", ue] }],
      delay: [{ delay: H() }],
      animate: [{ animate: ["none", "spin", "ping", "pulse", "bounce", ue] }],
      transform: [{ transform: ["", "gpu", "none"] }],
      scale: [{ scale: [E] }],
      "scale-x": [{ "scale-x": [E] }],
      "scale-y": [{ "scale-y": [E] }],
      rotate: [{ rotate: [xi, ue] }],
      "translate-x": [{ "translate-x": [k] }],
      "translate-y": [{ "translate-y": [k] }],
      "skew-x": [{ "skew-x": [b] }],
      "skew-y": [{ "skew-y": [b] }],
      "transform-origin": [
        {
          origin: [
            "center",
            "top",
            "top-right",
            "right",
            "bottom-right",
            "bottom",
            "bottom-left",
            "left",
            "top-left",
            ue,
          ],
        },
      ],
      accent: [{ accent: ["auto", e] }],
      appearance: [{ appearance: ["none", "auto"] }],
      cursor: [
        {
          cursor: [
            "auto",
            "default",
            "pointer",
            "wait",
            "text",
            "move",
            "help",
            "not-allowed",
            "none",
            "context-menu",
            "progress",
            "cell",
            "crosshair",
            "vertical-text",
            "alias",
            "copy",
            "no-drop",
            "grab",
            "grabbing",
            "all-scroll",
            "col-resize",
            "row-resize",
            "n-resize",
            "e-resize",
            "s-resize",
            "w-resize",
            "ne-resize",
            "nw-resize",
            "se-resize",
            "sw-resize",
            "ew-resize",
            "ns-resize",
            "nesw-resize",
            "nwse-resize",
            "zoom-in",
            "zoom-out",
            ue,
          ],
        },
      ],
      "caret-color": [{ caret: [e] }],
      "pointer-events": [{ "pointer-events": ["none", "auto"] }],
      resize: [{ resize: ["none", "y", "x", ""] }],
      "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
      "scroll-m": [{ "scroll-m": z() }],
      "scroll-mx": [{ "scroll-mx": z() }],
      "scroll-my": [{ "scroll-my": z() }],
      "scroll-ms": [{ "scroll-ms": z() }],
      "scroll-me": [{ "scroll-me": z() }],
      "scroll-mt": [{ "scroll-mt": z() }],
      "scroll-mr": [{ "scroll-mr": z() }],
      "scroll-mb": [{ "scroll-mb": z() }],
      "scroll-ml": [{ "scroll-ml": z() }],
      "scroll-p": [{ "scroll-p": z() }],
      "scroll-px": [{ "scroll-px": z() }],
      "scroll-py": [{ "scroll-py": z() }],
      "scroll-ps": [{ "scroll-ps": z() }],
      "scroll-pe": [{ "scroll-pe": z() }],
      "scroll-pt": [{ "scroll-pt": z() }],
      "scroll-pr": [{ "scroll-pr": z() }],
      "scroll-pb": [{ "scroll-pb": z() }],
      "scroll-pl": [{ "scroll-pl": z() }],
      "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
      "snap-stop": [{ snap: ["normal", "always"] }],
      "snap-type": [{ snap: ["none", "x", "y", "both"] }],
      "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
      touch: [{ touch: ["auto", "none", "manipulation"] }],
      "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
      "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
      "touch-pz": ["touch-pinch-zoom"],
      select: [{ select: ["none", "text", "all", "auto"] }],
      "will-change": [
        { "will-change": ["auto", "scroll", "contents", "transform", ue] },
      ],
      fill: [{ fill: [e, "none"] }],
      "stroke-w": [{ stroke: [Un, fr, Ua] }],
      stroke: [{ stroke: [e, "none"] }],
      sr: ["sr-only", "not-sr-only"],
      "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: [
        "inset-x",
        "inset-y",
        "start",
        "end",
        "top",
        "right",
        "bottom",
        "left",
      ],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": [
        "fvn-ordinal",
        "fvn-slashed-zero",
        "fvn-figure",
        "fvn-spacing",
        "fvn-fraction",
      ],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: [
        "rounded-s",
        "rounded-e",
        "rounded-t",
        "rounded-r",
        "rounded-b",
        "rounded-l",
        "rounded-ss",
        "rounded-se",
        "rounded-ee",
        "rounded-es",
        "rounded-tl",
        "rounded-tr",
        "rounded-br",
        "rounded-bl",
      ],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": [
        "border-w-s",
        "border-w-e",
        "border-w-t",
        "border-w-r",
        "border-w-b",
        "border-w-l",
      ],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": [
        "border-color-t",
        "border-color-r",
        "border-color-b",
        "border-color-l",
      ],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": [
        "scroll-mx",
        "scroll-my",
        "scroll-ms",
        "scroll-me",
        "scroll-mt",
        "scroll-mr",
        "scroll-mb",
        "scroll-ml",
      ],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": [
        "scroll-px",
        "scroll-py",
        "scroll-ps",
        "scroll-pe",
        "scroll-pt",
        "scroll-pr",
        "scroll-pb",
        "scroll-pl",
      ],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"],
    },
    conflictingClassGroupModifiers: { "font-size": ["leading"] },
  };
}
const r2 = FE(n2);
function Ee(...e) {
  return r2(Rv(e));
}
const Dv = f.forwardRef(({ className: e, ...t }, n) =>
  N.jsx(Sv, {
    ref: n,
    className: Ee(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      e
    ),
    ...t,
  })
);
Dv.displayName = Sv.displayName;
const Ov = f.forwardRef(({ className: e, ...t }, n) =>
  N.jsx(Cv, { ref: n, className: Ee("aspect-square h-full w-full", e), ...t })
);
Ov.displayName = Cv.displayName;
const Mv = f.forwardRef(({ className: e, ...t }, n) =>
  N.jsx($v, {
    ref: n,
    className: Ee(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      e
    ),
    ...t,
  })
);
Mv.displayName = $v.displayName;
function Lv(e) {
  var t,
    n,
    r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (n = Lv(e[t])) && (r && (r += " "), (r += n));
    else for (t in e) e[t] && (r && (r += " "), (r += t));
  return r;
}
function o2() {
  for (var e, t, n = 0, r = ""; n < arguments.length; )
    (e = arguments[n++]) && (t = Lv(e)) && (r && (r += " "), (r += t));
  return r;
}
const Gp = (e) => (typeof e == "boolean" ? "".concat(e) : e === 0 ? "0" : e),
  Yp = o2,
  i2 = (e, t) => (n) => {
    var r;
    if ((t == null ? void 0 : t.variants) == null)
      return Yp(
        e,
        n == null ? void 0 : n.class,
        n == null ? void 0 : n.className
      );
    const { variants: o, defaultVariants: i } = t,
      a = Object.keys(o).map((c) => {
        const d = n == null ? void 0 : n[c],
          u = i == null ? void 0 : i[c];
        if (d === null) return null;
        const p = Gp(d) || Gp(u);
        return o[c][p];
      }),
      l =
        n &&
        Object.entries(n).reduce((c, d) => {
          let [u, p] = d;
          return p === void 0 || (c[u] = p), c;
        }, {}),
      s =
        t == null || (r = t.compoundVariants) === null || r === void 0
          ? void 0
          : r.reduce((c, d) => {
              let { class: u, className: p, ...y } = d;
              return Object.entries(y).every((v) => {
                let [g, x] = v;
                return Array.isArray(x)
                  ? x.includes({ ...i, ...l }[g])
                  : { ...i, ...l }[g] === x;
              })
                ? [...c, u, p]
                : c;
            }, []);
    return Yp(
      e,
      a,
      s,
      n == null ? void 0 : n.class,
      n == null ? void 0 : n.className
    );
  },
  Iv = ({ className: e }) =>
    N.jsx("svg", {
      viewBox: "0 0 25 25",
      className: Rv("h-[1.2rem] w-[1.2rem] mr-1 fill-zinc-50", e),
      xmlns: "http://www.w3.org/2000/svg",
      children: N.jsxs("g", {
        children: [
          N.jsx("rect", {
            x: "11",
            y: "1",
            width: "2",
            height: "5",
            opacity: ".14",
          }),
          N.jsx("rect", {
            x: "11",
            y: "1",
            width: "2",
            height: "5",
            transform: "rotate(30 12 12)",
            opacity: ".29",
          }),
          N.jsx("rect", {
            x: "11",
            y: "1",
            width: "2",
            height: "5",
            transform: "rotate(60 12 12)",
            opacity: ".43",
          }),
          N.jsx("rect", {
            x: "11",
            y: "1",
            width: "2",
            height: "5",
            transform: "rotate(90 12 12)",
            opacity: ".57",
          }),
          N.jsx("rect", {
            x: "11",
            y: "1",
            width: "2",
            height: "5",
            transform: "rotate(120 12 12)",
            opacity: ".71",
          }),
          N.jsx("rect", {
            x: "11",
            y: "1",
            width: "2",
            height: "5",
            transform: "rotate(150 12 12)",
            opacity: ".86",
          }),
          N.jsx("rect", {
            x: "11",
            y: "1",
            width: "2",
            height: "5",
            transform: "rotate(180 12 12)",
          }),
          N.jsx("animateTransform", {
            attributeName: "transform",
            type: "rotate",
            calcMode: "discrete",
            dur: "0.75s",
            values:
              "0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12",
            repeatCount: "indefinite",
          }),
        ],
      }),
    }),
  Ud = i2(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
      variants: {
        variant: {
          default: "bg-primary text-primary-foreground hover:bg-primary/90",
          destructive:
            "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          outline:
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          secondary:
            "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          ghost: "hover:bg-accent hover:text-accent-foreground",
          link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
          default: "h-10 px-4 py-2",
          sm: "h-9 rounded-md px-3",
          lg: "h-11 rounded-md px-8",
          icon: "h-10 w-10",
        },
      },
      defaultVariants: { variant: "default", size: "default" },
    }
  ),
  Bd = f.forwardRef(
    (
      { className: e, variant: t, size: n, loading: r, asChild: o = !1, ...i },
      a
    ) => {
      const l = o ? co : "button";
      return N.jsx(l, {
        className: Ee(Ud({ variant: t, size: n, className: e })),
        ref: a,
        ...i,
        disabled: i.disabled || r,
        children: N.jsxs(N.Fragment, {
          children: [r && N.jsx(Iv, {}), i.children],
        }),
      });
    }
  );
Bd.displayName = "Button";
function le(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function (o) {
    if ((e == null || e(o), n === !1 || !o.defaultPrevented))
      return t == null ? void 0 : t(o);
  };
}
function ps({ prop: e, defaultProp: t, onChange: n = () => {} }) {
  const [r, o] = a2({ defaultProp: t, onChange: n }),
    i = e !== void 0,
    a = i ? e : r,
    l = wn(n),
    s = f.useCallback(
      (c) => {
        if (i) {
          const u = typeof c == "function" ? c(e) : c;
          u !== e && l(u);
        } else o(c);
      },
      [i, e, o, l]
    );
  return [a, s];
}
function a2({ defaultProp: e, onChange: t }) {
  const n = f.useState(e),
    [r] = n,
    o = f.useRef(r),
    i = wn(t);
  return (
    f.useEffect(() => {
      o.current !== r && (i(r), (o.current = r));
    }, [r, o, i]),
    n
  );
}
function Fv(e) {
  const t = e + "CollectionProvider",
    [n, r] = or(t),
    [o, i] = n(t, { collectionRef: { current: null }, itemMap: new Map() }),
    a = (y) => {
      const { scope: v, children: g } = y,
        x = F.useRef(null),
        m = F.useRef(new Map()).current;
      return F.createElement(o, { scope: v, itemMap: m, collectionRef: x }, g);
    },
    l = e + "CollectionSlot",
    s = F.forwardRef((y, v) => {
      const { scope: g, children: x } = y,
        m = i(l, g),
        h = ct(v, m.collectionRef);
      return F.createElement(co, { ref: h }, x);
    }),
    c = e + "CollectionItemSlot",
    d = "data-radix-collection-item",
    u = F.forwardRef((y, v) => {
      const { scope: g, children: x, ...m } = y,
        h = F.useRef(null),
        w = ct(v, h),
        E = i(c, g);
      return (
        F.useEffect(
          () => (
            E.itemMap.set(h, { ref: h, ...m }), () => void E.itemMap.delete(h)
          )
        ),
        F.createElement(co, { [d]: "", ref: w }, x)
      );
    });
  function p(y) {
    const v = i(e + "CollectionConsumer", y);
    return F.useCallback(() => {
      const x = v.collectionRef.current;
      if (!x) return [];
      const m = Array.from(x.querySelectorAll(`[${d}]`));
      return Array.from(v.itemMap.values()).sort(
        (E, $) => m.indexOf(E.ref.current) - m.indexOf($.ref.current)
      );
    }, [v.collectionRef, v.itemMap]);
  }
  return [{ Provider: a, Slot: s, ItemSlot: u }, p, r];
}
const l2 = f.createContext(void 0);
function Hd(e) {
  const t = f.useContext(l2);
  return e || t || "ltr";
}
function s2(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = wn(e);
  f.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return (
      t.addEventListener("keydown", r),
      () => t.removeEventListener("keydown", r)
    );
  }, [n, t]);
}
const bu = "dismissableLayer.update",
  c2 = "dismissableLayer.pointerDownOutside",
  u2 = "dismissableLayer.focusOutside";
let Qp;
const d2 = f.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  zv = f.forwardRef((e, t) => {
    var n;
    const {
        disableOutsidePointerEvents: r = !1,
        onEscapeKeyDown: o,
        onPointerDownOutside: i,
        onFocusOutside: a,
        onInteractOutside: l,
        onDismiss: s,
        ...c
      } = e,
      d = f.useContext(d2),
      [u, p] = f.useState(null),
      y =
        (n = u == null ? void 0 : u.ownerDocument) !== null && n !== void 0
          ? n
          : globalThis == null
          ? void 0
          : globalThis.document,
      [, v] = f.useState({}),
      g = ct(t, (k) => p(k)),
      x = Array.from(d.layers),
      [m] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1),
      h = x.indexOf(m),
      w = u ? x.indexOf(u) : -1,
      E = d.layersWithOutsidePointerEventsDisabled.size > 0,
      $ = w >= h,
      b = f2((k) => {
        const O = k.target,
          M = [...d.branches].some((K) => K.contains(O));
        !$ ||
          M ||
          (i == null || i(k),
          l == null || l(k),
          k.defaultPrevented || s == null || s());
      }, y),
      _ = p2((k) => {
        const O = k.target;
        [...d.branches].some((K) => K.contains(O)) ||
          (a == null || a(k),
          l == null || l(k),
          k.defaultPrevented || s == null || s());
      }, y);
    return (
      s2((k) => {
        w === d.layers.size - 1 &&
          (o == null || o(k),
          !k.defaultPrevented && s && (k.preventDefault(), s()));
      }, y),
      f.useEffect(() => {
        if (u)
          return (
            r &&
              (d.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((Qp = y.body.style.pointerEvents),
                (y.body.style.pointerEvents = "none")),
              d.layersWithOutsidePointerEventsDisabled.add(u)),
            d.layers.add(u),
            Xp(),
            () => {
              r &&
                d.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (y.body.style.pointerEvents = Qp);
            }
          );
      }, [u, y, r, d]),
      f.useEffect(
        () => () => {
          u &&
            (d.layers.delete(u),
            d.layersWithOutsidePointerEventsDisabled.delete(u),
            Xp());
        },
        [u, d]
      ),
      f.useEffect(() => {
        const k = () => v({});
        return (
          document.addEventListener(bu, k),
          () => document.removeEventListener(bu, k)
        );
      }, []),
      f.createElement(
        De.div,
        V({}, c, {
          ref: g,
          style: {
            pointerEvents: E ? ($ ? "auto" : "none") : void 0,
            ...e.style,
          },
          onFocusCapture: le(e.onFocusCapture, _.onFocusCapture),
          onBlurCapture: le(e.onBlurCapture, _.onBlurCapture),
          onPointerDownCapture: le(
            e.onPointerDownCapture,
            b.onPointerDownCapture
          ),
        })
      )
    );
  });
function f2(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = wn(e),
    r = f.useRef(!1),
    o = f.useRef(() => {});
  return (
    f.useEffect(() => {
      const i = (l) => {
          if (l.target && !r.current) {
            let c = function () {
              jv(c2, n, s, { discrete: !0 });
            };
            const s = { originalEvent: l };
            l.pointerType === "touch"
              ? (t.removeEventListener("click", o.current),
                (o.current = c),
                t.addEventListener("click", o.current, { once: !0 }))
              : c();
          } else t.removeEventListener("click", o.current);
          r.current = !1;
        },
        a = window.setTimeout(() => {
          t.addEventListener("pointerdown", i);
        }, 0);
      return () => {
        window.clearTimeout(a),
          t.removeEventListener("pointerdown", i),
          t.removeEventListener("click", o.current);
      };
    }, [t, n]),
    { onPointerDownCapture: () => (r.current = !0) }
  );
}
function p2(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = wn(e),
    r = f.useRef(!1);
  return (
    f.useEffect(() => {
      const o = (i) => {
        i.target &&
          !r.current &&
          jv(u2, n, { originalEvent: i }, { discrete: !1 });
      };
      return (
        t.addEventListener("focusin", o),
        () => t.removeEventListener("focusin", o)
      );
    }, [t, n]),
    {
      onFocusCapture: () => (r.current = !0),
      onBlurCapture: () => (r.current = !1),
    }
  );
}
function Xp() {
  const e = new CustomEvent(bu);
  document.dispatchEvent(e);
}
function jv(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target,
    i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }),
    r ? xv(o, i) : o.dispatchEvent(i);
}
let rc = 0;
function Uv() {
  f.useEffect(() => {
    var e, t;
    const n = document.querySelectorAll("[data-radix-focus-guard]");
    return (
      document.body.insertAdjacentElement(
        "afterbegin",
        (e = n[0]) !== null && e !== void 0 ? e : qp()
      ),
      document.body.insertAdjacentElement(
        "beforeend",
        (t = n[1]) !== null && t !== void 0 ? t : qp()
      ),
      rc++,
      () => {
        rc === 1 &&
          document
            .querySelectorAll("[data-radix-focus-guard]")
            .forEach((r) => r.remove()),
          rc--;
      }
    );
  }, []);
}
function qp() {
  const e = document.createElement("span");
  return (
    e.setAttribute("data-radix-focus-guard", ""),
    (e.tabIndex = 0),
    (e.style.cssText =
      "outline: none; opacity: 0; position: fixed; pointer-events: none"),
    e
  );
}
const oc = "focusScope.autoFocusOnMount",
  ic = "focusScope.autoFocusOnUnmount",
  Zp = { bubbles: !1, cancelable: !0 },
  Bv = f.forwardRef((e, t) => {
    const {
        loop: n = !1,
        trapped: r = !1,
        onMountAutoFocus: o,
        onUnmountAutoFocus: i,
        ...a
      } = e,
      [l, s] = f.useState(null),
      c = wn(o),
      d = wn(i),
      u = f.useRef(null),
      p = ct(t, (g) => s(g)),
      y = f.useRef({
        paused: !1,
        pause() {
          this.paused = !0;
        },
        resume() {
          this.paused = !1;
        },
      }).current;
    f.useEffect(() => {
      if (r) {
        let g = function (w) {
            if (y.paused || !l) return;
            const E = w.target;
            l.contains(E) ? (u.current = E) : gr(u.current, { select: !0 });
          },
          x = function (w) {
            if (y.paused || !l) return;
            const E = w.relatedTarget;
            E !== null && (l.contains(E) || gr(u.current, { select: !0 }));
          },
          m = function (w) {
            if (document.activeElement === document.body)
              for (const $ of w) $.removedNodes.length > 0 && gr(l);
          };
        document.addEventListener("focusin", g),
          document.addEventListener("focusout", x);
        const h = new MutationObserver(m);
        return (
          l && h.observe(l, { childList: !0, subtree: !0 }),
          () => {
            document.removeEventListener("focusin", g),
              document.removeEventListener("focusout", x),
              h.disconnect();
          }
        );
      }
    }, [r, l, y.paused]),
      f.useEffect(() => {
        if (l) {
          em.add(y);
          const g = document.activeElement;
          if (!l.contains(g)) {
            const m = new CustomEvent(oc, Zp);
            l.addEventListener(oc, c),
              l.dispatchEvent(m),
              m.defaultPrevented ||
                (m2(w2(Hv(l)), { select: !0 }),
                document.activeElement === g && gr(l));
          }
          return () => {
            l.removeEventListener(oc, c),
              setTimeout(() => {
                const m = new CustomEvent(ic, Zp);
                l.addEventListener(ic, d),
                  l.dispatchEvent(m),
                  m.defaultPrevented || gr(g ?? document.body, { select: !0 }),
                  l.removeEventListener(ic, d),
                  em.remove(y);
              }, 0);
          };
        }
      }, [l, c, d, y]);
    const v = f.useCallback(
      (g) => {
        if ((!n && !r) || y.paused) return;
        const x = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey,
          m = document.activeElement;
        if (x && m) {
          const h = g.currentTarget,
            [w, E] = h2(h);
          w && E
            ? !g.shiftKey && m === E
              ? (g.preventDefault(), n && gr(w, { select: !0 }))
              : g.shiftKey &&
                m === w &&
                (g.preventDefault(), n && gr(E, { select: !0 }))
            : m === h && g.preventDefault();
        }
      },
      [n, r, y.paused]
    );
    return f.createElement(
      De.div,
      V({ tabIndex: -1 }, a, { ref: p, onKeyDown: v })
    );
  });
function m2(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if ((gr(r, { select: t }), document.activeElement !== n)) return;
}
function h2(e) {
  const t = Hv(e),
    n = Jp(t, e),
    r = Jp(t.reverse(), e);
  return [n, r];
}
function Hv(e) {
  const t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (r) => {
        const o = r.tagName === "INPUT" && r.type === "hidden";
        return r.disabled || r.hidden || o
          ? NodeFilter.FILTER_SKIP
          : r.tabIndex >= 0
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP;
      },
    });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Jp(e, t) {
  for (const n of e) if (!g2(n, { upTo: t })) return n;
}
function g2(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function v2(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function gr(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && v2(e) && t && e.select();
  }
}
const em = y2();
function y2() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), (e = tm(e, t)), e.unshift(t);
    },
    remove(t) {
      var n;
      (e = tm(e, t)), (n = e[0]) === null || n === void 0 || n.resume();
    },
  };
}
function tm(e, t) {
  const n = [...e],
    r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function w2(e) {
  return e.filter((t) => t.tagName !== "A");
}
const x2 = Xm.useId || (() => {});
let b2 = 0;
function no(e) {
  const [t, n] = f.useState(x2());
  return (
    Or(() => {
      e || n((r) => r ?? String(b2++));
    }, [e]),
    e || (t ? `radix-${t}` : "")
  );
}
const E2 = ["top", "right", "bottom", "left"],
  Mr = Math.min,
  Ft = Math.max,
  Bl = Math.round,
  Ba = Math.floor,
  Lr = (e) => ({ x: e, y: e }),
  S2 = { left: "right", right: "left", bottom: "top", top: "bottom" },
  C2 = { start: "end", end: "start" };
function Eu(e, t, n) {
  return Ft(e, Mr(t, n));
}
function er(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function tr(e) {
  return e.split("-")[0];
}
function oi(e) {
  return e.split("-")[1];
}
function Vd(e) {
  return e === "x" ? "y" : "x";
}
function Wd(e) {
  return e === "y" ? "height" : "width";
}
function ii(e) {
  return ["top", "bottom"].includes(tr(e)) ? "y" : "x";
}
function Kd(e) {
  return Vd(ii(e));
}
function $2(e, t, n) {
  n === void 0 && (n = !1);
  const r = oi(e),
    o = Kd(e),
    i = Wd(o);
  let a =
    o === "x"
      ? r === (n ? "end" : "start")
        ? "right"
        : "left"
      : r === "start"
      ? "bottom"
      : "top";
  return t.reference[i] > t.floating[i] && (a = Hl(a)), [a, Hl(a)];
}
function _2(e) {
  const t = Hl(e);
  return [Su(e), t, Su(t)];
}
function Su(e) {
  return e.replace(/start|end/g, (t) => C2[t]);
}
function R2(e, t, n) {
  const r = ["left", "right"],
    o = ["right", "left"],
    i = ["top", "bottom"],
    a = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? (t ? o : r) : t ? r : o;
    case "left":
    case "right":
      return t ? i : a;
    default:
      return [];
  }
}
function k2(e, t, n, r) {
  const o = oi(e);
  let i = R2(tr(e), n === "start", r);
  return (
    o && ((i = i.map((a) => a + "-" + o)), t && (i = i.concat(i.map(Su)))), i
  );
}
function Hl(e) {
  return e.replace(/left|right|bottom|top/g, (t) => S2[t]);
}
function T2(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function Vv(e) {
  return typeof e != "number"
    ? T2(e)
    : { top: e, right: e, bottom: e, left: e };
}
function Vl(e) {
  return {
    ...e,
    top: e.y,
    left: e.x,
    right: e.x + e.width,
    bottom: e.y + e.height,
  };
}
function nm(e, t, n) {
  let { reference: r, floating: o } = e;
  const i = ii(t),
    a = Kd(t),
    l = Wd(a),
    s = tr(t),
    c = i === "y",
    d = r.x + r.width / 2 - o.width / 2,
    u = r.y + r.height / 2 - o.height / 2,
    p = r[l] / 2 - o[l] / 2;
  let y;
  switch (s) {
    case "top":
      y = { x: d, y: r.y - o.height };
      break;
    case "bottom":
      y = { x: d, y: r.y + r.height };
      break;
    case "right":
      y = { x: r.x + r.width, y: u };
      break;
    case "left":
      y = { x: r.x - o.width, y: u };
      break;
    default:
      y = { x: r.x, y: r.y };
  }
  switch (oi(t)) {
    case "start":
      y[a] -= p * (n && c ? -1 : 1);
      break;
    case "end":
      y[a] += p * (n && c ? -1 : 1);
      break;
  }
  return y;
}
const P2 = async (e, t, n) => {
  const {
      placement: r = "bottom",
      strategy: o = "absolute",
      middleware: i = [],
      platform: a,
    } = n,
    l = i.filter(Boolean),
    s = await (a.isRTL == null ? void 0 : a.isRTL(t));
  let c = await a.getElementRects({ reference: e, floating: t, strategy: o }),
    { x: d, y: u } = nm(c, r, s),
    p = r,
    y = {},
    v = 0;
  for (let g = 0; g < l.length; g++) {
    const { name: x, fn: m } = l[g],
      {
        x: h,
        y: w,
        data: E,
        reset: $,
      } = await m({
        x: d,
        y: u,
        initialPlacement: r,
        placement: p,
        strategy: o,
        middlewareData: y,
        rects: c,
        platform: a,
        elements: { reference: e, floating: t },
      });
    (d = h ?? d),
      (u = w ?? u),
      (y = { ...y, [x]: { ...y[x], ...E } }),
      $ &&
        v <= 50 &&
        (v++,
        typeof $ == "object" &&
          ($.placement && (p = $.placement),
          $.rects &&
            (c =
              $.rects === !0
                ? await a.getElementRects({
                    reference: e,
                    floating: t,
                    strategy: o,
                  })
                : $.rects),
          ({ x: d, y: u } = nm(c, p, s))),
        (g = -1));
  }
  return { x: d, y: u, placement: p, strategy: o, middlewareData: y };
};
async function aa(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: r, y: o, platform: i, rects: a, elements: l, strategy: s } = e,
    {
      boundary: c = "clippingAncestors",
      rootBoundary: d = "viewport",
      elementContext: u = "floating",
      altBoundary: p = !1,
      padding: y = 0,
    } = er(t, e),
    v = Vv(y),
    x = l[p ? (u === "floating" ? "reference" : "floating") : u],
    m = Vl(
      await i.getClippingRect({
        element:
          (n = await (i.isElement == null ? void 0 : i.isElement(x))) == null ||
          n
            ? x
            : x.contextElement ||
              (await (i.getDocumentElement == null
                ? void 0
                : i.getDocumentElement(l.floating))),
        boundary: c,
        rootBoundary: d,
        strategy: s,
      })
    ),
    h = u === "floating" ? { ...a.floating, x: r, y: o } : a.reference,
    w = await (i.getOffsetParent == null
      ? void 0
      : i.getOffsetParent(l.floating)),
    E = (await (i.isElement == null ? void 0 : i.isElement(w)))
      ? (await (i.getScale == null ? void 0 : i.getScale(w))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    $ = Vl(
      i.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: l,
            rect: h,
            offsetParent: w,
            strategy: s,
          })
        : h
    );
  return {
    top: (m.top - $.top + v.top) / E.y,
    bottom: ($.bottom - m.bottom + v.bottom) / E.y,
    left: (m.left - $.left + v.left) / E.x,
    right: ($.right - m.right + v.right) / E.x,
  };
}
const N2 = (e) => ({
    name: "arrow",
    options: e,
    async fn(t) {
      const {
          x: n,
          y: r,
          placement: o,
          rects: i,
          platform: a,
          elements: l,
          middlewareData: s,
        } = t,
        { element: c, padding: d = 0 } = er(e, t) || {};
      if (c == null) return {};
      const u = Vv(d),
        p = { x: n, y: r },
        y = Kd(o),
        v = Wd(y),
        g = await a.getDimensions(c),
        x = y === "y",
        m = x ? "top" : "left",
        h = x ? "bottom" : "right",
        w = x ? "clientHeight" : "clientWidth",
        E = i.reference[v] + i.reference[y] - p[y] - i.floating[v],
        $ = p[y] - i.reference[y],
        b = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(c));
      let _ = b ? b[w] : 0;
      (!_ || !(await (a.isElement == null ? void 0 : a.isElement(b)))) &&
        (_ = l.floating[w] || i.floating[v]);
      const k = E / 2 - $ / 2,
        O = _ / 2 - g[v] / 2 - 1,
        M = Mr(u[m], O),
        K = Mr(u[h], O),
        z = M,
        ne = _ - g[v] - K,
        W = _ / 2 - g[v] / 2 + k,
        J = Eu(z, W, ne),
        ie =
          !s.arrow &&
          oi(o) != null &&
          W !== J &&
          i.reference[v] / 2 - (W < z ? M : K) - g[v] / 2 < 0,
        Q = ie ? (W < z ? W - z : W - ne) : 0;
      return {
        [y]: p[y] + Q,
        data: {
          [y]: J,
          centerOffset: W - J - Q,
          ...(ie && { alignmentOffset: Q }),
        },
        reset: ie,
      };
    },
  }),
  A2 = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "flip",
        options: e,
        async fn(t) {
          var n, r;
          const {
              placement: o,
              middlewareData: i,
              rects: a,
              initialPlacement: l,
              platform: s,
              elements: c,
            } = t,
            {
              mainAxis: d = !0,
              crossAxis: u = !0,
              fallbackPlacements: p,
              fallbackStrategy: y = "bestFit",
              fallbackAxisSideDirection: v = "none",
              flipAlignment: g = !0,
              ...x
            } = er(e, t);
          if ((n = i.arrow) != null && n.alignmentOffset) return {};
          const m = tr(o),
            h = tr(l) === l,
            w = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)),
            E = p || (h || !g ? [Hl(l)] : _2(l));
          !p && v !== "none" && E.push(...k2(l, g, v, w));
          const $ = [l, ...E],
            b = await aa(t, x),
            _ = [];
          let k = ((r = i.flip) == null ? void 0 : r.overflows) || [];
          if ((d && _.push(b[m]), u)) {
            const z = $2(o, a, w);
            _.push(b[z[0]], b[z[1]]);
          }
          if (
            ((k = [...k, { placement: o, overflows: _ }]),
            !_.every((z) => z <= 0))
          ) {
            var O, M;
            const z = (((O = i.flip) == null ? void 0 : O.index) || 0) + 1,
              ne = $[z];
            if (ne)
              return {
                data: { index: z, overflows: k },
                reset: { placement: ne },
              };
            let W =
              (M = k
                .filter((J) => J.overflows[0] <= 0)
                .sort((J, ie) => J.overflows[1] - ie.overflows[1])[0]) == null
                ? void 0
                : M.placement;
            if (!W)
              switch (y) {
                case "bestFit": {
                  var K;
                  const J =
                    (K = k
                      .map((ie) => [
                        ie.placement,
                        ie.overflows
                          .filter((Q) => Q > 0)
                          .reduce((Q, D) => Q + D, 0),
                      ])
                      .sort((ie, Q) => ie[1] - Q[1])[0]) == null
                      ? void 0
                      : K[0];
                  J && (W = J);
                  break;
                }
                case "initialPlacement":
                  W = l;
                  break;
              }
            if (o !== W) return { reset: { placement: W } };
          }
          return {};
        },
      }
    );
  };
function rm(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width,
  };
}
function om(e) {
  return E2.some((t) => e[t] >= 0);
}
const D2 = function (e) {
  return (
    e === void 0 && (e = {}),
    {
      name: "hide",
      options: e,
      async fn(t) {
        const { rects: n } = t,
          { strategy: r = "referenceHidden", ...o } = er(e, t);
        switch (r) {
          case "referenceHidden": {
            const i = await aa(t, { ...o, elementContext: "reference" }),
              a = rm(i, n.reference);
            return {
              data: { referenceHiddenOffsets: a, referenceHidden: om(a) },
            };
          }
          case "escaped": {
            const i = await aa(t, { ...o, altBoundary: !0 }),
              a = rm(i, n.floating);
            return { data: { escapedOffsets: a, escaped: om(a) } };
          }
          default:
            return {};
        }
      },
    }
  );
};
async function O2(e, t) {
  const { placement: n, platform: r, elements: o } = e,
    i = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)),
    a = tr(n),
    l = oi(n),
    s = ii(n) === "y",
    c = ["left", "top"].includes(a) ? -1 : 1,
    d = i && s ? -1 : 1,
    u = er(t, e);
  let {
    mainAxis: p,
    crossAxis: y,
    alignmentAxis: v,
  } = typeof u == "number"
    ? { mainAxis: u, crossAxis: 0, alignmentAxis: null }
    : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...u };
  return (
    l && typeof v == "number" && (y = l === "end" ? v * -1 : v),
    s ? { x: y * d, y: p * c } : { x: p * c, y: y * d }
  );
}
const M2 = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: "offset",
        options: e,
        async fn(t) {
          var n, r;
          const { x: o, y: i, placement: a, middlewareData: l } = t,
            s = await O2(t, e);
          return a === ((n = l.offset) == null ? void 0 : n.placement) &&
            (r = l.arrow) != null &&
            r.alignmentOffset
            ? {}
            : { x: o + s.x, y: i + s.y, data: { ...s, placement: a } };
        },
      }
    );
  },
  L2 = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "shift",
        options: e,
        async fn(t) {
          const { x: n, y: r, placement: o } = t,
            {
              mainAxis: i = !0,
              crossAxis: a = !1,
              limiter: l = {
                fn: (x) => {
                  let { x: m, y: h } = x;
                  return { x: m, y: h };
                },
              },
              ...s
            } = er(e, t),
            c = { x: n, y: r },
            d = await aa(t, s),
            u = ii(tr(o)),
            p = Vd(u);
          let y = c[p],
            v = c[u];
          if (i) {
            const x = p === "y" ? "top" : "left",
              m = p === "y" ? "bottom" : "right",
              h = y + d[x],
              w = y - d[m];
            y = Eu(h, y, w);
          }
          if (a) {
            const x = u === "y" ? "top" : "left",
              m = u === "y" ? "bottom" : "right",
              h = v + d[x],
              w = v - d[m];
            v = Eu(h, v, w);
          }
          const g = l.fn({ ...t, [p]: y, [u]: v });
          return { ...g, data: { x: g.x - n, y: g.y - r } };
        },
      }
    );
  },
  I2 = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(t) {
          const { x: n, y: r, placement: o, rects: i, middlewareData: a } = t,
            { offset: l = 0, mainAxis: s = !0, crossAxis: c = !0 } = er(e, t),
            d = { x: n, y: r },
            u = ii(o),
            p = Vd(u);
          let y = d[p],
            v = d[u];
          const g = er(l, t),
            x =
              typeof g == "number"
                ? { mainAxis: g, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...g };
          if (s) {
            const w = p === "y" ? "height" : "width",
              E = i.reference[p] - i.floating[w] + x.mainAxis,
              $ = i.reference[p] + i.reference[w] - x.mainAxis;
            y < E ? (y = E) : y > $ && (y = $);
          }
          if (c) {
            var m, h;
            const w = p === "y" ? "width" : "height",
              E = ["top", "left"].includes(tr(o)),
              $ =
                i.reference[u] -
                i.floating[w] +
                ((E && ((m = a.offset) == null ? void 0 : m[u])) || 0) +
                (E ? 0 : x.crossAxis),
              b =
                i.reference[u] +
                i.reference[w] +
                (E ? 0 : ((h = a.offset) == null ? void 0 : h[u]) || 0) -
                (E ? x.crossAxis : 0);
            v < $ ? (v = $) : v > b && (v = b);
          }
          return { [p]: y, [u]: v };
        },
      }
    );
  },
  F2 = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "size",
        options: e,
        async fn(t) {
          const { placement: n, rects: r, platform: o, elements: i } = t,
            { apply: a = () => {}, ...l } = er(e, t),
            s = await aa(t, l),
            c = tr(n),
            d = oi(n),
            u = ii(n) === "y",
            { width: p, height: y } = r.floating;
          let v, g;
          c === "top" || c === "bottom"
            ? ((v = c),
              (g =
                d ===
                ((await (o.isRTL == null ? void 0 : o.isRTL(i.floating)))
                  ? "start"
                  : "end")
                  ? "left"
                  : "right"))
            : ((g = c), (v = d === "end" ? "top" : "bottom"));
          const x = y - s[v],
            m = p - s[g],
            h = !t.middlewareData.shift;
          let w = x,
            E = m;
          if (u) {
            const b = p - s.left - s.right;
            E = d || h ? Mr(m, b) : b;
          } else {
            const b = y - s.top - s.bottom;
            w = d || h ? Mr(x, b) : b;
          }
          if (h && !d) {
            const b = Ft(s.left, 0),
              _ = Ft(s.right, 0),
              k = Ft(s.top, 0),
              O = Ft(s.bottom, 0);
            u
              ? (E = p - 2 * (b !== 0 || _ !== 0 ? b + _ : Ft(s.left, s.right)))
              : (w =
                  y - 2 * (k !== 0 || O !== 0 ? k + O : Ft(s.top, s.bottom)));
          }
          await a({ ...t, availableWidth: E, availableHeight: w });
          const $ = await o.getDimensions(i.floating);
          return p !== $.width || y !== $.height
            ? { reset: { rects: !0 } }
            : {};
        },
      }
    );
  };
function Ir(e) {
  return Wv(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Ut(e) {
  var t;
  return (
    (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) ||
    window
  );
}
function ir(e) {
  var t;
  return (t = (Wv(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : t.documentElement;
}
function Wv(e) {
  return e instanceof Node || e instanceof Ut(e).Node;
}
function nr(e) {
  return e instanceof Element || e instanceof Ut(e).Element;
}
function An(e) {
  return e instanceof HTMLElement || e instanceof Ut(e).HTMLElement;
}
function im(e) {
  return typeof ShadowRoot > "u"
    ? !1
    : e instanceof ShadowRoot || e instanceof Ut(e).ShadowRoot;
}
function wa(e) {
  const { overflow: t, overflowX: n, overflowY: r, display: o } = tn(e);
  return (
    /auto|scroll|overlay|hidden|clip/.test(t + r + n) &&
    !["inline", "contents"].includes(o)
  );
}
function z2(e) {
  return ["table", "td", "th"].includes(Ir(e));
}
function Gd(e) {
  const t = Yd(),
    n = tn(e);
  return (
    n.transform !== "none" ||
    n.perspective !== "none" ||
    (n.containerType ? n.containerType !== "normal" : !1) ||
    (!t && (n.backdropFilter ? n.backdropFilter !== "none" : !1)) ||
    (!t && (n.filter ? n.filter !== "none" : !1)) ||
    ["transform", "perspective", "filter"].some((r) =>
      (n.willChange || "").includes(r)
    ) ||
    ["paint", "layout", "strict", "content"].some((r) =>
      (n.contain || "").includes(r)
    )
  );
}
function Kv(e) {
  let t = Xo(e);
  for (; An(t) && !ms(t); ) {
    if (Gd(t)) return t;
    t = Xo(t);
  }
  return null;
}
function Yd() {
  return typeof CSS > "u" || !CSS.supports
    ? !1
    : CSS.supports("-webkit-backdrop-filter", "none");
}
function ms(e) {
  return ["html", "body", "#document"].includes(Ir(e));
}
function tn(e) {
  return Ut(e).getComputedStyle(e);
}
function hs(e) {
  return nr(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
}
function Xo(e) {
  if (Ir(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || (im(e) && e.host) || ir(e);
  return im(t) ? t.host : t;
}
function Gv(e) {
  const t = Xo(e);
  return ms(t)
    ? e.ownerDocument
      ? e.ownerDocument.body
      : e.body
    : An(t) && wa(t)
    ? t
    : Gv(t);
}
function la(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Gv(e),
    i = o === ((r = e.ownerDocument) == null ? void 0 : r.body),
    a = Ut(o);
  return i
    ? t.concat(
        a,
        a.visualViewport || [],
        wa(o) ? o : [],
        a.frameElement && n ? la(a.frameElement) : []
      )
    : t.concat(o, la(o, [], n));
}
function Yv(e) {
  const t = tn(e);
  let n = parseFloat(t.width) || 0,
    r = parseFloat(t.height) || 0;
  const o = An(e),
    i = o ? e.offsetWidth : n,
    a = o ? e.offsetHeight : r,
    l = Bl(n) !== i || Bl(r) !== a;
  return l && ((n = i), (r = a)), { width: n, height: r, $: l };
}
function Qd(e) {
  return nr(e) ? e : e.contextElement;
}
function Uo(e) {
  const t = Qd(e);
  if (!An(t)) return Lr(1);
  const n = t.getBoundingClientRect(),
    { width: r, height: o, $: i } = Yv(t);
  let a = (i ? Bl(n.width) : n.width) / r,
    l = (i ? Bl(n.height) : n.height) / o;
  return (
    (!a || !Number.isFinite(a)) && (a = 1),
    (!l || !Number.isFinite(l)) && (l = 1),
    { x: a, y: l }
  );
}
const j2 = Lr(0);
function Qv(e) {
  const t = Ut(e);
  return !Yd() || !t.visualViewport
    ? j2
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function U2(e, t, n) {
  return t === void 0 && (t = !1), !n || (t && n !== Ut(e)) ? !1 : t;
}
function uo(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(),
    i = Qd(e);
  let a = Lr(1);
  t && (r ? nr(r) && (a = Uo(r)) : (a = Uo(e)));
  const l = U2(i, n, r) ? Qv(i) : Lr(0);
  let s = (o.left + l.x) / a.x,
    c = (o.top + l.y) / a.y,
    d = o.width / a.x,
    u = o.height / a.y;
  if (i) {
    const p = Ut(i),
      y = r && nr(r) ? Ut(r) : r;
    let v = p.frameElement;
    for (; v && r && y !== p; ) {
      const g = Uo(v),
        x = v.getBoundingClientRect(),
        m = tn(v),
        h = x.left + (v.clientLeft + parseFloat(m.paddingLeft)) * g.x,
        w = x.top + (v.clientTop + parseFloat(m.paddingTop)) * g.y;
      (s *= g.x),
        (c *= g.y),
        (d *= g.x),
        (u *= g.y),
        (s += h),
        (c += w),
        (v = Ut(v).frameElement);
    }
  }
  return Vl({ width: d, height: u, x: s, y: c });
}
const B2 = [":popover-open", ":modal"];
function Xv(e) {
  let t = !1,
    n = 0,
    r = 0;
  function o(i) {
    try {
      t = t || e.matches(i);
    } catch {}
  }
  if (
    (B2.forEach((i) => {
      o(i);
    }),
    t)
  ) {
    const i = Kv(e);
    if (i) {
      const a = i.getBoundingClientRect();
      (n = a.x), (r = a.y);
    }
  }
  return [t, n, r];
}
function H2(e) {
  let { elements: t, rect: n, offsetParent: r, strategy: o } = e;
  const i = ir(r),
    [a] = t ? Xv(t.floating) : [!1];
  if (r === i || a) return n;
  let l = { scrollLeft: 0, scrollTop: 0 },
    s = Lr(1);
  const c = Lr(0),
    d = An(r);
  if (
    (d || (!d && o !== "fixed")) &&
    ((Ir(r) !== "body" || wa(i)) && (l = hs(r)), An(r))
  ) {
    const u = uo(r);
    (s = Uo(r)), (c.x = u.x + r.clientLeft), (c.y = u.y + r.clientTop);
  }
  return {
    width: n.width * s.x,
    height: n.height * s.y,
    x: n.x * s.x - l.scrollLeft * s.x + c.x,
    y: n.y * s.y - l.scrollTop * s.y + c.y,
  };
}
function V2(e) {
  return Array.from(e.getClientRects());
}
function qv(e) {
  return uo(ir(e)).left + hs(e).scrollLeft;
}
function W2(e) {
  const t = ir(e),
    n = hs(e),
    r = e.ownerDocument.body,
    o = Ft(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
    i = Ft(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -n.scrollLeft + qv(e);
  const l = -n.scrollTop;
  return (
    tn(r).direction === "rtl" && (a += Ft(t.clientWidth, r.clientWidth) - o),
    { width: o, height: i, x: a, y: l }
  );
}
function K2(e, t) {
  const n = Ut(e),
    r = ir(e),
    o = n.visualViewport;
  let i = r.clientWidth,
    a = r.clientHeight,
    l = 0,
    s = 0;
  if (o) {
    (i = o.width), (a = o.height);
    const c = Yd();
    (!c || (c && t === "fixed")) && ((l = o.offsetLeft), (s = o.offsetTop));
  }
  return { width: i, height: a, x: l, y: s };
}
function G2(e, t) {
  const n = uo(e, !0, t === "fixed"),
    r = n.top + e.clientTop,
    o = n.left + e.clientLeft,
    i = An(e) ? Uo(e) : Lr(1),
    a = e.clientWidth * i.x,
    l = e.clientHeight * i.y,
    s = o * i.x,
    c = r * i.y;
  return { width: a, height: l, x: s, y: c };
}
function am(e, t, n) {
  let r;
  if (t === "viewport") r = K2(e, n);
  else if (t === "document") r = W2(ir(e));
  else if (nr(t)) r = G2(t, n);
  else {
    const o = Qv(e);
    r = { ...t, x: t.x - o.x, y: t.y - o.y };
  }
  return Vl(r);
}
function Zv(e, t) {
  const n = Xo(e);
  return n === t || !nr(n) || ms(n)
    ? !1
    : tn(n).position === "fixed" || Zv(n, t);
}
function Y2(e, t) {
  const n = t.get(e);
  if (n) return n;
  let r = la(e, [], !1).filter((l) => nr(l) && Ir(l) !== "body"),
    o = null;
  const i = tn(e).position === "fixed";
  let a = i ? Xo(e) : e;
  for (; nr(a) && !ms(a); ) {
    const l = tn(a),
      s = Gd(a);
    !s && l.position === "fixed" && (o = null),
      (
        i
          ? !s && !o
          : (!s &&
              l.position === "static" &&
              !!o &&
              ["absolute", "fixed"].includes(o.position)) ||
            (wa(a) && !s && Zv(e, a))
      )
        ? (r = r.filter((d) => d !== a))
        : (o = l),
      (a = Xo(a));
  }
  return t.set(e, r), r;
}
function Q2(e) {
  let { element: t, boundary: n, rootBoundary: r, strategy: o } = e;
  const a = [...(n === "clippingAncestors" ? Y2(t, this._c) : [].concat(n)), r],
    l = a[0],
    s = a.reduce((c, d) => {
      const u = am(t, d, o);
      return (
        (c.top = Ft(u.top, c.top)),
        (c.right = Mr(u.right, c.right)),
        (c.bottom = Mr(u.bottom, c.bottom)),
        (c.left = Ft(u.left, c.left)),
        c
      );
    }, am(t, l, o));
  return {
    width: s.right - s.left,
    height: s.bottom - s.top,
    x: s.left,
    y: s.top,
  };
}
function X2(e) {
  const { width: t, height: n } = Yv(e);
  return { width: t, height: n };
}
function q2(e, t, n, r) {
  const o = An(t),
    i = ir(t),
    a = n === "fixed",
    l = uo(e, !0, a, t);
  let s = { scrollLeft: 0, scrollTop: 0 };
  const c = Lr(0);
  if (o || (!o && !a))
    if (((Ir(t) !== "body" || wa(i)) && (s = hs(t)), o)) {
      const g = uo(t, !0, a, t);
      (c.x = g.x + t.clientLeft), (c.y = g.y + t.clientTop);
    } else i && (c.x = qv(i));
  let d = l.left + s.scrollLeft - c.x,
    u = l.top + s.scrollTop - c.y;
  const [p, y, v] = Xv(r);
  return (
    p && ((d += y), (u += v), o && ((d += t.clientLeft), (u += t.clientTop))),
    { x: d, y: u, width: l.width, height: l.height }
  );
}
function lm(e, t) {
  return !An(e) || tn(e).position === "fixed"
    ? null
    : t
    ? t(e)
    : e.offsetParent;
}
function Jv(e, t) {
  const n = Ut(e);
  if (!An(e)) return n;
  let r = lm(e, t);
  for (; r && z2(r) && tn(r).position === "static"; ) r = lm(r, t);
  return r &&
    (Ir(r) === "html" ||
      (Ir(r) === "body" && tn(r).position === "static" && !Gd(r)))
    ? n
    : r || Kv(e) || n;
}
const Z2 = async function (e) {
  const t = this.getOffsetParent || Jv,
    n = this.getDimensions;
  return {
    reference: q2(e.reference, await t(e.floating), e.strategy, e.floating),
    floating: { x: 0, y: 0, ...(await n(e.floating)) },
  };
};
function J2(e) {
  return tn(e).direction === "rtl";
}
const eS = {
  convertOffsetParentRelativeRectToViewportRelativeRect: H2,
  getDocumentElement: ir,
  getClippingRect: Q2,
  getOffsetParent: Jv,
  getElementRects: Z2,
  getClientRects: V2,
  getDimensions: X2,
  getScale: Uo,
  isElement: nr,
  isRTL: J2,
};
function tS(e, t) {
  let n = null,
    r;
  const o = ir(e);
  function i() {
    var l;
    clearTimeout(r), (l = n) == null || l.disconnect(), (n = null);
  }
  function a(l, s) {
    l === void 0 && (l = !1), s === void 0 && (s = 1), i();
    const { left: c, top: d, width: u, height: p } = e.getBoundingClientRect();
    if ((l || t(), !u || !p)) return;
    const y = Ba(d),
      v = Ba(o.clientWidth - (c + u)),
      g = Ba(o.clientHeight - (d + p)),
      x = Ba(c),
      h = {
        rootMargin: -y + "px " + -v + "px " + -g + "px " + -x + "px",
        threshold: Ft(0, Mr(1, s)) || 1,
      };
    let w = !0;
    function E($) {
      const b = $[0].intersectionRatio;
      if (b !== s) {
        if (!w) return a();
        b
          ? a(!1, b)
          : (r = setTimeout(() => {
              a(!1, 1e-7);
            }, 100));
      }
      w = !1;
    }
    try {
      n = new IntersectionObserver(E, { ...h, root: o.ownerDocument });
    } catch {
      n = new IntersectionObserver(E, h);
    }
    n.observe(e);
  }
  return a(!0), i;
}
function nS(e, t, n, r) {
  r === void 0 && (r = {});
  const {
      ancestorScroll: o = !0,
      ancestorResize: i = !0,
      elementResize: a = typeof ResizeObserver == "function",
      layoutShift: l = typeof IntersectionObserver == "function",
      animationFrame: s = !1,
    } = r,
    c = Qd(e),
    d = o || i ? [...(c ? la(c) : []), ...la(t)] : [];
  d.forEach((m) => {
    o && m.addEventListener("scroll", n, { passive: !0 }),
      i && m.addEventListener("resize", n);
  });
  const u = c && l ? tS(c, n) : null;
  let p = -1,
    y = null;
  a &&
    ((y = new ResizeObserver((m) => {
      let [h] = m;
      h &&
        h.target === c &&
        y &&
        (y.unobserve(t),
        cancelAnimationFrame(p),
        (p = requestAnimationFrame(() => {
          var w;
          (w = y) == null || w.observe(t);
        }))),
        n();
    })),
    c && !s && y.observe(c),
    y.observe(t));
  let v,
    g = s ? uo(e) : null;
  s && x();
  function x() {
    const m = uo(e);
    g &&
      (m.x !== g.x ||
        m.y !== g.y ||
        m.width !== g.width ||
        m.height !== g.height) &&
      n(),
      (g = m),
      (v = requestAnimationFrame(x));
  }
  return (
    n(),
    () => {
      var m;
      d.forEach((h) => {
        o && h.removeEventListener("scroll", n),
          i && h.removeEventListener("resize", n);
      }),
        u == null || u(),
        (m = y) == null || m.disconnect(),
        (y = null),
        s && cancelAnimationFrame(v);
    }
  );
}
const rS = L2,
  oS = A2,
  iS = F2,
  aS = D2,
  sm = N2,
  lS = I2,
  sS = (e, t, n) => {
    const r = new Map(),
      o = { platform: eS, ...n },
      i = { ...o.platform, _c: r };
    return P2(e, t, { ...o, platform: i });
  },
  cS = (e) => {
    function t(n) {
      return {}.hasOwnProperty.call(n, "current");
    }
    return {
      name: "arrow",
      options: e,
      fn(n) {
        const { element: r, padding: o } = typeof e == "function" ? e(n) : e;
        return r && t(r)
          ? r.current != null
            ? sm({ element: r.current, padding: o }).fn(n)
            : {}
          : r
          ? sm({ element: r, padding: o }).fn(n)
          : {};
      },
    };
  };
var dl = typeof document < "u" ? f.useLayoutEffect : f.useEffect;
function Wl(e, t) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (typeof e == "function" && e.toString() === t.toString()) return !0;
  let n, r, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (((n = e.length), n !== t.length)) return !1;
      for (r = n; r-- !== 0; ) if (!Wl(e[r], t[r])) return !1;
      return !0;
    }
    if (((o = Object.keys(e)), (n = o.length), n !== Object.keys(t).length))
      return !1;
    for (r = n; r-- !== 0; ) if (!{}.hasOwnProperty.call(t, o[r])) return !1;
    for (r = n; r-- !== 0; ) {
      const i = o[r];
      if (!(i === "_owner" && e.$$typeof) && !Wl(e[i], t[i])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function e0(e) {
  return typeof window > "u"
    ? 1
    : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function cm(e, t) {
  const n = e0(e);
  return Math.round(t * n) / n;
}
function um(e) {
  const t = f.useRef(e);
  return (
    dl(() => {
      t.current = e;
    }),
    t
  );
}
function uS(e) {
  e === void 0 && (e = {});
  const {
      placement: t = "bottom",
      strategy: n = "absolute",
      middleware: r = [],
      platform: o,
      elements: { reference: i, floating: a } = {},
      transform: l = !0,
      whileElementsMounted: s,
      open: c,
    } = e,
    [d, u] = f.useState({
      x: 0,
      y: 0,
      strategy: n,
      placement: t,
      middlewareData: {},
      isPositioned: !1,
    }),
    [p, y] = f.useState(r);
  Wl(p, r) || y(r);
  const [v, g] = f.useState(null),
    [x, m] = f.useState(null),
    h = f.useCallback((Q) => {
      Q !== b.current && ((b.current = Q), g(Q));
    }, []),
    w = f.useCallback((Q) => {
      Q !== _.current && ((_.current = Q), m(Q));
    }, []),
    E = i || v,
    $ = a || x,
    b = f.useRef(null),
    _ = f.useRef(null),
    k = f.useRef(d),
    O = s != null,
    M = um(s),
    K = um(o),
    z = f.useCallback(() => {
      if (!b.current || !_.current) return;
      const Q = { placement: t, strategy: n, middleware: p };
      K.current && (Q.platform = K.current),
        sS(b.current, _.current, Q).then((D) => {
          const P = { ...D, isPositioned: !0 };
          ne.current &&
            !Wl(k.current, P) &&
            ((k.current = P),
            ni.flushSync(() => {
              u(P);
            }));
        });
    }, [p, t, n, K]);
  dl(() => {
    c === !1 &&
      k.current.isPositioned &&
      ((k.current.isPositioned = !1), u((Q) => ({ ...Q, isPositioned: !1 })));
  }, [c]);
  const ne = f.useRef(!1);
  dl(
    () => (
      (ne.current = !0),
      () => {
        ne.current = !1;
      }
    ),
    []
  ),
    dl(() => {
      if ((E && (b.current = E), $ && (_.current = $), E && $)) {
        if (M.current) return M.current(E, $, z);
        z();
      }
    }, [E, $, z, M, O]);
  const W = f.useMemo(
      () => ({ reference: b, floating: _, setReference: h, setFloating: w }),
      [h, w]
    ),
    J = f.useMemo(() => ({ reference: E, floating: $ }), [E, $]),
    ie = f.useMemo(() => {
      const Q = { position: n, left: 0, top: 0 };
      if (!J.floating) return Q;
      const D = cm(J.floating, d.x),
        P = cm(J.floating, d.y);
      return l
        ? {
            ...Q,
            transform: "translate(" + D + "px, " + P + "px)",
            ...(e0(J.floating) >= 1.5 && { willChange: "transform" }),
          }
        : { position: n, left: D, top: P };
    }, [n, l, J.floating, d.x, d.y]);
  return f.useMemo(
    () => ({ ...d, update: z, refs: W, elements: J, floatingStyles: ie }),
    [d, z, W, J, ie]
  );
}
function dS(e) {
  const [t, n] = f.useState(void 0);
  return (
    Or(() => {
      if (e) {
        n({ width: e.offsetWidth, height: e.offsetHeight });
        const r = new ResizeObserver((o) => {
          if (!Array.isArray(o) || !o.length) return;
          const i = o[0];
          let a, l;
          if ("borderBoxSize" in i) {
            const s = i.borderBoxSize,
              c = Array.isArray(s) ? s[0] : s;
            (a = c.inlineSize), (l = c.blockSize);
          } else (a = e.offsetWidth), (l = e.offsetHeight);
          n({ width: a, height: l });
        });
        return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
      } else n(void 0);
    }, [e]),
    t
  );
}
const t0 = "Popper",
  [n0, r0] = or(t0),
  [fS, o0] = n0(t0),
  pS = (e) => {
    const { __scopePopper: t, children: n } = e,
      [r, o] = f.useState(null);
    return f.createElement(fS, { scope: t, anchor: r, onAnchorChange: o }, n);
  },
  mS = "PopperAnchor",
  hS = f.forwardRef((e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e,
      i = o0(mS, n),
      a = f.useRef(null),
      l = ct(t, a);
    return (
      f.useEffect(() => {
        i.onAnchorChange((r == null ? void 0 : r.current) || a.current);
      }),
      r ? null : f.createElement(De.div, V({}, o, { ref: l }))
    );
  }),
  i0 = "PopperContent",
  [gS, gk] = n0(i0),
  vS = f.forwardRef((e, t) => {
    var n, r, o, i, a, l, s, c;
    const {
        __scopePopper: d,
        side: u = "bottom",
        sideOffset: p = 0,
        align: y = "center",
        alignOffset: v = 0,
        arrowPadding: g = 0,
        avoidCollisions: x = !0,
        collisionBoundary: m = [],
        collisionPadding: h = 0,
        sticky: w = "partial",
        hideWhenDetached: E = !1,
        updatePositionStrategy: $ = "optimized",
        onPlaced: b,
        ..._
      } = e,
      k = o0(i0, d),
      [O, M] = f.useState(null),
      K = ct(t, (we) => M(we)),
      [z, ne] = f.useState(null),
      W = dS(z),
      J = (n = W == null ? void 0 : W.width) !== null && n !== void 0 ? n : 0,
      ie = (r = W == null ? void 0 : W.height) !== null && r !== void 0 ? r : 0,
      Q = u + (y !== "center" ? "-" + y : ""),
      D =
        typeof h == "number"
          ? h
          : { top: 0, right: 0, bottom: 0, left: 0, ...h },
      P = Array.isArray(m) ? m : [m],
      I = P.length > 0,
      j = { padding: D, boundary: P.filter(yS), altBoundary: I },
      {
        refs: H,
        floatingStyles: se,
        placement: Z,
        isPositioned: ye,
        middlewareData: te,
      } = uS({
        strategy: "fixed",
        placement: Q,
        whileElementsMounted: (...we) =>
          nS(...we, { animationFrame: $ === "always" }),
        elements: { reference: k.anchor },
        middleware: [
          M2({ mainAxis: p + ie, alignmentAxis: v }),
          x &&
            rS({
              mainAxis: !0,
              crossAxis: !1,
              limiter: w === "partial" ? lS() : void 0,
              ...j,
            }),
          x && oS({ ...j }),
          iS({
            ...j,
            apply: ({
              elements: we,
              rects: vt,
              availableWidth: En,
              availableHeight: lr,
            }) => {
              const { width: on, height: Vr } = vt.reference,
                dt = we.floating.style;
              dt.setProperty("--radix-popper-available-width", `${En}px`),
                dt.setProperty("--radix-popper-available-height", `${lr}px`),
                dt.setProperty("--radix-popper-anchor-width", `${on}px`),
                dt.setProperty("--radix-popper-anchor-height", `${Vr}px`);
            },
          }),
          z && cS({ element: z, padding: g }),
          wS({ arrowWidth: J, arrowHeight: ie }),
          E && aS({ strategy: "referenceHidden", ...j }),
        ],
      }),
      [Oe, ut] = a0(Z),
      Me = wn(b);
    Or(() => {
      ye && (Me == null || Me());
    }, [ye, Me]);
    const gt = (o = te.arrow) === null || o === void 0 ? void 0 : o.x,
      ke = (i = te.arrow) === null || i === void 0 ? void 0 : i.y,
      He =
        ((a = te.arrow) === null || a === void 0 ? void 0 : a.centerOffset) !==
        0,
      [bn, Mn] = f.useState();
    return (
      Or(() => {
        O && Mn(window.getComputedStyle(O).zIndex);
      }, [O]),
      f.createElement(
        "div",
        {
          ref: H.setFloating,
          "data-radix-popper-content-wrapper": "",
          style: {
            ...se,
            transform: ye ? se.transform : "translate(0, -200%)",
            minWidth: "max-content",
            zIndex: bn,
            "--radix-popper-transform-origin": [
              (l = te.transformOrigin) === null || l === void 0 ? void 0 : l.x,
              (s = te.transformOrigin) === null || s === void 0 ? void 0 : s.y,
            ].join(" "),
          },
          dir: e.dir,
        },
        f.createElement(
          gS,
          {
            scope: d,
            placedSide: Oe,
            onArrowChange: ne,
            arrowX: gt,
            arrowY: ke,
            shouldHideArrow: He,
          },
          f.createElement(
            De.div,
            V({ "data-side": Oe, "data-align": ut }, _, {
              ref: K,
              style: {
                ..._.style,
                animation: ye ? void 0 : "none",
                opacity:
                  (c = te.hide) !== null && c !== void 0 && c.referenceHidden
                    ? 0
                    : void 0,
              },
            })
          )
        )
      )
    );
  });
function yS(e) {
  return e !== null;
}
const wS = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var n, r, o, i, a;
    const { placement: l, rects: s, middlewareData: c } = t,
      u =
        ((n = c.arrow) === null || n === void 0 ? void 0 : n.centerOffset) !==
        0,
      p = u ? 0 : e.arrowWidth,
      y = u ? 0 : e.arrowHeight,
      [v, g] = a0(l),
      x = { start: "0%", center: "50%", end: "100%" }[g],
      m =
        ((r = (o = c.arrow) === null || o === void 0 ? void 0 : o.x) !== null &&
        r !== void 0
          ? r
          : 0) +
        p / 2,
      h =
        ((i = (a = c.arrow) === null || a === void 0 ? void 0 : a.y) !== null &&
        i !== void 0
          ? i
          : 0) +
        y / 2;
    let w = "",
      E = "";
    return (
      v === "bottom"
        ? ((w = u ? x : `${m}px`), (E = `${-y}px`))
        : v === "top"
        ? ((w = u ? x : `${m}px`), (E = `${s.floating.height + y}px`))
        : v === "right"
        ? ((w = `${-y}px`), (E = u ? x : `${h}px`))
        : v === "left" &&
          ((w = `${s.floating.width + y}px`), (E = u ? x : `${h}px`)),
      { data: { x: w, y: E } }
    );
  },
});
function a0(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
const xS = pS,
  bS = hS,
  ES = vS,
  l0 = f.forwardRef((e, t) => {
    var n;
    const {
      container: r = globalThis == null ||
      (n = globalThis.document) === null ||
      n === void 0
        ? void 0
        : n.body,
      ...o
    } = e;
    return r
      ? Od.createPortal(f.createElement(De.div, V({}, o, { ref: t })), r)
      : null;
  });
function SS(e, t) {
  return f.useReducer((n, r) => {
    const o = t[n][r];
    return o ?? n;
  }, e);
}
const ar = (e) => {
  const { present: t, children: n } = e,
    r = CS(t),
    o =
      typeof n == "function" ? n({ present: r.isPresent }) : f.Children.only(n),
    i = ct(r.ref, o.ref);
  return typeof n == "function" || r.isPresent
    ? f.cloneElement(o, { ref: i })
    : null;
};
ar.displayName = "Presence";
function CS(e) {
  const [t, n] = f.useState(),
    r = f.useRef({}),
    o = f.useRef(e),
    i = f.useRef("none"),
    a = e ? "mounted" : "unmounted",
    [l, s] = SS(a, {
      mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
      unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
      unmounted: { MOUNT: "mounted" },
    });
  return (
    f.useEffect(() => {
      const c = Ha(r.current);
      i.current = l === "mounted" ? c : "none";
    }, [l]),
    Or(() => {
      const c = r.current,
        d = o.current;
      if (d !== e) {
        const p = i.current,
          y = Ha(c);
        e
          ? s("MOUNT")
          : y === "none" || (c == null ? void 0 : c.display) === "none"
          ? s("UNMOUNT")
          : s(d && p !== y ? "ANIMATION_OUT" : "UNMOUNT"),
          (o.current = e);
      }
    }, [e, s]),
    Or(() => {
      if (t) {
        const c = (u) => {
            const y = Ha(r.current).includes(u.animationName);
            u.target === t && y && ni.flushSync(() => s("ANIMATION_END"));
          },
          d = (u) => {
            u.target === t && (i.current = Ha(r.current));
          };
        return (
          t.addEventListener("animationstart", d),
          t.addEventListener("animationcancel", c),
          t.addEventListener("animationend", c),
          () => {
            t.removeEventListener("animationstart", d),
              t.removeEventListener("animationcancel", c),
              t.removeEventListener("animationend", c);
          }
        );
      } else s("ANIMATION_END");
    }, [t, s]),
    {
      isPresent: ["mounted", "unmountSuspended"].includes(l),
      ref: f.useCallback((c) => {
        c && (r.current = getComputedStyle(c)), n(c);
      }, []),
    }
  );
}
function Ha(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
const ac = "rovingFocusGroup.onEntryFocus",
  $S = { bubbles: !1, cancelable: !0 },
  Xd = "RovingFocusGroup",
  [Cu, s0, _S] = Fv(Xd),
  [RS, gs] = or(Xd, [_S]),
  [kS, TS] = RS(Xd),
  PS = f.forwardRef((e, t) =>
    f.createElement(
      Cu.Provider,
      { scope: e.__scopeRovingFocusGroup },
      f.createElement(
        Cu.Slot,
        { scope: e.__scopeRovingFocusGroup },
        f.createElement(NS, V({}, e, { ref: t }))
      )
    )
  ),
  NS = f.forwardRef((e, t) => {
    const {
        __scopeRovingFocusGroup: n,
        orientation: r,
        loop: o = !1,
        dir: i,
        currentTabStopId: a,
        defaultCurrentTabStopId: l,
        onCurrentTabStopIdChange: s,
        onEntryFocus: c,
        ...d
      } = e,
      u = f.useRef(null),
      p = ct(t, u),
      y = Hd(i),
      [v = null, g] = ps({ prop: a, defaultProp: l, onChange: s }),
      [x, m] = f.useState(!1),
      h = wn(c),
      w = s0(n),
      E = f.useRef(!1),
      [$, b] = f.useState(0);
    return (
      f.useEffect(() => {
        const _ = u.current;
        if (_)
          return _.addEventListener(ac, h), () => _.removeEventListener(ac, h);
      }, [h]),
      f.createElement(
        kS,
        {
          scope: n,
          orientation: r,
          dir: y,
          loop: o,
          currentTabStopId: v,
          onItemFocus: f.useCallback((_) => g(_), [g]),
          onItemShiftTab: f.useCallback(() => m(!0), []),
          onFocusableItemAdd: f.useCallback(() => b((_) => _ + 1), []),
          onFocusableItemRemove: f.useCallback(() => b((_) => _ - 1), []),
        },
        f.createElement(
          De.div,
          V({ tabIndex: x || $ === 0 ? -1 : 0, "data-orientation": r }, d, {
            ref: p,
            style: { outline: "none", ...e.style },
            onMouseDown: le(e.onMouseDown, () => {
              E.current = !0;
            }),
            onFocus: le(e.onFocus, (_) => {
              const k = !E.current;
              if (_.target === _.currentTarget && k && !x) {
                const O = new CustomEvent(ac, $S);
                if ((_.currentTarget.dispatchEvent(O), !O.defaultPrevented)) {
                  const M = w().filter((J) => J.focusable),
                    K = M.find((J) => J.active),
                    z = M.find((J) => J.id === v),
                    W = [K, z, ...M].filter(Boolean).map((J) => J.ref.current);
                  c0(W);
                }
              }
              E.current = !1;
            }),
            onBlur: le(e.onBlur, () => m(!1)),
          })
        )
      )
    );
  }),
  AS = "RovingFocusGroupItem",
  DS = f.forwardRef((e, t) => {
    const {
        __scopeRovingFocusGroup: n,
        focusable: r = !0,
        active: o = !1,
        tabStopId: i,
        ...a
      } = e,
      l = no(),
      s = i || l,
      c = TS(AS, n),
      d = c.currentTabStopId === s,
      u = s0(n),
      { onFocusableItemAdd: p, onFocusableItemRemove: y } = c;
    return (
      f.useEffect(() => {
        if (r) return p(), () => y();
      }, [r, p, y]),
      f.createElement(
        Cu.ItemSlot,
        { scope: n, id: s, focusable: r, active: o },
        f.createElement(
          De.span,
          V({ tabIndex: d ? 0 : -1, "data-orientation": c.orientation }, a, {
            ref: t,
            onMouseDown: le(e.onMouseDown, (v) => {
              r ? c.onItemFocus(s) : v.preventDefault();
            }),
            onFocus: le(e.onFocus, () => c.onItemFocus(s)),
            onKeyDown: le(e.onKeyDown, (v) => {
              if (v.key === "Tab" && v.shiftKey) {
                c.onItemShiftTab();
                return;
              }
              if (v.target !== v.currentTarget) return;
              const g = LS(v, c.orientation, c.dir);
              if (g !== void 0) {
                v.preventDefault();
                let m = u()
                  .filter((h) => h.focusable)
                  .map((h) => h.ref.current);
                if (g === "last") m.reverse();
                else if (g === "prev" || g === "next") {
                  g === "prev" && m.reverse();
                  const h = m.indexOf(v.currentTarget);
                  m = c.loop ? IS(m, h + 1) : m.slice(h + 1);
                }
                setTimeout(() => c0(m));
              }
            }),
          })
        )
      )
    );
  }),
  OS = {
    ArrowLeft: "prev",
    ArrowUp: "prev",
    ArrowRight: "next",
    ArrowDown: "next",
    PageUp: "first",
    Home: "first",
    PageDown: "last",
    End: "last",
  };
function MS(e, t) {
  return t !== "rtl"
    ? e
    : e === "ArrowLeft"
    ? "ArrowRight"
    : e === "ArrowRight"
    ? "ArrowLeft"
    : e;
}
function LS(e, t, n) {
  const r = MS(e.key, n);
  if (
    !(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) &&
    !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r))
  )
    return OS[r];
}
function c0(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function IS(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
const u0 = PS,
  d0 = DS;
var FS = function (e) {
    if (typeof document > "u") return null;
    var t = Array.isArray(e) ? e[0] : e;
    return t.ownerDocument.body;
  },
  yo = new WeakMap(),
  Va = new WeakMap(),
  Wa = {},
  lc = 0,
  f0 = function (e) {
    return e && (e.host || f0(e.parentNode));
  },
  zS = function (e, t) {
    return t
      .map(function (n) {
        if (e.contains(n)) return n;
        var r = f0(n);
        return r && e.contains(r)
          ? r
          : (console.error(
              "aria-hidden",
              n,
              "in not contained inside",
              e,
              ". Doing nothing"
            ),
            null);
      })
      .filter(function (n) {
        return !!n;
      });
  },
  jS = function (e, t, n, r) {
    var o = zS(t, Array.isArray(e) ? e : [e]);
    Wa[n] || (Wa[n] = new WeakMap());
    var i = Wa[n],
      a = [],
      l = new Set(),
      s = new Set(o),
      c = function (u) {
        !u || l.has(u) || (l.add(u), c(u.parentNode));
      };
    o.forEach(c);
    var d = function (u) {
      !u ||
        s.has(u) ||
        Array.prototype.forEach.call(u.children, function (p) {
          if (l.has(p)) d(p);
          else {
            var y = p.getAttribute(r),
              v = y !== null && y !== "false",
              g = (yo.get(p) || 0) + 1,
              x = (i.get(p) || 0) + 1;
            yo.set(p, g),
              i.set(p, x),
              a.push(p),
              g === 1 && v && Va.set(p, !0),
              x === 1 && p.setAttribute(n, "true"),
              v || p.setAttribute(r, "true");
          }
        });
    };
    return (
      d(t),
      l.clear(),
      lc++,
      function () {
        a.forEach(function (u) {
          var p = yo.get(u) - 1,
            y = i.get(u) - 1;
          yo.set(u, p),
            i.set(u, y),
            p || (Va.has(u) || u.removeAttribute(r), Va.delete(u)),
            y || u.removeAttribute(n);
        }),
          lc--,
          lc ||
            ((yo = new WeakMap()),
            (yo = new WeakMap()),
            (Va = new WeakMap()),
            (Wa = {}));
      }
    );
  },
  p0 = function (e, t, n) {
    n === void 0 && (n = "data-aria-hidden");
    var r = Array.from(Array.isArray(e) ? e : [e]),
      o = t || FS(e);
    return o
      ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live]"))),
        jS(r, o, n, "aria-hidden"))
      : function () {
          return null;
        };
  },
  kn = function () {
    return (
      (kn =
        Object.assign ||
        function (t) {
          for (var n, r = 1, o = arguments.length; r < o; r++) {
            n = arguments[r];
            for (var i in n)
              Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
          }
          return t;
        }),
      kn.apply(this, arguments)
    );
  };
function m0(e, t) {
  var n = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) &&
      t.indexOf(r) < 0 &&
      (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
        (n[r[o]] = e[r[o]]);
  return n;
}
function US(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, o = t.length, i; r < o; r++)
      (i || !(r in t)) &&
        (i || (i = Array.prototype.slice.call(t, 0, r)), (i[r] = t[r]));
  return e.concat(i || Array.prototype.slice.call(t));
}
var fl = "right-scroll-bar-position",
  pl = "width-before-scroll-bar",
  BS = "with-scroll-bars-hidden",
  HS = "--removed-body-scroll-bar-size";
function sc(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function VS(e, t) {
  var n = f.useState(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return n.value;
        },
        set current(r) {
          var o = n.value;
          o !== r && ((n.value = r), n.callback(r, o));
        },
      },
    };
  })[0];
  return (n.callback = t), n.facade;
}
var dm = new WeakMap();
function WS(e, t) {
  var n = VS(t || null, function (r) {
    return e.forEach(function (o) {
      return sc(o, r);
    });
  });
  return (
    f.useLayoutEffect(
      function () {
        var r = dm.get(n);
        if (r) {
          var o = new Set(r),
            i = new Set(e),
            a = n.current;
          o.forEach(function (l) {
            i.has(l) || sc(l, null);
          }),
            i.forEach(function (l) {
              o.has(l) || sc(l, a);
            });
        }
        dm.set(n, e);
      },
      [e]
    ),
    n
  );
}
function KS(e) {
  return e;
}
function GS(e, t) {
  t === void 0 && (t = KS);
  var n = [],
    r = !1,
    o = {
      read: function () {
        if (r)
          throw new Error(
            "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`."
          );
        return n.length ? n[n.length - 1] : e;
      },
      useMedium: function (i) {
        var a = t(i, r);
        return (
          n.push(a),
          function () {
            n = n.filter(function (l) {
              return l !== a;
            });
          }
        );
      },
      assignSyncMedium: function (i) {
        for (r = !0; n.length; ) {
          var a = n;
          (n = []), a.forEach(i);
        }
        n = {
          push: function (l) {
            return i(l);
          },
          filter: function () {
            return n;
          },
        };
      },
      assignMedium: function (i) {
        r = !0;
        var a = [];
        if (n.length) {
          var l = n;
          (n = []), l.forEach(i), (a = n);
        }
        var s = function () {
            var d = a;
            (a = []), d.forEach(i);
          },
          c = function () {
            return Promise.resolve().then(s);
          };
        c(),
          (n = {
            push: function (d) {
              a.push(d), c();
            },
            filter: function (d) {
              return (a = a.filter(d)), n;
            },
          });
      },
    };
  return o;
}
function YS(e) {
  e === void 0 && (e = {});
  var t = GS(null);
  return (t.options = kn({ async: !0, ssr: !1 }, e)), t;
}
var h0 = function (e) {
  var t = e.sideCar,
    n = m0(e, ["sideCar"]);
  if (!t)
    throw new Error(
      "Sidecar: please provide `sideCar` property to import the right car"
    );
  var r = t.read();
  if (!r) throw new Error("Sidecar medium not found");
  return f.createElement(r, kn({}, n));
};
h0.isSideCarExport = !0;
function QS(e, t) {
  return e.useMedium(t), h0;
}
var g0 = YS(),
  cc = function () {},
  vs = f.forwardRef(function (e, t) {
    var n = f.useRef(null),
      r = f.useState({
        onScrollCapture: cc,
        onWheelCapture: cc,
        onTouchMoveCapture: cc,
      }),
      o = r[0],
      i = r[1],
      a = e.forwardProps,
      l = e.children,
      s = e.className,
      c = e.removeScrollBar,
      d = e.enabled,
      u = e.shards,
      p = e.sideCar,
      y = e.noIsolation,
      v = e.inert,
      g = e.allowPinchZoom,
      x = e.as,
      m = x === void 0 ? "div" : x,
      h = m0(e, [
        "forwardProps",
        "children",
        "className",
        "removeScrollBar",
        "enabled",
        "shards",
        "sideCar",
        "noIsolation",
        "inert",
        "allowPinchZoom",
        "as",
      ]),
      w = p,
      E = WS([n, t]),
      $ = kn(kn({}, h), o);
    return f.createElement(
      f.Fragment,
      null,
      d &&
        f.createElement(w, {
          sideCar: g0,
          removeScrollBar: c,
          shards: u,
          noIsolation: y,
          inert: v,
          setCallbacks: i,
          allowPinchZoom: !!g,
          lockRef: n,
        }),
      a
        ? f.cloneElement(f.Children.only(l), kn(kn({}, $), { ref: E }))
        : f.createElement(m, kn({}, $, { className: s, ref: E }), l)
    );
  });
vs.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
vs.classNames = { fullWidth: pl, zeroRight: fl };
var XS = function () {
  if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function qS() {
  if (!document) return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = XS();
  return t && e.setAttribute("nonce", t), e;
}
function ZS(e, t) {
  e.styleSheet
    ? (e.styleSheet.cssText = t)
    : e.appendChild(document.createTextNode(t));
}
function JS(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var eC = function () {
    var e = 0,
      t = null;
    return {
      add: function (n) {
        e == 0 && (t = qS()) && (ZS(t, n), JS(t)), e++;
      },
      remove: function () {
        e--,
          !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null));
      },
    };
  },
  tC = function () {
    var e = eC();
    return function (t, n) {
      f.useEffect(
        function () {
          return (
            e.add(t),
            function () {
              e.remove();
            }
          );
        },
        [t && n]
      );
    };
  },
  v0 = function () {
    var e = tC(),
      t = function (n) {
        var r = n.styles,
          o = n.dynamic;
        return e(r, o), null;
      };
    return t;
  },
  nC = { left: 0, top: 0, right: 0, gap: 0 },
  uc = function (e) {
    return parseInt(e || "", 10) || 0;
  },
  rC = function (e) {
    var t = window.getComputedStyle(document.body),
      n = t[e === "padding" ? "paddingLeft" : "marginLeft"],
      r = t[e === "padding" ? "paddingTop" : "marginTop"],
      o = t[e === "padding" ? "paddingRight" : "marginRight"];
    return [uc(n), uc(r), uc(o)];
  },
  oC = function (e) {
    if ((e === void 0 && (e = "margin"), typeof window > "u")) return nC;
    var t = rC(e),
      n = document.documentElement.clientWidth,
      r = window.innerWidth;
    return {
      left: t[0],
      top: t[1],
      right: t[2],
      gap: Math.max(0, r - n + t[2] - t[0]),
    };
  },
  iC = v0(),
  aC = function (e, t, n, r) {
    var o = e.left,
      i = e.top,
      a = e.right,
      l = e.gap;
    return (
      n === void 0 && (n = "margin"),
      `
  .`
        .concat(
          BS,
          ` {
   overflow: hidden `
        )
        .concat(
          r,
          `;
   padding-right: `
        )
        .concat(l, "px ")
        .concat(
          r,
          `;
  }
  body {
    overflow: hidden `
        )
        .concat(
          r,
          `;
    overscroll-behavior: contain;
    `
        )
        .concat(
          [
            t && "position: relative ".concat(r, ";"),
            n === "margin" &&
              `
    padding-left: `
                .concat(
                  o,
                  `px;
    padding-top: `
                )
                .concat(
                  i,
                  `px;
    padding-right: `
                )
                .concat(
                  a,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `
                )
                .concat(l, "px ")
                .concat(
                  r,
                  `;
    `
                ),
            n === "padding" &&
              "padding-right: ".concat(l, "px ").concat(r, ";"),
          ]
            .filter(Boolean)
            .join(""),
          `
  }
  
  .`
        )
        .concat(
          fl,
          ` {
    right: `
        )
        .concat(l, "px ")
        .concat(
          r,
          `;
  }
  
  .`
        )
        .concat(
          pl,
          ` {
    margin-right: `
        )
        .concat(l, "px ")
        .concat(
          r,
          `;
  }
  
  .`
        )
        .concat(fl, " .")
        .concat(
          fl,
          ` {
    right: 0 `
        )
        .concat(
          r,
          `;
  }
  
  .`
        )
        .concat(pl, " .")
        .concat(
          pl,
          ` {
    margin-right: 0 `
        )
        .concat(
          r,
          `;
  }
  
  body {
    `
        )
        .concat(HS, ": ")
        .concat(
          l,
          `px;
  }
`
        )
    );
  },
  lC = function (e) {
    var t = e.noRelative,
      n = e.noImportant,
      r = e.gapMode,
      o = r === void 0 ? "margin" : r,
      i = f.useMemo(
        function () {
          return oC(o);
        },
        [o]
      );
    return f.createElement(iC, { styles: aC(i, !t, o, n ? "" : "!important") });
  },
  $u = !1;
if (typeof window < "u")
  try {
    var Ka = Object.defineProperty({}, "passive", {
      get: function () {
        return ($u = !0), !0;
      },
    });
    window.addEventListener("test", Ka, Ka),
      window.removeEventListener("test", Ka, Ka);
  } catch {
    $u = !1;
  }
var wo = $u ? { passive: !1 } : !1,
  sC = function (e) {
    return e.tagName === "TEXTAREA";
  },
  y0 = function (e, t) {
    var n = window.getComputedStyle(e);
    return (
      n[t] !== "hidden" &&
      !(n.overflowY === n.overflowX && !sC(e) && n[t] === "visible")
    );
  },
  cC = function (e) {
    return y0(e, "overflowY");
  },
  uC = function (e) {
    return y0(e, "overflowX");
  },
  fm = function (e, t) {
    var n = t;
    do {
      typeof ShadowRoot < "u" && n instanceof ShadowRoot && (n = n.host);
      var r = w0(e, n);
      if (r) {
        var o = x0(e, n),
          i = o[1],
          a = o[2];
        if (i > a) return !0;
      }
      n = n.parentNode;
    } while (n && n !== document.body);
    return !1;
  },
  dC = function (e) {
    var t = e.scrollTop,
      n = e.scrollHeight,
      r = e.clientHeight;
    return [t, n, r];
  },
  fC = function (e) {
    var t = e.scrollLeft,
      n = e.scrollWidth,
      r = e.clientWidth;
    return [t, n, r];
  },
  w0 = function (e, t) {
    return e === "v" ? cC(t) : uC(t);
  },
  x0 = function (e, t) {
    return e === "v" ? dC(t) : fC(t);
  },
  pC = function (e, t) {
    return e === "h" && t === "rtl" ? -1 : 1;
  },
  mC = function (e, t, n, r, o) {
    var i = pC(e, window.getComputedStyle(t).direction),
      a = i * r,
      l = n.target,
      s = t.contains(l),
      c = !1,
      d = a > 0,
      u = 0,
      p = 0;
    do {
      var y = x0(e, l),
        v = y[0],
        g = y[1],
        x = y[2],
        m = g - x - i * v;
      (v || m) && w0(e, l) && ((u += m), (p += v)), (l = l.parentNode);
    } while ((!s && l !== document.body) || (s && (t.contains(l) || t === l)));
    return (
      ((d && ((o && u === 0) || (!o && a > u))) ||
        (!d && ((o && p === 0) || (!o && -a > p)))) &&
        (c = !0),
      c
    );
  },
  Ga = function (e) {
    return "changedTouches" in e
      ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      : [0, 0];
  },
  pm = function (e) {
    return [e.deltaX, e.deltaY];
  },
  mm = function (e) {
    return e && "current" in e ? e.current : e;
  },
  hC = function (e, t) {
    return e[0] === t[0] && e[1] === t[1];
  },
  gC = function (e) {
    return `
  .block-interactivity-`
      .concat(
        e,
        ` {pointer-events: none;}
  .allow-interactivity-`
      )
      .concat(
        e,
        ` {pointer-events: all;}
`
      );
  },
  vC = 0,
  xo = [];
function yC(e) {
  var t = f.useRef([]),
    n = f.useRef([0, 0]),
    r = f.useRef(),
    o = f.useState(vC++)[0],
    i = f.useState(function () {
      return v0();
    })[0],
    a = f.useRef(e);
  f.useEffect(
    function () {
      a.current = e;
    },
    [e]
  ),
    f.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add("block-interactivity-".concat(o));
          var g = US([e.lockRef.current], (e.shards || []).map(mm), !0).filter(
            Boolean
          );
          return (
            g.forEach(function (x) {
              return x.classList.add("allow-interactivity-".concat(o));
            }),
            function () {
              document.body.classList.remove("block-interactivity-".concat(o)),
                g.forEach(function (x) {
                  return x.classList.remove("allow-interactivity-".concat(o));
                });
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards]
    );
  var l = f.useCallback(function (g, x) {
      if ("touches" in g && g.touches.length === 2)
        return !a.current.allowPinchZoom;
      var m = Ga(g),
        h = n.current,
        w = "deltaX" in g ? g.deltaX : h[0] - m[0],
        E = "deltaY" in g ? g.deltaY : h[1] - m[1],
        $,
        b = g.target,
        _ = Math.abs(w) > Math.abs(E) ? "h" : "v";
      if ("touches" in g && _ === "h" && b.type === "range") return !1;
      var k = fm(_, b);
      if (!k) return !0;
      if ((k ? ($ = _) : (($ = _ === "v" ? "h" : "v"), (k = fm(_, b))), !k))
        return !1;
      if (
        (!r.current && "changedTouches" in g && (w || E) && (r.current = $), !$)
      )
        return !0;
      var O = r.current || $;
      return mC(O, x, g, O === "h" ? w : E, !0);
    }, []),
    s = f.useCallback(function (g) {
      var x = g;
      if (!(!xo.length || xo[xo.length - 1] !== i)) {
        var m = "deltaY" in x ? pm(x) : Ga(x),
          h = t.current.filter(function ($) {
            return $.name === x.type && $.target === x.target && hC($.delta, m);
          })[0];
        if (h && h.should) {
          x.cancelable && x.preventDefault();
          return;
        }
        if (!h) {
          var w = (a.current.shards || [])
              .map(mm)
              .filter(Boolean)
              .filter(function ($) {
                return $.contains(x.target);
              }),
            E = w.length > 0 ? l(x, w[0]) : !a.current.noIsolation;
          E && x.cancelable && x.preventDefault();
        }
      }
    }, []),
    c = f.useCallback(function (g, x, m, h) {
      var w = { name: g, delta: x, target: m, should: h };
      t.current.push(w),
        setTimeout(function () {
          t.current = t.current.filter(function (E) {
            return E !== w;
          });
        }, 1);
    }, []),
    d = f.useCallback(function (g) {
      (n.current = Ga(g)), (r.current = void 0);
    }, []),
    u = f.useCallback(function (g) {
      c(g.type, pm(g), g.target, l(g, e.lockRef.current));
    }, []),
    p = f.useCallback(function (g) {
      c(g.type, Ga(g), g.target, l(g, e.lockRef.current));
    }, []);
  f.useEffect(function () {
    return (
      xo.push(i),
      e.setCallbacks({
        onScrollCapture: u,
        onWheelCapture: u,
        onTouchMoveCapture: p,
      }),
      document.addEventListener("wheel", s, wo),
      document.addEventListener("touchmove", s, wo),
      document.addEventListener("touchstart", d, wo),
      function () {
        (xo = xo.filter(function (g) {
          return g !== i;
        })),
          document.removeEventListener("wheel", s, wo),
          document.removeEventListener("touchmove", s, wo),
          document.removeEventListener("touchstart", d, wo);
      }
    );
  }, []);
  var y = e.removeScrollBar,
    v = e.inert;
  return f.createElement(
    f.Fragment,
    null,
    v ? f.createElement(i, { styles: gC(o) }) : null,
    y ? f.createElement(lC, { gapMode: "margin" }) : null
  );
}
const wC = QS(g0, yC);
var b0 = f.forwardRef(function (e, t) {
  return f.createElement(vs, kn({}, e, { ref: t, sideCar: wC }));
});
b0.classNames = vs.classNames;
const E0 = b0,
  _u = ["Enter", " "],
  xC = ["ArrowDown", "PageUp", "Home"],
  S0 = ["ArrowUp", "PageDown", "End"],
  bC = [...xC, ...S0],
  EC = { ltr: [..._u, "ArrowRight"], rtl: [..._u, "ArrowLeft"] },
  SC = { ltr: ["ArrowLeft"], rtl: ["ArrowRight"] },
  ys = "Menu",
  [sa, CC, $C] = Fv(ys),
  [mo, C0] = or(ys, [$C, r0, gs]),
  qd = r0(),
  $0 = gs(),
  [_C, ho] = mo(ys),
  [RC, xa] = mo(ys),
  kC = (e) => {
    const {
        __scopeMenu: t,
        open: n = !1,
        children: r,
        dir: o,
        onOpenChange: i,
        modal: a = !0,
      } = e,
      l = qd(t),
      [s, c] = f.useState(null),
      d = f.useRef(!1),
      u = wn(i),
      p = Hd(o);
    return (
      f.useEffect(() => {
        const y = () => {
            (d.current = !0),
              document.addEventListener("pointerdown", v, {
                capture: !0,
                once: !0,
              }),
              document.addEventListener("pointermove", v, {
                capture: !0,
                once: !0,
              });
          },
          v = () => (d.current = !1);
        return (
          document.addEventListener("keydown", y, { capture: !0 }),
          () => {
            document.removeEventListener("keydown", y, { capture: !0 }),
              document.removeEventListener("pointerdown", v, { capture: !0 }),
              document.removeEventListener("pointermove", v, { capture: !0 });
          }
        );
      }, []),
      f.createElement(
        xS,
        l,
        f.createElement(
          _C,
          {
            scope: t,
            open: n,
            onOpenChange: u,
            content: s,
            onContentChange: c,
          },
          f.createElement(
            RC,
            {
              scope: t,
              onClose: f.useCallback(() => u(!1), [u]),
              isUsingKeyboardRef: d,
              dir: p,
              modal: a,
            },
            r
          )
        )
      )
    );
  },
  _0 = f.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e,
      o = qd(n);
    return f.createElement(bS, V({}, o, r, { ref: t }));
  }),
  R0 = "MenuPortal",
  [TC, k0] = mo(R0, { forceMount: void 0 }),
  PC = (e) => {
    const { __scopeMenu: t, forceMount: n, children: r, container: o } = e,
      i = ho(R0, t);
    return f.createElement(
      TC,
      { scope: t, forceMount: n },
      f.createElement(
        ar,
        { present: n || i.open },
        f.createElement(l0, { asChild: !0, container: o }, r)
      )
    );
  },
  vn = "MenuContent",
  [NC, Zd] = mo(vn),
  AC = f.forwardRef((e, t) => {
    const n = k0(vn, e.__scopeMenu),
      { forceMount: r = n.forceMount, ...o } = e,
      i = ho(vn, e.__scopeMenu),
      a = xa(vn, e.__scopeMenu);
    return f.createElement(
      sa.Provider,
      { scope: e.__scopeMenu },
      f.createElement(
        ar,
        { present: r || i.open },
        f.createElement(
          sa.Slot,
          { scope: e.__scopeMenu },
          a.modal
            ? f.createElement(DC, V({}, o, { ref: t }))
            : f.createElement(OC, V({}, o, { ref: t }))
        )
      )
    );
  }),
  DC = f.forwardRef((e, t) => {
    const n = ho(vn, e.__scopeMenu),
      r = f.useRef(null),
      o = ct(t, r);
    return (
      f.useEffect(() => {
        const i = r.current;
        if (i) return p0(i);
      }, []),
      f.createElement(
        Jd,
        V({}, e, {
          ref: o,
          trapFocus: n.open,
          disableOutsidePointerEvents: n.open,
          disableOutsideScroll: !0,
          onFocusOutside: le(e.onFocusOutside, (i) => i.preventDefault(), {
            checkForDefaultPrevented: !1,
          }),
          onDismiss: () => n.onOpenChange(!1),
        })
      )
    );
  }),
  OC = f.forwardRef((e, t) => {
    const n = ho(vn, e.__scopeMenu);
    return f.createElement(
      Jd,
      V({}, e, {
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        onDismiss: () => n.onOpenChange(!1),
      })
    );
  }),
  Jd = f.forwardRef((e, t) => {
    const {
        __scopeMenu: n,
        loop: r = !1,
        trapFocus: o,
        onOpenAutoFocus: i,
        onCloseAutoFocus: a,
        disableOutsidePointerEvents: l,
        onEntryFocus: s,
        onEscapeKeyDown: c,
        onPointerDownOutside: d,
        onFocusOutside: u,
        onInteractOutside: p,
        onDismiss: y,
        disableOutsideScroll: v,
        ...g
      } = e,
      x = ho(vn, n),
      m = xa(vn, n),
      h = qd(n),
      w = $0(n),
      E = CC(n),
      [$, b] = f.useState(null),
      _ = f.useRef(null),
      k = ct(t, _, x.onContentChange),
      O = f.useRef(0),
      M = f.useRef(""),
      K = f.useRef(0),
      z = f.useRef(null),
      ne = f.useRef("right"),
      W = f.useRef(0),
      J = v ? E0 : f.Fragment,
      ie = v ? { as: co, allowPinchZoom: !0 } : void 0,
      Q = (P) => {
        var I, j;
        const H = M.current + P,
          se = E().filter((Me) => !Me.disabled),
          Z = document.activeElement,
          ye =
            (I = se.find((Me) => Me.ref.current === Z)) === null || I === void 0
              ? void 0
              : I.textValue,
          te = se.map((Me) => Me.textValue),
          Oe = XC(te, H, ye),
          ut =
            (j = se.find((Me) => Me.textValue === Oe)) === null || j === void 0
              ? void 0
              : j.ref.current;
        (function Me(gt) {
          (M.current = gt),
            window.clearTimeout(O.current),
            gt !== "" && (O.current = window.setTimeout(() => Me(""), 1e3));
        })(H),
          ut && setTimeout(() => ut.focus());
      };
    f.useEffect(() => () => window.clearTimeout(O.current), []), Uv();
    const D = f.useCallback((P) => {
      var I, j;
      return (
        ne.current ===
          ((I = z.current) === null || I === void 0 ? void 0 : I.side) &&
        ZC(P, (j = z.current) === null || j === void 0 ? void 0 : j.area)
      );
    }, []);
    return f.createElement(
      NC,
      {
        scope: n,
        searchRef: M,
        onItemEnter: f.useCallback(
          (P) => {
            D(P) && P.preventDefault();
          },
          [D]
        ),
        onItemLeave: f.useCallback(
          (P) => {
            var I;
            D(P) ||
              ((I = _.current) === null || I === void 0 || I.focus(), b(null));
          },
          [D]
        ),
        onTriggerLeave: f.useCallback(
          (P) => {
            D(P) && P.preventDefault();
          },
          [D]
        ),
        pointerGraceTimerRef: K,
        onPointerGraceIntentChange: f.useCallback((P) => {
          z.current = P;
        }, []),
      },
      f.createElement(
        J,
        ie,
        f.createElement(
          Bv,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: le(i, (P) => {
              var I;
              P.preventDefault(),
                (I = _.current) === null || I === void 0 || I.focus();
            }),
            onUnmountAutoFocus: a,
          },
          f.createElement(
            zv,
            {
              asChild: !0,
              disableOutsidePointerEvents: l,
              onEscapeKeyDown: c,
              onPointerDownOutside: d,
              onFocusOutside: u,
              onInteractOutside: p,
              onDismiss: y,
            },
            f.createElement(
              u0,
              V({ asChild: !0 }, w, {
                dir: m.dir,
                orientation: "vertical",
                loop: r,
                currentTabStopId: $,
                onCurrentTabStopIdChange: b,
                onEntryFocus: le(s, (P) => {
                  m.isUsingKeyboardRef.current || P.preventDefault();
                }),
              }),
              f.createElement(
                ES,
                V(
                  {
                    role: "menu",
                    "aria-orientation": "vertical",
                    "data-state": D0(x.open),
                    "data-radix-menu-content": "",
                    dir: m.dir,
                  },
                  h,
                  g,
                  {
                    ref: k,
                    style: { outline: "none", ...g.style },
                    onKeyDown: le(g.onKeyDown, (P) => {
                      const j =
                          P.target.closest("[data-radix-menu-content]") ===
                          P.currentTarget,
                        H = P.ctrlKey || P.altKey || P.metaKey,
                        se = P.key.length === 1;
                      j &&
                        (P.key === "Tab" && P.preventDefault(),
                        !H && se && Q(P.key));
                      const Z = _.current;
                      if (P.target !== Z || !bC.includes(P.key)) return;
                      P.preventDefault();
                      const te = E()
                        .filter((Oe) => !Oe.disabled)
                        .map((Oe) => Oe.ref.current);
                      S0.includes(P.key) && te.reverse(), YC(te);
                    }),
                    onBlur: le(e.onBlur, (P) => {
                      P.currentTarget.contains(P.target) ||
                        (window.clearTimeout(O.current), (M.current = ""));
                    }),
                    onPointerMove: le(
                      e.onPointerMove,
                      ca((P) => {
                        const I = P.target,
                          j = W.current !== P.clientX;
                        if (P.currentTarget.contains(I) && j) {
                          const H = P.clientX > W.current ? "right" : "left";
                          (ne.current = H), (W.current = P.clientX);
                        }
                      })
                    ),
                  }
                )
              )
            )
          )
        )
      )
    );
  }),
  MC = f.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return f.createElement(De.div, V({}, r, { ref: t }));
  }),
  Ru = "MenuItem",
  hm = "menu.itemSelect",
  ef = f.forwardRef((e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e,
      i = f.useRef(null),
      a = xa(Ru, e.__scopeMenu),
      l = Zd(Ru, e.__scopeMenu),
      s = ct(t, i),
      c = f.useRef(!1),
      d = () => {
        const u = i.current;
        if (!n && u) {
          const p = new CustomEvent(hm, { bubbles: !0, cancelable: !0 });
          u.addEventListener(hm, (y) => (r == null ? void 0 : r(y)), {
            once: !0,
          }),
            xv(u, p),
            p.defaultPrevented ? (c.current = !1) : a.onClose();
        }
      };
    return f.createElement(
      T0,
      V({}, o, {
        ref: s,
        disabled: n,
        onClick: le(e.onClick, d),
        onPointerDown: (u) => {
          var p;
          (p = e.onPointerDown) === null || p === void 0 || p.call(e, u),
            (c.current = !0);
        },
        onPointerUp: le(e.onPointerUp, (u) => {
          var p;
          c.current ||
            (p = u.currentTarget) === null ||
            p === void 0 ||
            p.click();
        }),
        onKeyDown: le(e.onKeyDown, (u) => {
          const p = l.searchRef.current !== "";
          n ||
            (p && u.key === " ") ||
            (_u.includes(u.key) &&
              (u.currentTarget.click(), u.preventDefault()));
        }),
      })
    );
  }),
  T0 = f.forwardRef((e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...i } = e,
      a = Zd(Ru, n),
      l = $0(n),
      s = f.useRef(null),
      c = ct(t, s),
      [d, u] = f.useState(!1),
      [p, y] = f.useState("");
    return (
      f.useEffect(() => {
        const v = s.current;
        if (v) {
          var g;
          y(((g = v.textContent) !== null && g !== void 0 ? g : "").trim());
        }
      }, [i.children]),
      f.createElement(
        sa.ItemSlot,
        { scope: n, disabled: r, textValue: o ?? p },
        f.createElement(
          d0,
          V({ asChild: !0 }, l, { focusable: !r }),
          f.createElement(
            De.div,
            V(
              {
                role: "menuitem",
                "data-highlighted": d ? "" : void 0,
                "aria-disabled": r || void 0,
                "data-disabled": r ? "" : void 0,
              },
              i,
              {
                ref: c,
                onPointerMove: le(
                  e.onPointerMove,
                  ca((v) => {
                    r
                      ? a.onItemLeave(v)
                      : (a.onItemEnter(v),
                        v.defaultPrevented || v.currentTarget.focus());
                  })
                ),
                onPointerLeave: le(
                  e.onPointerLeave,
                  ca((v) => a.onItemLeave(v))
                ),
                onFocus: le(e.onFocus, () => u(!0)),
                onBlur: le(e.onBlur, () => u(!1)),
              }
            )
          )
        )
      )
    );
  }),
  LC = f.forwardRef((e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return f.createElement(
      N0,
      { scope: e.__scopeMenu, checked: n },
      f.createElement(
        ef,
        V(
          { role: "menuitemcheckbox", "aria-checked": Kl(n) ? "mixed" : n },
          o,
          {
            ref: t,
            "data-state": tf(n),
            onSelect: le(
              o.onSelect,
              () => (r == null ? void 0 : r(Kl(n) ? !0 : !n)),
              { checkForDefaultPrevented: !1 }
            ),
          }
        )
      )
    );
  }),
  IC = "MenuRadioGroup",
  [vk, FC] = mo(IC, { value: void 0, onValueChange: () => {} }),
  zC = "MenuRadioItem",
  jC = f.forwardRef((e, t) => {
    const { value: n, ...r } = e,
      o = FC(zC, e.__scopeMenu),
      i = n === o.value;
    return f.createElement(
      N0,
      { scope: e.__scopeMenu, checked: i },
      f.createElement(
        ef,
        V({ role: "menuitemradio", "aria-checked": i }, r, {
          ref: t,
          "data-state": tf(i),
          onSelect: le(
            r.onSelect,
            () => {
              var a;
              return (a = o.onValueChange) === null || a === void 0
                ? void 0
                : a.call(o, n);
            },
            { checkForDefaultPrevented: !1 }
          ),
        })
      )
    );
  }),
  P0 = "MenuItemIndicator",
  [N0, UC] = mo(P0, { checked: !1 }),
  BC = f.forwardRef((e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e,
      i = UC(P0, n);
    return f.createElement(
      ar,
      { present: r || Kl(i.checked) || i.checked === !0 },
      f.createElement(
        De.span,
        V({}, o, { ref: t, "data-state": tf(i.checked) })
      )
    );
  }),
  HC = f.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return f.createElement(
      De.div,
      V({ role: "separator", "aria-orientation": "horizontal" }, r, { ref: t })
    );
  }),
  VC = "MenuSub",
  [yk, A0] = mo(VC),
  Ya = "MenuSubTrigger",
  WC = f.forwardRef((e, t) => {
    const n = ho(Ya, e.__scopeMenu),
      r = xa(Ya, e.__scopeMenu),
      o = A0(Ya, e.__scopeMenu),
      i = Zd(Ya, e.__scopeMenu),
      a = f.useRef(null),
      { pointerGraceTimerRef: l, onPointerGraceIntentChange: s } = i,
      c = { __scopeMenu: e.__scopeMenu },
      d = f.useCallback(() => {
        a.current && window.clearTimeout(a.current), (a.current = null);
      }, []);
    return (
      f.useEffect(() => d, [d]),
      f.useEffect(() => {
        const u = l.current;
        return () => {
          window.clearTimeout(u), s(null);
        };
      }, [l, s]),
      f.createElement(
        _0,
        V({ asChild: !0 }, c),
        f.createElement(
          T0,
          V(
            {
              id: o.triggerId,
              "aria-haspopup": "menu",
              "aria-expanded": n.open,
              "aria-controls": o.contentId,
              "data-state": D0(n.open),
            },
            e,
            {
              ref: fs(t, o.onTriggerChange),
              onClick: (u) => {
                var p;
                (p = e.onClick) === null || p === void 0 || p.call(e, u),
                  !(e.disabled || u.defaultPrevented) &&
                    (u.currentTarget.focus(), n.open || n.onOpenChange(!0));
              },
              onPointerMove: le(
                e.onPointerMove,
                ca((u) => {
                  i.onItemEnter(u),
                    !u.defaultPrevented &&
                      !e.disabled &&
                      !n.open &&
                      !a.current &&
                      (i.onPointerGraceIntentChange(null),
                      (a.current = window.setTimeout(() => {
                        n.onOpenChange(!0), d();
                      }, 100)));
                })
              ),
              onPointerLeave: le(
                e.onPointerLeave,
                ca((u) => {
                  var p;
                  d();
                  const y =
                    (p = n.content) === null || p === void 0
                      ? void 0
                      : p.getBoundingClientRect();
                  if (y) {
                    var v;
                    const g =
                        (v = n.content) === null || v === void 0
                          ? void 0
                          : v.dataset.side,
                      x = g === "right",
                      m = x ? -5 : 5,
                      h = y[x ? "left" : "right"],
                      w = y[x ? "right" : "left"];
                    i.onPointerGraceIntentChange({
                      area: [
                        { x: u.clientX + m, y: u.clientY },
                        { x: h, y: y.top },
                        { x: w, y: y.top },
                        { x: w, y: y.bottom },
                        { x: h, y: y.bottom },
                      ],
                      side: g,
                    }),
                      window.clearTimeout(l.current),
                      (l.current = window.setTimeout(
                        () => i.onPointerGraceIntentChange(null),
                        300
                      ));
                  } else {
                    if ((i.onTriggerLeave(u), u.defaultPrevented)) return;
                    i.onPointerGraceIntentChange(null);
                  }
                })
              ),
              onKeyDown: le(e.onKeyDown, (u) => {
                const p = i.searchRef.current !== "";
                if (
                  !(e.disabled || (p && u.key === " ")) &&
                  EC[r.dir].includes(u.key)
                ) {
                  var y;
                  n.onOpenChange(!0),
                    (y = n.content) === null || y === void 0 || y.focus(),
                    u.preventDefault();
                }
              }),
            }
          )
        )
      )
    );
  }),
  KC = "MenuSubContent",
  GC = f.forwardRef((e, t) => {
    const n = k0(vn, e.__scopeMenu),
      { forceMount: r = n.forceMount, ...o } = e,
      i = ho(vn, e.__scopeMenu),
      a = xa(vn, e.__scopeMenu),
      l = A0(KC, e.__scopeMenu),
      s = f.useRef(null),
      c = ct(t, s);
    return f.createElement(
      sa.Provider,
      { scope: e.__scopeMenu },
      f.createElement(
        ar,
        { present: r || i.open },
        f.createElement(
          sa.Slot,
          { scope: e.__scopeMenu },
          f.createElement(
            Jd,
            V({ id: l.contentId, "aria-labelledby": l.triggerId }, o, {
              ref: c,
              align: "start",
              side: a.dir === "rtl" ? "left" : "right",
              disableOutsidePointerEvents: !1,
              disableOutsideScroll: !1,
              trapFocus: !1,
              onOpenAutoFocus: (d) => {
                var u;
                a.isUsingKeyboardRef.current &&
                  ((u = s.current) === null || u === void 0 || u.focus()),
                  d.preventDefault();
              },
              onCloseAutoFocus: (d) => d.preventDefault(),
              onFocusOutside: le(e.onFocusOutside, (d) => {
                d.target !== l.trigger && i.onOpenChange(!1);
              }),
              onEscapeKeyDown: le(e.onEscapeKeyDown, (d) => {
                a.onClose(), d.preventDefault();
              }),
              onKeyDown: le(e.onKeyDown, (d) => {
                const u = d.currentTarget.contains(d.target),
                  p = SC[a.dir].includes(d.key);
                if (u && p) {
                  var y;
                  i.onOpenChange(!1),
                    (y = l.trigger) === null || y === void 0 || y.focus(),
                    d.preventDefault();
                }
              }),
            })
          )
        )
      )
    );
  });
function D0(e) {
  return e ? "open" : "closed";
}
function Kl(e) {
  return e === "indeterminate";
}
function tf(e) {
  return Kl(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function YC(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function QC(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function XC(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((c) => c === t[0]) ? t[0] : t,
    i = n ? e.indexOf(n) : -1;
  let a = QC(e, Math.max(i, 0));
  o.length === 1 && (a = a.filter((c) => c !== n));
  const s = a.find((c) => c.toLowerCase().startsWith(o.toLowerCase()));
  return s !== n ? s : void 0;
}
function qC(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let i = 0, a = t.length - 1; i < t.length; a = i++) {
    const l = t[i].x,
      s = t[i].y,
      c = t[a].x,
      d = t[a].y;
    s > r != d > r && n < ((c - l) * (r - s)) / (d - s) + l && (o = !o);
  }
  return o;
}
function ZC(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return qC(n, t);
}
function ca(e) {
  return (t) => (t.pointerType === "mouse" ? e(t) : void 0);
}
const JC = kC,
  e$ = _0,
  t$ = PC,
  n$ = AC,
  r$ = MC,
  o$ = ef,
  i$ = LC,
  a$ = jC,
  l$ = BC,
  s$ = HC,
  c$ = WC,
  u$ = GC,
  O0 = "DropdownMenu",
  [d$, wk] = or(O0, [C0]),
  rn = C0(),
  [f$, M0] = d$(O0),
  p$ = (e) => {
    const {
        __scopeDropdownMenu: t,
        children: n,
        dir: r,
        open: o,
        defaultOpen: i,
        onOpenChange: a,
        modal: l = !0,
      } = e,
      s = rn(t),
      c = f.useRef(null),
      [d = !1, u] = ps({ prop: o, defaultProp: i, onChange: a });
    return f.createElement(
      f$,
      {
        scope: t,
        triggerId: no(),
        triggerRef: c,
        contentId: no(),
        open: d,
        onOpenChange: u,
        onOpenToggle: f.useCallback(() => u((p) => !p), [u]),
        modal: l,
      },
      f.createElement(
        JC,
        V({}, s, { open: d, onOpenChange: u, dir: r, modal: l }),
        n
      )
    );
  },
  m$ = "DropdownMenuTrigger",
  h$ = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e,
      i = M0(m$, n),
      a = rn(n);
    return f.createElement(
      e$,
      V({ asChild: !0 }, a),
      f.createElement(
        De.button,
        V(
          {
            type: "button",
            id: i.triggerId,
            "aria-haspopup": "menu",
            "aria-expanded": i.open,
            "aria-controls": i.open ? i.contentId : void 0,
            "data-state": i.open ? "open" : "closed",
            "data-disabled": r ? "" : void 0,
            disabled: r,
          },
          o,
          {
            ref: fs(t, i.triggerRef),
            onPointerDown: le(e.onPointerDown, (l) => {
              !r &&
                l.button === 0 &&
                l.ctrlKey === !1 &&
                (i.onOpenToggle(), i.open || l.preventDefault());
            }),
            onKeyDown: le(e.onKeyDown, (l) => {
              r ||
                (["Enter", " "].includes(l.key) && i.onOpenToggle(),
                l.key === "ArrowDown" && i.onOpenChange(!0),
                ["Enter", " ", "ArrowDown"].includes(l.key) &&
                  l.preventDefault());
            }),
          }
        )
      )
    );
  }),
  g$ = (e) => {
    const { __scopeDropdownMenu: t, ...n } = e,
      r = rn(t);
    return f.createElement(t$, V({}, r, n));
  },
  v$ = "DropdownMenuContent",
  y$ = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = M0(v$, n),
      i = rn(n),
      a = f.useRef(!1);
    return f.createElement(
      n$,
      V({ id: o.contentId, "aria-labelledby": o.triggerId }, i, r, {
        ref: t,
        onCloseAutoFocus: le(e.onCloseAutoFocus, (l) => {
          var s;
          a.current ||
            (s = o.triggerRef.current) === null ||
            s === void 0 ||
            s.focus(),
            (a.current = !1),
            l.preventDefault();
        }),
        onInteractOutside: le(e.onInteractOutside, (l) => {
          const s = l.detail.originalEvent,
            c = s.button === 0 && s.ctrlKey === !0,
            d = s.button === 2 || c;
          (!o.modal || d) && (a.current = !0);
        }),
        style: {
          ...e.style,
          "--radix-dropdown-menu-content-transform-origin":
            "var(--radix-popper-transform-origin)",
          "--radix-dropdown-menu-content-available-width":
            "var(--radix-popper-available-width)",
          "--radix-dropdown-menu-content-available-height":
            "var(--radix-popper-available-height)",
          "--radix-dropdown-menu-trigger-width":
            "var(--radix-popper-anchor-width)",
          "--radix-dropdown-menu-trigger-height":
            "var(--radix-popper-anchor-height)",
        },
      })
    );
  }),
  w$ = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = rn(n);
    return f.createElement(r$, V({}, o, r, { ref: t }));
  }),
  x$ = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = rn(n);
    return f.createElement(o$, V({}, o, r, { ref: t }));
  }),
  b$ = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = rn(n);
    return f.createElement(i$, V({}, o, r, { ref: t }));
  }),
  E$ = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = rn(n);
    return f.createElement(a$, V({}, o, r, { ref: t }));
  }),
  S$ = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = rn(n);
    return f.createElement(l$, V({}, o, r, { ref: t }));
  }),
  C$ = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = rn(n);
    return f.createElement(s$, V({}, o, r, { ref: t }));
  }),
  $$ = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = rn(n);
    return f.createElement(c$, V({}, o, r, { ref: t }));
  }),
  _$ = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = rn(n);
    return f.createElement(
      u$,
      V({}, o, r, {
        ref: t,
        style: {
          ...e.style,
          "--radix-dropdown-menu-content-transform-origin":
            "var(--radix-popper-transform-origin)",
          "--radix-dropdown-menu-content-available-width":
            "var(--radix-popper-available-width)",
          "--radix-dropdown-menu-content-available-height":
            "var(--radix-popper-available-height)",
          "--radix-dropdown-menu-trigger-width":
            "var(--radix-popper-anchor-width)",
          "--radix-dropdown-menu-trigger-height":
            "var(--radix-popper-anchor-height)",
        },
      })
    );
  }),
  R$ = p$,
  k$ = h$,
  T$ = g$,
  L0 = y$,
  I0 = w$,
  F0 = x$,
  z0 = b$,
  j0 = E$,
  U0 = S$,
  B0 = C$,
  H0 = $$,
  V0 = _$;
/**
 * @license lucide-react v0.319.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var P$ = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.319.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const N$ = (e) =>
    e
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .toLowerCase()
      .trim(),
  ws = (e, t) => {
    const n = f.forwardRef(
      (
        {
          color: r = "currentColor",
          size: o = 24,
          strokeWidth: i = 2,
          absoluteStrokeWidth: a,
          className: l = "",
          children: s,
          ...c
        },
        d
      ) =>
        f.createElement(
          "svg",
          {
            ref: d,
            ...P$,
            width: o,
            height: o,
            stroke: r,
            strokeWidth: a ? (Number(i) * 24) / Number(o) : i,
            className: ["lucide", `lucide-${N$(e)}`, l].join(" "),
            ...c,
          },
          [
            ...t.map(([u, p]) => f.createElement(u, p)),
            ...(Array.isArray(s) ? s : [s]),
          ]
        )
    );
    return (n.displayName = `${e}`), n;
  };
/**
 * @license lucide-react v0.319.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const A$ = ws("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.319.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const D$ = ws("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }],
]);
/**
 * @license lucide-react v0.319.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const O$ = ws("Circle", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
]);
/**
 * @license lucide-react v0.319.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const M$ = ws("X", [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
  ]),
  L$ = R$,
  I$ = k$,
  F$ = f.forwardRef(({ className: e, inset: t, children: n, ...r }, o) =>
    N.jsxs(H0, {
      ref: o,
      className: Ee(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
        t && "pl-8",
        e
      ),
      ...r,
      children: [n, N.jsx(D$, { className: "ml-auto h-4 w-4" })],
    })
  );
F$.displayName = H0.displayName;
const z$ = f.forwardRef(({ className: e, ...t }, n) =>
  N.jsx(V0, {
    ref: n,
    className: Ee(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...t,
  })
);
z$.displayName = V0.displayName;
const W0 = f.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) =>
  N.jsx(T$, {
    children: N.jsx(L0, {
      ref: r,
      sideOffset: t,
      className: Ee(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        e
      ),
      ...n,
    }),
  })
);
W0.displayName = L0.displayName;
const ku = f.forwardRef(({ className: e, inset: t, ...n }, r) =>
  N.jsx(F0, {
    ref: r,
    className: Ee(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      t && "pl-8",
      e
    ),
    ...n,
  })
);
ku.displayName = F0.displayName;
const j$ = f.forwardRef(({ className: e, children: t, checked: n, ...r }, o) =>
  N.jsxs(z0, {
    ref: o,
    className: Ee(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      N.jsx("span", {
        className:
          "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
        children: N.jsx(U0, { children: N.jsx(A$, { className: "h-4 w-4" }) }),
      }),
      t,
    ],
  })
);
j$.displayName = z0.displayName;
const U$ = f.forwardRef(({ className: e, children: t, ...n }, r) =>
  N.jsxs(j0, {
    ref: r,
    className: Ee(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    ...n,
    children: [
      N.jsx("span", {
        className:
          "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
        children: N.jsx(U0, {
          children: N.jsx(O$, { className: "h-2 w-2 fill-current" }),
        }),
      }),
      t,
    ],
  })
);
U$.displayName = j0.displayName;
const B$ = f.forwardRef(({ className: e, inset: t, ...n }, r) =>
  N.jsx(I0, {
    ref: r,
    className: Ee("px-2 py-1.5 text-sm font-semibold", t && "pl-8", e),
    ...n,
  })
);
B$.displayName = I0.displayName;
const H$ = f.forwardRef(({ className: e, ...t }, n) =>
  N.jsx(B0, { ref: n, className: Ee("-mx-1 my-1 h-px bg-muted", e), ...t })
);
H$.displayName = B0.displayName;
const Tu = "horizontal",
  V$ = ["horizontal", "vertical"],
  K0 = f.forwardRef((e, t) => {
    const { decorative: n, orientation: r = Tu, ...o } = e,
      i = G0(r) ? r : Tu,
      l = n
        ? { role: "none" }
        : {
            "aria-orientation": i === "vertical" ? i : void 0,
            role: "separator",
          };
    return f.createElement(
      De.div,
      V({ "data-orientation": i }, l, o, { ref: t })
    );
  });
K0.propTypes = {
  orientation(e, t, n) {
    const r = e[t],
      o = String(r);
    return r && !G0(r) ? new Error(W$(o, n)) : null;
  },
};
function W$(e, t) {
  return `Invalid prop \`orientation\` of value \`${e}\` supplied to \`${t}\`, expected one of:
  - horizontal
  - vertical

Defaulting to \`${Tu}\`.`;
}
function G0(e) {
  return V$.includes(e);
}
const Y0 = K0,
  Q0 = f.forwardRef(
    (
      { className: e, orientation: t = "horizontal", decorative: n = !0, ...r },
      o
    ) =>
      N.jsx(Y0, {
        ref: o,
        decorative: n,
        orientation: t,
        className: Ee(
          "shrink-0 bg-border",
          t === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          e
        ),
        ...r,
      })
  );
Q0.displayName = Y0.displayName;
const X0 = "Tabs",
  [K$, xk] = or(X0, [gs]),
  q0 = gs(),
  [G$, nf] = K$(X0),
  Y$ = f.forwardRef((e, t) => {
    const {
        __scopeTabs: n,
        value: r,
        onValueChange: o,
        defaultValue: i,
        orientation: a = "horizontal",
        dir: l,
        activationMode: s = "automatic",
        ...c
      } = e,
      d = Hd(l),
      [u, p] = ps({ prop: r, onChange: o, defaultProp: i });
    return f.createElement(
      G$,
      {
        scope: n,
        baseId: no(),
        value: u,
        onValueChange: p,
        orientation: a,
        dir: d,
        activationMode: s,
      },
      f.createElement(
        De.div,
        V({ dir: d, "data-orientation": a }, c, { ref: t })
      )
    );
  }),
  Q$ = "TabsList",
  X$ = f.forwardRef((e, t) => {
    const { __scopeTabs: n, loop: r = !0, ...o } = e,
      i = nf(Q$, n),
      a = q0(n);
    return f.createElement(
      u0,
      V({ asChild: !0 }, a, {
        orientation: i.orientation,
        dir: i.dir,
        loop: r,
      }),
      f.createElement(
        De.div,
        V({ role: "tablist", "aria-orientation": i.orientation }, o, { ref: t })
      )
    );
  }),
  q$ = "TabsTrigger",
  Z$ = f.forwardRef((e, t) => {
    const { __scopeTabs: n, value: r, disabled: o = !1, ...i } = e,
      a = nf(q$, n),
      l = q0(n),
      s = Z0(a.baseId, r),
      c = J0(a.baseId, r),
      d = r === a.value;
    return f.createElement(
      d0,
      V({ asChild: !0 }, l, { focusable: !o, active: d }),
      f.createElement(
        De.button,
        V(
          {
            type: "button",
            role: "tab",
            "aria-selected": d,
            "aria-controls": c,
            "data-state": d ? "active" : "inactive",
            "data-disabled": o ? "" : void 0,
            disabled: o,
            id: s,
          },
          i,
          {
            ref: t,
            onMouseDown: le(e.onMouseDown, (u) => {
              !o && u.button === 0 && u.ctrlKey === !1
                ? a.onValueChange(r)
                : u.preventDefault();
            }),
            onKeyDown: le(e.onKeyDown, (u) => {
              [" ", "Enter"].includes(u.key) && a.onValueChange(r);
            }),
            onFocus: le(e.onFocus, () => {
              const u = a.activationMode !== "manual";
              !d && !o && u && a.onValueChange(r);
            }),
          }
        )
      )
    );
  }),
  J$ = "TabsContent",
  e_ = f.forwardRef((e, t) => {
    const { __scopeTabs: n, value: r, forceMount: o, children: i, ...a } = e,
      l = nf(J$, n),
      s = Z0(l.baseId, r),
      c = J0(l.baseId, r),
      d = r === l.value,
      u = f.useRef(d);
    return (
      f.useEffect(() => {
        const p = requestAnimationFrame(() => (u.current = !1));
        return () => cancelAnimationFrame(p);
      }, []),
      f.createElement(ar, { present: o || d }, ({ present: p }) =>
        f.createElement(
          De.div,
          V(
            {
              "data-state": d ? "active" : "inactive",
              "data-orientation": l.orientation,
              role: "tabpanel",
              "aria-labelledby": s,
              hidden: !p,
              id: c,
              tabIndex: 0,
            },
            a,
            {
              ref: t,
              style: {
                ...e.style,
                animationDuration: u.current ? "0s" : void 0,
              },
            }
          ),
          p && i
        )
      )
    );
  });
function Z0(e, t) {
  return `${e}-trigger-${t}`;
}
function J0(e, t) {
  return `${e}-content-${t}`;
}
const t_ = Y$,
  ey = X$,
  ty = Z$,
  ny = e_,
  n_ = t_,
  ry = f.forwardRef(({ className: e, ...t }, n) =>
    N.jsx(ey, {
      ref: n,
      className: Ee(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        e
      ),
      ...t,
    })
  );
ry.displayName = ey.displayName;
const oy = f.forwardRef(({ className: e, ...t }, n) =>
  N.jsx(ty, {
    ref: n,
    className: Ee(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      e
    ),
    ...t,
  })
);
oy.displayName = ty.displayName;
const r_ = f.forwardRef(({ className: e, ...t }, n) =>
  N.jsx(ny, {
    ref: n,
    className: Ee(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      e
    ),
    ...t,
  })
);
r_.displayName = ny.displayName;
const o_ = ({ label: e, value: t, path: n, className: r }) =>
  N.jsx(aE, {
    to: n,
    children: N.jsx(oy, { className: r, value: t, children: e }),
  });
function xs(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    o,
    i;
  for (i = 0; i < r.length; i++)
    (o = r[i]), !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
var i_ = ["color"],
  bk = f.forwardRef(function (e, t) {
    var n = e.color,
      r = n === void 0 ? "currentColor" : n,
      o = xs(e, i_);
    return f.createElement(
      "svg",
      Object.assign(
        {
          width: "15",
          height: "15",
          viewBox: "0 0 15 15",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
        },
        o,
        { ref: t }
      ),
      f.createElement("path", {
        d: "M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z",
        fill: r,
        fillRule: "evenodd",
        clipRule: "evenodd",
      })
    );
  }),
  a_ = ["color"],
  l_ = f.forwardRef(function (e, t) {
    var n = e.color,
      r = n === void 0 ? "currentColor" : n,
      o = xs(e, a_);
    return f.createElement(
      "svg",
      Object.assign(
        {
          width: "15",
          height: "15",
          viewBox: "0 0 15 15",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
        },
        o,
        { ref: t }
      ),
      f.createElement("path", {
        d: "M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z",
        fill: r,
        fillRule: "evenodd",
        clipRule: "evenodd",
      })
    );
  }),
  s_ = ["color"],
  Ek = f.forwardRef(function (e, t) {
    var n = e.color,
      r = n === void 0 ? "currentColor" : n,
      o = xs(e, s_);
    return f.createElement(
      "svg",
      Object.assign(
        {
          width: "15",
          height: "15",
          viewBox: "0 0 15 15",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
        },
        o,
        { ref: t }
      ),
      f.createElement("path", {
        d: "M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z",
        fill: r,
        fillRule: "evenodd",
        clipRule: "evenodd",
      })
    );
  }),
  c_ = ["color"],
  Sk = f.forwardRef(function (e, t) {
    var n = e.color,
      r = n === void 0 ? "currentColor" : n,
      o = xs(e, c_);
    return f.createElement(
      "svg",
      Object.assign(
        {
          width: "15",
          height: "15",
          viewBox: "0 0 15 15",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
        },
        o,
        { ref: t }
      ),
      f.createElement("path", {
        d: "M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8182 4.81828C10.994 4.64254 10.994 4.35762 10.8182 4.18188L7.81825 1.18188ZM2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12C3 12.5538 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12C13 13.104 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z",
        fill: r,
        fillRule: "evenodd",
        clipRule: "evenodd",
      })
    );
  });
function iy(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: u_ } = Object.prototype,
  { getPrototypeOf: rf } = Object,
  bs = ((e) => (t) => {
    const n = u_.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  On = (e) => ((e = e.toLowerCase()), (t) => bs(t) === e),
  Es = (e) => (t) => typeof t === e,
  { isArray: ai } = Array,
  ua = Es("undefined");
function d_(e) {
  return (
    e !== null &&
    !ua(e) &&
    e.constructor !== null &&
    !ua(e.constructor) &&
    Zt(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const ay = On("ArrayBuffer");
function f_(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && ay(e.buffer)),
    t
  );
}
const p_ = Es("string"),
  Zt = Es("function"),
  ly = Es("number"),
  Ss = (e) => e !== null && typeof e == "object",
  m_ = (e) => e === !0 || e === !1,
  ml = (e) => {
    if (bs(e) !== "object") return !1;
    const t = rf(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(Symbol.toStringTag in e) &&
      !(Symbol.iterator in e)
    );
  },
  h_ = On("Date"),
  g_ = On("File"),
  v_ = On("Blob"),
  y_ = On("FileList"),
  w_ = (e) => Ss(e) && Zt(e.pipe),
  x_ = (e) => {
    let t;
    return (
      e &&
      ((typeof FormData == "function" && e instanceof FormData) ||
        (Zt(e.append) &&
          ((t = bs(e)) === "formdata" ||
            (t === "object" &&
              Zt(e.toString) &&
              e.toString() === "[object FormData]"))))
    );
  },
  b_ = On("URLSearchParams"),
  E_ = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ba(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let r, o;
  if ((typeof e != "object" && (e = [e]), ai(e)))
    for (r = 0, o = e.length; r < o; r++) t.call(null, e[r], r, e);
  else {
    const i = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      a = i.length;
    let l;
    for (r = 0; r < a; r++) (l = i[r]), t.call(null, e[l], l, e);
  }
}
function sy(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length,
    o;
  for (; r-- > 0; ) if (((o = n[r]), t === o.toLowerCase())) return o;
  return null;
}
const cy =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : global,
  uy = (e) => !ua(e) && e !== cy;
function Pu() {
  const { caseless: e } = (uy(this) && this) || {},
    t = {},
    n = (r, o) => {
      const i = (e && sy(t, o)) || o;
      ml(t[i]) && ml(r)
        ? (t[i] = Pu(t[i], r))
        : ml(r)
        ? (t[i] = Pu({}, r))
        : ai(r)
        ? (t[i] = r.slice())
        : (t[i] = r);
    };
  for (let r = 0, o = arguments.length; r < o; r++)
    arguments[r] && ba(arguments[r], n);
  return t;
}
const S_ = (e, t, n, { allOwnKeys: r } = {}) => (
    ba(
      t,
      (o, i) => {
        n && Zt(o) ? (e[i] = iy(o, n)) : (e[i] = o);
      },
      { allOwnKeys: r }
    ),
    e
  ),
  C_ = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  $_ = (e, t, n, r) => {
    (e.prototype = Object.create(t.prototype, r)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, "super", { value: t.prototype }),
      n && Object.assign(e.prototype, n);
  },
  __ = (e, t, n, r) => {
    let o, i, a;
    const l = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (o = Object.getOwnPropertyNames(e), i = o.length; i-- > 0; )
        (a = o[i]), (!r || r(a, e, t)) && !l[a] && ((t[a] = e[a]), (l[a] = !0));
      e = n !== !1 && rf(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  R_ = (e, t, n) => {
    (e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length);
    const r = e.indexOf(t, n);
    return r !== -1 && r === n;
  },
  k_ = (e) => {
    if (!e) return null;
    if (ai(e)) return e;
    let t = e.length;
    if (!ly(t)) return null;
    const n = new Array(t);
    for (; t-- > 0; ) n[t] = e[t];
    return n;
  },
  T_ = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && rf(Uint8Array)),
  P_ = (e, t) => {
    const r = (e && e[Symbol.iterator]).call(e);
    let o;
    for (; (o = r.next()) && !o.done; ) {
      const i = o.value;
      t.call(e, i[0], i[1]);
    }
  },
  N_ = (e, t) => {
    let n;
    const r = [];
    for (; (n = e.exec(t)) !== null; ) r.push(n);
    return r;
  },
  A_ = On("HTMLFormElement"),
  D_ = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, o) {
      return r.toUpperCase() + o;
    }),
  gm = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  O_ = On("RegExp"),
  dy = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = {};
    ba(n, (o, i) => {
      let a;
      (a = t(o, i, e)) !== !1 && (r[i] = a || o);
    }),
      Object.defineProperties(e, r);
  },
  M_ = (e) => {
    dy(e, (t, n) => {
      if (Zt(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
        return !1;
      const r = e[n];
      if (Zt(r)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'");
          });
      }
    });
  },
  L_ = (e, t) => {
    const n = {},
      r = (o) => {
        o.forEach((i) => {
          n[i] = !0;
        });
      };
    return ai(e) ? r(e) : r(String(e).split(t)), n;
  },
  I_ = () => {},
  F_ = (e, t) => ((e = +e), Number.isFinite(e) ? e : t),
  dc = "abcdefghijklmnopqrstuvwxyz",
  vm = "0123456789",
  fy = { DIGIT: vm, ALPHA: dc, ALPHA_DIGIT: dc + dc.toUpperCase() + vm },
  z_ = (e = 16, t = fy.ALPHA_DIGIT) => {
    let n = "";
    const { length: r } = t;
    for (; e--; ) n += t[(Math.random() * r) | 0];
    return n;
  };
function j_(e) {
  return !!(
    e &&
    Zt(e.append) &&
    e[Symbol.toStringTag] === "FormData" &&
    e[Symbol.iterator]
  );
}
const U_ = (e) => {
    const t = new Array(10),
      n = (r, o) => {
        if (Ss(r)) {
          if (t.indexOf(r) >= 0) return;
          if (!("toJSON" in r)) {
            t[o] = r;
            const i = ai(r) ? [] : {};
            return (
              ba(r, (a, l) => {
                const s = n(a, o + 1);
                !ua(s) && (i[l] = s);
              }),
              (t[o] = void 0),
              i
            );
          }
        }
        return r;
      };
    return n(e, 0);
  },
  B_ = On("AsyncFunction"),
  H_ = (e) => e && (Ss(e) || Zt(e)) && Zt(e.then) && Zt(e.catch),
  A = {
    isArray: ai,
    isArrayBuffer: ay,
    isBuffer: d_,
    isFormData: x_,
    isArrayBufferView: f_,
    isString: p_,
    isNumber: ly,
    isBoolean: m_,
    isObject: Ss,
    isPlainObject: ml,
    isUndefined: ua,
    isDate: h_,
    isFile: g_,
    isBlob: v_,
    isRegExp: O_,
    isFunction: Zt,
    isStream: w_,
    isURLSearchParams: b_,
    isTypedArray: T_,
    isFileList: y_,
    forEach: ba,
    merge: Pu,
    extend: S_,
    trim: E_,
    stripBOM: C_,
    inherits: $_,
    toFlatObject: __,
    kindOf: bs,
    kindOfTest: On,
    endsWith: R_,
    toArray: k_,
    forEachEntry: P_,
    matchAll: N_,
    isHTMLForm: A_,
    hasOwnProperty: gm,
    hasOwnProp: gm,
    reduceDescriptors: dy,
    freezeMethods: M_,
    toObjectSet: L_,
    toCamelCase: D_,
    noop: I_,
    toFiniteNumber: F_,
    findKey: sy,
    global: cy,
    isContextDefined: uy,
    ALPHABET: fy,
    generateString: z_,
    isSpecCompliantForm: j_,
    toJSONObject: U_,
    isAsyncFn: B_,
    isThenable: H_,
  };
function ve(e, t, n, r, o) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = "AxiosError"),
    t && (this.code = t),
    n && (this.config = n),
    r && (this.request = r),
    o && (this.response = o);
}
A.inherits(ve, Error, {
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
      config: A.toJSONObject(this.config),
      code: this.code,
      status:
        this.response && this.response.status ? this.response.status : null,
    };
  },
});
const py = ve.prototype,
  my = {};
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
].forEach((e) => {
  my[e] = { value: e };
});
Object.defineProperties(ve, my);
Object.defineProperty(py, "isAxiosError", { value: !0 });
ve.from = (e, t, n, r, o, i) => {
  const a = Object.create(py);
  return (
    A.toFlatObject(
      e,
      a,
      function (s) {
        return s !== Error.prototype;
      },
      (l) => l !== "isAxiosError"
    ),
    ve.call(a, e.message, t, n, r, o),
    (a.cause = e),
    (a.name = e.name),
    i && Object.assign(a, i),
    a
  );
};
const V_ = null;
function Nu(e) {
  return A.isPlainObject(e) || A.isArray(e);
}
function hy(e) {
  return A.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function ym(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (o, i) {
          return (o = hy(o)), !n && i ? "[" + o + "]" : o;
        })
        .join(n ? "." : "")
    : t;
}
function W_(e) {
  return A.isArray(e) && !e.some(Nu);
}
const K_ = A.toFlatObject(A, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function Cs(e, t, n) {
  if (!A.isObject(e)) throw new TypeError("target must be an object");
  (t = t || new FormData()),
    (n = A.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (g, x) {
        return !A.isUndefined(x[g]);
      }
    ));
  const r = n.metaTokens,
    o = n.visitor || d,
    i = n.dots,
    a = n.indexes,
    s = (n.Blob || (typeof Blob < "u" && Blob)) && A.isSpecCompliantForm(t);
  if (!A.isFunction(o)) throw new TypeError("visitor must be a function");
  function c(v) {
    if (v === null) return "";
    if (A.isDate(v)) return v.toISOString();
    if (!s && A.isBlob(v))
      throw new ve("Blob is not supported. Use a Buffer instead.");
    return A.isArrayBuffer(v) || A.isTypedArray(v)
      ? s && typeof Blob == "function"
        ? new Blob([v])
        : Buffer.from(v)
      : v;
  }
  function d(v, g, x) {
    let m = v;
    if (v && !x && typeof v == "object") {
      if (A.endsWith(g, "{}"))
        (g = r ? g : g.slice(0, -2)), (v = JSON.stringify(v));
      else if (
        (A.isArray(v) && W_(v)) ||
        ((A.isFileList(v) || A.endsWith(g, "[]")) && (m = A.toArray(v)))
      )
        return (
          (g = hy(g)),
          m.forEach(function (w, E) {
            !(A.isUndefined(w) || w === null) &&
              t.append(
                a === !0 ? ym([g], E, i) : a === null ? g : g + "[]",
                c(w)
              );
          }),
          !1
        );
    }
    return Nu(v) ? !0 : (t.append(ym(x, g, i), c(v)), !1);
  }
  const u = [],
    p = Object.assign(K_, {
      defaultVisitor: d,
      convertValue: c,
      isVisitable: Nu,
    });
  function y(v, g) {
    if (!A.isUndefined(v)) {
      if (u.indexOf(v) !== -1)
        throw Error("Circular reference detected in " + g.join("."));
      u.push(v),
        A.forEach(v, function (m, h) {
          (!(A.isUndefined(m) || m === null) &&
            o.call(t, m, A.isString(h) ? h.trim() : h, g, p)) === !0 &&
            y(m, g ? g.concat(h) : [h]);
        }),
        u.pop();
    }
  }
  if (!A.isObject(e)) throw new TypeError("data must be an object");
  return y(e), t;
}
function wm(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
    return t[r];
  });
}
function of(e, t) {
  (this._pairs = []), e && Cs(e, this, t);
}
const gy = of.prototype;
gy.append = function (t, n) {
  this._pairs.push([t, n]);
};
gy.toString = function (t) {
  const n = t
    ? function (r) {
        return t.call(this, r, wm);
      }
    : wm;
  return this._pairs
    .map(function (o) {
      return n(o[0]) + "=" + n(o[1]);
    }, "")
    .join("&");
};
function G_(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function vy(e, t, n) {
  if (!t) return e;
  const r = (n && n.encode) || G_,
    o = n && n.serialize;
  let i;
  if (
    (o
      ? (i = o(t, n))
      : (i = A.isURLSearchParams(t) ? t.toString() : new of(t, n).toString(r)),
    i)
  ) {
    const a = e.indexOf("#");
    a !== -1 && (e = e.slice(0, a)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + i);
  }
  return e;
}
class xm {
  constructor() {
    this.handlers = [];
  }
  use(t, n, r) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    A.forEach(this.handlers, function (r) {
      r !== null && t(r);
    });
  }
}
const yy = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  Y_ = typeof URLSearchParams < "u" ? URLSearchParams : of,
  Q_ = typeof FormData < "u" ? FormData : null,
  X_ = typeof Blob < "u" ? Blob : null,
  q_ = {
    isBrowser: !0,
    classes: { URLSearchParams: Y_, FormData: Q_, Blob: X_ },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  wy = typeof window < "u" && typeof document < "u",
  Z_ = ((e) => wy && ["ReactNative", "NativeScript", "NS"].indexOf(e) < 0)(
    typeof navigator < "u" && navigator.product
  ),
  J_ =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  e3 = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: wy,
        hasStandardBrowserEnv: Z_,
        hasStandardBrowserWebWorkerEnv: J_,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Tn = { ...e3, ...q_ };
function t3(e, t) {
  return Cs(
    e,
    new Tn.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (n, r, o, i) {
          return Tn.isNode && A.isBuffer(n)
            ? (this.append(r, n.toString("base64")), !1)
            : i.defaultVisitor.apply(this, arguments);
        },
      },
      t
    )
  );
}
function n3(e) {
  return A.matchAll(/\w+|\[(\w*)]/g, e).map((t) =>
    t[0] === "[]" ? "" : t[1] || t[0]
  );
}
function r3(e) {
  const t = {},
    n = Object.keys(e);
  let r;
  const o = n.length;
  let i;
  for (r = 0; r < o; r++) (i = n[r]), (t[i] = e[i]);
  return t;
}
function xy(e) {
  function t(n, r, o, i) {
    let a = n[i++];
    if (a === "__proto__") return !0;
    const l = Number.isFinite(+a),
      s = i >= n.length;
    return (
      (a = !a && A.isArray(o) ? o.length : a),
      s
        ? (A.hasOwnProp(o, a) ? (o[a] = [o[a], r]) : (o[a] = r), !l)
        : ((!o[a] || !A.isObject(o[a])) && (o[a] = []),
          t(n, r, o[a], i) && A.isArray(o[a]) && (o[a] = r3(o[a])),
          !l)
    );
  }
  if (A.isFormData(e) && A.isFunction(e.entries)) {
    const n = {};
    return (
      A.forEachEntry(e, (r, o) => {
        t(n3(r), o, n, 0);
      }),
      n
    );
  }
  return null;
}
function o3(e, t, n) {
  if (A.isString(e))
    try {
      return (t || JSON.parse)(e), A.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError") throw r;
    }
  return (n || JSON.stringify)(e);
}
const af = {
  transitional: yy,
  adapter: ["xhr", "http"],
  transformRequest: [
    function (t, n) {
      const r = n.getContentType() || "",
        o = r.indexOf("application/json") > -1,
        i = A.isObject(t);
      if ((i && A.isHTMLForm(t) && (t = new FormData(t)), A.isFormData(t)))
        return o ? JSON.stringify(xy(t)) : t;
      if (
        A.isArrayBuffer(t) ||
        A.isBuffer(t) ||
        A.isStream(t) ||
        A.isFile(t) ||
        A.isBlob(t)
      )
        return t;
      if (A.isArrayBufferView(t)) return t.buffer;
      if (A.isURLSearchParams(t))
        return (
          n.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          t.toString()
        );
      let l;
      if (i) {
        if (r.indexOf("application/x-www-form-urlencoded") > -1)
          return t3(t, this.formSerializer).toString();
        if ((l = A.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
          const s = this.env && this.env.FormData;
          return Cs(
            l ? { "files[]": t } : t,
            s && new s(),
            this.formSerializer
          );
        }
      }
      return i || o ? (n.setContentType("application/json", !1), o3(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const n = this.transitional || af.transitional,
        r = n && n.forcedJSONParsing,
        o = this.responseType === "json";
      if (t && A.isString(t) && ((r && !this.responseType) || o)) {
        const a = !(n && n.silentJSONParsing) && o;
        try {
          return JSON.parse(t);
        } catch (l) {
          if (a)
            throw l.name === "SyntaxError"
              ? ve.from(l, ve.ERR_BAD_RESPONSE, this, null, this.response)
              : l;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: Tn.classes.FormData, Blob: Tn.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
A.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  af.headers[e] = {};
});
const lf = af,
  i3 = A.toObjectSet([
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
  a3 = (e) => {
    const t = {};
    let n, r, o;
    return (
      e &&
        e
          .split(
            `
`
          )
          .forEach(function (a) {
            (o = a.indexOf(":")),
              (n = a.substring(0, o).trim().toLowerCase()),
              (r = a.substring(o + 1).trim()),
              !(!n || (t[n] && i3[n])) &&
                (n === "set-cookie"
                  ? t[n]
                    ? t[n].push(r)
                    : (t[n] = [r])
                  : (t[n] = t[n] ? t[n] + ", " + r : r));
          }),
      t
    );
  },
  bm = Symbol("internals");
function Ei(e) {
  return e && String(e).trim().toLowerCase();
}
function hl(e) {
  return e === !1 || e == null ? e : A.isArray(e) ? e.map(hl) : String(e);
}
function l3(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; (r = n.exec(e)); ) t[r[1]] = r[2];
  return t;
}
const s3 = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function fc(e, t, n, r, o) {
  if (A.isFunction(r)) return r.call(this, t, n);
  if ((o && (t = n), !!A.isString(t))) {
    if (A.isString(r)) return t.indexOf(r) !== -1;
    if (A.isRegExp(r)) return r.test(t);
  }
}
function c3(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function u3(e, t) {
  const n = A.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function (o, i, a) {
        return this[r].call(this, t, o, i, a);
      },
      configurable: !0,
    });
  });
}
class $s {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const o = this;
    function i(l, s, c) {
      const d = Ei(s);
      if (!d) throw new Error("header name must be a non-empty string");
      const u = A.findKey(o, d);
      (!u || o[u] === void 0 || c === !0 || (c === void 0 && o[u] !== !1)) &&
        (o[u || s] = hl(l));
    }
    const a = (l, s) => A.forEach(l, (c, d) => i(c, d, s));
    return (
      A.isPlainObject(t) || t instanceof this.constructor
        ? a(t, n)
        : A.isString(t) && (t = t.trim()) && !s3(t)
        ? a(a3(t), n)
        : t != null && i(n, t, r),
      this
    );
  }
  get(t, n) {
    if (((t = Ei(t)), t)) {
      const r = A.findKey(this, t);
      if (r) {
        const o = this[r];
        if (!n) return o;
        if (n === !0) return l3(o);
        if (A.isFunction(n)) return n.call(this, o, r);
        if (A.isRegExp(n)) return n.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (((t = Ei(t)), t)) {
      const r = A.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || fc(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let o = !1;
    function i(a) {
      if (((a = Ei(a)), a)) {
        const l = A.findKey(r, a);
        l && (!n || fc(r, r[l], l, n)) && (delete r[l], (o = !0));
      }
    }
    return A.isArray(t) ? t.forEach(i) : i(t), o;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length,
      o = !1;
    for (; r--; ) {
      const i = n[r];
      (!t || fc(this, this[i], i, t, !0)) && (delete this[i], (o = !0));
    }
    return o;
  }
  normalize(t) {
    const n = this,
      r = {};
    return (
      A.forEach(this, (o, i) => {
        const a = A.findKey(r, i);
        if (a) {
          (n[a] = hl(o)), delete n[i];
          return;
        }
        const l = t ? c3(i) : String(i).trim();
        l !== i && delete n[i], (n[l] = hl(o)), (r[l] = !0);
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = Object.create(null);
    return (
      A.forEach(this, (r, o) => {
        r != null && r !== !1 && (n[o] = t && A.isArray(r) ? r.join(", ") : r);
      }),
      n
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((o) => r.set(o)), r;
  }
  static accessor(t) {
    const r = (this[bm] = this[bm] = { accessors: {} }).accessors,
      o = this.prototype;
    function i(a) {
      const l = Ei(a);
      r[l] || (u3(o, a), (r[l] = !0));
    }
    return A.isArray(t) ? t.forEach(i) : i(t), this;
  }
}
$s.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
A.reduceDescriptors($s.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    },
  };
});
A.freezeMethods($s);
const Yn = $s;
function pc(e, t) {
  const n = this || lf,
    r = t || n,
    o = Yn.from(r.headers);
  let i = r.data;
  return (
    A.forEach(e, function (l) {
      i = l.call(n, i, o.normalize(), t ? t.status : void 0);
    }),
    o.normalize(),
    i
  );
}
function by(e) {
  return !!(e && e.__CANCEL__);
}
function Ea(e, t, n) {
  ve.call(this, e ?? "canceled", ve.ERR_CANCELED, t, n),
    (this.name = "CanceledError");
}
A.inherits(Ea, ve, { __CANCEL__: !0 });
function d3(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status)
    ? e(n)
    : t(
        new ve(
          "Request failed with status code " + n.status,
          [ve.ERR_BAD_REQUEST, ve.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n
        )
      );
}
const f3 = Tn.hasStandardBrowserEnv
  ? {
      write(e, t, n, r, o, i) {
        const a = [e + "=" + encodeURIComponent(t)];
        A.isNumber(n) && a.push("expires=" + new Date(n).toGMTString()),
          A.isString(r) && a.push("path=" + r),
          A.isString(o) && a.push("domain=" + o),
          i === !0 && a.push("secure"),
          (document.cookie = a.join("; "));
      },
      read(e) {
        const t = document.cookie.match(
          new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
        );
        return t ? decodeURIComponent(t[3]) : null;
      },
      remove(e) {
        this.write(e, "", Date.now() - 864e5);
      },
    }
  : {
      write() {},
      read() {
        return null;
      },
      remove() {},
    };
function p3(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function m3(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Ey(e, t) {
  return e && !p3(t) ? m3(e, t) : t;
}
const h3 = Tn.hasStandardBrowserEnv
  ? (function () {
      const t = /(msie|trident)/i.test(navigator.userAgent),
        n = document.createElement("a");
      let r;
      function o(i) {
        let a = i;
        return (
          t && (n.setAttribute("href", a), (a = n.href)),
          n.setAttribute("href", a),
          {
            href: n.href,
            protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
            host: n.host,
            search: n.search ? n.search.replace(/^\?/, "") : "",
            hash: n.hash ? n.hash.replace(/^#/, "") : "",
            hostname: n.hostname,
            port: n.port,
            pathname:
              n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname,
          }
        );
      }
      return (
        (r = o(window.location.href)),
        function (a) {
          const l = A.isString(a) ? o(a) : a;
          return l.protocol === r.protocol && l.host === r.host;
        }
      );
    })()
  : (function () {
      return function () {
        return !0;
      };
    })();
function g3(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || "";
}
function v3(e, t) {
  e = e || 10;
  const n = new Array(e),
    r = new Array(e);
  let o = 0,
    i = 0,
    a;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (s) {
      const c = Date.now(),
        d = r[i];
      a || (a = c), (n[o] = s), (r[o] = c);
      let u = i,
        p = 0;
      for (; u !== o; ) (p += n[u++]), (u = u % e);
      if (((o = (o + 1) % e), o === i && (i = (i + 1) % e), c - a < t)) return;
      const y = d && c - d;
      return y ? Math.round((p * 1e3) / y) : void 0;
    }
  );
}
function Em(e, t) {
  let n = 0;
  const r = v3(50, 250);
  return (o) => {
    const i = o.loaded,
      a = o.lengthComputable ? o.total : void 0,
      l = i - n,
      s = r(l),
      c = i <= a;
    n = i;
    const d = {
      loaded: i,
      total: a,
      progress: a ? i / a : void 0,
      bytes: l,
      rate: s || void 0,
      estimated: s && a && c ? (a - i) / s : void 0,
      event: o,
    };
    (d[t ? "download" : "upload"] = !0), e(d);
  };
}
const y3 = typeof XMLHttpRequest < "u",
  w3 =
    y3 &&
    function (e) {
      return new Promise(function (n, r) {
        let o = e.data;
        const i = Yn.from(e.headers).normalize();
        let { responseType: a, withXSRFToken: l } = e,
          s;
        function c() {
          e.cancelToken && e.cancelToken.unsubscribe(s),
            e.signal && e.signal.removeEventListener("abort", s);
        }
        let d;
        if (A.isFormData(o)) {
          if (Tn.hasStandardBrowserEnv || Tn.hasStandardBrowserWebWorkerEnv)
            i.setContentType(!1);
          else if ((d = i.getContentType()) !== !1) {
            const [g, ...x] = d
              ? d
                  .split(";")
                  .map((m) => m.trim())
                  .filter(Boolean)
              : [];
            i.setContentType([g || "multipart/form-data", ...x].join("; "));
          }
        }
        let u = new XMLHttpRequest();
        if (e.auth) {
          const g = e.auth.username || "",
            x = e.auth.password
              ? unescape(encodeURIComponent(e.auth.password))
              : "";
          i.set("Authorization", "Basic " + btoa(g + ":" + x));
        }
        const p = Ey(e.baseURL, e.url);
        u.open(e.method.toUpperCase(), vy(p, e.params, e.paramsSerializer), !0),
          (u.timeout = e.timeout);
        function y() {
          if (!u) return;
          const g = Yn.from(
              "getAllResponseHeaders" in u && u.getAllResponseHeaders()
            ),
            m = {
              data:
                !a || a === "text" || a === "json"
                  ? u.responseText
                  : u.response,
              status: u.status,
              statusText: u.statusText,
              headers: g,
              config: e,
              request: u,
            };
          d3(
            function (w) {
              n(w), c();
            },
            function (w) {
              r(w), c();
            },
            m
          ),
            (u = null);
        }
        if (
          ("onloadend" in u
            ? (u.onloadend = y)
            : (u.onreadystatechange = function () {
                !u ||
                  u.readyState !== 4 ||
                  (u.status === 0 &&
                    !(u.responseURL && u.responseURL.indexOf("file:") === 0)) ||
                  setTimeout(y);
              }),
          (u.onabort = function () {
            u &&
              (r(new ve("Request aborted", ve.ECONNABORTED, e, u)), (u = null));
          }),
          (u.onerror = function () {
            r(new ve("Network Error", ve.ERR_NETWORK, e, u)), (u = null);
          }),
          (u.ontimeout = function () {
            let x = e.timeout
              ? "timeout of " + e.timeout + "ms exceeded"
              : "timeout exceeded";
            const m = e.transitional || yy;
            e.timeoutErrorMessage && (x = e.timeoutErrorMessage),
              r(
                new ve(
                  x,
                  m.clarifyTimeoutError ? ve.ETIMEDOUT : ve.ECONNABORTED,
                  e,
                  u
                )
              ),
              (u = null);
          }),
          Tn.hasStandardBrowserEnv &&
            (l && A.isFunction(l) && (l = l(e)), l || (l !== !1 && h3(p))))
        ) {
          const g =
            e.xsrfHeaderName && e.xsrfCookieName && f3.read(e.xsrfCookieName);
          g && i.set(e.xsrfHeaderName, g);
        }
        o === void 0 && i.setContentType(null),
          "setRequestHeader" in u &&
            A.forEach(i.toJSON(), function (x, m) {
              u.setRequestHeader(m, x);
            }),
          A.isUndefined(e.withCredentials) ||
            (u.withCredentials = !!e.withCredentials),
          a && a !== "json" && (u.responseType = e.responseType),
          typeof e.onDownloadProgress == "function" &&
            u.addEventListener("progress", Em(e.onDownloadProgress, !0)),
          typeof e.onUploadProgress == "function" &&
            u.upload &&
            u.upload.addEventListener("progress", Em(e.onUploadProgress)),
          (e.cancelToken || e.signal) &&
            ((s = (g) => {
              u &&
                (r(!g || g.type ? new Ea(null, e, u) : g),
                u.abort(),
                (u = null));
            }),
            e.cancelToken && e.cancelToken.subscribe(s),
            e.signal &&
              (e.signal.aborted ? s() : e.signal.addEventListener("abort", s)));
        const v = g3(p);
        if (v && Tn.protocols.indexOf(v) === -1) {
          r(new ve("Unsupported protocol " + v + ":", ve.ERR_BAD_REQUEST, e));
          return;
        }
        u.send(o || null);
      });
    },
  Au = { http: V_, xhr: w3 };
A.forEach(Au, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Sm = (e) => `- ${e}`,
  x3 = (e) => A.isFunction(e) || e === null || e === !1,
  Sy = {
    getAdapter: (e) => {
      e = A.isArray(e) ? e : [e];
      const { length: t } = e;
      let n, r;
      const o = {};
      for (let i = 0; i < t; i++) {
        n = e[i];
        let a;
        if (
          ((r = n),
          !x3(n) && ((r = Au[(a = String(n)).toLowerCase()]), r === void 0))
        )
          throw new ve(`Unknown adapter '${a}'`);
        if (r) break;
        o[a || "#" + i] = r;
      }
      if (!r) {
        const i = Object.entries(o).map(
          ([l, s]) =>
            `adapter ${l} ` +
            (s === !1
              ? "is not supported by the environment"
              : "is not available in the build")
        );
        let a = t
          ? i.length > 1
            ? `since :
` +
              i.map(Sm).join(`
`)
            : " " + Sm(i[0])
          : "as no adapter specified";
        throw new ve(
          "There is no suitable adapter to dispatch the request " + a,
          "ERR_NOT_SUPPORT"
        );
      }
      return r;
    },
    adapters: Au,
  };
function mc(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Ea(null, e);
}
function Cm(e) {
  return (
    mc(e),
    (e.headers = Yn.from(e.headers)),
    (e.data = pc.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    Sy.getAdapter(e.adapter || lf.adapter)(e).then(
      function (r) {
        return (
          mc(e),
          (r.data = pc.call(e, e.transformResponse, r)),
          (r.headers = Yn.from(r.headers)),
          r
        );
      },
      function (r) {
        return (
          by(r) ||
            (mc(e),
            r &&
              r.response &&
              ((r.response.data = pc.call(e, e.transformResponse, r.response)),
              (r.response.headers = Yn.from(r.response.headers)))),
          Promise.reject(r)
        );
      }
    )
  );
}
const $m = (e) => (e instanceof Yn ? { ...e } : e);
function qo(e, t) {
  t = t || {};
  const n = {};
  function r(c, d, u) {
    return A.isPlainObject(c) && A.isPlainObject(d)
      ? A.merge.call({ caseless: u }, c, d)
      : A.isPlainObject(d)
      ? A.merge({}, d)
      : A.isArray(d)
      ? d.slice()
      : d;
  }
  function o(c, d, u) {
    if (A.isUndefined(d)) {
      if (!A.isUndefined(c)) return r(void 0, c, u);
    } else return r(c, d, u);
  }
  function i(c, d) {
    if (!A.isUndefined(d)) return r(void 0, d);
  }
  function a(c, d) {
    if (A.isUndefined(d)) {
      if (!A.isUndefined(c)) return r(void 0, c);
    } else return r(void 0, d);
  }
  function l(c, d, u) {
    if (u in t) return r(c, d);
    if (u in e) return r(void 0, c);
  }
  const s = {
    url: i,
    method: i,
    data: i,
    baseURL: a,
    transformRequest: a,
    transformResponse: a,
    paramsSerializer: a,
    timeout: a,
    timeoutMessage: a,
    withCredentials: a,
    withXSRFToken: a,
    adapter: a,
    responseType: a,
    xsrfCookieName: a,
    xsrfHeaderName: a,
    onUploadProgress: a,
    onDownloadProgress: a,
    decompress: a,
    maxContentLength: a,
    maxBodyLength: a,
    beforeRedirect: a,
    transport: a,
    httpAgent: a,
    httpsAgent: a,
    cancelToken: a,
    socketPath: a,
    responseEncoding: a,
    validateStatus: l,
    headers: (c, d) => o($m(c), $m(d), !0),
  };
  return (
    A.forEach(Object.keys(Object.assign({}, e, t)), function (d) {
      const u = s[d] || o,
        p = u(e[d], t[d], d);
      (A.isUndefined(p) && u !== l) || (n[d] = p);
    }),
    n
  );
}
const Cy = "1.6.8",
  sf = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    sf[e] = function (r) {
      return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  }
);
const _m = {};
sf.transitional = function (t, n, r) {
  function o(i, a) {
    return (
      "[Axios v" +
      Cy +
      "] Transitional option '" +
      i +
      "'" +
      a +
      (r ? ". " + r : "")
    );
  }
  return (i, a, l) => {
    if (t === !1)
      throw new ve(
        o(a, " has been removed" + (n ? " in " + n : "")),
        ve.ERR_DEPRECATED
      );
    return (
      n &&
        !_m[a] &&
        ((_m[a] = !0),
        console.warn(
          o(
            a,
            " has been deprecated since v" +
              n +
              " and will be removed in the near future"
          )
        )),
      t ? t(i, a, l) : !0
    );
  };
};
function b3(e, t, n) {
  if (typeof e != "object")
    throw new ve("options must be an object", ve.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let o = r.length;
  for (; o-- > 0; ) {
    const i = r[o],
      a = t[i];
    if (a) {
      const l = e[i],
        s = l === void 0 || a(l, i, e);
      if (s !== !0)
        throw new ve("option " + i + " must be " + s, ve.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new ve("Unknown option " + i, ve.ERR_BAD_OPTION);
  }
}
const Du = { assertOptions: b3, validators: sf },
  mr = Du.validators;
class Gl {
  constructor(t) {
    (this.defaults = t),
      (this.interceptors = { request: new xm(), response: new xm() });
  }
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let o;
        Error.captureStackTrace
          ? Error.captureStackTrace((o = {}))
          : (o = new Error());
        const i = o.stack ? o.stack.replace(/^.+\n/, "") : "";
        r.stack
          ? i &&
            !String(r.stack).endsWith(i.replace(/^.+\n.+\n/, "")) &&
            (r.stack +=
              `
` + i)
          : (r.stack = i);
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
      (n = qo(this.defaults, n));
    const { transitional: r, paramsSerializer: o, headers: i } = n;
    r !== void 0 &&
      Du.assertOptions(
        r,
        {
          silentJSONParsing: mr.transitional(mr.boolean),
          forcedJSONParsing: mr.transitional(mr.boolean),
          clarifyTimeoutError: mr.transitional(mr.boolean),
        },
        !1
      ),
      o != null &&
        (A.isFunction(o)
          ? (n.paramsSerializer = { serialize: o })
          : Du.assertOptions(
              o,
              { encode: mr.function, serialize: mr.function },
              !0
            )),
      (n.method = (n.method || this.defaults.method || "get").toLowerCase());
    let a = i && A.merge(i.common, i[n.method]);
    i &&
      A.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (v) => {
          delete i[v];
        }
      ),
      (n.headers = Yn.concat(a, i));
    const l = [];
    let s = !0;
    this.interceptors.request.forEach(function (g) {
      (typeof g.runWhen == "function" && g.runWhen(n) === !1) ||
        ((s = s && g.synchronous), l.unshift(g.fulfilled, g.rejected));
    });
    const c = [];
    this.interceptors.response.forEach(function (g) {
      c.push(g.fulfilled, g.rejected);
    });
    let d,
      u = 0,
      p;
    if (!s) {
      const v = [Cm.bind(this), void 0];
      for (
        v.unshift.apply(v, l),
          v.push.apply(v, c),
          p = v.length,
          d = Promise.resolve(n);
        u < p;

      )
        d = d.then(v[u++], v[u++]);
      return d;
    }
    p = l.length;
    let y = n;
    for (u = 0; u < p; ) {
      const v = l[u++],
        g = l[u++];
      try {
        y = v(y);
      } catch (x) {
        g.call(this, x);
        break;
      }
    }
    try {
      d = Cm.call(this, y);
    } catch (v) {
      return Promise.reject(v);
    }
    for (u = 0, p = c.length; u < p; ) d = d.then(c[u++], c[u++]);
    return d;
  }
  getUri(t) {
    t = qo(this.defaults, t);
    const n = Ey(t.baseURL, t.url);
    return vy(n, t.params, t.paramsSerializer);
  }
}
A.forEach(["delete", "get", "head", "options"], function (t) {
  Gl.prototype[t] = function (n, r) {
    return this.request(
      qo(r || {}, { method: t, url: n, data: (r || {}).data })
    );
  };
});
A.forEach(["post", "put", "patch"], function (t) {
  function n(r) {
    return function (i, a, l) {
      return this.request(
        qo(l || {}, {
          method: t,
          headers: r ? { "Content-Type": "multipart/form-data" } : {},
          url: i,
          data: a,
        })
      );
    };
  }
  (Gl.prototype[t] = n()), (Gl.prototype[t + "Form"] = n(!0));
});
const gl = Gl;
class cf {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function (i) {
      n = i;
    });
    const r = this;
    this.promise.then((o) => {
      if (!r._listeners) return;
      let i = r._listeners.length;
      for (; i-- > 0; ) r._listeners[i](o);
      r._listeners = null;
    }),
      (this.promise.then = (o) => {
        let i;
        const a = new Promise((l) => {
          r.subscribe(l), (i = l);
        }).then(o);
        return (
          (a.cancel = function () {
            r.unsubscribe(i);
          }),
          a
        );
      }),
      t(function (i, a, l) {
        r.reason || ((r.reason = new Ea(i, a, l)), n(r.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  static source() {
    let t;
    return {
      token: new cf(function (o) {
        t = o;
      }),
      cancel: t,
    };
  }
}
const E3 = cf;
function S3(e) {
  return function (n) {
    return e.apply(null, n);
  };
}
function C3(e) {
  return A.isObject(e) && e.isAxiosError === !0;
}
const Ou = {
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
Object.entries(Ou).forEach(([e, t]) => {
  Ou[t] = e;
});
const $3 = Ou;
function $y(e) {
  const t = new gl(e),
    n = iy(gl.prototype.request, t);
  return (
    A.extend(n, gl.prototype, t, { allOwnKeys: !0 }),
    A.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (o) {
      return $y(qo(e, o));
    }),
    n
  );
}
const nt = $y(lf);
nt.Axios = gl;
nt.CanceledError = Ea;
nt.CancelToken = E3;
nt.isCancel = by;
nt.VERSION = Cy;
nt.toFormData = Cs;
nt.AxiosError = ve;
nt.Cancel = nt.CanceledError;
nt.all = function (t) {
  return Promise.all(t);
};
nt.spread = S3;
nt.isAxiosError = C3;
nt.mergeConfig = qo;
nt.AxiosHeaders = Yn;
nt.formToJSON = (e) => xy(A.isHTMLForm(e) ? new FormData(e) : e);
nt.getAdapter = Sy.getAdapter;
nt.HttpStatusCode = $3;
nt.default = nt;
const Ck = (e) => localStorage.setItem("kf_admin_account", e),
  _3 = () => localStorage.getItem("kf_admin_account"),
  $k = (e) => localStorage.setItem("kf_admin_token", e),
  _y = () => localStorage.getItem("kf_admin_token"),
  Ry = () => localStorage.removeItem("kf_admin_token"),
  R3 = (e) => {
    const t = nt.create({ baseURL: e, timeout: 25e3 });
    return (
      t.interceptors.request.use(
        async (n) => ((n.headers.Authorization = `Bearer ${_y()}`), n),
        (n) => Promise.reject(n)
      ),
      t.interceptors.response.use(
        (n) => (n.data.retcode !== 0 ? Promise.reject(n.data) : n.data),
        (n) => (
          n.response.status === 401 && _s.navigate("/login", { replace: !0 }),
          n.message.includes("timeout") && console.error("error", n),
          n.message.includes("Network Error") && console.error("error", n),
          Promise.reject(n)
        )
      ),
      t
    );
  };
var k3 = {
  BASE_URL: "/open-kf-admin",
  MODE: "production",
  DEV: !1,
  PROD: !0,
  SSR: !1,
};
const T3 = window.location.origin,
  Ge = R3(k3.VITE_BASE_URL || T3),
  _k = (e, t) =>
    Ge.post("/open_kf_api/account/login", { account_name: e, password: t }),
  P3 = (e) => Ge.post("/open_kf_api/account/update_password", e),
  Rk = () => Ge.post("/open_kf_api/bot_config/get_bot_setting"),
  kk = (e) => Ge.post("/open_kf_api/bot_config/update_bot_setting", e),
  Tk = (e) =>
    Ge.post("/open_kf_api/sitemaps/submit_crawl_site", {
      site: e,
      timestamp: Math.floor(Date.now() / 1e3),
    }),
  Pk = (e) => Ge.post("/open_kf_api/sitemaps/get_crawl_site_info", { site: e }),
  Nk = (e) => Ge.post("/open_kf_api/sitemaps/get_crawl_url_list", { site: e }),
  Ak = ({ id: e, page: t, page_size: n }) =>
    Ge.post("/open_kf_api/sitemaps/get_crawl_url_sub_content_list", {
      id: e,
      page: t,
      page_size: n,
    }),
  Dk = (e) =>
    Ge.post("/open_kf_api/sitemaps/add_crawl_url_list", { id_list: e }),
  Ok = (e) =>
    Ge.post("/open_kf_api/sitemaps/delete_crawl_url_list", { id_list: e }),
  Mk = (e) => Ge.post("/open_kf_api/queries/get_user_conversation_list", e),
  Lk = (e, t) =>
    Ge.post("/open_kf_api/queries/get_user_query_history_list", e, {
      cancelToken: t,
    }),
  Ik = (e) => Ge.post("/open_kf_api/intervention/add_intervene_record", e),
  Fk = (e) => {
    const t = new FormData();
    return (
      t.append("picture_file", e),
      Ge.post("/open_kf_api/common/upload_picture", t)
    );
  },
  zk = (e) =>
    Ge.post("/open_kf_api/urls/submit_isolated_url_list", { url_list: e }),
  jk = (e) =>
    Ge.post("/open_kf_api/urls/get_isolated_url_list", { id_list: e }),
  Uk = (e) =>
    Ge.post("/open_kf_api/urls/delete_isolated_url_list", { id_list: e }),
  Bk = ({ id: e, page: t, page_size: n }) =>
    Ge.post("/open_kf_api/urls/get_isolated_url_sub_content_list", {
      id: e,
      page: t,
      page_size: n,
    }),
  Hk = (e) => {
    const t = new FormData();
    return (
      e.forEach((n) => {
        t.append("file_list", n);
      }),
      Ge.post("/open_kf_api/files/submit_local_file_list", t)
    );
  },
  Vk = (e) => Ge.post("/open_kf_api/files/get_local_file_list", { id_list: e }),
  Wk = (e) =>
    Ge.post("/open_kf_api/files/delete_local_file_list", { id_list: e }),
  Kk = ({ id: e, page: t, page_size: n }) =>
    Ge.post("/open_kf_api/files/get_local_file_sub_content_list", {
      id: e,
      page: t,
      page_size: n,
    }),
  ky = "Dialog",
  [Ty, Py] = or(ky),
  [N3, xn] = Ty(ky),
  A3 = (e) => {
    const {
        __scopeDialog: t,
        children: n,
        open: r,
        defaultOpen: o,
        onOpenChange: i,
        modal: a = !0,
      } = e,
      l = f.useRef(null),
      s = f.useRef(null),
      [c = !1, d] = ps({ prop: r, defaultProp: o, onChange: i });
    return f.createElement(
      N3,
      {
        scope: t,
        triggerRef: l,
        contentRef: s,
        contentId: no(),
        titleId: no(),
        descriptionId: no(),
        open: c,
        onOpenChange: d,
        onOpenToggle: f.useCallback(() => d((u) => !u), [d]),
        modal: a,
      },
      n
    );
  },
  D3 = "DialogTrigger",
  O3 = f.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = xn(D3, n),
      i = ct(t, o.triggerRef);
    return f.createElement(
      De.button,
      V(
        {
          type: "button",
          "aria-haspopup": "dialog",
          "aria-expanded": o.open,
          "aria-controls": o.contentId,
          "data-state": uf(o.open),
        },
        r,
        { ref: i, onClick: le(e.onClick, o.onOpenToggle) }
      )
    );
  }),
  Ny = "DialogPortal",
  [M3, Ay] = Ty(Ny, { forceMount: void 0 }),
  L3 = (e) => {
    const { __scopeDialog: t, forceMount: n, children: r, container: o } = e,
      i = xn(Ny, t);
    return f.createElement(
      M3,
      { scope: t, forceMount: n },
      f.Children.map(r, (a) =>
        f.createElement(
          ar,
          { present: n || i.open },
          f.createElement(l0, { asChild: !0, container: o }, a)
        )
      )
    );
  },
  Mu = "DialogOverlay",
  I3 = f.forwardRef((e, t) => {
    const n = Ay(Mu, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...o } = e,
      i = xn(Mu, e.__scopeDialog);
    return i.modal
      ? f.createElement(
          ar,
          { present: r || i.open },
          f.createElement(F3, V({}, o, { ref: t }))
        )
      : null;
  }),
  F3 = f.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = xn(Mu, n);
    return f.createElement(
      E0,
      { as: co, allowPinchZoom: !0, shards: [o.contentRef] },
      f.createElement(
        De.div,
        V({ "data-state": uf(o.open) }, r, {
          ref: t,
          style: { pointerEvents: "auto", ...r.style },
        })
      )
    );
  }),
  Zo = "DialogContent",
  z3 = f.forwardRef((e, t) => {
    const n = Ay(Zo, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...o } = e,
      i = xn(Zo, e.__scopeDialog);
    return f.createElement(
      ar,
      { present: r || i.open },
      i.modal
        ? f.createElement(j3, V({}, o, { ref: t }))
        : f.createElement(U3, V({}, o, { ref: t }))
    );
  }),
  j3 = f.forwardRef((e, t) => {
    const n = xn(Zo, e.__scopeDialog),
      r = f.useRef(null),
      o = ct(t, n.contentRef, r);
    return (
      f.useEffect(() => {
        const i = r.current;
        if (i) return p0(i);
      }, []),
      f.createElement(
        Dy,
        V({}, e, {
          ref: o,
          trapFocus: n.open,
          disableOutsidePointerEvents: !0,
          onCloseAutoFocus: le(e.onCloseAutoFocus, (i) => {
            var a;
            i.preventDefault(),
              (a = n.triggerRef.current) === null || a === void 0 || a.focus();
          }),
          onPointerDownOutside: le(e.onPointerDownOutside, (i) => {
            const a = i.detail.originalEvent,
              l = a.button === 0 && a.ctrlKey === !0;
            (a.button === 2 || l) && i.preventDefault();
          }),
          onFocusOutside: le(e.onFocusOutside, (i) => i.preventDefault()),
        })
      )
    );
  }),
  U3 = f.forwardRef((e, t) => {
    const n = xn(Zo, e.__scopeDialog),
      r = f.useRef(!1),
      o = f.useRef(!1);
    return f.createElement(
      Dy,
      V({}, e, {
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (i) => {
          var a;
          if (
            ((a = e.onCloseAutoFocus) === null || a === void 0 || a.call(e, i),
            !i.defaultPrevented)
          ) {
            var l;
            r.current ||
              (l = n.triggerRef.current) === null ||
              l === void 0 ||
              l.focus(),
              i.preventDefault();
          }
          (r.current = !1), (o.current = !1);
        },
        onInteractOutside: (i) => {
          var a, l;
          (a = e.onInteractOutside) === null || a === void 0 || a.call(e, i),
            i.defaultPrevented ||
              ((r.current = !0),
              i.detail.originalEvent.type === "pointerdown" &&
                (o.current = !0));
          const s = i.target;
          ((l = n.triggerRef.current) === null || l === void 0
            ? void 0
            : l.contains(s)) && i.preventDefault(),
            i.detail.originalEvent.type === "focusin" &&
              o.current &&
              i.preventDefault();
        },
      })
    );
  }),
  Dy = f.forwardRef((e, t) => {
    const {
        __scopeDialog: n,
        trapFocus: r,
        onOpenAutoFocus: o,
        onCloseAutoFocus: i,
        ...a
      } = e,
      l = xn(Zo, n),
      s = f.useRef(null),
      c = ct(t, s);
    return (
      Uv(),
      f.createElement(
        f.Fragment,
        null,
        f.createElement(
          Bv,
          {
            asChild: !0,
            loop: !0,
            trapped: r,
            onMountAutoFocus: o,
            onUnmountAutoFocus: i,
          },
          f.createElement(
            zv,
            V(
              {
                role: "dialog",
                id: l.contentId,
                "aria-describedby": l.descriptionId,
                "aria-labelledby": l.titleId,
                "data-state": uf(l.open),
              },
              a,
              { ref: c, onDismiss: () => l.onOpenChange(!1) }
            )
          )
        ),
        !1
      )
    );
  }),
  Oy = "DialogTitle",
  B3 = f.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = xn(Oy, n);
    return f.createElement(De.h2, V({ id: o.titleId }, r, { ref: t }));
  }),
  H3 = "DialogDescription",
  V3 = f.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = xn(H3, n);
    return f.createElement(De.p, V({ id: o.descriptionId }, r, { ref: t }));
  }),
  W3 = "DialogClose",
  K3 = f.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = xn(W3, n);
    return f.createElement(
      De.button,
      V({ type: "button" }, r, {
        ref: t,
        onClick: le(e.onClick, () => o.onOpenChange(!1)),
      })
    );
  });
function uf(e) {
  return e ? "open" : "closed";
}
const G3 = "DialogTitleWarning",
  [Y3, Gk] = fE(G3, { contentName: Zo, titleName: Oy, docsSlug: "dialog" }),
  My = A3,
  Q3 = O3,
  Ly = L3,
  df = I3,
  ff = z3,
  pf = B3,
  mf = V3,
  hf = K3,
  X3 = My,
  Yk = Q3,
  q3 = Ly,
  Iy = f.forwardRef(({ className: e, ...t }, n) =>
    N.jsx(df, {
      ref: n,
      className: Ee(
        "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        e
      ),
      ...t,
    })
  );
Iy.displayName = df.displayName;
const Fy = f.forwardRef(({ className: e, children: t, ...n }, r) =>
  N.jsxs(q3, {
    children: [
      N.jsx(Iy, {}),
      N.jsxs(ff, {
        ref: r,
        className: Ee(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          e
        ),
        ...n,
        children: [
          t,
          N.jsxs(hf, {
            className:
              "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
            children: [
              N.jsx(M$, { className: "h-4 w-4" }),
              N.jsx("span", { className: "sr-only", children: "Close" }),
            ],
          }),
        ],
      }),
    ],
  })
);
Fy.displayName = ff.displayName;
const zy = ({ className: e, ...t }) =>
  N.jsx("div", {
    className: Ee("flex flex-col space-y-1.5 text-center sm:text-left", e),
    ...t,
  });
zy.displayName = "DialogHeader";
const jy = ({ className: e, ...t }) =>
  N.jsx("div", {
    className: Ee(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      e
    ),
    ...t,
  });
jy.displayName = "DialogFooter";
const Uy = f.forwardRef(({ className: e, ...t }, n) =>
  N.jsx(pf, {
    ref: n,
    className: Ee("text-lg font-semibold leading-none tracking-tight", e),
    ...t,
  })
);
Uy.displayName = pf.displayName;
const Z3 = f.forwardRef(({ className: e, ...t }, n) =>
  N.jsx(mf, { ref: n, className: Ee("text-sm text-muted-foreground", e), ...t })
);
Z3.displayName = mf.displayName;
const Lu = f.forwardRef(({ className: e, type: t, ...n }, r) =>
  N.jsx("input", {
    type: t,
    className: Ee(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      e
    ),
    ref: r,
    ...n,
  })
);
Lu.displayName = "Input";
var {
    entries: By,
    setPrototypeOf: Rm,
    isFrozen: J3,
    getPrototypeOf: eR,
    getOwnPropertyDescriptor: tR,
  } = Object,
  { freeze: _t, seal: nn, create: Hy } = Object,
  { apply: Iu, construct: Fu } = typeof Reflect < "u" && Reflect;
_t ||
  (_t = function (e) {
    return e;
  });
nn ||
  (nn = function (e) {
    return e;
  });
Iu ||
  (Iu = function (e, t, n) {
    return e.apply(t, n);
  });
Fu ||
  (Fu = function (e, t) {
    return new e(...t);
  });
var Qa = Ht(Array.prototype.forEach),
  km = Ht(Array.prototype.pop),
  Si = Ht(Array.prototype.push),
  vl = Ht(String.prototype.toLowerCase),
  hc = Ht(String.prototype.toString),
  Tm = Ht(String.prototype.match),
  Ci = Ht(String.prototype.replace),
  nR = Ht(String.prototype.indexOf),
  rR = Ht(String.prototype.trim),
  cn = Ht(Object.prototype.hasOwnProperty),
  Lt = Ht(RegExp.prototype.test),
  $i = oR(TypeError);
function Ht(e) {
  return function (t) {
    for (
      var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1;
      o < n;
      o++
    )
      r[o - 1] = arguments[o];
    return Iu(e, t, r);
  };
}
function oR(e) {
  return function () {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return Fu(e, n);
  };
}
function me(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : vl;
  Rm && Rm(e, null);
  let r = t.length;
  for (; r--; ) {
    let o = t[r];
    if (typeof o == "string") {
      let i = n(o);
      i !== o && (J3(t) || (t[r] = i), (o = i));
    }
    e[o] = !0;
  }
  return e;
}
function iR(e) {
  for (let t = 0; t < e.length; t++) cn(e, t) || (e[t] = null);
  return e;
}
function Gr(e) {
  let t = Hy(null);
  for (let [n, r] of By(e))
    cn(e, n) &&
      (Array.isArray(r)
        ? (t[n] = iR(r))
        : r && typeof r == "object" && r.constructor === Object
        ? (t[n] = Gr(r))
        : (t[n] = r));
  return t;
}
function Xa(e, t) {
  for (; e !== null; ) {
    let r = tR(e, t);
    if (r) {
      if (r.get) return Ht(r.get);
      if (typeof r.value == "function") return Ht(r.value);
    }
    e = eR(e);
  }
  function n() {
    return null;
  }
  return n;
}
var Pm = _t([
    "a",
    "abbr",
    "acronym",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "bdi",
    "bdo",
    "big",
    "blink",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "center",
    "cite",
    "code",
    "col",
    "colgroup",
    "content",
    "data",
    "datalist",
    "dd",
    "decorator",
    "del",
    "details",
    "dfn",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "element",
    "em",
    "fieldset",
    "figcaption",
    "figure",
    "font",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hgroup",
    "hr",
    "html",
    "i",
    "img",
    "input",
    "ins",
    "kbd",
    "label",
    "legend",
    "li",
    "main",
    "map",
    "mark",
    "marquee",
    "menu",
    "menuitem",
    "meter",
    "nav",
    "nobr",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "section",
    "select",
    "shadow",
    "small",
    "source",
    "spacer",
    "span",
    "strike",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "template",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "tr",
    "track",
    "tt",
    "u",
    "ul",
    "var",
    "video",
    "wbr",
  ]),
  gc = _t([
    "svg",
    "a",
    "altglyph",
    "altglyphdef",
    "altglyphitem",
    "animatecolor",
    "animatemotion",
    "animatetransform",
    "circle",
    "clippath",
    "defs",
    "desc",
    "ellipse",
    "filter",
    "font",
    "g",
    "glyph",
    "glyphref",
    "hkern",
    "image",
    "line",
    "lineargradient",
    "marker",
    "mask",
    "metadata",
    "mpath",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialgradient",
    "rect",
    "stop",
    "style",
    "switch",
    "symbol",
    "text",
    "textpath",
    "title",
    "tref",
    "tspan",
    "view",
    "vkern",
  ]),
  vc = _t([
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
  ]),
  aR = _t([
    "animate",
    "color-profile",
    "cursor",
    "discard",
    "font-face",
    "font-face-format",
    "font-face-name",
    "font-face-src",
    "font-face-uri",
    "foreignobject",
    "hatch",
    "hatchpath",
    "mesh",
    "meshgradient",
    "meshpatch",
    "meshrow",
    "missing-glyph",
    "script",
    "set",
    "solidcolor",
    "unknown",
    "use",
  ]),
  yc = _t([
    "math",
    "menclose",
    "merror",
    "mfenced",
    "mfrac",
    "mglyph",
    "mi",
    "mlabeledtr",
    "mmultiscripts",
    "mn",
    "mo",
    "mover",
    "mpadded",
    "mphantom",
    "mroot",
    "mrow",
    "ms",
    "mspace",
    "msqrt",
    "mstyle",
    "msub",
    "msup",
    "msubsup",
    "mtable",
    "mtd",
    "mtext",
    "mtr",
    "munder",
    "munderover",
    "mprescripts",
  ]),
  lR = _t([
    "maction",
    "maligngroup",
    "malignmark",
    "mlongdiv",
    "mscarries",
    "mscarry",
    "msgroup",
    "mstack",
    "msline",
    "msrow",
    "semantics",
    "annotation",
    "annotation-xml",
    "mprescripts",
    "none",
  ]),
  Nm = _t(["#text"]),
  Am = _t([
    "accept",
    "action",
    "align",
    "alt",
    "autocapitalize",
    "autocomplete",
    "autopictureinpicture",
    "autoplay",
    "background",
    "bgcolor",
    "border",
    "capture",
    "cellpadding",
    "cellspacing",
    "checked",
    "cite",
    "class",
    "clear",
    "color",
    "cols",
    "colspan",
    "controls",
    "controlslist",
    "coords",
    "crossorigin",
    "datetime",
    "decoding",
    "default",
    "dir",
    "disabled",
    "disablepictureinpicture",
    "disableremoteplayback",
    "download",
    "draggable",
    "enctype",
    "enterkeyhint",
    "face",
    "for",
    "headers",
    "height",
    "hidden",
    "high",
    "href",
    "hreflang",
    "id",
    "inputmode",
    "integrity",
    "ismap",
    "kind",
    "label",
    "lang",
    "list",
    "loading",
    "loop",
    "low",
    "max",
    "maxlength",
    "media",
    "method",
    "min",
    "minlength",
    "multiple",
    "muted",
    "name",
    "nonce",
    "noshade",
    "novalidate",
    "nowrap",
    "open",
    "optimum",
    "pattern",
    "placeholder",
    "playsinline",
    "poster",
    "preload",
    "pubdate",
    "radiogroup",
    "readonly",
    "rel",
    "required",
    "rev",
    "reversed",
    "role",
    "rows",
    "rowspan",
    "spellcheck",
    "scope",
    "selected",
    "shape",
    "size",
    "sizes",
    "span",
    "srclang",
    "start",
    "src",
    "srcset",
    "step",
    "style",
    "summary",
    "tabindex",
    "title",
    "translate",
    "type",
    "usemap",
    "valign",
    "value",
    "width",
    "xmlns",
    "slot",
  ]),
  wc = _t([
    "accent-height",
    "accumulate",
    "additive",
    "alignment-baseline",
    "ascent",
    "attributename",
    "attributetype",
    "azimuth",
    "basefrequency",
    "baseline-shift",
    "begin",
    "bias",
    "by",
    "class",
    "clip",
    "clippathunits",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cx",
    "cy",
    "d",
    "dx",
    "dy",
    "diffuseconstant",
    "direction",
    "display",
    "divisor",
    "dur",
    "edgemode",
    "elevation",
    "end",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "filterunits",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "fx",
    "fy",
    "g1",
    "g2",
    "glyph-name",
    "glyphref",
    "gradientunits",
    "gradienttransform",
    "height",
    "href",
    "id",
    "image-rendering",
    "in",
    "in2",
    "k",
    "k1",
    "k2",
    "k3",
    "k4",
    "kerning",
    "keypoints",
    "keysplines",
    "keytimes",
    "lang",
    "lengthadjust",
    "letter-spacing",
    "kernelmatrix",
    "kernelunitlength",
    "lighting-color",
    "local",
    "marker-end",
    "marker-mid",
    "marker-start",
    "markerheight",
    "markerunits",
    "markerwidth",
    "maskcontentunits",
    "maskunits",
    "max",
    "mask",
    "media",
    "method",
    "mode",
    "min",
    "name",
    "numoctaves",
    "offset",
    "operator",
    "opacity",
    "order",
    "orient",
    "orientation",
    "origin",
    "overflow",
    "paint-order",
    "path",
    "pathlength",
    "patterncontentunits",
    "patterntransform",
    "patternunits",
    "points",
    "preservealpha",
    "preserveaspectratio",
    "primitiveunits",
    "r",
    "rx",
    "ry",
    "radius",
    "refx",
    "refy",
    "repeatcount",
    "repeatdur",
    "restart",
    "result",
    "rotate",
    "scale",
    "seed",
    "shape-rendering",
    "specularconstant",
    "specularexponent",
    "spreadmethod",
    "startoffset",
    "stddeviation",
    "stitchtiles",
    "stop-color",
    "stop-opacity",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke",
    "stroke-width",
    "style",
    "surfacescale",
    "systemlanguage",
    "tabindex",
    "targetx",
    "targety",
    "transform",
    "transform-origin",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "textlength",
    "type",
    "u1",
    "u2",
    "unicode",
    "values",
    "viewbox",
    "visibility",
    "version",
    "vert-adv-y",
    "vert-origin-x",
    "vert-origin-y",
    "width",
    "word-spacing",
    "wrap",
    "writing-mode",
    "xchannelselector",
    "ychannelselector",
    "x",
    "x1",
    "x2",
    "xmlns",
    "y",
    "y1",
    "y2",
    "z",
    "zoomandpan",
  ]),
  Dm = _t([
    "accent",
    "accentunder",
    "align",
    "bevelled",
    "close",
    "columnsalign",
    "columnlines",
    "columnspan",
    "denomalign",
    "depth",
    "dir",
    "display",
    "displaystyle",
    "encoding",
    "fence",
    "frame",
    "height",
    "href",
    "id",
    "largeop",
    "length",
    "linethickness",
    "lspace",
    "lquote",
    "mathbackground",
    "mathcolor",
    "mathsize",
    "mathvariant",
    "maxsize",
    "minsize",
    "movablelimits",
    "notation",
    "numalign",
    "open",
    "rowalign",
    "rowlines",
    "rowspacing",
    "rowspan",
    "rspace",
    "rquote",
    "scriptlevel",
    "scriptminsize",
    "scriptsizemultiplier",
    "selection",
    "separator",
    "separators",
    "stretchy",
    "subscriptshift",
    "supscriptshift",
    "symmetric",
    "voffset",
    "width",
    "xmlns",
  ]),
  qa = _t(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]),
  sR = nn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),
  cR = nn(/<%[\w\W]*|[\w\W]*%>/gm),
  uR = nn(/\${[\w\W]*}/gm),
  dR = nn(/^data-[\-\w.\u00B7-\uFFFF]/),
  fR = nn(/^aria-[\-\w]+$/),
  Vy = nn(
    /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  ),
  pR = nn(/^(?:\w+script|data):/i),
  mR = nn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
  Wy = nn(/^html$/i),
  hR = nn(/^[a-z][a-z\d]*(-[a-z\d]+)+$/i),
  Om = Object.freeze({
    __proto__: null,
    MUSTACHE_EXPR: sR,
    ERB_EXPR: cR,
    TMPLIT_EXPR: uR,
    DATA_ATTR: dR,
    ARIA_ATTR: fR,
    IS_ALLOWED_URI: Vy,
    IS_SCRIPT_OR_DATA: pR,
    ATTR_WHITESPACE: mR,
    DOCTYPE_NAME: Wy,
    CUSTOM_ELEMENT: hR,
  }),
  gR = function () {
    return typeof window > "u" ? null : window;
  },
  vR = function (e, t) {
    if (typeof e != "object" || typeof e.createPolicy != "function")
      return null;
    let n = null,
      r = "data-tt-policy-suffix";
    t && t.hasAttribute(r) && (n = t.getAttribute(r));
    let o = "dompurify" + (n ? "#" + n : "");
    try {
      return e.createPolicy(o, {
        createHTML(i) {
          return i;
        },
        createScriptURL(i) {
          return i;
        },
      });
    } catch {
      return (
        console.warn("TrustedTypes policy " + o + " could not be created."),
        null
      );
    }
  };
function Ky() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : gR(),
    t = (S) => Ky(S);
  if (
    ((t.version = "3.0.10"),
    (t.removed = []),
    !e || !e.document || e.document.nodeType !== 9)
  )
    return (t.isSupported = !1), t;
  let { document: n } = e,
    r = n,
    o = r.currentScript,
    {
      DocumentFragment: i,
      HTMLTemplateElement: a,
      Node: l,
      Element: s,
      NodeFilter: c,
      NamedNodeMap: d = e.NamedNodeMap || e.MozNamedAttrMap,
      HTMLFormElement: u,
      DOMParser: p,
      trustedTypes: y,
    } = e,
    v = s.prototype,
    g = Xa(v, "cloneNode"),
    x = Xa(v, "nextSibling"),
    m = Xa(v, "childNodes"),
    h = Xa(v, "parentNode");
  if (typeof a == "function") {
    let S = n.createElement("template");
    S.content && S.content.ownerDocument && (n = S.content.ownerDocument);
  }
  let w,
    E = "",
    {
      implementation: $,
      createNodeIterator: b,
      createDocumentFragment: _,
      getElementsByTagName: k,
    } = n,
    { importNode: O } = r,
    M = {};
  t.isSupported =
    typeof By == "function" &&
    typeof h == "function" &&
    $ &&
    $.createHTMLDocument !== void 0;
  let {
      MUSTACHE_EXPR: K,
      ERB_EXPR: z,
      TMPLIT_EXPR: ne,
      DATA_ATTR: W,
      ARIA_ATTR: J,
      IS_SCRIPT_OR_DATA: ie,
      ATTR_WHITESPACE: Q,
      CUSTOM_ELEMENT: D,
    } = Om,
    { IS_ALLOWED_URI: P } = Om,
    I = null,
    j = me({}, [...Pm, ...gc, ...vc, ...yc, ...Nm]),
    H = null,
    se = me({}, [...Am, ...wc, ...Dm, ...qa]),
    Z = Object.seal(
      Hy(null, {
        tagNameCheck: {
          writable: !0,
          configurable: !1,
          enumerable: !0,
          value: null,
        },
        attributeNameCheck: {
          writable: !0,
          configurable: !1,
          enumerable: !0,
          value: null,
        },
        allowCustomizedBuiltInElements: {
          writable: !0,
          configurable: !1,
          enumerable: !0,
          value: !1,
        },
      })
    ),
    ye = null,
    te = null,
    Oe = !0,
    ut = !0,
    Me = !1,
    gt = !0,
    ke = !1,
    He = !1,
    bn = !1,
    Mn = !1,
    we = !1,
    vt = !1,
    En = !1,
    lr = !0,
    on = !1,
    Vr = "user-content-",
    dt = !0,
    Kt = !1,
    ft = {},
    at = null,
    Et = me({}, [
      "annotation-xml",
      "audio",
      "colgroup",
      "desc",
      "foreignobject",
      "head",
      "iframe",
      "math",
      "mi",
      "mn",
      "mo",
      "ms",
      "mtext",
      "noembed",
      "noframes",
      "noscript",
      "plaintext",
      "script",
      "style",
      "svg",
      "template",
      "thead",
      "title",
      "video",
      "xmp",
    ]),
    sr = null,
    Ln = me({}, ["audio", "video", "img", "source", "image", "track"]),
    cr = null,
    Tt = me({}, [
      "alt",
      "class",
      "for",
      "id",
      "label",
      "name",
      "pattern",
      "placeholder",
      "role",
      "summary",
      "title",
      "value",
      "style",
      "xmlns",
    ]),
    In = "http://www.w3.org/1998/Math/MathML",
    an = "http://www.w3.org/2000/svg",
    Ye = "http://www.w3.org/1999/xhtml",
    Sn = Ye,
    Fn = !1,
    ee = null,
    Le = me({}, [In, an, Ye], hc),
    Se = null,
    Pt = ["application/xhtml+xml", "text/html"],
    St = "text/html",
    Te = null,
    ln = null,
    Rs = n.createElement("form"),
    C = function (S) {
      return S instanceof RegExp || S instanceof Function;
    },
    R = function () {
      let S =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      if (!(ln && ln === S)) {
        if (
          ((!S || typeof S != "object") && (S = {}),
          (S = Gr(S)),
          (Se =
            Pt.indexOf(S.PARSER_MEDIA_TYPE) === -1 ? St : S.PARSER_MEDIA_TYPE),
          (Te = Se === "application/xhtml+xml" ? hc : vl),
          (I = cn(S, "ALLOWED_TAGS") ? me({}, S.ALLOWED_TAGS, Te) : j),
          (H = cn(S, "ALLOWED_ATTR") ? me({}, S.ALLOWED_ATTR, Te) : se),
          (ee = cn(S, "ALLOWED_NAMESPACES")
            ? me({}, S.ALLOWED_NAMESPACES, hc)
            : Le),
          (cr = cn(S, "ADD_URI_SAFE_ATTR")
            ? me(Gr(Tt), S.ADD_URI_SAFE_ATTR, Te)
            : Tt),
          (sr = cn(S, "ADD_DATA_URI_TAGS")
            ? me(Gr(Ln), S.ADD_DATA_URI_TAGS, Te)
            : Ln),
          (at = cn(S, "FORBID_CONTENTS") ? me({}, S.FORBID_CONTENTS, Te) : Et),
          (ye = cn(S, "FORBID_TAGS") ? me({}, S.FORBID_TAGS, Te) : {}),
          (te = cn(S, "FORBID_ATTR") ? me({}, S.FORBID_ATTR, Te) : {}),
          (ft = cn(S, "USE_PROFILES") ? S.USE_PROFILES : !1),
          (Oe = S.ALLOW_ARIA_ATTR !== !1),
          (ut = S.ALLOW_DATA_ATTR !== !1),
          (Me = S.ALLOW_UNKNOWN_PROTOCOLS || !1),
          (gt = S.ALLOW_SELF_CLOSE_IN_ATTR !== !1),
          (ke = S.SAFE_FOR_TEMPLATES || !1),
          (He = S.WHOLE_DOCUMENT || !1),
          (we = S.RETURN_DOM || !1),
          (vt = S.RETURN_DOM_FRAGMENT || !1),
          (En = S.RETURN_TRUSTED_TYPE || !1),
          (Mn = S.FORCE_BODY || !1),
          (lr = S.SANITIZE_DOM !== !1),
          (on = S.SANITIZE_NAMED_PROPS || !1),
          (dt = S.KEEP_CONTENT !== !1),
          (Kt = S.IN_PLACE || !1),
          (P = S.ALLOWED_URI_REGEXP || Vy),
          (Sn = S.NAMESPACE || Ye),
          (Z = S.CUSTOM_ELEMENT_HANDLING || {}),
          S.CUSTOM_ELEMENT_HANDLING &&
            C(S.CUSTOM_ELEMENT_HANDLING.tagNameCheck) &&
            (Z.tagNameCheck = S.CUSTOM_ELEMENT_HANDLING.tagNameCheck),
          S.CUSTOM_ELEMENT_HANDLING &&
            C(S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) &&
            (Z.attributeNameCheck =
              S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),
          S.CUSTOM_ELEMENT_HANDLING &&
            typeof S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements ==
              "boolean" &&
            (Z.allowCustomizedBuiltInElements =
              S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),
          ke && (ut = !1),
          vt && (we = !0),
          ft &&
            ((I = me({}, Nm)),
            (H = []),
            ft.html === !0 && (me(I, Pm), me(H, Am)),
            ft.svg === !0 && (me(I, gc), me(H, wc), me(H, qa)),
            ft.svgFilters === !0 && (me(I, vc), me(H, wc), me(H, qa)),
            ft.mathMl === !0 && (me(I, yc), me(H, Dm), me(H, qa))),
          S.ADD_TAGS && (I === j && (I = Gr(I)), me(I, S.ADD_TAGS, Te)),
          S.ADD_ATTR && (H === se && (H = Gr(H)), me(H, S.ADD_ATTR, Te)),
          S.ADD_URI_SAFE_ATTR && me(cr, S.ADD_URI_SAFE_ATTR, Te),
          S.FORBID_CONTENTS &&
            (at === Et && (at = Gr(at)), me(at, S.FORBID_CONTENTS, Te)),
          dt && (I["#text"] = !0),
          He && me(I, ["html", "head", "body"]),
          I.table && (me(I, ["tbody"]), delete ye.tbody),
          S.TRUSTED_TYPES_POLICY)
        ) {
          if (typeof S.TRUSTED_TYPES_POLICY.createHTML != "function")
            throw $i(
              'TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.'
            );
          if (typeof S.TRUSTED_TYPES_POLICY.createScriptURL != "function")
            throw $i(
              'TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.'
            );
          (w = S.TRUSTED_TYPES_POLICY), (E = w.createHTML(""));
        } else
          w === void 0 && (w = vR(y, o)),
            w !== null && typeof E == "string" && (E = w.createHTML(""));
        _t && _t(S), (ln = S);
      }
    },
    T = me({}, ["mi", "mo", "mn", "ms", "mtext"]),
    B = me({}, ["foreignobject", "desc", "title", "annotation-xml"]),
    X = me({}, ["title", "style", "font", "a", "script"]),
    ce = me({}, [...gc, ...vc, ...aR]),
    oe = me({}, [...yc, ...lR]),
    re = function (S) {
      let G = h(S);
      (!G || !G.tagName) && (G = { namespaceURI: Sn, tagName: "template" });
      let U = vl(S.tagName),
        xe = vl(G.tagName);
      return ee[S.namespaceURI]
        ? S.namespaceURI === an
          ? G.namespaceURI === Ye
            ? U === "svg"
            : G.namespaceURI === In
            ? U === "svg" && (xe === "annotation-xml" || T[xe])
            : !!ce[U]
          : S.namespaceURI === In
          ? G.namespaceURI === Ye
            ? U === "math"
            : G.namespaceURI === an
            ? U === "math" && B[xe]
            : !!oe[U]
          : S.namespaceURI === Ye
          ? (G.namespaceURI === an && !B[xe]) ||
            (G.namespaceURI === In && !T[xe])
            ? !1
            : !oe[U] && (X[U] || !ce[U])
          : !!(Se === "application/xhtml+xml" && ee[S.namespaceURI])
        : !1;
    },
    q = function (S) {
      Si(t.removed, { element: S });
      try {
        S.parentNode.removeChild(S);
      } catch {
        S.remove();
      }
    },
    de = function (S, G) {
      try {
        Si(t.removed, { attribute: G.getAttributeNode(S), from: G });
      } catch {
        Si(t.removed, { attribute: null, from: G });
      }
      if ((G.removeAttribute(S), S === "is" && !H[S]))
        if (we || vt)
          try {
            q(G);
          } catch {}
        else
          try {
            G.setAttribute(S, "");
          } catch {}
    },
    Qe = function (S) {
      let G = null,
        U = null;
      if (Mn) S = "<remove></remove>" + S;
      else {
        let _e = Tm(S, /^[\r\n\t ]+/);
        U = _e && _e[0];
      }
      Se === "application/xhtml+xml" &&
        Sn === Ye &&
        (S =
          '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' +
          S +
          "</body></html>");
      let xe = w ? w.createHTML(S) : S;
      if (Sn === Ye)
        try {
          G = new p().parseFromString(xe, Se);
        } catch {}
      if (!G || !G.documentElement) {
        G = $.createDocument(Sn, "template", null);
        try {
          G.documentElement.innerHTML = Fn ? E : xe;
        } catch {}
      }
      let Ie = G.body || G.documentElement;
      return (
        S &&
          U &&
          Ie.insertBefore(n.createTextNode(U), Ie.childNodes[0] || null),
        Sn === Ye
          ? k.call(G, He ? "html" : "body")[0]
          : He
          ? G.documentElement
          : Ie
      );
    },
    ae = function (S) {
      return b.call(
        S.ownerDocument || S,
        S,
        c.SHOW_ELEMENT |
          c.SHOW_COMMENT |
          c.SHOW_TEXT |
          c.SHOW_PROCESSING_INSTRUCTION,
        null
      );
    },
    $e = function (S) {
      return (
        S instanceof u &&
        (typeof S.nodeName != "string" ||
          typeof S.textContent != "string" ||
          typeof S.removeChild != "function" ||
          !(S.attributes instanceof d) ||
          typeof S.removeAttribute != "function" ||
          typeof S.setAttribute != "function" ||
          typeof S.namespaceURI != "string" ||
          typeof S.insertBefore != "function" ||
          typeof S.hasChildNodes != "function")
      );
    },
    et = function (S) {
      return typeof l == "function" && S instanceof l;
    },
    Ve = function (S, G, U) {
      M[S] &&
        Qa(M[S], (xe) => {
          xe.call(t, G, U, ln);
        });
    },
    Xe = function (S) {
      let G = null;
      if ((Ve("beforeSanitizeElements", S, null), $e(S))) return q(S), !0;
      let U = Te(S.nodeName);
      if (
        (Ve("uponSanitizeElement", S, { tagName: U, allowedTags: I }),
        S.hasChildNodes() &&
          !et(S.firstElementChild) &&
          Lt(/<[/\w]/g, S.innerHTML) &&
          Lt(/<[/\w]/g, S.textContent))
      )
        return q(S), !0;
      if (!I[U] || ye[U]) {
        if (
          !ye[U] &&
          go(U) &&
          ((Z.tagNameCheck instanceof RegExp && Lt(Z.tagNameCheck, U)) ||
            (Z.tagNameCheck instanceof Function && Z.tagNameCheck(U)))
        )
          return !1;
        if (dt && !at[U]) {
          let xe = h(S) || S.parentNode,
            Ie = m(S) || S.childNodes;
          if (Ie && xe) {
            let _e = Ie.length;
            for (let pe = _e - 1; pe >= 0; --pe)
              xe.insertBefore(g(Ie[pe], !0), x(S));
          }
        }
        return q(S), !0;
      }
      return (S instanceof s && !re(S)) ||
        ((U === "noscript" || U === "noembed" || U === "noframes") &&
          Lt(/<\/no(script|embed|frames)/i, S.innerHTML))
        ? (q(S), !0)
        : (ke &&
            S.nodeType === 3 &&
            ((G = S.textContent),
            Qa([K, z, ne], (xe) => {
              G = Ci(G, xe, " ");
            }),
            S.textContent !== G &&
              (Si(t.removed, { element: S.cloneNode() }), (S.textContent = G))),
          Ve("afterSanitizeElements", S, null),
          !1);
    },
    zn = function (S, G, U) {
      if (lr && (G === "id" || G === "name") && (U in n || U in Rs)) return !1;
      if (!(ut && !te[G] && Lt(W, G)) && !(Oe && Lt(J, G))) {
        if (!H[G] || te[G]) {
          if (
            !(
              (go(S) &&
                ((Z.tagNameCheck instanceof RegExp && Lt(Z.tagNameCheck, S)) ||
                  (Z.tagNameCheck instanceof Function && Z.tagNameCheck(S))) &&
                ((Z.attributeNameCheck instanceof RegExp &&
                  Lt(Z.attributeNameCheck, G)) ||
                  (Z.attributeNameCheck instanceof Function &&
                    Z.attributeNameCheck(G)))) ||
              (G === "is" &&
                Z.allowCustomizedBuiltInElements &&
                ((Z.tagNameCheck instanceof RegExp && Lt(Z.tagNameCheck, U)) ||
                  (Z.tagNameCheck instanceof Function && Z.tagNameCheck(U))))
            )
          )
            return !1;
        } else if (
          !cr[G] &&
          !Lt(P, Ci(U, Q, "")) &&
          !(
            (G === "src" || G === "xlink:href" || G === "href") &&
            S !== "script" &&
            nR(U, "data:") === 0 &&
            sr[S]
          ) &&
          !(Me && !Lt(ie, Ci(U, Q, ""))) &&
          U
        )
          return !1;
      }
      return !0;
    },
    go = function (S) {
      return S !== "annotation-xml" && Tm(S, D);
    },
    jn = function (S) {
      Ve("beforeSanitizeAttributes", S, null);
      let { attributes: G } = S;
      if (!G) return;
      let U = {
          attrName: "",
          attrValue: "",
          keepAttr: !0,
          allowedAttributes: H,
        },
        xe = G.length;
      for (; xe--; ) {
        let Ie = G[xe],
          { name: _e, namespaceURI: pe, value: ge } = Ie,
          qe = Te(_e),
          rt = _e === "value" ? ge : rR(ge);
        if (
          ((U.attrName = qe),
          (U.attrValue = rt),
          (U.keepAttr = !0),
          (U.forceKeepAttr = void 0),
          Ve("uponSanitizeAttribute", S, U),
          (rt = U.attrValue),
          U.forceKeepAttr || (de(_e, S), !U.keepAttr))
        )
          continue;
        if (!gt && Lt(/\/>/i, rt)) {
          de(_e, S);
          continue;
        }
        ke &&
          Qa([K, z, ne], (gf) => {
            rt = Ci(rt, gf, " ");
          });
        let Sa = Te(S.nodeName);
        if (zn(Sa, qe, rt)) {
          if (
            (on &&
              (qe === "id" || qe === "name") &&
              (de(_e, S), (rt = Vr + rt)),
            w &&
              typeof y == "object" &&
              typeof y.getAttributeType == "function" &&
              !pe)
          )
            switch (y.getAttributeType(Sa, qe)) {
              case "TrustedHTML": {
                rt = w.createHTML(rt);
                break;
              }
              case "TrustedScriptURL": {
                rt = w.createScriptURL(rt);
                break;
              }
            }
          try {
            pe ? S.setAttributeNS(pe, _e, rt) : S.setAttribute(_e, rt),
              km(t.removed);
          } catch {}
        }
      }
      Ve("afterSanitizeAttributes", S, null);
    },
    Cn = function S(G) {
      let U = null,
        xe = ae(G);
      for (Ve("beforeSanitizeShadowDOM", G, null); (U = xe.nextNode()); )
        Ve("uponSanitizeShadowNode", U, null),
          !Xe(U) && (U.content instanceof i && S(U.content), jn(U));
      Ve("afterSanitizeShadowDOM", G, null);
    };
  return (
    (t.sanitize = function (S) {
      let G =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
        U = null,
        xe = null,
        Ie = null,
        _e = null;
      if (((Fn = !S), Fn && (S = "<!-->"), typeof S != "string" && !et(S)))
        if (typeof S.toString == "function") {
          if (((S = S.toString()), typeof S != "string"))
            throw $i("dirty is not a string, aborting");
        } else throw $i("toString is not a function");
      if (!t.isSupported) return S;
      if (
        (bn || R(G), (t.removed = []), typeof S == "string" && (Kt = !1), Kt)
      ) {
        if (S.nodeName) {
          let qe = Te(S.nodeName);
          if (!I[qe] || ye[qe])
            throw $i("root node is forbidden and cannot be sanitized in-place");
        }
      } else if (S instanceof l)
        (U = Qe("<!---->")),
          (xe = U.ownerDocument.importNode(S, !0)),
          (xe.nodeType === 1 && xe.nodeName === "BODY") ||
          xe.nodeName === "HTML"
            ? (U = xe)
            : U.appendChild(xe);
      else {
        if (!we && !ke && !He && S.indexOf("<") === -1)
          return w && En ? w.createHTML(S) : S;
        if (((U = Qe(S)), !U)) return we ? null : En ? E : "";
      }
      U && Mn && q(U.firstChild);
      let pe = ae(Kt ? S : U);
      for (; (Ie = pe.nextNode()); )
        Xe(Ie) || (Ie.content instanceof i && Cn(Ie.content), jn(Ie));
      if (Kt) return S;
      if (we) {
        if (vt)
          for (_e = _.call(U.ownerDocument); U.firstChild; )
            _e.appendChild(U.firstChild);
        else _e = U;
        return (
          (H.shadowroot || H.shadowrootmode) && (_e = O.call(r, _e, !0)), _e
        );
      }
      let ge = He ? U.outerHTML : U.innerHTML;
      return (
        He &&
          I["!doctype"] &&
          U.ownerDocument &&
          U.ownerDocument.doctype &&
          U.ownerDocument.doctype.name &&
          Lt(Wy, U.ownerDocument.doctype.name) &&
          (ge =
            "<!DOCTYPE " +
            U.ownerDocument.doctype.name +
            `>
` +
            ge),
        ke &&
          Qa([K, z, ne], (qe) => {
            ge = Ci(ge, qe, " ");
          }),
        w && En ? w.createHTML(ge) : ge
      );
    }),
    (t.setConfig = function () {
      let S =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      R(S), (bn = !0);
    }),
    (t.clearConfig = function () {
      (ln = null), (bn = !1);
    }),
    (t.isValidAttribute = function (S, G, U) {
      ln || R({});
      let xe = Te(S),
        Ie = Te(G);
      return zn(xe, Ie, U);
    }),
    (t.addHook = function (S, G) {
      typeof G == "function" && ((M[S] = M[S] || []), Si(M[S], G));
    }),
    (t.removeHook = function (S) {
      if (M[S]) return km(M[S]);
    }),
    (t.removeHooks = function (S) {
      M[S] && (M[S] = []);
    }),
    (t.removeAllHooks = function () {
      M = {};
    }),
    t
  );
}
var yR = Ky(),
  wR = (e) => {
    switch (e) {
      case "success":
        return ER;
      case "info":
        return CR;
      case "warning":
        return SR;
      case "error":
        return $R;
      default:
        return null;
    }
  },
  xR = Array(12).fill(0),
  bR = ({ visible: e }) =>
    F.createElement(
      "div",
      { className: "sonner-loading-wrapper", "data-visible": e },
      F.createElement(
        "div",
        { className: "sonner-spinner" },
        xR.map((t, n) =>
          F.createElement("div", {
            className: "sonner-loading-bar",
            key: `spinner-bar-${n}`,
          })
        )
      )
    ),
  ER = F.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    F.createElement("path", {
      fillRule: "evenodd",
      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
      clipRule: "evenodd",
    })
  ),
  SR = F.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    F.createElement("path", {
      fillRule: "evenodd",
      d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
      clipRule: "evenodd",
    })
  ),
  CR = F.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    F.createElement("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
      clipRule: "evenodd",
    })
  ),
  $R = F.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    F.createElement("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
      clipRule: "evenodd",
    })
  ),
  _R = () => {
    let [e, t] = F.useState(!1);
    return (
      F.useEffect(() => {
        let n = () => {
          t(document.hidden);
        };
        return (
          document.addEventListener("visibilitychange", n),
          () => window.removeEventListener("visibilitychange", n)
        );
      }, []),
      e
    );
  },
  zu = 1,
  RR = class {
    constructor() {
      (this.subscribe = (e) => (
        this.subscribers.push(e),
        () => {
          let t = this.subscribers.indexOf(e);
          this.subscribers.splice(t, 1);
        }
      )),
        (this.publish = (e) => {
          this.subscribers.forEach((t) => t(e));
        }),
        (this.addToast = (e) => {
          this.publish(e), (this.toasts = [...this.toasts, e]);
        }),
        (this.create = (e) => {
          var t;
          let { message: n, ...r } = e,
            o =
              typeof (e == null ? void 0 : e.id) == "number" ||
              ((t = e.id) == null ? void 0 : t.length) > 0
                ? e.id
                : zu++,
            i = this.toasts.find((l) => l.id === o),
            a = e.dismissible === void 0 ? !0 : e.dismissible;
          return (
            i
              ? (this.toasts = this.toasts.map((l) =>
                  l.id === o
                    ? (this.publish({ ...l, ...e, id: o, title: n }),
                      { ...l, ...e, id: o, dismissible: a, title: n })
                    : l
                ))
              : this.addToast({ title: n, ...r, dismissible: a, id: o }),
            o
          );
        }),
        (this.dismiss = (e) => (
          e ||
            this.toasts.forEach((t) => {
              this.subscribers.forEach((n) => n({ id: t.id, dismiss: !0 }));
            }),
          this.subscribers.forEach((t) => t({ id: e, dismiss: !0 })),
          e
        )),
        (this.message = (e, t) => this.create({ ...t, message: e })),
        (this.error = (e, t) =>
          this.create({ ...t, message: e, type: "error" })),
        (this.success = (e, t) =>
          this.create({ ...t, type: "success", message: e })),
        (this.info = (e, t) => this.create({ ...t, type: "info", message: e })),
        (this.warning = (e, t) =>
          this.create({ ...t, type: "warning", message: e })),
        (this.loading = (e, t) =>
          this.create({ ...t, type: "loading", message: e })),
        (this.promise = (e, t) => {
          if (!t) return;
          let n;
          t.loading !== void 0 &&
            (n = this.create({
              ...t,
              promise: e,
              type: "loading",
              message: t.loading,
              description:
                typeof t.description != "function" ? t.description : void 0,
            }));
          let r = e instanceof Promise ? e : e(),
            o = n !== void 0;
          return (
            r
              .then((i) => {
                if (i && typeof i.ok == "boolean" && !i.ok) {
                  o = !1;
                  let a =
                      typeof t.error == "function"
                        ? t.error(`HTTP error! status: ${i.status}`)
                        : t.error,
                    l =
                      typeof t.description == "function"
                        ? t.description(`HTTP error! status: ${i.status}`)
                        : t.description;
                  this.create({
                    id: n,
                    type: "error",
                    message: a,
                    description: l,
                  });
                } else if (t.success !== void 0) {
                  o = !1;
                  let a =
                      typeof t.success == "function" ? t.success(i) : t.success,
                    l =
                      typeof t.description == "function"
                        ? t.description(i)
                        : t.description;
                  this.create({
                    id: n,
                    type: "success",
                    message: a,
                    description: l,
                  });
                }
              })
              .catch((i) => {
                if (t.error !== void 0) {
                  o = !1;
                  let a = typeof t.error == "function" ? t.error(i) : t.error,
                    l =
                      typeof t.description == "function"
                        ? t.description(i)
                        : t.description;
                  this.create({
                    id: n,
                    type: "error",
                    message: a,
                    description: l,
                  });
                }
              })
              .finally(() => {
                var i;
                o && (this.dismiss(n), (n = void 0)),
                  (i = t.finally) == null || i.call(t);
              }),
            n
          );
        }),
        (this.custom = (e, t) => {
          let n = (t == null ? void 0 : t.id) || zu++;
          return this.create({ jsx: e(n), id: n, ...t }), n;
        }),
        (this.subscribers = []),
        (this.toasts = []);
    }
  },
  un = new RR(),
  kR = (e, t) => {
    let n = (t == null ? void 0 : t.id) || zu++;
    return un.addToast({ title: e, ...t, id: n }), n;
  },
  TR = kR,
  Mm = Object.assign(TR, {
    success: un.success,
    info: un.info,
    warning: un.warning,
    error: un.error,
    custom: un.custom,
    message: un.message,
    promise: un.promise,
    dismiss: un.dismiss,
    loading: un.loading,
  });
function PR(e, { insertAt: t } = {}) {
  if (!e || typeof document > "u") return;
  let n = document.head || document.getElementsByTagName("head")[0],
    r = document.createElement("style");
  (r.type = "text/css"),
    t === "top" && n.firstChild
      ? n.insertBefore(r, n.firstChild)
      : n.appendChild(r),
    r.styleSheet
      ? (r.styleSheet.cssText = e)
      : r.appendChild(document.createTextNode(e));
}
PR(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999}:where([data-sonner-toaster][data-x-position="right"]){right:max(var(--offset),env(safe-area-inset-right))}:where([data-sonner-toaster][data-x-position="left"]){left:max(var(--offset),env(safe-area-inset-left))}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:max(var(--offset),env(safe-area-inset-top))}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:max(var(--offset),env(safe-area-inset-bottom))}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;background:var(--gray1);color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:0;right:0;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount, 0px));transition:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation:swipe-out .2s ease-out forwards}@keyframes swipe-out{0%{transform:translateY(calc(var(--lift) * var(--offset) + var(--swipe-amount)));opacity:1}to{transform:translateY(calc(var(--lift) * var(--offset) + var(--swipe-amount) + var(--lift) * -100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;--mobile-offset: 16px;right:var(--mobile-offset);left:var(--mobile-offset);width:100%}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset)}[data-sonner-toaster][data-y-position=bottom]{bottom:20px}[data-sonner-toaster][data-y-position=top]{top:20px}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset);right:var(--mobile-offset);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-rich-colors=true] [data-sonner-toast][data-type=success],[data-rich-colors=true] [data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true] [data-sonner-toast][data-type=info],[data-rich-colors=true] [data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true] [data-sonner-toast][data-type=warning],[data-rich-colors=true] [data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true] [data-sonner-toast][data-type=error],[data-rich-colors=true] [data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);
function Za(e) {
  return e.label !== void 0 && typeof e.onClick == "function";
}
var NR = 3,
  AR = "32px",
  DR = 4e3,
  OR = 356,
  MR = 14,
  LR = 20,
  IR = 200;
function FR(...e) {
  return e.filter(Boolean).join(" ");
}
var zR = (e) => {
  var t, n, r, o, i, a, l;
  let {
      invert: s,
      toast: c,
      unstyled: d,
      interacting: u,
      setHeights: p,
      visibleToasts: y,
      heights: v,
      index: g,
      toasts: x,
      expanded: m,
      removeToast: h,
      closeButton: w,
      style: E,
      cancelButtonStyle: $,
      actionButtonStyle: b,
      className: _ = "",
      descriptionClassName: k = "",
      duration: O,
      position: M,
      gap: K,
      loadingIcon: z,
      expandByDefault: ne,
      classNames: W,
      icons: J,
      closeButtonAriaLabel: ie = "Close toast",
      pauseWhenPageIsHidden: Q,
      cn: D,
    } = e,
    [P, I] = F.useState(!1),
    [j, H] = F.useState(!1),
    [se, Z] = F.useState(!1),
    [ye, te] = F.useState(!1),
    [Oe, ut] = F.useState(0),
    [Me, gt] = F.useState(0),
    ke = F.useRef(null),
    He = F.useRef(null),
    bn = g === 0,
    Mn = g + 1 <= y,
    we = c.type,
    vt = c.dismissible !== !1,
    En = c.className || "",
    lr = c.descriptionClassName || "",
    on = F.useMemo(
      () => v.findIndex((ee) => ee.toastId === c.id) || 0,
      [v, c.id]
    ),
    Vr = F.useMemo(() => {
      var ee;
      return (ee = c.closeButton) != null ? ee : w;
    }, [c.closeButton, w]),
    dt = F.useMemo(() => c.duration || O || DR, [c.duration, O]),
    Kt = F.useRef(0),
    ft = F.useRef(0),
    at = F.useRef(0),
    Et = F.useRef(null),
    [sr, Ln] = M.split("-"),
    cr = F.useMemo(
      () => v.reduce((ee, Le, Se) => (Se >= on ? ee : ee + Le.height), 0),
      [v, on]
    ),
    Tt = _R(),
    In = c.invert || s,
    an = we === "loading";
  (ft.current = F.useMemo(() => on * K + cr, [on, cr])),
    F.useEffect(() => {
      I(!0);
    }, []),
    F.useLayoutEffect(() => {
      if (!P) return;
      let ee = He.current,
        Le = ee.style.height;
      ee.style.height = "auto";
      let Se = ee.getBoundingClientRect().height;
      (ee.style.height = Le),
        gt(Se),
        p((Pt) =>
          Pt.find((St) => St.toastId === c.id)
            ? Pt.map((St) => (St.toastId === c.id ? { ...St, height: Se } : St))
            : [{ toastId: c.id, height: Se, position: c.position }, ...Pt]
        );
    }, [P, c.title, c.description, p, c.id]);
  let Ye = F.useCallback(() => {
    H(!0),
      ut(ft.current),
      p((ee) => ee.filter((Le) => Le.toastId !== c.id)),
      setTimeout(() => {
        h(c);
      }, IR);
  }, [c, h, p, ft]);
  F.useEffect(() => {
    if (
      (c.promise && we === "loading") ||
      c.duration === 1 / 0 ||
      c.type === "loading"
    )
      return;
    let ee,
      Le = dt;
    return (
      m || u || (Q && Tt)
        ? (() => {
            if (at.current < Kt.current) {
              let Se = new Date().getTime() - Kt.current;
              Le = Le - Se;
            }
            at.current = new Date().getTime();
          })()
        : Le !== 1 / 0 &&
          ((Kt.current = new Date().getTime()),
          (ee = setTimeout(() => {
            var Se;
            (Se = c.onAutoClose) == null || Se.call(c, c), Ye();
          }, Le))),
      () => clearTimeout(ee)
    );
  }, [m, u, ne, c, dt, Ye, c.promise, we, Q, Tt]),
    F.useEffect(() => {
      let ee = He.current;
      if (ee) {
        let Le = ee.getBoundingClientRect().height;
        return (
          gt(Le),
          p((Se) => [
            { toastId: c.id, height: Le, position: c.position },
            ...Se,
          ]),
          () => p((Se) => Se.filter((Pt) => Pt.toastId !== c.id))
        );
      }
    }, [p, c.id]),
    F.useEffect(() => {
      c.delete && Ye();
    }, [Ye, c.delete]);
  function Sn() {
    return J != null && J.loading
      ? F.createElement(
          "div",
          { className: "sonner-loader", "data-visible": we === "loading" },
          J.loading
        )
      : z
      ? F.createElement(
          "div",
          { className: "sonner-loader", "data-visible": we === "loading" },
          z
        )
      : F.createElement(bR, { visible: we === "loading" });
  }
  function Fn(ee) {
    return { __html: yR.sanitize(ee) };
  }
  return F.createElement(
    "li",
    {
      "aria-live": c.important ? "assertive" : "polite",
      "aria-atomic": "true",
      role: "status",
      tabIndex: 0,
      ref: He,
      className: D(
        _,
        En,
        W == null ? void 0 : W.toast,
        (t = c == null ? void 0 : c.classNames) == null ? void 0 : t.toast,
        W == null ? void 0 : W.default,
        W == null ? void 0 : W[we],
        (n = c == null ? void 0 : c.classNames) == null ? void 0 : n[we]
      ),
      "data-sonner-toast": "",
      "data-styled": !(c.jsx || c.unstyled || d),
      "data-mounted": P,
      "data-promise": !!c.promise,
      "data-removed": j,
      "data-visible": Mn,
      "data-y-position": sr,
      "data-x-position": Ln,
      "data-index": g,
      "data-front": bn,
      "data-swiping": se,
      "data-dismissible": vt,
      "data-type": we,
      "data-invert": In,
      "data-swipe-out": ye,
      "data-expanded": !!(m || (ne && P)),
      style: {
        "--index": g,
        "--toasts-before": g,
        "--z-index": x.length - g,
        "--offset": `${j ? Oe : ft.current}px`,
        "--initial-height": ne ? "auto" : `${Me}px`,
        ...E,
        ...c.style,
      },
      onPointerDown: (ee) => {
        an ||
          !vt ||
          ((ke.current = new Date()),
          ut(ft.current),
          ee.target.setPointerCapture(ee.pointerId),
          ee.target.tagName !== "BUTTON" &&
            (Z(!0), (Et.current = { x: ee.clientX, y: ee.clientY })));
      },
      onPointerUp: () => {
        var ee, Le, Se, Pt;
        if (ye || !vt) return;
        Et.current = null;
        let St = Number(
            ((ee = He.current) == null
              ? void 0
              : ee.style
                  .getPropertyValue("--swipe-amount")
                  .replace("px", "")) || 0
          ),
          Te =
            new Date().getTime() -
            ((Le = ke.current) == null ? void 0 : Le.getTime()),
          ln = Math.abs(St) / Te;
        if (Math.abs(St) >= LR || ln > 0.11) {
          ut(ft.current),
            (Se = c.onDismiss) == null || Se.call(c, c),
            Ye(),
            te(!0);
          return;
        }
        (Pt = He.current) == null ||
          Pt.style.setProperty("--swipe-amount", "0px"),
          Z(!1);
      },
      onPointerMove: (ee) => {
        var Le;
        if (!Et.current || !vt) return;
        let Se = ee.clientY - Et.current.y,
          Pt = ee.clientX - Et.current.x,
          St = (sr === "top" ? Math.min : Math.max)(0, Se),
          Te = ee.pointerType === "touch" ? 10 : 2;
        Math.abs(St) > Te
          ? (Le = He.current) == null ||
            Le.style.setProperty("--swipe-amount", `${Se}px`)
          : Math.abs(Pt) > Te && (Et.current = null);
      },
    },
    Vr && !c.jsx
      ? F.createElement(
          "button",
          {
            "aria-label": ie,
            "data-disabled": an,
            "data-close-button": !0,
            onClick:
              an || !vt
                ? () => {}
                : () => {
                    var ee;
                    Ye(), (ee = c.onDismiss) == null || ee.call(c, c);
                  },
            className: D(
              W == null ? void 0 : W.closeButton,
              (r = c == null ? void 0 : c.classNames) == null
                ? void 0
                : r.closeButton
            ),
          },
          F.createElement(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "12",
              height: "12",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            },
            F.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
            F.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
          )
        )
      : null,
    c.jsx || F.isValidElement(c.title)
      ? c.jsx || c.title
      : F.createElement(
          F.Fragment,
          null,
          we || c.icon || c.promise
            ? F.createElement(
                "div",
                { "data-icon": "", className: D(W == null ? void 0 : W.icon) },
                c.promise || (c.type === "loading" && !c.icon)
                  ? c.icon || Sn()
                  : null,
                c.type !== "loading"
                  ? c.icon || (J == null ? void 0 : J[we]) || wR(we)
                  : null
              )
            : null,
          F.createElement(
            "div",
            {
              "data-content": "",
              className: D(W == null ? void 0 : W.content),
            },
            F.createElement("div", {
              "data-title": "",
              className: D(
                W == null ? void 0 : W.title,
                (o = c == null ? void 0 : c.classNames) == null
                  ? void 0
                  : o.title
              ),
              dangerouslySetInnerHTML: Fn(c.title),
            }),
            c.description
              ? F.createElement("div", {
                  "data-description": "",
                  className: D(
                    k,
                    lr,
                    W == null ? void 0 : W.description,
                    (i = c == null ? void 0 : c.classNames) == null
                      ? void 0
                      : i.description
                  ),
                  dangerouslySetInnerHTML: Fn(c.description),
                })
              : null
          ),
          F.isValidElement(c.cancel)
            ? c.cancel
            : c.cancel && Za(c.cancel)
            ? F.createElement(
                "button",
                {
                  "data-button": !0,
                  "data-cancel": !0,
                  style: c.cancelButtonStyle || $,
                  onClick: (ee) => {
                    Za(c.cancel) && vt && (Ye(), c.cancel.onClick(ee));
                  },
                  className: D(
                    W == null ? void 0 : W.cancelButton,
                    (a = c == null ? void 0 : c.classNames) == null
                      ? void 0
                      : a.cancelButton
                  ),
                },
                c.cancel.label
              )
            : null,
          F.isValidElement(c.action)
            ? c.action
            : c.action && Za(c.action)
            ? F.createElement(
                "button",
                {
                  "data-button": "",
                  style: c.actionButtonStyle || b,
                  onClick: (ee) => {
                    Za(c.action) &&
                      (c.action.onClick(ee), !ee.defaultPrevented && Ye());
                  },
                  className: D(
                    W == null ? void 0 : W.actionButton,
                    (l = c == null ? void 0 : c.classNames) == null
                      ? void 0
                      : l.actionButton
                  ),
                },
                c.action.label
              )
            : null
        )
  );
};
function Lm() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  let e = document.documentElement.getAttribute("dir");
  return e === "auto" || !e
    ? window.getComputedStyle(document.documentElement).direction
    : e;
}
var jR = (e) => {
  let {
      invert: t,
      position: n = "bottom-right",
      hotkey: r = ["altKey", "KeyT"],
      expand: o,
      closeButton: i,
      className: a,
      offset: l,
      theme: s = "light",
      richColors: c,
      duration: d,
      style: u,
      visibleToasts: p = NR,
      toastOptions: y,
      dir: v = Lm(),
      gap: g = MR,
      loadingIcon: x,
      icons: m,
      containerAriaLabel: h = "Notifications",
      pauseWhenPageIsHidden: w,
      cn: E = FR,
    } = e,
    [$, b] = F.useState([]),
    _ = F.useMemo(
      () =>
        Array.from(
          new Set(
            [n].concat($.filter((j) => j.position).map((j) => j.position))
          )
        ),
      [$, n]
    ),
    [k, O] = F.useState([]),
    [M, K] = F.useState(!1),
    [z, ne] = F.useState(!1),
    [W, J] = F.useState(
      s !== "system"
        ? s
        : typeof window < "u" &&
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    ),
    ie = F.useRef(null),
    Q = r.join("+").replace(/Key/g, "").replace(/Digit/g, ""),
    D = F.useRef(null),
    P = F.useRef(!1),
    I = F.useCallback(
      (j) => b((H) => H.filter(({ id: se }) => se !== j.id)),
      []
    );
  return (
    F.useEffect(
      () =>
        un.subscribe((j) => {
          if (j.dismiss) {
            b((H) =>
              H.map((se) => (se.id === j.id ? { ...se, delete: !0 } : se))
            );
            return;
          }
          setTimeout(() => {
            Od.flushSync(() => {
              b((H) => {
                let se = H.findIndex((Z) => Z.id === j.id);
                return se !== -1
                  ? [...H.slice(0, se), { ...H[se], ...j }, ...H.slice(se + 1)]
                  : [j, ...H];
              });
            });
          });
        }),
      []
    ),
    F.useEffect(() => {
      if (s !== "system") {
        J(s);
        return;
      }
      s === "system" &&
        (window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? J("dark")
          : J("light")),
        typeof window < "u" &&
          window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", ({ matches: j }) => {
              J(j ? "dark" : "light");
            });
    }, [s]),
    F.useEffect(() => {
      $.length <= 1 && K(!1);
    }, [$]),
    F.useEffect(() => {
      let j = (H) => {
        var se, Z;
        r.every((ye) => H[ye] || H.code === ye) &&
          (K(!0), (se = ie.current) == null || se.focus()),
          H.code === "Escape" &&
            (document.activeElement === ie.current ||
              ((Z = ie.current) != null &&
                Z.contains(document.activeElement))) &&
            K(!1);
      };
      return (
        document.addEventListener("keydown", j),
        () => document.removeEventListener("keydown", j)
      );
    }, [r]),
    F.useEffect(() => {
      if (ie.current)
        return () => {
          D.current &&
            (D.current.focus({ preventScroll: !0 }),
            (D.current = null),
            (P.current = !1));
        };
    }, [ie.current]),
    $.length
      ? F.createElement(
          "section",
          { "aria-label": `${h} ${Q}`, tabIndex: -1 },
          _.map((j, H) => {
            var se;
            let [Z, ye] = j.split("-");
            return F.createElement(
              "ol",
              {
                key: j,
                dir: v === "auto" ? Lm() : v,
                tabIndex: -1,
                ref: ie,
                className: a,
                "data-sonner-toaster": !0,
                "data-theme": W,
                "data-rich-colors": c,
                "data-y-position": Z,
                "data-x-position": ye,
                style: {
                  "--front-toast-height": `${
                    ((se = k[0]) == null ? void 0 : se.height) || 0
                  }px`,
                  "--offset": typeof l == "number" ? `${l}px` : l || AR,
                  "--width": `${OR}px`,
                  "--gap": `${g}px`,
                  ...u,
                },
                onBlur: (te) => {
                  P.current &&
                    !te.currentTarget.contains(te.relatedTarget) &&
                    ((P.current = !1),
                    D.current &&
                      (D.current.focus({ preventScroll: !0 }),
                      (D.current = null)));
                },
                onFocus: (te) => {
                  (te.target instanceof HTMLElement &&
                    te.target.dataset.dismissible === "false") ||
                    P.current ||
                    ((P.current = !0), (D.current = te.relatedTarget));
                },
                onMouseEnter: () => K(!0),
                onMouseMove: () => K(!0),
                onMouseLeave: () => {
                  z || K(!1);
                },
                onPointerDown: (te) => {
                  (te.target instanceof HTMLElement &&
                    te.target.dataset.dismissible === "false") ||
                    ne(!0);
                },
                onPointerUp: () => ne(!1),
              },
              $.filter(
                (te) => (!te.position && H === 0) || te.position === j
              ).map((te, Oe) => {
                var ut, Me;
                return F.createElement(zR, {
                  key: te.id,
                  icons: m,
                  index: Oe,
                  toast: te,
                  duration:
                    (ut = y == null ? void 0 : y.duration) != null ? ut : d,
                  className: y == null ? void 0 : y.className,
                  descriptionClassName:
                    y == null ? void 0 : y.descriptionClassName,
                  invert: t,
                  visibleToasts: p,
                  closeButton:
                    (Me = y == null ? void 0 : y.closeButton) != null ? Me : i,
                  interacting: z,
                  position: j,
                  style: y == null ? void 0 : y.style,
                  unstyled: y == null ? void 0 : y.unstyled,
                  classNames: y == null ? void 0 : y.classNames,
                  cancelButtonStyle: y == null ? void 0 : y.cancelButtonStyle,
                  actionButtonStyle: y == null ? void 0 : y.actionButtonStyle,
                  removeToast: I,
                  toasts: $.filter((gt) => gt.position == te.position),
                  heights: k.filter((gt) => gt.position == te.position),
                  setHeights: O,
                  expandByDefault: o,
                  gap: g,
                  loadingIcon: x,
                  expanded: M,
                  pauseWhenPageIsHidden: w,
                  cn: E,
                });
              })
            );
          })
        )
      : null
  );
};
/*! Bundled license information:

dompurify/dist/purify.es.mjs:
  (*! @license DOMPurify 3.0.10 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.10/LICENSE *)
*/ function UR({ open: e, onOpenChange: t }) {
  const [n, r] = f.useState({ currentPassword: "", newPassword: "" }),
    [o, i] = f.useState(!1),
    a = (s) => {
      s || r({ currentPassword: "", newPassword: "" }), t(s);
    },
    l = async () => {
      i(!0);
      try {
        await P3({
          new_password: n.newPassword,
          current_password: n.currentPassword,
          account_name: _3(),
        }),
          Mm.success("Password updated successfully, please log in again."),
          a(!1),
          Ry(),
          _s.navigate("/login");
      } catch (s) {
        Mm.error(s.message || "Failed to update password.");
      }
      i(!1);
    };
  return N.jsx(X3, {
    open: e,
    onOpenChange: a,
    children: N.jsxs(Fy, {
      className: "sm:max-w-[520px]",
      onPointerDownOutside: (s) => s.preventDefault(),
      children: [
        N.jsx(zy, { children: N.jsx(Uy, { children: "Update password" }) }),
        N.jsxs("div", {
          className: "my-4",
          children: [
            N.jsx("div", {
              className: "text-sm text-zinc-700",
              children: "Current password",
            }),
            N.jsx(Lu, {
              type: "password",
              placeholder: "original password",
              value: n.currentPassword,
              onChange: (s) =>
                r((c) => ({ ...c, currentPassword: s.target.value })),
            }),
          ],
        }),
        N.jsxs("div", {
          className: "mb-4",
          children: [
            N.jsx("div", {
              className: "text-sm text-zinc-700",
              children: "New password",
            }),
            N.jsx(Lu, {
              type: "password",
              placeholder: "original password",
              value: n.newPassword,
              onChange: (s) =>
                r((c) => ({ ...c, newPassword: s.target.value })),
            }),
          ],
        }),
        N.jsx(jy, {
          children: N.jsx(Bd, {
            type: "submit",
            loading: o,
            onClick: l,
            children: "Confirm",
          }),
        }),
      ],
    }),
  });
}
const BR = "AlertDialog",
  [HR, Qk] = or(BR, [Py]),
  Hr = Py(),
  VR = (e) => {
    const { __scopeAlertDialog: t, ...n } = e,
      r = Hr(t);
    return f.createElement(My, V({}, r, n, { modal: !0 }));
  },
  WR = (e) => {
    const { __scopeAlertDialog: t, ...n } = e,
      r = Hr(t);
    return f.createElement(Ly, V({}, r, n));
  },
  KR = f.forwardRef((e, t) => {
    const { __scopeAlertDialog: n, ...r } = e,
      o = Hr(n);
    return f.createElement(df, V({}, o, r, { ref: t }));
  }),
  Gy = "AlertDialogContent",
  [GR, YR] = HR(Gy),
  QR = f.forwardRef((e, t) => {
    const { __scopeAlertDialog: n, children: r, ...o } = e,
      i = Hr(n),
      a = f.useRef(null),
      l = ct(t, a),
      s = f.useRef(null);
    return f.createElement(
      Y3,
      { contentName: Gy, titleName: XR, docsSlug: "alert-dialog" },
      f.createElement(
        GR,
        { scope: n, cancelRef: s },
        f.createElement(
          ff,
          V({ role: "alertdialog" }, i, o, {
            ref: l,
            onOpenAutoFocus: le(o.onOpenAutoFocus, (c) => {
              var d;
              c.preventDefault(),
                (d = s.current) === null ||
                  d === void 0 ||
                  d.focus({ preventScroll: !0 });
            }),
            onPointerDownOutside: (c) => c.preventDefault(),
            onInteractOutside: (c) => c.preventDefault(),
          }),
          f.createElement(wv, null, r),
          !1
        )
      )
    );
  }),
  XR = "AlertDialogTitle",
  qR = f.forwardRef((e, t) => {
    const { __scopeAlertDialog: n, ...r } = e,
      o = Hr(n);
    return f.createElement(pf, V({}, o, r, { ref: t }));
  }),
  ZR = f.forwardRef((e, t) => {
    const { __scopeAlertDialog: n, ...r } = e,
      o = Hr(n);
    return f.createElement(mf, V({}, o, r, { ref: t }));
  }),
  JR = f.forwardRef((e, t) => {
    const { __scopeAlertDialog: n, ...r } = e,
      o = Hr(n);
    return f.createElement(hf, V({}, o, r, { ref: t }));
  }),
  ek = "AlertDialogCancel",
  tk = f.forwardRef((e, t) => {
    const { __scopeAlertDialog: n, ...r } = e,
      { cancelRef: o } = YR(ek, n),
      i = Hr(n),
      a = ct(t, o);
    return f.createElement(hf, V({}, i, r, { ref: a }));
  }),
  nk = VR,
  rk = WR,
  Yy = KR,
  Qy = QR,
  Xy = JR,
  qy = tk,
  Zy = qR,
  Jy = ZR,
  ok = nk,
  ik = rk,
  e1 = f.forwardRef(({ className: e, ...t }, n) =>
    N.jsx(Yy, {
      className: Ee(
        "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        e
      ),
      ...t,
      ref: n,
    })
  );
e1.displayName = Yy.displayName;
const t1 = f.forwardRef(({ className: e, ...t }, n) =>
  N.jsxs(ik, {
    children: [
      N.jsx(e1, {}),
      N.jsx(Qy, {
        ref: n,
        className: Ee(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          e
        ),
        ...t,
      }),
    ],
  })
);
t1.displayName = Qy.displayName;
const n1 = ({ className: e, ...t }) =>
  N.jsx("div", {
    className: Ee("flex flex-col space-y-2 text-center sm:text-left", e),
    ...t,
  });
n1.displayName = "AlertDialogHeader";
const r1 = ({ className: e, ...t }) =>
  N.jsx("div", {
    className: Ee(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      e
    ),
    ...t,
  });
r1.displayName = "AlertDialogFooter";
const o1 = f.forwardRef(({ className: e, ...t }, n) =>
  N.jsx(Zy, { ref: n, className: Ee("text-lg font-semibold", e), ...t })
);
o1.displayName = Zy.displayName;
const i1 = f.forwardRef(({ className: e, ...t }, n) =>
  N.jsx(Jy, { ref: n, className: Ee("text-sm text-muted-foreground", e), ...t })
);
i1.displayName = Jy.displayName;
const a1 = f.forwardRef(({ className: e, loading: t, ...n }, r) =>
  N.jsx(Xy, {
    ref: r,
    className: Ee(Ud(), e),
    ...n,
    disabled: n.disabled || t,
    children: N.jsxs(N.Fragment, {
      children: [t && N.jsx(Iv, {}), n.children],
    }),
  })
);
a1.displayName = Xy.displayName;
const l1 = f.forwardRef(({ className: e, ...t }, n) =>
  N.jsx(qy, {
    ref: n,
    className: Ee(Ud({ variant: "outline" }), "mt-2 sm:mt-0", e),
    ...t,
  })
);
l1.displayName = qy.displayName;
const ak = ({ open: e, onOpenChange: t }) => {
    const n = () => {
      Ry(), _s.navigate("/login");
    };
    return N.jsx(ok, {
      open: e,
      onOpenChange: t,
      children: N.jsxs(t1, {
        children: [
          N.jsxs(n1, {
            children: [
              N.jsx(o1, { children: "Are you absolutely sure?" }),
              N.jsx(i1, { children: "Are you sure you want to log out?" }),
            ],
          }),
          N.jsxs(r1, {
            children: [
              N.jsx(l1, { children: "Cancel" }),
              N.jsx(a1, { onClick: n, children: "Continue" }),
            ],
          }),
        ],
      }),
    });
  },
  Im = [
    { label: "Setting", value: "setting", path: "/" },
    { label: "Dashboard", value: "dashboard", path: "/dashboard" },
    { label: "Source", value: "source", path: "/source" },
    { label: "Embed", value: "embed", path: "/embed" },
  ],
  lk = () => {
    const e = Lb(),
      [t, n] = F.useState("account"),
      [r, o] = F.useState({ changePassword: !1, logout: !1 });
    F.useEffect(() => {
      var a;
      n(
        ((a = Im.find((l) => {
          var s;
          return l.path === ((s = e[2]) == null ? void 0 : s.pathname);
        })) == null
          ? void 0
          : a.value) ?? "setting"
      );
    }, []);
    const i = (a, l) => o((s) => ({ ...s, [l]: a }));
    return N.jsxs("div", {
      className: "h-full flex flex-col",
      children: [
        N.jsxs("div", {
          className: "flex items-center mx-6 py-5 justify-between",
          children: [
            N.jsxs("div", {
              className: "flex items-center",
              children: [
                N.jsxs(Dv, {
                  className: "mr-3",
                  children: [
                    N.jsx(Ov, {
                      src: "https://github.com/shadcn.png",
                      alt: "@shadcn",
                    }),
                    N.jsx(Mv, { children: "OpenIM" }),
                  ],
                }),
                N.jsx("div", { children: "OpenKF Docs Bot" }),
              ],
            }),
            N.jsxs(L$, {
              children: [
                N.jsx(I$, {
                  asChild: !0,
                  children: N.jsx(Bd, {
                    variant: "ghost",
                    className: "h-8 w-8 p-0",
                    children: N.jsx(l_, { className: "h-4 w-4" }),
                  }),
                }),
                N.jsxs(W0, {
                  children: [
                    N.jsx(ku, {
                      onClick: () => i(!0, "changePassword"),
                      children: "Change password",
                    }),
                    N.jsx(ku, {
                      onClick: () => i(!0, "logout"),
                      children: "Log out",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        N.jsx("div", {
          className: "flex justify-center",
          children: N.jsx(n_, {
            value: t,
            onValueChange: (a) => n(a),
            className: "overflow-y-auto",
            children: N.jsx(ry, {
              children: Im.map((a) =>
                f.createElement(o_, { ...a, key: a.value })
              ),
            }),
          }),
        }),
        N.jsx(Q0, {}),
        N.jsx("div", {
          className: "flex-1 flex justify-center",
          children: N.jsx("div", {
            className: "2xl:w-[60vw] w-[90vw]",
            children: N.jsx(jb, {}),
          }),
        }),
        N.jsx(ak, { open: r.logout, onOpenChange: (a) => i(a, "logout") }),
        N.jsx(UR, {
          open: r.changePassword,
          onOpenChange: (a) => i(a, "changePassword"),
        }),
      ],
    });
  },
  _s = Gb([
    {
      path: "/",
      children: [
        {
          element: N.jsx(lk, {}),
          loader: () => (_y() ? {} : nb("login")),
          children: [
            {
              index: !0,
              async lazy() {
                const { Setting: e } = await dr(
                  () => import("./Setting-uk7UYz_k.js"),
                  __vite__mapDeps([0, 1])
                );
                return { Component: e };
              },
            },
            {
              path: "dashboard",
              async lazy() {
                const { Dashboard: e } = await dr(
                  () => import("./Dashboard-WB1KXATu.js"),
                  __vite__mapDeps([2, 3, 1, 4])
                );
                return { Component: e };
              },
            },
            {
              path: "source",
              async lazy() {
                const { Source: e } = await dr(
                  () => import("./Source-5g35C8sb.js"),
                  __vite__mapDeps([])
                );
                return { Component: e };
              },
              children: [
                {
                  index: !0,
                  async lazy() {
                    const { Website: e } = await dr(
                      () => import("./Website-Z1INMbWO.js"),
                      __vite__mapDeps([5, 6, 3, 7])
                    );
                    return { Component: e };
                  },
                },
                {
                  path: "urls",
                  async lazy() {
                    const { Urls: e } = await dr(
                      () => import("./Url-003PGMwp.js"),
                      __vite__mapDeps([8, 6, 3, 7, 1])
                    );
                    return { Component: e };
                  },
                },
                {
                  path: "files",
                  async lazy() {
                    const { Files: e } = await dr(
                      () => import("./Files-zclWqD_f.js"),
                      __vite__mapDeps([9, 6, 3])
                    );
                    return { Component: e };
                  },
                },
              ],
            },
            {
              path: "embed",
              async lazy() {
                const { Embed: e } = await dr(
                  () => import("./Embed-zUv8vG44.js"),
                  __vite__mapDeps([])
                );
                return { Component: e };
              },
            },
          ],
        },
      ],
    },
    {
      path: "login",
      async lazy() {
        const { Login: e } = await dr(
          () => import("./Login-VKBBRRSv.js"),
          __vite__mapDeps([])
        );
        return { Component: e };
      },
    },
  ]);
var Fm = ["light", "dark"],
  sk = "(prefers-color-scheme: dark)",
  ck = f.createContext(void 0),
  uk = { setTheme: (e) => {}, themes: [] },
  dk = () => {
    var e;
    return (e = f.useContext(ck)) != null ? e : uk;
  };
f.memo(
  ({
    forcedTheme: e,
    storageKey: t,
    attribute: n,
    enableSystem: r,
    enableColorScheme: o,
    defaultTheme: i,
    value: a,
    attrs: l,
    nonce: s,
  }) => {
    let c = i === "system",
      d =
        n === "class"
          ? `var d=document.documentElement,c=d.classList;${`c.remove(${l
              .map((v) => `'${v}'`)
              .join(",")})`};`
          : `var d=document.documentElement,n='${n}',s='setAttribute';`,
      u = o
        ? Fm.includes(i) && i
          ? `if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${i}'`
          : "if(e==='light'||e==='dark')d.style.colorScheme=e"
        : "",
      p = (v, g = !1, x = !0) => {
        let m = a ? a[v] : v,
          h = g ? v + "|| ''" : `'${m}'`,
          w = "";
        return (
          o &&
            x &&
            !g &&
            Fm.includes(v) &&
            (w += `d.style.colorScheme = '${v}';`),
          n === "class"
            ? g || m
              ? (w += `c.add(${h})`)
              : (w += "null")
            : m && (w += `d[s](n,${h})`),
          w
        );
      },
      y = e
        ? `!function(){${d}${p(e)}}()`
        : r
        ? `!function(){try{${d}var e=localStorage.getItem('${t}');if('system'===e||(!e&&${c})){var t='${sk}',m=window.matchMedia(t);if(m.media!==t||m.matches){${p(
            "dark"
          )}}else{${p("light")}}}else if(e){${
            a ? `var x=${JSON.stringify(a)};` : ""
          }${p(a ? "x[e]" : "e", !0)}}${
            c ? "" : "else{" + p(i, !1, !1) + "}"
          }${u}}catch(e){}}()`
        : `!function(){try{${d}var e=localStorage.getItem('${t}');if(e){${
            a ? `var x=${JSON.stringify(a)};` : ""
          }${p(a ? "x[e]" : "e", !0)}}else{${p(
            i,
            !1,
            !1
          )};}${u}}catch(t){}}();`;
    return f.createElement("script", {
      nonce: s,
      dangerouslySetInnerHTML: { __html: y },
    });
  }
);
const fk = ({ ...e }) => {
  const { theme: t = "system" } = dk();
  return N.jsx(jR, {
    theme: t,
    className: "toaster group",
    toastOptions: {
      classNames: {
        toast:
          "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
        description: "group-[.toast]:text-muted-foreground",
        actionButton:
          "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
        cancelButton:
          "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
      },
    },
    ...e,
  });
};
function pk() {
  return N.jsxs(f.Suspense, {
    fallback: N.jsx("div", { children: "loading..." }),
    children: [N.jsx(tE, { router: _s }), N.jsx(fk, {})],
  });
}
xc.createRoot(document.getElementById("root")).render(N.jsx(pk, {}));
export {
  or as $,
  Dv as A,
  Bd as B,
  D$ as C,
  De as D,
  bS as E,
  bk as F,
  mk as G,
  jm as H,
  Lu as I,
  Rv as J,
  X3 as K,
  Fy as L,
  zy as M,
  Uy as N,
  jy as O,
  Ik as P,
  nt as Q,
  F as R,
  Mk as S,
  Lk as T,
  Sk as U,
  Q0 as V,
  Lb as W,
  n_ as X,
  ry as Y,
  o_ as Z,
  V as _,
  Mv as a,
  jb as a0,
  i2 as a1,
  Yk as a2,
  Z3 as a3,
  Tk as a4,
  Pk as a5,
  Nk as a6,
  Dk as a7,
  Ok as a8,
  jk as a9,
  Uk as aa,
  zk as ab,
  L$ as ac,
  I$ as ad,
  l_ as ae,
  W0 as af,
  B$ as ag,
  ku as ah,
  H$ as ai,
  Ek as aj,
  Vk as ak,
  Hk as al,
  Wk as am,
  dS as an,
  A$ as ao,
  Ak as ap,
  Kk as aq,
  Bk as ar,
  Iv as as,
  _k as at,
  Ck as au,
  $k as av,
  _s as aw,
  Ov as b,
  Mm as c,
  Fk as d,
  ws as e,
  Ee as f,
  Rk as g,
  Ud as h,
  r0 as i,
  N as j,
  ar as k,
  l0 as l,
  ct as m,
  p0 as n,
  E0 as o,
  co as p,
  le as q,
  f as r,
  Uv as s,
  Bv as t,
  kk as u,
  zv as v,
  ES as w,
  ps as x,
  xS as y,
  no as z,
};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = [
      "assets/Setting-uk7UYz_k.js",
      "assets/textarea-eX4nx7v5.js",
      "assets/Dashboard-WB1KXATu.js",
      "assets/loading-vsHIitu7.js",
      "assets/Dashboard-BieUHPHe.css",
      "assets/Website-Z1INMbWO.js",
      "assets/common-nfwq9z7Z.js",
      "assets/LinkTable-Ia3zEXas.js",
      "assets/Url-003PGMwp.js",
      "assets/Files-zclWqD_f.js",
    ];
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i]);
}
