
// -2 = not jpeg, -1 = no data, 1..8 = orientations
function getExifOrientation(file : File | Blob, callback : (a: number)=>void) {
    if (file.slice) {
        file = file.slice(0, 131072);
    } else if (file.webkitSlice) {
        file = file.webkitSlice(0, 131072);
    }

    var reader = new FileReader();
    reader.onload = function(e) {
        var view = new DataView(e.target.result);
        if (view.getUint16(0, false) != 0xFFD8) {
            callback(-2);
            return;
        }
        var length = view.byteLength, offset = 2;
        while (offset < length) {
            var marker = view.getUint16(offset, false);
            offset += 2;
            if (marker == 0xFFE1) {
                if (view.getUint32(offset += 2, false) != 0x45786966) {
                    callback(-1);
                    return;
                }
                var little = view.getUint16(offset += 6, false) == 0x4949;
                offset += view.getUint32(offset + 4, little);
                var tags = view.getUint16(offset, little);
                offset += 2;
                for (var i = 0; i < tags; i++)
                    if (view.getUint16(offset + (i * 12), little) == 0x0112) {
                        callback(view.getUint16(offset + (i * 12) + 8, little));
                        return;
                    }
            }
            else if ((marker & 0xFF00) != 0xFF00) break;
            else offset += view.getUint16(offset, false);
        }
        callback(-1);
    };
    reader.readAsArrayBuffer(file);
}
function ConvertToJPEG(file : File | Blob, callback : BlobCallback) {
    let image = new Image;
    image.onerror = function() {
        URL.revokeObjectURL(this.src);
        callback(null);
        throw new Error("Failed to load image") ;
    }
    image.onload = function() {
        URL.revokeObjectURL(this.src);
        let canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        let ctx = canvas.getContext('2d');
        if(!ctx){
            throw new Error("Failed to get 2d context")
        }
        ctx.drawImage(image, 0, 0);
        canvas.toBlob(callback, 'image/jpeg', 0.9);
    };
    image.src = URL.createObjectURL(file);
}
function imgToCanvasWithOrientation(img : HTMLImageElement, rawWidth : number, rawHeight : number, orientation : number) {
    var canvas = document.createElement('canvas');
    if (orientation > 4) {
        canvas.width = rawHeight;
        canvas.height = rawWidth;
    } else {
        canvas.width = rawWidth;
        canvas.height = rawHeight;
    }

    if (orientation > 1) {
        console.log("EXIF orientation = " + orientation + ", rotating picture");
    }

    var ctx = canvas.getContext('2d');
    if(!ctx){
        throw new Error("Failed to get 2d context")
    }
    switch (orientation) {
        case 2: ctx.transform(-1, 0, 0, 1, rawWidth, 0); break;
        case 3: ctx.transform(-1, 0, 0, -1, rawWidth, rawHeight); break;
        case 4: ctx.transform(1, 0, 0, -1, 0, rawHeight); break;
        case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
        case 6: ctx.transform(0, 1, -1, 0, rawHeight, 0); break;
        case 7: ctx.transform(0, -1, -1, 0, rawHeight, rawWidth); break;
        case 8: ctx.transform(0, -1, 1, 0, 0, rawWidth); break;
    }
    ctx.drawImage(img, 0, 0, rawWidth, rawHeight);
    return canvas;
}

export function reduceFileSize(file : File, acceptFileSize : number, maxWidth : number, maxHeight:number, quality : number, callback : BlobCallback) {
    const NOT_IMAGE = 404 ;
    if (file.size <= acceptFileSize) {
        try{
        ConvertToJPEG(file, callback);
        }catch(e){
            alert("Failed to load image")
        }
        return;
    }
    var img = new Image();
    img.onerror = function(error) {
        URL.revokeObjectURL(this.src);
        alert("Failed to load image")
        callback(null);
    };
    img.onload = function() {
        URL.revokeObjectURL(this.src);
        getExifOrientation(file, function(orientation : number) {
            var w = img.width, h = img.height;
            var scale = (orientation > 4 ?
                Math.min(maxHeight / w, maxWidth / h, 1) :
                Math.min(maxWidth / w, maxHeight / h, 1));
            h = Math.round(h * scale);
            w = Math.round(w * scale);

            var canvas = imgToCanvasWithOrientation(img, w, h, orientation);
            canvas.toBlob(function(blob) {
                if(!blob){
                    throw new Error("Failed to resize image")
                }
                console.log("Resized image to " + w + "x" + h + ", " + (blob.size >> 10) + "kB");
                callback(blob);
            }, 'image/jpeg', quality);
        });
    };
    img.src = URL.createObjectURL(file);
}