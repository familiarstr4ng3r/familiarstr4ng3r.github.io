/**
@param {Segment} segmentOne
@param {Segment} segmentTwo
*/
function intersects(segmentOne, segmentTwo)
{
    const [p1, p2] = [segmentOne.a, segmentOne.b];
    const [p3, p4] = [segmentTwo.a, segmentTwo.b];

    return intersectsPoints(p1, p2, p3, p4);
}

/**
@param {Point} p1
@param {Point} p2
@param {Point} p3
@param {Point} p4
*/
function intersectsPoints(p1, p2, p3, p4)
{
    const intersectionPoint = createVector(0, 0);

    const d = (p2.x - p1.x) * (p4.y - p3.y) - (p2.y - p1.y) * (p4.x - p3.x);

    if (d == 0) return [false, intersectionPoint];

    const u = ((p3.x - p1.x) * (p4.y - p3.y) - (p3.y - p1.y) * (p4.x - p3.x)) / d;
    const v = ((p3.x - p1.x) * (p2.y - p1.y) - (p3.y - p1.y) * (p2.x - p1.x)) / d;

    if (u < 0 || u > 1 || v < 0 || v > 1)
    {
        return [false, intersectionPoint];
    }

    intersectionPoint.x = p1.x + u * (p2.x - p1.x);
    intersectionPoint.y = p1.y + u * (p2.y - p1.y);

    return [true, intersectionPoint];
}