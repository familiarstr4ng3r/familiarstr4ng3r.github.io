class Segment
{
    constructor(a, b)
    {
        this.a = a;
        this.b = b;
    }

    drawSelf(lineWeight, pointWeight)
    {
        stroke(255);
        strokeWeight(lineWeight);
        line(this.a.x, this.a.y, this.b.x, this.b.y);

        strokeWeight(pointWeight);

        stroke(this.a.isActive ? "green" : 255);
        point(this.a.x, this.a.y);

        stroke(this.b.isActive ? "green" : 255);
        point(this.b.x, this.b.y);
    }
    
    validateMouse(mousePosition)
    {
        this.a.isActive = dist(this.a.x, this.a.y, mousePosition.x, mousePosition.y) < radius;
        this.b.isActive = dist(this.b.x, this.b.y, mousePosition.x, mousePosition.y) < radius;

        if (this.a.isActive) return this.a;
        else if (this.b.isActive) return this.b;
    }

    resetPoints()
    {
        this.a.isActive = this.b.isActive = false;
    }
}