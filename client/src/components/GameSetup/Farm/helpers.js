// Function to change the tileset on contiguous tiles (Tilled dirt) so they merge seemlessly
//============================================================================================
exports.checkContig = function checkContig(tile, map, tileCount, justThis = false) {
  if (true || tile.properties["Contiguous"]) {
    let setTile;

    const up = map.getTileAt(tile.x, tile.y - 1).properties["Contiguous"];
    const down = map.getTileAt(tile.x, tile.y + 1).properties["Contiguous"];
    const left = map.getTileAt(tile.x - 1, tile.y).properties["Contiguous"];
    const right = map.getTileAt(tile.x + 1, tile.y).properties["Contiguous"];

    const ul = map.getTileAt(tile.x - 1, tile.y - 1).properties["Contiguous"];
    const ur = map.getTileAt(tile.x + 1, tile.y - 1).properties["Contiguous"];
    const dl = map.getTileAt(tile.x - 1, tile.y + 1).properties["Contiguous"];
    const dr = map.getTileAt(tile.x + 1, tile.y + 1).properties["Contiguous"];

    // console.log(map.getTileAt(tile.x, tile.y-1));
    // console.log(`tile at ${tile.x},${tile.y-1} is${up?"":" not"} contiguous`)
    // console.log(`tile at ${tile.x},${tile.y+1} is${down?"":" not"} contiguous`)
    // console.log(`tile at ${tile.x-1},${tile.y} is${left?"":" not"} contiguous`)
    // console.log(`tile at ${tile.x+1},${tile.y} is${right?"":" not"} contiguous`)

    // change tileset to connect them
    //===============================
    // 4 connections
    if (up && down && left && right) {

      // All
      if (ul && ur && dl && dr) { setTile = 10 }

      // 3
      else if (ul && ur && dl && !dr) { setTile = 20 }
      else if (ul && ur && !dl && dr) { setTile = 21 }
      else if (ul && !ur && dl && dr) { setTile = 26 }
      else if (!ul && ur && dl && dr) { setTile = 27 }

      //2
      else if (ul && ur && !dl && !dr) { setTile = 47 }
      else if (ul && !ur && dl && !dr) { setTile = 46 }
      else if (ul && !ur && !dl && dr) { setTile = 45 }
      else if (!ul && ur && !dl && dr) { setTile = 43 }
      else if (!ul && ur && dl && !dr) { setTile = 44 }
      else if (!ul && !ur && dl && dr) { setTile = 42 }

      //1
      else if (ul && !ur && !dl && !dr) { setTile = 41 }
      else if (!ul && ur && !dl && !dr) { setTile = 40 }
      else if (!ul && !ur && dl && !dr) { setTile = 35 }
      else if (!ul && !ur && !dl && dr) { setTile = 34 }

      // none
      else if (!ul && !ur && !dl && !dr) { setTile = 7 }
    }

    // 3 connections
    if (up && down && left && !right) {
      if (!ul && !dl) { setTile = 23 }
      else if (!ul && dl) { setTile = 31 }
      else if (ul && !dl) { setTile = 37 }
      else { setTile = 11 }
    }
    if (up && down && !left && right) {
      if (!ur && !dr) { setTile = 22 }
      else if (!ur && dr) { setTile = 30 }
      else if (ur && !dr) { setTile = 36 }
      else { setTile = 9 }
    }
    if (up && !down && left && right) {
      if (!ul && !ur) { setTile = 28 }
      else if (!ul && ur) { setTile = 38 }
      else if (ul && !ur) { setTile = 39 }
      else { setTile = 16 }
    }
    if (!up && down && left && right) {
      if (!dr && !dl) { setTile = 29 }
      else if (!dr && dl) { setTile = 33 }
      else if (dr && !dl) { setTile = 32 }
      else { setTile = 4 }
    }

    // 2 connections
    if (up && down && !left && !right) { setTile = 14 }
    if (!up && !down && left && right) { setTile = 2 }

    if (up && !down && left && !right) {
      if (!ul) { setTile = 25 }
      else { setTile = 17 }
    }
    if (up && !down && !left && right) {
      if (!ur) { setTile = 24 }
      else { setTile = 15 }
    }
    if (!up && down && left && !right) {
      if (!dl) { setTile = 19 }
      else { setTile = 5 }
    }

    if (!up && down && !left && right) {
      if (!dr) { setTile = 18 }
      else { setTile = 3 }
    }


    // 1 connections
    if (up && !down && !left && !right) { setTile = 13 }
    if (!up && down && !left && !right) { setTile = 1 }
    if (!up && !down && left && !right) { setTile = 8 }
    if (!up && !down && !left && right) { setTile = 6 }

    // change connected too
    if (!justThis) {
      if (up) { checkContig(map.getTileAt(tile.x, tile.y - 1), map, tileCount, true) };
      if (down) { checkContig(map.getTileAt(tile.x, tile.y + 1), map,  tileCount,  true); };
      if (left) { checkContig(map.getTileAt(tile.x - 1, tile.y), map,  tileCount, true); };
      if (right) { checkContig(map.getTileAt(tile.x + 1, tile.y), map,  tileCount, true); };
      if (ul) { checkContig(map.getTileAt(tile.x - 1, tile.y - 1), map,  tileCount, true); };
      if (ur) { checkContig(map.getTileAt(tile.x + 1, tile.y - 1), map,  tileCount, true); };
      if (dl) { checkContig(map.getTileAt(tile.x - 1, tile.y + 1), map,  tileCount, true); };
      if (dr) { checkContig(map.getTileAt(tile.x + 1, tile.y + 1), map,  tileCount, true); };
    }

    if (setTile) { map.putTileAt(tileCount + setTile, tile.x, tile.y) }
  }

}