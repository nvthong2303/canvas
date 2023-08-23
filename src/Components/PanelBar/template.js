import React, { useEffect } from "react";
import { fabric } from "fabric";
import { connect } from "react-redux";
import { setCanvasBackgroundImage, setCanvas } from "../../Actions/editor";
import template from "../../temp.json";
import { loadImageFromURL } from "../../Utils/Objects/image-loader";

function Template(props) {
  const { canvas } = props.editorState;

  const addTemplate = async () => {
    canvas.clear();
    if (canvas) {
      canvas.backgroundColor = template.background.value;
      canvas.renderAll();
    }
    for (const object of template.objects) {
      const element = await importTemplate(object);
      if (element) {
        canvas.add(element);
        canvas.renderAll();
      } else {
        console.log("UNABLE TO LOAD OBJECT: ", object.type);
      }
      props.setCanvas({ canvas });
    }
  };

  const importTemplate = async (item) => {
    switch (item.type) {
      case "StaticText":
        return staticText(item);
      case "StaticImage":
        return staticImage(item);
      default:
        return null;
    }
  };

  const staticText = (item) => {
    return new Promise((resolve, reject) => {
      try {
        const baseOptions = getBaseOptions(item, "text");
        const metadata = item.metadata;
        const oldCanvasWidth = item.canvas.width;
        const newCanvasWidth = props.editorState.canvas.width;
        const {
          textAlign,
          fontFamily,
          fontSize,
          fontWeight,
          charSpacing,
          lineheight,
          text,
          padding,
        } = metadata;
        const textOptions = {
          ...baseOptions,
          text: text ? text : "Default Text",
          ...(textAlign && { textAlign }),
          ...(fontFamily && { fontFamily }),
          ...(fontSize && {
            fontSize: (fontSize * newCanvasWidth) / oldCanvasWidth,
          }),
          ...(fontWeight && { fontWeight }),
          ...(charSpacing && { charSpacing }),
          ...(lineheight && { lineheight }),
          ...(padding && { padding }),
        };
        const element = new fabric.StaticText(textOptions);
        resolve(element);
      } catch (err) {
        reject(err);
      }
    });
  };

  const staticImage = async (item) => {
    try {
      const baseOptions = getBaseOptions(item, "img");
      const src = item.metadata.src;
      const image = await loadImageFromURL(src);
      const { width, height } = baseOptions;
      if (!width || !height) {
        baseOptions.width = image.width;
        baseOptions.height = image.height;
      }
      const element = new fabric.StaticImage(image, baseOptions);
      return element;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const getBaseOptions = (item, type) => {
    const { left, top, width, height, scaleX, scaleY } = item;
    let metadata = item.metadata ? item.metadata : {};
    const { fill, angle, originX, originY } = metadata;
    const oldCanvasWidth = item.canvas.width;
    const oldCanvasHeight = item.canvas.height;
    const newCanvasWidth = props.editorState.canvas.width;
    const newCanvasHeight = props.editorState.canvas.height;

    let baseOptions = {
      angle: angle ? angle : 0,
      top: top ? (top * newCanvasWidth) / oldCanvasWidth : 0,
      left: left ? (left * newCanvasWidth) / oldCanvasWidth : 0,
      width: type === "img" ? width : (width * newCanvasWidth) / oldCanvasWidth,
      height:
        type === "img" ? height : (height * newCanvasHeight) / oldCanvasHeight,
      originX: originX || "left",
      originY: originY || "top",
      scaleX: (scaleX * newCanvasWidth) / oldCanvasWidth || 1,
      scaleY: (scaleY * newCanvasWidth) / oldCanvasWidth || 1,
      fill: fill || "#000000",
      metadata: metadata,
    };
    return baseOptions;
  };

  useEffect(() => {
    console.log("canvas", props.editorState.canvas);
  }, []);

  return (
    <div>
      <button onClick={addTemplate}>Add Template</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    editorState: state.editor,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCanvasBackgroundImage: (data) => {
      return dispatch(setCanvasBackgroundImage(data));
    },
    setCanvas: (data) => {
      return dispatch(setCanvas(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Template);
