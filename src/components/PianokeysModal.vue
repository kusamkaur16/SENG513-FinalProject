<template>
<div class="footer">
  <button class="decreaseOctave btn"><</button>
  <div class="pianoKeys">
    <div class="key white c"><span class="keyTitle">C4</span></div>
    <div class="key black cs"></div>
    <div class="key white d"><span class="keyTitle">D4</span></div>
    <div class="key black ds"></div>
    <div class="key white e"><span class="keyTitle">E4</span></div>
    <div class="key white f"><span class="keyTitle">F4</span></div>
    <div class="key black fs"></div>
    <div class="key white g"><span class="keyTitle">G4</span></div>
    <div class="key black gs"></div>
    <div class="key white a"><span class="keyTitle">A4</span></div>
    <div class="key black as"></div>
    <div class="key white b"><span class="keyTitle">B4</span></div>
    <div class="key white c1"><span class="keyTitle">C5</span></div>
    <div class="key black c1s"></div>
    <div class="key white d1"><span class="keyTitle">D5</span></div>
    <div class="key black d1s"></div>
    <div class="key white e1"><span class="keyTitle">E5</span></div>
    <div class="key white f1"><span class="keyTitle">F5</span></div>
    <div class="key black f1s"></div>
    <div class="key white g1"><span class="keyTitle">G5</span></div>
    <div class="key black g1s"></div>
    <div class="key white a1"><span class="keyTitle">A5</span></div>
    <div class="key black a1s"></div>
    <div class="key white b1"><span class="keyTitle">B5</span></div>
  </div>
  <button class="increaseOctave btn">></button>

</div>
</template>
<script src="../js/keys.js"></script>

</script>

<style>
.keyTitle {
    position: relative;
    bottom: -68%;
}
.footer {
  height: 20%;
  width: 100%;
  position: absolute;
  bottom: 0px;

}

.increaseOctave {
  position: absolute;
  right: 11%;
  bottom: 0px;
  width: 5%;
  height: 100%;
  background-color: #84DCC6;
}

.decreaseOctave {
  position: absolute;
      left: 10.5%;
  bottom: 0px;
  width: 5%;
  height: 100%;
  background-color: #84DCC6;
}

.pianoKeys {
    height: 100%;
      width: 90%;
      left: 18%;
  /* margin: 5em auto;
  padding: 3em 0 0 3em; */
  position: relative;

  /* bottom: 10px; // border-radius: 1em;
  // background: -webkit-gradient(linear, right bottom, left top, color-stop(0%, rgba(0, 0, 0, 0.3)), color-stop(100%, rgba(0, 0, 0, 0))), url('https://f.cl.ly/items/2q1f3t0C3R1b0g081w3n/vwood.png');
  // box-shadow: 0 0 50px rgba(0, 0, 0, 0.5) inset, 0 1px rgba(212, 152, 125, 0.2) inset, 0 5px 15px rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 50px rgba(0, 123, 255, 0.5) inset, 0 1px rgba(212, 152, 125, 0.2) inset, 0 5px 15px rgba(0, 0, 0, 0.5); */
}

.key {
  margin: 0;
  padding: 0;
  position: relative;
  float: left;
}

.white {
  top: 2.5%;
  height: 95%;
  width: 5.14%;
  z-index: 1;
  border-left: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
  border-radius: 0 0 5px 5px;
  box-shadow: -1px 0 0 rgba(255, 255, 255, 0.8) inset, 0 0 5px #ccc inset, 0 0 3px rgba(0, 0, 0, 0.2);
  background: linear-gradient(top, #eee 0%, #fff 100%);
}

.white:active {
  border-top: 1px solid #777;
  border-left: 1px solid #999;
  border-bottom: 1px solid #999;
  box-shadow: 2px 0 3px rgba(0, 0, 0, 0.1) inset, -5px 5px 20px rgba(0, 0, 0, 0.2) inset, 0 0 3px rgba(0, 0, 0, 0.2);
  background: linear-gradient(top, #fff 0%, #e9e9e9 100%);
}

.black {
  top: 2.5%;
  height: 54%;
  width: 2.75%;
  margin: 0 0 0 -1em;
  z-index: 2;
  border: 1px solid #000;
  border-radius: 0 0 3px 3px;
  box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.2) inset, 0 -5px 2px 3px rgba(0, 0, 0, 0.6) inset, 0 2px 4px rgba(0, 0, 0, 0.5);
  background: linear-gradient(45deg, #222 0%, #555 100%);
}

.black:active {
  box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.2) inset, 0 -2px 2px 3px rgba(0, 0, 0, 0.6) inset, 0 1px 2px rgba(0, 0, 0, 0.5);
  background: linear-gradient(left, #444 0%, #222 100%);
}

.a,
.a1,
.b,
.b1,
.e,
.e1,
.g,
.g1,
.d,
.d1 {
  margin: 0 0 0 -1.5%;
}

.key:first-child {
  border-radius: 5px 0 5px 5px;
}

.key:last-child {
  border-radius: 0 5px 5px 5px;
}
</style>
