#pragma strict

var healthBarLinerTexture : Texture2D;
var xCorrectionFactor : float;
var yCorrectionFactor : float;

function OnGUI()
{
var xPosition : float = GameObject.Find("GameMaster").GetComponent(HealthDisplay).xPos;
var yPosition : float = GameObject.Find("GameMaster").GetComponent(HealthDisplay).yPos;

GUI.Label (Rect (xPosition + xCorrectionFactor, yPosition + yCorrectionFactor, healthBarLinerTexture.width, healthBarLinerTexture.height), healthBarLinerTexture);
}