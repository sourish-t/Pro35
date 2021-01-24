var dog, Dog,happyDog, database, foodS, foodStock,canvas

function preload()
{
  Dog = loadImage("Dog.png")
  happyDog = loadImage("happydog.png")
  foodadd = loadImage("foodadd.png")
}

function setup() {
  canvas = createCanvas(500,500);
  

  dog = createSprite(250, 250);
  dog.addImage(Dog);
  dog.scale = 0.3
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);  
}


function draw() {  
  background(46,139,87)

  if(keyDown(UP_ARROW)){
    writeStock(foodS);
  
    dog.addImage(happyDog);
  }

  if(keyDown("X")){
    AddStock(foodS);

      }

  drawSprites();

  textSize(40);
  fill("black");
  stroke(2);
  text("Food Left: "+ foodS, 50,100);
  //add styles here

}

function readStock(data){
   foodS = data.val();

}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x-=1;
  }
  database.ref('/').update({
    Food:x
  })
}


function AddStock(x){

  if(x<=50){
    x=50;
  }
  
  database.ref('/').update({
    Food:x
  })
}

