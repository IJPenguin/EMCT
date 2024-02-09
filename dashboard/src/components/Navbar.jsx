import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav>
      <div className="px-10 pt-2 mx-auto mt-1">
        <div className="flex justify-between">
          <div className="font-sans text-4xl subpixel-antialiased font-medium cursor-pointer">
            <a href=""> EMCT Dashboard</a>
          </div>
          <div className="flex">
            <Button variant="outline">Contact Us</Button>
            <Button variant="outline" className="ml-2">
              Contribute
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
