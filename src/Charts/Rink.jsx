var RINK_CONFIG = {   
    RINK_LENGTH: 200,
    RINK_WIDTH: 85,
    BLUE_LINE_WIDTH: 1,
    BOARDS_RADIUS: 28,
    RED_TO_BOARDS: 11,
    RED_TO_FACEOFF: 20,
    FACEOFF_RADIUS: 15,
    FACEOFF_DOT_RADIUS: 1,
    ZONE_LINE_WIDTH: (2/12),
    CREASE_RADIUS: 6,
    ZONE_LENGTH: 75,
    ZONE_TO_NEUTRAL_DOT: 5,
    CENTER_TO_NEUTRAL_DOT: 22,
    REF_CREASE_RADIUS: 10,
    CREASE_HEIGHT: 4,
    FACEOFF_HOR_LENGTH: 3,
    FACEOFF_VER_LENGTH: 4,
    FACEOFF_HOR_DIST_CEN: 2,
    FACEOFF_VER_DIST_CEN: (9/12),
    FACEOFF_OUT_MARK_LENGTH: 2,
    FACEOFF_OUT_MARK_DIST_BW: 5 + (7/12),
    TRAPEZOID_TOP: 22,
    TRAPEZOID_BOTTOM: 28
};
  
//Allow the rink to scale
let scale = 400 / RINK_CONFIG.RINK_WIDTH;
for(let x in RINK_CONFIG){
RINK_CONFIG[x] = scale * RINK_CONFIG[x];
}

  
function rounded_rect(x, y, w, h, r, tl, tr, bl, br) {
      var retval;
      retval  = "M" + (x + r) + "," + y;
      retval += "h" + (w - 2*r);
      if (tr) { retval += "a" + r + "," + r + " 0 0 1 " + r + "," + r; }
      else { retval += "h" + r; retval += "v" + r; }
      retval += "v" + (h - 2*r);
      if (br) { retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + r; }
      else { retval += "v" + r; retval += "h" + -r; }
      retval += "h" + (2*r - w);
      if (bl) { retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + -r; }
      else { retval += "h" + -r; retval += "v" + -r; }
      retval += "v" + (2*r - h);
      if (tl) { retval += "a" + r + "," + r + " 0 0 1 " + r + "," + -r; }
      else { retval += "v" + -r; retval += "h" + r; }
      retval += "z";
      return retval;
}
  
let creaseData = [  {"x": RINK_CONFIG.RED_TO_BOARDS, "y": (RINK_CONFIG.RINK_WIDTH/2 ) - RINK_CONFIG.CREASE_HEIGHT , "type": "M"},
                    {"x": RINK_CONFIG.RED_TO_BOARDS + RINK_CONFIG.CREASE_HEIGHT, "y":(RINK_CONFIG.RINK_WIDTH/2 ) - RINK_CONFIG.CREASE_HEIGHT, "type": "L"},
                    {"x": RINK_CONFIG.RED_TO_BOARDS + RINK_CONFIG.CREASE_HEIGHT, "y": (RINK_CONFIG.RINK_WIDTH/2 ) + RINK_CONFIG.CREASE_HEIGHT, "type": "A", "radius": RINK_CONFIG.CREASE_RADIUS},
                    {"x": RINK_CONFIG.RED_TO_BOARDS, "y": (RINK_CONFIG.RINK_WIDTH/2 ) + RINK_CONFIG.CREASE_HEIGHT, "type": "L"}];

function creaseFunction(input){
    let dStr = "";
    for (let i=0; i < input.length; i++){
        if (input[i]["type"] === "M" || input[i]["type"] === "L"){
            dStr += input[i]["type"] + input[i]["x"] + "," + input[i]["y"];
        }
        else if (input[i]["type"] === "A"){
            dStr += input[i]["type"] + input[i]["radius"] + "," + input[i]["radius"] + ",0,0,1," + input[i]["x"] + "," + input[i]["y"];
        }
    }
    return dStr;
}
  
var yDistance = RINK_CONFIG.BOARDS_RADIUS - Math.sqrt((2 * RINK_CONFIG.RED_TO_BOARDS * RINK_CONFIG.BOARDS_RADIUS) - (RINK_CONFIG.RED_TO_BOARDS * RINK_CONFIG.RED_TO_BOARDS));


export default function Rink(){
    return(
        <svg width={500} height={RINK_CONFIG.RINK_LENGTH}>
            <path className="rink" width={RINK_CONFIG.RINK_WIDTH} height={RINK_CONFIG.RINK_LENGTH}
            d={rounded_rect(0,0, RINK_CONFIG.RINK_LENGTH * 0.5, RINK_CONFIG.RINK_WIDTH, RINK_CONFIG.BOARDS_RADIUS, true, false, true, false)}
            x={0} y={0} />
            <rect className="redline" x={RINK_CONFIG.RINK_LENGTH/2} y={0} width={RINK_CONFIG.BLUE_LINE_WIDTH} height={RINK_CONFIG.RINK_WIDTH}></rect>
            <rect className="blueline" x={RINK_CONFIG.ZONE_LENGTH} y={0} width={RINK_CONFIG.BLUE_LINE_WIDTH} height={RINK_CONFIG.RINK_WIDTH}></rect>
            <rect className="goalline" x={RINK_CONFIG.RED_TO_BOARDS} y={yDistance} width={RINK_CONFIG.ZONE_LINE_WIDTH} height={RINK_CONFIG.RINK_WIDTH - 2 * yDistance}></rect>
            <circle className="faceoff-dot" cx={RINK_CONFIG.ZONE_LENGTH + RINK_CONFIG.ZONE_TO_NEUTRAL_DOT} cy={(RINK_CONFIG.RINK_WIDTH/2 - RINK_CONFIG.CENTER_TO_NEUTRAL_DOT)} r={RINK_CONFIG.FACEOFF_DOT_RADIUS}></circle>
            <circle className="faceoff-dot" cx={RINK_CONFIG.ZONE_LENGTH + RINK_CONFIG.ZONE_TO_NEUTRAL_DOT} cy={(RINK_CONFIG.RINK_WIDTH/2 + RINK_CONFIG.CENTER_TO_NEUTRAL_DOT)} r={RINK_CONFIG.FACEOFF_DOT_RADIUS}></circle>
            <circle className="faceoff-dot" cx={RINK_CONFIG.RED_TO_BOARDS + RINK_CONFIG.RED_TO_FACEOFF} cy={(RINK_CONFIG.RINK_WIDTH/2 - RINK_CONFIG.CENTER_TO_NEUTRAL_DOT)} r={RINK_CONFIG.FACEOFF_DOT_RADIUS}></circle>
            <circle className="faceoff-dot" cx={RINK_CONFIG.RED_TO_BOARDS + RINK_CONFIG.RED_TO_FACEOFF} cy={(RINK_CONFIG.RINK_WIDTH/2 + RINK_CONFIG.CENTER_TO_NEUTRAL_DOT)} r={RINK_CONFIG.FACEOFF_DOT_RADIUS}></circle>
            <circle className="faceoff-circle" cx={RINK_CONFIG.RED_TO_BOARDS + RINK_CONFIG.RED_TO_FACEOFF} cy={(RINK_CONFIG.RINK_WIDTH/2 - RINK_CONFIG.CENTER_TO_NEUTRAL_DOT)} r={RINK_CONFIG.FACEOFF_RADIUS}></circle>
            <circle className="faceoff-circle" cx={RINK_CONFIG.RED_TO_BOARDS + RINK_CONFIG.RED_TO_FACEOFF} cy={(RINK_CONFIG.RINK_WIDTH/2 + RINK_CONFIG.CENTER_TO_NEUTRAL_DOT)} r={RINK_CONFIG.FACEOFF_RADIUS}></circle>

            <path className="goalcrease" d={creaseFunction(creaseData)} />
        </svg>
    )
}