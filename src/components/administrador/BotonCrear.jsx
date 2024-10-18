import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function BotonCrear({ onClick, recurso }) {
  return (
    <Button className="flex gap-x-1" onClick={onClick}>
      <PlusCircle className="h-5 w-5" />
      <span className="font-semibold">Crear {recurso}</span>
    </Button>
  );
}
