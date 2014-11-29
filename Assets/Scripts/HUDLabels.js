#pragma strict

var missileTexture : Texture2D;

private var xPos : float;
private var yPos : float;
var xPosChooser : int = 10;
var yPosChooser : int = 10;

private var width : float;
private var height : float;

private var horzRatio : float;
private var vertRatio : float;

function Update () 
{
xPos = Screen.width - (Screen.width / xPosChooser);
yPos = Screen.height - (Screen.height / yPosChooser);

horzRatio = Screen.width / 766;
vertRatio = Screen.height / 431;

width = missileTexture.width * horzRatio;
height = missileTexture.height * vertRatio;

}

function OnGUI ()
{
GUI.Label(Rect (xPos, yPos, width, height), missileTexture);
}