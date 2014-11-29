#pragma strict

var boostRemainingBehindTexture : Texture2D;
var boostRemainingTexture : Texture2D;

private var boostPercent : float;
var backgroundWidthBoost : float;
private var boostWidth : float;
var height : float;

var xPos : float;
var yPos : float;

var suber : GameObject;

function Update()
{
backgroundWidthBoost = Screen.width / 5;
height = backgroundWidthBoost / 15;

xPos = (Screen.width - backgroundWidthBoost) / 2;
yPos = Screen.height / 15;

boostPercent = suber.GetComponent(SubControl).boostTimer / suber.GetComponent(SubControl).boostTime;
boostWidth = (boostPercent * backgroundWidthBoost * -1) + backgroundWidthBoost;

}

function OnGUI()
{
//Draws a rectangle of x,y position, rec width and height, and wrapped in a specified texture
GUI.DrawTexture(Rect(xPos,yPos,backgroundWidthBoost,height), boostRemainingBehindTexture, ScaleMode.StretchToFill, true, 1.0f);
GUI.DrawTexture(Rect(xPos,yPos,boostWidth,height), boostRemainingTexture, ScaleMode.StretchToFill, true, 1.0f);

}