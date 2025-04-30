import { Badge } from "@/components/ui/badge";

export default function Page() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Badge capitalize>default</Badge>
      <Badge variant={"destructive"}>Hola mundo</Badge>
      <Badge variant={"info"}>Hola mundo</Badge>
      <Badge capitalize variant={"success"}>hola mundo</Badge>
    </div>
  );
}
