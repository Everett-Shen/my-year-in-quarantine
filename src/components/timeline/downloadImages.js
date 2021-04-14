import domtoimage from "dom-to-image";
import watermark from "watermarkjs";

const scale = 4;

const downloadTimelineAsVerticalJPEG = () => {
  getJPEG("capture").then((img) => {
    downloadImage(img);
  });
};

const downloadTimelineAsHorizontalJPEG = () => {
  getJPEG("captureHorizontal").then((img) => {
    downloadImage(img);
  });
};

const downloadTimelineAsImageSet = () => {
  getJPEG("captureHorizontal").then((img) => {
    splitImageAndDownload(img);
  });
};

const getJPEG = (id) => {
  var node = document.getElementById(id);
  return domtoimage
    .toPng(node, {
      bgcolor: "white",
      width: node.clientWidth * scale,
      height: node.clientHeight * scale,
      style: {
        transform: "scale(" + scale + ")",
        transformOrigin: "top left",
      },
    })
    .then((dataUrl) => {
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
      return watermark([image])
        .image(pos(x, y, watermarkContent, "48px Montserrat", "#000", 1))
        .then((img) => img);
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
};

const downloadImage = (img) => {
  var link = document.createElement("a");
  link.download = "My Year in Quarantine timeline.jpeg";
  link.href = img.src;
  link.click();
};

const splitImageAndDownload = (img) => {};

export {
  downloadTimelineAsVerticalJPEG,
  downloadTimelineAsHorizontalJPEG,
  downloadTimelineAsImageSet,
};
