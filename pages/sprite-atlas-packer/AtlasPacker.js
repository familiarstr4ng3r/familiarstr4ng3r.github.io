
class AtlasPacker {

  constructor(images) {
    this.images = images;
  }

  calculateFrame() {
    const nextPow2 = (value) => {
      const e = Math.ceil(Math.log(value) / Math.log(2));
      return Math.pow(2, e); 
    }
    
    // TODO: calculate max size if images has different w/h
    const temp = 1;
    const { width, height } = this.images[0].bitmap;
    const frame = {
      width: nextPow2(width) * temp,
      height: nextPow2(height) * temp
    };
    return frame;
  }

  getOffset(image, frame, pivot) {
    const { width, height } = image.bitmap;
    const { width: fw, height: fh } = frame;

    const offset = {
      x: (fw - width) * pivot.x,
      y: (fh - height) * pivot.y
    };
    return offset;
  }

  createGrid(grid, pivot) {

    const frame = this.calculateFrame();

    this.options = {
      grid,
      pivot,
      frame
    }

    const w = frame.width * grid.x;
    const h = frame.height * grid.y;

    const jimp = new Jimp(w, h);

    for (let y = 0; y < grid.y; y++) {
      for (let x = 0; x < grid.x; x++) {
        const index = y * grid.x + x;
        const img = this.images[index];
        if (!img) break;
        const offset = this.getOffset(img, frame, pivot);
        const position = {
          x: x * frame.width + offset.x,
          y: y * frame.height + offset.y
        }
        jimp.composite(img, position.x, position.y);
      }
    }

    return jimp.getBase64Async(Jimp.MIME_PNG);
  }

  createHorizontal(pivot) {
    const grid = {
      x: this.images.length,
      y: 1
    }
    return this.createGrid(grid, pivot);
  }

  createVertical(pivot) {
    const grid = {
      x: 1,
      y: this.images.length
    }
    return this.createGrid(grid, pivot);
  }
}