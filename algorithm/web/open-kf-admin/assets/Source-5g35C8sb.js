import {
  W as n,
  R as l,
  j as s,
  X as o,
  Y as h,
  r as x,
  Z as m,
  a0 as b,
} from "./index-ck01-P-l.js";
const r = [
    { label: "Websites", value: "website", path: "/source/" },
    // { label: "URLs", value: "urls", path: "/source/urls" },
    { label: "Files", value: "files", path: "/source/files" },
  ],
  d = () => {
    const c = n(),
      [i, a] = l.useState("website");
    return (
      l.useEffect(() => {
        var e;
        a(
          ((e = r.find((u) => {
            var t;
            return u.path === ((t = c[3]) == null ? void 0 : t.pathname);
          })) == null
            ? void 0
            : e.value) ?? "website"
        );
      }, []),
      s.jsxs("div", {
        className: "flex",
        children: [
          s.jsx("div", {
            className: "mt-[5vh] mr-6",
            children: s.jsx(o, {
              value: i,
              onValueChange: (e) => a(e),
              orientation: "vertical",
              children: s.jsx(h, {
                className: "flex flex-col h-full",
                children: r.map((e) =>
                  x.createElement(m, {
                    ...e,
                    key: e.value,
                    className: "w-[50px]",
                  })
                ),
              }),
            }),
          }),
          s.jsx("div", {
            className: "flex-1 overflow-hidden",
            children: s.jsx(b, {}),
          }),
        ],
      })
    );
  };
export { d as Source };
