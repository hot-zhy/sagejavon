import {
  r as N,
  j as e,
  I as V,
  B as M,
  aj as H,
  R as h,
  ak as E,
  c as y,
  al as K,
  am as O,
} from "./index-ck01-P-l.js";
import {
  F as C,
  u as q,
  T as W,
  b as Y,
  d as D,
  e as G,
  f as I,
  g as J,
  h as L,
  P as A,
  i as Q,
  j as P,
  k as X,
  l as Z,
  m as $,
  n as ee,
  C as T,
  B as te,
  o as se,
  p as le,
  q as ie,
  c as ae,
  S as U,
  a as ne,
} from "./common-nfwq9z7Z.js";
import "./loading-vsHIitu7.js";
const oe =
    "https://th.bing.com/th/id/OIP.AjfBHPaz5e6HVvmn4xudEAHaHa?w=176&h=180&c=7&r=0&o=5&pid=1.7",
  re =
    "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2024%2024'%20stroke-width='1.5'%20stroke='currentColor'%20aria-hidden='true'%20className='ml-1%20h-4%20w-4%20text-red-600'%3e%3cpath%20stroke-linecap='round'%20stroke-linejoin='round'%20d='M14.74%209l-.346%209m-4.788%200L9.26%209m9.968-3.21c.342.052.682.107%201.022.166m-1.022-.165L18.16%2019.673a2.25%202.25%200%2001-2.244%202.077H8.084a2.25%202.25%200%2001-2.244-2.077L4.772%205.79m14.456%200a48.108%2048.108%200%2000-3.478-.397m-12%20.562c.34-.059.68-.114%201.022-.165m0%200a48.11%2048.11%200%20013.478-.397m7.5%200v-.916c0-1.18-.91-2.164-2.09-2.201a51.964%2051.964%200%2000-3.32%200c-1.18.037-2.09%201.022-2.09%202.201v.916m7.5%200a48.667%2048.667%200%2000-7.5%200'%3e%3c/path%3e%3c/svg%3e";
let R;
const ce = new Uint8Array(16);
function de() {
  if (
    !R &&
    ((R =
      typeof crypto < "u" &&
      crypto.getRandomValues &&
      crypto.getRandomValues.bind(crypto)),
    !R)
  )
    throw new Error(
      "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
    );
  return R(ce);
}
const o = [];
for (let t = 0; t < 256; ++t) o.push((t + 256).toString(16).slice(1));
function ge(t, l = 0) {
  return (
    o[t[l + 0]] +
    o[t[l + 1]] +
    o[t[l + 2]] +
    o[t[l + 3]] +
    "-" +
    o[t[l + 4]] +
    o[t[l + 5]] +
    "-" +
    o[t[l + 6]] +
    o[t[l + 7]] +
    "-" +
    o[t[l + 8]] +
    o[t[l + 9]] +
    "-" +
    o[t[l + 10]] +
    o[t[l + 11]] +
    o[t[l + 12]] +
    o[t[l + 13]] +
    o[t[l + 14]] +
    o[t[l + 15]]
  );
}
const ue =
    typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto),
  z = { randomUUID: ue };
function xe(t, l, g) {
  if (z.randomUUID && !l && !t) return z.randomUUID();
  t = t || {};
  const r = t.random || (t.rng || de)();
  if (((r[6] = (r[6] & 15) | 64), (r[8] = (r[8] & 63) | 128), l)) {
    g = g || 0;
    for (let d = 0; d < 16; ++d) l[g + d] = r[d];
    return l;
  }
  return ge(r);
}
const me = {
  [C.Recorded]: { text: "Recorded", bgColor: "#A6A6A6" }, // Lighter gray for Recorded
  [C.Parsing]: { text: "Parsing", bgColor: "#8BBAE6" }, // Light blue for Parsing
  [C.Parsed]: { text: "Parsed", bgColor: "#4A90A4" }, // Muted teal for Parsed
  [C.Trained]: { text: "Trained", bgColor: "#4A90A4" }, // Subtle green for Trained
};

function he({ files: t, loading: l, deleteFiles: g, onSelectFile: r }) {
  var v, F;
  const [d, p] = N.useState({}),
    [c, u] = N.useState(!1),
    [j, x] = N.useState({ pageIndex: 0, pageSize: 10 }),
    [S, w] = N.useState([]),
    b = [
      {
        id: "select",
        header: ({ table: s }) =>
          e.jsx(T, {
            checked:
              s.getIsAllPageRowsSelected() ||
              (s.getIsSomePageRowsSelected() && "indeterminate"),
            onCheckedChange: (n) => s.toggleAllPageRowsSelected(!!n),
            "aria-label": "Select all",
          }),
        cell: ({ row: s }) =>
          e.jsx(T, {
            checked: s.getIsSelected(),
            onCheckedChange: (n) => s.toggleSelected(!!n),
            "aria-label": "Select row",
          }),
        enableSorting: !1,
        enableHiding: !1,
      },
      {
        accessorKey: "origin_file_name",
        header: "File Name",
        cell: ({ row: s }) =>
          e.jsx("div", {
            className: "cursor-pointer",
            onClick: () =>
              s.original.doc_status === C.Trained &&
              (r == null ? void 0 : r(s.original)),
            children: s.getValue("origin_file_name"),
          }),
      },
      {
        accessorKey: "url",
        header: "Action",
        cell: ({ row: s }) =>
          e.jsx("button", {
            className: "bg-green-200 text-white px-4 py-2 rounded-md",
            onClick: () => window.open(s.getValue("url"), "_blank"),
            children: "Open File",
          }),
      },

      //   {
      //     accessorKey: "content_length",
      //     header: () =>
      //       e.jsx("div", { className: "text-right", children: "Size" }),
      //     cell: ({ row: s }) =>
      //       e.jsx("div", {
      //         className: "text-right font-medium",
      //         children: s.getValue("content_length"),
      //       }),
      //   },
      {
        accessorKey: "doc_status",
        header: () =>
          e.jsx("div", { className: "text-right", children: "Status" }),
        cell: ({ row: s }) => {
          const n = me[s.getValue("doc_status")];
          return e.jsx("div", {
            className: "text-right",
            children: e.jsx(te, {
              className: "text-white",
              style: { backgroundColor: n.bgColor },
              variant: "outline",
              children: n.text,
            }),
          });
        },
      },
      //   {
      //     id: "actions",
      //     enableHiding: !1,
      //     cell: ({ row: s }) => {
      //       const n = s.original;
      //       return e.jsx(M, {
      //         variant: "outline",
      //         size: "icon",
      //         onClick: () => g([n.id]),
      //         children: e.jsx(H, { className: "h-4 w-4" }),
      //       });
      //     },
      //   },
    ],
    a = q({
      data: t,
      columns: b,
      onColumnFiltersChange: w,
      getCoreRowModel: se(),
      getPaginationRowModel: le(),
      getFilteredRowModel: ie(),
      onRowSelectionChange: p,
      onPaginationChange: x,
      state: { pagination: j, columnFilters: S, rowSelection: d },
    });
  return e.jsxs("div", {
    className: "w-full flex-1 overflow-hidden flex flex-col",
    children: [
      //   e.jsx("div", {
      //     className: "flex items-center py-4 pl-1",
      //     children: e.jsx(V, {
      //       placeholder: "Filter file name...",
      //       value:
      //         ((v = a.getColumn("origin_file_name")) == null
      //           ? void 0
      //           : v.getFilterValue()) ?? "",
      //       onChange: (s) => {
      //         var n;
      //         return (n = a.getColumn("origin_file_name")) == null
      //           ? void 0
      //           : n.setFilterValue(s.target.value);
      //       },
      //       className: "max-w-sm",
      //     }),
      //   }),
      e.jsx("div", {
        className: "rounded-md border flex flex-col overflow-hidden",
        children: e.jsxs(W, {
          children: [
            e.jsx(Y, {
              children: a.getHeaderGroups().map((s) =>
                e.jsx(
                  D,
                  {
                    children: s.headers.map((n) =>
                      e.jsx(
                        G,
                        {
                          children: n.isPlaceholder
                            ? null
                            : I(n.column.columnDef.header, n.getContext()),
                        },
                        n.id
                      )
                    ),
                  },
                  s.id
                )
              ),
            }),
            e.jsx(J, {
              children:
                (F = a.getRowModel().rows) != null && F.length
                  ? a.getRowModel().rows.map((s) =>
                      e.jsx(
                        D,
                        {
                          "data-state": s.getIsSelected() && "selected",
                          children: s.getVisibleCells().map((n) =>
                            e.jsx(
                              L,
                              {
                                children: I(
                                  n.column.columnDef.cell,
                                  n.getContext()
                                ),
                              },
                              n.id
                            )
                          ),
                        },
                        s.id
                      )
                    )
                  : e.jsx(D, {
                      children: e.jsx(L, {
                        colSpan: b.length,
                        className: "h-24 text-center",
                        children: l ? "loading..." : "No results.",
                      }),
                    }),
            }),
          ],
        }),
      }),
      e.jsxs("div", {
        className: "flex items-center justify-end space-x-2 py-4",
        children: [
          a.getFilteredSelectedRowModel().rows.length
            ? e.jsxs(e.Fragment, {
                children: [
                  e.jsx("div", {
                    className: "flex items-center",
                    children: e.jsx(M, {
                      size: "sm",
                      variant: "destructive",
                      loading: c,
                      onClick: async () => {
                        u(!0),
                          await g(
                            a
                              .getFilteredSelectedRowModel()
                              .rows.map((s) => s.original.id)
                          ),
                          u(!1),
                          a.resetRowSelection();
                      },
                      children: "Delete",
                    }),
                  }),
                  e.jsxs("div", {
                    className: "flex-1 text-sm text-muted-foreground",
                    children: [
                      a.getFilteredSelectedRowModel().rows.length,
                      " of",
                      " ",
                      a.getFilteredRowModel().rows.length,
                      " row(s) selected.",
                    ],
                  }),
                ],
              })
            : e.jsxs("div", {
                className: "flex-1 text-sm text-muted-foreground",
                children: [a.getFilteredRowModel().rows.length, " total"],
              }),
          a.getFilteredRowModel().rows.length > 10 &&
            e.jsx(A, {
              className: "w-fit",
              children: e.jsxs(Q, {
                children: [
                  e.jsx(P, {
                    children: e.jsx(X, {
                      isDisabled: !a.getCanPreviousPage(),
                      onClick: () => a.previousPage(),
                    }),
                  }),
                  e.jsx(pe, {
                    totalPages: a.getPageCount(),
                    pageIndex: j.pageIndex,
                    setPageIndex: (s) => a.setPageIndex(s),
                  }),
                  e.jsx(P, {
                    children: e.jsx(Z, {
                      isDisabled: !a.getCanNextPage(),
                      onClick: () => a.nextPage(),
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
function pe({ totalPages: t, pageIndex: l, setPageIndex: g }) {
  const p = ((c) => {
    const u = Math.max(1, c - 2),
      j = Math.min(t, c + 2);
    let x = Array.from({ length: j - u + 1 }, (S, w) => String(u + w));
    return (
      u > 1 && (x = ["1", "ellipsisLeft", ...x]),
      j < t && (x = [...x, "ellipsisRight", String(t)]),
      x
    );
  })(l + 1);
  return e.jsx(A, {
    children: p.map((c) =>
      c === "ellipsisLeft" || c === "ellipsisRight"
        ? e.jsx(P, { children: e.jsx($, {}) }, c)
        : e.jsx(
            P,
            {
              children: e.jsx(ee, {
                isActive: l === Number(c) - 1,
                onClick: () => g(Number(c) - 1),
                children: c,
              }),
            },
            c
          )
    ),
  });
}
const Ne = () => {
    const [t, l] = h.useState(!0),
      [g, r] = h.useState(!1),
      [d, p] = h.useState([]),
      [c, u] = h.useState([]),
      [j, x] = h.useState(),
      [S, w] = h.useState(!1),
      b = h.useRef(null);
    let a = h.useRef(void 0);
    N.useEffect(
      () => (
        v(),
        () => {
          a.current && clearTimeout(a.current);
        }
      ),
      []
    );
    const v = async () => {
        try {
          const {
            data: { file_list: i },
          } = await E();
          u(i), (a.current = ae(i, v));
        } catch (i) {
          y.error(i.message || "Failed to get file list.");
        }
        l(!1);
      },
      F = async (i) => {
        const m = i.target.files;
        if (!m) return;
        const f = Array.from(m);
        if (d.length + f.length > 10) {
          y.error("You can only upload up to 10 files at a time");
          return;
        }
        f.forEach((k) => {
          k.uuid = xe();
        }),
          p((k) => [...k, ...f]);
      },
      s = (i) => {
        p((m) => m.filter((f) => f.uuid !== i));
      },
      n = async () => {
        r(!0);
        try {
          await K(d), v(), y.success("Uploaded successfully");
        } catch (i) {
          y.error(i.message || "Failed to upload files");
        }
        r(!1), p([]);
      },
      B = async (i) => {
        await O(i),
          u((m) => m.filter((f) => !i.includes(f.id))),
          y.success("Deleted successfully");
      },
      _ = (i, m) => {
        w(i), x(m);
      };
    return e.jsx("div", {
      className: "mt-[5vh] ",
      children: e.jsxs("div", {
        className: "mb-10 rounded border border-zinc-200",
        children: [
          e.jsx("div", {
            className: "border-b border-zinc-200 px-5 py-4",
            children: e.jsx("h3", {
              className: "text-xl font-semibold leading-6 text-zinc-900 ",
              children: "Files",
            }),
          }),
          e.jsx("div", {
            className: "p-5 w-full",
            children: e.jsxs("div", {
              children: [
                e.jsxs("div", {
                  className: "border border-neutral-200 p-10 cursor-pointer",
                  onClick: () => {
                    var i;
                    return (i = b.current) == null ? void 0 : i.click();
                  },
                  children: [
                    e.jsx(V, {
                      ref: b,
                      onChange: F,
                      className: "hidden",
                      accept:
                        "text/html,.pdf,.doc,.docx,.txt,.md,.epub,.mobi,.pptx,.xlsx,.csv",
                      multiple: !0,
                      type: "file",
                      name: "file",
                    }),
                    e.jsxs("div", {
                      className:
                        "flex flex-col items-center justify-center gap-4",
                      children: [
                        e.jsx("img", { width: 100, src: oe, alt: "upload" }),
                        e.jsxs("div", {
                          className: "items-center justify-center text-center",
                          children: [
                            e.jsx("p", {
                              className: "text-md text-zinc-1000",
                              children:
                                "Drag and drop files here, or click to browse and select. Uploading subject-specific resources enables the system to ground AI responses in your course content, enhancing the relevance and precision of student-facing answers.",
                            }),
                            e.jsx("span", {
                              className:
                                "text-xs text-zinc-500 dark:text-zinc-300",
                              id: "file_type_help",
                              children:
                                "Supported File Types: .pdf, .doc, .docx, .txt, .md, .epub, .pptx",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                e.jsx("p", {
                  className:
                    "mt-2 text-center text-sm text-zinc-500 dark:text-zinc-300",
                  id: "file_input_help",
                  children: "",
                }),
                e.jsx("div", {
                  className: "pt-8",
                  children:
                    !!d.length &&
                    e.jsxs("div", {
                      children: [
                        e.jsx(U, { content: "Attached Files" }),
                        d.map((i) =>
                          e.jsx(fe, { file: i, deleteFile: s }, i.uuid)
                        ),
                      ],
                    }),
                }),
                e.jsx("div", {
                  className: "flex justify-center",
                  width: 400,
                  children: e.jsx(M, {
                    loading: g,
                    className: " h-100",
                    width: 400,
                    onClick: n,
                    // disabled: !d.length,
                    children: "Upload",
                  }),
                }),
                e.jsxs("div", {
                  children: [
                    e.jsx(U, { content: "uploaded Files" }),
                    e.jsx(he, {
                      files: c,
                      loading: t,
                      deleteFiles: B,
                      onSelectFile: (i) => _(!0, i),
                    }),
                  ],
                }),
              ],
            }),
          }),
          e.jsx(ne, { selectFile: j, open: S, onOpenChange: _ }),
        ],
      }),
    });
  },
  je = ({ onClick: t }) =>
    e.jsx("button", {
      className:
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 underline-offset-4 hover:underline dark:text-zinc-50 h-9 px-4 py-2 ml-1 text-red-600 transition-transform duration-500 ease-in-out hover:text-red-500",
      type: "button",
      onClick: t,
      children: e.jsx("img", { width: 16, src: re, alt: "delete" }),
    }),
  fe = ({ file: t, deleteFile: l }) =>
    e.jsx("div", {
      className: "mt-2 max-h-[36rem] overflow-auto pr-2",
      children: e.jsxs("div", {
        className: "grid grid-cols-10 pb-2",
        children: [
          e.jsxs("div", {
            className: "col-span-9",
            children: [
              e.jsx("span", {
                className: "break-words text-sm",
                children: t.name,
              }),
              " ",
            ],
          }),
          e.jsx("div", {
            className: "flex items-center justify-end",
            children: e.jsx(je, { onClick: () => l(t.uuid) }),
          }),
        ],
      }),
    });
export { Ne as Files };
