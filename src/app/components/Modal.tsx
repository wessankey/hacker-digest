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
    <div className="fixed inset-0 bg-black dark:bg-opacity-50 bg-opacity-20 backdrop-blur-md flex justify-center items-center">
      <div
        ref={ref}
        className="dark:bg-slate-800 bg-white shadow-lg bg-opacity-70 dark:text-white px-8 py-14 rounded-lg relative md:w-[45rem] md:h-[40rem] w-full h-full"
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
