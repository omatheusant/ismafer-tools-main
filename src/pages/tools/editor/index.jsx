import { useState, useEffect } from 'react';

import { fabric } from 'fabric';

import { Header } from '@/components/Editor/Header'
import { SideBar } from '@/components/Editor/SideBar';
import { AddImage } from '@/components/Editor/tools/AddImage';
import { AddText } from '@/components/Editor/tools/AddText';
import { Resize } from '@/components/Editor/tools/Resize';
import { Background } from '@/components/Editor/tools/Background';
import { Eraser } from '@/components/Editor/tools/Eraser';
const Editor = () => {
  const [canvas, setCanvas] = useState(null);
  const [size, setSize] = useState({ width: 1700, height: 1200 });


  const initCanvas = () => {
    if (canvas) {
      canvas.dispose();
    }
    if (typeof fabric !== undefined) {
      import('fabric-history')
        .then(() => {
          const newCanvas = new fabric.Canvas('canvas', {
            height: size.height,
            width: size.width,
            backgroundColor: 'white'
          });
          setCanvas(newCanvas);
        })
    }
  };
  
  var _clipboard = null;

  const copy = () => {
    canvas.getActiveObject().clone(function (cloned) {
      _clipboard = cloned;
    })
  }

  const paste = () => {
    // clone again, so you can do multiple copies.
    _clipboard.clone(function (clonedObj) {
      canvas.discardActiveObject();
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true,
      });
      if (clonedObj.type === 'activeSelection') {
        // active selection needs a reference to the canvas.
        clonedObj.canvas = canvas;
        clonedObj.forEachObject(function (obj) {
          canvas.add(obj);
        });
        // this should solve the unselectability
        clonedObj.setCoords();
      } else {
        canvas.add(clonedObj);
      }
      _clipboard.top += 10;
      _clipboard.left += 10;
      canvas.setActiveObject(clonedObj);
      canvas.requestRenderAll();
    });
  }

  useEffect(() => {
    initCanvas();
  }, [size]);

  useEffect(() => {
    if (canvas) {
      const handleKeyDown = (e) => {
        if (e.key === 'Delete') {
          const activeObjects = canvas.getActiveObjects();
          if (activeObjects.length > 0) {
            canvas.discardActiveObject();
            canvas.remove(...activeObjects);
            canvas.requestRenderAll();
          }
        }

        if (e.ctrlKey && e.key === 'z') {
          canvas.undo();
        }
        if (e.ctrlKey && e.key === 'y') {
          canvas.redo();
        }
        if (e.ctrlKey && e.key === 'c') {
          copy();
        }

        if (e.ctrlKey && e.key === 'v') {
          paste();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [canvas]);

  useEffect(() => {
    if (canvas) {
      const handleDoubleClick = (e) => {
        const target = canvas.findTarget(e);
        if (target) {
          canvas.bringToFront(target);
          canvas.requestRenderAll();
        }
      };

      canvas.on('mouse:dblclick', handleDoubleClick);

      return () => {
        canvas.off('mouse:dblclick', handleDoubleClick);
      };
    }
  }, [canvas]);

  return (
    <div>
      <Header canvas={canvas} />
      <SideBar>
        <Resize setSize={setSize} />
        <AddText canvas={canvas} />
        <AddImage canvas={canvas} />
        <Eraser canvas={canvas} />
        <Background canvas={canvas} />
      </SideBar>

      <div className='w-full mt-10 flex justify-center h-screen items-center z-0'>
        <canvas id="canvas"></canvas>
      </div>
    </div>
  );
}

export default Editor