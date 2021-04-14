import domtoimage from "dom-to-image";
import watermark from "watermarkjs";
import JSZip from "jszip";
import { saveAs } from "file-saver";

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

const splitImageAndDownload = (img) => {
  // split image into pieces using canvas
  let images = cutImageUp(img);
  // download as zip
  downloadAsZip(images);
};

function cutImageUp(
  image,
  numColsToCut = 10,
  widthOfOnePiece = 300,
  heightOfOnePiece = 1000
) {
  var imagePieces = [];
  for (var x = 0; x < numColsToCut; x++) {
    var canvas = document.createElement("canvas");
    canvas.width = widthOfOnePiece;
    canvas.height = heightOfOnePiece;
    var context = canvas.getContext("2d");
    context.drawImage(
      image,
      x * widthOfOnePiece,
      0,
      widthOfOnePiece,
      heightOfOnePiece,
      0,
      0,
      canvas.width,
      canvas.height
    );
    imagePieces.push(canvas.toDataURL());
  }
  // imagePieces now contains data urls of all the pieces of the image
  return imagePieces;
}

const downloadAsZip = (imgs) => {
  var zip = new JSZip();

  for (let i = 0; i < imgs.length; i++) {
    // var link = document.createElement("a");
    // link.download = "My Year in Quarantine timeline.jpg";
    // link.href = imgs[i];
    // link.click();
    // var image = new Image();
    // image.src = imgs[i];
    zip.file(`${String(i + 1)}.jpg`, imgs[i].split("base64,")[1], {
      base64: true,
    });
  }

  //Generate the zip file asynchronously
  zip.generateAsync({ type: "blob" }).then(function (content) {
    // download the Zip file
    saveAs(content, "MyYearInQuarantine.zip");
  });
};

export {
  downloadTimelineAsVerticalJPEG,
  downloadTimelineAsHorizontalJPEG,
  downloadTimelineAsImageSet,
};
