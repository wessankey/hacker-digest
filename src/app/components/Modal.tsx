import { useClickOutside } from "@/hooks/useClickOutside";
import { X } from "lucide-react";
import { useEffect } from "react";

export function Modal({
  isOpen,
  children,
  onClose,
}: {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}) {
  const ref = useClickOutside<HTMLDivElement>(onClose);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="fixed inset-0 bg-black dark:bg-opacity-50 bg-opacity-20 backdrop-blur-md flex justify-center items-center">
      <div
        ref={ref}
        className="dark:bg-slate-800 bg-white shadow-lg bg-opacity-70 dark:text-white px-8 py-14 md:rounded-lg relative md:w-[45rem] md:h-[40rem] w-full h-full rounded-none overflow-y-auto"
      >
        <X
          className="absolute top-6 right-6 hover:cursor-pointer text-gray-500 dark:hover:text-white hover:text-gray-900"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
}
