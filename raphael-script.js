// let paper = Raphael("my-paper", 500, 500);
// let circle = paper.circle(100, 200, 50).attr({ fill: "blue" });
// circle.drag(onmove, onstart, onend);

window.onload = function() {
  const canvas = new Raphael("my-paper");
  const canvasNeedle = new Raphael("needle");
  const percentageTwo = new Raphael("percent");

  const path = canvas.path(
    "M740 432.9h10C750 220 576 80 400 80 218 80 50 224 50 432.9h10C60 251.1 215 90 400 90c188 0 339.3 162 339.3 342.9"
  );
  const pathNeedle = canvasNeedle.path(
    "M123.5 600c0-23.1-13.8-43-33.6-52L79.7 131.9c-.2-7.4-6.1-13.2-13.2-13.2s-13.1 5.9-13.2 13.2L43.1 548c-19.8 8.9-33.6 28.8-33.6 52 0 22.4 12.9 41.7 31.7 51.1 14.236 6.546 33.439 7.811 50.6 0 18.8-9.4 31.7-28.7 31.7-51.1z"
  );

  path.attr({ fill: "#CCCCCC" });
  pathNeedle.attr({
    fill: "#CCCCCC"
  });
  const startingPoint = path.getPointAtLength(0);
  const ellipse = canvas.ellipse(startingPoint.x, startingPoint.y, 25, 25);

  let percentageText = document.getElementById("percentageText");
  let percentageTextSixteen = document.getElementById("percentageTextSixteen");
  let percentageTextEighteen = document.getElementById(
    "percentageTextEighteen"
  );

  const context = {
    canvas,
    path,
    ellipse,
    totalLength: path.getTotalLength(),
    // The smallest step that the ellpise can move
    stepLength: 1,
    // The current position (in the path) of the ellipse
    currentPosition: 0,
    findDistance: (point1, point2) => {
      const dx = point1.x - point2.x;
      const dy = point1.y - point2.y;

      return Math.sqrt(dx * dx + dy * dy);
    },

    // We find the point in the path closest to the current one, give the cursor position
    closestPoint: (
      svgPath,
      totalLength,
      currentPosition,
      stepLength,
      cursorPosition,
      findDistance
    ) => {
      // We find the distance of the previous point in the path from the cursor
      const previousPoint =
        currentPosition - stepLength > 0 ? currentPosition - stepLength : 0;
      const previousDistance = findDistance(
        svgPath.getPointAtLength(previousPoint),
        cursorPosition
      );

      // We find the distance of the next point in the path from the cursor
      const nextPoint =
        currentPosition + stepLength < totalLength
          ? currentPosition + stepLength
          : totalLength;
      const nextDistance = findDistance(
        svgPath.getPointAtLength(nextPoint),
        cursorPosition
      );

      // Depending on which of the two distances is shorter, we find
      // a positive or negative step, AKA the direction of the search
      const movementStep =
        previousDistance < nextDistance ? -stepLength : stepLength;

      // We set a starting point and distance for the search
      let movementPoint =
        previousDistance < nextDistance ? previousPoint : nextPoint;
      let movementDistance =
        previousDistance < nextDistance ? previousDistance : nextDistance;

      // We loop until the next point is more distant than the current one from the cursor
      let pointDistance = Infinity;
      while (pointDistance > movementDistance) {
        pointDistance = movementDistance;
        movementPoint += movementStep;
        movementDistance = findDistance(
          svgPath.getPointAtLength(movementPoint),
          cursorPosition
        );
      }
      // We undo the last step, the one that made the condition fail
      movementPoint -= movementStep;

      return movementPoint;
    }
  };

  // Start callback
  const dragStart = function dragStart() {
    // We store the original position of the ellipse so later we can calculate the cursor position
    this.ellipse.ox = this.ellipse.attr("cx");
    this.ellipse.oy = this.ellipse.attr("cy");
    // We make it half trasparent to provide a visual feedback
    this.ellipse.attr({
      opacity: 0.5
    });
  };

  // Stop callback
  const dragStop = function dragStop(coords) {
    console.log(coords.x);
    console.log("this is before switch statement");

    switch (true) {
      case coords.x > 650:
        percentageText.style.fill = "#ea921f";
        percentageTextSixteen.style.fill = "#5AD55C";
        percentageTextEighteen.style.fill = "#5AD55C";
        document.getElementById("x").innerHTML = "It is more than 600px";
        let biggerthanSix = anime({
          targets: ".header-x",
          opacity: 1,
          // translateY: [10, -5],
          // duration: 500,
          easing: "easeInOutQuad"
          // direction: "alternate"
        });
        break;
      case coords.x > 300:
        percentageText.style.fill = "#5AD55C";
        percentageTextSixteen.style.fill = "#ea921f";
        percentageTextEighteen.style.fill = "#5AD55C";
        document.getElementById("x").innerHTML = "It is more than 300px";
        let biggerthanThree = anime({
          targets: ".header-x",
          opacity: 1,
          // translateY: [10, -5],
          // duration: 500,
          easing: "easeInOutQuad"
          // direction: "alternate"
        });
        break;
      case coords.x < 300:
        percentageText.style.fill = "#5AD55C";
        percentageTextSixteen.style.fill = "#5AD55C";
        percentageTextEighteen.style.fill = "#ea921f";
        document.getElementById("x").innerHTML = "It lesser than 300px";
        let lesserthan = anime({
          targets: ".header-x",
          opacity: 1,
          // translateY: [10, -5],
          // duration: 500,
          easing: "easeInOutQuad"
          // direction: "alternate"
        });
        break;
      default:
        document.getElementById("x").innerHTML = "this is the default case";
    }

    // We restore the initial opacity to signal the end of the drag action
    this.ellipse.attr({
      opacity: 1
    });

    let attribute = document.getElementById("needle");

    // let needleAnim = anime({
    //   targets: attribute,
    //   // direction: "alternate",
    //   // easing: "linear",
    //   rotate: 360,
    //   scale: 0.5,
    //   translateX: 1011,
    //   translateY: 88
    // });

    function movingNeedle(needleCoords) {
      // console.log("This is the needlecoords:", needleCoords);

      if (needleCoords.x > 400) {
        const angle = Math.round(needleCoords.x / Math.PI / 5.4);
        console.log("ANGLE VAR: ", angle);
        attribute.setAttribute(
          "transform",
          "translate(411, 386) rotate(" +
            angle +
            ") translate(-33,-294) scale(0.5)"
        );
      } else {
        const angleTwo = Math.round(needleCoords.x / Math.PI / 1.3);
        attribute.setAttribute(
          "transform",
          "translate(411, 386) rotate(-" +
            angleTwo +
            ") translate(-33,-294) scale(0.5)"
        );
        console.log("ANGLETWO VAR: ", angleTwo);
      }
    }

    movingNeedle(coords);

    // console.log("---------------------------");
    // let next = attribute.getAttribute("transform");
    // console.log(next);

    pathNeedle.animate({ opacity: 0.5, fill: "#5AD55C" }, 2000);

    // percentageTwo.animate({ opacity: 0 }, 2000);
    console.log("---------------------------");

    // the animation is using vanilla.js and the function can only be excute one
    let textAnimate = setInterval(frame, 500);
    function frame() {
      percentageText.style.transitionDuration = 3000;
      percentageText.style.transitionTimingFunction =
        "cubic-bezier(0.42, 0, 1, 1)";
      // percentageText.style.fill = "#5AD55C";
      // percentageTextSixteen.style.fill = "#5AD55C";
      // percentageTextEighteen.style.fill = "#5AD55C";
    }
  };

  // Move callback
  const dragMove = function dragMove(dx, dy) {
    // We retrieve the current cursor position by applying the deltas to the ellipse original position
    const cursorPosition = {
      x: this.ellipse.ox + dx,
      y: this.ellipse.oy + dy
    };
    // console.log(cursorPosition.x);
    // We find the position the ellipse has to position itself on based on its current location and mouse position
    this.currentPosition = this.closestPoint(
      this.path,
      this.totalLength,
      this.currentPosition,
      this.stepLength,
      cursorPosition,
      this.findDistance
    );

    // We find the X/Y coordinates that correspond to the current point in the shape, and we move the ellipse to that point
    const newPoint = this.path.getPointAtLength(this.currentPosition);
    this.ellipse.attr({
      cx: newPoint.x,
      cy: newPoint.y
    });
    // console.log(dx);
    // console.log(dy);
  };

  ellipse.drag(
    // A callback for when mouse moves
    dragMove,
    // A callback for when the drag starts
    dragStart,
    // A callback for when the drag stops
    dragStop,
    // The context to be used as "this" for the movement callback
    context,
    // The context to be used as "this" for the start callback
    context,
    // The context to be used as "this" for the stop callback
    context
  );

  let boxCursor = document.querySelector("body");
  function getValueMouse(event) {
    // console.log("X :" + event.offsetX);
    // console.log("Y :" + event.pageY);
  }

  console.log("from boxCursor function");

  // boxCursor.addEventListener("mousemove", getValueMouse, false);
  boxCursor.addEventListener("mouseenter", getValueMouse, false);
  // boxCursor.addEventListener("mouseleave", getValueMouse, false);
};

const url = "./MOCK_DATA.sql";

fetch(url)
  .then(data => {
    console.log(data[0].json());
  })
  .then(resp => {
    console.log(resp);
  });
