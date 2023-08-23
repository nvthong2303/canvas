import React from "react";
import { fabric } from "fabric";
import { connect } from "react-redux";
import { setCanvasBackgroundImage, setCanvas } from "../../Actions/editor";

function BackgroundImage(props) {
  const { canvas } = props.editorState;

  const removeBackground = () => {
    props.setCanvasBackgroundImage({ backgroundImage: "" });
    if (canvas.backgroundImage) {
      canvas.setBackgroundImage(null);
      canvas.renderAll();
    }
    props.setCanvas({ canvas });
    console.log(canvas.getObjects());
  };

  const addBackground = (url) => {
    removeBackground();

    fabric.Image.fromURL(
      url,
      (img) => {
        if (canvas) {
          canvas.setBackgroundImage(
            img,
            () => {
              canvas.renderAll();
            },
            {
              scaleX: canvas.width / img.width,
              scaleY: canvas.height / img.height,
            }
          );
        }
      },
      { crossOrigin: "anonymous" }
    );
    props.setCanvasBackgroundImage({ backgroundImage: url });
    props.setCanvas({ canvas });
  };

  return (
    <div>
      <button
        onClick={() =>
          addBackground(
            "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
          )
        }
      >
        Add Background Image
      </button>
      <button onClick={removeBackground}>Remove Background</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundImage);
