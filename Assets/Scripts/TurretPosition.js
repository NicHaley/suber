﻿#pragma strict

var target : Transform;
var xOffset : float = 1;
var yOffset : float = 0;

function Update () 
{

if(SubControl.isTurnedRight == true)
	{
		transform.position.x = target.position.x + xOffset;
		transform.position.y = target.position.y + yOffset;
		transform.position.z = target.position.z;
	}
	
else
	{
		transform.position.x = target.position.x - xOffset;
		transform.position.y = target.position.y + yOffset;
		transform.position.z = target.position.z;
	}
}