import { useScreenSize } from "@/hooks/useScreenSize";

export function LoadingSkeleton() {
  const screenSize = useScreenSize();

  if (screenSize === "xs" || screenSize === "sm") {
    return (
      <div role="status" className="animate-pulse">
        <div className="h-3 bg-gray-400 rounded-full dark:bg-gray-700 w-48 mb-5"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[300px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[550px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[430px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[490px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[450px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[400px] mb-5"></div>

        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[300px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[550px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[430px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[490px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[450px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[400px] mb-5"></div>

        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[300px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[550px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[430px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[490px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[450px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[400px] mb-5"></div>

        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[300px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[550px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[430px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[490px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[450px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[400px] mb-5"></div>

        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[300px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[550px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[430px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[490px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[450px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[400px] mb-5"></div>

        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[300px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[550px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[430px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[490px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[450px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[400px] mb-5"></div>

        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[300px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[550px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[430px] mb-3"></div>
        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[490px] mb-3"></div>

        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div role="status" className="animate-pulse">
      <div className="h-3 bg-gray-400 rounded-full dark:bg-gray-700 w-48 mb-5"></div>
      <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[400px] mb-3"></div>
      <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[550px] mb-3"></div>
      <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[430px] mb-3"></div>
      <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[490px] mb-3"></div>
      <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[450px] mb-3"></div>
      <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[400px] mb-5"></div>

      <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[550px] mb-3"></div>
      <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[430px] mb-3"></div>
      <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[490px] mb-3"></div>
      <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[400px] mb-3"></div>
      <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[450px] mb-3"></div>
      <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[550px] mb-5"></div>

      <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[550px] mb-3"></div>
      <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[430px] mb-3"></div>
      <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[490px] mb-3"></div>
      <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[400px] mb-3"></div>
      <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[450px] mb-3"></div>
      <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[550px] mb-3"></div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
