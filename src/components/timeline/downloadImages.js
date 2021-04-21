import domtoimage from "dom-to-image";
import watermark from "watermarkjs";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { isBrowser, isIOS } from "react-device-detect";

// pc/mac: scale 4, android: scale 3, iOS: scale 2
const scale = isBrowser ? 4 : isIOS ? 2 : 2;

const downloadTimelineAsVerticalJPEG = async () => {
  if (!isIOS) {
    await getJPEG("capture").then((img) => {
      downloadImage(img);
    });
  } else {
    await getJPEG("capture").then(async (img) => {
      await getJPEG("capture").then((img) => {
        downloadImage(img);
      });
    });
  }
};

const downloadTimelineAsHorizontalJPEG = async () => {
  if (!isIOS) {
    await getJPEG("captureHorizontal", "horizontal").then((img) => {
      downloadImage(img);
    });
  } else {
    await getJPEG("captureHorizontal", "horizontal").then(async (img) => {
      await getJPEG("captureHorizontal", "horizontal").then((img) => {
        downloadImage(img);
      });
    });
  }
};

const downloadTimelineAsImageSet = async (imageCount) => {
  if (!isIOS) {
    await getJPEG("captureHorizontal", "horizontal").then((img) => {
      splitImageAndDownload(img, imageCount);
    });
  } else {
    await getJPEG("captureHorizontal", "horizontal").then(async (img) => {
      await getJPEG("captureHorizontal", "horizontal").then(async (img) => {
        await getJPEG("captureHorizontal", "horizontal").then((img) => {
          splitImageAndDownload(img, imageCount);
        });
      });
    });
  }
};

const getJPEG = async (id, orientation = "vertical") => {
  var node = document.getElementById(id);

  //successfully getting node
  return domtoimage
    .toJpeg(node, {
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
        return orientation === "vertical"
          ? canvas.width - 200 * scale
          : 25 * scale;
      };

      var y = function (canvas, metrics, context) {
        return canvas.height - 20 * scale;
      };
      let pos = watermark.text.atPos;
      let watermarkContent = "MyYearInQuarantine.com";
      const image = new Image();
      image.src = dataUrl;
      return watermark([image])
        .image(
          pos(x, y, watermarkContent, `${20 * scale}px Montserrat`, "#000", 1)
        )
        .then((img) => img);
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
};

const downloadImage = (img) => {
  var link = document.createElement("a");
  link.download = "My Year in Quarantine Timeline";
  link.href = img.src;
  link.click();
  // var imgToAdd = document.createElement("img");
  // imgToAdd.src = img.src;
  // document.getElementById("app").appendChild(img);
};

const splitImageAndDownload = (img, imageCount) => {
  // split image into pieces using canvas
  let images = cutImageUp(img, imageCount);
  // download as zip
  downloadAsZip(images);
};

function cutImageUp(img, imageCount, heightOfOnePiece = img.height) {
  const widthOfOnePiece = img.width / imageCount;
  var imagePieces = [];
  for (var x = 0; x < imageCount; x++) {
    var canvas = document.createElement("canvas");
    canvas.width = widthOfOnePiece;
    canvas.height = heightOfOnePiece;
    var context = canvas.getContext("2d");
    context.drawImage(
      img,
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
