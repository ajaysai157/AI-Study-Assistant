import {
  House,
  FileText,
  Brain,
  ClipboardCheck,
  CalendarDays,
  User,
  Settings,
} from "lucide-react";

const navigationData = [
  {
    id: 1,
    title: "Home",
    path: "/home",
    icon: House,
  },
  {
    id: 2,
    title: "My Notes",
    path: "/notes",
    icon: FileText,
  },
  {
    id: 3,
    title: "Flashcards",
    path: "/flashcards",
    icon: Brain,
  },
  {
    id: 4,
    title: "AI Quiz",
    path: "/quiz",
    icon: ClipboardCheck,
  },
  {
    id: 5,
    title: "Planner",
    path: "/planner",
    icon: CalendarDays,
  },
  {
    id: 6,
    title: "Profile",
    path: "/profile",
    icon: User,
  },
  {
    id: 7,
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default navigationData;