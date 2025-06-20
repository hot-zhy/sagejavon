import {
  e as X,
  $ as H,
  r as s,
  D as P,
  _ as T,
  j as t,
  f as w,
  a1 as K,
  K as J,
  a2 as Q,
  B as I,
  L as Y,
  M as Z,
  N as ee,
  a3 as te,
  O as ae,
  a4 as re,
  a5 as se,
  a6 as _,
  a7 as C,
  c as S,
  I as ne,
  a8 as le,
} from "./index-ck01-P-l.js";
import { c as ie, S as oe, a as ce } from "./common-nfwq9z7Z.js";
import { L as E } from "./LinkTable-Ia3zEXas.js";
import "./loading-vsHIitu7.js";
/**
 * @license lucide-react v0.319.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const de = X("Terminal", [
    ["polyline", { points: "4 17 10 11 4 5", key: "akl6gq" }],
    ["line", { x1: "12", x2: "20", y1: "19", y2: "19", key: "q2wloq" }],
  ]),
  R = "Progress",
  N = 100,
  [ue, Se] = H(R),
  [me, fe] = ue(R),
  A = s.forwardRef((e, a) => {
    const {
        __scopeProgress: r,
        value: n,
        max: d,
        getValueLabel: i = ve,
        ...x
      } = e,
      u = L(d) ? d : N,
      o = O(n, u) ? n : null,
      v = j(o) ? i(o, u) : void 0;
    return s.createElement(
      me,
      { scope: r, value: o, max: u },
      s.createElement(
        P.div,
        T(
          {
            "aria-valuemax": u,
            "aria-valuemin": 0,
            "aria-valuenow": j(o) ? o : void 0,
            "aria-valuetext": v,
            role: "progressbar",
            "data-state": V(o, u),
            "data-value": o ?? void 0,
            "data-max": u,
          },
          x,
          { ref: a }
        )
      )
    );
  });
A.propTypes = {
  max(e, a, r) {
    const n = e[a],
      d = String(n);
    return n && !L(n) ? new Error(ge(d, r)) : null;
  },
  value(e, a, r) {
    const n = e[a],
      d = String(n),
      i = L(e.max) ? e.max : N;
    return n != null && !O(n, i) ? new Error($e(d, r)) : null;
  },
};
const xe = "ProgressIndicator",
  pe = s.forwardRef((e, a) => {
    var r;
    const { __scopeProgress: n, ...d } = e,
      i = fe(xe, n);
    return s.createElement(
      P.div,
      T(
        {
          "data-state": V(i.value, i.max),
          "data-value": (r = i.value) !== null && r !== void 0 ? r : void 0,
          "data-max": i.max,
        },
        d,
        { ref: a }
      )
    );
  });
function ve(e, a) {
  return `${Math.round((e / a) * 100)}%`;
}
function V(e, a) {
  return e == null ? "indeterminate" : e === a ? "complete" : "loading";
}
function j(e) {
  return typeof e == "number";
}
function L(e) {
  return j(e) && !isNaN(e) && e > 0;
}
function O(e, a) {
  return j(e) && !isNaN(e) && e <= a && e >= 0;
}
function ge(e, a) {
  return `Invalid prop \`max\` of value \`${e}\` supplied to \`${a}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${N}\`.`;
}
function $e(e, a) {
  return `Invalid prop \`value\` of value \`${e}\` supplied to \`${a}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${N} if no \`max\` prop is set)
  - \`null\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
const M = A,
  he = pe,
  F = s.forwardRef(({ className: e, value: a, ...r }, n) =>
    t.jsx(M, {
      ref: n,
      className: w(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        e
      ),
      ...r,
      children: t.jsx(he, {
        className: "h-full w-full flex-1 bg-[#7c3aed] transition-all",
        style: { transform: `translateX(-${100 - (a || 0)}%)` },
      }),
    })
  );
F.displayName = M.displayName;
const be = K(
    "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
    {
      variants: {
        variant: {
          default: "bg-background text-foreground",
          destructive:
            "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        },
      },
      defaultVariants: { variant: "default" },
    }
  ),
  z = s.forwardRef(({ className: e, variant: a, ...r }, n) =>
    t.jsx("div", {
      ref: n,
      role: "alert",
      className: w(be({ variant: a }), e),
      ...r,
    })
  );
z.displayName = "Alert";
const U = s.forwardRef(({ className: e, ...a }, r) =>
  t.jsx("h5", {
    ref: r,
    className: w("mb-1 font-medium leading-none tracking-tight", e),
    ...a,
  })
);
U.displayName = "AlertTitle";
const W = s.forwardRef(({ className: e, ...a }, r) =>
  t.jsx("div", {
    ref: r,
    className: w("text-sm [&_p]:leading-relaxed", e),
    ...a,
  })
);
W.displayName = "AlertDescription";
function je({ site: e, onConfirm: a, onDialogClose: r }) {
  const [n, d] = s.useState(!1),
    [i, x] = s.useState(0),
    [u, o] = s.useState([]),
    [v, p] = s.useState(),
    [g, h] = s.useState(!1);
  let m = s.useRef(null),
    f = s.useRef(null);
  const l = () => {
      console.log("start fetch"),
        re(e)
          .then(y)
          .catch(() => p("Failed to crawl this site, please try again later."));
    },
    $ = () => {
      x(0),
        m.current && clearInterval(m.current),
        (m.current = setInterval(() => {
          x((c) => (c >= 88 ? (clearInterval(m.current), 88) : c + 1));
        }, 1e3));
    },
    y = () => {
      f.current && clearInterval(f.current),
        (f.current = setInterval(() => {
          se(e).then(({ data: { sites_info: c } }) => {
            c[0].domain_status === 2 &&
              (clearInterval(f.current),
              clearInterval(m.current),
              _(e).then(({ data: k }) => {
                o(k.url_list), x(100);
              }));
          });
        }, 5e3)),
        $();
    },
    D = (c) => {
      c ||
        (r == null || r(),
        x(0),
        o([]),
        p(void 0),
        m.current && clearInterval(m.current),
        f.current && clearInterval(f.current)),
        d(c);
    },
    q = async (c) => {
      o((k) => k.filter((G) => !c.includes(G.id)));
    },
    B = async () => {
      h(!0);
      try {
        await C(u.map((c) => c.id)),
          D(!1),
          setTimeout(() => (a == null ? void 0 : a()), 1e3);
      } catch {
        p("Failed to import links, please try again later.");
      }
      h(!1);
    },
    b = i < 100;
  return t.jsxs(J, {
    open: n,
    onOpenChange: D,
    children: [
      t.jsx(Q, {
        asChild: !0,
        children: t.jsx(I, {
          className: "text-xs font-normal h-8",
          onClick: l,
          disabled: !e.trim(),
          children: "Fetch",
        }),
      }),
      t.jsxs(Y, {
        className: "sm:min-w-[48rem] sm:max-h-[80vh] flex flex-col",
        onPointerDownOutside: (c) => c.preventDefault(),
        children: [
          t.jsxs(Z, {
            children: [
              t.jsx(ee, {
                children: b
                  ? "Crawling, please wait..."
                  : "Confirm import links",
              }),
              b &&
                t.jsx(te, {
                  children:
                    "Import all by default, select to remove certain items",
                }),
            ],
          }),
          v
            ? t.jsxs(z, {
                children: [
                  t.jsx(de, { className: "h-4 w-4" }),
                  t.jsx(U, { children: "crawl failed" }),
                  t.jsx(W, { children: v }),
                ],
              })
            : b
            ? t.jsxs("div", {
                children: [
                  t.jsx("div", { children: `${i}%` }),
                  t.jsx(F, { value: i }),
                ],
              })
            : t.jsx(E, { links: u, deleteLinks: q }),
          !b &&
            t.jsx(ae, {
              children: t.jsx(I, {
                type: "submit",
                loading: g,
                onClick: B,
                children: "Confirm",
              }),
            }),
        ],
      }),
    ],
  });
}
const Le = () => {
  const [e, a] = s.useState(""),
    [r, n] = s.useState(!0),
    [d, i] = s.useState([]),
    [x, u] = s.useState(),
    [o, v] = s.useState(!1);
  let p = s.useRef(void 0);
  s.useEffect(
    () => (
      g(),
      () => {
        p.current && clearTimeout(p.current);
      }
    ),
    []
  );
  const g = async () => {
      try {
        const {
          data: { url_list: l },
        } = await _();
        i(l), (p.current = ie(l, g));
      } catch (l) {
        S.error(l.message || "Failed to get link list.");
      }
      n(!1);
    },
    h = async (l) => {
      await le(l),
        i(($) => $.filter((y) => !l.includes(y.id))),
        S.success("Deleted successfully");
    },
    m = async (l) => {
      await C(l), g(), S.success("Updated successfully");
    },
    f = (l, $) => {
      v(l), u($);
    };
  return t.jsx("div", {
    className: "mt-[5vh]",
    children: t.jsxs("div", {
      className: "mb-10 rounded border border-zinc-200",
      children: [
        t.jsx("div", {
          className: "border-b border-zinc-200 px-5 py-4",
          children: t.jsx("h3", {
            className: "text-xl font-semibold leading-6 text-zinc-900 ",
            children: "Website URLs",
          }),
        }),
        t.jsx("div", {
          className: "p-5",
          children: t.jsxs("div", {
            children: [
              t.jsxs("div", {
                children: [
                  t.jsx("small", {
                    className: "text-sm font-medium leading-none",
                    children: "Automatically Crawling",
                  }),
                  t.jsxs("div", {
                    className: "flex w-full items-center space-x-2 mt-2",
                    children: [
                      t.jsx(ne, {
                        type: "url",
                        placeholder: "https://www.example.com",
                        value: e,
                        onChange: (l) => a(l.target.value),
                      }),
                      t.jsx(je, {
                        site: e,
                        onDialogClose: () => a(""),
                        onConfirm: g,
                      }),
                    ],
                  }),
                ],
              }),
              t.jsx("p", {
                className: "mt-5 text-sm text-zinc-500 dark:text-zinc-300",
                children:
                  "This will crawl all links starting with the provided URL",
              }),
              t.jsxs("div", {
                className: "pt-1",
                children: [
                  t.jsxs("div", {
                    children: [
                      t.jsx(oe, { content: "Included URLs" }),
                      t.jsx(E, {
                        links: d,
                        loading: r,
                        deleteLinks: h,
                        updateLinks: m,
                        onSelectLink: (l) => f(!0, l),
                      }),
                    ],
                  }),
                  t.jsx(ce, { open: o, selectedUrl: x, onOpenChange: f }),
                ],
              }),
            ],
          }),
        }),
      ],
    }),
  });
};
export { Le as Website };
