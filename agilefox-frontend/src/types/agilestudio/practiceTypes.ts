import { z } from "zod";

const PositionSchema = z.object({
  x: z.number(),
  y: z.number(),
});

const IconComponentSchema = z.object({
  src: z.string(),
  width: z.number(),
  height: z.number(),
  blurDataURL: z.string().nullable(),
  blurWidth: z.number(),
  blurHeight: z.number(),
});

const NodeDataSchema = z.object({
  label: z.string(),
  iconType: z.string(),
  IconComponent: IconComponentSchema.optional(),
});

// If sometimes the data is missing, mark it as optional.
const OptionalNodeDataSchema = NodeDataSchema.optional();

const MeasuredSchema = z.object({
  width: z.number(),
  height: z.number(),
});

export const NodeSchema = z.object({
  // Allow _id to be missing or undefined
  id: z.string().optional(),
  position: PositionSchema,
  type: z.string(),
  data: OptionalNodeDataSchema,
  measured: MeasuredSchema,
  // Allow selected and dragging to be boolean, undefined, or null
  selected: z.boolean().optional().nullable(),
  dragging: z.boolean().optional().nullable(),
});
export type Node = z.infer<typeof NodeSchema>;

export const EdgeSchema = z.object({
  source: z.string(),
  sourceHandle: z.string(),
  target: z.string(),
  targetHandle: z.string(),
  id: z.string(),
  selected: z.boolean().optional().nullable(),
  // Allow label to be string, undefined, or null
  label: z.string().optional().nullable(),
});
export type Edge = z.infer<typeof EdgeSchema>;

export const PracticeSchema = z.object({
  id: z.string(),
  projectId: z.number().optional(),
  title: z.string(),
  nodes: z.array(NodeSchema).optional().nullable(),
  edges: z.array(EdgeSchema).optional().nullable(),
});
export type Practice = z.infer<typeof PracticeSchema>;
