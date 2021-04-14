import domtoimage from "dom-to-image";
import watermark from "watermarkjs";

const scale = 4;

const downloadTimelineAsVerticalJPEG = () => {
  downloadAsJPEG("capture");
};

const downloadTimelineAsHorizontalJPEG = () => {
  downloadAsJPEG("captureHorizontal");
};

const downloadAsJPEG = (id) => {
  var node = document.getElementById(id);
  domtoimage
    .toPng(node, {
      bgcolor: "white",
      width: node.clientWidth * scale,
      height: node.clientHeight * scale,
      style: {
        transform: "scale(" + scale + ")",
        transformOrigin: "top left",
      },
    })
    .then(function (dataUrl) {
      var x = function (canvas, metrics, context) {
        return canvas.width - 970;
      };

      var y = function (canvas, metrics, context) {
        return canvas.height - 70;
      };
      let pos = watermark.text.atPos;
      let watermarkContent = "See more at MyYearInQuarantine.com";
      const image = new Image();
      image.src = dataUrl;
      watermark([image])
        .image(pos(x, y, watermarkContent, "48px Montserrat", "#000", 1))
        // .image(watermark.text.lowerRight(watermarkContent, "48px Montserrat", "#000", 1))
        .then((img) => {
          // document.getElementById("preview-page").appendChild(img);
          var link = document.createElement("a");
          link.download = "My Year in Quarantine timeline.jpeg";
          link.href = img.src;
          link.click();
        });
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
};

export { downloadTimelineAsVerticalJPEG, downloadTimelineAsHorizontalJPEG };
