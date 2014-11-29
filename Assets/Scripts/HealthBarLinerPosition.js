#pragma strict

var correctionFactorX : float;
var correctionFactorY : float;

var gameMaster : GameObject;

function Update () 
{
	transform.position.x = gameMaster.GetComponent(HealthDisplay).xPos;
	transform.position.y = gameMaster.GetComponent(HealthDisplay).yPos;
}