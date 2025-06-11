import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BacklogItemDetails from "@/components/molecules/refining/backlogItemDetails";
import { BacklogItem } from "@/types/BacklogItem";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CardCarouselMobile from "@/components/molecules/refining/cardCarousel/cardCarouselMobile";

export default async function ContentMobile({
  backlogItem,
}: {
  backlogItem: BacklogItem;
}) {
  return (
    <Tabs defaultValue="progress" className="w-full h-full lg:hidden">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="information">Information</TabsTrigger>
        <TabsTrigger value="progress">Progress</TabsTrigger>
      </TabsList>
      <TabsContent value="information" className="h-1/3">
        <BacklogItemDetails backlogItem={backlogItem} />
        <div className="p-4">
          <div className="h-2/3">
            <Input
              className="font-semibold text-2xl text-white border-0 mb-4"
              value={backlogItem?.title}
            />
            <div className="gap-2">
              <h2 className="text-xl text-slate-600 font-semibold mb-2">
                Description
              </h2>
              <Textarea className="border-0" value={backlogItem?.description} />
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value="progress"
        className="flex items-center justify-center h-full"
      >
        <CardCarouselMobile projectId={backlogItem.projectId} backlogItem={backlogItem} />
      </TabsContent>
      <TabsContent value="progress"></TabsContent>
    </Tabs>
  );
}
