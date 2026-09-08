import layout from "@/layout/index.vue";
import Chat from "@/views/Chat/index.vue";

export default [
  {
    path: "/chat",
    component: layout,
    children: [{ path: "index", component: Chat }],
  },
];
