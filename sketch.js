
let table;
let newFont;
let value;
let x_value;
let y_value;
let z_value;
let diameter;
let MyCanvas;
let minStreams = Infinity;
let maxStreams = -Infinity;
let Streams_dividend = Infinity;
let Streams_divisor;
let Streams;
let numStreams;
let minPopularity = Infinity;
let maxPopularity = -Infinity;
let Popularity_dividend = Infinity;
let Popularity_divisor;
let Popularity;
let numPopularity;
let minFollowers= Infinity;
let maxFollowers = -Infinity;
let Followers_dividend = Infinity;
let Followers_divisor;
let Followers;
let numFollowers;
let z_Streams;
let z_Followers;
let color_energy;
let r_color;
let g_color;
let b_color;
let button=[];
let index;
let song;
let acousticness;
let speechiness;
let danceability;
let valence;
let streams;
let tempo;
let rec = [];
let normalized_Streams;
var reci = [];

var accessToken;
var data;
var genre;
var slider;
var val = 0;

var api = 'https://api.spotify.com/v1/search?q='; // did this to help search by artist
var units = '&type=track';
var input;
var selected_song;

function preload (){

  table = loadTable('spotify_dataset.csv', 'csv', 'header');

  newFont = loadFont('fonts/Montserrat-Regular.otf');

  angleMode(DEGREES);
}

function loadData() {
  let rows = table.getRows();
}

function setup() {
  let canvasW = windowWidth/2;
  let canvasH = windowHeight*0.8;
  myCanvas = createCanvas(canvasW,canvasH,WEBGL);
  myCanvas.parent('sketch_container');

  
  createEasyCam();
  //easycam = new Dw.EasyCam(this._renderer, {distance:1900, center:[0,0,0], rotation:[1,-0.05,0.25,0]});
  easycam = new Dw.EasyCam(this._renderer, {distance:1700, center:[0,0,0], rotation:[1,0,0.4,0]});
  


  textFont(newFont);
  textSize(70);
  
  document.oncontextmenu =()=> false;

 getAccessToken(function(incoming) {
    // When it comes back (as the variable 'incoming'), we save it to our variable 'accessToken'.
    accessToken = incoming;
  });

  find_min_max_streams(); //Data Normalization
  find_min_max_popularity(); //Data Normalization
  find_min_max_followers(); //Data Normalization

  print('minimum streams = ' + minStreams + ', maximum streams = ' + maxStreams,  'streams dividend = ' + Streams_dividend);
  print('minimum popularity = ' + minPopularity + ', maximum popularity = ' + maxPopularity,  'Popularity dividend = ' + Popularity_dividend);
  print('minimum followers = ' + minFollowers + ', maximum followers = ' + maxFollowers,  'Follwers dividend = ' + Followers_dividend);

  for (i= 0; i< 200; i++) {
    index = (table.getString(i, "Index"));
    song = (table.getString(i, "Song Name"));
    acousticness = (table.getString(i, "Acousticness"));
    speechiness = (table.getString(i,"Speechiness"));
    danceability = (table.getString(i,"Danceability"));
    valence = (table.getString(i,"Valence"));
    streams = (table.getString(i, "Streams"));
    tempo = (table.getString(i, "Tempo"))

   
    let s = new data_rec(index, song, acousticness, danceability, streams, valence);
    rec.push(s);

    reci[i] = (rec[i].song);


      
  }

  var button = select('#b2');
  button.mousePressed(delay_pre_searchArtist);

  function delay_pre_searchArtist() {
   
    const MyTimeout = setTimeout(searchArtist, 1000);
  }


  function searchArtist() {
    
  
    print("Selected Value : " + selectedValue);
   // print("API : " + api + "  Selected Song :  " + input.value() + " units  : " + units);

    var url = api + selectedValue + units;
    print("Stringa : " + url);
        getAPIData(accessToken, url, function(searchResults) { 
      console.log(searchResults);
     
      data = searchResults;

      
      select("#sound_box").html('<iframe src="https://open.spotify.com/embed/track/' + data.tracks.items[0].id + '' +
          '" width="380" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>');
    });
    document.getElementById("submit").style.display='none';
    document.getElementById("b2").style.display='block';
  }

}

function draw() {
  background(24, 24, 24);
  ambientLight(255,255,255);
  directionalLight(300,300,300,600,600,1);
  clear();
  noFill();
  noStroke();
  stroke('white');
  strokeWeight(3);
  let boxSize = 1200;
  box(boxSize);
  //orbitControl(3,3,0.9);
  //rotateY(0.5);

  
 if (mouseIsPressed == true) {
  cursor('grabbing');
}
else{
  cursor('grab');
}
  
push();
  fill(255);
  translate(-220, 670, 600);
  text("Acousticness", 0, 0 );
  pop();

  push();
  fill(255);
  translate(-580, 670, 600);
  textSize(30);
  text("1", 0, 0 );
  pop();
  
  push();
  fill(255);
  translate(570, 670, 600);
  textSize(30);
  text("0", 0, 0 );
  pop();
  
  push();
  fill(255);
  translate(-600, 670, -130);
  rotateY(-90);
  text("Valence", 0, 0 );
  pop();

  push();
  fill(255);
  translate(-600, 670, -580);
  rotateY(-90);
  textSize(30);
  text("0", 0, 0 );
  pop();

  push();
  fill(255);
  translate(-600, 670, 570);
  rotateY(-90);
  textSize(30);
  text("1", 0, 0 );
  pop();

  push();
  fill(255);
  translate(670, 230, 600);
  rotateZ(-90);
  text("Danceability", 0, 0 );
  pop();

  push();
  fill(255);
  translate(670, 580, 600);
  textSize(30);
  rotateZ(-90);
  text("1", 0, 0 );
  pop();
  
  push();
  fill(255);
  translate(670, -570, 600);
  textSize(30);
  rotateZ(-90);
  text("0", 0, 0 );
  pop();

  //print('Valore Selezionato : ' + selectedValue + " Indice Valore Selezionato : " + IndexSelected);


  for (var i = 0; i < 200; i++) {


    //if (diameter != 'NaN' && x_value != 'NaN' && y_value != 'NaN'){
      if (rec[i].acousticness != ' '){
    

      //print('Visualizzo la sfera : ' + rec[i].song);
      Streams_divisor = rec[i].streams - minStreams;
      normalized_Streams = Streams_divisor / Streams_dividend;

      z_Followers = int(table.getString(i, "Artist Followers"));
      Followers_divisor = z_Followers - minFollowers;
      normal_Followers = Followers_divisor / Followers_dividend;

      color_energy = (table.getString(i, "Energy"));

      let from = color(255, 0, 255);
      let to = color(0, 255, 0);
      //let from = color(227, 0, 255);
      //let to = color(34, 255, 1);
      let g_color = lerpColor(from, to, color_energy);

      fill(g_color);

      if (IndexSelected === i){
        fill(255,220,0);
      }

      push();
      noStroke();
      translate(-500+rec[i].acousticness*1100, -1100 + rec[i].danceability*1700 , -610 + rec[i].valence*1190 );
      sphere(normalized_Streams*70,24, 24);
      pop();
    }
  }
  }

function find_min_max_streams() {
  for (let r = 0; r < table.getRowCount(); r++) {
    Streams = table.getString(r, "Streams");
    if (Streams != "NaN"){
      numStreams = int(table.getString(r, "Streams"));
      minStreams = min(minStreams, numStreams);
      maxStreams = max(maxStreams, numStreams);
      Streams_dividend = (maxStreams - minStreams);
    }
  }
}

function find_min_max_popularity() {
  for (let r = 0; r < table.getRowCount(); r++) {
    Popularity = table.getString(r, "Popularity");
    if (Popularity != " "){
      numPopularity = int(table.getString(r, "Popularity"));
      minPopularity = min(minPopularity, numPopularity);
      maxPopularity = max(maxPopularity, numPopularity);
      Popularity_dividend = (maxPopularity - minPopularity);
    }
  }
}


function find_min_max_followers() {
  for (let r = 0; r < 35; r++) {
    Followers = table.getString(r, "Artist Followers");
    if (Followers != "  "){
      numFollowers = int(table.getString(r, "Artist Followers"));
      minFollowers = min(minFollowers, numFollowers);
      maxFollowers = max(maxFollowers, numFollowers);
      Followers_dividend = (maxFollowers - minFollowers);
    }
  }
}

class data_rec{
  constructor(index, song, acousticness, danceability, streams, valence){
    this.index = index;
    this.song = song;
    this.acousticness = acousticness;
    this.danceability = danceability;
    this.streams = streams;
    this.valence = valence;
  }
}



function getAPIData(accessToken, url, callback) {
  print('Successfull Access Token :  ' + accessToken);
  if (!accessToken) {
    throw "Can't do an API call without an access token!";
  }
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader("Authorization", "Bearer " + accessToken);
  request.addEventListener("load", function() {
    callback(JSON.parse(this.responseText));
  });
  request.send();
}


function getAccessToken(callback) {
  var url = "https://accounts.spotify.com/api/token";
  
  var request = new XMLHttpRequest();
  request.open("POST", url, true);

  request.setRequestHeader("Authorization", "Basic OTliYWE2Y2Q0Y2M3NDAyNjk4ZGFiZmU3OGExZjIxZGI6YmMxMjNkYmI4Zjc3NGI4ZGE5ZjY3ODFkZDA5YzYyYmU=");
  request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  request.addEventListener("load", function() {
    callback(JSON.parse(this.responseText).access_token);
  });
  request.send("grant_type=client_credentials");
}
