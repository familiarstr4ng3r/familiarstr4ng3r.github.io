class Obstacle
{
    constructor(segments)
    {
        this.segments = segments;
    }

    drawSelf(lineWeight, pointWeight)
    {
        for (const segment of this.segments)
        {
            segment.drawSelf(lineWeight, pointWeight);
        }
    }

    validateMouse(mousePosition)
    {
        for (const segment of this.segments)
        {
            const hoverPoint = segment.validateMouse(mousePosition);
            if (hoverPoint) return hoverPoint;
        }
    }

    resetPoints()
    {
        for (const segment of this.segments)
        {
            segment.resetPoints();
        }
    }

    instersectsRay(raySegment)
    {
        let record = Infinity;
        let point = null;

        for (const segment of this.segments)
        {
            const [success, intersectionPoint] = intersects(raySegment, segment);

            if (success)
            {
                const d = dist(raySegment.a.x, raySegment.a.y, intersectionPoint.x, intersectionPoint.y);

                if (d < record)
                {
                    record = d;
                    point = intersectionPoint;
                }
            }

            // ! bad way
            // if (success)
            // {
            //     return [success, intersectionPoint];
            // }
        }

        return [point != null, point];
    }
}