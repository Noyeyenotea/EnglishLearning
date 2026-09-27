import layout from "@/layout/index.vue";
import Course from "@/views/Course/index.vue";

export default [
  {
    path: "/courses",
    component: layout,
    children: [
      { path: "index", component: Course },
      {
        path: "learn/:courseId/:title",
        component: () => import("@/views/Course/Learn/index.vue"),
      },
    ],
  },
];
