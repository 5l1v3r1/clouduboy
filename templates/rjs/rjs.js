"use strict";

let game = new MicroCanvas();

let rjs, rjsLogo, dino;
let sfxBling, sfxPlop;

game.setup(function(mctx) {
  rjs = mctx.loadGraphics(
    `PROGMEM const unsigned char rjs[] = { /*77x15*/
       0xfe, 0x1, 0xfe, 0x2, 0x85, 0x85, 0x5, 0xc5, 0xb9, 0xc2, 0x3c, 0x0, 0x0, 0x0,
       0xfe, 0x1, 0xfe, 0x0, 0x0, 0x0, 0x0, 0x0, 0xfe, 0x1, 0xfe, 0x0, 0x0, 0x0, 0x0,
       0xfe, 0x1, 0x7e, 0x40, 0x40, 0x40, 0x40, 0x80, 0xfe, 0x1, 0xfe, 0x0, 0x0, 0x0,
       0x0, 0xfe, 0x1, 0xfe, 0x2, 0x85, 0x85, 0x5, 0xc5, 0xbb, 0xc6, 0x7c, 0x0, 0x0,
       0x0, 0x0, 0x0, 0x0, 0xfe, 0x1, 0xfe, 0x0, 0x0, 0x0, 0x1c, 0x26, 0x5a, 0x97
       0xa0, 0xa3, 0xa5, 0x45, 0xcb, 0x8a, 0xc, 0x3f, 0x40, 0x3f, 0x1, 0x2, 0x5,
       0xb, 0x16, 0x2c, 0x58, 0x30, 0x0, 0x0, 0x0, 0x1, 0x1b, 0x29, 0x28, 0x50, 0x50,
       0x50, 0x28, 0x27, 0x18, 0x7, 0x0, 0x0, 0x0, 0x0, 0x3f, 0x40, 0x3f, 0x1,
       0x1, 0x1, 0x1, 0x0, 0x3f, 0x40, 0x3f, 0x0, 0x0, 0x0, 0x0, 0x3f, 0x40, 0x3f,
       0x1, 0x2, 0x5, 0xb, 0x16, 0x2c, 0x58, 0x30, 0x0, 0x0, 0x20, 0x50, 0x50, 0x28,
       0x27, 0x10, 0xf, 0x0, 0x0, 0x0, 0xc, 0x14, 0x2c, 0x28, 0x50, 0x50, 0x60,
       0x1b, 0x34, 0x39, 0xf };`
  );

  rjsLogo = mctx.loadGraphics(
    `PROGMEM const unsigned char rjs_logo[] = { /*39x36*/
      0x0, 0x0, 0x0, 0x0, 0xc0, 0x60, 0xb0, 0x50, 0x28, 0x2c, 0x14, 0x8a, 0x8a,
      0xa5, 0xa5, 0xa5, 0xa5, 0xa5, 0xa5, 0xa5, 0xa5, 0xa5, 0xa5, 0xa5, 0xa5,
      0xa5, 0x8a, 0x8a, 0x14, 0x2c, 0x28, 0x50, 0xb0, 0x60, 0xc0, 0x0, 0x0,
      0x0, 0x0, 0xc0, 0x38, 0xc6, 0x3b, 0x4, 0x3, 0x0, 0x0, 0x0, 0x0, 0xc1,
      0x62, 0x32, 0xfa, 0xa, 0xfa, 0x32, 0x62, 0x42, 0x2, 0x42, 0x62, 0x32, 0xfa,
      0xa, 0xfa, 0x32, 0x62, 0xc1, 0x0, 0x0, 0x0, 0x0, 0x3, 0x4, 0x3b, 0xc6, 0x38,
      0xc0, 0xff, 0x0, 0xff, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x1, 0x83, 0x70,
      0x8f, 0x70, 0xd, 0x5, 0x7d, 0x7d, 0x5, 0x7d, 0x7d, 0x5, 0xd, 0x70, 0x8f,
      0x70, 0x83, 0x1, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0xff, 0x0, 0xff, 0x0,
      0x7, 0x18, 0x27, 0x5c, 0xb0, 0xe0, 0x0, 0xc0, 0x30, 0xce, 0x31, 0xe, 0x1,
      0x0, 0x1, 0x1, 0xff, 0xff, 0x1, 0xff, 0xff, 0x1, 0x1, 0x0, 0x1, 0xe, 0x31,
      0xce, 0x30, 0xc0, 0x0, 0xe0, 0xb0, 0x5c, 0x27, 0x18, 0x7, 0x0, 0x0, 0x0,
      0x0, 0x0, 0x0, 0x0, 0x0, 0xe, 0x9, 0x6, 0x1, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0,
      0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x1, 0x6, 0x9, 0xe,
      0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0 };`
  );

  dino = mctx.loadGraphics(
    `PROGMEM const unsigned char dino_top[] = { /*20x24*/
      0x0,  0x0,  0x0,  0x0,  0x0,  0x0,  0x0,  0x0,  0x0,  0x0,
      0xfe, 0xff, 0xfb, 0xff, 0xff, 0xbf, 0xbf, 0xbf, 0x3f, 0x3e,
      0x7e, 0xf8, 0xf0, 0xe0, 0xe0, 0xf0, 0xf8, 0xfc, 0xfe, 0xff,
      0xff, 0xff, 0xff, 0x7f, 0x4,  0xc,  0x0,  0x0,  0x0,  0x0,
      0x0,  0x0,  0x1,  0x3,  0x7,  0x7f, 0x5f, 0xf,  0x7,  0xf,
      0x7f, 0x43, 0x1,  0x0,  0x0,  0x0,  0x0,  0x0,  0x0,  0x0 };`
  );

  sfxBling = mctx.loadTune(
    `const byte PROGMEM score [] = {
         0x90, 71, 0,116, 0x80,
         0x90, 76, 1,222, 0x80,
         0xf0
    };`
  );

  sfxPlop = mctx.loadTune(
    `const byte PROGMEM score [] = {
         0x90, 47, 0, 33, 0x80,
         0x90, 41, 0, 50, 0x80,
         0xf0
    };`
  );

  //mctx.playbackRate = 1/3;
  mctx.loop(loop);
});



let intro = 1;
let _running = null;


function loop() {
  if (intro) {
     if (!_running) _running = gameIntro();

     if (game._delay && game._delay > 0) {
        --game._delay;
     } else {
       let c = _running.next();

       if (c.done) {
         intro = false;
         _running = null;
       } else {
         game._delay = c.value -1;
       }
     }

     return;
  }

  // Clear display, redraw background text
  game.clear();
  game.drawText("Animate\nDemo", 0,0, 3);
}


function *gameIntro() {

  //for(int i = -8; i < 39; i = i + 2)
  for (let y = -8;  y <= 38; y += 2) {
    game.clear();
    game.drawImage(rjsLogo, 44, 0 );

    game.drawImage(rjs, 25, y );
    yield 1; // essentially delay(16);
  }

    game.drawText("presents", 42, 55);

    //arduboy.tunes.tone(987, 120);
    //delay(120);
    //arduboy.tunes.tone(1318, 400);
    sfxBling.play();

    // Flash the RGB led on the Arduboy or the screen in the browser to a purple color!
    game.custom({
      canvas: `document.body.style.backgroundColor='rgb(96, 0, 128)'`,
      arduboy: `setRGBled(96, 0, 128)`,
    });

    yield 6; // essentially delay(6*16);

    game.custom({
      canvas: `document.body.style.backgroundColor=''`,
      arduboy: `setRGBled(0, 0, 0)`,
    });

    yield 60;


  let y = 12;
    //arduboy.drawBitmap(54-2, y-1,    dino,   20,18, BLACK);
    //arduboy.drawBitmap(54+1, y+1,    dino,   20,18, BLACK);
    game.eraseImage(dino, 54-2, y-1);
    game.eraseImage(dino, 54+1, y+1);

  //for (int i=0; i<12; ++i) {
  for (let frame = 0; frame <36; ++frame ) {
    let rx = Math.floor(Math.random()*(2+1)) -1; // = random(0,2)-1;
    let ry = Math.floor(Math.random()*(2+1)) -1;
    let noise = 0;// (frame%6>2 ? frame : -frame )/6;

    if (frame%3 === 0) {
      game.drawImage(dino, rx+ 54, ry+ y);
    } else {
      game.eraseImage(dino, rx+ 54+noise, ry+ y+noise);
    }
//      arduboy.drawBitmap(rx+ 54+(i%2?i:-i)/2, ry+ y+(i%2?i:-i)/2,    dino_top,   20,18, BLACK);

    yield 1;
  }

  //for(; y < 41; y += 1+y/10)
  while ( y < 40 ) {
    //y += (frame + (frame>6?frame-6:0) + (frame>12?frame-12:0))|0;
    y += 1 + y/10;
    if (y > 40) y = 40;

    game.clear();
    game.drawImage(rjsLogo, 44, 0 );
    game.drawImage(rjs, 25, 38 );

    game.drawText("pr   nts", 42, 55);
    game.drawText("ese", 54, 55 + (y>32 ? y-32 : 0));

    game.eraseImage(dino, 54-2, y-1);
    game.eraseImage(dino, 54+1, y+1);

    game.drawImage(dino, 54, y);

    yield 1;
  }

    //      arduboy.tunes.tone(246, 20);
    //      delay(20);
    //      arduboy.tunes.tone(174, 40);
    //new ArduboyScore("0x90, 47, 0, 33, 0x80, 0x90, 41, 0, 50, 0x80, 0xf0").play();
    sfxPlop.play();

    yield 120;


  //for (int i = 0; i < 64; ++i) {
  for (let i = 0; i < 64; ++i) {
    let z = i<54 ? i : 54;

    game.eraseImage(dino, 54-z+1, y);

    //arduboy.drawLine(0, i<32 ? i*2 : 127-i*2, 127,i<32 ? i*2 : 127-i*2, BLACK);
    game.clearRect(0, i<32 ? i*2 : 127-i*2, 128, 1);

    game.drawImage(dino, 54-z, y);

    yield 1;
  }

  yield 240;
}

console.log("MicroCanvas: Animate Demo with Generators");
