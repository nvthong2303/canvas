import React from "react";
import { fabric } from "fabric";
import { connect } from "react-redux";
import { setCanvasBackgroundImage, setCanvas } from "../../Actions/editor";

function UploadImage(props) {
  const { canvas } = props.editorState;

  const onImageChange = (e) => {
    var url = URL.createObjectURL(e.target.files[0]);
    fabric.Image.fromURL(
      url,
      (img) => {
        canvas.add(img);
        canvas.renderAll();
      },
      { scaleX: 0.15, scaleY: 0.15 }
    );
    console.log(canvas.getObjects());
  };

  return (
    <div>
      <label htmlFor="img">Upload image</label>
      <input
        type="file"
        id="img"
        name="img"
        accept="image/*"
        onChange={onImageChange}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);
