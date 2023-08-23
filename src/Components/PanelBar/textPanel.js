import React from "react";
import { fabric } from "fabric";
import { connect } from "react-redux";
import { setCanvasBackgroundImage, setCanvas } from "../../Actions/editor";

function TextPanel(props) {
  const { canvas } = props.editorState;
  const [backgroundColor, setBackgroundColor] = React.useState("#FDEFEF");
  const [fontSize, setFontSize] = React.useState("24");
  const [color, setColor] = React.useState("#000000");

  const addText = () => {
    canvas.add(
      new fabric.IText("Tap and Type", {
        fontFamily: "arial",
        fill: color,
        fontSize: 29,
        padding: 5,
        left: 0,
        right: 0,
      })
    );
    props.setCanvas({ canvas });
  };

  const textColorChange = (e) => {
    if (canvas.getActiveObject()) {
      canvas.getActiveObject().set("fill", e.target.value);
      canvas.renderAll();
    }
    setColor(e.target.value);
    props.setCanvas({ canvas });
  };

  const textBgColorChange = (e) => {
    if (canvas.getActiveObject()) {
      canvas.getActiveObject().set("backgroundColor", e.target.value);
      canvas.renderAll();
    }
    props.setCanvas({ canvas });
  };

  const onBold = (e) => {
    if (e.target.checked) {
      if (canvas.getActiveObject()) {
        canvas.getActiveObject().set("fontWeight", "bold");
        canvas.renderAll();
      }
    } else {
      if (canvas.getActiveObject()) {
        canvas.getActiveObject().set("fontWeight", "");
        canvas.renderAll();
      }
    }
    props.setCanvas({ canvas });
  };

  const onItalic = (e) => {
    if (e.target.checked) {
      if (canvas.getActiveObject()) {
        canvas.getActiveObject().set("fontStyle", "italic");
        canvas.renderAll();
      }
    } else {
      if (canvas.getActiveObject()) {
        canvas.getActiveObject().set("fontStyle", "");
        canvas.renderAll();
      }
    }
  };

  const onUnderline = (e) => {
    if (e.target.checked) {
      if (canvas.getActiveObject()) {
        canvas.getActiveObject().set("underline", true);
        canvas.renderAll();
      }
    } else {
      if (canvas.getActiveObject()) {
        canvas.getActiveObject().set("underline", false);
        canvas.renderAll();
      }
    }
  };

  const onLinethrough = (e) => {
    if (e.target.checked) {
      if (canvas.getActiveObject()) {
        canvas.getActiveObject().set("linethrough", true);
        canvas.renderAll();
      }
    } else {
      if (canvas.getActiveObject()) {
        canvas.getActiveObject().set("linethrough", false);
        canvas.renderAll();
      }
    }
  };

  const onOverline = (e) => {
    if (e.target.checked) {
      if (canvas.getActiveObject()) {
        canvas.getActiveObject().set("overline", true);
        canvas.renderAll();
      }
    } else {
      if (canvas.getActiveObject()) {
        canvas.getActiveObject().set("overline", false);
        canvas.renderAll();
      }
    }
  };

  const onFontSize = (e) => {
    if (canvas.getActiveObject()) {
      canvas.getActiveObject().set("fontSize", e.target.value);
      canvas.renderAll();
    }
    setFontSize(e.target.value);
  };

  return (
    <React.Fragment>
      <button onClick={addText}>Add Text </button>
      <div>
        <label>Text color </label>
        <input
          type="color"
          value={color}
          size="10"
          onChange={(e) => textColorChange(e)}
        />{" "}
        <label>Background text color:</label>
        <input
          type="color"
          value=""
          size="10"
          onChange={(e) => textBgColorChange(e)}
        />
        <div>
          <input
            type="checkbox"
            name="fonttype"
            onChange={(e) => onBold(e)}
          />
          Bold
          <input
            type="checkbox"
            name="fonttype"
            onChange={(e) => onItalic(e)}
          />
          Italic
          <input
            type="checkbox"
            name="fonttype"
            onChange={(e) => onUnderline(e)}
          />
          Underline
          <input
            type="checkbox"
            name="fonttype"
            onChange={(e) => onLinethrough(e)}
          />
          Linethrough
          <input
            type="checkbox"
            name="fonttype"
            onChange={(e) => onOverline(e)}
          />
          Overline
        </div>
        <div>
          <label>Font size</label>
          <input
            type="range"
            min="1"
            max="120"
            step="1"
            value={fontSize}
            onChange={(e) => onFontSize(e)}
          />
        </div>
      </div>
    </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(TextPanel);
