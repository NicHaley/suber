#pragma strict

var lifeRemainingBehindTexture : Texture2D;
var lifeRemainingTexture : Texture2D;

var xPos : float;
var yPos : float;

private var lifePercent : float;
var backgroundWidthLife : float;
private var lifeWidth : float;
var height : float;

function Update()
{
backgroundWidthLife = Screen.width / 4;
height = backgroundWidthLife / 15;

xPos = (Screen.width - backgroundWidthLife) / 2;
yPos = Screen.height / 50;

lifePercent = SubHealth.currLife / SubHealth.maxLife;
lifeWidth = lifePercent * backgroundWidthLife;

if(SubHealth.currLife < 0.0)
	{
		SubHealth.currLife = 0.0;
	}
}

function OnGUI()
{

//Draws a rectangle of x,y position, rec width and height, and wrapped in a specified texture
GUI.DrawTexture(Rect(xPos,yPos,backgroundWidthLife,height), lifeRemainingBehindTexture, ScaleMode.StretchToFill, true, 1.0f);
GUI.DrawTexture(Rect(xPos,yPos,lifeWidth,height), lifeRemainingTexture, ScaleMode.StretchToFill, true, 1.0f);

}