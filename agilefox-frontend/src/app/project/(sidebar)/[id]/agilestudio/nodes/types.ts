import Practice from "@/../public/essence/Practice.svg";
import Activity from "@/../public/essence/Activity.svg";
import WorkProduct from "@/../public/essence/Work Product.svg";
import Alpha from "@/../public/essence/Alpha.svg";
import State from "@/../public/essence/State.svg";
import { Edge } from "@xyflow/react";

export type IconComponentType = {
  src: string;
  width: number;
  height: number;
};

export type IconNodeType = {
  onNodeLabelChange?: (id: string, newLabel: string) => void;
  onNodeDescriptionChange?: (id: string, newDescription: string) => void;
  onNodeDelete?: (id: string) => void;
  getSiblingEdges: (id: string) => Edge[];
  getParentEdges: (id: string) => Edge[];
  toggleShorten: (id: string) => void;
  shorten: boolean;
  label: string;
  iconType?: string;
  description?: string;
  IconComponent?: IconComponentType;
};

export const icons = [
  {
    id: "draggable-practice",
    IconComponent: Practice,
    iconType: "PracticeNode",
    label: "Practice",
  },
  {
    id: "draggable-activity",
    IconComponent: Activity,
    iconType: "ActivityNode",
    label: "activity",
  },
  {
    id: "draggable-workproduct",
    IconComponent: WorkProduct,
    iconType: "WorkProductNode",
    label: "workproduct",
  },
  {
    id: "draggable-alpha",
    IconComponent: Alpha,
    iconType: "AlphaNode",
    label: "alpha",
  },
  {
    id: "draggable-state",
    IconComponent: State,
    iconType: "StateNode",
    label: "State",
  },
];
