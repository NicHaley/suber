#pragma strict

var target : Transform;
var distance = -10;
var bottomLift = 1.5;
var topLift = 2.6;
var xOffset = -5;

function Update () 

{
transform.position.x = target.position.x + xOffset;
transform.position.z = distance;
	
	if(target.position.y > bottomLift && target.position.y < topLift)
		{
			transform.position.y = target.position.y;
		}
	if(target.position.y <= bottomLift)
		{
			transform.position.y = bottomLift;
		}
	if(target.position.y >= topLift)
		{
			transform.position.y = topLift;
		}
}