let state = {
  latestNode: "",
  note: undefined,
  points: 0,
};

function onLoad() {
  const ws = new WebSocket("ws://127.0.0.1:3000/ws");

  setInterval(() => {
    const note = genRandomNote();
    state.note = note;
  }, 2000);

  ws.onopen = () => {
    console.log("opened ws");
  };

  ws.onmessage = (e) => {
    const text = e.data;
    state.latestNode = text;
    if (text.includes("#")) {
      if (state.note.includes("#") && text.includes(state.note)) {
        state.points++;
      }
    } else {
      if (text.includes(state.note)) {
        state.points++;
      }
    }
  };

  window.requestAnimationFrame(loop);
}

const notes = [
  "A",
  "A #",
  "B",
  "C",
  "C #",
  "D",
  "D #",
  "E",
  "F",
  "F #",
  "G",
  "G #",
];

function genRandomNote() {
  const noteIndex = Math.floor(Math.random() * notes.length);
  return notes[noteIndex];
}

const h = () => window.innerHeight;
const w = () => window.innerWidth;

function loop() {
  /**
   * Need to explain the purpose of X here.
   * @type {HTMLCanvasElement}
   */
  const canvas = document.getElementById("canvas");

  canvas.width = w();
  canvas.height = h();

  const context = canvas.getContext("2d");

  context.fillStyle = "#220055";
  context.fillRect(0, 0, canvas.width, canvas.height);

  if (state.note != null) {
    context.fillStyle = "white";
    context.font = "64px Comic Sans";
    context.fillText(state.note, canvas.width / 2, canvas.height / 2);
  }

  context.fillStyle = "white";
  context.font = "64px Comic Sans";
  context.fillText("Score: " + state.points, canvas.width / 2 - 150, 100);

  context.fillStyle = "white";
  context.font = "32px Comic Sans";
  context.fillText(state.latestNode, 150, 100);

  window.requestAnimationFrame(loop);
}

window.onload = onLoad;
