import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "./Dashboard";
import TreeCover from "./TreeCover";
import WaterQuality from "./WaterQuality";
import ClimateChange from "./ClimateChange";
import EnergyStats from "./EnergyStats";
import AirQuality from "./AirQuality";
import Map from "./Map";

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
        <TabsContent value="tree">
          <TreeCover />
        </TabsContent>
        <TabsContent value="air">
          <AirQuality />
        </TabsContent>
        <TabsContent value="water">
          <WaterQuality />
        </TabsContent>
        <TabsContent value="climate">
          <ClimateChange />
        </TabsContent>
        <TabsContent value="energy">
          <EnergyStats />
        </TabsContent>
        <TabsContent value="map">
          <Map />
        </TabsContent>
      </Tabs>
    </div>
  );
}
