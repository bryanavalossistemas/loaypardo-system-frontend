import { CircleUser } from "lucide-react";
import { cn } from "@/lib/utils";
// import ModeToggle from "./mode-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function HeaderGroupRight({ className, ...props }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const cerrarSesion = () => {
    localStorage.removeItem("AUTH_TOKEN");
    queryClient.invalidateQueries({ queryKey: ["usuario"] });
    navigate("/");
    toast.success("Cerraste sesión");
  };

  return (
    <div className={cn("gap-x-1 sm:gap-x-3", className)} {...props}>
      {/* <ModeToggle /> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={cerrarSesion}>
            Cerrar Sesion
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
