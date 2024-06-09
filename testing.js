import * as PImage from "pureimage";
import * as fs from "fs";
import * as path from 'path'

let members = []
class Member{
    constructor(name="bob",partner="",children=[]){
        this.name = name
        this.partner=partner
        this.children=children
    }
}
let a = new Member("a")
members.push(a)
a.children.push(new Member("b"))
a.children.push(new Member("c"))
a.children[1].children.push(new Member("d"))
console.log(members)

// make canvas and context
const canvas = PImage.make(1000, 1000);
const ctx = canvas.getContext("2d");
const centerX = canvas.width/500
const centerY = canvas.height/500

// make background white
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

var fnt = PImage.registerFont(
    path.resolve("./font/arial.ttf"),
    "Arial",
);
fnt.loadSync()

function drawTextBox(text, textColor, x, y, widthPre, heightPre, outline="black", backgroundColor="white", thickness=8){
    //font size stuff
    let fontSize = 11
    let padding = 4
    let width = (fontSize*text.length)*0.6+padding
    let height = fontSize*2+thickness+padding


    //outline
    ctx.fillStyle = outline
    ctx.fillRect(x, y, width, height)
    //background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(x+thickness, y+thickness, width-thickness*2, height-thickness*2)

    //fil text
    ctx.fillStyle = textColor
    ctx.font = fontSize+"px 'Arial'";
    ctx.fillText(text,x+thickness+(padding/2),y+thickness+fontSize+(padding/2))

    return {width, height}
}
drawTextBox("joe is better than your mom!!!", "black", centerX, centerY, 100, 100)

//write to 'out.png'
PImage.encodePNGToStream(canvas, fs.createWriteStream("out.png"))
  .then(() => {
    console.log("wrote out the png file to out.png");
  })
  .catch((e) => {
    console.log("there was an error writing");
  });