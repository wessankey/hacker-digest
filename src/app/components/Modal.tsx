import { useClickOutside } from "@/hooks/useClickOutside";
import { X } from "lucide-react";

export function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  const ref = useClickOutside<HTMLDivElement>(onClose);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center">
      <div
        ref={ref}
        className="bg-slate-800 shadow-lg bg-opacity-70 text-white px-8 py-14 rounded-lg relative w-[45rem] h-[40rem]"
      >
        <X
          className="absolute top-6 right-6 hover:cursor-pointer text-gray-500 hover:text-white"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
}
