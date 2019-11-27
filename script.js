//   var R = Raphael(0, 0, "100%", "100%"),
//     r = R.circle(100, 100, 50).attr({
//       fill: "hsb(0, 1, 1)",
//       stroke: "none",
//       opacity: 0.5
//     }),
//     g = R.circle(210, 100, 50).attr({
//       fill: "hsb(.3, 1, 1)",
//       stroke: "none",
//       opacity: 0.5
//     }),
//     b = R.circle(320, 100, 50).attr({
//       fill: "hsb(.6, 1, 1)",
//       stroke: "none",
//       opacity: 0.5
//     }),
//     p = R.circle(430, 100, 50).attr({
//       fill: "hsb(.8, 1, 1)",
//       stroke: "none",
//       opacity: 0.5
//     });

//   var start = function() {
//       this.ox = this.attr("cx");
//       this.oy = this.attr("cy");
//       this.animate({ r: 70, opacity: 0.25 }, 500, ">");
//     },
//     move = function(dx, dy) {
//       var angle = 10;
//       var dxN = dx + 20;
//       //, dy
//       //  the dx and dy parameters are the value on element when it drags. It moves to all directions.
//       // this.attr({ cx: this.ox + dxN });
//       return Math.sqrt(dx * dx + dy * dy);
//     },
//     up = function() {
//       this.animate({ r: 50, opacity: 0.5 }, 500, ">");
//     };
//   R.set(r, g, b, p).drag(move, start, up);
