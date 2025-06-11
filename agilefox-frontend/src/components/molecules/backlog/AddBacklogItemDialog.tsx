import AddButton from "@/components/ui/add-button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { BacklogItemForm } from "./backlogItemForm"

export function AddBacklogItemDialog({ projectId }: { projectId: number }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <AddButton ariaLabel="Add New Item" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add a new Backlog Item</DialogTitle>
                </DialogHeader>
                <BacklogItemForm projectId={projectId} />
            </DialogContent>
        </Dialog>
    )
}
