import {
  r as g,
  j as e,
  I,
  B as p,
  ac as k,
  ad as H,
  ae as V,
  af as _,
  ag as z,
  ah as f,
  ai as A,
} from "./index-ck01-P-l.js";
import {
  D as i,
  u as B,
  T as E,
  b as U,
  d as b,
  e as K,
  f as N,
  g as L,
  h as v,
  P as D,
  i as q,
  j as m,
  k as O,
  l as G,
  m as J,
  n as Q,
  C as M,
  B as W,
  o as X,
  p as Y,
  q as Z,
} from "./common-nfwq9z7Z.js";
const $ = {
  [i.Failed]: { text: "Failed", bgColor: "#e3342f" },
  [i.Recorded]: { text: "Recorded", bgColor: "#A6A6A6" },
  [i.Crawling]: { text: "Crawling", bgColor: "#6cb2eb" },
  [i.Crawled]: { text: "Crawled", bgColor: "#17a2b8" },
  [i.Trained]: { text: "Trained", bgColor: "#4A90A4" },
  [i.Expired]: { text: "Expired", bgColor: "#e3342f" },
};
function se({
  links: r,
  loading: x,
  updateLinks: o,
  deleteLinks: j,
  onSelectLink: h,
}) {
  var S, P;
  const [w, a] = g.useState({}),
    [d, c] = g.useState(!1),
    [n, C] = g.useState(!1),
    [u, F] = g.useState({ pageIndex: 0, pageSize: 10 }),
    [y, T] = g.useState([]),
    R = [
      {
        id: "select",
        header: ({ table: t }) =>
          e.jsx(M, {
            checked:
              t.getIsAllPageRowsSelected() ||
              (t.getIsSomePageRowsSelected() && "indeterminate"),
            onCheckedChange: (l) => t.toggleAllPageRowsSelected(!!l),
            "aria-label": "Select all",
          }),
        cell: ({ row: t }) =>
          e.jsx(M, {
            checked: t.getIsSelected(),
            onCheckedChange: (l) => t.toggleSelected(!!l),
            "aria-label": "Select row",
          }),
        enableSorting: !1,
        enableHiding: !1,
      },
      {
        accessorKey: "url",
        header: "Url",
        cell: ({ row: t }) =>
          e.jsx("div", {
            className: "cursor-pointer",
            onClick: () =>
              t.original.doc_status === i.Trained &&
              (h == null ? void 0 : h(t.original)),
            children: t.getValue("url"),
          }),
      },
      {
        accessorKey: "content_length",
        header: () =>
          e.jsx("div", { className: "text-right", children: "Size" }),
        cell: ({ row: t }) =>
          e.jsx("div", {
            className: "text-right font-medium",
            children: t.getValue("content_length"),
          }),
      },
      {
        accessorKey: "doc_status",
        header: () =>
          e.jsx("div", { className: "text-right", children: "Status" }),
        cell: ({ row: t }) => {
          const l = $[t.getValue("doc_status")];
          return e.jsx("div", {
            className: "text-right",
            children: e.jsx(W, {
              className: "text-white",
              style: { backgroundColor: l.bgColor },
              variant: "outline",
              children: l.text,
            }),
          });
        },
      },
      {
        id: "actions",
        enableHiding: !1,
        cell: ({ row: t }) => {
          const l = t.original;
          return e.jsxs(k, {
            children: [
              e.jsx(H, {
                asChild: !0,
                children: e.jsxs(p, {
                  variant: "ghost",
                  className: "h-8 w-8 p-0",
                  children: [
                    e.jsx("span", {
                      className: "sr-only",
                      children: "Open menu",
                    }),
                    e.jsx(V, { className: "h-4 w-4" }),
                  ],
                }),
              }),
              e.jsxs(_, {
                align: "end",
                children: [
                  e.jsx(z, { children: "Actions" }),
                  e.jsx(f, {
                    onClick: () => navigator.clipboard.writeText(l.url),
                    children: "Copy link",
                  }),
                  e.jsx(A, {}),
                  e.jsx(f, { onClick: () => j([l.id]), children: "Delete" }),
                  o &&
                    e.jsx(f, { onClick: () => o([l.id]), children: "Update" }),
                ],
              }),
            ],
          });
        },
      },
    ],
    s = B({
      data: r,
      columns: R,
      onColumnFiltersChange: T,
      getCoreRowModel: X(),
      getPaginationRowModel: Y(),
      getFilteredRowModel: Z(),
      onRowSelectionChange: a,
      onPaginationChange: F,
      state: { pagination: u, columnFilters: y, rowSelection: w },
    });
  return e.jsxs("div", {
    className: "w-full flex-1 overflow-hidden flex flex-col",
    children: [
      //   e.jsx("div", {
      //     className: "flex items-center py-4 pl-1",
      //     children: e.jsx(I, {
      //       placeholder: "Filter url...",
      //       value:
      //         ((S = s.getColumn("url")) == null ? void 0 : S.getFilterValue()) ??
      //         "",
      //       onChange: (t) => {
      //         var l;
      //         return (l = s.getColumn("url")) == null
      //           ? void 0
      //           : l.setFilterValue(t.target.value);
      //       },
      //       className: "max-w-sm",
      //     }),
      //   }),
      e.jsx("div", {
        className: "rounded-md border flex flex-col overflow-hidden",
        children: e.jsxs(E, {
          children: [
            e.jsx(U, {
              children: s.getHeaderGroups().map((t) =>
                e.jsx(
                  b,
                  {
                    children: t.headers.map((l) =>
                      e.jsx(
                        K,
                        {
                          children: l.isPlaceholder
                            ? null
                            : N(l.column.columnDef.header, l.getContext()),
                        },
                        l.id
                      )
                    ),
                  },
                  t.id
                )
              ),
            }),
            e.jsx(L, {
              children:
                (P = s.getRowModel().rows) != null && P.length
                  ? s.getRowModel().rows.map((t) =>
                      e.jsx(
                        b,
                        {
                          "data-state": t.getIsSelected() && "selected",
                          children: t.getVisibleCells().map((l) =>
                            e.jsx(
                              v,
                              {
                                children: N(
                                  l.column.columnDef.cell,
                                  l.getContext()
                                ),
                              },
                              l.id
                            )
                          ),
                        },
                        t.id
                      )
                    )
                  : e.jsx(b, {
                      children: e.jsx(v, {
                        colSpan: R.length,
                        className: "h-24 text-center",
                        children: x ? "loading..." : "No results.",
                      }),
                    }),
            }),
          ],
        }),
      }),
      e.jsxs("div", {
        className: "flex items-center justify-end space-x-2 py-4",
        children: [
          s.getFilteredSelectedRowModel().rows.length
            ? e.jsxs(e.Fragment, {
                children: [
                  e.jsxs("div", {
                    className: "flex items-center",
                    children: [
                      o &&
                        e.jsx(p, {
                          size: "sm",
                          variant: "outline",
                          loading: d,
                          style: { marginRight: "8px" },
                          onClick: async () => {
                            c(!0),
                              await o(
                                s
                                  .getFilteredSelectedRowModel()
                                  .rows.map((t) => t.original.id)
                              ),
                              c(!1),
                              s.resetRowSelection();
                          },
                          children: "Update",
                        }),
                      e.jsx(p, {
                        size: "sm",
                        variant: "destructive",
                        loading: n,
                        onClick: async () => {
                          C(!0),
                            await j(
                              s
                                .getFilteredSelectedRowModel()
                                .rows.map((t) => t.original.id)
                            ),
                            C(!1),
                            s.resetRowSelection();
                        },
                        children: "Delete",
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    className: "flex-1 text-sm text-muted-foreground",
                    children: [
                      s.getFilteredSelectedRowModel().rows.length,
                      " of",
                      " ",
                      s.getFilteredRowModel().rows.length,
                      " row(s) selected.",
                    ],
                  }),
                ],
              })
            : e.jsxs("div", {
                className: "flex-1 text-sm text-muted-foreground",
                children: [s.getFilteredRowModel().rows.length, " total"],
              }),
          s.getFilteredRowModel().rows.length > 10 &&
            e.jsx(D, {
              className: "w-fit",
              children: e.jsxs(q, {
                children: [
                  e.jsx(m, {
                    children: e.jsx(O, {
                      isDisabled: !s.getCanPreviousPage(),
                      onClick: () => s.previousPage(),
                    }),
                  }),
                  e.jsx(ee, {
                    totalPages: s.getPageCount(),
                    pageIndex: u.pageIndex,
                    setPageIndex: (t) => s.setPageIndex(t),
                  }),
                  e.jsx(m, {
                    children: e.jsx(G, {
                      isDisabled: !s.getCanNextPage(),
                      onClick: () => s.nextPage(),
                    }),
                  }),
                ],
              }),
            }),
        ],
      }),
    ],
  });
}
function ee({ totalPages: r, pageIndex: x, setPageIndex: o }) {
  const w = ((a) => {
    const d = Math.max(1, a - 2),
      c = Math.min(r, a + 2);
    let n = Array.from({ length: c - d + 1 }, (C, u) => String(d + u));
    return (
      d > 1 && (n = ["1", "ellipsisLeft", ...n]),
      c < r && (n = [...n, "ellipsisRight", String(r)]),
      n
    );
  })(x + 1);
  return e.jsx(D, {
    children: w.map((a) =>
      a === "ellipsisLeft" || a === "ellipsisRight"
        ? e.jsx(m, { children: e.jsx(J, {}) }, a)
        : e.jsx(
            m,
            {
              children: e.jsx(Q, {
                isActive: x === Number(a) - 1,
                onClick: () => o(Number(a) - 1),
                children: a,
              }),
            },
            a
          )
    ),
  });
}
export { se as L };
