import { Header } from "@/components/Editor/Header";
import { SideBar } from "@/components/Editor/SideBar";
import { AddImage } from "@/components/Editor/tools/AddImage";
import { AddText } from "@/components/Editor/tools/AddText";
import { Resize } from "@/components/Editor/tools/Resize";
import { Background } from "@/components/Editor/tools/Background";
import { Eraser } from "@/components/Editor/tools/Eraser";

export const Dashboard = ({ canvas, setSize, children }) => {
  return (
    <>
      <Header canvas={canvas} />
      <SideBar>
        <Resize setSize={setSize} />
        <AddText canvas={canvas} />
        <AddImage canvas={canvas} />
        <Eraser canvas={canvas} />
        <Background canvas={canvas} />
      </SideBar>
      {children}
    </>
  );
};
