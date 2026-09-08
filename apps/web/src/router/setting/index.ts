import layout from "@/layout/index.vue";
import Setting from "@/views/Setting/index.vue";

export default [
  {
    path: "/setting",
    component: layout,
    children: [{ path: "index", component: Setting }],
  },
];
