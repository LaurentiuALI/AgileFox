// DnDStateList.tsx
import React from "react";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

export interface SortableList<T> {
  items: T[];
  /** Function that returns a unique identifier for an item */
  getId: (item: T) => string | number;
  /**
   * Called when the order of items changes after a drag end.
   * Receives the new ordered list as its parameter.
   */
  onReorder: (newItems: T[]) => void;
  /** The children should be sortable items rendered in the list */
  children: React.ReactNode;
}

export default function DnDStateList<T>({
  items,
  getId,
  onReorder,
  children,
}: SortableList<T>) {
  // Configure sensors for pointer and keyboard interactions.
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // When dragging ends, determine if the order changed and notify the parent.
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => getId(item) === active.id);
    const newIndex = items.findIndex((item) => getId(item) === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const newItems = arrayMove(items, oldIndex, newIndex);
    onReorder(newItems);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map(getId)}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
}
