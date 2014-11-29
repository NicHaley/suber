#pragma strict

var target : Transform;
var xOffset : float = 1;
var yOffset : float = 0;

function Start () 
{
	particleSystem.renderer.sortingLayerName = "Effects";
}

function Update () 
{

if(SubControl.isTurnedRight == true)
	{
		transform.position.x = target.position.x + xOffset;
		transform.position.y = target.position.y + yOffset;
		transform.rotation.eulerAngles.y = 270;
	}
	
else
	{
		transform.position.x = target.position.x - xOffset;
		transform.position.y = target.position.y + yOffset;
		transform.rotation.eulerAngles.y = 90;
	}
}

