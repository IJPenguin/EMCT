import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "./Dashboard";

export default function Selectors() {
  return (
    <div className="mt-4 flex justify-center">
      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="tree">Tree Cover</TabsTrigger>
          <TabsTrigger value="air">Air Quality</TabsTrigger>
          <TabsTrigger value="water">Water Quality</TabsTrigger>
          <TabsTrigger value="climate">Climate Change</TabsTrigger>
          <TabsTrigger value="energy">Energy Stats</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <Dashboard />
        </TabsContent>
        <TabsContent value="tree"></TabsContent>
        <TabsContent value="air"></TabsContent>
        <TabsContent value="water"></TabsContent>
        <TabsContent value="climate"></TabsContent>
        <TabsContent value="energy"></TabsContent>
        <TabsContent value="map"></TabsContent>
      </Tabs>
    </div>
  );
}
