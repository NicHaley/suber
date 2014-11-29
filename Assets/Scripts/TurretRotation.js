#pragma strict

var rotationOffset : int;
static var difference : Vector2;

function Update () 
{
	var turretPosition : Vector2 = transform.position;
	var mousePosition : Vector2 = camera.main.ScreenToWorldPoint(Input.mousePosition);
	
	difference = (mousePosition - turretPosition);
	difference.Normalize ();
	
	var rotationZ : float = Mathf.Atan2(difference.y, difference.x) * Mathf.Rad2Deg;	//TOA - Tan - Opposite over Adjacent, then conert from rad to degrees
	transform.rotation = Quaternion.Euler(0f, 0f, rotationZ + rotationOffset);	//Quaternion.Euler means we are feeding it degrees and not radians
}