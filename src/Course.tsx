import { Canvas } from "./Components/Canvas";
import { Requirements } from "./Components/Requirements";

export function Course() {
  return (
    <>
      <div className="flex">
        <div className="h-screen w-2/5 border-r border-black">
          <Requirements />
        </div>
        <div className="w-3/5">
          <Canvas />
        </div>
      </div>
    </>
  )
}