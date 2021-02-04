// import { Point } from "./point.js"
// import { Segment } from "./segment.js"

const radius = 10;
const segments = [];

const obstacles = [];

const E_KEY = 69;

let isDragging = false;
let selectedPoint = null;

let addingState = 0;

function setup()
{
    createCanvas(800, 600);
    background(0);

    const [w, h, offset] = [700, 500, 10];

    // for (let i = 1; i <= 2; i++)
    // {
    //     const a = new Point(w, i * h);
    //     const b = new Point(w * 2, i * h);

    //     segments.push(new Segment(a, b));
    // }

    const topLeft = new Point(offset, offset);
    const topRight = new Point(width - offset, offset);
    const bottomRight = new Point(width - offset, height - offset);
    const bottomLeft = new Point(offset, height - offset);

    const border = [
        new Segment(topLeft, topRight),
        new Segment(topRight, bottomRight),
        new Segment(bottomRight, bottomLeft),
        new Segment(bottomLeft, topLeft)
    ];
    obstacles.push(new Obstacle(border));
}

function draw()
{
    clear();
    background(0);

    if (isDragging)
    {
        selectedPoint.x = mouseX;
        selectedPoint.y = mouseY;
    }

    if (addingState === 1)
    {
        const lastSegment = segments[segments.length - 1];
        lastSegment.b.x = mouseX;
        lastSegment.b.y = mouseY;
    }

    for (const segment of segments)
    {
        segment.drawSelf(5, radius);
    }

    for (const obstacle of obstacles)
    {
        obstacle.drawSelf(2, radius);
    }

    if (segments.length > 1)
    {
        // const [success, intersectionPoint] = intersects(segments[0], segments[1]);
    
        // if (success)
        // {
        //     stroke("red");
        //     point(intersectionPoint.x, intersectionPoint.y);
        // }

        for (let i = 0; i < segments.length; i++)
        {
            for (let j = 1; j < segments.length; j++)
            {
                const [success, intersectionPoint] = intersects(segments[i], segments[j]);

                if (success)
                {
                    stroke("red");
                    point(intersectionPoint.x, intersectionPoint.y);
                }
            }
        }
    }

    obstacleDetection();
}

function obstacleDetection()
{
    const count = 20;
    const stepSize = 360 / count;

    const rayOrigin = new Point(mouseX, mouseY);
    const rayLength = 1000;


    for (const obstacle of obstacles)
    {
        for(let i = 0; i < count; i++)
        {
            const angle = i * stepSize;
            const rad = radians(angle);
            const x = sin(rad) * rayLength + rayOrigin.x;
            const y = cos(rad) * rayLength + rayOrigin.y;
            const raySegment = new Segment(rayOrigin, new Point(x, y));

            const [success, intersectionPoint] = obstacle.instersectsRay(raySegment);

            if (success)
            {
                stroke("blue");
                strokeWeight(2);
                line(rayOrigin.x, rayOrigin.y, intersectionPoint.x, intersectionPoint.y);

                strokeWeight(10);
                point(intersectionPoint.x, intersectionPoint.y);
            }
            else
            {
                stroke("red");
                strokeWeight(2);

                line(rayOrigin.x, rayOrigin.y, x, y);
            }
        }
    }
}

function mousePressed()
{
    const mousePosition = createVector(mouseX, mouseY);

    for (const obstacle of obstacles)
    {
        const hoverPoint = obstacle.validateMouse(mousePosition);

        if (hoverPoint)
        {
            isDragging = true;
            selectedPoint = hoverPoint;
            break;
        }
    }

    for (const segment of segments)
    {
        const hoverPoint = segment.validateMouse(mousePosition);

        if (hoverPoint)
        {
            isDragging = true;
            selectedPoint = hoverPoint;
            break;
        }

        // if (segment.a.isActive)
        // {
        //     isDragging = true;
        //     selectedPoint = segment.a;
        //     break;
        // }
        // else if (segment.b.isActive)
        // {
        //     isDragging = true;
        //     selectedPoint = segment.b;
        //     break;
        // }
    }
}

function mouseReleased()
{
    isDragging = false;

    for (const segment of segments)
    {
        segment.resetPoints();
    }

    for (const obstacle of obstacles)
    {
        obstacle.resetPoints();
    }
}

function keyPressed()
{
    if (!isDragging)
    {
        if (keyCode === E_KEY)
        {
            if (addingState === 0)
            {
                const a = new Point(mouseX, mouseY);
                const b = new Point(mouseX, mouseY);

                const segment = new Segment(a, b);

                segments.push(segment);

                addingState = 1;
            }
            else if (addingState === 1)
            {
                addingState = 0;
            }
        }
        else if (keyCode == ESCAPE)
        {
            if (addingState === 1)
            {
                segments.pop();

                addingState = 0;
            }
        }
    }
}