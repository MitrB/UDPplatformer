export class rectangle {
    constructor(x, y, l, w) {
        this.x = x;
        this.y = y;
        this.l = l;
        this.w = w;
    }
}

// Simple check to see if 2 rectangles collide
export function rectangelCollision(r1, r2) {
    if (r1.x < r2.x + r2.w 
        && r1.x + r1.w > r2.x
        && r1.y < r2.y + r2.l
        && r1.y + r1.l > r2.y) {
        return true;
    }
    return false;
}