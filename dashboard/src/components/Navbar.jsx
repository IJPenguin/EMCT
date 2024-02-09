import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav>
      <div className="px-10 mx-auto mt-1">
        <div className="flex justify-between">
          <div className="font-sans text-4xl hover:text-green-400 subpixel-antialiased font-medium">
            EMCT Dashboard
          </div>
          <div className="flex">
            <Button variant="default">Contact Us</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
