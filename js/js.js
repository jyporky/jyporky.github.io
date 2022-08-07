var menu = document.querySelector('.menu');

var drop = document.querySelectorAll('.drop');

menu.addEventListener('click', function(e)
{
    for(let i = 0; i < drop.length; i++)
    {
        drop[i].classList.toggle('open');
        e.stopPropagation();
    }
});

const cha = ["cha1.png", "cha2.png", "cha3.png", "cha4.png", "cha5.png", "cha6.png", "cha7.png", "cha8.png", "cha9.png"];
const dot = ["dot1.png", "dot2.png", "dot3.png", "dot4.png", "dot5.png", "dot6.png", "dot7.png", "dot8.png", "dot9.png"];
const bam = ["bam1.png", "bam2.png", "bam3.png", "bam4.png", "bam5.png", "bam6.png", "bam7.png", "bam8.png", "bam9.png"];
const wind = ["east.png", "south.png", "west.png", "north.png"];
const dragon = ["red.png", "green.png", "white.png"];

var eye = document.querySelectorAll('.pair');
for(let i = 0; i < eye.length; i++)
{
    eye[i].addEventListener('click', function(){
        eye[0].src = RandomTiles();
        eye[1].src = eye[0].src;
    });
}

var set = document.querySelectorAll('.set');
for(let i = 0; i < set.length; i++)
{
    set[i].addEventListener('click', function(){

        let ran = Math.floor(Math.random() * 34);
        let tri = Math.floor(Math.random() * 2);
        // If it is a wind or dragon tile
        if (ran > 26)
        {
            tri = 0;
        }

        // set as triplets
        if(tri == 0)
        {
            set[0].src = RandomTiles(ran);
            set[1].src = set[0].src;
            set[2].src = set[1].src;
        }

        else if (tri == 1)
        {
            // Not the one tile
            if((ran > 0 && ran < 9) || (ran > 9 && ran < 18) || (ran > 18 && ran < 27))
            {
                ran--;
            }
            if(ran == 7 || ran == 16 || ran == 25)
            {
                ran--;
            }
            set[0].src = RandomTiles(ran);
            set[1].src = RandomTiles(ran + 1);
            set[2].src = RandomTiles(ran + 2);
        }
    });
}

function RandomTiles(i)
{
    if (!i && i != 0)
    {
       i = Math.floor(Math.random() * 34);
    }
    var source = "image/tiles/";

    if (i < 9)
    {
        return source += cha[i];
    }

    else if (i < 18)
    {
        return source += dot[i - 9];
    }

    else if (i < 27)
    {
        return source += bam[i - 18];
    }

    else if (i < 31)
    {
        return source += wind[i - 27];
    }

    else if (i < 34)
    {
        return source += dragon[i - 31];
    }
}

var ch = document.querySelector(".t-ch");
var d = document.querySelector(".t-do");
var b = document.querySelector(".t-ba");
var w = document.querySelector(".t-wi");
var dr = document.querySelector(".t-dr");

var mt = document.querySelectorAll(".t-3");

var type = [ch,d,b,w,dr];

let index = 2;

function WinningHand()
{
    var p = Math.floor(Math.random() * 5);
    var prevpair = document.getElementsByClassName("none");
    prevpair[0].classList.toggle("t-scale");
    prevpair[0].classList.toggle("none");
    type[index].style.width = "21%";

    let invis = p * 3;
    var tile = document.querySelectorAll(".t-scale");
    tile[invis].classList.toggle("none");
    tile[invis].classList.toggle("t-scale");
    type[p].style.width = "14%";

    index = p;
    
    for(let i = 0; i < tile.length - 1; i += 3)
    {
        var triple = Math.floor(Math.random() * 2);

        if (i == invis || i >= 9 || triple == 0)
        {
            idx = GenerateSetTiles(i/3,true,0);
            tile[i].src = RandomTiles(idx);
            tile[i + 1].src = RandomTiles(idx);
            tile[i + 2].src = RandomTiles(idx);
        }
        else{
            idx = GenerateSetTiles(i/3, false,1);
            tile[i].src = RandomTiles(idx);
            tile[i + 1].src = RandomTiles(idx + 1);
            tile[i + 2].src = RandomTiles(idx + 2);
        }
    }
}

function GenerateSetTiles(type, none, triple)
{
    let t = 0;
    let random = Math.floor(Math.random() * 9);
    if (type == 4)
    {
        t = 31;
    }
    else if (type < 4)
    {
        t += 9 * type;
    }


    if (t > 30)
    {
        let ran = Math.floor(Math.random() * 3);
        return t + ran;
    }

    else if (t > 26)
    {
        let ran = Math.floor(Math.random() * 4);
        return t + ran;
    }

    if (triple == 0 || none)
    {
        return t + random;
    }

    else if (triple == 1)
    {
        ran = t + random;
        // Not the one tile
        if((ran > 0 && ran < 9) || (ran > 9 && ran < 18) || (ran > 18 && ran < 27))
        {
            ran--;
        }
        if(ran == 7 || ran == 16 || ran == 25)
        {
            ran--;
        }
        return ran;
    }
}

var TurnOrderTile = false;

var turntile = document.querySelectorAll(".to-scale");

var chooseTile = document.querySelector("#turn-order");

var thewind = ["East. You go first", "South. You go second", "West. You go third", "North. You go last"]

for (let i = 0; i < turntile.length; ++i)
{
    turntile[i].addEventListener('click', function(){
        if (!TurnOrderTile){
            let random = Math.floor(Math.random() * 4);
            turntile[i].src = DetermineTurnOrder(random);
            TurnOrderTile = true;
            chooseTile.innerHTML = "You got " + thewind[random] + ". <br> Click Me To Reset";
        }
    });
}

function DetermineTurnOrder(i)
{
    var source = "image/tiles/";
    source += wind[i];
    return source;
}


if (document.URL.includes("overview.html"))
{
    mt[0].addEventListener('click', WinningHand);

    chooseTile.addEventListener('click', function(){
        if (TurnOrderTile){
        for (let i = 0; i < turntile.length; ++i){
            turntile[i].src = "image/tiles/flip.png";
        }
        chooseTile.innerHTML = "Choose a tile";
        TurnOrderTile = false;
    }
    });
}

if (document.URL.includes("howtoplay.html"))
{
    mt[0].addEventListener('click', WinningHand);
    var chow = document.querySelectorAll(".chow");
    for (let i = 0; i < chow.length; ++i)
    {
        chow[i].addEventListener('click', function()
        {
            let ran = Math.floor(Math.random() * 34);
            // Not the one tile
            if((ran > 0 && ran < 9) || (ran > 9 && ran < 18) || (ran > 18 && ran < 27))
            {
                ran--;
            }
            if(ran == 7 || ran == 16 || ran == 25)
            {
                ran--;
            }
            chow[0].src = RandomTiles(ran);
            chow[1].src = RandomTiles(ran + 1);
            chow[2].src = RandomTiles(ran + 2);
        });
    }

    var pong = document.querySelectorAll(".pong");
    for (let i = 0; i < pong.length; ++i)
    {
        pong[i].addEventListener('click', function()
        {
            pong[0].src = RandomTiles();
            pong[1].src = pong[0].src;
            pong[2].src = pong[0].src;
        })
    }

    var kong = document.querySelectorAll(".kong");
    for (let i = 0; i < kong.length; ++i)
    {
        kong[i].addEventListener('click', function()
        {
            kong[0].src = RandomTiles();
            kong[1].src = kong[0].src;
            kong[2].src = kong[0].src;
            kong[3].src = kong[0].src;
        })
    }
}

let current = 1;
let cwin = 0;

let randr = 0;

if (document.URL.includes("tips.html"))
{
    var table = document.querySelector('#table');
    var currentwind = document.querySelector('#wind');
    var outcome = document.querySelector('#outcome');
    var host = document.querySelector('#host');

    var cwind = ["East", "South", "West", "North"];
    var ocome = ["~Host Win~", "~Game Draw~", "~Non-Host Win~", "~Game Draw with Kong~"];
    var hst = ["~Host Remain~", "~Host Pass Down~"];

    table.addEventListener('click', function()
    {
        currentwind.innerHTML = "";
        let ran = Math.floor(Math.random() * 4);

        outcome.innerHTML = ocome[ran];

        if(ran < 2)
        {
            host.innerHTML = hst[0];
        }
        else
        {
            host.innerHTML = hst[1];
            currentwind.innerHTML = cwind[cwin] + "-" + current + "->" 
            current++;
        }

        if (current == 5)
        {
            cwin++;
            current = 1;
        }

        if (cwin == 4)
        {
            cwin = 0;
        }

        currentwind.innerHTML += cwind[cwin] + "-" + current;
    })

    var turn = document.querySelector('#turnorder');
    var dice = document.querySelector('#dice');
    var whosetile = document.querySelector('#tile');

    turn.addEventListener('click', function()
    {
        let ran = Math.floor(Math.random() * 17) + 2;
        dice.innerHTML = "Dice Rolled: " + ran;

        var whose;
        for(ran; ran > 4; ran)
        {
            ran -= 4;
        }

        whose = ran;

        whosetile.innerHTML = "Player " + whose + " tile is chosen";
    })

    var thedragon = document.querySelectorAll('.thedragon');
    var thewind = document.querySelectorAll('.thewind');
    var crwind = document.querySelector('#cwind');
    var urwind = document.querySelector('#urwind');
    var twind = document.querySelector('#twind');

    for (let i = 0; i < thedragon.length; ++i)
    {
        thedragon[i].addEventListener('click', function()
        {
            randr++;
            if (randr >= 3)
            {
                randr = 0;
            }
            let ran = randr + 31;

            thedragon[0].src = RandomTiles(ran);
            thedragon[1].src = thedragon[0].src;
            thedragon[2].src = thedragon[0].src;
        });
    }
    
    for (let i = 0; i < thedragon.length; ++i)
    {
        thewind[i].addEventListener('click', function()
        {
            let ran = Math.floor(Math.random() * 4) + 27;

            thewind[0].src = RandomTiles(ran);
            thewind[1].src = thewind[0].src;
            thewind[2].src = thewind[0].src;

            let cran = Math.floor(Math.random() * 4);
            crwind.innerHTML = "Current Wind: " + cwind[cran];

            let uran = Math.floor(Math.random() * 4);
            urwind.innerHTML = "Your Wind: " + cwind[uran];

            let tai = 0;

            ran -= 27;
            if (cran == ran)
            {
                tai += 1;
            }

            if (uran == ran)
            {
                tai += 1;
            }

            twind.innerHTML = tai + " tai/fan";
        });
    }
}