export const color_palette = [
    "#e3220f", //red
    "#cb530a", //orange
    "#1154d3", //blue
    "#53c90c", // green
    "#0cccc4", //teal
    "#e4c314", //yellow
    "#1e2021", //dark
    "#e5eaed"//clear


]

export const colors  =  [
        "#343536",
        "#999999",
        "#904110",
        "#342222"//DARK RED
    ]

    export  const LightenDarkenColor = (col, amt) =>  {
    col = col.slice(1);
    var num = parseInt(col,16);
    var r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
    var b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
    var g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return ("#") + (g | (b << 8) | (r << 16)).toString(16);
  }




export const      clearColor = (color) => {
    return LightenDarkenColor(color, 20)
}
export const  darkColor = (color) => {
    return LightenDarkenColor(color, -20)
}
