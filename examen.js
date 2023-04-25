function setup() {
  createCanvas(windowWidth, windowHeight);
  circle1X = width / 4;
  circle2X = width / 2;
  circle3X = (width / 4) * 3;
  circleY = height / 2;
  r = 100;
}

function draw() {
  background(255);
  strokeWeight(2);

  circuloPuntoMedio(circle1X, circleY, r);
  circuloPuntoMedio(circle2X, circleY, r);
  circuloPuntoMedio(circle3X, circleY, r);

  n = parseInt(prompt('Cantidad a dividir el circulo: '));
  angulo = (2 * PI) / n;

  for (let i = 0; i < n; i++) {
    let xLinea = circle1X + r * cos(i * angulo);
    let yLinea = circleY + r * sin(i * angulo);
    stroke('red');
    lineaPuntoPendiente(circle1X, circleY, xLinea, yLinea);
  }
  for (let i = 0; i < n; i++) {
    let xLinea = circle2X + r * cos(i * angulo);
    let yLinea = circleY + r * sin(i * angulo);
    stroke('green');
    lineaDDA(circle2X, circleY, xLinea, yLinea);
  }
  for (let i = 0; i < n; i++) {
    let xLinea = circle3X + r * cos(i * angulo);
    let yLinea = circleY + r * sin(i * angulo);
    lineaBresenham(circle3X, circleY, xLinea, yLinea);
  }

  noLoop();
}

function circuloPuntoMedio(x, y, radio) {
  let xAux = 0;
  let yAux = radio;
  let d = 1 - radio;
  stroke('black');

  while (xAux <= yAux) {
    point(x + xAux, y + yAux);
    point(x + yAux, y + xAux);
    point(x - xAux, y + yAux);
    point(x - yAux, y + xAux);
    point(x + xAux, y - yAux);
    point(x + yAux, y - xAux);
    point(x - xAux, y - yAux);
    point(x - yAux, y - xAux);

    if (d < 0) {
      d += 2 * xAux + 3;
    } else {
      d += 2 * (xAux - yAux) + 5;
      yAux--;
    }
    xAux++;
  }
}

function lineaPuntoPendiente(x1, y1, x2, y2) {
  sX = 0;
  stroke('red');

  if (x1 > x2) sX = -1;
  else if (x1 < x2) sX = 1;

  if (x1 === x2) {
    x = x1;

    if (y1 > y2) {
      sY = -1;
    } else {
      sY = 1;
    }

    if (sY == 1) {
      for (var y = y1; y < y2; y += sY) {
        point(x, y);
      }
    } else {
      for (var y = y1; y > y2; y += sY) {
        point(x, y);
      }
    }
  } else {
    m = (y2 - y1) / (x2 - x1);
    b = y1 - m * x1;
    if (sX == 1) {
      for (var x = x1; x < x2; x += sX) {
        y = m * x + b;
        point(x, y);
      }
    } else {
      for (var x = x1; x > x2; x += sX) {
        y = m * x + b;
        point(x, y);
      }
    }
  }
}

function lineaDDA(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let p = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
  let sX = dx / p;
  let m = dy / p;
  let x = x1;
  let y = y1;
  stroke('green');

  for (let i = 0; i <= p; i++) {
    point(x, y);
    x += sX;
    y += m;
  }
}

function lineaBresenham(x1, y1, x2, y2) {
  let dx = abs(x2 - x1);
  let dy = abs(y2 - y1);
  let sX = x1 < x2 ? 1 : -1;
  let sY = y1 < y2 ? 1 : -1;
  let err = dx - dy;

  stroke('purple');
  if (sX == 1) {
    if (sY == 1) {
      while (x1 <= x2 && y1 <= y2) {
        point(x1, y1);
        let e2 = 2 * err;
        if (e2 > -dy) {
          err -= dy;
          x1 += sX;
        }
        if (e2 < dx) {
          err += dx;
          y1 += sY;
        }
      }
    } else if (sY == -1) {
      while (x1 <= x2 && y1 >= y2) {
        point(x1, y1);
        let e2 = 2 * err;
        if (e2 > -dy) {
          err -= dy;
          x1 += sX;
        }
        if (e2 < dx) {
          err += dx;
          y1 += sY;
        }
      }
    }
  } else if (sX == -1) {
    if (sY == 1) {
      while (x1 >= x2 && y1 <= y2) {
        point(x1, y1);
        let e2 = 2 * err;
        if (e2 > -dy) {
          err -= dy;
          x1 += sX;
        }
        if (e2 < dx) {
          err += dx;
          y1 += sY;
        }
      }
    } else if (sY == -1) {
      while (x1 >= x2 && y1 >= y2) {
        point(x1, y1);
        let e2 = 2 * err;
        if (e2 > -dy) {
          err -= dy;
          x1 += sX;
        }
        if (e2 < dx) {
          err += dx;
          y1 += sY;
        }
      }
    }
  }
}
