import {
  r,
  g as F,
  j as e,
  I as g,
  A as y,
  a as _,
  b,
  B as m,
  U as S,
  u as x,
  c as d,
  d as k,
} from "./index-ck01-P-l.js";
import { T as R } from "./textarea-eX4nx7v5.js";
const z = () => {
  const [n, i] = r.useState({
      id: 0,
      initial_messages: [],
      suggested_messages: [],
      bot_name: "",
      bot_avatar: "",
      chat_icon: "",
      placeholder: "",
      model: "",
    }),
    [h, u] = r.useState({ initial_messages: "", suggested_messages: "" }),
    [o, c] = r.useState({
      updating: !1,
      avatarUploading: !1,
      avatarRemoving: !1,
      chatIconUploading: !1,
      chatIconRemoving: !1,
    }),
    p = r.useRef(null),
    v = r.useRef(null);
  r.useEffect(() => {
    F().then((a) => {
      i(a.data.config),
        u({
          initial_messages: a.data.config.initial_messages.join(`
`),
          suggested_messages: a.data.config.suggested_messages.join(`
`),
        });
    });
  }, []);
  const j = (a, s) => {
      u((t) => ({ ...t, [s]: a })),
        i((t) => ({
          ...t,
          [s]: a.split(`
`),
        }));
    },
    I = async () => {
      c((a) => ({ ...a, updating: !0 }));
      try {
        await x(n), d.success("Settings updated successfully.");
      } catch (a) {
        d.error(a.message || "Failed to update settings. Please try again.");
      }
      c((a) => ({ ...a, updating: !1 }));
    },
    f = async (a, s) => {
      if (!s) return;
      const t = a === "bot_avatar" ? " avatarRemoving" : "chatIconRemoving";
      c((l) => ({ ...l, [t]: !0 }));
      try {
        const {
          data: { picture_url: l },
        } = await k(s);
        await x({ ...n, [a]: l }),
          i((C) => ({ ...C, [a]: l })),
          d.success("Image updated successfully.");
      } catch (l) {
        d.error(l.message || "Failed to upload image. Please try again.");
      }
      c((l) => ({ ...l, [t]: !1 }));
    },
    N = async (a) => {
      const s = a === "bot_avatar" ? " avatarRemoving" : "chatIconRemoving";
      c((t) => ({ ...t, [s]: !0 }));
      try {
        await x({ ...n, [a]: "" }), i((t) => ({ ...t, [a]: "" }));
      } catch (t) {
        d.error(t.message || "Failed to remove image. Please try again.");
      }
      c((t) => ({ ...t, [s]: !1 }));
    };
  return e.jsxs("div", {
    className: "mt-6 border border-zinc-200 h-fit rounded-md",
    children: [
      e.jsxs("div", {
        className: "p-5",
        children: [
          e.jsx("small", {
            className: "text-sm font-medium leading-none",
            children: "Initial Messages",
          }),
          e.jsxs("div", {
            className: "mt-1 mb-3",
            children: [
              e.jsx(R, {
                placeholder: "Type your message here.",
                value: h.initial_messages,
                onChange: (a) => j(a.target.value, "initial_messages"),
              }),
              e.jsx("p", {
                className: "my-2 text-sm text-zinc-500 dark:text-zinc-300",
                children: "enter each URL in a new line.",
              }),
            ],
          }),
          e.jsx("small", {
            className: "text-sm font-medium leading-none",
            children: "Suggested Messages",
          }),
          e.jsxs("div", {
            className: "mt-1 mb-3",
            children: [
              e.jsx(R, {
                placeholder: "Type your message here.",
                value: h.suggested_messages,
                onChange: (a) => j(a.target.value, "suggested_messages"),
              }),
              e.jsx("p", {
                className: "my-2 text-sm text-zinc-500 dark:text-zinc-300",
                children: "enter each URL in a new line.",
              }),
            ],
          }),
          e.jsx("small", {
            className: "text-sm font-medium leading-none",
            children: "Message Placeholder",
          }),
          e.jsx("div", {
            className: "mt-1 mb-3",
            children: e.jsx(g, {
              type: "text",
              placeholder: "Type your message here.",
              value: n.placeholder,
              onChange: (a) =>
                i((s) => ({ ...s, placeholder: a.target.value })),
            }),
          }),
          e.jsxs("div", {
            className: "flex items-center",
            children: [
              e.jsxs(y, {
                children: [
                  e.jsx(_, {}),
                  e.jsx(b, { src: n.bot_avatar, alt: n.bot_name }),
                ],
              }),
              e.jsxs("div", {
                className: "ml-6",
                children: [
                  e.jsx("small", {
                    className: "text-sm font-medium leading-none",
                    children: "Profile Picture",
                  }),
                  e.jsxs("div", {
                    className: "mt-1 mb-3",
                    children: [
                      e.jsxs("div", {
                        className: "flex items-center space-x-3",
                        children: [
                          e.jsxs(m, {
                            className: "h-7 px-3 text-xs",
                            variant: "outline",
                            loading: o.avatarUploading,
                            onClick: () => {
                              var a;
                              return (a = p.current) == null
                                ? void 0
                                : a.click();
                            },
                            children: [
                              e.jsx(S, { className: "mr-2" }),
                              "Upload image",
                            ],
                          }),
                          n.bot_avatar &&
                            e.jsx(m, {
                              className: "h-7 px-3 text-xs",
                              variant: "ghost",
                              loading: o.avatarRemoving,
                              onClick: () => N("bot_avatar"),
                              children: "Remove",
                            }),
                        ],
                      }),
                      e.jsx(g, {
                        className: "hidden",
                        accept: "image/*",
                        multiple: !1,
                        type: "file",
                        ref: p,
                        onChange: (a) => {
                          var s;
                          return f(
                            "bot_avatar",
                            (s = a.target.files) == null ? void 0 : s[0]
                          );
                        },
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          e.jsx("small", {
            className: "text-sm font-medium leading-none",
            children: "Display name",
          }),
          e.jsx("div", {
            className: "mt-1 mb-3",
            children: e.jsx(g, {
              type: "text",
              placeholder: "Type your name here.",
              value: n.bot_name,
              onChange: (a) => i((s) => ({ ...s, bot_name: a.target.value })),
            }),
          }),
          e.jsxs("div", {
            className: "flex items-center",
            children: [
              e.jsxs(y, {
                children: [
                  e.jsx(_, {}),
                  e.jsx(b, { src: n.chat_icon, alt: "Ask" }),
                ],
              }),
              e.jsxs("div", {
                className: "ml-6",
                children: [
                  e.jsx("small", {
                    className: "text-sm font-medium leading-none",
                    children: "Chat icon",
                  }),
                  e.jsxs("div", {
                    className: "mt-1 mb-3",
                    children: [
                      e.jsxs("div", {
                        className: "flex items-center space-x-3",
                        children: [
                          e.jsxs(m, {
                            className: "h-7 px-3 text-xs",
                            variant: "outline",
                            loading: o.chatIconUploading,
                            onClick: () => {
                              var a;
                              return (a = v.current) == null
                                ? void 0
                                : a.click();
                            },
                            children: [
                              e.jsx(S, { className: "mr-2" }),
                              "Upload image",
                            ],
                          }),
                          n.chat_icon &&
                            e.jsx(m, {
                              className: "h-7 px-3 text-xs",
                              variant: "ghost",
                              loading: o.chatIconRemoving,
                              onClick: () => N("chat_icon"),
                              children: "Remove",
                            }),
                        ],
                      }),
                      e.jsx(g, {
                        className: "hidden",
                        accept: "image/*",
                        multiple: !1,
                        type: "file",
                        ref: v,
                        onChange: (a) => {
                          var s;
                          return f(
                            "chat_icon",
                            (s = a.target.files) == null ? void 0 : s[0]
                          );
                        },
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      e.jsx("div", {
        className: "flex justify-end bg-zinc-100 px-5 py-3",
        children: e.jsx(m, {
          size: "sm",
          loading: o.updating,
          onClick: I,
          children: "Save",
        }),
      }),
    ],
  });
};
export { z as Setting };
